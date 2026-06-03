import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Home as HomeIcon, 
  Search, 
  Sparkles, 
  User, 
  ChevronDown, 
  Heart, 
  ShoppingBag, 
  Cpu, 
  Monitor, 
  BatteryCharging, 
  Package, 
  SlidersHorizontal,
  X,
  Plus,
  Minus,
  CheckCircle,
  Clock,
  MessageSquare,
  AlertCircle,
  Truck,
  MapPin,
  Phone,
  UserCheck,
  ShieldCheck,
  Download,
  Wifi,
  WifiOff,
  Share,
  MoreVertical,
  Laptop,
  Smartphone
} from "lucide-react";
import { 
  Product, 
  CartItem, 
  Order, 
  CATEGORIES, 
  REGIONS, 
  INITIAL_PRODUCTS 
} from "./types";
import AIAdvisor from "./components/AIAdvisor";

export default function App() {
  // Splash Screen State
  const [showSplash, setShowSplash] = useState(true);
  const [splashProgress, setSplashProgress] = useState(0);

  // Progressive Web App (PWA) Install Prompt States
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [showNetworkToast, setShowNetworkToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<"online" | "offline">("online");
  const [showPwaGuide, setShowPwaGuide] = useState(false);
  const [activeGuideTab, setActiveGuideTab] = useState<"ios" | "android" | "pc">("ios");

  // Core App states
  const [activeTab, setActiveTab] = useState<"home" | "catalog" | "ai" | "profile">("home");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-9284-UZB",
      items: [
        {
          id: "initial-1",
          product: INITIAL_PRODUCTS[1], // ThinkPad
          quantity: 1
        }
      ],
      totalAmount: 18900000,
      date: "2026-05-28",
      status: "Yetkazilmoqda",
      customerName: "Abdulxay Avazxanov",
      phone: "+998 90 123 45 67",
      deliveryAddress: "Andijon shahar, Alisher Navoiy ko'chasi, 24-uy"
    }
  ]);

  const [selectedRegion, setSelectedRegion] = useState<string>("Farg'ona");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Search Overlay states - Figma Images 10 & 11
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([
    "lenovo thinkpad",
    "macbook air",
    "gaming noutbuklar",
    "hp victus"
  ]);

  // Product Filter States
  const [categoryFilter, setCategoryFilter] = useState<'Noutbuklar' | 'Kompyuterlar' | 'Aksessuarlar' | null>(null);
  const [brandFilter, setBrandFilter] = useState<string | null>(null);
  const [customSpecModal, setCustomSpecModal] = useState<Product | null>(null);

  // Cart Drawer & Checkout state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "form" | "success">("cart");
  const [checkoutName, setCheckoutName] = useState("");
  const [checkoutPhone, setCheckoutPhone] = useState("+998 ");
  const [checkoutAddress, setCheckoutAddress] = useState("");
  
  // Profile inputs
  const [bioName, setBioName] = useState("Abdulxay Avazxanov");
  const [bioText, setBioText] = useState("Men haqimda: IT talabasi va noutbuk ishqibozi");
  const [complaintText, setComplaintText] = useState("");
  const [complaintSuccess, setComplaintSuccess] = useState(false);

  // Promo Banner Index
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  const promoBanners = [
    {
      id: 1,
      title: "Yozgi qizg'in chegirmalar!",
      subtitle: "Barcha noutbuklarga 15% gacha arzonlashtirilgan narxlar",
      bgColor: "from-[#FD6C1D] to-[#FD851D]",
      image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      title: "Aqlli Tizim bilan tanlang",
      subtitle: "Smart qidiruv tizimi siz uchun eng mos noutbukni tanlab beradi",
      bgColor: "from-[#5A20D4] to-[#481AAA]",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      title: "Asus ROG yangi modellar yetib keldi!",
      subtitle: "Geymerlar uchun professional OLED ekranli portativ quvvat",
      bgColor: "from-slate-900 to-slate-850",
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=400&q=80"
    }
  ];

  // Splash Screen timer loops
  useEffect(() => {
    if (showSplash) {
      const interval = setInterval(() => {
        setSplashProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setShowSplash(false), 400); // smooth exit
            return 100;
          }
          return prev + 1;
        });
      }, 450);
      return () => clearInterval(interval);
    }
  }, [showSplash]);

  // PWA & Network Integrity Monitoring
  useEffect(() => {
    // Check if prompt was already captured by index.html early-listener
    if ((window as any).deferredPrompt) {
      setDeferredPrompt((window as any).deferredPrompt);
      setShowInstallBanner(true);
    }

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
    };

    const handleCustomPromptAvailable = (e: any) => {
      if (e.detail) {
        setDeferredPrompt(e.detail);
        setShowInstallBanner(true);
      }
    };

    const handleOnline = () => {
      setIsOnline(true);
      setToastMessage("Internet aloqasi tiklandi! Tarmoq hozir faol.");
      setToastType("online");
      setShowNetworkToast(true);
      setTimeout(() => setShowNetworkToast(false), 4000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setToastMessage("Internet aloqasi uzildi. Ilova barqaror oflayn rejimda ishlamoqda.");
      setToastType("offline");
      setShowNetworkToast(true);
      setTimeout(() => setShowNetworkToast(false), 4000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('pwa-prompt-available', handleCustomPromptAvailable);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check
    if (!navigator.onLine) {
      setTimeout(() => {
        handleOffline();
      }, 3500);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('pwa-prompt-available', handleCustomPromptAvailable);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const triggerPWAInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    try {
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`PWA o'rnatish tanlovi: ${outcome}`);
    } catch (err) {
      console.error("Install prompt error:", err);
    }
    setDeferredPrompt(null);
    setShowInstallBanner(false);
  };

  const handleGuideItemClick = () => {
    setToastMessage("E'tibor bering: bu shunchaki qo'llanma rasmidir. Haqiqiy o'rnatish uchun brauzeringiz boshqaruv elementidan foydalaning!");
    setToastType("offline"); // highlighted amber/red color for alert
    setShowNetworkToast(true);
    setTimeout(() => setShowNetworkToast(false), 5000);
  };

  // Rotate promo carousel is manual only to ensure stability against unprompted movement
  useEffect(() => {
    // Manual dots interaction is preferred to keep design stable and comfortable
  }, []);

  // Action helpers
  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: `cart-${Date.now()}`, product, quantity: 1 }];
    });
    // Trigger drawer open
    setIsCartOpen(true);
    setCheckoutStep("cart");
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart(prev => 
      prev.map(item => {
        if (item.id === cartItemId) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty < 1 ? 1 : newQty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const submitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutName || checkoutPhone.trim().length <= 6 || !checkoutAddress) {
      alert("Iltimos, barcha maydonlarni to'liq to'ldiring!");
      return;
    }

    const orderTotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}-UZB`,
      items: [...cart],
      totalAmount: orderTotal,
      date: new Date().toISOString().split("T")[0],
      status: "Tayyorlanmoqda",
      customerName: checkoutName,
      phone: checkoutPhone,
      deliveryAddress: checkoutAddress
    };

    setOrders(prev => [newOrder, ...prev]);
    setCheckoutStep("success");
    setCart([]); // reset cart
  };

  const handleInstantBuyFromAI = (customProduct: Product) => {
    // Check if product is already in our list, if not insert temporarily so detail works
    addToCart(customProduct);
  };

  // Filtered Products for Catalog
  const filteredProducts = INITIAL_PRODUCTS.filter(p => {
    // Category match
    if (categoryFilter && p.category !== categoryFilter) return false;
    // Brand match
    if (brandFilter && p.brand !== brandFilter) return false;
    return true;
  });

  // Hot Search autocomplete items - Figma Images 11
  const searchResults = INITIAL_PRODUCTS.filter(p => {
    if (!searchQuery) return false;
    const q = searchQuery.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.specs.brandAndModel.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
  });

  const cartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center py-0 sm:py-6 md:py-8 font-sans transition-colors overflow-hidden selection:bg-[#5A20D4] selection:text-white relative">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-950/25 via-transparent to-transparent pointer-events-none"></div>

      {/* Main Responsive Design Box - Phone mockup shell on desktops, full screen on cellphones */}
      <div 
        id="app-container"
        className="w-full h-screen sm:h-[840px] sm:max-h-[95vh] max-w-full sm:max-w-[420px] bg-white text-slate-800 flex flex-col relative overflow-hidden pb-20 justify-between box-border shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] sm:rounded-[42px] sm:border-[10px] sm:border-slate-800"
      >
        {/* Visual Splash Screen Block - Mirroring Figma Image 2 */}
        <AnimatePresence>
          {showSplash && (
            <motion.div 
              id="splash-screen"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-white z-[120] flex flex-col justify-between items-center py-12 px-6 overflow-hidden"
            >
              <div></div>
              
              {/* Logo animation Container */}
              <div className="flex flex-col items-center gap-5 text-center">
                <motion.div 
                  initial={{ scale: 0.82, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.15, type: "spring" }}
                  className="flex items-center select-none font-display font-black text-5xl tracking-tighter"
                >
                  <span className="text-[#E35E0B]">i</span>
                  <span className="text-[#4E3C9E]">NOUT</span>
                </motion.div>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 }}
                  className="text-xs text-slate-400 font-bold tracking-widest uppercase font-sans"
                >
                  Noutbuklar va Kompyuterlar olami
                </motion.p>
              </div>

              {/* Orange Progress bar bottom */}
              <div className="w-48 max-w-full space-y-2">
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${splashProgress}%` }}
                    className="h-full bg-gradient-to-r from-[#5A20D4] to-[#7C3AED] rounded-full"
                  ></motion.div>
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                  <span>Biroz kuting...</span>
                  <span>{splashProgress}%</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Network Status Pop Toast */}
        <AnimatePresence>
          {showNetworkToast && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 16, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className={`absolute top-12 left-4 right-4 z-[115] p-3 rounded-2xl shadow-xl flex items-center gap-3 border ${
                toastType === "online" 
                  ? "bg-slate-900 border-slate-800 text-emerald-400" 
                  : "bg-red-950 border-red-900 text-red-300"
              }`}
            >
              <div className={`p-2 rounded-xl ${
                toastType === "online" ? "bg-emerald-500/15" : "bg-red-500/15"
              }`}>
                {toastType === "online" ? (
                  <Wifi className="w-4 h-4 text-emerald-400" />
                ) : (
                  <WifiOff className="w-4 h-4 text-red-00" />
                )}
              </div>
              <div className="flex-1 text-left">
                <span className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Tarmoq Holati
                </span>
                <p className="text-[11px] font-bold leading-normal text-white">
                  {toastMessage}
                </p>
              </div>
              <button 
                onClick={() => setShowNetworkToast(false)}
                className="text-slate-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quiet Persistent Offline Banner */}
        {!isOnline && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white text-[9px] py-1.5 px-4 font-black tracking-widest uppercase flex items-center justify-center gap-1.5 select-none text-center z-[100]"
          >
            <WifiOff className="w-3.5 h-3.5 animate-bounce" />
            <span>Oflayn rejim faollashtirildi</span>
          </motion.div>
        )}

        {/* TOP STATUS BAR MOCK */}
        <div className="w-full px-5 py-3 bg-slate-50 border-b border-slate-100 flex justify-center items-center select-none">
          <div className="flex items-center select-none font-display font-black text-xl tracking-tighter focus:scale-98 transition active:scale-95 cursor-pointer">
            <span className="text-[#E35E0B]">i</span>
            <span className="text-[#4E3C9E]">NOUT</span>
          </div>
        </div>

        {/* Dynamic Navigation View Container */}
        <div className="flex-1 w-full overflow-y-auto">
          {/* 1. HOME VIEW */}
          {activeTab === "home" && (
            <div className="p-4 space-y-5 animate-fadeIn">
              {/* Header Selector & Likes - Figma Image 3 */}
              <div className="flex justify-between items-center">
                <div className="relative group">
                  <button className="flex items-center gap-1 bg-slate-50 hover:bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-bold text-slate-700 transition">
                    <MapPin className="w-3.5 h-3.5 text-[#FD6C1D]" />
                    <span>{selectedRegion}</span>
                    <ChevronDown className="w-3 h-3 text-slate-500" />
                  </button>
                  <div className="absolute left-0 mt-1 hidden group-hover:block bg-white dark:bg-white border border-slate-150 rounded-xl shadow-lg z-30 py-1.5 w-40 text-xs text-left">
                    {REGIONS.map(reg => (
                      <button 
                        key={reg}
                        onClick={() => setSelectedRegion(reg)}
                        className="w-full px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#FD6C1D] text-left transition font-medium"
                      >
                        {reg}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Favorite Counter Heart */}
                <button 
                  onClick={() => setActiveTab("profile")}
                  className="p-2.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-[#FD6C1D] transition relative"
                >
                  <Heart className="w-4 h-4 fill-slate-300 stroke-slate-600 hover:fill-[#FD6C1D]" />
                  {favorites.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#FD6C1D] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-[16px] text-center">
                      {favorites.length}
                    </span>
                  )}
                </button>
              </div>

              {/* Qidiruv search box - clicking triggers custom suggestions screen */}
              <div 
                onClick={() => setShowSearchOverlay(true)}
                className="w-full flex items-center justify-between border border-slate-200 hover:border-slate-300 rounded-2xl px-4 py-3 bg-white text-slate-400 cursor-pointer transition shadow-sm text-xs gap-2 select-none"
              >
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-[#5A20D4]" />
                  <span>qidiruv...</span>
                </div>
                <div className="flex items-center gap-1 font-mono text-[9px] text-slate-300 bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded">
                  ALT + Q
                </div>
              </div>

              {/* Dynamic sliding promotion card banner */}
              <div className="relative h-44 rounded-2xl overflow-hidden text-white shadow-md flex items-center p-4">
                <div className={`absolute inset-0 bg-gradient-to-r ${promoBanners[currentPromoIndex].bgColor} transition-all duration-1000`}></div>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPromoIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                    className="relative z-10 w-full h-full flex items-center justify-between"
                  >
                    <div className="w-[58%] space-y-1.5 text-left flex flex-col justify-center h-full">
                      <span className="bg-[#ADF762] text-slate-900 text-[9px] uppercase tracking-wider font-display font-black px-2.5 py-0.5 rounded shadow-sm w-fit leading-none select-none">
                        AKSIYA
                      </span>
                      <h3 className="text-xs sm:text-sm font-black font-display leading-[1.15] text-[#FFFFFF]">
                        {promoBanners[currentPromoIndex].title}
                      </h3>
                      <p className="text-[10px] text-white/80 leading-normal font-sans line-clamp-2">
                        {promoBanners[currentPromoIndex].subtitle}
                      </p>
                      <button 
                        onClick={() => {
                          if (currentPromoIndex === 1) {
                            setActiveTab("ai");
                          } else {
                            setActiveTab("catalog");
                          }
                        }}
                        className="mt-1.5 text-[9px] font-black uppercase tracking-widest text-[#5A20D4] bg-white hover:bg-slate-100 px-4 py-2 rounded-xl shadow-md transition-all duration-200 block w-fit hover:scale-105 active:scale-95 cursor-pointer leading-none"
                      >
                        Batafsil
                      </button>
                    </div>

                    {/* Enlarged and beautifully animated Image */}
                    <div className="relative w-[38%] h-full flex items-center justify-center">
                      <motion.img 
                        initial={{ scale: 0.75, y: 12, rotate: -3 }}
                        animate={{ 
                          scale: 1,
                          y: [0, -6, 0],
                          rotate: [-1, 2, -1],
                        }}
                        transition={{
                          scale: { duration: 0.4, ease: "easeOut" },
                          y: { repeat: Infinity, duration: 3.5, ease: "easeInOut" },
                          rotate: { repeat: Infinity, duration: 4.5, ease: "easeInOut" }
                        }}
                        src={promoBanners[currentPromoIndex].image} 
                        alt="Promo" 
                        className="w-full max-h-[115%] object-contain filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.35)]"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Banner Dots indicator */}
                <div className="absolute bottom-3 left-4 flex gap-1.5 z-20">
                  {promoBanners.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => setCurrentPromoIndex(dotIdx)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentPromoIndex === dotIdx ? "bg-white w-4.5" : "bg-white/40"
                      }`}
                    ></button>
                  ))}
                </div>
              </div>

              {/* Horizontal Categories - Figma Image 3 */}
              <div className="space-y-3 text-left">
                <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Kategoriyalar</span>
                <div className="grid grid-cols-3 gap-2">
                  {CATEGORIES.map((cat, idx) => (
                    <motion.button
                      key={cat.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: idx * 0.05 }}
                      whileTap={{ scale: 0.94 }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => {
                        setCategoryFilter(cat.name as any);
                        setBrandFilter(null);
                        setActiveTab("catalog");
                      }}
                      className="group flex flex-col items-center gap-1.5 p-3 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-orange-50/20 hover:border-orange-100 transition duration-350 cursor-pointer"
                    >
                      {/* Orange-gradient round circle backdrop */}
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#FD6C1D] to-[#FD851D]/80 flex items-center justify-center text-lg shadow-sm group-hover:scale-105 transition duration-300">
                        {cat.icon}
                      </div>
                      <span className="text-[10px] font-bold text-slate-600 group-hover:text-[#FD6C1D] transition">
                        {cat.name}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Recommended laptop product grid - Figma Image 3 */}
              <div className="space-y-3 text-left">
                <div className="flex justify-between items-baseline">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Tavsiya etiladigan mahsulotlar</span>
                  <button 
                    onClick={() => {
                      setCategoryFilter(null);
                      setBrandFilter(null);
                      setActiveTab("catalog");
                    }}
                    className="text-[10px] font-bold text-[#5A20D4] hover:underline"
                  >
                    Barchasi
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  {INITIAL_PRODUCTS.slice(0, 4).map((prod, idx) => {
                    const isFav = favorites.includes(prod.id);
                    return (
                      <motion.div 
                        key={prod.id}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10px" }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-white border border-slate-100 rounded-2xl p-2.5 flex flex-col justify-between shadow-sm relative group hover:shadow-md hover:border-slate-200 transition duration-300"
                      >
                        {/* Favorite button */}
                        <button 
                          onClick={() => toggleFavorite(prod.id)}
                          className={`absolute top-2 right-2 p-1.5 rounded-full z-10 backdrop-blur-md transition ${
                            isFav ? "bg-red-50 text-red-500" : "bg-white/80 text-slate-400 hover:text-red-500"
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-red-500" : ""}`} />
                        </button>

                        <div 
                          className="cursor-pointer space-y-2 select-none"
                          onClick={() => setSelectedProduct(prod)}
                        >
                          {/* Image Box */}
                          <div className="w-full h-24 bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center">
                            <img 
                              src={prod.imageUrl} 
                              alt={prod.name} 
                              className="w-full h-full object-cover group-hover:scale-103 transition duration-500"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          <div className="space-y-1">
                            <h4 className="text-[11px] font-bold text-slate-700 leading-tight line-clamp-2 h-7">
                              {prod.name}
                            </h4>
                            <div className="flex gap-1.5 items-baseline">
                              <span className="text-[12px] font-extrabold text-[#FD6C1D]">
                                {prod.price.toLocaleString("uz-UZ")}
                              </span>
                              {prod.oldPrice && (
                                <span className="text-[9px] line-through text-slate-400">
                                  {prod.oldPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Buy Button */}
                        <motion.button 
                          whileTap={{ scale: 0.93 }}
                          onClick={() => addToCart(prod)}
                          className="w-full mt-2.5 py-2 text-[10px] font-extrabold text-white bg-gradient-to-r from-[#FD6C1D] to-[#FD851D] hover:brightness-105 rounded-xl transition duration-200 cursor-pointer text-center shadow-sm"
                        >
                          Sotib olish
                        </motion.button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* 2. CATALOG VIEW */}
          {activeTab === "catalog" && (
            <div className="p-4 space-y-4 animate-fadeIn">
              {/* Top Interactive Category Quick Selection Cards */}
              <div className="space-y-2 text-left">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">Turkumlar bo'yicha filter</span>
                <div className="grid grid-cols-4 gap-1.5 select-none">
                  {[
                    { id: null, name: "Barchasi", icon: "💎" },
                    { id: "Noutbuklar", name: "Noutbuk", icon: "💻" },
                    { id: "Kompyuterlar", name: "Kompyuter", icon: "🖥️" },
                    { id: "Aksessuarlar", name: "Aksessuar", icon: "🖱️" }
                  ].map(cat => (
                    <button
                      key={cat.name}
                      onClick={() => {
                        setCategoryFilter(cat.id as any);
                        setBrandFilter(null);
                      }}
                      className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all duration-200 active:scale-95 ${
                        categoryFilter === cat.id 
                          ? "bg-gradient-to-br from-[#5A20D4] to-[#481AAA] text-white border-[#5A20D4] shadow-md" 
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <span className="text-base mb-1">{cat.icon}</span>
                      <span className="text-[9px] font-extrabold leading-none">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Header filter title - Figma Image 4 */}
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-2xl border border-slate-150 select-none">
                <div className="text-left">
                  <h2 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                    {categoryFilter || "Barcha mahsulotlar"}
                  </h2>
                  <p className="text-[10px] text-[#5A20D4] font-extrabold">
                    {filteredProducts.length} ta mahsulot topildi
                  </p>
                </div>
                
                {/* Reset filters button */}
                {(categoryFilter || brandFilter) && (
                  <button 
                    onClick={() => {
                      setCategoryFilter(null);
                      setBrandFilter(null);
                    }}
                    className="text-[10px] bg-white text-[#FD6C1D] font-extrabold px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition shadow-sm"
                  >
                    Tozalash
                  </button>
                )}
              </div>

              {/* Horizontal scroll brand lists - Large Touch Areas (Figma Image 4) */}
              <div className="space-y-1.5 text-left">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">Brendlar</span>
                <div className="flex gap-2 overflow-x-auto pb-1.5 select-none no-scrollbar">
                  {["Macbook", "Windows", "Asus", "MSI", "Lenovo", "HP", "Dell"].map(brand => (
                    <motion.button
                      key={brand}
                      whileTap={{ scale: 0.90 }}
                      onClick={() => setBrandFilter(brandFilter === brand ? null : brand)}
                      className={`px-4.5 py-2.5 rounded-xl border text-[10px] font-extrabold whitespace-nowrap transition-all duration-200 flex items-center gap-1 min-h-[40px] uppercase tracking-wider ${
                        brandFilter === brand 
                          ? "bg-gradient-to-r from-[#FD6C1D] to-[#FD851D] text-white border-[#FD6C1D] shadow-md scale-102" 
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                      }`}
                    >
                      <span>{brand}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Catalog Product Grid - Figma Image 4 */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {filteredProducts.map((prod, idx) => {
                    const isFav = favorites.includes(prod.id);
                    return (
                      <motion.div 
                        key={prod.id}
                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10px" }}
                        transition={{ duration: 0.3, delay: Math.min(0.25, idx * 0.04) }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-white border border-slate-100 rounded-2xl p-2.5 flex flex-col justify-between shadow-sm relative group hover:shadow-md hover:border-slate-200 transition duration-300"
                      >
                        {/* Favorite button */}
                        <button 
                          onClick={() => toggleFavorite(prod.id)}
                          className={`absolute top-2 right-2 p-1.5 rounded-full z-10 backdrop-blur-md transition ${
                            isFav ? "bg-red-50 text-red-500" : "bg-white/80 text-slate-400 hover:text-red-500"
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-red-500" : ""}`} />
                        </button>

                        <div 
                          className="cursor-pointer space-y-2 select-none text-left"
                          onClick={() => setSelectedProduct(prod)}
                        >
                          {/* Image Box */}
                          <div className="w-full h-24 bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center">
                            <img 
                              src={prod.imageUrl} 
                              alt={prod.name} 
                              className="w-full h-full object-cover transition duration-500"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          <div className="space-y-1">
                            <h4 className="text-[11px] font-bold text-slate-700 leading-tight line-clamp-2 h-7">
                              {prod.name}
                            </h4>
                            <div className="flex gap-1.5 items-baseline">
                              <span className="text-[11px] font-extrabold text-[#FD6C1D]">
                                {prod.price.toLocaleString("uz-UZ")} so'm
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Buy Button */}
                        <motion.button 
                          whileTap={{ scale: 0.93 }}
                          onClick={() => addToCart(prod)}
                          className="w-full mt-2.5 py-2 text-[10px] font-extrabold text-white bg-gradient-to-r from-[#FD6C1D] to-[#FD851D] hover:brightness-105 rounded-xl transition duration-200 cursor-pointer text-center shadow-sm"
                        >
                          Sotib olish
                        </motion.button>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-slate-50 rounded-2xl p-8 text-center border">
                  <Package className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs text-slate-500 font-medium">Bunday mezonli mahsulot topilmadi.</p>
                </div>
              )}
            </div>
          )}

          {/* 3. AI ADVISOR VIEW */}
          {activeTab === "ai" && (
            <div className="animate-fadeIn">
              <AIAdvisor 
                onInstantBuy={handleInstantBuyFromAI} 
                favorites={favorites} 
                toggleFavorite={toggleFavorite} 
              />
            </div>
          )}

          {/* 4. PROFILE VIEW - Figma Image 9 */}
          {activeTab === "profile" && (
            <div className="space-y-4 animate-fadeIn pb-6">
              {/* Profile banner section */}
              <div className="bg-gradient-to-br from-[#5A20D4] via-[#481AAA] to-[#2E1085] p-5 pt-8 text-white text-left shadow-lg relative overflow-hidden select-none">
                <div className="absolute top-[-30px] right-[-30px] w-32 h-32 rounded-full bg-white/5 blur-2xl"></div>
                <div className="absolute bottom-[-10px] left-1/2 w-48 h-48 rounded-full bg-[#FD6C1D]/15 blur-3xl"></div>
                
                <div className="flex justify-between items-center relative z-10">
                  <div>
                    <span className="text-[9px] font-black uppercase text-[#ADF762] tracking-widest bg-white/10 px-2 py-0.5 rounded-full">
                      Mening Kabinetim
                    </span>
                    <h2 className="text-base font-black uppercase tracking-wider mt-1">Shaxsiy Profil</h2>
                  </div>
                  <div className="p-2 bg-white/10 hover:bg-white/15 rounded-xl cursor-pointer active:scale-95 transition">
                    <User className="w-4 h-4 text-[#ADF762]" />
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-6">
                {/* Staggered User Details Box */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-slate-50 p-4 rounded-3xl border border-slate-100 text-left relative shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative group select-none">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#5A20D4] to-[#FD6C1D] p-0.5 shadow-md">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-black text-[#5A20D4] text-lg font-display">
                          {bioName ? bioName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : "IN"}
                        </div>
                      </div>
                      <span className="absolute bottom-0 right-0 p-1 bg-[#5A20D4] text-white rounded-full border border-white text-[8px] animate-pulse">
                        ⭐
                      </span>
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="block">
                        <label className="text-[8px] font-extrabold uppercase tracking-widest text-[#5A20D4]">Ism Familiya</label>
                        <input 
                          type="text" 
                          value={bioName}
                          onChange={(e) => setBioName(e.target.value)}
                          className="w-full text-xs font-black text-slate-800 focus:outline-none bg-transparent hover:bg-white/80 focus:bg-white focus:ring-1 focus:ring-[#5A20D4] px-2 py-1 border border-dashed border-slate-300 rounded-xl transition-all duration-200"
                        />
                      </div>
                      <div className="block">
                        <label className="text-[8px] font-extrabold uppercase tracking-widest text-slate-400">Men haqimda</label>
                        <input 
                          type="text" 
                          value={bioText}
                          onChange={(e) => setBioText(e.target.value)}
                          className="w-full text-[10px] font-medium text-slate-500 focus:outline-none bg-transparent hover:bg-white/80 focus:bg-white focus:ring-1 focus:ring-[#5A20D4] px-2 py-1 border border-dashed border-slate-300 rounded-xl transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Micro Quick Stats Row Inside Profile */}
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-200/60 select-none">
                    <div className="text-center p-2 bg-white rounded-2xl border border-slate-100">
                      <span className="block text-xs font-black text-[#5A20D4]">{orders.length} ta</span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tight">Buyurtma</span>
                    </div>
                    <div className="text-center p-2 bg-white rounded-2xl border border-slate-100">
                      <span className="block text-xs font-black text-[#FD6C1D]">{favorites.length} ta</span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tight">Sevimlilar</span>
                    </div>
                    <div className="text-center p-2 bg-white rounded-2xl border border-slate-100">
                      <span className="block text-xs font-black text-emerald-500">Premium</span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tight">Status</span>
                    </div>
                  </div>
                </motion.div>

                {/* PWA Installation Section - Custom Widget */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                  className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-4 rounded-3xl text-left border border-slate-800 shadow-lg text-white relative overflow-hidden select-none"
                >
                  <div className="absolute top-[-25px] right-[-25px] w-28 h-28 rounded-full bg-[#FD6C1D]/15 blur-2xl"></div>
                  <div className="flex items-start gap-3 relative z-10">
                    <div className="p-3 bg-white/10 rounded-2xl border border-white/10 text-[#ADF762] flex-shrink-0">
                      <Download className="w-5 h-5 animate-pulse" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <span className="text-[8.5px] uppercase font-black text-[#ADF762] tracking-widest bg-[#ADF762]/10 border border-[#ADF762]/30 px-2.5 py-0.5 rounded-full inline-block">
                        Mobil &amp; Desktop PWA
                      </span>
                      <h3 className="text-xs font-black uppercase text-white tracking-wide">Mobil Ilova Sifatida</h3>
                      <p className="text-[10px] text-slate-300 leading-normal">
                        Noutbuklar do'konini to'g'ridan-to'g'ri telefoningiz yoki kompyuteringiz bosh ekraniga o'rnatib oling. Oflayn rejim va tezkor kirish imkoniyati!
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex flex-col gap-2 relative z-10 w-full">
                    <button
                      onClick={() => {
                        if (deferredPrompt) {
                          triggerPWAInstall();
                        } else {
                          setShowPwaGuide(true);
                        }
                      }}
                      className="w-full bg-gradient-to-r from-[#FD6C1D] to-[#FD851D] hover:from-[#FD851D] hover:to-[#FD6C1D] text-white text-[10.5px] font-black uppercase tracking-wider py-3 rounded-2xl transition-all cursor-pointer active:scale-95 shadow-md flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-4 h-4" />
                      O'rnatib olish
                    </button>
                    
                    <span className="text-[#ADF762] font-semibold text-[9px] flex items-center gap-1.5 justify-center leading-none mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block shrink-0" />
                      Avtomatik yangilanadigan zamonaviy PWA ilova
                    </span>
                  </div>
                </motion.div>

                {/* Buyurtm Tarixi - Figma Image 9 */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-left space-y-3"
                >
                  <div className="flex justify-between items-center select-none">
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">Buyurtmalar tarixi</span>
                    <span className="text-[9px] font-extrabold text-slate-500 bg-slate-100 border px-2.5 py-1 rounded-full">
                      {orders.length} ta xarid
                    </span>
                  </div>

                  <div className="space-y-3">
                    {orders.length > 0 ? (
                      orders.map(ord => (
                        <div key={ord.id} className="bg-white border border-slate-150 rounded-2xl p-4 shadow-sm space-y-3 hover:border-slate-300 transition duration-300">
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="font-extrabold text-[#5A20D4] tracking-wide">{ord.id}</span>
                            <span className="text-slate-400 font-mono font-bold uppercase">{ord.date}</span>
                          </div>

                          {/* Order Items */}
                          <div className="space-y-2 pl-2 border-l-2 border-slate-200">
                            {ord.items.map((it, idx) => (
                              <div key={idx} className="flex justify-between text-[11px] font-medium text-slate-700">
                                <span className="truncate pr-4">{it.product.name} ({it.quantity}x)</span>
                                <span className="font-extrabold text-slate-500 whitespace-nowrap">{(it.product.price * it.quantity).toLocaleString()} so'm</span>
                              </div>
                            ))}
                          </div>

                          {/* Live shipping progress indicator */}
                          <div className="space-y-1.5 select-none pt-1">
                            <div className="flex justify-between text-[8px] font-black tracking-wide text-slate-400 uppercase">
                              <span className={ord.status === "Tayyorlanmoqda" ? "text-[#FD6C1D]" : ""}>1. Qabul qilindi</span>
                              <span className={ord.status === "Yetkazilmoqda" ? "text-[#5A20D4]" : ""}>2. Yo'lda</span>
                              <span className={ord.status === "Yetkazildi" ? "text-emerald-500" : ""}>3. Yetkazildi</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full transition-all duration-1000 ${
                                ord.status === "Tayyorlanmoqda" 
                                  ? "w-1/3 bg-[#FD6C1D]" 
                                  : ord.status === "Yetkazilmoqda" 
                                    ? "w-2/3 bg-[#5A20D4]" 
                                    : "w-full bg-[#ADF762]"
                              }`}></div>
                            </div>
                          </div>

                          <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                            <div className={`flex items-center gap-1 text-[9px] font-black uppercase px-2.5 py-1 rounded-full ${
                              ord.status === "Yetkazildi" 
                                ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                                : "bg-orange-50 text-orange-600 border border-orange-100 animate-pulse"
                            }`}>
                              <Truck className="w-3 h-3" />
                              <span>{ord.status}</span>
                            </div>
                            <span className="text-xs font-black text-[#FD6C1D]">
                              {ord.totalAmount.toLocaleString()} so'm
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="bg-slate-50 border border-dashed rounded-3xl p-6 text-center select-none space-y-1.5">
                        <Clock className="w-8 h-8 text-slate-300 mx-auto" />
                        <span className="block text-xs font-extrabold text-slate-700">Hech qanday buyurtma yo'q</span>
                        <p className="text-[10px] text-slate-400">Ushbu qurilmada hali biror marta xarid amalga oshirilmagan.</p>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Suggestions and Complaints - Figma Image 9 */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="text-left space-y-3"
                >
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">Taklif va shikoyatlar</span>
                  <div className="bg-slate-50 rounded-3xl p-4 border border-slate-150 space-y-3 shadow-sm">
                    <p className="text-[10px] text-slate-400 leading-normal">
                      Bizning xizmat sifatini oshirish uchun o'z taklif, fikr yoki shikoyatlaringizni yozib qoldiring. Ularni bevosita texnik qo'llab-quvvatlash jamoamiz ko'rib chiqadi!
                    </p>
                    <textarea
                      placeholder="Fikr yoki shikoyatlaringizni batafsil yozing..."
                      value={complaintText}
                      onChange={(e) => {
                        setComplaintText(e.target.value);
                        setComplaintSuccess(false);
                      }}
                      className="w-full h-20 p-3 text-xs bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#5A20D4] focus:border-[#5A20D4] leading-relaxed transition-all duration-200 placeholder-slate-300"
                    />
                    
                    {complaintSuccess ? (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 p-2.5 rounded-xl">
                        <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Fikringiz muvaffaqiyatli jo'natildi. Rahmat!</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          if (complaintText.trim()) {
                            setComplaintSuccess(true);
                            setComplaintText("");
                          }
                        }}
                        className="w-full py-3 bg-gradient-to-r from-[#5A20D4] to-[#481AAA] text-white text-[11px] font-extrabold uppercase tracking-widest rounded-xl hover:brightness-105 active:scale-97 transition duration-200 cursor-pointer shadow-sm"
                      >
                        Jo'natish
                      </button>
                    )}
                  </div>
                </motion.div>

                {/* Saved favorites - Figma Image 9 */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="text-left space-y-3"
                >
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">Saqlangan mahsulotlarim</span>
                  <div className="space-y-2.5">
                    {favorites.length > 0 ? (
                      favorites.map(favId => {
                        const prod = INITIAL_PRODUCTS.find(p => p.id === favId);
                        if (!prod) return null;
                        return (
                          <div 
                            key={prod.id} 
                            className="flex items-center gap-3 bg-white p-2.5 border border-slate-100 rounded-2xl hover:border-slate-200 hover:shadow-sm transition"
                          >
                            <img src={prod.imageUrl} alt={prod.name} className="w-12 h-12 object-cover rounded-xl" referrerPolicy="no-referrer" />
                            <div className="flex-1 text-left min-w-0">
                              <span className="block text-xs font-bold text-slate-700 truncate">{prod.name}</span>
                              <span className="text-[10px] font-extrabold text-[#FD6C1D]">{prod.price.toLocaleString()} so'm</span>
                            </div>
                            <button 
                              onClick={() => addToCart(prod)}
                              className="bg-purple-50 text-[#5A20D4] hover:bg-[#5A20D4] hover:text-white px-3.5 py-1.5 text-[10px] font-bold rounded-xl active:scale-95 transition"
                            >
                              Sotib olish
                            </button>
                            <button 
                              onClick={() => toggleFavorite(prod.id)}
                              className="text-slate-300 hover:text-red-500 p-1.5 hover:bg-slate-50 rounded-full transition"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })
                    ) : (
                      <div className="bg-slate-50 border p-5 rounded-3xl text-center select-none space-y-1">
                        <Heart className="w-8 h-8 text-slate-300 mx-auto" />
                        <span className="block text-xs font-bold text-slate-600">Sevimlilar ro'yxati bo'sh</span>
                        <p className="text-[10px] text-slate-400 leading-normal">Bizning katalogimizga kiring va o'zingizga yoqqan notebookdagi yurakcha tugmasini bosing!</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM NAV BAR INTERFACE - Mirroring Home/Catalog bottom bars inside Figma images */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-150 flex justify-around items-center px-4 z-[90]">
          <motion.button 
            whileTap={{ scale: 0.88 }}
            onClick={() => {
              setActiveTab("home");
              setSelectedProduct(null);
            }}
            className={`relative flex flex-col items-center justify-center w-14 h-13 rounded-2xl transition-all duration-300 ${
              activeTab === "home" ? "text-[#FD6C1D] font-extrabold" : "text-slate-450 hover:text-slate-650"
            }`}
          >
            {activeTab === "home" && (
              <motion.div 
                layoutId="activeTabPill"
                className="absolute inset-0 bg-gradient-to-br from-orange-50/70 to-orange-100/40 rounded-2xl -z-10"
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              />
            )}
            <HomeIcon className="w-5 h-5" />
            <span className="text-[8px] font-bold mt-0.5">Asosiy</span>
          </motion.button>

          <motion.button 
            whileTap={{ scale: 0.88 }}
            onClick={() => {
              setActiveTab("catalog");
              setCategoryFilter(null);
              setBrandFilter(null);
              setSelectedProduct(null);
            }}
            className={`relative flex flex-col items-center justify-center w-14 h-13 rounded-2xl transition-all duration-300 ${
              activeTab === "catalog" ? "text-[#5A20D4] font-extrabold" : "text-slate-450 hover:text-slate-655"
            }`}
          >
            {activeTab === "catalog" && (
              <motion.div 
                layoutId="activeTabPill"
                className="absolute inset-0 bg-gradient-to-br from-purple-50/80 to-purple-100/40 rounded-2xl -z-10"
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              />
            )}
            <SlidersHorizontal className="w-4.5 h-4.5" />
            <span className="text-[8px] font-bold mt-0.5">Katalog</span>
          </motion.button>

          <motion.button 
            whileTap={{ scale: 0.88 }}
            onClick={() => {
              setActiveTab("ai");
              setSelectedProduct(null);
            }}
            className={`relative flex flex-col items-center justify-center w-14 h-13 rounded-2xl transition-all duration-300 ${
              activeTab === "ai" ? "text-[#FD6C1D] font-extrabold" : "text-slate-450 hover:text-slate-655"
            }`}
          >
            {activeTab === "ai" && (
              <motion.div 
                layoutId="activeTabPill"
                className="absolute inset-0 bg-gradient-to-br from-orange-50/70 to-orange-100/40 rounded-2xl -z-10"
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              />
            )}
            <Sparkles className="w-4.5 h-4.5 fill-current stroke-none animate-pulse" />
            <span className="text-[8px] font-bold mt-0.5">Aqlli Tanlov</span>
          </motion.button>

          {/* Cart triggers Drawer */}
          <motion.button 
            whileTap={{ scale: 0.88 }}
            onClick={() => setIsCartOpen(true)}
            className="relative flex flex-col items-center justify-center w-14 h-13 rounded-2xl text-slate-450 hover:text-slate-655"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="text-[8px] font-bold mt-0.5">Savat</span>
            {cart.length > 0 && (
              <motion.span 
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute top-1 right-2 bg-[#FD6C1D] text-white text-[8px] font-black px-1.5 py-0.5 rounded-full shadow"
              >
                {cart.reduce((s, it) => s + it.quantity, 0)}
              </motion.span>
            )}
          </motion.button>

          <motion.button 
            whileTap={{ scale: 0.88 }}
            onClick={() => {
              setActiveTab("profile");
              setSelectedProduct(null);
            }}
            className={`relative flex flex-col items-center justify-center w-14 h-13 rounded-2xl transition-all duration-300 ${
              activeTab === "profile" ? "text-[#5A20D4] font-extrabold" : "text-slate-450 hover:text-slate-655"
            }`}
          >
            {activeTab === "profile" && (
              <motion.div 
                layoutId="activeTabPill"
                className="absolute inset-0 bg-gradient-to-br from-purple-50/80 to-purple-100/40 rounded-2xl -z-10"
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              />
            )}
            <User className="w-5 h-5" />
            <span className="text-[8px] font-bold mt-0.5">Profil</span>
          </motion.button>
        </div>

        {/* 5. SEARCH BOX OVERLAY SCREEN - Mirroring Figma Images 10 & 11 */}
        <AnimatePresence>
          {showSearchOverlay && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white z-[110] flex flex-col p-4 space-y-4 animate-fadeIn"
            >
              {/* Search Header input bar */}
              <div className="flex items-center gap-2.5">
                <button 
                  onClick={() => {
                    setShowSearchOverlay(false);
                    setSearchQuery("");
                  }}
                  className="p-1 text-slate-500 hover:text-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex-1 flex items-center justify-between border border-slate-200 focus-within:border-[#5A20D4] rounded-2xl px-3 py-2 bg-slate-50 transition text-xs">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="o'zingizga mosini toping..."
                    className="flex-1 bg-transparent border-none outline-none text-slate-800 font-medium"
                    autoFocus
                  />
                  <Search className="w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* Autocomplete items vs History search clock */}
              <div className="flex-1 overflow-y-auto space-y-4 text-left">
                {!searchQuery ? (
                  <div className="space-y-3">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Mening qidiruvlarim</span>
                    
                    <div className="space-y-1 bg-slate-50 p-2 rounded-2xl border">
                      {searchHistory.map((hist, hIdx) => (
                        <button
                          key={hIdx}
                          onClick={() => setSearchQuery(hist)}
                          className="w-full flex items-center gap-2.5 py-2.5 px-3 border-b border-slate-100 last:border-0 hover:bg-slate-100 transition text-xs font-semibold text-slate-600 rounded-lg"
                        >
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{hist}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Tavsiya etiladigan natijalar</span>
                    
                    {searchResults.length > 0 ? (
                      <div className="space-y-2">
                        {searchResults.map(prod => (
                          <div 
                            key={prod.id}
                            onClick={() => {
                              setSelectedProduct(prod);
                              setShowSearchOverlay(false);
                            }}
                            className="flex items-center gap-3 p-2 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer transition select-none"
                          >
                            <img src={prod.imageUrl} alt={prod.name} className="w-10 h-10 object-cover rounded-lg" referrerPolicy="no-referrer" />
                            <div className="flex-1 min-w-0">
                              <span className="block text-xs font-bold text-slate-700 truncate">{prod.name}</span>
                              <span className="text-[10px] text-slate-400 select-none block font-mono">{prod.specs.brandAndModel}</span>
                            </div>
                            <span className="text-[11px] font-extrabold text-[#FD6C1D]" select-none="true">{prod.price.toLocaleString("uz-UZ")} UZS</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-xs text-slate-400">
                        Mezonlaringizga mos mahsulot mavjud emas. AI yordamchi bo'limida Gemini orqali qidiring!
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 6. PRODUCT DETAILED SCREEN MODAL - Figma Images 5, 6 & 8 */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="absolute inset-0 bg-white z-[100] flex flex-col justify-between"
            >
              {/* Transparent detail bar header */}
              <div className="flex justify-between items-center px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="p-1 px-2 text-xs font-bold bg-white text-slate-600 border rounded-xl hover:bg-slate-100 transition"
                >
                  Orqaga
                </button>
                <span className="text-xs font-bold text-slate-700">Mahsulot sahifasi</span>
                <button 
                  onClick={() => toggleFavorite(selectedProduct.id)}
                  className={`p-1.5 rounded-full border transition ${
                    favorites.includes(selectedProduct.id) ? "bg-red-50 border-red-200 text-red-500" : "bg-white border-slate-200 text-slate-400"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(selectedProduct.id) ? "fill-red-500" : ""}`} />
                </button>
              </div>

              {/* Scrollable specs sheet */}
              <div className="flex-1 overflow-y-auto p-4 space-y-5 text-left">
                {/* Big Image box */}
                <div className="relative w-full h-56 bg-slate-50/50 border rounded-2xl overflow-hidden flex items-center justify-center p-3 shadow-inner">
                  <img 
                    src={selectedProduct.imageUrl} 
                    alt={selectedProduct.name} 
                    className="max-w-full max-h-full object-contain" 
                    referrerPolicy="no-referrer" 
                  />
                </div>

                {/* Name & price Uzbek details */}
                <div className="space-y-1">
                  <h1 className="text-sm font-bold text-slate-800 leading-snug">
                    {selectedProduct.name}
                  </h1>
                  <div className="flex justify-between items-baseline pt-1">
                    <span className="text-lg font-extrabold text-[#FD6C1D]">
                      {selectedProduct.price.toLocaleString("uz-UZ")} so'm
                    </span>
                    {selectedProduct.oldPrice && (
                      <span className="text-xs line-through text-slate-400">
                        {selectedProduct.oldPrice.toLocaleString("uz-UZ")} so'm
                      </span>
                    )}
                  </div>
                </div>

                {/* Highlighted short description */}
                <div className="bg-slate-50 rounded-2xl p-3 border text-xs text-slate-600 leading-relaxed font-sans">
                  {selectedProduct.description}
                </div>

                {/* Spec sheets panel tabs - Figma Images 5 & 8 */}
                <div className="space-y-2.5">
                  <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Texnik xususiyatlar</h3>
                  
                  <div className="divide-y divide-slate-100 border border-slate-150 rounded-2xl bg-slate-50/50 p-2.5 space-y-0.5">
                    
                    {/* Asosiy identifikatsiya */}
                    <div className="py-2 px-1 text-xs">
                      <div className="flex justify-between font-medium">
                        <span className="text-slate-400 font-sans">Brend va Model:</span>
                        <span className="text-slate-700 font-sans font-bold text-right">{selectedProduct.specs.brandAndModel}</span>
                      </div>
                    </div>

                    {/* Protsessor CPU */}
                    <div className="py-2 px-1 text-xs">
                      <div className="flex justify-between font-medium">
                        <span className="text-slate-400 font-mono">Protsessor (CPU):</span>
                        <span className="text-slate-700 font-mono font-bold text-right pl-3">{selectedProduct.specs.cpu}</span>
                      </div>
                    </div>

                    {/* RAM */}
                    <div className="py-2 px-1 text-xs">
                      <div className="flex justify-between font-medium">
                        <span className="text-slate-400">Tezkor Xotira (RAM):</span>
                        <span className="text-slate-700 font-bold text-right">{selectedProduct.specs.ram}</span>
                      </div>
                    </div>

                    {/* SSD */}
                    <div className="py-2 px-1 text-xs">
                      <div className="flex justify-between font-medium">
                        <span className="text-slate-400">Doimiy Xotira (SSD):</span>
                        <span className="text-slate-700 font-mono font-bold text-right">{selectedProduct.specs.storage}</span>
                      </div>
                    </div>

                    {/* GPU */}
                    <div className="py-2 px-1 text-xs">
                      <div className="flex justify-between font-medium">
                        <span className="text-slate-400 text-left">Videokarta (GPU):</span>
                        <span className="text-slate-700 font-bold text-right pl-3">{selectedProduct.specs.gpu}</span>
                      </div>
                    </div>

                    {/* Display size & resolution */}
                    <div className="py-2 px-1 text-xs">
                      <div className="flex justify-between font-medium">
                        <span className="text-slate-400">Ekran o'lchami:</span>
                        <span className="text-slate-700 font-bold text-right">{selectedProduct.specs.screenSize}</span>
                      </div>
                    </div>

                    <div className="py-2 px-1 text-xs">
                      <div className="flex justify-between font-medium">
                        <span className="text-slate-400 text-left">Ekran turi va ruxsati:</span>
                        <span className="text-slate-700 font-bold text-right pl-3">{selectedProduct.specs.screenType}</span>
                      </div>
                    </div>

                    {/* Battery health */}
                    <div className="py-2 px-1 text-xs">
                      <div className="flex justify-between font-medium">
                        <span className="text-slate-400">Batareya holati (Sog'ligi):</span>
                        <span className="text-emerald-600 font-bold text-right">{selectedProduct.specs.batteryHealth}</span>
                      </div>
                    </div>

                    <div className="py-2 px-1 text-xs">
                      <div className="flex justify-between font-medium">
                        <span className="text-slate-400">Zaryadlash sikli (Cycle count):</span>
                        <span className="text-slate-700 font-mono font-bold text-right">{selectedProduct.specs.batteryCycleCount} marta</span>
                      </div>
                    </div>

                    {/* Exterior Condition */}
                    <div className="py-2 px-1 text-xs">
                      <div className="flex justify-between font-medium">
                        <span className="text-slate-400">Tashqi holati:</span>
                        <span className="text-slate-700 font-bold text-right">{selectedProduct.specs.exteriorCondition}</span>
                      </div>
                    </div>

                    {/* Box and accessories list */}
                    <div className="py-2.5 px-1 text-xs space-y-1">
                      <span className="font-bold text-slate-500 block">Komplekt va Qo'shimchalar:</span>
                      <p className="text-slate-600 italic bg-white p-2.5 rounded-xl border border-dashed text-[11px] leading-relaxed block">
                        {selectedProduct.specs.boxAndAccessories}
                      </p>
                    </div>

                  </div>

                  {/* To'liq xususiyatlar drawer toggle - Figma Image 6 */}
                  <div className="text-center">
                    <button 
                      onClick={() => setCustomSpecModal(selectedProduct)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-[#5A20D4] bg-purple-50 hover:bg-purple-100 transition inline-flex items-center gap-1 w-full justify-center border border-purple-100"
                    >
                      Barcha xususiyatlarni ko'rish
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating detail Buy button panel */}
              <div className="p-4 border-t border-slate-150 bg-white flex gap-3 h-20 items-center">
                <div className="text-left w-2/5">
                  <span className="block text-[10px] text-slate-400 font-bold">Narxi:</span>
                  <span className="text-sm font-extrabold text-[#FD6C1D]">{selectedProduct.price.toLocaleString("uz-UZ")} so'm</span>
                </div>
                <button 
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="flex-1 py-3 text-xs font-extrabold text-[#FFFFFF] bg-gradient-to-r from-[#FD6C1D] to-[#FD851D] hover:brightness-105 rounded-xl text-center cursor-pointer shadow active:scale-95 transition"
                >
                  Sotib olish
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 7. ALL SPECS CLOSEUP MODAL - Figma Image 8 */}
        <AnimatePresence>
          {customSpecModal && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 bg-white z-[130] flex flex-col p-4"
            >
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <span className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-4 h-4 text-[#FD6C1D]" /> Barcha texnik ko'rsatkichlar
                </span>
                <button 
                  onClick={() => setCustomSpecModal(null)}
                  className="p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 py-3 text-[11px] text-left">
                {/* Core specs table */}
                <div className="space-y-3">
                  <div className="space-y-1 border bg-slate-50 rounded-2xl p-3">
                    <span className="block font-bold text-[#5A20D4] text-[9px] tracking-wide uppercase">Asosiy Identifikatsiya</span>
                    <div className="flex justify-between py-1.5 border-b border-slate-100"><span className="text-slate-400">Brend:</span><span className="text-slate-700 font-bold">{customSpecModal.brand}</span></div>
                    <div className="flex justify-between py-1.5"><span className="text-slate-400">Munosib model:</span><span className="text-slate-700 font-bold">{customSpecModal.specs.brandAndModel}</span></div>
                  </div>

                  <div className="space-y-1 border bg-slate-50 rounded-2xl p-3">
                    <span className="block font-bold text-[#5A20D4] text-[9px] tracking-wide uppercase">Texnik parametrlar</span>
                    <div className="flex justify-between py-1.5 border-b border-slate-100"><span className="text-slate-400">Protsessor (CPU):</span><span className="text-slate-700 font-mono font-bold text-right">{customSpecModal.specs.cpu}</span></div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100"><span className="text-slate-400">RAM:</span><span className="text-slate-700 font-bold">{customSpecModal.specs.ram}</span></div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100"><span className="text-slate-400">SSD:</span><span className="text-slate-700 font-mono font-bold">{customSpecModal.specs.storage}</span></div>
                    <div className="flex justify-between py-1.5"><span className="text-slate-400">GPU Videokarta:</span><span className="text-slate-700 font-bold text-right">{customSpecModal.specs.gpu}</span></div>
                  </div>

                  <div className="space-y-1 border bg-slate-50 rounded-2xl p-3">
                    <span className="block font-bold text-[#5A20D4] text-[9px] tracking-wide uppercase">Ekran va Vizual</span>
                    <div className="flex justify-between py-1.5 border-b border-slate-100"><span className="text-slate-400">Displey o'lchami:</span><span className="text-slate-700 font-bold">{customSpecModal.specs.screenSize}</span></div>
                    <div className="flex justify-between py-1.5"><span className="text-slate-400">Ekran turi & Ruxsati:</span><span className="text-slate-700 font-bold text-right">{customSpecModal.specs.screenType}</span></div>
                  </div>

                  <div className="space-y-1 border bg-slate-50 rounded-2xl p-3">
                    <span className="block font-bold text-[#5A20D4] text-[9px] tracking-wide uppercase">Holati va Akkumulyator</span>
                    <div className="flex justify-between py-1.5 border-b border-slate-100"><span className="text-slate-400">Batareya quvvati:</span><span className="text-slate-700 font-bold">{customSpecModal.specs.batteryHealth}</span></div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100"><span className="text-slate-400">Cycle count (Sikl):</span><span className="text-slate-700 font-mono font-bold">{customSpecModal.specs.batteryCycleCount} marta</span></div>
                    <div className="flex justify-between py-1.5"><span className="text-slate-400">Holati:</span><span className="text-slate-700 font-medium">{customSpecModal.specs.exteriorCondition}</span></div>
                  </div>

                  <div className="space-y-1 border bg-slate-50 rounded-2xl p-3">
                    <span className="block font-bold text-[#5A20D4] text-[9px] tracking-wide uppercase">Komplekt va Qo'shimcha</span>
                    <p className="text-slate-600 py-1.5 leading-relaxed">{customSpecModal.specs.boxAndAccessories}</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t">
                <button 
                  onClick={() => setCustomSpecModal(null)}
                  className="w-full py-3 bg-[#5A20D4] hover:bg-[#481AAA] text-white rounded-xl text-xs font-bold transition"
                >
                  Yopish
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 8. SHOPPING CART SAVAT DRAWER & CHECKOUT FORMS */}
        <AnimatePresence>
          {isCartOpen && (
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="absolute inset-0 bg-white z-[105] flex flex-col justify-between"
            >
              {/* Drawer header */}
              <div className="flex justify-between items-center px-4 py-3 border-b border-slate-100 bg-slate-50">
                <span className="text-xs font-extrabold text-slate-800 uppercase tracking-widest flex items-center gap-1">
                  <ShoppingBag className="w-4 h-4 text-[#FD6C1D]" /> Savatchangiz ({cart.reduce((s, c) => s + c.quantity, 0)} dona)
                </span>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 hover:bg-slate-100 rounded-full transition"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              {/* Dynamic steps switcher */}
              <div className="flex-1 overflow-y-auto p-4 text-left">
                {checkoutStep === "cart" && (
                  <div className="space-y-4">
                    {cart.length > 0 ? (
                      <div className="space-y-3">
                        {cart.map(item => (
                          <div 
                            key={item.id}
                            className="flex items-center gap-3.5 bg-slate-50 border p-3 rounded-2xl flex-shrink-0"
                          >
                            <img src={item.product.imageUrl} alt={item.product.name} className="w-12 h-12 object-cover rounded-xl" referrerPolicy="no-referrer" />
                            <div className="flex-1 text-left min-w-0">
                              <span className="block text-xs font-bold text-slate-700 truncate">{item.product.name}</span>
                              <span className="block text-[10px] text-slate-400 font-semibold">{item.product.brand}</span>
                              <div className="flex flex-col mt-0.5">
                                <span className="text-xs font-extrabold text-[#FD6C1D]">
                                  {(item.product.price * item.quantity).toLocaleString("uz-UZ")} UZS
                                </span>
                                {item.quantity > 1 && (
                                  <span className="text-[9px] text-slate-400 font-medium leading-none mt-0.5">
                                    (1 dona: {item.product.price.toLocaleString("uz-UZ")} UZS)
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Incrementor counters */}
                            <div className="flex flex-col items-center gap-1.5 bg-white p-1 rounded-full border shadow-sm">
                              <button 
                                onClick={() => updateCartQuantity(item.id, 1)}
                                className="p-1 hover:text-[#5A20D4]"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                              <span className="text-xs font-extrabold font-mono text-slate-700">{item.quantity}</span>
                              <button 
                                onClick={() => updateCartQuantity(item.id, -1)}
                                className="p-1 hover:text-[#5A20D4]"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Remove */}
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-slate-350 hover:text-red-500 transition pl-1"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="py-8 text-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 space-y-3">
                          <ShoppingBag className="w-9 h-9 text-slate-300 mx-auto animate-bounce" />
                          <p className="text-xs text-slate-500 font-extrabold uppercase tracking-wide">Sizning savatchangiz bo'sh</p>
                          <p className="text-[10px] text-slate-400 max-w-[240px] mx-auto leading-relaxed">
                            Xarid qilishni boshlash uchun kataloga o'ting va o'zingizga yoqqan notebooklarni qo'shing.
                          </p>
                          <button 
                            onClick={() => {
                              setIsCartOpen(false);
                              setActiveTab("catalog");
                            }}
                            className="px-5 py-2.5 bg-gradient-to-r from-[#FD6C1D] to-[#FD851D] hover:brightness-105 text-white text-[11px] font-extrabold uppercase tracking-wider rounded-xl transition shadow active:scale-95 duration-200 block mx-auto cursor-pointer"
                          >
                            Xarid qilish
                          </button>
                        </div>

                        {/* Rich Information collage to fill the empty space - Figma enhancement */}
                        <div className="space-y-3 select-none">
                          <div className="bg-gradient-to-br from-[#5A20D4] to-[#481AAA] text-white p-4 rounded-2xl relative overflow-hidden shadow-sm">
                            <div className="relative z-10 w-2/3 text-left space-y-1">
                              <span className="text-[8px] font-black uppercase tracking-widest text-[#ADF762] bg-[#ADF762]/10 px-2 py-0.5 rounded">
                                INOUT KAFOLATI
                              </span>
                              <h4 className="text-xs font-black uppercase tracking-wide">100% Ishonchli do'kon</h4>
                              <p className="text-[9px] text-slate-200/90 leading-relaxed font-sans">
                                Barcha noutbuklar rasmiy xalqaro kafolatga ega va to'liq bojxona ko'rigidan o'tgan original mahsulotlardir.
                              </p>
                            </div>
                            <div className="absolute right-[-10px] bottom-[-10px] w-24 h-24 opacity-30">
                              <svg className="w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5h-2v3A8 8 0 0110 18H8.53" />
                              </svg>
                            </div>
                          </div>

                          <div className="text-left space-y-2.5 bg-slate-50 border p-4 rounded-2xl">
                            <h3 className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase">Nega aynan INOUT?</h3>
                            
                            <div className="flex gap-3 items-start">
                              <div className="p-2 rounded-xl bg-orange-100/50 text-[#FD6C1D] flex-shrink-0">
                                <Truck className="w-4 h-4" />
                              </div>
                              <div className="space-y-0.5">
                                <span className="block text-xs font-extrabold text-slate-700 leading-tight">Tezkor va Mutlaqo Bepul Eltish</span>
                                <span className="block text-[10px] text-slate-400 leading-normal">
                                  Toshkent, Farg'ona va O'zbekistonning barcha viloyatlariga 24 soat ichida eshigingizgacha bepul kuryer orqali eltib beramiz.
                                </span>
                              </div>
                            </div>

                            <div className="flex gap-3 items-start border-t border-slate-100 pt-2.5">
                              <div className="p-2 rounded-xl bg-purple-100/50 text-[#5A20D4] flex-shrink-0">
                                <ShieldCheck className="w-4 h-4" />
                              </div>
                              <div className="space-y-0.5">
                                <span className="block text-xs font-extrabold text-slate-700 leading-tight">1 Yillik Kafolat & Servis</span>
                                <span className="block text-[10px] text-slate-400 leading-normal">
                                  Mahsulotlarimizga kamida 12 oylik to'liq kafolat va professional servis markazimiz tomonidan doimiy texnik moddiy ko'mak beriladi.
                                </span>
                              </div>
                            </div>

                            <div className="flex gap-3 items-start border-t border-slate-100 pt-2.5">
                              <div className="p-2 rounded-xl bg-emerald-100/50 text-emerald-600 flex-shrink-0">
                                <CheckCircle className="w-4 h-4" />
                              </div>
                              <div className="space-y-0.5">
                                <span className="block text-xs font-extrabold text-slate-700 leading-tight font-display">Tekshirib, Ma'qul bo'lsa To'lash</span>
                                <span className="block text-[10px] text-slate-400 leading-normal">
                                  To'lovni kuryerdan mahsulotni qabul qilib olgan paytdagina, holatini 100% ko'zdan kechirib, so'ng naqd yoki karta orqali amalga oshirasiz.
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Secure checkout delivery form */}
                {checkoutStep === "form" && (
                  <form onSubmit={submitOrder} className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <UserCheck className="w-4 h-4 text-[#5A20D4]" /> Buyurtma rasmiylashtirish (Uzbekistan)
                    </h3>

                    {/* Customer details input fields */}
                    <div className="space-y-3 text-xs">
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-600 block">Ism va Familiyangiz:</label>
                        <input
                          type="text"
                          required
                          placeholder="Foydalanuvchi ismi..."
                          value={checkoutName}
                          onChange={(e) => setCheckoutName(e.target.value)}
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#5A20D4]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-semibold text-slate-600 block">Telefon raqamingiz:</label>
                        <input
                          type="tel"
                          required
                          placeholder="+998 XX XXX XX XX"
                          value={checkoutPhone}
                          onChange={(e) => setCheckoutPhone(e.target.value)}
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#5A20D4] font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-semibold text-slate-600 block">Yetkazib berish manzili:</label>
                        <textarea
                          required
                          placeholder="Shahar, ko'cha, uy / xonadon raqami..."
                          value={checkoutAddress}
                          onChange={(e) => setCheckoutAddress(e.target.value)}
                          className="w-full h-16 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#5A20D4]"
                        />
                      </div>
                    </div>

                    <div className="bg-slate-50 hover:bg-slate-100 p-3 rounded-2xl border border-slate-150 flex items-center gap-3">
                      <Truck className="w-4 h-4 text-[#FD6C1D]" />
                      <div className="text-[10px] text-slate-500 leading-tight text-left">
                        <span className="font-bold text-slate-700 block">Tezkor kuryer xizmati:</span>
                        Farg'ona va butun O'zbekiston bo'ylab 24 soat ichida uyingizgacha bepul yetkazib beriladi!
                      </div>
                    </div>
                  </form>
                )}

                {/* Confetti success screen */}
                {checkoutStep === "success" && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-4"
                  >
                    <CheckCircle className="w-12 h-12 text-[#ADF762] stroke-[#5A20D4] mx-auto animate-bounce" />
                    <div className="space-y-1">
                      <h3 className="text-sm font-extrabold text-slate-800">
                        Xaridingiz uchun tashakkur!
                      </h3>
                      <p className="text-[10px] text-slate-400">
                        Buyurtmangiz muvaffaqiyatli qabul qilindi. Tez orada operatorimiz siz bilan bog'lanadi.
                      </p>
                    </div>

                    <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 space-y-1">
                      <span className="text-[9px] uppercase font-bold tracking-wider text-emerald-800">Buyurtma statusi:</span>
                      <span className="block text-xs font-bold text-emerald-700">Tayyorlanmoqda (Kuryerga uzatildi)</span>
                    </div>

                    <button 
                      onClick={() => {
                        setIsCartOpen(false);
                        setCheckoutStep("cart");
                        setActiveTab("profile"); // view status
                      }}
                      className="px-4 py-2 bg-[#5A20D4] text-white rounded-xl text-xs font-bold hover:bg-[#481AAA] transition"
                    >
                      Buyurtmalarimga o'tish
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Bottom total calculate list & Submit */}
              {cart.length > 0 && checkoutStep !== "success" && (
                <div className="p-4 border-t border-slate-150 bg-white space-y-3 bg-slate-50/50">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium text-slate-500">Yetkazib berish (Dostavka):</span>
                    <span className="font-extrabold text-emerald-600">Bepul (0 UZS)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-extrabold text-slate-700">Umumiy Summa:</span>
                    <span className="text-sm font-extrabold text-[#FD6C1D]">
                      {cartTotal.toLocaleString("uz-UZ")} UZS
                    </span>
                  </div>

                  {checkoutStep === "cart" ? (
                    <button 
                      onClick={() => setCheckoutStep("form")}
                      className="w-full py-3 bg-[#5A20D4] hover:bg-[#481AAA] text-white rounded-xl text-xs font-bold shadow transition cursor-pointer"
                    >
                      Xaridni rasmiylashtirish (Sotib Olish)
                    </button>
                  ) : (
                    <button 
                      onClick={submitOrder}
                      className="w-full py-3 bg-[#FD6C1D] hover:bg-[#FD851D] text-white rounded-xl text-xs font-bold shadow transition cursor-pointer animate-float"
                    >
                      Buyurtma berish
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        {/* PWA CUSTOM INTERACTIVE GUIDE MODAL */}
        <AnimatePresence>
          {showPwaGuide && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
              {/* Glass backdrop overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowPwaGuide(false)}
                className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
              />

              {/* Guide Contents */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                className="bg-white rounded-3xl w-full max-w-sm overflow-hidden border border-slate-100 shadow-2xl relative z-10 text-left"
              >
                {/* Header graphic background */}
                <div className="bg-gradient-to-r from-[#5A20D4] to-[#7B3FE4] p-5 text-white relative">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl translate-x-4 -translate-y-4" />
                  <button
                    onClick={() => setShowPwaGuide(false)}
                    className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-1.5 rounded-full transition cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <span className="text-[9px] font-black uppercase tracking-widest bg-[#ADF762] text-slate-900 px-2.5 py-0.5 rounded-full inline-block mb-1 shadow-sm">
                    Qo'llanma
                  </span>
                  <h3 className="text-sm font-black uppercase tracking-wide">
                    iNout Ilovasini O'rnatish
                  </h3>
                  <p className="text-[10px] text-purple-100 leading-normal mt-1">
                    Ilovani smartfoningiz yoki kompyuteringiz displeyiga bepul o'rnating va internet aloqasisiz ham ishlash qulayligidan foydalaning.
                  </p>
                </div>

                {/* If open inside AI Studio developer iframe, show a tab launcher */}
                {typeof window !== "undefined" && window.self !== window.top && (
                  <div className="p-4 bg-amber-50 border-b border-amber-100 flex flex-col gap-2">
                    <div className="text-[10.5px] text-amber-900 font-bold leading-relaxed text-left flex items-start gap-1.5">
                      <span className="text-sm">⚠️</span>
                      <span>
                        <b>AI Studio Cheklovi:</b> Siz hozir dasturchi rejimi (iframe) ichidasiz. Ushbu rejimda brauzer mutlaqo o'rnatishni taqiqlaydi.
                      </span>
                    </div>
                    <button
                      onClick={() => window.open(window.location.href, "_blank")}
                      className="w-full bg-[#5A20D4] hover:bg-[#42179E] text-white text-[10px] font-black uppercase tracking-wider py-3 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                    >
                      <Share className="w-3.5 h-3.5" />
                      Yangi Tabda Ochish (O'rnatish uchun)
                    </button>
                  </div>
                )}

                {/* Device Selector Tabs */}
                <div className="flex border-b border-slate-100 bg-slate-50 p-2 gap-1.5 select-none font-sans font-bold text-[10px] uppercase tracking-wide">
                  <button
                    onClick={() => setActiveGuideTab("ios")}
                    className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      activeGuideTab === "ios"
                        ? "bg-white text-[#5A20D4] shadow-sm border border-slate-150"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5 text-slate-500" />
                    iOS (iPhone)
                  </button>
                  <button
                    onClick={() => setActiveGuideTab("android")}
                    className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      activeGuideTab === "android"
                        ? "bg-white text-[#5A20D4] shadow-sm border border-slate-150"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
                    Android
                  </button>
                  <button
                    onClick={() => setActiveGuideTab("pc")}
                    className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      activeGuideTab === "pc"
                        ? "bg-white text-[#5A20D4] shadow-sm border border-slate-150"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Laptop className="w-3.5 h-3.5 text-indigo-500" />
                    PC
                  </button>
                </div>

                {/* Warning about mock interaction to prevent confusion */}
                <div className="px-5 pt-3 text-[9.5px] text-slate-500 leading-normal bg-slate-50/50 pb-1 italic font-medium">
                  💡 Quyidagi ko'rinishlar faqat <b>rasm-ko'rsatgich</b> xolos. Ularni bosganda o'rnatish bajarilmaydi, o'rnatishni o'z brauzeringiz menyusidan amalga oshirasiz.
                </div>

                {/* Steps Content Area with custom visualizations */}
                <div className="p-5 space-y-4 max-h-[280px] overflow-y-auto no-scrollbar">
                  {activeGuideTab === "ios" && (
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <span className="w-5 h-5 rounded-full bg-purple-50 text-[#5A20D4] border border-purple-100 text-[10px] font-black flex items-center justify-center shrink-0">1</span>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          <b>Safari</b> brauzerida ushbu sahifani ochganingizga ishonch hosil qiling.
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <span className="w-5 h-5 rounded-full bg-purple-50 text-[#5A20D4] border border-purple-100 text-[10px] font-black flex items-center justify-center shrink-0">2</span>
                        <div className="text-[11px] text-slate-600 leading-relaxed flex-1 space-y-1">
                          <span>Pastki paneldagi <b>"Ulashish (Share)"</b> tugmasini bosing:</span>
                          <div 
                            onClick={handleGuideItemClick}
                            className="mt-1 p-2 border border-slate-200 bg-slate-50 hover:bg-slate-100 rounded-xl inline-flex items-center gap-1.5 font-bold text-[10px] text-[#5A20D4] cursor-pointer"
                          >
                            <Share className="w-4 h-4 text-[#5A20D4]" />
                            Ulashish (Share)
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="w-5 h-5 rounded-full bg-purple-50 text-[#5A20D4] border border-purple-100 text-[10px] font-black flex items-center justify-center shrink-0">3</span>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          Menyuni pastga surib, <b>"Asosiy ekranga qo'shish"</b> (<i>Add to Home Screen</i>) bandini tanlang.
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <span className="w-5 h-5 rounded-full bg-purple-50 text-[#5A20D4] border border-purple-100 text-[10px] font-black flex items-center justify-center shrink-0">4</span>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          O'ng yuqoridagi <b>"Qo'shish (Add)"</b> tugmasini bosing va ilovadan foydalaning!
                        </p>
                      </div>
                    </div>
                  )}

                  {activeGuideTab === "android" && (
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-black flex items-center justify-center shrink-0">1</span>
                        <div className="text-[11px] text-slate-600 leading-relaxed flex-1 space-y-1">
                          <span>Brauzer yuqorisida yoki pastida chiqadigan <b>"iNout-ni ekranga qo'shish"</b> taklifini bosing:</span>
                          <div className="flex justify-end mt-1">
                            <button
                              onClick={handleGuideItemClick}
                              className="text-[9px] font-black text-white bg-[#FD6C1D] hover:bg-[#FD851D] px-2.5 py-1.5 rounded-xl uppercase tracking-wider cursor-pointer"
                            >
                              Ilovani o'rnatish
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-black flex items-center justify-center shrink-0">2</span>
                        <div className="text-[11px] text-slate-600 leading-relaxed flex-1 space-y-1">
                          <span>Agar taklif chiqmagan bo'lsa, brauzerning o'ng chetidagi <b>uchta nuqta</b> (<MoreVertical className="inline-block w-3.5 h-3.5 text-slate-500" />) tugmasini bosing.</span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-black flex items-center justify-center shrink-0">3</span>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          Menyudan <b>"Ilovani o'rnatish"</b> (<i>Install app</i>) yoki <b>"Asosiy ekranga qo'shish"</b> bandini tanlang.
                        </p>
                      </div>
                    </div>
                  )}

                  {activeGuideTab === "pc" && (
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 text-[10px] font-black flex items-center justify-center shrink-0">1</span>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          <b>Google Chrome</b> yoki <b>Microsoft Edge</b> manzil qatorining eng o'ng qismiga qarang.
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 text-[10px] font-black flex items-center justify-center shrink-0">2</span>
                        <div className="text-[11px] text-slate-600 leading-relaxed flex-1 space-y-1">
                          <span>Manzil yonidagi monitor/pastga yo'nalgan strelka <b>o'rnatish belgisini</b> bosing:</span>
                          <div 
                            onClick={handleGuideItemClick}
                            className="mt-1.5 p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl inline-flex items-center gap-1 text-[10px] font-extrabold text-[#5A20D4] cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5 text-[#5A20D4]" />
                            O'rnatish / Install
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 text-[10px] font-black flex items-center justify-center shrink-0">3</span>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          <b>"O'rnatish (Install)"</b> buyrug'ini bosing. Ilova darchasi darhol monitorda mustaqil dastur kabi ochiladi!
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer close CTA */}
                <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
                  <button
                    onClick={() => setShowPwaGuide(false)}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-950 text-white rounded-xl text-[10px] font-black uppercase tracking-wider cursor-pointer transition active:scale-95 shadow-sm"
                  >
                    Tushunarli
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
