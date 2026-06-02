import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, BrainCircuit, Cpu, CircleDollarSign, Check, Flame, ChevronRight, Heart } from "lucide-react";
import { Product, INITIAL_PRODUCTS } from "../types";

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

    // Dynamic offline matching message interval
    const interval = setInterval(() => {
      setLoadingStep(prev => (prev < 3 ? prev + 1 : prev));
    }, 400);

    // Completely client-side smart recommendation engine
    setTimeout(() => {
      try {
        const scored = INITIAL_PRODUCTS
          .filter(p => p.category === "Noutbuklar")
          .map(product => {
            let score = 50;

            // 1. Budget fit scoring
            if (product.price <= budget) {
              score += 30;
              // Close to budget gets value-maximization points
              if (product.price >= budget * 0.65) {
                score += 15;
              }
            } else {
              const ratio = product.price / budget;
              if (ratio <= 1.25) {
                score -= 10; // slightly over budget
              } else {
                score -= 40; // significantly over budget
              }
            }

            // 2. Brand preference scoring
            const pBrand = product.brand.toLowerCase();
            const lowerBrands = brands.map(b => b.toLowerCase());
            if (brands.length > 0) {
              if (lowerBrands.includes(pBrand)) {
                score += 25;
              } else {
                score -= 15;
              }
            }

            // 3. Operating System scoring
            const lowerOS = os.toLowerCase();
            if (lowerOS === "macos") {
              if (product.brand === "Macbook") {
                score += 30;
              } else {
                score -= 50;
              }
            } else if (lowerOS === "windows") {
              if (product.brand !== "Macbook") {
                score += 25;
              } else {
                score -= 50;
              }
            } else if (lowerOS === "linux") {
              if (product.brand !== "Macbook") {
                score += 15;
              } else {
                score -= 30;
              }
            }

            // 4. Purpose & Software optimization scoring
            const pNameLower = product.name.toLowerCase();
            const pDescLower = product.description.toLowerCase();
            const pCpuLower = product.specs.cpu.toLowerCase();
            const pGpuLower = product.specs.gpu.toLowerCase();

            if (purpose === "Dasturlash va IT") {
              if (product.specs.ram.includes("16 GB") || product.specs.ram.includes("32 GB") || product.specs.ram.includes("48 GB")) {
                score += 25;
              }
              if (pCpuLower.includes("i7") || pCpuLower.includes("i9") || pCpuLower.includes("ryzen 7") || pCpuLower.includes("ryzen 9") || pCpuLower.includes("m3") || pCpuLower.includes("m2")) {
                score += 15;
              }
              if (software.some(s => s.toLowerCase().includes("vs code") || s.toLowerCase().includes("intellij"))) {
                score += 10;
              }
            } else if (purpose === "Grafik Dizayn va Video montaj") {
              if (pGpuLower.includes("rtx") || pGpuLower.includes("geforce") || pCpuLower.includes("m3 pro") || pCpuLower.includes("m3 max")) {
                score += 25;
              }
              if (product.specs.screenType.toLowerCase().includes("oled") || product.specs.screenType.toLowerCase().includes("retina")) {
                score += 15;
              }
              if (software.some(s => s.toLowerCase().includes("photoshop") || s.toLowerCase().includes("premiere") || s.toLowerCase().includes("after") || s.toLowerCase().includes("figma") || s.toLowerCase().includes("3ds") || s.toLowerCase().includes("autocad"))) {
                score += 15;
              }
            } else if (purpose === "Geyming / Kuchli o'yinlar") {
              if (pGpuLower.includes("rtx") || pGpuLower.includes("geforce")) {
                score += 35;
                if (pGpuLower.includes("4070") || pGpuLower.includes("4080") || pGpuLower.includes("4090")) {
                  score += 15;
                }
              }
              if (product.specs.screenType.toLowerCase().includes("144hz") || product.specs.screenType.toLowerCase().includes("165hz") || product.specs.screenType.toLowerCase().includes("240hz")) {
                score += 15;
              }
              if (software.some(s => s.toLowerCase().includes("pubg") || s.toLowerCase().includes("gta") || s.toLowerCase().includes("cyberpunk"))) {
                score += 10;
              }
              if (pCpuLower.includes("celeron") || pCpuLower.includes("pentium") || pGpuLower.includes("600")) {
                score -= 60; // completely unqualified for deep gaming
              }
            } else if (purpose === "Ofis directs va hujjatlar") {
              if (product.price <= 12000000) {
                score += 25;
              }
              if (software.some(s => s.toLowerCase().includes("excel") || s.toLowerCase().includes("word"))) {
                score += 10;
              }
            } else if (purpose === "Kundalik darslar va YouTube") {
              if (product.price <= 9000000) {
                score += 30;
              }
            }

            // 5. Battery efficiency preference
            if (battery === "Ha, juda muhim") {
              if (product.brand === "Macbook") {
                score += 20;
              } else if (pCpuLower.includes("u") || pCpuLower.includes("ultra") || pCpuLower.includes("7535hs") || pCpuLower.includes("1335u") || pCpuLower.includes("1235u")) {
                score += 15;
              }
              if (pCpuLower.includes("hx") || pNameLower.includes("katana") || pNameLower.includes("alienware") || pNameLower.includes("strix")) {
                score -= 15; // gaming powerhouses consume a lot of run-time battery
              }
            }

            // 6. Fuzzy keyword matching for specific custom features
            if (additionalFeatures.trim()) {
              const queryWords = additionalFeatures.toLowerCase().split(/\s+/).filter(w => w.length > 2);
              queryWords.forEach(word => {
                if (pNameLower.includes(word) || pDescLower.includes(word) || product.specs.screenType.toLowerCase().includes(word) || product.specs.screenSize.toLowerCase().includes(word)) {
                  score += 8;
                }
              });
            }

            return { product, score };
          });

        // Sorted recommendations descending
        scored.sort((a, b) => b.score - a.score);

        const recommendations = scored.slice(0, 3).map((item, idx) => {
          const p = item.product;
          const reasons: string[] = [];

          if (p.price <= budget) {
            reasons.push(`Ushbu model siz kiritgan byudjetga (${(budget / 1000000).toFixed(1)} mln so'm) to'liq rioya qiladi va yuqori darajada tejaydi.`);
          } else {
            reasons.push(`Xaridorlarning talabini mukammal bajarish uchun byudjetingizga juda yaqin narxdagi eng optimal premium variant saralandi.`);
          }

          if (purpose === "Dasturlash va IT") {
            reasons.push(`Tezkor algoritmlar, testlash hamda VS Code / IntelliJ uchun kuchli ${p.specs.cpu} protsessori hamda ${p.specs.ram} tezkor xotirasi bilan mukammal integratsiya.`);
          } else if (purpose === "Grafik Dizayn va Video montaj") {
            reasons.push(`Rang uzatishning yuqori darajasi (${p.specs.screenType}) va professional grafik renderlash (${p.specs.gpu}) tufayli ijodiy ishlarga juda mos.`);
          } else if (purpose === "Geyming / Kuchli o'yinlar") {
            reasons.push(`Eng og'ir kadrli o'yinlarda yuqori unumdorlik va quloqlarni charchatmaydigan termal sovutish tizimi hamda ${p.specs.gpu} videokartasi.`);
          } else {
            reasons.push(`Kundalik hayot, sifatli darslar, veb-surfing hamda dars loyihalari uchun hamyonbop va mutlaqo qulay apparat unumdorligi.`);
          }

          if (p.brand === "Macbook") {
            reasons.push("Ekologik materiallar hamda nozik dizayndagi korpus, ajoyib klaviatura va 15-20 soatgacha yetadigan energiya zaxirasi.");
          } else if (p.brand === "Lenovo" && p.name.includes("ThinkPad")) {
            reasons.push("Biznes darajasidagi titanga to'la mustahkam qurilma, ideal xavfsizlik va barmoqlarni charchatmaydigan patentlangan drayverli klaviatura.");
          } else {
            reasons.push("Raqobatbardosh narx, ishonchli mexanik qismlar va bozorda xizmat ko'rsatish shoxobchalarining juda kengligi.");
          }

          const pros: string[] = [];
          const cons: string[] = [];

          // Dynamic pros map
          if (p.specs.screenType.toLowerCase().includes("oled")) {
            pros.push("O'ta yorqin va tiniq 120Hz/240Hz OLED professional displey");
          } else if (p.specs.screenType.toLowerCase().includes("retina")) {
            pros.push("Premium Retina silliq displey, maksimal ko'z himoyasi");
          } else {
            pros.push("Keng burchakli yuqori aniqlikdagi IPS displey");
          }

          if (parseFloat(p.specs.ram) >= 16) {
            pros.push(`Ko'p vazifali ishlash uchun juda katta tezkor xotira (${p.specs.ram})`);
          } else {
            pros.push(`Tejamkor va barqaror tizim platasi (${p.specs.ram})`);
          }

          if (p.specs.gpu.toLowerCase().includes("rtx")) {
            pros.push(`O'yinlar va 3D renderlar uchun nurlarni kuzatuvchi RTX videokartasi (${p.specs.gpu})`);
          } else if (p.brand === "Macbook") {
            pros.push("Har qanday zaryadlash moslamasiz uzoq ishlovchi yuqori zaxira batareyasi");
          } else {
            pros.push("Silliq dars loyihalari uchun ideal ichki grafik protsessor");
          }

          // Dynamic cons map
          if (p.specs.gpu.toLowerCase().includes("rtx") && !p.name.includes("Slim") && !p.name.includes("Zephyrus")) {
            cons.push("Yuqori quvvat talab qilganligi sababli og'irroq quvvatlagich bloki");
            cons.push("Maksimal o'yin renderlarida fan tovushi kuchayadi");
          } else if (p.brand === "Macbook" && p.specs.ram.includes("8 GB")) {
            cons.push("Kelajakda RAM xotirasini mustaqil uy sharoitida kengaytirib bo'lmaydi");
          } else if (p.price < 6000000) {
            cons.push("Murakkab 3D modellashtirish va eng og'ir 2024+ yillardagi o'yinlarga mo'ljallanmagan");
          } else {
            cons.push("Tavsiya mezonlari ofisga ko'proq ulanadi");
          }

          if (cons.length === 0) {
            cons.push("Sensorli ekran faqat ma'lum burchaklarda mukammal sezgirlikka ega");
          }

          const matchPct = Math.min(99, Math.max(82, 80 + Math.floor(item.score / 2.5)));

          return {
            laptopName: p.name,
            suitableSpecs: `${p.specs.cpu}, ${p.specs.ram}, ${p.specs.storage}`,
            priceEstimation: `${p.price.toLocaleString("uz-UZ")} UZS`,
            matchPercentage: matchPct,
            reasons,
            pros,
            cons
          };
        });

        clearInterval(interval);
        setResults(recommendations);
      } catch (err: any) {
        clearInterval(interval);
        setError("Tahlil qilishda kutilmagan xatolik yuz berdi. Qayta urinib ko'ring.");
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  const convertToProduct = (rec: LaptopRecommendation, idx: number = 0): Product => {
    // Find matching product dynamically to ensure real purchase mapped successfully
    const matched = INITIAL_PRODUCTS.find(p => p.name === rec.laptopName);
    if (matched) {
      return matched;
    }
    
    // safe fallback
    return INITIAL_PRODUCTS[0];
  };

  const loadingMessages = [
    "Kiritilgan talablar tahlil qilinmoqda...",
    "Protsessor unumdorligi va tezkor xotira mezonlari tekshirilmoqda...",
    "Siz kiritgan byudjet doirasidagi eng yaxshi kelishuvlar saralanmoqda...",
    "Omborda mavjud modellar bilan solishtirilmoqda..."
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Top clean micro-header matching screenshot */}
      <div className="bg-slate-100/60 px-5 py-2.5 border-b border-slate-100 flex items-center justify-between text-left select-none">
        <span className="text-[11px] font-bold text-slate-400 tracking-wide font-sans">
          Smart Tanlov | Aqlli Maslahatchi
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
              <Sparkles className="w-2.5 h-2.5 fill-slate-950" /> Smart Qidiruv Tizimi
            </span>
            <h1 className="text-base sm:text-lg font-black font-display tracking-tight text-[#FFFFFF] leading-snug uppercase">
              O'ZINGIZGA MOSINI TOPING!
            </h1>
            <p className="text-[10px] text-purple-100 leading-relaxed font-sans opacity-95">
              Sizga qanday noutbuk mos kelishi xususida ikkilanyapsizmi? Bizning aqlli tizimimiz siz uchun mukammal noutbukni bir zumda saralab beradi!
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
                    <motion.button
                      key={opt}
                      whileTap={{ scale: 0.94 }}
                      onClick={() => setPurpose(opt)}
                      className={`px-3 py-2.5 rounded-xl border font-medium cursor-pointer transition-all ${
                        purpose === opt 
                          ? "bg-[#5A20D4] text-white border-[#5A20D4] shadow-sm shadow-[#5A20D4]/20" 
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {opt}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Question 2 - Budget Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-medium">
                  <label className="text-slate-800 flex items-center gap-1.5">
                    <CircleDollarSign className="w-4 h-4 text-[#FD6C1D]" /> Byudjetingiz qancha?
                  </label>
                  <motion.span 
                    key={budget}
                    initial={{ scale: 0.9, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-[#FD6C1D] font-bold text-base bg-orange-50 px-3 py-1 rounded-lg border border-orange-100"
                  >
                    {budget.toLocaleString("uz-UZ")} UZS
                  </motion.span>
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
                    <motion.button
                      key={opt}
                      whileTap={{ scale: 0.94 }}
                      onClick={() => setOs(opt)}
                      className={`px-3 py-2.5 rounded-xl border font-medium cursor-pointer transition-all text-center ${
                        os === opt 
                          ? "bg-[#5A20D4] text-white border-[#5A20D4] shadow-sm shadow-[#5A20D4]/20" 
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {opt}
                    </motion.button>
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
                    <motion.button
                      key={opt}
                      whileTap={{ scale: 0.94 }}
                      onClick={() => setBattery(opt)}
                      className={`px-3 py-2.5 rounded-xl border font-medium cursor-pointer transition-all text-center ${
                        battery === opt 
                          ? "bg-[#5A20D4] text-white border-[#5A20D4]" 
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {opt}
                    </motion.button>
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
                      <motion.button
                        key={opt}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSoftwareToggle(opt)}
                        className={`px-3 py-2.5 rounded-xl border font-medium cursor-pointer transition-all flex items-center gap-1.5 ${
                          isSelected 
                            ? "bg-slate-900 text-[#ADF762] border-slate-900 shadow-sm" 
                            : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                        {opt}
                      </motion.button>
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
                      <motion.button
                        key={opt}
                        whileTap={{ scale: 0.94 }}
                        onClick={() => handleBrandToggle(opt)}
                        className={`px-3 py-2 rounded-xl border font-medium cursor-pointer transition-all flex items-center gap-1.5 ${
                          isSelected 
                            ? "bg-[#FD6C1D] text-white border-[#FD6C1D]" 
                            : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                        {opt}
                      </motion.button>
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
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={runRecommendation}
                className="w-full mt-2 py-4 rounded-xl bg-gradient-to-r from-[#FD6C1D] to-[#FD851D] text-white text-sm font-bold shadow-md hover:shadow-lg hover:brightness-105 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Flame className="w-4 h-4 animate-bounce" /> Qidirish (Tavsiya olish)
              </motion.button>
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
                  Aqlli tizim tahlil qilmoqda...
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
