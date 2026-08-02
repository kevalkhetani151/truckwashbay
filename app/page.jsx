"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Phone, Mail, MapPin, X } from "lucide-react";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

/* ── PREMIUM ONE-TIME WELCOME POPUP ─────────────────────────────────── */
function WelcomePopup({ goContact }) {
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const openTimer = setTimeout(() => {
      setShow(true);
      // allow the element to mount before animating in
      requestAnimationFrame(() => setVisible(true));
    }, 5000);
    return () => clearTimeout(openTimer);
  }, []);

  const closePopup = () => {
    setVisible(false);
    setTimeout(() => setShow(false), 300);
  };

  if (!show) return null;

  const services = [
    "Enterprise Fleet Services",
    "Deluxe Hybrid Wash",
    "Express Automated Wash",
    "Premium Cab Detailing",
    "Driver Lounge Facilities",
    "24/7 Self-Service Bays",
  ];

  return (
    <div
      onClick={closePopup}
      className={`fixed inset-0 z-[3000] flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md transition-opacity duration-300 font-sans ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-[540px] max-h-[90vh] overflow-y-auto bg-white rounded-[28px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] border border-slate-200 transition-all duration-300 ${
          visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={closePopup}
          aria-label="Close popup"
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/90 border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-colors shadow-sm"
        >
          <X size={18} />
        </button>

        {/* HERO IMAGE HEADER */}
        <div className="relative h-[190px] w-full overflow-hidden shrink-0">
          <img
            src="https://res.cloudinary.com/dnwuhcy1g/image/upload/q_auto/f_auto/v1779930872/ChatGPT_Image_May_28_2026_06_39_16_AM_vbbwdf.png"
            alt="Brizzy Truck Wash"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
          <div className="absolute bottom-5 left-6 right-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-3 shadow-md">
              Welcome to Brizzy Truck wash
            </div>
            <h3 className="text-white text-[26px] sm:text-[30px] font-black tracking-tight leading-tight">
              Truck Wash By Craig
            </h3>
          </div>
        </div>

        {/* BODY */}
        <div className="p-7 sm:p-9">
          <p className="text-slate-600 text-[14px] sm:text-[15px] leading-[1.75] mb-6">
            Premium truck washing, hybrid detailing and interior cab detailing for
            single trucks and nationwide fleets — keeping your commercial vehicles
            clean, protected, and road-ready every day.
          </p>

          {/* SERVICES GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mb-7">
            {services.map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 text-slate-700 text-[13px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                {item}
              </div>
            ))}
          </div>

          {/* CONTACT INFO CARD */}
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 mb-7 space-y-3">
            <a href="tel:+0450273046" className="flex items-center gap-3 text-slate-900 text-[15px] font-bold hover:text-blue-600 transition-colors">
              <span className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <Phone size={15} />
              </span>
              0450 273 046
            </a>
            <a href="mailto:Craig@brizzytruckwash.com.au" className="flex items-center gap-3 text-slate-600 text-[13px] font-medium hover:text-blue-600 transition-colors">
              <span className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <Mail size={15} />
              </span>
              Craig@brizzytruckwash.com.au
            </a>
            <div className="flex items-start gap-3 text-slate-600 text-[13px] font-medium">
              <span className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <MapPin size={15} />
              </span>
              <span>Rear of 1248 Lytton Rd, Hemmant QLD 4174</span>
            </div>
          </div>

          {/* CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:+0450273046"
              className="flex-1 flex items-center justify-center h-14 rounded-xl bg-slate-950 text-white font-bold text-[14px] hover:bg-slate-800 transition-colors shadow-md"
            >
              Call to Book
            </a>
            <button
              onClick={() => {
                closePopup();
                goContact();
              }}
              className="flex-1 flex items-center justify-center gap-2 h-14 rounded-xl bg-blue-600 text-white font-bold text-[14px] hover:bg-blue-700 transition-colors shadow-md"
            >
              Request a Quote
              <ArrowRight size={16} />
            </button>
          </div>

          <p className="text-center text-slate-400 text-[11px] uppercase tracking-widest mt-5 font-semibold">
            Contact us anytime — we're ready to help
          </p>
        </div>
      </div>
    </div>
  );
}

function ServicesSlider({ goContact }) {
  const sliderRef = useRef(null);

  const slide = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -420 : 420;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section
      id="complete-services"
      className="relative bg-[#f4f8fc] py-20 sm:py-32 overflow-hidden font-sans"
    >
      {/* LIGHT BACKGROUND GLOWS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-blue-200/40 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[900px] h-[900px] rounded-full bg-blue-100/50 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,#000_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="relative z-10 max-w-[1550px] mx-auto px-4 sm:px-6 md:px-12">
        
        {/* HEADER & SLIDER CONTROLS */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-slate-700 uppercase tracking-[0.2em] text-[11px] font-bold">
                Brizzy Truck Wash Complete Menu
              </span>
            </div>

            <h2 className="text-slate-900 font-[850] leading-[1.05] tracking-[-0.03em] text-[clamp(2.5rem,4vw,4rem)]">
              Comprehensive Truck care <br />
              engineered for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">long haul.</span>
            </h2>
          </div>

          {/* SLIDER NAVIGATION BUTTONS */}
          <div className="flex items-center gap-4 pb-2">
            <button
              onClick={() => slide("left")}
              className="w-14 h-14 rounded-full border border-slate-200 bg-white shadow-sm text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 flex items-center justify-center group"
            >
              <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
            </button>
            <button
              onClick={() => slide("right")}
              className="w-14 h-14 rounded-full border border-slate-200 bg-white shadow-sm text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 flex items-center justify-center group"
            >
              <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
          </div>
        </div>

        {/* SLIDER CONTAINER */}
     <div
  ref={sliderRef}
  className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 pt-4 scrollbar-hide"
  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
>
  {/* SLIDE 01: UNDERBODY STEAM CLEAN */}
 

  {/* SLIDE 02: FLEET SERVICES */}
  <div className="relative shrink-0 w-[85vw] sm:w-[400px] h-[520px] snap-center rounded-[32px] overflow-hidden bg-white shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col group">
    <div className="relative h-[220px] w-full overflow-hidden shrink-0">
      <img 
        src="/jp2.png" 
        alt="Fleet Services" 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1500ms] ease-out"
      />
      <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm text-blue-600 flex items-center justify-center font-bold shadow-sm">
        02
      </div>
    </div>
    <div className="p-8 flex flex-col justify-between flex-grow">
      <div>
        <h3 className="text-slate-900 text-[26px] font-[800] leading-tight tracking-tight mb-3">
          Enterprise Fleet Services
        </h3>
        <p className="text-slate-600 text-[15px] leading-[1.7]">
          We partner with major fleets nationwide, tailoring maintenance schedules to your budget. Includes on-site mobile units for detailed hand washing.
        </p>
      </div>

    </div>
  </div>

  {/* SLIDE 03: DELUXE WASH */}
  <div className="relative shrink-0 w-[85vw] sm:w-[400px] h-[520px] snap-center rounded-[32px] overflow-hidden bg-white shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col group">
    <div className="relative h-[220px] w-full overflow-hidden shrink-0">
      <img 
        src="/jp3.png" 
        alt="Deluxe Wash" 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1500ms] ease-out"
      />
      <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm text-blue-600 flex items-center justify-center font-bold shadow-sm">
        03
      </div>
    </div>
    <div className="p-8 flex flex-col justify-between flex-grow">
      <div>
        <h3 className="text-slate-900 text-[26px] font-[800] leading-tight tracking-tight mb-3">
          Deluxe Hybrid Wash
        </h3>
        <p className="text-slate-600 text-[15px] leading-[1.7]">
          A 100% satisfactory result requires manual prep. Our 3-person crew pre-washes the trailer rear, wheels, and cabin before the 15-minute automated cycle.
        </p>
      </div>
    </div>
  </div>

  {/* SLIDE 04: EXPRESS WASH */}
  <div className="relative shrink-0 w-[85vw] sm:w-[400px] h-[520px] snap-center rounded-[32px] overflow-hidden bg-white shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col group">
    <div className="relative h-[220px] w-full overflow-hidden shrink-0">
      <img 
        src="/jp4.png" 
        alt="Express Wash" 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1500ms] ease-out"
      />
      <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm text-blue-600 flex items-center justify-center font-bold shadow-sm">
        04
      </div>
    </div>
    <div className="p-8 flex flex-col justify-between flex-grow">
      <div>
        <h3 className="text-slate-900 text-[26px] font-[800] leading-tight tracking-tight mb-3">
          Express Automated Wash
        </h3>
        <p className="text-slate-600 text-[15px] leading-[1.7]">
          Simpler and quicker. We apply a full deep-penetration pre-soak with significant dwell time, followed by a touch-free, high-pressure automated slow pass.
        </p>
      </div>
    </div>
  </div>



  {/* SLIDE 06: LOUNGE FACILITIES */}
  <div className="relative shrink-0 w-[85vw] sm:w-[400px] h-[520px] snap-center rounded-[32px] overflow-hidden bg-white shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col group">
    <div className="relative h-[220px] w-full overflow-hidden shrink-0">
      <img 
        src="/jp6.png" 
        alt="Lounge" 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1500ms] ease-out"
      />
      <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm text-blue-600 flex items-center justify-center font-bold shadow-sm">
        06
      </div>
    </div>
    <div className="p-8 flex flex-col justify-between flex-grow">
      <div>
        <h3 className="text-slate-900 text-[26px] font-[800] leading-tight tracking-tight mb-3">
          Driver Lounge Facilities
        </h3>
        <p className="text-slate-600 text-[15px] leading-[1.7]">
          Take a break from the road while our team takes care of business. Relax with hot showers, big screen TVs, snack vending, and complimentary coffee.
        </p>
      </div>
    </div>
  </div>

  {/* SLIDE 07: CAB DETAILING */}
  <div className="relative shrink-0 w-[85vw] sm:w-[400px] h-[520px] snap-center rounded-[32px] overflow-hidden bg-white shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col group">
    <div className="relative h-[220px] w-full overflow-hidden shrink-0">
      <img 
        src="/jp7.png" 
        alt="Cab Detailing" 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1500ms] ease-out"
      />
      <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm text-blue-600 flex items-center justify-center font-bold shadow-sm">
        07
      </div>
    </div>
    <div className="p-8 flex flex-col justify-between flex-grow">
      <div>
        <h3 className="text-slate-900 text-[26px] font-[800] leading-tight tracking-tight mb-3">
          Premium Cab Detailing
        </h3>
        <p className="text-slate-600 text-[15px] leading-[1.7]">
          We don't just stop at the exterior. We offer specialized deep cleaning, interior restoration, and finishing to produce a show-quality level of detail.
        </p>
      </div>
       <span className="text-blue-600 text-sm font-semibold mt-4 block">
        By appointment only due to high demand
      </span>
    </div>
    
  </div>

</div>

        {/* BOTTOM CTA */}
        <div className="mt-10 flex justify-center">
          <button 
            onClick={goContact}
            className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 px-10 py-4 rounded-xl text-sm font-bold shadow-xl shadow-blue-900/20"
          >
            Request a Custom Quote
          </button>
        </div>

      </div>

      {/* CSS TO HIDE SCROLLBAR IN TAILWIND */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}} />
    </section>
  );
}

 function WhyChooseUs({ goContact }) {
  return (
    <section className="relative bg-[#fcfcfd] py-24 sm:py-32 overflow-hidden font-sans">
      
      {/* PREMIUM STUDIO LIGHTING (BACKGROUND) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Ambient Top Left */}
        <div className="absolute top-[-200px] left-[-100px] w-[800px] h-[800px] rounded-full bg-blue-100/40 blur-[120px]" />
        {/* Soft Ambient Bottom Right */}
        <div className="absolute bottom-[-200px] right-[-100px] w-[800px] h-[800px] rounded-full bg-slate-200/50 blur-[120px]" />
        {/* Architectural Dot Grid */}
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_center,#000_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">

        {/* EDITORIAL HEADER */}
        <div className="flex flex-col xl:flex-row justify-between gap-12 xl:gap-20 mb-20 sm:mb-28 items-start">

          {/* Left Narrative */}
          <div className="max-w-[800px]">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-slate-800 uppercase tracking-[0.25em] text-[10px] font-bold">
                Why Clients Choose Brizzy
              </span>
            </div>

            <h2 className="text-slate-950 font-extrabold leading-[0.95] tracking-tighter text-[clamp(3rem,5vw,5.5rem)]">
              Built around reliability, <br className="hidden sm:block" />
              precision & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">operational trust.</span>
            </h2>
          </div>

          {/* Right Context */}
          <div className="max-w-[450px] xl:pt-4 flex flex-col justify-end">
            <p className="text-slate-500 text-[16px] sm:text-[18px] leading-[1.8] font-medium">
              Our team delivers premium fleet cleaning experiences with advanced systems, dependable turnaround times, and service standards trusted by commercial transport companies.
            </p>

            <div className="flex flex-wrap gap-2.5 mt-8">
              {["Commercial Grade Systems", "Fast Turnaround", "Trusted Operators"].map((item, i) => (
                <div
                  key={i}
                  className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-bold shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ASYMMETRICAL BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          
          {/* FEATURE 01: WIDE CARD (SPAN 8) */}
          <div className="md:col-span-12 lg:col-span-8 group relative overflow-hidden rounded-[32px] border border-slate-200 bg-white p-8 sm:p-12 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 flex flex-col justify-between">
            <div className="absolute -right-8 -bottom-12 text-[180px] font-black text-slate-50 leading-none pointer-events-none select-none transition-transform duration-700 group-hover:scale-110">
              01
            </div>
            <div className="relative z-10 flex justify-between items-start mb-16">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
              </div>
            </div>
            <div className="relative z-10 max-w-xl">
              <h3 className="text-[28px] sm:text-[36px] font-bold leading-tight tracking-tight text-slate-950 mb-4">
                Industry-Focused Operations
              </h3>
              <p className="text-[16px] leading-[1.8] text-slate-500 font-medium">
                Specialized cleaning workflows designed specifically for transport fleets, logistics vehicles, and industrial equipment operations.
              </p>
            </div>
          </div>

          {/* FEATURE 02: TALL SQUARE (SPAN 4) */}
          <div className="md:col-span-6 lg:col-span-4 group relative overflow-hidden rounded-[32px] border border-slate-200 bg-slate-950 p-8 sm:p-10 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] transition-all duration-500 flex flex-col justify-between">
            <div className="absolute -right-4 -bottom-6 text-[140px] font-black text-white/[0.03] leading-none pointer-events-none select-none transition-transform duration-700 group-hover:scale-110">
              02
            </div>
            <div className="relative z-10 w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white mb-16">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <div className="relative z-10">
              <h3 className="text-[24px] font-bold leading-tight tracking-tight text-white mb-3">
                Priority Fleet Scheduling
              </h3>
              <p className="text-[15px] leading-[1.7] text-slate-400">
                Flexible scheduling systems and recurring maintenance plans helping businesses reduce downtime and maintain consistency.
              </p>
            </div>
          </div>

          {/* FEATURE 03: SQUARE (SPAN 4) */}
          <div className="md:col-span-6 lg:col-span-4 group relative overflow-hidden rounded-[32px] border border-slate-200 bg-white p-8 sm:p-10 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 flex flex-col justify-between">
            <div className="absolute -right-4 -bottom-6 text-[140px] font-black text-slate-50 leading-none pointer-events-none select-none transition-transform duration-700 group-hover:scale-110">
              03
            </div>
            <div className="relative z-10 w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 mb-10">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
            <div className="relative z-10">
              <h3 className="text-[24px] font-bold leading-tight tracking-tight text-slate-950 mb-3">
                Certified Service Team
              </h3>
              <p className="text-[15px] leading-[1.7] text-slate-500">
                Experienced professionals trained in modern detailing, sanitation, and heavy-duty vehicle care techniques.
              </p>
            </div>
          </div>

          {/* FEATURE 04: SQUARE (SPAN 4) */}
          <div className="md:col-span-6 lg:col-span-4 group relative overflow-hidden rounded-[32px] border border-slate-200 bg-white p-8 sm:p-10 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 flex flex-col justify-between">
            <div className="absolute -right-4 -bottom-6 text-[140px] font-black text-slate-50 leading-none pointer-events-none select-none transition-transform duration-700 group-hover:scale-110">
              04
            </div>
            <div className="relative z-10 w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 mb-10">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
            <div className="relative z-10">
              <h3 className="text-[24px] font-bold leading-tight tracking-tight text-slate-950 mb-3">
                Advanced Cleaning Tech
              </h3>
              <p className="text-[15px] leading-[1.7] text-slate-500">
                High-performance foam systems, industrial-grade pressure equipment, and eco-conscious cleaning methods.
              </p>
            </div>
          </div>

          {/* FEATURE 05: SQUARE (SPAN 4) */}
          <div className="md:col-span-6 lg:col-span-4 group relative overflow-hidden rounded-[32px] border border-slate-200 bg-white p-8 sm:p-10 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 flex flex-col justify-between">
            <div className="absolute -right-4 -bottom-6 text-[140px] font-black text-slate-50 leading-none pointer-events-none select-none transition-transform duration-700 group-hover:scale-110">
              05
            </div>
            <div className="relative z-10 w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 mb-10">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            </div>
            <div className="relative z-10">
              <h3 className="text-[24px] font-bold leading-tight tracking-tight text-slate-950 mb-3">
                Transparent Pricing
              </h3>
              <p className="text-[15px] leading-[1.7] text-slate-500">
                Clear and competitive pricing structures meticulously tailored for independent owner-operators and large commercial fleets.
              </p>
            </div>
          </div>

          {/* FEATURE 06: FULL WIDTH STRIP (SPAN 12) */}
          <div className="md:col-span-12 group relative overflow-hidden rounded-[32px] border border-blue-100 bg-gradient-to-r from-blue-50 to-white p-8 sm:p-10 hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.1)] transition-all duration-500 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="flex items-center gap-6 z-10">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <div>
                <h3 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-slate-950 mb-2">
                  Always Connected Support
                </h3>
                <p className="text-[15px] leading-[1.6] text-slate-500 max-w-2xl">
                  Responsive customer support with fast communication channels for scheduling, service updates, and real-time operational assistance.
                </p>
              </div>
            </div>
            <div className="z-10">
              <button onClick={goContact} className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 font-bold text-sm hover:border-blue-600 hover:text-blue-600 transition-colors whitespace-nowrap">
                Contact Support →
              </button>
            </div>
            {/* Massive Background Ghost Number */}
            <div className="absolute right-4 bottom-[-40px] text-[200px] font-black text-blue-500/5 leading-none pointer-events-none select-none">
              06
            </div>
          </div>

        </div>

        {/* CINEMATIC BOTTOM CTA STRIP */}
        <div className="mt-20 sm:mt-28 relative rounded-[40px] bg-slate-950 overflow-hidden shadow-2xl group">
          
          <img
            src="https://res.cloudinary.com/dnwuhcy1g/image/upload/q_auto/f_auto/v1779930872/ChatGPT_Image_May_28_2026_06_39_16_AM_vbbwdf.png"
            alt="Fleet Truck Operations"
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[2000ms] ease-out"
          />

          {/* Heavy gradient to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between p-10 sm:p-16 lg:p-20 gap-10">
            
            <div className="max-w-[600px]">
              <span className="text-blue-400 uppercase tracking-[0.2em] text-[11px] font-bold block mb-4">
                Operational Excellence
              </span>

              <h3 className="text-white text-[clamp(2.5rem,4.5vw,4rem)] font-extrabold leading-[1] tracking-tighter mb-6">
                Trusted by growing <br />
                fleet companies.
              </h3>

              <p className="text-slate-300 leading-[1.8] text-[16px] sm:text-[18px] font-light">
                From independent operators to large-scale logistics companies, our systems are built to deliver consistent quality, speed, and absolute operational efficiency.
              </p>
            </div>

            <div className="shrink-0 backdrop-blur-md bg-white/10 p-2 rounded-3xl border border-white/20">
              <button
                onClick={goContact}
                className="bg-white hover:bg-blue-600 hover:text-white transition-all duration-300 text-slate-950 px-10 py-5 rounded-2xl text-[15px] font-bold shadow-xl flex items-center gap-3"
              >
                Schedule Consultation
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>)
}

 function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "They reduced our fleet maintenance downtime by 40%. The attention to detail on our heavy machinery is simply unmatched in the region.",
      name: "Marcus T.",
      role: "Operations Manager",
      company: "Titan Logistics",
      initial: "M",
    },
    {
      quote:
        "The best detailing facility we've partnered with. Our trucks look showroom-ready every single week, which dramatically elevates our brand on the road.",
      name: "Sarah J.",
      role: "Fleet Director",
      company: "Apex Transport",
      initial: "S",
    },
    {
      quote:
        "Fast, reliable, and highly professional. Their mobile on-site service saves us hours of logistics. I highly recommend them for large-scale fleets.",
      name: "David R.",
      role: "Owner Operator",
      company: "R&D Freight",
      initial: "D",
    },
  ];

  return (
    <section className="bg-[#fcfcfd] py-24 sm:py-32 font-sans border-y border-slate-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* EDITORIAL HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 sm:mb-24">
          <div className="max-w-2xl">
            <span className="block text-blue-600 uppercase tracking-[0.2em] text-xs font-bold mb-6">
              Client Results
            </span>
            <h2 className="text-slate-950 font-extrabold leading-[1.05] tracking-tight text-[clamp(2.5rem,4vw,4rem)]">
              Trusted by the region's <br />
              top transport fleets.
            </h2>
          </div>
          
          <div className="flex gap-2 pb-2">
            {/* Aggregate Trust Badge */}
            <div className="flex flex-col items-start md:items-end">
              <div className="flex gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-500 text-sm font-medium">Average rating of 5.0/5 stars</p>
            </div>
          </div>
        </div>

        {/* TESTIMONIALS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item, index) => (
            <div 
              key={index} 
              className="group relative bg-white border border-slate-200/80 rounded-[32px] p-8 sm:p-10 shadow-sm hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle Watermark Quote */}
              <div className="absolute top-6 right-8 text-[120px] font-serif leading-none text-slate-50 pointer-events-none select-none group-hover:text-blue-50/50 transition-colors duration-500">
                "
              </div>

              <div className="relative z-10">
                {/* 5-Star Rating */}
                <div className="flex gap-1 mb-8">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* The Quote */}
                <p className="text-slate-700 leading-[1.8] text-[16px] sm:text-[17px] font-medium mb-10">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="relative z-10 flex items-center gap-4 pt-6 border-t border-slate-100">
                {/* Avatar Placeholder */}
                <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <span className="text-blue-600 font-bold text-lg">{item.initial}</span>
                </div>
                
                <div>
                  <h4 className="text-slate-900 font-bold text-[15px]">{item.name}</h4>
                  <p className="text-slate-500 text-[13px] mt-0.5">
                    {item.role}, <span className="text-slate-800 font-semibold">{item.company}</span>
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default function Home() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const tagRef = useRef(null);
  const titleRef = useRef(null);
  const rowRef = useRef(null);
  const featuresRef = useRef(null);

  const goContact = () => router.push("/contact");

  // Transparent navbar → solid on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(tagRef.current, {
        x: -40, opacity: 0, duration: 0.8, ease: "power3.out",
      });
      gsap.from(titleRef.current, {
        y: 80, opacity: 0, duration: 1.2, delay: 0.2, ease: "power4.out",
      });
      gsap.from(rowRef.current, {
        y: 40, opacity: 0, duration: 1, delay: 0.5, ease: "power3.out",
      });

      if (featuresRef.current) {
        const featureItems = featuresRef.current.querySelectorAll(".feature-item");
        gsap.from(featureItems, {
          scrollTrigger: { trigger: featuresRef.current, start: "top 75%" },
          x: 40, opacity: 0, duration: 0.8, stagger: 0.15,
        });
      }

      gsap.utils.toArray(".fade-up").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%" },
          y: 50, opacity: 0, duration: 1, ease: "power3.out",
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const navLinks = [
    { label: "Home",     href: "#" },
    { label: "Services", href: "#services" },
    { label: "About",    href: "#about" },
    { label: "price",    href: "/pricing" },
    { label: "Contact",  href: "/contact" },
  ];

  return (
    <main className="bg-white overflow-hidden">

      {/* ── PREMIUM ONE-TIME WELCOME POPUP ─────────────────────────────── */}
      <WelcomePopup goContact={goContact} />

      {/* ── MOBILE SIDEBAR OVERLAY ──────────────────────────────────────── */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-[1100] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
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
               src="/logo3.png"
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

      {/* ── HERO — true 100vh full screen ──────────────────────────────── */}
<div className="relative min-h-[100svh] w-full bg-[#FCFDFG] font-sans selection:bg-blue-200 overflow-hidden flex flex-col">
      
      {/* 1. ULTRA-PREMIUM AMBIENT BACKGROUND */}
      <div className="absolute top-0 w-full h-[800px] overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[70%] rounded-full bg-gradient-to-br from-blue-100/60 to-transparent blur-[150px]" />
        <div className="absolute top-[10%] -right-[10%] w-[40%] h-[60%] rounded-full bg-gradient-to-bl from-cyan-100/50 to-transparent blur-[150px]" />
      </div>

      {/* 2. SLEEK BRAND HEADER ("Truck Wash By Craig" at the top) */}
      <header className="relative z-20 w-full px-6 lg:px-12 py-8 flex justify-between items-center">
       
      </header>

      {/* 3. MAIN HERO CONTENT */}
      <main className="relative z-10 flex-1 flex items-center px-6 lg:px-12 py-10 lg:py-0 max-w-[1600px] mx-auto w-full">
        
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center w-full">
          
          {/* LEFT: REFINED TYPOGRAPHY & BUTTONS */}
          <div className="order-2 lg:order-1 flex flex-col items-start w-full mt-10 lg:mt-0">
            
            {/* Elegant Overline */}
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[1px] w-8 bg-blue-600/50"></span>
              <span className="text-blue-600 font-bold uppercase tracking-widest text-xs sm:text-sm">
               Truck Wash By Craig
              </span>
            </div>

            {/* Massive, Clean Typography */}
           <h1 className="text-[clamp(3.5rem,7vw,6.5rem)] leading-[0.95] tracking-[-0.04em] font-black text-slate-900 mb-6">
  Wash.
  <br />
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500">
    Perfected.
  </span>
</h1>
            <p className="text-slate-500 text-lg sm:text-xl font-medium leading-[1.7] max-w-[540px] mb-10">
              From single trucks to nationwide fleets, we deliver premium truck washing, hybrid detailing and interior cab detailing—all designed to keep your commercial vehicles clean, protected, and road-ready every day.
            </p>

            {/* Premium Buttons (Rounded-full feels more modern and luxurious) */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              
              {/* Primary Call Button */}
              <a 
                href="tel:+0450 273 046" 
                className="group relative flex items-center justify-center h-16 px-10 rounded-full bg-slate-900 text-white font-bold text-[17px] transition-all duration-300 hover:bg-slate-800 hover:shadow-[0_20px_40px_-15px_rgba(15,23,42,0.4)] hover:-translate-y-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2.5 transition-transform group-hover:scale-110" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call to Book
              </a>

              {/* Secondary Button */}
              <button
                onClick={goContact}
                className="flex items-center justify-center h-16 px-10 rounded-full bg-white text-slate-800 font-bold text-[17px] border border-slate-200 transition-all duration-300 hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm"
              >
                Request a Quote
              </button>
            </div>

            {/* Trust Indicator / Social Proof */}
            
          </div>

          {/* RIGHT: CINEMATIC VIDEO DISPLAY */}
          <div className="order-1 lg:order-2 w-full relative group">
            
            {/* Soft Glow behind video */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-700"></div>
            
            {/* Video Container */}
            <div className="relative w-full aspect-square max-h-[700px] rounded-[2.5rem] overflow-hidden bg-slate-900 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] ring-1 ring-white/50">
              
              <ReactPlayer
                url="/videos/hero.mp4"
                playing
                muted
                loop
                playsinline
                width="100%"
                height="100%"
                className="[&>video]:object-cover w-full h-full transform transition-transform duration-1000 group-hover:scale-[1.03]"
              />
              
              {/* Cinematic Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Info Card (Overlapping the video for a rich 3D effect) */}
           

          </div>
        </div>
      </main>
    </div>



      {/* ── SERVICES ────────────────────────────────────────────────────── */}
<ServicesSlider/>

      {/* ── FEATURES ────────────────────────────────────────────────────── */}
      {/* <section id="about" ref={featuresRef} className="bg-white py-16 sm:py-24 md:py-32">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 md:gap-20">
          <div className="fade-up">
            <span className="block text-slate-400 uppercase tracking-[0.2em] text-[11px] sm:text-[12px] mb-3 sm:mb-4">
              03 — Facility
            </span>
            <h2 className="text-slate-900 text-[clamp(2rem,5vw,4rem)] font-black leading-[1] tracking-[-0.04em] mb-7 sm:mb-10">
              Built for enterprise
              <br />
              logistics fleets.
            </h2>
            <p className="text-slate-500 text-[15px] sm:text-[17px] md:text-[18px] leading-[1.8] sm:leading-[1.9] max-w-[500px]">
              Our climate-controlled wash bays and industrial detailing systems guarantee consistent fleet-quality finishes.
            </p>
          </div>

          <div className="flex flex-col gap-10 sm:gap-14">
            {[
              { title: "24-Hour Turnaround", text: "Fast fleet scheduling engineered for logistics operations." },
              { title: "Industrial Foam Systems", text: "Heavy-duty decontamination without damaging surfaces." },
              { title: "Certified Technicians", text: "Every vehicle handled by experienced detailing specialists." },
            ].map((feature, index) => (
              <div key={index} className="feature-item relative pl-7 sm:pl-8">
                <div className="absolute left-0 top-[8px] w-[2px] h-[16px] sm:h-[18px] bg-[#3b82f6]" />
                <h4 className="text-slate-900 text-[22px] sm:text-[26px] md:text-[28px] font-bold mb-3 sm:mb-4 tracking-tight">
                  {feature.title}
                </h4>
                <p className="text-slate-500 leading-[1.7] sm:leading-[1.8] text-[13px] sm:text-[15px] max-w-[520px]">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}
 {/* ── about us ────────────────────────────────────────────────────── */}

   <section id="about" className="relative py-28 sm:py-36 bg-black overflow-hidden font-sans">
      
      {/* CONTROLLED PREMIUM LIGHTING */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep, subtle center-left glow */}
        <div className="absolute top-[20%] left-[-10%] w-[800px] h-[800px] rounded-full bg-blue-600/10 blur-[150px]" />
        {/* Deep, subtle bottom-right glow */}
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[150px]" />
        
        {/* Ultra-Fine Aerospace Grid */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '4rem 4rem' }} />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* EDITORIAL HEADER */}
        <div className="max-w-[900px] mb-20 sm:mb-32">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
            <span className="text-slate-300 uppercase tracking-[0.3em] text-[10px] font-semibold">
              Get To Know About Us
            </span>
          </div>

          <h2 className="text-white font-extrabold leading-[0.95] tracking-tighter text-[clamp(2.8rem,6vw,6rem)]">
            The Most Comprehensive <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 via-white to-slate-500">
              Range of Services.
            </span>
          </h2>

          <p className="mt-8 max-w-[750px] text-slate-400 text-[17px] sm:text-[19px] leading-relaxed font-light">
            In the transport game, you advertise your business everywhere you go, and there is no time for downtime. We get it. Turnaround in Brisbane and Brizzy gets you thoroughly prepped, detailed, and back on the road faster and cleaner than ever before.
          </p>
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: STORY & BENTO GRID */}
          <div className="flex flex-col gap-8">

            {/* HERO STORY CARD & METRICS */}
            <div className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-xl p-8 sm:p-12">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[100px]" />
              
              <div className="relative z-10">
                <h3 className="text-white text-[28px] sm:text-[36px] font-bold leading-tight tracking-tight mb-6">
                  24×7 Self Service Bays <br />
                  <span className="text-blue-400 font-light">& Elite Mobile Fleet Care.</span>
                </h3>

                <p className="text-slate-400 leading-[1.8] text-[16px] max-w-2xl font-light">
                  Whether you prefer to handle the wash yourself at our state-of-the-art 24/7 bays or require our mobile crew to detail your entire fleet on-site, we provide industrial-grade equipment and advanced foaming systems to protect your heavy vehicles.
                </p>

                {/* PREMIUM METRICS (Updated with your data) */}
                <div className="flex flex-wrap gap-10 sm:gap-16 mt-12 pt-8 border-t border-white/[0.05]">
                  <div>
                    <h4 className="text-[40px] font-light text-white tracking-tight leading-none mb-1">
                      410<span className="text-blue-500">K+</span>
                    </h4>
                    <p className="text-slate-500 text-[11px] uppercase tracking-widest mt-2 font-bold">Trucks Washed</p>
                  </div>
                  <div>
                    <h4 className="text-[40px] font-light text-white tracking-tight leading-none mb-1">
                      15<span className="text-blue-500">+</span>
                    </h4>
                    <p className="text-slate-500 text-[11px] uppercase tracking-widest mt-2 font-bold">Years Experience</p>
                  </div>
                  <div>
                    <h4 className="text-[40px] font-light text-white tracking-tight leading-none mb-1">
                      987<span className="text-blue-500">K+</span>
                    </h4>
                    <p className="text-slate-500 text-[11px] uppercase tracking-widest mt-2 font-bold">Happy Clients</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ASYMMETRICAL BENTO GRID */}
            <div className="grid sm:grid-cols-2 gap-6">
              
              {/* WIDE CARD */}
              <div className="sm:col-span-2 relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.02] p-8 hover:bg-white/[0.04] transition-colors duration-500 group">
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <div className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center shrink-0 group-hover:border-blue-500/50 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-300 group-hover:text-blue-400 transition-colors">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white text-xl font-semibold tracking-tight mb-2">Professional Detailing</h4>
                    <p className="text-slate-400 leading-relaxed text-sm font-light">
                      Complete interior and exterior cleaning with rigorous attention to every panel, ensuring your fleet represents your brand with excellence on the road.
                    </p>
                  </div>
                </div>
              </div>

              {/* SQUARE CARD 1 */}
            

              {/* SQUARE CARD 2 */}
            

            </div>
          </div>

          {/* RIGHT SIDE: EXCLUSIVE STICKY PANEL */}
          <div className="lg:sticky lg:top-24">
            <div className="relative rounded-[32px] border border-white/[0.08] bg-[#050505] p-8 sm:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.8)] overflow-hidden">
              
              {/* Premium Inner Glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
              <div className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />

              <div className="relative z-10">
                <span className="text-slate-500 uppercase tracking-[0.2em] text-[10px] font-semibold block mb-6">
                  The Brizzy Advantage
                </span>

                <h3 className="text-white text-[32px] sm:text-[38px] font-bold leading-[1.1] tracking-tight mb-10">
                  Trusted by <br />  Truck operators <br /> Across QLD.
                </h3>

                <div className="space-y-5">
                  {[
                    "Fast & Effective Turnarounds",
                    "Affordable Corporate Pricing",
                    "Certified & Insured Staff",
                    "Fully Mobile Cleaning Units",
                    "Eco-Friendly Chemical Systems",
                    "Dedicated Account Support",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full border border-white/10 bg-white/5 group-hover:border-blue-500/50 transition-colors">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-blue-400 transition-colors">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <p className="text-slate-300 text-sm font-light">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                {/* MAGNETIC / GLOWING BUTTON */}
                <div className="mt-12 pt-8 border-t border-white/[0.05]">
                  <button className="relative w-full overflow-hidden rounded-2xl p-[1px] group bg-white/10 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-400 transition-all duration-500">
                    <div className="relative bg-[#0a0a0a] group-hover:bg-opacity-0 rounded-[15px] px-8 py-5 flex items-center justify-center gap-3 transition-all duration-500">
                      <span className="text-white font-medium text-[15px] tracking-wide">Request a Custom Quote</span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-white transform group-hover:translate-x-1 transition-all duration-300">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </button>
                  <p className="text-center text-slate-500 text-[11px] uppercase tracking-wider mt-5 font-semibold">
                    Or call for priority scheduling
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

   
{/* Why Clients Choose Brizzy */}
<WhyChooseUs/>
     

      {/* ── PROCESS ─────────────────────────────────────────────────────── */}
      

    <section id="process" className="bg-white py-24 sm:py-32 font-sans">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* EDITORIAL HEADER */}
        <div className="max-w-3xl mb-24 sm:mb-32">
          <span className="block text-blue-600 uppercase tracking-[0.2em] text-xs font-bold mb-6">
            Our Methodology
          </span>
          <h2 className="text-slate-950 font-extrabold leading-[1.05] tracking-tight text-[clamp(2.5rem,5vw,4.5rem)]">
            A meticulous standard for Truck Wash.
          </h2>
          <p className="mt-6 text-slate-500 text-lg sm:text-xl leading-relaxed max-w-2xl font-light">
            Every commercial vehicle moves through a carefully engineered multi-stage system designed to clean, protect, and elevate your long-term fleet presentation.
          </p>
        </div>

        {/* PROCESS STEPS (MINIMAL ALTERNATING LAYOUT) */}
        <div className="space-y-32 sm:space-y-40">
          
          {/* STEP 01 */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 group">
            {/* Image */}
            <div className="w-full lg:w-1/2 order-1">
              <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] aspect-[4/3] lg:aspect-square bg-slate-50">
                <img
                  src="https://res.cloudinary.com/dnwuhcy1g/image/upload/v1779932294/ChatGPT_Image_May_28_2026_07_07_30_AM_b8qx1c.png"
                  alt="Foam Surface Activation"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
            </div>
            {/* Content */}
            <div className="w-full lg:w-1/2 order-2 flex flex-col justify-center">
              <div className="text-slate-200 font-light text-[80px] leading-none tracking-tighter mb-4 select-none">
                01
              </div>
              <h3 className="text-[28px] sm:text-[36px] font-bold text-slate-900 tracking-tight mb-6">
                Foam Surface Activation
              </h3>
              <p className="text-slate-500 text-[16px] sm:text-[18px] leading-[1.8] max-w-md font-light">
                A premium brushless foam system safely loosens industrial dirt, road buildup, grease, and contaminants before any physical treatment begins.
              </p>
            </div>
          </div>

          {/* STEP 02 (Reversed) */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24 group">
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] aspect-[4/3] lg:aspect-square bg-slate-50">
                <img
                  src="https://res.cloudinary.com/dnwuhcy1g/image/upload/v1779932296/ChatGPT_Image_May_28_2026_07_07_36_AM_qdztev.png"
                  alt="Manual Detail Precision"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2 order-2 lg:order-1 flex flex-col justify-center lg:items-end lg:text-right">
              <div className="text-slate-200 font-light text-[80px] leading-none tracking-tighter mb-4 select-none">
                02
              </div>
              <h3 className="text-[28px] sm:text-[36px] font-bold text-slate-900 tracking-tight mb-6">
                Manual Detail Precision
              </h3>
              <p className="text-slate-500 text-[16px] sm:text-[18px] leading-[1.8] max-w-md font-light">
                Our specialists manually refine difficult areas and undercarriages, ensuring hidden buildup and stubborn contaminants are fully treated.
              </p>
            </div>
          </div>

          {/* STEP 03 */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 group">
            <div className="w-full lg:w-1/2 order-1">
              <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] aspect-[4/3] lg:aspect-square bg-slate-50">
                <img
                  src="https://res.cloudinary.com/dnwuhcy1g/image/upload/q_auto/f_auto/v1779930873/ChatGPT_Image_May_28_2026_06_41_57_AM_bcalfn.png"
                  alt="Deep Pressure Cleaning"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2 order-2 flex flex-col justify-center">
              <div className="text-slate-200 font-light text-[80px] leading-none tracking-tighter mb-4 select-none">
                03
              </div>
              <h3 className="text-[28px] sm:text-[36px] font-bold text-slate-900 tracking-tight mb-6">
                Deep Pressure Cleaning
              </h3>
              <p className="text-slate-500 text-[16px] sm:text-[18px] leading-[1.8] max-w-md font-light">
                Industrial high-pressure systems extract and remove loosened grime, restoring a cleaner, flawless exterior finish across all surfaces.
              </p>
            </div>
          </div>

          {/* STEP 04 (Reversed) */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24 group">
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] aspect-[4/3] lg:aspect-square bg-slate-50">
                <img
                  src="https://res.cloudinary.com/dnwuhcy1g/image/upload/v1779932296/ChatGPT_Image_May_28_2026_07_07_43_AM_p12wnq.png"
                  alt="Pure Water Rinse"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2 order-2 lg:order-1 flex flex-col justify-center lg:items-end lg:text-right">
              <div className="text-slate-200 font-light text-[80px] leading-none tracking-tighter mb-4 select-none">
                04
              </div>
              <h3 className="text-[28px] sm:text-[36px] font-bold text-slate-900 tracking-tight mb-6">
                Pure Water Rinse
              </h3>
              <p className="text-slate-500 text-[16px] sm:text-[18px] leading-[1.8] max-w-md font-light">
                Every vehicle receives a purified, de-ionized rinse process to completely eliminate chemical residue and create a spotless presentation.
              </p>
            </div>
          </div>

          {/* STEP 05 */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 group">
            <div className="w-full lg:w-1/2 order-1">
              <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] aspect-[4/3] lg:aspect-square bg-slate-50">
                <img
                  src="https://res.cloudinary.com/dnwuhcy1g/image/upload/v1779932861/ChatGPT_Image_May_28_2026_07_16_28_AM_a9vvpu.png"
                  alt="Protective Finish"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2 order-2 flex flex-col justify-center">
              <div className="text-slate-200 font-light text-[80px] leading-none tracking-tighter mb-4 select-none">
                05
              </div>
              <h3 className="text-[28px] sm:text-[36px] font-bold text-slate-900 tracking-tight mb-6">
                Protective Finish
              </h3>
              <p className="text-slate-500 text-[16px] sm:text-[18px] leading-[1.8] max-w-md font-light mb-12">
                Final-stage drying, tire enhancement, and hydrophobic surface protection treatments deliver a refined, long-lasting commercial finish.
              </p>
              
              {/* FINAL CTA BUTTON */}
              <div>
                <button
                  onClick={goContact}
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-slate-900 text-white font-semibold text-[15px] hover:bg-blue-600 transition-colors duration-300"
                >
                  Schedule Your Fleet
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────────── */}
    <TestimonialsSection/>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
  


      

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="relative bg-[#0f172a] border-t border-slate-800 overflow-hidden">
        <div className="absolute bottom-[-200px] right-[-120px] w-[420px] h-[420px] rounded-full bg-blue-500/10 blur-[140px]" />

        <div className="relative z-10 max-w-[1300px] mx-auto px-4 sm:px-6 md:px-12 py-14 sm:py-20 md:py-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12 md:gap-16 pb-12 sm:pb-16 md:pb-20 border-b border-slate-700">

            {/* BRAND */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center">
                <Image src="/logo3.png" alt="Brizzy" width={140} height={70} className="object-contain" priority />
              </div>
              <p className="mt-4 sm:mt-6 text-white/50 leading-[1.8] sm:leading-[1.9] text-[13px] sm:text-[14px] max-w-[320px]">
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
              <h4 className="text-white font-bold text-[15px] sm:text-base md:text-lg mb-5 sm:mb-7 md:mb-8">Services</h4>
              <div className="flex flex-col gap-4 sm:gap-5">
                {["Fleet Foam Wash", "Trailer Sanitization", "Interior Detailing"].map((item, i) => (
                  <a key={i} href="/contact" className="text-white/45 hover:text-white transition text-[12px] sm:text-[13px] md:text-sm">
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* COMPANY */}
            <div>
              <h4 className="text-white font-bold text-[15px] sm:text-base md:text-lg mb-5 sm:mb-7 md:mb-8">Company</h4>
              <div className="flex flex-col gap-4 sm:gap-5">
                {["About Us", "Enterprise", "Careers"].map((item, i) => (
                  <a key={i} href="/contact" className="text-white/45 hover:text-white transition text-[12px] sm:text-[13px] md:text-sm">
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* CONTACT */}
            <div>
              <h4 className="text-white font-bold text-[15px] sm:text-base md:text-lg mb-5 sm:mb-7 md:mb-8">Contact</h4>
              <div className="flex flex-col gap-4 sm:gap-5 text-white/45 text-[12px] sm:text-[13px] md:text-sm">
                <span>hello@brizzyfleet.com</span>
                
                <span>Rear of 1248 Lytton Rd Hemmant QLD 4174</span>
               
              </div>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="pt-7 sm:pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            <p className="text-white/35 text-xs sm:text-sm text-center sm:text-left">
              © 2026 brizzy Fleet Wash. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8">
              {["Privacy Policy", "Terms & Conditions", "Fleet Support"].map((item, i) => (
                <a key={i} href="/contact" className="text-white/35 hover:text-white transition text-xs sm:text-sm">
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