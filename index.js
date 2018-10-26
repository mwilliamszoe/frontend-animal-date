let currentUserId;
document.addEventListener("DOMContentLoaded", () => {
  let currentPetId;
  getData();
  addUserForm();
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
      // document.getElementById("user-page").innerHTML = ""; // chelsea did this
      getData();
    } else if (event.target.dataset.name == "petsubmit") {
      id = event.target.parentElement.childNodes[13].value;
      document.getElementById("petsform").innerHTML = "";
      document.getElementById("pets").innerHTML = "";
      // document.getElementById("user-page").innerHTML = ""; // chelsea did this

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
      updateLike(event.target.dataset.id, currentPetId);
    } else if (event.target.dataset.name == "delete") {
      id = event.target.dataset.id;
      deleteUser(id);
      document.getElementById("all-users").innerHTML = "";
      document.getElementById("petsform").innerHTML = "";
      // document.getElementById("user-page").innerHTML = ""; // chelsea did this
    } else if (event.target.dataset.name == "deletepet") {
      id = event.target.dataset.id;
      deletePets(id);
      document.getElementById("petsform").innerHTML = "";
      document.getElementById("pets").innerHTML = "";
      homePage(currentUserId);
    } else if (event.target.dataset.name == "unLike") {
      id = event.target.dataset.id;
      document.getElementById("matchpets").innerHTML = "";
      getLike(id);
    }
  });
});

// ----------------------------------------------------------------------

function getLike(id) {
  fetch(`http://localhost:3000/likes`)
    .then(resp => resp.json())
    .then(likes => likes.forEach(like => unLike(like, id)));
}

function unLike(like, id) {
  debugger;
  if (like.liked_id == id) {
    return fetch(`http://localhost:3000/likes/${like.id}`, {
      method: "DELETE"
    });
  }
}

// ----------------------------------------------------------------------

function deleteUser(id) {
  return fetch(`http://localhost:3000/users/${id}`, {
    method: "DELETE"
  })
    .then(addUserForm)
    .then(getData);
}

function deletePets(id) {
  return fetch(`http://localhost:3000/pets/${id}`, {
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
    <img src="${pet.image}" width="250px">
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
    add.innerHTML += `<p class="match-pets-name">
    ${pet.name}
    <p><button data-id="${pet.id}" data-name="unLike">UnLike ${
      pet.name
    }</button>
    `;
  }
}

// ----------------------------------------------------------------------

function updateLike(likedId, likerId) {
  let data = {
    liker_id: likerId,
    liked_id: likedId
  };
  // debugger;
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
    <label id="new-user-label"><strong>New User</strong></label>
    <input type="text" class="form-control" id="new-user" placeholder="username">
<button data-name="usersubmit" id="usersubmit-btn">Submit</button>
</form>`;
}

function getData() {
  fetch("http://localhost:3000/users")
    .then(response => response.json())
    .then(data => data.forEach(user => displayData(user)));
}

function displayData(user) {
  add = document.getElementById("all-users");
  add.innerHTML += `
  <button class="login-btn" data-name="homePage" data-id="${
    user.id
  }">Log in as ${user.name}</button>`;
}

function addPetsForm(id) {
  document.getElementById("petsform").innerHTML += `
  <form id="new-pet">
        
            <label id="new-pet-label">New Pet</label>
            <input type="text" class="new-pet-input" id="new-name" placeholder="pebble">
            
            <input type="text" class="new-pet-input" id="new-type" placeholder="species">
            
            <input type="text" class="new-pet-input" id="new-avalibility" placeholder="species availability">
            
            <input type="text" class="new-pet-input" id="new-ownership" placeholder="ownership">
            
            <input type="text" class="new-pet-input" id="new-diet" placeholder="I eat">
            
            <input type="hidden" class="new-pet-input" id="new-likes" value="${id}">
            
            <input type="text" class="new-pet-input" id="new-likes" placeholder="image">
        
        <button data-name="petsubmit" id="pet-submit">Submit</button>
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
    }" data-name="matchedprofiles" class="profile-btn">View liked profiles</button>
    <button data-id="${pet.id}" data-name="match" class="profile-btn">Match ${
      pet.name
    } with local pets</button>
    <button data-name="back" class="profile-btn">back</buttom>`;
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
    add.innerHTML += `
    ${pet.name}
    <p id="${id}" class="match-pets-info">Current #Likes: ${pet.likes}</p>
    <button data-id="${pet.id}" data-name="like" data-likes="${
      pet.likes
    }" class="matchprofile-btn"> Like ❤️</button>
    <button data-id="${
      pet.id
    }"data-name="matchprofile" class="matchprofile-view-btn">View</button>
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
  add.innerHTML += `<button data-name="logout" class="profile-btn">Logout</button>
  <button data-id="${
    user.id
  }" data-name="delete"class="profile-btn">Delete Profile</button>
  
`;
}

// function displayHomePage(user) {
//   document.getElementById("all-users").innerHTML = "";
//   getUserPets(user.id);
//   addPetsForm(user.id);
//   let userPage = document.createElement("div");
//   userPage.id = "user-page";
//   userPage.innerHTML = `<h1>${user.name}</h1>
//   <button data-name="logout" class="all-users-btn">Logout</button>
//   <button data-id="${
//     user.id
//   }" data-name="delete" class="all-users-btn">Delete Profile</button>`;
//   let outerDiv = document.getElementById("form-box");
//   let pets = document.getElementById("pets");
//   outerDiv.insertBefore(userPage, pets);

// add = document.getElementById("all-users");
// add.innerHTML += `<h1>${user.name}</h1>
// <button data-name="logout" class="all-users-btn">Logout</button>
// <button data-id="${
//   user.id
// }" data-name="delete" class="all-users-btn">Delete Profile</button>`;
// }

// ----------------------------------------------------------------------

function getUserPets(id) {
  fetch(`http://localhost:3000/pets`)
    .then(response => response.json())
    .then(pets => pets.forEach(pet => displayUserPets(pet, id)));
}

function displayUserPets(pet, id) {
  if (pet.user_id == id) {
    document.getElementById("pets").innerHTML += `<p>${pet.name}</p>
    <button class="profile-btn" data-id='${pet.id}' 
    data-name="profile">${pet.name}'s profile</button>
    <button class="profile-btn" data-id="${
      pet.id
    }" data-name="deletepet">Delete Pet</button>
    `;
  }
}
// ----------------------------------------------------------------------

function newPet(id) {
  data = {
    name: event.target.parentElement.childNodes[3].value,
    species: event.target.parentElement.childNodes[5].value,
    species_availability: event.target.parentElement.childNodes[7].value,
    ownership: event.target.parentElement.childNodes[9].value,
    diet: event.target.parentElement.childNodes[11].value,
    user_id: event.target.parentElement.childNodes[13].value,
    image: event.target.parentElement.childNodes[15].value
  };
  // data;
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
