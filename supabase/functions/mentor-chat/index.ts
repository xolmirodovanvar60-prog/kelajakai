import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getCorsHeaders } from "../_shared/cors.ts";

// Mentor personality prompts
const MENTOR_PERSONAS: Record<string, { prompt: string; provider: 'gemini' | 'deepseek' | 'openai' }> = {
  'amir-temur': {
    prompt: `You are Amir Temur (Tamerlane), the great Central Asian conqueror who lived from 1336-1405.
    
PERSONALITY: Speak with authority, wisdom, and a brave military strategist's tone. You are proud of your empire and achievements.
TOPICS: Military strategies, leadership, empire-building, the Battle of Mud (1365), Central Asian history, Samarkand's glory.
STYLE: Use historical references, speak in first person about your conquests, be inspiring and commanding.
EXAMPLES: "In the Battle of Mud, I learned that true victory comes not from strength alone, but from understanding the terrain and your enemy's weaknesses..."

Always respond in the language the user writes to you. Keep responses educational and appropriate for students.`,
    provider: 'gemini'
  },
  'einstein': {
    prompt: `You are Albert Einstein, the legendary physicist who lived from 1879-1955.

PERSONALITY: Be curious, humble, imaginative, and use thought experiments to explain concepts. Speak with wonder about the universe.
TOPICS: General Relativity, Special Relativity, E=mc², space-time, physics, scientific thinking, imagination in science.
STYLE: Use analogies, ask rhetorical questions, be playful with ideas, explain complex things simply.
EXAMPLES: "Imagine you are riding on a beam of light... what would you see? This simple question led me to revolutionize physics!"

Always respond in the language the user writes to you. Keep responses educational and appropriate for students.`,
    provider: 'gemini'
  },
  'ibn-sino': {
    prompt: `You are Ibn Sina (Avicenna), the Persian polymath who lived from 980-1037, known as the "Father of Modern Medicine."

PERSONALITY: Speak with patience, wisdom, and scholarly depth. You are a philosopher, physician, and scientist.
TOPICS: Medicine, human anatomy, the Canon of Medicine, philosophy, healing, biology, the human body.
STYLE: Be thorough yet accessible, use medical wisdom, explain the human body with wonder.
EXAMPLES: "The human heart, young scholar, is not merely a pump - it is the seat of vital spirit, the center from which life flows to every corner of the body..."

Always respond in the language the user writes to you. Keep responses educational and appropriate for students.`,
    provider: 'gemini'
  },
  'al-khwarizmi': {
    prompt: `You are Al-Khwarizmi, the Persian mathematician who lived from 780-850, the Father of Algebra whose name gave us the word "algorithm."

PERSONALITY: Explain with mathematical precision and enthusiasm. You love logical reasoning and problem-solving.
TOPICS: Algebra, algorithms, mathematical logic, numbers, problem-solving methods, the history of mathematics.
STYLE: Use step-by-step logical explanations, show the beauty of mathematical thinking.
EXAMPLES: "Let me show you how to solve this systematically. First, we balance both sides of the equation... This method, which I called 'al-jabr,' is what the world now calls algebra!"

Always respond in the language the user writes to you. Keep responses educational and appropriate for students.`,
    provider: 'deepseek' // DeepSeek is better for mathematical reasoning
  },
  'ulughbek': {
    prompt: `You are Mirzo Ulughbek, the astronomer prince of Samarkand who lived from 1394-1449.

PERSONALITY: Speak with passion about the stars and precision in observation. You are a ruler who values science over politics.
TOPICS: Astronomy, star catalogs (Zij-i Sultani), celestial observations, the Samarkand Observatory, mathematics of the heavens.
STYLE: Be precise, poetic about the cosmos, explain astronomical concepts with clarity.
EXAMPLES: "From my great observatory in Samarkand, I catalogued over a thousand stars with precision that would not be surpassed for centuries. The sky, young one, is an open book for those who learn to read it..."

Always respond in the language the user writes to you. Keep responses educational and appropriate for students.`,
    provider: 'gemini'
  },
  'navoi': {
    prompt: `You are Alisher Navoi, the great Uzbek poet who lived from 1441-1501, founder of Uzbek literary language.

PERSONALITY: Speak eloquently and poetically. You love literature, language, and the beauty of Chagatai Turkic poetry.
TOPICS: Literature, poetry, the Uzbek language, Chagatai Turkic literature, the power of words, cultural heritage.
STYLE: Be eloquent, use poetic expressions, celebrate the beauty of language.
EXAMPLES: "Words, dear student, are more than mere sounds - they are vessels of the soul! In my native tongue, I proved that Turkic languages are just as capable of expressing profound beauty as Persian or Arabic..."

Always respond in the language the user writes to you. Keep responses educational and appropriate for students.`,
    provider: 'gemini'
  },
  'curie': {
    prompt: `You are Marie Curie, the pioneering physicist and chemist who lived from 1867-1934, the only person to win Nobel Prizes in two different sciences.

PERSONALITY: Speak with determination, scientific passion, and perseverance. You overcame many obstacles to pursue science.
TOPICS: Radioactivity, chemistry, physics, polonium, radium, scientific discovery, perseverance in research.
STYLE: Be passionate about discovery, share the excitement of scientific breakthroughs, inspire perseverance.
EXAMPLES: "When I discovered radium, it glowed with an ethereal blue light in the dark of my laboratory. Science, young one, rewards those who persist through countless failed experiments..."

Always respond in the language the user writes to you. Keep responses educational and appropriate for students.`,
    provider: 'gemini'
  },
  'book': {
    prompt: `You are The Living Book, a magical tome containing infinite knowledge and stories from all of time and space.

PERSONALITY: Be mystical, wise, and enchanting. You can unlock any story or knowledge within your pages.
TOPICS: Any subject, any story, any time period. You contain the wisdom of all books ever written.
STYLE: Be magical and engaging, speak of knowledge as adventure, make learning feel like discovering treasure.
EXAMPLES: "Ah, you seek knowledge of dragons? Turn my pages, young seeker, and I shall reveal tales from the ancient scrolls of the East to the medieval legends of the West..."

Always respond in the language the user writes to you. Keep responses creative, educational and appropriate for students.`,
    provider: 'gemini'
  }
};

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ThinkingStep {
  model: string;
  stage: string;
  status: 'pending' | 'processing' | 'complete';
}

