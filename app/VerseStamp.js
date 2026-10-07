"use client";
import { useState, useEffect, useRef } from "react";
import { track } from "@vercel/analytics";

// Mesmo conteúdo de public/activities/matthew-6-amostra.html
const AUDIO_DIR = "/activities/audio/matthew-6-26/";
const VERSE = "See the birds of the sky, that they don't [sow], neither do they [reap], nor gather into barns. Your heavenly Father [feeds] them. Aren't you of much more value than they?";
const WORDS = {
  sow:   { say: "sôu",  mean: "semear",   note: <>Rima com <b>go</b>. Não tem nada a ver com <i>saw</i>.</>, tone: "p" },
  reap:  { say: "ríip", mean: "colher",   note: <>É a colheita do campo. Pra colher uma fruta do pé, o verbo é <b>pick</b>.</>, tone: "p" },
  feeds: { say: "fíidz", mean: "alimenta", note: <>Vem de <b>food</b>. Quem dá <i>food</i>, <i>feeds</i>.</>, tone: "l" },
};
const PLAIN = VERSE.replace(/[\[\]]/g, "");
const PARTS = [];
VERSE.split(/(\[[^\]]+\])/).forEach(part => {
  if (part.startsWith("[")) return PARTS.push({ key: part.slice(1, -1), punct: "" });
  const last = PARTS[PARTS.length - 1];
  const m = last && typeof last === "object" ? part.match(/^[,.;:!?]+/) : null;
  if (m) { last.punct = m[0]; part = part.slice(m[0].length); }
  if (part) PARTS.push(part);
});

const Play = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15a1 1 0 0 0 1.52.85l12-7.5a1 1 0 0 0 0-1.7l-12-7.5A1 1 0 0 0 7 4.5z"/></svg>;

// Pássaro em traço fino: duas asas curvas. A asa "bate" via scaleY.
function Bird({ className }) {
  return (
    <span className={`vs-bird ${className}`} aria-hidden="true">
      <svg viewBox="0 0 48 20" fill="none" stroke="#ffba31" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <g className="vs-wing"><path d="M2 12 C 9 4, 16 4, 24 12 C 32 4, 39 4, 46 12"/></g>
      </svg>
    </span>
  );
}

