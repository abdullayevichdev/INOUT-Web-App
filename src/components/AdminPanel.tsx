import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, Plus, Edit3, Trash2, Search, Laptop, Monitor, MousePointer, 
  Save, Database, Layers, Check, Sparkles, FileText, Cpu, Eye, AlertCircle 
} from "lucide-react";
import { Product, Specification } from "../types";

interface AdminPanelProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onClose: () => void;
}

export default function AdminPanel({ 
  products, 
  onAddProduct, 
  onUpdateProduct, 
  onDeleteProduct, 
  onClose 
}: AdminPanelProps) {
  const [activeSubTab, setActiveSubTab] = useState<"list" | "add">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Form State for Adding / Editing
  const [name, setName] = useState("");
  const [brand, setBrand] = useState<Product["brand"]>("Lenovo");
  const [category, setCategory] = useState<Product["category"]>("Noutbuklar");
  const [price, setPrice] = useState<number>(0);
  const [oldPrice, setOldPrice] = useState<number | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState<number>(4.8);

  // Specifications state
  const [brandAndModel, setBrandAndModel] = useState("");
  const [cpu, setCpu] = useState("");
  const [ram, setRam] = useState("");
  const [storage, setStorage] = useState("");
  const [gpu, setGpu] = useState("");
  const [screenSize, setScreenSize] = useState("");
  const [screenType, setScreenType] = useState("");
  const [batteryHealth, setBatteryHealth] = useState("100%");
  const [exteriorCondition, setExteriorCondition] = useState("Yangi");
  const [batteryCycleCount, setBatteryCycleCount] = useState<number>(0);
  const [boxAndAccessories, setBoxAndAccessories] = useState("To'liq jamlanma");

  const [formSuccessMessage, setFormSuccessMessage] = useState<string | null>(null);

  // Filtered products list for administrative fast management
  const filteredList = useMemo(() => {
    if (!searchQuery) return products;
    const query = searchQuery.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.brand.toLowerCase().includes(query) || 
      p.category.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  const initAddForm = () => {
    setName("");
    setBrand("Lenovo");
    setCategory("Noutbuklar");
    setPrice(12000000);
    setOldPrice(undefined);
    setImageUrl("https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80");
    setDescription("Yuqori sifatli va unumdor qurilma, har bir amal uchun ideal hamkor.");
    setRating(4.8);

    setBrandAndModel("Lenovo Laptop New");
    setCpu("Intel Core i7-1355U");
    setRam("16 GB DDR5");
    setStorage("512 GB SSD");
    setGpu("Intel Iris Xe Graphics");
    setScreenSize("15.6 dyum");
    setScreenType("FHD IPS (1920x1080), 300 nits");
    setBatteryHealth("100%");
    setExteriorCondition("Yangi (Kafolatli)");
    setBatteryCycleCount(0);
    setBoxAndAccessories("To'liq qutida, original adapteri bilan");
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setBrand(product.brand);
    setCategory(product.category);
    setPrice(product.price);
    setOldPrice(product.oldPrice);
    setImageUrl(product.imageUrl);
    setDescription(product.description || "");
    setRating(product.rating || 4.8);

    setBrandAndModel(product.specs.brandAndModel || "");
    setCpu(product.specs.cpu || "");
    setRam(product.specs.ram || "");
    setStorage(product.specs.storage || "");
    setGpu(product.specs.gpu || "");
    setScreenSize(product.specs.screenSize || "");
    setScreenType(product.specs.screenType || "");
    setBatteryHealth(product.specs.batteryHealth || "100%");
    setExteriorCondition(product.specs.exteriorCondition || "Yangi");
    setBatteryCycleCount(product.specs.batteryCycleCount || 0);
    setBoxAndAccessories(product.specs.boxAndAccessories || "To'liq jamlanma");
    
    setActiveSubTab("add"); // redirect to form tab for editing
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !price || !imageUrl) {
      alert("Iltimos, asosiy maydonlarni to'ldiring!");
      return;
    }

    const compiledSpecs: Specification = {
      brandAndModel,
      cpu,
      ram,
      storage,
      gpu,
      screenSize,
      screenType,
      batteryHealth,
      exteriorCondition,
      batteryCycleCount: Number(batteryCycleCount),
      boxAndAccessories
    };

    if (editingProduct) {
      // Edit mode
      const updated: Product = {
        ...editingProduct,
        name,
        brand,
        category,
        price: Number(price),
        oldPrice: oldPrice ? Number(oldPrice) : undefined,
        imageUrl,
        description,
        rating: Number(rating),
        specs: compiledSpecs
      };
      onUpdateProduct(updated);
      setFormSuccessMessage("Mahsulot muvaffaqiyatli tahrirlandi!");
      setTimeout(() => {
        setFormSuccessMessage(null);
        setEditingProduct(null);
        setActiveSubTab("list");
      }, 1500);
    } else {
      // Create mode
      const newId = String(Date.now());
      const newProduct: Product = {
        id: newId,
        name,
        brand,
        category,
        price: Number(price),
        oldPrice: oldPrice ? Number(oldPrice) : undefined,
        imageUrl,
        description,
        rating: Number(rating),
        specs: compiledSpecs
      };
      onAddProduct(newProduct);
      setFormSuccessMessage("Yangi mahsulot katalogga qo'shildi!");
      setTimeout(() => {
        setFormSuccessMessage(null);
        initAddForm();
        setActiveSubTab("list");
      }, 1500);
    }
  };

  const cancelForm = () => {
    setEditingProduct(null);
    setActiveSubTab("list");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        className="w-full h-full sm:h-auto sm:max-h-[92vh] sm:max-w-4xl bg-slate-900 sm:rounded-3xl border border-slate-800 shadow-2xl flex flex-col overflow-hidden text-slate-100 font-sans"
      >
        {/* Admin Panel Header */}
        <div className="bg-gradient-to-r from-slate-955 via-indigo-950 to-slate-950 p-4 border-b border-slate-810 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-gradient-to-br from-[#FD6C1D] to-amber-500 rounded-2xl shadow-md">
              <Database className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-black uppercase tracking-wider text-white">
                  iNout Boshqaruv Markazi
                </h2>
                <span className="text-[8.5px] font-black uppercase tracking-widest bg-[#ADF762] text-slate-950 px-2 py-0.5 rounded-full inline-block">
                  Admin Panel
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Barcha kategoriyalarda mahsulotlarni qo'shish va to'liq boshqarish</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl transition text-slate-400 hover:text-white cursor-pointer active:scale-90"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dashboard Stat Quick Ribbon */}
        <div className="bg-slate-950/40 px-5 py-3 border-b border-slate-800/80 grid grid-cols-3 gap-2 text-left select-none">
          <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800/40">
            <span className="text-[8.5px] uppercase font-bold text-slate-500 block tracking-wider">Katalog jami</span>
            <span className="text-xs font-black text-white flex items-center gap-1 mt-0.5">
              <Layers className="w-3.5 h-3.5 text-[#5A20D4]" />
              {products.length} ta mahsulot
            </span>
          </div>
          <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800/40">
            <span className="text-[8.5px] uppercase font-bold text-slate-500 block tracking-wider">Noutbuklar</span>
            <span className="text-xs font-black text-[#ADF762] flex items-center gap-1 mt-0.5">
              <Laptop className="w-3.5 h-3.5 text-indigo-400" />
              {products.filter(p => p.category === "Noutbuklar").length} ta noutbuk
            </span>
          </div>
          <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800/40">
            <span className="text-[8.5px] uppercase font-bold text-slate-500 block tracking-wider">Kompyuter &amp; Aksessuarlar</span>
            <span className="text-xs font-black text-amber-400 flex items-center gap-1 mt-0.5">
              <Monitor className="w-3.5 h-3.5" />
              {products.filter(p => p.category !== "Noutbuklar").length} ta model
            </span>
          </div>
        </div>

        {/* Navigation Selector Sub Tabs */}
        <div className="bg-slate-900 p-2.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-slate-800">
          <div className="flex bg-slate-950 p-1 rounded-xl self-start">
            <button
              onClick={() => {
                setActiveSubTab("list");
                setEditingProduct(null);
              }}
              className={`px-4 py-2 rounded-lg text-[10.5px] font-extrabold uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 ${
                activeSubTab === "list"
                  ? "bg-[#5A20D4] text-white shadow-md shadow-indigo-950/50"
                  : "text-slate-450 hover:text-white"
              }`}
            >
              📋 Mahsulotlar Ro'yxati
            </button>
            <button
              onClick={() => {
                initAddForm();
                setEditingProduct(null);
                setActiveSubTab("add");
              }}
              className={`px-4 py-2 rounded-lg text-[10.5px] font-extrabold uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 ${
                activeSubTab === "add" && !editingProduct
                  ? "bg-[#5A20D4] text-white shadow-md shadow-indigo-950/50"
                  : "text-slate-450 hover:text-white"
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              Yangi Mahsulot Qo'shish
            </button>
          </div>

          {activeSubTab === "list" && (
            <div className="relative flex-1 max-w-sm">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Mahsulot nomi yoki brendini qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 text-slate-100 text-[11px] font-medium py-2 pl-9 pr-4 rounded-xl border border-slate-850 focus:outline-none focus:ring-1 focus:ring-purple-500 placeholder-slate-600 transition"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-white text-[10px]"
                >
                  Tozalash
                </button>
              )}
            </div>
          )}
        </div>

        {/* Content Box */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-5 bg-slate-900/60 flex flex-col">
          {formSuccessMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 p-3.5 rounded-2xl flex items-center gap-2 text-xs font-black select-none text-left"
            >
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{formSuccessMessage}</span>
            </motion.div>
          )}

          {activeSubTab === "list" ? (
            <div className="flex-1 flex flex-col">
              {filteredList.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-slate-500 space-y-3 bg-slate-950/25 rounded-3xl border border-dashed border-slate-800">
                  <AlertCircle className="w-10 h-10 text-slate-600" />
                  <div className="text-center">
                    <p className="text-xs font-black text-slate-400">Hech qanday mahsulot topilmadi</p>
                    <p className="text-[10px] text-slate-500 mt-1">Boshqa so'rov yozib qidiring yoki yangi mahsulot qo'shing.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {filteredList.map((prod) => (
                    <motion.div 
                      key={prod.id} 
                      layoutId={`admin-product-${prod.id}`}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950/40 p-3 rounded-2xl border border-slate-850/80 hover:border-slate-800 hover:bg-slate-950/85 transition text-left"
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={prod.imageUrl} 
                          alt={prod.name} 
                          className="w-12 h-12 object-cover rounded-xl border border-slate-800 bg-slate-900 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[8.5px] font-black uppercase px-2 py-0.5 bg-slate-800 text-slate-300 rounded">
                              {prod.brand}
                            </span>
                            <span className="text-[8.5px] font-black uppercase px-2 py-0.5 bg-indigo-950/70 text-indigo-300 rounded">
                              {prod.category}
                            </span>
                            <span className="text-[8.5px] font-semibold text-slate-500">
                              ID: {prod.id}
                            </span>
                          </div>
                          <h4 className="text-xs font-extrabold text-white line-clamp-1">
                            {prod.name}
                          </h4>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-black text-[#ADF762]">
                              {prod.price.toLocaleString("uz-UZ")} UZS
                            </span>
                            {prod.oldPrice && (
                              <span className="text-[9px] text-slate-500 line-through">
                                {prod.oldPrice.toLocaleString("uz-UZ")} UZS
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Admin actions block */}
                      <div className="flex items-center gap-1.5 self-end sm:self-center">
                        <button
                          onClick={() => {
                            // View details trigger spec
                            alert(`Texnik Xususiyatlar:\n\nCPU: ${prod.specs.cpu}\nRAM: ${prod.specs.ram}\nXotira: ${prod.specs.storage}\nGPU: ${prod.specs.gpu}\nHolati: ${prod.specs.exteriorCondition}`);
                          }}
                          className="p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl transition cursor-pointer"
                          title="Tafsilotlar"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => startEdit(prod)}
                          className="px-3 py-2 bg-indigo-950 hover:bg-indigo-900 border border-indigo-800 text-indigo-300 rounded-xl text-[10.5px] font-black uppercase tracking-wider transition cursor-pointer flex items-center gap-1 active:scale-95"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
                          Tahrirlash
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Rostdan ham "${prod.name}" mahsulotini katalogdan butunlay o'chirib tashlamoqchimisiz?`)) {
                              onDeleteProduct(prod.id);
                              setFormSuccessMessage("Mahsulot muvaffaqiyatli o'chirildi!");
                              setTimeout(() => setFormSuccessMessage(null), 1500);
                            }
                          }}
                          className="p-2.5 bg-red-950 hover:bg-red-900 border border-red-900/60 text-red-300 rounded-xl transition cursor-pointer active:scale-90"
                          title="Butunlay o'chirish"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-red-400" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            // Form Add/Edit layout
            <form onSubmit={handleSave} className="space-y-5 text-left max-w-2xl mx-auto">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#ADF762]" />
                  <h3 className="text-xs font-black uppercase tracking-wide text-zinc-100">
                    {editingProduct ? "Mahsulotni Tahrirlash" : "Yangi Mahsulot Qo'shish"}
                  </h3>
                </div>
                {editingProduct && (
                  <button 
                    type="button" 
                    onClick={cancelForm}
                    className="text-[10px] uppercase font-bold text-slate-400 hover:text-white"
                  >
                    Bekor qilish
                  </button>
                )}
              </div>

              {/* Basic Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label className="text-[9.5px] font-black uppercase text-slate-400 tracking-wider">Mahsulot Nomi *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masalan: MacBook Pro 14 M3 Pro Space Black"
                    className="w-full bg-slate-950 border border-slate-850 px-3.5 py-2.5 rounded-xl text-xs font-bold text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[9.5px] font-black uppercase text-slate-400 tracking-wider">Rasm Linki (URL) *</label>
                  <input
                    type="text"
                    required
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Sifatli rasm havolasini joylang..."
                    className="w-full bg-slate-950 border border-slate-850 px-3.5 py-2.5 rounded-xl text-[10.5px] font-semibold text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                </div>

                {/* Brand & Category Select fields */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[9.5px] font-black uppercase text-slate-400 tracking-wider">Brend *</label>
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value as Product["brand"])}
                    className="w-full bg-slate-950 border border-slate-850 px-3 py-2 text-xs font-bold text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500"
                  >
                    <option value="Macbook">Macbook</option>
                    <option value="Windows">Windows (Oddiy)</option>
                    <option value="Asus">Asus</option>
                    <option value="Lenovo">Lenovo</option>
                    <option value="HP">HP</option>
                    <option value="Dell">Dell</option>
                    <option value="MSI">MSI</option>
                  </select>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[9.5px] font-black uppercase text-slate-400 tracking-wider">Kategoriya *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Product["category"])}
                    className="w-full bg-slate-950 border border-slate-850 px-3 py-2 text-xs font-bold text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500"
                  >
                    <option value="Noutbuklar">Noutbuklar</option>
                    <option value="Kompyuterlar">Kompyuterlar</option>
                    <option value="Aksessuarlar">Aksessuarlar</option>
                  </select>
                </div>

                {/* Price and Old Price */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[9.5px] font-black uppercase text-slate-400 tracking-wider">Narxi (UZS) *</label>
                  <input
                    type="number"
                    required
                    value={price || ""}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder="Masalan: 13500000"
                    className="w-full bg-slate-950 border border-slate-850 px-3.5 py-2.5 rounded-xl text-xs font-black text-[#ADF762] focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[9.5px] font-black uppercase text-slate-400 tracking-wider">Eski Narxi (UZS, Ixtiyoriy)</label>
                  <input
                    type="number"
                    value={oldPrice || ""}
                    onChange={(e) => setOldPrice(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="Masalan: 14200000"
                    className="w-full bg-slate-950 border border-slate-850 px-3.5 py-2.5 rounded-xl text-xs text-slate-350 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5 text-left">
                <label className="text-[9.5px] font-black uppercase text-slate-400 tracking-wider">Mahsulot Tavsifi</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Noutbuk yoki aksessuarning holati, kafolati va afzalliklari..."
                  rows={2}
                  className="w-full bg-slate-950 border border-slate-850 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-200 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              {/* SPECIFICATIONS SUB-BLOCK (COLLAPSED OR EXPLAINED STYLISHLY) */}
              <div className="border border-slate-850 bg-slate-950/20 rounded-2xl p-4 space-y-3.5">
                <div className="flex items-center gap-1.5 text-[#5A20D4] font-black text-[10px] uppercase tracking-wider pb-1.5 border-b border-slate-850">
                  <Cpu className="w-3.5 h-3.5" />
                  <h4>Texnik Xususiyatlar (Tezkor Ta'rif)</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                  <div className="space-y-1 text-left">
                    <label className="text-[8px] uppercase tracking-wider text-slate-500 font-bold block">Brend va Model (Specs)</label>
                    <input
                      type="text"
                      value={brandAndModel}
                      onChange={(e) => setBrandAndModel(e.target.value)}
                      placeholder="MacBook Air 13\"
                      className="w-full bg-slate-950 border border-slate-850 px-2.5 py-1.5 rounded-lg text-[10px] text-white"
                    />
                  </div>
                  <div className="space-y-1 text-left">
                    <label className="text-[8px] uppercase tracking-wider text-slate-500 font-bold block">Protsessor (CPU)</label>
                    <input
                      type="text"
                      value={cpu}
                      onChange={(e) => setCpu(e.target.value)}
                      placeholder="Apple M3 (8 yadro)"
                      className="w-full bg-slate-950 border border-slate-850 px-2.5 py-1.5 rounded-lg text-[10px] text-white"
                    />
                  </div>
                  <div className="space-y-1 text-left">
                    <label className="text-[8px] uppercase tracking-wider text-slate-500 font-bold block">RAM (Tezkor Xotira)</label>
                    <input
                      type="text"
                      value={ram}
                      onChange={(e) => setRam(e.target.value)}
                      placeholder="16 GB DDR5"
                      className="w-full bg-slate-950 border border-slate-850 px-2.5 py-1.5 rounded-lg text-[10px] text-white"
                    />
                  </div>
                  <div className="space-y-1 text-left">
                    <label className="text-[8px] uppercase tracking-wider text-slate-500 font-bold block">Doimiy Xotira (SSD/Storage)</label>
                    <input
                      type="text"
                      value={storage}
                      onChange={(e) => setStorage(e.target.value)}
                      placeholder="512 GB SSD PCIe"
                      className="w-full bg-slate-950 border border-slate-850 px-2.5 py-1.5 rounded-lg text-[10px] text-white"
                    />
                  </div>
                  <div className="space-y-1 text-left">
                    <label className="text-[8px] uppercase tracking-wider text-slate-500 font-bold block">Videokarta (GPU)</label>
                    <input
                      type="text"
                      value={gpu}
                      onChange={(e) => setGpu(e.target.value)}
                      placeholder="AMD Radeon / Integrated"
                      className="w-full bg-slate-950 border border-slate-850 px-2.5 py-1.5 rounded-lg text-[10px] text-white"
                    />
                  </div>
                  <div className="space-y-1 text-left">
                    <label className="text-[8px] uppercase tracking-wider text-slate-500 font-bold block">Ekran ozo'lchami</label>
                    <input
                      type="text"
                      value={screenSize}
                      onChange={(e) => setScreenSize(e.target.value)}
                      placeholder="13.6 dyum"
                      className="w-full bg-slate-950 border border-slate-850 px-2.5 py-1.5 rounded-lg text-[10px] text-white"
                    />
                  </div>
                  <div className="space-y-1 text-left">
                    <label className="text-[8px] uppercase tracking-wider text-slate-500 font-bold block">Ekran Turi va Tezligi</label>
                    <input
                      type="text"
                      value={screenType}
                      onChange={(e) => setScreenType(e.target.value)}
                      placeholder="OLED / 120Hz"
                      className="w-full bg-slate-950 border border-slate-850 px-2.5 py-1.5 rounded-lg text-[10px] text-white"
                    />
                  </div>
                  <div className="space-y-1 text-left">
                    <label className="text-[8px] uppercase tracking-wider text-slate-500 font-bold block">Batareya Holati (%)</label>
                    <input
                      type="text"
                      value={batteryHealth}
                      onChange={(e) => setBatteryHealth(e.target.value)}
                      placeholder="100% / N/A"
                      className="w-full bg-slate-950 border border-slate-850 px-2.5 py-1.5 rounded-lg text-[10px] text-white"
                    />
                  </div>
                  <div className="space-y-1 text-left">
                    <label className="text-[8px] uppercase tracking-wider text-slate-500 font-bold block">Batareya Sikli (Cycles)</label>
                    <input
                      type="number"
                      value={batteryCycleCount}
                      onChange={(e) => setBatteryCycleCount(Number(e.target.value))}
                      placeholder="5"
                      className="w-full bg-slate-950 border border-slate-850 px-2.5 py-1.5 rounded-lg text-[10px] text-white"
                    />
                  </div>
                  <div className="space-y-1 text-left">
                    <label className="text-[8px] uppercase tracking-wider text-slate-500 font-bold block">Tashqi holati</label>
                    <input
                      type="text"
                      value={exteriorCondition}
                      onChange={(e) => setExteriorCondition(e.target.value)}
                      placeholder="Yangi / Ideal"
                      className="w-full bg-slate-950 border border-slate-850 px-2.5 py-1.5 rounded-lg text-[10px] text-white"
                    />
                  </div>
                  <div className="space-y-1 text-left sm:col-span-2">
                    <label className="text-[8px] uppercase tracking-wider text-slate-500 font-bold block">Komplekti va Jihozlari</label>
                    <input
                      type="text"
                      value={boxAndAccessories}
                      onChange={(e) => setBoxAndAccessories(e.target.value)}
                      placeholder="Karobka, original 65W zaryadlagich"
                      className="w-full bg-slate-950 border border-slate-850 px-2.5 py-1.5 rounded-lg text-[10px] text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Action row */}
              <div className="flex justify-end gap-3.5 pt-3">
                <button
                  type="button"
                  onClick={cancelForm}
                  className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10.5px] font-black uppercase tracking-wider transition cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#FD6C1D] to-[#FD851D] hover:from-[#FD851D] hover:to-[#FD6C1D] text-white text-[10.5px] font-black uppercase tracking-wider transition cursor-pointer shadow-md shadow-orange-955/20 flex items-center gap-1.5 active:scale-95"
                >
                  <Save className="w-4 h-4" />
                  {editingProduct ? "O'zgarishlarni Saqlash" : "Katalogga Qo'shish"}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
