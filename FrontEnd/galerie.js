// Chargement des donnees de la galerie depuis l'API
const reponse = await fetch('http://localhost:5678/api/works');
const travaux = await reponse.json();

// Fonction qui permet de generer les travaux en balise html et les attacher aux balise
// Avec une boucle for ou uniquement des fonctions ?
// Dans la fonction il faut creer une section generale dans laquelle on ratachera chaque figure (qui corespond a un travail),
// cette fonction generale sera elle-meme rattachee a la div gallery du html





// Appel de le fonction defini juste au dessus pour charger la galerie des travaux