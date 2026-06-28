import React, { useState } from 'react';
import { Cpu, Network, Layers, Code2 } from 'lucide-react';

interface SkillItem {
  name: string;
  useCase: string;
}

interface SkillCategory {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  desc: string;
  items: SkillItem[];
}

export const SkillsMatrix: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const skillsData: SkillCategory[] = [
    {
      title: 'Low-Level & Systems',
      icon: Cpu,
      tag: 'SYS_LAYER_0',
      desc: 'Bare-metal kernel manipulation, custom hypervisors, process containment, and Wayland compositor rules.',
      items: [
        { name: 'C', useCase: 'ELF program loader, Multiboot v1 setup, and KVM kernel memory-mapping.' },
        { name: 'x86 Assembly', useCase: 'Manipulating CR0 registers to enable 32-bit Protected Mode and GDT configuration.' },
        { name: 'Linux KVM API', useCase: 'KVM_RUN loop design intercepting hardware exits and emulating COM1 / VGA framebuffers.' },
        { name: 'ELF Parsing', useCase: 'Scanning 32-bit headers for PT_LOAD segments and executing manual memory copies.' },
        { name: 'eBPF (bcc)', useCase: 'Deploying stateful daemons utilizing the BCC library to intercept ground-truth execution binaries.' },
        { name: 'Wayland / Hyprland', useCase: 'Frameless PyQt6 overlay rendering, using wtype virtual keyboard and workspace pinning.' },
        { name: 'Linux cgroups', useCase: 'Hardcapping Docker container VRAM, memory, and CPU limits to immunize hosts against OOM crashes.' },
        { name: 'Proxmox VE', useCase: 'Self-hosting core infrastructure, dedicated edge routers, and template provisioning.' },
      ],
    },
    {
      title: 'Infrastructure & Networking',
      icon: Network,
      tag: 'NET_LAYER_1',
      desc: 'Zero-trust tunnels, dynamic routing configuration, and declarative systems automation.',
      items: [
        { name: 'Ansible', useCase: 'Declarative playbooks automating Proxmox full-clone template VM deployments and Cloud-Init injection.' },
        { name: 'Docker Compose', useCase: 'Host-network mapping, custom bridges, PCIe passthrough render nodes config.' },
        { name: 'GitHub Actions', useCase: 'Zero-Trust CI/CD pipelines deploying container lifecycles via Cloudflare SSH tunnels.' },
        { name: 'WireGuard', useCase: 'Bypassing CGNAT and residential firewalls using dual-stack IPv6-first overlay tunnels.' },
        { name: 'FRRouting (FRR)', useCase: 'Running Multiprotocol BGP unnumbered sessions over unroutable link-local IPv6 interfaces.' },
        { name: 'BGP (RFC 5549/8950)', useCase: 'Exchanging IPv4 routing tables over IPv6 transport layers; DN42 AS4242421972 peering.' },
        { name: 'Cloudflare Tunnels', useCase: 'Zero-Trust ingress using proxy commands, secure 2FA DNS proxied domains.' },
        { name: 'Nginx Proxy Manager', useCase: 'Reverse proxy settings and automated SSL certificate terminations.' },
      ],
    },
    {
      title: 'AI / MLOps Pipeline Design',
      icon: Layers,
      tag: 'ML_LAYER_2',
      desc: 'Orchestrating agent workflows, hardware profiling, vector retrieval optimization, and custom image pipelines.',
      items: [
        { name: 'PyTorch', useCase: 'Training LoRA parameters, fine-tuning CodeBERT classifiers, and optimizing RunPod memory limits.' },
        { name: 'LangGraph', useCase: 'Deterministic, cyclic multi-node agent orchestration loops utilizingSupervisor control.' },
        { name: 'Qdrant', useCase: 'High-throughput data migrations, custom hybrid semantic queries, and metadata filter queries.' },
        { name: 'ChromaDB', useCase: 'Local vector persistence tracking shell telemetry, execution traces, and GUI noise filtration.' },
        { name: 'LoRA / Flux.1.dev', useCase: 'Fine-tuning 26GB diffusion models with dynamic weight hot-swapping into VRAM on request.' },
        { name: 'Whisper AI', useCase: 'Local offline audio transcription backend bound to standalone Python recording daemons.' },
        { name: 'HuggingFace', useCase: 'Tokenizers, CodeBERT embeddings extraction, and model loading pipelines.' },
        { name: 'RunPod', useCase: 'Hardware profiling across 24GB/48GB/96GB GPU clusters to analyze optimal VRAM limits.' },
      ],
    },
    {
      title: 'Languages & Backends',
      icon: Code2,
      tag: 'APP_LAYER_3',
      desc: 'High-performance asynchronous server-side daemons, custom bash integrations, and stateful databases.',
      items: [
        { name: 'Python', useCase: 'Developing system daemons, computer vision pipelines, and custom MLOps servers.' },
        { name: 'FastAPI', useCase: 'High-throughput asynchronous backends, dynamic LoRA hot-swapping, and resume processing.' },
        { name: 'Bash / Zsh', useCase: 'Automating Wayland wrappers, inotify directory hooks, and telemetry gatherers.' },
        { name: 'MongoDB', useCase: 'Transactional schema management for complex microservices and user profile storage.' },
        { name: 'PostgreSQL / PostGIS', useCase: 'PostgreSQL state savers for LangGraph, spatial ST_DWithin query pre-filtering.' },
        { name: 'Redis', useCase: 'Redis chat memory nodes logging multi-turn conversations chronologically via RPUSH.' },
        { name: 'Flask', useCase: 'Decoupled platform microservices for aviation logistics datasets.' },
        { name: 'SQL', useCase: 'Relational data query optimizations and custom filters.' },
      ],
    },
  ];

  const handleSkillClick = (skill: SkillItem) => {
    setSelectedSkill(selectedSkill?.name === skill.name ? null : skill);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="border-panel border-b pb-4">
        <div className="font-mono text-xs text-machine-orange mb-1 font-bold">SYSTEM.SKILLS // ARCHITECTURE_MATRIX</div>
        <h2 className="text-2xl font-bold tracking-tight text-panel-textActive">SKILLS SYSTEM LAYER MATRIX</h2>
      </div>

      {/* Intro Description */}
      <p className="text-sm text-panel-textMuted font-sans max-w-3xl">
        Abhimanyu's skill set is structured along systemic engineering disciplines rather than simple technology tags. 
        Select a specific tool or language below to inspect its exact implementation use-case within his projects.
      </p>

      {/* Grid of Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {skillsData.map((category, idx) => {
          const CategoryIcon = category.icon;
          return (
            <div key={idx} className="border border-panel bg-panel-card flex flex-col justify-between">
              {/* Category Header */}
              <div className="border-panel border-b bg-panel-header px-4 py-3 flex items-center justify-between font-mono">
                <div className="flex items-center space-x-2.5">
                  <CategoryIcon className="w-4 h-4 text-machine-orange" />
                  <span className="text-xs font-bold text-panel-textActive uppercase tracking-wider">{category.title}</span>
                </div>
                <span className="text-[10px] text-panel-textMuted font-semibold px-2 py-0.5 bg-panel-bg border border-panel">
                  {category.tag}
                </span>
              </div>

              {/* Category Details */}
              <div className="p-4 flex-grow">
                <p className="text-xs text-panel-textMuted font-sans mb-4 leading-relaxed">
                  {category.desc}
                </p>

                {/* Skill List */}
                <div className="grid grid-cols-2 gap-2">
                  {category.items.map((skill, sIdx) => {
                    const isSelected = selectedSkill?.name === skill.name;
                    return (
                      <button
                        key={sIdx}
                        onClick={() => handleSkillClick(skill)}
                        className={`p-2 rounded font-mono text-xs border text-left transition-all duration-150 relative ${
                          isSelected
                            ? 'bg-panel-bg border-machine-orange text-machine-orange font-medium'
                            : 'bg-panel-bg/40 border-panel text-panel-textMuted hover:text-panel-textActive hover:border-panel-borderActive'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{skill.name}</span>
                          {isSelected && <span className="w-1 h-1 rounded-full bg-machine-orange"></span>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Skill Use Case Readout Console */}
      <div className="border border-panel bg-[#0d0d0f]">
        <div className="border-panel border-b bg-[#121216] px-4 py-2 flex items-center justify-between font-mono text-[10px] text-panel-textMuted">
          <span className="font-semibold uppercase tracking-wider">// SYSTEM_CORE_READOUT</span>
          <span>STATE: {selectedSkill ? 'READING_DATA' : 'STANDBY'}</span>
        </div>
        <div className="p-4 font-mono text-xs leading-relaxed min-h-[72px] flex items-center justify-start">
          {selectedSkill ? (
            <div className="space-y-1 w-full">
              <div>
                <span className="text-machine-orange font-semibold">&gt; info {selectedSkill.name.toLowerCase()}</span>
              </div>
              <div className="text-panel-textActive">
                <span className="text-panel-textMuted">USE CASE:</span> {selectedSkill.useCase}
              </div>
            </div>
          ) : (
            <span className="text-panel-textMuted italic">
              Click any skill block above to route the telemetry data output and read its specific use case.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
