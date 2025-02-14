import {
  PLAYER_TOTAL_LIFE,
  INITIAL_PLAYER_SHOOT_SPEED,
  PLAYER_SPECIAL_LIMIT,
  INITIAL_PLAYER_MOVE_SPEED,
  INITIAL_PLAYER_LVL
} from "../helpers/constants.js";
import loadPlayerHealthMeter from "./health.js";
import loadPlayerSpecialMeter from "./special.js";

export default function loadPlayer(scoreCounter) {
  const player = add([
    sprite("nav"),
    pos(center().x, height() - 100),
    scale(2),
    area({ scale: 0.6 }),
    origin("center"),
    health(PLAYER_TOTAL_LIFE),
    "player",
    {
      special: 0,
      shootSpeed: INITIAL_PLAYER_SHOOT_SPEED,
      moveSpeed: INITIAL_PLAYER_MOVE_SPEED,
      lvl: INITIAL_PLAYER_LVL,
      dead: false,
      isAlive: () => !player.dead,
      invincible: false,
      isInvincible: () => player.invincible,
      reloadMeters: () => {
        destroyAll("hp");
        loadPlayerHealthMeter(PLAYER_TOTAL_LIFE, player.hp());

        destroyAll("sp");
        loadPlayerSpecialMeter(PLAYER_SPECIAL_LIMIT, player.special);
      },
      backgroundProgression: 0,
      asteroidsDestroyed: 0,
    }
  ]);

  player.play("idle", { loop: true });

  player.action(() => {
    // player.angle = player.pos.angle(mousePos()) - 90;
    if (player.hp() <= 0) {
      const asteroidsDestroyed = player.asteroidsDestroyed;
      player.dead = true;
      player.destroy();
      
      wait(0.5, () => {
        go("end", scoreCounter, asteroidsDestroyed);
      })
    }
  })

  return player;
}