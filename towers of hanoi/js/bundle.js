/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const HanoiGame = __webpack_require__(1);
const HanoiView = __webpack_require__(2);

$( () => {
  const rootEl = $('.hanoi');
  const game = new HanoiGame();
  const view = new HanoiView(game, rootEl);
  view.setupTowers();
  view.render();
  view.makeMove();
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Game {
  constructor() {
    this.towers = [[3, 2, 1], [], []];
  }

  isValidMove(startTowerIdx, endTowerIdx) {
      const startTower = this.towers[startTowerIdx];
      const endTower = this.towers[endTowerIdx];

      if (startTower.length === 0) {
        return false;
      } else if (endTower.length == 0) {
        return true;
      } else {
        const topStartDisc = startTower[startTower.length - 1];
        const topEndDisc = endTower[endTower.length - 1];
        return topStartDisc < topEndDisc;
      }
  }

  isWon() {
      // move all the discs to the last or second tower
      return (this.towers[2].length == 3) || (this.towers[1].length == 3);
  }

  move(startTowerIdx, endTowerIdx) {
      if (this.isValidMove(startTowerIdx, endTowerIdx)) {
        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
        return true;
      } else {
        return false;
      }
  }

  print() {
      console.log(JSON.stringify(this.towers));
  }

  promptMove(reader, callback) {
      this.print();
      reader.question("Enter a starting tower: ", start => {
        const startTowerIdx = parseInt(start);
        reader.question("Enter an ending tower: ", end => {
          const endTowerIdx = parseInt(end);
          callback(startTowerIdx, endTowerIdx)
        });
      });
  }

  run(reader, gameCompletionCallback) {
      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
        if (!this.move(startTowerIdx, endTowerIdx)) {
          console.log("Invalid move!");
        }

        if (!this.isWon()) {
          // Continue to play!
          this.run(reader, gameCompletionCallback);
        } else {
          this.print();
          console.log("You win!");
          gameCompletionCallback();
        }
      });
  }
}

module.exports = Game;


/***/ }),
/* 2 */
/***/ (function(module, exports) {


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


/***/ })
/******/ ]);