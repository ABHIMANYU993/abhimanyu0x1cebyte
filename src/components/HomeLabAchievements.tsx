import React, { useState } from 'react';
import { Award, Server, CheckCircle2 } from 'lucide-react';

interface RackUnit {
  size: string; // 1U, 2U, etc
  name: string;
  sub: string;
  status: string;
  specs: string[];
  desc: string;
}

interface HomeLabAchievementsProps {
  isLoading?: boolean;
}

export const HomeLabAchievements: React.FC<HomeLabAchievementsProps> = ({ isLoading = false }) => {
  const [selectedUnit, setSelectedUnit] = useState<number>(0);

  const rackData: RackUnit[] = [
    {
      size: '1U',
      name: 'GATEWAY.BGP_EDGE_ROUTER',
      sub: 'Debian 12 VM + FRRouting (FRR)',
      status: 'PEERED [DN42 AS4242421972]',
      specs: ['WireGuard Tunnel', 'BGP Unnumbered', 'IPv6-first AAAA DDNS', 'Pi-hole DNS Sinkhole'],
      desc: 'Edge gateway bypassing carrier-grade NAT using a custom WireGuard overlay. Routes IPv4 space over IPv6 link-local (fe80::) interfaces using RFC 5549 BGP extended next-hop negotiations. Runs a host-mode Pi-hole for network-level telemetry null-routing.'
    },
    {
      size: '2U',
      name: 'HYPERVISOR.PROXMOX_CORE',
      sub: 'Proxmox VE + Custom Virtual Machine Monitor',
      status: 'ACTIVE [KVM_HYPERV]',
      specs: ['x86 KVM API Monitor', 'C ELF Parser', 'Ansible IaC Orchestrated', 'Cloud-Init VM Injection'],
      desc: 'Core virtualization host. Runs custom-built Type-2 Hypervisor in C utilizing Linux KVM API (CR0_PE Protected Mode, Multiboot handshake validation, COM1/VGA MMIO exits). Provisioned programmatically via declarative Ansible KVM modules.'
    },
    {
      size: '2U',
      name: 'COMPUTE.DOCKER_APPLICATION_STACK',
      sub: 'Alpine Linux ISO Host',
      status: 'OPERATIONAL [CGROUPS_ENFORCED]',
      specs: ['Jellyfin (Intel QSV)', 'Home Assistant (SQLite tuned)', 'n8n Workflows', 'Evolution WhatsApp API'],
      desc: 'Dockerized microservices cluster. Jellyfin handles real-time 4K transcoding via direct PCIe passthrough of host Intel graphics render nodes (/dev/dri). Containers hardcapped via cgroups quotas to prevent runaway OOM crashes.'
    },
    {
      size: '1U',
      name: 'SECURE.CI_CD_TUNNEL',
      sub: 'Zero-Trust cloudflared Ingress',
      status: 'SECURE [NO_INBOUND_PORTS]',
      specs: ['cloudflared SSH Tunnel', 'GitHub Actions Runner', 'Self-cleaning Images Script', 'SSH ProxyCommand'],
      desc: 'Deploy pipeline executing over cloudflared access SSH proxy tunnels. Bypasses residential firewalls with zero open inbound ports. Triggered via ephemeral GitHub Action runners executing self-cleaning docker container cycles.'
    }
  ];

  const hackathons = [
    { title: 'JSS Navotthana', year: '2025', rank: '1st Place', details: 'Secured top place by delivering high-throughput edge machine learning deployment under 36 hours.' },
    { title: 'HACKVERSE', year: '2025', rank: '1st Place', details: 'Built autonomous multi-agent state coordination pipeline using LangGraph, routing intent constraints under live testing.' },
    { title: 'CRYPTIC 3.0', year: '2024', rank: '1st Place', details: 'Engineered high-performance cryptographic validation backend, scaling API handlers for raw execution speed.' },
    { title: 'CICADA', year: '2024', rank: '1st Place', details: 'Designed bare-metal network tracking monitor that detects anomalies in subnet packet streams.' },
    { title: 'SCIENTIA', year: '2023', rank: '1st Place', details: 'Developed predictive modeling pipeline parsing public records data utilizing PyTorch classification.' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="border-panel border-b pb-4">
        <div className="font-mono text-xs text-machine-orange mb-1 font-bold">SYSTEM.LAB // HOME_LAB_&_AWARDS</div>
        <h2 className="text-2xl font-bold tracking-tight text-panel-textActive">
          {isLoading ? <span className="skeleton-load w-64 h-7"></span> : 'HOME LAB & HACKATHON WINNER TRACK RECORD'}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Physical Home Lab CSS Server Rack */}
        <div className="lg:col-span-7 space-y-4">
          <div className="font-mono text-xs font-semibold text-panel-textMuted uppercase tracking-wider flex items-center space-x-1.5">
            <Server className="w-3.5 h-3.5 text-machine-orange" />
            <span>Home Lab Rack Console (Physical Setup)</span>
          </div>

          {/* Rack visual container */}
          <div className="border-2 border-panel bg-panel-card p-3 rounded space-y-3 relative">
            {/* Side Rack Rails */}
            <div className="absolute top-0 bottom-0 left-1.5 w-1 border-r border-[#222227] flex flex-col justify-between py-6 pointer-events-none select-none">
              {[...Array(8)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-[#1b1b22] rounded-full border border-panel"></div>)}
            </div>
            <div className="absolute top-0 bottom-0 right-1.5 w-1 border-l border-[#222227] flex flex-col justify-between py-6 pointer-events-none select-none">
              {[...Array(8)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-[#1b1b22] rounded-full border border-panel"></div>)}
            </div>

            {/* Rack Nodes */}
            <div className="space-y-2.5 px-3">
              {rackData.map((unit, idx) => {
                const isSelected = selectedUnit === idx;
                return (
                  <button
                    key={idx}
                    disabled={isLoading}
                    onClick={() => setSelectedUnit(idx)}
                    className={`w-full flex items-center justify-between p-3 border font-mono transition-all duration-150 relative text-left ${
                      isSelected && !isLoading
                        ? 'bg-panel-bg border-machine-orange text-panel-textActive shadow-[0_0_15px_rgba(224,90,54,0.05)]'
                        : 'bg-panel-bg/60 border-panel text-panel-textMuted hover:border-panel-borderActive hover:text-panel-textActive'
                    }`}
                  >
                    <div className="flex items-center space-x-3.5">
                      <span className={`text-[10px] bg-panel-header border border-panel px-1.5 py-0.5 text-machine-orange font-bold ${isLoading ? 'skeleton-load w-6 h-4' : ''}`}>
                        {isLoading ? '' : unit.size}
                      </span>
                      <div>
                        <span className={`text-xs font-bold block ${isLoading ? 'skeleton-load w-28 h-4' : ''}`}>
                          {isLoading ? '' : unit.name}
                        </span>
                        <span className={`text-[9px] text-panel-textMuted block mt-0.5 ${isLoading ? 'skeleton-load w-36 h-3' : ''}`}>
                          {isLoading ? '' : unit.sub}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 text-[10px]">
                      {!isLoading && (
                        <span className={`w-2 h-2 rounded-full ${
                          unit.status.includes('PEERED') || unit.status.includes('ACTIVE') || unit.status.includes('OPERATIONAL') || unit.status.includes('SECURE')
                            ? 'bg-machine-green animate-pulse-subtle'
                            : 'bg-machine-amber'
                        }`}></span>
                      )}
                      <span className={`font-semibold ${isLoading ? 'skeleton-load w-12 h-3.5' : 'hidden sm:inline'}`}>
                        {isLoading ? '' : unit.status.split(' ')[0]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Unit Readout */}
          {(() => {
            const unit = rackData[selectedUnit];
            return (
              <div className="border border-panel bg-black p-4 font-mono text-xs space-y-3">
                <div className="flex items-center justify-between border-b border-panel pb-2">
                  <span className={`text-machine-orange font-bold ${isLoading ? 'skeleton-load w-56 h-4' : ''}`}>
                    {isLoading ? '' : `// UNIT ${unit.size} READOUT: ${unit.name}`}
                  </span>
                  <span className="text-[10px] text-panel-textMuted bg-panel-card border border-panel px-2 py-0.5">SYS.TELEMETRY</span>
                </div>
                <p className={`text-panel-textActive font-sans leading-relaxed text-xs ${isLoading ? 'skeleton-load w-full h-12' : ''}`}>
                  {isLoading ? '' : unit.desc}
                </p>
                <div className="space-y-1.5">
                  <span className="text-[10px] text-panel-textMuted font-bold uppercase tracking-wider block">// Target Hardware Stack:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {isLoading ? (
                      <>
                        <div className="flex items-center space-x-2 bg-panel-card border border-panel p-2 skeleton-load h-8"></div>
                        <div className="flex items-center space-x-2 bg-panel-card border border-panel p-2 skeleton-load h-8"></div>
                      </>
                    ) : (
                      unit.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="flex items-center space-x-2 bg-panel-card border border-panel p-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-machine-green flex-shrink-0" />
                          <span className="text-[10px] text-panel-textActive">{spec}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Right Side: Hackathons Achievement List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="font-mono text-xs font-semibold text-panel-textMuted uppercase tracking-wider flex items-center space-x-1.5">
            <Award className="w-3.5 h-3.5 text-machine-orange" />
            <span>5x Hackathon Champion</span>
          </div>

          <div className="space-y-3">
            {hackathons.map((hack, hIdx) => (
              <div
                key={hIdx}
                className="border border-panel bg-panel-card p-4 hover:border-panel-borderActive transition-all duration-150 flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between font-mono">
                  <span className={`text-xs font-bold text-panel-textActive group-hover:text-machine-orange transition-colors ${isLoading ? 'skeleton-load w-24 h-4' : ''}`}>
                    {isLoading ? '' : hack.title}
                  </span>
                  <div className="flex items-center space-x-2 text-[10px]">
                    <span className={`bg-machine-orangeMuted/20 border border-machine-orange/40 text-machine-orange px-2 py-0.5 font-bold ${isLoading ? 'skeleton-load w-12 h-4' : ''}`}>
                      {isLoading ? '' : hack.rank}
                    </span>
                    <span className={`text-panel-textMuted ${isLoading ? 'skeleton-load w-6 h-3' : ''}`}>
                      {isLoading ? '' : hack.year}
                    </span>
                  </div>
                </div>
                <p className={`text-xs text-panel-textMuted font-sans mt-2.5 leading-relaxed ${isLoading ? 'skeleton-load w-full h-8' : ''}`}>
                  {isLoading ? '' : hack.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
