const PALETAS = {
  // 1. ÚNICA CON FONDO BLANCO
  brightWhite: {
    nombre: '☀️ Bright Studio',
    colores: {
      '--color-fondo-app': '#ffffff',
      '--color-fondo-superficie': '#f1f5f9',
      '--color-texto-principal': '#0f172a',
      '--color-texto-secundario': '#64748b',
      '--color-borde-general': '#1e293b',
      '--btn-primario-bg': '#2563eb',
      '--btn-secundario-bg': '#e2e8f0',
      '--card-prod-bg': '#ffffff',
      '--card-prod-bg-active': '#dbeafe',
    },
  },

  // 2. SIN BLANCO NI CREMA (Gris Pizarra / Teal Neutro)
  slateTeal: {
    nombre: '⚙️ Slate & Teal',
    colores: {
      '--color-fondo-app': '#cbd5e1',           // Gris pizarra intermedio
      '--color-fondo-superficie': '#94a3b8',    // Pizarra medio
      '--color-texto-principal': '#0f172a',    // Texto azul noche oscuro
      '--color-texto-secundario': '#334155',
      '--color-borde-general': '#1e293b',       // Borde marcado
      '--btn-primario-bg': '#0d9488',          // Botón Teal / Verde petróleo
      '--btn-secundario-bg': '#64748b',
      '--card-prod-bg': '#b2c1d4',              // Tarjetas tono pizarra
      '--card-prod-bg-active': '#5eead4',       // Activo brillante
    },
  },

  // 3. SIN BLANCO NI CREMA (Modo Oscuro Grafito)
  darkEspresso: {
    nombre: '🌙 Dark Espresso',
    colores: {
      '--color-fondo-app': '#181615',           // Grafito muy oscuro
      '--color-fondo-superficie': '#262220',    // Grafito medio
      '--color-texto-principal': '#f2ebe4',    // Texto claro
      '--color-texto-secundario': '#a1958a',
      '--color-borde-general': '#453c37',
      '--btn-primario-bg': '#d97724',          // Botón Ámbar / Naranja
      '--btn-secundario-bg': '#38312d',
      '--card-prod-bg': '#201c1a',
      '--card-prod-bg-active': '#38302c',
    },
  },
};

export default PALETAS;
