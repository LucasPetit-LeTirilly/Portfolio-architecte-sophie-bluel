// Cette fonction regroupe toutes les actions de la page de login

function executionPageLogin() {
  const form = document.querySelector('#loginForm');

  form.addEventListener('submit', (x) => {
    x.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const donneesLogin = {
      "email": email,
      "password": password
    };

    // Si les informations rentrees ne sont pas correctes un message d'alerte previent l'utilisateur, si elles sont correctes
    // le token d'authentification est stocke dans le local storage et l'utilisateur est redirige vers la page principale, il est egalement
    // notifie que la connection a bien ete effectuee
    fetch('http://localhost:5678/api/users/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(donneesLogin),
    })
      .then(reponse => {
        if (reponse.status === 200) {
          reponse.json()
            .then((promesse) => {
              localStorage.setItem("userToken", JSON.stringify(promesse))
              alert("Vous êtes connectée en tant qu'administratrice");
            })

            .then(() => {
              location.href = "index.html";
            })
        }
        else {
          alert("Combinaison adresse e-mail et mot de passe incorrecte");
          return false
        }
      })
  })
}

executionPageLogin();
