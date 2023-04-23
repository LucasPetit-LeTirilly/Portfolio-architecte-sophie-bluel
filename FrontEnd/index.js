let oeuvres
let categories

async function recuperationDonnees(){
  oeuvres = await fetch('http://localhost:5678/api/works');
  oeuvres = await oeuvres.json();
  categories = await fetch('http://localhost:5678/api/categories');
  categories = await categories.json();
}

await recuperationDonnees();

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

function filtrageOeuvre(filtreId){
  const oeuvresFiltrees = oeuvres.filter(function(oeuvre){
    return oeuvre.category.id == filtreId;
  });
  document.querySelector(".gallery").innerHTML = "";
  genererOeuvres(oeuvresFiltrees);
};

function comportementFiltres(){
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
}

function genererBoutons(typeCategorie){
  const ensembleBoutons = document.querySelector(".section-filtre");
  const boutonTous = document.createElement('button');
  boutonTous.dataset.id = 0;
  boutonTous.innerText = "Tous";
  boutonTous.classList.add('filtre-clique');
  ensembleBoutons.appendChild(boutonTous);
  for (let i = 0; i < typeCategorie.length; i++){
    const filtre = typeCategorie[i];
    const boutonElement = document.createElement("button");
    boutonElement.dataset.id = filtre.id;
    boutonElement.innerText = filtre.name;
    boutonElement.classList.add('filtre-non-clique');
    ensembleBoutons.appendChild(boutonElement);
  }
  comportementFiltres();
}

genererBoutons(categories)

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
  const boutonRectangle = document.createElement('button');
  boutonRectangle.id = "bouton-publier-changement";
  boutonRectangle.innerText = "publier les changements";
  rectangleNoir.appendChild(iconeRectangle);
  rectangleNoir.appendChild(texteRectangle);
  rectangleNoir.appendChild(boutonRectangle);
  body.prepend(rectangleNoir);
}

function genereBouttonModifierPhotoProfil(){
  const portfolio = document.querySelector("#portfolio");
  const boutonPhoto = document.createElement("button");
  boutonPhoto.id = "bouton-modifier-photo-profil";
  boutonPhoto.classList.add("bouton-modifier-photo");
  const iconeBoutton = document.createElement("img");
  iconeBoutton.src = "assets/icons/iconeModifier.svg";
  iconeBoutton.alt = "icone modifier";
  const texteBoutton = document.createElement("p");
  texteBoutton.innerText = "modifier"
  boutonPhoto.appendChild(iconeBoutton);
  boutonPhoto.appendChild(texteBoutton);
  portfolio.parentNode.insertBefore(boutonPhoto, portfolio);
}


function comportementBoutonModifierProjets(bouton){
  bouton.addEventListener('click', () => {
    const verifSiFenetreEditionExiste = document.querySelector("#modale-galerie");
    if(verifSiFenetreEditionExiste == null){
      genererFenetreEditionGalerie(oeuvres);
    }
    ouvrirFenetre("#modale-galerie", "modale-galerie");
    });
}

function genererBouttonModifierProjets(){
  const sectionPortfolio = document.querySelector("#portfolio");
  const TitreEtBoutton = document.createElement("div");
  TitreEtBoutton.classList.add("titre-h2-et-bouton")
  const h2Portfolio = document.querySelector("#portfolio h2");
  const boutonProjets = document.createElement("button");
  boutonProjets.id = "bouton-modifier-projets";
  boutonProjets.classList.add("bouton-modifier-projets");
  const iconeBoutton = document.createElement("img");
  iconeBoutton.src = "assets/icons/iconeModifier.svg";
  iconeBoutton.alt = "icone modifier";
  const texteBoutton = document.createElement("p");
  texteBoutton.innerText = "modifier";
  boutonProjets.appendChild(iconeBoutton);
  boutonProjets.appendChild(texteBoutton);
  TitreEtBoutton.appendChild(h2Portfolio);
  TitreEtBoutton.appendChild(boutonProjets);
  sectionPortfolio.prepend(TitreEtBoutton);

  comportementBoutonModifierProjets(boutonProjets);
}

function genererEditMode() {
  genererRectangleNoir();
  genereBouttonModifierPhotoProfil();
  genererBouttonModifierProjets();
  const sectionFiltre = document.querySelector(".section-filtre");
  sectionFiltre.classList.add('display-hidden');
}

