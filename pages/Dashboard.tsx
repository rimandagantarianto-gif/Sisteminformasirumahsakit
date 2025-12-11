import React from 'react';
import { MOCK_PATIENTS, MOCK_FINANCIALS } from '../constants';
import { Users, AlertCircle, DollarSign, CalendarCheck } from 'lucide-react';
import { AppView } from '../types';

interface DashboardProps {
    onChangeView: (view: AppView) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onChangeView }) => {
    const activePatients = MOCK_PATIENTS.filter(p => p.status === 'active').length;
    const criticalPatients = MOCK_PATIENTS.filter(p => p.status === 'critical').length;
    const currentRevenue = MOCK_FINANCIALS[MOCK_FINANCIALS.length - 1].revenue;

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Hospital Overview</h1>
                <p className="text-slate-500">Welcome back, Dr. Fauzi. Here is today's operational summary.</p>
            </header>

            {/* Top Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <MetricCard 
                    title="Active Patients" 
                    value={activePatients.toString()} 
                    icon={Users} 
                    color="bg-blue-500"
                    trend="+2 today"
                />
                <MetricCard 
                    title="Critical Attention" 
                    value={criticalPatients.toString()} 
                    icon={AlertCircle} 
                    color="bg-red-500"
                    trend="Requires action"
                />
                 <MetricCard 
                    title="Monthly Revenue" 
                    value={`$${(currentRevenue/1000).toFixed(0)}k`} 
                    icon={DollarSign} 
                    color="bg-emerald-500"
                    trend="+12% vs avg"
                />
                 <MetricCard 
                    title="Appointments" 
                    value="42" 
                    icon={CalendarCheck} 
                    color="bg-purple-500"
                    trend="8 remaining"
                />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                    onClick={() => onChangeView(AppView.CLINICAL)}
                    className="group bg-white p-6 rounded-xl shadow-sm border border-slate-200 cursor-pointer hover:border-teal-500 transition-all hover:shadow-md"
                >
                    <div className="w-12 h-12 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="M9 15h6"/></svg>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-1">New Clinical Note</h3>
                    <p className="text-slate-500 text-sm">Draft a new H&P or SOAP note using AI assistance to summarize symptoms.</p>
                </div>

                <div 
                     onClick={() => onChangeView(AppView.SEARCH)}
                    className="group bg-white p-6 rounded-xl shadow-sm border border-slate-200 cursor-pointer hover:border-indigo-500 transition-all hover:shadow-md"
                >
                    <div className="w-12 h-12 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-1">Patient Search</h3>
                    <p className="text-slate-500 text-sm">Find patients by condition, medication history, or demographics using natural language.</p>
                </div>
            </div>
        </div>
    );
};

const MetricCard = ({ title, value, icon: Icon, color, trend }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
        <div>
            <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
            <span className="text-xs text-slate-400 mt-1 block">{trend}</span>
        </div>
        <div className={`p-3 rounded-full ${color} bg-opacity-10`}>
            <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
    </div>
);
