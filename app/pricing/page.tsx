"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  FileDown,
  ShieldCheck,
  Waves,
  Clock,
  ChevronRight
} from "lucide-react";

// ─── PREMIUM PRICING ROW COMPONENT ──────────────────────────────────────
const PricingRow = ({ 
  title, 
  express, 
  deluxe 
}: { 
  title: string; 
  express: string; 
  deluxe: string; 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative cursor-pointer border-b border-slate-200/60 overflow-hidden"
    >
      {/* Hover Background Reveal */}
      <div 
        className={`absolute inset-0 bg-blue-600 transition-transform duration-500 ease-[0.16,1,0.3,1] origin-bottom ${
          isHovered ? "scale-y-100" : "scale-y-0"
        }`} 
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between px-6 py-8 md:py-10 transition-colors duration-500">
        <div className="flex items-center gap-6 mb-6 md:mb-0">
          <ChevronRight 
            className={`transition-all duration-500 ${
              isHovered ? "text-white translate-x-2" : "text-slate-300"
            }`} 
          />
          <h3 className={`text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight transition-colors duration-500 ${
            isHovered ? "text-white" : "text-slate-950"
          }`}>
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-10 md:gap-16 pl-12 md:pl-0">
          <div className="flex flex-col">
            <span className={`text-[10px] font-black uppercase tracking-widest mb-1 transition-colors duration-500 ${
              isHovered ? "text-blue-200" : "text-slate-400"
            }`}>
              Express
            </span>
            <span className={`font-mono text-xl transition-colors duration-500 ${
              isHovered ? "text-white" : "text-slate-500"
            }`}>
              {express}
            </span>
          </div>
          <div className="flex flex-col">
            <span className={`text-[10px] font-black uppercase tracking-widest mb-1 transition-colors duration-500 ${
              isHovered ? "text-white" : "text-blue-600"
            }`}>
              Deluxe
            </span>
            <span className={`font-mono text-2xl font-bold transition-colors duration-500 ${
              isHovered ? "text-white" : "text-slate-950"
            }`}>
              {deluxe}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function PricingPage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const goContact = (): void => { router.push("/contact"); };

  useEffect(() => {
    const onScroll = (): void => { setScrolled(window.scrollY > 20); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/#services" },
    { label: "About", href: "/#about" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <main className="bg-white text-[#0d111c] overflow-hidden min-h-screen selection:bg-blue-600 selection:text-white font-sans antialiased tracking-tight">
      
      {/* ── BACKGROUND NOISE ────────────────────────────────────────────── */}
      <div className="fixed inset-0 z-[999] pointer-events-none opacity-[0.02] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* ── MOBILE SIDEBAR OVERLAY ────────────────────────────────────── */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-[1100] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[300px] max-w-[85vw] z-[1200] bg-[#0f172a] border-l border-slate-700 flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 h-[64px] border-b border-slate-700">
          <a href="/" className="text-white text-[1.2rem] font-black tracking-tight">
            brizzy<span className="text-[#3b82f6]">.</span>
          </a>
          <button
            onClick={() => setMenuOpen(false)}
            className="w-9 h-9 flex flex-col items-center justify-center gap-[5px]"
            aria-label="Close menu"
          >
            <span className="block w-5 h-[2px] bg-white rotate-45 translate-y-[3.5px] transition-all" />
            <span className="block w-5 h-[2px] bg-white -rotate-45 -translate-y-[3.5px] transition-all" />
          </button>
        </div>

        <nav className="flex flex-col px-6 pt-8 gap-1">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-slate-300 hover:text-white text-[17px] font-semibold py-3 border-b border-slate-800 transition"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="px-6 mt-8 flex flex-col gap-3">
          <button
            onClick={() => { setMenuOpen(false); goContact(); }}
            className="w-full bg-[#3b82f6] hover:bg-[#2563eb] transition text-white py-4 rounded-xl font-bold text-[15px]"
          >
            Book Appointment
          </button>
          <a
            href="http://brizzytruckwash.com.au/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition text-white py-4 rounded-xl font-bold text-[15px]"
          >
            Mobile Wash <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      {/* ── FIXED SOLID WHITE NAVIGATION BAR ──────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 w-full z-[1000] flex items-center justify-between px-6 md:px-14 bg-white/90 backdrop-blur-xl border-b border-slate-200/60 transition-all duration-400 ${
          scrolled ? "h-[80px] shadow-[0_4px_40px_rgba(0,0,0,0.02)]" : "h-[96px]"
        }`}
      >
        <a href="/" className="flex-shrink-0 transition-opacity hover:opacity-75">
          <Image
            src="/logo2.png"
            alt="Brizzy Logo"
            width={72}
            height={56}
            className="h-auto w-auto mix-blend-multiply"
            priority
          />
        </a>

        <ul className="hidden xl:flex items-center gap-10">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className={`transition-colors duration-300 text-[12px] uppercase tracking-[0.2em] font-bold relative group ${
                  label === "Pricing" ? "text-slate-950" : "text-slate-500 hover:text-slate-950"
                }`}
              >
                {label}
                <span className={`absolute -bottom-2 left-0 h-[1.5px] bg-slate-950 transition-all duration-300 ${
                  label === "Pricing" ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="http://brizzytruckwash.com.au/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-all duration-300 px-5 py-3.5 rounded-xl font-bold text-[11px] tracking-widest uppercase shadow-sm"
          >
            Mobile Wash
            <ArrowUpRight size={14} />
          </a>
          <button
            onClick={goContact}
            className="flex items-center gap-2 bg-slate-950 text-white hover:bg-slate-800 transition-all duration-300 px-6 py-3.5 rounded-xl font-bold text-[11px] tracking-widest uppercase shadow-md shadow-slate-900/10"
          >
            Book Appointment
            <ArrowRight size={14} />
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(true)}
          className="xl:hidden flex flex-col gap-[5px] p-3 rounded-xl bg-white border border-slate-200 shadow-sm ml-auto md:ml-4"
        >
          <span className="block w-5 h-[1.5px] bg-slate-950" />
          <span className="block w-4 h-[1.5px] bg-slate-950 self-end" />
        </button>
      </nav>

      {/* ── KINETIC HERO SECTION ───────────────────────────────────────── */}
      <section ref={containerRef} className="relative pt-[200px] pb-20 md:pt-[280px] md:pb-40 bg-[#f8f9fa] overflow-hidden">
        {/* Architectural Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-[1400px] mx-auto px-6 md:px-14 relative z-10"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-slate-200 bg-white mb-8 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse"></span>
            <span className="text-slate-500 uppercase tracking-[0.3em] text-[10px] font-extrabold">
              Fiscal Year 2026 Index
            </span>
          </div>
          
          <h1 className="text-[#0d111c] font-light leading-[0.85] tracking-tighter text-[clamp(4rem,10vw,9rem)]">
            ASSET <br/> 
            <span className="font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-950 via-slate-800 to-blue-600">VALUATION.</span>
          </h1>

          <div className="mt-12 max-w-sm">
            <p className="text-slate-500 font-mono text-xs uppercase tracking-widest leading-relaxed">
              Precision commercial fleet washing rates. <br/>
              Includes all applicable GST. <br/>
              Subject to 7% adjustment.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── EDITORIAL STICKY SCROLL PRICING ────────────────────────────── */}
      <section className="relative z-20 bg-white border-t border-slate-200/60">
        <div className="max-w-[1400px] mx-auto px-6 md:px-14 py-32">
          
          {/* SECTION 1: FREIGHT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-40">
            <div className="lg:col-span-4 relative">
              <div className="sticky top-40">
                <span className="text-blue-600 font-black text-[10px] uppercase tracking-widest block mb-4">
                  Category 01
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 mb-6 leading-[1.1]">
                  Freight &amp; <br/>Multi-Trailers
                </h2>
                <p className="text-slate-500 font-light text-lg">
                  Standardized metrics for heavy-duty long-haul combinations.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8 border-t border-slate-200/60">
              <PricingRow title="Prime Mover Only" express="$125" deluxe="$170" />
              <PricingRow title="Single Trailer Comb." express="$145" deluxe="$220" />
              <PricingRow title="B-Double Combination" express="$195" deluxe="$300" />
              <PricingRow title="Car Carriers Fleet" express="$175" deluxe="$230" />
            </div>
          </div>

          {/* SECTION 2: SPECIALTY */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4 relative">
              <div className="sticky top-40">
                <span className="text-blue-600 font-black text-[10px] uppercase tracking-widest block mb-4">
                  Category 02
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 mb-6 leading-[1.1]">
                  Rigid &amp; <br/>Specialty
                </h2>
                <p className="text-slate-500 font-light text-lg">
                  Calibrated for construction, tippers, and unique chassis setups.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8 border-t border-slate-200/60">
              <PricingRow title="Single Rigid Vehicle" express="$80" deluxe="$125" />
              <PricingRow title="Rigid Tipper & Dog" express="$195" deluxe="$250" />
              <PricingRow title="Single Tanker Comb." express="$170" deluxe="$255" />
              <PricingRow title="Single Low Loader" express="—" deluxe="$225" />
            </div>
          </div>

        </div>
      </section>

      {/* ── BENTO BOX: ADD-ONS & HOURS ─────────────────────────────────── */}
      <section className="py-32 bg-[#0f172a] text-white rounded-t-[3rem] relative z-30">
        <div className="max-w-[1400px] mx-auto px-6 md:px-14">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Additional Treatments (Span 8) */}
            <div className="md:col-span-8 bg-[#1e293b] rounded-[2rem] p-10 md:p-14 border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
              
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10">Add-On Dynamics</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
                {[
                  { name: "Underbody Steam", cost: "From $380", desc: "Standard extraction process." },
                  { name: "Deck Blast Protocol", cost: "From $35", desc: "Calculated per trailer basis." },
                  { name: "Env. Discharge Levy", cost: "$3.00", desc: "Mandatory regulatory fee." },
                  { name: "Tyre Hydro-Shine", cost: "$1.50/ea", desc: "Premium aesthetic finish." },
                ].map((item, i) => (
                  <div key={i} className="group cursor-default">
                    <div className="flex justify-between items-end border-b border-white/10 pb-3 mb-3 group-hover:border-blue-500/50 transition-colors">
                      <h4 className="font-bold text-lg">{item.name}</h4>
                      <span className="font-mono text-blue-400 font-bold">{item.cost}</span>
                    </div>
                    <p className="text-slate-400 text-xs font-mono uppercase tracking-widest">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Operating Hours (Span 4) */}
            <div className="md:col-span-4 bg-blue-600 rounded-[2rem] p-10 md:p-14 text-white flex flex-col justify-between">
              <div>
                <Clock className="w-8 h-8 mb-8 opacity-80" />
                <h3 className="text-3xl font-extrabold tracking-tight mb-8">Operating <br/>Windows</h3>
                
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-200 block mb-1">MON — FRI</span>
                    <span className="text-xl font-bold">05:00 AM – 07:00 PM</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-200 block mb-1">SATURDAY</span>
                    <span className="text-xl font-bold">04:00 AM – 01:00 PM</span>
                  </div>
                  <div className="pt-4 border-t border-white/20">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-200 block mb-1">SUNDAY</span>
                    <span className="text-xl font-bold tracking-tight uppercase">Booking Only</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── HIGH VISUAL CALL-TO-ACTION BANNER ──────────────────────────── */}
      <section className="bg-white relative py-40 border-b border-slate-200/60 overflow-hidden">
        <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center">
          <span className="text-blue-600 uppercase tracking-[0.25em] text-[11px] font-extrabold">
            Corporate Framework Agreements
          </span>
          <h2 className="text-slate-950 font-light tracking-tighter text-5xl sm:text-7xl mt-6 mb-8 leading-tight">
            Commercial <span className="font-extrabold">Credit Access.</span>
          </h2>
          <p className="text-slate-500 font-light text-lg sm:text-xl max-w-xl mx-auto mb-12 leading-relaxed">
            Streamline validation requirements. Access priority express lines and specialized month-end billing configurations.
          </p>
          
          <div className="flex justify-center">
            <button className="group relative px-10 py-5 bg-slate-950 text-white font-bold uppercase text-[11px] tracking-widest flex items-center gap-4 rounded-xl transition-all shadow-xl shadow-slate-900/10 hover:shadow-slate-900/20 hover:-translate-y-1">
              <span>Download Application Form</span>
              <FileDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ── METICULOUS CLEAN LIGHT FOOTER (EXACT MATCH) ───────────────── */}
      <footer className="relative bg-[#0f172a] overflow-hidden">
        <div className="absolute bottom-[-200px] right-[-120px] w-[420px] h-[420px] rounded-full bg-blue-500/10 blur-[140px]" />

        <div className="relative z-10 max-w-[1300px] mx-auto px-4 sm:px-6 md:px-12 py-14 sm:py-20 md:py-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12 md:gap-16 pb-12 sm:pb-16 md:pb-20 border-b border-slate-700">

            {/* BRAND */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center">
                <Image
                  src="/logo2.png"
                  alt="Brizzy"
                  width={140}
                  height={70}
                  className="object-contain"
                  priority
                />
              </div>
              <p className="mt-4 sm:mt-6 text-white/50 leading-[1.8] sm:leading-[1.9] text-[15px] sm:text-[16px] max-w-[320px]">
                Professional truck washing services designed to keep your vehicles clean, presentable, and road-ready.
              </p>
              <div className="flex items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
                {["IG", "TW", "LI"].map((item, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:border-blue-400/50 hover:bg-blue-500/10 transition text-xs sm:text-sm cursor-pointer"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* SERVICES */}
            <div>
              <h4 className="text-white font-bold text-[16px] sm:text-lg mb-5 sm:mb-7 md:mb-8">Services</h4>
              <div className="flex flex-col gap-4 sm:gap-5">
                {["Fleet Foam Wash", "Ceramic Protection", "Trailer Sanitization", "Interior Detailing"].map((item, i) => (
                  <a key={i} href="/contact" className="text-white/45 hover:text-white transition text-sm">
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* COMPANY */}
            <div>
              <h4 className="text-white font-bold text-[16px] sm:text-lg mb-5 sm:mb-7 md:mb-8">Company</h4>
              <div className="flex flex-col gap-4 sm:gap-5">
                {["About Us", "Fleet Solutions", "Enterprise", "Careers"].map((item, i) => (
                  <a key={i} href="/contact" className="text-white/45 hover:text-white transition text-sm">
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* CONTACT */}
            <div>
              <h4 className="text-white font-bold text-[16px] sm:text-lg mb-5 sm:mb-7 md:mb-8">Contact</h4>
              <div className="flex flex-col gap-4 sm:gap-5 text-white/45 text-sm">
                <span>info@brizzytruckwash.com.au</span>
                <span>Brisbane &amp; Gold Coast, QLD, Ipswich</span>
                <span>24/7 Fleet Support</span>
              </div>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="pt-7 sm:pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            <p className="text-white/35 text-sm text-center sm:text-left">
              © 2026 brizzy Fleet Wash. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8">
              {["Privacy Policy", "Terms & Conditions", "Fleet Support"].map((item, i) => (
                <a key={i} href="/contact" className="text-white/35 hover:text-white transition text-sm">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}