// Shared chrome for policy pages: brand tokens, slim nav, footer, and the
// dark-mode + text-size accessibility menu (matches index.html behavior).

const { useState, useEffect, useRef } = React;

// ── Brand tokens ──────────────────────────────────────────────
const C = {
  cream: '#f3efe5',
  creamDark: '#e8e3d5',
  forest: '#2d4a1e',
  olive: '#5c7a35',
  sage: '#8aad5a',
  sagePale: '#dcebd0',
  warm: '#2a2a22',
  muted: '#6b6b60',
  white: '#faf8f3',
};

// ── Responsive hook ───────────────────────────────────────────
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [breakpoint]);
  return isMobile;
}

// ── Social SVG Icons ──────────────────────────────────────────
function SocialSVG({ label, size = 18, color = '#000' }) {
  const s = { width: size, height: size, fill: color, display:'block', flexShrink:0 };
  if (label === 'FB') return (
    <svg style={s} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.514c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  );
  if (label === 'IG') return (
    <svg style={s} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
  if (label === 'LI') return (
    <svg style={s} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
  if (label === 'TT') return (
    <svg style={s} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  );
  return null;
}

// ── Slim Nav (logo + home link) ───────────────────────────────
function PolicyNav() {
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:100,
      padding: scrolled ? `12px ${isMobile ? '20px' : '40px'}` : `20px ${isMobile ? '20px' : '40px'}`,
      background: scrolled ? 'rgba(243,239,229,0.97)' : 'transparent',
      backdropFilter: scrolled ? 'blur(8px)' : 'none',
      borderBottom: scrolled ? `1px solid ${C.creamDark}` : '1px solid transparent',
      transition:'all 0.3s ease',
      display:'flex', alignItems:'center', justifyContent:'space-between',
    }}>
      <a href="index.html" style={{ display:'flex', alignItems:'center', gap:14, textDecoration:'none' }}>
        <img src="uploads/Treefrog Logo.png" alt="Treefrog frog" style={{ height:46, width:'auto' }} />
        <img src="uploads/Treefrog Text.png" alt="Treefrog Music Therapy" style={{ height:44, width:'auto', display: isMobile ? 'none' : 'block' }} />
      </a>
      <a href="index.html" style={{
        padding:'9px 20px', background:'transparent', color:C.forest,
        border:`1.5px solid ${C.forest}`, borderRadius:100,
        textDecoration:'none', fontSize:14, fontWeight:600,
        letterSpacing:0.2, transition:'all 0.2s',
      }}
      onMouseEnter={e=>{ e.currentTarget.style.background=C.forest; e.currentTarget.style.color=C.white; }}
      onMouseLeave={e=>{ e.currentTarget.style.background='transparent'; e.currentTarget.style.color=C.forest; }}>
        ← Back to Home
      </a>
    </nav>
  );
}

