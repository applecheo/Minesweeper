import $ from "jquery";
console.log($);

const board = [];
let row;
let column;
const minePosition = [];
let bomb;
let isGameOver = false;
let flagOn = false;
let tilesClicked = row * column - bomb;
let page = "#startPage";

//make Bomb
function generateBomb() {
  let arr = [];
  while (arr.length < bomb) {
    let randomNum = Math.floor(Math.random() * row);
    let randomNum2 = Math.floor(Math.random() * column);
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
  $("#board1").hide();
  $("#board3").hide();
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
};

const renderBoard1 = () => {
  const $board = $("#board1").empty();
  $("#board").hide();
  $("#board3").hide();
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
};

// const renderBoard3 = () => {
//   const $board = $("#board3").empty();
//   $("#board1").hide();
//   $("#board").hide();
//   for (let i = 0; i < row; i++) {
//     let row = [];
//     for (let j = 0; j < column; j++) {
//       const div = $("<div>").attr("id", i + "-" + j);
//       div.on("click", clicked);
//       $board.append(div);
//       row.push(div);
//     }
//     board.push(row);
//   }
// };

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

$("#toggleFlag").on("click", addFlag);

function showMine() {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      let tile = board[i][j];
      if (tile.hasClass("hasBomb")) {
        board[i][j].text("💣");
      }
    }
  }
}

//onclick function
function clicked() {
  tilesClicked--;

  if (flagOn) {
    if ($("#" + this.id).text() === "") {
      $("#" + this.id).text("🚩");
    } else if ($("#" + this.id).text() === "🚩") {
      $("#" + this.id).text("");
    }
    return;
  }

  if (minePosition.includes(this.id)) {
    showMine();
    isGameOver = true;
    $("#totalMine").text("Game Over");
  }

  //get mine position
  const position = this.id.split("");
  const id1 = parseInt(position[0]);
  const id2 = parseInt(position[2]);

  checkForMine(id1, id2);
}

function checkForMine(id1, id2) {
  if (isGameOver === true) {
    return 0;
  }

  if ($("#" + id1 + "-" + id2).hasClass("clicked")) {
    return 0;
  }
  board[id1][id2].css("background", "white").addClass("clicked");

  if (tilesClicked === 0) {
    $("#totalMine").text("Win liao");
  }

  let mineCount = 0;

  //side
  mineCount = checkTile(id1, id2 - 1) + mineCount;
  mineCount = checkTile(id1, id2 + 1) + mineCount;
  //top
  mineCount = checkTile(id1 - 1, id2 - 1) + mineCount;
  mineCount = checkTile(id1 - 1, id2) + mineCount;
  mineCount = checkTile(id1 - 1, id2 + 1) + mineCount;
  //bottom
  mineCount = checkTile(id1 + 1, id2 - 1) + mineCount;
  mineCount = checkTile(id1 + 1, id2) + mineCount;
  mineCount = checkTile(id1 + 1, id2 + 1) + mineCount;

  // if (mineCount > 0) {
  board[id1][id2].text(mineCount);
  // } else {
  //   checkForMine(id1, id2 - 1);
  //   checkForMine(id1, id2 + 1);

  //   checkForMine(id1 - 1, id2 - 1);
  //   checkForMine(id1 - 1, id2);
  //   checkForMine(id1 - 1, id2 + 1);

  //   checkForMine(id1 + 1, id2 - 1);
  //   checkForMine(id1 + 1, id2);
  //   checkForMine(id1 + 1, id2 + 1);
  // }
}

function checkTile(id1, id2) {
  if ($("#" + id1 + "-" + id2).hasClass("hasBomb")) {
    return 1;
  } else {
    return 0;
  }
}
const render = () => {
  $(".page").hide();
  $(page).show();
};
render();

const main = () => {
  $("#beginnerButton").on("click", () => {
    page = "#gamePage";
    row = 8;
    column = 8;
    bomb = 8;
    $(".mineCount").text(bomb);
    renderBoard1();
    generateBomb();
    render();
  });
  $("#intermediateButton").on("click", () => {
    page = "#gamePage";
    row = 10;
    column = 10;
    bomb = 12;
    $(".mineCount").text(bomb);
    renderBoard();
    generateBomb();
    render();
  });
  // $("#expertButton").on("click", () => {
  //   page = "#gamePage";
  //   row = 16;
  //   column = 32;
  //   bomb = 99;
  //   $(".mineCount").text(bomb);
  //   renderBoard3();
  //   generateBomb();
  //   render();
  // });
  $("#gameButton").on("click", () => {
    page = "#scorePage";
    render();
  });
  $("#return").on("click", () => {
    page = "#startPage";
    render();
  });
};
main();
