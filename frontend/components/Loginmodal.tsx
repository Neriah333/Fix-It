"use client";
import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null; // Don't render anything if it's closed

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      {/* Modal Container */}
      <div className="relative w-full max-w-[400px] bg-[#1A282D] rounded-3xl p-8 border border-[#2D3739] shadow-2xl">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:bg-[#2D3739] rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-2">Log In</h2>
        <p className="text-gray-400 text-sm mb-6">
          By continuing, you agree to our User Agreement and Privacy Policy.
        </p>

        <form className="flex flex-col gap-3">
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full bg-[#2A3C42] text-white p-3.5 rounded-2xl outline-none border border-transparent focus:border-gray-500 transition"
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full bg-[#2A3C42] text-white p-3.5 rounded-2xl outline-none border border-transparent focus:border-gray-500 transition"
          />
          
          <button 
            type="submit"
            className="w-full bg-[#D7DADC] text-black font-bold py-3 rounded-full mt-4 hover:bg-white transition"
          >
            Log In
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-gray-400 text-sm">New to Fix It? </span>
          <button className="text-blue-400 text-sm font-bold hover:underline">Sign Up</button>
        </div>
      </div>
    </div>
  );
}