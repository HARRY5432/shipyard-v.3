module.exports = {
  content: [
    {
      "charset": "UTF-8",
      "viewport": "width=device-width, initial-scale=1.0",
    },
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'electric-blue': 'hsl(var(--brand-500))',
        'violet-purple': 'hsl(var(--secondary))',
        'fuchsia-pop': 'hsl(var(--accent))',
        'deep-space': 'hsl(var(--neutral-950))',
        'text-primary': 'hsl(var(--neutral-50))',
        'text-secondary': 'hsl(var(--neutral-400))',
        'text-tertiary': 'hsl(var(--neutral-600))',
      },
      fontFamily: {
        sans: ['"Geist Variable"', 'system-ui', 'sans-serif'],
        display: ['"Fraunces Variable"', 'Georgia', 'serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 3s var(--ease-smooth) infinite',
        'orb-spin': 'orb-spin 30s linear infinite',
        'orb-drift': 'orb-drift 18s var(--ease-smooth) infinite alternate',
        'float': 'float 4s var(--ease-smooth) infinite',
        'breathing': 'breathing 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { 'box-shadow': '0 0 0 hsl(var(--brand-400) / 0)' },
          '50%': { 'box-shadow': 'var(--glow-cyan-sm)' },
        },
        'orb-spin': {
          'from': { transform: 'rotateX(var(--orb-tilt, 0deg)) rotateY(0deg)' },
          'to': { transform: 'rotateX(var(--orb-tilt, 0deg)) rotateY(360deg)' },
        },
        'orb-drift': {
          'from': { transform: 'rotateZ(-6deg) translateY(-8px)' },
          'to': { transform: 'rotateZ(6deg) translateY(8px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        breathing: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
};
