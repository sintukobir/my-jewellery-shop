'use client';
import React, { useState } from 'react';
import { saveUser } from '@/lib/storage';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [fullName, setFullName] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !dob || !address) {
      alert('Please fill out all credentials: Phone, Date of Birth, and Address');
      return;
    }
    saveUser({ phone, dob, address, fullName: fullName || 'Valued Customer', email: '' });
    alert('Credentials saved successfully!');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-black text-amber-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-zinc-900 border border-amber-500/30 p-8 rounded-xl shadow-2xl">
        <h2 className="text-2xl font-serif text-amber-400 font-bold text-center mb-6">Login / Sign Up</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs uppercase text-zinc-400 font-bold mb-1">Full Name</label>
            <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:border-amber-400 outline-none" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-xs uppercase text-zinc-400 font-bold mb-1">Phone Number</label>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:border-amber-400 outline-none" placeholder="+91 9876543210" />
          </div>
          <div>
            <label className="block text-xs uppercase text-zinc-400 font-bold mb-1">Date of Birth</label>
            <input type="date" value={dob} onChange={e => setDob(e.target.value)} required className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:border-amber-400 outline-none" />
          </div>
          <div>
            <label className="block text-xs uppercase text-zinc-400 font-bold mb-1">Shipping Address</label>
            <textarea value={address} onChange={e => setAddress(e.target.value)} required className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:border-amber-400 outline-none h-24" placeholder="Full Home Address with Pincode" />
          </div>
          <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 rounded transition uppercase tracking-wider">
            Save Credentials & Continue
          </button>
        </form>
      </div>
    </div>
  );
}
