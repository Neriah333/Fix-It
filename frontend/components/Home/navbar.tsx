"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Plus, MessageSquare, MoreHorizontal, Menu, User, LogOut, Moon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import LoginModal from '../Loginmodal'; 
import SignupModal from '../SignupModal';
import { useAuth } from '@/context/AuthContext'; 

const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-50 flex items-center justify-between bg-[#0B1416] px-4 py-1.5 border-b border-[#2D3739]">
        
        {/* Left Section */}
        <div className="flex items-center gap-2 lg:w-[280px]">
          <div className="p-2 hover:bg-[#2D3739] rounded-full cursor-pointer lg:hidden">
            <Menu className="text-white w-6 h-6" />
          </div>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/icons/logo.png" alt="Logo" width={40} height={40} />
          </Link>
        </div>

        {/* Middle Section */}
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

        {/* Right Section */}
        <div className="flex items-center gap-2 lg:w-[280px] justify-end" ref={dropdownRef}>
          {isLoggedIn ? (
            <div className="flex items-center gap-1">
              <button className="p-2 text-white hover:bg-[#2D3739] rounded-full hidden md:block">
                <MessageSquare className="w-5 h-5" />
              </button>
              <Link href="/submit" title="Create Post">
                <button className="p-2 text-white hover:bg-[#2D3739] rounded-full">
                  <Plus className="w-5 h-5" />
                </button>
              </Link>
              <button className="p-2 text-white hover:bg-[#2D3739] rounded-full mr-2">
                <Bell className="w-5 h-5" />
              </button>
              
              {/* Profile Dropdown */}
              <div className="relative">
                <div 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 p-1 hover:bg-[#2D3739] rounded-md cursor-pointer"
                >
                  <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-sm" />
                  <div className="hidden lg:flex flex-col items-start leading-tight">
                    <span className="text-white text-[11px] font-bold">{user?.username}</span>
                    <span className="text-gray-400 text-[10px]">1 karma</span>
                  </div>
                  <span className="text-white text-[10px] hidden lg:block">▼</span>
                </div>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#1A282D] border border-[#2D3739] rounded-md shadow-xl py-1 z-50">
                    <Link href="/settings" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-[#2D3739] hover:text-white">
                      <User className="w-4 h-4" /> Edit Profile
                    </Link>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-[#2D3739] hover:text-white w-full">
                      <Moon className="w-4 h-4" /> Display Mode
                    </button>
                    <div className="border-t border-[#2D3739] my-1" />
                    <button 
                      onClick={logout}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-[#2D3739] w-full"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button onClick={() => setIsLoginOpen(true)} className="px-4 py-2 text-sm font-bold text-white hover:bg-[#2D3739] rounded-full transition">Log In</button>
              <button onClick={() => setIsSignupOpen(true)} className="px-4 py-2 text-sm font-bold bg-[#D7DADC] text-black hover:bg-white rounded-full transition">Sign Up</button>
              <button className="p-2 text-white hover:bg-[#2D3739] rounded-full"><MoreHorizontal className="w-5 h-5" /></button>
            </div>
          )}
        </div>
      </nav>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
    </>
  );
};

export default Navbar;