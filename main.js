(function () {
  const colors = ["red", "yellow", "blue", "green"];

  const form = document.getElementById("gameSetup");
  const initGameButton = document.getElementById("initGame");
  const restartGameButton = document.getElementById("restartGame");
  const playGameButton = document.getElementById("playGame");
  const gameBody = document.getElementById("gameBody");
  const gameText = document.getElementById("gameText");

  restartGameButton.style.display = "none";
  gameText.style.display = "none";

  let gameBodyDimensions = gameBody.getBoundingClientRect();
  let playerPositions = [];

  let totalPlayers = 0;
  let gridLength = 20;

  let currentPlayer = 1;

  function initGame() {
    gameText.style.display = "flex";
    totalPlayers = form.elements["playerCount"].value;
    gridLength = form.elements["gridLength"].value;

    console.log("Total Players :", totalPlayers);
    console.log("Grid Length :", gridLength);

    for (let i = 0; i <= totalPlayers; i++) {
      playerPositions.push({
        player: `${i}`,
        position: 0,
        color: colors[i - 1],
      });
    }

    for (let i = 1; i <= gridLength; i++) {
      const block = document.createElement("div");
      gameBodyDimensions = gameBody.getBoundingClientRect();
      block.style.position = "relative";
      block.style.backgroundColor = "#11181c";
      block.style.padding = "4px";
      block.style.display = "flex";
      block.style.alignItems = "center";
      block.style.justifyContent = "center";
      block.style.flexWrap = "wrap";
      block.style.gap = "4px";
      block.style.borderRadius = "4px";

      const blockLabel = document.createElement("p");
      blockLabel.innerHTML = i;
      blockLabel.style.position = "absolute";
      blockLabel.style.color = "#f1f3f5";
      blockLabel.style.right = "8px";
      blockLabel.style.bottom = "8px";

      block.appendChild(blockLabel);
      gameBody.appendChild(block);
    }

    for (let i = 1; i <= totalPlayers; i++) {
      const playerToken = document.createElement("span");
      playerToken.style.width = "15px";
      playerToken.style.height = "15px";
      playerToken.style.borderRadius = "8px";
      playerToken.style.backgroundColor = playerPositions[i].color;
      playerToken.id = `Player_${i}`;
      gameBody.children[playerPositions[i - 1].position].appendChild(
        playerToken
      );
    }

    initGameButton.style.display = "none";
    restartGameButton.style.display = "inline-block";

    let token = document.createElement("span");
    token.style.width = "20px";
    token.style.height = "20px";
    token.style.borderRadius = "20px";
    token.style.backgroundColor = playerPositions[currentPlayer].color;

    let contentDiv = document.createElement("div");
    contentDiv.classList.add("gameTextHead");

    let tokenText = document.createElement("span");
    tokenText.innerHTML = `Current Turn : Player ${currentPlayer}`;

    contentDiv.appendChild(tokenText);
    contentDiv.appendChild(token);

    gameText.appendChild(contentDiv);
    gameText.scrollTop = gameText.scrollHeight;
  }

  function checkWinner() {
    for (let i = 0; i <= totalPlayers; i++) {
      if (playerPositions[i].position === gridLength - 1) {
        let token = document.createElement("span");
        token.style.width = "20px";
        token.style.height = "20px";
        token.style.borderRadius = "20px";
        token.style.backgroundColor = playerPositions[i].color;

        let contentDiv = document.createElement("div");
        contentDiv.classList.add("gameTextHead");

        let tokenText = document.createElement("span");
        tokenText.innerHTML = `Player ${currentPlayer} won`;

        contentDiv.appendChild(tokenText);
        contentDiv.appendChild(token);

        gameText.appendChild(contentDiv);
        playGameButton.disabled = true;
        return true;
      }
    }
    return false;
  }

  function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function movePlayer() {
    let diceValue = rollDice();
    const currentActivePlayer = document.getElementById(
      `Player_${currentPlayer}`
    );

    if (diceValue + playerPositions[currentPlayer].position <= gridLength - 1) {
      gameBody.children[playerPositions[currentPlayer].position].removeChild(
        currentActivePlayer
      );
      gameBody.children[
        playerPositions[currentPlayer].position + diceValue
      ].appendChild(currentActivePlayer);

      playerPositions[currentPlayer].position += diceValue;

      let token = document.createElement("span");
      token.style.width = "20px";
      token.style.height = "20px";
      token.style.borderRadius = "20px";
      token.style.backgroundColor = playerPositions[currentPlayer].color;

      let contentDiv = document.createElement("div");
      contentDiv.classList.add("gameTextHead");

      let tokenText = document.createElement("span");
      tokenText.innerHTML = `Player ${currentPlayer} moved by ${diceValue} to ${
        playerPositions[currentPlayer].position + 1
      }`;

      contentDiv.appendChild(tokenText);
      contentDiv.appendChild(token);

      gameText.appendChild(contentDiv);
      gameText.scrollTop = gameText.scrollHeight;
    }

    if (!checkWinner()) {
      if (currentPlayer < totalPlayers) {
        currentPlayer++;
      } else {
        currentPlayer = 1;
      }

      let token = document.createElement("span");
      token.style.width = "20px";
      token.style.height = "20px";
      token.style.borderRadius = "20px";
      token.style.backgroundColor = playerPositions[currentPlayer].color;

      let contentDiv = document.createElement("div");
      contentDiv.classList.add("gameTextHead");

      let tokenText = document.createElement("span");
      tokenText.innerHTML = `Current Turn : Player ${currentPlayer}`;

      contentDiv.appendChild(tokenText);
      contentDiv.appendChild(token);

      gameText.appendChild(contentDiv);
      gameText.scrollTop = gameText.scrollHeight;
    }
  }

  initGameButton.addEventListener("click", initGame);
  restartGameButton.addEventListener("click", () => location.reload());
  playGameButton.addEventListener("click", movePlayer);
})();
