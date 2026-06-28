import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { CoreDiscipline } from './components/CoreDiscipline';
import { SkillsMatrix } from './components/SkillsMatrix';
import { WorkExperience } from './components/WorkExperience';
import { ProjectsDirectory } from './components/ProjectsDirectory';
import { HomeLabAchievements } from './components/HomeLabAchievements';
import { Terminal, Database, Folder, Activity, Menu, X } from 'lucide-react';
import { BootLoader } from './components/BootLoader';
import { CatppuccinoDaemon } from './components/CatppuccinoDaemon';

function App() {
  const [activeSection, setActiveSection] = useState<string>('core');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [memUsage, setMemUsage] = useState<string>('42.8 MB');
  const [isBooting, setIsBooting] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('sys_booted') === 'true') {
      return false;
    }
    return true;
  });

  // Sync localized system time
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setCurrentTime(
        date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
        }) + ' ' + date.toLocaleTimeString('en-US', { hour12: false })
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    // Dynamic browser telemetry simulation
    const memTimer = setInterval(() => {
      if (window.performance && (window.performance as any).memory) {
        const used = ((window.performance as any).memory.usedJSHeapSize / (1024 * 1024)).toFixed(1);
        setMemUsage(`${used} MB`);
      } else {
        setMemUsage(((Math.random() * 5 + 40).toFixed(1)) + ' MB');
      }
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(memTimer);
    };
  }, []);

  const getSectionTitle = (id: string) => {
    switch (id) {
      case 'core': return '01_SYS.CORE';
      case 'skills': return '02_SYS.SKILLS';
      case 'experience': return '03_SYS.EXP';
      case 'projects': return '04_SYS.PROJ';
      case 'homelab': return '05_SYS.LAB';
      default: return '00_SYS.NULL';
    }
  };

  if (isBooting) {
    return (
      <BootLoader
        onComplete={() => {
          setIsBooting(false);
          sessionStorage.setItem('sys_booted', 'true');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] bg-grid-pattern text-[#f4f4f7] flex flex-col md:flex-row relative">
      {/* Subtle CRT screen scan lines overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 scanlines opacity-[0.12] mix-blend-overlay"></div>

      {/* Catppuccino Desktop Pet roving daemon */}
      <CatppuccinoDaemon variant="white_cat" />

      {/* Mobile Top Bar */}
      <header className="md:hidden bg-panel-card border-b border-panel p-4 flex items-center justify-between sticky top-0 z-40 select-none">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-machine-orange"></span>
          <span className="font-mono text-xs font-bold text-panel-textActive">ABHIMANYU.SYS</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="font-mono text-[10px] text-panel-textMuted bg-panel-bg px-2 py-0.5 border border-panel">
            {getSectionTitle(activeSection)}
          </span>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 border border-panel rounded bg-panel-bg hover:border-machine-orange text-panel-textMuted hover:text-panel-textActive transition-all"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[53px] bg-panel-card/95 backdrop-blur border-b border-panel z-30 p-4 font-mono text-xs space-y-2 select-none animate-fade-in">
          <div className="text-[10px] text-panel-textMuted font-bold uppercase tracking-wider mb-2">
            Execution Channels
          </div>
          {[
            { id: 'core', label: '01_SYS.CORE' },
            { id: 'skills', label: '02_SYS.SKILLS' },
            { id: 'experience', label: '03_SYS.EXP' },
            { id: 'projects', label: '04_SYS.PROJ' },
            { id: 'homelab', label: '05_SYS.LAB' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between p-2.5 rounded border text-left ${
                activeSection === item.id
                  ? 'bg-panel-bg border-machine-orange text-machine-orange font-medium'
                  : 'bg-transparent border-transparent text-panel-textMuted'
              }`}
            >
              <span>{item.label}</span>
              {activeSection === item.id && <span>&gt;</span>}
            </button>
          ))}
        </div>
      )}

      {/* Sidebar for desktop */}
      <div className="hidden md:flex flex-shrink-0">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      </div>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col min-h-screen">
        {/* Top Status Telemetry Toolbar */}
        <section className="bg-panel-card border-panel border-b p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 text-[10px] font-mono text-panel-textMuted select-none sticky top-[53px] md:top-0 z-20">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="flex items-center space-x-1">
              <Folder className="w-3.5 h-3.5 text-machine-orange" />
              <span className="text-panel-textActive">ROOT:</span>
              <span className="text-panel-textMuted">/home/abhimanyu/portfolio</span>
            </span>
            <span className="flex items-center space-x-1 hidden lg:inline-flex">
              <Database className="w-3.5 h-3.5 text-machine-cyan" />
              <span className="text-panel-textActive">DB_HOST:</span>
              <span className="text-panel-textMuted">local_qdrant_node</span>
            </span>
            <span className="flex items-center space-x-1">
              <Activity className="w-3.5 h-3.5 text-machine-green" />
              <span className="text-panel-textActive">MEM:</span>
              <span className="text-panel-textMuted">{memUsage}</span>
            </span>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end border-t border-panel sm:border-t-0 pt-1.5 sm:pt-0">
            <div className="flex items-center space-x-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-machine-green animate-pulse"></span>
              <span className="text-machine-green font-bold">STATE_OK</span>
            </div>
            <span className="border-l border-panel h-3 hidden sm:inline"></span>
            <span className="text-panel-textActive tabular-nums">{currentTime}</span>
          </div>
        </section>

        {/* Content Pane container */}
        <section className="flex-grow p-4 md:p-6 lg:p-8 max-w-5xl w-full mx-auto overflow-y-auto">
          {activeSection === 'core' && <CoreDiscipline />}
          {activeSection === 'skills' && <SkillsMatrix />}
          {activeSection === 'experience' && <WorkExperience />}
          {activeSection === 'projects' && <ProjectsDirectory />}
          {activeSection === 'homelab' && <HomeLabAchievements />}
        </section>

        {/* Bottom Control / Info Bar */}
        <footer className="border-panel border-t bg-panel-card p-3 select-none text-[9px] font-mono text-panel-textMuted flex flex-col sm:flex-row justify-between items-center space-y-1.5 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <Terminal className="w-3 h-3 text-machine-orange" />
            <span>CONNECT: badigerabhimanyu@gmail.com</span>
          </div>
          <div className="flex items-center space-x-3 text-center sm:text-right">
            <span>DESIGN: TACTILE MINIMALIST INDUSTRIAL LAYOUT</span>
            <span>|</span>
            <span className="text-panel-textActive">CLOUDFLARE_PAGES_READY</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
