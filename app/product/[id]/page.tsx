'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import VRTryOnModal from '@/components/navigation/VRTryOnModal';
import { addToCart, getUser } from '@/lib/storage';

export default function ProductPage({ params }: { params: { id: string } }) {
  const [isVRActive, setIsVRActive] = useState(false);
  const [msg, setMsg] = useState('');
  const user = getUser();

  const handleCart = () => {
    addToCart({ id: params.id, name: 'Gold Plated Short Necklace Set1,149', price: 1200 });
    setMsg('✓ Added to Cart!');
    setTimeout(() => setMsg(''), 3000);
  };

  const handleOrder = () => {
    if (!user) {
      alert('Please Login/Signup first to record order profile details!');
      window.open('/auth/login', '_blank');
      return;
    }
    setMsg('🎉 Order Placed & Synced with Order Book!');
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 font-sans">
      <VRTryOnModal isOpen={isVRActive} onClose={() => setIsVRActive(false)} />

      <div className="max-w-7xl mx-auto mb-4 text-xs text-zinc-400">
        <Link href="/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400">Home</Link> / 
        <span className="text-zinc-200 ml-1">Gold Plated Short Necklace Set1,149 #{params.id}</span>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 bg-zinc-950 p-6 rounded-xl border border-zinc-800">
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="w-full h-80 bg-zinc-900 border border-amber-500/30 rounded-xl flex items-center justify-center text-amber-400 font-serif text-lg">
            ✨ [ Product Image View ]
          </div>
          <button 
            onClick={() => setIsVRActive(true)} 
            className="mt-4 w-full bg-zinc-900 border border-amber-500/50 hover:bg-amber-500/10 text-amber-400 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition"
          >
            👓 Open VR Try-On Camera
          </button>
        </div>

        <div className="md:col-span-4 flex flex-col gap-3">
          <h1 className="text-xl md:text-2xl font-serif text-amber-300 font-bold">Gold Plated Short Necklace Set1,149</h1>
          <p className="text-xs text-zinc-400">Category: <span className="text-amber-400 font-semibold">Necklace</span></p>

          <div className="border-t border-b border-zinc-800 py-3 my-1">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-amber-400">₹1,200</span>
              <span className="text-sm text-zinc-500 line-through">₹2,500</span>
              <span className="text-xs text-emerald-400 font-bold">(52% OFF)</span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">Inclusive of all taxes</p>
          </div>

          <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800 text-xs">
            <p className="text-emerald-400 font-semibold mb-1">📍 Delivery to: {user ? user.address : 'Kolkata 700001'}</p>
            <p className="text-zinc-300">FREE delivery <span className="font-bold text-white">Friday, Oct 9, 2026</span></p>
          </div>
        </div>

        <div className="md:col-span-3 bg-zinc-900 p-5 rounded-xl border border-zinc-800 flex flex-col justify-between">
          <div>
            <div className="text-lg font-bold text-amber-400 mb-1">₹1,200.00</div>
            <p className="text-xs text-emerald-400 font-semibold mb-3">In Stock (Quantity: 10)</p>

            {msg && <div className="bg-emerald-950 text-emerald-300 text-xs p-2 rounded mb-3 text-center border border-emerald-500/40">{msg}</div>}

            <button onClick={handleCart} className="w-full bg-amber-400 hover:bg-amber-500 text-black font-bold py-2.5 rounded-full text-xs transition mb-2 shadow">
              Add to Cart
            </button>
            <button onClick={handleOrder} className="w-full bg-amber-600 hover:bg-amber-700 text-black font-bold py-2.5 rounded-full text-xs transition shadow">
              Buy Now
            </button>
          </div>
          <Link href="/cart" target="_blank" rel="noopener noreferrer" className="text-xs text-center text-amber-400 underline mt-3 block">View Cart Details ↗</Link>
        </div>
      </div>
    </div>
  );
}
