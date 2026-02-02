import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LivingBookSectionProps {
  onOpenBook: () => void;
}

export function LivingBookSection({ onOpenBook }: LivingBookSectionProps) {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Background magic particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `hsl(${280 + Math.random() * 60}, 100%, 70%)`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Animated Book */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Magic glow */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, hsl(280, 100%, 50%, 0.3) 0%, transparent 70%)',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Book container */}
              <motion.div
                className="relative z-10 w-full h-full flex items-center justify-center"
                animate={{
                  y: [0, -15, 0],
                  rotateY: [0, 5, 0, -5, 0],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* Book base */}
                <div className="relative">
                  <motion.div
                    className="glass-panel p-8 rounded-2xl holographic-border"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring' }}
                  >
                    <BookOpen 
                      className="w-32 h-32 md:w-40 md:h-40 text-secondary" 
                      strokeWidth={1}
                    />
                  </motion.div>

                  {/* Flying sparkles */}
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        left: '50%',
                        top: '50%',
                      }}
                      animate={{
                        x: [0, (i - 2) * 60],
                        y: [0, -80 - i * 20],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    >
                      <Sparkles className="w-6 h-6 text-accent" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 text-center lg:text-left"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-accent text-sm font-medium mb-6">
              <Wand2 className="w-4 h-4" />
              Magical Experience
            </span>

            <h2 className="text-4xl md:text-5xl font-black mb-6">
              The{' '}
              <span className="bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent">
                Living Book
              </span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8">
              Open the enchanted pages and watch stories come to life! 
              Dragons fly, worlds unfold, and adventures await within 
              this magical tome of infinite knowledge.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                'Interactive 3D animations',
                'AI-generated story continuations',
                'Voice narration in multiple languages',
                'Educational games and quizzes',
              ].map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-3 text-muted-foreground"
                >
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-secondary to-accent" />
                  {feature}
                </motion.li>
              ))}
            </ul>

            <Button
              onClick={onOpenBook}
              size="lg"
              className="px-8 py-6 text-lg font-bold bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-secondary-foreground neon-glow-purple"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Open the Book
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
