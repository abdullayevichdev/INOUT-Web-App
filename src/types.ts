export interface Specification {
  brandAndModel: string;
  cpu: string;
  ram: string;
  storage: string;
  gpu: string;
  screenSize: string;
  screenType: string;
  batteryHealth: string;
  exteriorCondition: string;
  batteryCycleCount: number;
  boxAndAccessories: string;
}

export interface Product {
  id: string;
  name: string;
  brand: 'Macbook' | 'Windows' | 'Asus' | 'MSI' | 'Lenovo' | 'HP' | 'Dell';
  category: 'Noutbuklar' | 'Kompyuterlar' | 'Aksessuarlar';
  price: number; // In UZS
  oldPrice?: number;
  imageUrl: string;
  description: string;
  rating: number;
  isFavorite?: boolean;
  specs: Specification;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  date: string;
  status: 'Tayyorlanmoqda' | 'Yetkazilmoqda' | 'Yetkazildi';
  customerName: string;
  phone: string;
  deliveryAddress: string;
}

export const CATEGORIES = [
  { id: 'laptops', name: 'Noutbuklar', icon: '💻' },
  { id: 'computers', name: 'Kompyuterlar', icon: '🖥️' },
  { id: 'accessories', name: 'Aksessuarlar', icon: '🖱️' }
];

export const REGIONS = [
  'Farg\'ona',
  'Toshkent sh.',
  'Andijon',
  'Namangan',
  'Samarqand',
  'Buxoro',
  'Xorazm',
  'Qashqadaryo',
  'Surxondaryo',
  'Jizzax',
  'Sirdaryo',
  'Navoiy'
];

