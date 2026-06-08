# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Site vitrine pour un·e tatoueur·euse fine-line botanique. Esthétique éditoriale : espace blanc, typographie serif glamour, motion subtil.

## Commandes

```bash
npm run dev       # dev server (Vite)
npm run build     # tsc + vite build
npm run preview   # prévisualiser le build
npm run lint      # ESLint
```

## Stack

- **Vite + React 19 + TypeScript**
- **Tailwind CSS v4** (config via `@theme` dans `index.css`, pas de `tailwind.config.js`)
- **React Router v7** (`HashRouter` — URLs avec `#`, pas de config serveur nécessaire)
- **Framer Motion v12** (`motion/react`)
- **yet-another-react-lightbox v3** pour les galeries
- **Decap CMS v3** (chargé via CDN, pas de package npm — admin sur `/admin`)

## Design system

Tokens définis dans [src/index.css](src/index.css) via `@theme` :

| Token | Valeur | Usage |
|---|---|---|
| `--color-ink` | `#0D0D0D` | Texte principal, overlay héros vidéo **uniquement** |
| `--color-cream` | `#F7F3EE` | Fond principal — header, footer, corps du site |
| `--color-rouge` | `#C4607E` | CTA, accents forts |
| `--color-rose` | `#E8B4C4` | Bouton "Book now", hovers, accents doux |
| `--color-night` | `#2563A8` | Accent secondaire (badges, détails) |
| `--font-display` | Absans (self-hosted) | Tout ce qui n'est pas du texte courant — titres, nav, labels, boutons |

**Règle de thème** : le site est clair partout (fond `cream`). Le noir (`ink`) est réservé au texte et à l'overlay du héros vidéo — jamais en fond de section, header ou footer.

**Règles typographiques** :
- `font-display` (Absans) : police par défaut du `body`. Tout sauf les paragraphes de texte courant.
- Inter n'est pas utilisé — il n'y a pas de `--font-body` dans le thème.
- **Jamais de `uppercase` (text-transform)**. **Pas de `tracking-*` (letter-spacing)** : aucune classe Tailwind `tracking-*` dans le projet.

En Tailwind v4, utiliser les classes utilitaires correspondantes : `bg-ink`, `text-cream`, `font-display`, etc.

## Architecture

```
tattoo-site/
├── public/
│   ├── admin/
│   │   ├── index.html        # page Decap CMS (CDN)
│   │   └── config.yml        # collections flash / tattoos / art
│   ├── content/
│   │   ├── flash/            # un fichier JSON par flash (écrit par Decap)
│   │   ├── tattoos/          # tattoos réalisés
│   │   └── art/              # œuvres art / sculpture
│   └── uploads/              # images uploadées via l'admin
└── src/
    ├── App.tsx               # Router — routes: / /tattoo /art /book /about
    ├── index.css             # tokens @theme + @font-face Absans
    ├── assets/fonts/         # Absans-Regular.woff2 (self-hosted)
    ├── lib/
    │   └── cms.ts            # types + import.meta.glob pour lire les JSON du CMS
    ├── layouts/
    │   └── RootLayout.tsx    # Navbar + AnimatePresence + Footer + BookNowButton
    ├── pages/
    │   ├── Landing.tsx       # VideoHero + SplitGateway
    │   ├── Tattoo.tsx        # intro + 3 WayCard (Flash/Projet/Freehand)
    │   ├── Art.tsx           # grille portfolio + Lightbox
    │   ├── Book.tsx          # RequestForm
    │   └── About.tsx         # studio, FAQ, localisation
    └── components/
        ├── Navbar.tsx        # transparente → solide au scroll
        ├── VideoHero.tsx     # vidéo plein écran, autoplay muted loop
        ├── SplitGateway.tsx  # deux panneaux TATTOO | ART
        ├── WayCard.tsx       # Flash / Projet / Freehand
        ├── FlashGallery.tsx  # grille flashs avec statut dispo/pris
        ├── BookNowButton.tsx # bouton sticky présent sur toutes les pages
        ├── PageTransition.tsx# wrapper Framer Motion
        ├── RequestForm.tsx   # formulaire mocké (console + toast)
        ├── ReviewsSection.tsx# 4 avis clients statiques, rendu dans RootLayout
        └── Footer.tsx        # Instagram, email, adresse, Impressum
```

