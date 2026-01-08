import { useState, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/safeClient';
import { BACKEND_PUBLISHABLE_KEY, BACKEND_URL } from '@/lib/backendEnv';
import { useToast } from '@/hooks/use-toast';

export interface UploadedFile {
  file: File;
  preview?: string;
  type: 'image' | 'document' | 'other';
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  modelsUsed?: string[];
  hasLatex?: boolean;
  attachments?: { name: string; type: string }[];
}

export function useHybridAITeacher() {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentImage, setCurrentImage] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<UploadedFile[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const generateId = () => Math.random().toString(36).substring(2, 15);

  // Convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  // Read text file content
  const readTextFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  const addFiles = useCallback((files: UploadedFile[]) => {
    setSelectedFiles(prev => [...prev, ...files]);
  }, []);

  const removeFile = useCallback((index: number) => {
    setSelectedFiles(prev => {
      const updated = [...prev];
      if (updated[index]?.preview) {
        URL.revokeObjectURL(updated[index].preview!);
      }
      updated.splice(index, 1);
      return updated;
    });
  }, []);

  const clearFiles = useCallback(() => {
    selectedFiles.forEach(f => f.preview && URL.revokeObjectURL(f.preview));
    setSelectedFiles([]);
  }, [selectedFiles]);

  const askQuestion = useCallback(async (question: string) => {
    if (!question.trim() && selectedFiles.length === 0) return;

    setIsProcessing(true);

    const attachments = selectedFiles.map(f => ({ 
      name: f.file.name, 
      type: f.type 
    }));

    // Add user message
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: question || `[${selectedFiles.map(f => f.file.name).join(', ')}] yuklandi`,
      timestamp: new Date(),
      attachments: attachments.length > 0 ? attachments : undefined,
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
      let answer: string;
      let hasLatex = false;

      // Check if we have files to analyze
      if (selectedFiles.length > 0) {
        const file = selectedFiles[0]; // Process first file
        
        if (file.type === 'image') {
          // Image analysis
          const base64 = await fileToBase64(file.file);
          
          const response = await fetch(
            `${BACKEND_URL}/functions/v1/analyze-file`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'apikey': BACKEND_PUBLISHABLE_KEY,
                'Authorization': `Bearer ${BACKEND_PUBLISHABLE_KEY}`,
              },
              body: JSON.stringify({ 
                imageBase64: base64,
                userMessage: question,
                messages: messages.slice(-10).map(m => ({ role: m.role, content: m.content }))
              }),
            }
          );

          if (!response.ok) throw new Error('Image analysis failed');
          const data = await response.json();
          answer = data.answer;
          hasLatex = data.hasLatex;
          
        } else if (file.type === 'document') {
          // Document analysis
          let fileContent = '';
          
          if (file.file.type === 'text/plain') {
            fileContent = await readTextFile(file.file);
          } else {
            // For PDF/DOCX, send as base64 for server-side processing
            const base64 = await fileToBase64(file.file);
            
            const response = await fetch(
              `${BACKEND_URL}/functions/v1/analyze-file`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'apikey': BACKEND_PUBLISHABLE_KEY,
                  'Authorization': `Bearer ${BACKEND_PUBLISHABLE_KEY}`,
                },
                body: JSON.stringify({ 
                  imageBase64: base64,
                  fileType: file.file.type,
                  userMessage: question || 'Bu hujjatni tahlil qil va xulosa chiqar',
                  messages: messages.slice(-10).map(m => ({ role: m.role, content: m.content }))
                }),
              }
            );

            if (!response.ok) throw new Error('Document analysis failed');
            const data = await response.json();
            answer = data.answer;
            hasLatex = data.hasLatex;
            clearFiles();
            
            // Update assistant message
            setMessages(prev => prev.map(msg => 
              msg.id === assistantPlaceholder.id 
                ? { ...msg, content: answer, hasLatex }
                : msg
            ));

            speakResponse(answer);
            setIsProcessing(false);
            return;
          }

          // TXT file - send content directly
          const response = await fetch(
            `${BACKEND_URL}/functions/v1/analyze-file`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'apikey': BACKEND_PUBLISHABLE_KEY,
                'Authorization': `Bearer ${BACKEND_PUBLISHABLE_KEY}`,
              },
              body: JSON.stringify({ 
                fileContent,
                fileType: 'text/plain',
                userMessage: question || 'Bu hujjatni tahlil qil va xulosa chiqar',
                messages: messages.slice(-10).map(m => ({ role: m.role, content: m.content }))
              }),
            }
          );

          if (!response.ok) throw new Error('Document analysis failed');
          const data = await response.json();
          answer = data.answer;
          hasLatex = data.hasLatex;
          
        } else {
          throw new Error('Unsupported file type');
        }
        
        clearFiles();
        
      } else {
        // Regular text question
        const { data: aiData, error: aiError } = await supabase.functions.invoke('hybrid-ai-teacher', {
          body: { 
            messages: [...messages, userMessage].map(m => ({ 
              role: m.role, 
              content: m.content 
            })) 
          }
        });

        if (aiError) throw aiError;
        answer = aiData.answer;
      }

      // Update assistant message
      setMessages(prev => prev.map(msg => 
        msg.id === assistantPlaceholder.id 
          ? { ...msg, content: answer, hasLatex }
          : msg
      ));

      // Generate TTS and image in parallel
      speakResponse(answer);
      if (question) {
        generateImage(question);
      }

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
  }, [messages, toast, selectedFiles, clearFiles]);

  const speakResponse = useCallback(async (text: string) => {
    try {
      // Stop previous audio if playing
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      setIsPlayingAudio(true);
      
      // Remove LaTeX for TTS
      const cleanText = text.replace(/\$\$[^$]+\$\$/g, 'formula')
                           .replace(/\$[^$]+\$/g, 'formula')
                           .replace(/\\[a-z]+\{[^}]*\}/g, '');
      
      const response = await fetch(
        `${BACKEND_URL}/functions/v1/text-to-speech`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': BACKEND_PUBLISHABLE_KEY,
            'Authorization': `Bearer ${BACKEND_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ text: cleanText }),
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
    clearFiles();
  }, [stopAudio, clearFiles]);

  return {
    isProcessing,
    messages,
    currentImage,
    isPlayingAudio,
    isGeneratingImage,
    selectedFiles,
    askQuestion,
    clearHistory,
    stopAudio,
    speakResponse,
    addFiles,
    removeFile,
  };
}
