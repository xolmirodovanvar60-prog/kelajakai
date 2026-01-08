import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const ALLOWED_HOSTS = new Set(['localhost', '127.0.0.1']);

function isAllowedOrigin(origin: string) {
  try {
    const url = new URL(origin);
    const host = url.hostname;
    if (ALLOWED_HOSTS.has(host)) return true;
    return (
      host === 'lovableproject.com' ||
      host.endsWith('.lovableproject.com') ||
      host === 'lovable.app' ||
      host.endsWith('.lovable.app') ||
      host === 'onrender.com' ||
      host.endsWith('.onrender.com')
    );
  } catch {
    return false;
  }
}

function getCorsHeaders(req: Request) {
  const origin = req.headers.get('origin') ?? '';
  const allowedOrigin = origin && isAllowedOrigin(origin) ? origin : 'null';
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Vary': 'Origin',
  };
}

const SYSTEM_PROMPT = `Sen yosh dasturchi Narzikulov Amirxon Anvarovich tomonidan maktab yoshidagi o'quvchilar uchun maxsus ishlab chiqilgan Ustoz AIsаn.

SEN RASMLAR VA HUJJATLARNI TAHLIL QILUVCHI AIsan.

QOBILIYATLARING:
1. 📸 RASM TAHLILI: Matematik formulalar, qo'lyozma misollar, jadvallar, diagrammalar
2. 📄 HUJJAT TAHLILI: PDF, Word, TXT fayllarni o'qish va tahlil qilish
3. 🧮 MATEMATIK YECHIMLAR: LaTeX formatida chiroyli formulalar bilan javob berish

MATEMATIK JAVOBLAR UCHUN:
- Oddiy formulalar uchun: $formula$ (inline)
- Murakkab formulalar uchun: $$formula$$ (block)
- Masalan: $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$

QOIDALAR:
- O'zbek tilida, bolalar tushunadigan sodda tilda javob ber
- Matematik misollarni qadam-baqadam yech
- Har bir qadam uchun tushuntirish ber
- LaTeX formatidan foydalanib chiroyli formulalar yoz
- Rasmdagi yoki hujjatdagi ma'lumotlarni to'liq tahlil qil`;

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64, fileContent, fileType, userMessage, messages } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    
    if (!LOVABLE_API_KEY && !GEMINI_API_KEY) {
      return new Response(JSON.stringify({ error: 'No API keys configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let response: string;

    // If we have an image, use Gemini Vision
    if (imageBase64) {
      console.log('🖼️ Analyzing image with Gemini Vision...');
      
      // Use Lovable AI Gateway for Gemini
      const apiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...(messages || []).slice(-5),
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: userMessage || 'Bu rasmni tahlil qil. Agar matematik masala bo\'lsa, uni yech va LaTeX formatida javob ber.'
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: imageBase64.startsWith('data:') ? imageBase64 : `data:image/jpeg;base64,${imageBase64}`
                  }
                }
              ]
            }
          ],
          max_tokens: 2000,
          temperature: 0.3,
        }),
      });

      if (!apiResponse.ok) {
        const error = await apiResponse.text();
        console.error('Gemini Vision error:', error);
        throw new Error('Image analysis failed');
      }

      const data = await apiResponse.json();
      response = data.choices[0].message.content;
      
    } else if (fileContent) {
      // Text-based document analysis
      console.log(`📄 Analyzing ${fileType} document...`);
      
      const apiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...(messages || []).slice(-5),
            {
              role: 'user',
              content: `${userMessage || 'Bu hujjatni tahlil qil va xulosa chiqar:'}\n\n--- HUJJAT MATNI ---\n${fileContent.slice(0, 50000)}\n--- HUJJAT OXIRI ---`
            }
          ],
          max_tokens: 2000,
          temperature: 0.3,
        }),
      });

      if (!apiResponse.ok) {
        const error = await apiResponse.text();
        console.error('Document analysis error:', error);
        throw new Error('Document analysis failed');
      }

      const data = await apiResponse.json();
      response = data.choices[0].message.content;
      
    } else {
      return new Response(JSON.stringify({ error: 'No file provided' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('✅ File analysis completed');

    return new Response(JSON.stringify({ 
      answer: response,
      hasLatex: response.includes('$') || response.includes('\\')
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-file function:', error);
    return new Response(JSON.stringify({ error: 'File analysis failed' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
