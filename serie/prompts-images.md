# Prompts d'images — « Ne réponds jamais » (ChatGPT)

## Comment les utiliser

1. **Travaille dans une seule conversation ChatGPT** (génération d'images). Colle d'abord le message d'ouverture ci-dessous avec tes 5 images jointes.
2. Pour chaque plan, **joins l'image de référence indiquée** (ex. `IMG3` pour Samuel, `IMG5` pour la porte) puis colle le prompt complet.
3. ChatGPT génère en format portrait 2:3 (1024×1536) et pas en 9:16 exact : **on recadre au montage** en 1080×1920 (j'ai laissé de l'air en haut et en bas exprès).
4. Si Samuel change de visage ou de t-shirt, ajoute : *« Same man as the reference image, same face, same grey t-shirt. Keep everything else. »*
5. **Aucun texte dans les images** : « Maman », « appel entrant », etc. sont ajoutés au montage.
6. Si ChatGPT refuse ou adoucit un plan, remplace « shadow of a figure » par « shadow on the shutters ». Je peux reformuler plan par plan.

## Message d'ouverture (à coller une fois, avec IMG1 à IMG5 jointes)

```
These 5 images are the visual reference for a short horror series set in a Central African village at night. For every image I ask next, keep the same photographic style: cinematic photorealism, deep midnight blue and teal shadows, a single warm amber kerosene lantern as the only warm light, cracked clay walls, peeling faded blue paint, fine film grain, shallow depth of field. Keep the same characters: Samuel (image 3), the grandmother (image 1), the blue door (image 5), the blue-and-white house (image 4). Never show a monster or a ghost's face. Generate each image in vertical portrait format with empty space at the bottom. Confirm you understand, then wait for my first prompt.
```

## Les prompts

Chaque bloc est **complet** : il suffit de le copier-coller avec l'image de référence jointe. Le fichier `prompts-complets.txt` contient les mêmes prompts, un par ligne, pour copier plus vite.

### N01 — Village vide la nuit
- **Utilisé dans :** Ép. 1  
- **Image à joindre :** IMG1  
- **Mouvement (si tu l'animes) :** Glissé latéral très lent, brume qui avance.

```
Wide establishing shot of an empty African village at night, thatched mud huts, big trees, moonlit clouds above, thin mist on the dirt ground, not a single person visible, a few distant faint amber windows, eerie silence. Cinematic photorealistic night photograph, vertical portrait composition (2:3), subject in the central third with empty dark space at the bottom of the frame, Central African village at night, deep midnight blue and teal shadows, a single warm amber kerosene lantern as the only warm light source, cracked clay walls, peeling blue paint, shallow depth of field, 35mm lens, fine film grain, light volumetric mist, moody and subtle horror atmosphere, realistic. No monster, no visible ghost, no text, no watermark, no gore, no saturated colors, no modern city lights.
```

### N02 — Samuel en ville (flashback)
- **Utilisé dans :** Ép. 1  
- **Image à joindre :** IMG3  
- **Mouvement (si tu l'animes) :** Image fixe, léger travelling.

```
Samuel, a Black African man of about 38, short curly black hair, short beard, tired and alert eyes, worn dark-grey crew-neck t-shirt (exactly like the person in the reference image) walking alone on a busy African city street in the evening, seen from the side, blurred out-of-focus street lights and motorbikes in the background, slightly desaturated and cold, distant and lonely mood, he looks tired. Cinematic photorealistic night photograph, vertical portrait composition (2:3), subject in the central third with empty dark space at the bottom of the frame, African city street at night, deep midnight blue and teal shadows, blurred warm street lamps, shallow depth of field, 35mm lens, fine film grain, light volumetric mist, moody and subtle horror atmosphere, realistic. No monster, no visible ghost, no text, no watermark, no gore, no saturated colors.
```

### N03 — Samuel de dos sur le chemin
- **Utilisé dans :** Ép. 1  
- **Image à joindre :** IMG3 + IMG1  
- **Mouvement (si tu l'animes) :** Suivi lent par l'arrière, la lampe se balance.

```
Samuel, a Black African man of about 38, short curly black hair, short beard, tired and alert eyes, worn dark-grey crew-neck t-shirt (exactly like the person in the reference image) seen from behind, walking alone on a dirt path between mud huts at night, holding a lit kerosene lantern in his right hand, long shadow in front of him, the village completely silent and empty, moon behind clouds. Cinematic photorealistic night photograph, vertical portrait composition (2:3), subject in the central third with empty dark space at the bottom of the frame, Central African village at night, deep midnight blue and teal shadows, a single warm amber kerosene lantern as the only warm light source, cracked clay walls, peeling blue paint, shallow depth of field, 35mm lens, fine film grain, light volumetric mist, moody and subtle horror atmosphere, realistic. No monster, no visible ghost, no text, no watermark, no gore, no saturated colors, no modern city lights.
```

### N04 — Chien immobile
- **Utilisé dans :** Ép. 1  
- **Image à joindre :** IMG1  
- **Mouvement (si tu l'animes) :** Image presque fixe, l'oreille bouge.

```
A thin village dog standing perfectly still on a dirt road at night, ears raised, looking at something off-camera toward a dark house, cold blue moonlight, completely silent and tense, no other animals. Cinematic photorealistic night photograph, vertical portrait composition (2:3), subject in the central third with empty dark space at the bottom of the frame, Central African village at night, deep midnight blue and teal shadows, a single warm amber kerosene lantern as the only warm light source, cracked clay walls, peeling blue paint, shallow depth of field, 35mm lens, fine film grain, light volumetric mist, moody and subtle horror atmosphere, realistic. No monster, no visible ghost, no text, no watermark, no gore, no saturated colors, no modern city lights.
```

### N05 — Samuel verrouille la porte, souffle la lampe
- **Utilisé dans :** Ép. 1  
- **Image à joindre :** IMG3 + IMG5  
- **Mouvement (si tu l'animes) :** La flamme s'éteint, la fumée monte, le plan devient noir.

```
Interior view: Samuel, a Black African man of about 38, short curly black hair, short beard, tired and alert eyes, worn dark-grey crew-neck t-shirt (exactly like the person in the reference image), seen from the side, sliding a rusty bolt on an old wooden door with chipped, faded blue paint, an aged metal handle and keyhole plate, set in a cracked clay wall (exactly like the door in the reference image) from the inside, a kerosene lantern in the foreground with its flame about to go out, a thin trail of smoke rising, the room almost dark, a thin line of cold blue light under the door. Cinematic photorealistic night photograph, vertical portrait composition (2:3), subject in the central third with empty dark space at the bottom of the frame, Central African village at night, deep midnight blue and teal shadows, a single warm amber kerosene lantern as the only warm light source, cracked clay walls, peeling blue paint, shallow depth of field, 35mm lens, fine film grain, light volumetric mist, moody and subtle horror atmosphere, realistic. No monster, no visible ghost, no text, no watermark, no gore, no saturated colors, no modern city lights.
```

### N06 — Chambre noire, lumière bleue sous la porte (plan de référence)
- **Utilisé dans :** Ép. 1, 3, 4  
- **Image à joindre :** IMG5  
- **Mouvement (si tu l'animes) :** Poussée très lente vers la porte. À utiliser aussi avec la lampe qui vacille.

```
Wide shot of the small dark interior of a clay-walled house: cracked clay walls, wooden shutters, a corrugated metal roof, a simple wooden bed, a woven basket, a small wooden table with a kerosene lantern turned very low, in near total darkness, a simple bed on the left, the an old wooden door with chipped, faded blue paint, an aged metal handle and keyhole plate, set in a cracked clay wall (exactly like the door in the reference image) at the far end of the room, a thin line of cold blue light glowing under the door on the dirt floor, everything else in deep shadow, a faint amber glow from the lowered lantern, quiet tension. Cinematic photorealistic night photograph, vertical portrait composition (2:3), subject in the central third with empty dark space at the bottom of the frame, Central African village at night, deep midnight blue and teal shadows, a single warm amber kerosene lantern as the only warm light source, cracked clay walls, peeling blue paint, shallow depth of field, 35mm lens, fine film grain, light volumetric mist, moody and subtle horror atmosphere, realistic. No monster, no visible ghost, no text, no watermark, no gore, no saturated colors, no modern city lights.
```

### N07 — Gros plan des yeux de Samuel
- **Utilisé dans :** Ép. 2  
- **Image à joindre :** IMG3  
- **Mouvement (si tu l'animes) :** Les yeux s'ouvrent lentement, léger clignement.

```
Extreme close-up of the eyes of Samuel, a Black African man of about 38, short curly black hair, short beard, tired and alert eyes, worn dark-grey crew-neck t-shirt (exactly like the person in the reference image) lying in bed in the dark, eyes just opening, wide awake, cold blue light on his face from a shuttered window, a hint of amber from a lantern at the edge of the frame, sweat on his skin. Cinematic photorealistic night photograph, vertical portrait composition (2:3), subject in the central third with empty dark space at the bottom of the frame, Central African village at night, deep midnight blue and teal shadows, a single warm amber kerosene lantern as the only warm light source, cracked clay walls, peeling blue paint, shallow depth of field, 35mm lens, fine film grain, light volumetric mist, moody and subtle horror atmosphere, realistic. No monster, no visible ghost, no text, no watermark, no gore, no saturated colors, no modern city lights.
```

### N08 — Samuel assis dans son lit
- **Utilisé dans :** Ép. 2  
- **Image à joindre :** IMG3  
- **Mouvement (si tu l'animes) :** Il se redresse lentement, légère poussée.

```
Samuel, a Black African man of about 38, short curly black hair, short beard, tired and alert eyes, worn dark-grey crew-neck t-shirt (exactly like the person in the reference image) sitting up in his wooden bed in the dark, half of his face lit by cold blue moonlight through wooden shutters, the other half in deep shadow, listening intently, tense posture, the an old wooden door with chipped, faded blue paint, an aged metal handle and keyhole plate, set in a cracked clay wall (exactly like the door in the reference image) visible faintly in the background. Cinematic photorealistic night photograph, vertical portrait composition (2:3), subject in the central third with empty dark space at the bottom of the frame, Central African village at night, deep midnight blue and teal shadows, a single warm amber kerosene lantern as the only warm light source, cracked clay walls, peeling blue paint, shallow depth of field, 35mm lens, fine film grain, light volumetric mist, moody and subtle horror atmosphere, realistic. No monster, no visible ghost, no text, no watermark, no gore, no saturated colors, no modern city lights.
```

### N09 — Samuel sous la couverture, la porte au fond
- **Utilisé dans :** Ép. 2  
- **Image à joindre :** IMG3 + IMG5  
- **Mouvement (si tu l'animes) :** Quasi fixe, respiration.

```
Samuel, a Black African man of about 38, short curly black hair, short beard, tired and alert eyes, worn dark-grey crew-neck t-shirt (exactly like the person in the reference image) curled up under a thin blanket on his bed, only his eyes and forehead visible, looking toward the an old wooden door with chipped, faded blue paint, an aged metal handle and keyhole plate, set in a cracked clay wall (exactly like the door in the reference image) which is visible at the far end of the room with a thin line of blue light under it, tense, silent. Cinematic photorealistic night photograph, vertical portrait composition (2:3), subject in the central third with empty dark space at the bottom of the frame, Central African village at night, deep midnight blue and teal shadows, a single warm amber kerosene lantern as the only warm light source, cracked clay walls, peeling blue paint, shallow depth of field, 35mm lens, fine film grain, light volumetric mist, moody and subtle horror atmosphere, realistic. No monster, no visible ghost, no text, no watermark, no gore, no saturated colors, no modern city lights.
```

### N10 — Ombre de deux pieds sous la porte
- **Utilisé dans :** Ép. 2  
- **Image à joindre :** IMG5  
- **Mouvement (si tu l'animes) :** Fixe. La ligne de lumière se coupe, on ajoute le son en post.

```
Low angle close shot of the bottom of an old wooden door with chipped, faded blue paint, an aged metal handle and keyhole plate, set in a cracked clay wall (exactly like the door in the reference image) on a dirt floor: the thin line of cold blue light under the door is interrupted by the dark shadow of two feet standing right behind the door, nothing else visible, a faint amber lantern glow at the edge of the frame. Cinematic photorealistic night photograph, vertical portrait composition (2:3), subject in the central third with empty dark space at the bottom of the frame, Central African village at night, deep midnight blue and teal shadows, a single warm amber kerosene lantern as the only warm light source, cracked clay walls, peeling blue paint, shallow depth of field, 35mm lens, fine film grain, light volumetric mist, moody and subtle horror atmosphere, realistic. No monster, no visible ghost, no text, no watermark, no gore, no saturated colors, no modern city lights.
```

### N11 — Pieds nus de Samuel sur la terre battue
- **Utilisé dans :** Ép. 2  
- **Image à joindre :** IMG3  
- **Mouvement (si tu l'animes) :** Deux pas lents, caméra bas, suivi arrière.

```
Close shot of the bare feet of Samuel, a Black African man of about 38, short curly black hair, short beard, tired and alert eyes, worn dark-grey crew-neck t-shirt (exactly like the person in the reference image) stepping slowly across a packed dirt floor in a dark room, toward a thin line of blue light under a an old wooden door with chipped, faded blue paint, an aged metal handle and keyhole plate, set in a cracked clay wall (exactly like the door in the reference image) in the background, faint amber lantern glow, dust in the air. Cinematic photorealistic night photograph, vertical portrait composition (2:3), subject in the central third with empty dark space at the bottom of the frame, Central African village at night, deep midnight blue and teal shadows, a single warm amber kerosene lantern as the only warm light source, cracked clay walls, peeling blue paint, shallow depth of field, 35mm lens, fine film grain, light volumetric mist, moody and subtle horror atmosphere, realistic. No monster, no visible ghost, no text, no watermark, no gore, no saturated colors, no modern city lights.
```

### N12 — Main sur la poignée
- **Utilisé dans :** Ép. 2  
- **Image à joindre :** IMG5  
- **Mouvement (si tu l'animes) :** La main se pose, puis se retire brusquement.

```
Extreme close-up of the hand of Samuel, a Black African man of about 38, short curly black hair, short beard, tired and alert eyes, worn dark-grey crew-neck t-shirt (exactly like the person in the reference image) reaching for the aged metal handle of an old wooden door with chipped, faded blue paint, an aged metal handle and keyhole plate, set in a cracked clay wall (exactly like the door in the reference image), fingers trembling slightly, chipped blue paint, cold blue light from below, a warm lantern glow on the side of the frame. Cinematic photorealistic night photograph, vertical portrait composition (2:3), subject in the central third with empty dark space at the bottom of the frame, Central African village at night, deep midnight blue and teal shadows, a single warm amber kerosene lantern as the only warm light source, cracked clay walls, peeling blue paint, shallow depth of field, 35mm lens, fine film grain, light volumetric mist, moody and subtle horror atmosphere, realistic. No monster, no visible ghost, no text, no watermark, no gore, no saturated colors, no modern city lights.
```

### N14 — Persienne avec une ombre derrière
- **Utilisé dans :** Ép. 1  
- **Image à joindre :** IMG3  
- **Mouvement (si tu l'animes) :** Fixe, une ombre à peine perceptible.

```
Close shot of old wooden window shutters seen from the inside of a dark room, cold blue moonlight passing between the slats, a vague human shadow standing behind the shutters outside, unclear and blurry, no face, no details. Cinematic photorealistic night photograph, vertical portrait composition (2:3), subject in the central third with empty dark space at the bottom of the frame, Central African village at night, deep midnight blue and teal shadows, a single warm amber kerosene lantern as the only warm light source, cracked clay walls, peeling blue paint, shallow depth of field, 35mm lens, fine film grain, light volumetric mist, moody and subtle horror atmosphere, realistic. No monster, no visible ghost, no text, no watermark, no gore, no saturated colors, no modern city lights.
```

### N15 — Samuel les yeux fermés
- **Utilisé dans :** Ép. 3  
- **Image à joindre :** IMG3  
- **Mouvement (si tu l'animes) :** Poussée lente, légère respiration.

```
Close-up portrait of Samuel, a Black African man of about 38, short curly black hair, short beard, tired and alert eyes, worn dark-grey crew-neck t-shirt (exactly like the person in the reference image) with eyes tightly closed, sweat on his forehead, jaw clenched, resisting the urge to answer, cold blue light on one side, warm amber lantern light on the other, dark background. Cinematic photorealistic night photograph, vertical portrait composition (2:3), subject in the central third with empty dark space at the bottom of the frame, Central African village at night, deep midnight blue and teal shadows, a single warm amber kerosene lantern as the only warm light source, cracked clay walls, peeling blue paint, shallow depth of field, 35mm lens, fine film grain, light volumetric mist, moody and subtle horror atmosphere, realistic. No monster, no visible ghost, no text, no watermark, no gore, no saturated colors, no modern city lights.
```

### N16 — Samuel adossé au mur
- **Utilisé dans :** Ép. 3, 4  
- **Image à joindre :** IMG3 + IMG5  
- **Mouvement (si tu l'animes) :** Il recule jusqu'au mur, plan fixe puis léger recul de la caméra.

```
Wide shot of the small dark interior of a clay-walled house: cracked clay walls, wooden shutters, a corrugated metal roof, a simple wooden bed, a woven basket, a small wooden table with a kerosene lantern turned very low: Samuel, a Black African man of about 38, short curly black hair, short beard, tired and alert eyes, worn dark-grey crew-neck t-shirt (exactly like the person in the reference image) backed against a cracked clay wall, sliding down slightly, staring at the an old wooden door with chipped, faded blue paint, an aged metal handle and keyhole plate, set in a cracked clay wall (exactly like the door in the reference image) across the room, a thin line of blue light under the door, a kerosene lantern low on a wooden table, deep shadows. Cinematic photorealistic night photograph, vertical portrait composition (2:3), subject in the central third with empty dark space at the bottom of the frame, Central African village at night, deep midnight blue and teal shadows, a single warm amber kerosene lantern as the only warm light source, cracked clay walls, peeling blue paint, shallow depth of field, 35mm lens, fine film grain, light volumetric mist, moody and subtle horror atmosphere, realistic. No monster, no visible ghost, no text, no watermark, no gore, no saturated colors, no modern city lights.
```

### N17a — Silhouette du frère derrière la persienne
- **Utilisé dans :** Ép. 3  
- **Image à joindre :** IMG3  
- **Mouvement (si tu l'animes) :** Fixe.

```
Wooden window shutters seen from inside a dark room, cold blue night light through the slats, behind them the blurry silhouette of an adult man of average height standing perfectly still, no face visible, no details, only a dark shape. Cinematic photorealistic night photograph, vertical portrait composition (2:3), subject in the central third with empty dark space at the bottom of the frame, Central African village at night, deep midnight blue and teal shadows, a single warm amber kerosene lantern as the only warm light source, cracked clay walls, peeling blue paint, shallow depth of field, 35mm lens, fine film grain, light volumetric mist, moody and subtle horror atmosphere, realistic. No monster, no visible ghost, no text, no watermark, no gore, no saturated colors, no modern city lights.
```

### N17b — Silhouette de l'ancien (avec bâton)
- **Utilisé dans :** Ép. 3  
- **Image à joindre :** IMG3  
- **Mouvement (si tu l'animes) :** Fixe.

```
Wooden window shutters seen from inside a dark room, cold blue night light through the slats, behind them the blurry silhouette of a very old man leaning on a walking stick, perfectly still, no face visible, no details, only a dark shape. Cinematic photorealistic night photograph, vertical portrait composition (2:3), subject in the central third with empty dark space at the bottom of the frame, Central African village at night, deep midnight blue and teal shadows, a single warm amber kerosene lantern as the only warm light source, cracked clay walls, peeling blue paint, shallow depth of field, 35mm lens, fine film grain, light volumetric mist, moody and subtle horror atmosphere, realistic. No monster, no visible ghost, no text, no watermark, no gore, no saturated colors, no modern city lights.
```

### N17c — Silhouette de l'enfant
- **Utilisé dans :** Ép. 3  
- **Image à joindre :** IMG3  
- **Mouvement (si tu l'animes) :** Fixe.

```
Wooden window shutters seen from inside a dark room, cold blue night light through the slats, behind them the blurry silhouette of a small child standing perfectly still, no face visible, no details, only a dark shape. Cinematic photorealistic night photograph, vertical portrait composition (2:3), subject in the central third with empty dark space at the bottom of the frame, Central African village at night, deep midnight blue and teal shadows, a single warm amber kerosene lantern as the only warm light source, cracked clay walls, peeling blue paint, shallow depth of field, 35mm lens, fine film grain, light volumetric mist, moody and subtle horror atmosphere, realistic. No monster, no visible ghost, no text, no watermark, no gore, no saturated colors, no modern city lights.
```

### N18 — Ombre de Samuel sur le mur
- **Utilisé dans :** Ép. 3  
- **Image à joindre :** IMG3  
- **Mouvement (si tu l'animes) :** Fixe, l'ombre bouge à peine après la voix.

```
Cracked clay wall in a dark room lit by a low kerosene lantern on the right, the big shadow of Samuel, a Black African man of about 38, short curly black hair, short beard, tired and alert eyes, worn dark-grey crew-neck t-shirt (exactly like the person in the reference image) on the wall, standing still, while the real man in the foreground has turned away; the shadow seems to be slightly turned toward the camera, subtle and unsettling, no face on the shadow. Cinematic photorealistic night photograph, vertical portrait composition (2:3), subject in the central third with empty dark space at the bottom of the frame, Central African village at night, deep midnight blue and teal shadows, a single warm amber kerosene lantern as the only warm light source, cracked clay walls, peeling blue paint, shallow depth of field, 35mm lens, fine film grain, light volumetric mist, moody and subtle horror atmosphere, realistic. No monster, no visible ghost, no text, no watermark, no gore, no saturated colors, no modern city lights.
```

### N19 — Poignée qui tourne (extrême gros plan)
- **Utilisé dans :** Ép. 4  
- **Image à joindre :** IMG5  
- **Mouvement (si tu l'animes) :** La poignée descend lentement ; seul plan avec un léger tremblement de caméra.

```
Extreme macro close-up of an aged metal door handle on a chipped faded blue wooden door, the handle slowly turned down halfway as if someone is pushing it from the other side, cold blue light below, warm lantern glow on the left edge. Cinematic photorealistic night photograph, vertical portrait composition (2:3), subject in the central third with empty dark space at the bottom of the frame, Central African village at night, deep midnight blue and teal shadows, a single warm amber kerosene lantern as the only warm light source, cracked clay walls, peeling blue paint, shallow depth of field, 35mm lens, fine film grain, light volumetric mist, moody and subtle horror atmosphere, realistic. No monster, no visible ghost, no text, no watermark, no gore, no saturated colors, no modern city lights.
```

### N20 — Coin sombre derrière Samuel
- **Utilisé dans :** Ép. 4  
- **Image à joindre :** IMG3  
- **Mouvement (si tu l'animes) :** Poussée lente vers le coin, puis panoramique rapide quand il se retourne.

```
Over-the-shoulder shot of Samuel, a Black African man of about 38, short curly black hair, short beard, tired and alert eyes, worn dark-grey crew-neck t-shirt (exactly like the person in the reference image) in a dark room, back toward the camera, in front of him a dark empty corner of the room, deep shadow, a faint sense that someone is there but nothing is visible, a lantern very low on the table, blue light under the door at the left. Cinematic photorealistic night photograph, vertical portrait composition (2:3), subject in the central third with empty dark space at the bottom of the frame, Central African village at night, deep midnight blue and teal shadows, a single warm amber kerosene lantern as the only warm light source, cracked clay walls, peeling blue paint, shallow depth of field, 35mm lens, fine film grain, light volumetric mist, moody and subtle horror atmosphere, realistic. No monster, no visible ghost, no text, no watermark, no gore, no saturated colors, no modern city lights.
```

### N21 — Village à l'aube
- **Utilisé dans :** Ép. 4  
- **Image à joindre :** IMG4  
- **Mouvement (si tu l'animes) :** Brume qui avance, lumière qui monte.

```
Wide view of an African village at dawn, thatched huts and trees in light mist, cold grey-blue sky with a faint orange line on the horizon, an empty dirt path, quiet, one small house with a blue door in the foreground. Cinematic photorealistic photograph at dawn, vertical portrait composition (2:3), subject in the central third with empty space at the bottom of the frame, cold grey-blue early morning light with a faint orange glow on the horizon, light mist, Central African village, cracked clay walls, peeling blue paint, shallow depth of field, 35mm lens, fine film grain, quiet unsettling atmosphere, realistic. No monster, no visible ghost, no text, no watermark, no gore, no saturated colors.
```

### N22 — Anciens en contre-jour sur le seuil
- **Utilisé dans :** Ép. 4, 5  
- **Image à joindre :** IMG1 + IMG5  
- **Mouvement (si tu l'animes) :** Plan fixe ; en ép. 5, ils s'éloignent.

```
Three elderly village elders standing in the open doorway of a small house at dawn, seen from inside the dark room, strongly backlit by cold grey-blue morning light so they appear as dark silhouettes in traditional simple clothes, one holding a walking stick, solemn and silent. Cinematic photorealistic photograph at dawn, vertical portrait composition (2:3), subject in the central third with empty space at the bottom of the frame, cold grey-blue early morning light with a faint orange glow on the horizon, light mist, Central African village, cracked clay walls, peeling blue paint, shallow depth of field, 35mm lens, fine film grain, quiet unsettling atmosphere, realistic. No monster, no visible ghost, no text, no watermark, no gore, no saturated colors.
```

### N23 — Le vieil homme
- **Utilisé dans :** Ép. 4  
- **Image à joindre :** IMG1  
- **Mouvement (si tu l'animes) :** Poussée lente.

```
Close-up portrait of a very old Black African man, deep wrinkles, white short beard, calm unblinking gaze, earth-toned simple clothing, standing indoors at dawn in a clay-walled house, cold grey-blue light from a door on one side, serious expression. Cinematic photorealistic photograph at dawn, vertical portrait composition (2:3), subject in the central third with empty space at the bottom of the frame, cold grey-blue early morning light with a faint orange glow on the horizon, light mist, Central African village, cracked clay walls, peeling blue paint, shallow depth of field, 35mm lens, fine film grain, quiet unsettling atmosphere, realistic. No monster, no visible ghost, no text, no watermark, no gore, no saturated colors.
```

### N24 — Smartphone sur la table
- **Utilisé dans :** Ép. 5  
- **Image à joindre :** IMG3  
- **Mouvement (si tu l'animes) :** Le téléphone vibre sur la table ; ajouter « Maman — appel entrant » au montage.

```
Close-up of a modern smartphone lying on an old wooden table in a clay-walled room in cold morning daylight, the screen lit up with a plain dark interface and NO readable text (the name will be added in editing), a faint vibration, a kerosene lantern turned off beside it. Cinematic photorealistic photograph at dawn, vertical portrait composition (2:3), subject in the central third with empty space at the bottom of the frame, cold grey-blue early morning light with a faint orange glow on the horizon, light mist, Central African village, cracked clay walls, peeling blue paint, shallow depth of field, 35mm lens, fine film grain, quiet unsettling atmosphere, realistic. No monster, no visible ghost, no text, no watermark, no gore, no saturated colors.
```

### N25 — Écran de messagerie vocale
- **Utilisé dans :** Ép. 5  
- **Image à joindre :** IMG3  
- **Mouvement (si tu l'animes) :** Fixe, le pouce hésite.

```
Close-up of a thumb hovering above a modern smartphone screen held in one hand, cold morning light, screen with a plain dark interface and NO readable text (text will be added in editing), the background out of focus, hesitation. Cinematic photorealistic photograph at dawn, vertical portrait composition (2:3), subject in the central third with empty space at the bottom of the frame, cold grey-blue early morning light with a faint orange glow on the horizon, light mist, Central African village, cracked clay walls, peeling blue paint, shallow depth of field, 35mm lens, fine film grain, quiet unsettling atmosphere, realistic. No monster, no visible ghost, no text, no watermark, no gore, no saturated colors.
```

### N26 — Téléphone au sol
- **Utilisé dans :** Ép. 5  
- **Image à joindre :** IMG3  
- **Mouvement (si tu l'animes) :** Chute et rebond, le téléphone reste allumé.

```
A modern smartphone lying on a packed dirt floor in a clay-walled house, screen still lit with a plain interface and NO readable text, cold white light spreading on the earth, a pair of bare feet stepping back at the edge of the frame. Cinematic photorealistic photograph at dawn, vertical portrait composition (2:3), subject in the central third with empty space at the bottom of the frame, cold grey-blue early morning light with a faint orange glow on the horizon, light mist, Central African village, cracked clay walls, peeling blue paint, shallow depth of field, 35mm lens, fine film grain, quiet unsettling atmosphere, realistic. No monster, no visible ghost, no text, no watermark, no gore, no saturated colors.
```

### N27 — Samuel sur le seuil
- **Utilisé dans :** Ép. 5  
- **Image à joindre :** IMG3 + IMG4  
- **Mouvement (si tu l'animes) :** Quasi fixe, souffle visible.

```
Samuel, a Black African man of about 38, short curly black hair, short beard, tired and alert eyes, worn dark-grey crew-neck t-shirt (exactly like the person in the reference image) standing on the threshold of his small house with the blue door open behind him, grey cold daylight, taking a deep breath of relief with eyes closed, mist in the background, banana trees, fragile calm before the end. Cinematic photorealistic photograph at dawn, vertical portrait composition (2:3), subject in the central third with empty space at the bottom of the frame, cold grey-blue early morning light with a faint orange glow on the horizon, light mist, Central African village, cracked clay walls, peeling blue paint, shallow depth of field, 35mm lens, fine film grain, quiet unsettling atmosphere, realistic. No monster, no visible ghost, no text, no watermark, no gore, no saturated colors.
```
