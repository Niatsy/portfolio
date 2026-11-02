// Tes infos et tes projets : c'est le seul fichier à modifier.
// categorie : "Projet scolaire", "Stage" ou "Perso" (sert aux filtres et à la couleur du surligneur).
// Les projets s'affichent dans l'ordre de cette liste : mets le plus récent en premier.
const PROFIL = {
  nom: "Logan Laporte",
  titre: "Assistant chef de projet événementiel · Esport & jeux vidéo",
  recherche: "Recherche une alternance de 12 à 24 mois (1 semaine en formation / 3 semaines en entreprise)",
  bio: "Passionné d'esport, de jeux vidéo et joueur actif, je connais bien les codes des communautés en ligne et les usages des réseaux sociaux. Créatif, rigoureux et force de proposition, je mets ces compétences au service de la conception, de la coordination et de la mise en œuvre de projets événementiels.",
  photo: "images/portrait.jpg", // laisser vide si aucune
  email: "loganlap22@gmail.com",
  telephone: "06 68 81 80 22",
  permis: "Permis B · non véhiculé",
  cv: "documents/CV-Logan-Laporte.pdf", // bouton « Mon CV » en haut des sites (laisser vide pour le masquer)
  // parcours, langues et outils : affichés dans la section « À propos » (laisser [] si inutile)
  parcours: [
    { quand: "2026 — 2028", quoi: "MBA Stratégie Marketing et Pilotage de Projets, Gaming Business School (Lyon), en français" },
    { quand: "2023 — 2026", quoi: "Bachelor Management & Business, option Jeux vidéo et Esport, Gaming Business School (La Défense), en anglais" },
    { quand: "2020 — 2023", quoi: "BTS SIO (Services Informatiques aux Organisations), Ensemble Sainte-Marie (Joinville-le-Pont)" },
  ],
  langues: ["Français (langue maternelle)", "Anglais (B2 professionnel)", "Espagnol (A2, en apprentissage)", "Japonais (A1, en apprentissage)"],
  outils: ["Canva", "Figma", "Affinity", "Premiere Pro", "CapCut", "Trello", "Discord", "Instagram", "TikTok", "Claude", "ChatGPT", "Excel / Google Sheets", "Pack Office", "Gmail", "Outlook", "Brevo", "Apollo", "Wix", "Teams", "Google Drive", "Google Docs", "LinkedIn", "WhatsApp", "Twitch", "Shotgun"],
  liens: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/logan-laporte-621695223/" },
  ],
};

// Vie pro : tes expériences, de la plus récente à la plus ancienne (albums sur la planche, classeurs sur les cartes)
const EXPERIENCES = [
  {
    entreprise: "ESpot",
    vedette: true, // expérience mise en avant sur les deux sites
    poste: "Assistant chef de projet événementiel et communication",
    type: "Stage",
    dates: "Juin — Août 2026",
    lieu: "Paris (75001)",
    missions: [
      "Pilotage et coordination d'un événement de plus de 400 participants",
      "Conception de supports de communication digitaux et imprimés",
      "Coordination d'une Artist Alley et gestion du partenaire officiel (LG Electronics)",
      "Organisation et suivi opérationnel (installation, accueil…)",
    ],
  },
  {
    entreprise: "Fitness Lab",
    poste: "Chargé de communication sportive (digital et print)",
    type: "Stage",
    dates: "Juin — Août 2025",
    lieu: "Montlhéry (91310)",
    missions: [
      "Création d'un planning en version numérique et imprimée",
      "Mise en place du matériel pour filmer les vidéos promotionnelles",
    ],
  },
  {
    entreprise: "Wapply",
    poste: "Chargé de contenu et planification éditoriale",
    type: "Stage",
    dates: "Juillet — Août 2024",
    lieu: "Paris (75013)",
    missions: [
      "Création de contenus pour les réseaux sociaux (Instagram, Facebook…)",
      "Création du planning éditorial",
    ],
  },
  {
    entreprise: "Madame Pamplemousse",
    poste: "Développeur de site internet",
    type: "Stage",
    dates: "Novembre — Décembre 2022",
    lieu: "Créteil (94000)",
    missions: [
      "Développement du site internet avec Wix",
      "Analyse du référencement (SEO) du site",
    ],
  },
  {
    entreprise: "Carrefour Market",
    poste: "Employé polyvalent",
    type: "Job étudiant",
    dates: "Depuis août 2021",
    lieu: "Saint-Maur-des-Fossés (94100)",
    missions: [],
  },
];

