console.log("hello world");

var fetch = require('node-fetch'); 
// Exemple de requête GET 
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => response.json())
  .then(json => console.log(json))

import {fonct1, fonct2} from 'whatever'; // Importer quelques fonctions d'un module
import Module from 'whatever'; // Importer la fonction par défaut (ou un namespace)
import Module, {fonct} from 'whatever'; // Combinaison des deux