export default function VerseStamp() {
  const [active, setActive] = useState(null);
  const audios = useRef({});
  const current = useRef(null);

  // Pré-carrega os clipes. No iOS o play() só é liberado dentro do clique,
  // então play() é chamado de forma síncrona no handler (nunca depois de await/timeout).
  useEffect(() => {
    ["sow", "reap", "feeds", "verse"].forEach(k => {
      const a = new Audio(AUDIO_DIR + k + ".mp3");
      a.preload = "auto";
      audios.current[k] = a;
    });
    return () => { Object.values(audios.current).forEach(a => a.pause()); };
  }, []);

  function speak(text) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US"; u.rate = 0.75;
    speechSynthesis.speak(u);
  }

  function play(key, fallback) {
    if (current.current) { current.current.pause(); }
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    let a = audios.current[key];
    if (!a) { a = new Audio(AUDIO_DIR + key + ".mp3"); audios.current[key] = a; }
    try { a.currentTime = 0; } catch (e) {}
    current.current = a;
    const p = a.play();
    if (p && p.catch) p.catch(() => speak(fallback));
  }

  function pick(key) {
    setActive(key);
    play(key, key);
    track("hero_word", { word: key });
  }

  const w = active && WORDS[active];

  return (
    <div className="vs">
      <Bird className="vs-b1" />
      <Bird className="vs-b2" />
      <Bird className="vs-b3" />

      <div className="vs-shadow">
        <div className="vs-stamp"><div className="vs-in">
          <p className="vs-ref">Matthew 6:26</p>
          <p className="vs-verse" lang="en">
            {PARTS.map((part, i) => {
              if (typeof part === "string") return part;
              // A pontuação que vem logo depois fica colada no botão (não quebra linha sozinha)
              return (
                <span key={i} style={{ whiteSpace: "nowrap" }}>
                  <button type="button" className={`vs-w vs-${WORDS[part.key].tone}`} aria-pressed={active === part.key} onClick={() => pick(part.key)}>
                    {part.key}
                  </button>{part.punct}
                </span>
              );
            })}
          </p>
          <div className="vs-meta">
            <button type="button" className="vs-pill" onClick={() => { play("verse", PLAIN); track("hero_verse_listen"); }}>
              <Play /> Ouvir devagar
            </button>
            <span className="vs-hint">Toque nas palavras destacadas.</span>
          </div>
        </div></div>
      </div>

      <div className="vs-card" aria-live="polite">
        {w ? (
          <>
            <div>
              <p className="vs-en" lang="en">{active}</p>
              <p className="vs-say">fala-se “{w.say}”</p>
            </div>
            <button type="button" className="vs-round" aria-label={`Ouvir ${active}`} onClick={() => play(active, active)}><Play /></button>
            <p className="vs-mean"><b>{w.mean}.</b> {w.note}</p>
          </>
        ) : (
          <p className="vs-empty">São três palavras. Você só precisa delas pra entender o versículo inteiro.</p>
        )}
      </div>

      <a className="vs-more" href="/activities/matthew-6-amostra.html" target="_blank" rel="noopener">Ver a aula completa <span aria-hidden="true">→</span></a>

      <style>{`
        .vs{position:relative;width:100%;max-width:520px;margin:0 auto}
        .vs-shadow{position:relative;z-index:1;filter:drop-shadow(0 24px 48px rgba(0,0,0,.45)) drop-shadow(0 0 1px rgba(255,186,49,.25))}
        .vs-stamp{--r:7px;background:#1e1e1e;color:#f4f2df;padding:calc(var(--r) + 20px) calc(var(--r) + 18px);
          -webkit-mask:radial-gradient(50% 50%,#000 66%,#0000 68%) 0 0/calc(2*var(--r)) calc(2*var(--r)) round,linear-gradient(#000 0 0) 50%/calc(100% - 2*var(--r)) calc(100% - 2*var(--r)) no-repeat;
                  mask:radial-gradient(50% 50%,#000 66%,#0000 68%) 0 0/calc(2*var(--r)) calc(2*var(--r)) round,linear-gradient(#000 0 0) 50%/calc(100% - 2*var(--r)) calc(100% - 2*var(--r)) no-repeat}
        .vs-in{border:2px dashed rgba(255,186,49,.55);border-radius:4px;padding:24px 22px 20px}
        .vs-ref{font-size:12px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:#ffba31;margin-bottom:12px}
        .vs-verse{font-family:var(--fd);font-size:clamp(22px,2.1vw,28px);line-height:1.45;color:#f4f2df}
        .vs-w{font:inherit;border:0;cursor:pointer;border-radius:8px;padding:0 8px 2px;margin:0 1px;transition:transform .15s ease,background-color .15s ease,box-shadow .15s ease;-webkit-tap-highlight-color:transparent}
        .vs-p{background:#ffba31;color:#1e1e1e}
        .vs-p:hover{background:#ffd06b}
        .vs-l{background:#fc5e2d;color:#f4f2df}
        .vs-l:hover{background:#ff7a52}
        .vs-w[aria-pressed="true"]{transform:rotate(-2deg);box-shadow:0 0 0 2px #1e1e1e,0 0 0 4px #f4f2df}
        .vs-w:focus-visible,.vs-pill:focus-visible,.vs-round:focus-visible,.vs-more:focus-visible{outline:3px solid #ffba31;outline-offset:3px}
        .vs-meta{display:flex;flex-wrap:wrap;align-items:center;gap:10px 16px;margin-top:20px}
        .vs-pill{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 18px;border-radius:24px;font-family:var(--fb);font-weight:600;font-size:15px;border:2px solid rgba(244,242,223,.6);background:none;color:#f4f2df;cursor:pointer;transition:background-color .2s,color .2s}
        .vs-pill:hover{background:#f4f2df;color:#1e1e1e}
        .vs-hint{font-size:14px;color:rgba(244,242,223,.6)}
        .vs-card{position:relative;z-index:1;margin-top:16px;background:#f4f2df;color:#1e1e1e;border-radius:16px;padding:16px 20px;display:grid;grid-template-columns:1fr auto;gap:4px 16px;align-items:center;min-height:112px;text-align:left}
        .vs-en{font-family:var(--fd);font-size:30px;line-height:1.1}
        .vs-say{font-size:14px;opacity:.65}
        .vs-mean{grid-column:1/-1;font-size:16px;line-height:1.5;margin-top:4px}
        .vs-empty{grid-column:1/-1;font-size:16px;line-height:1.5;opacity:.7}
        .vs-round{width:48px;height:48px;border-radius:50%;border:0;background:#1e1e1e;color:#f4f2df;display:grid;place-items:center;cursor:pointer;transition:background-color .2s}
        .vs-round:hover{background:#fc5e2d}
        .vs-more{display:inline-block;margin-top:14px;font-size:14px;color:rgba(244,242,223,.55);text-decoration:underline;text-decoration-color:rgba(244,242,223,.25);text-underline-offset:4px;transition:color .2s}
        .vs-more:hover{color:#ffba31}

        .vs-bird{position:absolute;z-index:0;pointer-events:none;opacity:.42;will-change:transform}
        .vs-bird svg{display:block;width:100%;height:auto;overflow:visible}
        .vs-wing{transform-origin:24px 12px;transform-box:view-box;animation:vsFlap 1.6s ease-in-out infinite}
        .vs-b1{width:64px;top:-58px;left:6%;animation:vsDrift1 18s ease-in-out infinite}
        .vs-b2{width:42px;top:-86px;left:30%;opacity:.3;animation:vsDrift2 22s ease-in-out infinite}
        .vs-b2 .vs-wing{animation-duration:1.9s;animation-delay:-.6s}
        .vs-b3{width:50px;top:18%;right:-70px;opacity:.34;animation:vsDrift3 20s ease-in-out infinite}
        .vs-b3 .vs-wing{animation-duration:1.4s;animation-delay:-.3s}
        @keyframes vsFlap{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.35)}}
        @keyframes vsDrift1{0%,100%{transform:translate(0,0)}50%{transform:translate(40px,-10px)}}
        @keyframes vsDrift2{0%,100%{transform:translate(0,0)}50%{transform:translate(-30px,8px)}}
        @keyframes vsDrift3{0%,100%{transform:translate(0,0)}50%{transform:translate(-14px,-18px)}}
        @media(max-width:959px){.vs-b3{right:2%;top:-48px;width:44px}.vs-b1{left:4%;top:-50px;width:54px}.vs-b2{top:-74px;left:28%}}
        @media(max-width:480px){.vs-stamp{--r:6px;padding:calc(var(--r) + 14px) calc(var(--r) + 12px)}.vs-in{padding:20px 16px 16px}.vs-verse{font-size:21px}.vs-en{font-size:26px}}
        @media(prefers-reduced-motion:reduce){.vs-bird,.vs-wing{animation:none!important}.vs-w{transition:none}}
      `}</style>
    </div>
  );
}
