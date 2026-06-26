import { Helmet } from "react-helmet-async";
import { Phone, MapPin, Mail, Award, Users, Star, ShieldCheck } from "lucide-react";

export function AboutUs() {
  return (
    <>
      <Helmet>
        <title>About Us | SKML Mobiles</title>
        <meta
          name="description"
          content="Learn about SKML Mobiles — your trusted destination for smartphones, accessories, and repair services in Yellamanchili."
        />
      </Helmet>

      {/* ── Hero Banner ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-6 text-center relative z-10">
          <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">
            Our Story
          </span>
          <h1 className="font-poppins font-bold text-4xl md:text-5xl text-foreground mb-4 leading-tight">
            About <span className="text-primary">SKML Mobiles</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Your one-stop destination for mobiles, accessories, spares, and trusted repair service — serving Yellamanchili and beyond since day one.
          </p>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <section className="bg-primary text-white py-8">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Users, value: "1000+", label: "Happy Customers" },
              { icon: Phone, value: "500+", label: "Devices Sold" },
              { icon: Star, value: "4.8★", label: "Average Rating" },
              { icon: ShieldCheck, value: "100%", label: "Genuine Products" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <Icon size={22} className="opacity-80 mb-1" />
                <p className="font-poppins font-bold text-2xl">{value}</p>
                <p className="text-white/70 text-xs">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About the Store ── */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                Who We Are
              </span>
              <h2 className="font-poppins font-bold text-3xl text-foreground mb-5 leading-tight">
                Trusted Mobile Store <br /> in Yellamanchili
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                SKML Mobiles is a leading mobile retail and wholesale store located near RTC Complex, Yellamanchili. We specialize in the latest smartphones from top brands, genuine accessories, original spare parts, and professional repair services.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Whether you're looking for the newest flagship phone, budget-friendly options, or need a trusted service centre for your existing device — SKML Mobiles has you covered. We take pride in offering 100% genuine products with transparent pricing and after-sales support.
              </p>
              <div className="space-y-3">
                {[
                  { icon: MapPin, text: "Near RTC Complex, Yellamanchili, Anakapalli Dist – 531055" },
                  { icon: Mail, text: "skmlmobilesylm@gmail.com" },
                  { icon: Phone, text: "+91 63002 00986" },
                ].map(({ icon: Icon, text }) => (
                  <p key={text} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Icon size={15} className="text-primary flex-shrink-0 mt-0.5" />
                    {text}
                  </p>
                ))}
              </div>
            </div>

            {/* Values Cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: ShieldCheck, title: "100% Genuine", desc: "Every product we sell is authenticated and sourced from authorized distributors.", color: "from-primary/10 to-primary/5" },
                { icon: Award, title: "Best Prices", desc: "Competitive pricing on retail and wholesale — no hidden charges.", color: "from-accent/10 to-accent/5" },
                { icon: Star, title: "Top Brands", desc: "Samsung, Apple, Realme, Xiaomi, Vivo, Oppo and more.", color: "from-yellow-500/10 to-yellow-500/5" },
                { icon: Users, title: "Customer First", desc: "We believe in long-term relationships, not just one-time sales.", color: "from-green-500/10 to-green-500/5" },
              ].map(({ icon: Icon, title, desc, color }) => (
                <div key={title} className={`bg-gradient-to-br ${color} rounded-2xl p-5 border border-border/60`}>
                  <Icon size={22} className="text-primary mb-3" />
                  <p className="font-poppins font-semibold text-sm text-foreground mb-1">{title}</p>
                  <p className="text-muted-foreground text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── About the Founder ── */}
      <section className="py-16 md:py-20 bg-secondary/40">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider">
              The Face Behind SKML
            </span>
            <h2 className="font-poppins font-bold text-3xl text-foreground">Meet the Founder</h2>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 max-w-4xl mx-auto">
            {/* Founder Photo */}
            <div className="flex-shrink-0 relative">
              <div className="w-60 h-72 md:w-72 md:h-80 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-primary/20">
                <img
                  src="/image.jpeg"
                  alt="Founder of SKML Mobiles"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-primary text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg">
                Founder & CEO
              </div>
            </div>

            {/* Founder Bio */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-poppins font-bold text-2xl md:text-3xl text-foreground mb-1">
                SKML Founder
              </h3>
              <p className="text-primary font-semibold text-sm mb-5">SKML Mobiles, Yellamanchili</p>

              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                With a deep passion for technology and a commitment to serving the local community, our founder established SKML Mobiles with a simple vision — to make quality smartphones and accessories accessible to everyone in Yellamanchili and surrounding areas.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                From humble beginnings as a small retail counter to a growing e-commerce platform, the journey reflects relentless dedication, hard work, and an unwavering focus on customer satisfaction.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                "Our customers are our family. Every device we sell, every repair we do — it's all built on trust." — <span className="text-foreground font-medium italic">SKML Founder</span>
              </p>

              {/* Social / Highlights */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                {["Mobile Enthusiast", "Community Builder", "Tech Entrepreneur", "Yellamanchili Local"].map((tag) => (
                  <span
                    key={tag}
                    className="bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-full border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-14 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2 className="font-poppins font-bold text-2xl md:text-3xl mb-3">
            Come Visit Us Today
          </h2>
          <p className="text-white/80 text-sm mb-6 max-w-md mx-auto">
            Walk into our store near RTC Complex, Yellamanchili — or shop right here on our website with home delivery.
          </p>
          <a
            href="tel:+916300200986"
            className="inline-flex items-center gap-2 bg-white text-primary font-poppins font-semibold text-sm px-7 py-3 rounded-full hover:bg-white/90 transition-colors shadow-lg"
          >
            <Phone size={15} />
            Call Us: +91 63002 00986
          </a>
        </div>
      </section>
    </>
  );
}
