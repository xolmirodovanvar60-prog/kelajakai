import { useState, useRef } from 'react';
import { 
  GraduationCap, Info, X, ShieldCheck, Send, Image as ImageIcon,
  Brain, Volume2, Palette, Mic, Loader2, Trash2, VolumeX, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useHybridAITeacher } from '@/hooks/useHybridAITeacher';
import { ChatHistory } from '@/components/ChatHistory';

const Index = () => {
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { 
    isProcessing, 
    messages,
    currentImage, 
    isPlayingAudio,
    isGeneratingImage,
    askQuestion,
    clearHistory,
    stopAudio,
  } = useHybridAITeacher();

  const handleSubmit = (text?: string) => {
    const query = text || inputText;
    if (!query.trim() || isProcessing) return;
    askQuestion(query);
    setInputText('');
    inputRef.current?.focus();
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRecognition) {
      alert('Brauzeringiz ovozli kiritishni qo\'llab-quvvatlamaydi');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'uz-UZ';
    recognition.onresult = (event: any) => handleSubmit(event.results[0][0].transcript);
    recognition.start();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 font-sans text-foreground flex flex-col">
      
      {/* --- HEADER --- */}
      <nav className="h-16 lg:h-20 bg-white/70 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-50 px-4 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2 lg:gap-3">
          <div className="bg-indigo-600 p-2 lg:p-2.5 rounded-xl lg:rounded-2xl text-white shadow-lg shadow-indigo-200">
            <GraduationCap size={18} className="lg:w-[22px] lg:h-[22px]" />
          </div>
          <div>
            <span className="text-lg lg:text-2xl font-black tracking-tighter text-slate-800">USTOZ.AI</span>
            <div className="flex items-center gap-1 text-[10px] text-slate-400">
              <Sparkles size={10} className="text-amber-500" />
              <span className="font-bold">Hybrid AI</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={clearHistory}
              className="text-slate-400 hover:text-red-500 hover:bg-red-50"
            >
              <Trash2 size={16} />
              <span className="hidden sm:inline ml-1">Tozalash</span>
            </Button>
          )}
          <Button className="rounded-full px-4 lg:px-8 h-10 lg:h-12 font-bold bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all text-sm lg:text-base">
            Guvohnoma
          </Button>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 container mx-auto py-4 lg:py-8 px-4 lg:px-6 flex flex-col lg:flex-row gap-4 lg:gap-8">
        
        {/* LEFT SIDE: Chat Interface */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Chat Header */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <h1 className="text-2xl lg:text-4xl font-black leading-tight tracking-tighter text-slate-900">
              Kelajak <span className="text-indigo-600 italic">Shu Yerda!</span>
            </h1>
            <p className="text-sm lg:text-base text-slate-500 font-medium">
              Jomboy 40-maktab STEAM laboratoriyasi
            </p>
          </motion.div>

          {/* Chat History */}
          <div className="flex-1 bg-white/60 backdrop-blur-xl rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 flex flex-col min-h-[300px] lg:min-h-[400px] overflow-hidden">
            <ChatHistory messages={messages} />
            
            {/* Audio Playing Indicator */}
            <AnimatePresence>
              {isPlayingAudio && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="px-4 py-2 bg-emerald-50 border-t border-emerald-100 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 text-emerald-600 text-sm">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    >
                      <Volume2 size={16} />
                    </motion.div>
                    <span className="font-medium">Ovoz o'qilmoqda...</span>
                  </div>
                  <button 
                    onClick={stopAudio}
                    className="p-1.5 hover:bg-emerald-100 rounded-lg text-emerald-600"
                  >
                    <VolumeX size={16} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Input Area */}
          <div className="mt-4 flex items-center gap-3">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleVoiceInput}
              disabled={isProcessing}
              className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white shadow-lg shadow-indigo-200 transition-all disabled:opacity-50 flex-shrink-0"
            >
              {isProcessing ? <Loader2 size={22} className="animate-spin" /> : <Mic size={22} />}
            </motion.button>
            
            <div className="flex-1 bg-white/80 backdrop-blur-xl rounded-full p-1.5 flex items-center shadow-lg shadow-slate-100/50 border border-slate-100">
              <input 
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Savol yozing..."
                disabled={isProcessing}
                className="flex-1 bg-transparent border-none px-4 py-2.5 font-medium focus:outline-none text-slate-700 placeholder:text-slate-400 disabled:opacity-50"
              />
              <button 
                onClick={() => handleSubmit()}
                disabled={isProcessing || !inputText.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 p-3 rounded-full text-white shadow-lg shadow-indigo-200 transition-all disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Visual Lesson */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full lg:w-[400px] flex-shrink-0"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl shadow-slate-100/50 border border-slate-100 sticky top-24">
            <div className="aspect-square bg-gradient-to-br from-slate-100 to-indigo-50 flex items-center justify-center relative">
              {currentImage ? (
                <img 
                  src={currentImage} 
                  alt="AI Generated Visual" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-8">
                  <ImageIcon size={60} className="mx-auto text-indigo-200 mb-4" />
                  <p className="text-slate-400 font-medium text-sm">Savol bering, rasm chiziladi</p>
                </div>
              )}
              {isGeneratingImage && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center">
                    <Loader2 size={40} className="text-indigo-600 animate-spin mx-auto mb-2" />
                    <p className="text-sm text-slate-500 font-medium">Rasm chizilmoqda...</p>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 lg:p-6 border-t border-slate-100">
              <p className="text-xs font-black text-indigo-600 uppercase tracking-[0.15em] mb-1">
                📸 Vizual darslik
              </p>
              <p className="text-slate-500 font-medium text-sm">
                Mavzuga doir avtomatik tasvir
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="py-4 lg:py-6 border-t border-slate-100 px-4 lg:px-6 flex flex-col sm:flex-row justify-between items-center gap-2">
        <button 
          onClick={() => setIsPolicyOpen(true)}
          className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-all font-bold text-[10px] uppercase tracking-[0.15em] group"
        >
          <div className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-indigo-100 transition-colors">
            <Info size={12} />
          </div>
          Sayt siyosati
        </button>
        
        <div className="text-center sm:text-right">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.1em]">
            I.I. Sayfiddinov metodikasi • 2026
          </p>
        </div>
      </footer>

      {/* --- SITE POLICY MODAL --- */}
      <AnimatePresence>
        {isPolicyOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={() => setIsPolicyOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 lg:p-10 max-w-xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setIsPolicyOpen(false)} 
                className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors"
              >
                <X size={18} />
              </button>
              
              <div className="text-center mb-6">
                <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <ShieldCheck size={28} className="text-indigo-600" />
                </div>
                <h2 className="text-xl font-black text-slate-800">Sayt Siyosati</h2>
              </div>
              
              <div className="space-y-4">
                <div className="bg-slate-50 rounded-xl p-4">
                  <h3 className="font-bold text-slate-800 mb-1 text-sm">Maqsad</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    Ushbu platforma Jomboy tumani 40-maktab o'quvchilari uchun STEAM yo'nalishlarini sun'iy intellekt yordamida o'rgatish maqsadida yaratilgan.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4">
                  <h3 className="font-bold text-slate-800 mb-2 text-sm">Hybrid AI Jamoasi</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 shadow-sm">
                      <Brain size={14} className="text-blue-500" /> DeepSeek (Fikrlash)
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 shadow-sm">
                      <Brain size={14} className="text-green-500" /> OpenAI (Til)
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 shadow-sm">
                      <Sparkles size={14} className="text-amber-500" /> Gemini (Nazorat)
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 shadow-sm">
                      <Volume2 size={14} className="text-emerald-500" /> ElevenLabs (Ovoz)
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 shadow-sm">
                      <Palette size={14} className="text-pink-500" /> DALL-E 3 (Tasvir)
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-4">
                  <h3 className="font-bold text-slate-800 mb-1 text-sm">Xavfsizlik</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    Barcha savollar faqat ta'lim sifatini oshirish uchun foydalaniladi. Ma'lumotlar maxfiy saqlanadi.
                  </p>
                </div>
              </div>

              <Button 
                onClick={() => setIsPolicyOpen(false)} 
                className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 rounded-xl text-base font-bold shadow-xl shadow-indigo-100 transition-all mt-6"
              >
                Tushunarli
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
