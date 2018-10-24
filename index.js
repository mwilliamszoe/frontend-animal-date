let currentUserId;
document.addEventListener("DOMContentLoaded", () => {
  let currentPetId;
  getData();
  addUserForm();
  // userForm = document.getElementById("new-user");
  // userForm.addEventListener("submit", e => {
  //   e.preventDefault();
  // });

  document.addEventListener("click", e => {
    e.preventDefault();
    if (event.target.dataset.name == "usersubmit") {
      newUserName = document.getElementById("new-user").childNodes[3].value;
      data = {
        name: newUserName
      };
      newUser(data);
      document.getElementById("mainbody").innerHTML += "";
    } else if (event.target.dataset.name == "homePage") {
      userid = event.target.dataset.id;
      currentUserId = userid;
      document.getElementById("userform").innerHTML = "";
      document.getElementById("pets").innerHTML = "";
      homePage(userid);
    } else if (event.target.dataset.name == "logout") {
      addUserForm();
      document.getElementById("petsform").innerHTML = "";
      document.getElementById("all-users").innerHTML = "";
      document.getElementById("pets").innerHTML = "";
      getData();
    } else if (event.target.dataset.name == "petsubmit") {
      id = event.target.parentElement.childNodes[1].childNodes[13].value;
      document.getElementById("petsform").innerHTML = "";
      document.getElementById("pets").innerHTML = "";
      newPet(id);
    } else if (event.target.dataset.name == "profile") {
      document.getElementById("pets").innerHTML = "";
      currentPetId = event.target.dataset.id;
      getPetProfile(currentPetId);
    } else if (event.target.dataset.name == "back") {
      document.getElementById("pets").innerHTML = "";
      document.getElementById("petsform").innerHTML = "";
      document.getElementById("matchpets").innerHTML = "";
      homePage(userid);
    } else if (event.target.dataset.name == "match") {
      document.getElementById("matchpets").innerHTML = "";
      id = event.target.dataset.id;
      getAllPets(id);
    } else if (event.target.dataset.name == `matchprofile`) {
      id = event.target.dataset.id;
      document.getElementById("matchpets").innerHTML = "";
      getSampleProfile(id);
    } else if (event.target.dataset.name == `matchedprofiles`) {
      id = event.target.dataset.id;
      document.getElementById("matchpets").innerHTML = "";
      getMatches(currentPetId);
    } else if (event.target.dataset.name == `like`) {
      document.getElementById("matchpets").innerHTML = "";
      id = event.target.dataset.id;
      getPetProfile(id);
      updateLike(
        event.target.dataset.likes,
        event.target.dataset.id,
        currentPetId
      );
    } else if (event.target.dataset.name == "delete") {
      id = event.target.dataset.id;
      deleteUser(id);
      document.getElementById("weird").innerHTML += "";
    }
  });
});

// ----------------------------------------------------------------------

function deleteUser(id) {
  return fetch(`http://localhost:3000/users/${id}`, {
    method: "DELETE"
  });
}
// ----------------------------------------------------------------------

function getSampleProfile(id) {
  fetch(`http://localhost:3000/pets/${id}`)
    .then(response => response.json())
    .then(resp => sampleProfile(resp.pet, id))
    .catch(err => console.log(err));
}
function sampleProfile(pet, id) {
  if (pet.id == id) {
    document.getElementById("pets").innerHTML += `<h2>${pet.name}</h2>
    <img src="${pet.image}">
    <p>Hi! My name is ${pet.name}</p>
    <p>Species: ${pet.species}</p>
    <p>Rarity: ${pet.species_availability}</p>
    <p>Owner: ${pet.ownership}</p>
    <p>Diet: ${pet.diet}</p>
    <p>Likes: ${pet.likes}</p>`;
  }
}

// ----------------------------------------------------------------------

function getMatches(id) {
  fetch("http://localhost:3000/likes")
    .then(response => response.json())
    .then(data => data.forEach(like => viewMatches(like, id)));
}

function viewMatches(like, id) {
  if (like.liker_id == id) {
    fetch(`http://localhost:3000/pets`)
      .then(response => response.json())
      .then(pets => pets.forEach(pet => displayAllLikes(pet, like.liked_id)));
  }
}

function displayAllLikes(pet, id) {
  if (pet.id == id) {
    add = document.getElementById("matchpets");
    add.innerHTML += `<h3>
    ${pet.name}
    </h3>
    `;
  }
}

// ----------------------------------------------------------------------

