import { motion } from 'framer-motion';
import { User, Volume2, Loader2, Paperclip, FileText, Image as ImageIcon } from 'lucide-react';
import { Message } from '@/hooks/useHybridAITeacher';
import { Button } from '@/components/ui/button';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';

interface ChatMessageProps {
  message: Message;
  isLatest: boolean;
  onPlayAudio?: (text: string) => void;
  isPlayingAudio?: boolean;
}

export function ChatMessage({ message, isLatest, onPlayAudio, isPlayingAudio }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const isLoading = message.content === 'Javob tayyorlanmoqda...';
  
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
        {/* Attachments indicator for user messages */}
        {isUser && message.attachments && message.attachments.length > 0 && (
          <div className={`flex gap-1.5 mb-1.5 ${isUser ? 'justify-end' : ''}`}>
            {message.attachments.map((att, i) => (
              <span key={i} className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full text-[10px] font-medium">
                {att.type === 'image' ? <ImageIcon size={10} /> : <FileText size={10} />}
                {att.name.length > 15 ? att.name.slice(0, 12) + '...' : att.name}
              </span>
            ))}
          </div>
        )}
        
        <div className={`inline-block rounded-2xl px-5 py-3 ${
          isUser 
            ? 'bg-indigo-600 text-white rounded-tr-none' 
            : 'bg-white/80 backdrop-blur-sm text-slate-700 rounded-tl-none shadow-sm border border-slate-100'
        }`}>
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 size={16} className="animate-spin" />
              <span>Javob tayyorlanmoqda...</span>
            </div>
          ) : isUser ? (
            <p className="leading-relaxed">{message.content}</p>
          ) : (
            <MarkdownRenderer content={message.content} />
          )}
        </div>
        
        {/* Play button for AI responses */}
        {!isUser && onPlayAudio && !isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 mt-2"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPlayAudio(message.content)}
              disabled={isPlayingAudio}
              className="h-7 px-2 text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
            >
              {isPlayingAudio ? (
                <Loader2 size={14} className="animate-spin mr-1" />
              ) : (
                <Volume2 size={14} className="mr-1" />
              )}
              Tinglash
            </Button>
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
