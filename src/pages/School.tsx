import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Users,
  Award,
  BookOpen,
  Microscope,
  Globe,
  Trophy,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import SchoolHeader from '@/components/school/SchoolHeader';
import SchoolFooter from '@/components/school/SchoolFooter';
import StatCounter from '@/components/school/StatCounter';
import FeatureCard from '@/components/school/FeatureCard';
import NewsCard from '@/components/school/NewsCard';

const School = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SchoolHeader isScrolled={isScrolled} />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-blue-800/90 to-blue-900/95" />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 mb-6"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-amber-200 font-medium">Jomboy tumani eng yaxshi ixtisoslashtirilgan maktabi</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Jomboy tuman 40-ixtisoslashtirilgan<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                umumta'lim maktabi
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto">
              Sifatli ta'lim - porloq kelajak
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold shadow-xl"
              >
                <a href="#admission">Hujjat topshirish</a>
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-2 border-white text-white hover:bg-white hover:text-blue-900 font-bold"
              >
                <a href="#virtual-tour">Virtual sayohat</a>
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-6 h-6 text-white rotate-90" />
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCounter end={1000} suffix="+" label="O'quvchilar" icon={Users} />
            <StatCounter end={60} suffix="+" label="Malakali o'qituvchilar" icon={GraduationCap} />
            <StatCounter end={95} suffix="%" label="Oliy o'quv yurtlariga kirish" icon={Award} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-blue-900 mb-4">
              Maktab haqida
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mb-6" />
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Jomboy tuman 40-ixtisoslashtirilgan umumta'lim maktabi 1985-yilda tashkil etilgan bo'lib,
              hozirda mintaqaning eng yetakchi ta'lim muassasalaridan biri hisoblanadi.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2064"
                alt="Maktab binosi"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold text-blue-900 mb-4">
                Bizning missiyamiz
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Har bir o'quvchining salohiyatini to'liq ochib berish va ularni zamonaviy bilim va
                ko'nikmalar bilan qurollantirish orqali kelajak etakchilarini tayyorlash.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900 mb-1">Matematika-fizika yo'nalishi</h4>
                    <p className="text-sm text-gray-600">Chuqur matematik va fizika ta'limi</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Microscope className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900 mb-1">Kimyo-biologiya yo'nalishi</h4>
                    <p className="text-sm text-gray-600">Zamonaviy laboratoriyalar va amaliy mashg'ulotlar</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900 mb-1">Chet tillari yo'nalishi</h4>
                    <p className="text-sm text-gray-600">Ingliz, rus va nemis tillarini chuqur o'rganish</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="academics" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-blue-900 mb-4">
              Imkoniyatlarimiz
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={Microscope}
              title="STEM Laboratoriyalar"
              description="Zamonaviy jihozlar bilan jihozlangan fan laboratoriyalari"
              delay={0}
            />
            <FeatureCard
              icon={BookOpen}
              title="Interaktiv darslar"
              description="Multimedia va zamonaviy texnologiyalar bilan ta'lim"
              delay={0.1}
            />
            <FeatureCard
              icon={Globe}
              title="Til markazi"
              description="Professional tillar o'rgatish markazi"
              delay={0.2}
            />
            <FeatureCard
              icon={Trophy}
              title="Sport inshootlari"
              description="Zamonaviy sport zali va ochiq maydonchalari"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* News & Events Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-blue-900 mb-4">
              Yangiliklar va tadbirlar
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <NewsCard
              image="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2049"
              date="15 Fevral, 2024"
              title="Jomboy tumani ilmiy-amaliy konferensiyasi"
              description="Maktabimiz o'quvchilari tuman bo'yicha ilmiy konferensiyada qatnashdi va bir nechta mukofotlarni qo'lga kiritdi."
            />
            <NewsCard
              image="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070"
              date="10 Fevral, 2024"
              title="Respublika olimpiadasida yutuqlar"
              description="O'quvchilarimiz respublika bosqichida matematika va fizika fanlaridan 5 ta medal qo'lga kiritdi."
            />
            <NewsCard
              image="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022"
              date="5 Fevral, 2024"
              title="Yangi laboratoriyalar ochildi"
              description="Maktabimizda zamonaviy kimyo va biologiya laboratoriyalari ochilish marosimi bo'lib o'tdi."
            />
          </div>
        </div>
      </section>

      {/* Virtual Tour Section */}
      <section id="virtual-tour" className="py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Virtual sayohat
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Maktabimizni uydan chiqmasdan ko'rib chiqing
            </p>

            <div className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-video bg-blue-950/50 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-12 h-12 text-amber-400" />
                  </div>
                  <p className="text-lg text-blue-200 mb-4">360° Virtual sayohat tez orada</p>
                  <Button
                    variant="outline"
                    className="border-2 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-white"
                  >
                    Xabardor bo'lish
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Student Portal Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-black text-blue-900 mb-6">
                O'quvchilar portali
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Onlayn platformamiz orqali dars jadvalini, baholaringizni va uy vazifalaringizni kuzatib boring.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700">Onlayn baholar va hisobotlar</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700">Dars jadvali va o'qituvchilar bilan aloqa</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700">Uy vazifalari va onlayn testlar</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-2xl p-8"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900 mb-2">Portalga kirish</h3>
                <p className="text-sm text-gray-600">O'quvchilar uchun shaxsiy kabinet</p>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    O'quvchi ID raqami
                  </label>
                  <Input
                    type="text"
                    placeholder="Masalan: 40-2024-001"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parol
                  </label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="w-full"
                  />
                </div>
                <Button className="w-full bg-blue-900 hover:bg-blue-800 text-white">
                  Kirish
                </Button>
                <p className="text-xs text-center text-gray-500">
                  Parolni unutdingizmi? <a href="#" className="text-amber-600 hover:underline">Qayta tiklash</a>
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Admission Form Section */}
      <section id="admission" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-blue-900 mb-4">
              Qabul
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mb-6" />
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              2024-2025 o'quv yili uchun hujjat qabul jarayoni boshlandi.
              Ariza topshirish uchun quyidagi formani to'ldiring.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto bg-gray-50 rounded-2xl p-8 shadow-lg">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    O'quvchining F.I.O
                  </label>
                  <Input
                    type="text"
                    placeholder="Familiya Ism Sharif"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tug'ilgan sana
                  </label>
                  <Input
                    type="date"
                    className="w-full"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ota-onaning F.I.O
                  </label>
                  <Input
                    type="text"
                    placeholder="Familiya Ism Sharif"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon raqami
                  </label>
                  <Input
                    type="tel"
                    placeholder="+998 XX XXX XX XX"
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email manzili
                </label>
                <Input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ixtisoslashuv yo'nalishi
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Matematika-fizika</option>
                  <option>Kimyo-biologiya</option>
                  <option>Chet tillari</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Qo'shimcha ma'lumot
                </label>
                <Textarea
                  placeholder="Maktabni tanlash sababi, qo'shimcha malakalar..."
                  rows={4}
                  className="w-full"
                />
              </div>

              <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-lg py-6">
                Ariza yuborish
              </Button>

              <p className="text-sm text-center text-gray-500">
                Arizangiz 2-3 ish kuni ichida ko'rib chiqiladi
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-blue-900 mb-4">
              Aloqa
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-blue-900 mb-2">Manzil</h3>
              <p className="text-gray-600">Jomboy tumani, Mustaqillik ko'chasi, 40-uy</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-blue-900 mb-2">Telefon</h3>
              <p className="text-gray-600">+998 (66) 225-XX-XX</p>
              <p className="text-gray-600">+998 (90) 123-XX-XX</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-blue-900 mb-2">Email</h3>
              <p className="text-gray-600">info@maktab40.uz</p>
              <p className="text-gray-600">qabul@maktab40.uz</p>
            </motion.div>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3072.5421!2d66.7!3d39.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDQyJzAwLjAiTiA2NsKwNDInMDAuMCJF!5e0!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <SchoolFooter />
    </div>
  );
};

export default School;
