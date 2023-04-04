
const reponse = await fetch('http://localhost:5678/api/works');
const oeuvres = await reponse.json();


const allFiltres = document.querySelectorAll(".boutton-filtre");
const filtreTous = document.querySelector("#tous");
const filtreObjets = document.querySelector("#objets");
const filtreAppartements = document.querySelector("#appartements");
const filtreHotelsEtRestaurants = document.querySelector("#hotels-et-restaurants");

function activerEffetClique(boutton){
  if (document.querySelector('.filtre-non-clique')) {
    allFiltres.forEach((filtre) => {
      filtre.classList.add('filtre-non-clique');
    });
    boutton.classList.remove('filtre-non-clique');
    allFiltres.forEach((filtre) => {
      filtre.classList.remove('filtre-clique');
    });
    boutton.classList.add('filtre-clique');
  }
}


filtreTous.addEventListener('click', () => {
  activerEffetClique(filtreTous);
  filtrageGallerie(filtreTous);
});

filtreObjets.addEventListener('click', () => {
  activerEffetClique(filtreObjets);
  filtrageGallerie(filtreObjets);
});

filtreAppartements.addEventListener('click', () => {
  activerEffetClique(filtreAppartements);
  filtrageGallerie(filtreAppartements);
});

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
  switch (filtre) {
    case filtreTous: 
      document.querySelector(".gallery").innerHTML = "";
      genererOeuvres(oeuvres);
    break;
    case filtreObjets:
      filtrageOeuvre("Objets");
    break;
    case filtreAppartements:
      filtrageOeuvre("Appartements");
    break;
    case filtreHotelsEtRestaurants:
      filtrageOeuvre("Hotels & restaurants");
    break;
  }
}

function filtrageOeuvre(categorie){
  const oeuvresFiltrees = oeuvres.filter(function(oeuvre){
    return oeuvre.category.name === categorie;
  });
  document.querySelector(".gallery").innerHTML = "";
  genererOeuvres(oeuvresFiltrees);
};

