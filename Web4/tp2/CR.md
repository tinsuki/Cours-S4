___
# Web 4 TP2
# Analyse / DOM
# Kevin SIMON M2
___

## Partie 1 Analyse : Jeu de la vie

### Exercie 1 : Réécrivez les fonctions suivantes en utilisant des arrow functions. Essayez de faire le plus court possible !

```js

  const isLive = function(c){
    return c === LIVE;
  }

  const isUnderPopulated = function(n){
    return  n < FEW;
  } 
  const isOverPopulated = function(n){
    return n > MANY;
  } 
  const canReproduce = function(n){
    return n === PLENTY;
  }   
  const willContinue = function(n){
    return !(isUnderPopulated(n)) && !(isOverPopulated(n));
  }

  const isLive = (c) => c === LIVE;
  const isOverPopulated = n => n > MANY;
  const canReproduce = n => n === PLENTY;
  const willContinue = n => !(isUnderPopulated(n)) && !(isOverPopulated(n));
```

### Exercice 2 : documentez les méthodes de l'objet Math utilisée dans cette fonction. 

```js
    const getRandomInt = (max, min=0) => {
    min = Math.ceil(min); // donne le plus petit entier supérieur ou égal au nombre donné (min) (permet de convertire de float à int en plus petit : 3.7 => 3)
    max = Math.floor(max); // donne le plus grand entier inférieur ou égal au nombre donné (max) (permet de convertire de float à int en plus grand : 3.2 => 4)
    return Math.floor(Math.random() * (max - min)) + min; // Math.random : donne un nombre aléatoire (pseudo-aléatoire) entre 0 et 1
                                                          // permet d'obtenir un nombre pseudo-aléatoire entre min et max  
  }
```

### Exercice 3 : Décrivez le fonctionnement de ces deux fonctions

```js
  const newRow = () => Array(SIZE).fill(DEAD); // créer la map et la remplie de cellules mortes
  const newBoard = shouldSeed => {
    let board = newRow().map(newRow);
    if (shouldSeed) {
      board = board.map(row => row.map(_ => getRandomInt(100) < THRESHOLD ? LIVE : DEAD)) // met de manièere pseudo-aléatoire une cellule à l'état mort ou en vie
    }
    return board;
  }
  // met en place une map aléatoire pour le début de la partie / simulation
```

### Exercice 4 : Quelle est l'utilité de cette fonction dans le jeu ? Pourquoi est-elle nécessaire ? 

```js
  const isWithinBounds = v => v >= 0 && v < SIZE; 
  const areWithinBounds = (x, y) => isWithinBounds(x) && isWithinBounds(y);
  // permet de savoir si une cellule est sur le bord afin d'adapter la recherche de voisins (pas de segfault)
```


### Exercice 5 : Décrivez le fonctionnement de cette fonction.

```js
  // à quoi sert la fonction filter ? Pourquoi les ... (décomposition) sont indispensables ?
  // Aurait-il été possible de faire sans cette décomposition ? Quel aurait été l'impact sur la fonction areWithinBounds ?
  const neighborCoordinates = (x, y) => [
    [x-1, y-1], [x, y-1], [x+1, y-1],
    [x-1, y],             [x+1, y],
    [x-1, y+1], [x, y+1], [x+1, y+1],  
  ].filter(xyArr => areWithinBounds(...xyArr)); // la fonction filter permet de ne garder seulement les ccoordonnées valides (x et y >= 0 et < SIZE)
  // pour faire sans la décomposition il aurait fallu aire une double boucle imbriqué (delta x et  delta y) qui aurrait prit plus de temps
```

### Exercice 6 : A quoi sert cette fonction dans le jeu ? 

```js
  const numberToLiveDead = (number, cell) => {
    if (isLive(cell)) {
      if (isUnderPopulated(number)) {
        return DEAD;
      } else if (isOverPopulated(number)) {
        return DEAD;
      } else if (willContinue(number)) {
        return LIVE;
      }
    } else if (canReproduce(number)){
      return LIVE;
    } else {
      return DEAD;
    }
  }; // permet de savoir se que oit devenir une cellule pour la génération suivante (mourir, naitre ou vivre)
```

### Execice 7 : Décrivez le fonctionnement de cette fonction

```js
  const printRow = r => r.join(' '); 
  const printBoard = b => {
    const boardAsString = b.map(printRow).join('\n');
    console.log(boardAsString);
    return boardAsString;
  }; // elle affiche la grille dans le terminal : elle affiche chaque cellule de chaque ligne séparée par un espace et chaque ligne et suivie d'un retour à la ligne
```

### Execice 8 :  Quel est le rôle de setInterval ?

```js
    // permet de faire attendre le jeu de façon à avoir 1 seconde (INTERVAL) entre chaque début de boucle
    let tick = setInterval(() => { 
        ...
    }, INTERVAL);
```

### Execice 9 : Regardez dans la document le rôle de slice(), quel est son intérêt ici ?

```js
      // permet de copier la chaine de caractère pour la sauvegarder 
      prevMinusOne = prev.slice();  // Copy string representation of current - 2.
      prev = curr.slice();          // Copy string representation of current - 1.
```

### Execice 10 : Décrivez le rôle de cette condition

```js
      // si la grille est la même sur trois générations, met fin à la boucle
      if (curr === prev || curr === prevMinusOne) {
        clearInterval(tick);
      }
```

___
___

## Partie 2 : DOM