export const INITIAL_PRODUCTS: Product[] = [
  // =============== NOUTBUKLAR (1 to 25) ===============
  {
    id: "1",
    name: "MacBook Air 13 M3 8/256GB Midnight",
    brand: "Macbook",
    category: "Noutbuklar",
    price: 13500000,
    oldPrice: 14200000,
    imageUrl: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=600&q=80",
    description: "MacBook Air 2024 yildagi eng ingichka va tezkor noutbuk – yangi Apple M3 chipi bilan jihozlangan. Ofis ishlari, dasturlash va kundalik vazifalar uchun ideal.",
    rating: 4.9,
    specs: {
      brandAndModel: "Apple MacBook Air 13\" 2024",
      cpu: "Apple M3 (8-core CPU / 8-core GPU)",
      ram: "8 GB LPDDR5X",
      storage: "256 GB SSD NVMe",
      gpu: "Apple M3 Integrated",
      screenSize: "13.6 dyum",
      screenType: "Liquid Retina (2560x1664) IPS, 500 nits",
      batteryHealth: "100%",
      exteriorCondition: "Yangi (Kafolatli)",
      batteryCycleCount: 5,
      boxAndAccessories: "To'liq komplekt, 30W USB-C adapter va MagSafe 3 kabeli"
    }
  },
  {
    id: "2",
    name: "Lenovo ThinkPad X1 Carbon Gen 11 LTE",
    brand: "Lenovo",
    category: "Noutbuklar",
    price: 18900000,
    imageUrl: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80",
    description: "Biznes uchun eng ishonchli, titan va uglerod tolali korpusga ega premium noutbuk. Kuchli xavfsizlik funksiyalari va mukammal klaviatura.",
    rating: 4.8,
    specs: {
      brandAndModel: "Lenovo ThinkPad X1 Carbon Gen 11",
      cpu: "Intel Core i7-1365U vPro (o'ta tejamkor va kuchli)",
      ram: "16 GB LPDDR5 6400MHz",
      storage: "512 GB SSD PCIe 4.0 NVMe",
      gpu: "Intel Iris Xe Graphics",
      screenSize: "14.0 dyum",
      screenType: "WUXGA IPS (1920x1200) Antiglare, 400 nits",
      batteryHealth: "98%",
      exteriorCondition: "Ideal / Chiziqlarsiz",
      batteryCycleCount: 22,
      boxAndAccessories: "Karobka, 65W original Type-C charger"
    }
  },
  {
    id: "3",
    name: "Asus ROG Zephyrus G14 OLED GA403",
    brand: "Asus",
    category: "Noutbuklar",
    price: 24700000,
    oldPrice: 26500000,
    imageUrl: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80",
    description: "O'ta kuchli o'yin noutbuki va dizaynerlar uchun eng zo'r OLED ekranli portativ quvvat manbai. Alyuminiy korpus va yuqori darajadagi sovutish tizimi.",
    rating: 5.0,
    specs: {
      brandAndModel: "Asus ROG Zephyrus G14 (2024)",
      cpu: "AMD Ryzen 9 8945HS (8 yadro, 16 potok)",
      ram: "32 GB LPDDR5X dual-channel",
      storage: "1 TB SSD PCIe 4.0 NVMe M.2",
      gpu: "NVIDIA GeForce RTX 4070 (8GB GDDR6, 90W TGP)",
      screenSize: "14.0 dyum",
      screenType: "3K OLED (2880x1800), 120Hz, 100% DCI-P3, HDR",
      batteryHealth: "100%",
      exteriorCondition: "Mutlaqo yangi",
      batteryCycleCount: 2,
      boxAndAccessories: "To'liq korobka, 180W original adapter, ROG sichqoncha"
    }
  },
  {
    id: "4",
    name: "MSI Katana 17 B13VGK RTX 4070",
    brand: "MSI",
    category: "Noutbuklar",
    price: 19800000,
    imageUrl: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80",
    description: "Katta 17.3 dyumli professional geymerlar noutbuki. Nvidia RTX 40 seriyali videokarta va 13-avlod Intel Core i7 protsessori.",
    rating: 4.7,
    specs: {
      brandAndModel: "MSI Katana 17 B13VGK",
      cpu: "Intel Core i7-13700H (14 yadro, up to 5.0 GHz)",
      ram: "16 GB DDR5 4800MHz (expandable up to 64GB)",
      storage: "1 TB SSD PCIe M.2",
      gpu: "NVIDIA Quantum RTX 4070 Laptop (8GB GDDR6)",
      screenSize: "17.3 dyum",
      screenType: "FHD (1920x1080) IPS, 144Hz, sRGB 100%",
      batteryHealth: "95%",
      exteriorCondition: "A'lo holatda",
      batteryCycleCount: 45,
      boxAndAccessories: "Yutgich sumka, Karobka, 200W adapter"
    }
  },
  {
    id: "5",
    name: "HP Victus 15 Ryzen 5 RTX 4050",
    brand: "HP",
    category: "Noutbuklar",
    price: 10900000,
    oldPrice: 11800000,
    imageUrl: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80",
    description: "Narx va sifat uyg'unligidagi eng ommabop o'yin noutbuki. Zamonaviy dizayn va uzoq batareya quvvati bilan o'yinlar va darslar uchun ajoyib imkoniyat.",
    rating: 4.6,
    specs: {
      brandAndModel: "HP Victus 15-fb1013dx",
      cpu: "AMD Ryzen 5 7535HS (6 yadro, 12 potok)",
      ram: "16 GB DDR5 4800MHz",
      storage: "512 GB SSD NVMe M.2",
      gpu: "NVIDIA GeForce RTX 4050 (6GB GDDR6)",
      screenSize: "15.6 dyum",
      screenType: "FHD IPS IPS 144Hz, anti-glare, slim-bezel",
      batteryHealth: "99%",
      exteriorCondition: "Yengildek chiziqlar, ideal ishlaydi",
      batteryCycleCount: 18,
      boxAndAccessories: "Original karobka va HP 150W adapter"
    }
  },
  {
    id: "6",
    name: "Dell XPS 15 9530 Core i9 Touch",
    brand: "Dell",
    category: "Noutbuklar",
    price: 29500000,
    imageUrl: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=600&q=80",
    description: "Kreativ ijodkorlar va video-meysterlar uchun o'ta ixcham hamda cheksiz quvvatli ultra-buki. Intel Core i9 protsessori va OLED sensorli ekran.",
    rating: 4.9,
    specs: {
      brandAndModel: "Dell XPS 15 9530 Premium",
      cpu: "Intel Core i9-13900H (14 yadro, up to 5.4 GHz)",
      ram: "32 GB DDR5 Dual-Path",
      storage: "1 TB SSD NVMe PCIe Gen4",
      gpu: "NVIDIA GeForce RTX 4060 (8GB GDDR6 Studio Edition)",
      screenSize: "15.6 dyum",
      screenType: "3.5K (3456x2160) OLED Touch Screen, 400 nits, HDR",
      batteryHealth: "96%",
      exteriorCondition: "Ideal premium alyuminiy korpus",
      batteryCycleCount: 30,
      boxAndAccessories: "Original 130W USB-C kichik adapter va adapter-perexodnik"
    }
  },
  {
    id: "7",
    name: "MacBook Pro 14 M3 Pro Space Black",
    brand: "Macbook",
    category: "Noutbuklar",
    price: 25500000,
    oldPrice: 27000000,
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    description: "Professional darajadagi eng ilg'or noutbuk. Ekstremal hisoblash ishlari, 3D modellashtirish va professional video montaj uchun M3 Pro.",
    rating: 5.0,
    specs: {
      brandAndModel: "Apple MacBook Pro 14\" M3 Pro (2023)",
      cpu: "Apple M3 Pro (11-core CPU / 14-core GPU)",
      ram: "18 GB Unified Memory",
      storage: "512 GB SSD NVMe SuperSpeed",
      gpu: "Apple M3 Pro Integrated",
      screenSize: "14.2 dyum",
      screenType: "Liquid Retina XDR (3024x1964) Mini-LED, 120Hz",
      batteryHealth: "100%",
      exteriorCondition: "Yangi (Ochilgan holatda solingan)",
      batteryCycleCount: 3,
      boxAndAccessories: "To'liq o'ram, original Apple MagSafe qora kabel, 70W quvvatlagich"
    }
  },
  {
    id: "8",
    name: "Lenovo Legion Slim 5 RTX 4060",
    brand: "Lenovo",
    category: "Noutbuklar",
    price: 15400000,
    imageUrl: "https://images.unsplash.com/photo-1629429408209-1f912961dbd8?auto=format&fit=crop&w=600&q=80",
    description: "Yengil vaznga ega o'ta kuchli geymerlar noutbuki. 165Hz QHD ekran o'yinlarda har bir kadrni ajoyib ravonlikda aks ettiradi.",
    rating: 4.8,
    specs: {
      brandAndModel: "Lenovo Legion Slim 16IRH8",
      cpu: "Intel Core i7-13700H (14 yadro, up to 5.0 GHz)",
      ram: "16 GB DDR5 5200MHz",
      storage: "512 GB SSD PCIe 4.0",
      gpu: "NVIDIA GeForce RTX 4060 (8GB GDDR6, 115W TGP)",
      screenSize: "16.0 dyum",
      screenType: "WQXGA IPS (2560x1600), 165Hz, G-Sync, 350 nits",
      batteryHealth: "97%",
      exteriorCondition: "A'lo, chiziqlarsiz",
      batteryCycleCount: 15,
      boxAndAccessories: "Original Legion qutisi, Lenovo 230W adapter"
    }
  },
  {
    id: "9",
    name: "Asus Zenbook 14 OLED UX3405",
    brand: "Asus",
    category: "Noutbuklar",
    price: 14200000,
    oldPrice: 15150000,
    imageUrl: "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?auto=format&fit=crop&w=600&q=80",
    description: "Intel Core Ultra chipida ishlaydigan eng yengil va zamonaviy Zenbook. Elegant ko'rinish va o'ta uzoq batareya quvvati.",
    rating: 4.8,
    specs: {
      brandAndModel: "Asus Zenbook 14 OLED UX3405MA",
      cpu: "Intel Core Ultra 7 155H EVO (AI NPU bilan)",
      ram: "16 GB LPDDR5X on-board",
      storage: "1 TB SSD PCIe Gen4 NVMe",
      gpu: "Intel Arc Graphics (Yangi darajali grafika)",
      screenSize: "14.0 dyum",
      screenType: "3K OLED (2880x1800), 120Hz, 100% DCI-P3, HDR600",
      batteryHealth: "100%",
      exteriorCondition: "Yangi kafolatli",
      batteryCycleCount: 4,
      boxAndAccessories: "Premium Zenbook sumkasi, Karobka, 65W ultra yengil adapter"
    }
  },
  {
    id: "10",
    name: "HP Envy x360 Convertible Ryzen 7",
    brand: "HP",
    category: "Noutbuklar",
    price: 11400000,
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80",
    description: "360 darajaga bukiladigan transformer noutbuk. Ekranini planshet shaklida foydalanish mumkin, original stilus bilan rasm chizish uchun juda qulay.",
    rating: 4.7,
    specs: {
      brandAndModel: "HP Envy x360 15T-Convertible",
      cpu: "AMD Ryzen 7 7730U (8 yadro, 16 potok)",
      ram: "16 GB DDR4 3200MHz",
      storage: "512 GB SSD PCIe NVMe M.2",
      gpu: "AMD Radeon Graphics Vega 8",
      screenSize: "15.6 dyum",
      screenType: "FHD IPS (1920x1080) Multi-touch Gorilla Glass",
      batteryHealth: "94%",
      exteriorCondition: "A'lo darajada sozlangan",
      batteryCycleCount: 42,
      boxAndAccessories: "Original karobka, HP stylus ruchka, 65W adapter"
    }
  },
  {
    id: "11",
    name: "Dell Latitude 5440 i5-1335U",
    brand: "Dell",
    category: "Noutbuklar",
    price: 8800000,
    imageUrl: "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?auto=format&fit=crop&w=600&q=80",
    description: "Ishchilar, ofis xodimlari va o'quvchilar uchun o'ta chidamli Latitude seriyali noutbuk. Ergonomik klaviatura va uzoq batareya vaqti.",
    rating: 4.5,
    specs: {
      brandAndModel: "Dell Latitude 5440 Pro",
      cpu: "Intel Core i5-1335U (10 yadro, up to 4.6 GHz)",
      ram: "16 GB DDR4 (max 64GB gacha)",
      storage: "512 GB SSD PCIe SuperSpeed",
      gpu: "Intel Iris Xe Graphics",
      screenSize: "14.0 dyum",
      screenType: "FHD IPS (1920x1080) Anti-glare, eye-care",
      batteryHealth: "97%",
      exteriorCondition: "Ideal klassda",
      batteryCycleCount: 20,
      boxAndAccessories: "Original Type-C zaryadlash moslamasi va sumka"
    }
  },
  {
    id: "12",
    name: "MSI Prestige 16 AI Evo OLED",
    brand: "MSI",
    category: "Noutbuklar",
    price: 18500000,
    oldPrice: 19500000,
    imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80",
    description: "Sun'iy intellekt bilan jihozlangan yangi avlod professional biznes ultra-buki. Elegant metal korpus va o'ta tiniq OLED displey.",
    rating: 4.8,
    specs: {
      brandAndModel: "MSI Prestige 16 AI Evo B1MG",
      cpu: "Intel Core Ultra 7 155H AI-powered Processor",
      ram: "32 GB LPDDR5X super-high speed",
      storage: "1 TB SSD PCIe Gen4 x4 NVMe",
      gpu: "Intel Arc Graphics v7",
      screenSize: "16.0 dyum",
      screenType: "UHD+ (3840x2400) OLED, 100% DCI-P3, HDR",
      batteryHealth: "100%",
      exteriorCondition: "Yangi ochilmagan qutida",
      batteryCycleCount: 1,
      boxAndAccessories: "To'liq qutida, Type-C 100W PD adapter"
    }
  },
  {
    id: "13",
    name: "MacBook Air 15 M2 8/512GB Space Gray",
    brand: "Macbook",
    category: "Noutbuklar",
    price: 15200000,
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    description: "Katta 15.3 dyumli Retina displeyga ega bo'lgan eng ommabop yupqa noutbuk. Kuchli akustik tizim va ajoyib ishlash samaradorligi.",
    rating: 4.9,
    specs: {
      brandAndModel: "Apple MacBook Air 15\" M2 (2023)",
      cpu: "Apple M2 (8-core CPU / 10-core GPU)",
      ram: "8 GB Unified RAM",
      storage: "512 GB SSD NVMe M.2",
      gpu: "Apple M2 Integrated Graphics",
      screenSize: "15.3 dyum",
      screenType: "Liquid Retina Panel, 500 nits, P3 Color Wide",
      batteryHealth: "98%",
      exteriorCondition: "Ideal / Chiziqlarsiz",
      batteryCycleCount: 19,
      boxAndAccessories: "Korobka, 35W Dual Port USB-C adapter, MagSafe kabel"
    }
  },
  {
    id: "14",
    name: "Asus TUF Gaming A15 RTX 4060",
    brand: "Asus",
    category: "Noutbuklar",
    price: 12900000,
    imageUrl: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80",
    description: "Harbiy chidamlilik standartlariga mos keluvchi geymerlar noutbuki. Kuchli sovutish va eng og'ir o'yinlar uchun quvvat.",
    rating: 4.7,
    specs: {
      brandAndModel: "Asus TUF Gaming A15 FA507",
      cpu: "AMD Ryzen 7 7735HS (8 yadro, 16 potok)",
      ram: "16 GB DDR5 4800MHz Dual-Channel",
      storage: "512 GB SSD Gen4 NVMe M.2",
      gpu: "NVIDIA GeForce RTX 4060 (8GB GDDR6, 140W TGP)",
      screenSize: "15.6 dyum",
      screenType: "FHD (1920x1080) IPS, 144Hz, sRGB 100%, G-Sync",
      batteryHealth: "99%",
      exteriorCondition: "Yangi rasmda ko'ringandek",
      batteryCycleCount: 10,
      boxAndAccessories: "Original o'rami, Asus 240W katta quvvatlagich"
    }
  },
  {
    id: "15",
    name: "Lenovo Legion Pro 5 RTX 4070 QHD",
    brand: "Lenovo",
    category: "Noutbuklar",
    price: 21500000,
    oldPrice: 23200000,
    imageUrl: "https://images.unsplash.com/photo-1629429408209-1f912961dbd8?auto=format&fit=crop&w=600&q=80",
    description: "Lineykadagi eng mashhur legion modeli. RTX 4070 videokartasi va 240Hz tezlikdagi o'ta tiniq ekran o'yin ixlosmandlarining sevimlisidir.",
    rating: 5.0,
    specs: {
      brandAndModel: "Lenovo Legion Pro 5 16IRX8",
      cpu: "Intel Core i9-13900HX (24 yadro, up to 5.4 GHz)",
      ram: "32 GB DDR5 5600MHz (Super High Speed)",
      storage: "1 TB SSD PCIe 4.0 NVMe M.2",
      gpu: "NVIDIA GeForce RTX 4070 (8GB GDDR6, 140W TGP)",
      screenSize: "16.0 dyum",
      screenType: "WQXGA IPS (2560x1600), 240Hz, sRGB 100%, HDR 400",
      batteryHealth: "98%",
      exteriorCondition: "O'ta ideal yengil holatda",
      batteryCycleCount: 24,
      boxAndAccessories: "Legion quti, 300W professional quvvatlagich"
    }
  },
  {
    id: "16",
    name: "HP Victus 16 i7 RTX 4060 Storm",
    brand: "HP",
    category: "Noutbuklar",
    price: 13900000,
    imageUrl: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80",
    description: "Katta ekran segmentidagi HP Victusning flagmani. i7-protsessor va tezkor SSD drayverlari bilan a'lo darajada ishlash unumdorligi.",
    rating: 4.7,
    specs: {
      brandAndModel: "HP Victus 16-r0059xr",
      cpu: "Intel Core i7-13700H (14 yadro, up to 5.0 GHz)",
      ram: "16 GB DDR5 5200MHz",
      storage: "512 GB SSD NVMe PCIe Gen4",
      gpu: "NVIDIA GeForce RTX 4060 (8GB GDDR6)",
      screenSize: "16.1 dyum",
      screenType: "FHD (1920x1080) IPS 144Hz, 100% sRGB",
      batteryHealth: "100%",
      exteriorCondition: "Ideal kafolatli",
      batteryCycleCount: 7,
      boxAndAccessories: "Karobka, original HP 230W zaryadlovchi"
    }
  },
  {
    id: "17",
    name: "Dell Inspiron 15 i7-1355U",
    brand: "Dell",
    category: "Noutbuklar",
    price: 8500000,
    imageUrl: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80",
    description: "Sodda va qulay dizaynga ega oilaviy/ish noutbuki. Yumshoq klaviatura, katta sensorli touchpad va sensorli tezkor ekran.",
    rating: 4.4,
    specs: {
      brandAndModel: "Dell Inspiron 15 3530",
      cpu: "Intel Core i7-1355U (10 yadro, up to 5.0 GHz)",
      ram: "16 GB DDR4 3200MHz",
      storage: "512 GB SSD NVMe SuperSpeed",
      gpu: "Intel Iris Xe Graphics Shared",
      screenSize: "15.6 dyum",
      screenType: "FHD IPS (1920x1080) ravon 120Hz ekran",
      batteryHealth: "95%",
      exteriorCondition: "Ideal chiziqlarsiz",
      batteryCycleCount: 35,
      boxAndAccessories: "Original zaryadlagich 65W, Dell quti"
    }
  },
  {
    id: "18",
    name: "MSI Thin GF63 RTX 4050 Light Edition",
    brand: "MSI",
    category: "Noutbuklar",
    price: 9900000,
    imageUrl: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80",
    description: "Eng yupqa va yengil o'yin noutbuklaridan biri. Uni har kuni chamadonda olib yurish juda oson. Qizil neonli ajoyib klaviatura.",
    rating: 4.5,
    specs: {
      brandAndModel: "MSI Thin GF63 12VE",
      cpu: "Intel Core i5-12450H (8 yadro, up to 4.4 GHz)",
      ram: "16 GB DDR4 3200Mhz (Dual Channel)",
      storage: "512 GB SSD NVMe M.2",
      gpu: "NVIDIA GeForce RTX 4050 (6GB GDDR6 Auto Boost)",
      screenSize: "15.6 dyum",
      screenType: "FHD (1920x1080) IPS, 144Hz, anti-glare",
      batteryHealth: "93%",
      exteriorCondition: "Yaxshi holatda, ozgina izlari bor",
      batteryCycleCount: 55,
      boxAndAccessories: "Original 120W adapter"
    }
  },
  {
    id: "19",
    name: "MacBook Pro 16 M3 Max Space Black",
    brand: "Macbook",
    category: "Noutbuklar",
    price: 43500000,
    oldPrice: 46000000,
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    description: "Noutbuklar shohsupasi! Apple kompaniyasining eng so'nggi va eng qudratli noutbuki. 3D animatsiya va ilmiy hisob-kitoblar uchun.",
    rating: 5.0,
    specs: {
      brandAndModel: "Apple MacBook Pro 16\" M3 Max",
      cpu: "Apple M3 Max (16-core CPU / 40-core GPU)",
      ram: "48 GB Super-Fast Unified RAM",
      storage: "1 TB Ultrafast SSD PCIe",
      gpu: "Apple M3 Max 40-core GPU with Hardware RT",
      screenSize: "16.2 dyum",
      screenType: "Liquid Retina XDR (3456x2234) Mini-LED, 120Hz, 1600 nits",
      batteryHealth: "100%",
      exteriorCondition: "Mutlaqo Yangi ochilmagan qutida va paketda",
      batteryCycleCount: 0,
      boxAndAccessories: "Full komplekt, 140W USB-C tezkor quvvat va MagSafe 3 kabeli"
    }
  },
  {
    id: "20",
    name: "Asus ROG Strix G16 i9 RTX 4060",
    brand: "Asus",
    category: "Noutbuklar",
    price: 18400000,
    imageUrl: "https://images.unsplash.com/photo-1629429408209-1f912961dbd8?auto=format&fit=crop&w=600&q=80",
    description: "RGB chiroqlar bilan bezatilgan geymerlar orzusidagi noutbuk. Ekstremal o'yin protsessori va eng so'nggi muzlatish texnologiyasi.",
    rating: 4.8,
    specs: {
      brandAndModel: "Asus ROG Strix G16 G614JV",
      cpu: "Intel Core i9-13980HX (24 yadro, up to 5.6 GHz)",
      ram: "16 GB DDR5 4800MHz Dual-Channel",
      storage: "1 TB SSD NVMe PCIe Gen4",
      gpu: "NVIDIA GeForce RTX 4060 (8GB GDDR6, 140W TGP)",
      screenSize: "16.0 dyum",
      screenType: "FHD+ (1920x1200) IPS, 165Hz, G-Sync, 100% sRGB",
      batteryHealth: "98%",
      exteriorCondition: "Ideal metall korpus, chiroyli RGB",
      batteryCycleCount: 12,
      boxAndAccessories: "Original karobka, ROG ruyzak, Asus 280W adapter"
    }
  },
  {
    id: "21",
    name: "Lenovo IdeaPad Slim 3 15 i5-12th",
    brand: "Lenovo",
    category: "Noutbuklar",
    price: 5200000,
    oldPrice: 5600000,
    imageUrl: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80",
    description: "Sizning eng birinchi ofis ishlariga kirishishingiz uchun mo'ljallangan hamyonbop noutbuk. Yengil, oddiy va ishonchli tizim unumdorligi.",
    rating: 4.3,
    specs: {
      brandAndModel: "Lenovo IdeaPad Slim 3 15IAN8",
      cpu: "Intel Core i5-1235U (10 yadro, up to 4.4 GHz)",
      ram: "8 GB LPDDR5X on-board",
      storage: "256 GB SSD NVMe NVMe PCIe 3.0",
      gpu: "Intel Iris Xe Graphics",
      screenSize: "15.6 dyum",
      screenType: "FHD IPS (1920x1080) Anti-glare, 250 nits",
      batteryHealth: "96%",
      exteriorCondition: "Yaxshi holatda, ba'zi bo'shashgan joyi yo'q",
      batteryCycleCount: 46,
      boxAndAccessories: "Zaryadlagich, kitobcha, quti"
    }
  },
  {
    id: "22",
    name: "HP Chromebook 14 Silver",
    brand: "HP",
    category: "Noutbuklar",
    price: 2900000,
    imageUrl: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80",
    description: "ChromeOS operatsion tizimida tezkor ishlaydigan Chromebook. Universitetda dars olish, referat yozish va dars tinglash uchun ideal eng arzon variant.",
    rating: 4.1,
    specs: {
      brandAndModel: "HP Chromebook 14a-na0031tg",
      cpu: "Intel Celeron N4020 (Dual-Core)",
      ram: "4 GB LPDDR4 memory",
      storage: "64 GB eMMC Flash storage",
      gpu: "Intel UHD Graphics 600",
      screenSize: "14.0 dyum",
      screenType: "HD Micro-edge (1366x768) BrightView display",
      batteryHealth: "92%",
      exteriorCondition: "Ishlatilgan, yaxshi holatda",
      batteryCycleCount: 88,
      boxAndAccessories: "HP Type-C 45W zaryadlash kabeli"
    }
  },
  {
    id: "23",
    name: "Dell Alienware m16 RTX 4080 Extreme",
    brand: "Dell",
    category: "Noutbuklar",
    price: 33500000,
    imageUrl: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=600&q=80",
    description: "O'zga sayyoralik dizayni! Alyuminiy va uglerod qotishmali tank korpusiga ega ajoyib kuch-qudrat drayveri.",
    rating: 4.9,
    specs: {
      brandAndModel: "Dell Alienware m16 Gaming Expert",
      cpu: "AMD Ryzen 9 7845HX (12 yadro, 24 potok)",
      ram: "32 GB DDR5 5600MHz RAM Dual",
      storage: "1 TB SSD NVMe PCIe Gen4 M.2",
      gpu: "NVIDIA GeForce RTX 4080 (12GB GDDR6, 175W High-TGP)",
      screenSize: "16.0 dyum",
      screenType: "QHD+ (2560x1600), fast 240Hz, sRGB 100%, G-Sync",
      batteryHealth: "99%",
      exteriorCondition: "Mutlaqo yangi ideal holatda",
      batteryCycleCount: 5,
      boxAndAccessories: "Karobka, Alienware 330W og'ir quvvatlagich"
    }
  },
  {
    id: "24",
    name: "Asus ProArt PX13 Creators Touch",
    brand: "Asus",
    category: "Noutbuklar",
    price: 26900000,
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80",
    description: "Kreativ dizayner va 3D rassomlar uchun 13 dyumli professional bukiluvchan planshet noutbuki. ProArt premium drayverlari bilan ta'minlangan.",
    rating: 4.9,
    specs: {
      brandAndModel: "Asus ProArt PX13 HN7306",
      cpu: "AMD Ryzen AI 9 HX 370 (Yangilangan 12 yadro)",
      ram: "32 GB LPDDR5X on-board ultra Speeds",
      storage: "1 TB SSD PCIe 4.0 Super-Fast NVMe",
      gpu: "NVIDIA GeForce RTX 4050 (6GB Studio certified GDDR6)",
      screenSize: "13.3 dyum",
      screenType: "3K (2880x1800) Asus Lumina OLED Touch Screen, Pantone validated",
      batteryHealth: "100%",
      exteriorCondition: "A'lo yangidek",
      batteryCycleCount: 2,
      boxAndAccessories: "Asus ProArt jild quti, ProArt Stylus ruchka, 100W zaryadlovchi"
    }
  },
  {
    id: "25",
    name: "Lenovo Yoga Book 9i Dual OLED",
    brand: "Lenovo",
    category: "Noutbuklar",
    price: 31900000,
    oldPrice: 34000000,
    imageUrl: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80",
    description: "Kelajak texnologiyasi! Ikkita mustaqil OLED ekranga ega bo'lgan ultra-innovatsion sensorli noutbuk. Portativ bluetooth klaviatura va stilus bilan.",
    rating: 5.0,
    specs: {
      brandAndModel: "Lenovo Yoga Book 9i Multi-Screen",
      cpu: "Intel Core i7-1355U vPro Certified",
      ram: "16 GB LPDDR5X Dual",
      storage: "1 TB SSD NVMe PCIe 4.0 M.2",
      gpu: "Intel Iris Xe Graphics",
      screenSize: "13.3 dyum x2 ekran",
      screenType: "Dual 2.8K PureSight OLED (2880x1800) multi-touch",
      batteryHealth: "98%",
      exteriorCondition: "Ideal futuristik dizayn, yangidek",
      batteryCycleCount: 11,
      boxAndAccessories: "Yoga Book maxsus ushlagich-keysi, simsiz Bluetooth klaviatura, Yoga Pen"
    }
  },

  // =============== KOMPYUTERLAR (26 to 40) ===============
  {
    id: "26",
    name: "Apple iMac 24 M3 (2023) Blue",
    brand: "Macbook",
    category: "Kompyuterlar",
    price: 19800000,
    imageUrl: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=600&q=80",
    description: "Ofislar va uylar uchun barchasi bittada (All-in-One) bo'lgan eng chiroyli rang-barang Apple kompyuteri. M3 chipi va elegant ultra-yupqa ekran.",
    rating: 4.8,
    specs: {
      brandAndModel: "Apple iMac 24-inch M3",
      cpu: "Apple M3 (8-core CPU / 10-core GPU)",
      ram: "8 GB Unified RAM",
      storage: "256 GB ultra-performance SSD",
      gpu: "Apple M3 Integrated",
      screenSize: "23.5 dyum",
      screenType: "4.5K Retina Display (4480x2520), P3 Wide, 500 nits",
      batteryHealth: "N/A (Doimiy quvvatda ishlaydi)",
      exteriorCondition: "Yangi kafolatli",
      batteryCycleCount: 0,
      boxAndAccessories: "To'liq quti, Magic Keyboard Touch ID bilan, Magic Mouse va ko'k simli simlar"
    }
  },
  {
    id: "27",
    name: "iTech Core i7-14700K Gaming PC",
    brand: "Windows",
    category: "Kompyuterlar",
    price: 16500000,
    imageUrl: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=600&q=80",
    description: "Professional geymerlar va dasturchilar uchun yig'ilgan kuchli stol usti shaxsiy kompyuteri. Muzli havo-suv sovutkichli tizim va shaffof oyna korpus.",
    rating: 4.7,
    specs: {
      brandAndModel: "iTech custom build PC",
      cpu: "Intel Core i7-14700K (20 yadro, up to 5.6 GHz)",
      ram: "32 GB DDR5 RGB 6000MHz Kingston Fury",
      storage: "1 TB SSD Samsung 990 Pro Gen4",
      gpu: "NVIDIA GeForce RTX 4070 SUPER (12GB GDDR6X)",
      screenSize: "N/A (Tizim bloki o'zi)",
      screenType: "Tizim bloki (RGB yoritgichli keys)",
      batteryHealth: "N/A",
      exteriorCondition: "Yangi yig'ilgan usta tomonidan, kafolatli",
      batteryCycleCount: 0,
      boxAndAccessories: "To'liq barcha qismlarining alohida karobkalari mavjud, quvvatlash kabeli"
    }
  },
  {
    id: "28",
    name: "Apple Mac Mini M2 8/512GB",
    brand: "Macbook",
    category: "Kompyuterlar",
    price: 8900000,
    imageUrl: "https://images.unsplash.com/photo-1625766763788-95dcce9bf5ac?auto=format&fit=crop&w=600&q=80",
    description: "O'ta mitti va ixcham Apple kompyuter bloki. Uni xohlagan monitor yoxud televizoringizga ulab, sevimli platformangizda ishlashingiz mumkin.",
    rating: 4.7,
    specs: {
      brandAndModel: "Apple Mac Mini M2 (2023)",
      cpu: "Apple M2 (8 yadro)",
      ram: "8 GB Unified memory",
      storage: "512 GB SSD Apple premium",
      gpu: "Apple M2 Integrated GPU",
      screenSize: "N/A",
      screenType: "Tashqi monitorsiz blok",
      batteryHealth: "N/A",
      exteriorCondition: "Ideal metall korpus, juda mitti",
      batteryCycleCount: 0,
      boxAndAccessories: "Original karobka, Apple quvvatlash adapter kabeli"
    }
  },
  {
    id: "29",
    name: "HP ProOne 240 G10 All-in-One i5",
    brand: "HP",
    category: "Kompyuterlar",
    price: 9300000,
    oldPrice: 9900000,
    imageUrl: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=600&q=80",
    description: "Ofis va do'kon kassalari uchun qulay, ekran va tizim bloki birlashgan i5 All-In-One kompyuteri. Elegant oyoqchali monitor dizayni.",
    rating: 4.5,
    specs: {
      brandAndModel: "HP ProOne AiO 240 G10",
      cpu: "Intel Core i5-1335U (10 yadro, up to 4.6 GHz)",
      ram: "16 GB DDR4 3200MHz",
      storage: "512 GB SSD NVMe M.2",
      gpu: "Intel Iris Xe Graphics",
      screenSize: "23.8 dyum",
      screenType: "FHD IPS (1920x1080) Matte ekran, anti-glare",
      batteryHealth: "N/A",
      exteriorCondition: "Yangi holatda",
      batteryCycleCount: 0,
      boxAndAccessories: "HP simsiz klaviatura va sichqoncha komplekti, HP quvvatlagich blok"
    }
  },
  {
    id: "30",
    name: "iTech Core i9 RTX 4090 Ultimate PC",
    brand: "Windows",
    category: "Kompyuterlar",
    price: 49500000,
    imageUrl: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=600&q=80",
    description: "Yer yuzidagi eng cheksiz stolusti kompyuteri! Dunyoning eng kuchli RTX 4090 grafik kartasi va Core i9 protsessori 3D simulyatsiyalar, AI mashg'ulotlari va o'yinlar uchun.",
    rating: 5.0,
    specs: {
      brandAndModel: "Ultimate Creator Machine Engine v2",
      cpu: "Intel Core i9-14900KS (24 yadro, 32 potok, extreme performance)",
      ram: "64 GB DDR5 RGB 6400Mhz Corsair Dominator",
      storage: "4 TB SSD NVMe M.2 Samsung 990 Pro Raid-0",
      gpu: "ASUS ROG RTX 4090 OC Edition (24GB GDDR6X)",
      screenSize: "N/A (Tizim Bloki)",
      screenType: "Shaffof Lian-Li premium oyna keys, to'liq Water Cooling blok",
      batteryHealth: "N/A",
      exteriorCondition: "Mutlaqo yangi yig'ilgan original komponentlar",
      batteryCycleCount: 0,
      boxAndAccessories: "Alohi qutilar, to'liq zaxira oqimli suyuqliklar va simlar"
    }
  },
  {
    id: "31",
    name: "Samsung Odyssey OLED G9 Ultrawide",
    brand: "Windows",
    category: "Kompyuterlar",
    price: 18900000,
    oldPrice: 19900000,
    imageUrl: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=600&q=80",
    description: "49 dyumli o'ta keng ultra-egilgan OLED o'yin va professional montaj monitori. Haqiqiy immersion effektini yaratadi.",
    rating: 4.9,
    specs: {
      brandAndModel: "Samsung Odyssey OLED G95SC",
      cpu: "N/A (Displey Monitor)",
      ram: "N/A",
      storage: "N/A",
      gpu: "N/A",
      screenSize: "49 dyum egilgan",
      screenType: "Neo Dual QHD (5120x1440) OLED egilgan 1800R, 240Hz, 0.03ms",
      batteryHealth: "N/A",
      exteriorCondition: "Mustahkam original qadoqda yangi",
      batteryCycleCount: 0,
      boxAndAccessories: "Original kran-stend, HDMI/DisplayPort kabellari, masofaviy boshqaruv pulti"
    }
  },
  {
    id: "32",
    name: "Apple Studio Display Nanotexture",
    brand: "Macbook",
    category: "Kompyuterlar",
    price: 24500000,
    imageUrl: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=600&q=80",
    description: "Ranglar aniqligi bilan ishlovchi professional dizayner va rassomlar uchun maxsus 5K rezolyutsiyali Apple monitori. Nanoteksturani qoplama bilan porlashdan himoya qiladi.",
    rating: 4.9,
    specs: {
      brandAndModel: "Apple Studio Display Nanotexture-glass Edition",
      cpu: "A13 Bionic chip integrated (for audio & camera process)",
      ram: "N/A",
      storage: "N/A",
      gpu: "N/A",
      screenSize: "27 dyum",
      screenType: "5K Retina display (5120x2880) with Nanotexture glass, 600 nits, wide color P3",
      batteryHealth: "N/A",
      exteriorCondition: "Ideal porlamaydigan shisha holati",
      batteryCycleCount: 0,
      boxAndAccessories: "Original balandligi sozlanadigan oyoqchali montaj stendi, Apple Thunderbolt 3 kabeli"
    }
  },
  {
    id: "33",
    name: "Lenovo ThinkCentre Neo 50s i5",
    brand: "Lenovo",
    category: "Kompyuterlar",
    price: 6100000,
    imageUrl: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=600&q=80",
    description: "Sodda va qulay korporativ ofis kompyuteri. Kichik bo'shliqlar uchun maxsus ixcham mini-keys korpusi va ekologik energiya tejash tizimi.",
    rating: 4.4,
    specs: {
      brandAndModel: "Lenovo ThinkCentre Neo 50s Gen 4",
      cpu: "Intel Core i5-13400 (10 yadro, up to 4.6 GHz)",
      ram: "8 GB DDR4 3200MHz",
      storage: "512 GB SSD PCIe NVMe",
      gpu: "Intel UHD Graphics 730 Integrated",
      screenSize: "N/A (Tizim Bloki)",
      screenType: "Ixcham SFF Mini-Keys korpusi",
      batteryHealth: "N/A",
      exteriorCondition: "Yangi orqadagi barcha portlar ishlaydi",
      batteryCycleCount: 0,
      boxAndAccessories: "Zaryadlash simi, Lenovo original simli sichqoncha"
    }
  },
  {
    id: "34",
    name: "Asus ROG Swift 360Hz PG27AQN Monitor",
    brand: "Asus",
    category: "Kompyuterlar",
    price: 13500000,
    oldPrice: 14500000,
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80",
    description: "Kibersport o'yinlari uchun dunyodagi eng tezkor monitorlardan biri. 360Hz yangilanish tezligi va mutlaqo kechikishining yo'qligi bilan g'alabani ta'minlaydi.",
    rating: 4.9,
    specs: {
      brandAndModel: "Asus ROG Swift PG27AQN Professional",
      cpu: "N/A (Monitor)",
      ram: "N/A",
      storage: "N/A",
      gpu: "N/A",
      screenSize: "27 dyum fast-IPS",
      screenType: "WQHD (2560x1440) Ultra-Speed Rapid IPS, 360Hz, NVIDIA G-Sync Analyzer",
      batteryHealth: "N/A",
      exteriorCondition: "Mustahkam kibersport stendi bilan ideal",
      batteryCycleCount: 0,
      boxAndAccessories: "Original quvvat blok va DisplayPort super ko'rsatkichli kabel"
    }
  },
  {
    id: "35",
    name: "Intel Core i9-14900K Box CPU",
    brand: "Windows",
    category: "Kompyuterlar",
    price: 7800000,
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    description: "Uzbekiston sharoitidagi eng mashhur, flagman darajadagi eng kuchli stolusti protsessori. Kompyuteringiz tezligini cheksiz cho'qqilarga olib chiqadi.",
    rating: 4.8,
    specs: {
      brandAndModel: "Intel Core i9-14900K",
      cpu: "24 yadro (8-P yadro va 16-E yadro) / 32 potok",
      ram: "DDR5 / DDR4 dual channel controller",
      storage: "PCIe 5.0 va 4.0 liniyalari",
      gpu: "Intel UHD Graphics 770 o'rnatilgan kartasi",
      screenSize: "N/A (Blok buyum)",
      screenType: "LGA1700 soketli protsessor chipi",
      batteryHealth: "N/A",
      exteriorCondition: "Yangi muhrlangan qutida",
      batteryCycleCount: 0,
      boxAndAccessories: "Original ko'k plastmassa quti, o'rnatish yo'riqnomasi va stiker"
    }
  },
  {
    id: "36",
    name: "ASUS ROG STRIX RTX 4080 SUPER 16GB",
    brand: "Asus",
    category: "Kompyuterlar",
    price: 18500000,
    imageUrl: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=600&q=80",
    description: "Geymerlar va professional 3D rassomlar uchun mo'ljallangan, ajoyib dizaynga va metal korpusli 3 ta sovutgich parrakka ega o'ta kuchli videokarta.",
    rating: 4.9,
    specs: {
      brandAndModel: "ASUS ROG Strix GeForce RTX 4080 SUPER OC Edition",
      cpu: "N/A (Videokarta)",
      ram: "16 GB GDDR6X xotira",
      storage: "N/A",
      gpu: "NVIDIA AD103 GPU (Ray Tracing va DLSS 3.5)",
      screenSize: "Aralash radiator uzunligi: 35.7 cm",
      screenType: "PCIe 4.0 x16 interfeysi",
      batteryHealth: "N/A",
      exteriorCondition: "Mutlaqo yangi muhrlangan upakovka",
      batteryCycleCount: 0,
      boxAndAccessories: "3x 8-pin to 16-pin quvvat kabeli, anti-sag ushlagich tayanch, original broshyuralari"
    }
  },
  {
    id: "37",
    name: "iTech Creator Pro Custom PC",
    brand: "Windows",
    category: "Kompyuterlar",
    price: 14500000,
    imageUrl: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=600&q=80",
    description: "3D max va murakkab AutoCAD chizmalarida qotmasdan, tezkor tahlil qilish uchun maxsus komponentlardan chiroyli yig'ilgan shaxsiy kompyuter bloki.",
    rating: 4.7,
    specs: {
      brandAndModel: "iTech Custom Creator workstation v3",
      cpu: "AMD Ryzen 9 7900X (12 yadro, 24 potok, up to 5.6 GHz)",
      ram: "32 GB DDR5 Kingston FURY Beast 5600MHz",
      storage: "1 TB SSD NVMe WD Black SN850X",
      gpu: "NVIDIA GeForce RTX 4060 Ti (16GB video xotira)",
      screenSize: "N/A (PC blok)",
      screenType: "Silent bezyoritgichli qora metal keys",
      batteryHealth: "N/A",
      exteriorCondition: "Yangi yig'ilgan testlardan a'lo o'tgan",
      batteryCycleCount: 0,
      boxAndAccessories: "Quvvat kabeli va barcha ehtiyot qismlari qutilari"
    }
  },
  {
    id: "38",
    name: "Apple Mac Studio M2 Max SuperPC",
    brand: "Macbook",
    category: "Kompyuterlar",
    price: 32500000,
    imageUrl: "https://images.unsplash.com/photo-1625766763788-95dcce9bf5ac?auto=format&fit=crop&w=600&q=80",
    description: "Kichik ammo aqlbovar qilmas premium darajadagi kompyuter. Musiqa studiyalari, katta filmlar montaji va dasturlarni testlash studiyalari uchun.",
    rating: 5.0,
    specs: {
      brandAndModel: "Apple Mac Studio M2 Max (2023)",
      cpu: "Apple M2 Max (12-core CPU / 30-core GPU)",
      ram: "32 GB Unified RAM Super Speed",
      storage: "512 GB SSD Superfast PCIe Apple",
      gpu: "Apple M2 Max Integrated 30-core",
      screenSize: "N/A",
      screenType: "Alyuminiy monolit ixcham Studio keysi",
      batteryHealth: "N/A",
      exteriorCondition: "Yangi original kafolatli",
      batteryCycleCount: 0,
      boxAndAccessories: "Original Studio qutisi, Apple premium simi"
    }
  },
  {
    id: "39",
    name: "Kingston FURY Beast DDR5 32GB kit",
    brand: "Windows",
    category: "Kompyuterlar",
    price: 1800000,
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    description: "Sizning shaxsiy kompyuteringizni zamon talabiga mos DDR5 tezligiga yangilovchi Kingston FURY tezkor xotira to'plami. RGB jozibador chirog'iga ega.",
    rating: 4.8,
    specs: {
      brandAndModel: "Kingston FURY Beast RGB DDR5-6000MHz (2x16GB KIT)",
      cpu: "N/A",
      ram: "32 GB (2 ta 16GB plankalar)",
      storage: "N/A",
      gpu: "CL36 past tayming kechikishi",
      screenSize: "Intel XMP 3.0 va AMD EXPO profillarini qo'llaydi",
      screenType: "Alyuminiy qora radiatorli modullar",
      batteryHealth: "N/A",
      exteriorCondition: "Yangi plastik upakovkada",
      batteryCycleCount: 0,
      boxAndAccessories: "Plastik upakovka, stiker va yo'riqnoma"
    }
  },
  {
    id: "40",
    name: "Samsung 990 Pro SSD 2TB M.2",
    brand: "Windows",
    category: "Kompyuterlar",
    price: 2600000,
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    description: "Dunyodagi eng ishonchli va eng tezkor doimiy xotira diski. O'yinlar saniyalar ichida o'qiladi, fayllarni yozish tezligi hayratga soladi.",
    rating: 4.9,
    specs: {
      brandAndModel: "Samsung 990 PRO NVMe M.2 SSD PCIe 4.0",
      cpu: "Samsung Pascal Controller",
      ram: "2GB LPDDR4 xotira kesh",
      storage: "2 TB (2000 GB) uzoq umr V-NAND SSD",
      gpu: "O'qish tezligi: 7450 MB/s, Yozish tezligi: 6900 MB/s",
      screenSize: "M.2 (2280) standart shakli",
      screenType: "Smart Isitgich-Radiatorsiz model (Heatsink variant ham bor)",
      batteryHealth: "1200 TBW kafolatlangan yozish resursi",
      exteriorCondition: "Yangi muhrlangan upakovkada",
      batteryCycleCount: 0,
      boxAndAccessories: "Samsung original qutisi va unikal pasport sertifikati"
    }
  },

  // =============== AKSESSUARLAR (41 to 55) ===============
  {
    id: "41",
    name: "Keyboard Keychron Q1 Knob Pro",
    brand: "Windows",
    category: "Aksessuarlar",
    price: 2400000,
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
    description: "To'liq alyuminiy og'ir korpusga ega bo'lgan, professional mexanik klaviatura. Knopka-g'ildiragi bilan tovushni boshqarish juda oson.",
    rating: 4.9,
    specs: {
      brandAndModel: "Keychron Q1 QMK Pro Knob",
      cpu: "N/A",
      ram: "Gateron G Pro Red switches (Yumshoq ovozsiz mexanik)",
      storage: "Double-shot PBT tugmachalari",
      gpu: "To'liq sozlamali RGB klaviatura oqimi",
      screenSize: "Simsiz Bluetooth 5.1 & Type-C ulash imkoni",
      screenType: "Mac va Windows tugmalari komplektda bor",
      batteryHealth: "4000 mAh qayta zaryadlanuvchi batareya",
      exteriorCondition: "Yangi original to'q qora metal",
      batteryCycleCount: 0,
      boxAndAccessories: "O'rash qutisi, kalit yechuvchi puller, spiral jozibador simli Type-C"
    }
  },
  {
    id: "42",
    name: "Sichqoncha Logitech MX Master 3S Gray",
    brand: "Windows",
    category: "Aksessuarlar",
    price: 1350000,
    imageUrl: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80",
    description: "Dasturchilar va dizaynerlarning sevimli simsiz sichqoni. Oyoq ostidagi har qanday shisha ustida ham ishlay oladigan o'ta unikal datchik.",
    rating: 4.8,
    specs: {
      brandAndModel: "Logitech MX Master 3S Wireless",
      cpu: "Darkfield sensor (Ruxsat: 8000 DPI gacha sozlanadi)",
      ram: "Magspeed magnitli aylanuvchi metall skrol (g'ildirak)",
      storage: "7 ta sozlanadigan jozibali tugmalar",
      gpu: "Ergonomik qo'lni chatnatmaydigan shakl",
      screenSize: "Sichqoncha simsiz USB Logi Bolt va Bluetooth",
      screenType: "Easy-switch: 3 ta qurilmagacha oson almashinadi",
      batteryHealth: "70 kungacha uzoq batareya quvvati",
      exteriorCondition: "Yangi a'lo qadoqda",
      batteryCycleCount: 0,
      boxAndAccessories: "Karobka, Type-C zaryadlash moslama simi, Bolt qabul qiluvchi datchik"
    }
  },
  {
    id: "43",
    name: "Backpack Xiaomi Multi-functional 2",
    brand: "Windows",
    category: "Aksessuarlar",
    price: 450000,
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    description: "Noutbuklarni xavfsiz va suv o'tkazmas korpusda olib yurish uchun mo'ljallangan zamonaviy shahar ruyzaki. Maxsus zarbaga qarshi jildga ega.",
    rating: 4.6,
    specs: {
      brandAndModel: "Xiaomi Business Multi-functional Backpack 2",
      cpu: "N/A",
      ram: "Suv o'tkazmaydigan 4-toifali Oksford matosi",
      storage: "Hajmi: 26 Litr, ko'plab cho'ntaklar",
      gpu: "Orqa qismi havo o'tish teshikli yumshoq porolon",
      screenSize: "Noutbuk bo'limi: 15.6 dyumgacha bemalol sig'adi",
      screenType: "Rangi: Klassik to'q kulrang",
      batteryHealth: "N/A",
      exteriorCondition: "Yangi yorlig'i va upakovkasi bilan",
      batteryCycleCount: 0,
      boxAndAccessories: "Plastik himoya sumkasida"
    }
  },
  {
    id: "44",
    name: "HyperX Cloud III Gaming Headset",
    brand: "Windows",
    category: "Aksessuarlar",
    price: 1300000,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    description: "Geymerlar uchun uzoq vaqt noqulayliksiz kiyib yuriladigan yumshoq charm yostiqli, o'ta tiniq ovozga ega professional quloqchin.",
    rating: 4.7,
    specs: {
      brandAndModel: "HyperX Cloud III Gaming Over-Ear",
      cpu: "Alohida ovoz kartasi DTS Headphone:X spatial",
      ram: "53 mm dinamik membrana drayverlari",
      storage: "Shovqinni filtrlovchi mukammal mikrofon segmenti",
      gpu: "Metall mustahkam alyuminiy gardish",
      screenSize: "Ulanishi: 3.5mm jack + USB Type-C / Type-A adapterlar",
      screenType: "Muddatsiz uzoq umrga ega memory foam xotira charmi",
      batteryHealth: "N/A (Simli)",
      exteriorCondition: "Yangi upakovkada original kafolat",
      batteryCycleCount: 0,
      boxAndAccessories: "Mikrofon, adapter drayver kartasi, original qutisi"
    }
  },
  {
    id: "45",
    name: "Logitech G Pro X Superlight White",
    brand: "Windows",
    category: "Aksessuarlar",
    price: 1850000,
    imageUrl: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80",
    description: "Kibersport olamidagi eng ommabop simsiz geymer sichqoni. Og'irligi bor-yo'g'i 63 gramm bo'lib, mislsiz tezlik taqdim etadi.",
    rating: 4.9,
    specs: {
      brandAndModel: "Logitech G Pro X Superlight Wireless",
      cpu: "Hero 25K Sensor (Ultra - 25600 DPI)",
      ram: "Vazni: 63 gramm bo'shashgan g'ovaksiz",
      storage: "Simsiz Lightspeed o'ta tezkor texnologiya",
      gpu: "PTFE toshchalari sirg'alishni osonlashtiradi",
      screenSize: "Rangi: Minimalistik oq",
      screenType: "Teksturali qo'shimcha ushlagich stikerlar jamlanmasi",
      batteryHealth: "70 soat uzluksiz o'yin quvvati",
      exteriorCondition: "Yangi ideal muhrli qadoq",
      batteryCycleCount: 0,
      boxAndAccessories: "Lightspeed USB datchik, zaryadlovchi kabel, logotip stiker, so'rg'ich oyoqchalar"
    }
  },
  {
    id: "46",
    name: "Baseus 100W GaN5 Pro Charger Pro",
    brand: "Windows",
    category: "Aksessuarlar",
    price: 650000,
    imageUrl: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80",
    description: "Yangi avlod galyum nitrid (GaN) texnologiyasidagi mitti va o'ta kuchli quvvatlagich moduli. Macbook va telefonni barobariga tez zaryadlaydi.",
    rating: 4.7,
    specs: {
      brandAndModel: "Baseus GaN5 Pro Multi-port Fast Charger 100W",
      cpu: "Aqlli quvvat tarqatuvchi BPS II texnologiya",
      ram: "Portlar: 2 ta USB-C va 2 ta USB-A ultra datchik",
      storage: "Kichik qizib ketishga qarshi xavfsizlik chiplari",
      gpu: "100W Type-C maksimal umumiy quvvat va yuklama",
      screenSize: "Yevro-vilka rozetka rozetkaga mos keladi",
      screenType: "Yorqin ko'k indikator chiroqchali",
      batteryHealth: "N/A",
      exteriorCondition: "Yangi qutida muhr",
      batteryCycleCount: 0,
      boxAndAccessories: "Baseus original Type-C dan Type-C ga 100W kabeli va yo'riqnoma"
    }
  },
  {
    id: "47",
    name: "Ugreen Nexode USB-C Hub 7-in-1",
    brand: "Windows",
    category: "Aksessuarlar",
    price: 480000,
    imageUrl: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=600&q=80",
    description: "Macbook va yupqa noutbuklar uchun barcha kerakli portlarni kengaytirib beradigan alyuminiy o'ta qulay adapter hub.",
    rating: 4.6,
    specs: {
      brandAndModel: "Ugreen Nexode 7-in-1 Premium Hub",
      cpu: "Datchiklar: HDMI 4K@60Hz, SD/MicroSD slots",
      ram: "2x USB 3.0 Type-A high speed ports (5Gbps)",
      storage: "Power Delivery Type-C input (100W gacha tok qabul qiladi)",
      gpu: "Sovuq alyuminiy kulrang korpus, elegant dizayn",
      screenSize: "O'rnatilgan 15 sm mustahkam neylon tashqi sim kabel",
      screenType: "Har qanday noutbuk va planshetga mos Type-C porti orqali",
      batteryHealth: "N/A",
      exteriorCondition: "Yangi korobkada muhrlangan",
      batteryCycleCount: 0,
      boxAndAccessories: "Original Ugreen quti, himoya g'ilofchasi va hujjatlari"
    }
  },
  {
    id: "48",
    name: "Cooler Master ErgoStand IV Pad",
    brand: "Windows",
    category: "Aksessuarlar",
    price: 680000,
    imageUrl: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80",
    description: "Noutbukingiz qizib ketmasligi uchun maxsus metall to'rli sovutkich taglikstend. 140 mm li katta tinch ishlaydigan parragi bilan ta'minlangan.",
    rating: 4.5,
    specs: {
      brandAndModel: "Cooler Master NotePal ErgoStand IV",
      cpu: "Parrak o'lchami: 1x 140mm fan, silliq tezlik boshqaruvi",
      ram: "Metall to'r va aerodinamik plastik korpus taglik",
      storage: "Balandlik sozlanishi shakli: 5 xil burchaklar ergonomikaga mos",
      gpu: "Chiroyli ko'k yosh yorqin chiroqlari o'rnatilgan",
      screenSize: "Noutbuk ko'lami: 17 dyumgacha bo'lgan noutbuklar uchun",
      screenType: "4 ta qo'shimcha USB-A chiqish portlari bor o'rnatilgan hub",
      batteryHealth: "USB oqimi orqali quvvatlanadi (5V DC)",
      exteriorCondition: "Yangi upakovkada ishlaydi jim holda",
      batteryCycleCount: 0,
      boxAndAccessories: "Ulovchi USB pasport kabeli, qo'shimcha cheklovchi ushlagichlar"
    }
  },
  {
    id: "49",
    name: "Apple Magic Keyboard Bluetooth",
    brand: "Macbook",
    category: "Aksessuarlar",
    price: 1950000,
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
    description: "Macbook va iMac bilan uzviy, o'ta yupqa va mitti simsiz Bluetooth klaviatura. Batareyasi 1 oydan ortiq quvvat saqlaydi.",
    rating: 4.8,
    specs: {
      brandAndModel: "Apple Magic Keyboard MLA22LL/A",
      cpu: "N/A",
      ram: "Qaychi-mexanizmli o'ta xavfsiz tugmachalar",
      storage: "Alyuminiy ultra-yengil oq monolit korpus",
      gpu: "Mac operatsion tizimiga to'liq mos tugmalar jamlanmasi",
      screenSize: "Ssilka: Bluetooth tezkor ulash va Lightning port",
      screenType: "Vazni: atigi 231 gramm",
      batteryHealth: "O'rnatilgan litiy-ion qayta quvvatlanuvchi batareya",
      exteriorCondition: "Yangi original kafolatli",
      batteryCycleCount: 0,
      boxAndAccessories: "Apple original oq qutisi, Lightning to USB original oq kabel"
    }
  },
  {
    id: "50",
    name: "Razer BlackWidow V4 Mini Keyboard",
    brand: "Windows",
    category: "Aksessuarlar",
    price: 2100000,
    imageUrl: "https://images.unsplash.com/photo-1626908013351-800ddd734b8a?auto=format&fit=crop&w=600&q=80",
    description: "Geymerlar uchun 65% o'lchamdagi mitti mexanik klaviatura. Razer sariq chiziqli o'ta tez eshitiluvchi kalitlariga ega.",
    rating: 4.9,
    specs: {
      brandAndModel: "Razer BlackWidow V4 Premium Mini Hyperspeed",
      cpu: "Razer Yellow Silent Linear switches",
      ram: "Chidamli PBT tugmalar qoplamasi",
      storage: "Hyperspeed Simsiz 3 xil usulda ulash",
      gpu: "Chiroyli Razer Chroma RGB sinxron chiroqlar tizimi",
      screenSize: "Datchik: 2.4Ghz, Bluetooth 5.0 va simli ulanishlar",
      screenType: "Vazni: 780 gramm kichik barqaror stol ustida surilmaydi",
      batteryHealth: "RGBsiz 200 soatgacha simsiz uzoq umr drayv",
      exteriorCondition: "Yangi original muhrlangan qutida",
      batteryCycleCount: 0,
      boxAndAccessories: "Razer original quti, Type-C neylon kabel, PBT puller"
    }
  },
  {
    id: "51",
    name: "AirPods Pro 2 USB-C",
    brand: "Macbook",
    category: "Aksessuarlar",
    price: 3200000,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    description: "Dunyodagi eng yaxshi shovqinni faol ravishda kamaytiradigan bluetooth quloqchin. Yangi USB-C portli keys va H2 chipi bilan.",
    rating: 4.9,
    specs: {
      brandAndModel: "Apple AirPods Pro 2nd Generation with USB-C case",
      cpu: "Apple H2 audio chip, Apple U1 chip keysda",
      ram: "Active Noise Cancellation (ANC- faol shovqin cheklovchi)",
      storage: "Loud Adaptive Audio va Transparency eshittirish rejimlari",
      gpu: "Dinamik bosh harakati bo'shliq bo'ylab 3D faza ovozi",
      screenSize: "Suv va terdan himoya darajasi IP54",
      screenType: "MagSafe zaryadlash va dinamikli ovoz beruvchi keys",
      batteryHealth: "Keysi bilan jami 30 soatgacha tinglash imkoni",
      exteriorCondition: "Mustahkam original ochilmagan upakovka",
      batteryCycleCount: 2,
      boxAndAccessories: "To'liq komplekt, 4 xil razmerdagi silikon uchliklar amushurlar, Type-C qisqa sim"
    }
  },
  {
    id: "52",
    name: "Mousepad SteelSeries QcK Heavy XXL",
    brand: "Windows",
    category: "Aksessuarlar",
    price: 350000,
    imageUrl: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80",
    description: "Professional geymerlar uchun o'ta qalin mikrotola matoli ulkan sichqoncha gilamchasi. Ish stolini to'liq qoplab turadi.",
    rating: 4.7,
    specs: {
      brandAndModel: "SteelSeries QcK Heavy XXL Gaming Mousepad",
      cpu: "N/A",
      ram: "Tekstura: Haqiqiy mikrotola professional to'qima",
      storage: "Qalinligi: 4mm (shikastlovchi zarbalarni yumshatadi)",
      gpu: "Sirg'almas rezina taglik asosi",
      screenSize: "O'lchamlari: 900 mm x 400 mm ultra-katta XXL",
      screenType: "Chiziqlarsiz tiniq qora rang minimalist",
      batteryHealth: "N/A",
      exteriorCondition: "Yangi ssilindrsimon qutida",
      batteryCycleCount: 0,
      boxAndAccessories: "SteelSeries logotip stikeri, qadoq qutisi"
    }
  }
];
