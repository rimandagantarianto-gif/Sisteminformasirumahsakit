import React, { useState } from 'react';
import { summarizeClinicalNote } from '../services/geminiService';
import { Loader2, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const ClinicalModule: React.FC = () => {
  const [note, setNote] = useState('');
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!note.trim()) return;
    setLoading(true);
    setSummary(null);
    const result = await summarizeClinicalNote(note);
    setSummary(result);
    setLoading(false);
  };

  const handleUseExample = () => {
    setNote(`Patient: 45yo male. 
Complaint: "Chest tightness and shortness of breath since this morning."
History: Patient has history of hypertension, non-compliant with meds. Smoker (1 pack/day). 
Vitals: BP 160/95, HR 105, O2 96%.
Exam: Clear lungs, regular rhythm but tachycardic. No edema.
Assessment: Likely hypertensive urgency vs angina. Need ECG and Troponins.`);
  };

  return (
    <div className="p-8 space-y-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Clinical Documentation Assistant</h2>
          <p className="text-slate-500">AI-powered medical scribe and summarization tool.</p>
        </div>
        <button 
          onClick={handleUseExample}
          className="text-sm text-teal-600 hover:text-teal-700 font-medium underline"
        >
          Load Example Note
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
            <FileText className="w-4 h-4 text-slate-500" />
            <span className="font-semibold text-slate-700">Raw Physician Notes / Transcript</span>
          </div>
          <div className="p-4 flex-1">
            <textarea
              className="w-full h-[400px] p-4 text-slate-700 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none font-mono text-sm leading-relaxed"
              placeholder="Type or dictate patient notes here..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
            <button
              onClick={handleSummarize}
              disabled={loading || !note}
              className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
              {loading ? 'Processing with Gemini...' : 'Generate Clinical Summary'}
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
           <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
            <span className="font-semibold text-indigo-900">AI Generated H&P / AVS</span>
          </div>
          <div className="p-6 flex-1 overflow-y-auto h-[400px] bg-slate-50/50">
            {summary ? (
              <div className="prose prose-sm prose-slate max-w-none">
                <ReactMarkdown>{summary}</ReactMarkdown>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400">
                <FileText className="w-12 h-12 mb-3 opacity-20" />
                <p>Waiting for input data...</p>
              </div>
            )}
          </div>
          <div className="p-3 bg-amber-50 border-t border-amber-100 text-amber-800 text-xs flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <p>
              <strong>Disclaimer:</strong> AI outputs are for administrative assistance only. 
              Review all generated text for accuracy. Not a substitute for professional medical diagnosis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
