'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { saveOrder, getUser } from '@/lib/storage';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [userLocation, setUserLocation] = useState<string>('Detecting location...');
  const [deliveryDate, setDeliveryDate] = useState<string>('');

  useEffect(() => {
    // 7 Days Automatic Delivery Calculation
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    setDeliveryDate(targetDate.toLocaleDateString('en-US', options));

    // Auto Location Detection
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
            const data = await res.json();
            setUserLocation(`${data.city || data.locality}, ${data.principalSubdivision} ${data.postcode || ''}`);
          } catch {
            setUserLocation('Kolkata 700001');
          }
        },
        () => setUserLocation('Kolkata 700001')
      );
    } else {
      setUserLocation('Kolkata 700001');
    }
  }, []);

  const handleBuyNow = () => {
    const user = getUser();
    if (!user) {
      alert('Please Login first to place order!');
      window.location.href = '/auth/login';
      return;
    }

    const newOrder = {
      orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      items: [{ id: params.id, title: 'Luxury Jewellery / Decorative Item', price: 309 }],
      totalAmount: 309,
      deliveryDate: deliveryDate,
      status: 'In Transit',
      address: user.address || userLocation,
      dateCreated: new Date().toISOString()
    };

    saveOrder(newOrder);
    alert(`Order Placed Successfully! Delivery estimated by ${deliveryDate}`);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: Product Image Container */}
        <div className="bg-zinc-900 border border-amber-500/20 p-6 rounded-xl flex items-center justify-center">
          <div className="w-80 h-80 bg-zinc-800 rounded-full flex items-center justify-center text-amber-400 font-serif border-4 border-amber-500/40 shadow-2xl">
            [ Premium Product View ]
          </div>
        </div>

        {/* Right: Buy & Delivery Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-serif font-bold text-amber-300">
            Royal Heritage Collection #{params.id}
          </h1>
          <p className="text-zinc-400 text-sm">Brand: Generic / RUMES LUXURY</p>

          <div className="text-3xl font-bold text-amber-400">₹309 <span className="text-sm text-zinc-500 line-through">₹999</span> (-69%)</div>

          {/* Location & Delivery Info */}
          <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 space-y-2">
            <div className="text-sm text-zinc-300 flex items-center gap-2">
              📍 Delivering to: <span className="font-bold text-amber-300">{userLocation}</span>
            </div>
            <div className="text-sm text-emerald-400 font-semibold">
              FREE delivery <span className="underline">{deliveryDate}</span> (In 7 Days)
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <button onClick={handleBuyNow} className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 rounded-lg shadow-lg uppercase transition">
              Buy Now
            </button>
            <button onClick={handleBuyNow} className="w-full bg-zinc-800 hover:bg-zinc-700 text-amber-300 border border-amber-500/30 font-bold py-3 rounded-lg uppercase transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      <div className="max-w-6xl mx-auto mt-16 border-t border-amber-500/20 pt-8">
        <h2 className="text-2xl font-serif text-amber-400 font-bold mb-6">Similar Products You May Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <Link
              key={item}
              href={`/product/${item + 100}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 hover:border-amber-500/50 transition block group"
            >
              <div className="h-40 bg-zinc-800 rounded mb-3 flex items-center justify-center text-zinc-500 group-hover:text-amber-400">
                Item #{item + 100}
              </div>
              <div className="text-sm text-amber-100 group-hover:text-amber-400 font-medium">Royal Gold Item - Variant {item}</div>
              <div className="text-amber-400 font-bold mt-2">₹2,200</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
