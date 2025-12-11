'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'features', 'how-it-works', 'why', 'faq', 'about', 'team'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white/80 mx-auto"></div>
          <p className="mt-4 text-white/90">Yüklənir...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-blue-950/80 backdrop-blur-lg border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">🧠</div>
              <span className="text-2xl font-bold text-white">Timera.ai</span>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="#features" className="text-white/80 hover:text-white transition">Xüsusiyyətlər</a>
              <a href="#how-it-works" className="text-white/80 hover:text-white transition">Necə İşləyir</a>
              <a href="#faq" className="text-white/80 hover:text-white transition">FAQ</a>
              <a href="#about" className="text-white/80 hover:text-white transition">Haqqımızda</a>
            </div>
            <div className="flex space-x-4">
              <Link href="/auth/login">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Giriş
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Başla
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-white/90 text-sm font-medium">🚀 Süni İntellektlə Gələcək Buradadır</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Brendinizi Anlayan<br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Süni İntellekt
              </span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed">
              Timera.ai — AI əsaslı sosial media idarəetmə platformasıdır. 
              Kontent yaradılması, planlaşdırma, dizayn və analitik — hamısı bir yerdə, tam avtomatlaşdırılmış.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button size="lg" className="px-10 py-6 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-xl shadow-purple-500/50">
                  Pulsuz Başlayın
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button size="lg" variant="outline" className="px-10 py-6 text-lg border-white/20 bg-white text-gray-900 hover:bg-white/90">
                  Necə İşləyir?
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="text-4xl font-bold text-white mb-2">24/7</div>
                <div className="text-white/70">Yorulmayan AI Asistan</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="text-4xl font-bold text-white mb-2">10x</div>
                <div className="text-white/70">Daha Sürətli Kontent</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="text-4xl font-bold text-white mb-2">100%</div>
                <div className="text-white/70">Avtomatlaşdırma</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Timera.ai Nə Edir?
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Süni intellektlə sosial media idarəçiliyinin yeni dövrü
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="text-5xl mb-4">✍️</div>
                <CardTitle className="text-white text-xl">AI Kontent Yaradıcısı</CardTitle>
                <CardDescription className="text-white/70 text-base">
                  Brendinizə uyğun mətn və vizual kontent tam avtomatik yaradılır. 
                  Siz istədiyi hissəni redaktə edə bilərsiniz.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="text-5xl mb-4">🎨</div>
                <CardTitle className="text-white text-xl">Dizayn & Vizual</CardTitle>
                <CardDescription className="text-white/70 text-base">
                  AI brend stilinizə uyğun dizayn və vizuallar hazırlayır. 
                  Loqo, rəng və ton avtomatik təhlil edilir.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="text-5xl mb-4">📅</div>
                <CardTitle className="text-white text-xl">Ağıllı Planlaşdırma</CardTitle>
                <CardDescription className="text-white/70 text-base">
                  Paylaşımların vaxtı və strategiya avtomatik qurulur. 
                  Optimal vaxt seçimi AI tərəfindən aparılır.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="text-5xl mb-4">📊</div>
                <CardTitle className="text-white text-xl">Analitik & Hesabat</CardTitle>
                <CardDescription className="text-white/70 text-base">
                  Real vaxt analitikası və nəticə ölçümü. 
                  AI növbəti strategiyanı təklif edir.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="text-5xl mb-4">🎬</div>
                <CardTitle className="text-white text-xl">Video Kontent</CardTitle>
                <CardDescription className="text-white/70 text-base">
                  Markaya uyğun avtomatik video postlar. 
                  Video kontent hazırlığı tam avtomatlaşdırılmış.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="text-5xl mb-4">🔒</div>
                <CardTitle className="text-white text-xl">Təhlükəsiz & Qanuni</CardTitle>
                <CardDescription className="text-white/70 text-base">
                  Rəsmi API inteqrasiyaları və SSL şifrələmə. 
                  Heç bir şəxsi məlumat saxlanılmır.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Necə İşləyir?
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              4 sadə addımda sosial media marketinqinizi avtomatlaşdırın
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20 h-full">
                <div className="text-6xl font-bold text-white/20 mb-4">01</div>
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-xl font-bold text-white mb-3">Məlumat Daxil Edin</h3>
                <p className="text-white/70">
                  Brend, məhsul və məqsəd barədə məlumat verin. AI hər şeyi öyrənir.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20 h-full">
                <div className="text-6xl font-bold text-white/20 mb-4">02</div>
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-xl font-bold text-white mb-3">AI Kontent Yaradır</h3>
                <p className="text-white/70">
                  Post mövzuları, mətn və vizual kontent avtomatik hazırlanır.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-indigo-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20 h-full">
                <div className="text-6xl font-bold text-white/20 mb-4">03</div>
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-white mb-3">Təsdiq & Redaktə</h3>
                <p className="text-white/70">
                  İstənilən hissəni redaktə edin və paylaşımları təsdiq edin.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20 h-full">
                <div className="text-6xl font-bold text-white/20 mb-4">04</div>
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-bold text-white mb-3">Avtomatik Yayım</h3>
                <p className="text-white/70">
                  Sistem paylaşımları yayımlayır və nəticələri analiz edir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Timera.ai */}
      <section id="why" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Niyə Timera.ai?
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Çünki sosial mediada aktiv olmaq artıq lüks yox, zərurətdir
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">💼</div>
                    <div>
                      <CardTitle className="text-white text-xl mb-2">KOB & Startuplar Üçün</CardTitle>
                      <CardDescription className="text-white/70 text-base">
                        Əlavə insan resursuna ehtiyac duymadan sosial medianızı idarə edin. 
                        SMM mütəxəssisi və agentlik xərclərindən qurtulun.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">⚡</div>
                    <div>
                      <CardTitle className="text-white text-xl mb-2">10x Daha Sürətli</CardTitle>
                      <CardDescription className="text-white/70 text-base">
                        AI ilə marketinq strategiyanızı 10 qat daha səmərəli qurun. 
                        Vaxtınıza qənaət edin, kreativliyə fokuslanın.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card className="bg-gradient-to-br from-indigo-500/10 to-blue-500/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">🎯</div>
                    <div>
                      <CardTitle className="text-white text-xl mb-2">Real Nəticələr</CardTitle>
                      <CardDescription className="text-white/70 text-base">
                        Analitik hesabatlarla real nəticələri ölçün. 
                        İlk 1 ayda fərqi hiss edəcəksiniz.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">🌍</div>
                    <div>
                      <CardTitle className="text-white text-xl mb-2">Lokal & Qlobal</CardTitle>
                      <CardDescription className="text-white/70 text-base">
                        Azərbaycan bazarını anlayan, dünya standartlarında çalışan platform. 
                        Həm lokal, həm də qlobal bazarlara uyğun.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">🤝</div>
                    <div>
                      <CardTitle className="text-white text-xl mb-2">Demokratik Marketinq</CardTitle>
                      <CardDescription className="text-white/70 text-base">
                        Rəqəmsal marketinqi hamı üçün əlçatan edirik. 
                        Hər biznes öz brendini asanlıqla idarə edə bilir.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500/10 to-pink-500/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">🔮</div>
                    <div>
                      <CardTitle className="text-white text-xl mb-2">Gələcək Texnologiya</CardTitle>
                      <CardDescription className="text-white/70 text-base">
                        Generative AI, Machine Learning və Vision AI texnologiyalarının birləşməsi. 
                        Süni intellekt yaradıcı düşüncənin vaxtını azad edir.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              ❓ Tez-tez Verilən Suallar
            </h2>
            <p className="text-xl text-white/70">
              Timera.ai haqqında bilmək istədiyiniz hər şey
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg px-6">
              <AccordionTrigger className="text-white hover:text-white/80 text-left">
                <span className="text-lg font-semibold">🧠 Timera.ai nə edir və necə işləyir?</span>
              </AccordionTrigger>
              <AccordionContent className="text-white/70 text-base">
                Timera.ai – süni intellekt əsaslı sosial media idarəetmə alətidir. 
                Platforma post yaradılması, planlaşdırma, dizayn, video kontent hazırlığı, analitik hesabatlar 
                və hətta Meta Ads (Facebook və Instagram reklam kampaniyaları) idarəsini avtomatlaşdırır. 
                Sadəcə brend məlumatlarını daxil edin – qalan hər işi AI sizin yerinizə görəcək.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg px-6">
              <AccordionTrigger className="text-white hover:text-white/80 text-left">
                <span className="text-lg font-semibold">✍️ AI kontenti tam özü yaradır, yoxsa mən redaktə edə bilərəm?</span>
              </AccordionTrigger>
              <AccordionContent className="text-white/70 text-base">
                Timera.ai kontenti tam avtomatik yaradır – həm mətn, həm vizual, həm də video formatda. 
                Ancaq istifadəçi istədiyi istənilən hissəni redaktə edə və fərdiləşdirə bilər. 
                Bu yanaşma AI-in sürətini və insan yaradıcılığının çevikliyini birləşdirir.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg px-6">
              <AccordionTrigger className="text-white hover:text-white/80 text-left">
                <span className="text-lg font-semibold">🔒 Timera.ai məlumatlarımı necə qoruyur?</span>
              </AccordionTrigger>
              <AccordionContent className="text-white/70 text-base">
                Məlumat təhlükəsizliyi Timera.ai üçün prioritetdir. İstifadəçilərin sosial media hesabları 
                rəsmi API inteqrasiyaları vasitəsilə qoşulur və heç bir şəxsi məlumat serverlərdə saxlanılmır. 
                Bütün məlumat ötürmələri tam qanuni və şifrələnmiş (SSL) şəkildə həyata keçirilir.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg px-6">
              <AccordionTrigger className="text-white hover:text-white/80 text-left">
                <span className="text-lg font-semibold">👤 Timera.ai kimlər üçün nəzərdə tutulub?</span>
              </AccordionTrigger>
              <AccordionContent className="text-white/70 text-base">
                Timera.ai – sosial mediadan brendini tanıtmaq, müştəri qazanmaq və satışlarını artırmaq istəyən hər kəs üçün hazırlanıb. 
                Bu, xüsusilə Kiçik və Orta Bizneslər (KOB), Startuplar, SMM mütəxəssisləri və marketoloqlar, 
                Freelancer dizayner və agentliklər üçün ideal həlldir.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg px-6">
              <AccordionTrigger className="text-white hover:text-white/80 text-left">
                <span className="text-lg font-semibold">💻 Timera.ai hansı cihazlarda işləyir?</span>
              </AccordionTrigger>
              <AccordionContent className="text-white/70 text-base">
                Timera.ai tam web əsaslı platformadır — yəni heç bir proqram yükləməyə ehtiyac yoxdur. 
                Sadəcə brauzerə timera.az yazmaq kifayətdir. 
                Platforma kompüter, planşet və mobil cihazlarda eyni səmərəliliklə işləyir.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg px-6">
              <AccordionTrigger className="text-white hover:text-white/80 text-left">
                <span className="text-lg font-semibold">🔮 Timera.ai gələcəkdə nələri planlaşdırır?</span>
              </AccordionTrigger>
              <AccordionContent className="text-white/70 text-base">
                2026-cı ilə qədər Timera.ai bir neçə yeni xüsusiyyət əlavə etməyi planlaşdırır: 
                AI Video Generator – markaya uyğun avtomatik video postlar, 
                AI Chatbot Asistan – istifadəçilərə sosial media məsləhətləri verən köməkçi, 
                və Mobil tətbiq (iOS və Android) – istənilən yerdən kontent idarəçiliyi. 
                Məqsədimiz Azərbaycanın texnoloji bazarından çıxan ilk qlobal AI marketing platforması olmaqdır.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg px-6">
              <AccordionTrigger className="text-white hover:text-white/80 text-left">
                <span className="text-lg font-semibold">🚀 Timera.ai nə qədər vaxtda nəticə göstərir?</span>
              </AccordionTrigger>
              <AccordionContent className="text-white/70 text-base">
                İlk 1 ay ərzində AI sizin potensiyal müştəri bazanızı öyrənir və paylaşımlarınızı optimallaşdırır. 
                1 ay sonra isə siz daha ardıcıl kontent axını, daha sabit izləyici reaksiyası və 
                az vaxt, çox nəticə fərqini açıq şəkildə hiss edirsiniz.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg px-6">
              <AccordionTrigger className="text-white hover:text-white/80 text-left">
                <span className="text-lg font-semibold">🧩 Timera.ai digər sosial media alətlərindən nə ilə fərqlənir?</span>
              </AccordionTrigger>
              <AccordionContent className="text-white/70 text-base">
                Ən böyük fərq — Timera.ai yalnız kontent planlaşdırmır, brendi və o brendin müştərilərini anlayır. 
                Digər alətlər sadəcə paylaşımı asanlaşdırır, Timera.ai isə AI ilə mətn, dizayn və strategiyanı birlikdə yaradır. 
                Yəni bu sadəcə "post scheduler" deyil — sənin yerinə işləyən real süni intellektli marketinq meneceridir.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              🧠 Timera.ai Haqqında
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Süni intellektlə sosial media idarəçiliyinin yeni dövrü
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-white/20 h-full">
                <CardHeader>
                  <CardTitle className="text-white text-2xl mb-4">💡 Missiyamız</CardTitle>
                  <CardDescription className="text-white/80 text-base leading-relaxed">
                    Bizim məqsədimiz rəqəmsal marketinqi hamı üçün əlçatan etməkdir. 
                    AI texnologiyasını nəhəng korporasiyalardan KOB-lara qədər hər kəsin xidmətinə gətiririk. 
                    <br/><br/>
                    Timera.ai sayəsində hər biznes öz brendini asanlıqla idarə edə bilir, 
                    AI ilə kontent yaratma daha sürətli və səmərəli olur, 
                    və Azərbaycan və region bazarında rəqəmsal inqilab baş verir.
                    <br/><br/>
                    <strong className="text-white">Biz inanırıq ki, süni intellekt yaradıcı düşüncəni əvəz etmir — 
                    sadəcə onun vaxtını azad edir.</strong>
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div>
              <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border-white/20 h-full">
                <CardHeader>
                  <CardTitle className="text-white text-2xl mb-4">⚙️ Texnologiya</CardTitle>
                  <CardDescription className="text-white/80 text-base leading-relaxed">
                    Timera.ai, Generative AI, Machine Learning və Vision AI texnologiyalarını birləşdirir. 
                    Platforma loqonuzu, brend rənglərinizi, tonunuzu və məqsədlərinizi təhlil edir, 
                    sanki sizin komandanızda real bir dizayner və marketinq mütəxəssisi varmış kimi işləyir.
                    <br/><br/>
                    <strong className="text-white">Bizim AI:</strong>
                    <ul className="mt-3 space-y-2">
                      <li>• Brend kimliyini və kommunikasiya tonunu öyrənir</li>
                      <li>• Trend analizləri aparır və uyğun kontent yaradır</li>
                      <li>• Hər paylaşım üçün vizual brif hazırlayır</li>
                    </ul>
                    <br/>
                    Yəni, Timera.ai sadəcə post yazan bir sistem deyil — markanızı anlayan bir süni intellekdir.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>

          <Card className="bg-gradient-to-br from-indigo-500/10 to-pink-500/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-2xl mb-4">📈 Hazırkı Mərhələ və Gələcək Plan</CardTitle>
              <CardDescription className="text-white/80 text-base leading-relaxed">
                Hazırda Timera.ai MVP mərhələsindədir və 2025-ci ilin noyabrında yerli bazarda sınaq versiyası istifadəyə veriləcək.
                <br/><br/>
                <strong className="text-white">2026-cı ildə planımız:</strong>
                <ul className="mt-3 space-y-2">
                  <li>• 🌍 Region bazarlarına çıxış (Türkiyə, Qazaxıstan, Gürcüstan, Özbəkistan)</li>
                  <li>• 🌐 Qlobal SaaS bazarında AI marketing aləti kimi tanınmaq</li>
                  <li>• 🦄 İlk Azərbaycan mənşəli AI unicorn olmaq</li>
                </ul>
                <br/>
                <strong className="text-purple-400">
                  Məqsəd: Azərbaycanın texnoloji bazarından çıxan ilk qlobal AI marketing platforması olmaq.
                </strong>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              👥 Bizim Komanda
            </h2>
            <p className="text-xl text-white/70">
              Texnologiya və marketinqi birləşdirən regionun ilk AI marketing komandası
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-white/20 hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                    👨‍💼
                  </div>
                  <CardTitle className="text-white text-2xl mb-2">İlkin Tanat</CardTitle>
                  <p className="text-purple-400 font-semibold mb-4">Co-Founder & CEO</p>
                  <CardDescription className="text-white/70 text-base">
                    Rəqəmsal marketinq və satış strategiyaları üzrə 10+ illik təcrübə. 
                    KOB-lar üçün effektiv kontent həlləri və bazar yönümlü strategiyalar üzrə mütəxəssisdir.
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border-white/20 hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                    👨‍💻
                  </div>
                  <CardTitle className="text-white text-2xl mb-2">Elvin Seyidov</CardTitle>
                  <p className="text-blue-400 font-semibold mb-4">Co-Founder & CTO</p>
                  <CardDescription className="text-white/70 text-base">
                    10 ildən çox proqramlaşdırma və SaaS arxitektura təcrübəsi. 
                    Python, Django, React və AWS üzrə dərin biliyə sahibdir. 
                    Timera.ai-nın texniki infrastrukturunun və təhlükəsizliyinin əsas beyni.
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

  

      {/* Final CTA */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Sosial Media Marketinqinizi<br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI ilə İnqilaba Qoşun
            </span>
          </h2>
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
            Brendinizi anlayan süni intellektlə tanış olun. 
            İlk 1 ayda fərqi hiss edin. Pulsuz başlayın!
          </p>
          <Link href="/auth/register">
            <Button size="lg" className="px-12 py-8 text-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-2xl shadow-purple-500/50 hover:scale-105 transition-transform">
              🚀 İndi Pulsuz Başlayın
            </Button>
          </Link>
          <p className="mt-6 text-white/60 text-sm">
            Kredit kartı tələb olunmur • 5 dəqiqədə hazır • 24/7 dəstək
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8 bg-blue-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="text-3xl">🧠</div>
                <span className="text-2xl font-bold text-white">Timera.ai</span>
              </div>
              <p className="text-white/60 mb-4">
                Brendinizi Anlayan Süni İntellekt
              </p>
              <p className="text-white/40 text-sm">
                © 2025 Timera.ai. Bütün hüquqlar qorunur.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Məhsul</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-white/60 hover:text-white transition">Xüsusiyyətlər</a></li>
                <li><a href="#how-it-works" className="text-white/60 hover:text-white transition">Necə İşləyir</a></li>
                <li><a href="#faq" className="text-white/60 hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Şirkət</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-white/60 hover:text-white transition">Haqqımızda</a></li>
                <li><a href="#team" className="text-white/60 hover:text-white transition">Komanda</a></li>
                <li><Link href="/auth/register" className="text-white/60 hover:text-white transition">Qeydiyyat</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
