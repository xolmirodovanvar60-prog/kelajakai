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
      host.endsWith('.lovable.app')
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

// System prompt for all models
const SYSTEM_PROMPT = `Siz Jomboy tumani 40-maktab STEAM mutaxassisisiz. I.I. Sayfiddinov metodikasi asosida ishlaysiz.

SIZNING ROLLARINGIZ:
1. 🧠 ASOSIY FIKRLASH: Chuqur tahlil va mantiqiy fikrlash
2. 📝 TIL SIFATI: Grammatik to'g'rilik va ravon o'zbek tili
3. 🎯 NAZORAT: Javob sifatini tekshirish va optimallash

QOIDALAR:
- O'zbek tilida, bolalar tushunadigan sodda va ravon tilda javob bering
- Mehribonlik bilan, qiziqarli misollar bilan tushuntiring
- Javoblar aniq va tushunarli bo'lsin - 2-3 paragrafdan oshmasin
- Har bir javobda bolalarni ilm olishga rag'batlantiring
- Eng so'nggi ilmiy yangiliklardan foydalaning
- Murakkab mavzularni oddiy misollar bilan tushuntiring`;

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Call DeepSeek for primary reasoning
async function callDeepSeek(messages: Message[], apiKey: string): Promise<string> {
  console.log('🧠 DeepSeek: Primary reasoning...');
  
  const response = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT + '\n\nSiz asosiy fikrlash va tahlil qilish uchun mas\'ulsiz. Chuqur va mantiqiy javob bering.' },
        ...messages
      ],
      max_tokens: 800,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('DeepSeek error:', error);
    throw new Error('DeepSeek API error');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// Call OpenAI for linguistic refinement
