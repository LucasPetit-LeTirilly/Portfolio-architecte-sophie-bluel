const form = document.querySelector('#loginForm');


form.addEventListener('submit', x => {
  x.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const donneesLogin = {
    "email": email,
    "password": password
  };

  const charge = new URLSearchParams(donneesLogin);
  
  fetch('http://localhost:5678/api/users/login', {
    method: "POST",
    body: charge
  })
  .then(reponse => reponse.json())
  .then((reponse) => {
    const IdToken = reponse;
  })
})

// Verifier que le token peut etre accessible une apres le click du bouton (en variable globale ???)
// En cas de connection ressuie, rediriger l'utilisateur vers la page d'acceuil
// Afficher un message d'erreur si la combinaison mot de passe et mail n'est pas bonne

