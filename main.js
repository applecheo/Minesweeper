import $ from "jquery";
console.log($);

const app = {
  board: [
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
  ],
  // board1: [],
  bomb: 8,
  row: 8,
  column: 8,
  flag: false,
  flagCount: 8,
  page: "#startPage",
  isBottom: false,
  isTop: false,
  isLeft: false,
  isRight: false,
};

//create board
const renderBoard = () => {
  const $board = $("#board").empty();
  for (let i = 0; i < app.column; i++) {
    const $div = $("<div>");
    for (let j = 0; j < app.column; j++) {
      const $innerDiv = $("<div>")
        .text(app.board[i][j])
        .addClass("board")
        .attr("id", i + "-" + j);

      $div.append($innerDiv);
    }
    $board.append($div);
  }
};

//board1
// const renderBoard1 = () => {
//   const $board = $("#board").empty();
//   for (let i = 0; i < app.row; i++) {
//     const row = [];
//     for (let j = 0; j < app.column; j++) {
//       const $column = $("<div>");
//       row.push($column);
//     }
//     app.board1.push(row);
//   }
//   $($board).append(app.board1);
// };
// renderBoard1();
//add bomb
const generateBomb = () => {
  let arr = [];
  while (arr.length < app.bomb) {
    let randomNum = Math.floor(Math.random() * app.bomb);
    let randomNum2 = Math.floor(Math.random() * app.bomb);
    if (arr.includes(randomNum + "-" + randomNum2) === false) {
      arr.push(randomNum + "-" + randomNum2);
    }
  }
  for (const bomb of arr) {
    $("#" + bomb).addClass("hasBomb");
  }
  return arr;
};

//add flag
document.body.onkeyup = (e) => {
  if (e.keyCode == 32 && app.flag === false) {
    $("#toggleFlag").removeClass("hide");
    app.flag = true;
  } else if (e.keyCode == 32 && app.flag === true) {
    $("#toggleFlag").addClass("hide");
    app.flag = false;
  }
};

const addFlag = (e) => {
  if (app.flag === true && $(e.target).hasClass("flag")) {
    $(e.target).removeClass("flag");
    app.flagCount++;
  } else if (app.flag === true && app.flagCount > 0) {
    $(e.target).addClass("flag");
    app.flagCount--;
  }
};

//check for mine
const checkGameOver = (e) => {
  if ($(e.target).hasClass("hasBomb") && app.flag === false) {
    alert("dead");
  } else {
    alert("not checked");
  }
};

//mine count
const mineCount = () => {
  return $(".mineCount").text(app.bomb);
};

const leftColumn = (e) => {
  const $id = $(e.target).attr("id");
  if ($id.slice(-1) - 1 === -1) {
    console.log("im left column");
  }
};

const rightColumn = (e) => {
  const $id = $(e.target).attr("id");
  if ($id.slice(-1) - app.column === -1) {
    console.log("im right column");
  }
};

const topRow = (e) => {
  const $id = $(e.target).attr("id");
  if ($id.slice(0, 1) - 1 === -1) {
    console.log("im top row");
  }
};

// const bottomRow = (e) => {
//   let $id = $(e.target).attr("id");
//   if ($id.slice(0, 1) - app.row === -1) {
//     console.log("im bottom row");
//   }
// };

const bottomRow = (e) => {
  const $id = $(e.target).attr("id");
  const row = parseInt($id[0]);
  //check left .. create function for all direction
  const column = parseInt($id[2] - 1);
  const join = "#" + row + "-" + column;
  console.log($(join));
  if ($id.slice(0, 1) - app.row === -1) {
    console.log("im bottom row");
  }
};

const checkMine = (e) => {
  minesFound = 0;
  //check left and right
  const $id = $(e.target).attr("id");
  const row = parseInt($id[0]);
  const column = parseInt($id[2] - 1);
  const join = "#" + row + column;
  console.log(join);
};

const clicked = () => {
  $(".board").on("click", checkGameOver);
  $(".board").on("click", addFlag);
  $(".board").on("click", leftColumn);
  $(".board").on("click", rightColumn);
  $(".board").on("click", topRow);
  $(".board").on("click", bottomRow);
};

const render = () => {
  $(".page").hide();
  $(app.page).show();
  renderBoard();
  generateBomb();
  clicked();
  mineCount();
  console.log(app);
};
render();

const main = () => {
  $("#startButton").on("click", () => {
    app.page = "#gamePage";
    render();
  });
  $("#gameButton").on("click", () => {
    app.page = "#scorePage";
    render();
  });
  $("#return").on("click", () => {
    app.page = "#startPage";
    render();
  });
};
main();

//check mine
//top row
// console.log((e.target).attr("id"))
//left column
//right column
// bottom column
//normal check
