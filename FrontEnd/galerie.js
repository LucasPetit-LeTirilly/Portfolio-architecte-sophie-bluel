
const reponse = await fetch('http://localhost:5678/api/works');
const oeuvres = await reponse.json();


// function creerBaliseFigure(oeuvre, galerie){
//   let oeuvreId = document.createElement("figure");
//   oeuvreId = oeuvre.id
//   galerie.appendChild(oeuvre)
//   return oeuvre;
// }

// function creerBaliseImage(oeuvre){
//   let oeuvreImage = document.createElement("img");
//   oeuvreImage.src = oeuvre.imageURL;  
//   oeuvreImage.alt = oeuvre.title;
//   oeuvre.appendChild(oeuvreImage);
//   return oeuvre;
// }

// function creerBaliseFigcaption(oeuvre){
//   let oeuvreText = document.createElement("figcaption");
//   oeuvreText.innerText = oeuvre.title;
//   oeuvre.appendChild(oeuvreText);
//   return oeuvre;
// }


// Appel des fonction definie juste au dessus pour charger la galerie des travaux
// function genererGalerie(oeuvres){
//   const galerie = document.querySelector(".gallery");
//   for (let i = 0; i < oeuvres.length; i++){
//     const oeuvre = oeuvres[i];
//     creerBaliseFigure(oeuvre);
//     creerBaliseImage(oeuvre);
//     creerBaliseFigcaption(oeuvre);
//   }
//   return galerie;
// }


// genererGalerie(oeuvres);


// console.log(oeuvres)

// Realisation de/des fonctions de filtres:

function genererOeuvres(oeuvres){
  for (let i = 0; i < oeuvres.length; i++){
    const oeuvre = oeuvres[i];
    const galerie = document.querySelector(".gallery");
    const oeuvreElement = document.createElement("figure");
    oeuvreElement.dataset.id = oeuvres[i].id
    const imageOeuvre = document.createElement("img");
    imageOeuvre.src = oeuvre.imageUrl;
    imageOeuvre.alt = oeuvre.title;
    const titreOeuvre = document.createElement("figcaption");
    titreOeuvre.innerText = oeuvre.title;
    galerie.appendChild(oeuvreElement);
    oeuvreElement.appendChild(imageOeuvre);
    oeuvreElement.appendChild(titreOeuvre);
  }
}

genererOeuvres(oeuvres);


