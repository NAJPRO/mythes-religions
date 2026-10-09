"""Moteur de montage : images animées (Ken Burns), sous-titres, habillage, ambiance sonore.
Usage : python3 montage/ep1.py   (les timecodes viennent de montage/lines.json)"""
import json, os, subprocess, numpy as np, cv2
from PIL import Image, ImageDraw, ImageFont

W, H, FPS = 1080, 1920, 30
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT = "/usr/share/fonts/opentype/inter/Inter-Bold.otf"
FONT_TITLE = "/usr/share/fonts/opentype/inter/InterDisplay-Bold.otf"

_img_cache = {}
def load(path):
    if path not in _img_cache:
        _img_cache[path] = cv2.cvtColor(cv2.imread(os.path.join(ROOT, path)), cv2.COLOR_BGR2RGB)
    return _img_cache[path]

def ease(x):  # easeInOut doux
    x = min(max(x, 0.0), 1.0)
    return x * x * (3 - 2 * x)

def view_frame(img, v0, v1, p):
    ih, iw = img.shape[:2]
    if iw / ih > 9 / 16: wh, ww = ih, ih * 9 / 16
    else: ww, wh = iw, iw * 16 / 9
    k = ease(p)
    cx = v0[0] + (v1[0] - v0[0]) * k; cy = v0[1] + (v1[1] - v0[1]) * k; z = v0[2] + (v1[2] - v0[2]) * k
    w, h = ww / z, wh / z
    x0 = min(max(cx * iw - w / 2, 0), iw - w); y0 = min(max(cy * ih - h / 2, 0), ih - h)
    s = W / w
    M = np.array([[s, 0, -x0 * s], [0, s, -y0 * s]], dtype=np.float32)
    return cv2.warpAffine(img, M, (W, H), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REFLECT)

def vignette():
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    d = np.sqrt(((xx - W / 2) / (W / 2)) ** 2 + ((yy - H * 0.48) / (H / 2)) ** 2)
    return (1 - 0.55 * np.clip(d - 0.45, 0, 1) ** 1.4)[..., None]

def text_layer(txt, size, color=(255, 255, 255), y=None, center_y=None, font=FONT, stroke=6, maxw=900, spacing=10):
    f = ImageFont.truetype(font, size)
    dummy = ImageDraw.Draw(Image.new("RGBA", (10, 10)))
    words, lines, cur = txt.split(" "), [], ""
    for w_ in words:
        t = (cur + " " + w_).strip()
        if dummy.textlength(t, font=f) <= maxw or not cur: cur = t
        else: lines.append(cur); cur = w_
    lines.append(cur)
    lh = size * 1.25
    th = lh * len(lines)
    top = (center_y - th / 2) if center_y is not None else y
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(layer)
    for i, l in enumerate(lines):
        tw = d.textlength(l, font=f)
        d.text(((W - tw) / 2, top + i * lh), l, font=f, fill=color + (255,), stroke_width=stroke, stroke_fill=(5, 8, 14, 255))
    a = np.asarray(layer).astype(np.float32) / 255
    return a[..., :3] * 255, a[..., 3:4]

def tag_layer(txt, size=34):
    f = ImageFont.truetype(FONT, size)
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(layer)
    d.text((56, 70), txt, font=f, fill=(220, 230, 240, 190), stroke_width=3, stroke_fill=(5, 8, 14, 200))
    a = np.asarray(layer).astype(np.float32) / 255
    return a[..., :3] * 255, a[..., 3:4]

def subtitle_entries(lines, t_start, t_end, line_idx, ghost=()):
    """Une entrée par ligne de voix off ; les lignes trop courtes sont fusionnées avec la suivante."""
    L = [l.strip() for l in open(os.path.join(ROOT, "voix-off.txt"), encoding="utf-8")]
    ent = []
    for k, i in enumerate(line_idx):
        a = lines[i]; b = lines[i + 1] if i + 1 < len(lines) else t_end
        ent.append([a, min(b, t_end), L[i]])
    out = []
    for e in ent:
        if out and (out[-1][1] - out[-1][0]) < 1.5:
            out[-1][1] = e[1]; out[-1][2] += " " + e[2]
        else: out.append(e)
    return out

def render(shots, subs, title, tag, total, out_mp4, silent_video="/tmp/_ep_silent.mp4", audio_filter_args=None):
    vig = vignette()
    rng = np.random.default_rng(7)
    grain = [(rng.normal(0, 3.5, (H, W, 1))).astype(np.float32) for _ in range(6)]
    sub_layers = [(a, b, *text_layer(t, 62, center_y=1560, maxw=900)) for a, b, t in subs]
    title_layers = [(a, b, *text_layer(t_, sz, font=FONT_TITLE, center_y=cy, stroke=8, maxw=940)) for (a, b, t_, sz, cy) in title]
    tag_rgb, tag_a = tag_layer(tag)
    p = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
                          "-c:v", "libx264", "-preset", "medium", "-crf", "21", "-maxrate", "9M", "-bufsize", "18M", "-pix_fmt", "yuv420p", silent_video], stdin=subprocess.PIPE)
    n = int(round(total * FPS))
    def shot_frame(s, t):
        img = load(s["img"])
        pr = (t - s["t0"]) / max(s["t1"] - s["t0"], 1e-3)
        f = view_frame(img, s["v0"], s["v1"], pr).astype(np.float32)
        if s.get("sat") is not None:
            g = f.mean(axis=2, keepdims=True); f = g + (f - g) * s["sat"]
        if s.get("dim"):  # (t_debut, t_fin, facteur_final) : la lumière s'éteint
            d0, d1, fin = s["dim"]; k = ease((t - d0) / (d1 - d0)); f = f * (1 - (1 - fin) * k)
        return f
    for i in range(n):
        t = i / FPS
        cur = [s for s in shots if s["t0"] <= t < s["t1"]]
        s = cur[0] if cur else None
        if s is None: f = np.zeros((H, W, 3), np.float32)
        else:
            f = shot_frame(s, t)
            idx = shots.index(s)
            dis = s.get("dissolve", 0)
            if dis and idx > 0 and t - s["t0"] < dis:
                pv = shots[idx - 1]; pf = shot_frame(pv, min(t, pv["t1"] - 1e-3)); a = (t - s["t0"]) / dis
                f = pf * (1 - a) + f * a
            fi = s.get("fade_in", 0)
            if fi and t - s["t0"] < fi: f = f * ((t - s["t0"]) / fi)
            fo = s.get("fade_out", 0)
            if fo and s["t1"] - t < fo: f = f * ((s["t1"] - t) / fo)
            # respiration lumineuse de la lampe
            f = f * (1 + 0.025 * np.sin(t * 7.3) + 0.015 * np.sin(t * 17.1))
        f = f * vig + grain[i % 6]
        for a_, b_, rgb, al in title_layers:
            if a_ <= t < b_:
                k = min((t - a_) / 0.5, (b_ - t) / 0.6, 1); f = f * (1 - al * k) + rgb * al * k
        if t >= 3.4:
            f = f * (1 - tag_a) + tag_rgb * tag_a
        for a_, b_, rgb, al in sub_layers:
            if a_ <= t < b_:
                k = min((t - a_) / 0.15, (b_ - t) / 0.15, 1); k = max(k, 0); f = f * (1 - al * k) + rgb * al * k
        p.stdin.write(np.clip(f, 0, 255).astype(np.uint8).tobytes())
    p.stdin.close(); p.wait()
    return silent_video
