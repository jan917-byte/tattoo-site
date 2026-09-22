export type Flash = {
  title: string;
  order?: number;
  image: string;
  available: 'available' | 'booked' | 'taken';
  show_on_homepage?: boolean;
  size?: string;
  notes?: string;
  date: string;
};

export type Tattoo = {
  title: string;
  order?: number;
  image: string;
  style: 'flash' | 'project' | 'freehand';
  show_on_homepage?: boolean;
  date: string;
  notes?: string;
};

export type ArtPiece = {
  title: string;
  order?: number;
  image: string;
  video?: string;
  type: 'sculpture' | 'painting' | 'drawing' | 'print' | 'other';
  details?: string;
  date: string;
  for_sale: boolean;
  price?: string;
};

// Ordre d'affichage : le champ "order" saisi dans Decap passe devant.
// Sans order, on retombe sur la date (plus récent en premier).
function byOrder<T extends { order?: number; date?: string }>(items: T[]): T[] {
  return items.sort((a, b) => {
    const ao = typeof a.order === 'number' ? a.order : Number.POSITIVE_INFINITY;
    const bo = typeof b.order === 'number' ? b.order : Number.POSITIVE_INFINITY;
    if (ao !== bo) return ao - bo;
    return (b.date ?? '').localeCompare(a.date ?? '');
  });
}

function resolveImage(path: string): string {
  if (!path) return path;
  const rel = path.startsWith('/') ? path.slice(1) : path;
  return import.meta.env.BASE_URL + rel;
}

// `import: 'default'` renvoie directement le contenu JSON de chaque fichier.
const flashModules = import.meta.glob<Flash>('/public/content/flash/*.json', { eager: true, import: 'default' });
const tattooModules = import.meta.glob<Tattoo>('/public/content/tattoos/*.json', { eager: true, import: 'default' });
const artModules = import.meta.glob<ArtPiece>('/public/content/art/*.json', { eager: true, import: 'default' });

export const flashItems: Flash[] = byOrder(
  Object.values(flashModules).map((item) => ({ ...item, image: resolveImage(item.image) })),
);

export const tattooItems: Tattoo[] = byOrder(
  Object.values(tattooModules).map((item) => ({ ...item, image: resolveImage(item.image) })),
);

export const artItems: ArtPiece[] = byOrder(
  Object.values(artModules).map((item) => ({
    ...item,
    image: resolveImage(item.image),
    video: item.video ? resolveImage(item.video) : undefined,
  })),
);

export type FaqEntry = { question: string; answer: string };

export type AboutContent = {
  page_title: string;
  photo?: string;
  artist_title: string;
  bio: string;
  hygiene_title: string;
  hygiene_points: string[];
  studio_title: string;
  studio_name: string;
  studio_address: string;
  faq_title: string;
  faq: FaqEntry[];
};

const aboutDefaults: AboutContent = {
  page_title: 'About',
  photo: '',
  artist_title: 'The artist',
  bio: '',
  hygiene_title: 'Hygiene & safety',
  hygiene_points: [],
  studio_title: 'Studio',
  studio_name: '',
  studio_address: '',
  faq_title: 'FAQ',
  faq: [],
};

const aboutModules = import.meta.glob<Partial<AboutContent>>('/public/content/about.json', {
  eager: true,
  import: 'default',
});

export const aboutContent: AboutContent = (() => {
  const raw: Partial<AboutContent> = Object.values(aboutModules)[0] ?? {};
  return {
    ...aboutDefaults,
    ...raw,
    photo: raw.photo ? resolveImage(raw.photo) : '',
    hygiene_points: raw.hygiene_points ?? [],
    faq: raw.faq ?? [],
  };
})();
