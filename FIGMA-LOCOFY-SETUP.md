# Figma Pro + Locofy — Konfiguracja pixel-perfect workflow

## Status instalacji

- [x] Figma Desktop zainstalowana (`/Applications/Figma.app`)
- [x] Konto Figma Pro aktywne (ArkadiusSixer / arkadiussixer@gmail.com)
- [x] Plugin Locofy Lightning zainstalowany i połączony
- [x] Konto Locofy połączone (Google)
- [x] Projekt "TeoHome" utworzony w Locofy (Next.js + Tailwind + TypeScript + App Router)
- [x] Test konwersji STRONA_GŁÓWNA — Locofy poprawnie rozpoznaje design

## Wyniki testu eksportu (2026-02-23)

**Plik Figma:** TeoHome (Copy) w Drafts
**Frame:** STRONA_GŁÓWNA (1920x8384px)
**Konfiguracja:** Next.js + Tailwind CSS + TypeScript + App Router

### Co Locofy wykrył:
- Pełną strukturę strony głównej (nawigacja, hero, produkty, blog, opinie, newsletter, footer)
- Wszystkie teksty po polsku (nazwy produktów, CTA, opisy)
- Color Styles: KOLOR MARKI 1, 2, 3
- Text Styles: 12-64px Light/Bold

### Koszt konwersji:
| Zakres | Koszt Pay-As-You-Go | Ze Starter | Z Pro |
|--------|---------------------|------------|-------|
| STRONA_GŁÓWNA (1 frame) | **$151.20** | $102.06 | $75.60 |

### Rekomendacja:
- Konwersja pełnej strony jest kosztowna — lepiej konwertować **pojedyncze sekcje/komponenty**
- Alternatywnie: plan **Starter ($399/rok)** opłaca się przy 4+ konwersjach
- Dla pixel-perfect workflow: użyj Locofy do wygenerowania Tailwind CSS, potem porównaj z kodem TeoHome

---

## Krok 1: Konto Figma Pro

1. Otwórz Figma: `open /Applications/Figma.app`
2. Zaloguj się lub utwórz konto na **figma.com**
3. Przejdź na plan **Professional** ($12/mies. rocznie lub $15/mies. miesięcznie)
   - Daje: unlimited pliki, version history, team libraries, shared fonts, pluginy
   - Strona: https://www.figma.com/pricing/

## Krok 2: Zainstaluj plugin Locofy Lightning

1. W Figma otwórz dowolny plik projektowy
2. Kliknij ikonę **Resources** (ikona puzzla) w górnym toolbarze
3. Przejdź do zakładki **Plugins**
4. Wyszukaj **"Locofy Lightning"**
5. Kliknij **Run** lub **Save** (aby dodać do ulubionych)
6. Przy pierwszym uruchomieniu kliknij **Connect Account** — przeniesie Cię do przeglądarki
7. Utwórz konto na **locofy.ai** (darmowe 600 tokenów LDM na start)

### Locofy — plany cenowe:
| Plan | Cena | Tokeny |
|------|-------|--------|
| Free | 0 zł | 600 LDM tokenów |
| Pay-As-You-Go | ~$0.40/token | Na żądanie |
| Starter | $399/rok | ~$0.27/token |
| Pro | $1,199/rok | ~$0.20/token |

## Krok 3: Przygotowanie projektu w Figma (WAŻNE dla pixel-perfect)

Przed eksportem z Locofy, upewnij się że design spełnia te wymagania:

### Nazwy warstw
- Używaj opisowych nazw: `header-logo`, `hero-cta-button`, `product-card`
- NIE zostawiaj domyślnych: `Rectangle 1`, `Frame 42`
- Format: `component-name/element-name` (np. `button/primary`)

### Auto Layout
- Aplikuj Auto Layout na KAŻDY komponent przed konwersją
- Zapewnia responsywność w eksportowanym kodzie
- W Figma: zaznacz element → Shift+A

### Design System
- Zdefiniuj kolory jako Color Styles
- Zdefiniuj typografię jako Text Styles
- Używaj komponentów (Components) konsekwentnie

## Krok 4: Eksport do Next.js z Locofy

### Uruchom plugin
1. Otwórz projekt w Figma
2. Resources → Plugins → Locofy Lightning → Run

### Krok 4a: Design Optimiser
- Locofy automatycznie naprawia strukturę designu
- Sprawdza i stosuje Auto Layout
- Naprawia zagnieżdżenia warstw

### Krok 4b: Tagging
- Oznacz interaktywne elementy (przyciski, linki, formularze)
- Dodaj nawigację między stronami
- Oznacz powtarzalne komponenty

### Krok 4c: Styling & Responsywność
- Ustaw breakpointy (mobile/tablet/desktop)
- Skonfiguruj CSS: **Tailwind CSS** (zalecane dla TeoHome)
- Włącz **TypeScript**

### Krok 4d: Eksport
- Framework: **Next.js**
- CSS: **Tailwind CSS**
- Language: **TypeScript**
- Sync to Locofy Builder lub Download ZIP

## Krok 5: Integracja z projektem TeoHome

Po eksporcie kodu z Locofy:

```bash
# 1. Rozpakuj ZIP z Locofy
unzip locofy-export.zip -d /tmp/locofy-export

# 2. Porównaj komponenty z istniejącymi
diff /tmp/locofy-export/src/components/ ~/Projects/teohome/src/components/

# 3. Skopiuj potrzebne style/komponenty
# (NIE nadpisuj całego projektu — Locofy generuje czysty frontend,
#  a TeoHome ma WooCommerce integrację, CartContext, API routes)
```

### Workflow pixel-perfect:

```
Figma Design → Locofy Plugin → Export Next.js/Tailwind
     ↓                              ↓
  Sprawdź preview          Porównaj CSS z istniejącym kodem
     ↓                              ↓
  Popraw w Figma           Zastosuj różnice w TeoHome
```

## Alternatywny plugin: UIPro by Locofy

Nowsza wersja pluginu — dedykowana dla pro developerów:
1. W Figma: Resources → Plugins → szukaj **"UIPro by Locofy.ai"**
2. Generuje czystszy kod komponentowy
3. Lepsze wsparcie dla design tokens

---

## Szybki start

```bash
# Otwórz Figma
open /Applications/Figma.app

# Po zalogowaniu i otwarciu projektu:
# 1. Shift+I → szukaj "Locofy" → Run
# 2. Connect Account → zaloguj się na locofy.ai
# 3. Wybierz stronę do konwersji
# 4. Design Optimiser → Tagging → Styling → Export
# 5. Pobierz kod i porównaj z projektem
```
