import { useState, useCallback } from 'react';
import { Mic, Loader2, MicOff } from 'lucide-react';
import { motion } from 'framer-motion';

interface MicrophoneButtonProps {
  onResult: (text: string) => void;
  isProcessing: boolean;
}

export function MicrophoneButton({ onResult, isProcessing }: MicrophoneButtonProps) {
  const [isListening, setIsListening] = useState(false);

  const startListening = useCallback(() => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Brauzeringiz ovozli kiritishni qo'llab-quvvatlamaydi. Chrome brauzeridan foydalaning.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'uz-UZ';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  }, [onResult]);

  const isDisabled = isProcessing || isListening;

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.button
        whileHover={{ scale: isDisabled ? 1 : 1.05 }}
        whileTap={{ scale: isDisabled ? 1 : 0.95 }}
        onClick={startListening}
        disabled={isDisabled}
        className={`
          w-28 h-28 rounded-full flex items-center justify-center 
          shadow-2xl transition-all duration-300
          ${isListening 
            ? 'bg-destructive shadow-destructive/30 animate-pulse' 
            : isProcessing 
              ? 'bg-muted' 
              : 'bg-primary shadow-primary/30 hover:shadow-primary/50'
          }
        `}
      >
        {isProcessing ? (
          <Loader2 className="w-10 h-10 text-primary-foreground animate-spin" />
        ) : isListening ? (
          <MicOff className="w-10 h-10 text-destructive-foreground" />
        ) : (
          <Mic className="w-12 h-12 text-primary-foreground" />
        )}
      </motion.button>
      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">
        {isListening ? "Eshitilmoqda..." : isProcessing ? "Javob tayyorlanmoqda..." : "Gapirish uchun bosing"}
      </p>
    </div>
  );
}