if (tokenId !== null && "undefined") {
  genererEditMode();
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

function comportementCroixModaleGalerie(){
  const croixModaleGalerie = document.querySelector("#fermer-fenetre-edition-galerie");
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
}

async function supprimerOeuvre(oeuvreCliquee){
  const idADelete = oeuvreCliquee.id.match(/(\d+)/);
  fetch("http://localhost:5678/api/works/"+idADelete[0], {
  method: "DELETE",
  headers: {
    'Authorization': 'Bearer ' + tokenId.token
    }
  })
  .then(() => {
    return recuperationDonnees();
  })
  .then(() => {
    const selectionGalerie = document.querySelector(".gallery")
    selectionGalerie.innerHTML = ""
    genererOeuvres(oeuvres);
    const selectionModaleGalerie = document.querySelector("#modale-galerie");
    selectionModaleGalerie.remove();
    genererFenetreEditionGalerie(oeuvres);
    ouvrirFenetre("#modale-galerie", "modale-galerie");
  })
}

async function comportementBoutonSuppression(){
  const tousLogosCorbeille = document.querySelectorAll(".logo-corbeille-mini-galerie");
    tousLogosCorbeille.forEach((e) => {
      e.addEventListener("click", (x) => {
        x.preventDefault();
        supprimerOeuvre(e)
      })
    })
}

let eventFermerFenetreAjoutPhotoExiste = false;
let eventRetourFenetreEditionExiste = false;

function comportementCroixEtFlecheFenetreAjoutPhoto(){
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
};

function comportementBoutonAjoutPhoto(){
  const boutonAjouterUnePhoto = document.querySelector("#bouton-ajouter-une-photo");
  boutonAjouterUnePhoto.addEventListener('click', () => {
    const verifSiFenetreAjoutPhotoExiste = document.querySelector("#modale-ajout-photo");
    if(verifSiFenetreAjoutPhotoExiste == null){
      genererFenetreAjoutPhoto();
      }
    fermerFenetre("#modale-galerie");
    ouvrirFenetre("#modale-ajout-photo", "modale-ajout-photo");
    comportementCroixEtFlecheFenetreAjoutPhoto();
  });
}

async function genererFenetreEditionGalerie(travaux){
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
  ajouterUnePhoto.classList.add("bouton-ajouter-une-photo");
  ajouterUnePhoto.id = "bouton-ajouter-une-photo";
  ajouterUnePhoto.innerText = "Ajouter une photo";
  const breakLine = document.createElement("br");
  const supprimerLaGalerie = document.createElement("button");
  supprimerLaGalerie.classList.add("supprimer-la-galerie");
  supprimerLaGalerie.id = "bouton-supprimer-la-galerie";
  supprimerLaGalerie.innerText = "Supprimer la galerie";
  fenetreEditionGalerie.appendChild(croix);
  fenetreEditionGalerie.appendChild(titreModale);
  genererMiniGalerie(travaux);
  fenetreEditionGalerie.appendChild(ajouterUnePhoto);
  fenetreEditionGalerie.appendChild(breakLine);
  fenetreEditionGalerie.appendChild(supprimerLaGalerie);

  comportementCroixModaleGalerie();
  comportementBoutonSuppression();
  comportementBoutonAjoutPhoto();
}

function submitPossible(image,titre,categorie,bouton){
  if(image != undefined && titre.value != "" && categorie.value != ""){
    bouton.classList.remove("bouton-valider-gris")
    bouton.classList.add("bouton-valider-vert");
  }
}

function actionsHtmlApresEnvoiOeuvre(photo,titre,categorie,labelPhoto){
  const selectionGalerie = document.querySelector(".gallery")
  selectionGalerie.innerHTML = "";
  genererOeuvres(oeuvres);
  fermerFenetre("#modale-ajout-photo");
  const selectionModaleGalerie = document.querySelector("#modale-galerie");
  selectionModaleGalerie.remove();
  genererFenetreEditionGalerie(oeuvres);
  ouvrirFenetre("#modale-galerie", "modale-galerie");
  photo.files = null;
  fermerFenetre("#preview-photo");
  titre.value = "";
  categorie.value = "";
  ouvrirFenetre("#image-no-photo","image-no-photo");
  ouvrirFenetre("#texte-ajouter-photo","texte-ajouter-photo");
  labelPhoto.classList.remove("display-hidden");
  labelPhoto.classList.add("label-ajout-photo");
  alert("L'image a bien été envoyée");
}

async function envoyerDonneesOeuvre(photo,titre,categorie,labelPhoto){
  const tailleImage = photo.files[0].size / 1024 / 1024;
    if (photo.files[0].name != undefined && tailleImage <= 4){
      let conversionCategorie = categorie.value
      for (let i = 0; i < categories.length; i++){
        const rechercheCategorie = categories[i];
        if (conversionCategorie === rechercheCategorie.name){
          conversionCategorie = Number(rechercheCategorie.id);
        }
      }
      let dataAEnvoyer = new FormData();
      dataAEnvoyer.append("image", photo.files[0]);
      dataAEnvoyer.append("title", titre.value);
      dataAEnvoyer.append("category", conversionCategorie);

      fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          'Authorization': 'Bearer ' + tokenId.token
        },
        body: dataAEnvoyer
      })
      .then(() => {
        return recuperationDonnees();
      })
      .then(() => {
        actionsHtmlApresEnvoiOeuvre(photo,titre,categorie,labelPhoto);
      })
    }
    
    else{
      alert("Veuillez choisir une image de 4mo maximum");
    }
}

