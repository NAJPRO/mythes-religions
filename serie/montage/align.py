"""Aligne les lignes de voix-off.txt sur les segments de parole détectés dans l'audio (silencedetect).
Répartition par programmation dynamique : chaque ligne reçoit 1 à 4 segments consécutifs, dont la durée
doit être proportionnelle à son nombre de caractères. Sortie : montage/lines.json (début de chaque ligne, en s)."""
import json, re, subprocess, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def speech(f, db=-35, d=0.25):
    o = subprocess.run(["ffmpeg", "-i", f, "-af", f"silencedetect=noise={db}dB:d={d}", "-f", "null", "-"], capture_output=True, text=True).stderr
    m = re.search(r"Duration: (\d+):(\d+):([\d.]+)", o); dur = int(m[1]) * 3600 + int(m[2]) * 60 + float(m[3])
    st = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", o)]; en = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", o)]
    sil = list(zip(st, en + [dur] * (len(st) - len(en)))); sp = []; t = 0
    for a, b in sil:
        if a > t + 0.05: sp.append((t, a))
        t = b
    if dur > t + 0.05: sp.append((t, dur))
    return sp, dur
def align(lines, sp, maxg=4):
    r = sum(b - a for a, b in sp) / sum(len(l) for l in lines)
    nl, ns = len(lines), len(sp); INF = 1e18
    dp = [[INF] * (ns + 1) for _ in range(nl + 1)]; bk = [[0] * (ns + 1) for _ in range(nl + 1)]; dp[0][0] = 0
    for i in range(1, nl + 1):
        c = len(lines[i - 1])
        for j in range(i, ns + 1):
            for g in range(1, maxg + 1):
                if j - g < i - 1 or dp[i - 1][j - g] >= INF: continue
                dur = sum(b - a for a, b in sp[j - g:j]); exp = r * c
                cost = ((dur - exp) / (exp + 0.6)) ** 2 + 0.05 * (g - 1)
                if dp[i - 1][j - g] + cost < dp[i][j]: dp[i][j] = dp[i - 1][j - g] + cost; bk[i][j] = g
    j = ns; starts = [0] * nl
    for i in range(nl, 0, -1):
        g = bk[i][j]; starts[i - 1] = sp[j - g][0]; j -= g
    return starts
if __name__ == "__main__":
    L = [l.strip() for l in open(os.path.join(ROOT, "voix-off.txt"), encoding="utf-8")]
    sp1, d1 = speech(os.path.join(ROOT, "audio/voix_off_1.mp3")); sp2, d2 = speech(os.path.join(ROOT, "audio/voix_off_2.mp3"))
    cut = 98  # la voix_off_1 se termine sur « Il venait de comprendre. » (ligne 97)
    s = align(L[:cut], sp1) + [x + d1 for x in align(L[cut:], sp2)]
    json.dump([round(x, 2) for x in s], open(os.path.join(ROOT, "montage/lines.json"), "w"))
    for i in list(range(14, 25)) + [57, 97, 98, 133, 166]: print(i, f"{int(s[i]//60)}:{s[i]%60:05.2f}", L[i][:48])
