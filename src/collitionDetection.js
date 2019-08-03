export function detectCollision(ball, gameObject) {
  let bottomOfBall = ball.position.y + ball.height;
  let topOfBall = ball.position.y;
  let leftOfBall = ball.position.x;
  let rightOfBall = leftOfBall + ball.width;

  let topOfGameObject = gameObject.position.y;
  let leftSideOfGameObject = gameObject.position.x;
  let rightSideOfGameObject = leftSideOfGameObject + gameObject.width;
  let bottomOfObject = topOfGameObject + gameObject.height;

  if (
    bottomOfBall >= topOfGameObject &&
    topOfBall <= bottomOfObject &&
    leftOfBall <= rightSideOfGameObject &&
    rightOfBall >= leftSideOfGameObject
  ) {
    return true;
  }
  return false;
}