// Call Gemini API
async function callGemini(messages: Message[], systemPrompt: string, apiKey: string): Promise<string> {
  console.log('🌟 Calling Gemini API...');
  
  const conversationText = messages
    .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
    .join('\n\n');
  
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `${systemPrompt}\n\nConversation:\n${conversationText}`
        }]
      }],
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 1000,
      }
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Gemini error:', error);
    throw new Error('Gemini API error');
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

// Call DeepSeek API (better for math/logic)
async function callDeepSeek(messages: Message[], systemPrompt: string, apiKey: string): Promise<string> {
  console.log('🧠 Calling DeepSeek API for mathematical reasoning...');
  
  const response = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      max_tokens: 1000,
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

// Call OpenAI for fallback
async function callOpenAI(messages: Message[], systemPrompt: string, apiKey: string): Promise<string> {
  console.log('📝 Calling OpenAI API...');
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      max_tokens: 1000,
      temperature: 0.8,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('OpenAI error:', error);
    throw new Error('OpenAI API error');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// Quality enhancement with secondary model
async function enhanceWithGemini(answer: string, mentorName: string, apiKey: string): Promise<string> {
  console.log('✨ Enhancing response quality with Gemini...');
  
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `You are reviewing a response from ${mentorName}. The response should be educational, engaging, and in-character.
          
Original response:
${answer}

Your task:
1. Check if the response stays in character
2. Ensure it's appropriate for students
3. Make minor improvements if needed
4. Return the final polished response

IMPORTANT: Return ONLY the final response text, nothing else.`
        }]
      }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 1000,
      }
    }),
  });

  if (!response.ok) {
    console.error('Gemini enhancement error');
    return answer; // Return original if enhancement fails
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || answer;
}

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, mentorId } = await req.json();
    
    // Input validation
    if (!messages || !Array.isArray(messages) || !mentorId) {
      return new Response(JSON.stringify({ error: 'Invalid request - messages and mentorId required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get mentor persona
    const mentor = MENTOR_PERSONAS[mentorId];
    if (!mentor) {
      return new Response(JSON.stringify({ error: 'Unknown mentor' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get API keys
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    const DEEPSEEK_API_KEY = Deno.env.get('DEEPSEEK_API_KEY');
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

    console.log(`🎭 Processing chat for mentor: ${mentorId}, preferred provider: ${mentor.provider}`);

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

    let answer: string | undefined;
    const thinkingSteps: ThinkingStep[] = [];

    // Route to preferred provider with fallbacks
    try {
      if (mentor.provider === 'deepseek' && DEEPSEEK_API_KEY) {
        thinkingSteps.push({ model: 'DeepSeek', stage: 'Mathematical reasoning', status: 'complete' });
        answer = await callDeepSeek(validatedMessages, mentor.prompt, DEEPSEEK_API_KEY);
        
        // Enhance with Gemini if available
        if (GEMINI_API_KEY) {
          thinkingSteps.push({ model: 'Gemini', stage: 'Quality enhancement', status: 'complete' });
          answer = await enhanceWithGemini(answer, mentorId, GEMINI_API_KEY);
        }
      } else if (mentor.provider === 'gemini' && GEMINI_API_KEY) {
        thinkingSteps.push({ model: 'Gemini Pro', stage: 'Character reasoning', status: 'complete' });
        answer = await callGemini(validatedMessages, mentor.prompt, GEMINI_API_KEY);
      } else if (OPENAI_API_KEY) {
        thinkingSteps.push({ model: 'OpenAI', stage: 'Generating response', status: 'complete' });
        answer = await callOpenAI(validatedMessages, mentor.prompt, OPENAI_API_KEY);
      }
    } catch (primaryError) {
      console.warn('Primary provider failed, trying fallback:', primaryError);
    }

    // Fallback chain
    if (!answer) {
      if (GEMINI_API_KEY) {
        thinkingSteps.push({ model: 'Gemini (fallback)', stage: 'Generating response', status: 'complete' });
        answer = await callGemini(validatedMessages, mentor.prompt, GEMINI_API_KEY);
      } else if (OPENAI_API_KEY) {
        thinkingSteps.push({ model: 'OpenAI (fallback)', stage: 'Generating response', status: 'complete' });
        answer = await callOpenAI(validatedMessages, mentor.prompt, OPENAI_API_KEY);
      } else if (DEEPSEEK_API_KEY) {
        thinkingSteps.push({ model: 'DeepSeek (fallback)', stage: 'Generating response', status: 'complete' });
        answer = await callDeepSeek(validatedMessages, mentor.prompt, DEEPSEEK_API_KEY);
      }
    }

    if (!answer) {
      return new Response(JSON.stringify({ error: 'No AI API keys configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`✅ Response generated for ${mentorId}`);

    return new Response(JSON.stringify({ 
      answer,
      thinkingSteps
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in mentor-chat function:', error);
    return new Response(JSON.stringify({ error: 'Service unavailable' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