function comportementElementsFenetreAjoutPhoto(photo,titre,categorie,preview,bouton,form,label){
  photo.addEventListener("input", () => {
    fermerFenetre("#image-no-photo");
    fermerFenetre("#texte-ajouter-photo");
    fermerFenetre(".label-ajout-photo");

    preview.src = URL.createObjectURL(photo.files[0]);
    ouvrirFenetre("#preview-photo", "preview-photo");
    submitPossible(photo.files[0].name,titre,categorie,bouton);
  });
  preview.addEventListener("click", () => {
    photo.click();
  });

  titre.addEventListener("input", () => {
    submitPossible(photo.files[0].name,titre,categorie,bouton);
    if(titre.value == ""){
      bouton.classList.remove("bouton-valider-vert");
      bouton.classList.add("bouton-valider-gris");
    }
  });

  categorie.addEventListener("input", () => {
    submitPossible(photo.files[0].name,titre,categorie,bouton);
  });           

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    envoyerDonneesOeuvre(photo,titre,categorie,label);
  })
}


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
  divAjoutPhoto.classList.add("div-ajout-photo");
  const imageNoPhoto = document.createElement("img");
  imageNoPhoto.id = "image-no-photo";
  imageNoPhoto.classList.add("image-no-photo");
  imageNoPhoto.src = "assets/icons/placeholder-image.svg";
  imageNoPhoto.alt = "Pas de photo";
  const texteAjouterPhoto = document.createElement("p");
  texteAjouterPhoto.id = "texte-ajouter-photo";
  texteAjouterPhoto.classList.add("texte-ajouter-photo");
  texteAjouterPhoto.innerHTML = "jpg, png : 4mo max";
  const previewPhoto = document.createElement("img");
  previewPhoto.id = "preview-photo";
  previewPhoto.alt ="Previsualisation de l'image";
  previewPhoto.classList.add("display-hidden");
  const formAjoutPhoto = document.createElement("form");
  formAjoutPhoto.id = "form-ajout-photo";
  const labelAjoutPhoto = document.createElement("label");
  labelAjoutPhoto.id = "label-ajout-photo";
  labelAjoutPhoto.classList.add("label-ajout-photo");
  labelAjoutPhoto.htmlFor = "bouton-selection-photo";
  labelAjoutPhoto.innerText = "+ Ajout photo";
  const ajoutPhoto = document.createElement("input");
  ajoutPhoto.type = "file";
  ajoutPhoto.id = "bouton-selection-photo";
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
  const boutonValider = document.createElement("input");
  boutonValider.type = "submit";
  boutonValider.id = "bouton-valider-ajout-photo";
  boutonValider.classList.add("bouton-valider-gris");
  boutonValider.value = "Valider";
  divFlecheCroix.appendChild(fleche);
  divFlecheCroix.appendChild(croix);
  fenetreAjoutPhoto.appendChild(divFlecheCroix);
  fenetreAjoutPhoto.appendChild(titreModale);
  divAjoutPhoto.appendChild(imageNoPhoto);
  divAjoutPhoto.appendChild(labelAjoutPhoto);
  divAjoutPhoto.appendChild(ajoutPhoto);
  divAjoutPhoto.appendChild(texteAjouterPhoto);
  divAjoutPhoto.appendChild(previewPhoto);
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
  formAjoutPhoto.appendChild(boutonValider);
  fenetreAjoutPhoto.appendChild(formAjoutPhoto);

  comportementElementsFenetreAjoutPhoto(ajoutPhoto,inputTitre,selectCategorie,previewPhoto,boutonValider,formAjoutPhoto,labelAjoutPhoto);
}

