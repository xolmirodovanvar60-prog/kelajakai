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
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ 
        y: -6,
        transition: { duration: 0.25 }
      }}
      className="group bg-white rounded-xl p-6 md:p-7
                 border border-slate-100
                 shadow-[0_4px_20px_rgba(0,0,0,0.06)] 
                 hover:shadow-[0_8px_30px_rgba(37,99,235,0.12)]
                 transition-all duration-300"
    >
      {/* Icon container */}
      <div className="w-14 h-14 mb-5 rounded-xl 
                      bg-blue-50 border border-blue-100
                      flex items-center justify-center
                      group-hover:bg-blue-100 
                      transition-colors duration-300">
        <Icon className="w-6 h-6 text-blue-600 stroke-[1.5]" />
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-slate-800 mb-2 
                     group-hover:text-blue-600 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;
