export function loadEndScene(currentLanguage) {
  scene("end", (playerScore) => {
    let playerBest = getData("player-best", 0) || 0;

    if (playerScore.value > playerBest) {
      playerBest = playerScore.value;
      setData("player-best", playerScore.value);
    }

    layers([
      "bg",
      "ui",
    ], "end");
  
    add([
      sprite("galaxy3", { width: width(), height: height(), }),
      pos(0, 0),
      layer("bg"),
    ]);

    add([
      text(currentLanguage.battleReport.title),
      pos(center().x, center().y - 120),
      origin("center"),
      layer("ui"),
      scale(4),
    ]);
  
    add([
      text(currentLanguage.battleReport.asteroids + playerScore.value, 64),
      pos(center().x, center().y + 80),
      origin("center"),
      layer("ui"),
      scale(3),
    ]);
  
    keyPress("space", () => {
      go("menu", playerBest);
    });
  });
}