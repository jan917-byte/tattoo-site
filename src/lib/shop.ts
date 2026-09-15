// ── Configuration boutique (PayPal.me) ───────────────────────────────────────
//
// Pseudo PayPal.me du studio. Le remplacer par le vrai pseudo, sans l'URL :
//   paypal.me/MON-PSEUDO  ->  PAYPALME = 'MON-PSEUDO'
export const PAYPALME = 'CHANGE_ME';

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

// Construit un lien de paiement PayPal.me pour un montant en euros.
export function paypalLink(amountEuros: number): string {
  return `https://www.paypal.com/paypalme/${PAYPALME}/${amountEuros}EUR`;
}

export const isPaypalConfigured = PAYPALME !== 'CHANGE_ME';
