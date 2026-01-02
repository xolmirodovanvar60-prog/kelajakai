import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function useAITeacher() {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentResponse, setCurrentResponse] = useState('');
  const [currentImage, setCurrentImage] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const askQuestion = useCallback(async (question: string) => {
    if (!question.trim()) return;

    setIsProcessing(true);
    setCurrentResponse('Javob tayyorlanmoqda...');

    const newMessages: Message[] = [...messages, { role: 'user', content: question }];
    setMessages(newMessages);

    try {
      // Get AI response
      const { data: aiData, error: aiError } = await supabase.functions.invoke('ai-teacher', {
        body: { messages: newMessages.map(m => ({ role: m.role, content: m.content })) }
      });

      if (aiError) throw aiError;

      const answer = aiData.answer;
      setCurrentResponse(answer);
      setMessages([...newMessages, { role: 'assistant', content: answer }]);

      // Generate text-to-speech
      speakResponse(answer);

      // Generate illustration
      generateImage(question);

    } catch (error) {
      console.error('AI Teacher error:', error);
      setCurrentResponse('Kechirasiz, xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.');
      toast({
        variant: 'destructive',
        title: 'Xatolik!',
        description: 'AI ustoz bilan bog\'lanishda muammo yuz berdi.',
      });
    } finally {
      setIsProcessing(false);
    }
  }, [messages, toast]);

  const speakResponse = useCallback(async (text: string) => {
    try {
      setIsPlayingAudio(true);
      
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/text-to-speech`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ text }),
        }
      );

      if (!response.ok) throw new Error('TTS failed');

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      audio.onended = () => {
        setIsPlayingAudio(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      await audio.play();
    } catch (error) {
      console.error('TTS error:', error);
      setIsPlayingAudio(false);
    }
  }, []);

  const generateImage = useCallback(async (prompt: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-image`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ prompt }),
        }
      );

      if (!response.ok) throw new Error('Image generation failed');
      
      const data = await response.json();
      if (data.imageUrl) {
        setCurrentImage(data.imageUrl);
      }
    } catch (error) {
      console.error('Image generation error:', error);
    }
  }, []);

  return {
    isProcessing,
    currentResponse,
    currentImage,
    isPlayingAudio,
    askQuestion,
    messages,
  };
}
