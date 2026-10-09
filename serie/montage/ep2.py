"""Épisode 2 — La voix. Lancer : python3 montage/ep2.py"""
import json, os, subprocess, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from render import *

LN = json.load(open(os.path.join(ROOT, "montage/lines.json")))
T = lambda i: LN[i]
A, B = 24, 58                    # lignes 24 à 57 incluses (« Samuel… » → « Toc. »)
START, END = T(A), T(B) - 0.25   # coupe au noir juste après « Toc. »
TOTAL = END - START + 0.7

SPEC = [
 ("images/N07.png", 24, 27, (0.45, 0.40, 1.1), (0.38, 0.38, 1.5), {"fade_in": 0.4}),
 ("references/IMG5-porte-bleue.jpg", 27, 30, (0.5, 0.50, 1.0), (0.5, 0.62, 1.3), {}),
 ("images/N08.png", 30, 32, (0.45, 0.50, 1.0), (0.42, 0.42, 1.28), {"dissolve": 0.3}),
 ("references/IMG2-portrait-mere.jpg", 32, 34, (0.5, 0.50, 1.0), (0.5, 0.45, 1.28), {"dissolve": 0.3}),
 ("images/N09.png", 34, 36, (0.60, 0.45, 1.0), (0.70, 0.45, 1.3), {"dissolve": 0.4}),
 ("images/N10.png", 36, 40, (0.50, 0.50, 1.0), (0.50, 0.70, 1.5), {"dissolve": 0.3}),
 ("references/IMG3-samuel.jpg", 40, 42, (0.5, 0.38, 1.6), (0.5, 0.36, 1.95), {}),
 ("references/IMG4-maison-nuit.jpg", 42, 43, (0.5, 0.55, 1.0), (0.58, 0.62, 1.35), {"dissolve": 0.3}),
 ("images/N11.png", 43, 46, (0.50, 0.50, 1.0), (0.45, 0.58, 1.3), {"dissolve": 0.3}),
 ("images/N12.png", 46, 48, (0.60, 0.35, 1.0), (0.72, 0.28, 1.4), {}),
 ("references/IMG1-grand-mere-feu.jpg", 48, 49, (0.55, 0.50, 1.2), (0.58, 0.44, 1.6), {"dissolve": 0.5, "sat": 0.5}),
 ("references/IMG1-grand-mere-feu.jpg", 49, 52, (0.58, 0.42, 1.9), (0.58, 0.40, 2.35), {"sat": 0.5}),
 ("images/N12.png", 52, 54, (0.72, 0.28, 1.4), (0.50, 0.36, 1.0), {}),
 ("images/N06.png", 54, 58, (0.60, 0.42, 1.0), (0.62, 0.45, 1.55), {"dissolve": 0.4}),
]
shots = []
for img, a, b, v0, v1, o in SPEC:
    s = dict(img=img, t0=T(a), t1=T(b) if b < B else END, v0=v0, v1=v1); s.update(o); shots.append(s)
for i in range(len(shots) - 1): shots[i]["t1"] = shots[i + 1]["t0"]
shots[0]["t0"] = START
shots[-1]["fade_out"] = 0.0

subs = subtitle_entries(LN, START, END, list(range(A, B)))
silent = render(shots, subs, [], "ÉPISODE 2/5", TOTAL, "", silent_video="/tmp/_ep2_silent.mp4", t_off=START, tag_from=0.0)

voice = os.path.join(ROOT, "audio/voix_off_1.mp3"); out = os.path.join(ROOT, "episodes/ep2.mp4")
d = TOTAL; e_rel = END - START
quiet = f"between(t,{T(54)-START-0.2:.2f},{T(57)-START-0.1:.2f})"   # « plus aucun bruit » : l'ambiance tombe
fc = (
 f"[1:a]atrim={START:.2f}:{START+d:.2f},asetpts=PTS-STARTPTS,highpass=f=70,acompressor=threshold=-18dB:ratio=3:makeup=3,afade=t=out:st={e_rel:.2f}:d=0.4[v];"
 f"anoisesrc=color=brown:amplitude=0.7:r=44100,lowpass=f=420,volume=0.16,atrim=0:{d},volume='if({quiet},0,1)':eval=frame[wind];"
 f"sine=f=55:r=44100,volume=0.06[s1];sine=f=82.4:r=44100,volume=0.035[s2];[s1][s2]amix=inputs=2:normalize=0,tremolo=f=0.18:d=0.5,atrim=0:{d},"
 f"volume='if({quiet},0.15,1)':eval=frame[drone];"
 f"[wind][drone]amix=inputs=2:normalize=0[amb];[v][amb]amix=inputs=2:normalize=0:duration=first,alimiter=limit=0.95[a]"
)
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", silent, "-i", voice, "-filter_complex", fc, "-map", "0:v", "-map", "[a]",
                "-c:v", "libx264", "-preset", "slow", "-crf", "27", "-maxrate", "4M", "-bufsize", "8M", "-pix_fmt", "yuv420p",
                "-c:a", "aac", "-b:a", "192k", "-t", f"{d:.2f}", out], check=True)
print("OK", out, round(d, 1), "s")
