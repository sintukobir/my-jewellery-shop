'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import CategoryMenu from '@/components/navigation/CategoryMenu';

export default function Home() {
  const [showCategory, setShowCategory] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Top Banner Bar */}
      <div className="bg-amber-950 text-amber-200 text-xs py-2 px-4 flex justify-between items-center border-b border-amber-900/50">
        <div>BUY 1 GET 1 FREE | SITEWIDE</div>
        <div className="flex gap-4">
          <Link href="/store-locator" target="_blank" className="hover:text-white">Store Locator</Link>
          <Link href="/track-package" target="_blank" className="hover:text-white">Track Package</Link>
          <Link href="/return-exchange" target="_blank" className="hover:text-white">Return & Exchange</Link>
          <Link href="/contact-us" target="_blank" className="hover:text-white">Contact Us</Link>
        </div>
      </div>

      {/* Main Header / Navbar */}
      <header className="px-8 py-4 bg-zinc-950 border-b border-amber-500/20 flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setShowCategory(!showCategory)}
            className="text-amber-400 border border-amber-500/40 px-3 py-1.5 rounded text-sm hover:bg-amber-500/10 transition"
          >
            ☰ Shop By Category
          </button>
          <Link href="/" className="text-2xl font-serif font-bold text-amber-400 tracking-wider">
            ✨ RUMES LUXURY
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/auth/login" target="_blank" className="text-sm text-zinc-300 hover:text-amber-400">
            Login / Sign Up
          </Link>
          <Link href="/product/1" target="_blank" className="bg-amber-500 text-black px-4 py-1.5 rounded font-bold text-sm hover:bg-amber-400 transition">
            Cart 🛍️
          </Link>
        </div>
      </header>

      {/* Slide-out Category Sidebar */}
      {showCategory && (
        <div className="absolute top-20 left-0 z-50">
          <CategoryMenu />
        </div>
      )}

      {/* Hero / Featured Creations Section */}
      <main className="p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-serif text-amber-300 font-bold mb-2">Featured Creations</h1>
        <p className="text-zinc-400 text-sm mb-8">Handcrafted pieces studded with certified gemstones</p>

        {/* Amazon & Rubans Combined Style Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { id: '1', name: 'Royal Heritage Diamond Necklace', price: '₹4,500', orig: '₹8,999' },
            { id: '2', name: 'Aura Emerald Drop Earrings', price: '₹2,200', orig: '₹4,400' },
            { id: '3', name: 'Solitaire Cushion Diamond Ring', price: '₹3,800', orig: '₹7,600' },
            { id: '4', name: 'Celestial Ruby Bracelet', price: '₹2,900', orig: '₹5,800' }
          ].map((prod) => (
            <div key={prod.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-amber-500/40 transition group">
              <div className="h-48 bg-zinc-800 rounded-lg mb-4 flex items-center justify-center text-zinc-500 group-hover:text-amber-400">
                [ Product Image ]
              </div>
              <h3 className="text-sm font-semibold text-amber-100 group-hover:text-amber-300 mb-1 line-clamp-1">{prod.name}</h3>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-amber-400 font-bold">{prod.price}</span>
                <span className="text-xs text-zinc-500 line-through">{prod.orig}</span>
              </div>
              <Link
                href={`/product/${prod.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center w-full bg-amber-500/10 hover:bg-amber-500 hover:text-black text-amber-400 font-semibold py-2 rounded text-xs transition border border-amber-500/30"
              >
                View Product & Buy ↗
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
