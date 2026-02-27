"use client";
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { X } from 'lucide-react';

export default function SignupModal({ isOpen, onClose }: any) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  if (!isOpen) return null;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, confirmPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data); // THIS UPDATES THE NAVBAR
        onClose();
      } else {
        alert(data.errors ? data.errors.join(", ") : (data.message || "Signup failed"));
      }
    } catch (err) {
      console.error("Connection error:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="relative bg-[#1A282D] p-8 rounded-3xl w-full max-w-md border border-[#2D3739]">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
        </button>
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <h2 className="text-white text-2xl font-bold">Sign Up</h2>
          <input type="text" placeholder="Username" required className="p-3.5 rounded-2xl bg-[#2A3C42] text-white outline-none border border-transparent focus:border-gray-500" onChange={(e) => setUsername(e.target.value)} />
          <input type="email" placeholder="Email" required className="p-3.5 rounded-2xl bg-[#2A3C42] text-white outline-none border border-transparent focus:border-gray-500" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required className="p-3.5 rounded-2xl bg-[#2A3C42] text-white outline-none border border-transparent focus:border-gray-500" onChange={(e) => setPassword(e.target.value)} />
          <input type="password" placeholder="Confirm Password" required className="p-3.5 rounded-2xl bg-[#2A3C42] text-white outline-none border border-transparent focus:border-gray-500" onChange={(e) => setConfirmPassword(e.target.value)} />
          <button type="submit" className="bg-[#D7DADC] text-black font-bold p-3 rounded-full mt-2 hover:bg-white transition-colors">Create Account</button>
        </form>
      </div>
    </div>
  );
}