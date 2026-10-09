"""Assemble un épisode : images animées + sous-titres + voix + ambiance. Utilisé par ep3.py, ep4.py, ep5.py."""
import json, os, subprocess
from render import *

LN = json.load(open(os.path.join(ROOT, "montage/lines.json")))
T = lambda i: LN[i]
D1 = 219.09  # durée de voix_off_1.mp3 : voix_off_2 démarre à ce moment sur la ligne de temps globale

def build(num, A, B, spec, end=None, tail=0.7, ducks=(), swell=None, drone_gain=1.0, outro=None, tag_from=0.0):
    START = T(A); END = end if end is not None else T(B) - 0.25
    TOTAL = END - START + tail + (outro or 0)
    shots = []
    for img, a, b, v0, v1, o in spec:
        s = dict(img=img, t0=T(a), t1=T(b) if b < B else END, v0=v0, v1=v1); s.update(o); shots.append(s)
    for i in range(len(shots) - 1): shots[i]["t1"] = shots[i + 1]["t0"]
    shots[0]["t0"] = START
    for s in shots:
        if "dim_last" in s:  # (durée, facteur) : la lumière baisse sur les dernières secondes du plan
            d, f = s.pop("dim_last"); s["dim"] = (s["t1"] - d, s["t1"] - 0.05, f)
    subs = subtitle_entries(LN, START, END, list(range(A, B)))
    title = [(END - START + 0.3, END - START + outro - 0.2, "NE RÉPONDS JAMAIS", 92, 960)] if outro else []
    silent = render(shots, subs, title, f"ÉPISODE {num}/5", TOTAL, "", silent_video=f"/tmp/_ep{num}_silent.mp4", t_off=START, tag_from=tag_from)
    # --- son ---
    if START < D1: voice, voff = os.path.join(ROOT, "audio/voix_off_1.mp3"), START
    else: voice, voff = os.path.join(ROOT, "audio/voix_off_2.mp3"), START - D1
    e_rel = END - START; d = TOTAL
    quiet = "+".join(f"between(t,{a-START:.2f},{b-START:.2f})" for a, b in ducks) or "0"
    ramp = f"({swell[0]}+({swell[1]}-{swell[0]})*t/{d:.1f})" if swell else "1"
    fc = (
     f"[1:a]atrim={voff:.2f}:{voff+e_rel+0.6:.2f},asetpts=PTS-STARTPTS,highpass=f=70,acompressor=threshold=-18dB:ratio=3:makeup=3,"
     f"afade=t=out:st={e_rel:.2f}:d=0.5,apad=whole_dur={d:.2f}[v];"
     f"anoisesrc=color=brown:amplitude=0.7:r=44100,lowpass=f=420,volume=0.16,atrim=0:{d:.2f},volume='if({quiet},0,1)':eval=frame,afade=t=out:st={d-1.2:.2f}:d=1.2[wind];"
     f"sine=f=55:r=44100,volume={0.06*drone_gain}[s1];sine=f=82.4:r=44100,volume={0.035*drone_gain}[s2];"
     f"[s1][s2]amix=inputs=2:normalize=0,tremolo=f=0.18:d=0.5,atrim=0:{d:.2f},volume='{ramp}*if({quiet},0.15,1)':eval=frame,afade=t=out:st={d-1.5:.2f}:d=1.5[drone];"
     f"[wind][drone]amix=inputs=2:normalize=0[amb];[v][amb]amix=inputs=2:normalize=0:duration=first,alimiter=limit=0.95[a]"
    )
    out = os.path.join(ROOT, f"episodes/ep{num}.mp4")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", silent, "-i", voice, "-filter_complex", fc, "-map", "0:v", "-map", "[a]",
                    "-c:v", "libx264", "-preset", "slow", "-crf", "27", "-maxrate", "4M", "-bufsize", "8M", "-pix_fmt", "yuv420p",
                    "-c:a", "aac", "-b:a", "192k", "-t", f"{d:.2f}", out], check=True)
    print("OK", out, round(d, 1), "s")
