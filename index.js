fetch("localhost:3000/pets")
  .then(response => response.json())
  .then(console.log(response));
