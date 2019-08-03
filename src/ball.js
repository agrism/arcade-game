import { detectCollision } from "./collitionDetection";

export default class Ball {
  constructor(game) {
    this.game = game;
    this.height = 16;
    this.width = 16;
    this.image = document.getElementById("imageBall");
    this.reset();
  }

  reset() {
    this.speed = { x: 5, y: 5 };
    this.position = { x: 10, y: 10 };
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.height,
      this.width
    );
  }

  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    let bottomOfBall = this.position.y + this.height;

    // top
    if (this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }

    // bottom
    if (bottomOfBall > this.game.height) {
      this.reset();
      this.game.lives--;
    }

    // wall
    if (this.position.x + this.width > this.game.width || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }

    if (detectCollision(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
    }
  }
}
