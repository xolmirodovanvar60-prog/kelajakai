import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { Message } from '@/hooks/useHybridAITeacher';
import { ChatMessage } from './ChatMessage';

interface ChatHistoryProps {
  messages: Message[];
}

export function ChatHistory({ messages }: ChatHistoryProps) {
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
        <div className="w-16 h-16 rounded-3xl bg-slate-100 flex items-center justify-center mb-4">
          <MessageSquare size={28} className="text-slate-400" />
        </div>
        <h3 className="text-lg font-bold text-slate-600 mb-2">Suhbat boshlang!</h3>
        <p className="text-slate-400 text-sm max-w-xs">
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
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
