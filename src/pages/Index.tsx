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
    <div className="min-h-screen bg-white text-slate-800 font-sans overflow-x-hidden">

      {/* HEADER */}
      <header className="relative z-50 flex justify-between items-center px-6 md:px-10 lg:px-16 py-5 
                         border-b border-slate-100 bg-white">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center
                          border border-blue-100">
            <Globe className="w-5 h-5 text-blue-600" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-wider">
            <span className="text-blue-600">KELAJAK</span>
            <span className="text-slate-800">.UZ</span>
          </h1>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex items-center space-x-8 text-sm text-slate-600"
        >
          {["Bosh sahifa", "Xizmatlar", "Biz haqimizda", "Aloqa"].map((item, i) => (
            <motion.a
              key={item}
              href="#"
              className="relative hover:text-blue-600 transition-colors duration-300 py-2 group"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </motion.nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 text-blue-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-lg md:hidden"
          >
            <nav className="flex flex-col p-4 space-y-3">
              {["Bosh sahifa", "Xizmatlar", "Biz haqimizda", "Aloqa"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-slate-600 hover:text-blue-600 transition-colors py-2 px-4 rounded-lg hover:bg-blue-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative px-6 md:px-10 lg:px-16 pt-16 pb-8 md:pt-24 md:pb-12 text-center bg-[#F8F9FB]">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                     bg-blue-50 border border-blue-100 mb-8"
        >
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-blue-600 font-medium">Innovatsiya va texnologiya</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
        >
          <span className="text-slate-800">Kelajak texnologiyalari</span>
          <br />
          <span className="text-blue-600">bugundan boshlanadi</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 max-w-2xl mx-auto mb-12 text-base md:text-lg"
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
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold
                       flex items-center gap-2 shadow-[0_4px_14px_rgba(37,99,235,0.3)]
                       hover:bg-blue-700 hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] transition-all"
          >
            <Zap className="w-5 h-5" />
            Boshlash
            <ChevronRight className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 rounded-lg border border-slate-300 text-slate-700 font-semibold
                       hover:border-blue-600 hover:text-blue-600 transition-colors"
          >
            Ko'proq bilish
          </motion.button>
        </motion.div>

        {/* World Map Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative mx-auto max-w-6xl h-[300px] md:h-[400px] lg:h-[450px] rounded-2xl 
                     bg-white border border-slate-200 overflow-hidden
                     shadow-[0_4px_30px_rgba(0,0,0,0.08)]"
        >
          <WorldMap />
          
          {/* Map label */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 
                          rounded-full bg-white border border-slate-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-xs text-slate-600">Global Network</span>
          </div>
          
          <div className="absolute bottom-4 right-4 text-xs text-slate-400">
            Real-time connections
          </div>
        </motion.div>
      </section>

      {/* FEATURES SECTION - Light Theme */}
      <section id="xizmatlar" className="relative px-6 md:px-10 lg:px-16 py-20 md:py-28 bg-[#F8F9FB]">
        {/* Section header */}
        <div className="text-center mb-14 md:mb-16 max-w-3xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-slate-800"
          >
            Bizning xizmatlarimiz
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-base md:text-lg leading-relaxed"
          >
            Zamonaviy texnologiyalar asosida yaratilgan innovatsion yechimlar
          </motion.p>
        </div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
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

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3.5 rounded-lg bg-blue-600 text-white font-medium
                       hover:bg-blue-700 transition-all duration-200
                       shadow-[0_4px_14px_rgba(37,99,235,0.3)] 
                       hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)]
                       flex items-center gap-2 mx-auto"
          >
            Biz bilan bog'laning
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </section>

      {/* ABOUT SECTION */}
      <section className="relative px-6 md:px-10 lg:px-16 py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                <span className="text-slate-800">Texnologiya bilan</span><br />
                <span className="text-blue-600">kelajakni quramiz</span>
              </h3>
              <p className="text-slate-500 mb-6 leading-relaxed">
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
                    className="flex items-center gap-3 text-slate-600"
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
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
              <div className="relative p-8 rounded-2xl bg-[#F8F9FB] border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
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
                      className="text-center p-4 rounded-xl bg-white border border-slate-100 shadow-sm"
                    >
                      <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-slate-500">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-slate-200 bg-[#F8F9FB]">
        <div className="px-6 md:px-10 lg:px-16 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              {/* Brand */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center
                                  border border-blue-100">
                    <Globe className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-bold">
                    <span className="text-blue-600">KELAJAK</span>
                    <span className="text-slate-800">.UZ</span>
                  </h4>
                </div>
                <p className="text-sm text-slate-500 max-w-sm">
                  Sun'iy intellekt va innovatsion texnologiyalar bilan 
                  O'zbekistonda raqamli kelajakni quramiz.
                </p>
              </div>

              {/* Links */}
              <div>
                <h5 className="font-semibold mb-4 text-slate-800">Sahifalar</h5>
                <ul className="space-y-2 text-sm text-slate-500">
                  {["Bosh sahifa", "Xizmatlar", "Biz haqimizda", "Aloqa"].map((item) => (
                    <li key={item}>
                      <a href="#" className="hover:text-blue-600 transition-colors">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h5 className="font-semibold mb-4 text-slate-800">Aloqa</h5>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li>info@kelajak.uz</li>
                  <li>+998 XX XXX XX XX</li>
                  <li>Toshkent, O'zbekiston</li>
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-slate-500">
                © 2026 KELAJAK.UZ — Barcha huquqlar himoyalangan
              </p>
              <p className="text-xs text-slate-400">
                Yaratuvchi: Narzikulov Amirxon Anvarovich
              </p>
            </div>
          </div>
        </div>

        {/* Simple accent line at bottom */}
        <div className="h-1 bg-blue-600" />
      </footer>
    </div>
  );
};

export default Index;
