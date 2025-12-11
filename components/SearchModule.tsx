import React, { useState } from 'react';
import { MOCK_PATIENTS } from '../constants';
import { searchFHIRWithNL } from '../services/geminiService';
import { Patient } from '../types';
import { Search, User, Activity, Calendar, ArrowRight, Loader2 } from 'lucide-react';

export const SearchModule: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Patient[]>(MOCK_PATIENTS); // Default show all
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setResults(MOCK_PATIENTS);
      return;
    }
    
    setSearching(true);
    setSearched(true);
    
    // Simulate AI delay for effect if needed, but the API call takes time anyway
    const matchedIds = await searchFHIRWithNL(query, MOCK_PATIENTS);
    
    const filtered = MOCK_PATIENTS.filter(p => matchedIds.includes(p.id));
    setResults(filtered);
    setSearching(false);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto min-h-screen">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Smart FHIR Search</h2>
        <p className="text-slate-500">Query the patient database using natural language.</p>
      </div>

      <div className="max-w-2xl mx-auto mb-10">
        <form onSubmit={handleSearch} className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
          </div>
          <input
            type="text"
            className="w-full pl-12 pr-4 py-4 rounded-full border border-slate-200 shadow-sm focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all text-lg"
            placeholder="e.g., 'Find all male patients with hypertension'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            type="submit"
            disabled={searching}
            className="absolute right-2 top-2 bottom-2 bg-teal-600 hover:bg-teal-700 text-white px-6 rounded-full font-medium transition-colors disabled:opacity-70"
          >
            {searching ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Search'}
          </button>
        </form>
        <div className="mt-3 flex justify-center gap-2 text-sm text-slate-400">
          <span>Try:</span>
          <button onClick={() => setQuery('Female patients under 40')} className="hover:text-teal-600 underline decoration-dotted">"Female patients under 40"</button>
          <button onClick={() => setQuery('Patients in critical status')} className="hover:text-teal-600 underline decoration-dotted">"Critical patients"</button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-end border-b border-slate-200 pb-2 mb-4">
          <h3 className="font-semibold text-slate-700">
            {searched ? `Found ${results.length} results` : 'Patient Directory'}
          </h3>
          <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded">FHIR R4 Compatible</span>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
             <p className="text-slate-500">No patients found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {results.map((patient) => (
              <div key={patient.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group">
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                    patient.gender === 'male' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'
                  }`}>
                    {patient.name[0].given[0][0]}{patient.name[0].family[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg">
                      {patient.name[0].given.join(' ')} {patient.name[0].family}
                    </h4>
                    <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                      <span className="flex items-center gap-1"><User className="w-3 h-3" /> {patient.gender}, {new Date().getFullYear() - new Date(patient.birthDate).getFullYear()}yo</span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Last: {patient.lastVisit}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-end">
                    <div className="flex gap-2">
                       {patient.condition?.map((c, i) => (
                         <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md font-medium">
                           {c}
                         </span>
                       ))}
                    </div>
                    <span className={`mt-2 text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      patient.status === 'active' ? 'bg-green-100 text-green-700' :
                      patient.status === 'critical' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {patient.status}
                    </span>
                  </div>
                  <button className="p-2 text-slate-300 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
