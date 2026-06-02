import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// API Routes FIRST
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", aiEnabled: !!ai });
});

// Laptop recommendation endpoint using Gemini API
app.post("/api/recommend", async (req, res) => {
  try {
    const {
      purpose,
      budget,
      os,
      battery,
      software,
      brands,
      additionalFeatures
    } = req.body;

    if (!ai) {
      // Return beautiful mock recommendation database as fallback if API key is not configured yet
      console.warn("GEMINI_API_KEY is not defined or invalid. Using beautiful rule-based fallback recommendations.");
      return res.json(getFallbackRecommendations(purpose, budget, os, brands, software));
    }

    const prompt = `
      Foydalanuvchi quyidagi noutbuk talablariga mos keladigan eng yaxshi 3 ta modelni qidirmoqda:
      - Noutbukdan maqsad: ${purpose || "Umumiy/Istisnosiz"}
      - Byudjet: ${budget || "Cheklanmagan"}
      - Istalgan Operatsion Tizim: ${os || "Farqi yo'q"}
      - Batareya ishlash muddati muhimligi: ${battery || "Muhim emas"}
      - Ishlatiladigan asosiy dasturlar: ${software || "Standart ofis / veb"}
      - Sevimli brendlar: ${brands || "Farqi yo'q"}
      - Qo'shimcha muhim xususiyatlar: ${additionalFeatures || "Hech qanday maxsus talablar yo'q"}

      Iltimos, ushbu parametrlarga mukammal darajada mos keladigan eng yaxshi 3 ta noutbuk modelini topib ber. Tavsiyalar mutlaqo haqiqiy va dunyoda mavjud bo'lgan, topish oson bo'lgan, foydalanuvchining byudjetiga optimal mos keladigan noutbuklar bo'lsin.
      Barcha matnlar va javoblar to'liq va tushunarli holda o'zbek tilida yozilishi shart.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "Siz professional noutbuklar va kompyuterlar bo'yicha ekspert-maslahatchisiz. Foydalanuvchining talablariga asosan faqat sifatli, bozorda mavjud noutbuk modellarini tavsiya qilasiz. Javoblarni har doim o'zbek tilida va mustahkam o'zbek texnik atamalari bilan yozasiz.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendations: {
              type: Type.ARRAY,
              description: "Eng mos keladigan 3 ta noutbuklar ro'yxati",
              items: {
                type: Type.OBJECT,
                properties: {
                  laptopName: { 
                    type: Type.STRING, 
                    description: "Noutbuk brendi va to'liq model nomi (masalan, ASUS Zenbook 14 UX3405)" 
                  },
                  suitableSpecs: { 
                    type: Type.STRING, 
                    description: "Tavsiya qilinadigan ideal konfiguratsiya, masalan: Intel Core i7 13-Gen, 16GB RAM, 512GB SSD, Intel Iris Xe" 
                  },
                  priceEstimation: { 
                    type: Type.STRING, 
                    description: "O'zbekiston bozoridagi taxminiy o'rtacha narxi so'mda (masalan, 11 500 000 so'm yoki $900)" 
                  },
                  matchPercentage: { 
                    type: Type.INTEGER, 
                    description: "Foydalanuvchi talablariga mos kelish darajasi (foizda, masalan, 95)" 
                  },
                  reasons: { 
                    type: Type.ARRAY, 
                    items: { type: Type.STRING },
                    description: "Aynan ushbu model nima uchun uning vazifalariga munosib ekani haqida o'zbekcha tushunarli sabablar (kamida 3 ta)" 
                  },
                  pros: { 
                    type: Type.ARRAY, 
                    items: { type: Type.STRING },
                    description: "Yaxshi taraflari (plyuslari)" 
                  },
                  cons: { 
                    type: Type.ARRAY, 
                    items: { type: Type.STRING },
                    description: "Salbiy yoki e'tibor berish lozim bo'lgan jihatlari (minuslari)" 
                  }
                },
                required: ["laptopName", "suitableSpecs", "priceEstimation", "matchPercentage", "reasons", "pros", "cons"]
              }
            }
          },
          required: ["recommendations"]
        }
      }
    });

    const recommendationsData = JSON.parse(response.text.trim());
    res.json(recommendationsData);
  } catch (error: any) {
    console.error("Gemini AI API Error:", error);
    res.status(500).json({
      error: "Tavsiya olishda xatolik yuz berdi. Iltimos, keyinroq qayta urunib ko'ring.",
      details: error.message
    });
  }
});

// Fallback logic when Gemini API key is placeholder
function getFallbackRecommendations(purpose: string, budget: string, os: string, brands: string, software: string) {
  const isBudgetLow = budget && (budget.includes("5") || budget.includes("8") || budget.includes("10") || budget.toLowerCase().includes("kam"));
  const isDeveloperOrDesigner = (purpose && (purpose.toLowerCase().includes("dastur") || purpose.toLowerCase().includes("dizayn") || purpose.toLowerCase().includes("render")));

  if (os && os.toLowerCase().includes("mac")) {
    return {
      recommendations: [
        {
          laptopName: "MacBook Air 13 M2 8/256GB Silver",
          suitableSpecs: "Apple M2 (8 CPU / 8 GPU), 8GB LPDDR5, 256GB SSD, Retina 13.6\" Liquid Space",
          priceEstimation: "11 800 000 so'm",
          matchPercentage: 98,
          reasons: [
            "Batareya quvvati 15-18 soatgacha to'liq yetadi, o'qish va ofis uchun mukammal",
            "M2 chipi tezkor va ovozsiz ishlaydi (faol kuleri yo'q)",
            "Hajmi juda kichik va engil, istalgan joyga olib yurish oson"
          ],
          pros: ["Chiroyli dizayn", "Ekran yorqinligi", "Yaxshi dynamic tovush tizimi"],
          cons: ["Xotirasini keyinchalik oshirib bo'lmaydi", "O'yinlar uchun moslashtirilmagan"]
        },
        {
          laptopName: "MacBook Pro 14 M3 Pro Space Black",
          suitableSpecs: "Apple M3 Pro (11 yadro), 18GB Unified Memory, 512GB SSD, ProMotion 120Hz Liquid Retina XDR",
          priceEstimation: "26 900 000 so'm",
          matchPercentage: 95,
          reasons: [
            "Og'ir dasturlash vazifalari, Docker, render va video montaj bilan muammosiz ishlaydi",
            "Ekran 120Hz ProMotion texnologiyasiga ega bo'lib, ko'zni charchatmaydi",
            "Space Black premium rangi va metal korpusi ancha ishonchli"
          ],
          pros: ["Futzli portlar (HDMI, SD Card Reader, MagSafe 3)", "O'ta kuchli sovutish tizimi", "Raqobatsiz displey"],
          cons: ["Narxi nisbatan qimmat", "Biroz og'irroq vazn"]
        },
        {
          laptopName: "MacBook Air 15 M3 16/512GB Space Gray",
          suitableSpecs: "Apple M3 (8 CPU / 10 GPU), 16GB Single-die Memory, 512GB Solid State Drive",
          priceEstimation: "17 900 000 so'm",
          matchPercentage: 90,
          reasons: [
            "Yirikroq 15.3 dyumli ekran hisobiga jadval va kodlar bilan ishlash qulay",
            "16GB tezkor xotira bir paytda ko'plab brauzer sahifalarini bemalol ko'taradi",
            "Yupqa va zamonaviy ramkalarga ega vizual ko'rinish"
          ],
          pros: ["Katta ekran", "Yaxshi ovoz (6 dinamiklar)", "Oson olib yurish"],
          cons: ["Bir dona tashqi displey ulanadi holos (kopqoq yopiqligida 2 ta)"]
        }
      ]
    };
  }

  if (isDeveloperOrDesigner) {
    return {
      recommendations: [
        {
          laptopName: "Lenovo ThinkPad P14s Gen 4 AMD Ryzen 7",
          suitableSpecs: "AMD Ryzen 7 PRO 7840U, 32GB RAM DDR5, 1TB NVMe Gen4 SSD, Radeon 780M Graphics",
          priceEstimation: "16 500 000 so'm",
          matchPercentage: 97,
          reasons: [
            "32GB operativ xotira virtual mashinalar va Docker konteynerlar uchun ideal zaxira beradi",
            "Ryzen 7 PRO o'ta barqaror va qizimasdan ishlaydi",
            "ThinkPad klaviaturasi uzoq vaqt kod yozuvchi dasturchilar uchun beqiyosdir"
          ],
          pros: ["O'ta katta xotira (32GB / 1TB)", "Dunyodagi eng yaxshi klaviatura", "Harbiy darajadagi MIL-SPEC chidamlilik"],
          cons: ["Dizayni klassik va biroz sodda", "Kamera sifati o'rtacha"]
        },
        {
          laptopName: "ASUS ROG Zephyrus G14 GeForce RTX 4060",
          suitableSpecs: "AMD Ryzen 9 7940HS, 16GB DDR5, 1TB SSD, NVIDIA RTX 4060 8GB GDDR6",
          priceEstimation: "18 200 000 so'm",
          matchPercentage: 92,
          reasons: [
            "RTX 4060 3D grafik model o'yinlari, blender va og'ir AI ishlari uchun to'liq javob bera oladi",
            "Rog Nebula displeyi 165Hz chastotali o'ta yorqin va aniq ekran",
            "O'yin noutbuki bo'lishiga qaramasdan o'ta yengil va ixcham"
          ],
          pros: ["Kuchli videokarta", "Mukammal displey", "Metaldan tayyorlangan oqlangan korpus"],
          cons: ["Katta yuklamada sovitgichlar shovqini", "Zaryadi 5-6 soatgacha yetadi xolos"]
        },
        {
          laptopName: "Dell Latitude 5440 Core i7 vPro",
          suitableSpecs: "Intel Core i7-1355U vPro, 16GB DDR5 RAM, 512GB SSD, Intel Xe Graphics",
          priceEstimation: "13 400 000 so'm",
          matchPercentage: 88,
          reasons: [
            "Biznes klassidagi yuqori xavfsizlik va barqarorlik",
            "Rasmiy kafolat bilan ta'minlangan ishonchli ofis ishchisi",
            "Komplektida barcha turdagi ofis portlari mavjud"
          ],
          pros: ["Portativlik va kutilmagan chidamlilik", "Kengaytiriladigan portlar", "Yumshoq korpus qoplamasi"],
          cons: ["Oddiyroq displey (250 nits IPS)", "O'yinlar uchun mos emas"]
        }
      ]
    };
  }

  // Budget-friendly default
  return {
    recommendations: [
      {
        laptopName: "HP Victus 15 Ryzen 5 RTX 3050",
        suitableSpecs: "AMD Ryzen 5 5600H, 16GB RAM, 512GB SSD, NVIDIA RTX 3050 4GB",
        priceEstimation: "9 500 000 so'm",
        matchPercentage: 94,
        reasons: [
          "9-10 million so'm atrofida eng bozorbop, ham o'yin o'ynash, ham ishlash imkoni bor noutbuk",
          "144Hz yangilanish darajasiga ega silliq displey",
          "Victus sovutish tizimi qizishdan mukammal himoya qiladi"
        ],
        pros: ["Arzon narxdagi geyming variant", "Sifatli va jozibador dizayn", "Yaxshi klaviatura kliki"],
        cons: ["Korpusi plastik", "Ekran ranglar aniqligi o'rtacha"]
      },
      {
        laptopName: "Lenovo IdeaPad Slim 3 15AMN8 Type-C",
        suitableSpecs: "AMD Ryzen 5 7520U, 16GB LPDDR5, 512GB SSD, AMD Radeon 610M",
        priceEstimation: "6 300 000 so'm",
        matchPercentage: 90,
        reasons: [
          "Byudjetni o'ta tejovchi mukammal ofis va o'qish noutbuki",
          "16GB LPDDR5 zamonaviy tezkor xotira tormozlarsiz silliq ishlashni ta'minlaydi",
          "Type-C porti orqali tezkor zaryadlash imkoniyati"
        ],
        pros: ["Hamyonbop narx", "Engil va ingichka dizayn", "Katta akkumulyator"],
        cons: ["IPS displey ekrani burchak ostida qorong'ilashadi", "Klaviatura yorug'ligi yo'q"]
      },
      {
        laptopName: "Acer Aspire 5 A515 Core i5 Geforce",
        suitableSpecs: "Intel Core i5-12450H, 16GB Corsair RAM, 512GB M.2 SSD, NVIDIA GeForce MX550 2GB",
        priceEstimation: "8 200 000 so'm",
        matchPercentage: 86,
        reasons: [
          "MX550 qo'shimcha videokartasi hisobiga GTA 5, Photoshop kabi dasturlarda a'lo ishlash",
          "Alyuminiy ustki qopqog'i qo'shimcha mustahkamlik beradi",
          "Ko'plab ulanish portlari (HDMI, Ethernet, USB 3.2)"
        ],
        pros: ["Qo'shimcha videokarta", "Alyuminiy qopqog'i", "Yaxshi ishlash ko'rsatkichi"],
        cons: ["Baland ovozli kulerlar", "Salbiy dinamik ovozi"]
      }
    ]
  };
}

// Vite integration middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve production static assets compiled inside /dist
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on http://localhost:${PORT}`);
  });
}

startServer();
