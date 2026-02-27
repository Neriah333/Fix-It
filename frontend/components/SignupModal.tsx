"use client";
import React, { useState } from 'react';

export default function SignupModal({ isOpen, onClose }: any) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // New State

  if (!isOpen) return null;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Client-side Validation
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return; // Stop the function here
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, confirmPassword }), // We don't need to send confirmPassword to the DB
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account created successfully!");
        onClose();
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Connection error:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
      <div className="bg-[#1A282D] p-8 rounded-3xl w-full max-w-md border border-[#2D3739]">
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <h2 className="text-white text-2xl font-bold">Sign Up</h2>
          
          <input 
            type="text" 
            placeholder="Username" 
            required
            className="p-3 rounded-xl bg-[#2A3C42] text-white outline-none border border-transparent focus:border-gray-500"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input 
            type="email" 
            placeholder="Email" 
            required
            className="p-3 rounded-xl bg-[#2A3C42] text-white outline-none border border-transparent focus:border-gray-500"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            required
            className="p-3 rounded-xl bg-[#2A3C42] text-white outline-none border border-transparent focus:border-gray-500"
            onChange={(e) => setPassword(e.target.value)}
          />
          
          {/* New Confirm Password Input */}
          <input 
            type="password" 
            placeholder="Confirm Password" 
            required
            className={`p-3 rounded-xl bg-[#2A3C42] text-white outline-none border transition-all ${
              confirmPassword && password !== confirmPassword 
                ? 'border-red-500' 
                : 'border-transparent focus:border-gray-500'
            }`}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {confirmPassword && password !== confirmPassword && (
            <p className="text-red-500 text-xs px-1">Passwords must match</p>
          )}

          <button 
            type="submit" 
            className="bg-[#D7DADC] text-black font-bold p-3 rounded-full mt-2 hover:bg-white transition-colors"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}