async function callOpenAI(text: string, apiKey: string): Promise<string> {
  console.log('📝 OpenAI: Linguistic refinement...');
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { 
          role: 'system', 
          content: `Siz o'zbek tili mutaxassisisiz. Quyidagi matnni tekshiring va kerak bo'lsa grammatik va stilistik jihatdan yaxshilang. 
Matnning ma'nosini o'zgartirmang, faqat tilni ravonlashtiring. 
Agar matn yaxshi bo'lsa, uni o'zgartirmasdan qaytaring.
Faqat takomillashtirilgan matnni qaytaring, boshqa hech narsa yozmang.`
        },
        { role: 'user', content: text }
      ],
      max_tokens: 800,
      temperature: 0.3,
    }),
  });

  if (!response.ok) {
    console.error('OpenAI refinement error');
    return text; // Return original if refinement fails
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// Call Gemini for final review and quality control
async function callGemini(originalQuestion: string, refinedAnswer: string, apiKey: string): Promise<string> {
  console.log('🎯 Gemini: Final quality control...');
  
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `Siz ta'lim sifati bo'yicha ekspertsiz. Quyidagi savol va javobni tekshiring:

SAVOL: ${originalQuestion}

JAVOB: ${refinedAnswer}

VAZIFA: 
1. Javob savolga to'liq javob berganini tekshiring
2. Javob bolalar uchun tushunarli ekanini tekshiring
3. Agar yaxshilash kerak bo'lsa, takomillashtirilgan versiyani yozing
4. Agar javob yaxshi bo'lsa, uni o'zgartirmasdan qaytaring

FAQAT YAKUNIY JAVOBNI QAYTARING, boshqa izoh yozmang.`
        }]
      }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 800,
      }
    }),
  });

  if (!response.ok) {
    console.error('Gemini review error');
    return refinedAnswer; // Return refined answer if review fails
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || refinedAnswer;
}

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    
    // Input validation
    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Invalid request' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    // Get API keys
    const DEEPSEEK_API_KEY = Deno.env.get('DEEPSEEK_API_KEY');
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

    // Check which APIs are available
    const hasDeepSeek = !!DEEPSEEK_API_KEY;
    const hasOpenAI = !!OPENAI_API_KEY;
    const hasGemini = !!GEMINI_API_KEY;

    console.log(`APIs available - DeepSeek: ${hasDeepSeek}, OpenAI: ${hasOpenAI}, Gemini: ${hasGemini}`);

    // Validate and sanitize messages
    const validatedMessages: Message[] = messages.slice(-10).map((msg: { role: string; content: string }) => ({
      role: (msg.role === 'assistant' ? 'assistant' : 'user') as 'user' | 'assistant',
      content: typeof msg.content === 'string' ? msg.content.slice(0, 2000) : ''
    })).filter((msg: Message) => msg.content.length > 0);

    if (validatedMessages.length === 0) {
      return new Response(JSON.stringify({ error: 'No valid messages' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const lastUserMessage = validatedMessages.filter(m => m.role === 'user').pop()?.content || '';
    
    let finalAnswer: string | undefined;
    const modelsUsed: string[] = [];

    // HYBRID ORCHESTRATION - with fallback support
    if (hasDeepSeek && hasOpenAI && hasGemini) {
      // Try full hybrid mode: DeepSeek → OpenAI → Gemini
      console.log('🚀 Attempting full hybrid orchestration...');
      
      try {
        // Step 1: DeepSeek for primary reasoning
        const deepSeekAnswer = await callDeepSeek(validatedMessages, DEEPSEEK_API_KEY);
        modelsUsed.push('DeepSeek');
        
        // Step 2: OpenAI for linguistic refinement
        const refinedAnswer = await callOpenAI(deepSeekAnswer, OPENAI_API_KEY);
        modelsUsed.push('OpenAI');
        
        // Step 3: Gemini for final quality control
        finalAnswer = await callGemini(lastUserMessage, refinedAnswer, GEMINI_API_KEY);
        modelsUsed.push('Gemini');
      } catch (deepSeekErr) {
        console.warn('DeepSeek failed, falling back to OpenAI + Gemini:', deepSeekErr);
        // Continue to fallback below
      }
    }
    
    // Fallback: OpenAI + Gemini if DeepSeek failed or not available
    if (!finalAnswer && hasOpenAI && hasGemini) {
      console.log('🔄 Running OpenAI + Gemini fallback...');
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...validatedMessages
          ],
          max_tokens: 800,
          temperature: 0.7,
        }),
      });

      if (!response.ok) throw new Error('OpenAI API error');
      const data = await response.json();
      const openAIAnswer = data.choices[0].message.content;
      modelsUsed.length = 0; // Clear previous attempts
      modelsUsed.push('OpenAI');
      
      // Gemini for quality control
      finalAnswer = await callGemini(lastUserMessage, openAIAnswer, GEMINI_API_KEY);
      modelsUsed.push('Gemini');
      
    } else if (!finalAnswer && hasOpenAI) {
      // OpenAI only (fallback)
      console.log('📝 Running OpenAI only mode...');
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...validatedMessages
          ],
          max_tokens: 800,
          temperature: 0.7,
        }),
      });

      if (!response.ok) throw new Error('OpenAI API error');
      const data = await response.json();
      finalAnswer = data.choices[0].message.content;
      modelsUsed.push('OpenAI');
      
    } else if (!finalAnswer && hasDeepSeek) {
      // DeepSeek only
      console.log('🧠 Running DeepSeek only mode...');
      finalAnswer = await callDeepSeek(validatedMessages, DEEPSEEK_API_KEY);
      modelsUsed.push('DeepSeek');
      // OpenAI only (fallback)
      console.log('📝 Running OpenAI only mode...');
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...validatedMessages
          ],
          max_tokens: 800,
          temperature: 0.7,
        }),
      });

      if (!response.ok) throw new Error('OpenAI API error');
      const data = await response.json();
      finalAnswer = data.choices[0].message.content;
      modelsUsed.push('OpenAI');
      
    } else {
      return new Response(JSON.stringify({ error: 'No AI API keys configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`✅ Response generated using: ${modelsUsed.join(' → ')}`);

    return new Response(JSON.stringify({ 
      answer: finalAnswer,
      modelsUsed: modelsUsed
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in hybrid-ai-teacher function:', error);
    return new Response(JSON.stringify({ error: 'Service unavailable' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
