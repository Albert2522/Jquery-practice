// const Game = require('/Users/appacademy/Desktop/W6D1/solution/game.js');

class View {
  constructor(game, $el) {
    this.game = game;
    this.el = $el;
  }

  bindEvents() {
    // TODO: make compatible with game.playMove

    const currentView = this;
    $("li#square").each(function (index, element) {
      $(element).click(function (index2) {
        let j = parseInt($(this).attr('name'));
        let i = parseInt($(this).parent().attr('name'));
        console.log(i, j);
        try {
          currentView.game.playMove([i, j]);
          let mark = currentView.game.board.grid[i][j];
          if (mark === 'x') {
            $(this).append('x');
            $(this).css('background-color', 'white')
                   .css('color', 'blue')
                   .css('font-size', '36px')
                   .css('text-align', 'center');
          } else {
            $(this).append('o');
            $(this).css('background-color', 'white')
                   .css('color', 'red')
                   .css('font-size', '36px')
                   .css('text-align', 'center');
          }
          let winner = currentView.game.winner();
          if (winner !== null) {
            alert(`winner is ${winner}`);
            window.location.reload();
          }
        }
        catch (error) {
          alert(error.msg);
        }
      });
    });
  }

  setupBoard() {
    this.el.append("<ul name='0' id='grid'></ul>");
    this.el.append("<ul name='1' id='grid'></ul>");
    this.el.append("<ul name='2' id='grid'></ul>");
    $.each( $('ul#grid'), (idx, row) => {

      $(row).append("<li name='0' id='square'></li>");
      $(row).append("<li name='1' id='square'></li>");
      $(row).append("<li name='2' id='square'></li>");
    });
    $("ul#grid").css("float", "left");
    $("ul#grid").css("width", "50px");
    $("ul#grid").css("padding", "0");
    $("ul#grid").css("list-style-type", "none");
    $("li#square").css( "border-style", "solid");
    $("li#square").css("list-style-type", "none");
    $("li#square").css("width", "50px");
    $("li#square").css("height", "50px");
    $("li#square").css("background-color", "gray");

    $("li#square").mouseover( function() {
      if ($(this).text() !== 'x' && $(this).text() !== 'o') {
        $(this).css("background-color", "yellow");
      }
    });
    $("li#square").mouseout( function() {
      if ($(this).text() !== 'x' && $(this).text() !== 'o')
        $(this).css("background-color", "gray");
    });
    $("li#square:hover").css("background-color", "yellow");
  }
}

module.exports = View;
