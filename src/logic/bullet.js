import { isMobile, BULLET_DAMAGE, PLAYER_MAX_LVL } from "../helpers/constants.js";

export default function loadBullet() {
  const player = get("player")[0];

  loop(player.shootSpeed, () => {
    if (player.isAlive() && !player.isInvincible() && keyIsDown("x") || isMobile) {
      add([
        sprite("red-bullet"),
        area({ scale: 0.8 }),
        origin("center"),
        pos(player.pos.x, player.pos.y - 18),
        scale(1.8),
        "bullet",
        { damage: player.lvl > 1 ? BULLET_DAMAGE / 2 : BULLET_DAMAGE }
      ]);

      for(let n = 1; n < player.lvl; n++) {
        if (n < 6) {
          add([
            sprite("red-bullet"),
            area({ scale: 0.8 }),
            origin("center"),
            pos(player.pos.x - (12 * n), player.pos.y + (4 * n)),
            scale(1.5),
            "bullet",
            { damage: BULLET_DAMAGE / 2 }
          ]);
          add([
            sprite("red-bullet"),
            area({ scale: 0.8 }),
            origin("center"),
            pos(player.pos.x + (12 * n), player.pos.y + (4 * n)),
            scale(1.5),
            "bullet",
            { damage: BULLET_DAMAGE / 2 }
          ]);
        }
        if (n >= 6 && n <= PLAYER_MAX_LVL) {
          add([
            sprite("yellow-bullet"),
            area({ scale: 0.8 }),
            origin("center"),
            pos(player.pos.x - (12 * n), player.pos.y + (4 * n)),
            scale(1),
            rotate(-10),
            "bullet",
            "diagonal-left",
            { damage: BULLET_DAMAGE / 4 }
          ]);
          add([
            sprite("yellow-bullet"),
            area({ scale: 0.8 }),
            origin("center"),
            pos(player.pos.x + (12 * n), player.pos.y + (4 * n)),
            scale(1),
            rotate(10),
            "bullet",
            "diagonal-right",
            { damage: BULLET_DAMAGE / 4 }
          ]);
        }
      }
    }
  });
}