import React, { useEffect, useState } from 'react';
import { Cpu, Network, Briefcase, FolderGit2, Info } from 'lucide-react';
import { ScrambleText } from './ScrambleText';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const [uptime, setUptime] = useState({ days: 12, hours: 4, minutes: 32, seconds: 15 });
  const [systemLoad, setSystemLoad] = useState('0.14');

  // Simulated live systems telemetry
  useEffect(() => {
    const timer = setInterval(() => {
      setUptime((prev) => {
        let sec = prev.seconds + 1;
        let min = prev.minutes;
        let hr = prev.hours;
        let day = prev.days;

        if (sec >= 60) {
          sec = 0;
          min += 1;
        }
        if (min >= 60) {
          min = 0;
          hr += 1;
        }
        if (hr >= 24) {
          hr = 0;
          day += 1;
        }
        return { days: day, hours: hr, minutes: min, seconds: sec };
      });
      
      // MLOps compute loads fluctuations
      setSystemLoad((Math.random() * 0.15 + 0.08).toFixed(2));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { id: 'core', label: '01_SYS.CORE', icon: Info, title: 'Identity & Summary' },
    { id: 'skills', label: '02_SYS.SKILLS', icon: Cpu, title: 'Systems Matrix' },
    { id: 'experience', label: '03_SYS.EXP', icon: Briefcase, title: 'Work Deep-Dive' },
    { id: 'projects', label: '04_SYS.PROJ', icon: FolderGit2, title: 'Projects Directory' },
    { id: 'homelab', label: '05_SYS.LAB', icon: Network, title: 'Home Lab & Hackathons' },
  ];

  return (
    <aside className="w-full md:w-80 border-panel md:border-r flex flex-col justify-between bg-panel-card select-none">
      {/* Top Banner & Profile Info */}
      <div className="flex flex-col">
        {/* Machine Head */}
        <div className="border-panel border-b p-4 bg-panel-header flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-machine-orange animate-pulse-subtle"></span>
            <span className="font-mono text-xs text-machine-orange font-semibold tracking-wider">SYS.NODE_01</span>
          </div>
          <span className="font-mono text-[10px] text-panel-textMuted bg-panel-bg px-2 py-0.5 border border-panel">
            v2.0.4-LTS
          </span>
        </div>

        {/* Identity block */}
        <div className="p-5 border-panel border-b">
          <h1 className="font-mono text-xl font-bold tracking-tight text-panel-textActive">
            <ScrambleText text="ABHIMANYU BADIGER" />
          </h1>
          <p className="font-mono text-xs text-machine-orange mt-1 uppercase tracking-wider font-medium">
            Systems & MLOps Engineer
          </p>
          <div className="mt-3 flex items-center space-x-2 font-mono text-[10px] text-panel-textMuted">
            <span>LOC:</span>
            <span className="text-panel-textActive">BANGALORE, IN</span>
          </div>
        </div>

        {/* Telemetry Display */}
        <div className="p-4 border-panel border-b bg-[#0d0d0f]/50 font-mono text-[11px] space-y-1.5">
          <div className="text-panel-textMuted font-bold uppercase tracking-wider text-[10px] pb-1">
            System Telemetry
          </div>
          <div className="flex justify-between">
            <span className="text-panel-textMuted">SYS_UPTIME:</span>
            <span className="text-panel-textActive tabular-nums">
              {uptime.days}d {uptime.hours}h {uptime.minutes}m {uptime.seconds}s
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-panel-textMuted">SYS_LOAD:</span>
            <span className="text-machine-green tabular-nums">{systemLoad} (1m)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-panel-textMuted">KVM_VMM:</span>
            <span className="text-machine-green font-semibold">RUNNING</span>
          </div>
          <div className="flex justify-between">
            <span className="text-panel-textMuted">BGP_ROUTE:</span>
            <span className="text-machine-green font-semibold">ESTABLISHED</span>
          </div>
          <div className="flex justify-between">
            <span className="text-panel-textMuted">LORA_TRAIN:</span>
            <span className="text-machine-cyan font-semibold">STANDBY</span>
          </div>
        </div>

        {/* Navigation Channels */}
        <nav className="p-3 space-y-1.5">
          <div className="px-2 py-1 text-panel-textMuted font-mono text-[10px] font-bold uppercase tracking-wider">
            Execution Channels
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center justify-between p-2.5 rounded font-mono text-xs transition-all duration-150 border text-left ${
                  isActive
                    ? 'bg-panel-bg border-machine-orange text-panel-textActive font-medium shadow-[inset_3px_0_0_0_#e05a36]'
                    : 'bg-transparent border-transparent text-panel-textMuted hover:text-panel-textActive hover:bg-panel-bg hover:border-panel'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-machine-orange' : 'text-panel-textMuted'}`} />
                  <span>{item.label}</span>
                </div>
                {isActive && <span className="text-machine-orange font-bold">&gt;</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Contact Readout */}
      <div className="border-panel border-t bg-panel-header p-4 font-mono text-[11px] space-y-2">
        <div className="text-[10px] text-panel-textMuted font-bold uppercase tracking-wider pb-0.5">
          COMMS_PORT
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between border-b border-panel pb-1.5">
            <span className="text-panel-textMuted">EMAIL</span>
            <a
              href="mailto:badigerabhimanyu@gmail.com"
              className="text-panel-textActive hover:text-machine-orange transition-colors truncate max-w-[160px]"
            >
              badigerabhimanyu@gmail.com
            </a>
          </div>
          <div className="flex items-center justify-between border-b border-panel pb-1.5">
            <span className="text-panel-textMuted">GITHUB</span>
            <a
              href="https://github.com/ABHIMANYU993"
              target="_blank"
              rel="noopener noreferrer"
              className="text-panel-textActive hover:text-machine-orange transition-colors"
            >
              github/ABHIMANYU993
            </a>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-panel-textMuted">LINKEDIN</span>
            <a
              href="https://linkedin.com/in/abhimanyubadiger"
              target="_blank"
              rel="noopener noreferrer"
              className="text-panel-textActive hover:text-machine-orange transition-colors"
            >
              in/abhimanyubadiger
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};
