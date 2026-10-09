"""Épisode 1 — La règle. Lancer : python3 montage/ep1.py"""
import json, os, subprocess, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from render import *

LN = json.load(open(os.path.join(ROOT, "montage/lines.json")))
T = lambda i: LN[i]
END = T(24) - 0.5          # fin de la voix : on coupe au noir juste avant « Samuel... » (ép. 2)
TOTAL = END + 0.6

# (image, ligne de début, ligne de fin exclue, vue début (cx,cy,zoom), vue fin, options)
SPEC = [
 ("references/IMG1-grand-mere-feu.jpg", 0, 1, (0.55, 0.55, 1.0), (0.55, 0.47, 1.18), {}),
 ("images/N01.png", 1, 2, (0.40, 0.50, 1.0), (0.56, 0.44, 1.14), {"dissolve": 0.4}),
 ("references/IMG5-porte-bleue.jpg", 2, 4, (0.5, 0.50, 1.0), (0.5, 0.58, 1.35), {}),
 ("references/IMG2-portrait-mere.jpg", 4, 5, (0.5, 0.50, 1.0), (0.5, 0.45, 1.22), {"dissolve": 0.3}),
 ("images/N14.png", 5, 7, (0.50, 0.50, 1.0), (0.50, 0.43, 1.55), {}),
 ("references/IMG1-grand-mere-feu.jpg", 7, 9, (0.58, 0.42, 1.9), (0.58, 0.40, 2.3), {"dissolve": 0.4}),
 ("references/IMG1-grand-mere-feu.jpg", 9, 11, (0.27, 0.80, 1.5), (0.24, 0.78, 1.9), {"fade_out": 0.5}),
 ("references/IMG3-samuel.jpg", 11, 13, (0.5, 0.50, 1.0), (0.5, 0.40, 1.4), {"fade_in": 0.5}),
 ("images/N02.png", 13, 14, (0.50, 0.45, 1.0), (0.52, 0.36, 1.35), {"dissolve": 0.5, "sat": 0.55}),
 ("references/IMG2-portrait-mere.jpg", 14, 15, (0.5, 0.50, 1.12), (0.5, 0.45, 1.4), {"dissolve": 0.5}),
 ("images/N03.png", 15, 17, (0.50, 0.56, 1.0), (0.48, 0.47, 1.3), {"dissolve": 0.5}),
 ("images/N01.png", 17, 20, (0.60, 0.62, 1.35), (0.50, 0.60, 1.0), {"dissolve": 0.4}),
 ("images/N04.png", 20, 21, (0.45, 0.45, 1.15), (0.45, 0.45, 1.32), {}),
 ("images/N05.png", 21, 22, (0.55, 0.45, 1.0), (0.42, 0.55, 1.3), {"dim": (0, 0, 1)}),
 ("images/N06.png", 22, 24, (0.60, 0.42, 1.0), (0.63, 0.44, 1.7), {"dissolve": 0.3}),
]
shots = []
for img, a, b, v0, v1, o in SPEC:
    s = dict(img=img, t0=T(a), t1=T(b) if b < 24 else END, v0=v0, v1=v1); s.update(o); shots.append(s)
shots[0]["t0"] = 0
# la lampe s'éteint : plan N05 (derniers 1,6 s)
n5 = shots[13]; n5["dim"] = (n5["t1"] - 1.6, n5["t1"] - 0.2, 0.25)
shots[-1]["fade_out"] = 0.0
for i in range(len(shots) - 1): shots[i]["t1"] = shots[i + 1]["t0"]
if shots[6]["t1"] - shots[6]["t0"] < 1: raise SystemExit("plan trop court")

subs = subtitle_entries(LN, 0, END, list(range(0, 24)))
title = [(0.3, 3.2, "NE RÉPONDS JAMAIS", 92, 960)]
silent = render(shots, subs, title, "ÉPISODE 1/5", TOTAL, "", silent_video="/tmp/_ep1_silent.mp4")

# --- son ---
voice = os.path.join(ROOT, "audio/voix_off_1.mp3"); out = os.path.join(ROOT, "episodes/ep1.mp4")
d = TOTAL
duck = f"between(t,{T(18)-0.2:.2f},{T(21)-0.1:.2f})"   # « Pas de musique. Pas de voiture. » : ambiance coupée
fc = (
 f"[1:a]atrim=0:{d},asetpts=PTS-STARTPTS,highpass=f=70,acompressor=threshold=-18dB:ratio=3:makeup=3,afade=t=out:st={END:.2f}:d=0.5[v];"
 f"anoisesrc=color=brown:amplitude=0.7:r=44100,lowpass=f=420,volume=0.16,atrim=0:{d},volume='if({duck},0,1)':eval=frame[wind];"
 f"sine=f=55:r=44100,volume=0.05[s1];sine=f=82.4:r=44100,volume=0.03[s2];[s1][s2]amix=inputs=2:normalize=0,tremolo=f=0.18:d=0.5,atrim=0:{d},"
 f"afade=t=in:st={T(10):.2f}:d=3,volume='if({duck},0,1)':eval=frame,adelay=0|0[drone];"
 f"[wind][drone]amix=inputs=2:normalize=0[amb];[v][amb]amix=inputs=2:normalize=0:duration=first,alimiter=limit=0.95[a]"
)
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", silent, "-i", voice, "-filter_complex", fc, "-map", "0:v", "-map", "[a]",
                "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-t", f"{d:.2f}", out], check=True)
print("OK", out, round(d, 1), "s")
