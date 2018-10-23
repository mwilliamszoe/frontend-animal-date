document.addEventListener("DOMContentLoaded", () => {
  getData();
  addUserForm();
  document.addEventListener("click", e => {
    e.preventDefault();
    if (event.target.dataset.name == "usersubmit") {
      document.getElementById("mainBody").innerHTML += ``;
      newUserName = document.getElementById("new-user").childNodes[1]
        .childNodes[5].value;
      data = {
        name: newUserName
      };
      newUser(data);
      document.getElementById("all-users").innerHTML = "";
      getData();
    } else if (event.target.dataset.name == "homePage") {
      userid = event.target.dataset.id;
      document.getElementById("userform").innerHTML = ``;
      document.getElementById("pets").innerHTML = ``;
      homePage(userid);
    } else if (event.target.dataset.name == "logout") {
      addUserForm();
      document.getElementById("petsform").innerHTML = ``;
      document.getElementById("all-users").innerHTML = "";
      document.getElementById("pets").innerHTML = "";
      getData();
    } else if (event.target.dataset.name == "petsubmit") {
      id = event.target.parentElement.childNodes[1].childNodes[13].value;
      document.getElementById("petsform").innerHTML = ``;
      document.getElementById("pets").innerHTML = ``;
      newPet(id);
    } else if (event.target.dataset.name == "profile") {
      document.getElementById("pets").innerHTML = "";
      getPetProfile(event.target.dataset.id);
    } else if (event.target.dataset.name == "back") {
      document.getElementById("pets").innerHTML = "";
      document.getElementById("petsform").innerHTML = ``;
      document.getElementById("matchpets").innerHTML = "";
      homePage(userid);
    } else if (event.target.dataset.name == "match") {
      id = event.target.dataset.id;
      getAllPets(id);
    } else if (event.target.dataset.name == `matchprofile`) {
      document.getElementById("matchpets").innerHTML = "";
      id = event.target.dataset.id;
      getPetProfile(id);
    }
  });
});

// ----------------------------------------------------------------------

function getData() {
  fetch("http://localhost:3000/users")
    .then(response => response.json())
    .then(data => data.forEach(element => displayData(element)));
}
function addUserForm() {
  document.getElementById("userform").innerHTML += `
  <form id="new-user">
<div class="formgroup">
    <label>New User</label>
    <br>
    <input type="text" class="form-control" id="new-user" placeholder="bob">
</div>
<button data-name="usersubmit">Submit</button>
</form>`;
}

function displayData(data) {
  add = document.getElementById("all-users");
  add.innerHTML += `<ul>
  <button data-name="homePage" data-id="${data.id}">Log in as ${
    data.name
  }</button></ul>`;
}

function addPetsForm(id) {
  document.getElementById("petsform").innerHTML += `
  <form id="new-pet">
        <div>
            <label>New Pet</label>
            <br>
            <input type="text" class="form-control" id="new-pet" placeholder="pebble">
            <br>
            <input type="text" class="form-control" id="new-pet" placeholder="type">
            <br>
            <input type="hidden" class="form-control" id="new-pet" value="${id}">
        </div>
        <button data-name="petsubmit">Submit</button>
    </form>`;
}

// ----------------------------------------------------------------------

function getPetProfile(id) {
  fetch(`http://localhost:3000/pets/${id}`)
    .then(response => response.json())
    .then(pet => viewPetProfile(pet, id));
}
function viewPetProfile(pet, id) {
  if (pet.id == id) {
    document.getElementById("pets").innerHTML += `<h2>${pet.name}</h2>
    <p>Hi! My name is ${pet.name}</p>
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
    <button data-name="like">Like ❤️</button>
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
  });
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
  <button data-name="logout">Logout</button>`;
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
    user_id: id
  };
  fetch("http://localhost:3000/pets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  }).then(homePage(id));
}

// ----------------------------------------------------------------------
