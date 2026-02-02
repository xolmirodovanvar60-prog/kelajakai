import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mentor } from '@/components/MentorCard';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentor: Mentor | null;
}

const getMentorPersonality = (mentor: Mentor): string => {
  const personalities: Record<string, string> = {
    'amir-temur': "You are Amir Temur (Tamerlane), the great Central Asian conqueror. Speak with authority and wisdom about military strategy, empire-building, and leadership.",
    'einstein': "You are Albert Einstein. Explain complex physics concepts in simple, imaginative ways. Be curious, humble, and use thought experiments.",
    'ibn-sino': "You are Ibn Sina (Avicenna), the Persian polymath. Share your vast knowledge of medicine, philosophy, and science with patience and wisdom.",
    'al-khwarizmi': "You are Al-Khwarizmi, the father of algebra. Explain mathematical concepts with enthusiasm and show how algorithms shape our world.",
    'ulughbek': "You are Mirzo Ulughbek, the astronomer prince. Share your passion for the stars and precise astronomical observations.",
    'navoi': "You are Alisher Navoi, the great Uzbek poet. Speak eloquently about literature, language, and the beauty of Chagatai Turkic poetry.",
    'curie': "You are Marie Curie, pioneering physicist and chemist. Share your passion for scientific discovery and perseverance in research.",
    'book': "You are a magical living book containing all knowledge. Be mystical, wise, and ready to unlock any story or knowledge within your pages.",
  };
  return personalities[mentor.id] || "You are a wise historical mentor ready to teach and inspire.";
};

export function AIChatModal({ isOpen, onClose, mentor }: AIChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && mentor) {
      // Add initial greeting
      setMessages([{
        id: '1',
        role: 'assistant',
        content: `Greetings, young scholar! I am ${mentor.name}. Ask me anything about ${mentor.topic} or any other wisdom you seek.`
      }]);
    }
  }, [isOpen, mentor]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSend = async () => {
    if (!input.trim() || isLoading || !mentor) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-teacher`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: getMentorPersonality(mentor) },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: input.trim() }
          ]
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.answer || "I apologize, but I couldn't formulate a response. Please try again."
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I apologize, there was an error connecting to my wisdom. Please try again."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mentor) return null;

  const Icon = mentor.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl h-[80vh] glass-panel rounded-3xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className={`relative p-6 bg-gradient-to-r ${mentor.gradient}`}>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{mentor.name}</h2>
                  <p className="text-white/80 text-sm">{mentor.subject} • {mentor.era}</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4"
            >
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-tr-none'
                      : 'glass-panel text-foreground rounded-tl-none border border-primary/20'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="glass-panel rounded-2xl rounded-tl-none px-4 py-3 border border-primary/20">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground">Thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-primary/20">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-3"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Ask ${mentor.name} a question...`}
                  className="flex-1 bg-background/50 border-primary/30 focus:border-primary"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-2 text-center flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3" />
                Powered by AI-Librarian
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
