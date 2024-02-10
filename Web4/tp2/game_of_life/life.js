const life = (() => {
  const SIZE = 50; // Size of (square) board
  const INTERVAL = 1000; // Frequency of screen updates
  const THRESHOLD = 25; // % chance a cell will be seeded with life

  // Printable representations of cells
  let LIVE = '◼';
  let DEAD = '◻';

  // ---------------------------------------------------------------------
  // The rules
  /*
    -  Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
    -  Any live cell with two or three live neighbours lives on to the next generation.
    -  Any live cell with more than three live neighbours dies, as if by overpopulation.
    -  Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.  
  */

  const FEW = 2;
  const MANY = 3;
  const PLENTY = 3;


  // TODO 1: Réécrivez les fonctions suivantes en utilisant des arrow functions. Essayez de faire le plus court possible !
  /*
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
  */

  const isLive = (c) => c === LIVE;
  const isUnderPopulated = (n) => n < FEW;
  const isOverPopulated = n => n > MANY;
  const canReproduce = n => n === PLENTY;
  const willContinue = n => !(isUnderPopulated(n)) && !(isOverPopulated(n));

  // TODO 2: documentez les méthodes de l'objet Math utilisée dans cette fonction. 
  const getRandomInt = (max, min=0) => {
    min = Math.ceil(min); // donne le plus petit entier supérieur ou égal au nombre donné (min) (permet de convertire de float à int en plus petit : 3.7 => 3)
    max = Math.floor(max); // donne le plus grand entier inférieur ou égal au nombre donné (max) (permet de convertire de float à int en plus grand : 3.2 => 4)
    return Math.floor(Math.random() * (max - min)) + min; // Math.random : donne un nombre aléatoire (pseudo-aléatoire) entre 0 et 1
                                                          // permet d'obtenir un nombre pseudo-aléatoire entre min et max  
  }


  // TODO 3: Décrivez le fonctionnement de ces deux fonctions
  const newRow = () => Array(SIZE).fill(DEAD); // créer la map et la remplie de cellules mortes
  const newBoard = shouldSeed => {
    let board = newRow().map(newRow);
    if (shouldSeed) {
      board = board.map(row => row.map(_ => getRandomInt(100) < THRESHOLD ? LIVE : DEAD)) // met de manièere pseudo-aléatoire une cellule à l'état mort ou en vie
    }
    return board;
  }
  // met en place une map aléatoire pour le début de la partie / simulation


  // When counting live neighbors, make sure to stay within array bounds.
  // TODO 4: Quelle est l'utilité de cette fonction dans le jeu ? Pourquoi est-elle nécessaire ? 
  const isWithinBounds = v => v >= 0 && v < SIZE; 
  const areWithinBounds = (x, y) => isWithinBounds(x) && isWithinBounds(y);
  // permet de savoir si une cellule est sur le bord afin d'adapter la recherche de voisins (pas de segfault)


  // Given a coordinate pair, return an array of valid neighbor coordinate pairs.
  // TODO 5: Décrivez le fonctionnement de cette fonction.
  // à quoi sert la fonction filter ? Pourquoi les ... (décomposition) sont indispensables ?
  // Aurait-il été possible de faire sans cette décomposition ? Quel aurait été l'impact sur la fonction areWithinBounds ?
  const neighborCoordinates = (x, y) => [
    [x-1, y-1], [x, y-1], [x+1, y-1],
    [x-1, y],             [x+1, y],
    [x-1, y+1], [x, y+1], [x+1, y+1],  
  ].filter(xyArr => areWithinBounds(...xyArr)); // la fonction filter permet de ne garder seulement les ccoordonnées valides (x et y >= 0 et < SIZE)
  // pour faire sans la décomposition il aurait fallu aire une double boucle imbriqué (delta x et  delta y) qui aurrait prit plus de temps



  // Functions to produce board containing coordinate pairs for each cell.
  const coordsForRow = (r, x=0) => r.map((_, y) => [x, y]);
  const coordsForBoard = b => b.map(coordsForRow);

  // Functions to produce board containing array of valid neighbor coordinate pairs.
  const neighborCoordinatesForRow = (r, x=0) => coordsForRow(r, x).map(xyArr => neighborCoordinates(...xyArr));
  const neighborCoordinatesForBoard = b => b.map(neighborCoordinatesForRow);

  // Retrieve value of cell at specified coordinates.
  const cellAtCoorinate = (board, x, y) => board[x][y];

  // Given a board and an array of neighbor coordinates, retrieve the neighbor cells.
  const neighborCellsForCoordinateArray = (board, arrayOfNeighborCoors) => {
    return arrayOfNeighborCoors.map(neighborCoordsForCell => {
      return neighborCoordsForCell.map(coordsArray => {
        return coordsArray.map(xyArray => cellAtCoorinate(board, ...xyArray))
      })
    })
  };

  // Given a board and an array of neighbor coordinates, return a board with the live neighbor count
  // for each cell.
  const boardAsNumberOfNeighbors = (board, arrayOfNeighborCoords) => {
    return neighborCellsForCoordinateArray(board, arrayOfNeighborCoords).map(neighborCellsForRow => {
      return neighborCellsForRow.map(neighborCellsForCell => {
        return neighborCellsForCell
          .filter(isLive)
          .reduce((total, _) => total + 1, 0)
      });
    });
  };



  // TODO 6: A quoi sert cette fonction dans le jeu ? 
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
  }; // permet de savoir se que oit devenir une cellule pour la génération suivante (mourir naitre ou vivre)

  // Given rows or boards of cells and neighbor counts, calculate next states.
  const numberRowAsLiveDeadCells = (rowOfNumbers, rowOfCells) => rowOfNumbers.map((n, i) => numberToLiveDead(n, rowOfCells[i]));
  const numberBoardAsLiveDeadCells = (boardOfNumbers, boardOfCells) => boardOfNumbers.map((r, i) => numberRowAsLiveDeadCells(r, boardOfCells[i]));


  // TODO 7: Décrivez le fonctionnement de cette fonction
  const printRow = r => r.join(' '); 
  const printBoard = b => {
    const boardAsString = b.map(printRow).join('\n');
    console.log(boardAsString);
    return boardAsString;
  }; // elle affiche la grille dans le terminal : elle affiche chaque cellule de chaque ligne séparée par un espace et chaque ligne et suivie d'un retour à la ligne

  // The game loop!
  const main = board => {
    // Given a board, calculate all the valid neighbor coordinates.
    const coords = neighborCoordinatesForBoard(board);
    
    let neighbors;         // The game board as number of live neighbors per cell.
    let generation = 0;    // What generation we're on.
    let curr = '';         // Current generation as a string.
    let prev = '';         // For checking if this generation is same as current - 1.
    let prevMinusOne = ''; // For checking if this generation is same as current - 2.
    

    // TODO 8: Quel est le rôle de setInterval ?
    // permet de faire attendre le jeu de façon à avoir 1 seconde (INTERVAL) entre chaque début de boucle
    let tick = setInterval(() => {
      neighbors = boardAsNumberOfNeighbors(board, coords);  // Calculate live neighbor counts.
      board = numberBoardAsLiveDeadCells(neighbors, board); // Calculate next state of board.
      console.clear(); 
      // TODO 9: Regardez dans la document le rôle de slice(), quel est son intérêt ici ?
      // permet de copier la chaine de caractère pour la sauvegarder 
      prevMinusOne = prev.slice();  // Copy string representation of current - 2.
      prev = curr.slice();          // Copy string representation of current - 1.
      curr = printBoard(board);     // Print board, saving string representation.
      console.log(`Generation ${generation}`);
      generation++;

      //TODO 10: Décrivez le rôle de cette condition 
      // si la grille est la même sur trois générations, met fin à la boucle
      if (curr === prev || curr === prevMinusOne) {
        clearInterval(tick);
      }
    }, INTERVAL);
  };






  module.exports = () => {
    main(newBoard(true)); // Start game with new board, seeded with some live cells.      
  }

})();
