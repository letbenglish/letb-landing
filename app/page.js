"use client";
import { useState, useEffect, useRef } from "react";

function useInView(opts = {}) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.unobserve(el); } }, { threshold: 0.12, ...opts });
    o.observe(el);
    return () => o.disconnect();
  }, []);
  return [ref, v];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(36px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

// ─── SVG Logo faithfully recreated ──────────────────────────────────
function LetBLogo({ height = 36, light = false }) {
  const textColor = light ? "#f4f2df" : "#1e1e1e";
  return (
    <svg height={height} viewBox="0 0 260 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Small arch - Lively */}
      <rect x="0" y="20" width="30" height="52" rx="15" fill="#fc5e2d"/>
      {/* Tall arch - Precious */}
      <rect x="34" y="4" width="30" height="68" rx="15" fill="#ffba31"/>
      {/* LetB text */}
      <text x="74" y="60" fontFamily="'DM Sans', sans-serif" fontWeight="800" fontSize="56" fill={textColor} letterSpacing="-1">LetB</text>
    </svg>
  );
}

// ─── Icon set ───────────────────────────────────────────────────────
const I = {
  Book: () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  Mic: () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>,
  Headphones: () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>,
  Heart: () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Star: () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Users: () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Compass: () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>,
  Sparkles: () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z"/><path d="M19 15l.5 2 2 .5-2 .5-.5 2-.5-2-2-.5 2-.5.5-2z"/></svg>,
  Check: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Lock: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Arrow: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  Plane: () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>,
  Instagram: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  Mail: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Whatsapp: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
};

function Selo({ children, color = "#ffba31", size = 64 }) {
  return (
    <div style={{ width: size, height: size, border: `3px dashed ${color}`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color, flexShrink: 0 }}>
      {children}
    </div>
  );
}

function Badge({ text, bg = "#fc5e2d", color = "#f4f2df" }) {
  return <span style={{ display: "inline-block", padding: "5px 14px", borderRadius: 20, fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8, background: bg, color }}>{text}</span>;
}

export default function LetBLanding() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const NIVELAMENTO = "https://nivelamentoletb.netlify.app/";
  const TRAVEL = "https://letb-english.herospark.co/letb-travel";
  const EBOOK = "https://letb-english.herospark.co/faith-fluency-seu-caminho-para-o-ingles-com-proposito";
  const WHATSAPP = "https://wa.me/5541998167303?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20a%20Let%20B.";
  const INSTA = "https://www.instagram.com/letb__english?igsh=djdvMmozbm1hcDcy";
  const EMAIL = "letb.english@gmail.com";

  const levels = [
    { name: "Seeds", cefr: "A1", color: "#ffba31", desc: "Primeiros passos. O começo de algo transformador." },
    { name: "Roots", cefr: "A2", color: "#fc5e2d", desc: "Construindo sua base com confiança." },
    { name: "Growth", cefr: "B1", color: "#4caa49", desc: "Expandindo sua voz. Expressando ideias." },
    { name: "Flourish", cefr: "B2", color: "#284684", desc: "A fluência toma forma. Você começa a pensar em inglês." },
    { name: "Harvest", cefr: "C1", color: "#1e1e1e", desc: "Domínio avançado. Nuance e precisão." },
    { name: "Legacy", cefr: "C2", color: "#fc5e2d", desc: "Maestria. O inglês se torna parte de quem você é." },
  ];

  const testimonials = [
    { name: "Ana Paula", level: "Growth", text: "Eu nunca imaginei que ler a Bíblia em inglês fosse me tocar tanto. A Let B mudou minha forma de ver o aprendizado." },
    { name: "Marcos", level: "Roots", text: "O método é diferente porque faz sentido. Cada palavra que eu aprendo tem significado, não é só tradução." },
    { name: "Juliana", level: "Flourish", text: "Já tentei cinco cursos antes. A Let B é o primeiro onde eu realmente quero estudar todo dia." },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", color: "#1e1e1e", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        :root{--d:#1e1e1e;--l:#fc5e2d;--p:#ffba31;--c:#f4f2df;--g:#4caa49;--co:#284684;--fd:'DM Serif Display',serif;--fb:'DM Sans',sans-serif}
        @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        .bp{display:inline-flex;align-items:center;gap:10px;padding:16px 32px;border-radius:12px;border:none;cursor:pointer;font-family:var(--fb);font-size:16px;font-weight:600;background:var(--l);color:var(--c);transition:all .3s ease;text-decoration:none}
        .bp:hover{background:#e5502a;transform:translateY(-2px);box-shadow:0 8px 30px rgba(252,94,45,.3)}
        .bs{display:inline-flex;align-items:center;gap:10px;padding:16px 32px;border-radius:12px;cursor:pointer;font-family:var(--fb);font-size:16px;font-weight:600;background:transparent;color:var(--c);border:2px solid rgba(244,242,223,.3);transition:all .3s ease;text-decoration:none}
        .bs:hover{border-color:var(--p);color:var(--p);transform:translateY(-2px)}
        a{color:inherit;text-decoration:none}
        .sp{padding:100px 24px}
        @media(max-width:768px){.sp{padding:70px 20px}}
        .mx{max-width:1200px;margin:0 auto}
        h1,h2,h3{font-family:var(--fd)}
        .gt{background:linear-gradient(135deg,var(--l),var(--p));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .ch{transition:all .3s ease}.ch:hover{transform:translateY(-6px);box-shadow:0 12px 40px rgba(0,0,0,.12)}
        .blur{filter:blur(8px);user-select:none;pointer-events:none;transition:filter .6s ease}
        .blur.ok{filter:blur(0);user-select:auto;pointer-events:auto}
        @media(max-width:900px){.g3{grid-template-columns:1fr!important}.g2{grid-template-columns:1fr!important}}
        @media(max-width:600px){.g4{grid-template-columns:1fr 1fr!important}}
        @media(max-width:450px){.g4{grid-template-columns:1fr!important}}
      `}</style>

      {/* ═══ NAV ═══ */}
      <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:1000,padding:scrolled?"12px 24px":"20px 24px",background:scrolled?"rgba(30,30,30,.95)":"transparent",backdropFilter:scrolled?"blur(20px)":"none",transition:"all .3s ease" }}>
        <div style={{ maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
          <a href="#" style={{ display:"flex",alignItems:"center" }}>
            <LetBLogo height={32} light />
          </a>
          <div className="dnav" style={{ display:"flex",gap:28,alignItems:"center" }}>
            {[["#metodo","Método"],["#niveis","Níveis"],["#experiencia","Experiência"],["#depoimentos","Histórias"]].map(([h,t])=>(
              <a key={h} href={h} style={{ fontSize:15,fontWeight:500,color:"#f4f2df",opacity:.8,transition:"opacity .2s" }}>{t}</a>
            ))}
            <a href={NIVELAMENTO} target="_blank" rel="noopener" className="bp" style={{ padding:"10px 22px",fontSize:14 }}>
              Fazer Nivelamento
            </a>
          </div>
          <button onClick={()=>setMenu(!menu)} className="mtog" style={{ display:"none",background:"none",border:"none",color:"#f4f2df",fontSize:28,cursor:"pointer" }}>
            {menu?"✕":"☰"}
          </button>
        </div>
        <style>{`@media(max-width:768px){.dnav{display:none!important}.mtog{display:block!important}}`}</style>
        {menu && (
          <div style={{ position:"absolute",top:"100%",left:0,right:0,background:"rgba(30,30,30,.98)",padding:24,display:"flex",flexDirection:"column",gap:20,backdropFilter:"blur(20px)",animation:"fadeUp .3s ease" }}>
            {[["#metodo","Método"],["#niveis","Níveis"],["#experiencia","Experiência"],["#depoimentos","Histórias"]].map(([h,t])=>(
              <a key={h} href={h} style={{ color:"#f4f2df",fontSize:18 }} onClick={()=>setMenu(false)}>{t}</a>
            ))}
            <a href={NIVELAMENTO} target="_blank" rel="noopener" className="bp" style={{ textAlign:"center",justifyContent:"center" }}>Fazer Nivelamento</a>
          </div>
        )}
      </nav>

      {/* ═══ HERO ═══ */}
      <section style={{ minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(170deg,#1e1e1e 0%,#2a1a14 40%,#1e1e1e 100%)",position:"relative",overflow:"hidden",padding:"120px 24px 80px" }}>
        <div style={{ position:"absolute",top:"10%",right:"5%",opacity:.05 }}>
          <div style={{ width:400,height:400,borderRadius:"50%",border:"2px solid #ffba31" }}/>
        </div>
        <div style={{ position:"absolute",bottom:"15%",left:"3%",opacity:.04 }}>
          <div style={{ width:300,height:300,borderRadius:"50%",border:"2px solid #fc5e2d" }}/>
        </div>
        <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(252,94,45,.08) 0%,transparent 70%)" }}/>

        <div style={{ maxWidth:900,textAlign:"center",position:"relative",zIndex:1 }}>
          <div style={{ animation:"fadeUp 1s ease",marginBottom:24 }}>
            <Badge text="Learning English Through the Bible" bg="rgba(255,186,49,.15)" color="#ffba31" />
          </div>
          <h1 style={{ fontFamily:"var(--fd)",color:"#f4f2df",fontSize:"clamp(38px,7vw,72px)",lineHeight:1.1,marginBottom:24,animation:"fadeUp 1s ease .15s",animationFillMode:"both" }}>
            Fé. Fluência.<br/><span className="gt">Transformação.</span>
          </h1>
          <p style={{ color:"rgba(244,242,223,.65)",fontSize:"clamp(17px,2.2vw,20px)",lineHeight:1.7,maxWidth:620,margin:"0 auto 44px",animation:"fadeUp 1s ease .3s",animationFillMode:"both" }}>
            Uma forma diferente de aprender inglês. Onde cada palavra tem significado, 
            cada aula tem propósito, e a fluência cresce naturalmente.
          </p>
          <div style={{ display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap",animation:"fadeUp 1s ease .45s",animationFillMode:"both" }}>
            <a href={NIVELAMENTO} target="_blank" rel="noopener" className="bp">
              Fazer o Nivelamento Grátis <I.Arrow/>
            </a>
            <a href="#metodo" className="bs">Explorar a Experiência</a>
          </div>

          {/* Products */}
          <div style={{ display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap",marginTop:32,animation:"fadeUp 1s ease .6s",animationFillMode:"both" }}>
            <a href={EBOOK} target="_blank" rel="noopener" style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"10px 20px",borderRadius:10,background:"rgba(244,242,223,.06)",border:"1px solid rgba(244,242,223,.1)",color:"#f4f2df",fontSize:14,fontWeight:500,transition:"all .3s" }}>
              📗 E-book Faith & Fluency
            </a>
            <a href={TRAVEL} target="_blank" rel="noopener" style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"10px 20px",borderRadius:10,background:"rgba(244,242,223,.06)",border:"1px solid rgba(244,242,223,.1)",color:"#f4f2df",fontSize:14,fontWeight:500,transition:"all .3s" }}>
              ✈️ Let B Travel
            </a>
          </div>
        </div>
      </section>

      {/* ═══ SOCIAL PROOF ═══ */}
      <section style={{ background:"#f4f2df",padding:"28px 24px",borderBottom:"1px solid rgba(30,30,30,.06)" }}>
        <div style={{ maxWidth:1000,margin:"0 auto",display:"flex",justifyContent:"center",gap:40,flexWrap:"wrap",opacity:.55,fontSize:14,fontWeight:500 }}>
          <span>Alunos em 4 países</span><span>•</span><span>Imersão bíblica</span><span>•</span><span>6 níveis de fluência</span><span>•</span><span>Mentoria personalizada</span>
        </div>
      </section>

      {/* ═══ SOBRE ═══ */}
      <section style={{ background:"#f4f2df",padding:"80px 24px 0" }}>
        <div className="mx" style={{ textAlign:"center",maxWidth:800 }}>
          <Reveal>
            <Badge text="Sobre a Let B" bg="rgba(40,70,132,.1)" color="#284684" />
            <h2 style={{ fontSize:"clamp(28px,4.5vw,44px)",lineHeight:1.15,marginTop:20,marginBottom:20 }}>
              Mais do que um curso. Um <em>movimento.</em>
            </h2>
            <p style={{ fontSize:17,lineHeight:1.75,opacity:.55,maxWidth:650,margin:"0 auto" }}>
              Fundada por Thomas Fischer Fontes, a Let B nasceu da visão de unir o aprendizado de inglês ao propósito espiritual. Inspirada no conceito de "deixe ser", o inglês se torna uma ponte pra viver sua fé globalmente.
            </p>
          </Reveal>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24,marginTop:48 }} className="g3">
            {[
              { emoji:"🌍", title:"Propósito", desc:"Transformar o inglês em uma experiência espiritual e prática, capacitando cada aluno a viver seu chamado." },
              { emoji:"📬", title:"Cartas Vivas", desc:"Cada aluno é uma mensagem viva, com a missão de comunicar valores e transformação a cada encontro." },
              { emoji:"🧠", title:"Neuroaprendizagem", desc:"Técnicas baseadas em neurociência aliadas à Bíblia pra acelerar o aprendizado e tornar o inglês parte da sua identidade." },
            ].map((c,i)=>(
              <Reveal key={i} delay={.1*i}>
                <div style={{ background:"rgba(30,30,30,.03)",borderRadius:20,padding:32,border:"1px solid rgba(30,30,30,.05)",height:"100%",textAlign:"left" }}>
                  <span style={{ fontSize:32 }}>{c.emoji}</span>
                  <h3 style={{ fontSize:20,marginTop:14,marginBottom:8 }}>{c.title}</h3>
                  <p style={{ fontSize:15,lineHeight:1.65,opacity:.55 }}>{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MÉTODO ═══ */}
      <section id="metodo" className="sp" style={{ background:"#f4f2df" }}>
        <div className="mx">
          <Reveal>
            <div style={{ textAlign:"center",marginBottom:64 }}>
              <Badge text="Metodologia" bg="#284684" />
              <h2 style={{ fontSize:"clamp(30px,5vw,48px)",lineHeight:1.15,marginTop:20,marginBottom:18 }}>
                Por que a Let B é diferente?
              </h2>
              <p style={{ fontSize:18,color:"rgba(30,30,30,.5)",maxWidth:600,margin:"0 auto",lineHeight:1.7 }}>
                Métodos tradicionais ensinam regras. A Let B te ajuda a adquirir o idioma como você foi projetado pra fazer: por meio de significado, emoção e comunicação real.
              </p>
            </div>
          </Reveal>

          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:28,maxWidth:900,margin:"0 auto" }} className="g2">
            <Reveal delay={.1}>
              <div style={{ background:"rgba(30,30,30,.03)",borderRadius:20,padding:36,border:"1px solid rgba(30,30,30,.05)" }}>
                <p style={{ fontSize:13,fontWeight:600,textTransform:"uppercase",letterSpacing:1,opacity:.35,marginBottom:22 }}>Tradicional</p>
                {["Decorar regras que você vai esquecer","Gramática desconectada e mecânica","Exercícios robóticos, zero emoção","O mesmo livro chato pra todo mundo"].map((t,i)=>(
                  <div key={i} style={{ display:"flex",gap:12,marginBottom:14,alignItems:"flex-start" }}>
                    <span style={{ color:"#fc5e2d",fontSize:16,marginTop:2 }}>✕</span>
                    <p style={{ fontSize:15,lineHeight:1.5,opacity:.5 }}>{t}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={.2}>
              <div style={{ background:"#1e1e1e",borderRadius:20,padding:36,color:"#f4f2df",position:"relative",overflow:"hidden" }}>
                <div style={{ position:"absolute",top:-50,right:-50,width:200,height:200,borderRadius:"50%",background:"rgba(252,94,45,.08)" }}/>
                <p style={{ fontSize:13,fontWeight:600,textTransform:"uppercase",letterSpacing:1,opacity:.45,marginBottom:22 }}>Let B</p>
                {["Imersão significativa através das Escrituras","Gramática extraída naturalmente do contexto","Conexão emocional que fixa o aprendizado","Um conteúdo, adaptado pra cada nível"].map((t,i)=>(
                  <div key={i} style={{ display:"flex",gap:12,marginBottom:14,alignItems:"flex-start" }}>
                    <span style={{ color:"#4caa49" }}><I.Check/></span>
                    <p style={{ fontSize:15,lineHeight:1.5 }}>{t}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Pillars */}
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20,marginTop:64 }} className="g4">
            {[
              { icon:<I.Book/>,title:"Reading",desc:"Textos bíblicos reais no seu nível. Vocabulário que cresce a partir de histórias que importam.",color:"#fc5e2d" },
              { icon:<I.Headphones/>,title:"Listening",desc:"Áudio nativo e imersão guiada. Seu ouvido aprende a decodificar inglês naturalmente.",color:"#ffba31" },
              { icon:<I.Mic/>,title:"Speaking",desc:"Abordagem conversation-first. Você fala desde o primeiro dia, com propósito e confiança.",color:"#4caa49" },
              { icon:<I.Heart/>,title:"Living",desc:"O inglês se torna parte da sua identidade. Não uma matéria, mas uma forma de ver o mundo.",color:"#284684" },
            ].map((p,i)=>(
              <Reveal key={i} delay={.08*i}>
                <div className="ch" style={{ background:"#f4f2df",borderRadius:20,padding:28,border:"1px solid rgba(30,30,30,.06)",height:"100%" }}>
                  <Selo color={p.color} size={56}><div style={{ color:p.color }}>{p.icon}</div></Selo>
                  <h3 style={{ fontSize:20,marginTop:18,marginBottom:8 }}>{p.title}</h3>
                  <p style={{ fontSize:14,lineHeight:1.6,opacity:.55 }}>{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ NÍVEIS ═══ */}
      <section id="niveis" className="sp" style={{ background:"#1e1e1e",color:"#f4f2df" }}>
        <div className="mx">
          <Reveal>
            <div style={{ textAlign:"center",marginBottom:64 }}>
              <Badge text="Sua Jornada" bg="rgba(255,186,49,.2)" color="#ffba31" />
              <h2 style={{ fontSize:"clamp(30px,5vw,46px)",lineHeight:1.15,marginTop:20,marginBottom:18 }}>
                Seis estágios. Um propósito.
              </h2>
              <p style={{ fontSize:17,opacity:.45,maxWidth:550,margin:"0 auto",lineHeight:1.7 }}>
                Das primeiras palavras à fluência completa. Cada nível tem um nome, um significado e um destino claro.
              </p>
            </div>
          </Reveal>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18,maxWidth:1000,margin:"0 auto" }} className="g3">
            {levels.map((lv,i)=>(
              <Reveal key={i} delay={.07*i}>
                <div className="ch" style={{ borderRadius:20,padding:30,background:"rgba(244,242,223,.04)",border:"1px solid rgba(244,242,223,.07)",position:"relative",overflow:"hidden" }}>
                  <div style={{ position:"absolute",top:14,right:14,width:28,height:28,borderRadius:"50%",background:lv.name==="Legacy"?"linear-gradient(135deg,#fc5e2d,#ffba31)":lv.color,opacity:.15 }}/>
                  <span style={{ fontSize:11,fontWeight:600,textTransform:"uppercase",letterSpacing:1.5,color:lv.color,opacity:.8 }}>{lv.cefr}</span>
                  <h3 style={{ fontSize:26,marginTop:6,marginBottom:10,...(lv.name==="Legacy"?{background:"linear-gradient(135deg,#fc5e2d,#ffba31)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}:{color:lv.color==="#1e1e1e"?"#f4f2df":lv.color}) }}>{lv.name}</h3>
                  <p style={{ fontSize:14,lineHeight:1.6,opacity:.45 }}>{lv.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={.3}>
            <div style={{ textAlign:"center",marginTop:48 }}>
              <a href={NIVELAMENTO} target="_blank" rel="noopener" className="bp">Descubra Seu Nível <I.Arrow/></a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ EXPERIÊNCIA ═══ */}
      <section id="experiencia" className="sp" style={{ background:"#f4f2df" }}>
        <div className="mx">
          <Reveal>
            <div style={{ textAlign:"center",marginBottom:64 }}>
              <Badge text="A Experiência" bg="#fc5e2d" />
              <h2 style={{ fontSize:"clamp(30px,5vw,46px)",lineHeight:1.15,marginTop:20,marginBottom:18 }}>
                Tudo que você precisa. Nada que não precisa.
              </h2>
              <p style={{ fontSize:17,opacity:.5,maxWidth:580,margin:"0 auto",lineHeight:1.7 }}>
                A Let B não é só aula. É um ecossistema completo pensado pra fazer o inglês ser parte da sua vida.
              </p>
            </div>
          </Reveal>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:22 }} className="g3">
            {[
              { icon:<I.Users/>,title:"Mentoria Particular",desc:"1 hora por semana, 100% individual. Não é algoritmo, não é chatbot. É uma pessoa que conhece seu nome, seu nível e seus objetivos.",color:"#fc5e2d",dark:true },
              { icon:<I.Book/>,title:"Plataforma Interativa",desc:"Materiais didáticos, ebooks, workbooks e exercícios disponíveis pra você acessar quando quiser. Tudo baseado na metodologia Let B.",color:"#284684" },
              { icon:<I.Headphones/>,title:"Áudio Nativo",desc:"Conteúdo gravado por falantes nativos. Imersão real pro seu ouvido, construída ao redor de narrativas bíblicas.",color:"#ffba31" },
              { icon:<I.Sparkles/>,title:"Flashcards Inteligentes",desc:"Repetição espaçada com vocabulário bíblico. Palavras que você vai usar de verdade, revisadas no intervalo certo.",color:"#4caa49" },
              { icon:<I.Mic/>,title:"Prática de Conversação",desc:"Espaço seguro pra praticar, errar e crescer. Sem julgamento, só progresso real na comunicação.",color:"#fc5e2d" },
              { icon:<I.Compass/>,title:"Assistência Pedagógica",desc:"Acompanhamento do seu progresso, ajuste de rota e suporte contínuo. Você nunca caminha sozinho na Let B.",color:"#ffba31" },
            ].map((it,i)=>(
              <Reveal key={i} delay={.08*i}>
                <div className="ch" style={{ borderRadius:20,padding:32,background:it.dark?"#1e1e1e":"rgba(30,30,30,.03)",color:it.dark?"#f4f2df":"#1e1e1e",border:it.dark?"none":"1px solid rgba(30,30,30,.05)",height:"100%",position:"relative",overflow:"hidden" }}>
                  {it.dark&&<div style={{ position:"absolute",bottom:-40,right:-40,width:180,height:180,borderRadius:"50%",background:"rgba(252,94,45,.1)" }}/>}
                  <Selo color={it.color} size={52}><div style={{ color:it.color,transform:"scale(.85)" }}>{it.icon}</div></Selo>
                  <h3 style={{ fontSize:19,marginTop:18,marginBottom:8 }}>{it.title}</h3>
                  <p style={{ fontSize:14,lineHeight:1.65,opacity:it.dark?.65:.5 }}>{it.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DEPOIMENTOS ═══ */}
      <section id="depoimentos" className="sp" style={{ background:"linear-gradient(170deg,#1e1e1e,#271a14,#1e1e1e)",color:"#f4f2df" }}>
        <div className="mx">
          <Reveal>
            <div style={{ textAlign:"center",marginBottom:56 }}>
              <Badge text="Histórias Reais" bg="rgba(255,186,49,.2)" color="#ffba31" />
              <h2 style={{ fontSize:"clamp(30px,5vw,46px)",lineHeight:1.15,marginTop:20 }}>Palavras da jornada.</h2>
            </div>
          </Reveal>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:22,maxWidth:1000,margin:"0 auto" }} className="g3">
            {testimonials.map((t,i)=>(
              <Reveal key={i} delay={.1*i}>
                <div style={{ borderRadius:20,padding:32,background:"rgba(244,242,223,.04)",border:"1px solid rgba(244,242,223,.07)",height:"100%",display:"flex",flexDirection:"column" }}>
                  <div style={{ fontSize:30,marginBottom:14,opacity:.2 }}>"</div>
                  <p style={{ fontSize:15,lineHeight:1.7,opacity:.65,flex:1,fontStyle:"italic" }}>{t.text}</p>
                  <div style={{ marginTop:22,display:"flex",alignItems:"center",gap:12 }}>
                    <div style={{ width:40,height:40,borderRadius:"50%",background:"linear-gradient(135deg,#fc5e2d,#ffba31)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:700,color:"#1e1e1e" }}>{t.name[0]}</div>
                    <div>
                      <p style={{ fontWeight:600,fontSize:14 }}>{t.name}</p>
                      <p style={{ fontSize:12,opacity:.4 }}>Nível: {t.level}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PLANOS ═══ */}
      <section id="planos" className="sp" style={{ background:"#f4f2df" }}>
        <div className="mx">
          <Reveal>
            <div style={{ textAlign:"center",marginBottom:56 }}>
              <Badge text="Planos" bg="#284684" />
              <h2 style={{ fontSize:"clamp(30px,5vw,46px)",lineHeight:1.15,marginTop:20,marginBottom:18 }}>
                Escolha o plano certo pra você
              </h2>
              <p style={{ fontSize:17,opacity:.5,maxWidth:580,margin:"0 auto",lineHeight:1.7 }}>
                Todos os planos incluem aula particular semanal de 1h, plataforma interativa, materiais didáticos, assistência pedagógica e grupo no WhatsApp.
              </p>
            </div>
          </Reveal>

          <div style={{ position:"relative",maxWidth:1000,margin:"0 auto" }}>
            <div className={`blur ${unlocked?"ok":""}`}>
              <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:22 }} className="g3">
                {/* ── AVULSO ── */}
                <div style={{ borderRadius:22,padding:36,background:"rgba(30,30,30,.03)",color:"#1e1e1e",border:"1px solid rgba(30,30,30,.05)",position:"relative",display:"flex",flexDirection:"column" }}>
                  <h3 style={{ fontSize:22,marginBottom:6 }}>Avulso</h3>
                  <p style={{ fontSize:14,opacity:.5,marginBottom:20,lineHeight:1.5 }}>Liberdade total. Sem fidelidade, cancele quando quiser.</p>
                  <div style={{ display:"flex",alignItems:"baseline",gap:4,marginBottom:8 }}>
                    <span style={{ fontSize:38,fontFamily:"var(--fd)" }}>R$ 450</span>
                    <span style={{ opacity:.45,fontSize:14 }}>/mês</span>
                  </div>
                  <p style={{ fontSize:12,opacity:.4,marginBottom:24,lineHeight:1.5 }}>💳 Cartão ou Pix • Sem fidelidade</p>
                  <div style={{ flex:1 }}>
                    {["1h de aula particular por semana","Plataforma interativa completa","Material de apoio bíblico","Assistência pedagógica","Grupo no WhatsApp","Sem compromisso de permanência"].map((f,fi)=>(
                      <div key={fi} style={{ display:"flex",gap:10,marginBottom:12,alignItems:"flex-start" }}>
                        <span style={{ color:"#4caa49",marginTop:2 }}><I.Check/></span>
                        <span style={{ fontSize:14,lineHeight:1.5,opacity:.65 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <a href={WHATSAPP} target="_blank" rel="noopener" className="bp" style={{ width:"100%",justifyContent:"center",marginTop:24,background:"transparent",color:"#1e1e1e",border:"2px solid rgba(30,30,30,.12)" }}>
                    Quero esse plano
                  </a>
                </div>

                {/* ── FIDELIDADE 6M ── */}
                <div style={{ borderRadius:22,padding:36,background:"#1e1e1e",color:"#f4f2df",border:"2px solid rgba(252,94,45,.3)",position:"relative",display:"flex",flexDirection:"column" }}>
                  <div style={{ position:"absolute",top:-13,left:"50%",transform:"translateX(-50%)" }}><Badge text="Mais Popular" bg="#fc5e2d"/></div>
                  <h3 style={{ fontSize:22,marginBottom:6 }}>Fidelidade 6 Meses</h3>
                  <p style={{ fontSize:14,opacity:.5,marginBottom:20,lineHeight:1.5 }}>Evolução acelerada. Em 6 meses, comunicação com confiança.</p>
                  <div style={{ display:"flex",alignItems:"baseline",gap:4,marginBottom:4 }}>
                    <span style={{ fontSize:38,fontFamily:"var(--fd)" }}>R$ 400</span>
                    <span style={{ opacity:.45,fontSize:14 }}>/mês</span>
                  </div>
                  <p style={{ fontSize:13,opacity:.5,marginBottom:4 }}>Pix mensal ou cartão (sujeito a taxas)</p>
                  <div style={{ background:"rgba(76,170,73,.12)",borderRadius:10,padding:"10px 14px",marginBottom:24,marginTop:8 }}>
                    <p style={{ fontSize:13,fontWeight:600,color:"#4caa49" }}>💰 À vista com 10% off: R$ 2.160</p>
                    <p style={{ fontSize:11,opacity:.6,marginTop:2 }}>Pix ou link de pagamento no cartão</p>
                  </div>
                  <div style={{ flex:1 }}>
                    {["Tudo do plano Avulso","Economia de R$50/mês","10% de desconto na renovação","Indique um amigo: 5% off","Acompanhamento pedagógico completo","Compromisso de 6 meses"].map((f,fi)=>(
                      <div key={fi} style={{ display:"flex",gap:10,marginBottom:12,alignItems:"flex-start" }}>
                        <span style={{ color:"#4caa49",marginTop:2 }}><I.Check/></span>
                        <span style={{ fontSize:14,lineHeight:1.5,opacity:.65 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <a href={WHATSAPP} target="_blank" rel="noopener" className="bp" style={{ width:"100%",justifyContent:"center",marginTop:24 }}>
                    Começar agora
                  </a>
                </div>

                {/* ── FIDELIDADE 12M ── */}
                <div style={{ borderRadius:22,padding:36,background:"rgba(30,30,30,.03)",color:"#1e1e1e",border:"1px solid rgba(30,30,30,.05)",position:"relative",display:"flex",flexDirection:"column" }}>
                  <div style={{ position:"absolute",top:-13,left:"50%",transform:"translateX(-50%)" }}><Badge text="Melhor Valor" bg="#284684"/></div>
                  <h3 style={{ fontSize:22,marginBottom:6 }}>Fidelidade 12 Meses</h3>
                  <p style={{ fontSize:14,opacity:.5,marginBottom:20,lineHeight:1.5 }}>A jornada completa. Um ano pra dominar o inglês com propósito.</p>
                  <div style={{ display:"flex",alignItems:"baseline",gap:4,marginBottom:4 }}>
                    <span style={{ fontSize:38,fontFamily:"var(--fd)" }}>R$ 350</span>
                    <span style={{ opacity:.45,fontSize:14 }}>/mês</span>
                  </div>
                  <p style={{ fontSize:13,opacity:.5,marginBottom:4 }}>Pix mensal ou cartão (sujeito a taxas)</p>
                  <div style={{ background:"rgba(76,170,73,.12)",borderRadius:10,padding:"10px 14px",marginBottom:24,marginTop:8 }}>
                    <p style={{ fontSize:13,fontWeight:600,color:"#4caa49" }}>💰 À vista com 10% off: R$ 3.780</p>
                    <p style={{ fontSize:11,opacity:.6,marginTop:2 }}>Pix ou link de pagamento no cartão</p>
                  </div>
                  <div style={{ flex:1 }}>
                    {["Tudo do plano Avulso","Maior economia: R$100/mês off","10% de desconto na renovação","Indique um amigo: 5% off","Melhor custo-benefício","Compromisso de 12 meses"].map((f,fi)=>(
                      <div key={fi} style={{ display:"flex",gap:10,marginBottom:12,alignItems:"flex-start" }}>
                        <span style={{ color:"#4caa49",marginTop:2 }}><I.Check/></span>
                        <span style={{ fontSize:14,lineHeight:1.5,opacity:.65 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <a href={WHATSAPP} target="_blank" rel="noopener" className="bp" style={{ width:"100%",justifyContent:"center",marginTop:24,background:"transparent",color:"#1e1e1e",border:"2px solid rgba(30,30,30,.12)" }}>
                    Quero esse plano
                  </a>
                </div>
              </div>
              <p style={{ textAlign:"center",marginTop:20,fontSize:13,opacity:.4 }}>
                💡 No plano anual você economiza R$ 1.200 comparado ao avulso. Pagamento à vista ganha mais 10% off.
              </p>
            </div>

            {!unlocked&&(
              <div style={{ position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"rgba(244,242,223,.6)",backdropFilter:"blur(4px)",borderRadius:22 }}>
                <Reveal>
                  <div style={{ textAlign:"center",maxWidth:400 }}>
                    <div style={{ marginBottom:18,color:"#284684" }}><I.Lock/></div>
                    <h3 style={{ fontSize:24,marginBottom:10 }}>Acesso Exclusivo</h3>
                    <p style={{ fontSize:15,opacity:.55,lineHeight:1.6,marginBottom:24 }}>
                      Faça o nivelamento da Let B pra desbloquear os detalhes personalizados de mentoria e valores.
                    </p>
                    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:12 }}>
                      <a href={NIVELAMENTO} target="_blank" rel="noopener" className="bp">Fazer Nivelamento <I.Arrow/></a>
                      <p style={{ fontSize:12,opacity:.35,marginTop:6 }}>ou digite seu código de acesso</p>
                      <div style={{ display:"flex",gap:8 }}>
                        <input type="text" value={code} onChange={e=>setCode(e.target.value)} placeholder="Código" style={{ padding:"10px 14px",borderRadius:10,border:"1px solid rgba(30,30,30,.12)",background:"rgba(244,242,223,.8)",fontFamily:"var(--fb)",fontSize:14,outline:"none",width:160 }}/>
                        <button onClick={()=>{if(code.toUpperCase()==="LETB2026")setUnlocked(true);else if(code.length>0)alert("Código inválido. Faça o nivelamento para receber seu código de acesso.")}} style={{ padding:"10px 18px",borderRadius:10,border:"none",background:"#284684",color:"#f4f2df",cursor:"pointer",fontFamily:"var(--fb)",fontWeight:600,fontSize:14 }}>Desbloquear</button>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══ QUOTE ═══ */}
      <section style={{ background:"#1e1e1e",color:"#f4f2df",padding:"80px 24px",textAlign:"center" }}>
        <div className="mx" style={{ maxWidth:700 }}>
          <Reveal>
            <p style={{ fontSize:"clamp(20px,3vw,28px)",fontFamily:"var(--fd)",fontStyle:"italic",lineHeight:1.5,opacity:.7,marginBottom:20 }}>
              "Na Let B, aprender inglês é descobrir um caminho de propósito e expansão, onde o idioma abre portas e sua vida se transforma."
            </p>
            <p style={{ fontSize:14,opacity:.35 }}>Thomas Fischer Fontes — Fundador, Let B</p>
          </Reveal>
        </div>
      </section>

      {/* ═══ CTA FINAL ═══ */}
      <section style={{ background:"linear-gradient(170deg,#1e1e1e,#2a1a14,#1e1e1e)",color:"#f4f2df",padding:"100px 24px",position:"relative",overflow:"hidden",textAlign:"center" }}>
        <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(252,94,45,.1) 0%,transparent 70%)" }}/>
        <div className="mx" style={{ position:"relative",zIndex:1 }}>
          <Reveal>
            <div style={{ border:"3px dashed rgba(255,186,49,.2)",borderRadius:8,display:"inline-flex",padding:16,marginBottom:28 }}>
              <LetBLogo height={28} light />
            </div>
          </Reveal>
          <Reveal delay={.1}>
            <h2 style={{ fontSize:"clamp(30px,5vw,48px)",lineHeight:1.15,marginBottom:18 }}>
              Pronto pra ser uma <em style={{ fontStyle:"italic" }}>carta viva?</em>
            </h2>
          </Reveal>
          <Reveal delay={.2}>
            <p style={{ fontSize:18,opacity:.45,maxWidth:520,margin:"0 auto 36px",lineHeight:1.7 }}>
              Faça o nivelamento gratuito da Let B. Descubra onde você está e receba uma aula completa, materiais em PDF, vocabulário e áudio. Tudo de graça.
            </p>
          </Reveal>
          <Reveal delay={.3}>
            <div style={{ display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap" }}>
              <a href={NIVELAMENTO} target="_blank" rel="noopener" className="bp" style={{ fontSize:17,padding:"18px 36px" }}>
                Fazer o Nivelamento Agora <I.Arrow/>
              </a>
              <a href={WHATSAPP} target="_blank" rel="noopener" className="bs">
                💬 Falar no WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ background:"#1e1e1e",color:"#f4f2df",borderTop:"1px solid rgba(244,242,223,.06)",padding:"48px 24px 28px" }}>
        <div className="mx">
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:24 }}>
            <LetBLogo height={28} light />
            <div style={{ display:"flex",gap:28,flexWrap:"wrap",alignItems:"center" }}>
              {[["#metodo","Método"],["#niveis","Níveis"],["#experiencia","Experiência"],["#planos","Planos"]].map(([h,t])=>(
                <a key={h} href={h} style={{ fontSize:14,opacity:.45 }}>{t}</a>
              ))}
            </div>
          </div>

          <div style={{ display:"flex",gap:20,marginTop:28,flexWrap:"wrap",alignItems:"center" }}>
            <a href={WHATSAPP} target="_blank" rel="noopener" style={{ display:"flex",alignItems:"center",gap:8,fontSize:13,opacity:.5 }}>
              <I.Whatsapp/> (41) 9816-7303
            </a>
            <a href={INSTA} target="_blank" rel="noopener" style={{ display:"flex",alignItems:"center",gap:8,fontSize:13,opacity:.5 }}>
              <I.Instagram/> @letb__english
            </a>
            <a href={`mailto:${EMAIL}`} style={{ display:"flex",alignItems:"center",gap:8,fontSize:13,opacity:.5 }}>
              <I.Mail/> {EMAIL}
            </a>
          </div>

          <div style={{ borderTop:"1px solid rgba(244,242,223,.06)",marginTop:28,paddingTop:20,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:12 }}>
            <p style={{ fontSize:12,opacity:.25 }}>© 2026 Let B — Learning English Through the Bible. Todos os direitos reservados.</p>
            <p style={{ fontSize:12,opacity:.25,fontStyle:"italic" }}>"Deixe o inglês ser parte de quem você é."</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
