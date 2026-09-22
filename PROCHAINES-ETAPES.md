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
- Plan gratuit Netlify : **100 demandes par mois**, requête **8 Mo max** au total
  (le site limite l'image jointe à 7 Mo pour garder une marge).
- Les demandes restent aussi consultables dans Netlify → Forms, même sans e-mail.
- Un champ piège anti-spam (`bot-field`) est déjà en place.
- En local (`npm run dev`), l'envoi échoue : c'est normal, Netlify Forms
  n'existe qu'en production. Tester sur l'URL Netlify.

### 2. ~~Remplir l'Impressum~~ ✅ fait (septembre 2026)
Nom, téléphone et e-mail renseignés dans `src/pages/Impressum.tsx`. Pas de
numéro de TVA : la section Umsatzsteuer a été retirée (elle n'est obligatoire
que si un numéro existe). Si Théo relève du régime Kleinunternehmer (§ 19 UStG),
on peut ajouter la phrase « Als Kleinunternehmer im Sinne von § 19 UStG wird
keine Umsatzsteuer berechnet. »

### 3. ~~Vrai e-mail de contact~~ ✅ fait
`CONTACT_EMAIL` dans `src/lib/shop.ts` = tonossi.theo@gmail.com (footer +
boutons d'achat).

### 4. Politique de confidentialité (Datenschutzerklärung)
Obligatoire (RGPD) dès qu'un formulaire collecte des données : le formulaire
de demande envoie nom, e-mail et image à Netlify (hébergeur américain).
- Aujourd'hui, le lien « Datenschutz » sous la case de consentement pointe vers
  l'Impressum, qui ne contient pas de politique de confidentialité.
- Générer un texte (ex : générateur de e-recht24.de ou datenschutz-generator.de,
  en indiquant Netlify comme hébergeur et Netlify Forms), puis l'ajouter comme
  page ou comme section de l'Impressum.

### 5. Vente d'œuvres par e-mail : mentions obligatoires
Même sans paiement en ligne, une vente conclue à distance (e-mail) à un
particulier donne droit à un **délai de rétractation de 14 jours** (Widerrufsrecht).
À préciser sur la page Art ou dans l'Impressum :
- information sur le droit de rétractation ;
- frais de port (inclus ou non, pays livrés) ;
- mention TVA : « inkl. MwSt. » ou « Kleinunternehmer, § 19 UStG ».

---

## 🟠 Contenu (le site a l'air inachevé sinon)

### 6. Page "About"
À remplir depuis l'admin : `/admin` → **Pages du site** → **Page About**.
- [ ] Bio de l'artiste (remplacer le texte entre `[crochets]`)
- [ ] Photo de l'artiste (remplacer le bloc `[ Artist photo ]`)
- [ ] Réponses aux 3 questions de la FAQ (healing, rates, couleur)
- [ ] Certifications/hygiène du studio si disponibles

### 7. Image du bloc "Art & Sculpture" sur la page d'accueil
- Fichier : `src/pages/Landing.tsx`
- Le bloc affiche actuellement `[ Image placeholder ]` sur fond bleu.
  Remplacer par une vraie photo d'œuvre.

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
- [ ] **Acompte / arrhes** : réduit fortement les no-shows (demandé par e-mail
      après validation du projet, ou via un lien de paiement).
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
