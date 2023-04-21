
// A les fetchs des data a mettre sous forme de fonction pour les reappeller dans les fonctions qui edit les oeuvres presentent

let reponseOeuvres = await fetch('http://localhost:5678/api/works');
let oeuvres = await reponseOeuvres.json();
let reponseCategories = await fetch('http://localhost:5678/api/categories');
let categoriesParDefaut = await reponseCategories.json();


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



function genererBoutons(typeCategorie){
  const ensembleBoutons = document.querySelector(".section-filtre");
  const bouttonTous = document.createElement('button');
  bouttonTous.dataset.id = 0;
  bouttonTous.innerText = "Tous";
  bouttonTous.classList.add('filtre-clique');
  ensembleBoutons.appendChild(bouttonTous);
  for (let i = 0; i < typeCategorie.length; i++){
    const filtre = typeCategorie[i];
    const bouttonElement = document.createElement("button");
    bouttonElement.dataset.id = filtre.id;
    bouttonElement.innerText = filtre.name;
    bouttonElement.classList.add('filtre-non-clique');
    ensembleBoutons.appendChild(bouttonElement);
  }
}

genererBoutons(categoriesParDefaut)


const tousLesBoutons = document.querySelectorAll('.section-filtre button');

tousLesBoutons.forEach((ceBoutton) => ceBoutton.addEventListener('click', (e) => {
  tousLesBoutons.forEach((x) => x.classList.remove('filtre-clique'));
  tousLesBoutons.forEach((x) => x.classList.add('filtre-non-clique'));
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

function genererEditMode() {
  genererRectangleNoir();
  genereBouttonModifierPhotoProfil();
  genererBouttonModifierProjets();
  const sectionFiltre = document.querySelector(".section-filtre");
  sectionFiltre.classList.add('display-hidden');
}

if (tokenId.token !== null && "undefined") {
  genererEditMode();
}


function genererFenetreEditionGalerie(oeuvres){
  const body = document.querySelector("body");
  const modaleEditionGalerie = document.createElement("aside");
  modaleEditionGalerie.id = "modale-galerie";
  modaleEditionGalerie.classList.add("display-hidden");
  const fenetreEditionGalerie = document.createElement("div");
  fenetreEditionGalerie.id = "fenetre-edition-galerie";
  fenetreEditionGalerie.classList.add("fenetre-edition-galerie");
  modaleEditionGalerie.appendChild(fenetreEditionGalerie);
  body.appendChild(modaleEditionGalerie);
  const croix = document.createElement("img");
  croix.id = "fermer-fenetre-edition-galerie";
  croix.src = "assets/icons/croix.svg";
  croix.alt = "Fermer la fenêtre";
  const titreModale = document.createElement("h2");
  titreModale.innerText = "Galerie Photo";
  const ajouterUnePhoto = document.createElement("button");
  ajouterUnePhoto.classList.add("boutton-ajouter-une-photo");
  ajouterUnePhoto.id = "boutton-ajouter-une-photo";
  ajouterUnePhoto.innerText = "Ajouter une photo";
  const breakLine = document.createElement("br");
  const supprimerLaGalerie = document.createElement("button");
  supprimerLaGalerie.classList.add("supprimer-la-galerie");
  supprimerLaGalerie.id = "boutton-supprimer-la-galerie";
  supprimerLaGalerie.innerText = "Supprimer la galerie";
  fenetreEditionGalerie.appendChild(croix);
  fenetreEditionGalerie.appendChild(titreModale);
  genererMiniGalerie(oeuvres);
  fenetreEditionGalerie.appendChild(ajouterUnePhoto);
  fenetreEditionGalerie.appendChild(breakLine);
  fenetreEditionGalerie.appendChild(supprimerLaGalerie);
}

function genererMiniGalerie(article){
  const selectFenetreModaleGalerie = document.querySelector("#fenetre-edition-galerie");
  const miniGalerieEdition = document.createElement("div");
  miniGalerieEdition.classList.add("mini-galerie");
  selectFenetreModaleGalerie.appendChild(miniGalerieEdition);
  for (let i = 0; i < article.length; i++){
    const oeuvre = article[i];
    const oeuvreElement = document.createElement("article");
    oeuvreElement.dataset.id = article[i].id;
    oeuvreElement.classList.add("article-mini-galerie");
    const conteneurImageEtLogo = document.createElement("div");
    conteneurImageEtLogo.classList.add("conteneur-image-et-logo");
    const imageOeuvre = document.createElement("img");
    imageOeuvre.classList.add("image-oeuvre-mini-galerie");
    imageOeuvre.src = oeuvre.imageUrl;
    imageOeuvre.alt = oeuvre.title;
    const logoCorbeille = document.createElement("img");
    logoCorbeille.classList.add("logo-corbeille-mini-galerie");
    logoCorbeille.id = `supprimerOeuvre${article[i].id}`;
    logoCorbeille.src = "assets/icons/logo-corbeille.svg";
    logoCorbeille.alt = "Logo de corbeille";
    
    if (oeuvreElement.dataset.id === "1"){
      const logoDeplacer = document.createElement("img")
      logoDeplacer.classList.add("logo-deplacer");
      logoDeplacer.src = "assets/icons/fleche-deplacement.svg"
      logoDeplacer.alt = "Logo des flèches de déplacement"
      conteneurImageEtLogo.appendChild(logoDeplacer);
    };
    
    const textOeuvre = document.createElement("p");
    textOeuvre.innerText = "éditer";
    conteneurImageEtLogo.appendChild(imageOeuvre);
    conteneurImageEtLogo.appendChild(logoCorbeille);
    oeuvreElement.appendChild(conteneurImageEtLogo)
    oeuvreElement.appendChild(textOeuvre);
    miniGalerieEdition.appendChild(oeuvreElement);
  }
} 


function ouvrirFenetre(idDeLaFenetre, classeDeLaFenetre){
  const fenetreAOuvrir = document.querySelector(idDeLaFenetre);
  if (fenetreAOuvrir.classList.contains("display-hidden")){
    fenetreAOuvrir.classList.remove("display-hidden");
    fenetreAOuvrir.classList.add(classeDeLaFenetre);
  }
}

function fermerFenetre(idDeLaFenetre){
  const fenetreAFermer = document.querySelector(idDeLaFenetre);
  fenetreAFermer.className = "";
  fenetreAFermer.classList.add("display-hidden");
}

let fenetreEditionGalerieExiste = false;
let eventFermerFenetreEditionExiste = false;
let eventFermerFenetreAjoutPhotoExiste = false;
let eventRetourFenetreEditionExiste = false;
let eventValiderAjoutPhotoExiste = false;

const bouttonModifierProjets = document.querySelector("#boutton-modifier-projets");
bouttonModifierProjets.addEventListener('click', () => {
  const verifSiFenetreEditionExiste = document.querySelector("#modale-galerie");
  if(verifSiFenetreEditionExiste == null){
    genererFenetreEditionGalerie(oeuvres);
    const tousLogosCorbeille = document.querySelectorAll(".logo-corbeille-mini-galerie");
    tousLogosCorbeille.forEach((e) => {
      e.addEventListener("click", (x) => {
        x.preventDefault();
        const idADelete = e.id.match(/(\d+)/);
        fetch("http://localhost:5678/api/works/"+idADelete[0], {
        method: "DELETE",
        headers: {
          'Authorization': 'Bearer ' + tokenId.token
         }
        })
        .then(response => console.log(response))
      })
    })
  }
  ouvrirFenetre("#modale-galerie", "modale-galerie");
  
  const croixModaleGalerie = document.querySelector("#fermer-fenetre-edition-galerie");
  
  if(!eventFermerFenetreEditionExiste){
    croixModaleGalerie.addEventListener('click', () => {
      fermerFenetre("#modale-galerie")}
      );
    const clicRacineFenetre = document.querySelector("#modale-galerie");
    clicRacineFenetre.addEventListener("click", () => {
      fermerFenetre("#modale-galerie");
    });
    
    const clicFenetreModale = document.querySelector("#fenetre-edition-galerie");
    clicFenetreModale.addEventListener("click", (e) => {
      e.stopPropagation();
      e.stopImmediatePropagation();
    })
    eventFermerFenetreEditionExiste = true;
  }


  const bouttonAjouterUnePhoto = document.querySelector("#boutton-ajouter-une-photo");
  bouttonAjouterUnePhoto.addEventListener('click', () => {
    const verifSiFenetreAjoutPhotoExiste = document.querySelector("#modale-ajout-photo");
    if(verifSiFenetreAjoutPhotoExiste == null){
      genererFenetreAjoutPhoto();




      // faire en sorte que l'image du fichier s'affiche quand on l'upload

   
      const formAjoutPhoto = document.querySelector("#form-ajout-photo")
      const imageChoisie = document.querySelector("#boutton-selection-photo")
      const titreChoisi = document.querySelector("#titre-oeuvre")
      const categorieChoisie = document.querySelector("#categorie-oeuvre");
      formAjoutPhoto.addEventListener("submit", (e) => {
        e.preventDefault();
        const tailleImage = imageChoisie.files[0].size / 1024 / 1024;
        if (imageChoisie.files[0].name != undefined && tailleImage <= 4){
          let conversionCategorie = categorieChoisie.value
          for (let i = 0; i < categoriesParDefaut.length; i++){
            const rechercheCategorie = categoriesParDefaut[i];
            if (conversionCategorie === rechercheCategorie.name){
              conversionCategorie = Number(rechercheCategorie.id);
            }
          }
          let dataAEnvoyer = new FormData();
          dataAEnvoyer.append("image", imageChoisie.files[0]);
          dataAEnvoyer.append("title", titreChoisi.value);
          dataAEnvoyer.append("category", conversionCategorie);

          fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
              'Authorization': 'Bearer ' + tokenId.token
            },
            body: dataAEnvoyer
          })
          // .then(() => {
          //   reponseOeuvres = fetch('http://localhost:5678/api/works')
          //   .then((oeuvres) => {
          //     return oeuvres = reponseOeuvres.json()}
          //     )
            // reponseCategories = fetch('http://localhost:5678/api/categories');
            // categoriesParDefaut = reponseCategories.json(); 
            // })
          .then(() => {
            console.log("hello");
            fermerFenetre("#modale-ajout-photo");
            const selectionModaleGalerie = document.querySelector("#modale-galerie");
            selectionModaleGalerie.remove();
            genererFenetreEditionGalerie(oeuvres);
            ouvrirFenetre("#modale-galerie", "modale-galerie");
          })
        }
        else{
          alert("Veuillez choisir une image de 4mo maximum");
        }
      })
        // faire passer le boutton valider en vert si tous les element sont presents
        
    }
    fermerFenetre("#modale-galerie");
    ouvrirFenetre("#modale-ajout-photo", "modale-ajout-photo");

    const croixFenetreAjoutPhoto = document.querySelector("#fermer-fenetre-ajout-photo");

    if(!eventFermerFenetreAjoutPhotoExiste){
      croixFenetreAjoutPhoto.addEventListener('click', () => {
        fermerFenetre("#modale-ajout-photo")}
        );
      const clicRacineFenetre = document.querySelector("#modale-ajout-photo");
      clicRacineFenetre.addEventListener("click", () => {
        fermerFenetre("#modale-ajout-photo");
      });
      
      const clicFenetreModale = document.querySelector("#fenetre-ajout-photo");
      clicFenetreModale.addEventListener("click", (e) => {
        e.stopPropagation();
        e.stopImmediatePropagation();
      })
      eventFermerFenetreAjoutPhotoExiste = true;
    }

    const flecheFenetreAjoutPhoto = document.querySelector("#retour-a-fenetre-edition");
    if(!eventRetourFenetreEditionExiste){
      flecheFenetreAjoutPhoto.addEventListener("click", () => {
        fermerFenetre("#modale-ajout-photo");
        ouvrirFenetre("#modale-galerie", "modale-galerie");
        })
      eventRetourFenetreEditionExiste = true;
    }

  });
});


