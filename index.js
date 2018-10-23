document.addEventListener("DOMContentLoaded", () => {
  getData();
  document.addEventListener("click", () => {
    if (event.target.dataset.name == "submit") {
      newUserName = document.getElementById("new-user").childNodes[1]
        .childNodes[5].value;
      data = {
        name: newUserName
      };
      newUser(data);
      // document.getElementById("all-users").innerHTML = "";
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
  ${data.name}
  </ul>`;
}

// ----------------------------------------------------------------------

function newUser(data) {
  debugger;
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
