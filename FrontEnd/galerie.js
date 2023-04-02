// Chargement des donnees de la galerie depuis l'API
const reponse = await fetch('http://localhost:5678/api/works');
const travaux = await reponse.json();

// Inspire depuis la fonction genererPiece du piece.js decouper cette fonction en plusieurs petites fonctions qui font chacunes
// une chose

  // Decoupage de la fonction generer piece utile dans notre cas:
    // - Cree une const attache a la section dans le html qui va acceullir les cartes/elements = 1 Fonction

    // - Cree une const (pieceElement) qui cree un article dans le html = 1 Fonction

    // - Cree des const (imageElement, nomElement etc) et leur attache la creation de balise html correspondante
    //    (img, h2, p etc) = grace a le fonction de la ligne en dessous, detecte le type d'input et cree une balise
    //   en consequence, fonction switch, regrouper cette fonction avec celle d'en dessous ?
        // Tentative de raccourci en ultilisant oeuvre.machin au lieu de creer une nouvelle variable et de lui attribuer 
        // a elle oeuvre.machin
    // Il faut ajouter des ID pour permettre les futures modifications

function creerBaliseFigure(oeuvre){
  return oeuvre = document.createElement("figure");
}

function creerBaliseImage(oeuvre){
  let oeuvreImage = document.createElement("img");
  oeuvreImage.src = oeuvre.imageURL;  
  oeuvreImage.alt = oeuvre.title;
  return oeuvreImage
}

function creerBaliseFigcaption(oeuvre.innerText){
  return oeuvre.innerText = document.createElement("figcaption");
}

    // - Attache les different elements des const objet de la ligne 1 (id, description, img etc) aux const attachees 
    //    aux balises html, a l'aide de .innerText, .src etc = 1 Fonction qui avec un switch ou un if 
    //    explore les differents cas de figure et repond en consequence, elle detecte la propriete de l'objet
    //    qui nous interesse et output en consequence

function creerOeuvreSrc(oeuvre){
  return  oeuvre.src = oeuvre.imageURL;
}

function creerOeuvreAlt(oeuvre){
  return  oeuvre.alt = oeuvre.title;
}

function creerOeuvreInnerText(oeuvre){
  return  oeuvre.innerText = oeuvre.title;
}

    // - Attache les const liees aux balise html (ligne 5) a la const de la ligne 3 qui represente la "carte" =
    //   1 fonction qui attache son input a la pieceElement
    // - Attache la const representant la carte a la const attachee a la section (ligne 2) = 1 fonction



// Appel des fonction definie juste au dessus pour charger la galerie des travaux


// Realisation de/des fonctions de filtres: