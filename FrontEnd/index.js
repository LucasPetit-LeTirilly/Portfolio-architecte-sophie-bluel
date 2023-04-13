const reponseOeuvres = await fetch('http://localhost:5678/api/works');
const oeuvres = await reponseOeuvres.json();
const reponseCategories = await fetch('http://localhost:5678/api/categories');
const categoriesParDefaut = await reponseCategories.json();


function genererOeuvres(figure){
  const galerie = document.querySelector(".gallery");
  for (let i = 0; i < figure.length; i++){
    const oeuvre = figure[i];
    const oeuvreElement = document.createElement("figure");
    oeuvreElement.dataset.id = figure[i].id;
    const imageOeuvre = document.createElement("img");
    imageOeuvre.src = oeuvre.imageUrl;
    imageOeuvre.alt = oeuvre.title;
    const titreOeuvre = document.createElement("figcaption");
    titreOeuvre.innerText = oeuvre.title;
    oeuvreElement.appendChild(imageOeuvre);
    oeuvreElement.appendChild(titreOeuvre);
    galerie.appendChild(oeuvreElement);
  }
}

genererOeuvres(oeuvres)


function genererBouttons(typeCategorie){
  const ensembleBouttons = document.querySelector(".section-filtre");
  const bouttonTous = document.createElement('button');
  bouttonTous.dataset.id = 0;
  bouttonTous.innerText = "Tous";
  bouttonTous.classList.add('filtre-clique');
  ensembleBouttons.appendChild(bouttonTous);
  for (let i = 0; i < typeCategorie.length; i++){
    const filtre = typeCategorie[i];
    const bouttonElement = document.createElement("button");
    bouttonElement.dataset.id = filtre.id;
    bouttonElement.innerText = filtre.name;
    bouttonElement.classList.add('filtre-non-clique');
    ensembleBouttons.appendChild(bouttonElement);
  }
}

genererBouttons(categoriesParDefaut)


const tousLesBouttons = document.querySelectorAll('.section-filtre button');

tousLesBouttons.forEach((ceBoutton) => ceBoutton.addEventListener('click', (e) => {
  tousLesBouttons.forEach((x) => x.classList.remove('filtre-clique'));
  tousLesBouttons.forEach((x) => x.classList.add('filtre-non-clique'));
  e.target.classList.remove('filtre-non-clique');
  e.target.classList.add('filtre-clique');
  if (e.target.dataset.id == 0){
    document.querySelector(".gallery").innerHTML = "";
    genererOeuvres(oeuvres);
  } 
  else{
    filtrageOeuvre(e.target.dataset.id);
  }
}));


function filtrageOeuvre(filtreId){
  const oeuvresFiltrees = oeuvres.filter(function(oeuvre){
    return oeuvre.category.id == filtreId;
  });
  document.querySelector(".gallery").innerHTML = "";
  genererOeuvres(oeuvresFiltrees);
};

// Partie Edition

let tokenId = localStorage.getItem("userToken");
tokenId = JSON.parse(tokenId);


if (tokenId.token !== null && "undefined") {
  genererEditMode();
  genererModale();

}

function genererEditMode() {
  genererRectangleNoir();
  genereBouttonModifierPhotoProfil();
  genererBouttonModifierProjets();
  const sectionFiltre = document.querySelector(".section-filtre");
  sectionFiltre.classList.add('display-hidden');
}


function genererRectangleNoir (){
  const body = document.querySelector("body")
  const rectangleNoir = document.createElement('div');
  rectangleNoir.classList.add('rectangle-noir');
  const iconeRectangle = document.createElement('img');
  iconeRectangle.src = "assets/icons/iconeModifier.svg";
  iconeRectangle.alt = "icone modifier";
    const texteRectangle = document.createElement('p');
  texteRectangle.innerText = "Mode édition";
  const bouttonRectangle = document.createElement('button');
  bouttonRectangle.id = "boutton-publier-changement";
  bouttonRectangle.innerText = "publier les changements";
  rectangleNoir.appendChild(iconeRectangle);
  rectangleNoir.appendChild(texteRectangle);
  rectangleNoir.appendChild(bouttonRectangle);
  body.prepend(rectangleNoir);
}

