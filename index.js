document.addEventListener("DOMContentLoaded", () => {
  getData();
  document.addEventListener("click", e => {
    e.preventDefault();
    if (event.target.dataset.name == "submit") {
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
      homePage(userid);
    } else if (event.target.dataset.name == "logout") {
      document.getElementById("all-users").innerHTML = "";
      getData();
    }
  });
});

// ----------------------------------------------------------------------

function getData() {
  fetch("http://localhost:3000/users")
    .then(response => response.json())
    .then(data => data.forEach(element => displayData(element)));
}

function displayData(data) {
  add = document.getElementById("all-users");
  add.innerHTML += `<ul>
  <button data-name="homePage" data-id="${data.id}">Log in as ${
    data.name
  }</button></ul>`;
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
    .then(user => displayHomePage(user))
    .then();
}

function displayHomePage(user) {
  pets = user.pets;
  debugger;
  document.getElementById("all-users").innerHTML = "";
  add = document.getElementById("all-users");
  add.innerHTML += `<h2>${user.name}</h2>
  <button data-name="logout">Logout</button>`;
}

// ----------------------------------------------------------------------

function getUserPets() {
  ["hello", "hello"].map(element => element);
}
// ----------------------------------------------------------------------
