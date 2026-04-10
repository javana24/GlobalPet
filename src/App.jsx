import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, MapPin, Smartphone, Activity, Heart, ArrowRight, ChevronDown, Star, Moon, Sun, CheckCircle, AlertCircle, ScanLine } from 'lucide-react';

// --- CONSTANTES Y DATOS ---

const BRAND_COLORS = {
  primary: '#c0eff6',   // Azul Claro - Confianza
  secondary: '#def8c3', // Verde Claro - Salud
  accent: '#d8bf9f',    // Beige Cálido - Cariño
  text: '#1f2937',      // Gris oscuro para texto
  white: '#ffffff'
};

const BRAND_INFO = {
  brandName: 'GLOBALPET',
  legalName: 'Globalpet 360 S.L.',
  ownerName: 'Marta Navarro Campos',
  slogan: 'Amor que se nota en cada huella',
  addressLine: 'Calle Mauricio Moro Pareto, 11',
  cityLine: '29006, Malaga',
  locationRefs: 'Junto al Centro Comercial Eroski y Vialia',
  localSize: '180m2'
};

const parsePriceToNumber = (priceText) => {
  if (!priceText) return 0;
  const cleaned = priceText.replace(/[^\d,.-]/g, '').replace(/\./g, '').replace(',', '.');
  const value = Number.parseFloat(cleaned);
  return Number.isNaN(value) ? 0 : value;
};

const PRODUCTS = [
  {
    id: 1,
    name: "Pienso hipoalergenico",
    category: "Alimentación",
    salePrice: "26,65 €",
    image: "https://images.unsplash.com/photo-1583512603806-077998240c7a?q=80&w=1200&auto=format&fit=crop",
    description: "Alimento completo para perros y gatos con intolerancias o alergias comunes. Sin cereales, colorantes ni conservantes artificiales.",
    tag: "Top Ventas"
  },
  {
    id: 2,
    name: "Pienso normal",
    category: "Alimentación",
    salePrice: "26,65 €",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=1200&auto=format&fit=crop",
    description: "Pienso completo con salmon, pollo o ternera, grasas saludables, fibras moderadas y bajos carbohidratos.",
    tag: "Diario"
  },
  {
    id: 3,
    name: "Champu anticaspa",
    category: "Higiene",
    salePrice: "17,32 €",
    image: "https://images.unsplash.com/photo-1527526029430-319f10814151?q=80&w=1200&auto=format&fit=crop",
    description: "Champu dermatologico para pieles con caspa, escamas o picores. Con ingredientes calmantes como aloe vera y aceite de arbol del te.",
    tag: "Recomendado"
  },
  {
    id: 4,
    name: "Champu normal",
    category: "Higiene",
    salePrice: "25,99 €",
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=1200&auto=format&fit=crop",
    description: "Champu de argan para limpieza en profundidad, apto para distintos tamanos y razas.",
    tag: "Cuidado"
  },
  {
    id: 5,
    name: "Juguetes de estimulacion",
    category: "Accesorios",
    salePrice: "21,32 €",
    image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=1200&auto=format&fit=crop",
    description: "Juguetes para estimular habilidades cognitivas, con materiales resistentes a mordidas y aranazos.",
    tag: "Estimulación"
  },
  {
    id: 6,
    name: "Kit Junior",
    category: "Kits",
    salePrice: "32,80 €",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1200&auto=format&fit=crop",
    description: "Pack de primeros dias con alimentacion, antiparasitario, juguete, QR de App y guia rapida.",
    tag: "Kit Inicio"
  },
  {
    id: 7,
    name: "Kit alergico",
    category: "Kits",
    salePrice: "39,65 €",
    image: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=1200&auto=format&fit=crop",
    description: "Pack con pienso y champu hipoalergenico, QR para la App y guia rapida especializada.",
    tag: "Especializado"
  },
  {
    id: 8,
    name: "Kit senior",
    category: "Kits",
    salePrice: "42,71 €",
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=1200&auto=format&fit=crop",
    description: "Pack para mascotas senior con pienso adaptado, suplemento articular, QR de App y guia rapida.",
    tag: "Senior"
  }
];

