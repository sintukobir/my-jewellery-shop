'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function CategoryMenu() {
  const [activeTab, setActiveTab] = useState<'DemiFine' | 'Ethnic'>('DemiFine');

  const categories = {
    DemiFine: [
      { name: 'Combo', count: '33 styles', slug: 'demifine-combo' },
      { name: 'Bracelet', count: '55 styles', slug: 'demifine-bracelets' },
      { name: 'Necklace and Chains', count: '197 styles', slug: 'demifine-necklaces' },
      { name: 'Earrings', count: '139 styles', slug: 'demifine-earrings' },
      { name: 'Ring', count: '51 styles', slug: 'demifine-rings' },
      { name: 'Anklet', count: '6 styles', slug: 'demifine-anklets' }
    ],
    Ethnic: [
      { name: 'Jewellery Set', count: '1,300+ styles', slug: 'ethnic-sets' },
      { name: 'Bangles & Bracelets', count: '593 styles', slug: 'ethnic-bangles' },
      { name: 'Rings', count: '230 styles', slug: 'ethnic-rings' },
      { name: 'Earrings', count: '1,400+ styles', slug: 'ethnic-earrings' },
      { name: 'Necklace and Chains', count: '297 styles', slug: 'ethnic-necklaces' },
      { name: 'Hair Accessory', count: '234 styles', slug: 'ethnic-hair' }
    ]
  };

  return (
    <div className="w-80 bg-zinc-900 text-amber-300 p-4 border-r border-amber-500/20 shadow-2xl min-h-screen">
      <div className="flex border-b border-amber-500/30 mb-4">
        <button
          onClick={() => setActiveTab('DemiFine')}
          className={`flex-1 py-2 text-center font-serif text-sm font-bold tracking-wider transition-colors ${
            activeTab === 'DemiFine' ? 'border-b-2 border-amber-400 text-amber-400' : 'text-zinc-400 hover:text-white'
          }`}
        >
          Demi Fine
        </button>
        <button
          onClick={() => setActiveTab('Ethnic')}
          className={`flex-1 py-2 text-center font-serif text-sm font-bold tracking-wider transition-colors ${
            activeTab === 'Ethnic' ? 'border-b-2 border-amber-400 text-amber-400' : 'text-zinc-400 hover:text-white'
          }`}
        >
          Ethnic
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-xs uppercase text-zinc-500 font-bold mb-3 tracking-widest">Shop By Category</h3>
        <div className="space-y-2">
          {categories[activeTab].map((cat, idx) => (
            <Link
              key={idx}
              href={`/category/${cat.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-between items-center p-2 rounded hover:bg-amber-500/10 transition group border border-transparent hover:border-amber-500/30"
            >
              <span className="text-sm font-medium text-amber-100 group-hover:text-amber-400">{cat.name}</span>
              <span className="text-xs text-zinc-500">{cat.count}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-amber-500/20 pt-4 space-y-2">
        <Link href="/store-locator" target="_blank" className="block text-sm text-zinc-300 hover:text-amber-400 py-1">📍 Store Locator</Link>
        <Link href="/track-package" target="_blank" className="block text-sm text-zinc-300 hover:text-amber-400 py-1">📦 Track Package</Link>
        <Link href="/return-exchange" target="_blank" className="block text-sm text-zinc-300 hover:text-amber-400 py-1">🔄 Return & Exchange</Link>
        <Link href="/contact-us" target="_blank" className="block text-sm text-zinc-300 hover:text-amber-400 py-1">📞 Contact Us</Link>
      </div>
    </div>
  );
}
