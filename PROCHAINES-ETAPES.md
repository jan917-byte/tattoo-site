# Prochaines étapes avant la mise en ligne

Liste de ce qu'il reste à faire avant de donner le lien publiquement. Le code
est prêt et déployé. Ce qui reste est surtout du **contenu** et de la
**configuration**, pas de la programmation.

Ordre conseillé : les bloquants d'abord (🔴), puis le contenu (🟠), puis les
améliorations (🟡).

---

## 🔴 Bloquants (le site ne fonctionne pas vraiment sans ça)

### 1. Brancher le formulaire de réservation
Sans ça, les demandes des clients sont perdues silencieusement.

1. Créer un compte gratuit sur https://formspree.io
2. Créer un nouveau formulaire, copier l'URL fournie (ex. `https://formspree.io/f/abcdwxyz`)
3. Ouvrir `src/components/RequestForm.tsx`
4. Remplacer la ligne :
   ```ts
   const FORM_ENDPOINT = 'CHANGE_ME';
   ```
   par votre URL :
   ```ts
   const FORM_ENDPOINT = 'https://formspree.io/f/abcdwxyz';
   ```
5. Tester : remplir le formulaire sur le site, vérifier la réception de l'e-mail.

> Alternative gratuite équivalente : https://web3forms.com (même principe, coller la clé/URL).

### 2. Remplir l'Impressum (obligatoire en Allemagne)
Un Impressum incomplet est passible d'un avertissement juridique (*Abmahnung*).

- Fichier : `src/pages/Impressum.tsx`
- Remplacer tous les `[crochets]` par les vraies infos : nom complet, téléphone,
  e-mail, et le numéro de TVA (USt-IdNr.) **ou** la mention petite entreprise si
  applicable (le texte de remplacement est déjà fourni en commentaire dans le fichier).

### 3. Vrai e-mail de contact
- Fichier : `src/components/Footer.tsx`
- Remplacer `studio@example.com` par la vraie adresse (2 endroits : le lien `mailto`).

---

## 🟠 Contenu (le site a l'air inachevé sinon)

### 4. Page "About"
Fichier : `src/pages/About.tsx`
- [ ] Bio de l'artiste (remplacer le texte entre `[crochets]`)
- [ ] Photo de l'artiste (remplacer le bloc `[ Artist photo ]`)
- [ ] Réponses aux 3 questions de la FAQ (healing, rates, couleur)
- [ ] Certifications/hygiène du studio si disponibles

### 5. Image du bloc "Art & Sculpture" sur la page d'accueil
- Fichier : `src/pages/Landing.tsx`
- Le bloc affiche actuellement `[ Image placeholder ]` sur fond bleu.
  Remplacer par une vraie photo d'œuvre.

### 6. Activer la vente de prints (optionnel)
- Fichier : `src/lib/shop.ts`
- Remplacer `PAYPALME = 'CHANGE_ME'` par le vrai pseudo PayPal.me
  (sans l'URL : juste `MON-PSEUDO`).
- Tant que ce n'est pas fait, les boutons "Acheter" restent désactivés.

---

## 🟡 Améliorations (qualité / SEO / marketing)

### Technique
- [ ] **Cohérence de langue** : la page Art est en français ("Originaux",
      "Acheter"), le reste en anglais. Choisir une langue et uniformiser.
- [ ] **Balises SEO / partage** (Open Graph) : ajouter dans `index.html` un titre,
      une description et une image pour que le lien soit beau quand il est partagé
      sur Instagram / WhatsApp.
- [ ] **`loading="lazy"`** sur les images de galerie pour accélérer le chargement.

### Marketing tatoueur
- [ ] **Acompte / arrhes en ligne** : réduit fortement les no-shows. Le PayPal
      déjà à moitié intégré peut servir de base.
- [ ] **Flash drops** : annoncer les lâchers de flashs (Insta + site) en jouant
      sur la rareté ("3 flashs vendredi"). Le statut available/booked/taken est
      déjà géré dans le code.
- [ ] **Avis clients** : ajouter prénom + ville/date sous chaque témoignage et un
      lien Google Reviews (crédibilité + SEO local "tatoueur Berlin").
- [ ] **Google Business Profile** : essentiel pour la recherche locale.
- [ ] **Page aftercare** (soins post-tatouage) téléchargeable : pro et utile.

---

## Comment publier une modification

Le site se redéploie tout seul à chaque push sur la branche `main` (Netlify).

```bash
npm run dev      # voir les changements en local sur http://localhost:5173
npm run build    # vérifier que tout compile avant de publier
git add -A
git commit -m "description de la modif"
git push         # déclenche le redéploiement Netlify automatique
```

Le contenu (flashs, tattoos, art) se gère aussi sans toucher au code via
l'interface d'admin sur `/admin`.
