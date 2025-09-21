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

export default function LandingPage() {
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
            <Link href="#services" className="text-charcoal/80 hover:text-charcoal transition-colors duration-200">
              Services
            </Link>
            <Link href="#about" className="text-charcoal/80 hover:text-charcoal transition-colors duration-200">
              About
            </Link>
            <Link href="#learn" className="text-charcoal/80 hover:text-charcoal transition-colors duration-200">
              Learn
            </Link>
            <Link href="#testimonials" className="text-charcoal/80 hover:text-charcoal transition-colors duration-200">
              Testimonials
            </Link>
            <Link href="#faq" className="text-charcoal/80 hover:text-charcoal transition-colors duration-200">
              FAQ
            </Link>
            <Link href="#contact" className="text-charcoal/80 hover:text-charcoal transition-colors duration-200">
              Contact
            </Link>

            {/* CTA Button */}
            <Button className="bg-charcoal hover:bg-charcoal-800 text-white">
              Book Session
            </Button>

            {/* Language Switcher */}
            <div className="flex gap-2 text-sm">
              <Link href="/de" className="text-muted-foreground hover:text-charcoal">
                DE
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link href="/en" className="font-bold text-gold">
                EN
              </Link>
            </div>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[385px]">
              <SheetHeader>
                <SheetTitle className="font-serif">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                <Link href="#services" className="text-lg text-charcoal hover:text-gold transition-colors">
                  Services
                </Link>
                <Link href="#about" className="text-lg text-charcoal hover:text-gold transition-colors">
                  About
                </Link>
                <Link href="#learn" className="text-lg text-charcoal hover:text-gold transition-colors">
                  Learn
                </Link>
                <Link href="#testimonials" className="text-lg text-charcoal hover:text-gold transition-colors">
                  Testimonials
                </Link>
                <Link href="#faq" className="text-lg text-charcoal hover:text-gold transition-colors">
                  FAQ
                </Link>
                <Link href="#contact" className="text-lg text-charcoal hover:text-gold transition-colors">
                  Contact
                </Link>
                <Separator className="my-2" />
                <Button className="w-full bg-charcoal hover:bg-charcoal-800 text-white">
                  Book Session
                </Button>
                <div className="flex gap-4 justify-center">
                  <Link href="/de" className="text-muted-foreground">DE</Link>
                  <span className="text-muted-foreground">|</span>
                  <Link href="/en" className="font-bold text-gold">EN</Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </header>

      {/* Hero Section - 100vh with background image */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <Image
          src="/images/hero-swiss-alps.jpg"
          alt="Swiss Alps vista representing elevated wellness and natural frequency"
          fill
          priority
          quality={90}
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        <div className="absolute inset-0 bg-black/20" />

        {/* Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif mb-6 animate-fade-up">
            Frequency is Everything
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            A boutique healing studio helping you clear the static and reconnect with your natural flow through gentle, embodied practices: Biofield Tuning, Gyrotonic® and Breathwork.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-gold hover:bg-gold-hover text-white">
              Book Your Session
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/70" />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-serif text-center mb-4 text-charcoal">
            Our Services
          </h2>
          <p className="text-xl text-center mb-16 max-w-3xl mx-auto text-charcoal-light">
            Tailored healing experiences to restore your natural frequency
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Biofield Tuning Card */}
            <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                <Image
                  src="/images/tuning-forks-fan.jpg"
                  alt="Biofield Tuning - Sound healing with tuning forks"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>
              <CardHeader className="space-y-1">
                <CardTitle className="text-lg">Biofield Tuning</CardTitle>
                <CardDescription className="text-sm">
                  Sound healing that clears energetic blocks and restores coherence
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="font-semibold">
                    CHF 180
                  </Badge>
                  <span className="text-sm text-muted-foreground">75 min</span>
                </div>
                <p className="text-xs text-muted-foreground italic">
                  Release tension & restore flow
                </p>
              </CardContent>
            </Card>

            {/* Gyrotonic Card */}
            <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                <Image
                  src="/images/tuning-forks-spiral.jpg"
                  alt="Gyrotonic® - Movement and frequency alignment"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>
              <CardHeader className="space-y-1">
                <CardTitle className="text-lg">Gyrotonic®</CardTitle>
                <CardDescription className="text-sm">
                  Fluid movement that enhances strength, flexibility and coordination
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="font-semibold">
                    CHF 160
                  </Badge>
                  <span className="text-sm text-muted-foreground">60 min</span>
                </div>
                <p className="text-xs text-muted-foreground italic">
                  Move with ease & grace
                </p>
              </CardContent>
            </Card>

            {/* Breathwork Card */}
            <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                <Image
                  src="/images/breathwork-space.jpg"
                  alt="Breathwork - Conscious breathing for stress release"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>
              <CardHeader className="space-y-1">
                <CardTitle className="text-lg">Breathwork</CardTitle>
                <CardDescription className="text-sm">
                  Conscious breathing to release stress and expand awareness
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="font-semibold">
                    CHF 150
                  </Badge>
                  <span className="text-sm text-muted-foreground">60 min</span>
                </div>
                <p className="text-xs text-muted-foreground italic">
                  Breathe into presence
                </p>
              </CardContent>
            </Card>

            {/* Integration Card */}
            <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                <Image
                  src="/images/gong-sacred-space.jpg"
                  alt="Integration Experience - Combined healing modalities"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>
              <CardHeader className="space-y-1">
                <CardTitle className="text-lg">Integration Experience</CardTitle>
                <CardDescription className="text-sm">
                  Combined session tailored to your specific needs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="font-semibold">
                    CHF 220
                  </Badge>
                  <span className="text-sm text-muted-foreground">90 min</span>
                </div>
                <p className="text-xs text-muted-foreground italic">
                  Complete healing journey
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 bg-silk">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image placeholder */}
            <div className="relative h-96 md:h-[600px] rounded-lg overflow-hidden shadow-xl bg-stone-100">
              <Image
                src="/images/treatment-session.jpg"
                alt="Kristen Kelly - Biofield Tuning practitioner and Gyrotonic instructor"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-serif text-charcoal">
                  Meet Kristen
                </h2>
                <p className="text-xl font-medium text-charcoal-light">
                  Your Guide to Healing Through Sound & Movement
                </p>
              </div>

              <div className="space-y-4 text-charcoal/90">
                <p className="text-lg leading-relaxed">
                  As a certified Biofield Tuning practitioner and Gyrotonic instructor, I help you clear energetic blocks and restore your body&apos;s natural harmony.
                </p>
                <blockquote className="border-l-4 border-gold pl-6 italic text-lg">
                  &ldquo;You are your own healer. I&apos;m simply here to help you remember.&rdquo;
                </blockquote>
              </div>

              <div className="space-y-3 pt-4">
                <div className="flex items-start">
                  <span className="mr-3 text-gold text-xl">✓</span>
                  <span className="text-charcoal">Certified Biofield Tuning Practitioner</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-3 text-gold text-xl">✓</span>
                  <span className="text-charcoal">Gyrotonic® Level 1 Instructor</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-3 text-gold text-xl">✓</span>
                  <span className="text-charcoal">Conscious Breathwork Facilitator</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-3 text-gold text-xl">✓</span>
                  <span className="text-charcoal">10+ Years of Healing Practice</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learn Section - Accordion */}
      <section id="learn" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif text-charcoal">
              Learn About Our Modalities
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-charcoal-light">
              Discover how each practice can support your healing journey
            </p>
          </div>

          <Accordion type="single" collapsible className="max-w-4xl mx-auto">
            <AccordionItem value="biofield" className="border rounded-lg mb-2 px-4">
              <AccordionTrigger className="text-lg font-medium hover:no-underline hover:text-gold py-6">
                Biofield Tuning - Clear Your Signal
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pb-6">
                <p className="text-charcoal/90 leading-relaxed">
                  Biofield Tuning uses tuning forks to detect and correct distortions in your body&apos;s electrical system,
                  clearing static and restoring coherence to your biofield.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  This gentle yet powerful technique helps release stored emotions, trauma, and limiting patterns,
                  allowing your natural healing intelligence to emerge.
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex items-start">
                    <span className="mr-3 text-gold mt-1">•</span>
                    <span className="text-charcoal/80">Releases energetic blocks and stored trauma</span>
                  </div>
                  <div className="flex items-start">
                    <span className="mr-3 text-gold mt-1">•</span>
                    <span className="text-charcoal/80">Improves emotional resilience and mental clarity</span>
                  </div>
                  <div className="flex items-start">
                    <span className="mr-3 text-gold mt-1">•</span>
                    <span className="text-charcoal/80">Restores your body&apos;s natural electrical flow</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="gyrotonic" className="border rounded-lg mb-2 px-4">
              <AccordionTrigger className="text-lg font-medium hover:no-underline hover:text-gold py-6">
                Gyrotonic® - Move Like Water
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pb-6">
                <p className="text-charcoal/90 leading-relaxed">
                  Gyrotonic exercise is a unique movement method that incorporates principles from yoga, dance, gymnastics,
                  and swimming to create flowing, circular movements.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Using specialized equipment, Gyrotonic helps decompress joints, enhance coordination, and build
                  functional strength while maintaining a meditative quality.
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex items-start">
                    <span className="mr-3 text-gold mt-1">•</span>
                    <span className="text-charcoal/80">Increases flexibility and joint mobility</span>
                  </div>
                  <div className="flex items-start">
                    <span className="mr-3 text-gold mt-1">•</span>
                    <span className="text-charcoal/80">Builds core strength and spinal health</span>
                  </div>
                  <div className="flex items-start">
                    <span className="mr-3 text-gold mt-1">•</span>
                    <span className="text-charcoal/80">Enhances balance and coordination</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="breathwork" className="border rounded-lg mb-2 px-4">
              <AccordionTrigger className="text-lg font-medium hover:no-underline hover:text-gold py-6">
                Breathwork - Return to Presence
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pb-6">
                <p className="text-charcoal/90 leading-relaxed">
                  Conscious breathing techniques help you release stored tension, process emotions, and expand your
                  awareness beyond the thinking mind.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Through guided breath patterns, you&apos;ll learn to regulate your nervous system, access deeper states
                  of consciousness, and cultivate inner peace.
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex items-start">
                    <span className="mr-3 text-gold mt-1">•</span>
                    <span className="text-charcoal/80">Reduces stress and anxiety naturally</span>
                  </div>
                  <div className="flex items-start">
                    <span className="mr-3 text-gold mt-1">•</span>
                    <span className="text-charcoal/80">Increases energy and mental clarity</span>
                  </div>
                  <div className="flex items-start">
                    <span className="mr-3 text-gold mt-1">•</span>
                    <span className="text-charcoal/80">Supports emotional release and integration</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 md:py-32 bg-silk relative overflow-hidden">
        {/* Subtle Background Image */}
        <div className="absolute inset-0 opacity-5">
          <Image
            src="/images/sunset-meadow.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            aria-hidden="true"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif text-center mb-4 text-charcoal">
            What Clients Say
          </h2>
          <p className="text-xl text-center mb-16 max-w-3xl mx-auto text-charcoal-light">
            Transformative experiences from our healing community
          </p>

          <div className="max-w-4xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                <CarouselItem>
                  <Card className="border-0 bg-white/50">
                    <CardContent className="p-8 text-center">
                      <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                        ))}
                      </div>
                      <p className="text-lg italic mb-6 text-charcoal/90">
                        &ldquo;Kristen&apos;s Biofield Tuning sessions have been life-changing. I feel lighter, clearer, and more myself than I have in years.&rdquo;
                      </p>
                      <p className="font-semibold text-charcoal">Sarah M.</p>
                      <p className="text-sm text-muted-foreground">Zurich</p>
                    </CardContent>
                  </Card>
                </CarouselItem>

                <CarouselItem>
                  <Card className="border-0 bg-white/50">
                    <CardContent className="p-8 text-center">
                      <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                        ))}
                      </div>
                      <p className="text-lg italic mb-6 text-charcoal/90">
                        &ldquo;The Gyrotonic sessions have completely transformed how I move. My chronic back pain is gone and I feel strong and fluid.&rdquo;
                      </p>
                      <p className="font-semibold text-charcoal">Michael T.</p>
                      <p className="text-sm text-muted-foreground">Wädenswil</p>
                    </CardContent>
                  </Card>
                </CarouselItem>

                <CarouselItem>
                  <Card className="border-0 bg-white/50">
                    <CardContent className="p-8 text-center">
                      <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                        ))}
                      </div>
                      <p className="text-lg italic mb-6 text-charcoal/90">
                        &ldquo;The breathwork sessions helped me process years of stored emotions. Kristen creates such a safe, nurturing space.&rdquo;
                      </p>
                      <p className="font-semibold text-charcoal">Emma L.</p>
                      <p className="text-sm text-muted-foreground">Au</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-serif text-center mb-4 text-charcoal">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-center mb-16 max-w-3xl mx-auto text-charcoal-light">
            Everything you need to know about your healing journey
          </p>

          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            <AccordionItem value="what-expect">
              <AccordionTrigger>What should I expect in my first session?</AccordionTrigger>
              <AccordionContent>
                Your first session begins with a conversation about your health history and intentions.
                We&apos;ll then proceed with the chosen modality, working at a pace that feels comfortable for you.
                Sessions are gentle yet powerful, and you may experience emotional releases or deep relaxation.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="how-many">
              <AccordionTrigger>How many sessions will I need?</AccordionTrigger>
              <AccordionContent>
                Everyone&apos;s healing journey is unique. Some clients experience significant shifts in 1-3 sessions,
                while others prefer ongoing support. We&apos;ll discuss your goals and create a plan that suits your needs.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="preparation">
              <AccordionTrigger>How should I prepare for a session?</AccordionTrigger>
              <AccordionContent>
                Come hydrated and wear comfortable clothing. For Gyrotonic, athletic wear is ideal.
                For Biofield Tuning and Breathwork, loose, comfortable clothing works best.
                Avoid heavy meals 2 hours before your session.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="contraindications">
              <AccordionTrigger>Are there any contraindications?</AccordionTrigger>
              <AccordionContent>
                Biofield Tuning is not recommended during pregnancy, for those with pacemakers, or immediately
                after concussion. Please inform me of any health conditions or concerns before booking.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="location">
              <AccordionTrigger>Where are sessions held?</AccordionTrigger>
              <AccordionContent>
                Sessions are held at my private studio in Au, Wädenswil (Tiefenweg 5A, 8804 Au ZH).
                The space is easily accessible by public transport and parking is available.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-silk">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-serif text-center mb-4 text-charcoal">
            Begin Your Healing Journey
          </h2>
          <p className="text-xl text-center mb-16 max-w-3xl mx-auto text-charcoal-light">
            Book a session or reach out with any questions
          </p>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>I&apos;ll respond within 24 hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Tell me about what you're looking for..." rows={4} />
                </div>
                <Button className="w-full bg-charcoal hover:bg-charcoal-800 text-white">
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Book Directly</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gold hover:bg-gold-hover text-white mb-4">
                    Schedule on Cal.com
                  </Button>
                  <p className="text-sm text-muted-foreground text-center">
                    Choose your preferred time and modality
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gold mt-0.5" />
                    <div>
                      <p className="font-medium">The Fountain Studio</p>
                      <p className="text-sm text-muted-foreground">
                        Tiefenweg 5A<br />
                        8804 Au ZH, Switzerland
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gold" />
                    <p className="text-sm">kristen@thefountainstudio.ch</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gold" />
                    <p className="text-sm">+41 79 123 45 67</p>
                  </div>

                  <Separator className="my-4" />

                  <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Chat on WhatsApp
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-silk py-12 relative overflow-hidden">
        {/* Sacred Totem Watermark */}
        <div className="absolute bottom-0 right-0 w-48 h-48 opacity-5">
          <Image
            src="/images/sacred-totem.png"
            alt=""
            fill
            className="object-contain object-bottom-right"
            aria-hidden="true"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-serif text-2xl mb-4">The Fountain Studio</h3>
              <p className="text-silk/80 text-sm">
                Healing through sound, movement, and breath.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <Link href="#services" className="block text-silk/80 hover:text-silk">Services</Link>
                <Link href="#about" className="block text-silk/80 hover:text-silk">About</Link>
                <Link href="#learn" className="block text-silk/80 hover:text-silk">Learn</Link>
                <Link href="#contact" className="block text-silk/80 hover:text-silk">Contact</Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Services</h4>
              <div className="space-y-2 text-sm">
                <p className="text-silk/80">Biofield Tuning</p>
                <p className="text-silk/80">Gyrotonic®</p>
                <p className="text-silk/80">Breathwork</p>
                <p className="text-silk/80">Integration Sessions</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Hours</h4>
              <div className="space-y-2 text-sm text-silk/80">
                <p>Monday - Friday: 9:00 - 18:00</p>
                <p>Saturday: 10:00 - 16:00</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          <Separator className="bg-silk/20 mb-8" />

          <div className="text-center text-sm text-silk/60">
            <p>© 2025 The Fountain Studio. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/41791234567?text=Hi%20Kristen,%20I'm%20interested%20in%20booking%20a%20session"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 p-4 rounded-full shadow-lg transition-all hover:scale-105"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </a>
    </div>
  );
}