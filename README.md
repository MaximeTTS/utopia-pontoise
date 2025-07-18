# Utopia Pontoise 🎥✨

## 🚀 Introduction  
Utopia Pontoise est une web-app full-stack qui scrape automatiquement la programmation hebdomadaire et quotidienne du cinéma Utopia à Pontoise, récupère les détails de chaque film de la semaine (affiche, résumé, trailer…) et les présente dans une interface moderne, sobre, animée et responsive. Vous pouvez découvrir le résultat via ce lien : https://utopia-pontoise-peach.vercel.app/

---

## 🛠️ Technologies utilisées  
- **Backend**  
  - Node.js, Express & TypeScript  
  - Axios, Cheerio (HTML scraping), pdf-parser (horaires PDF), rss-parser  
- **Frontend**  
  - React & TypeScript (Create React App)  
  - TailwindCSS, PostCSS, Autoprefixer  
  - Framer Motion (animations), Lenis (scroll smooth)  
  - React Router v6  
- **Divers**  
  - Cache mémoire + localStorage (rafraîchi à minuit)  
  - YouTube Data API v3 (trailers auto) via Google Cloud Platform  
  - Déploiement sur Vercel  

---

## ▶️ Installation & lancement  

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm start

📝 Étapes réalisées pour le développement

0️⃣ Gestion de version

Création du dépôt GitHub utopia-pontoise

Clonage et ouverture dans VS Code

git commit -m "Initial commit" et git push

1️⃣ Backend Express + TypeScript

Création du dossier backend/

npm install express axios cheerio rss-parser

npm install -D typescript ts-node @types/node @types/express

Structure src/ avec :

index.ts

fetchScrape.ts

fetchSchedule.ts

fetchRss.ts

2️⃣ Frontend React + TypeScript

Création du dossier frontend/ avec Create React App + TypeScript

npm install axios react-router-dom@6

npm install -D tailwindcss postcss autoprefixer @tailwindcss/postcss

Ajout de "proxy": "http://localhost:3000/" dans package.json

Configuration de Tailwind (tailwind.config.js, postcss.config.js, index.css)

2️⃣.5️⃣ PDF du jour

Création de fetchDailySchedule.ts (backend) et route /api/horaires-jour

Mise à jour de api/utopia.ts (frontend)

Intégration du composant DailySchedule.tsx dans la page d’accueil

3️⃣ Design des cartes

Suppression des champs date/description dans /api/semaine

fetchWithCache (mémoire + localStorage)

Refactoring de utopia.ts pour un cache global

Création des composants CustomButton et MovieCard

Grille responsive (MovieList), breakpoint xs: 450px

4️⃣ Animation “escalier”

anim.ts, installation de Lenis et Framer Motion

Layout.tsx intègre le smooth scroll et l’animation

CSS pour la transition “stairs” dans index.css

5️⃣ Footer sticky

Footer.tsx et ContentFooter.tsx

Insertion dans Layout

min-h-screen sur MovieDetail

6️⃣ Rafraîchissement du cache

Correction du helper pour le rafraîchissement à 00 h 00

7️⃣ Design de la page détail film

Fonctions clean() et paragraphs() pour le parsing

Suppression du cache PDF hebdomadaire

Effet link-hover-effect et liens dans le footer

Liens personnels (portfolio, CV, GitHub)

8️⃣ Horaires & tarifs

CinemaProgram.tsx (horaires + tarifs)

Mise à jour de DailySchedule et ScheduleView

9️⃣ Contenu supplémentaire

Section Google Maps

Route /api/film-du-jour + fetchDailyMovie()

Composant DailyMovie.tsx

Ajout de headers pour renforcer le scraping

🔟 Trailer automatique

Intégration de l’API YouTube Data v3 (clé stockée en .env, dotenv)

Modifications de fetchScrape.ts, utopia.ts, DetailMovie.tsx

1️⃣1️⃣ Amélioration du design

Composants Title et Welcome

Palette de couleurs : #03001e & #29273B

Optimisation de fetchScrape.ts

Footer finalisé

Scroll dynamique des affichages

1️⃣2️⃣ Header simple

Header responsive avec liens opérationnels

1️⃣3️⃣ Mise en ligne

Finitions design et commentaires

SEO dans public/index.html

Configuration Vercel (API & front)

Déploiement final
