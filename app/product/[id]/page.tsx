'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function ProductPage({ params }: { params: { id: string } }) {
  const [addedToCart, setAddedToCart] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [selectedQty, setSelectedQty] = useState(1);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const handleBuyNow = () => {
    setOrderPlaced(true);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 font-sans">
      {/* Top Breadcrumb & Back */}
      <div className="max-w-7xl mx-auto mb-4 text-xs text-zinc-400">
        <Link href="/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400">Home</Link> / 
        <span className="text-zinc-200 ml-1">Royal Heritage Collection #{params.id}</span>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 bg-zinc-950 p-6 rounded-xl border border-zinc-800">
        
        {/* Left: Image Gallery Side */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="w-full h-80 md:h-96 bg-zinc-900 border border-amber-500/30 rounded-xl flex items-center justify-center text-amber-400 font-serif text-lg">
            ✨ [ Premium Product View ]
          </div>
          <p className="text-xs text-zinc-500 mt-2">Click image to inspect handcrafted details</p>
        </div>

        {/* Middle: Product Details */}
        <div className="md:col-span-4 flex flex-col gap-3">
          <h1 className="text-xl md:text-2xl font-serif text-amber-300 font-bold">Royal Heritage Collection #{params.id}</h1>
          <p className="text-xs text-zinc-400">Brand: <span className="text-amber-400 font-semibold">RUMES LUXURY</span></p>
          
          <div className="border-t border-b border-zinc-800 py-3 my-1">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-amber-400">₹309</span>
              <span className="text-sm text-zinc-500 line-through">₹999</span>
              <span className="text-xs text-emerald-400 font-bold">(-69% OFF)</span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">Inclusive of all taxes</p>
          </div>

          <div className="bg-zinc-900/90 p-3 rounded-lg border border-zinc-800 text-xs">
            <p className="text-emerald-400 font-semibold mb-1">📍 Delivering to Kolkata 700001</p>
            <p className="text-zinc-300">FREE delivery <span className="font-bold text-white">Friday, Oct 9, 2026</span> (In 7 Days)</p>
          </div>

          <div className="text-xs text-zinc-300 space-y-1">
            <p>✅ 100% Certified Hallmark Gold & Gemstones</p>
            <p>🔄 7 Days Return & Exchange Policy</p>
            <p>🛡️ Secure Bank Encryption Guaranteed</p>
          </div>
        </div>

        {/* Right: Amazon Buy Box (Yellow / Amber Colors) */}
        <div className="md:col-span-3 bg-zinc-900 p-5 rounded-xl border border-zinc-800 flex flex-col justify-between">
          <div>
            <div className="text-lg font-bold text-amber-400 mb-1">₹309.00</div>
            <p className="text-xs text-emerald-400 font-semibold mb-3">In Stock</p>

            <div className="mb-4">
              <label className="text-xs text-zinc-400 block mb-1">Quantity:</label>
              <select 
                value={selectedQty}
                onChange={(e) => setSelectedQty(Number(e.target.value))}
                className="bg-zinc-800 text-white text-xs p-2 rounded w-full border border-zinc-700"
              >
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>

            {/* Notification Messages without Redirecting */}
            {addedToCart && (
              <div className="bg-emerald-950 text-emerald-300 border border-emerald-500/50 text-xs p-2 rounded mb-3 text-center animate-pulse">
                ✓ Added to Cart!
              </div>
            )}

            {orderPlaced && (
              <div className="bg-amber-950 text-amber-300 border border-amber-500/50 text-xs p-3 rounded mb-3 text-center font-semibold">
                🎉 Order Processed Successfully!
              </div>
            )}

            {/* Amazon-like Colors */}
            <button 
              onClick={handleAddToCart}
              className="w-full bg-amber-400 hover:bg-amber-500 text-black font-bold py-2.5 rounded-full text-xs transition mb-2 shadow"
            >
              Add to Cart
            </button>

            <button 
              onClick={handleBuyNow}
              className="w-full bg-amber-600 hover:bg-amber-700 text-black font-bold py-2.5 rounded-full text-xs transition shadow"
            >
              Buy Now
            </button>
          </div>

          <div className="text-[11px] text-zinc-500 text-center mt-4">
            Ships from <span className="text-zinc-300">RUMES LUXURY</span>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <div className="max-w-7xl mx-auto mt-10">
        <h2 className="text-lg font-serif text-amber-300 font-bold mb-4">Similar Products You May Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[101, 102, 103, 104].map((id) => (
            <Link key={id} href={`/product/${id}`} target="_blank" rel="noopener noreferrer" className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 hover:border-amber-500/40 transition block">
              <div className="h-32 bg-zinc-900 rounded mb-2 flex items-center justify-center text-xs text-zinc-600">Item #{id}</div>
              <p className="text-xs text-zinc-300 font-semibold">Royal Gold Item - Variant</p>
              <p className="text-xs text-amber-400 font-bold mt-1">₹2,200</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
