import $ from "jquery";
console.log($);

const board = [];
const row = 8;
const column = 8;
const minePosition = [];
const bomb = 8;
let isGameOver = false;
let flagOn = false;

$("#toggleFlag").on("click", addFlag);
//make Bomb
function generateBomb() {
  let arr = [];
  while (arr.length < bomb) {
    let randomNum = Math.floor(Math.random() * bomb);
    let randomNum2 = Math.floor(Math.random() * bomb);
    if (arr.includes(randomNum + "-" + randomNum2) === false) {
      arr.push(randomNum + "-" + randomNum2);
    }
  }
  for (const bomb of arr) {
    $("#" + bomb).addClass("hasBomb");
    minePosition.push(bomb);
  }

  return arr;
}

//render board
const renderBoard = () => {
  const $board = $("#board").empty();
  for (let i = 0; i < row; i++) {
    let row = [];
    for (let j = 0; j < column; j++) {
      const div = $("<div>").attr("id", i + "-" + j);
      div.on("click", clicked);
      $board.append(div);
      row.push(div);
    }
    board.push(row);
  }
  console.log(board);
};
//adding flag
function addFlag() {
  if (flagOn) {
    flagOn = false;
    $("#toggleFlag").removeClass("clicked");
  } else {
    flagOn = true;
    $("#toggleFlag").addClass("clicked");
  }
}

//onclick function
function clicked(e) {
  let clicked = this;
  if (flagOn) {
    if (clicked.innerText === "") {
      clicked.innerText = "🚩";
    } else if (clicked.innerText === "🚩") {
      clicked.innerText = "";
    }
    return;
  }
  console.log(clicked.id);
  if (minePosition.includes(clicked.id)) {
    showMine(e);
    isGameOver = true;
  }

  //get mine position
  const position = clicked.id.split("");
  const id1 = parseInt(position[0]);
  const id2 = parseInt(position[2]);

  checkForMine(id1, id2);

  function showMine(e) {
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < column; j++) {
        let tile = board[i][j];
        if (tile.hasClass("hasBomb")) {
          board[i][j].text("💣");
        }
      }
    }
  }
}

function checkForMine(id1, id2) {
  let mineCount = 0;
  console.log(id1 + "-" + id2);
  //side
  mineCount += checkTile(id1, id2 - 1);
  mineCount += checkTile(id1, id2 + 1);
  //top
  mineCount += checkTile(id1 - 1, id2 - 1);
  mineCount += checkTile(id1 - 1, id2);
  mineCount += checkTile(id1 - 1, id2 + 1);
  //bottom
  mineCount += checkTile(id1 + 1, id2 - 1);
  mineCount += checkTile(id1 + 1, id2);
  mineCount += checkTile(id1 + 1, id2 + 1);
  console.log(mineCount);
}

function checkTile(id1, id2) {
  if ($("#" + id1 + "-" + id2).hasClass("hasBomb")) {
    console.log("worked");
    return 1;
  }
}
renderBoard();
generateBomb();
const main = () => {
  $(".mineCount").text(bomb);
};
main();
// //////////////////////////////////////////////////////////////////////////////////////////////////////
// const app = {
//   board: [
//     ["?", "?", "?", "?", "?", "?", "?", "?"],
//     ["?", "?", "?", "?", "?", "?", "?", "?"],
//     ["?", "?", "?", "?", "?", "?", "?", "?"],
//     ["?", "?", "?", "?", "?", "?", "?", "?"],
//     ["?", "?", "?", "?", "?", "?", "?", "?"],
//     ["?", "?", "?", "?", "?", "?", "?", "?"],
//     ["?", "?", "?", "?", "?", "?", "?", "?"],
//     ["?", "?", "?", "?", "?", "?", "?", "?"],
//   ],
//   bomb: 8,
//   row: 8,
//   column: 8,
//   flag: false,
//   flagCount: 8,
//   page: "#startPage",
//   isBottom: false,
//   isTop: false,
//   isLeft: false,
//   isRight: false,
// };

// //create board
// const renderBoard = () => {
//   const $board = $("#board").empty();
//   for (let i = 0; i < app.column; i++) {
//     const $div = $("<div>");
//     for (let j = 0; j < app.column; j++) {
//       const $innerDiv = $("<div>")
//         .text(app.board[i][j])
//         .addClass("board")
//         .attr("id", i + "-" + j);

