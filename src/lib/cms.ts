export type Flash = {
  title: string;
  image: string;
  available: 'available' | 'taken';
  size?: string;
  notes?: string;
  date: string;
};

export type Tattoo = {
  title: string;
  image: string;
  style: 'flash' | 'project' | 'freehand';
  date: string;
  notes?: string;
};

export type ArtPiece = {
  title: string;
  image: string;
  video?: string;
  type: 'sculpture' | 'painting' | 'drawing' | 'other';
  details?: string;
  date: string;
  for_sale: boolean;
  price?: string;
};

const flashModules = import.meta.glob('/public/content/flash/*.json', { eager: true });
const tattooModules = import.meta.glob('/public/content/tattoos/*.json', { eager: true });
const artModules = import.meta.glob('/public/content/art/*.json', { eager: true });

export const flashItems: Flash[] =
  Object.values(flashModules).map((m: any) => m.default ?? m);

export const tattooItems: Tattoo[] =
  Object.values(tattooModules).map((m: any) => m.default ?? m);

export const artItems: ArtPiece[] =
  Object.values(artModules).map((m: any) => m.default ?? m);
