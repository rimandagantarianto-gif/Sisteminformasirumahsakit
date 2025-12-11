import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { AppView } from './types';
import { Dashboard } from './pages/Dashboard';
import { ClinicalModule } from './components/ClinicalModule';
import { FinancialModule } from './components/FinancialModule';
import { SearchModule } from './components/SearchModule';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard onChangeView={setCurrentView} />;
      case AppView.CLINICAL:
        return <ClinicalModule />;
      case AppView.FINANCIAL:
        return <FinancialModule />;
      case AppView.SEARCH:
        return <SearchModule />;
      default:
        return <Dashboard onChangeView={setCurrentView} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      <main className="flex-1 ml-64 transition-all duration-300">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
