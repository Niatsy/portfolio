const $ = (id) => document.getElementById(id);
const el = (tag, props = {}, ...enfants) => {
  const e = Object.assign(document.createElement(tag), props);
  e.append(...enfants);
  return e;
};
const deux = (n) => String(n).padStart(2, "0");
const slug = (t) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
// Les chemins d'images de projects.js partent de la racine du projet ; cette page est deux dossiers plus bas
const chemin = (p) => (p && !/^(https?:|\/|data:)/.test(p) ? `${p}` : p);
PROFIL.photo = chemin(PROFIL.photo);
PROJETS.forEach((p) => { p.image = chemin(p.image); p.galerie = p.galerie?.map(chemin); });
const initiales = PROFIL.nom.split(/\s+/).map((m) => m[0]).join("").slice(0, 3).toUpperCase();
const mouvement = !matchMedia("(prefers-reduced-motion: reduce)").matches;

// Profil
const [prenom, ...reste] = PROFIL.nom.split(/\s+/);
document.title = `${PROFIL.nom} — Portfolio`;
$("nom-1").textContent = prenom;
$("nom-2").textContent = reste.join(" ");
$("pilule-nom").textContent = PROFIL.nom;
$("pied-nom").textContent = `© ${new Date().getFullYear()} ${PROFIL.nom}`;
$("titre").textContent = PROFIL.titre;
// La précision entre parenthèses (rythme de l'alternance) passe à la ligne
const [recherche, ...rythme] = PROFIL.recherche.split(" (");
$("recherche").append(recherche, ...(rythme.length ? [el("br"), el("span", { className: "rythme", textContent: `(${rythme.join(" (")}` })] : []));

// Une carte : photo, nom de la structure, bandeau titre
const projets = PROJETS.filter((p) => !p.masque).map((p, i) => ({ ...p, n: deux(i + 1), id: slug(p.titre) || `carte-${i + 1}` }));
const rotations = [-1.6, 1.2, -0.8, 1.8, -1.2, 0.9];
// Une couleur par expérience, la même pour toutes les cartes de ses projets
const couvertures = ["#1e5bd8", "#d62f2f", "#1f8a4c", "#7a4bc2", "#151515"];
const couleurExperience = (entreprise) => {
  const i = EXPERIENCES.findIndex((x) => x.entreprise === entreprise);
  return i < 0 ? "" : couvertures[i % couvertures.length];
};

function carte(p, i, tag = "a") {
  const c = el(tag, { className: "carte" },
    el("div", { className: "recto" },
      el("div", { className: "photo" },
        p.image ? el("img", { src: p.image, alt: "", loading: "lazy" }) : el("div", { className: "a-venir", textContent: p.n }),
        // Pastille en haut à gauche : la structure du stage (ESpot, Wapply…)
        p.experience ? el("span", { className: "entreprise", textContent: p.experience }) : "",
        i === 0 ? el("span", { className: "rookie", textContent: "Best project" }) : "",
      ),
      el("div", { className: "bandeau-carte" },
        el("h3", { textContent: p.titre }),
        el("p", { textContent: `${p.domaine || p.categorie} · ${p.date}` }),
      ),
    ),
  );
  c.dataset.cat = p.categorie;
  if (couleurExperience(p.experience)) c.style.setProperty("--equipe", couleurExperience(p.experience));
  c.style.setProperty("--r", `${rotations[i % rotations.length]}deg`);
  return c;
}

// Ouverture : les cinq premières cartes de la collection tenues en éventail (décoratif, le paquet porte les liens)
// Ordre inversé : la carte #01 (le meilleur projet) est posée en dernier, donc devant
const main = projets.slice(0, 5).reverse();
const nb = main.length;
$("eventail").append(...main.map((p, i) => {
  const c = carte(p, projets.indexOf(p), "div");
  c.style.setProperty("--angle", `${(i - (nb - 1) / 2) * (nb > 1 ? 14 / Math.max(1, (nb - 1) / 2) : 0)}deg`);
  c.onclick = () => ouvrir(p.id);
  return c;
}));

// Le paquet, étalé sur le tapis ; le premier projet porte le bandeau « Best project »
$("cartes").append(...projets.map((p, i) => {
  const a = carte(p, i);
  a.href = `#${p.id}`;
  a.onclick = (e) => { e.preventDefault(); ouvrir(p.id); };
  const li = el("li", {}, a);
  li.dataset.cat = p.categorie;
  li.dataset.exp = p.experience ?? "";
  li.style.setProperty("--n", i);
  return li;
}));

