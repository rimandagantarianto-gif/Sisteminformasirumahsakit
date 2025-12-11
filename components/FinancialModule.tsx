import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { MOCK_FINANCIALS } from '../constants';
import { analyzeFinancialHealth } from '../services/geminiService';
import { Loader2, TrendingUp, DollarSign, PieChart, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const FinancialModule: React.FC = () => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalysis = async () => {
    setAnalyzing(true);
    const result = await analyzeFinancialHealth(MOCK_FINANCIALS);
    setAnalysis(result);
    setAnalyzing(false);
  };

  const totalRevenue = MOCK_FINANCIALS.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalExpenses = MOCK_FINANCIALS.reduce((acc, curr) => acc + curr.expenses, 0);
  const profitMargin = ((totalRevenue - totalExpenses) / totalRevenue) * 100;

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
         <div>
          <h2 className="text-2xl font-bold text-slate-800">Financial Intelligence</h2>
          <p className="text-slate-500">Real-time revenue cycle management & automated reporting.</p>
        </div>
        <button
          onClick={handleAnalysis}
          disabled={analyzing}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors"
        >
          {analyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          AI Audit Report
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 text-sm font-medium">YTD Revenue</h3>
            <div className="bg-green-100 p-2 rounded-lg"><DollarSign className="w-5 h-5 text-green-600" /></div>
          </div>
          <p className="text-3xl font-bold text-slate-800">${(totalRevenue / 1000).toFixed(1)}k</p>
          <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +12% vs last period
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 text-sm font-medium">YTD Expenses</h3>
            <div className="bg-red-100 p-2 rounded-lg"><PieChart className="w-5 h-5 text-red-600" /></div>
          </div>
          <p className="text-3xl font-bold text-slate-800">${(totalExpenses / 1000).toFixed(1)}k</p>
          <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +5% vs last period
          </p>
        </div>

         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 text-sm font-medium">Net Profit Margin</h3>
            <div className="bg-blue-100 p-2 rounded-lg"><ActivityIcon className="w-5 h-5 text-blue-600" /></div>
          </div>
          <p className="text-3xl font-bold text-slate-800">{profitMargin.toFixed(1)}%</p>
          <p className="text-xs text-slate-500 mt-1">Target: >20%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-96">
          <h3 className="font-semibold text-slate-700 mb-6">Revenue vs Expenses (6 Months)</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={MOCK_FINANCIALS}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                cursor={{fill: '#f1f5f9'}}
              />
              <Legend wrapperStyle={{paddingTop: '20px'}} />
              <Bar dataKey="revenue" fill="#0d9488" name="Revenue" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="#f43f5e" name="Expenses" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* AI Analysis Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-96 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-white" />
            <h3 className="font-bold text-white">Gemini Insight</h3>
          </div>
          <div className="p-6 overflow-y-auto flex-1 bg-slate-50">
            {analysis ? (
              <div className="prose prose-sm prose-slate">
                <ReactMarkdown>{analysis}</ReactMarkdown>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center">
                <p>Click "AI Audit Report" to analyze trends and anomalies.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ActivityIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);
