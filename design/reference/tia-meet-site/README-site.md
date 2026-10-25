# tia-meet.com — nouvelle page d'accueil

Page unique, sans framework : `index.html` + le dossier `images/`. Un petit script intégré (15 lignes) déclenche les apparitions au scroll et l’effet de lumière qui suit la souris sur les cases ; sans lui, la page reste complète.
Animations en CSS pur, coupées automatiquement si le visiteur a activé « réduire les animations ».
Mise en page responsive (bureau, tablette, mobile 360 px).

## Contenu

| Fichier | Rôle |
|---|---|
| `index.html` | Page d'accueil complète (styles inclus) |
| `images/*.jpg` | 6 photos de modèles (générées, fictives) |
| `images/favicon.png`, `images/apple-touch-icon.png` | Nouvelle icône Tia |

## Mise en ligne

1. Remplacer la page d'accueil actuelle par `index.html`.
2. Copier le dossier `images/` à la racine du site, à côté de `index.html`.
3. Ne pas toucher aux pages existantes : la page y renvoie telles quelles.
   - `/terms`
   - `/privacy`
   - `/child-safety`

Vérifier après mise en ligne :

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://tia-meet.com/images/fanja.jpg
```

Sortie attendue : `200`

## À faire côté dev

- Remplacer les boutons App Store et Google Play par les badges officiels d'Apple et de Google si besoin (liens déjà en place).
- Si la page newsletter `/inscription-newsletter` doit rester accessible, ajouter un lien dans le pied de page.
