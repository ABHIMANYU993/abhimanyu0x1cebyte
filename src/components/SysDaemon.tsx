import React, { useState, useEffect } from 'react';

// Coordinates matching empty layout areas of the website
const CORNERS = [
  { class: 'top-[72px] right-6' },                 // Top Right
  { class: 'bottom-[60px] right-6' },              // Bottom Right
  { class: 'bottom-[60px] left-6 md:left-[344px]' }, // Bottom Left (avoiding w-80 sidebar)
  { class: 'top-[72px] left-6 md:left-[344px]' }    // Top Left (avoiding w-80 sidebar)
];

const FACES = [
  '[°-°]',
  '(⌐■_■)',
  '[0_0]',
  '[-_-]',
  '[o_o]',
  '[x_x]',
  '[•_•]',
  '[d_b]',
  '[■_■]'
];

const TELEMETRIES = [
  'ping: 12ms',
  'sys: ok',
  'scan: idle',
  'load: 0.12',
  'cgroup: active',
  'recv: 0.0kb',
  'state: standby',
  'mem: ok',
  'kvm: idle',
  'bgp: sync'
];

export const SysDaemon: React.FC = () => {
  const [cornerIndex, setCornerIndex] = useState(0);
  const [face, setFace] = useState('[0_0]');
  const [telemetry, setTelemetry] = useState('sys: ok');

  // Teleportation timer (moves corners every 20 seconds)
  useEffect(() => {
    const moveTimer = setInterval(() => {
      setCornerIndex((prev) => {
        let next = Math.floor(Math.random() * CORNERS.length);
        while (next === prev) {
          next = Math.floor(Math.random() * CORNERS.length);
        }
        return next;
      });
    }, 20000);

    return () => clearInterval(moveTimer);
  }, []);

  // Face blinking and changing timer (every 4 seconds)
  useEffect(() => {
    const faceTimer = setInterval(() => {
      const randomFace = FACES[Math.floor(Math.random() * FACES.length)];
      setFace(randomFace);
    }, 4000);

    return () => clearInterval(faceTimer);
  }, []);

  // Telemetry status readout changer (every 6 seconds)
  useEffect(() => {
    const telemetryTimer = setInterval(() => {
      const randomTel = TELEMETRIES[Math.floor(Math.random() * TELEMETRIES.length)];
      setTelemetry(randomTel);
    }, 6000);

    return () => clearInterval(telemetryTimer);
  }, []);

  const currentCorner = CORNERS[cornerIndex];

  return (
    <div
      className={`fixed ${currentCorner.class} pointer-events-none z-30 font-mono text-[10px] text-machine-orange bg-[#121216]/90 border border-panel px-2 py-1 rounded shadow-[0_4px_12px_rgba(0,0,0,0.5)] flex items-center space-x-1.5 select-none transition-all duration-700 ease-in-out`}
    >
      {/* Tiny active process indicator */}
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-machine-orange opacity-75"></span>
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-machine-orange"></span>
      </span>
      <span className="text-panel-textActive font-bold">{face}</span>
      <span className="text-panel-textMuted border-l border-panel pl-1.5">{telemetry}</span>
    </div>
  );
};
