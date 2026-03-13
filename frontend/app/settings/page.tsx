"use client";
import React, { useState, useEffect } from 'react';
import { Camera, Save, User, Mail, MapPin, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from "next/navigation";

const SettingsPage = () => {
  
  const auth = useAuth(); // Don't destructure yet
  const router = useRouter();

  // If useAuth returns null, or while loading
  if (!auth) return <div>Loading...</div>;

  const { user } = auth; // Now it's safe to destructure
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  
  const [formData, setFormData] = useState({
    bio: '',
    phone: '',
    address: '',
    theme: 'dark',
    skills: [] as string[]
  });

  // 1. Fetch Profile on Load
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('http://localhost:5000/api/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        }); 
        // Adjust to your actual API endpoint
        const data = await res.json();
        if (res.ok && data) {
          setFormData({
            bio: data.bio || '',
            phone: data.phone || '',
            address: data.address || '',
            theme: data.preferences?.theme || 'dark',
            skills: data.skills || []
          });
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    };
    fetchProfile();
  }, []);

  // 2. Handle Update
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setStatus('saving');

    const token = localStorage.getItem('token'); 

    const payload = {
      bio: formData.bio,
      phone: formData.phone,
      address: formData.address,
      skills: formData.skills,
      preferences: {
        theme: formData.theme,
        allowNotifications: true
      }
    };

    try {
      const response = await fetch('http://localhost:5000/api/users/update', {
        method: 'PUT', // Matches your updateProfile controller
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
      setStatus('success');

      setTimeout(() => {
        router.push("/profile");
      }, 1000);
    }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-gray-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        
        <form onSubmit={handleSave} className="bg-[#0B1416] border border-[#2D3739] rounded-lg overflow-hidden">
          <div className="p-6 space-y-6">
            
            {/* Bio Section */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">About (Bio)</label>
              <textarea 
                maxLength={250}
                rows={3}
                className="w-full bg-[#1A282D] border border-[#2D3739] rounded p-3 text-sm focus:border-orange-500 outline-none transition"
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                placeholder="Brief description..."
              />
              <p className="text-[10px] text-gray-500 mt-1 text-right">{formData.bio.length}/250</p>
            </div>

            {/* Contact Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 text-gray-500" size={16} />
                  <input 
                    type="text" 
                    className="w-full bg-[#1A282D] border border-[#2D3739] rounded pl-10 pr-3 py-2 text-sm outline-none focus:border-gray-500"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 text-gray-500" size={16} />
                  <input 
                    type="text" 
                    className="w-full bg-[#1A282D] border border-[#2D3739] rounded pl-10 pr-3 py-2 text-sm outline-none focus:border-gray-500"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Theme Select */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Display Theme</label>
              <select 
                className="w-full bg-[#1A282D] border border-[#2D3739] rounded p-2 text-sm outline-none appearance-none cursor-pointer"
                value={formData.theme}
                onChange={(e) => setFormData({...formData, theme: e.target.value})}
              >
                <option value="dark">Dark Mode</option>
                <option value="light">Light Mode</option>
              </select>
            </div>
          </div>

          {/* Footer Action */}
          <div className="bg-[#1A282D]/50 border-t border-[#2D3739] p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {status === 'success' && <span className="text-green-500 text-sm flex items-center gap-1"><CheckCircle size={14}/> Saved!</span>}
              {status === 'error' && <span className="text-red-500 text-sm flex items-center gap-1"><AlertCircle size={14}/> Error saving</span>}
            </div>
            <button 
              type="submit"
              disabled={status === 'saving'}
              className="px-6 py-2 bg-[#D7DADC] text-black font-bold rounded-full hover:bg-white transition disabled:opacity-50"
            >
              {status === 'saving' ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;