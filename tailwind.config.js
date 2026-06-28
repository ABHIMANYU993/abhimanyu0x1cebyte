/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans"', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        // Bespoke technical/industrial color palette
        panel: {
          bg: '#000000',        // Pure pitch dark base background
          card: '#121216',      // Technical panel component background
          header: '#18181f',    // Instrument cluster header background
          border: '#222227',    // Low-light divider
          borderActive: '#38383f', // Active mechanical interface border
          grid: '#141418',      // System structure grid line
          textMuted: '#8b8b96', // Secondary technical readout text
          textActive: '#f4f4f7'  // High-contrast primary readout text
        },
        machine: {
          orange: '#e05a36',    // Primary warning/status indicator (Safety Orange)
          orangeMuted: '#aa3a1d',
          green: '#10b981',     // Normal status / Operational state
          greenMuted: '#064e3b',
          blue: '#3b82f6',      // Telemetry / Network state
          cyan: '#06b6d4',      // Pipeline / Orchestration status
          amber: '#f59e0b',     // Notice state
        }
      },
      animation: {
        'terminal-cursor': 'blink 1s step-end infinite',
        'fade-in': 'fadeIn 200ms cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        }
      }
    },
  },
  plugins: [],
}
