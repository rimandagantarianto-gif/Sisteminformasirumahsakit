import React from 'react';
import { LayoutDashboard, Stethoscope, BarChart3, Search, Activity } from 'lucide-react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: AppView.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: AppView.CLINICAL, label: 'Clinical AI', icon: Stethoscope },
    { id: AppView.FINANCIAL, label: 'Financials', icon: BarChart3 },
    { id: AppView.SEARCH, label: 'Data Search', icon: Search },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 shadow-xl z-20">
      <div className="p-6 flex items-center gap-3 border-b border-slate-700">
        <div className="bg-teal-500 p-2 rounded-lg">
          <Activity className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-xl tracking-tight">SCHOA</h1>
          <p className="text-xs text-slate-400">Smart Hospital OS</p>
        </div>
      </div>
      
      <nav className="flex-1 py-6 px-3 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
              currentView === item.id
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon className={`w-5 h-5 ${currentView === item.id ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
            DR
          </div>
          <div>
            <p className="text-sm font-medium text-white">Dr. A. Fauzi</p>
            <p className="text-xs text-slate-400">Chief Medical Officer</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
