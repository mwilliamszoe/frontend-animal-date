document.addEventListener("DOMContentLoaded", () => {
  getData();
  addUserForm();
  // let newuser = false;
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
  add.innerHTML += `<h2>${user.name}</h2>
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
    document.getElementById("pets").innerHTML += `<p>${pet.name}</p>`;
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

// addBtn.addEventListener("click", () => {
//   // hide & seek with the form
//   // newuser = !newuser;
//   if (newuser) {
//     formgroup.style.display = "block";
//     // submit listener
//     let newuser = document.querySelector(".add-toy-form");
//     newuser.addEventListener("submit", function(event) {
//       // event.preventDefault()

//       let data = {
//         name: event.target.name.value,
//         image: event.target.image.value,
//         likes: 0
//       };

//       postData(`http://localhost:3000/toys`, data);
//     });
//   } else {
//     toyForm.style.display = "none";
//   }
// });
