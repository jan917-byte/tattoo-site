# Prochaines étapes avant la mise en ligne

Liste de ce qu'il reste à faire avant de donner le lien publiquement. Le code
est prêt et déployé. Ce qui reste est surtout du **contenu** et de la
**configuration**, pas de la programmation.

Ordre conseillé : les bloquants d'abord (🔴), puis le contenu (🟠), puis les
améliorations (🟡).

---

## 🔴 Bloquants (le site ne fonctionne pas vraiment sans ça)

### 1. Activer l'e-mail de notification du formulaire
Le formulaire est branché sur **Netlify Forms** (code fait, rien à modifier).
Il reste une seule chose à faire, dans l'interface Netlify, pour que les demandes
arrivent dans la boîte mail de l'artiste. Sans ça les demandes sont bien
enregistrées, mais il faut aller les lire manuellement dans Netlify.

1. Déployer la version actuelle (push sur `main`), sinon le formulaire
   n'apparaît pas encore dans Netlify.
2. Netlify → le site `mrkloudy` → onglet **Forms** → le formulaire `tattoo-request`
   (il apparaît après le premier build qui contient `public/__forms.html`).
3. **Settings and usage** → **Form notifications** → **Add notification** →
   **Email notification**.
4. Champ *Email to notify* : l'adresse de l'artiste. *Form* : `tattoo-request`.
   Enregistrer.
5. Tester : remplir le formulaire sur le site en ligne, vérifier la réception.
   L'objet du mail est « New tattoo request from <prénom> ».

Bon à savoir :
- Plan gratuit Netlify : **100 demandes par mois**, fichier joint **8 Mo max**.
- Les demandes restent aussi consultables dans Netlify → Forms, même sans e-mail.
- Un champ piège anti-spam (`bot-field`) est déjà en place.
- En local (`npm run dev`), l'envoi échoue : c'est normal, Netlify Forms
  n'existe qu'en production. Tester sur l'URL Netlify.

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
- [x] **Cohérence de langue** : page Art (et boutique prints) passée en anglais,
      tout le site est maintenant en anglais.
- [x] **Balises SEO / partage** (Open Graph) : titre, description et image ajoutés
      dans `index.html` (OG + Twitter Card).
- [x] **`loading="lazy"`** ajouté sur toutes les images de galerie (Art, prints,
      flash, portfolio, recent work).

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
