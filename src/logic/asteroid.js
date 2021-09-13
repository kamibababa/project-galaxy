import loadPlayerSpecialMeter from "../logic/special.js";

export default function loadAsteroid(player, life, speed, scoreCounter, specialLimit) {
  loop(0.5, () => {
    const asteroid = add([
      sprite("asteroid"),
      pos(rand(0, width()), -20),
      scale(2),
      area({ scale: 1 }),
      origin("center"),
      health(life),
      rotate(rand(-30, 30)),
      "asteroid",
      "enemy"
    ]);
    
    asteroid.play("fly", { loop: true });
  });

  action("asteroid", (a) => {
    a.move(a.angle * (-9), speed);

    if (a.pos.y > height()) {
      a.destroy();
    }

    if (a.hp() <= 0) {
      a.destroy();
      scoreCounter.value += 1;
      scoreCounter.text = scoreCounter.value;

      player.special += 1;
      destroyAll("sp");
      loadPlayerSpecialMeter(specialLimit, player.special);
    }
  });
}