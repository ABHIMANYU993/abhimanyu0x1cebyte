import React, { useState, useEffect, useRef } from 'react';

interface BootLoaderProps {
  onComplete: () => void;
}

interface LogLine {
  prefix: string;
  text: string;
  status?: 'OK' | 'INIT' | 'WARN';
}

const BOOT_LOGS: LogLine[] = [
  { prefix: '[  0.000000]', text: 'Linux version 6.8.0-abhimanyu (gcc version 13.2.0) x86_64' },
  { prefix: '[  0.000000]', text: 'Command line: BOOT_IMAGE=/vmlinuz-6.8.0-abhimanyu root=UUID=sys-telemetry-01 ro quiet' },
  { prefix: '[  0.000000]', text: 'x86/fpu: Supporting XSAVE feature 0x001: \'x87 floating point registers\'' },
  { prefix: '[  0.000000]', text: 'x86/fpu: Supporting XSAVE feature 0x002: \'SSE registers\'' },
  { prefix: '[  0.000000]', text: 'BIOS-provided physical RAM map:' },
  { prefix: '[  0.000000]', text: 'BIOS-e820: [mem 0x0000000000000000-0x000000000009ffff] usable' },
  { prefix: '[  0.000000]', text: 'BIOS-e820: [mem 0x0000000000100000-0x000000007fffffff] usable' },
  { prefix: '[  0.005321]', text: 'DMI: Polaris Compute Cluster Node 01, BIOS v2.0.4-LTS 06/28/2026' },
  { prefix: '[  0.012431]', text: 'smpboot: Allowing 8 CPUs, 8 hotplug CPUs' },
  { prefix: '[  0.024512]', text: 'ACPI: 12 ACPI AML tables successfully acquired and loaded' },
  { prefix: '[  0.038912]', text: 'PCI: Using configuration type 1 for base access' },
  { prefix: '[  0.052132]', text: 'cgroup: Initializing cgroup subsys cpu' },
  { prefix: '[  0.052140]', text: 'cgroup: Initializing cgroup subsys memory' },
  { prefix: '[  0.103452]', text: 'Memory: 32768000K/33554432K available (16384K kernel code, 2048K rwdata)' },
  { prefix: '[  0.154231]', text: 'CPU0: Intel(R) Core(TM) i9-14900K @ 5.80GHz' },
  { prefix: '[  0.201412]', text: 'SECUREBOOT: secureboot state enabled' },
  { prefix: '[  0.301293]', text: 'SCSI subsystem initialized' },
  { prefix: '[  0.420142]', text: 'libata version 3.00 PCIe SATA link initialized' },
  { prefix: '[  0.501992]', text: 'usbcore: registered new interface driver usbfs' },
  { prefix: '[  0.589123]', text: 'input: Power Button as /devices/LTS/input/input0' },
  { prefix: '[  0.612451]', text: 'ext4-fs (sda1): mounted filesystem with ordered data mode. Opts: none.' },
  { prefix: '[  0.710322]', text: 'loop: module loaded' },
  { prefix: '[  0.751321]', text: 'Started Journal Service.', status: 'OK' },
  { prefix: '[  0.812412]', text: 'Starting KVM Virtualization Driver...', status: 'INIT' },
  { prefix: '[  0.887123]', text: 'Started KVM Virtualization Driver.', status: 'OK' },
  { prefix: '[  0.941212]', text: 'Loading Qdrant Vector Database Cluster...', status: 'INIT' },
  { prefix: '[  1.012431]', text: 'Started Qdrant Vector DB (port 6333, nodes=3).', status: 'OK' },
  { prefix: '[  1.082192]', text: 'Configuring WireGuard BGP Peers...', status: 'INIT' },
  { prefix: '[  1.152431]', text: 'Established FRR BGP Session with DN42 peer AS424242.', status: 'OK' },
  { prefix: '[  1.219831]', text: 'Activating LoRA fine-tuning sandbox...', status: 'INIT' },
  { prefix: '[  1.282941]', text: 'LoRA training pipeline on standby (cuda:0).', status: 'OK' },
  { prefix: '[  1.341231]', text: 'Mounting memory cgroups for container execution...', status: 'INIT' },
  { prefix: '[  1.401932]', text: 'Started Sys-Telemetry daemon on Node 01.', status: 'OK' },
  { prefix: '[  1.450123]', text: 'Reaching Target Multi-User System.', status: 'OK' },
  { prefix: '[  1.512423]', text: 'Ready.' },
  { prefix: '[  1.520000]', text: '--- INITIALIZING PORTFOLIO TERMINAL SHELL ---' },
  { prefix: '[  1.550000]', text: 'guest-session@abhimanyu:~$ exec --interactive --portfolio' }
];

