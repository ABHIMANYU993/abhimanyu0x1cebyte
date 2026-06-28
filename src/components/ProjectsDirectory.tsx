import React, { useState, useEffect } from 'react';
import { ExternalLink, Terminal } from 'lucide-react';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" role="presentation">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);


interface Project {
  id: string;
  title: string;
  tagline: string;
  stack: string[];
  repo: string;
  demo?: string;
  bullets: string[];
  logs: string[];
}

export const ProjectsDirectory: React.FC = () => {
  const [selectedProjId, setSelectedProjId] = useState<string>('vmm');
  const [logIndex, setLogIndex] = useState<number>(0);
  const [activeLogs, setActiveLogs] = useState<Array<{ text: string; timestamp: string }>>([]);

  const projectsData: Project[] = [
    {
      id: 'codeveritus',
      title: 'CodeVeritus',
      tagline: 'PyTorch Code Authorship Classifier & Secure Edge Deployment',
      stack: ['PyTorch', 'CodeBERT', 'FastAPI', 'MongoDB', 'Docker Compose', 'Nginx', 'Cloudflare'],
      repo: 'https://github.com/ABHIMANYU993/codeveritus',
      demo: 'https://codeveritus.makeatron.in',
      bullets: [
        'Architected a custom PyTorch classification model leveraging RobertaForSequenceClassification pre-trained on CodeBERT, injecting a custom nn.Dropout(p=0.3) layer into the architecture to prevent overfitting during code authorship evaluation.',
        'Implemented a robust tokenization and inference pipeline utilizing RobertaTokenizer to truncate inputs to 512 tokens, and applied a Softmax function (F.softmax) to model outputs to convert unnormalized logits into percentage probabilities for AI-generated versus human-written code.',
        'Optimized the model\'s inference memory footprint and accelerated computation speeds by enforcing torch.no_grad() to cleanly disable gradient tracking, paired with parameter quantization.',
        'Developed a backend data processing pipeline that connects to MongoDB to retrieve user code submissions, processes the tokenized samples and attention masks, and updates records with prediction labels.',
        'Migrated deployment infrastructure from a self-hosted RHEL Proxmox VM to an Alpine Linux VM running the application stack via Docker Compose.',
        'Orchestrated secure serving and routing using Nginx Proxy Manager for reverse proxy and SSL termination, exposing the app through Cloudflare\'s proxied DNS (Orange Cloud) with 2FA protection.',
        'Applied for an official Indian government copyright (via copyright.gov.in) for the CodeVeritus project core logic (status: under process).'
      ],
      logs: [
        'CODEVERITUS.service: Initializing classification engine...',
        'PyTorch: Loading RobertaForSequenceClassification pre-trained on CodeBERT',
        'Model layers configured: Dropout(p=0.3) successfully injected',
        'Database: MongoDB connected at standard port 27017',
        'Inference: Optimizing footprint... Enforcing torch.no_grad() & quantizing weights',
        'Nginx: Reverse proxy mapping active (exposing 443 with SSL termination)',
        'Cloudflare: Proxied DNS routing active (Orange Cloud protection enabled)',
        'Classifying batch: input truncated to 512 tokens. Softmax applied.',
        '[CLASSIFIED] Match probability: Human=94.2%, AI=5.8%. Writing to DB.'
      ]
    },
    {
      id: 'vmm',
      title: 'Bare-Metal Virtual Machine Monitor (VMM)',
      tagline: 'Minimalist Type-2 Hypervisor / ELF Loader built using Linux KVM API',
      stack: ['C', 'x86 Assembly', 'Linux KVM API', 'ELF Parser', 'Multiboot v1'],
      repo: 'https://github.com/ABHIMANYU993/Build_My_Own_OS_VMM',
      bullets: [
        'Engineered a pure-C ELF parser that scans 32-bit kernel Program Headers to isolate p_type == PT_LOAD segments, executing a direct memcpy into memory-mapped KVM guest RAM using p_paddr physical offsets and zeroing out .bss sections.',
        'Orchestrated the Multiboot v1 hardware handshake prior to kernel execution by injecting the magic value 0x2BADB002 into the EAX register and configuring EBX with guest physical address 0x00008000 pointing to the manually constructed Multiboot Information (MBI) structure.',
        'Transitioned the virtualized CPU into 32-bit Protected Mode by manipulating registers via KVM_SET_SREGS ioctl, applying a 0x1 hex mask to enable the CR0_PE (Protection Enable) bit.',
        'Configured a Basic Flat Memory Model without executing lgdt in guest by directly mutating processor descriptor caches via KVM kvm_segment structure, enforcing 0xFFFFFFFF limit, Granularity (g=1), and Default Operand Size (db=1).',
        'Architected minimal Global Descriptor Table (GDT) state by assigning Code Segment (CS) to selector 0x08 (type=0xB) and Data Segments (DS, ES, SS) to selector 0x10 (type=0x3), setting unusable=1 flags for unused segments (FS, GS, LDT).',
        'Programmed KVM_RUN execution loop to intercept hardware exits, handling KVM_EXIT_IO for COM1 Serial Port (0x3F8) by extracting character payloads, and emulating VGA text buffer MMIO traps mapped at physical address 0xB8000.'
      ],
      logs: [
        'KVM.VMM: Initializing bare-metal execution environment...',
        'KVM: ioctl(kvm_fd, KVM_CREATE_VM, 0) successful',
        'ELF: Parsing kernel program headers... PT_LOAD segment found at 0x100000',
        'ELF: memcpy 0x4B3A bytes -> guest physical address 0x100000',
        'GUEST: Injecting Multiboot v1 handshake: EAX = 0x2BADB002, EBX = 0x8000',
        'KVM: Setting SREGS... CR0_PE = 1 (enabling 32-bit Protected Mode)',
        'KVM: Segment CS initialized: selector=0x08, limit=0xFFFFFFFF, base=0x0, g=1, db=1',
        'KVM: Segment DS/ES/SS initialized: selector=0x10, limit=0xFFFFFFFF, base=0x0, g=1, db=1',
        'Hyperloop: Launching vcpu_run loop...',
        'Intercepted: KVM_EXIT_IO at COM1 [0x3F8] -> Char output: \'H\'',
        'Intercepted: KVM_EXIT_IO at COM1 [0x3F8] -> Char output: \'e\'',
        'Intercepted: KVM_EXIT_IO at COM1 [0x3F8] -> Char output: \'l\'',
        'Intercepted: KVM_EXIT_IO at COM1 [0x3F8] -> Char output: \'l\'',
        'Intercepted: KVM_EXIT_IO at COM1 [0x3F8] -> Char output: \'o\'',
        'Intercepted: KVM_EXIT_MMIO at 0xB8000 -> emulating VGA text write...'
      ]
    },
    {
      id: 'flux',
      title: 'High-Fidelity Generative AI Fine-Tuning',
      tagline: 'Enterprise PyTorch fine-tuning and LoRA weight hot-swap inference backend',
      stack: ['PyTorch', 'LoRA', 'Flux.1.dev', 'RunPod', 'FastAPI', 'Computer Vision'],
      repo: 'https://github.com/ABHIMANYU993/Diffusion_Model_Fine_Tuning_Flux1.Dev',
      bullets: [
        'Benchmarked DreamBooth against Low-Rank Adaptation (LoRA) fine-tuning architectures for the 26GB Flux.1.dev diffusion model. Discovered that LoRA guaranteed exact facial and structural identity preservation over 3,000 training steps.',
        'Conducted rigorous hardware profiling across 96GB, 48GB, and 24GB RunPod GPU instances, identifying 48GB as optimal for throughput but restricting training footprint to 24GB VRAM ceiling to minimize cloud compute costs.',
        'Optimized PyTorch fine-tuning scripts, successfully slashing compute time per session by 33% and reducing a full 3,000-step training cycle from 1.5 hours to exactly 1.0 hour.',
        'Tuned PyTorch memory parameters and LoRA rank adaptations, limiting gradient updates to surface layers to manage memory requirements of Flux architecture.',
        'Developed an automated image pre-processing pipeline utilizing Computer Vision to isolate human subjects, center facial structures, and auto-generate text trigger descriptions.',
        'Architected an enterprise-grade FastAPI backend inference endpoint that runs a single base Flux model and dynamically hot-swaps lightweight (600-700MB) user-specific LoRA weights into memory per request.'
      ],
      logs: [
        'MLOPS.FLUX: Initializing diffusion fine-tuning monitor...',
        'RunPod: Profiling active GPU clusters. Selected 24GB VRAM hard ceiling.',
        'PyTorch: Quantizing base Flux.1.dev model parameters to bfloat16',
        'LoRA: Allocating rank r=16, alpha=32 adapter layers',
        'CV_Pipeline: Auto-cropping training set, facial alignment verified',
        'Optimizer: Learning rate = 1e-4, using AdamW with memory-efficient config',
        'Training: Step 1000/3000 | Loss: 0.1432 | VRAM: 22.8 GB',
        'Training: Step 2000/3000 | Loss: 0.0892 | VRAM: 22.8 GB',
        'Training: Step 3000/3000 | Loss: 0.0610 | VRAM: 22.8 GB',
        'FastAPI: Inference endpoint active. Standby for adapter load.',
        'Inference request: User_4923. Loading LoRA adapter (640MB) into VRAM...',
        'Inference: Hot-swap completed in 0.82 seconds. Generating image...'
      ]
    },
    {
      id: 'mindmic',
      title: 'MindMic',
      tagline: 'Wayland-Native Offline Whisper AI transcription overlay',
      stack: ['Python', 'Whisper AI', 'PyQt6', 'Hyprland API', 'Unix Domain Sockets', 'Wayland protocol'],
      repo: 'https://github.com/ABHIMANYU993/MindMic',
      bullets: [
        'Engineered a standalone Python audio daemon handling PyAudio streams and RMS calculations to process audio locally via a Whisper AI server, completely eliminating cloud dependencies.',
        'Architected a frameless, translucent Wayland overlay leveraging PyQt6 and QtWebEngineWidgets (QWebEngineView) to natively render an HTML/CSS UI, avoiding Electron resource overhead.',
        'Integrated with Hyprland compositor by deploying custom window rules (nofocus, float, pin) that guarantee the PyQt6 interface remains pinned across all workspaces and never steals focus.',
        'Configured Unix domain sockets for low-latency IPC, linking the background Python daemon to a lightweight Bash CLI script (toggle_mindmic.sh) triggered by native Hyprland keybinds.',
        'Established a bidirectional QWebChannel JavaScript bridge, synchronizing the Python backend state machine and microphone volume levels directly with the frontend UI overlay.',
        'Bypassed Wayland window isolation constraints for text injection by pipelining transcription into wl-copy and utilizing zwp_virtual_keyboard_v1 protocol via wtype to simulate Ctrl+V keystrokes.'
      ],
      logs: [
        'MINDMIC.daemon: Initializing local audio monitor...',
        'Audio: PyAudio stream active (sample_rate=16000, channels=1)',
        'Hyprland: Querying state... Pinning window (class: mindmic-overlay)',
        'IPC: Unix domain socket bound to /tmp/mindmic.sock',
        'Whisper: Local server online (model: whisper-base-en)',
        'Bash: Socket trigger script toggle_mindmic.sh mapped to [Super+Alt+M]',
        'QWebChannel: Bidirectional JavaScript bridge established',
        '[RECORDING] Capturing audio... RMS: 0.045, Volume Level = 45%',
        '[TRANSCRIPTION] "Deploy the container on the target environment"',
        'wl-copy: Pipelining transcript text to clipboard',
        'wtype: Simulating virtual keyboard sequence zwp_virtual_keyboard_v1'
      ]
    },
    {
      id: 'mirrormind',
      title: 'MirrorMind',
      tagline: 'eBPF-driven LangGraph AI Supervisor for shell intent translation',
      stack: ['LangGraph', 'eBPF (bcc)', 'ChromaDB', 'Qdrant', 'Qwen-9B', 'Python', 'Zsh'],
      repo: 'https://github.com/ABHIMANYU993/MirrorMind',
      bullets: [
        'Engineered a deterministic, cyclic LangGraph orchestration loop utilizing a multi-node architecture (Supervisor, Execution, Memory, Response) relying on an explicit iteration_count to prevent loops.',
        'Implemented a dual-layer, hybrid XML/Regex parsing system within the LangGraph Supervisor node to enforce strict output schemas (extracting think, route, and metacognition tags).',
        'Deployed a stateful Python eBPF daemon utilizing the bcc library alongside custom Zsh pre-execution hooks to capture both user intent and ground-truth kernel binaries, intercepting shell alias expansions.',
        'Architected a filtered telemetry pipeline that prunes background Wayland GUI noise before aggregating execution traces and feeding JSON payloads into ChromaDB for behavioral memory.',
        'Bypassed the strict 8GB VRAM bottleneck on the RTX 3070 Ti by dynamically isolating BGE-M3 embedding server to scheduled nightly cron ingestions, or forcing CPU-bound execution.',
        'Configured dynamic Qdrant retrieval where top-K limits are strictly bound to Supervisor\'s metacognition Boolean flag, preventing OOM crashes in the Qwen-9B context window.'
      ],
      logs: [
        'MIRRORMIND: Initializing agent loops...',
        'eBPF: Loading kprobe/sys_execve from BCC script',
        'Zsh: Pre-exec hooks linked. Capturing terminal keystrokes.',
        'Telemetry: Waybar / Oh-my-posh poll packets discarded',
        'Model: Qwen-9B loaded. VRAM allocation limited to 7.8GB.',
        'Supervisor Node: Invoking iteration loop (current_count=1)',
        'Parser: Extracting <think>...</think> and <route>...</route> XML tags',
        'eBPF hook: Intercepted kernel binary execution of git commit -m "update"',
        'Memory: ChromaDB vector persistence active. Ingesting trace payload.'
      ]
    },
    {
      id: 'bgp',
      title: 'Enterprise BGP Edge Node',
      tagline: 'IPv6-first WireGuard VPN and Multiprotocol BGP Peering architecture',
      stack: ['FRRouting (FRR)', 'BGP (RFC 5549)', 'WireGuard', 'Proxmox', 'Pi-hole', 'Debian'],
      repo: 'https://github.com/ABHIMANYU993/networking_systems',
      bullets: [
        'Provisioned a Debian VM on a Proxmox hypervisor to function as a dedicated edge router, isolating BGP operations and WireGuard tunnel termination from internal application servers.',
        'Bypassed ISP IPv4 Carrier-Grade NAT by deploying an IPv6-first WireGuard overlay network, injecting PersistentKeepalive=25 into the configuration to punch stateful UDP holes.',
        'Engineered a Dockerized Cloudflare Dynamic DNS (DDNS) automation script to query the host routing table, tracking and updating AAAA records to counteract SLAAC prefix rotations.',
        'Implemented BGP Unnumbered (RFC 5549/RFC 8950 Extended Next-Hop) within FRRouting (FRR) to negotiate Multiprotocol BGP sessions exclusively over unroutable link-local fe80:: WireGuard interfaces.',
        'Exchanged legacy IPv4 routing tables across modern IPv6 transport layers by activating the IPv4 address family over the fe80:: interface, avoiding consumption of globally routable IP addresses.',
        'Debugged cross-vendor BGP TCP Port 179 session drops between local FRR and upstream BIRD daemon by translating raw hexadecimal packet dumps of the BGP OPEN messages.',
        'Stripped Capability 71 (Long-Lived Graceful Restart) and Capability 73 (Hostname) from the FRR engine by executing config directives directly within /etc/frr/frr.conf to resolve capability panic.',
        'Anchored registered DN42 prefix fd77:192e:168a::/48 to a kernel-level blackhole interface to enforce Null Route Law, configuring outbound route-maps to mitigate transit route leaks.'
      ],
      logs: [
        'FRR: Initializing Multiprotocol BGP routing engine...',
        'WireGuard: Initializing virtual interface wg-dn42. Binding to local port 51820',
        'Kernel: Injecting blackhole route for prefix fd77:192e:168a::/48',
        'FRR: Negotiating Multiprotocol BGP unnumbered on interface wg-dn42',
        'FRR: Session drop on TCP 179 from upstream BIRD peer.',
        'Debugger: Parsing BGP OPEN payload. Code 71 / 73 unsupported.',
        'FRR: Executing no bgp graceful-restart & no bgp default show-hostname',
        'FRR: Peering session established with fe80::4242:1972 on wg-dn42',
        'Routing: EXCHANGED 412 IPv4 routes across IPv6 Link-Local transport layer'
      ]
    },
    {
      id: 'govschemes',
      title: 'Automated Government Schemes Notifier',
      tagline: 'Crawling and digitization RAG pipeline using HuggingFace & FAISS',
      stack: ['Scrapy', 'Playwright', 'PyMuPDF', 'EasyOCR', 'FAISS', 'Groq API', 'Twilio'],
      repo: 'https://github.com/ABHIMANYU993/Gov_Scheme_Notifier',
      bullets: [
        'Engineered an asynchronous web scraping architecture leveraging Scrapy and aiohttp, paired with Playwright to extract dynamic PDF circulars from JavaScript-rendered portals.',
        'Developed a multi-stage document digitization engine utilizing PyMuPDF (Fitz) to systematically isolate and extract raw image layers from scanned, unsearchable government PDFs.',
        'Integrated PyTorch-backed EasyOCR to process extracted PDF images, ensuring highly accurate text digitization to overcome ambiguous data extraction challenges.',
        'Configured a Retrieval-Augmented Generation (RAG) pipeline utilizing HuggingFace embeddings and a FAISS vector index to map and retrieve relevant scheme guidelines.',
        'Orchestrated prompt engineering by routing retrieved FAISS context to Mixtral-8x7B via the Groq API to extract deadlines, required documents, and action steps.',
        'Automated notification delivery loop by cross-referencing AI eligibility criteria against a database, triggering personalized Twilio SMS alerts to notify matching users.'
      ],
      logs: [
        'SCHEME_NOTIFIER: Initializing crawl cycle...',
        'Playwright: Launching headless Chromium instance...',
        'Scrapy: Scraping scheme portal. Found new PDF circular: scheme_2026_11.pdf',
        'PyMuPDF: Isolating raster image layers. 3 scanned pages detected.',
        'EasyOCR: Performing text detection on PyTorch backend...',
        'FAISS: Ingesting digitized text chunks with HuggingFace embeddings',
        'Groq API: Submitting context to Mixtral-8x7B for summarization...',
        'Groq: Successfully parsed parameters: Deadline=2026-09-12, ReqDocs=IdentityCard,IncomeCertificate',
        'Database: Matching eligible users... 14 entries found.',
        'Twilio: Broadcasting SMS notifications. All dispatch queues empty.'
      ]
    },
    {
      id: 'gesture',
      title: 'Touchless Hand Gesture Interface',
      tagline: 'Computer Vision pipeline translating spatial hand landmarks to OS events',
      stack: ['OpenCV', 'MediaPipe', 'NumPy', 'pynput', 'PyAutoGUI'],
      repo: 'https://github.com/ABHIMANYU993/Virtual_Keyboard',
      bullets: [
        'Configured computer vision pipelines utilizing OpenCV to process live video matrices locked at 1280x720 resolution, passing frames to MediaPipe for hand landmark extraction.',
        'Programmed dynamic state-driven virtual keyboard rendering onto the active video feed, managing layouts across standard, lowercase, and symbols.',
        'Programmed spatial heuristic coordinate mapping leveraging NumPy arrays to translate detected hand landmarks into virtual key interactions and cursor movements.',
        'Implemented handling for complex control inputs, binding landmark intersections to execute "ENTER", "CAP", and "DEL" keystrokes via pynput and PyAutoGUI.',
        'Optimized frame latency and cursor interpolation to ensure near-instantaneous response times when switching between tracking and proximity-based gesture modes.'
      ],
      logs: [
        'GESTURE_INTERFACE: Loading computer vision pipeline...',
        'OpenCV: Opening video capture capture_fd = 0 (1280x720, 30fps)',
        'MediaPipe: Hand Landmark model loaded into memory',
        'NumPy: Calibrating coordinate transformation matrix',
        'Frame loop: Latency = 12ms. Running interpolation filter.',
        'Landmarks detected: Index Tip (8), Index Pip (6). Proximity < 0.02',
        'Gesture detected: Double Click. Dispatching click via PyAutoGUI.',
        'Keypress intercepted: landmark overlay on key "C". Dispatching pynput keystroke.'
      ]
    },
    {
      id: 'nlp-crypto',
      title: 'NLP-Driven Cryptocurrency Assistant',
      tagline: 'Voice command intent parsing engine utilizing SpaCy and Speech Recognition',
      stack: ['SpaCy', 'Python Speech Recognition', 'MongoDB', 'Python'],
      repo: 'https://github.com/ABHIMANYU993/nlp-crypto-assistant',
      bullets: [
        'Architected an asynchronous Python intent recognition pipeline utilizing the SpaCy NLP library to process raw voice-to-text transcriptions and interpret commands (e.g., "Send 2 BTC").',
        'Configured semantic entity extraction within the NLP engine to isolate transaction variables—specifically the recipient, cryptocurrency type, and transfer amount.',
        'Integrated real-time audio capture leveraging Speech Recognition to continuously convert spoken commands into parsable text for hands-free operations.',
        'Architected a secure backend storage solution using MongoDB to manage transaction payloads and implemented an immutable logging mechanism to track command history.'
      ],
      logs: [
        'CRYPTO_ASSISTANT: Initializing intent engine...',
        'SpaCy: Loading NLP model en_core_web_sm...',
        'Audio: Listening on local default input channel...',
        'SpeechRecognition: Spoken input captured. Transcribing...',
        'Transcript: "Send zero point five Ethereum to Alice"',
        'SpaCy: Running pipeline... Intent: SEND_TRANSACTION',
        'Entities extracted: Amount=0.5, Currency=ETH, Recipient=Alice',
        'Database: Staging transaction in MongoDB. ID: 68a2bf19...'
      ]
    }
  ];

  const selectedProj = projectsData.find((p) => p.id === selectedProjId) || projectsData[0];

  // Simulating terminal logs outputting step-by-step
  useEffect(() => {
    setLogIndex(0);
    setActiveLogs([{ 
      text: selectedProj.logs[0], 
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }) 
    }]);
  }, [selectedProjId]);

  useEffect(() => {
    if (logIndex < selectedProj.logs.length - 1) {
      const timer = setTimeout(() => {
        const nextIndex = logIndex + 1;
        setLogIndex(nextIndex);
        setActiveLogs((prev) => [
          ...prev, 
          { 
            text: selectedProj.logs[nextIndex], 
            timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }) 
          }
        ]);
      }, 350 + Math.random() * 200);
      return () => clearTimeout(timer);
    }
  }, [logIndex, selectedProj]);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="border-panel border-b pb-4">
        <div className="font-mono text-xs text-machine-orange mb-1 font-bold">SYSTEM.PROJ // DIRECTORY</div>
        <h2 className="text-2xl font-bold tracking-tight text-panel-textActive">INJECTED PROJECTS DIRECTORY</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Projects List */}
        <div className="lg:col-span-4 space-y-2 select-none">
          <div className="px-2 py-1 text-panel-textMuted font-mono text-[10px] font-bold uppercase tracking-wider">
            Project Nodes
          </div>
          <div className="space-y-1.5 max-h-[360px] lg:max-h-none overflow-y-auto terminal-scroll pr-1">
            {projectsData.map((proj) => (
              <button
                key={proj.id}
                onClick={() => setSelectedProjId(proj.id)}
                className={`w-full text-left p-2.5 rounded font-mono transition-all duration-150 border flex flex-col ${
                  selectedProjId === proj.id
                    ? 'bg-panel-card border-machine-orange text-panel-textActive'
                    : 'bg-panel-card/30 border-panel text-panel-textMuted hover:text-panel-textActive hover:bg-panel-card/60'
                }`}
              >
                <span className="text-xs font-semibold">{proj.title}</span>
                <span className="text-[10px] text-panel-textMuted mt-0.5 line-clamp-1">
                  {proj.tagline}
                </span>
              </button>
            ))}
          </div>

          {/* Other Open Source block */}
          <div className="border border-panel bg-panel-card/20 p-3 mt-4">
            <span className="font-mono text-[9px] text-panel-textMuted uppercase font-bold tracking-wider block mb-2">
              // Other Open Source Work
            </span>
            <div className="space-y-2">
              <a
                href="https://github.com/ABHIMANYU993/Bluethooh_Gesture_Controller"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between font-mono text-[10px] text-panel-textActive hover:text-machine-orange transition-colors"
              >
                <span>Bluetooth Gesture Ctrl</span>
                <GithubIcon className="w-3 h-3" />
              </a>
              <a
                href="https://github.com/ABHIMANYU993/face_recognition"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between font-mono text-[10px] text-panel-textActive hover:text-machine-orange transition-colors"
              >
                <span>Face Recognition System</span>
                <GithubIcon className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Active Project Details */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-panel-card border border-panel">
            {/* Title Bar */}
            <div className="border-panel border-b bg-panel-header px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
              <div>
                <h3 className="font-mono text-sm font-bold text-panel-textActive flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-machine-orange" />
                  <span>{selectedProj.title}</span>
                </h3>
                <span className="text-[10px] text-panel-textMuted font-sans block mt-0.5">{selectedProj.tagline}</span>
              </div>
              
              {/* Comms links */}
              <div className="flex items-center space-x-2 font-mono text-[10px]">
                <a
                  href={selectedProj.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 bg-panel-bg hover:bg-panel-border border border-panel px-2.5 py-1 text-panel-textActive hover:text-machine-orange transition-all"
                >
                  <GithubIcon className="w-3 h-3" />
                  <span>REPO</span>
                </a>
                {selectedProj.demo && (
                  <a
                    href={selectedProj.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1.5 bg-panel-bg hover:bg-panel-border border border-panel px-2.5 py-1 text-panel-textActive hover:text-machine-orange transition-all"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>DEMO</span>
                  </a>
                )}
              </div>
            </div>

            {/* Build Spec block */}
            <div className="p-4 border-panel border-b bg-[#0d0d0f]/50 flex flex-wrap gap-1.5">
              <span className="font-mono text-[10px] text-panel-textMuted uppercase py-0.5 mr-1 font-bold">
                Build Specs:
              </span>
              {selectedProj.stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[9px] bg-panel-bg border border-panel px-2 py-0.5 text-panel-textActive"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Bullets */}
            <div className="p-4 space-y-3">
              {selectedProj.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 text-xs">
                  <span className="text-machine-orange font-mono select-none mt-0.5">&gt;</span>
                  <p className="font-sans text-panel-textMuted leading-relaxed">
                    {bullet}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Diagnostics Log Console */}
          <div className="border border-panel bg-black">
            <div className="border-panel border-b bg-[#121216] px-4 py-2 flex items-center justify-between font-mono text-[10px] text-panel-textMuted">
              <span className="font-semibold uppercase tracking-wider">// LOCAL_NODE_LOG_STREAM</span>
              <span className="flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-machine-orange animate-pulse"></span>
                <span>RECEIVING_STREAM</span>
              </span>
            </div>
            <div className="p-4 font-mono text-[11px] text-panel-textMuted space-y-1.5 max-h-[220px] overflow-y-auto terminal-scroll min-h-[140px]">
              {activeLogs.map((log, index) => {
                const isError = log.text.includes('drop') || log.text.includes('panic') || log.text.includes('limit');
                const isSuccess = log.text.includes('successful') || log.text.includes('established') || log.text.includes('active') || log.text.includes('completed') || log.text.includes('verified') || log.text.includes('ONLINE');
                
                return (
                  <div key={index} className="flex items-start">
                    <span className="text-panel-textMuted select-none mr-2">[{log.timestamp}]</span>
                    <span className={isError ? 'text-machine-orange' : isSuccess ? 'text-machine-green' : 'text-panel-textActive'}>
                      {log.text}
                    </span>
                  </div>
                );
              })}
              {logIndex < selectedProj.logs.length - 1 && (
                <div className="flex items-center space-x-1 text-panel-textActive">
                  <span className="w-1.5 h-3 bg-machine-orange animate-terminal-cursor"></span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
