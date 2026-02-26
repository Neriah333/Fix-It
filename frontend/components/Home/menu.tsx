import React from 'react';
import { Home, ArrowUpRight, BarChart2, Gamepad2, Users, Info, Shield, Hammer } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active = false }: any) => (
  <div className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-colors ${
    active ? 'bg-[#2D3739] text-white' : 'text-gray-400 hover:bg-[#263235] hover:text-white'
  }`}>
    <Icon className="w-5 h-5" />
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const SidebarSection = ({ title, children }: any) => (
  <div className="mt-4 pb-4 border-b border-[#2D3739]">
    {title && <h3 className="px-4 mb-2 text-xs font-bold text-gray-500 uppercase tracking-wider">{title}</h3>}
    {children}
  </div>
);

const Sidebar = () => {
  return (
    <aside className="w-64 h-[calc(100vh-56px)] sticky top-[56px] bg-[#1A282D] overflow-y-auto hidden lg:block border-r border-[#2D3739]">
      <div className="py-2">
        {/* Main Navigation */}
        <SidebarSection>
          <SidebarItem icon={Home} label="Home" active />
          <SidebarItem icon={ArrowUpRight} label="Popular" />
          <SidebarItem icon={BarChart2} label="All" />
        </SidebarSection>

        {/* Custom Feeds / Recent */}
        <SidebarSection title="Recent">
          <SidebarItem icon={Users} label="opening/Startups" />
        </SidebarSection>

        {/* Communities */}
        <SidebarSection title="Communities">
          <SidebarItem icon={Users} label="Create Community" />
          <SidebarItem icon={Users} label="Networking" />
          <SidebarItem icon={Users} label="Hardware" />
          <SidebarItem icon={Users} label="Software" />
          <SidebarItem icon={Users} label="AI" />
          <SidebarItem icon={Users} label="Security" />
        </SidebarSection>

        {/* Resources */}
        <SidebarSection title="Resources">
          <SidebarItem icon={Info} label="About" />
          <SidebarItem icon={Shield} label="Content Policy" />
          <SidebarItem icon={Hammer} label="Help Center" />
        </SidebarSection>
      </div>
    </aside>
  );
};

export default Sidebar;