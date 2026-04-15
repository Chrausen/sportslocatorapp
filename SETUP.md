# 🚀 SportsLocator - Anleitung zum Starten

## ⚡ Super einfach - kein API Key nötig!

Die App verwendet **OpenStreetMap** (kostenlos, keine Authentifizierung) statt Google Maps.

## Inhaltsverzeichnis
1. [Projekt vorbereiten](#schritt-1-projekt-vorbereiten)
2. [Entwicklungsserver starten](#schritt-2-entwicklungsserver-starten)
3. [Anwendung testen](#schritt-3-anwendung-testen)
4. [Troubleshooting](#troubleshooting)

---

## Schritt 1: Projekt vorbereiten

### 1.1 Terminal/Kommandozeile öffnen

**Windows:**
- Drücke `Windows-Taste + R`
- Gib `cmd` ein und drücke Enter

**Mac/Linux:**
- Öffne die Terminal-App

### 1.2 Ins Projekt-Verzeichnis navigieren

```bash
cd /home/user/sportslocatorapp
```

(oder der Pfad, wo dein Projekt liegt)

### 1.3 Abhängigkeiten installieren

Gib im Terminal ein:

```bash
yarn install
```

Oder wenn yarn nicht installiert ist:

```bash
npm install
```

Das dauert 1-2 Minuten. Warte bis es fertig ist.

---

## Schritt 2: Entwicklungsserver starten

### 2.1 Dev-Server starten

Gib im Terminal ein:

```bash
yarn dev
```

Du solltest folgende Ausgabe sehen:

```
VITE v6.4.1 building for production...

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

**Wichtig:** Lasse dieses Terminal-Fenster offen!

### 2.2 Im Browser öffnen

1. Öffne deinen Lieblings-Browser (Chrome, Firefox, Safari, Edge)
2. Gib die URL ein: **http://localhost:5173**
3. Drücke Enter

Die SportsLocator App sollte jetzt laden! 🎉

---

## Schritt 3: Anwendung testen

### 4.1 Funktionen testen

**Karte laden:**
- Die Karte sollte sich auf Kiel, Deutschland zentrieren
- Du solltest 10 Sport-Spots mit verschiedenen Pins sehen

**Standort aktivieren:**
- Der Browser fragt nach Standortzugriff
- Klicke **"Erlauben"** (optional, aber empfohlen)
- Ein blauer Punkt zeigt deine Position an

**Filter testen:**
- Oben links sind Filter-Buttons (All, Table Tennis, Basketball, Boule)
- Klicke darauf → nur Spots dieses Sports sollen sichtbar sein

**Spot auswählen:**
- Klicke auf einen Pin auf der Karte
- Ein Panel öffnet sich unten (oder rechts auf Desktop)
- Es zeigt Details wie Name, Sport, Entfernung

**Neuen Spot hinzufügen:**
- Klicke den grünen **"➕"** Button unten rechts
- Die Karte zeigt jetzt ein Fadenkreuz
- Klicke auf die Karte wo du einen neuen Spot hinzufügen möchtest
- Fülle das Formular aus (Name, Sport-Typ, optional Beschreibung)
- Klicke **"Create Spot"**

**Navigation:**
- Wähle einen Spot aus (klicke auf einen Pin)
- Klicke **"🗺️ Navigate"** im Panel
- Google Maps öffnet sich mit einer Route zu dem Spot

**Belegung markieren:**
- Wähle einen Spot aus
- Klicke **"Mark as Blocked"** um zu zeigen dass der Spot besetzt ist
- Der Pin wird grau
- Klicke **"Mark as Free"** um ihn wieder freizugeben

---

## Schritt 5: Code ändern & Hot-Reload

Die Anwendung nutzt **Hot Module Replacement (HMR)**:

1. Öffne eine Datei (z.B. `src/App.jsx`)
2. Ändere etwas (z.B. die Überschrift)
3. **Speichere die Datei** (`Ctrl+S`)
4. Schau in den Browser → die Änderung wird sofort sichtbar! ⚡

Du musst den Browser nicht neu laden!

---

## Zusätzliche Befehle

### Production Build erstellen

```bash
yarn build
```

Erzeugt optimierte Dateien im `dist/` Verzeichnis.

### Production lokal testen

```bash
yarn preview
```

Startet einen lokalen Server für den Production Build.

### Code formatieren

```bash
yarn format
```

Formatiert deinen Code automatisch nach Prettier-Standards.

### Linting (Code-Qualität prüfen)

```bash
yarn lint
```

Prüft auf Code-Fehler und Warnungen.

---

## Troubleshooting

### Problem: "VITE_GOOGLE_MAPS_API_KEY is not configured"

**Lösung:**
- Überprüfe dass die `.env.local` Datei im Projekt-Root liegt
- Überprüfe dass der API-Schlüssel korrekt eingetragen ist
- Speichere die Datei und starte den Dev-Server neu (`Ctrl+C` und `yarn dev`)

### Problem: "Geolocation is not supported"

**Lösung:**
- Nutze einen modernen Browser (Chrome, Firefox, Safari, Edge)
- Überprüfe dass Standortzugriff erlaubt ist
- Die App funktioniert auch ohne Standort (zentriert auf Kiel)

### Problem: "yarn: command not found"

**Lösung 1 - npm verwenden:**
```bash
npm install
npm run dev
```

**Lösung 2 - yarn installieren:**
- Gehe zu https://yarnpkg.com/getting-started/install
- Folge den Anweisungen für dein Betriebssystem

### Problem: "Port 5173 is already in use"

**Lösung:**
- Schließe andere Prozesse die Port 5173 nutzen
- Oder nutze einen anderen Port: `yarn dev -- --port 3000`

### Problem: "API Key ist ungültig oder abgelaufen"

**Lösung:**
- Überprüfe dass Maps JavaScript API aktiviert ist
- Erstelle einen neuen API-Schlüssel
- Aktualisiere die `.env.local` Datei

---

## Fertig! 🎉

Du kannst jetzt die SportsLocator-App lokal nutzen und entwickeln!

**Nächste Schritte:**
- Erkunde die App und teste alle Features
- Öffne `src/App.jsx` um die Struktur zu verstehen
- Schau in `src/components/` für die einzelnen Komponenten
- Modifiziere Styles in den `.module.css` Dateien

**Bei Fragen oder Problemen:**
- Überprüfe die logs im Terminal
- Öffne die Browser Developer Tools (`F12`)
- Schau auf die Console für Fehler

Viel Spaß! 🚀⚽
