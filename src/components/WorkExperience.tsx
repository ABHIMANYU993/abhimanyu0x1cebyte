import React, { useState } from 'react';
import { Calendar, MapPin, Building2 } from 'lucide-react';

interface ExperienceBlock {
  company: string;
  role: string;
  location: string;
  period: string;
  context: string;
  bullets: string[];
  projects?: {
    title: string;
    bullets: string[];
  }[];
}

interface WorkExperienceProps {
  isLoading?: boolean;
}

export const WorkExperience: React.FC<WorkExperienceProps> = ({ isLoading = false }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const experienceData: ExperienceBlock[] = [
    {
      company: 'Genzi.ai (PropPanda)',
      role: 'AI & ML Intern',
      location: 'Remote (Singapore)',
      period: 'Nov 2025 – Jan 2026',
      context: 'Solo core engineer at an early-stage startup. Held complete autonomy over architecture, R&D, deployment, and cloud infrastructure ("what you build, you own"). Navigated extreme agile time constraints with hourly feature delivery expectations.',
      bullets: [
        'Engineered a deterministic, cyclic LangGraph orchestration layer powered by GPT-4o Mini to replace rigid, template-driven n8n workflows, successfully handling complex intent routing, multi-agent delegation, and autonomous error recovery.',
        'Architected strict conversational state management using a defined PropPandaState schema alongside LangGraph Checkpointers (PostgresSaver), utilizing custom operator reducers to cleanly merge user profile updates and append chat histories without causing context window pollution.',
        'Executed a high-throughput data migration from legacy relational SQL to a Qdrant vector database, leveraging semantic embeddings to plummet complex property query response latency from 30 seconds down to a sustained 1.6 seconds.',
        'Optimized Qdrant retrieval performance by implementing a hybrid search strategy that couples high-dimensional semantic vector queries with strict SQL-level metadata filtering, drastically pruning the search space to bypass full database scans.',
        'Conducted technical evaluations against vendor lock-in, successfully advocating to retain Qdrant over migrating to Azure Cosmos DB by proving Cosmos’s limitations as a non-native vector store and its restrictions on custom vector control and fine-tuning.',
        'Developed a spatial candidate generation pipeline utilizing PostGIS ST_DWithin broad-phase SQL queries to aggressively pre-filter geographically viable properties before executing computationally expensive external API validations.',
        'Integrated a precise validation layer leveraging Google Places and Distance Matrix APIs to dynamically process lifestyle_amenities and commute_search Pydantic models, computing exact transit durations and enforcing strict sub-1000m “walkable” proximity constraints to ensure deterministic, mathematically verified property recommendations.',
        'Provisioned Azure VMs and automated declarative deployment pipelines utilizing Docker and GitHub Actions CI/CD to make the entire multi-agent AI architecture completely cloud-agnostic.',
        'Orchestrated a rapid, full-stack cross-cloud migration from Azure to GCP to capitalize on seed funding infrastructure credits, engineering a “one-click” automated environment setup and VM provisioning script ensuring zero compatibility issues.',
        'Managed end-to-end production deployment cycles for live web widgets and WhatsApp integrations (successfully navigating and implementing strict Meta privacy protocols and business account linking), minimizing service disruption to near-zero (~1 second) downtime during live server swaps as a solo engineer.',
        'Thrived in an extreme fast-paced environment, taking absolute ownership of the core system to architect, test, and deploy production-ready AI features under highly constrained hourly turnaround times.'
      ]
    },
    {
      company: 'Prithvi Books',
      role: 'AI & Web Systems Intern',
      location: 'Remote (Bangalore, India)',
      period: 'May 2025 – Aug 2025',
      context: 'Managed physical server migration, constructed highly responsive user interfaces, and designed automated data pipeline crawlers to process local book inventories.',
      bullets: [
        'Migrated critical hardware nodes, transferring physically hosted application databases into dedicated cloud droplets with zero metadata corruption or service downtime.',
        'Architected a standalone, multi-threaded BeautifulSoup crawler pipeline to scrape localized ISBN listings, converting raw text files into structured MongoDB logs.',
        'Refined frontend responsive performance, styling fluid, technical landing pages utilizing tailwind utilities and CSS breakpoints to support heterogeneous screen sizes.'
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="border-panel border-b pb-4">
        <div className="font-mono text-xs text-machine-orange mb-1 font-bold">SYSTEM.EXPERIENCE // RECORD_READOUT</div>
        <h2 className="text-2xl font-bold tracking-tight text-panel-textActive">
          {isLoading ? <span className="skeleton-load w-64 h-7"></span> : 'PROFESSIONAL CHRONOLOGY'}
        </h2>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-panel overflow-x-auto select-none terminal-scroll">
        {experienceData.map((exp, idx) => (
          <button
            key={idx}
            disabled={isLoading}
            onClick={() => setActiveTab(idx)}
            className={`px-5 py-3 font-mono text-xs font-semibold border-t-2 transition-all duration-150 flex items-center space-x-2 ${
              activeTab === idx
                ? 'border-t-machine-orange bg-panel-card text-panel-textActive border-l border-r border-panel'
                : 'border-t-transparent text-panel-textMuted hover:text-panel-textActive hover:bg-panel-card/30'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>
              {isLoading ? <span className="skeleton-load w-24 h-4"></span> : exp.company}
            </span>
          </button>
        ))}
      </div>

      {/* Selected Experience Detail */}
      {(() => {
        const exp = experienceData[activeTab];
        return (
          <div className="space-y-6">
            {/* Header info */}
            <div className="bg-panel-card border border-panel p-4 flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
              <div>
                <h3 className="font-mono text-base font-bold text-panel-textActive">
                  {isLoading ? (
                    <span className="skeleton-load w-64 h-5"></span>
                  ) : (
                    <>{exp.role} <span className="text-machine-orange">@ {exp.company}</span></>
                  )}
                </h3>
                <div className="flex items-center space-x-4 mt-1 font-mono text-[11px] text-panel-textMuted">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-machine-orange" />
                    <span className={isLoading ? 'skeleton-load w-24 h-3' : ''}>
                      {isLoading ? '' : exp.location}
                    </span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3 text-machine-orange" />
                    <span className={isLoading ? 'skeleton-load w-32 h-3' : ''}>
                      {isLoading ? '' : exp.period}
                    </span>
                  </span>
                </div>
              </div>
              <span className={`font-mono text-[10px] bg-panel-bg border border-panel px-3 py-1 font-semibold uppercase tracking-wider ${isLoading ? 'skeleton-load w-24 h-5' : 'text-machine-green'}`}>
                {isLoading ? '' : 'STATUS: COMPLETED'}
              </span>
            </div>

            {/* Context block */}
            <div className="bg-[#0f0f12] border border-panel px-4 py-3.5 font-mono text-[11px] leading-relaxed relative">
              <span className="absolute top-0 right-0 p-1 font-mono text-[8px] text-[#222227] select-none font-bold">
                ENV_CONTEXT
              </span>
              <p className="text-panel-textMuted uppercase tracking-wider text-[10px] font-bold text-machine-orange mb-1">
                // System Environment & Context:
              </p>
              <p className={`text-panel-textActive font-sans italic text-xs ${isLoading ? 'skeleton-load w-full h-12' : ''}`}>
                {isLoading ? '' : `"${exp.context}"`}
              </p>
            </div>

            {/* Bullets List (if simple bullets exist) */}
            {exp.bullets.length > 0 && (
              <div className="space-y-3">
                <div className="font-mono text-xs font-semibold text-panel-textMuted uppercase tracking-wider">
                  Execution Actions:
                </div>
                <div className="space-y-2.5">
                  {exp.bullets.map((bullet, bIdx) => (
                    <div
                      key={bIdx}
                      className="border border-panel bg-panel-card/40 p-3 flex items-start space-x-3 group hover:border-panel-borderActive transition-colors"
                    >
                      <div className="mt-1 flex-shrink-0 font-mono text-[11px] text-machine-orange select-none">
                        [{String(bIdx + 1).padStart(2, '0')}]
                      </div>
                      <p className={`font-sans text-xs text-panel-textMuted group-hover:text-panel-textActive transition-colors leading-relaxed w-full ${isLoading ? 'skeleton-load h-8' : ''}`}>
                        {isLoading ? '' : bullet}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Project Deep-Dives (if projects exist) */}
            {exp.projects && exp.projects.length > 0 && (
              <div className="space-y-6">
                {exp.projects.map((proj, pIdx) => (
                  <div key={pIdx} className="space-y-3">
                    <h4 className="font-mono text-xs font-bold text-machine-orange border-l-2 border-machine-orange pl-2 uppercase tracking-wide">
                      {proj.title}
                    </h4>
                    <div className="space-y-2.5">
                      {proj.bullets.map((bullet, bIdx) => (
                        <div
                          key={bIdx}
                          className="border border-panel bg-panel-card/40 p-3 flex items-start space-x-3 group hover:border-panel-borderActive transition-colors"
                        >
                          <div className="mt-1 flex-shrink-0 font-mono text-[11px] text-machine-orange select-none">
                            [{String(bIdx + 1).padStart(2, '0')}]
                          </div>
                          <p className={`font-sans text-xs text-panel-textMuted group-hover:text-panel-textActive transition-colors leading-relaxed w-full ${isLoading ? 'skeleton-load h-8' : ''}`}>
                            {isLoading ? '' : bullet}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
};
