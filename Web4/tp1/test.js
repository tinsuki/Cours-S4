
var fetch = require('node-fetch'); 
// Exemple de requête GET 
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => response.json())
  .then(json => console.log(json));


