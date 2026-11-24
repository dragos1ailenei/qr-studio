# QR Studio – Aplicație pentru generare coduri QR

Aplicație web responsivă pentru generarea, personalizarea și descărcarea codurilor QR în format PNG, realizată în cadrul proiectului semestrial de **Programare și Dezvoltare Web** (Tema 31).

## Funcționalități

- **Generare coduri QR pentru text / link-uri** și pentru **rețele Wi-Fi** (format standard `WIFI:T:...;S:...;P:...;;`).
- **Personalizare vizuală:** alegerea dimensiunii (`200px`, `260px`, `340px`), a culorii codului și a fundalului.
- **Descărcare instantă PNG:** export direct din elementul HTML5 `<canvas>`.
- **Istoric local (`localStorage`):** păstrează ultimele 6 coduri generate pentru reîncărcare rapidă.
- **Mod Dark / Light & Design responsiv:** interfață adaptată pentru desktop, tabletă și mobil.
- **Suport PWA:** include fișierul `manifest.json`.

## Tehnologii utilizate

- **HTML5** – structură semantică și element `<canvas>`
- **CSS3** – variabile CSS, Grid/Flexbox, media queries pentru design responsiv
- **JavaScript (ES6)** – validare formular, manipulare DOM, `localStorage`, export PNG
- **QRious (CDN)** – librărie ușoară pentru generarea codurilor QR

## Structura proiectului

```text
qr-generator/
├── index.html
├── style.css
├── script.js
├── manifest.json
└── README.md
```

## Instrucțiuni de rulare

1. Descarcă sau clonează proiectul local.
2. Deschide direct fișierul `index.html` în orice browser modern (sau folosește extensia *Live Server* din VS Code).

## Capturi de ecran & Demo

- **Demo live:** `https://dragos1ailenei.github.io/qr-studio/` *(completează după publicarea pe GitHub Pages)*
- Adaugă capturile de ecran ale aplicației (desktop + mobil) într-un folder `screenshots/` și inserează-le aici.
