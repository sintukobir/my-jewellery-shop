'use client';
import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import { X } from 'lucide-react';

interface VRTryOnProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

export default function VRTryOnModal({ isOpen, onClose, productName }: VRTryOnProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    let detector: faceLandmarksDetection.FaceLandmarksDetector;
    let animId: number;

    const setupAR = async () => {
      await tf.ready();
      detector = await faceLandmarksDetection.createDetector(
        faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
        { runtime: 'tfjs', refineLandmarks: true }
      );

      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          setLoading(false);
          detectFace();
        };
      }
    };

    const detectFace = async () => {
      if (videoRef.current && canvasRef.current && detector) {
        const faces = await detector.estimateFaces(videoRef.current);
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          if (faces.length > 0) {
            const keypoints = faces[0].keypoints;
            const leftEar = keypoints[132];
            const rightEar = keypoints[361];

            ctx.fillStyle = '#D4AF37';
            ctx.beginPath();
            ctx.arc(leftEar.x, leftEar.y + 15, 8, 0, 2 * Math.PI);
            ctx.arc(rightEar.x, rightEar.y + 15, 8, 0, 2 * Math.PI);
            ctx.fill();
          }
        }
      }
      animId = requestAnimationFrame(detectFace);
    };

    setupAR();

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="relative w-full max-w-2xl bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-amber-500/30">
        <div className="flex justify-between items-center p-4 border-b border-zinc-800">
          <h3 className="text-xl font-semibold text-amber-400">Virtual Try-On: {productName}</h3>
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-white transition">
            <X size={24} />
          </button>
        </div>
        <div className="relative aspect-video bg-black flex items-center justify-center">
          {loading && <p className="text-amber-300 animate-pulse">Initializing AR Camera & AI Model...</p>}
          <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover transform -scale-x-100" />
          <canvas ref={canvasRef} width={640} height={480} className="absolute inset-0 w-full h-full object-cover transform -scale-x-100" />
        </div>
      </div>
    </div>
  );
}