// ── Footer ────────────────────────────────────────────────────
function PolicyFooter() {
  return (
    <footer style={{ background:'#1e3213', color:C.white, padding:'56px 40px 36px' }}>
      <div style={{ maxWidth:960, margin:'0 auto' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:18 }}>
          <img src="uploads/Treefrog Logo.png" alt="Treefrog frog" style={{ height:56, width:'auto' }} />
          <img src="uploads/Treefrog Text.png" alt="Treefrog Music Therapy" style={{ height:42, width:'auto', filter:'brightness(10)' }} />
        </div>
        <p style={{ fontSize:13, opacity:0.55, marginBottom:24 }}>ABN 68 153 383 890 &nbsp;·&nbsp; AMTA Registered Music Therapist</p>
        <div style={{ display:'flex', gap:8, marginBottom:32 }}>
          {[
            ['FB','https://www.facebook.com/profile.php?id=61574307872221'],
            ['IG','https://www.instagram.com/treefrogmusictherapy'],
            ['LI','http://linkedin.com/in/brada-t'],
            ['TT','https://www.tiktok.com/@treefrogmusictherapy'],
          ].map(([l, h]) => (
            <a key={l} href={h} style={{
              width:36, height:36, borderRadius:8, border:'1px solid rgba(255,255,255,0.15)',
              display:'flex', alignItems:'center', justifyContent:'center',
              textDecoration:'none', opacity:0.7, transition:'all 0.15s',
            }}
            onMouseEnter={e=>{ e.currentTarget.style.opacity='1'; e.currentTarget.style.background='rgba(255,255,255,0.1)'; }}
            onMouseLeave={e=>{ e.currentTarget.style.opacity='0.7'; e.currentTarget.style.background='transparent'; }}>
              <SocialSVG label={l} size={16} color={C.white} />
            </a>
          ))}
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12, paddingTop:24, borderTop:'1px solid rgba(255,255,255,0.1)' }}>
          <p style={{ fontSize:13, opacity:0.4 }}>© 2025 Bradley Ames-Thomson & Treefrog Music Therapy</p>
          <div style={{ display:'flex', gap:20 }}>
            <a href="Privacy Policy.html" style={{ fontSize:13, opacity:0.4, color:C.white, textDecoration:'none' }}
              onMouseEnter={e=>e.currentTarget.style.opacity='0.85'} onMouseLeave={e=>e.currentTarget.style.opacity='0.4'}>
              Privacy Policy
            </a>
            <a href="Accessibility Statement.html" style={{ fontSize:13, opacity:0.4, color:C.white, textDecoration:'none' }}
              onMouseEnter={e=>e.currentTarget.style.opacity='0.85'} onMouseLeave={e=>e.currentTarget.style.opacity='0.4'}>
              Accessibility Statement
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── ACCESSIBILITY MENU (dark mode + text size) ───────────────
// Matches the behavior on index.html: walks inline-style elements,
// uses a MutationObserver to catch re-renders.
const DARK_BG_MAP = {
  'rgb(243, 239, 229)': '#1c1b15', // cream
  'rgb(250, 248, 243)': '#232218', // white
  'rgb(232, 227, 213)': '#2c2a20', // creamDark
  'rgb(220, 235, 208)': '#2a3a1f', // sagePale
  'rgb(138, 173, 90)':  '#5d7a36', // sage
  'rgb(45, 74, 30)':    '#1a2e10', // forest
  'rgb(30, 50, 19)':    '#0e1a09', // footer dark
};
const DARK_COLOR_MAP = {
  'rgb(45, 74, 30)':    '#b8d68a', // forest
  'rgb(42, 42, 34)':    '#e8e3d5', // warm
  'rgb(107, 107, 96)':  '#a8a89c', // muted
  'rgb(92, 122, 53)':   '#9ec064', // olive
  'rgb(107, 63, 160)':  '#b48cd6',
};
const DARK_BORDER_MAP = {
  'rgb(232, 227, 213)': '#383528',
  'rgb(243, 239, 229)': '#2c2a20',
};
const SKIP_SELECTOR = '.tf-a11y-panel, .tf-a11y-btn';

function processElForDark(el, enable) {
  if (!(el instanceof HTMLElement)) return;
  if (el.closest && el.closest(SKIP_SELECTOR)) return;
  // BACKGROUND
  if (enable) {
    const bg = el.style.backgroundColor;
    if (bg && DARK_BG_MAP[bg]) {
      if (!el.hasAttribute('data-tf-orig-bg')) el.setAttribute('data-tf-orig-bg', bg);
      el.style.backgroundColor = DARK_BG_MAP[bg];
    }
  } else if (el.hasAttribute('data-tf-orig-bg')) {
    el.style.backgroundColor = el.getAttribute('data-tf-orig-bg');
    el.removeAttribute('data-tf-orig-bg');
  }
  // COLOR
  if (enable) {
    const col = el.style.color;
    if (col && DARK_COLOR_MAP[col]) {
      if (!el.hasAttribute('data-tf-orig-color')) el.setAttribute('data-tf-orig-color', col);
      el.style.color = DARK_COLOR_MAP[col];
    }
  } else if (el.hasAttribute('data-tf-orig-color')) {
    el.style.color = el.getAttribute('data-tf-orig-color');
    el.removeAttribute('data-tf-orig-color');
  }
  // BORDER
  const sides = ['borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor'];
  if (enable) {
    sides.forEach((side, i) => {
      const bc = el.style[side];
      if (bc && DARK_BORDER_MAP[bc]) {
        const attr = 'data-tf-orig-bc-' + i;
        if (!el.hasAttribute(attr)) el.setAttribute(attr, bc);
        el.style[side] = DARK_BORDER_MAP[bc];
      }
    });
  } else {
    sides.forEach((side, i) => {
      const attr = 'data-tf-orig-bc-' + i;
      if (el.hasAttribute(attr)) {
        el.style[side] = el.getAttribute(attr);
        el.removeAttribute(attr);
      }
    });
  }
}

