import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, BrainCircuit, Cpu, CircleDollarSign, Check, Flame, ChevronRight, Heart } from "lucide-react";
import { Product } from "../types";

interface AIAdvisorProps {
  onInstantBuy: (customProduct: Product) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

interface LaptopRecommendation {
  laptopName: string;
  suitableSpecs: string;
  priceEstimation: string;
  matchPercentage: number;
  reasons: string[];
  pros: string[];
  cons: string[];
}

export default function AIAdvisor({ onInstantBuy, favorites, toggleFavorite }: AIAdvisorProps) {
  const [purpose, setPurpose] = useState("Dasturlash va IT");
  const [budget, setBudget] = useState<number>(12000000);
  const [os, setOs] = useState("Windows");
  const [battery, setBattery] = useState("Ha, juda muhim");
  const [software, setSoftware] = useState<string[]>(["VS Code", "Chrome"]);
  const [brands, setBrands] = useState<string[]>(["Lenovo", "Asus", "Apple"]);
  const [additionalFeatures, setAdditionalFeatures] = useState("Yengil vazn va metall korpus");
  
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [results, setResults] = useState<LaptopRecommendation[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const toggleCardExpansion = (id: string) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const purposeOptions = [
    "Dasturlash va IT",
    "Grafik Dizayn va Video montaj",
    "Geyming / Kuchli o'yinlar",
    "Ofis directs va hujjatlar",
    "Kundalik darslar va YouTube"
  ];

  const osOptions = ["Windows", "macOS", "Linux", "Farqi yo'q"];
  const batteryOptions = ["Ha, juda muhim", "Muhim emas", "Farqi yo'q"];
  
  const softwareOptions = [
    "VS Code / IntelliJ",
    "Photoshop / Illustrator",
    "Premiere Pro / After Effects",
    "Figma",
    "3DS Max / AutoCAD / Blender",
    "PUBG / GTA 5 / Cyberpunk",
    "Excel / Word"
  ];

  const brandOptions = ["Apple", "Lenovo", "Asus", "MSI", "HP", "Dell", "Acer"];

  const handleSoftwareToggle = (soft: string) => {
    setSoftware(prev => 
      prev.includes(soft) ? prev.filter(s => s !== soft) : [...prev, soft]
    );
  };

  const handleBrandToggle = (brand: string) => {
    setBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const runRecommendation = async () => {
    setLoading(true);
    setError(null);
    setResults(null);
    setLoadingStep(0);

    // Dynamic messaging animation
    const interval = setInterval(() => {
      setLoadingStep(prev => (prev < 3 ? prev + 1 : prev));
    }, 1200);

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          purpose,
          budget: `${(budget / 1000000).toFixed(1)} mln so'm`,
          os,
          battery,
          software: software.join(", "),
          brands: brands.join(", "),
          additionalFeatures
        })
      });

      if (!response.ok) {
        throw new Error("Tavsiya olish jarayonida xatolik yuz berdi");
      }

