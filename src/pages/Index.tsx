import { motion } from "framer-motion";
import { 
  Cpu, 
  Bot, 
  Shield, 
  BarChart3,
  ChevronRight,
  Sparkles,
  Globe,
  Zap,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import WorldMap from "@/components/WorldMap";
import FeatureCard from "@/components/FeatureCard";

const features = [
  {
    icon: Cpu,
    title: "Raqamli transformatsiya",
    description: "Biznes jarayonlarni zamonaviy texnologiyalar asosida rivojlantirish va avtomatlashtirish."
  },
  {
    icon: Bot,
    title: "Sun'iy intellekt",
    description: "Aqlli tahlil, mashinali o'rganish va avtomatlashtirilgan qarorlar qabul qilish."
  },
  {
    icon: Shield,
    title: "Axborot xavfsizligi",
    description: "Kiberxavfsizlik, ma'lumotlarni himoyalash va xavfsiz infratuzilma."
  },
  {
    icon: BarChart3,
    title: "Innovatsion tahlil",
    description: "Big Data, strategik analitika va biznes intellekt yechimlari."
  }
];

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 grid-lines" />
        </div>
        
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(180 100% 50% / 0.1) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(280 100% 60% / 0.08) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* HEADER */}
      <header className="relative z-50 flex justify-between items-center px-6 md:px-10 lg:px-16 py-5 
                         border-b border-primary/20 backdrop-blur-sm bg-background/50">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center
                          border border-primary/30 shadow-[0_0_20px_rgba(0,217,255,0.3)]">
            <Globe className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-wider">
            <span className="text-primary neon-text">KELAJAK</span>
            <span className="text-foreground">.UZ</span>
          </h1>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex items-center space-x-8 text-sm text-muted-foreground"
        >
          {["Bosh sahifa", "Xizmatlar", "Biz haqimizda", "Aloqa"].map((item, i) => (
            <motion.a
              key={item}
              href="#"
              className="relative hover:text-primary transition-colors duration-300 py-2 group"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </motion.nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 bg-card/95 backdrop-blur-xl border-b border-primary/20 md:hidden"
          >
            <nav className="flex flex-col p-4 space-y-3">
              {["Bosh sahifa", "Xizmatlar", "Biz haqimizda", "Aloqa"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors py-2 px-4 rounded-lg hover:bg-primary/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </header>

      {/* Glowing divider line */}
      <div className="relative h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent">
        <div className="absolute inset-0 blur-sm bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>

      {/* HERO SECTION */}
      <section className="relative px-6 md:px-10 lg:px-16 pt-16 pb-8 md:pt-24 md:pb-12 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                     bg-primary/10 border border-primary/30 mb-8"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary font-medium">Innovatsiya va texnologiya</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
        >
          <span className="text-foreground">Kelajak texnologiyalari</span>
          <br />
          <span className="text-primary neon-text">bugundan boshlanadi</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground max-w-2xl mx-auto mb-12 text-base md:text-lg"
        >
          Sun'iy intellekt, raqamli yechimlar va global innovatsiyalar platformasi. 
          Bizning texnologiyalarimiz bilan kelajakka qadam qo'ying.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold
                       flex items-center gap-2 shadow-[0_0_30px_rgba(0,217,255,0.4)]
                       hover:shadow-[0_0_40px_rgba(0,217,255,0.6)] transition-shadow"
          >
            <Zap className="w-5 h-5" />
            Boshlash
            <ChevronRight className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-xl border border-primary/50 text-primary font-semibold
                       hover:bg-primary/10 transition-colors"
          >
            Ko'proq bilish
          </motion.button>
        </motion.div>

        {/* World Map Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative mx-auto max-w-6xl h-[300px] md:h-[400px] lg:h-[450px] rounded-3xl 
                     bg-gradient-to-br from-primary/5 via-card/50 to-neon-purple/5
                     border border-primary/30 backdrop-blur-xl overflow-hidden
                     shadow-[0_0_80px_rgba(0,217,255,0.15)]"
        >
          <WorldMap />
          
          {/* Map label */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 
                          rounded-full bg-background/80 border border-primary/30 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-muted-foreground">Global Network</span>
          </div>
          
          <div className="absolute bottom-4 right-4 text-xs text-muted-foreground/50">
            Real-time connections
          </div>
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section className="relative px-6 md:px-10 lg:px-16 py-16 md:py-24">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
          >
            <span className="text-foreground">Bizning</span>{" "}
            <span className="text-primary">xizmatlarimiz</span>
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            Zamonaviy texnologiyalar asosida yaratilgan innovatsion yechimlar
          </motion.p>
        </div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, i) => (
            <FeatureCard
              key={i}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={i * 0.1}
            />
          ))}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="relative px-6 md:px-10 lg:px-16 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                <span className="text-foreground">Texnologiya bilan</span><br />
                <span className="text-primary">kelajakni quramiz</span>
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Biz innovatsion texnologiyalar va sun'iy intellekt yechimlarini 
                ishlab chiqish orqali O'zbekistonda raqamli kelajakni shakllantirishga 
                hissa qo'shmoqdamiz.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Yuqori sifatli IT yechimlar",
                  "Tajribali mutaxassislar jamoasi",
                  "24/7 texnik qo'llab-quvvatlash",
                  "Global standartlarga mos xizmatlar"
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 text-muted-foreground"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(0,217,255,0.5)]" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Right visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-card/50 to-neon-purple/5
                              border border-primary/30 backdrop-blur-xl">
                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: "500+", label: "Loyihalar" },
                    { value: "150+", label: "Mijozlar" },
                    { value: "50+", label: "Mutaxassislar" },
                    { value: "99%", label: "Muvaffaqiyat" },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="text-center p-4 rounded-2xl bg-background/50 border border-primary/20"
                    >
                      <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-primary/50" />
                <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-primary/50" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-primary/20 bg-card/30 backdrop-blur-sm">
        <div className="px-6 md:px-10 lg:px-16 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              {/* Brand */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center
                                  border border-primary/30">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="text-xl font-bold">
                    <span className="text-primary">KELAJAK</span>
                    <span className="text-foreground">.UZ</span>
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Sun'iy intellekt va innovatsion texnologiyalar bilan 
                  O'zbekistonda raqamli kelajakni quramiz.
                </p>
              </div>

              {/* Links */}
              <div>
                <h5 className="font-semibold mb-4 text-foreground">Sahifalar</h5>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {["Bosh sahifa", "Xizmatlar", "Biz haqimizda", "Aloqa"].map((item) => (
                    <li key={item}>
                      <a href="#" className="hover:text-primary transition-colors">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h5 className="font-semibold mb-4 text-foreground">Aloqa</h5>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>info@kelajak.uz</li>
                  <li>+998 XX XXX XX XX</li>
                  <li>Toshkent, O'zbekiston</li>
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © 2026 KELAJAK.UZ — Barcha huquqlar himoyalangan
              </p>
              <p className="text-xs text-muted-foreground/50">
                Yaratuvchi: Narzikulov Amirxon Anvarovich
              </p>
            </div>
          </div>
        </div>

        {/* Gradient line at bottom */}
        <div className="h-1 bg-gradient-to-r from-primary via-neon-purple to-accent" />
      </footer>
    </div>
  );
};

export default Index;