export const BootLoader: React.FC<BootLoaderProps> = ({ onComplete }) => {
  const [displayedLogs, setDisplayedLogs] = useState<LogLine[]>([]);
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const logIndexRef = useRef(0);

  useEffect(() => {
    // Add logs rapidly
    const logInterval = setInterval(() => {
      if (logIndexRef.current < BOOT_LOGS.length) {
        // Pick between adding 1 or 2 lines for realistic burstiness
        const count = Math.random() > 0.7 ? 2 : 1;
        const slice = BOOT_LOGS.slice(0, Math.min(logIndexRef.current + count, BOOT_LOGS.length));
        logIndexRef.current = slice.length;
        setDisplayedLogs(slice);
        setProgress(Math.min(Math.floor((slice.length / BOOT_LOGS.length) * 100), 100));
      } else {
        clearInterval(logInterval);
        // Pause briefly at completion before fading out
        setTimeout(() => {
          setIsFading(true);
          setTimeout(() => {
            onComplete();
          }, 450); // Match Tailwind duration-500
        }, 600);
      }
    }, 28); // super fast boot simulation

    // Listener for ESC to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFading(true);
        setTimeout(() => {
          onComplete();
        }, 150);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(logInterval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayedLogs]);

  return (
    <div
      className={`fixed inset-0 bg-[#0a0a0c] z-[9999] flex flex-col font-mono p-4 md:p-8 select-none transition-opacity duration-500 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Telemetry Header */}
      <div className="flex justify-between items-center text-[10px] text-panel-textMuted border-b border-panel pb-3 mb-4">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-machine-orange animate-pulse"></span>
          <span className="font-bold text-panel-textActive">BOOT_SEQUENCE://POLARIS.NODE_01</span>
        </div>
        <div className="flex space-x-4">
          <span>BAUD_RATE: 115200</span>
          <span>DEV: /dev/ttyAMA0</span>
        </div>
      </div>

      {/* Terminal Output */}
      <div
        ref={scrollRef}
        className="flex-grow overflow-y-auto terminal-scroll text-xs md:text-sm text-panel-textActive space-y-1.5 pr-2"
      >
        {displayedLogs.map((log, index) => {
          let statusColor = 'text-machine-orange';
          if (log.status === 'OK') statusColor = 'text-machine-green';
          if (log.status === 'WARN') statusColor = 'text-machine-amber';

          return (
            <div key={index} className="flex items-start leading-5">
              <span className="text-panel-textMuted select-none mr-3 flex-shrink-0">{log.prefix}</span>
              {log.status && (
                <span className="mr-2 flex-shrink-0">
                  [ <span className={`${statusColor} font-bold`}>{log.status}</span> ]
                </span>
              )}
              <span className="break-all">{log.text}</span>
            </div>
          );
        })}
        {/* Blinking cursor */}
        <div className="flex items-center leading-5">
          <span className="text-panel-textMuted select-none mr-3 opacity-0">[  1.550000]</span>
          <span className="w-2 h-4 bg-machine-orange animate-pulse"></span>
        </div>
      </div>

      {/* Telemetry Footer Status */}
      <div className="mt-4 border-t border-panel pt-4 flex flex-col sm:flex-row justify-between items-center text-[10px] text-panel-textMuted space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <span>LOAD_SYS: {progress}%</span>
          <div className="w-32 md:w-48 bg-[#121216] border border-panel h-2 rounded-sm overflow-hidden">
            <div
              className="bg-machine-orange h-full transition-all duration-75"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <button
          onClick={() => {
            setIsFading(true);
            setTimeout(onComplete, 150);
          }}
          className="text-panel-textMuted hover:text-machine-orange transition-colors border border-panel px-2.5 py-1 rounded bg-[#121216] hover:border-machine-orange"
        >
          SKIP BOOT [ESC]
        </button>
      </div>
    </div>
  );
};
