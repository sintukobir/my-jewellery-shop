'use client';

import React, { useRef, useEffect, useState } from 'react';
import { X, Camera, RefreshCw } from 'lucide-react';

interface VRTryOnProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

export default function VRTryOnModal({ isOpen, onClose, productName }: VRTryOnProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCamera, setHasCamera] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: 1280, height: 720 }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
            setHasCamera(true);
            setLoading(false);
          };
        }
      } catch (err) {
        console.error('Camera access denied or unverified:', err);
        setLoading(false);
        setHasCamera(false);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="relative w-full max-w-2xl bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-amber-500/30">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-zinc-800 bg-zinc-950/50">
          <div className="flex items-center space-x-2">
            <Camera className="text-amber-400 w-5 h-5" />
            <h3 className="text-lg font-serif text-amber-300">Virtual AR Mirror: {productName}</h3>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 text-zinc-400 hover:text-white transition rounded-full hover:bg-zinc-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Video & Overlay Screen */}
        <div className="relative aspect-video bg-zinc-950 flex items-center justify-center overflow-hidden">
          {loading && (
            <div className="flex flex-col items-center space-y-2 text-amber-300 animate-pulse">
              <RefreshCw className="w-8 h-8 animate-spin" />
              <p className="text-sm font-medium">Initializing Live Camera Stream...</p>
            </div>
          )}

          {!loading && !hasCamera && (
            <div className="text-center p-6 space-y-3">
              <p className="text-red-400 text-sm">Unable to access your camera.</p>
              <p className="text-zinc-400 text-xs">Please allow camera permissions in your browser to test the AR Virtual Try-On.</p>
            </div>
          )}

          {/* WebCam Video */}
          <video 
            ref={videoRef} 
            className={`absolute inset-0 w-full h-full object-cover transform -scale-x-100 ${loading ? 'opacity-0' : 'opacity-100'}`} 
            playsInline
          />

          {/* Simulated AR Jewelry Overlay */}
          {!loading && hasCamera && (
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
              <div className="relative w-48 h-48 border-2 border-dashed border-amber-400/40 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-[10px] text-amber-300/80 uppercase tracking-widest bg-black/60 px-2 py-1 rounded">
                  Align Face Here
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-800 text-center">
          <p className="text-xs text-zinc-400">
            ✨ Simulated Live Wear Preview. Position your face in the center guide to inspect proportions.
          </p>
        </div>
      </div>
    </div>
  );
}