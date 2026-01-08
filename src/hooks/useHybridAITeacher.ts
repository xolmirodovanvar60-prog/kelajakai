import { useState, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/safeClient';
import { BACKEND_PUBLISHABLE_KEY, BACKEND_URL } from '@/lib/backendEnv';
import { useToast } from '@/hooks/use-toast';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  modelsUsed?: string[];
}

export function useHybridAITeacher() {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentImage, setCurrentImage] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const generateId = () => Math.random().toString(36).substring(2, 15);

  const askQuestion = useCallback(async (question: string) => {
    if (!question.trim()) return;

    setIsProcessing(true);

    // Add user message
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: question,
      timestamp: new Date(),
    };

    // Add placeholder for assistant
    const assistantPlaceholder: Message = {
      id: generateId(),
      role: 'assistant',
      content: 'Javob tayyorlanmoqda...',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage, assistantPlaceholder]);

    try {
      // Get AI response from hybrid endpoint
      const { data: aiData, error: aiError } = await supabase.functions.invoke('hybrid-ai-teacher', {
        body: { 
          messages: [...messages, userMessage].map(m => ({ 
            role: m.role, 
            content: m.content 
          })) 
        }
      });

      if (aiError) throw aiError;

      const answer = aiData.answer;
      const modelsUsed = aiData.modelsUsed || [];

      // Update assistant message
      setMessages(prev => prev.map(msg => 
        msg.id === assistantPlaceholder.id 
          ? { ...msg, content: answer, modelsUsed }
          : msg
      ));

      // Generate TTS and image in parallel
      speakResponse(answer);
      generateImage(question);

    } catch (error) {
      console.error('Hybrid AI Teacher error:', error);
      
      // Update placeholder with error
      setMessages(prev => prev.map(msg => 
        msg.id === assistantPlaceholder.id 
          ? { ...msg, content: 'Kechirasiz, xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.' }
          : msg
      ));

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
      // Stop previous audio if playing
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      setIsPlayingAudio(true);
      
      const response = await fetch(
        `${BACKEND_URL}/functions/v1/text-to-speech`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': BACKEND_PUBLISHABLE_KEY,
            'Authorization': `Bearer ${BACKEND_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ text }),
        }
      );

      if (!response.ok) throw new Error('TTS failed');

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.onended = () => {
        setIsPlayingAudio(false);
        URL.revokeObjectURL(audioUrl);
        audioRef.current = null;
      };
      
      await audio.play();
    } catch (error) {
      console.error('TTS error:', error);
      setIsPlayingAudio(false);
    }
  }, []);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsPlayingAudio(false);
    }
  }, []);

  const generateImage = useCallback(async (prompt: string) => {
    try {
      setIsGeneratingImage(true);
      
      const response = await fetch(
        `${BACKEND_URL}/functions/v1/generate-image`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': BACKEND_PUBLISHABLE_KEY,
            'Authorization': `Bearer ${BACKEND_PUBLISHABLE_KEY}`,
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
    } finally {
      setIsGeneratingImage(false);
    }
  }, []);

  const clearHistory = useCallback(() => {
    setMessages([]);
    setCurrentImage('');
    stopAudio();
  }, [stopAudio]);

  return {
    isProcessing,
    messages,
    currentImage,
    isPlayingAudio,
    isGeneratingImage,
    askQuestion,
    clearHistory,
    stopAudio,
  };
}
