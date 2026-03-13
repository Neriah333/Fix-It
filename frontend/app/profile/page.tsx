"use client";
import React, { useEffect, useState } from "react";
import { User, Mail, Phone, MapPin, Wrench, ChevronRight, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const auth = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Account");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }
      } catch (err) {
        console.error("Error loading profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-white" /></div>;

  return (
    <div className="min-h-screen bg-[#030303] text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-[#2D3739] mb-8 overflow-x-auto">
          {["Account", "Profile", "Privacy", "Preferences"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} 
              className={`pb-2 whitespace-nowrap ${activeTab === tab ? "border-b-2 border-white text-white" : "text-gray-500"}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Profile Content */}
        <div className="space-y-8">
          <section>
            <h2 className="text-gray-400 font-bold mb-4">Profile Overview</h2>
            <div className="bg-[#0B1416] rounded-lg border border-[#2D3739] p-6 space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-[#1A282D] flex items-center justify-center border border-[#2D3739]">
                  {profile?.profilePicture ? <img src={profile.profilePicture} className="rounded-full w-full h-full object-cover" /> : <User size={40} />}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{profile?.user?.username || "Username not set"}</h3>
                  <p className="text-sm text-gray-400">{profile?.user?.email}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-bold text-gray-400 uppercase mb-2">About</h4>
                <p className="text-sm bg-[#1A282D] p-4 rounded border border-[#2D3739]">{profile?.bio || "No bio added."}</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-gray-400 font-bold mb-4">Contact Info</h2>
            <div className="bg-[#0B1416] rounded-lg border border-[#2D3739] divide-y divide-[#2D3739]">
              <SettingItem label="Phone" value={profile?.phone || "Not set"} icon={<Phone size={16} />} />
              <SettingItem label="Address" value={profile?.address || "Not set"} icon={<MapPin size={16} />} />
            </div>
          </section>

          <section>
            <h2 className="text-gray-400 font-bold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {profile?.skills?.length > 0 ? profile.skills.map((s: string) => (
                <span key={s} className="flex items-center gap-1 text-xs bg-[#1A282D] px-3 py-1 rounded-full border border-[#2D3739]">
                  <Wrench size={12} /> {s}
                </span>
              )) : <p className="text-sm text-gray-400">No skills added</p>}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function SettingItem({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center p-4 hover:bg-[#1A282D] transition">
      <div className="flex items-center gap-3 text-gray-300">{icon} {label}</div>
      <div className="flex items-center gap-2 text-gray-500 text-sm"><span>{value}</span> <ChevronRight size={16} /></div>
    </div>
  );
}