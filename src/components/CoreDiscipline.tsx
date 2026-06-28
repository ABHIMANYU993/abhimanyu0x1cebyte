import React from 'react';
import { Terminal, Shield, Award, Cpu, Database } from 'lucide-react';
import { ScrambleText } from './ScrambleText';

export const CoreDiscipline: React.FC = () => {
  const metrics = [
    {
      icon: Award,
      value: '5x Winner',
      label: 'HACKATHONS',
      desc: '1st place in JSS Navotthana, HACKVERSE, CRYPTIC 3.0, CICADA, SCIENTIA.',
    },
    {
      icon: Shield,
      value: 'Zero-Trust',
      label: 'INFRASTRUCTURE',
      desc: 'Outbound cloudflared tunnels, wireguard overlay, strictly isolated cgroups.',
    },
    {
      icon: Cpu,
      value: 'Bare-Metal',
      label: 'HYPERVISORS',
      desc: 'Developed custom x86 VMM monitor in C utilizing the Linux KVM API.',
    },
    {
      icon: Database,
      value: '1.6s Latency',
      label: 'QDRANT VECTOR DB',
      desc: 'Plummeted complex property query latency from 30s down to 1.6s with PostGIS pre-filtering.',
    },
  ];

  const services = [
    { name: 'KVM.guest_vCPU_0', detail: 'CR0_PE = 1 (32-bit Protected Mode)', status: 'ACTIVE', type: 'system' },
    { name: 'FRR.bgp_session', detail: 'Multiprotocol IPv6 BGP Peer [fe80::]', status: 'ESTABLISHED', type: 'network' },
    { name: 'Qdrant.hybrid_search', detail: 'Semantic embed + SQL metadata pre-filter', status: 'OPTIMIZED', type: 'db' },
    { name: 'PyTorch.Flux_inference', detail: 'Lightweight LoRA hot-swap backend', status: 'READY', type: 'ml' },
    { name: 'Docker.Jellyfin_transcode', detail: 'Intel QSV passthrough via /dev/dri', status: 'ACCELERATED', type: 'system' },
    { name: 'Ansible.Alpine_golden_clone', detail: 'Zero-Touch dynamic cloud-init inject', status: 'IDEMPOTENT', type: 'infra' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Console Header */}
      <div className="border-panel border-b pb-4">
        <div className="font-mono text-xs text-machine-orange mb-1 font-bold">SYSTEM.DISCIPLINE // INITIALIZING...</div>
        <h2 className="text-2xl font-bold tracking-tight text-panel-textActive">
          <ScrambleText text="CORE ENGINEERING CAPABILITIES" />
        </h2>
      </div>

      {/* Engineering Summary */}
      <div className="bg-panel-card border border-panel p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-1.5 font-mono text-[9px] text-[#222227] pointer-events-none select-none font-bold uppercase">
          SYS_SUMMARY
        </div>
        <p className="font-mono text-xs text-machine-orange uppercase tracking-wider mb-2 font-semibold">
          // Executive Summary
        </p>
        <p className="text-sm text-panel-textMuted leading-relaxed font-sans">
          Systems and MLOps Engineer specializing in low-level hypervisor development, bare-metal infrastructure, and high-performance AI orchestration. Proven track record of bypassing ISP restrictions via advanced BGP routing, optimizing deep learning pipelines for VRAM-constrained GPU clusters, and architecting zero-trust CI/CD deployments. Seeking to leverage deep systems-level knowledge to build and scale production-grade backend infrastructure and AI compute environments.
        </p>
      </div>

      {/* High-Level Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-panel-card border border-panel p-4 flex flex-col justify-between hover:border-panel-borderActive transition-colors duration-150 relative">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-[9px] text-panel-textMuted uppercase tracking-wider block">
                    {metric.label}
                  </span>
                  <span className="font-mono text-lg font-bold text-panel-textActive block mt-1">
                    {metric.value}
                  </span>
                </div>
                <div className="p-2 border border-panel bg-panel-header">
                  <Icon className="w-4 h-4 text-machine-orange" />
                </div>
              </div>
              <p className="text-xs text-panel-textMuted mt-3 font-sans leading-normal">
                {metric.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* System Diagnostics Monitor Panel */}
      <div className="border border-panel bg-panel-card">
        {/* Panel Head */}
        <div className="border-panel border-b bg-panel-header px-4 py-2 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center space-x-2">
            <Terminal className="w-3.5 h-3.5 text-machine-orange" />
            <span className="font-bold text-panel-textActive">SYS_DIAGNOSTICS_MONITOR</span>
          </div>
          <div className="flex items-center space-x-3 text-[10px]">
            <span className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-machine-green"></span>
              <span className="text-panel-textMuted">ONLINE</span>
            </span>
          </div>
        </div>

        {/* Diagnostic Output Table */}
        <div className="p-4 overflow-x-auto terminal-scroll">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-panel text-panel-textMuted">
                <th className="pb-2 font-semibold">SERVICE / NODE</th>
                <th className="pb-2 font-semibold">ACTIVE TELEMETRY DATA</th>
                <th className="pb-2 text-right font-semibold">STATUS CODE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-panel">
              {services.map((svc, idx) => (
                <tr key={idx} className="hover:bg-panel-bg/30">
                  <td className="py-2.5 font-medium text-panel-textActive">{svc.name}</td>
                  <td className="py-2.5 text-panel-textMuted">{svc.detail}</td>
                  <td className="py-2.5 text-right">
                    <span className={`px-2 py-0.5 border text-[10px] font-bold ${
                      svc.status === 'ESTABLISHED' || svc.status === 'ACTIVE' || svc.status === 'OPTIMIZED'
                        ? 'bg-machine-greenMuted/20 border-machine-green/40 text-machine-green'
                        : svc.status === 'ACCELERATED' || svc.status === 'READY' || svc.status === 'IDEMPOTENT'
                        ? 'bg-[#002f3d] border-machine-cyan/40 text-machine-cyan'
                        : 'bg-machine-orangeMuted/20 border-machine-orange/40 text-machine-orange'
                    }`}>
                      {svc.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
