import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CategoryMenu from '@/components/navigation/CategoryMenu';
import { getAllProducts } from '@/lib/cms';

export default function Home() {
  const cmsProducts = getAllProducts();

  const fallbackProducts = cmsProducts.length > 0 ? cmsProducts : [
    {
      id: '1',
      title: 'Gold Plated Short Necklace Set1,149',
      price: 1200,
      original_price: 2500,
      category: 'Necklace',
      image: '/media/gold-necklace.jpg',
      stock: 10,
      description: ''
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative font-sans">
      <header className="px-4 md:px-8 py-3 bg-zinc-950 border-b border-amber-500/20 flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link href="/" target="_blank" rel="noopener noreferrer" className="text-lg md:text-2xl font-serif font-bold text-amber-400">✨ RUMES LUXURY</Link>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <Link href="/cart" target="_blank" rel="noopener noreferrer" className="bg-amber-500 text-black px-3 py-1 rounded font-bold">Cart 🛍️</Link>
          <Link href="/auth/login" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-amber-400">Login</Link>
          <Link href="/auth/signup" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">Sign Up</Link>
        </div>
      </header>

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-64 bg-zinc-950 border-r border-zinc-800 p-4">
          <CategoryMenu />
        </div>

        <main className="flex-1 p-4 md:p-8 max-w-7xl">
          <h1 className="text-xl md:text-3xl font-serif text-amber-300 font-bold mb-1">Catalog Products</h1>
          <p className="text-zinc-400 text-xs mb-6">Live Synced with PagesCMS Content</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {fallbackProducts.map((prod) => (
              <div key={prod.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 flex flex-col justify-between hover:border-amber-500/40 transition">
                <div>
                  <div className="h-48 w-full bg-zinc-800 rounded mb-3 overflow-hidden relative border border-zinc-700/50">
                    <img 
                      src={prod.image || '/media/placeholder.jpg'} 
                      alt={prod.title} 
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />
                  </div>
                  <h3 className="text-xs font-semibold text-amber-100 mb-1 line-clamp-2">{prod.title}</h3>
                  <p className="text-[10px] text-zinc-400 mb-2">{prod.category}</p>
                </div>

                <div className="mt-2">
                  <div className="flex items-baseline gap-1.5 mb-2">
                    <span className="text-sm text-amber-400 font-bold">₹{prod.price}</span>
                    {prod.original_price && <span className="text-[10px] text-zinc-500 line-through">₹{prod.original_price}</span>}
                  </div>
                  <Link href={`/product/${prod.id}`} target="_blank" rel="noopener noreferrer" className="block text-center w-full bg-amber-500/10 hover:bg-amber-500 hover:text-black text-amber-400 font-semibold py-1.5 rounded text-xs transition border border-amber-500/30">
                    View Details & VR ↗
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
