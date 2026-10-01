'use client';
import React from 'react';

export default function VRTryOnModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-amber-500/40 w-full max-w-lg p-6 rounded-2xl relative shadow-2xl text-center">
        <button onClick={onClose} className="absolute top-3 right-4 text-zinc-400 hover:text-white text-xl font-bold">✕</button>
        <h3 className="text-xl font-serif font-bold text-amber-400 mb-2">✨ Virtual AR Try-On</h3>
        <p className="text-xs text-zinc-400 mb-4">Allow camera access to virtually try on this luxury jewellery piece</p>
        
        <div className="w-full h-64 bg-zinc-950 rounded-xl border border-dashed border-amber-500/30 flex flex-col items-center justify-center p-4">
          <div className="w-20 h-20 rounded-full border-2 border-amber-400 flex items-center justify-center text-3xl mb-2 animate-pulse">📷</div>
          <p className="text-xs text-zinc-300 font-semibold">Camera Access Requesting...</p>
          <span className="text-[10px] text-zinc-500 mt-1">Live Face Detection & Gemstone Overlay Engine</span>
        </div>

        <button onClick={onClose} className="mt-4 w-full bg-amber-500 text-black font-bold py-2 rounded text-xs hover:bg-amber-400 transition">
          Close Virtual Camera
        </button>
      </div>
    </div>
  );
}
