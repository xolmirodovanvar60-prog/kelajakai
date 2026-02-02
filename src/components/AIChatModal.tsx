import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, Sparkles, Brain, Zap, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mentor } from '@/components/MentorCard';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ThinkingStep {
  model: string;
  stage: string;
  status: 'pending' | 'processing' | 'complete';
}

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentor: Mentor | null;
}

export function AIChatModal({ isOpen, onClose, mentor }: AIChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [thinkingSteps, setThinkingSteps] = useState<ThinkingStep[]>([]);
  const [showThinking, setShowThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && mentor) {
      // Add initial greeting based on mentor
      const greetings: Record<string, string> = {
        'amir-temur': `Greetings, young warrior! I am Amir Temur, the conqueror of empires. Ask me about military strategy, the Battle of Mud, or the glory of my empire!`,
        'einstein': `Hello there, curious mind! I am Albert Einstein. Shall we explore the mysteries of the universe together? Ask me about relativity, light, or how imagination fuels science!`,
        'ibn-sino': `Peace be upon you, young scholar. I am Ibn Sina, physician and philosopher. What questions do you have about the human body or the art of healing?`,
        'al-khwarizmi': `Welcome, student of mathematics! I am Al-Khwarizmi, father of algebra. Let us solve problems together - what mathematical mysteries shall we unravel?`,
        'ulughbek': `Greetings from Samarkand! I am Mirzo Ulughbek, astronomer and prince. The stars hold many secrets - what do you wish to learn about the cosmos?`,
        'navoi': `Salom, dear friend! I am Alisher Navoi, poet and scholar. Ask me about the beauty of language, poetry, or the rich heritage of Uzbek literature!`,
        'curie': `Bonjour, young scientist! I am Marie Curie. Science requires persistence and curiosity - what would you like to discover about chemistry or radioactivity?`,
        'book': `*The pages flutter magically* Welcome, seeker of stories! I am The Living Book. Within my pages lie infinite tales and knowledge. What adventure shall we embark upon?`,
      };

      setMessages([{
        id: '1',
        role: 'assistant',
        content: greetings[mentor.id] || `Greetings! I am ${mentor.name}. Ask me anything about ${mentor.topic} or any other wisdom you seek.`
      }]);
    }
  }, [isOpen, mentor]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, showThinking]);

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
    setShowThinking(true);
    
    // Simulate thinking steps
    setThinkingSteps([
      { model: 'Analyzing', stage: 'Understanding your question...', status: 'processing' },
    ]);

    try {
      // Call the new mentor-chat edge function
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/mentor-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: messages.map(m => ({ role: m.role, content: m.content })).concat([{ role: 'user', content: input.trim() }]),
          mentorId: mentor.id
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      
      // Update thinking steps if returned
      if (data.thinkingSteps) {
        setThinkingSteps(data.thinkingSteps.map((step: ThinkingStep) => ({
          ...step,
          status: 'complete'
        })));
      } else {
        setThinkingSteps([
          { model: 'AI Mentor', stage: 'Response generated', status: 'complete' }
        ]);
      }

      // Small delay to show completed thinking
      await new Promise(resolve => setTimeout(resolve, 500));
      setShowThinking(false);
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.answer || "I apologize, but I couldn't formulate a response. Please try again."
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setShowThinking(false);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I apologize, there was an error connecting to my wisdom. Please try again."
      }]);
    } finally {
      setIsLoading(false);
      setThinkingSteps([]);
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
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  </div>
                </motion.div>
              ))}

              {/* Thinking State */}
              <AnimatePresence>
                {showThinking && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex justify-start"
                  >
                    <div className="glass-panel rounded-2xl rounded-tl-none px-4 py-4 border border-primary/20 max-w-[80%]">
                      <div className="flex items-center gap-2 mb-3">
                        <Brain className="w-5 h-5 text-primary animate-pulse" />
                        <span className="text-sm font-medium text-primary">Unified Knowledge Processing</span>
                      </div>
                      
                      <div className="space-y-2">
                        {thinkingSteps.map((step, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="flex items-center gap-2"
                          >
                            {step.status === 'processing' ? (
                              <Loader2 className="w-4 h-4 animate-spin text-secondary" />
                            ) : step.status === 'complete' ? (
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                            ) : (
                              <Zap className="w-4 h-4 text-muted-foreground" />
                            )}
                            <span className="text-xs text-muted-foreground">
                              <span className="font-medium">{step.model}:</span> {step.stage}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
                Powered by Multi-Model AI Orchestration
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
