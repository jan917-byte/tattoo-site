// ── Contact et achats ────────────────────────────────────────────────────────
//
// Adresse e-mail du studio : utilisée dans le footer et pour toutes les
// demandes d'achat (originaux et prints). Pas de paiement en ligne :
// le bouton ouvre un e-mail pré-rempli, le paiement se règle ensuite par mail.
export const CONTACT_EMAIL = 'tonossi.theo@gmail.com';

// Grille de prix des prints (mix & match) : le prix dépend du NOMBRE TOTAL de
// prints dans le panier, peu importe lesquels.
//   1 print = 15€, 2 = 25€, 3 = 35€, 4 = 40€, 5 = 45€, 6 = 50€.
// Au-delà de 6, chaque print supplémentaire ajoute 5€.
const PRINT_TIERS: Record<number, number> = {
  1: 15,
  2: 25,
  3: 35,
  4: 40,
  5: 45,
  6: 50,
};

export function printBundlePrice(count: number): number {
  if (count <= 0) return 0;
  if (count <= 6) return PRINT_TIERS[count];
  return PRINT_TIERS[6] + (count - 6) * 5;
}

// Liste lisible des paliers, pour affichage.
export const printTiers = Object.entries(PRINT_TIERS).map(([n, price]) => ({
  count: Number(n),
  price,
}));

// Construit un lien mailto: vers le studio avec un objet et un texte pré-remplis.
export function mailtoLink(subject: string, body: string): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