function updateLike(likedId, likerId) {
  let data = {
    liker_id: likerId,
    liked_id: likedId
  };
  fetch(`http://localhost:3000/pets/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => {
      console.log(res.json());
    })
    .catch(err => {
      console.error(err);
    });
}

// ----------------------------------------------------------------------

function addUserForm() {
  document.getElementById("userform").innerHTML += `
  <form id="new-user">
    <label id="new-user-label">New User</label>
    <input type="text" class="form-control" id="new-user" placeholder="username">
<button data-name="usersubmit">Submit</button>
</form>`;
}

function getData() {
  fetch("http://localhost:3000/users")
    .then(response => response.json())
    .then(data => data.forEach(user => displayData(user)));
}

function displayData(user) {
  add = document.getElementById("all-users");
  add.innerHTML += `<ul>
  <button data-name="homePage" data-id="${user.id}">Log in as ${
    user.name
  }</button></ul>`;
}

function addPetsForm(id) {
  document.getElementById("petsform").innerHTML += `
  <form id="new-pet">
        <div>
            <label>New Pet</label>
            <br>
            <input type="text" class="form-control" id="new-name" placeholder="pebble">
            <br>
            <input type="text" class="form-control" id="new-type" placeholder="species">
            <br>
            <input type="text" class="form-control" id="new-avalibility" placeholder="species availability">
            <br>
            <input type="text" class="form-control" id="new-ownership" placeholder="ownership">
            <br>
            <input type="text" class="form-control" id="new-diet" placeholder="I eat">
            <br>
            <input type="hidden" class="form-control" id="new-likes" value="${id}">
            <br>
            <input type="text" class="form-control" id="new-likes" placeholder="image">
        </div>
        <button data-name="petsubmit">Submit</button>
    </form>`;
}

// ----------------------------------------------------------------------

function getPetProfile(id) {
  fetch(`http://localhost:3000/pets/${id}`)
    .then(response => response.json())
    .then(resp => viewPetProfile(resp.pet, id))
    .catch(err => console.log(err));
}
function viewPetProfile(pet, id) {
  if (pet.id == id) {
    document.getElementById("pets").innerHTML += `<h2>${pet.name}</h2>
    <img src="${pet.image}">
    <p>Hi! My name is ${pet.name}</p>
    <p>Species: ${pet.species}</p>
    <p>Rarity: ${pet.species_availability}</p>
    <p>Owner: ${pet.ownership}</p>
    <p>Diet: ${pet.diet}</p>
    <p>Likes: ${pet.likes}</p>
    <button data-id="${
      pet.id
    }" data-name="matchedprofiles">View liked profiles</button>
    <button data-id="${pet.id}" data-name="match">Match ${
      pet.name
    } with local pets</button>
    <button data-name="back">back</buttom>`;
  }
}

function getAllPets(id) {
  fetch(`http://localhost:3000/pets`)
    .then(response => response.json())
    .then(pets => pets.forEach(pet => displayAllPets(pet, id)));
}
function displayAllPets(pet, id) {
  if (pet.id != id) {
    add = document.getElementById("matchpets");
    add.innerHTML += `<h3>
    ${pet.name}
    <p id="${id}">${pet.likes}</p>
    <button data-id="${pet.id}" data-name="like" data-likes="${
      pet.likes
    }"> Like ❤️</button>
    <button data-id="${pet.id}"data-name="matchprofile">View</button>
    </h3>
    `;
  }
}

// ----------------------------------------------------------------------

function newUser(data) {
  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(() => (document.getElementById("all-users").innerHTML = ""))
    .then(getData);
}
// ----------------------------------------------------------------------

function homePage(id) {
  fetch(`http://localhost:3000/users/${id}`)
    .then(response => response.json())
    .then(user => displayHomePage(user));
}

function displayHomePage(user) {
  document.getElementById("all-users").innerHTML = "";
  getUserPets(user.id);
  addPetsForm(user.id);
  add = document.getElementById("all-users");
  add.innerHTML += `<h1>${user.name}</h1>
  <button data-name="logout">Logout</button>
  <button data-id="${user.id}" data-name="delete">Delete Profile</button>`;
}

// ----------------------------------------------------------------------

function getUserPets(id) {
  fetch(`http://localhost:3000/pets`)
    .then(response => response.json())
    .then(pets => pets.forEach(pet => displayUserPets(pet, id)));
}

function displayUserPets(pet, id) {
  if (pet.user_id == id) {
    document.getElementById("pets").innerHTML += `<p>${pet.name}</p>
    <button data-id='${pet.id}' 
    data-name="profile">${pet.name}'s profile</button>
    `;
  }
}
// ----------------------------------------------------------------------

function newPet(id) {
  data = {
    name: event.target.parentElement.childNodes[1].childNodes[5].value,
    species: event.target.parentElement.childNodes[1].childNodes[9].value,
    species_availability:
      event.target.parentElement.childNodes[1].childNodes[13].value,
    ownership: event.target.parentElement.childNodes[1].childNodes[17].value,
    diet: event.target.parentElement.childNodes[1].childNodes[21].value,
    user_id: event.target.parentElement.childNodes[1].childNodes[25].value,
    image: event.target.parentElement.childNodes[1].childNodes[29].value
  };
  data;
  fetch("http://localhost:3000/pets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  }).then(homePage(currentUserId));
}

// ----------------------------------------------------------------------
