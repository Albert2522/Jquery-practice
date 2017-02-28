const View = require('./ttt-view.js');
const Game = require('/Users/appacademy/Desktop/W6D1/solution/game.js');

$( () => {
  let game = new Game();
  let jquery = $('figure');
  let view = new View(game, jquery);
  view.setupBoard();
  view.bindEvents();
});

// module.export =
