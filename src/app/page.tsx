'use client';

import React from 'react';
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
import { useTranslation } from '@/hooks/useTranslation';
import { LanguageSelector } from '@/components/LanguageSelector';

export default function Home() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('');
  const t = useTranslation();

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
          <p className="mt-4 text-white/90">{t.common.loading}</p>
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
              <a href="#features" className="text-white/80 hover:text-white transition">{t.nav.features}</a>
              <a href="#how-it-works" className="text-white/80 hover:text-white transition">{t.nav.howItWorks}</a>
              <a href="#faq" className="text-white/80 hover:text-white transition">{t.nav.faq}</a>
              <a href="#about" className="text-white/80 hover:text-white transition">{t.nav.about}</a>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <LanguageSelector />
              <Link href="/auth/login">
                <Button variant="ghost" className="text-white hover:bg-white/10 text-sm sm:text-base">
                  {t.common.login}
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-sm sm:text-base">
                  {t.common.start}
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
              <span className="text-white/90 text-sm font-medium">{t.hero.tagline}</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {t.hero.title}<br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {t.hero.titleHighlight}
              </span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed">
              {t.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button size="lg" className="px-10 py-6 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-xl shadow-purple-500/50">
                  {t.hero.startFree}
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button size="lg" variant="outline" className="px-10 py-6 text-lg border-white/20 bg-white text-gray-900 hover:bg-white/90">
                  {t.hero.howItWorksBtn}
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="text-4xl font-bold text-white mb-2">24/7</div>
                <div className="text-white/70">{t.hero.stats24_7}</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="text-4xl font-bold text-white mb-2">10x</div>
                <div className="text-white/70">{t.hero.stats10x}</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="text-4xl font-bold text-white mb-2">100%</div>
                <div className="text-white/70">{t.hero.stats100}</div>
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
              {t.features.title}
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              {t.features.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="text-5xl mb-4">✍️</div>
                <CardTitle className="text-white text-xl">{t.features.aiContentCreator.title}</CardTitle>
                <CardDescription className="text-white/70 text-base">
                  {t.features.aiContentCreator.description}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="text-5xl mb-4">🎨</div>
                <CardTitle className="text-white text-xl">{t.features.designVisual.title}</CardTitle>
                <CardDescription className="text-white/70 text-base">
                  {t.features.designVisual.description}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="text-5xl mb-4">📅</div>
                <CardTitle className="text-white text-xl">{t.features.smartScheduling.title}</CardTitle>
                <CardDescription className="text-white/70 text-base">
                  {t.features.smartScheduling.description}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="text-5xl mb-4">📊</div>
                <CardTitle className="text-white text-xl">{t.features.analytics.title}</CardTitle>
                <CardDescription className="text-white/70 text-base">
                  {t.features.analytics.description}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="text-5xl mb-4">🎬</div>
                <CardTitle className="text-white text-xl">{t.features.videoContent.title}</CardTitle>
                <CardDescription className="text-white/70 text-base">
                  {t.features.videoContent.description}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="text-5xl mb-4">🔒</div>
                <CardTitle className="text-white text-xl">{t.features.secure.title}</CardTitle>
                <CardDescription className="text-white/70 text-base">
                  {t.features.secure.description}
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
              {t.howItWorks.title}
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              {t.howItWorks.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20 h-full">
                <div className="text-6xl font-bold text-white/20 mb-4">01</div>
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-xl font-bold text-white mb-3">{t.howItWorks.step1.title}</h3>
                <p className="text-white/70">
                  {t.howItWorks.step1.description}
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20 h-full">
                <div className="text-6xl font-bold text-white/20 mb-4">02</div>
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-xl font-bold text-white mb-3">{t.howItWorks.step2.title}</h3>
                <p className="text-white/70">
                  {t.howItWorks.step2.description}
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-indigo-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20 h-full">
                <div className="text-6xl font-bold text-white/20 mb-4">03</div>
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-white mb-3">{t.howItWorks.step3.title}</h3>
                <p className="text-white/70">
                  {t.howItWorks.step3.description}
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20 h-full">
                <div className="text-6xl font-bold text-white/20 mb-4">04</div>
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-bold text-white mb-3">{t.howItWorks.step4.title}</h3>
                <p className="text-white/70">
                  {t.howItWorks.step4.description}
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
              {t.why.title}
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              {t.why.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">💼</div>
                    <div>
                      <CardTitle className="text-white text-xl mb-2">{t.why.forSMB.title}</CardTitle>
                      <CardDescription className="text-white/70 text-base">
                        {t.why.forSMB.description}
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
                      <CardTitle className="text-white text-xl mb-2">{t.why.faster.title}</CardTitle>
                      <CardDescription className="text-white/70 text-base">
                        {t.why.faster.description}
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
                      <CardTitle className="text-white text-xl mb-2">{t.why.realResults.title}</CardTitle>
                      <CardDescription className="text-white/70 text-base">
                        {t.why.realResults.description}
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
                      <CardTitle className="text-white text-xl mb-2">{t.why.localGlobal.title}</CardTitle>
                      <CardDescription className="text-white/70 text-base">
                        {t.why.localGlobal.description}
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
                      <CardTitle className="text-white text-xl mb-2">{t.why.democratic.title}</CardTitle>
                      <CardDescription className="text-white/70 text-base">
                        {t.why.democratic.description}
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
                      <CardTitle className="text-white text-xl mb-2">{t.why.futureTech.title}</CardTitle>
                      <CardDescription className="text-white/70 text-base">
                        {t.why.futureTech.description}
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
              {t.faq.title}
            </h2>
            <p className="text-xl text-white/70">
              {t.faq.subtitle}
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {t.faq.items.map((item, index) => (
              <AccordionItem key={`item-${index + 1}`} value={`item-${index + 1}`} className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg px-6">
              <AccordionTrigger className="text-white hover:text-white/80 text-left">
                  <span className="text-lg font-semibold">{item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-white/70 text-base">
                  {item.answer}
              </AccordionContent>
            </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {t.about.title}
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              {t.about.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-white/20 h-full">
                <CardHeader>
                  <CardTitle className="text-white text-2xl mb-4">{t.about.mission.title}</CardTitle>
                  <CardDescription className="text-white/80 text-base leading-relaxed">
                    {t.about.mission.content.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < t.about.mission.content.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div>
              <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border-white/20 h-full">
                <CardHeader>
                  <CardTitle className="text-white text-2xl mb-4">{t.about.technology.title}</CardTitle>
                  <CardDescription className="text-white/80 text-base leading-relaxed">
                    {t.about.technology.content.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < t.about.technology.content.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>

          <Card className="bg-gradient-to-br from-indigo-500/10 to-pink-500/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-2xl mb-4">{t.about.roadmap.title}</CardTitle>
              <CardDescription className="text-white/80 text-base leading-relaxed">
                {t.about.roadmap.content.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < t.about.roadmap.content.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
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
              {t.team.title}
            </h2>
            <p className="text-xl text-white/70">
              {t.team.subtitle}
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
            {t.cta.title}<br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t.cta.titleHighlight}
            </span>
          </h2>
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
            {t.cta.description}
          </p>
          <Link href="/auth/register">
            <Button size="lg" className="px-12 py-8 text-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-2xl shadow-purple-500/50 hover:scale-105 transition-transform">
              {t.cta.button}
            </Button>
          </Link>
          <p className="mt-6 text-white/60 text-sm">
            {t.cta.note}
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
                {t.footer.tagline}
              </p>
              <p className="text-white/40 text-sm">
                {t.footer.copyright}
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">{t.footer.product}</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-white/60 hover:text-white transition">{t.nav.features}</a></li>
                <li><a href="#how-it-works" className="text-white/60 hover:text-white transition">{t.nav.howItWorks}</a></li>
                <li><a href="#faq" className="text-white/60 hover:text-white transition">{t.nav.faq}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">{t.footer.company}</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-white/60 hover:text-white transition">{t.nav.about}</a></li>
                <li><a href="#team" className="text-white/60 hover:text-white transition">{t.common.team}</a></li>
                <li><Link href="/auth/register" className="text-white/60 hover:text-white transition">{t.footer.register}</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