// Tri : « Trier » déplie les catégories ; celle choisie s'affiche seule à côté, un clic dessus retire le tri.
// Seules les cartes de la sélection restent affichées.
// « Stage » ouvre une seconde rangée : un bouton par stage (experience vide = tous les stages)
const trierBouton = $("trier"), choix = $("choix-tri");
const basculerChoix = (ouvrir) => { choix.hidden = !ouvrir; trierBouton.setAttribute("aria-expanded", ouvrir); };
trierBouton.onclick = () => basculerChoix(choix.hidden);
const actif = el("button", { type: "button", hidden: true, onclick: () => trier("Tout") });
actif.setAttribute("aria-pressed", "true");
$("filtres").append(actif);
function trier(categorie, experience = "") {
  const liste = $("cartes");
  if (categorie === "Tout") delete liste.dataset.filtre;
  else liste.dataset.filtre = categorie;
  for (const li of liste.children) {
    const choisi = li.dataset.cat === categorie && (!experience || li.dataset.exp === experience);
    li.classList.toggle("choisi", choisi);
    li.firstChild.tabIndex = liste.dataset.filtre && !choisi ? -1 : 0;
  }
  actif.hidden = categorie === "Tout";
  actif.textContent = `${categorie} ✕`;
  actif.dataset.cat = categorie;
  actif.setAttribute("aria-label", `${categorie}, retirer le tri`);
  basculerChoix(false);
  $("sous-filtres").hidden = categorie !== "Stage";
  for (const b of $("sous-filtres").children) b.setAttribute("aria-pressed", b.dataset.valeur === experience);
  ajusterTitres(); // les cartes qui réapparaissent n'avaient pas pu être mesurées
}
const categories = [...new Set(projets.map((p) => p.categorie))];
choix.append(...categories.map((c) => {
  const b = el("button", { type: "button", textContent: c, onclick: () => trier(c) });
  b.dataset.cat = c;
  return b;
}));
const stages = EXPERIENCES.map((x) => x.entreprise).filter((e) => projets.some((p) => p.categorie === "Stage" && p.experience === e));
$("sous-filtres").append(...["", ...stages].map((e) => {
  const b = el("button", { type: "button", textContent: e || "Tous les stages", onclick: () => trier("Stage", e) });
  b.dataset.valeur = e;
  if (e) b.style.setProperty("--equipe", couleurExperience(e));
  return b;
}));
trier("Tout");
// Bandeau : le message de recherche défile en boucle. Six copies, la piste glisse de la moitié (trois copies, plus large
// que l'écran) : boucle sans trou ni saut. Une pièce par élément, étoiles comprises : tous les espaces sont égaux.
// Seule la première copie est lue par les lecteurs d'écran, sans les étoiles
$("bandeau").append(...Array.from({ length: 6 }, (_, k) =>
  ["URGENT", "✦", "Recherche d'alternance pour décembre 2026 maximum", "✦"].map((t) => {
    const s = el("span", { textContent: t });
    if (k || t === "✦") s.setAttribute("aria-hidden", "true");
    return s;
  })).flat());

// Profil : la carte du joueur et ses stats
$("joueur-photo").append(PROFIL.photo ? el("img", { src: PROFIL.photo, alt: `Portrait de ${PROFIL.nom}` }) : el("div", { className: "a-venir", textContent: initiales }));
$("t-joueur").textContent = PROFIL.nom;
$("joueur-titre").textContent = PROFIL.titre;
$("bio").append(...PROFIL.bio.split(/\s+/).flatMap((m) => [el("span", { textContent: m }), " "]));
// Le diplôme en cours ressort : nom du diplôme en gras, étiquette « En cours » s'il a commencé et ne finit pas cette année
const annee = new Date().getFullYear();
$("parcours").append(...(PROFIL.parcours ?? []).map((e) => {
  const [debut, fin = debut] = (e.quand.match(/\d{4}/g) ?? []).map(Number);
  const [diplome, ...detail] = e.quoi.split(", ");
  return el("div", { className: "etape" },
    el("span", {}, e.quand, debut <= annee && annee < fin ? el("em", { className: "en-cours", textContent: "En cours" }) : ""),
    el("strong", { textContent: diplome }),
    detail.length ? el("div", { textContent: detail.join(", ") }) : "",
  );
}));
// Logo quand on en a un (voir images/outils/SOURCES.md), sinon le nom ; « Excel / Google Sheets » affiche les deux
const logos = { "Canva": ["canva.png"], "Figma": ["figma.svg"], "Affinity": ["affinity.png"], "Trello": ["trello.svg"], "Discord": ["discord.svg"], "Instagram": ["instagram.png"], "TikTok": ["tiktok.svg"], "Claude": ["claude.svg"],
  "Premiere Pro": ["premiere.png"], "Brevo": ["brevo.png"], "Apollo": ["apollo.png"], "Wix": ["wix.svg"], "ChatGPT": ["chatgpt.png"], "Gmail": ["gmail.png"], "Outlook": ["outlook.png"],
  "Excel / Google Sheets": ["microsoftexcel.svg", "googlesheets.svg"], "Pack Office": ["microsoftoffice.svg"],
  "Excel": ["microsoftexcel.svg"], "Google Sheets": ["googlesheets.svg"] };
