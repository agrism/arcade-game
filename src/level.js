import Brick from "./brick";

export function buildLevel(game, level) {
  let bricks = [];

  let genLevels = generateLevel(level);

  genLevels.forEach((row, rowIndex) => {
    row.forEach((brick, brickIndex) => {
      if (brick === 1) {
        let position = {
          x: 80 * brickIndex,
          y: 20 + 24 * rowIndex
        };
        bricks.push(new Brick(game, position));
      }
    });
  });

  return bricks;
}

function generateLevel(level) {
  level++;
  let calculatedLevel = [];

  for (let row = 0; row < getRows(level); row++) {
    let calculatedRow = [];
    for (let itemInRow = 0; itemInRow <= 8; itemInRow++) {
      calculatedRow.push(getOneOrZerro());
    }
    calculatedLevel.push(calculatedRow);
  }

  return calculatedLevel;
}

function getOneOrZerro() {
  return Math.round(Math.random());
}

function getRows(level) {
  getRandomIntegerTill(level);
  let tempRows = level;
  return tempRows > 0 ? tempRows : 1;
}

function getRandomIntegerTill(a) {
  return Math.floor(Math.random() * a);
}