      const data = await response.json();
      setResults(data.recommendations || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Ulanish xatosi. Iltimos qaytadan urinib ko'ring.");
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  const convertToProduct = (rec: LaptopRecommendation, idx: number = 0): Product => {
    // Generate a secure mock image based on brand name and list index to avoid duplicated images
    const bLower = rec.laptopName.toLowerCase();
    let img = "";
    let brand: Product["brand"] = "Windows";

    if (bLower.includes("mac") || bLower.includes("apple") || bLower.includes("book")) {
      const macImages = [
        "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80"
      ];
      img = macImages[idx % macImages.length];
      brand = "Macbook";
    } else if (bLower.includes("thinkpad") || bLower.includes("lenovo") || bLower.includes("legion")) {
      const lenovoImages = [
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1629429408209-1f912961dbd8?auto=format&fit=crop&w=600&q=80"
      ];
      img = lenovoImages[idx % lenovoImages.length];
      brand = "Lenovo";
    } else if (bLower.includes("rog") || bLower.includes("asus") || bLower.includes("zenbook") || bLower.includes("tuf")) {
      const asusImages = [
        "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=600&q=80"
      ];
      img = asusImages[idx % asusImages.length];
      brand = "Asus";
    } else if (bLower.includes("katana") || bLower.includes("msi")) {
      img = "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80";
      brand = "MSI";
    } else if (bLower.includes("hp") || bLower.includes("victus") || bLower.includes("pavilion")) {
      const hpImages = [
        "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80"
      ];
      img = hpImages[idx % hpImages.length];
      brand = "HP";
    } else if (bLower.includes("dell") || bLower.includes("latitude") || bLower.includes("precision") || bLower.includes("xps")) {
      const dellImages = [
        "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1625766763788-95dcce9bf5ac?auto=format&fit=crop&w=600&q=80"
      ];
      img = dellImages[idx % dellImages.length];
      brand = "Dell";
    } else {
      const fallbacks = [
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1625766763788-95dcce9bf5ac?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80"
      ];
      img = fallbacks[idx % fallbacks.length];
      brand = "Windows";
    }

    // Parse price estimation string back to number
    const numPrice = parseInt(rec.priceEstimation.replace(/[^0-9]/g, "")) || 12000000;

    return {
      id: `ai-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      name: rec.laptopName,
      brand,
      category: "Noutbuklar",
      price: numPrice,
      imageUrl: img,
      description: rec.reasons.join(". "),
      rating: +(rec.matchPercentage / 20).toFixed(1),
      specs: {
        brandAndModel: rec.laptopName,
        cpu: rec.suitableSpecs.split(",")[0] || "Yuqori darajali protsessor",
        ram: rec.suitableSpecs.split(",")[1] || "16 GB DDR5",
        storage: rec.suitableSpecs.split(",")[2] || "512 GB high-speed SSD",
        gpu: rec.suitableSpecs.split(",")[3] || "Intel Iris Graphics",
        screenSize: "14-16 dyum",
        screenType: "Yuqori tiniqlikdagi IPS/OLED",
        batteryHealth: "100%",
        exteriorCondition: "Mutlaqo Yangi",
        batteryCycleCount: 0,
        boxAndAccessories: "To'liq quti, original quvvatlagich"
      }
    };
  };

  const loadingMessages = [
    "Talablaringiz o'rganilmoqda...",
    "Protsessor va tezkor xotira mezonlari hisoblanmoqda...",
    "Gemini AI eng zo'r modellarni taqqoslamoqda...",
    "Eng yaxshi kelishuvlar saralanmoqda..."
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Top clean micro-header matching screenshot */}
      <div className="bg-slate-100/60 px-5 py-2.5 border-b border-slate-100 flex items-center justify-between text-left select-none">
        <span className="text-[11px] font-bold text-slate-400 tracking-wide font-sans">
          Ai yordamchi | Ai asistent
        </span>
      </div>

      {/* Visual Header Banner - Restored to the ultra-premium purple core design matched with beautiful metallic silver laptop */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#410c80] to-[#5A20D4] text-white p-5 select-none min-h-[145px] flex items-center">
        {/* Subtle decorative glowing background patterns */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-orange-400/15 via-transparent to-transparent pointer-events-none"></div>
        
        <div className="w-full relative z-10">
          {/* Text Column */}
          <div className="text-left space-y-1.5 min-w-0">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[8.5px] font-black uppercase tracking-wider bg-[#ADF762] text-slate-950 shadow-sm">
              <Sparkles className="w-2.5 h-2.5 fill-slate-950" /> Gemini AI Yordamchi
            </span>
            <h1 className="text-base sm:text-lg font-black font-display tracking-tight text-[#FFFFFF] leading-snug uppercase">
              O'ZINGIZGA MOSINI TOPING!
            </h1>
            <p className="text-[10px] text-purple-100 leading-relaxed font-sans opacity-95">
              Sizga qanday noutbuk mos kelishini bilmayapsizmi? Sun'iy intellekt maxsus so'rovnoma orqali sizga mukammal noutbukni tanlab beradi!
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {!loading && !results && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-6"
            >
              {/* Question 1 */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-800 flex items-center gap-1.5">
                  <BrainCircuit className="w-4 h-4 text-[#FD6C1D]" /> Noutbukni asosan nima uchun ishlatasiz?
                </label>
                <div className="flex flex-wrap gap-2 text-xs">
                  {purposeOptions.map(opt => (
                    <button
                      key={opt}
                      onClick={() => setPurpose(opt)}
                      className={`px-3 py-2.5 rounded-xl border font-medium transition-all ${
                        purpose === opt 
                          ? "bg-[#5A20D4] text-white border-[#5A20D4] shadow-sm shadow-[#5A20D4]/20" 
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2 - Budget Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-medium">
                  <label className="text-slate-800 flex items-center gap-1.5">
                    <CircleDollarSign className="w-4 h-4 text-[#FD6C1D]" /> Byudjetingiz qancha?
                  </label>
                  <span className="text-[#FD6C1D] font-bold text-base bg-orange-50 px-3 py-1 rounded-lg border border-orange-100">
                    {budget.toLocaleString("uz-UZ")} UZS
                  </span>
                </div>
                <input
                  type="range"
                  min="4000000"
                  max="32000000"
                  step="500000"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full accent-[#FD6C1D] h-2 bg-slate-100 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>4 000 000 UZS</span>
                  <span>14 000 000 UZS</span>
                  <span>24 000 000 UZS</span>
                  <span>32 000 000 UZS+</span>
                </div>
              </div>

              {/* Question 3 - OS */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-800">
                  Qaysi operatsion tizimni xohlaysiz?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {osOptions.map(opt => (
                    <button
                      key={opt}
                      onClick={() => setOs(opt)}
                      className={`px-3 py-2.5 rounded-xl border font-medium transition-all text-center ${
                        os === opt 
                          ? "bg-[#5A20D4] text-white border-[#5A20D4] shadow-sm shadow-[#5A20D4]/20" 
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 4 - Battery */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-800">
                  Batareya uzoq ishlashi kerakmi (Quvvatlashsiz)?
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {batteryOptions.map(opt => (
                    <button
                      key={opt}
                      onClick={() => setBattery(opt)}
                      className={`px-3 py-2.5 rounded-xl border font-medium transition-all text-center ${
                        battery === opt 
                          ? "bg-[#5A20D4] text-white border-[#5A20D4]" 
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 5 - Software Multi */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-800">
                  Qanday dasturlarni ko'proq ishlatasiz? (Ko'p tanlash mumkin)
                </label>
                <div className="flex flex-wrap gap-2 text-xs">
                  {softwareOptions.map(opt => {
                    const isSelected = software.includes(opt);
                    return (
                      <button
                        key={opt}
                        onClick={() => handleSoftwareToggle(opt)}
                        className={`px-3 py-2.5 rounded-xl border font-medium transition-all flex items-center gap-1.5 ${
                          isSelected 
                            ? "bg-slate-900 text-[#ADF762] border-slate-900 shadow-sm" 
                            : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 6 - Brands */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-800">
                  Qaysi brendlarni yoqtirasiz yoki sotib olmoqchisiz?
                </label>
                <div className="flex flex-wrap gap-2 text-xs">
                  {brandOptions.map(opt => {
                    const isSelected = brands.includes(opt);
                    return (
                      <button
                        key={opt}
                        onClick={() => handleBrandToggle(opt)}
                        className={`px-3 py-2 rounded-xl border font-medium transition-all flex items-center gap-1.5 ${
                          isSelected 
                            ? "bg-[#FD6C1D] text-white border-[#FD6C1D]" 
                            : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 7 - Custom text */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-800">
                  Yana qanday qo'shimcha muhim xususiyatlar bo'lsin?
                </label>
                <input
                  type="text"
                  placeholder="Masalan: Sensorli ekran, o'ta yengil korpus, barmoq izi skaneri..."
                  value={additionalFeatures}
                  onChange={(e) => setAdditionalFeatures(e.target.value)}
                  className="w-full px-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#5A20D4] focus:bg-white transition"
                />
              </div>

              {/* Action button */}
              <button
                onClick={runRecommendation}
                className="w-full mt-2 py-4 rounded-xl bg-gradient-to-r from-[#FD6C1D] to-[#FD851D] text-white text-sm font-bold shadow-md hover:shadow-lg hover:brightness-105 active:scale-98 transition flex items-center justify-center gap-2"
              >
                <Flame className="w-4 h-4 animate-bounce" /> Qidirish (Tavsiya olish)
              </button>
            </motion.div>
          )}

          {/* Loading Animation */}
          {loading && (
            <motion.div 
              key="loading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-2xl p-12 text-center shadow-lg border border-slate-100 flex flex-col items-center justify-center gap-6 my-12"
            >
              <div className="relative">
                <div className="w-16 h-16 border-4 border-[#5A20D4]/20 border-t-[#FD6C1D] rounded-full animate-spin"></div>
                <BrainCircuit className="w-8 h-8 text-[#5A20D4] absolute inset-0 m-auto animate-pulse" />
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-800">
                  Sun'iy intellekt tahlil qilmoqda...
                </h3>
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={loadingStep}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-xs text-[#5A20D4] font-medium"
                  >
                    {loadingMessages[loadingStep]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Matches / Recommendations display */}
          {results && (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#FD6C1D] fill-[#FD6C1D]" /> Siz uchun 3 ta mukammal tanlov!
                </h2>
                <button 
                  onClick={() => {
                    setResults(null);
                    setError(null);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-[#5A20D4] hover:bg-slate-200 transition"
                >
                  Qaytadan qidirish
                </button>
              </div>

              {results.map((rec, idx) => {
                const product = convertToProduct(rec, idx);
                const isFav = favorites.includes(product.id);
                const isExpanded = expandedCards[product.id] || false;
                
                // Parse specs nicely into individual badges
                const RawSpecs = rec.suitableSpecs.replace(/^specs:\s*/i, "");
                const specItems = RawSpecs ? RawSpecs.split(",") : [];

                return (
                  <motion.div
                    key={rec.laptopName}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.15 }}
                    className="bg-white rounded-2xl p-4 border border-slate-150 shadow-sm hover:shadow-md transition duration-300 relative text-left"
                  >
                    {/* Floating recommendation badge */}
                    <div className="absolute top-3 left-3 bg-[#5A20D4] text-white px-2.5 py-1 rounded-full text-[9px] font-black tracking-wider uppercase flex items-center gap-1 shadow-sm z-10 select-none">
                      <Flame className="w-3 h-3 text-[#ADF762] fill-[#ADF762]" /> TAVSIYA #{idx + 1}
                    </div>

                    <div className="flex flex-col gap-4 mt-6">
                      
                      {/* Top Info section: Image, Title, Score */}
                      <div className="flex gap-4">
                        {/* Image box */}
                        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden relative flex flex-shrink-0 items-center justify-center p-2">
                          <img 
                            src={product.imageUrl} 
                            alt={rec.laptopName} 
                            className="max-w-full max-h-full object-contain hover:scale-105 transition duration-500"
                            referrerPolicy="no-referrer"
                          />
                          {/* Heart option */}
                          <button 
                            onClick={() => toggleFavorite(product.id)}
                            className={`absolute top-1.5 right-1.5 p-1 rounded-full backdrop-blur-md shadow-sm transition ${
                              isFav ? "bg-red-50 text-red-500" : "bg-white/80 text-slate-400 hover:text-red-500"
                            }`}
                          >
                            <Heart className={`w-3 h-3 ${isFav ? "fill-red-500" : ""}`} />
                          </button>
                        </div>

                        {/* Title, Badges & Score */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div className="space-y-1">
                            <h3 className="text-xs sm:text-sm font-black text-slate-800 leading-snug truncate">
                              {rec.laptopName}
                            </h3>
                            
                            {/* Specifications as individual badges */}
                            <div className="flex flex-wrap gap-1 mt-1 font-sans">
                              {specItems.map((spec, sIdx) => {
                                const trimmed = spec.trim();
                                if (!trimmed) return null;
                                return (
                                  <span 
                                    key={sIdx} 
                                    className="px-2 py-0.5 rounded-lg bg-slate-55 text-slate-500 text-[8px] font-extrabold uppercase tracking-tight border border-slate-100 whitespace-nowrap"
                                  >
                                    {trimmed}
                                  </span>
                                );
                              })}
                            </div>
                          </div>

                          {/* Radial / badge score for compatibility */}
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-[9px] font-black uppercase text-[#5A20D4] tracking-widest bg-purple-50 px-2 py-0.5 rounded-full">
                              Sizga {rec.matchPercentage}% mos keladi
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Expandable detailed review section */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden space-y-4 pt-2 border-t border-dashed border-slate-150"
                          >
                            {/* AI Reasoning Uzbek */}
                            <div className="space-y-1.5 bg-slate-50/70 rounded-2xl p-3 border border-slate-150 text-[10px]">
                              <span className="text-[9px] uppercase font-black text-slate-400 tracking-wider">Nega ushbu model tanlandi?</span>
                              <ul className="space-y-1 list-disc list-inside text-slate-600 pl-1">
                                {rec.reasons.map((reason, rIdx) => (
                                  <li key={rIdx} className="leading-relaxed font-semibold">{reason}</li>
                                ))}
                              </ul>
                            </div>

                            {/* Pros & Cons Columns */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px]">
                              <div className="bg-emerald-50 rounded-2xl p-3 border border-emerald-100 flex flex-col gap-1.5">
                                <span className="font-extrabold text-emerald-800 tracking-wide text-[9px] uppercase">✓ Afzalliklari:</span>
                                <ul className="space-y-1 list-none">
                                  {rec.pros.slice(0, 3).map((item, pIdx) => (
                                    <li key={pIdx} className="text-emerald-700 font-bold text-[10px] pl-1.5 border-l-2 border-emerald-300">
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="bg-rose-50 rounded-2xl p-3 border border-rose-100 flex flex-col gap-1.5">
                                <span className="font-extrabold text-rose-800 tracking-wide text-[9px] uppercase">⚠️ E'tibor bering:</span>
                                <ul className="space-y-1 list-none">
                                  {rec.cons.slice(0, 3).map((item, cIdx) => (
                                    <li key={cIdx} className="text-rose-700 font-bold text-[10px] pl-1.5 border-l-2 border-rose-300">
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Foot Buy and Toggle option */}
                      <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
                        <div className="text-left flex-1 min-w-0">
                          <span className="block text-[8px] text-slate-400 font-black uppercase tracking-tight">Kafolatlangan Narx:</span>
                          <span className="text-xs sm:text-sm font-black text-[#FD6C1D]">{rec.priceEstimation}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleCardExpansion(product.id)}
                            className="px-3.5 py-2.5 text-[10px] font-black uppercase tracking-wider text-[#5A20D4] bg-purple-50 hover:bg-purple-100 rounded-xl transition duration-200 flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <span>{isExpanded ? "Yopish" : "Tahlil"}</span>
                            <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`} />
                          </button>
                          <button
                            onClick={() => onInstantBuy(product)}
                            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FD6C1D] to-[#FD851D] text-white text-[10px] font-black uppercase tracking-widest hover:brightness-105 active:scale-97 transition duration-200 flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                          >
                            Sotib olish <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {error && (
            <motion.div 
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-red-50 text-red-800 rounded-2xl p-6 border border-red-100 flex flex-col items-center gap-3 text-center my-6"
            >
              <p className="text-xs font-semibold">{error}</p>
              <button
                onClick={runRecommendation}
                className="px-4 py-2 bg-[#5A20D4] text-white rounded-lg text-xs font-bold hover:bg-[#481AAA] transition"
              >
                Qaytdan urinib ko'rish
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
