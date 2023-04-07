const reponseOeuvres = await fetch('http://localhost:5678/api/works');
const oeuvres = await reponseOeuvres.json();
const reponseCategories = await fetch('http://localhost:5678/api/categories');
const categoriesParDefaut = await reponseCategories.json();


function genererOeuvres(figure){
  const galerie = document.querySelector(".gallery");
  for (let i = 0; i < figure.length; i++){
    const oeuvre = figure[i];
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


const tousLesBouttons = document.querySelectorAll('button');

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

