import { Helmet } from "react-helmet-async";
import { Phone, MapPin, Mail, Award, Users, Star, ShieldCheck } from "lucide-react";
import { useGetSettings } from "../hooks/useData";

export function AboutUs() {
  const { data: settings } = useGetSettings();

  return (
    <>
      <Helmet>
        <title>About Us | SKML</title>
        <meta
          name="description"
          content="Learn about SKML — your trusted destination for electronics, fashion, and lifestyle products in Kadapa."
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
            About <span className="text-primary">SKML</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Your one-stop destination for electronics, fashion, beauty, and home essentials — serving Kadapa and beyond.
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
                Skml mobiles is a trusted retail and wholesale store located near RTC Complex, Yellamanchili. Since 2023, we specialize in all mobiles, A to Z mobile accessories, mobile spares, and professional mobile services.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                We cater to all customers, offering both retail and wholesale options. With our successful physical store, we are now bringing our products online to reach our customers more easily and provide a seamless shopping experience.
              </p>
              <div className="space-y-3">
                {[
                  { icon: MapPin, text: settings?.address || "Near Rtc complex yellamanchili, 531055, Anakapalli District" },
                  { icon: Mail, text: settings?.email || "skmlmobilesylm@gmail.com" },
                  { icon: Phone, text: settings?.phone || "+91 6300200986" },
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
                { icon: ShieldCheck, title: "100% Genuine", desc: "Every product and spare we sell is authenticated and sourced reliably.", color: "from-primary/10 to-primary/5" },
                { icon: Award, title: "Retail & Wholesale", desc: "Competitive pricing for everyone — from individual buyers to bulk orders.", color: "from-accent/10 to-accent/5" },
                { icon: Star, title: "All Mobiles & Spares", desc: "We provide all mobile phones, A to Z accessories, and full service.", color: "from-yellow-500/10 to-yellow-500/5" },
                { icon: Users, title: "Customer First", desc: "Operating successfully since 2023 with trust and dedication.", color: "from-green-500/10 to-green-500/5" },
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
              The Face Behind {settings?.storeName || "SKML"}
            </span>
            <h2 className="font-poppins font-bold text-3xl text-foreground">Meet the Founder</h2>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 max-w-4xl mx-auto">
            {/* Founder Photo */}
            <div className="flex-shrink-0 relative">
              <div className="w-60 h-72 md:w-72 md:h-80 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-primary/20">
                <img
                  src="/founder.jpeg"
                  alt={`Founder of ${settings?.storeName || "SKML"}`}
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
                Boddapu Lokesh
              </h3>
              <p className="text-primary font-semibold text-sm mb-5">Founder, Skml mobiles, Yellamanchili</p>

              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                I started my physical store in 2023 and have been running it successfully. My vision is to get my products to my customers easily, which is why I chose to bring Skml mobiles online.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Whether you need a new mobile, A to Z accessories, spares, or reliable mobile service, we are here to provide the best for both retail and wholesale customers.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                "Our customers are our family. Every product we sell is built on trust." — <span className="text-foreground font-medium italic">Boddapu Lokesh</span>
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
            Walk into our store near {settings?.address || "RTC Complex, Yellamanchili"} — or shop right here on our website with home delivery.
          </p>
          <a
            href={`tel:${settings?.phone}`}
            className="inline-flex items-center gap-2 bg-white text-primary font-poppins font-semibold text-sm px-7 py-3 rounded-full hover:bg-white/90 transition-colors shadow-lg"
          >
            <Phone size={15} />
            Contact Us
          </a>
        </div>
      </section>
    </>
  );
}
