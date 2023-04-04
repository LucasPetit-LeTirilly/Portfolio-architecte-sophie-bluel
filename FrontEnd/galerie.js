
const reponse = await fetch('http://localhost:5678/api/works');
const oeuvres = await reponse.json();

// Applique de l'effet filtre clique, a ameliorer

function activerEffetClique(boutton){
  if (document.querySelector('.filtre-non-clique')) {
    
    allFiltres.classList.add('filtre-non-clique');
    // filtreTous.classList.add('filtre-non-clique');
    // filtreObjets.classList.add('filtre-non-clique');
    // filtreAppartements.classList.add('filtre-non-clique');
    // filtreHotelsEtRestaurants.classList.add('filtre-non-clique');
    boutton.classList.remove('filtre-non-clique');
    allFiltres.classList.remove('filtre-clique');
    // filtreTous.classList.remove('filtre-clique');
    // filtreObjets.classList.remove('filtre-clique');
    // filtreAppartements.classList.remove('filtre-clique');
    // filtreHotelsEtRestaurants.classList.remove('filtre-clique');
    boutton.classList.add('filtre-clique');
  }
}

const allFiltres = document.querySelectorAll(".boutton-filtre");


const filtreTous = document.querySelector("#tous");
filtreTous.addEventListener('click', () => {
  activerEffetClique(filtreTous);
  filtrageGallerie(filtreTous);
});
const filtreObjets = document.querySelector("#objets");
filtreObjets.addEventListener('click', () => {
  activerEffetClique(filtreObjets);
  filtrageGallerie(filtreObjets);
});
const filtreAppartements = document.querySelector("#appartements");
filtreAppartements.addEventListener('click', () => {
  activerEffetClique(filtreAppartements);
  filtrageGallerie(filtreAppartements);
});
const filtreHotelsEtRestaurants = document.querySelector("#hotels-et-restaurants");
filtreHotelsEtRestaurants.addEventListener('click', () => {
  activerEffetClique(filtreHotelsEtRestaurants);
  filtrageGallerie(filtreHotelsEtRestaurants);
});



function genererOeuvres(figure){
  for (let i = 0; i < figure.length; i++){
    const oeuvre = figure[i];
    const galerie = document.querySelector(".gallery");
    const oeuvreElement = document.createElement("figure");
    oeuvreElement.dataset.id = figure[i].id
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

genererOeuvres(oeuvres)


function filtrageGallerie(filtre){
  if (filtre === filtreTous){
      document.querySelector(".gallery").innerHTML = "";
      genererOeuvres(oeuvres);
  } 
  else if (filtre === filtreObjets) {
      filtrageOeuvre("Objets");
  }

  else if (filtre === filtreAppartements) {
    filtrageOeuvre("Appartements");
  }

  else if (filtre === filtreHotelsEtRestaurants) {
    filtrageOeuvre("Hotels & restaurants");
  }
}

function filtrageOeuvre(categorie){
  const oeuvresFiltrees = oeuvres.filter(function(oeuvre){
    return oeuvre.category.name === categorie;
  });
  document.querySelector(".gallery").innerHTML = "";
  genererOeuvres(oeuvresFiltrees);
};

