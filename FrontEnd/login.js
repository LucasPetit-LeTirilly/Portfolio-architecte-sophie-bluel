const form = document.querySelector('#loginForm');

form.addEventListener('submit', (x) => {
  x.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const donneesLogin = {
    "email": email,
    "password": password
  };
  
  fetch('http://localhost:5678/api/users/login', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(donneesLogin),
  })
  .then(reponse => {
    if (reponse.status === 200) {
      const tokenId = reponse.json();
      return tokenId;
    }
    else {
      alert("Combinaison adresse e-mail et mot de passe incorrecte");
      return false
    }
  })
  .then((tokenId) => {
    if (tokenId !== false) {
      localStorage.setItem("userToken", JSON.stringify(tokenId));
      alert("Vous êtes connectée en tant qu'administratrice");
      location.href = "index.html";
    }
  })
})