function genererFenetreAjoutPhoto(){
  const body = document.querySelector("body");
  const modaleAjoutPhoto = document.createElement("aside");
  modaleAjoutPhoto.id = "modale-ajout-photo";
  modaleAjoutPhoto.classList.add("display-hidden");
  const fenetreAjoutPhoto = document.createElement("div");
  fenetreAjoutPhoto.id = "fenetre-ajout-photo";
  fenetreAjoutPhoto.classList.add("fenetre-ajout-photo");
  modaleAjoutPhoto.appendChild(fenetreAjoutPhoto);
  body.appendChild(modaleAjoutPhoto);
  const divFlecheCroix = document.createElement("div");
  divFlecheCroix.classList.add("div-fleche-croix");
  const fleche = document.createElement("img");
  fleche.id = "retour-a-fenetre-edition";
  fleche.src = "assets/icons/fleche.svg";
  fleche.alt = "Retour à la fenêtre d'édition";
  const croix = document.createElement("img");
  croix.id = "fermer-fenetre-ajout-photo";
  croix.src = "assets/icons/croix.svg";
  croix.alt = "Fermer la fenêtre";
  const titreModale = document.createElement("h2");
  titreModale.innerText = "Ajout Photo";
  const divAjoutPhoto = document.createElement("div");
  divAjoutPhoto.classList.add("divAjoutPhoto");
  const imageNoPhoto = document.createElement("img");
  imageNoPhoto.id = "image-no-photo";
  imageNoPhoto.src = "assets/icons/placeholder-image.svg";
  imageNoPhoto.alt = "Pas de photo";
  const texteAjouterPhoto = document.createElement("p");
  texteAjouterPhoto.innerHTML = "jpg, png : 4mo max";
  const formAjoutPhoto = document.createElement("form");
  formAjoutPhoto.id = "form-ajout-photo";
  const labelAjoutPhoto = document.createElement("label");
  labelAjoutPhoto.classList.add("label-ajout-photo");
  labelAjoutPhoto.htmlFor = "boutton-selection-photo";
  labelAjoutPhoto.innerText = "+ Ajout photo";
  const ajoutPhoto = document.createElement("input");
  ajoutPhoto.type = "file";
  ajoutPhoto.id = "boutton-selection-photo";
  ajoutPhoto.name = "image";
  ajoutPhoto.accept = "image/png, image/jpg";
  const labelTitre = document.createElement("label");
  labelTitre.htmlFor = "titre-oeuvre";
  labelTitre.innerText = "Titre";
  const inputTitre = document.createElement("input");
  inputTitre.type = "text";
  inputTitre.id = "titre-oeuvre";
  inputTitre.name = "title";
  inputTitre.required = true;
  const labelCategorie = document.createElement("label");
  labelCategorie.htmlFor = "categorie-oeuvre";
  labelCategorie.innerText = "Catégorie";
  const selectCategorie = document.createElement("select");
  selectCategorie.name = "category";
  selectCategorie.id = "categorie-oeuvre";
  selectCategorie.required = true;
  const categorieBlank = document.createElement("option");
  categorieBlank.hidden = true;
  categorieBlank.disabled = true;
  categorieBlank.selected = true;
  const categorieObjets = document.createElement("option");
  categorieObjets.value = "Objets";
  categorieObjets.innerText = categorieObjets.value;
  const categorieAppartements = document.createElement("option");
  categorieAppartements.value = "Appartements";
  categorieAppartements.innerText = categorieAppartements.value;
  const categorieHotelRestaurant = document.createElement("option");
  categorieHotelRestaurant.value = "Hotels & restaurants";
  categorieHotelRestaurant.innerText = categorieHotelRestaurant.value;
  const ligneGrise = document.createElement("div");
  ligneGrise.classList.add("ligne-grise");
  const bouttonValider = document.createElement("input");
  bouttonValider.type = "submit";
  bouttonValider.id = "boutton-valider-ajout-photo";
  bouttonValider.value = "Valider";
  divFlecheCroix.appendChild(fleche);
  divFlecheCroix.appendChild(croix);
  fenetreAjoutPhoto.appendChild(divFlecheCroix);
  fenetreAjoutPhoto.appendChild(titreModale);
  divAjoutPhoto.appendChild(imageNoPhoto);
  divAjoutPhoto.appendChild(labelAjoutPhoto);
  divAjoutPhoto.appendChild(ajoutPhoto);
  divAjoutPhoto.appendChild(texteAjouterPhoto);
  formAjoutPhoto.appendChild(divAjoutPhoto);
  formAjoutPhoto.appendChild(labelTitre);
  formAjoutPhoto.appendChild(inputTitre);
  formAjoutPhoto.appendChild(labelCategorie);
  selectCategorie.appendChild(categorieBlank);
  selectCategorie.appendChild(categorieObjets);
  selectCategorie.appendChild(categorieAppartements);
  selectCategorie.appendChild(categorieHotelRestaurant);
  formAjoutPhoto.appendChild(selectCategorie);
  formAjoutPhoto.appendChild(ligneGrise);
  formAjoutPhoto.appendChild(bouttonValider);
  fenetreAjoutPhoto.appendChild(formAjoutPhoto);
}

