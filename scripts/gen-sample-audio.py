#!/usr/bin/env python3
"""Gera os áudios da página de amostra com a ElevenLabs (voz Jason, padrão Let B).

Uso, na raiz do repo letb-landing:
    ELEVENLABS_API_KEY=... python3 scripts/gen-sample-audio.py

Só usa a biblioteca padrão do Python. Não regrava arquivos que já existem
(apague o mp3 para gerar de novo).
"""
import json, os, sys, urllib.request, urllib.error
from pathlib import Path

VOICE_ID = "5kMbtRSEKIkRZSdXxrZg"      # Jason
MODEL_ID = "eleven_multilingual_v2"
OUT_DIR = Path("public/activities/audio/matthew-6-26")

# nome do arquivo -> (texto, velocidade)
CLIPS = {
    "verse": ("See the birds of the sky, that they don't sow, neither do they reap, "
              "nor gather into barns. Your heavenly Father feeds them. "
              "Aren't you of much more value than they?", 0.85),
    "sentence": ("Your heavenly Father feeds them.", 0.85),
    "sow": ("Sow.", 0.8),
    "reap": ("Reap.", 0.8),
    "feeds": ("Feeds.", 0.8),
}

def main():
    key = os.environ.get("ELEVENLABS_API_KEY", "").strip()
    if not key:
        sys.exit("Defina ELEVENLABS_API_KEY no ambiente antes de rodar.")
    if not Path("public").is_dir():
        sys.exit("Rode este script na raiz do repo letb-landing.")
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for name, (text, speed) in CLIPS.items():
        out = OUT_DIR / f"{name}.mp3"
        if out.exists():
            print(f"já existe  {out}")
            continue
        body = json.dumps({
            "text": text,
            "model_id": MODEL_ID,
            "voice_settings": {"stability": 0.55, "similarity_boost": 0.75, "speed": speed},
        }).encode()
        req = urllib.request.Request(
            f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}?output_format=mp3_44100_128",
            data=body, method="POST",
            headers={"xi-api-key": key, "Content-Type": "application/json", "Accept": "audio/mpeg"})
        try:
            with urllib.request.urlopen(req, timeout=120) as r:
                out.write_bytes(r.read())
        except urllib.error.HTTPError as e:
            sys.exit(f"ElevenLabs recusou '{name}': HTTP {e.code} {e.read()[:300].decode(errors='replace')}")
        print(f"gerado     {out}  ({out.stat().st_size // 1024} KB)")

if __name__ == "__main__":
    main()