// Projets : du plus récent au plus ancien ; le premier porte le bandeau « Best project ».
// experience = nom de l'entreprise (le projet apparaît aussi dans son classeur / album)
// domaine = le type de projet, affiché sur la carte ; resultat et outils vides = ligne masquée sur le site
const PROJETS = [
  // ——— ESpot (Paris) · Juin – Août 2026 ———
  {
    titre: "Artist Alley du Major de TFT",
    categorie: "Stage",
    domaine: "Événementiel",
    experience: "ESpot",
    date: "Été 2026",
    description: "Coordination de l'Artist Alley du Major de TFT, un événement de plus de 400 participants. J'ai participé aux réunions avec les partenaires (Riot Games, LG Gaming) et les artistes, puis contribué à la mise en place de l'événement sur site.",
    resultat: "", // à compléter : nombre d'artistes, retours, ventes…
    outils: ["Teams", "Canva", "Outlook", "Google Sheets", "Trello"],
    image: "images/projets/major-tft/06-file-attente-espot.jpg", // photo de la carte
    // galerie = toutes les photos du verso, dans l'ordre de défilement (site « cartes ») : l'Artist Alley d'abord, puis l'événement
    galerie: [
      "01-stand-goodies", "08-stand-dango", "03-dessin-en-direct", "13-dessin-tablette", "06-file-attente-espot",
      "17-public-reaction", "07-joueurs-sur-scene", "11-joueurs-public", "12-joueuse-public", "04-casters-sur-scene",
      "14-vainqueurs-trophees", "15-vainqueurs-billets-las-vegas", "09-quete-lg-thresh", "10-decor-banderoles",
      "05-casters-check",
    ].map((n) => `images/projets/major-tft/${n}.jpg`),
    credit: "Léa Bertrand, Chloé Ramdani et un autre photographe", // à compléter : nom du troisième photographe
    lien: "",  // vidéo, article, post Instagram…
  },
  {
    titre: "Gestion de crise : impressions du Major",
    categorie: "Stage",
    domaine: "Gestion de crise",
    experience: "ESpot",
    date: "Été 2026",
    description: "J'ai repéré que VistaPrint n'avait lancé en production que la moitié de la commande d'impressions pour le Major de TFT. Avec mes collègues, nous avons passé une nouvelle commande chez CopyTop pour tenir les délais.",
    resultat: "", // à compléter : supports livrés à temps ?
    outils: ["Canva", "Outlook", "Google Drive"],
    // les supports imprimés du Major, exportés des fichiers d'impression (booklet, X-banners, photocall, selfie card)
    image: "images/projets/impressions-major/09-photocall.jpg",
    galerie: ["09-photocall", "01-booklet-couverture", "02-booklet-le-major", "03-booklet-programme", "04-booklet-quetes", "05-booklet-recompenses",
      "06-booklet-merci", "07-xbanner-plans", "08-xbanner-tournoi", "10-selfie-card"]
      .map((n) => `images/projets/impressions-major/${n}.jpg`),
    credit: "",
    lien: "",
  },
  {
    titre: "Reporting partenaire LG",
    categorie: "Stage",
    domaine: "Partenariat",
    experience: "ESpot",
    date: "Été 2026",
    description: "Réalisation du reporting destiné à LG, partenaire officiel du Major de TFT.",
    resultat: "", // à compléter : KPI présentés
    outils: ["Canva", "Google Drive", "Instagram", "TikTok", "Twitch", "Discord"],
    // carte : la photo du stand LG tirée du rapport ; verso : les pages du rapport dans l'ordre
    image: "images/projets/rapport-lg/00-carte.jpg",
    galerie: ["01-couverture.jpg", "02-stand-lg.webp", "03-posts-instagram.webp", "04-rendus-logo-cast.webp", "05-photos-evenement.webp"]
      .map((n) => `images/projets/rapport-lg/${n}`),
    credit: "Léa Bertrand, Chloé Ramdani et un autre photographe", // même événement que le projet 1 (photos du Major)
    lien: "",
  },
  {
    titre: "After party des fans de BTS",
    categorie: "Stage",
    domaine: "Chef de projet",
    experience: "ESpot",
    date: "Été 2026",
    description: "Chef de projet de l'after party : gestion de la sécurité, du DJ, des extras et de l'équipe sur place. J'ai aussi conçu les menus personnalisés de la soirée.",
    resultat: "", // à compléter : nombre de participants
    outils: ["Canva", "Outlook", "Instagram", "Shotgun", "Trello"],
    image: "images/projets/afterparty-bts/01-affiche-dj-yugo.jpg",
    galerie: [
      "01-affiche-dj-yugo.jpg", "02-activites-v1.jpg", "03-activites-v2.jpg", "04-menu-snacks.webp", "05-menu-cocktails.webp",
    ].map((n) => `images/projets/afterparty-bts/${n}`),
    credit: "",
    lien: "",
  },
  {
    titre: "Communication print et digitale de l'ESpot",
    categorie: "Stage",
    domaine: "Communication",
    experience: "ESpot",
    date: "Été 2026",
    description: "Création d'affiches, de vidéos pour le compte Instagram de l'ESpot et propositions d'idées de posts pour les partenaires.",
    resultat: "", // à compléter : vues, engagement
    outils: ["Affinity", "Canva"],
    image: "images/projets/communication-espot/02-affiche-catalogue-fond.webp",
    // affiche « Notre catalogue de jeux » : le fond seul, puis la version finale avec QR code
    galerie: ["02-affiche-catalogue-fond", "01-affiche-catalogue-qr"].map((n) => `images/projets/communication-espot/${n}.webp`),
    credit: "",
    lien: "",
  },
  {
    titre: "Campagne e-mailing",
    categorie: "Stage",
    domaine: "Marketing direct",
    experience: "ESpot",
    date: "Été 2026",
    description: "Création d'une campagne d'e-mailing sur Brevo. J'ai réalisé les visuels sur Canva, à partir des visuels déjà créés pour le Major de TFT, pour habiller la campagne aux couleurs de l'événement.",
    resultat: "", // à compléter : objectif, taux d'ouverture, taux de clic
    outils: ["Canva", "Brevo"],
    image: "images/projets/brevo/01-merci-participation.webp",
    // les visuels du mail envoyé après le Major, dans l'ordre du mail
    galerie: ["01-merci-participation", "02-formulaire", "03-suivez-nous", "04-a-tres-bientot"].map((n) => `images/projets/brevo/${n}.webp`),
    credit: "",
    lien: "",
  },
  {
    titre: "Prospection de contacts",
    categorie: "Stage",
    domaine: "Business development",
    experience: "ESpot",
    date: "Été 2026",
    description: "Recherche de contacts sur Apollo et échanges avec des prestataires.",
    resultat: "", // à compléter : objectif, nombre de contacts
    outils: ["Google Docs", "Apollo", "LinkedIn"],
    image: "images/projets/prospection/apollo.png", // logo Apollo (fourni par Logan)
    credit: "",
    lien: "",
  },
  {
    titre: "Inventaire du merch Gen.G",
    categorie: "Stage",
    domaine: "Gestion de stock",
    experience: "ESpot",
    date: "Été 2026",
    description: "Gestion des stocks de merch laissés à l'ESpot par l'équipe Gen.G (Worlds de LoL 2024). J'ai créé un fichier Excel pour faire l'inventaire des articles.",
    resultat: "", // à compléter
    outils: ["Excel", "Outlook"],
    image: "images/projets/merch-geng/equipe-geng.webp", // l'équipe Gen.G (LoL)
    credit: "Gen.G × Descente, via esports.gg", // photo officielle de la tenue des Worlds 2024 : esports.gg/news/league-of-legends/gen-g-and-descente-introduce-lol-worlds-2024-uniform/
    lien: "",
  },

  // ——— Fitness Lab (Montlhéry) · Juin – Août 2025 ———
  {
    titre: "Planning de communication",
    categorie: "Stage",
    domaine: "Communication",
    experience: "Fitness Lab",
    date: "Été 2025",
    description: "Création d'un planning en version numérique et imprimée.",
    resultat: "", // à compléter : planning de quoi (cours, publications) ?
    outils: ["Canva", "Figma", "WhatsApp"],
    image: "",
    credit: "",
    lien: "",
  },
  {
    titre: "Tournage de vidéos promotionnelles",
    categorie: "Stage",
    domaine: "Production vidéo",
    experience: "Fitness Lab",
    date: "Été 2025",
    description: "Mise en place du matériel pour filmer des vidéos promotionnelles.",
    resultat: "", // à compléter : as-tu aussi fait le montage ? diffusion ?
    outils: [], // pas d'outil pour ce projet (confirmé par Logan)
    image: "",
    credit: "",
    lien: "",
  },

  // ——— Wapply (Paris) · Juillet – Août 2024 ———
  {
    titre: "Contenus réseaux sociaux",
    categorie: "Stage",
    domaine: "Social media",
    experience: "Wapply",
    date: "Été 2024",
    description: "Création de contenus vidéo pour Instagram et Facebook, du tournage au montage. J'ai fait vivre les comptes avec des formats variés et complémentaires : micro-trottoirs et « Devine mon métier » pour aller à la rencontre du public, interviews et présentations métier, vidéos conseils en face cam et en draw, et des formats humoristiques comme les POV et les vidéos react. Chaque format avait son jour dans le planning éditorial, pour une publication régulière.",
    resultat: "", // à compléter
    outils: ["Canva", "CapCut", "WhatsApp"],
    // miniatures des vidéos publiées : micro-trottoirs, conseils face cam et draw, humour
    image: "images/projets/contenus-wapply/01-metier-salaire-1.jpg",
    galerie: ["01-metier-salaire-1", "02-photo-cv-1", "03-metier-salaire-2", "04-metier-salaire-3", "05-astuces-stress", "06-motivation-humour", "07-draw-rupture-conventionnelle", "08-astuces-cv", "09-face-cam", "10-photo-cv-2", "11-green-flags-entretien", "12-metier-salaire-4", "13-draw-prime-activite"]
      .map((n) => `images/projets/contenus-wapply/${n}.jpg`),
    credit: "",
    lien: "",
  },
  {
    titre: "Planning éditorial",
    categorie: "Stage",
    domaine: "Stratégie de contenu",
    experience: "Wapply",
    date: "Été 2024",
    description: "Construction du planning éditorial des réseaux sociaux.",
    resultat: "", // à compléter
    outils: ["Canva"],
    // carte : le coin gauche du planning d'août ; verso : le planning de tournage puis les plannings mois par mois
    image: "images/projets/planning-wapply/00-carte.jpg",
    galerie: ["01-tournage-juillet", "02-juillet", "03-aout", "04-septembre", "05-octobre"].map((n) => `images/projets/planning-wapply/${n}.jpg`),
    credit: "",
    lien: "",
  },

  // ——— Madame Pamplemousse (Créteil) · Novembre – Décembre 2022 ———
  {
    titre: "Création du site internet",
    categorie: "Stage",
    domaine: "Web",
    experience: "Madame Pamplemousse",
    date: "Fin 2022",
    description: "Développement du site internet de la marque sur Wix.",
    resultat: "",
    outils: ["Wix", "Instagram", "WhatsApp"],
    // carte : la photo de la page d'accueil seule (le logo serait caché par la pastille du nom) ; verso : la capture entière
    image: "images/projets/madame-pamplemousse/site-accueil-photo.jpg",
    galerie: ["images/projets/madame-pamplemousse/site-accueil.webp"],
    credit: "",
    lien: "", // à compléter : lien du site s'il est encore en ligne
  },
  {
    titre: "Analyse SEO",
    categorie: "Stage",
    domaine: "SEO",
    experience: "Madame Pamplemousse",
    date: "Fin 2022",
    description: "Analyse du référencement naturel du site.",
    resultat: "", // à compléter : recommandations faites ?
    outils: ["Wix"],
    // carte : la capture posée sur fond sombre ; verso : la capture seule
    image: "images/projets/seo/00-carte.jpg",
    galerie: ["images/projets/seo/resultat-google.png"],
    credit: "",
    lien: "",
  },

  // ——— Projets scolaires ———
  {
    titre: "Exemple : projet scolaire",
    masque: true, // pas affiché sur le site « cartes » tant que c'est un exemple : retirer cette ligne une fois rempli
    categorie: "Projet scolaire",
    domaine: "",
    date: "À compléter",
    description: "À remplacer : le cours ou le module, l'objectif, ton rôle dans l'équipe, ce que tu as réalisé et le résultat.",
    resultat: "",
    outils: [],
    image: "",
    credit: "",
    lien: "",
  },
];