function genereBouttonModifierPhotoProfil(){
  const portfolio = document.querySelector("#portfolio");
  const bouttonPhoto = document.createElement("button");
  bouttonPhoto.id = "boutton-modifier-photo-profil";
  bouttonPhoto.classList.add("boutton-modifier-photo");
  const iconeBoutton = document.createElement("img");
  iconeBoutton.src = "assets/icons/iconeModifier.svg";
  iconeBoutton.alt = "icone modifier";
  const texteBoutton = document.createElement("p");
  texteBoutton.innerText = "modifier"
  bouttonPhoto.appendChild(iconeBoutton);
  bouttonPhoto.appendChild(texteBoutton);
  portfolio.parentNode.insertBefore(bouttonPhoto, portfolio);
}

function genererBouttonModifierProjets(){
  const sectionPortfolio = document.querySelector("#portfolio");
  const TitreEtBoutton = document.createElement("div");
  TitreEtBoutton.classList.add("titre-h2-et-boutton")
  const h2Portfolio = document.querySelector("#portfolio h2");
  const bouttonProjets = document.createElement("button");
  bouttonProjets.id = "boutton-modifier-projets";
  bouttonProjets.classList.add("boutton-modifier-projets");
  const iconeBoutton = document.createElement("img");
  iconeBoutton.src = "assets/icons/iconeModifier.svg";
  iconeBoutton.alt = "icone modifier";
  const texteBoutton = document.createElement("p");
  texteBoutton.innerText = "modifier";
  bouttonProjets.appendChild(iconeBoutton);
  bouttonProjets.appendChild(texteBoutton);
  TitreEtBoutton.appendChild(h2Portfolio);
  TitreEtBoutton.appendChild(bouttonProjets);
  sectionPortfolio.prepend(TitreEtBoutton);
}


function genererModale(){
  const body = document.querySelector("body");
  const modaleGalerie = document.createElement("aside");
  modaleGalerie.id = "modale-galerie";
  modaleGalerie.classList.add("display-hidden");
  const fenetreModaleGalerie = document.createElement("div");
  fenetreModaleGalerie.id = "fenetre-modale-galerie";
  fenetreModaleGalerie.classList.add("fenetre-modale-galerie");
  const croix = document.createElement("img");
  croix.id = "fermer-modale-galerie"
  croix.src = "assets/icons/croix.svg";
  croix.alt = "Fermer la fenêtre";
  const titreModale = document.createElement("h2");
  titreModale.innerText = "Galerie Photo";
  fenetreModaleGalerie.appendChild(croix);
  fenetreModaleGalerie.appendChild(titreModale);
  modaleGalerie.appendChild(fenetreModaleGalerie);
  body.appendChild(modaleGalerie);
  genererMiniGalerie(oeuvres);

}

function genererMiniGalerie(article){
  const selectFenetreModaleGalerie = document.querySelector("#fenetre-modale-galerie");
  const miniGalerieEdition = document.createElement("div");
  miniGalerieEdition.classList.add("mini-galerie");
  selectFenetreModaleGalerie.appendChild(miniGalerieEdition);
  for (let i = 0; i < article.length; i++){
    const oeuvre = article[i];
    const oeuvreElement = document.createElement("article");
    oeuvreElement.dataset.id = article[i].id;
    const imageOeuvre = document.createElement("img");
    imageOeuvre.src = oeuvre.imageUrl;
    imageOeuvre.alt = oeuvre.title;
    oeuvreElement.appendChild(imageOeuvre);
    miniGalerieEdition.appendChild(oeuvreElement);
  }
} 



const bouttonModifierProjets = document.querySelector("#boutton-modifier-projets");
bouttonModifierProjets.addEventListener('click', ouvrirModale);

function ouvrirModale(){
  const modaleGalerie = document.querySelector("#modale-galerie");
  if (modaleGalerie.classList.contains("display-hidden")){
    modaleGalerie.classList.remove("display-hidden");
    modaleGalerie.classList.add("modale-galerie");
  }
}

const croixModaleGalerie = document.querySelector("#fermer-modale-galerie");
croixModaleGalerie.addEventListener('click', fermerModale);

const clicRacineModale = document.querySelector("#modale-galerie");
clicRacineModale.addEventListener("click", fermerModale);

const clicFenetreModale = document.querySelector("#fenetre-modale-galerie");
clicFenetreModale.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
})


function fermerModale(){
  const modaleGalerie = document.querySelector("#modale-galerie");
  modaleGalerie.classList.remove("modale-galerie");
  modaleGalerie.classList.add("display-hidden");
}

