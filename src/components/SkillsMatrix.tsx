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

interface SkillsMatrixProps {
  isLoading?: boolean;
}

export const SkillsMatrix: React.FC<SkillsMatrixProps> = ({ isLoading = false }) => {
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
        { name: 'WireGuard', useCase: 'Establishing link-local fe80:: overlay peering tunnels to bypass ISP CGNAT bottlenecks.' },
        { name: 'BGP (FRR)', useCase: 'RFC 5549 BGP Unnumbered route announcements over link-local fe80:: tunnel interfaces.' },
        { name: 'Cloudflare Tunnels', useCase: 'Exposing internal platform endpoints (SSH, web, database) behind proxied orange-cloud DNS.' },
        { name: 'Nginx Proxy Manager', useCase: 'Custom reverse proxy block rules handling TCP/UDP streaming and SSL termination.' },
        { name: 'IPv6 Networking', useCase: 'Configuring AAAA records, prefix rotations, SLAAC routing, and firewall hole-punching.' },
      ],
    },
    {
      title: 'AI & Data Orchestration',
      icon: Layers,
      tag: 'DATA_LAYER_2',
      desc: 'Retrieval Augmented Generation pipelines, vector query optimizations, and local inference models.',
      items: [
        { name: 'PyTorch', useCase: 'Hot-swapping lightweight user-specific LoRA adapter weights (640MB) into VRAM on a base Flux model.' },
        { name: 'LangGraph', useCase: 'Directing cyclic agent execution loops using supervisor node patterns to prevent stack exhaustion.' },
        { name: 'Qdrant', useCase: 'Configuring metadata search filters to bound cosine-distance vector matches within 1.6s latency limits.' },
        { name: 'ChromaDB', useCase: 'Aggregating local shell eBPF intent outputs to form system-level behavioral vector memory.' },
        { name: 'CodeBERT', useCase: 'Custom Roberta sequence classification model fine-tuning for code authorship verification.' },
        { name: 'LoRA (Flux.1)', useCase: 'Facial and structural identity preservation fine-tuning for the 26GB Flux.1.dev diffusion model.' },
        { name: 'Whisper AI', useCase: 'Local standalone audio processing daemon computing RMS volumes and transcript output hooks.' },
        { name: 'HuggingFace', useCase: 'Leveraging transformer embeddings and pre-trained tokenizers for text processing pipelines.' },
      ],
    },
    {
      title: 'Languages & Backend',
      icon: Code2,
      tag: 'LANG_LAYER_3',
      desc: 'System programming languages, low-level scripting, and database engine integrations.',
      items: [
        { name: 'Python', useCase: 'Asynchronous event engines, automated image preprocessing pipelines, and SpaCy NLP intent matchers.' },
        { name: 'FastAPI', useCase: 'High-performance backend endpoints for flight logistics, multi-agent AI, and dynamic model hot-swapping.' },
        { name: 'Flask', useCase: 'Microservices API backend decoupling core aviation platform operations.' },
        { name: 'MongoDB', useCase: 'Managing complex, high-throughput server-side datasets and logging crawler outputs.' },
        { name: 'PostgreSQL', useCase: 'Conversational state savepoints using LangGraph PostgresSaver checkpointer database.' },
        { name: 'Redis', useCase: 'Logging multi-turn session histories chronologically via Redis chat memory nodes.' },
        { name: 'SQL', useCase: 'Executing PostGIS spatial candidate generation queries (ST_DWithin) for rapid geo-filtering.' },
        { name: 'Bash & Zsh', useCase: 'Low-latency IPC wrappers triggering Unix sockets, and custom pre-exec hooks capturing binary traces.' },
      ],
    },
  ];

  const handleSkillClick = (skill: SkillItem) => {
    if (isLoading) return;
    if (selectedSkill?.name === skill.name) {
      setSelectedSkill(null);
    } else {
      setSelectedSkill(skill);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="border-panel border-b pb-4">
        <div className="font-mono text-xs text-machine-orange mb-1 font-bold">SYSTEM.SKILLS // ARCHITECTURE_MATRIX</div>
        <h2 className="text-2xl font-bold tracking-tight text-panel-textActive">
          {isLoading ? <span className="skeleton-load w-64 h-7"></span> : "SKILLS SYSTEM LAYER MATRIX"}
        </h2>
      </div>

      {/* Intro Description */}
      <p className={`text-sm text-panel-textMuted font-sans max-w-3xl ${isLoading ? 'skeleton-load w-full h-8' : ''}`}>
        {isLoading ? '' : "Abhimanyu's skill set is structured along systemic engineering disciplines rather than simple technology tags. Select a specific tool or language below to inspect its exact implementation use-case within his projects."}
      </p>

      {/* Grid of Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {skillsData.map((category, idx) => {
          const CategoryIcon = category.icon;
          return (
            <div key={idx} className="border border-panel bg-panel-card flex flex-col justify-between rounded-[24px] overflow-hidden">
              {/* Category Header */}
              <div className="border-panel border-b bg-panel-header px-4 py-3 flex items-center justify-between font-mono">
                <div className="flex items-center space-x-2.5">
                  <CategoryIcon className="w-4 h-4 text-machine-orange" />
                  <span className={`text-xs font-bold text-panel-textActive uppercase tracking-wider ${isLoading ? 'skeleton-load w-36 h-4' : ''}`}>
                    {isLoading ? '' : category.title}
                  </span>
                </div>
                <span className={`text-[10px] text-panel-textMuted font-semibold px-2 py-0.5 bg-panel-bg border border-panel ${isLoading ? 'skeleton-load w-20 h-4' : ''}`}>
                  {isLoading ? '' : category.tag}
                </span>
              </div>

              {/* Category Details */}
              <div className="p-4 flex-grow">
                <p className={`text-xs text-panel-textMuted font-sans mb-4 leading-relaxed ${isLoading ? 'skeleton-load w-full h-8' : ''}`}>
                  {isLoading ? '' : category.desc}
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
                          <span className={isLoading ? 'skeleton-load w-20 h-3.5' : ''}>
                            {isLoading ? '' : skill.name}
                          </span>
                          {isSelected && !isLoading && <span className="w-1.5 h-1.5 rounded-full bg-machine-orange"></span>}
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
      <div className="border border-panel bg-panel-card rounded-[24px] overflow-hidden">
        <div className="border-panel border-b bg-[#121216] px-4 py-2 flex items-center justify-between font-mono text-[10px] text-panel-textMuted">
          <span className="font-semibold uppercase tracking-wider">// SYSTEM_CORE_READOUT</span>
          <span>STATE: {isLoading ? 'SYNCING' : selectedSkill ? 'READING_DATA' : 'STANDBY'}</span>
        </div>
        <div className="p-4 font-mono text-xs leading-relaxed min-h-[72px] flex items-center justify-start">
          {isLoading ? (
            <span className="skeleton-load w-full h-8"></span>
          ) : selectedSkill ? (
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
