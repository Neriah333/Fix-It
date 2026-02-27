"use client";
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data); // THIS UPDATES THE NAVBAR
        onClose();
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-[400px] bg-[#1A282D] rounded-3xl p-8 border border-[#2D3739]">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:bg-[#2D3739] rounded-full">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold text-white mb-6">Log In</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input type="email" placeholder="Email" required className="w-full bg-[#2A3C42] text-white p-3.5 rounded-2xl outline-none border border-transparent focus:border-gray-500" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required className="w-full bg-[#2A3C42] text-white p-3.5 rounded-2xl outline-none border border-transparent focus:border-gray-500" onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="w-full bg-[#D7DADC] text-black font-bold py-3 rounded-full mt-4 hover:bg-white transition">Log In</button>
        </form>
      </div>
    </div>
  );
}