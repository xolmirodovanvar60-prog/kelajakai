import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { Message } from '@/hooks/useHybridAITeacher';
import { ChatMessage } from './ChatMessage';

interface ChatHistoryProps {
  messages: Message[];
  onPlayAudio?: (text: string) => void;
  isPlayingAudio?: boolean;
}

export function ChatHistory({ messages, onPlayAudio, isPlayingAudio }: ChatHistoryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <motion.div 
          className="w-16 h-16 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center mb-4"
          animate={{
            boxShadow: [
              '0 0 10px hsl(180 100% 50% / 0.2)',
              '0 0 20px hsl(180 100% 50% / 0.4)',
              '0 0 10px hsl(180 100% 50% / 0.2)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <MessageSquare size={28} className="text-primary" />
        </motion.div>
        <h3 className="text-lg font-bold text-foreground mb-2">Suhbat boshlang!</h3>
        <p className="text-muted-foreground text-sm max-w-xs">
          Savol bering va AI ustoz sizga o'zbek tilida javob beradi
        </p>
      </div>
    );
  }

  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
    >
      <AnimatePresence mode="popLayout">
        {messages.map((message, index) => (
          <ChatMessage 
            key={message.id} 
            message={message} 
            isLatest={index === messages.length - 1}
            onPlayAudio={onPlayAudio}
            isPlayingAudio={isPlayingAudio}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
