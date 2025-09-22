'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Menu, Phone, MessageCircle, Star, MapPin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { getDictionary, type Dictionary } from './dictionaries';

export default function LandingPage() {
  const [lang, setLang] = useState<'en' | 'de'>('en');
  const [dict, setDict] = useState<Dictionary | null>(null);
  const [loading, setLoading] = useState(true);

  // Load language preference from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as 'en' | 'de';
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  // Load dictionary when language changes
  useEffect(() => {
    const loadDictionary = async () => {
      setLoading(true);
      const dictionary = await getDictionary(lang);
      setDict(dictionary);
      setLoading(false);
    };
    loadDictionary();
  }, [lang]);

  const switchLanguage = (newLang: 'en' | 'de') => {
    setLang(newLang);
    localStorage.setItem('language', newLang);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (loading || !dict) {
    return (
      <div className="min-h-screen bg-silk flex items-center justify-center">
        <div className="animate-pulse text-charcoal">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-silk">
      {/* Navigation Header - Sticky with backdrop blur */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-200">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo-tuning-forks.png"
              alt="The Fountain Studio"
              width={40}
              height={40}
              className="opacity-80 hover:opacity-100 transition-opacity"
            />
            <span className="text-2xl font-serif text-charcoal">The Fountain Studio</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('services')} className="text-charcoal/80 hover:text-charcoal transition-colors duration-200">
              {dict.nav.services}
            </button>
            <button onClick={() => scrollToSection('about')} className="text-charcoal/80 hover:text-charcoal transition-colors duration-200">
              {dict.nav.about}
            </button>
            <button onClick={() => scrollToSection('learn')} className="text-charcoal/80 hover:text-charcoal transition-colors duration-200">
              {dict.nav.learn}
            </button>
            <button onClick={() => scrollToSection('testimonials')} className="text-charcoal/80 hover:text-charcoal transition-colors duration-200">
              {dict.nav.testimonials}
            </button>
            <button onClick={() => scrollToSection('faq')} className="text-charcoal/80 hover:text-charcoal transition-colors duration-200">
              {dict.nav.faq}
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-charcoal/80 hover:text-charcoal transition-colors duration-200">
              {dict.nav.contact}
            </button>

            {/* Language Switcher */}
            <div className="flex items-center gap-2 ml-4">
              <Button
                size="sm"
                variant={lang === 'de' ? 'default' : 'outline'}
                onClick={() => switchLanguage('de')}
                className="h-8 px-3"
              >
                DE
              </Button>
              <Button
                size="sm"
                variant={lang === 'en' ? 'default' : 'outline'}
                onClick={() => switchLanguage('en')}
                className="h-8 px-3"
              >
                EN
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-6">
                <button onClick={() => scrollToSection('services')} className="text-left">{dict.nav.services}</button>
                <button onClick={() => scrollToSection('about')} className="text-left">{dict.nav.about}</button>
                <button onClick={() => scrollToSection('learn')} className="text-left">{dict.nav.learn}</button>
                <button onClick={() => scrollToSection('testimonials')} className="text-left">{dict.nav.testimonials}</button>
                <button onClick={() => scrollToSection('faq')} className="text-left">{dict.nav.faq}</button>
                <button onClick={() => scrollToSection('contact')} className="text-left">{dict.nav.contact}</button>
                <Separator className="my-2" />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={lang === 'de' ? 'default' : 'outline'}
                    onClick={() => switchLanguage('de')}
                    className="flex-1"
                  >
                    Deutsch
                  </Button>
                  <Button
                    size="sm"
                    variant={lang === 'en' ? 'default' : 'outline'}
                    onClick={() => switchLanguage('en')}
                    className="flex-1"
                  >
                    English
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </header>

      {/* Hero Section with Full-Screen Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-swiss-alps.jpg"
            alt="Swiss Alps healing space"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
            {dict.hero.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            {dict.hero.subtitle}
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gold hover:bg-gold-hover text-white"
              onClick={() => scrollToSection('contact')}
            >
              {dict.hero.cta.book}
            </Button>
            <Button
              size="lg"
              className="bg-charcoal hover:bg-charcoal/90 text-white border-0"
              onClick={() => scrollToSection('services')}
            >
              {dict.hero.cta.learn}
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/70" />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-4">
              {dict.services.title}
            </h2>
            <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
              {dict.services.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Biofield Tuning Card */}
            <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="h-48 relative overflow-hidden">
                <Image
                  src="/images/service-biofield-tuning.jpg"
                  alt="Biofield Tuning"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-charcoal">{dict.services.biofield.title}</CardTitle>
                <CardDescription>{dict.services.biofield.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-charcoal/70 mb-4">{dict.services.biofield.benefits}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gold font-semibold">{dict.services.biofield.price}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-charcoal text-charcoal hover:bg-charcoal hover:text-white"
                    onClick={() => scrollToSection('learn')}
                  >
                    {dict.services.biofield.cta}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Gyrotonic Card */}
            <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="h-48 relative overflow-hidden">
                <Image
                  src="/images/service-gyrotonic-movement.jpg"
                  alt="Gyrotonic Movement"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-charcoal">{dict.services.gyrotonic.title}</CardTitle>
                <CardDescription>{dict.services.gyrotonic.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-charcoal/70 mb-4">{dict.services.gyrotonic.benefits}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gold font-semibold">{dict.services.gyrotonic.price}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-charcoal text-charcoal hover:bg-charcoal hover:text-white"
                    onClick={() => scrollToSection('learn')}
                  >
                    {dict.services.gyrotonic.cta}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Breathwork Card */}
            <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="h-48 relative overflow-hidden">
                <Image
                  src="/images/service-breathwork.jpg"
                  alt="Breathwork"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-charcoal">{dict.services.breathwork.title}</CardTitle>
                <CardDescription>{dict.services.breathwork.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-charcoal/70 mb-4">{dict.services.breathwork.benefits}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gold font-semibold">{dict.services.breathwork.price}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-charcoal text-charcoal hover:bg-charcoal hover:text-white"
                    onClick={() => scrollToSection('learn')}
                  >
                    {dict.services.breathwork.cta}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Integration Card */}
            <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-gold/30 bg-gradient-to-br from-white to-gold/5">
              <div className="h-48 relative overflow-hidden">
                <Image
                  src="/images/service-integration.jpg"
                  alt="Complete Integration"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 right-4 bg-gold text-white">
                  Popular
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-charcoal">{dict.services.integration.title}</CardTitle>
                <CardDescription>{dict.services.integration.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-charcoal/70 mb-4">{dict.services.integration.benefits}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gold font-semibold">{dict.services.integration.price}</span>
                  <Button
                    size="sm"
                    className="bg-charcoal hover:bg-charcoal/90 text-white"
                    onClick={() => scrollToSection('contact')}
                  >
                    {dict.services.integration.cta}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-silk">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/about-treatment-session.jpg"
                alt="Kristen Slabaugh"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl font-serif text-charcoal mb-4">{dict.about.title}</h2>
              <p className="text-xl text-gold mb-4">{dict.about.subtitle}</p>
              <p className="text-charcoal/70 mb-6">{dict.about.intro}</p>
              <p className="text-charcoal/70 mb-6">{dict.about.description}</p>
              <blockquote className="border-l-4 border-gold pl-6 mb-8 italic text-charcoal/80">
                &ldquo;{dict.about.quote}&rdquo;
              </blockquote>
              <p className="font-semibold text-charcoal mb-6">{dict.about.mission}</p>

              <div className="mb-8">
                <h3 className="font-semibold text-charcoal mb-3">{dict.about.credentials.title}:</h3>
                <ul className="space-y-2">
                  {dict.about.credentials.items.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-charcoal/70">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                size="lg"
                className="bg-charcoal hover:bg-charcoal/90 text-white"
                onClick={() => scrollToSection('contact')}
              >
                {dict.about.cta}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Learn Section */}
      <section id="learn" className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-4">
              {dict.learn.title}
            </h2>
            <p className="text-xl text-charcoal/70">
              {dict.learn.subtitle}
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="biofield" className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-semibold text-charcoal hover:text-gold">
                {dict.learn.biofield.title}
              </AccordionTrigger>
              <AccordionContent className="text-charcoal/70 pb-4">
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div>
                    <p>{dict.learn.biofield.content}</p>
                  </div>
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src="/images/learn-biofield.jpg"
                      alt="Biofield Tuning"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="gyrotonic" className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-semibold text-charcoal hover:text-gold">
                {dict.learn.gyrotonic.title}
              </AccordionTrigger>
              <AccordionContent className="text-charcoal/70 pb-4">
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div>
                    <p>{dict.learn.gyrotonic.content}</p>
                  </div>
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src="/images/learn-gyrotonic.jpg"
                      alt="Gyrotonic Method"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="breathwork" className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-semibold text-charcoal hover:text-gold">
                {dict.learn.breathwork.title}
              </AccordionTrigger>
              <AccordionContent className="text-charcoal/70 pb-4">
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div>
                    <p>{dict.learn.breathwork.content}</p>
                  </div>
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src="/images/learn-breathwork.jpg"
                      alt="Breathwork"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-6 bg-silk relative">
        {/* Background Image with Low Opacity */}
        <div className="absolute inset-0 opacity-5">
          <Image
            src="/images/testimonials-bg-sunset.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-4">
              {dict.testimonials.title}
            </h2>
            <p className="text-xl text-charcoal/70">
              {dict.testimonials.subtitle}
            </p>
          </div>

          <Carousel className="max-w-4xl mx-auto">
            <CarouselContent>
              {dict.testimonials.items.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <Card className="border-0 bg-white/90 backdrop-blur">
                    <CardContent className="pt-8 pb-8 px-12">
                      <div className="flex justify-center mb-4">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                        ))}
                      </div>
                      <p className="text-lg text-charcoal/80 mb-6 italic text-center">
                        &ldquo;{testimonial.text}&rdquo;
                      </p>
                      <p className="text-center font-semibold text-charcoal">
                        - {testimonial.name}
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-4">
              {dict.faq.title}
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {dict.faq.items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                <AccordionTrigger className="text-left text-charcoal hover:text-gold">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-charcoal/70 pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-silk">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-4">
              {dict.contact.title}
            </h2>
            <p className="text-xl text-charcoal/70">
              {dict.contact.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Form */}
            <div>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-charcoal">Send a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div>
                      <Label htmlFor="name">{dict.contact.form.name}</Label>
                      <Input id="name" placeholder="Your name" className="bg-white" />
                    </div>
                    <div>
                      <Label htmlFor="email">{dict.contact.form.email}</Label>
                      <Input id="email" type="email" placeholder="your@email.com" className="bg-white" />
                    </div>
                    <div>
                      <Label htmlFor="phone">{dict.contact.form.phone}</Label>
                      <Input id="phone" placeholder="+41..." className="bg-white" />
                    </div>
                    <div>
                      <Label htmlFor="message">{dict.contact.form.message}</Label>
                      <Textarea id="message" placeholder="Tell me about what you're looking for..." className="bg-white min-h-[100px]" />
                    </div>
                    <Button type="submit" className="w-full bg-charcoal hover:bg-charcoal/90 text-white">
                      {dict.contact.form.submit}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-serif text-charcoal mb-4">{dict.contact.info.title}</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gold mt-1" />
                    <div>
                      <p className="font-semibold text-charcoal">Address</p>
                      <p className="text-charcoal/70">{dict.contact.info.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gold mt-1" />
                    <div>
                      <p className="font-semibold text-charcoal">Phone</p>
                      <p className="text-charcoal/70">{dict.contact.info.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gold mt-1" />
                    <div>
                      <p className="font-semibold text-charcoal">Email</p>
                      <p className="text-charcoal/70">{dict.contact.info.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alternative Contact Methods */}
              <div>
                <h3 className="text-xl font-semibold text-charcoal mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => window.open(`https://wa.me/41787950009?text=Hi%20Kristen,%20I'm%20interested%20in%20booking%20a%20session`, '_blank')}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {dict.contact.alternatives.whatsapp}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-charcoal text-charcoal hover:bg-charcoal hover:text-white"
                    onClick={() => window.open('https://cal.com/', '_blank')}
                  >
                    {dict.contact.alternatives.calendar}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-white py-12 px-6 relative">
        {/* Sacred Geometry Watermark */}
        <div className="absolute bottom-0 right-0 opacity-10">
          <Image
            src="/images/sacred-totem.png"
            alt="Sacred geometry"
            width={200}
            height={200}
          />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-serif text-2xl mb-4">The Fountain Studio</h3>
              <p className="text-white/70">
                {dict.footer.tagline}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-white/70">
                <li><button onClick={() => scrollToSection('services')} className="hover:text-white">{dict.footer.links.services}</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-white">{dict.footer.links.about}</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-white">{dict.footer.links.contact}</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-white/70">
                <li><Link href="/privacy" className="hover:text-white">{dict.footer.links.privacy}</Link></li>
                <li><Link href="/terms" className="hover:text-white">{dict.footer.links.terms}</Link></li>
              </ul>
            </div>
          </div>
          <Separator className="bg-white/20 mb-6" />
          <div className="text-center text-white/60 text-sm">
            {dict.footer.copyright}
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/41787950009?text=Hi%20Kristen,%20I'm%20interested%20in%20booking%20a%20session"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 p-4 rounded-full shadow-lg transition-all hover:scale-105"
        aria-label="Chat on WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </a>
    </div>
  );
}