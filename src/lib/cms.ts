export type Flash = {
  title: string;
  image: string;
  available: 'available' | 'booked' | 'taken';
  show_on_homepage?: boolean;
  size?: string;
  notes?: string;
  date: string;
};

export type Tattoo = {
  title: string;
  image: string;
  style: 'flash' | 'project' | 'freehand';
  show_on_homepage?: boolean;
  date: string;
  notes?: string;
};

export type ArtPiece = {
  title: string;
  image: string;
  video?: string;
  type: 'sculpture' | 'painting' | 'drawing' | 'print' | 'other';
  details?: string;
  date: string;
  for_sale: boolean;
  price?: string;
};

function resolveImage(path: string): string {
  if (!path) return path;
  const rel = path.startsWith('/') ? path.slice(1) : path;
  return import.meta.env.BASE_URL + rel;
}

const flashModules = import.meta.glob('/public/content/flash/*.json', { eager: true });
const tattooModules = import.meta.glob('/public/content/tattoos/*.json', { eager: true });
const artModules = import.meta.glob('/public/content/art/*.json', { eager: true });

export const flashItems: Flash[] =
  Object.values(flashModules).map((m: any) => {
    const item = m.default ?? m;
    return { ...item, image: resolveImage(item.image) };
  });

export const tattooItems: Tattoo[] =
  Object.values(tattooModules).map((m: any) => {
    const item = m.default ?? m;
    return { ...item, image: resolveImage(item.image) };
  });

export const artItems: ArtPiece[] =
  Object.values(artModules).map((m: any) => {
    const item = m.default ?? m;
    return { ...item, image: resolveImage(item.image), video: item.video ? resolveImage(item.video) : undefined };
  });

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

const aboutModules = import.meta.glob('/public/content/about.json', { eager: true });

export const aboutContent: AboutContent = (() => {
  const mod: any = Object.values(aboutModules)[0];
  const raw = mod ? (mod.default ?? mod) : {};
  return {
    ...aboutDefaults,
    ...raw,
    photo: raw.photo ? resolveImage(raw.photo) : '',
    hygiene_points: raw.hygiene_points ?? [],
    faq: raw.faq ?? [],
  };
})();
