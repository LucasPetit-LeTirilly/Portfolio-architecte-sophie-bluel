let tokenId = localStorage.getItem("userToken");
tokenId = JSON.parse(tokenId);


if (tokenId.token !== null && "undefined") {
  genererEditMode();
  // faire la modale

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
  body.prepend(rectangleNoir);
  const iconeRectangle = document.createElement('img');
  iconeRectangle.src = "assets/icons/iconeModifier.svg";
  iconeRectangle.alt = "icone modifier";
  rectangleNoir.appendChild(iconeRectangle);
  const texteRectangle = document.createElement('p');
  texteRectangle.innerText = "Mode édition";
  rectangleNoir.appendChild(texteRectangle);
  const bouttonRectangle = document.createElement('button');
  bouttonRectangle.id = "boutton-publier-changement";
  bouttonRectangle.innerText = "publier les changements";
  rectangleNoir.appendChild(bouttonRectangle);
}

function genereBouttonModifierPhotoProfil(){
  const portfolio = document.querySelector("#portfolio");
  const bouttonPhoto = document.createElement("button");
  bouttonPhoto.id = "boutton-modifier-photo-profil";
  bouttonPhoto.classList.add("boutton-modifier-photo");
  portfolio.parentNode.insertBefore(bouttonPhoto, portfolio);
  const iconeBoutton = document.createElement("img");
  iconeBoutton.src = "assets/icons/iconeModifier.svg";
  iconeBoutton.alt = "icone modifier";
  bouttonPhoto.appendChild(iconeBoutton);
  const texteBoutton = document.createElement("p");
  texteBoutton.innerText = "modifier"
  bouttonPhoto.appendChild(texteBoutton);
}

function genererBouttonModifierProjets(){
  const sectionPortfolio = document.querySelector("#portfolio");
  const TitreEtBoutton = document.createElement("div");
  TitreEtBoutton.classList.add("titre-h2-et-boutton")
  sectionPortfolio.prepend(TitreEtBoutton);
  const h2Portfolio = document.querySelector("#portfolio h2");
  TitreEtBoutton.appendChild(h2Portfolio);
  const bouttonProjets = document.createElement("button");
  bouttonProjets.id = "boutton-modifier-projets";
  bouttonProjets.classList.add("boutton-modifier-projets");
  TitreEtBoutton.appendChild(bouttonProjets);
  const iconeBoutton = document.createElement("img");
  iconeBoutton.src = "assets/icons/iconeModifier.svg";
  iconeBoutton.alt = "icone modifier";
  bouttonProjets.appendChild(iconeBoutton);
  const texteBoutton = document.createElement("p");
  texteBoutton.innerText = "modifier"
  bouttonProjets.appendChild(texteBoutton);
}
