import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{ 
        scale: 1.03, 
        y: -8,
        transition: { duration: 0.3 }
      }}
      className="group relative bg-gradient-to-br from-card/80 via-card/60 to-card/40 
                 backdrop-blur-xl rounded-2xl p-7 
                 border border-primary/20 hover:border-primary/50
                 transition-all duration-500 
                 shadow-lg hover:shadow-[0_10px_40px_rgba(0,217,255,0.15)]
                 overflow-hidden"
    >
      {/* Animated glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-neon-purple/5 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Top corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Icon container with glow */}
      <div className="relative w-16 h-16 mb-6 rounded-full 
                      bg-gradient-to-br from-primary/30 to-primary/10
                      flex items-center justify-center
                      group-hover:from-primary/40 group-hover:to-primary/20 
                      transition-all duration-500
                      shadow-[0_0_25px_rgba(0,217,255,0.25)]
                      group-hover:shadow-[0_0_40px_rgba(0,217,255,0.5)]">
        <Icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform duration-300" />
        
        {/* Outer rotating ring */}
        <motion.div
          className="absolute inset-[-4px] rounded-full border border-primary/20 group-hover:border-primary/40"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary/30"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.2, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Content */}
      <h3 className="relative text-lg font-bold text-foreground mb-3 
                     group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      <p className="relative text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>

      {/* Bottom accent line with animation */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: delay + 0.3 }}
      />
      
      {/* Corner decorations */}
      <div className="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-primary/30 
                      group-hover:border-primary/60 transition-colors duration-300" />
    </motion.div>
  );
};

export default FeatureCard;
