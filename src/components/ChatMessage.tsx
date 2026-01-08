import { motion } from 'framer-motion';
import { User, Sparkles } from 'lucide-react';
import { Message } from '@/hooks/useHybridAITeacher';

interface ChatMessageProps {
  message: Message;
  isLatest: boolean;
}

export function ChatMessage({ message, isLatest }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {/* Avatar */}
      <div className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center ${
        isUser 
          ? 'bg-indigo-100 text-indigo-600' 
          : 'bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200'
      }`}>
        {isUser ? <User size={18} /> : (
          <span className="text-xs font-black tracking-tight">UAI</span>
        )}
      </div>
      
      {/* Message Content */}
      <div className={`flex-1 max-w-[80%] ${isUser ? 'text-right' : ''}`}>
        <div className={`inline-block rounded-2xl px-5 py-3 ${
          isUser 
            ? 'bg-indigo-600 text-white rounded-tr-none' 
            : 'bg-white/80 backdrop-blur-sm text-slate-700 rounded-tl-none shadow-sm border border-slate-100'
        }`}>
          <p className="leading-relaxed">{message.content}</p>
        </div>
        
        {/* Models used badge */}
        {!isUser && message.modelsUsed && message.modelsUsed.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-1.5 mt-2 text-xs text-slate-400"
          >
            <Sparkles size={12} className="text-amber-500" />
            <span>{message.modelsUsed.join(' → ')}</span>
          </motion.div>
        )}
        
        {/* Timestamp */}
        <p className={`text-[10px] text-slate-400 mt-1 ${isUser ? 'text-right' : ''}`}>
          {message.timestamp.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </motion.div>
  );
}
