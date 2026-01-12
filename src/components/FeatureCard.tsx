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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="group relative bg-card/50 backdrop-blur-xl rounded-2xl p-6 border border-primary/20 
                 hover:border-primary/60 transition-all duration-300 
                 shadow-lg hover:shadow-primary/20"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Icon container */}
      <div className="relative w-14 h-14 mb-5 rounded-full bg-primary/20 
                      flex items-center justify-center
                      group-hover:bg-primary/30 transition-colors duration-300
                      shadow-[0_0_20px_rgba(0,217,255,0.2)]
                      group-hover:shadow-[0_0_30px_rgba(0,217,255,0.4)]">
        <Icon className="w-7 h-7 text-primary" />
        
        {/* Rotating ring */}
        <motion.div
          className="absolute inset-0 rounded-full border border-primary/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Content */}
      <h3 className="relative text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="relative text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
        initial={{ width: 0 }}
        whileInView={{ width: "60%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: delay + 0.3 }}
      />
    </motion.div>
  );
};

export default FeatureCard;