// Quatre copies à la suite, la piste défile de la moitié (deux copies, plus large que l'écran) : boucle sans trou ni saut.
// Seule la première copie est lue par les lecteurs d'écran
const listeOutils = (cachee) => {
  const ul = el("ul", { className: "logos" }, ...(PROFIL.outils ?? [...new Set(projets.flatMap((p) => p.outils))]).map((o) => {
    const fichiers = logos[o];
    if (!fichiers) return el("li", { className: "sans-logo", textContent: o });
    const noms = o.split(" / ");
    return el("li", { title: o }, ...fichiers.map((f, i) => el("img", { src: `images/outils/${f}`, alt: cachee ? "" : noms[i] ?? o, width: 40, height: 40 })));
  }));
  if (cachee) ul.setAttribute("aria-hidden", "true");
  return ul;
};
$("outils").append(listeOutils(false), listeOutils(true), listeOutils(true), listeOutils(true));
// Langues en pastilles : le nom en gras et le niveau court en badge (« B2 », « Natif »), le détail au survol
$("langues").append(...(PROFIL.langues ?? []).map((l) => {
  const [, langue, niveau = ""] = l.match(/^([^(]+?)\s*(?:\((.*)\))?$/);
  const court = niveau.match(/[ABC][12]/)?.[0] ?? (/maternelle/i.test(niveau) ? "Natif" : niveau);
  return el("li", { title: niveau ? `${langue} : ${niveau}` : langue }, el("strong", { textContent: langue }), court ? el("span", { textContent: court }) : "");
}));

// Repères au-dessus des titres : des chiffres réels, calculés depuis projects.js
$("surtitre-projets").textContent = `${projets.length} cartes · collection ${new Date().getFullYear()}`;

// Menu mobile : le bouton devient une croix, les liens montent un à un ; Échap ou un lien referme
const menuBouton = $("menu-bouton"), menu = $("menu");
const basculerMenu = (ouvrir) => {
  document.documentElement.classList.toggle("menu-ouvert", ouvrir);
  menuBouton.setAttribute("aria-expanded", ouvrir);
  menuBouton.setAttribute("aria-label", ouvrir ? "Fermer le menu" : "Ouvrir le menu");
  menu.inert = !ouvrir;
};
basculerMenu(false);
menuBouton.onclick = () => basculerMenu(!document.documentElement.classList.contains("menu-ouvert"));
// Un lien referme le menu puis amène à la section (le menu devient inerte en se fermant, ce qui annulerait le saut)
menu.addEventListener("click", (e) => {
  const lien = e.target.closest("a");
  if (!lien) return;
  e.preventDefault();
  basculerMenu(false);
  history.pushState(null, "", lien.hash);
  document.querySelector(lien.hash)?.scrollIntoView();
});
addEventListener("keydown", (e) => { if (e.key === "Escape") basculerMenu(false); });

// Contact
Object.assign($("email"), { href: `mailto:${PROFIL.email}`, textContent: PROFIL.email });
$("liens").append(...PROFIL.liens.map((l) => el("a", { className: "email", href: l.url, textContent: l.label, target: "_blank", rel: "noopener" })));

// Mouvement au défilement : cartes distribuées, éventail qui monte, bandeau, mots qui s'allument
if (mouvement) {
  document.documentElement.classList.add("anime");
  const vus = new IntersectionObserver((entrees) => {
    for (const e of entrees) if (e.isIntersecting) { e.target.classList.add("vu"); vus.unobserve(e.target); }
  }, { rootMargin: "0px 0px -10% 0px" });
  document.querySelectorAll("[data-reveal]").forEach((n) => vus.observe(n));
  // Le paquet est observé en entier : les cartes partent hors écran, on ne peut pas les observer une à une.
  // Déclenché quand son haut passe sous 85 % de l'écran (un seuil en % du paquet n'était jamais atteint sur téléphone, où il est très haut)
  const distribution = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    for (const li of $("cartes").children) li.classList.add("vu");
    distribution.disconnect();
  }, { rootMargin: "0px 0px -15% 0px" });
  distribution.observe($("cartes"));

  const eventail = $("eventail"), bio = $("bio"), n2 = $("nom-2");
  const mots = [...bio.children];
  let attente = false;
  const image = () => {
    attente = false;
    const y = scrollY;
    document.documentElement.classList.toggle("defile", y > 40);
    if (y < innerHeight * 1.2) {
      eventail.style.transform = `translateY(${-y * 0.25}px) rotate(${y * 0.02}deg)`;
      n2.style.transform = `translateX(${y * 0.12}px)`;
    }
    const r = bio.getBoundingClientRect();
    // Commence quand le texte entre par le bas, finit quand son haut atteint le milieu de l'écran
    const avance = Math.min(1, Math.max(0, (innerHeight * 0.95 - r.top) / (innerHeight * 0.5)));
    const n = Math.round(avance * mots.length);
    mots.forEach((m, i) => m.classList.toggle("allume", i < n));
  };
  addEventListener("scroll", () => { if (!attente) { attente = true; requestAnimationFrame(image); } }, { passive: true });
  image();
}

