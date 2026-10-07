// Fundo do hero: céu escuro, colinas arredondadas (como as montanhas do logo),
// plantação de trigo balançando e aves ao longe. Só transform/opacity nas animações.

// PRNG com semente fixa: o SVG sai idêntico no servidor e no cliente
function rng(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const r1 = n => Math.round(n * 10) / 10;

function stalks({ seed, count, base, minH, maxH, scale }) {
  const rand = rng(seed);
  return Array.from({ length: count }, (_, i) => {
    const x = (i + rand() * 0.8) * (1500 / count) - 30;
    const h = minH + rand() * (maxH - minH);
    const lean = (rand() - 0.5) * 26;
    const awns = [];
    const tipX = x + lean, tipY = base - h;
    const stem = `M${r1(x)} ${base} Q${r1(x + lean * 0.2)} ${r1(base - h * 0.5)} ${r1(tipX)} ${r1(tipY)}`;
    // espiga: grãos colados no caule, apontando pra cima, com aristas (os "fiozinhos" do trigo)
    const grains = [];
    const n = 9, earLen = h * 0.26;
    const ang = Math.atan2(tipY - (base - h * 0.5), tipX - (x + lean * 0.2)) * 180 / Math.PI + 90;
    const dx = Math.sin(ang * Math.PI / 180), dy = -Math.cos(ang * Math.PI / 180);
    for (let g = 0; g < n; g++) {
      const t = g / n;
      const gx = tipX - dx * t * earLen, gy = tipY - dy * t * earLen;
      const side = g % 2 ? 1 : -1;
      const cx = gx + side * 1.7 * scale, cy = gy;
      grains.push(`<ellipse cx="${r1(cx)}" cy="${r1(cy)}" rx="${r1(1.9 * scale)}" ry="${r1(4.4 * scale)}" transform="rotate(${r1(ang + side * 16)} ${r1(cx)} ${r1(cy)})"/>`);
      if (g < 6) {
        const a = (ang + side * 20) * Math.PI / 180, L = 9 * scale;
        const ax = cx + Math.sin(a) * 4 * scale, ay = cy - Math.cos(a) * 4 * scale;
        awns.push(`M${r1(ax)} ${r1(ay)}l${r1(Math.sin(a) * L)} ${r1(-Math.cos(a) * L)}`);
      }
    }
    grains.push(`<ellipse cx="${r1(tipX + dx * 2 * scale)}" cy="${r1(tipY + dy * 2 * scale)}" rx="${r1(1.7 * scale)}" ry="${r1(4 * scale)}" transform="rotate(${r1(ang)} ${r1(tipX + dx * 2 * scale)} ${r1(tipY + dy * 2 * scale)})"/>`);
    return { stem, grains: grains.join(""), awns: awns.join("") };
  });
}

// Cada fileira vira 3 grupos que balançam com atrasos diferentes (vento irregular)
function Row({ cfg, className, color, stemOpacity }) {
  const all = stalks(cfg);
  const groups = [0, 1, 2].map(k => all.filter((_, i) => i % 3 === k));
  return (
    <g className={className}>
      {groups.map((g, k) => (
        <g key={k} className={`hf-sway hf-s${k}`}>
          <path d={g.map(s => s.stem).join("")} stroke={color} strokeOpacity={stemOpacity} strokeWidth={cfg.scale * 1.2} fill="none" strokeLinecap="round" />
          <path d={g.map(s => s.awns).join("")} stroke={color} strokeOpacity={0.7} strokeWidth={cfg.scale * 0.6} fill="none" strokeLinecap="round" />
          <g fill={color} dangerouslySetInnerHTML={{ __html: g.map(s => s.grains).join("") }} />
        </g>
      ))}
    </g>
  );
}

function Bird({ className }) {
  return (
    <span className={`vs-bird ${className}`} aria-hidden="true">
      <svg viewBox="0 0 48 20" fill="none" stroke="#ffba31" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <g className="vs-wing"><path d="M2 12 C 9 4, 16 4, 24 12 C 32 4, 39 4, 46 12"/></g>
      </svg>
    </span>
  );
}

export default function HeroField() {
  return (
    <div className="hf" aria-hidden="true">
      <div className="hf-flock">
        <Bird className="hf-f1" />
        <Bird className="hf-f2" />
        <Bird className="hf-f3" />
        <Bird className="hf-f4" />
      </div>
      <svg className="hf-svg" viewBox="0 0 1440 320" preserveAspectRatio="xMidYMax slice">
        {/* colinas arredondadas, no espírito das montanhas do logo */}
        <path d="M0 210 C 160 150, 300 150, 430 196 C 560 240, 640 170, 800 150 C 960 130, 1080 200, 1200 188 C 1320 176, 1390 150, 1440 156 L1440 320 L0 320Z" fill="#284684" fillOpacity=".38" />
        <path d="M0 252 C 200 214, 380 222, 560 246 C 760 272, 900 222, 1100 226 C 1260 230, 1360 250, 1440 240 L1440 320 L0 320Z" fill="#284684" fillOpacity=".55" />
        <Row className="hf-back" color="#fc5e2d" stemOpacity={0.5} cfg={{ seed: 7, count: 120, base: 330, minH: 70, maxH: 110, scale: 0.75 }} />
        <Row className="hf-mid" color="#ffba31" stemOpacity={0.6} cfg={{ seed: 21, count: 80, base: 340, minH: 110, maxH: 160, scale: 1 }} />
        <Row className="hf-front" color="#ffba31" stemOpacity={0.7} cfg={{ seed: 42, count: 46, base: 350, minH: 150, maxH: 210, scale: 1.35 }} />
      </svg>
      <style>{`
        .hf{position:absolute;inset:0;pointer-events:none;z-index:0}
        .hf-svg{position:absolute;left:0;right:0;bottom:0;width:100%;height:min(300px,34vh);display:block}
        .hf-back{opacity:.3}
        .hf-mid{opacity:.34}
        .hf-front{opacity:.5}
        .hf-sway{transform-box:fill-box;transform-origin:50% 100%;animation:hfSway 7s ease-in-out infinite}
        .hf-s1{animation-duration:8.5s;animation-delay:-2s}
        .hf-s2{animation-duration:6.2s;animation-delay:-4s}
        @keyframes hfSway{0%,100%{transform:skewX(0deg)}50%{transform:skewX(-3deg)}}
        .hf-flock{position:absolute;top:18%;left:0;right:0;height:120px}
        .hf-flock .vs-bird{opacity:.3}
        .hf-f1{width:38px;left:46%;top:0;animation:vsDrift1 24s ease-in-out infinite}
        .hf-f2{width:28px;left:50%;top:34px;animation:vsDrift2 28s ease-in-out infinite}
        .hf-f2 .vs-wing{animation-duration:1.8s;animation-delay:-.5s}
        .hf-f3{width:22px;left:53%;top:8px;opacity:.22!important;animation:vsDrift1 30s ease-in-out infinite reverse}
        .hf-f3 .vs-wing{animation-duration:1.5s;animation-delay:-.9s}
        .hf-f4{width:30px;left:28%;top:-40px;animation:vsDrift3 26s ease-in-out infinite}
        @media(max-width:959px){.hf-svg{height:220px}.hf-flock{display:none}}
        @media(prefers-reduced-motion:reduce){.hf-sway{animation:none!important}}
      `}</style>
    </div>
  );
}
