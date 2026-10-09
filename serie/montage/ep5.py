"""Épisode 5 — Répondre. Lancer : python3 montage/ep5.py"""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from episode import *
I = lambda n: f"images/{n}"
R = lambda n: f"references/{n}"
END = D1 + 140.04
SPEC = [
 (I("N22.jpg"), 134, 136, (0.50, 0.48, 1.2), (0.50, 0.50, 1.0), {"fade_in": 0.3}),
 (I("N27.jpg"), 136, 138, (0.72, 0.55, 1.0), (0.72, 0.52, 1.4), {"dissolve": 0.5}),
 (I("N24.jpg"), 138, 140, (0.45, 0.58, 1.0), (0.40, 0.58, 1.4), {"dissolve": 0.4, "shake": (T(139), 0.004)}),
 (I("N25_fr.png"), 140, 143, (0.50, 0.55, 1.0), (0.45, 0.50, 1.25), {"dissolve": 0.3}),
 (R("IMG2-portrait-mere.jpg"), 143, 145, (0.5, 0.50, 1.0), (0.5, 0.45, 1.3), {"dissolve": 0.4}),
 (I("N24.jpg"), 145, 147, (0.40, 0.58, 1.4), (0.38, 0.58, 1.7), {"dissolve": 0.3, "shake": (T(145), 0.004)}),
 (I("N25_fr.png"), 147, 150, (0.45, 0.50, 1.25), (0.50, 0.55, 1.0), {"dissolve": 0.3, "dim_last": (2.0, 0.3)}),
 (I("N25_fr.png"), 150, 154, (0.70, 0.50, 1.5), (0.62, 0.52, 1.9), {"dissolve": 0.3}),
 (R("IMG3-samuel.jpg"), 154, 158, (0.5, 0.36, 1.5), (0.5, 0.34, 2.0), {"dissolve": 0.4}),
 (R("IMG2-portrait-mere.jpg"), 158, 160, (0.5, 0.45, 1.3), (0.5, 0.45, 1.6), {"dissolve": 0.4}),
 (I("N26.jpg"), 160, 162, (0.50, 0.62, 1.0), (0.50, 0.65, 1.3), {}),
 (R("IMG5-porte-bleue.jpg"), 162, 165, (0.5, 0.50, 1.0), (0.5, 0.58, 1.4), {"dissolve": 0.5}),
 (R("IMG4-maison-nuit.jpg"), 165, 167, (0.5, 0.50, 1.3), (0.5, 0.50, 1.0), {"dissolve": 0.6, "fade_out": 1.2}),
]
build(5, 134, 167, SPEC, end=END, tail=0.0, outro=2.8, drone_gain=1.2, swell=(1.0, 1.2),
      ducks=[(T(152), T(154))], tag_from=0.0)
