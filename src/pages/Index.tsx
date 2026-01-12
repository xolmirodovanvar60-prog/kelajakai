import { useState, useRef } from 'react';
import { 
  GraduationCap, Info, X, ShieldCheck, Send, Image as ImageIcon,
  Brain, Volume2, Palette, Mic, Loader2, Trash2, VolumeX, Sparkles, Eye, AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useHybridAITeacher, UploadedFile } from '@/hooks/useHybridAITeacher';
import { ChatHistory } from '@/components/ChatHistory';
import { FileUploadButton } from '@/components/FileUploadButton';
import { ExportButton } from '@/components/ExportButton';
import { useSecurityProtection } from '@/hooks/useSecurityProtection';
import { useRateLimiter } from '@/hooks/useRateLimiter';
import { toast } from 'sonner';

const Index = () => {
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [honeypotValue, setHoneypotValue] = useState('');
  
  useSecurityProtection();
  const { isBlocked, remainingRequests, checkRateLimit } = useRateLimiter({ maxRequests: 5, windowMs: 60000 });
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { 
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
  } = useHybridAITeacher();

  const handleSubmit = (text?: string) => {
    if (honeypotValue) {
      console.log('Bot detected');
      return;
    }
    
    const query = text || inputText;
    if (!query.trim() && selectedFiles.length === 0) return;
    if (isProcessing) return;
    
    if (!checkRateLimit()) {
      toast.error('So\'rov limiti oshdi. Iltimos, 1 daqiqa kuting.', {
        icon: <AlertTriangle className="text-amber-500" />,
      });
      return;
    }
    
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

  const handleFileSelect = (files: UploadedFile[]) => {
    addFiles(files);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground flex flex-col relative overflow-hidden">
      
      {/* Animated Grid Background */}
      <div className="fixed inset-0 grid-lines opacity-50 pointer-events-none" />
      
      {/* Neon Lines */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Horizontal neon lines */}
        <motion.div 
          className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-60"
          style={{ top: '15%' }}
          animate={{ 
            opacity: [0.3, 0.8, 0.3],
            scaleX: [0.8, 1, 0.8]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-40"
          style={{ top: '85%' }}
          animate={{ 
            opacity: [0.2, 0.6, 0.2],
            scaleX: [0.9, 1, 0.9]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        {/* Vertical neon lines */}
        <motion.div 
          className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-neon-pink to-transparent opacity-40"
          style={{ left: '10%' }}
          animate={{ 
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-neon-cyan to-transparent opacity-30"
          style={{ right: '10%' }}
          animate={{ 
            opacity: [0.1, 0.4, 0.1]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>
      
      {/* --- HEADER --- */}
      <nav className="h-16 lg:h-20 glass-panel border-b border-primary/20 sticky top-0 z-50 px-4 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2 lg:gap-3">
          <motion.div 
            className="bg-gradient-to-br from-primary via-secondary to-accent p-2 lg:p-2.5 rounded-xl lg:rounded-2xl text-primary-foreground neon-glow"
            animate={{ 
              boxShadow: [
                '0 0 10px hsl(180 100% 50% / 0.5)',
                '0 0 30px hsl(180 100% 50% / 0.8)',
                '0 0 10px hsl(180 100% 50% / 0.5)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <GraduationCap size={18} className="lg:w-[22px] lg:h-[22px]" />
          </motion.div>
          <div>
            <span className="text-lg lg:text-2xl font-black tracking-tighter text-foreground neon-text" style={{ textShadow: '0 0 10px hsl(180 100% 50% / 0.5)' }}>
              USTOZ.AI
            </span>
            <div className="flex items-center gap-1 text-[10px] text-primary">
              <Sparkles size={10} className="text-accent" />
              <span className="font-bold">Multimodal AI</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <ExportButton messages={messages} disabled={isProcessing} />
          {messages.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={clearHistory}
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 size={16} />
              <span className="hidden sm:inline ml-1">Tozalash</span>
            </Button>
          )}
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 container mx-auto py-4 lg:py-8 px-4 lg:px-6 flex flex-col lg:flex-row gap-4 lg:gap-8 relative z-10">
        
        {/* LEFT SIDE: Chat Interface */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Chat Header */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <h1 className="text-2xl lg:text-4xl font-black leading-tight tracking-tighter text-foreground">
              Kelajak{' '}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent italic neon-text">
                Shu Yerda!
              </span>
            </h1>
            <p className="text-sm lg:text-base text-muted-foreground font-medium">
              Jomboy tuman 46-maktab STEAM labaratoriyasi
            </p>
            {/* Features indicator */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              <span className="inline-flex items-center gap-1 bg-primary/20 text-primary border border-primary/30 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                <Eye size={10} /> Rasm tahlili
              </span>
              <span className="inline-flex items-center gap-1 bg-secondary/20 text-secondary border border-secondary/30 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                📄 Hujjat o'qish
              </span>
              <span className="inline-flex items-center gap-1 bg-accent/20 text-accent border border-accent/30 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                🧮 LaTeX formulalar
              </span>
              <span className="inline-flex items-center gap-1 bg-neon-cyan/20 text-primary border border-primary/30 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                🌍 Ko'p tilli
              </span>
            </div>
          </motion.div>

          {/* Chat History - Holographic Glass Panel */}
          <div className="flex-1 glass-panel holographic-border rounded-3xl flex flex-col min-h-[300px] lg:min-h-[400px] overflow-hidden">
            <ChatHistory messages={messages} onPlayAudio={speakResponse} isPlayingAudio={isPlayingAudio} />
            
            {/* Audio Playing Indicator */}
            <AnimatePresence>
              {isPlayingAudio && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="px-4 py-2 bg-primary/20 border-t border-primary/30 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 text-primary text-sm">
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
                    className="p-1.5 hover:bg-primary/20 rounded-lg text-primary"
                  >
                    <VolumeX size={16} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Input Area */}
          <div className="mt-4 flex items-center gap-2">
            {/* File Upload Button */}
            <FileUploadButton 
              onFileSelect={handleFileSelect}
              selectedFiles={selectedFiles}
              onRemoveFile={removeFile}
              disabled={isProcessing}
            />
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleVoiceInput}
              disabled={isProcessing}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center text-primary-foreground neon-glow transition-all disabled:opacity-50 flex-shrink-0"
            >
              {isProcessing ? <Loader2 size={20} className="animate-spin" /> : <Mic size={20} />}
            </motion.button>
            
            <div className="flex-1 glass-panel rounded-full p-1.5 flex items-center border border-primary/30 relative">
              {/* Honeypot field */}
              <input 
                type="text"
                name="website"
                value={honeypotValue}
                onChange={(e) => setHoneypotValue(e.target.value)}
                className="absolute -left-[9999px] w-0 h-0 opacity-0 pointer-events-none"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              
              <input 
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder={selectedFiles.length > 0 ? "Fayl haqida savol yozing..." : "Savol yozing..."}
                disabled={isProcessing || isBlocked}
                className="flex-1 bg-transparent border-none px-4 py-2.5 font-medium focus:outline-none text-foreground placeholder:text-muted-foreground disabled:opacity-50"
              />
              
              {/* Rate limit indicator */}
              {remainingRequests < 5 && (
                <span className="text-[10px] text-muted-foreground mr-2 font-medium">
                  {remainingRequests}/5
                </span>
              )}
              
              <button 
                onClick={() => handleSubmit()}
                disabled={isProcessing || isBlocked || (!inputText.trim() && selectedFiles.length === 0)}
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 p-3 rounded-full text-primary-foreground neon-glow transition-all disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Visual Lesson - Holographic Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full lg:w-[400px] flex-shrink-0"
        >
          <div className="glass-panel holographic-border rounded-3xl overflow-hidden sticky top-24">
            <div className="aspect-square bg-gradient-to-br from-card to-muted flex items-center justify-center relative">
              {currentImage ? (
                <img 
                  src={currentImage} 
                  alt="AI Generated Visual" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-8">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <ImageIcon size={60} className="mx-auto text-primary/50 mb-4" />
                  </motion.div>
                  <p className="text-muted-foreground font-medium text-sm">Savol bering, rasm chiziladi</p>
                </div>
              )}
              {isGeneratingImage && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center">
                    <Loader2 size={40} className="text-primary animate-spin mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground font-medium">Rasm chizilmoqda...</p>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 lg:p-6 border-t border-primary/20">
              <p className="text-xs font-black text-primary uppercase tracking-[0.15em] mb-1 neon-text">
                📸 Vizual darslik
              </p>
              <p className="text-muted-foreground font-medium text-sm">
                Mavzuga doir avtomatik tasvir
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="py-4 lg:py-6 border-t border-primary/20 px-4 lg:px-6 flex flex-col sm:flex-row justify-between items-center gap-2 relative z-10">
        <button 
          onClick={() => setIsPolicyOpen(true)}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-all font-bold text-[10px] uppercase tracking-[0.15em] group"
        >
          <div className="p-1.5 rounded-lg bg-muted group-hover:bg-primary/20 transition-colors">
            <Info size={12} />
          </div>
          Sayt siyosati
        </button>
      </footer>

      {/* --- SITE POLICY MODAL --- */}
      <AnimatePresence>
        {isPolicyOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            onClick={() => setIsPolicyOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel holographic-border rounded-3xl p-6 lg:p-10 max-w-xl w-full relative max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setIsPolicyOpen(false)} 
                className="absolute top-4 right-4 p-2 hover:bg-muted rounded-xl text-muted-foreground transition-colors"
              >
                <X size={18} />
              </button>
              
              <div className="text-center mb-6">
                <motion.div 
                  className="w-14 h-14 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-primary/30"
                  animate={{
                    boxShadow: [
                      '0 0 10px hsl(180 100% 50% / 0.3)',
                      '0 0 20px hsl(180 100% 50% / 0.5)',
                      '0 0 10px hsl(180 100% 50% / 0.3)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ShieldCheck size={28} className="text-primary" />
                </motion.div>
                <h2 className="text-xl font-black text-foreground">Sayt Siyosati</h2>
              </div>
              
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-xl p-4 border border-primary/20">
                  <h3 className="font-bold text-foreground mb-1 text-sm">Maqsad</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    Ushbu platforma Samarqand viloyati Jomboy tumani 46-sonli umumta'lim maktabining 7-"B" sinf o'quvchisi, yosh dasturchi Narzikulov Amirxon Anvarovich tomonidan maktab yoshidagi o'quvchilar uchun maxsus ishlab chiqildi.
                  </p>
                </div>

                <div className="bg-muted/50 rounded-xl p-4 border border-primary/20">
                  <h3 className="font-bold text-foreground mb-2 text-sm">Imkoniyatlar</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-card px-3 py-1.5 rounded-lg text-xs font-semibold text-foreground border border-primary/30">
                      <Brain size={14} className="text-primary" /> Sun'iy intellekt
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-card px-3 py-1.5 rounded-lg text-xs font-semibold text-foreground border border-primary/30">
                      🌍 Ko'p tilli qo'llab-quvvatlash
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-card px-3 py-1.5 rounded-lg text-xs font-semibold text-foreground border border-primary/30">
                      <Volume2 size={14} className="text-secondary" /> Ovozli javob
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-card px-3 py-1.5 rounded-lg text-xs font-semibold text-foreground border border-primary/30">
                      <Palette size={14} className="text-accent" /> Rasm yaratish
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-card px-3 py-1.5 rounded-lg text-xs font-semibold text-foreground border border-primary/30">
                      📄 Fayl tahlili
                    </span>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-xl p-4 border border-primary/20">
                  <h3 className="font-bold text-foreground mb-1 text-sm">Xavfsizlik</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    Barcha savollar faqat ta'lim sifatini oshirish uchun foydalaniladi. Ma'lumotlar maxfiy saqlanadi.
                  </p>
                </div>
                
                <div className="bg-destructive/10 rounded-xl p-4 border border-destructive/30">
                  <h3 className="font-bold text-destructive mb-1 text-sm flex items-center gap-2">
                    <ShieldCheck size={14} />
                    Mualliflik huquqi
                  </h3>
                  <p className="text-destructive/80 leading-relaxed text-sm">
                    Barcha huquqlar himoyalangan. Platforma kodi va kontentidan ruxsatsiz foydalanish, nusxa ko'chirish yoki tarqatish qat'iyan taqiqlanadi. 
                    © 2024 Narzikulov Amirxon Anvarovich. Barcha huquqlar himoyalangan.
                  </p>
                </div>
              </div>

              <Button 
                onClick={() => setIsPolicyOpen(false)} 
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 h-12 rounded-xl text-base font-bold neon-glow transition-all mt-6"
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
