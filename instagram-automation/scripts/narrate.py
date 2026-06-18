#!/usr/bin/env python3
# ─── Narração dos Reels via Kokoro (TTS local, grátis) ────────────────────────
# Lê o reel-props.json (title + slides + cta), gera a narração POR BEAT no idioma
# do reel (pt-br = 'p', es = 'e'), concatena num único WAV e devolve ao props:
#   • narration: nome do arquivo em public/ (Remotion staticFile)
#   • beatSecs:  duração (s) de cada beat = sua fala + um respiro
# Assim cada beat do vídeo dura exatamente o tempo da sua narração (fica em sync).
#
# Fail-open: qualquer erro (Kokoro indisponível, idioma sem voz, etc.) imprime
# aviso e sai 0 SEM mexer no props → o Reel renderiza mudo (não quebra o pipeline).
#
# Uso: python scripts/narrate.py --props ../reel-props.json --lang pt --out public/narration.wav

import argparse, json, os, sys, wave

VOICES = {
    "pt": ("p", "pf_dora"),  # lang_code Kokoro, voz padrão (feminina)
    "es": ("e", "ef_dora"),
}
GAP_S = 0.35          # respiro entre beats
SAMPLE_RATE = 24000   # Kokoro entrega 24 kHz


def log(msg: str) -> None:
    print(f"[narrate] {msg}", flush=True)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--props", required=True)
    ap.add_argument("--lang", default="pt", choices=["pt", "es"])
    ap.add_argument("--out", required=True)  # relativo ao working-dir (ex: public/narration.wav)
    args = ap.parse_args()

    try:
        props = json.load(open(args.props, encoding="utf-8"))
    except Exception as e:
        log(f"props ilegível ({e}) — pulando narração")
        return 0

    title = (props.get("title") or "").strip()
    slides = [s.strip() for s in (props.get("slides") or []) if s and s.strip()]
    cta = (props.get("cta") or "").strip()
    segments = [t for t in [title, *slides, cta] if t]  # cover, slides..., cta
    if not segments:
        log("sem texto p/ narrar — pulando")
        return 0

    lang_code, voice = VOICES.get(args.lang, VOICES["pt"])

    try:
        import numpy as np
        from kokoro import KPipeline
    except Exception as e:
        log(f"Kokoro/numpy indisponível ({e}) — reel sai mudo")
        return 0

    try:
        pipeline = KPipeline(lang_code=lang_code)
    except Exception as e:
        log(f"falha ao iniciar Kokoro ({e}) — reel sai mudo")
        return 0

    gap = np.zeros(int(GAP_S * SAMPLE_RATE), dtype=np.float32)
    full = []
    beat_secs = []
    for i, text in enumerate(segments):
        try:
            chunks = [audio for _, _, audio in pipeline(text, voice=voice)]
            seg = np.concatenate(chunks) if chunks else np.zeros(0, dtype=np.float32)
        except Exception as e:
            log(f"beat {i} falhou ({e}) — usando silêncio curto")
            seg = np.zeros(int(0.8 * SAMPLE_RATE), dtype=np.float32)
        full.append(seg)
        full.append(gap)
        beat_secs.append(round(len(seg) / SAMPLE_RATE + GAP_S, 2))

    audio = np.concatenate(full) if full else np.zeros(0, dtype=np.float32)
    if audio.size == 0:
        log("narração vazia — reel sai mudo")
        return 0

    os.makedirs(os.path.dirname(args.out) or ".", exist_ok=True)
    # WAV 16-bit PCM mono (sem depender de soundfile).
    pcm = (np.clip(audio, -1.0, 1.0) * 32767).astype("<i2")
    with wave.open(args.out, "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SAMPLE_RATE)
        w.writeframes(pcm.tobytes())

    props["narration"] = os.path.basename(args.out)  # staticFile lê de public/
    props["beatSecs"] = beat_secs
    json.dump(props, open(args.props, "w", encoding="utf-8"), ensure_ascii=False)
    log(f"OK — {len(segments)} beats, {round(sum(beat_secs),1)}s, voz {voice} ({args.lang}) → {args.out}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
