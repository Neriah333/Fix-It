import React from 'react';
import { Search, Bell, Plus, MessageSquare, Menu, SearchCode } from 'lucide-react';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-[#0B1416] px-4 py-1.5 border-b border-[#2D3739]">
      
      {/* 1. Left Section: Logo & Brand */}
      <div className="flex items-center gap-2 lg:w-[280px]">
        <div className="p-2 hover:bg-[#2D3739] rounded-full cursor-pointer lg:hidden">
          <Menu className="text-white w-6 h-6" />
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <Image
            src="/icons/logo.png"
            alt="Reddit Logo"
            width={50}
            height={50}
          />
          
        </div>
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
            className="w-full bg-[#2A3C42] text-gray-100 text-sm rounded-full py-2 pl-10 pr-4 outline-none border border-slate-400 focus:border-gray-500 focus:bg-[#1A282D] transition-all"
          />
        </div>
      </div>

      {/* 3. Right Section: Icons & Profile */}
      <div className="flex items-center gap-1 lg:w-[280px] justify-end">
        <button className="p-2 text-white hover:bg-[#2D3739] rounded-full hidden md:block">
          <MessageSquare className="w-5 h-5" />
        </button>
        <button className="p-2 text-white hover:bg-[#2D3739] rounded-full">
          <Plus className="w-5 h-5" />
        </button>
        <button className="p-2 text-white hover:bg-[#2D3739] rounded-full mr-2">
          <Bell className="w-5 h-5" />
        </button>
        
        {/* Profile Dropdown Placeholder */}
        <div className="flex items-center gap-1 p-1 hover:bg-[#2D3739] rounded-md cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-sm" />
          <span className="text-white text-xs hidden lg:block">▼</span>
        </div>
      </div>
      
    </nav>
  );
};

export default Navbar;