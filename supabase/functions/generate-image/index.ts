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

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt } = await req.json();
    
    if (!prompt || typeof prompt !== 'string') {
      return new Response(JSON.stringify({ error: 'Invalid request' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    const sanitizedPrompt = prompt.slice(0, 500).trim();
    
    if (sanitizedPrompt.length === 0) {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      return new Response(JSON.stringify({ error: 'Service unavailable' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Generating image with Gemini for prompt:', sanitizedPrompt);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-image-preview',
        messages: [
          {
            role: 'user',
            content: `Generate a bright, colorful, educational illustration for children about: ${sanitizedPrompt}. Style: Friendly, 3D rendered, suitable for young students. High quality, clean design.`
          }
        ],
        modalities: ['image', 'text']
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      return new Response(JSON.stringify({ error: 'Image generation failed' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    console.log('Gemini response structure:', JSON.stringify(data, null, 2));
    
    // Try multiple possible response formats
    let imageData = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    // Alternative format: images array directly in message
    if (!imageData && data.choices?.[0]?.message?.images?.[0]?.url) {
      imageData = data.choices[0].message.images[0].url;
    }
    
    // Alternative: base64 data in content
    if (!imageData && data.choices?.[0]?.message?.content) {
      const content = data.choices[0].message.content;
      if (typeof content === 'string' && content.startsWith('data:image')) {
        imageData = content;
      }
    }

    if (!imageData) {
      console.error('No image in response, structure:', Object.keys(data));
      return new Response(JSON.stringify({ error: 'No image generated' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Image generated successfully');

    return new Response(JSON.stringify({ imageUrl: imageData }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-image function:', error);
    return new Response(JSON.stringify({ error: 'Service unavailable' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
