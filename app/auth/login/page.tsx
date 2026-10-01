'use client';
import React from 'react';
import Link from 'next/link';

export default function Login() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Logged in successfully!');
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="bg-zinc-950 border border-amber-500/30 p-8 rounded-xl max-w-md w-full shadow-2xl">
        <h1 className="text-2xl font-serif text-amber-400 font-bold text-center mb-6">Login to Account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-zinc-400 block mb-1">Email or Phone Number *</label>
            <input required type="text" placeholder="Enter email or phone" className="w-full bg-zinc-900 border border-zinc-800 p-2.5 rounded text-xs text-white focus:border-amber-500 outline-none" />
          </div>
          <div>
            <label className="text-xs text-zinc-400 block mb-1">Password *</label>
            <input required type="password" placeholder="••••••••" className="w-full bg-zinc-900 border border-zinc-800 p-2.5 rounded text-xs text-white focus:border-amber-500 outline-none" />
          </div>
          <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-2.5 rounded text-xs transition">LOGIN</button>
        </form>
        <p className="text-xs text-zinc-400 text-center mt-6">
          New customer? <Link href="/auth/signup" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">Create a new account</Link>
        </p>
      </div>
    </div>
  );
}