## CMS (Decap CMS)

Le contenu est géré via Decap CMS, accessible sur `/admin`. Decap écrit des fichiers JSON dans `public/content/` et pousse un commit sur `main` → Netlify rebuild automatiquement.

**Lire le contenu dans React** — toujours via `src/lib/cms.ts` (pas d'alias `@/` — utiliser les chemins relatifs) :

```ts
import { flashItems, tattooItems, artItems } from '../lib/cms';
```

Les types réels (source de vérité : `src/lib/cms.ts`) :

```ts
type Flash = {
  title: string;
  image: string;          // chemin /uploads/...
  available: 'available' | 'taken';
  size?: string;
  notes?: string;
  date: string;
};

type Tattoo = {
  title: string;
  image: string;
  style: 'flash' | 'project' | 'freehand';
  date: string;
  notes?: string;
};

type ArtPiece = {
  title: string;
  image: string;
  video?: string;
  type: 'sculpture' | 'painting' | 'drawing' | 'other';
  details?: string;
  date: string;
  for_sale: boolean;
  price?: string;
};
```

**Configuration CMS** — `public/admin/config.yml` configuré avec le repo `jan917-byte/tattoo-site`. L'OAuth GitHub est géré par Netlify (`base_url: https://api.netlify.com`).

**Accès admin** — pour donner accès à quelqu'un : l'ajouter comme collaborateur sur GitHub (repo → Settings → Collaborators). Il pourra ensuite se connecter sur `/admin` avec son compte GitHub.

## Déploiement

### Actuel — Netlify

- Site déployé sur Netlify : `https://mrkloudy.netlify.app`
- Repo GitHub : `jan917-byte/tattoo-site`, branche `main`
- `netlify.toml` à la racine de `tattoo-site/`. Build command `npm run build`, publish dir `dist`.
- `vite.config.ts` : `base: '/'` — **ne jamais changer cette valeur**. Mettre `/tattoo-site/` ou tout autre sous-chemin casse le dev server (404 sur `main.tsx` au démarrage) et tous les assets en prod (images, police, JS). La valeur correcte est toujours `'/'`.
- Police Absans : chemin relatif `./assets/fonts/Absans-Regular.woff2` dans `index.css` — Vite la bundle avec hash. Ne pas utiliser de chemin absolu `/src/assets/...`.
- OAuth GitHub configuré dans Netlify (Site configuration → Access & security → OAuth → GitHub).
- Images dans `public/uploads/` — si le repo grossit (photos HD), envisager Git LFS ou Cloudinary.

## Conventions

- **Motion** : toujours subtil. Fade-in au scroll, parallaxe léger sur le héros, hover scale doux. Jamais clinquant.
- **Navbar** : toujours fond `cream`, légèrement opaque au sommet, pleine au scroll. Jamais de fond sombre.
- **BookNowButton** : sticky, toujours visible sur toutes les pages.
- **Formulaire** : envoi mocké (console + toast) en attendant le backend.
- **Impressum** dans le footer (obligatoire si studio en Allemagne).
- **Pas de em dash (—)** : interdit dans tout le site, textes visibles comme commentaires. Remplacements : point ou nouvelle phrase pour les ruptures syntaxiques, virgule pour les listes, deux-points pour les explications, `|` dans les titres de page (`<title>`).

## Points ouverts (à confirmer)

- Langue du site : EN seul ? EN + DE ? multilingue ?
- Comportement « Book now » : formulaire interne vs lien Instagram/email
- Backend formulaire + hébergement RGPD (Formspree vs PocketBase sur Hetzner)
- Assets réels : vidéo héros (boucle paysage + mobile), logo SVG, photos flashs, portfolio

## Brief complet

Voir [../brief-site-tattoo.md](../brief-site-tattoo.md) et [../brief-decap-cms.md](../brief-decap-cms.md).
