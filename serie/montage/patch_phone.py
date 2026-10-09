"""Remplace le texte anglais de l'écran du téléphone (N25) par du français : « Maman / Appel entrant »."""
import cv2, numpy as np, os
from PIL import Image, ImageDraw, ImageFont
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
img = cv2.imread(os.path.join(ROOT, "images/N25.jpg"))
mask = np.zeros(img.shape[:2], np.uint8)
for x0, y0, x1, y1 in [(455, 890, 645, 990), (635, 1255, 735, 1325), (790, 1220, 890, 1285)]:
    cv2.rectangle(mask, (x0, y0), (x1, y1), 255, -1)
img = cv2.inpaint(img, mask, 9, cv2.INPAINT_TELEA)
pil = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB)).convert("RGBA")
F = "/usr/share/fonts/opentype/inter/Inter-Bold.otf"
def put(text, center, size, angle, fill):
    f = ImageFont.truetype(F, size)
    lay = Image.new("RGBA", (500, 140), (0, 0, 0, 0)); d = ImageDraw.Draw(lay)
    w = d.textlength(text, font=f); d.text(((500 - w) / 2, 40), text, font=f, fill=fill)
    lay = lay.rotate(angle, resample=Image.BICUBIC, expand=True)
    pil.alpha_composite(lay, (int(center[0] - lay.width / 2), int(center[1] - lay.height / 2)))
put("Maman", (548, 918), 38, 10, (235, 240, 245, 255))
put("Appel entrant", (548, 960), 24, 10, (150, 160, 170, 255))
put("Refuser", (688, 1295), 21, 17, (225, 230, 235, 255))
put("Accepter", (842, 1250), 21, 14, (225, 230, 235, 255))
pil.convert("RGB").save(os.path.join(ROOT, "images/N25_fr.png"))
