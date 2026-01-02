import { useState } from 'react';
import { 
  GraduationCap, Info, X, ShieldCheck, Send, Image as ImageIcon,
  Brain, Volume2, Palette, Mic, Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useAITeacher } from '@/hooks/useAITeacher';

const Index = () => {
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  
  const { 
    isProcessing, 
    currentResponse, 
    currentImage, 
    isPlayingAudio, 
    askQuestion 
  } = useAITeacher();

  const displayResponse = currentResponse || "Sizni eshityapman, savol bering...";

  const handleSubmit = (text?: string) => {
    const query = text || inputText;
    if (!query.trim()) return;
    askQuestion(query);
    setInputText('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 font-sans text-foreground">
      
      {/* --- HEADER --- */}
      <nav className="h-20 bg-white/70 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-50 px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2.5 rounded-2xl text-white shadow-lg shadow-indigo-200">
            <GraduationCap size={22} />
          </div>
          <span className="text-xl lg:text-2xl font-black tracking-tighter text-slate-800">USTOZ.AI</span>
        </div>
        
        <Button className="rounded-[3rem] px-8 h-12 font-bold bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all">
          Guvohnoma
        </Button>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="container mx-auto py-8 lg:py-16 px-4 lg:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          
          {/* LEFT SIDE: Interaction Center */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h1 className="text-4xl lg:text-6xl font-black leading-tight tracking-tighter text-slate-900">
                Kelajak <br/>
                <span className="text-indigo-600 italic underline decoration-wavy decoration-indigo-200">
                  Shu Yerda!
                </span>
              </h1>
              <p className="text-lg text-slate-500 font-medium">
                Jomboy 40-maktab STEAM laboratoriyasi uchun maxsus.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              {/* AI Response Card */}
              <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] p-8 shadow-xl shadow-slate-100/50 border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse" />
                  <span className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                    AI Ustoz Javobi:
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed font-medium text-lg">
                  "{displayResponse}"
                </p>
              </div>
              
              {/* Microphone & Input */}
              <div className="flex flex-col items-center gap-6">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    // Trigger speech recognition
                    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
                    if (!SpeechRecognition) return;
                    const recognition = new SpeechRecognition();
                    recognition.lang = 'uz-UZ';
                    recognition.onresult = (event: any) => handleSubmit(event.results[0][0].transcript);
                    recognition.start();
                  }}
                  disabled={isProcessing}
                  className="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white shadow-[0_20px_40px_rgba(79,70,229,0.35)] transition-all disabled:opacity-50"
                >
                  {isProcessing ? <Loader2 size={40} className="animate-spin" /> : <Mic size={40} />}
                </motion.button>
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                  {isProcessing ? "Tahlil qilmoqda..." : "Mikrofonni bosing"}
                </span>
                
                {/* Text Input */}
                <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-[3rem] p-2 flex items-center shadow-lg shadow-slate-100/50 border border-slate-100">
                  <input 
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    placeholder="Yoki yozing..."
                    className="flex-1 bg-transparent border-none px-6 py-3 font-medium focus:outline-none text-slate-700 placeholder:text-slate-400"
                  />
                  <button 
                    onClick={() => handleSubmit()}
                    disabled={isProcessing || !inputText.trim()}
                    className="bg-indigo-600 hover:bg-indigo-700 p-4 rounded-full text-white shadow-lg shadow-indigo-200 transition-all disabled:opacity-50"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Visual Lesson */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] overflow-hidden shadow-xl shadow-slate-100/50 border border-slate-100">
              <div className="aspect-square bg-gradient-to-br from-slate-100 to-indigo-50 flex items-center justify-center relative">
                {currentImage ? (
                  <img 
                    src={currentImage} 
                    alt="AI Generated Visual" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-8">
                    <ImageIcon size={80} className="mx-auto text-indigo-200 mb-4" />
                    <p className="text-slate-400 font-medium">Savol bering, rasm chiziladi</p>
                  </div>
                )}
                {isProcessing && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                    <Loader2 size={48} className="text-indigo-600 animate-spin" />
                  </div>
                )}
              </div>
              <div className="p-6 lg:p-8 border-t border-slate-100">
                <p className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em] mb-1">
                  📸 Vizual darslik
                </p>
                <p className="text-slate-500 font-medium">
                  Mavzuga doir avtomatik tasvir
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="py-8 lg:py-12 border-t border-slate-100 px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <button 
          onClick={() => setIsPolicyOpen(true)}
          className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-all font-black text-[11px] uppercase tracking-[0.2em] group"
        >
          <motion.div 
            whileHover={{ rotate: 15 }}
            className="p-2 rounded-xl bg-slate-100 group-hover:bg-indigo-100 transition-colors"
          >
            <Info size={14} />
          </motion.div>
          Sayt siyosati
        </button>
        
        <div className="text-center sm:text-right">
          <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.15em]">
            I.I. Sayfiddinov metodikasi • 2026
          </p>
          <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em]">
            Jomboy tumani 40-maktab
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
              className="bg-white rounded-[3rem] p-8 lg:p-12 max-w-xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setIsPolicyOpen(false)} 
                className="absolute top-6 right-6 p-3 hover:bg-slate-100 rounded-2xl text-slate-400 transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck size={32} className="text-indigo-600" />
                </div>
                <h2 className="text-2xl font-black text-slate-800">Sayt Siyosati</h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-slate-50 rounded-2xl p-6">
                  <h3 className="font-bold text-slate-800 mb-2">Maqsad</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Ushbu platforma Jomboy tumani 40-maktab o'quvchilari uchun STEAM (fan, texnologiya, muhandislik, san'at va matematika) yo'nalishlarini sun'iy intellekt yordamida zamonaviy usulda o'rgatish maqsadida yaratilgan.
                  </p>
                </div>
                
                <div className="bg-slate-50 rounded-2xl p-6">
                  <h3 className="font-bold text-slate-800 mb-2">Nima ish qiladi?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Platforma o'quvchining ovozli yoki matnli savollarini qabul qiladi va ularni I.I. Sayfiddinov metodikasi asosida tahlil qiladi. Tizim o'zbek tilida ilmiy-ijodiy javob qaytaradi hamda dars mavzusini tasavvur qilish uchun avtomatik ravishda vizual rasmlar chizadi.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6">
                  <h3 className="font-bold text-slate-800 mb-3">AI Jamoasi</h3>
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 shadow-sm">
                      <Brain size={16} className="text-indigo-500" /> ChatGPT (Mantiq)
                    </span>
                    <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 shadow-sm">
                      <Volume2 size={16} className="text-emerald-500" /> ElevenLabs (Ovoz)
                    </span>
                    <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 shadow-sm">
                      <Palette size={16} className="text-pink-500" /> DALL-E 3 (Tasvir)
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6">
                  <h3 className="font-bold text-slate-800 mb-2">Xavfsizlik va Maxfiylik</h3>
                  <p className="text-slate-600 leading-relaxed">
                    O'quvchilar tomonidan berilgan barcha savollar faqat ta'lim sifatini oshirish va sun'iy intellekt modellarini STEAM fanlariga moslashtirish uchun foydalaniladi. Ma'lumotlar maxfiy saqlanadi va uchinchi shaxslarga berilmaydi.
                  </p>
                </div>
              </div>

              <Button 
                onClick={() => setIsPolicyOpen(false)} 
                className="w-full bg-indigo-600 hover:bg-indigo-700 h-14 rounded-2xl text-lg font-bold shadow-xl shadow-indigo-100 transition-all mt-8"
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
