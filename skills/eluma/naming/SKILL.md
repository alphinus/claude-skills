---
name: eluma:naming
description: >
  Enforces 100% consistent naming across folder, GitHub repo, package.json, and deploy URL for every project. Audits naming on project creation, rename, or review. Generates descriptive, unique, memorable project names in kebab-case that clearly communicate what the app does. Use PROACTIVELY when creating new projects, opening existing projects, renaming, or when any naming inconsistency is detected. Triggers: "name", "rename", "benenne", "Namensgebung", "repo name", "folder name", "project name", "inkonsistent".
---

# Eluma Naming — Konsistente Namensgebung fuer Apps, Repos & Ordner

## Wann diesen Skill verwenden

Verwende diesen Skill PROAKTIV und AUTOMATISCH bei:

- Erstellung eines neuen Projekts, einer neuen App oder eines neuen Repos
- Umbenennung bestehender Projekte
- Wenn ein Ordnername, Repo-Name oder App-Name nicht uebereinstimmen
- Bei jedem `/gsd:new-project` oder aehnlichen Initialisierungen
- Wenn der User "benenne", "rename", "name", "Namensgebung" erwaehnt
- Bei Code-Reviews oder Projekt-Audits: IMMER Namenskonsistenz pruefen

## Die Goldene Regel

**Ein Projekt hat EINEN Namen. Dieser Name ist UEBERALL IDENTISCH.**

```
Ordner-Name  = repo-name = package.json name = Vercel/Deploy URL
```

Keine Ausnahmen. Keine Abweichungen. Keine CamelCase/kebab-case Mischungen.

## Naming-Standard

### Format: `kebab-case` (lowercase, Woerter mit Bindestrich)

```
RICHTIG:  meme-coin-schaltzentrale
FALSCH:   Meme-CoinSchaltzentrale
FALSCH:   MemeCoinsSchaltzentrale
FALSCH:   meme_coin_schaltzentrale
FALSCH:   memecoinschaltzentrale
```

### Der Name muss 100% aussagekraeftig sein

Der Name MUSS auf den ersten Blick klar machen:

1. **WAS** die App ist (Dashboard, Bot, API, CLI, SDK, ...)
2. **WOFUER** sie da ist (Trading, Analytics, Monitoring, ...)
3. **WELCHES DOMAIN** (Crypto, Solana, DeFi, AI, ...)

#### Bewertungsskala

| Score | Beispiel | Bewertung |
|-------|----------|-----------|
| SCHLECHT | `my-app` | Sagt nichts aus |
| SCHLECHT | `project-1` | Sagt nichts aus |
| SCHLECHT | `frontend` | Zu generisch |
| MITTEL | `trading-bot` | Welcher? Wofuer? |
| GUT | `solana-meme-coin-trading-bot` | Klar aber lang |
| PERFEKT | `meme-coin-schaltzentrale` | Praegnant + beschreibend + einzigartig |

#### Regeln fuer perfekte Namen

- **Max 4-5 Woerter** (kebab-case getrennt)
- **Keine generischen Woerter allein** (app, frontend, backend, project, test)
- **Domain-spezifisch** — jeder der den Namen liest, weiss sofort worum es geht
- **Einzigartig** — verwechslungsfrei mit anderen Projekten
- **Merkbar** — man kann den Namen im Gespraech verwenden
- **Kein Branding-Suffix** wie `-v2`, `-new`, `-final`, `-rewrite`

## Audit-Checkliste (bei jedem Projekt pruefen)

Fuehre diese Pruefung AUTOMATISCH durch wenn du ein Projekt oeffnest oder erstellst:

```bash
# 1. Ordnername pruefen
FOLDER_NAME=$(basename "$PWD")

# 2. Git Remote / Repo-Name pruefen
REPO_NAME=$(git remote get-url origin 2>/dev/null | sed 's/.*\///' | sed 's/\.git$//')

# 3. package.json Name pruefen (falls vorhanden)
PKG_NAME=$(cat package.json 2>/dev/null | grep '"name"' | head -1 | sed 's/.*": "//;s/".*//')

# 4. Vergleichen
if [ "$FOLDER_NAME" != "$REPO_NAME" ] || [ "$FOLDER_NAME" != "$PKG_NAME" ]; then
  echo "NAMING INKONSISTENZ GEFUNDEN!"
  echo "  Ordner:       $FOLDER_NAME"
  echo "  Repo:         $REPO_NAME"
  echo "  package.json: $PKG_NAME"
fi
```

