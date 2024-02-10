JS, manipulations basiques du DOM 
=================================


## Préambule 

Récupérer le zip de l'application "Walkman". Décompressez le zip et positionnez votre terminal dans le dossier. Construisez l'image docker avec la commande : `docker build -t web4/walkman .`

Puis, démarrez le conteneur de l'application : `docker run --name walkman -p 3000:3000 web4/walkman`

En vous rendant à l'adresse [http://localhost:3000](http://localhost:3000), vous devriez voir une petite map, avec un personnage.  

Vérifiez que la requête curl suivante (à exécuter dans un autre terminal) fait bien bouger le personnage vers la droite : 

La requête curl suivante devrait faire bouger le personnage

```bash
curl --location --request POST 'http://localhost:3000/action' \
--header 'Content-Type: application/json' \
--data-raw '{"username": "test", "type":"right"}'
```

## Travail à effectuer 

Vous disposez donc d'un personnage qui ne reçoit ses ordres que par API ... 

Il ne reçoit ses ordres qu'à l'adresse : http://localhost:3000/action 

Ces ordres doivent être reçus en JSON sous la forme `{username: '...', type: "up/down/right/left"}`, dans une requête de type `POST`. 

Créez : 

### 1

Créez un nouveau dossier et écrivez une page web, associée à une feuille de style et un fichier javascript. 

Cette page doit contenir 4 boutons permettant de déplacer notre personnage, et un champ de texte pour saisir le nom d'utilisateur. 
Suivez cette [documentation](https://developer.mozilla.org/en-US/docs/Web/API/EventListener) pour "écouter" le clic sur vos boutons. 
Effectuez ensuite les requêtes HTTP nécessaires pour faire se déplacer le personnage. 

Affichez dans votre page HTML l'historique des déplacements effectués. 

### 2

Ecrivez une application s'exécutant depuis le terminal, demandant à l'utilisateur son user et proposant les 4 actions possibles. L'utilisateur peut ensuite choisir une action et déplacer le personnage. L'application indique si l'action s'est bien déroulée et propose une nouvelle action automatiquement. 

