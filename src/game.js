import Ball from "./ball";
import Paddle from "./paddle";
import InputHandler from "./input";
import { buildLevel } from "./level";
import { getLevelName } from "./levelnames";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3
};

export default class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.gameObjects = [];
    this.currentLevel = 0;
    this.currentLevelName = 0;
    this.lives = 3;
    this.gameState = GAMESTATE.MENU;
    this.ball = new Ball(this);
    this.paddle = new Paddle(this);
    this.bricks = [];
    new InputHandler(this.paddle, this);
  }

  start() {
    if (this.gameState !== GAMESTATE.MENU) {
      return;
    }
    this.gameState = GAMESTATE.RUNNING;
    this.currentLevelName = getLevelName(this.currentLevel);
    this.bricks = buildLevel(this, this.currentLevel++);
    this.gameObjects = [this.ball, this.paddle];
  }

  tooglePause() {
    if (this.gameState === GAMESTATE.RUNNING) {
      this.gameState = GAMESTATE.PAUSED;
    } else if (this.gameState === GAMESTATE.PAUSED) {
      this.gameState = GAMESTATE.RUNNING;
    }
  }

  update(deltaTime) {
    if (this.lives === 0) {
      this.gameState = GAMESTATE.GAMEOVER;
    }

    this.prevState = this.gameState;

    if (this.gameState === GAMESTATE.RUNNING) {
      [...this.gameObjects, ...this.bricks].forEach(obj =>
        obj.update(deltaTime)
      );
      this.bricks = this.bricks.filter(obj => !obj.markToDelete);

      if (this.bricks.length < 1) {
        this.gameState = GAMESTATE.MENU;
      }
    }
  }
  draw(ctx) {
    [...this.gameObjects, ...this.bricks].forEach(obj => obj.draw(ctx));

    if (this.gameState === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.width, this.height);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.width / 2, this.height / 2);
    } else if (this.gameState === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.width, this.height);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";

      if (this.currentLevel === 0) {
        ctx.fillText(
          "Shoot Spacebar to start the game,",
          this.width / 2,
          this.height / 2
        );
        ctx.fillText(
          "start with level: " + getLevelName(this.currentLevel),
          this.width / 2,
          this.height / 2 + 40
        );
      } else {
        ctx.fillText(
          "Shoot Space-bar to start level: ",
          this.width / 2,
          this.height / 2
        );
        ctx.fillText(
          getLevelName(this.currentLevel),
          this.width / 2,
          this.height / 2 + 40
        );
      }
    } else if (this.gameState === GAMESTATE.GAMEOVER) {
      ctx.rect(0, 0, this.width, this.height);
      ctx.fillStyle = "rgba(255,0,0,0.6)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.fillText("Game over, my friend!", this.width / 2, this.height * 0.3);
      ctx.fillText(
        "You can carry water for " + this.currentLevelName,
        this.width / 2,
        this.height * 0.3 + 50
      );
      ctx.fillText(
        "Share your achievements on facebook, twitter, instagram :) ",
        this.width / 2,
        this.height * 0.3 + 150
      );

      let date = new Date();
      let dateString =
        date.getHours() +
        ":" +
        date.getMinutes() +
        " " +
        date.getDate() +
        "/" +
          (parseInt(date.getMonth()) + 1) +
        "/" +
        date.getFullYear();

      ctx.fillText(dateString, this.width / 2, this.height / 2 + 100);
    }

    ctx.rect(0, 0, this.width, this.height);
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.fill();

    ctx.font = "12px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Level:     " + this.currentLevel, this.width - 60, 50);
    ctx.fillText("Lives left:" + this.lives, this.width - 60, 30);
    ctx.fillText(this.currentLevelName, this.width - 60, 70);
  }
}