### Was pruefen:

| Check | Quelle | Muss identisch sein |
|-------|--------|-------------------|
| Ordnername | `basename $PWD` | JA |
| GitHub Repo | `git remote get-url origin` | JA |
| package.json `name` | `package.json` | JA |
| Cargo.toml `name` | `Cargo.toml` | JA (Rust) |
| pyproject.toml `name` | `pyproject.toml` | JA (Python) |
| Vercel Project | Vercel Dashboard / `vercel.json` | JA |
| Docker Image Name | `Dockerfile` / `docker-compose.yml` | JA |
| App Title (UI) | Darf ein Display-Name sein | Darf abweichen (z.B. "Meme-Coin Schaltzentrale" mit Leerzeichen) |

**Einzige Ausnahme:** Der UI-Display-Name darf Leerzeichen, Grossbuchstaben und Sonderzeichen haben. Aber der technische Name (Ordner, Repo, Package) muss `kebab-case` sein.

## Korrektur-Workflow

Wenn eine Inkonsistenz gefunden wird:

### 1. Neuen Namen festlegen

```
Konsens-Name = der beste existierende Name ODER ein neuer besserer Name
Format: kebab-case, lowercase, aussagekraeftig
```

### 2. GitHub Repo umbenennen

```bash
gh repo rename <neuer-name> --yes
```

GitHub erstellt automatisch einen Redirect von der alten URL.

### 3. Lokalen Ordner umbenennen

```bash
mv /pfad/zum/alten-namen /pfad/zum/neuen-namen
```

### 4. package.json / Cargo.toml / pyproject.toml anpassen

```bash
# package.json
sed -i '' 's/"name": ".*"/"name": "neuer-name"/' package.json
```

### 5. Vercel/Deploy-Service pruefen

- Vercel: Projekt-Settings > General > Project Name
- GitHub redirected automatisch, also bleibt Vercel meist funktional

### 6. Verifizieren

```bash
echo "Ordner:  $(basename $PWD)"
echo "Repo:    $(git remote get-url origin | sed 's/.*\///' | sed 's/\.git$//')"
echo "Package: $(cat package.json 2>/dev/null | grep '"name"' | head -1 | sed 's/.*": "//;s/".*//')"
```

Alle drei MUESSEN identisch sein.

## Namensvorschlaege generieren

Wenn ein neues Projekt erstellt wird, schlage 3-5 Namen vor:

```
Kontext: [Was die App macht] + [Fuer wen] + [Welche Technologie]

Vorschlag-Format:
1. [name] — [Erklaerung warum dieser Name gut ist]
2. [name] — [Erklaerung]
3. [name] — [Erklaerung]
```

Bewerte jeden Vorschlag nach:
- Aussagekraft (1-10): Versteht man sofort was es ist?
- Einzigartigkeit (1-10): Verwechslungsfrei?
- Merkbarkeit (1-10): Kann man es im Gespraech verwenden?
- Laenge (1-10): Kurz genug fuer CLI, lang genug fuer Klarheit?

## Verbotene Muster

Diese Namens-Muster sind VERBOTEN und muessen sofort korrigiert werden:

- `Untitled` / `untitled` / `Unnamed`
- `my-app` / `my-project` / `my-site`
- `test` / `test-app` / `demo`
- `project-1` / `app-v2` / `new-app`
- CamelCase in Ordner/Repo-Namen (z.B. `MyApp` statt `my-app`)
- Underscore-Trennung (z.B. `my_app` statt `my-app`)
- Inkonsistente Gross/Kleinschreibung zwischen Ordner und Repo
- Namen die das Framework enthalten ohne Kontext (z.B. `next-app`, `react-dashboard`)