// Verso agrandi : adressable par #lien, le bouton retour le referme
const fiche = $("fiche");
let courant = -1;

function remplir(i) {
  const p = projets[i];
  courant = i;
  fiche.dataset.cat = p.categorie;
  fiche.style.setProperty("--equipe", couleurExperience(p.experience) || "");
  $("fiche-n").textContent = `#${p.n} / ${deux(projets.length)}`;
  // Une seule image dans galerie : elle remplace au verso la photo de la carte (ex. capture entière / carte recadrée)
  const visuel = p.galerie?.[0] ?? p.image;
  $("fiche-visuel").replaceChildren(p.galerie?.length > 1 ? galerie(p)
    : visuel ? el("img", { src: visuel, alt: p.titre }) : el("div", { className: "a-venir", textContent: "Visuel à venir" }));
  $("fiche-titre").textContent = p.titre;
  $("fiche-cat").textContent = p.domaine ? `${p.categorie} · ${p.domaine}` : p.categorie;
  $("fiche-date").textContent = p.date;
  // Outils utilisés : logo + nom quand on a le logo, sinon le nom seul ; bloc masqué s'il n'y en a pas
  $("fiche-outils").replaceChildren(...p.outils.map((o) => el("li", {},
    ...(logos[o] ?? []).map((f) => el("img", { src: `images/outils/${f}`, alt: "", width: 22, height: 22 })), o)));
  $("fiche-outils-bloc").hidden = !p.outils.length;
  $("fiche-resultat").textContent = p.resultat ?? "";
  $("fiche-resultat").parentElement.hidden = !p.resultat;
  $("fiche-desc").textContent = p.description;
  Object.assign($("fiche-credit"), { textContent: p.credit ? `${p.galerie?.length > 1 ? "Photos" : "Photo"} : ${p.credit}` : "", hidden: !p.credit });
  const lien = $("fiche-lien");
  lien.hidden = !p.lien;
  if (p.lien) lien.href = p.lien;
  $("fiche-prec").disabled = i === 0;
  $("fiche-suiv").disabled = i === projets.length - 1;
  fiche.scrollTop = 0;
}

