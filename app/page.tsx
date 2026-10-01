'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import CategoryMenu from '@/components/navigation/CategoryMenu';

export default function Home() {
  const [showCategory, setShowCategory] = useState(false);

  const products = [
    { id: '1', name: 'Royal Heritage Diamond Necklace', price: 4500, orig: 8999, discount: 50 },
    { id: '2', name: 'Aura Emerald Drop Earrings', price: 2200, orig: 4400, discount: 50 },
    { id: '3', name: 'Solitaire Cushion Diamond Ring', price: 3800, orig: 7600, discount: 50 },
    { id: '4', name: 'Celestial Ruby Bracelet', price: 2900, orig: 5800, discount: 50 }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative font-sans antialiased">
      {/* Top Banner - Mobile Scrollable */}
      <div className="bg-amber-950 text-amber-200 text-xs py-2 px-3 flex justify-between items-center border-b border-amber-900/50 overflow-x-auto whitespace-nowrap">
        <span className="font-bold mr-4">🎉 BUY 1 GET 1 FREE | SITEWIDE</span>
        <div className="flex gap-3 text-[11px]">
          <Link href="/store-locator" target="_blank" className="hover:underline">Store Locator</Link>
          <Link href="/track-package" target="_blank" className="hover:underline">Track Package</Link>
          <Link href="/return-exchange" target="_blank" className="hover:underline">Return & Exchange</Link>
          <Link href="/contact-us" target="_blank" className="hover:underline">Contact Us</Link>
        </div>
      </div>

      {/* Main Responsive Header */}
      <header className="px-4 md:px-8 py-3 bg-zinc-950/90 backdrop-blur border-b border-amber-500/20 flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowCategory(!showCategory)}
            className="text-amber-400 border border-amber-500/40 px-2.5 py-1 rounded text-xs md:text-sm hover:bg-amber-500/10 active:scale-95 transition"
          >
            ☰ Category
          </button>
          <Link href="/" className="text-lg md:text-2xl font-serif font-bold text-amber-400 tracking-wide">
            ✨ RUMES LUXURY
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/auth/login" target="_blank" className="text-xs md:text-sm text-zinc-300 hover:text-amber-400">
            Login
          </Link>
          <Link href="/product/1" target="_blank" className="bg-amber-500 text-black px-3 py-1 rounded-full font-bold text-xs md:text-sm hover:bg-amber-400 transition">
            Cart 🛍️
          </Link>
        </div>
      </header>

      {/* Slide Category Menu */}
      {showCategory && (
        <div className="absolute top-14 left-0 w-full sm:w-80 z-50 shadow-2xl">
          <CategoryMenu />
        </div>
      )}

      {/* Main Grid Section */}
      <main className="p-4 md:p-8 max-w-7xl mx-auto">
        <h1 className="text-xl md:text-3xl font-serif text-amber-300 font-bold mb-1">Featured Creations</h1>
        <p className="text-zinc-400 text-xs md:text-sm mb-6">Handcrafted pieces studded with certified gemstones</p>

        {/* Mobile First 2-Column Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {products.map((prod) => (
            <div key={prod.id} className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-3 hover:border-amber-500/40 transition flex flex-col justify-between">
              <div>
                <div className="h-36 sm:h-44 bg-zinc-800/60 rounded mb-2 flex items-center justify-center text-zinc-500 text-xs text-center p-2">
                  [ Lightweight Preview ]
                </div>
                <h3 className="text-xs md:text-sm font-semibold text-amber-100 mb-1 line-clamp-2">{prod.name}</h3>
              </div>

              <div className="mt-2">
                <div className="flex items-baseline gap-1.5 flex-wrap mb-2">
                  <span className="text-sm md:text-base text-amber-400 font-bold">₹{prod.price.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] md:text-xs text-zinc-500 line-through">₹{prod.orig.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] text-emerald-400 font-bold">({prod.discount}% OFF)</span>
                </div>
                <Link
                  href={`/product/${prod.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center w-full bg-amber-500/10 hover:bg-amber-500 hover:text-black text-amber-400 font-semibold py-1.5 rounded text-[11px] md:text-xs transition border border-amber-500/30"
                >
                  Buy Now ↗
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
