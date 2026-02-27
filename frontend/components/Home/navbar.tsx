"use client";

import React, { useState } from 'react';
import { Search, Bell, Plus, MessageSquare, MoreHorizontal, Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  // Temporary state to simulate login status
  // Switch this to 'true' to see the icons again!
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-[#0B1416] px-4 py-1.5 border-b border-[#2D3739]">
      
      {/* 1. Left Section: Logo */}
      <div className="flex items-center gap-2 lg:w-[280px]">
        <div className="p-2 hover:bg-[#2D3739] rounded-full cursor-pointer lg:hidden">
          <Menu className="text-white w-6 h-6" />
        </div>
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <Image src="/icons/logo.png" alt="Logo" width={40} height={40} />
        </Link>
      </div>

      {/* 2. Middle Section: Search Bar */}
      <div className="flex-1 max-w-[690px] px-4">
        <div className="relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="text-gray-400 w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Find anything"
            className="w-full bg-[#2A3C42] text-gray-100 text-sm rounded-full py-2 pl-10 pr-4 outline-none border border-transparent focus:border-slate-400 focus:bg-[#1A282D] transition-all"
          />
        </div>
      </div>

      {/* 3. Right Section: Conditional Rendering */}
      <div className="flex items-center gap-2 lg:w-[280px] justify-end">
        {isLoggedIn ? (
          /* USER VIEW: Shown only when logged in */
          <>
            <button className="p-2 text-white hover:bg-[#2D3739] rounded-full hidden md:block">
              <MessageSquare className="w-5 h-5" />
            </button>
            <button className="p-2 text-white hover:bg-[#2D3739] rounded-full">
              <Plus className="w-5 h-5" />
            </button>
            <button className="p-2 text-white hover:bg-[#2D3739] rounded-full mr-2">
              <Bell className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1 p-1 hover:bg-[#2D3739] rounded-md cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-sm" />
              <span className="text-white text-xs hidden lg:block">▼</span>
            </div>
          </>
        ) : (
          /* GUEST VIEW: Shown when logged out */
          <div className="flex items-center gap-2">
            <Link 
              href="/login" 
              className="px-4 py-2 text-sm font-bold text-white hover:bg-[#2D3739] rounded-full transition"
            >
              Log In
            </Link>
            <Link 
              href="/signup" 
              className="px-4 py-2 text-sm font-bold bg-[#D7DADC] text-black hover:bg-white rounded-full transition"
            >
              Sign Up
            </Link>
            {/* Simple Menu Icon for extra settings even when logged out */}
            <button className="p-2 text-white hover:bg-[#2D3739] rounded-full">
               <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
      
    </nav>
  );
};

export default Navbar;