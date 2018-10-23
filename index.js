fetch("http://localhost:3000/users")
  .then(response => response.json())
  .then(function(response) {
    console.log(response);
  });