function walkDark(enable) {
  document.body.querySelectorAll('*').forEach(el => processElForDark(el, enable));
  processElForDark(document.body, enable);
}

function AccessibilityMenu() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem('tf_dark') === '1'; } catch { return false; }
  });
  const [scale, setScale] = useState(() => {
    try { return parseFloat(localStorage.getItem('tf_scale')) || 1; } catch { return 1; }
  });
  const panelRef = useRef(null);
  const obsRef = useRef(null);
  const suppressRef = useRef(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-tf-theme', dark ? 'dark' : 'light');
    try { localStorage.setItem('tf_dark', dark ? '1' : '0'); } catch {}
    if (obsRef.current) { obsRef.current.disconnect(); obsRef.current = null; }
    suppressRef.current = true;
    walkDark(dark);
    setTimeout(() => { suppressRef.current = false; }, 0);
    const obs = new MutationObserver(mutations => {
      if (suppressRef.current) return;
      suppressRef.current = true;
      for (const m of mutations) {
        if (m.type === 'attributes' && m.attributeName === 'style' && m.target instanceof HTMLElement) {
          processElForDark(m.target, dark);
        }
        if (m.type === 'childList') {
          m.addedNodes.forEach(n => {
            if (n instanceof HTMLElement) {
              processElForDark(n, dark);
              n.querySelectorAll && n.querySelectorAll('*').forEach(c => processElForDark(c, dark));
            }
          });
        }
      }
      setTimeout(() => { suppressRef.current = false; }, 0);
    });
    obs.observe(document.body, { attributes: true, attributeFilter: ['style'], childList: true, subtree: true });
    obsRef.current = obs;
    return () => { obs.disconnect(); obsRef.current = null; };
  }, [dark]);

  useEffect(() => {
    document.documentElement.style.setProperty('--tf-scale', String(scale));
    try { localStorage.setItem('tf_scale', String(scale)); } catch {}
  }, [scale]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const reset = () => { setDark(false); setScale(1); };

  return (
    <>
      <style>{`
        html { --tf-scale: 1; }
        body { font-size: calc(16px * var(--tf-scale)); zoom: var(--tf-scale); }
        html[data-tf-theme="dark"] body { background: #15140f !important; color: #e8e3d5 !important; }
        html[data-tf-theme="dark"] body::before { opacity: 0.18 !important; filter: invert(1); }
        html[data-tf-theme="dark"] nav[style*="rgba(243,239,229"] { background: rgba(28,27,21,0.97) !important; border-bottom-color: #2c2a20 !important; }
        html[data-tf-theme="dark"] img[src*="Treefrog%20Text"],
        html[data-tf-theme="dark"] img[src*="Treefrog Text"] { filter: brightness(0) invert(0.92); }
      `}</style>

      <button
        aria-label="Accessibility options"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        className="tf-a11y-btn"
        style={{
          position:'fixed', bottom:24, left:24, zIndex:9998,
          width:52, height:52, borderRadius:'50%',
          background: dark ? '#b8d68a' : C.forest,
          color: dark ? C.forest : C.white,
          border:'2px solid rgba(255,255,255,0.4)',
          boxShadow:'0 4px 16px rgba(0,0,0,0.2)',
          cursor:'pointer', display:'flex',
          alignItems:'center', justifyContent:'center',
          transition:'transform 0.2s, background 0.2s', padding:0,
        }}
        onMouseEnter={e => e.currentTarget.style.transform='scale(1.08)'}
        onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <circle cx="12" cy="3.5" r="1.8"/>
          <path d="M21 7.5c0 .5-.4 1-1 1l-5 .5v4.5l1.7 6.3c.1.5-.2 1.1-.7 1.2-.5.2-1.1-.1-1.2-.7L12.8 15h-1.6l-2 5.3c-.2.5-.7.8-1.2.7-.5-.2-.8-.7-.7-1.2L9 13.5V9l-5-.5c-.5 0-1-.5-1-1s.5-1 1-1l5 .5h6l5-.5c.5 0 1 .5 1 1z"/>
        </svg>
      </button>

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Accessibility options"
          className="tf-a11y-panel"
          style={{
            position:'fixed', bottom:88, left:24, zIndex:9999,
            width:296, padding:20,
            background: dark ? '#232218' : '#fff',
            color: dark ? '#e8e3d5' : C.warm,
            border:`1px solid ${dark ? '#383528' : C.creamDark}`,
            borderRadius:16,
            boxShadow:'0 12px 40px rgba(0,0,0,0.22)',
            fontFamily:'DM Sans, sans-serif',
          }}
        >
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
            <h4 style={{ fontSize:15, fontWeight:600, margin:0, color: dark ? '#b8d68a' : C.forest }}>Accessibility</h4>
            <button aria-label="Close accessibility menu" onClick={() => setOpen(false)}
              style={{ background:'none', border:'none', cursor:'pointer', fontSize:18, color: dark ? '#a8a89c' : C.muted, width:24, height:24, padding:0, lineHeight:1 }}>×</button>
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
            <div>
              <p style={{ fontSize:14, fontWeight:500, marginBottom:2 }}>Dark mode</p>
              <p style={{ fontSize:12, color: dark ? '#a8a89c' : C.muted }}>Reduce screen brightness</p>
            </div>
            <button role="switch" aria-checked={dark} aria-label="Toggle dark mode"
              onClick={() => setDark(d => !d)}
              style={{ width:44, height:24, borderRadius:100, border:'none', cursor:'pointer', padding:2,
                background: dark ? '#9ec064' : '#cfcabd',
                display:'flex', alignItems:'center', transition:'background 0.2s', flexShrink:0 }}>
              <span style={{ display:'block', width:20, height:20, borderRadius:'50%', background:'#fff',
                boxShadow:'0 1px 3px rgba(0,0,0,0.2)',
                transform: dark ? 'translateX(20px)' : 'translateX(0)',
                transition:'transform 0.2s' }}/>
            </button>
          </div>
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:10 }}>
              <p style={{ fontSize:14, fontWeight:500 }}>Text size</p>
              <span style={{ fontSize:12, color: dark ? '#a8a89c' : C.muted, fontVariantNumeric:'tabular-nums' }}>{Math.round(scale * 100)}%</span>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ fontSize:12, color: dark ? '#a8a89c' : C.muted }} aria-hidden="true">A</span>
              <input type="range" min="0.85" max="1.5" step="0.05" value={scale}
                onChange={e => setScale(parseFloat(e.target.value))}
                aria-label="Text size"
                style={{ flex:1, accentColor: dark ? '#9ec064' : C.forest, cursor:'pointer' }}/>
              <span style={{ fontSize:18, color: dark ? '#a8a89c' : C.muted }} aria-hidden="true">A</span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', marginTop:8, gap:6 }}>
              {[{ v:1, l:'Default' }, { v:1.15, l:'Large' }, { v:1.3, l:'X-Large' }].map(p => (
                <button key={p.v} onClick={() => setScale(p.v)}
                  style={{ flex:1, padding:'6px 8px', borderRadius:8, fontSize:11, fontWeight:500,
                    border:`1px solid ${dark ? '#383528' : C.creamDark}`,
                    background: Math.abs(scale - p.v) < 0.01 ? (dark ? '#2a3a1f' : C.sagePale) : 'transparent',
                    color: dark ? '#e8e3d5' : C.forest,
                    cursor:'pointer', fontFamily:'inherit' }}>{p.l}</button>
              ))}
            </div>
          </div>
          <button onClick={reset}
            style={{ width:'100%', marginTop:18, padding:'9px 12px',
              fontSize:12, fontWeight:500, fontFamily:'inherit',
              background:'transparent', color: dark ? '#a8a89c' : C.muted,
              border:`1px solid ${dark ? '#383528' : C.creamDark}`,
              borderRadius:8, cursor:'pointer' }}>Reset to defaults</button>
        </div>
      )}
    </>
  );
}

// Expose to other Babel scripts
Object.assign(window, { C, useIsMobile, SocialSVG, PolicyNav, PolicyFooter, AccessibilityMenu });
