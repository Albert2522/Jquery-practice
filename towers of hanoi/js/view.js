
class View {
  constructor(game, $el) {
    this.game = game;
    this.el = $el;
  }

  makeMove() {
    const currentView = this;
    let start_pos;
    let end_pos;
    let successfulMove;
    $("ul#grid").each(function (index, element) {
      $(element).click(function (index2) {
        if (start_pos == null) {
          start_pos = parseInt($(this).attr('name'));
        }
        else
          end_pos = parseInt($(this).attr('name'));
        if (end_pos != null) {
          console.log(start_pos, end_pos);
          successfulMove = currentView.game.move(start_pos, end_pos);
          currentView.render();
          start_pos = null;
          end_pos = null;
          if (!successfulMove) {
            alert('invalid move!');
          }
        }
      });
    });
    // console.log(start_pos, end_pos);
        // try {
        //   currentView.game.playMove([i, j]);
        //   let mark = currentView.game.board.grid[i][j];
        //   if (mark === 'x') {
        //     $(this).append('x');
        //     $(this).css('background-color', 'white')
        //            .css('color', 'blue')
        //            .css('font-size', '36px')
        //            .css('text-align', 'center');
        //   } else {
        //     $(this).append('o');
        //     $(this).css('background-color', 'white')
        //            .css('color', 'red')
        //            .css('font-size', '36px')
        //            .css('text-align', 'center');
        //   }
        //   let winner = currentView.game.winner();
        //   if (winner !== null) {
        //     alert(`winner is ${winner}`);
        //     window.location.reload();
        //   }
        // }
        // catch (error) {
        //   alert(error.msg);
        // }
      // });
  }

  setupTowers() {
    this.el.append("<ul name='0' id='grid'></ul>");
    this.el.append("<ul name='1' id='grid'></ul>");
    this.el.append("<ul name='2' id='grid'></ul>");
    $.each( $('ul#grid'), (idx, row) => {
      $(row).append("<li name='0' id='square'></li>");
      $(row).append("<li name='1' id='square'></li>");
      $(row).append("<li name='2' id='square'></li>");
    });

    console.log($("ul#grid"));
    $("ul#grid").css("float", "left");
    $("ul#grid").css("list-style-type", "none");

    $("ul#grid").mouseover( function() {
        $(this).css("color", "red");
    });
    $("ul#grid").mouseout( function() {
        $(this).css("color", "gray");
    });
    $("li#square:hover").css("color", "yellow");
    $.each( $('ul#grid'), (idx, stack) => {
      $(stack).append("<li style='font-size:36px'>__</li>");
    });
  }

  render() {
    let arr = this.game.towers;
    for (let i = 0; i < arr.length; i++) {
      console.log($($('ul#grid')[i]).children()[0]);
      $($($('ul#grid')[i]).children()[0]).removeClass('rcorners1');
      $($($('ul#grid')[i]).children()[1]).removeClass('rcorners2');
      $($($('ul#grid')[i]).children()[2]).removeClass('rcorners3');
      if (arr[i].length !== 0) {
        for (let j = 0; j < arr[i].length; j++) {
          $($($('ul#grid')[i]).children()[j]).addClass(`rcorners${j + 1}`);
          // $($($('ul#grid')[i]).children()[j]).addClass('rcorners2');
          // $($($('ul#grid')[i]).children()[j]).addClass('rcorners3');
        }
      }
    }
    // $.each( $("li#square"), (idx, disc) => {
    //   if ($(disc).is('.rcorners1, .rcorners2, .rcorners3')) {
    //     $(disc).show();
    //   } else
    //     $(disc).hide();
    // });

  }
}

module.exports = View;
