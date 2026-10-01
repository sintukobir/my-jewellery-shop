'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { ShoppingBag, Eye, Star, Sparkles, Check, Trash2, ArrowRight } from 'lucide-react';

// AR Component loaded client-side only
const VRTryOnModal = dynamic(() => import('@/components/VRTryOnModal'), { ssr: false });

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Royal Heritage Diamond Necklace',
    category: 'Necklaces',
    price: 4500,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    description: ' handcrafted 18k White Gold necklace studded with ethically sourced VVS diamonds.'
  },
  {
    id: 2,
    name: 'Aura Emerald Drop Earrings',
    category: 'Earrings',
    price: 2200,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
    description: 'Exquisite Zambian emeralds framed in 24k yellow gold filigree.'
  },
  {
    id: 3,
    name: 'Solitaire Cushion Diamond Ring',
    category: 'Rings',
    price: 3800,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    description: 'Timeless 2-carat cushion cut diamond set on a platinum pave band.'
  },
  {
    id: 4,
    name: 'Celestial Ruby Bracelet',
    category: 'Bracelets',
    price: 2900,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1611591475179-62cd34eb905f?auto=format&fit=crop&w=800&q=80',
    description: 'Burmese rubies linked with delicate rose gold chain links.'
  }
];

export default function Home() {
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeArProduct, setActiveArProduct] = useState<Product | null>(null);

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const totalCartPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-amber-500 selection:text-black">
      {/* Top Announcement */}
      <div className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 py-2 text-center text-xs font-semibold tracking-widest uppercase text-black">
        ✨ Free Global Insured Express Shipping on Orders Over $2,000 ✨
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800/60 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Sparkles className="text-amber-400 w-6 h-6" />
          <span className="text-2xl font-serif tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 uppercase">
            Rumes Luxury
          </span>
        </div>

        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative p-2 text-zinc-300 hover:text-amber-400 transition"
        >
          <ShoppingBag className="w-6 h-6" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-500 text-black font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </button>
      </nav>

      {/* Hero Section */}
      <header className="relative h-[70vh] flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1920&q=80" 
          alt="Luxury Jewelry Banner" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105 transition duration-1000 ease-out"
        />
        <div className="relative z-20 max-w-3xl space-y-6">
          <p className="text-amber-400 uppercase tracking-widest text-sm font-light">Elegance Redefined</p>
          <h1 className="text-5xl md:text-7xl font-serif text-amber-100 leading-tight">
            Exquisite Craftsmanship, Timeless Beauty
          </h1>
          <p className="text-zinc-300 text-lg font-light max-w-xl mx-auto">
            Discover our high-jewelry collection and experience real-time AI Virtual Try-On before you buy.
          </p>
        </div>
      </header>

      {/* Product Catalog */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-end mb-12 border-b border-zinc-800 pb-4">
          <div>
            <h2 className="text-3xl font-serif text-amber-200">Featured Creations</h2>
            <p className="text-zinc-400 text-sm mt-1">Handcrafted pieces studded with certified gemstones</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="group bg-zinc-900/60 rounded-xl overflow-hidden border border-zinc-800/80 hover:border-amber-500/50 transition duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-square overflow-hidden bg-zinc-950">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <button
                  onClick={() => setActiveArProduct(product)}
                  className="absolute bottom-3 right-3 bg-zinc-950/80 hover:bg-amber-500 hover:text-black border border-amber-500/40 text-amber-300 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md flex items-center space-x-1 transition shadow-lg"
                >
                  <Eye size={14} />
                  <span>AR Try-On</span>
                </button>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-amber-400 mb-1">
                    <span>{product.category}</span>
                    <span className="flex items-center space-x-1">
                      <Star size={12} className="fill-amber-400" />
                      <span>{product.rating}</span>
                    </span>
                  </div>
                  <h3 className="text-lg font-serif text-zinc-100 group-hover:text-amber-200 transition">
                    {product.name}
                  </h3>
                  <p className="text-zinc-400 text-xs mt-2 line-clamp-2">{product.description}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60">
                  <span className="text-xl font-medium text-amber-300">${product.price.toLocaleString()}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-zinc-800 hover:bg-amber-500 hover:text-black text-zinc-200 text-xs px-4 py-2 rounded-md font-semibold transition flex items-center space-x-1"
                  >
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-zinc-900 h-full p-6 flex flex-col justify-between border-l border-zinc-800">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
                <h3 className="text-xl font-serif text-amber-300">Your Shopping Bag ({cart.length})</h3>
                <button onClick={() => setIsCartOpen(false)} className="text-zinc-400 hover:text-white">✕</button>
              </div>

              <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {cart.length === 0 ? (
                  <p className="text-zinc-500 text-center py-10">Your bag is currently empty.</p>
                ) : (
                  cart.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                      <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-md" />
                      <div className="flex-1 px-3">
                        <h4 className="text-sm font-medium text-zinc-200">{item.name}</h4>
                        <p className="text-xs text-amber-400 font-semibold">${item.price.toLocaleString()}</p>
                      </div>
                      <button onClick={() => removeFromCart(index)} className="text-zinc-500 hover:text-red-400">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {cart.length > 0 && (
              <div className="pt-4 border-t border-zinc-800 space-y-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Subtotal</span>
                  <span className="text-amber-300">${totalCartPrice.toLocaleString()}</span>
                </div>
                <button 
                  onClick={() => alert('Proceeding to Luxury Secure Checkout...')}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold py-3 rounded-lg hover:brightness-110 transition flex items-center justify-center space-x-2"
                >
                  <span>Checkout Now</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AR Virtual Try-On Modal */}
      {activeArProduct && (
        <VRTryOnModal 
          isOpen={!!activeArProduct} 
          onClose={() => setActiveArProduct(null)} 
          productName={activeArProduct.name} 
        />
      )}
    </div>
  );
}