import { GraduationCap, BrainCircuit, Volume2, Globe, ShieldCheck, Award, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useAITeacher } from '@/hooks/useAITeacher';
import { MicrophoneButton } from '@/components/MicrophoneButton';
import { AIResponseCard } from '@/components/AIResponseCard';
import { AIImageCard } from '@/components/AIImageCard';
import { FeatureBadge } from '@/components/FeatureBadge';
import { TextInput } from '@/components/TextInput';

const Index = () => {
  const { 
    isProcessing, 
    currentResponse, 
    currentImage, 
    isPlayingAudio, 
    askQuestion 
  } = useAITeacher();

  const displayResponse = currentResponse || "Sizni eshityapman, savol bering...";

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Navigation */}
      <nav className="h-20 bg-card border-b sticky top-0 z-50 px-6 lg:px-8 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-2xl text-primary-foreground shadow-lg">
            <GraduationCap size={24} />
          </div>
          <span className="text-xl lg:text-2xl font-black tracking-tighter">USTOZ.AI</span>
        </div>
        
        <div className="hidden lg:flex gap-4 items-center">
          <FeatureBadge icon={<BrainCircuit size={14} />} text="ChatGPT-4" />
          <FeatureBadge icon={<Volume2 size={14} />} text="ElevenLabs" variant="secondary" />
          <FeatureBadge icon={<Globe size={14} />} text="DALL-E 3" variant="accent" />
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-accent px-4 py-2 rounded-xl">
            <Zap size={16} className="text-primary" />
            <span className="text-sm font-bold">0 XP</span>
          </div>
          <Button className="rounded-xl px-6 font-bold">
            <Award size={16} className="mr-2" />
            <span className="hidden sm:inline">Guvohnoma</span>
          </Button>
        </div>
      </nav>

      <main className="container mx-auto py-8 lg:py-12 px-4 lg:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          
          {/* Left Side: Interaction Center */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h1 className="text-4xl lg:text-6xl font-black leading-tight tracking-tighter">
                Kelajak <br/>
                <span className="text-primary italic underline decoration-wavy decoration-primary/30">
                  Shu Yerda!
                </span>
              </h1>
              <p className="text-lg text-muted-foreground font-medium">
                Jomboy 40-maktab STEAM laboratoriyasi uchun maxsus.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <AIResponseCard 
                response={displayResponse} 
                isPlayingAudio={isPlayingAudio} 
              />
              
              <div className="flex flex-col items-center mt-8">
                <MicrophoneButton 
                  onResult={askQuestion} 
                  isProcessing={isProcessing} 
                />
                <TextInput 
                  onSubmit={askQuestion} 
                  isProcessing={isProcessing} 
                />
              </div>
            </motion.div>
          </div>

          {/* Right Side: Visual & Official Section */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <AIImageCard 
                imageUrl={currentImage} 
                isLoading={isProcessing && !currentImage} 
              />
            </motion.div>

            {/* Official Partners */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-primary p-6 lg:p-8 rounded-[2rem] text-primary-foreground flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <ShieldCheck size={100} />
              </div>
              <div className="relative z-10">
                <h4 className="text-[10px] font-black text-primary-foreground/70 uppercase tracking-[0.4em] mb-2">
                  Tashkilotchi
                </h4>
                <p className="text-base lg:text-lg font-bold">
                  Jomboy tumani 40-IDUM
                </p>
                <span className="text-primary-foreground/60 font-medium italic text-sm">
                  Ismailova N.I. metodikasi
                </span>
              </div>
              <div className="text-right relative z-10">
                <div className="text-3xl lg:text-4xl font-black opacity-80">2026</div>
                <div className="text-[10px] text-primary-foreground/40 uppercase tracking-widest">
                  Innovation
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <footer className="py-8 lg:py-12 border-t text-center">
        <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.3em] mb-2">
          Samarqand viloyati Jomboy tumani 40-ixtisoslashtirilgan maktabi
        </p>
        <p className="text-muted-foreground/50 text-[10px] uppercase tracking-[0.5em]">
          Ustoz.AI • STEAM Ecosystem • Built with Lovable
        </p>
      </footer>
    </div>
  );
};

export default Index;