const FAQS = [
  {
    question: "¿Cómo funciona la cabina Mi PetCheck?",
    answer: "Es un servicio gratuito de analisis interno y externo de la mascota. Evalua alergias, tipo de pelaje y otros indicadores para orientar el cuidado."
  },
  {
    question: "¿Es obligatorio comprar un kit para usar la App?",
    answer: "No. El QR de acceso a la App se facilita al comprar cualquier articulo en tienda o al usar Mi PetCheck."
  },
  {
    question: "¿Como distribuye Globalpet sus productos?",
    answer: "Con canal directo en tienda fisica y canal corto con furgoneta para reparto de pedidos online en Malaga."
  }
];

// --- COMPONENTES ---

const Button = ({ children, variant = 'primary', className = '', onClick }) => {
  const baseStyle = "px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-sm flex items-center justify-center gap-2";
  const variants = {
    primary: `bg-[#c0eff6] text-gray-900 hover:bg-[#aee6ef] shadow-[0_0_15px_rgba(192,239,246,0.3)]`,
    secondary: `bg-[#def8c3] text-gray-900 hover:bg-[#cbf0a8] shadow-[0_0_15px_rgba(222,248,195,0.3)]`,
    accent: `bg-[#d8bf9f] text-white hover:bg-[#c9ad8a]`,
    outline: `border-2 border-gray-800 dark:border-white text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800`
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const SectionTitle = ({ title, subtitle }) => (
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4 transition-colors">{title}</h2>
    <div className="w-24 h-1 bg-[#d8bf9f] mx-auto rounded-full mb-4"></div>
    {subtitle && <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors">{subtitle}</p>}
  </div>
);

// --- COMPONENTE DE ANÁLISIS (MOCK) ---

const AnalysisDemo = () => {
  const [status, setStatus] = useState('idle'); // idle, scanning, analyzing, results
  const [progress, setProgress] = useState(0);
  const scanText = progress >= 80
    ? "Calculando índice de masa corporal..."
    : progress >= 50
      ? "Analizando dermis y pigmentación..."
      : progress >= 20
        ? "Escaneando densidad de pelaje..."
        : "Iniciando escáner...";

  useEffect(() => {
    if (status !== 'scanning') return undefined;

    const durationMs = 5000;
    const startTime = performance.now();
    let animationFrameId;

    const tick = (now) => {
      const elapsed = now - startTime;
      const nextProgress = Math.min(100, Math.round((elapsed / durationMs) * 100));
      setProgress(nextProgress);

      if (nextProgress < 100) {
        animationFrameId = window.requestAnimationFrame(tick);
      } else {
        setStatus('results');
      }
    };

    animationFrameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [status]);

  const startScan = () => {
    setStatus('scanning');
    setProgress(0);
  };

  const resetScan = () => {
    setStatus('idle');
    setProgress(0);
  }

  return (
    <div className="pt-24 pb-20 animate-fade-in min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 max-w-4xl">
        <SectionTitle title="Demo: Mi PetCheck" subtitle="Prueba nuestra tecnología de análisis en tiempo real." />

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden transition-colors border border-gray-100 dark:border-gray-700">
          
          {/* SCREEN: IDLE */}
          {status === 'idle' && (
            <div className="p-12 text-center">
              <div className="w-32 h-32 bg-[#c0eff6] rounded-full mx-auto mb-8 flex items-center justify-center animate-pulse">
                <ScanLine size={64} className="text-gray-800" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Listo para escanear</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto">
                Esta demo simula los datos que verías en la pantalla exterior de la cabina mientras tu mascota está dentro.
              </p>
              <Button onClick={startScan}>Iniciar Escaneo Demo</Button>
            </div>
          )}

          {/* SCREEN: SCANNING */}
          {(status === 'scanning' || status === 'analyzing') && (
            <div className="p-12 text-center">
              <div className="relative w-48 h-48 mx-auto mb-8">
                 {/* Spinner Circle */}
                 <div className="absolute inset-0 border-8 border-gray-100 dark:border-gray-700 rounded-full"></div>
                 <div 
                    className="absolute inset-0 border-8 border-[#c0eff6] rounded-full transition-all duration-200 ease-linear border-t-transparent"
                    style={{ transform: `rotate(${progress * 3.6}deg)` }}
                 ></div>
                 <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-4xl font-bold text-gray-800 dark:text-white">{progress}%</span>
                 </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 animate-pulse">{scanText}</h3>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-4 max-w-md mx-auto overflow-hidden">
                <div className="bg-[#def8c3] h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          )}

          {/* SCREEN: RESULTS */}
          {status === 'results' && (
            <div className="p-8 md:p-12 animate-slide-up">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100 dark:border-gray-700">
                <div>
                   <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Resultados del Análisis</h3>
                   <p className="text-gray-500 text-sm">ID: #GP-2024-X92 • Paciente: "Max" (Simulado)</p>
                </div>
                <div className="bg-[#def8c3] text-gray-900 px-4 py-2 rounded-full font-bold flex items-center gap-2">
                   <CheckCircle size={18} /> Saludable
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                 {/* Card 1 */}
                 <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                       <Activity className="text-[#c0eff6]" />
                       <h4 className="font-bold text-gray-700 dark:text-white">Peso</h4>
                    </div>
                    <p className="text-3xl font-bold text-gray-800 dark:text-white mb-1">12.5 kg</p>
                    <p className="text-xs text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded inline-block">Ideal para su raza</p>
                 </div>
                 {/* Card 2 */}
                 <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                       <ScanLine className="text-[#d8bf9f]" />
                       <h4 className="font-bold text-gray-700 dark:text-white">Pelaje</h4>
                    </div>
                    <p className="text-3xl font-bold text-gray-800 dark:text-white mb-1">98%</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Densidad óptima. Sin caspa.</p>
                 </div>
                 {/* Card 3 */}
                 <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                       <AlertCircle className="text-red-400" />
                       <h4 className="font-bold text-gray-700 dark:text-white">Alergias</h4>
                    </div>
                    <p className="text-3xl font-bold text-gray-800 dark:text-white mb-1">0</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">No se detectaron reacciones.</p>
                 </div>
              </div>

              <div className="bg-[#c0eff6]/20 border border-[#c0eff6] rounded-xl p-6 mb-8">
                 <h4 className="font-bold text-gray-800 dark:text-white mb-2">Recomendación IA Globalpet:</h4>
                 <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Basado en estos resultados, recomendamos mantener la dieta actual. Para potenciar el brillo del pelaje, el champú <strong>Dermapaws</strong> sería un complemento excelente.
                 </p>
              </div>

              <div className="flex gap-4 justify-center">
                 <Button onClick={resetScan}>Nuevo Análisis</Button>
                 <Button variant="outline" onClick={() => window.print()}>Descargar Informe PDF</Button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};


// --- PÁGINAS ---

const HomePage = ({ navigateTo }) => (
  <div className="animate-fade-in">
    {/* Hero Section */}
    <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#c0eff6] via-white to-[#def8c3] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <span className="inline-block px-4 py-1 rounded-full bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-200 text-sm font-semibold mb-6 shadow-sm">
            Innovación y Cuidado Animal
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 dark:text-white leading-tight mb-6 transition-colors">
            Amor que se nota en <span className="text-[#d8bf9f]">cada huella</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto md:mx-0 transition-colors">
            Mas que una tienda, somos un centro de bienestar 360 con analisis personalizado y acompanamiento real para cada mascota.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button onClick={() => navigateTo('shop')}>
              Ver Productos <ShoppingBag size={20} />
            </Button>
            <Button variant="outline" onClick={() => navigateTo('demo')}>
              Probar Demo Online <Activity size={20} className="ml-2 text-[#c0eff6]" />
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 relative">
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white dark:border-gray-700 transform rotate-2 hover:rotate-0 transition-all duration-500">
              <img
               src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop" 
               alt="Perro feliz" 
               className="w-full h-auto object-cover"
               loading="eager"
             />
          </div>
          {/* Decorative Elements */}
          <div className="absolute top-10 -right-10 w-32 h-32 bg-[#def8c3] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse dark:opacity-20"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#c0eff6] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse dark:opacity-20"></div>
        </div>
      </div>
    </section>

    {/* Value Proposition */}
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Activity size={40} />, title: "Salud Integral", desc: "Nutrición experta y cuidado dermatológico.", color: "bg-[#def8c3]" },
            { icon: <Smartphone size={40} />, title: "Tecnología Smart", desc: "App gratuita con acceso por QR para seguimiento.", color: "bg-[#c0eff6]" },
            { icon: <Heart size={40} />, title: "Cariño Real", desc: "Espacios transparentes y trato cercano.", color: "bg-[#d8bf9f]" }
          ].map((item, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 dark:hover:border-gray-600 group">
              <div className={`w-16 h-16 rounded-full ${item.color} flex items-center justify-center text-gray-800 mb-6 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white transition-colors">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 transition-colors">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Highlights */}
    <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors">
      <div className="container mx-auto px-4">
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-lg flex flex-col md:flex-row items-center gap-12 overflow-hidden relative transition-colors">
          <div className="md:w-1/2 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">Innovación: <span className="text-[#c0eff6] bg-gray-800 dark:bg-gray-700 px-2 rounded">Mi PetCheck</span></h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 transition-colors">
              Mi PetCheck es un servicio gratuito conectado a la App para centralizar resultados, seguimiento y recomendaciones de cuidado.
            </p>
            <Button variant="secondary" onClick={() => navigateTo('demo')}>
              Ver Demo Interactiva <ArrowRight size={20} />
            </Button>
          </div>
          <div className="md:w-1/2">
             <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 relative overflow-hidden group cursor-pointer" onClick={() => navigateTo('demo')}>
                <img src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=2070&auto=format&fit=crop" alt="Veterinaria tecnología" className="object-cover w-full h-full opacity-80 group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/30 transition-colors">
                   <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full border border-white/50">
                     <Activity size={32} className="text-white" />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const ShopPage = ({ navigateTo, setProductDetail, addToCart, toggleFavorite, favoriteIds }) => {
  const [animatedProductId, setAnimatedProductId] = useState(null);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAnimatedProductId(product.id);
    window.setTimeout(() => setAnimatedProductId(null), 280);
  };

  return (
    <div className="pt-24 pb-20 animate-fade-in bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <div className="container mx-auto px-4">
      <SectionTitle 
        title="Nuestra Selección" 
        subtitle="Productos formulados por expertos para el bienestar de tu mascota."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl dark:shadow-none transition-all duration-300 group border border-transparent dark:border-gray-700">
            <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-700">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              <span className="absolute top-4 left-4 bg-[#c0eff6] text-gray-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
                {product.tag}
              </span>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{product.category}</p>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{product.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                {product.salePrice ? (
                  <span className="text-2xl font-bold text-gray-800 dark:text-[#c0eff6]">{product.salePrice}</span>
                ) : (
                  <span className="text-sm font-semibold text-gray-500 dark:text-gray-300">Consultar en tienda</span>
                )}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="p-3 rounded-full border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Toggle favorito"
                  >
                    <Heart
                      size={18}
                      className={favoriteIds.includes(product.id) ? 'text-red-500' : ''}
                      fill={favoriteIds.includes(product.id) ? 'currentColor' : 'none'}
                    />
                  </button>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`bg-[#def8c3] hover:bg-[#c9f0a0] text-gray-800 p-3 rounded-full transition-all duration-200 ${animatedProductId === product.id ? 'scale-110 ring-2 ring-[#aee6ef]' : 'scale-100'}`}
                    aria-label="Agregar al carrito"
                  >
                    <ShoppingBag size={18} />
                  </button>
                  <button 
                    onClick={() => { setProductDetail(product); navigateTo('product-detail'); }}
                    className="bg-[#c0eff6] hover:bg-[#aee6ef] text-gray-800 p-3 rounded-full transition-colors"
                    aria-label="Ver detalle"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

const ProductDetailPage = ({ product, navigateTo, addToCart, toggleFavorite, favoriteIds }) => {
  const [isAdding, setIsAdding] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdding(true);
    window.setTimeout(() => setIsAdding(false), 280);
  };

  return (
    <div className="pt-32 pb-20 animate-fade-in bg-white dark:bg-gray-900 min-h-screen transition-colors">
      <div className="container mx-auto px-4">
        <button onClick={() => navigateTo('shop')} className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white flex items-center gap-2 mb-8 transition-colors">
          <ArrowRight className="rotate-180" size={20} /> Volver a la tienda
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="bg-[#f0f9fa] dark:bg-gray-800 rounded-3xl p-8 flex items-center justify-center transition-colors">
             <img src={product.image} alt={product.name} className="w-full max-w-md shadow-2xl rounded-xl rotate-3 hover:rotate-0 transition-all duration-500" />
          </div>
          
          <div>
            <span className="text-[#c0eff6] bg-gray-800 dark:bg-gray-700 px-3 py-1 rounded text-xs font-bold uppercase tracking-widest">
              {product.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mt-4 mb-4 transition-colors">{product.name}</h1>
            {product.salePrice ? (
              <p className="text-3xl text-gray-800 dark:text-[#c0eff6] font-medium mb-6 transition-colors">{product.salePrice}</p>
            ) : (
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300 mb-6">Precio disponible en tienda</p>
            )}
            
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed transition-colors">
              {product.description} Seleccionado para aportar bienestar real y continuidad de cuidado junto a Mi PetCheck y la App Globalpet.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <div className="w-8 h-8 rounded-full bg-[#def8c3] flex items-center justify-center text-gray-800"><Activity size={16} /></div>
                <span>Ingredientes naturales y seguros</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <div className="w-8 h-8 rounded-full bg-[#c0eff6] flex items-center justify-center text-gray-800"><Star size={16} /></div>
                <span>Garantía de calidad Globalpet</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button className={`flex-1 transition-all duration-200 ${isAdding ? 'scale-105 ring-2 ring-[#aee6ef]' : 'scale-100'}`} onClick={handleAddToCart}>Añadir al Carrito</Button>
              <Button variant="outline" onClick={() => toggleFavorite(product.id)}>
                <Heart size={20} className={favoriteIds.includes(product.id) ? 'text-red-500' : ''} fill={favoriteIds.includes(product.id) ? 'currentColor' : 'none'} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartPage = ({ cartItems, navigateTo, increaseCartItem, decreaseCartItem, removeCartItem }) => {
  const subtotal = cartItems.reduce((acc, item) => {
    const unitPrice = parsePriceToNumber(item.product.salePrice);
    return acc + (unitPrice * item.quantity);
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div className="pt-24 pb-20 animate-fade-in bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <SectionTitle title="Tu carrito" subtitle="Aun no has agregado productos." />
          <Button onClick={() => navigateTo('shop')}>Ir a la tienda</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 animate-fade-in bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <div className="container mx-auto px-4 max-w-5xl">
        <SectionTitle title="Tu carrito" subtitle="Gestiona tus productos seleccionados." />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.product.id} className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 border border-gray-100 dark:border-gray-700 flex gap-4">
                <img src={item.product.image} alt={item.product.name} className="w-24 h-24 rounded-xl object-cover" loading="lazy" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.product.category}</p>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">{item.product.name}</h3>
                  <p className="text-[#1f2937] dark:text-[#c0eff6] font-semibold mt-1">{item.product.salePrice || 'Consultar en tienda'}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <button onClick={() => decreaseCartItem(item.product.id)} className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">-</button>
                    <span className="min-w-8 text-center text-gray-700 dark:text-gray-200 font-semibold">{item.quantity}</span>
                    <button onClick={() => increaseCartItem(item.product.id)} className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">+</button>
                    <button onClick={() => removeCartItem(item.product.id)} className="ml-4 text-sm font-medium text-red-500 hover:text-red-600 transition-colors">Eliminar</button>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Total: {(parsePriceToNumber(item.product.salePrice) * item.quantity).toFixed(2).replace('.', ',')} €
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 h-fit">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Resumen</h3>
            <div className="flex items-center justify-between text-gray-600 dark:text-gray-300 mb-3">
              <span>Productos</span>
              <span>{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
            </div>
            <div className="flex items-center justify-between text-gray-800 dark:text-white text-lg font-bold border-t border-gray-100 dark:border-gray-700 pt-4">
              <span>Subtotal</span>
              <span>{subtotal.toFixed(2).replace('.', ',')} €</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">No incluye compra online en esta version.</p>
            <Button className="w-full mt-6" onClick={() => navigateTo('shop')}>Seguir comprando</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServicesPage = ({ navigateTo }) => (
  <div className="pt-24 pb-20 animate-fade-in bg-white dark:bg-gray-900 transition-colors">
    {/* Cabina Section */}
    <section className="container mx-auto px-4 mb-20">
      <div className="bg-gray-900 dark:bg-gray-800 rounded-3xl text-white overflow-hidden shadow-2xl border border-gray-800 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-12 flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-6 text-[#c0eff6]">Mi PetCheck</h2>
            <h3 className="text-2xl mb-6">Tecnología transparente para su salud.</h3>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Servicio gratuito que analiza salud interna y externa de la mascota, desde alergias hasta tipo de pelaje, con seguimiento continuo en la App.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3"><span className="text-[#def8c3]">✓</span> Analisis de alergias y pelaje</li>
              <li className="flex items-center gap-3"><span className="text-[#def8c3]">✓</span> Recomendacion de cuidado personalizada</li>
              <li className="flex items-center gap-3"><span className="text-[#def8c3]">✓</span> Resultados accesibles desde la App</li>
            </ul>
            <div className="flex gap-4 flex-wrap">
              <Button variant="secondary">Reservar Cita Ahora</Button>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900" onClick={() => navigateTo('demo')}>
                 Ver Demo
              </Button>
            </div>
          </div>
          <div className="bg-gray-800 relative min-h-[400px]">
             {/* Mock visual of booth */}
             <img src="https://images.unsplash.com/photo-1623366302587-b38b1ddaefd9?q=80&w=1925&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-60" alt="Tech pet" loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    {/* App Section */}
    <section className="container mx-auto px-4 mb-20">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 flex justify-center">
            <div className="bg-[#c0eff6] p-8 rounded-full shadow-[0_0_50px_rgba(192,239,246,0.5)]">
               <Smartphone size={200} className="text-gray-800" strokeWidth={1} />
            </div>
        </div>
        <div className="md:w-1/2">
          <SectionTitle title="Globalpet App" subtitle="Resultados, historial y seguimiento en tu bolsillo." />
          <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors">
            La App es gratuita y se activa con QR. Puedes acceder al historial, revisar resultados de Mi PetCheck y gestionar pedidos online de productos.
          </p>
          <div className="flex gap-4">
            <button className="bg-black dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition">
              <span className="text-xs">Download on the</span> <br/> <span className="font-bold text-lg">App Store</span>
            </button>
            <button className="bg-black dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition">
              <span className="text-xs">Get it on</span> <br/> <span className="font-bold text-lg">Google Play</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <section className="container mx-auto px-4 mb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 transition-colors">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Canal directo</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Atencion en tienda fisica para seleccion de productos y recomendacion con soporte de Mi PetCheck.
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 transition-colors">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Canal corto</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Reparto con furgoneta para pedidos online en Malaga, pensado para clientes que priorizan comodidad.
          </p>
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="bg-[#f9fafb] dark:bg-gray-800 py-20 transition-colors">
      <div className="container mx-auto px-4 max-w-3xl">
        <SectionTitle title="Preguntas Frecuentes" />
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-700 rounded-xl shadow-sm overflow-hidden transition-colors">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6 bg-white dark:bg-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition">
                  <span>{faq.question}</span>
                  <span className="transition group-open:rotate-180">
                    <ChevronDown color={BRAND_COLORS.text} className="dark:text-white" />
                  </span>
                </summary>
                <div className="text-gray-600 dark:text-gray-300 p-6 pt-0 leading-relaxed border-t border-gray-100 dark:border-gray-600 mt-2 transition-colors">
                  {faq.answer}
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const AboutPage = () => (
  <div className="pt-24 pb-20 animate-fade-in bg-white dark:bg-gray-900 transition-colors min-h-screen">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 text-gray-800 dark:text-white transition-colors">Sobre Globalpet</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors">
          Nacimos con una mision clara: elevar el estandar del cuidado de mascotas uniendo cercania, tecnologia y seguimiento continuo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <div className="bg-[#d8bf9f] rounded-3xl p-10 text-white flex flex-col justify-center shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Nuestra Historia</h2>
          <p className="leading-relaxed opacity-90">
            Globalpet 360 nace para integrar alimentacion, higiene, accesorios y analisis en un mismo espacio. El objetivo es que cada familia entienda mejor la salud de su mascota y tome decisiones con informacion.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-10 shadow-lg border border-gray-100 dark:border-gray-700 transition-colors">
           <div className="flex items-center gap-4 mb-6">
              <div className="bg-[#c0eff6] p-3 rounded-full"><MapPin size={24} className="text-gray-800" /></div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white transition-colors">Visítanos</h2>
           </div>
           <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors">
             Estamos en Malaga capital, junto a Eroski y Vialia, en un local de 180m2 orientado al bienestar integral.
           </p>
           <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-6 mb-4 transition-colors">
             <p className="font-bold text-gray-800 dark:text-white">{BRAND_INFO.addressLine}</p>
             <p className="text-gray-600 dark:text-gray-300">{BRAND_INFO.locationRefs}</p>
             <p className="text-gray-600 dark:text-gray-300">{BRAND_INFO.cityLine}</p>
             <p className="text-gray-600 dark:text-gray-300">Superficie del local: {BRAND_INFO.localSize}</p>
           </div>
           {/* Mock Map */}
           <div className="w-full h-48 bg-gray-300 dark:bg-gray-600 rounded-xl relative overflow-hidden group cursor-pointer">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1748&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition" alt="Mapa" loading="lazy" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <button className="bg-white dark:bg-gray-800 dark:text-white px-4 py-2 rounded shadow text-sm font-bold hover:scale-105 transition-transform">Ver en Google Maps</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  </div>
);

// --- APP COMPONENT MAIN ---

const App = () => {
  const [currentPage, setCurrentPage] = useState('home'); // home, shop, services, about, product-detail, demo, cart
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartQuantities, setCartQuantities] = useState({});
  const [favoriteIds, setFavoriteIds] = useState([]);
  
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const addToCart = (product) => {
    setCartQuantities((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1
    }));
  };

  const increaseCartItem = (productId) => {
    setCartQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const decreaseCartItem = (productId) => {
    setCartQuantities((prev) => {
      const currentQty = prev[productId] || 0;
      if (currentQty <= 1) {
        const { [productId]: _REMOVED, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [productId]: currentQty - 1
      };
    });
  };

  const removeCartItem = (productId) => {
    setCartQuantities((prev) => {
      const { [productId]: _REMOVED, ...rest } = prev;
      return rest;
    });
  };

  const toggleFavorite = (productId) => {
    setFavoriteIds((prev) => (
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    ));
  };

  const cartItems = Object.entries(cartQuantities)
    .map(([id, quantity]) => {
      const product = PRODUCTS.find((item) => item.id === Number(id));
      if (!product || quantity <= 0) return null;
      return { product, quantity };
    })
    .filter(Boolean);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { id: 'home', label: 'Inicio' },
    { id: 'shop', label: 'Tienda' },
    { id: 'services', label: 'Servicios' },
    { id: 'about', label: 'Ubicación' },
  ];

  return (
    <div className={`${isDarkMode ? 'dark' : ''} font-sans`}>
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
        
        {/* Navbar */}
        <nav className="fixed w-full z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-300">
          <div className="container mx-auto px-4 h-20 flex items-center justify-between">
            {/* Logo */}
            <div 
              className="flex items-center gap-2 cursor-pointer group" 
              onClick={() => navigateTo('home')}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#c0eff6] to-[#def8c3] flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-xl">🐾</span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white transition-colors">{BRAND_INFO.brandName}</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => navigateTo(link.id)}
                  className={`text-sm font-medium transition-colors hover:text-[#c0eff6] ${currentPage === link.id ? 'text-gray-900 dark:text-white border-b-2 border-[#c0eff6]' : 'text-gray-500 dark:text-gray-400'}`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-4">
              
              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme} 
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-600 dark:text-gray-300"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button onClick={() => navigateTo('cart')} className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                <ShoppingBag size={20} className="text-gray-600 dark:text-gray-300" />
                <span className="absolute top-0 right-0 min-w-4 h-4 px-1 bg-[#d8bf9f] text-white text-[10px] font-bold rounded-full flex items-center justify-center">{cartCount}</span>
              </button>
              
              <Button className="px-5 py-2 text-sm" onClick={() => navigateTo('services')}>
                Pedir Cita
              </Button>
            </div>

            {/* Mobile Toggle */}
            <div className="flex items-center gap-4 md:hidden">
              <button onClick={() => navigateTo('cart')} className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                <ShoppingBag size={20} className="text-gray-600 dark:text-gray-300" />
                <span className="absolute top-0 right-0 min-w-4 h-4 px-1 bg-[#d8bf9f] text-white text-[10px] font-bold rounded-full flex items-center justify-center">{cartCount}</span>
              </button>
              <button 
                onClick={toggleTheme} 
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-600 dark:text-gray-300"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button 
                className="p-2 text-gray-800 dark:text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-20 left-0 w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-lg p-4 flex flex-col gap-4 animate-slide-down transition-colors">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => navigateTo(link.id)}
                  className={`text-left p-3 rounded-lg ${currentPage === link.id ? 'bg-[#c0eff6]/20 font-bold dark:text-white' : 'hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-300'}`}
                >
                  {link.label}
                </button>
              ))}
              <div className="h-px bg-gray-100 dark:bg-gray-800 my-2"></div>
              <Button className="w-full justify-center" onClick={() => navigateTo('services')}>Pedir Cita</Button>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main className="flex-grow pt-20">
          {currentPage === 'home' && <HomePage navigateTo={navigateTo} />}
          {currentPage === 'shop' && (
            <ShopPage
              navigateTo={navigateTo}
              setProductDetail={setSelectedProduct}
              addToCart={addToCart}
              toggleFavorite={toggleFavorite}
              favoriteIds={favoriteIds}
            />
          )}
          {currentPage === 'services' && <ServicesPage navigateTo={navigateTo} />}
          {currentPage === 'about' && <AboutPage />}
          {currentPage === 'product-detail' && (
            <ProductDetailPage
              product={selectedProduct}
              navigateTo={navigateTo}
              addToCart={addToCart}
              toggleFavorite={toggleFavorite}
              favoriteIds={favoriteIds}
            />
          )}
          {currentPage === 'cart' && (
            <CartPage
              cartItems={cartItems}
              navigateTo={navigateTo}
              increaseCartItem={increaseCartItem}
              decreaseCartItem={decreaseCartItem}
              removeCartItem={removeCartItem}
            />
          )}
          {currentPage === 'demo' && <AnalysisDemo onComplete={() => {}} />}
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white pt-16 pb-8 border-t border-gray-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#c0eff6] to-[#def8c3] flex items-center justify-center">
                     <span className="text-sm">🐾</span>
                  </div>
                  <span className="text-xl font-bold">{BRAND_INFO.brandName}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Cuidado integral, tecnologia y amor para tu mascota en Malaga. Seguimiento real desde tienda, Mi PetCheck y App.
                </p>
              </div>
              
              <div>
                <h4 className="font-bold mb-6 text-[#c0eff6]">Enlaces Rápidos</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li><button onClick={() => navigateTo('home')} className="hover:text-white transition">Inicio</button></li>
                  <li><button onClick={() => navigateTo('shop')} className="hover:text-white transition">Tienda Online</button></li>
                  <li><button onClick={() => navigateTo('services')} className="hover:text-white transition">Mi PetCheck</button></li>
                  <li><button onClick={() => navigateTo('about')} className="hover:text-white transition">Contacto</button></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-6 text-[#def8c3]">Legal</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition">Aviso Legal</a></li>
                  <li><a href="#" className="hover:text-white transition">Política de Privacidad</a></li>
                  <li><a href="#" className="hover:text-white transition">Política de Cookies</a></li>
                  <li><a href="#" className="hover:text-white transition">Envíos y Devoluciones</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-6 text-[#d8bf9f]">Contacto</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex items-center gap-2"><MapPin size={16}/> {BRAND_INFO.addressLine}, Malaga</li>
                  <li className="flex items-center gap-2"><Smartphone size={16}/> +34 952 000 000</li>
                  <li className="flex items-center gap-2">@ hola@globalpet360.com</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
              <p>&copy; 2026 {BRAND_INFO.legalName}. Todos los derechos reservados.</p>
              <div className="flex gap-4 mt-4 md:mt-0">
                 <span>Instagram</span>
                 <span>Facebook</span>
                 <span>TikTok</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;