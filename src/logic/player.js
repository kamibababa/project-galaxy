import { PLAYER_TOTAL_LIFE, INITIAL_PLAYER_SHOOT_SPEED, PLAYER_SPECIAL_LIMIT } from "../helpers/constants.js";
import loadCounter from "./counter.js";
import loadPlayerHealthMeter from "./health.js";
import loadPlayerSpecialMeter from "./special.js";

export default function loadPlayer(scoreCounter) {
  const player = add([
    sprite("nav"),
    pos(center().x, height() - 100),
    scale(2),
    area({ scale: 0.7 }),
    origin("center"),
    health(PLAYER_TOTAL_LIFE),
    "player",
    {
      special: 0,
      shootSpeed: INITIAL_PLAYER_SHOOT_SPEED,
      lvl: 1,
      dead: false,
      isAlive: () => !player.dead,
      invincible: true,
      isInvincible: () => player.invincible,
      reloadMeters: () => {
        destroyAll("hp");
        loadPlayerHealthMeter(PLAYER_TOTAL_LIFE, player.hp());

        destroyAll("sp");
        loadPlayerSpecialMeter(PLAYER_SPECIAL_LIMIT, player.special);
      }
    }
  ]);

  player.play("idle", { loop: true });
  player.collides("enemy", (e) => {
    player.hurt(e.damage);
    loadCounter(e.damage, player.pos, 1.8);

    player.reloadMeters();

    shake(3);
    e.destroy();
    if (player.hp() <= 0) {
      player.dead = true;
      player.destroy();
      
      wait(0.5, () => {
        go("end", scoreCounter);
      })
    }
  });

  return player;
}