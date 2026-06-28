import React from 'react';

interface SkeletonLoaderProps {
  section: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ section }) => {
  const renderCoreSkeleton = () => (
    <div className="space-y-8 animate-pulse">
      {/* Header */}
      <div className="border-panel border-b pb-4 space-y-2">
        <div className="h-4 bg-[#1e1e24] w-24 rounded"></div>
        <div className="h-7 bg-[#26262f] w-64 rounded"></div>
      </div>
      {/* Environment Context */}
      <div className="bg-[#121216]/50 border border-panel p-4 rounded space-y-2">
        <div className="h-3 bg-[#1e1e24] w-48 rounded"></div>
        <div className="h-4 bg-[#26262f] w-full rounded"></div>
        <div className="h-4 bg-[#26262f] w-5/6 rounded"></div>
      </div>
      {/* Grid blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="border border-panel bg-[#121216]/30 p-4 rounded space-y-3">
            <div className="h-4 bg-[#26262f] w-1/3 rounded"></div>
            <div className="space-y-2">
              <div className="h-3 bg-[#1e1e24] w-full rounded"></div>
              <div className="h-3 bg-[#1e1e24] w-5/6 rounded"></div>
              <div className="h-3 bg-[#1e1e24] w-4/5 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSkillsSkeleton = () => (
    <div className="space-y-8 animate-pulse">
      {/* Header */}
      <div className="border-panel border-b pb-4 space-y-2">
        <div className="h-4 bg-[#1e1e24] w-24 rounded"></div>
        <div className="h-7 bg-[#26262f] w-48 rounded"></div>
      </div>
      {/* Search & Tabs */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="h-9 bg-[#121216] border border-panel w-full sm:w-64 rounded"></div>
        <div className="flex gap-2 flex-wrap">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-9 bg-[#121216] border border-panel w-20 rounded"></div>
          ))}
        </div>
      </div>
      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 6].map((i) => (
          <div key={i} className="border border-panel bg-[#121216]/30 p-4 rounded space-y-4">
            <div className="flex justify-between items-center">
              <div className="h-4 bg-[#26262f] w-1/2 rounded"></div>
              <div className="h-3 bg-[#1e1e24] w-10 rounded"></div>
            </div>
            <div className="space-y-1.5">
              <div className="h-1 bg-[#1e1e24] w-full rounded"></div>
              <div className="h-3 bg-[#1e1e24] w-3/4 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderExperienceSkeleton = () => (
    <div className="space-y-8 animate-pulse">
      {/* Header */}
      <div className="border-panel border-b pb-4 space-y-2">
        <div className="h-4 bg-[#1e1e24] w-32 rounded"></div>
        <div className="h-7 bg-[#26262f] w-80 rounded"></div>
      </div>
      {/* Switch Selectors */}
      <div className="flex border-b border-panel gap-1">
        <div className="h-10 bg-[#121216] border-t-2 border-panel w-36 rounded-t"></div>
        <div className="h-10 bg-[#121216]/40 border-t-2 border-transparent w-36 rounded-t"></div>
      </div>
      {/* Detail Block */}
      <div className="space-y-4">
        <div className="bg-[#121216] border border-panel p-4 rounded flex justify-between">
          <div className="space-y-2 w-1/2">
            <div className="h-4 bg-[#26262f] w-3/4 rounded"></div>
            <div className="h-3 bg-[#1e1e24] w-1/2 rounded"></div>
          </div>
          <div className="h-6 bg-[#1e1e24] w-20 rounded"></div>
        </div>
        <div className="bg-[#121216]/40 border border-panel p-4 rounded space-y-2">
          <div className="h-3 bg-[#1e1e24] w-24 rounded"></div>
          <div className="h-4 bg-[#26262f] w-full rounded"></div>
          <div className="h-4 bg-[#26262f] w-5/6 rounded"></div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-panel bg-[#121216]/20 p-3 rounded flex items-start space-x-3">
              <div className="h-3 bg-[#26262f] w-6 rounded flex-shrink-0"></div>
              <div className="h-3 bg-[#1e1e24] w-full rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProjectsSkeleton = () => (
    <div className="space-y-8 animate-pulse">
      {/* Header */}
      <div className="border-panel border-b pb-4 space-y-2">
        <div className="h-4 bg-[#1e1e24] w-32 rounded"></div>
        <div className="h-7 bg-[#26262f] w-72 rounded"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="h-3 bg-[#1e1e24] w-24 rounded"></div>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 bg-[#121216] border border-panel rounded"></div>
            ))}
          </div>
        </div>
        {/* Right Details */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-[#121216] border border-panel rounded">
            <div className="border-b border-panel p-4 flex justify-between">
              <div className="h-5 bg-[#26262f] w-48 rounded"></div>
              <div className="h-6 bg-[#1e1e24] w-16 rounded"></div>
            </div>
            <div className="p-4 space-y-3">
              <div className="h-3 bg-[#1e1e24] w-full rounded"></div>
              <div className="h-3 bg-[#1e1e24] w-5/6 rounded"></div>
              <div className="h-3 bg-[#1e1e24] w-4/5 rounded"></div>
            </div>
          </div>
          <div className="h-24 bg-black border border-panel rounded"></div>
        </div>
      </div>
    </div>
  );

  const renderHomeLabSkeleton = () => (
    <div className="space-y-8 animate-pulse">
      {/* Header */}
      <div className="border-panel border-b pb-4 space-y-2">
        <div className="h-4 bg-[#1e1e24] w-32 rounded"></div>
        <div className="h-7 bg-[#26262f] w-64 rounded"></div>
      </div>
      {/* Cluster Status */}
      <div className="bg-[#121216]/50 border border-panel p-4 rounded space-y-3">
        <div className="h-4 bg-[#26262f] w-40 rounded"></div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-1">
              <div className="h-3 bg-[#1e1e24] w-12 rounded"></div>
              <div className="h-4 bg-[#26262f] w-20 rounded"></div>
            </div>
          ))}
        </div>
      </div>
      {/* Achievements Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="border border-panel bg-[#121216]/30 p-4 rounded space-y-3">
            <div className="flex justify-between">
              <div className="h-4 bg-[#26262f] w-1/2 rounded"></div>
              <div className="h-3 bg-[#1e1e24] w-12 rounded"></div>
            </div>
            <div className="h-3 bg-[#1e1e24] w-1/4 rounded"></div>
            <div className="h-3 bg-[#1e1e24] w-full rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );

  switch (section) {
    case 'core':
      return renderCoreSkeleton();
    case 'skills':
      return renderSkillsSkeleton();
    case 'experience':
      return renderExperienceSkeleton();
    case 'projects':
      return renderProjectsSkeleton();
    case 'homelab':
      return renderHomeLabSkeleton();
    default:
      return renderCoreSkeleton();
  }
};
