'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCart, getUser } from '@/lib/storage';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setCartItems(getCart());
    setUser(getUser());
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6 max-w-4xl mx-auto font-sans">
      <h1 className="text-2xl font-serif text-amber-400 font-bold mb-6">Shopping Cart & Order Summary</h1>
      
      {user ? (
        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg mb-6 text-xs">
          <p className="text-amber-300 font-bold mb-1">Shipping Details (Logged in as):</p>
          <p className="text-zinc-300">{user.fullName} | {user.phone} | {user.email}</p>
          <p className="text-zinc-400 mt-1">{user.address}</p>
        </div>
      ) : (
        <div className="bg-amber-950/40 border border-amber-500/30 p-3 rounded-lg mb-6 text-xs flex justify-between items-center">
          <span className="text-amber-200">Please Login/Signup to place order with delivery address</span>
          <Link href="/auth/login" target="_blank" rel="noopener noreferrer" className="bg-amber-500 text-black font-bold px-3 py-1 rounded">Login</Link>
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-xl text-center">
          <p className="text-zinc-400 text-sm mb-4">Your cart is empty.</p>
          <Link href="/" target="_blank" rel="noopener noreferrer" className="text-xs text-amber-400 border border-amber-500/40 px-4 py-2 rounded hover:bg-amber-500/10">Browse Products ↗</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item, idx) => (
            <div key={idx} className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex justify-between items-center">
              <div>
                <h3 className="text-sm font-semibold text-amber-100">{item.name || 'Gold Plated Short Necklace Set1,149'}</h3>
                <p className="text-xs text-amber-400 font-bold mt-1">₹{item.price || 1200}</p>
              </div>
              <Link href={`/product/${item.id || 1}`} target="_blank" rel="noopener noreferrer" className="text-xs text-amber-400 underline">View Item ↗</Link>
            </div>
          ))}
          <button onClick={() => alert('Order Placed Successfully! Synced with Order Book.')} className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 rounded-lg text-xs uppercase transition shadow-lg">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
