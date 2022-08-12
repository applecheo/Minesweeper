import $ from "jquery";
console.log($);

const board = [];
let row;
let column;
const minePosition = [];
let bomb;
let isGameOver = false;
let flagOn = false;
let isWin = false;
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

//render board intermediate
const renderBoard = () => {
  const $board = $("#board").empty();
  $("#board1").hide();
  $("#board3").hide();
  for (let i = 0; i < row; i++) {
    let row = [];
    for (let j = 0; j < column; j++) {
      let id = i + "-" + j;
      const div = $("<div>").attr("id", id);
      div.on("click", clicked(id));
      $board.append(div);
      row.push(div);
    }
    board.push(row);
  }
};
//render board beginner
const renderBoard1 = () => {
  const $board = $("#board1").empty();
  $("#board").hide();
  $("#board3").hide();
  for (let i = 0; i < row; i++) {
    let row = [];
    for (let j = 0; j < column; j++) {
      let id = i + "-" + j;
      const div = $("<div>").attr("id", id);
      div.on("click", clicked(id));
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
// let id = i + "-" + j;
//       const div = $("<div>").attr("id", id);
//       div.on("click", clicked);
//       $board.append(div);
//       row.push(div);
//     }
//     board.push(row);
//   }
// };

// adding flag

const addFlag = () => {
  if (flagOn) {
    flagOn = false;
    $("#toggleFlag").removeClass("clicked");
  } else {
    flagOn = true;
    $("#toggleFlag").addClass("clicked");
  }
};

$("#toggleFlag").on("click", addFlag);

const showMine = () => {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      let tile = board[i][j];
      if (tile.hasClass("hasBomb")) {
        board[i][j].text("💣");
      }
    }
  }
};

//onclick function
const clicked = (id) => () => {
  if (flagOn) {
    if ($("#" + id).text() === "") {
      $("#" + id).text("🚩");
    } else if ($("#" + id).text() === "🚩") {
      $("#" + id).text("");
    }
    return;
  }
  if (isWin === true) {
    return;
  }
  if (minePosition.includes(id)) {
    showMine();
    isGameOver = true;
    $("#totalMine").text("Game Over");
  }

  //get mine position
  const position = id.split("");
  const id1 = parseInt(position[0]);
  const id2 = parseInt(position[2]);

  checkForMine(id1, id2);
};

const checkForMine = (id1, id2) => {
  if (id1 < 0 || row <= id1) {
    return;
  }
  if (id2 < 0 || column <= id2) {
    return;
  }
  if (isGameOver === true) {
    return;
  }

  if (isWin === true) {
    return;
  }

  if ($("#" + id1 + "-" + id2).hasClass("clicked")) {
    return;
  }

  board[id1][id2].css("background", "white").addClass("clicked");

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

  if (mineCount > 0) {
    board[id1][id2].text(mineCount);
  } else {
    checkForMine(id1, id2 - 1);
    checkForMine(id1, id2 + 1);

    checkForMine(id1 - 1, id2 - 1);
    checkForMine(id1 - 1, id2);
    checkForMine(id1 - 1, id2 + 1);

    checkForMine(id1 + 1, id2 - 1);
    checkForMine(id1 + 1, id2);
    checkForMine(id1 + 1, id2 + 1);
  }
};

const checkTile = (id1, id2) => {
  if ($("div .clicked").length === row * column - bomb) {
    isWin = true;
    $("#totalMine").text("Win liao");
    return 0;
  }
  if ($("#" + id1 + "-" + id2).hasClass("hasBomb")) {
    return 1;
  } else {
    return 0;
  }
};
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
