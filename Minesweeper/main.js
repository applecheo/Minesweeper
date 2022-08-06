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
  bomb: 8,
  flag: false,
  page: "#startPage",
};

//create board
const renderBoard = () => {
  const $board = $("#board").empty();
  for (let i = 0; i < 8; i++) {
    const $div = $("<div>");
    for (let j = 0; j < 8; j++) {
      const $innerDiv = $("<div>")
        .text(app.board[i][j])
        .addClass("board")
        .attr("id", i + "-" + j);

      $div.append($innerDiv);
    }
    $board.append($div);
  }
};

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
  } else if (app.flag === true) {
    $(e.target).addClass("flag");
  }
};

//check for mine
const checkMine = (e) => {
  if ($(e.target).hasClass("hasBomb")) {
    alert("dead");
  } else {
    alert("not checked");
  }
};

//mine count
const mineCount = () => {
  return $(".mineCount").text(app.bomb);
};

const clicked = () => {
  $(".board").on("click", checkMine);
  $(".board").on("click", addFlag);
};

const render = () => {
  $(".page").hide();
  $(app.page).show();
  renderBoard();
  generateBomb();
  clicked();
  mineCount();
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