// Plusieurs photos : elles défilent une par une (au doigt, aux flèches ou au clavier), un compteur dit où l'on en est
function galerie(p) {
  const n = p.galerie.length;
  const piste = el("div", { className: "galerie-piste", tabIndex: 0 },
    ...p.galerie.map((src, k) => el("img", { src, alt: `${p.titre}, photo ${k + 1} sur ${n}`, loading: k ? "lazy" : "eager" })));
  piste.setAttribute("aria-label", `Photos du projet, ${n} images`);
  const compteur = el("span", { className: "galerie-compteur", textContent: `1 / ${n}` });
  const aller = (pas) => piste.scrollBy({ left: pas * piste.clientWidth, behavior: mouvement ? "smooth" : "auto" });
  const prec = el("button", { type: "button", className: "galerie-prec", textContent: "←", disabled: true, onclick: () => aller(-1) });
  const suiv = el("button", { type: "button", className: "galerie-suiv", textContent: "→", onclick: () => aller(1) });
  prec.setAttribute("aria-label", "Photo précédente");
  suiv.setAttribute("aria-label", "Photo suivante");
  piste.addEventListener("scroll", () => {
    const k = Math.round(piste.scrollLeft / piste.clientWidth);
    compteur.textContent = `${k + 1} / ${n}`;
    prec.disabled = k === 0;
    suiv.disabled = k === n - 1;
  }, { passive: true });
  const cadre = el("div", { className: "galerie" }, piste, prec, suiv, compteur);
  // Affiches et menus en hauteur : le cadre passe en hauteur pour qu'on puisse les lire
  const premiere = piste.firstChild;
  const orienter = () => cadre.classList.toggle("galerie-haute", premiere.naturalHeight > premiere.naturalWidth);
  if (premiere.complete) orienter(); else premiere.addEventListener("load", orienter);
  return cadre;
}

function ouvrir(id) {
  history.pushState({ fiche: true }, "", `#${id}`);
  afficherSelonUrl();
}

function afficherSelonUrl() {
  const i = projets.findIndex((p) => p.id === decodeURIComponent(location.hash.slice(1)));
  if (i >= 0) {
    remplir(i);
    if (!fiche.open) fiche.showModal();
  } else if (fiche.open) {
    fiche.close();
  }
}

function fermer() {
  if (history.state?.fiche) history.back();
  else { history.replaceState(null, "", location.pathname + location.search); fiche.close(); }
}

function voisin(pas) {
  const p = projets[courant + pas];
  if (!p) return;
  history.replaceState(history.state, "", `#${p.id}`);
  remplir(courant + pas);
}

$("fiche-fermer").onclick = fermer;
$("fiche-prec").onclick = () => voisin(-1);
$("fiche-suiv").onclick = () => voisin(1);
fiche.addEventListener("cancel", (e) => { e.preventDefault(); fermer(); });
fiche.addEventListener("click", (e) => { if (e.target === fiche) fermer(); });
window.addEventListener("popstate", afficherSelonUrl);
afficherSelonUrl();

// CV : s'ouvre dans la page (le PDF n'est chargé qu'à la première ouverture), avec un bouton Télécharger
const cv = $("cv");
if (PROFIL.cv) {
  const url = chemin(PROFIL.cv);
  for (const id of ["cv-voir", "cv-telecharger", "cv-dl", "cv-onglet"]) $(id).href = url;
  $("cv-voir").onclick = (e) => {
    e.preventDefault();
    if (!$("cv-cadre").src) $("cv-cadre").src = `${url}#view=FitH&navpanes=0`; // pleine largeur, sans vignettes
    cv.showModal();
  };
} else {
  $("cv-voir").hidden = $("cv-telecharger").hidden = true;
}
$("cv-fermer").onclick = () => cv.close();
cv.addEventListener("click", (e) => { if (e.target === cv) cv.close(); });

// Contact : le téléphone après l'email, dans le même style
if (PROFIL.telephone) {
  $("email").after(el("a", { className: "email", href: `tel:${PROFIL.telephone.replace(/\s/g, "").replace(/^0/, "+33")}`, textContent: PROFIL.telephone }));
}

// Permis : la catégorie en gras, la précision à côté (« Permis B · non véhiculé »)
if (PROFIL.permis) {
  const [permis, ...precision] = PROFIL.permis.split(" · ");
  $("permis").append(el("strong", { textContent: permis }), precision.length ? ` · ${precision.join(" · ")}` : "");
}

// Un mot trop long pour sa place (« PROMOTIONNELLES ») rapetisse jusqu'à tenir, au lieu de déborder ou d'être coupé
function ajuster(selecteur, min) {
  for (const n of document.querySelectorAll(selecteur)) {
    n.style.fontSize = "";
    let taille = parseFloat(getComputedStyle(n).fontSize);
    while (n.scrollWidth > n.clientWidth + 1 && taille > min) n.style.fontSize = `${--taille}px`;
  }
}
function ajusterTitres() { ajuster(".bandeau-carte h3", 9); ajuster(".entreprise", 8); }
ajusterTitres();
document.fonts.ready.then(ajusterTitres);
addEventListener("resize", ajusterTitres);
