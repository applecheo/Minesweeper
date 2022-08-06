import $ from "jquery";
console.log($);

const app = {
  board: [
    ["?", "?", "?", "?", "?", "?", "?", "?"],
    ["?", "?", "?", "?", "?", "?", "?", "?"],
    ["?", "?", "?", "?", "?", "?", "?", "?"],
    ["?", "?", "?", "?", "?", "?", "?", "?"],
    ["?", "?", "?", "?", "?", "?", "?", "?"],
    ["?", "?", "?", "?", "?", "?", "?", "?"],
    ["?", "?", "?", "?", "?", "?", "?", "?"],
    ["?", "?", "?", "?", "?", "?", "?", "?"],
  ],
  bomb: 8,
  flag: 8,
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

//adding bomb
const generateBomb = () => {
  let arr = [];
  while (arr.length < app.bomb) {
    let randomNum = Math.floor(Math.random() * 8);
    let randomNum2 = Math.floor(Math.random() * 8);
    if (arr.includes(randomNum + "-" + randomNum2) === false) {
      arr.push(randomNum + "-" + randomNum2);
    }
  }
  for (let bomb of arr) {
    $("#" + bomb).addClass("hasBomb");
  }
  return arr;
};

const clicked = () => {
  $(".board").on("click", () => console.log("hello"));
};

const render = () => {
  $(".page").hide();
  $(app.page).show();
  renderBoard();
  generateBomb();
  clicked();
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