//       $div.append($innerDiv);
//     }
//     $board.append($div);
//   }
// };

// //add bomb
// const generateBomb = () => {
//   let arr = [];
//   while (arr.length < app.bomb) {
//     let randomNum = Math.floor(Math.random() * app.bomb);
//     let randomNum2 = Math.floor(Math.random() * app.bomb);
//     if (arr.includes(randomNum + "-" + randomNum2) === false) {
//       arr.push(randomNum + "-" + randomNum2);
//     }
//   }
//   for (const bomb of arr) {
//     $("#" + bomb).addClass("hasBomb");
//   }
//   return arr;
// };

// //add flag
// document.body.onkeyup = (e) => {
//   if (e.keyCode == 32 && app.flag === false) {
//     $("#toggleFlag").removeClass("hide");
//     app.flag = true;
//   } else if (e.keyCode == 32 && app.flag === true) {
//     $("#toggleFlag").addClass("hide");
//     app.flag = false;
//   }
// };

// const addFlag = (e) => {
//   if (app.flag === true && $(e.target).hasClass("flag")) {
//     $(e.target).removeClass("flag");
//     app.flagCount++;
//   } else if (app.flag === true && app.flagCount > 0) {
//     $(e.target).addClass("flag");
//     app.flagCount--;
//   }
// };

// //check for mine
// const checkGameOver = (e) => {
//   if ($(e.target).hasClass("flag")) {
//     return;
//   } else if ($(e.target).hasClass("hasBomb") && app.flag === false) {
//     alert("dead");
//   }
// };

// //mine count
// const mineCount = () => {
//   return $(".mineCount").text(app.bomb);
// };

// const checkMine = (e) => {
//   const $id = $(e.target).attr("id");
//   const split = $id.split("-");
//   const r = parseInt(split[0]);
//   const c = parseInt(split[1]);
//   // check left and right
//   const left = "#" + parseInt(r) + "-" + parseInt(c - 1);
//   const right = "#" + parseInt(r) + "-" + parseInt(c + 1);
//   // check top 3
//   const topLeft = "#" + parseInt(r - 1) + "-" + parseInt(c - 1);
//   const top = "#" + parseInt(r - 1) + "-" + parseInt(c);
//   const topRight = "#" + parseInt(r - 1) + "-" + parseInt(c + 1);
//   console.log(topRight);
//   // check bottom 3
//   const bottomLeft = "#" + parseInt(r + 1) + "-" + parseInt(c - 1);
//   const bottom = "#" + parseInt(r + 1) + "-" + parseInt(c);
//   const bottomRight = "#" + parseInt(r + 1) + "-" + parseInt(c + 1);

//   let mineFound = 0;
//   if ($(e.target).hasClass("hasBomb")) {
//     return;
//   }
//   if ($(left).hasClass("hasBomb")) {
//     mineFound++;
//   }
//   if ($(right).hasClass("hasBomb")) {
//     mineFound++;
//   }
//   if ($(topLeft).hasClass("hasBomb")) {
//     mineFound++;
//   }
//   if ($(top).hasClass("hasBomb")) {
//     mineFound++;
//   }
//   if ($(topRight).hasClass("hasBomb")) {
//     mineFound++;
//   }
//   if ($(bottomLeft).hasClass("hasBomb")) {
//     mineFound++;
//   }
//   if ($(bottom).hasClass("hasBomb")) {
//     mineFound++;
//   }
//   if ($(bottomRight).hasClass("hasBomb")) {
//     mineFound++;
//   }

//   if ($(e.target).hasClass("flag")) {
//     return;
//   }

//   if (mineFound > 0) {
//     return $(e.target).text(mineFound).addClass("clickedTile");
//   }
//   if (mineFound === 0) {
//   }
// };

// const clicked = () => {
//   $(".board").on("click", checkGameOver);
//   $(".board").on("click", addFlag);
//   $(".board").on("click", checkMine);
// };

// const render = () => {
//   $(".page").hide();
//   $(app.page).show();
//   renderBoard();
//   generateBomb();
//   clicked();
//   mineCount();
// };
// render();

// const main = () => {
//   $("#startButton").on("click", () => {
//     app.page = "#gamePage";
//     render();
//   });
//   $("#gameButton").on("click", () => {
//     app.page = "#scorePage";
//     render();
//   });
//   $("#return").on("click", () => {
//     app.page = "#startPage";
//     render();
//   });
// };
// main();
