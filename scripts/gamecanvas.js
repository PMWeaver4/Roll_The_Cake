window.onload = function () {
  var canvas = document.getElementById("gameCanvas");
  var ctx = canvas.getContext("2d");
  let ctx2 = canvas.getContext("2d");

  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;
  var radius = 300;
  var numSpaces = 20;
  var spaceAngle = (2 * Math.PI) / numSpaces;
  var spaceAngle = (2 * Math.PI) / numSpaces;
  var squareSize = 50;
  var imageSize = 50;
  let titleImgSizeHeight = 150;
  let titleImgSizeWidth = 300;

  //html selector
  const playerCommand = document.getElementById("playerCommand");
  const rollButton = document.getElementById("diceRoll");

  //establish objects
  let newPlayer = [];
  //establish arrays
  let players = [];
  // let previousPositions = [];

  //global variables
  let playerCount = 0;

  // Define images
  let images = [
    { src: "../images/chocolate_cake.jpg", name: "chocolate" },
    { src: "../images/sky_cake.jpg", name: "sky" },
    { src: "../images/birthday_cake.jpg", name: "birthday" },
    { src: "../images/flowers_cake.jpg", name: "flower" },
    { src: "../images/confetti_cake.jpg", name: "confetti" },
  ];

  // Define Image objects outside the loop
  let cakeImages = {}; // Object to store loaded Image objects

  // Preload images
  var loadedImages = [];
  var imagesLoaded = 0;
  images.forEach(function (url) {
    var img = new Image();
    img.onload = function () {
      imagesLoaded++;
      if (imagesLoaded === images.length) {
        // All images are loaded, now draw them
        drawImages();
      }
    };
    img.src = url;
    loadedImages.push(img);
  });

  // Draw the circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx2.arc(centerX, centerY, radius * 0.75, 0, 2 * Math.PI);
  ctx.stroke();

  // Draw the spaces on the circle
  for (var i = 0; i < numSpaces; i++) {
    var angle = -(Math.PI / 2) + i * spaceAngle;
    var x = centerX + 0.875 * radius * Math.cos(angle);
    var y = centerY + 0.875 * radius * Math.sin(angle);
    let imgX = x - squareSize / 2;
    let imgY = y - squareSize / 2;

    // Draw square around the number
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.rect(-squareSize / 2, -squareSize / 2, squareSize, squareSize);
    ctx.stroke();

    // Draw number or picture
    if (i == 0) {
      let img = new Image();
      img.src = "../images/sky_cake.jpg";
      img.onload = function () {
        ctx.globalAlpha = 0.25;
        ctx.drawImage(img, imgX, imgY, squareSize, squareSize);
        ctx.globalAlpha = 1.0;
      };
    } else if (i == 4) {
      let img = new Image();
      img.src = "../images/chocolate_cake.jpg";
      img.onload = function () {
        ctx.globalAlpha = 0.25;
        ctx.drawImage(img, imgX, imgY, squareSize, squareSize);
        ctx.globalAlpha = 1.0;
      };
    } else if (i == 8) {
      let img = new Image();
      img.src = "../images/birthday_cake.jpg";
      img.onload = function () {
        ctx.globalAlpha = 0.25;
        ctx.drawImage(img, imgX, imgY, squareSize, squareSize);
        ctx.globalAlpha = 1.0;
      };
    } else if (i == 12) {
      let img = new Image();
      img.src = "../images/flowers_cake.jpg";
      img.onload = function () {
        ctx.globalAlpha = 0.25;
        ctx.drawImage(img, imgX, imgY, squareSize, squareSize);
        ctx.globalAlpha = 1.0;
      };
    } else if (i == 16) {
      let img = new Image();
      img.src = "../images/confetti_cake.jpg";
      img.onload = function () {
        ctx.globalAlpha = 0.25;
        ctx.drawImage(img, imgX, imgY, squareSize, squareSize);
        ctx.globalAlpha = 1.0;
      };
    } else {
      ctx.fillText(i, 0, 0);
    }
    ctx.restore();
  }

  // if (i % 4 === 0) {
  //   let img = loadedImages[i % images.length];
  //   ctx.drawImage(img, imgX, imgY, squareSize, squareSize);
  // } else {
  //   ctx.fillText(i, 0, 0);
  // }
  // ctx.restore();

  let selectNumberOfPlayers,
    cakeSelect,
    play = false;

  let titleImg = new Image();
  titleImg.src = "../images/roll_the_cake_title.png";
  titleImg.onload = function () {
    ctx.drawImage(
      titleImg,
      centerX - titleImgSizeWidth / 2,
      centerY - titleImgSizeHeight / 1.25,
      titleImgSizeWidth,
      titleImgSizeHeight
    );
  };
  // Button event listener
  const startButton = document.getElementById("startButton");
  startButton.addEventListener("click", establishPlayers);

  function establishPlayers() {
    // Hide the game title
    // Clear only the area around the button and image
    ctx.clearRect(
      centerX - radius / 2,
      centerY - radius / 2,
      radius * 1.0,
      radius * 0.9
    );
    startButton.remove();
    selectNumberOfPlayers = true;
    if (selectNumberOfPlayers === true) {
      let string = document.createElement("h2");
      string.textContent = "How many players will there be?";
      // ctx.font = "10px Arial";
      // ctx.fillText(string, centerX - 210, centerY);
      document.getElementById("playerSelectContainer").style.display = "block";
      const howMany = document.getElementById("howMany");
      howMany.appendChild(string);
      const selectPlayersButton = document.getElementById(
        "select-players-button"
      );
      selectPlayersButton.addEventListener("click", () => {
        playerCount = parseInt(document.getElementById("player-count").value);
        cakeSelect = true;
        selectCakes(playerCount);
      });
    }
  }

  let currentPlayer = 1;

  function selectCakes(playerCount) {
    document.getElementById("playerSelectContainer").style.display = "none";
    ctx.clearRect(centerX - 210, centerY - 50, 420, radius * 0.3);
    document.getElementById("cakeChooser").style.display = "block";
    const container = document.getElementById("cakeChooser");

    function promptPlayer() {
      container.innerHTML = "";
      let display = document.createElement("h1");
      display.textContent =
        "Player" + currentPlayer + ", please choose a cake:";
      container.appendChild(display);
      images.forEach((images, index) => {
        const img = document.createElement("img");
        img.src = images.src;
        img.width = imageSize;
        img.height = imageSize;
        img.alt = images.name;
        // Add click event listener to each image
        img.addEventListener("click", () => {
          // Perform actions when image is clicked
          // For example, call a function to handle selection
          handleImageClick(index, currentPlayer); // Pass the index of the image clicked
        });
        container.appendChild(img);
      });
    }

    function entryLocation(cakeName) {
      if (cakeName === "sky") {
        return 0;
      }
      if (cakeName === "chocolate") {
        return 4;
      }
      if (cakeName === "birthday") {
        return 8;
      }
      if (cakeName === "flower") {
        return 12;
      } else {
        return 16;
      }
    }

    function handleImageClick(index) {
      alert(
        `${currentPlayer} you have chosen ${images[index].name} as your cake`
      );
      newPlayer = {
        cakeName: images[index].name,
        playerNumber: currentPlayer,
        position: 20,
        active: true,
        entryLocation: entryLocation(images[index].name),
        image: images[index].src,
        prevPosition: 20,
        prevImgX: 0,
        prevImgY: 0,
      };
      players.push(newPlayer);
      images.splice(index, 1);
      currentPlayer++;
      selectCakes(playerCount);
    }

    function randoCake() {
      let selectedNumber = parseInt(Math.floor(images.length * Math.random()));
      let selectedCake = images[selectedNumber].name;

      return selectedCake;
    }

    if (currentPlayer <= playerCount) {
      promptPlayer();
    } else {
      for (i = currentPlayer; i <= 5; i++) {
        let nameOfCake = randoCake();
        let randoImage = "";
        for (j = 0; j < images.length; j++) {
          if (nameOfCake == images[j].name) {
            randoImage = images[j].src;
            images.splice(j, 1);
          }
        }
        newPlayer = {
          cakeName: nameOfCake,
          playerNumber: i,
          position: 20,
          active: false,
          entryLocation: entryLocation(nameOfCake),
          image: randoImage,
          prevPosition: 20,
          prevImgX: 0,
          prevImgY: 0,
        };
        players.push(newPlayer);
      }
      play = true;
      container.innerHTML = "";
      alert("let's begin");
    }
    console.log(players);
    if (play == true) {
      document.getElementById("dice").style.display = "block";
      gameplay();
    }
  }
  //currentPlayer no longer needed because it begins with 1, playerTurn begins with 0
  let playerTurn = 0;

  //event listener for rollbutton
  rollButton.addEventListener("click", () => {
    rollValue.innerHTML = "";
    let p1 = document.createElement("p");
    let p4 = document.createElement("p");
    let rollNumber = Math.floor(6.0 * Math.random() + 1);
    p1.textContent = rollNumber;
    rollValue.appendChild(p1);

    if (rollNumber == 1 && players[playerTurn].position == 20) {
      playerCommand.innerHTML = "";
      p4.textContent = `Player ${players[playerTurn].cakeName}, good job! Roll again`;
      playerCommand.appendChild(p4);
      players[playerTurn].position = players[playerTurn].entryLocation;
      analyzePosition(playerTurn);
    } else if (players[playerTurn].position == 20) {
      playerCommand.innerHTML = "";
      p4.textContent = `Better luck next time!`;

      playerCommand.appendChild(p4);
      playerTurn++;
      if (playerTurn == playerCount) {
        playerTurn = 0;
      }
    } else {
      playerCommand.innerHTML = "";
      players[playerTurn].position = players[playerTurn].position + rollNumber;
      players[playerTurn].position = players[playerTurn].position % 20;
      analyzePosition(playerTurn);

      playerTurn++;
      if (playerTurn == playerCount) {
        playerTurn = 0;
      }
    }
    gameplay();
  });

  function analyzePosition(i) {
    for (j = 0; j < 5; j++) {
      if (i != j) {
        if (
          players[i].position === players[j].position &&
          players[j].active === true
        ) {
          players[j].position = (players[j].position + 1) % 20;
          console.log(
            `${players[j].cakeName} was bumped to ${players[j].position}`
          );
          analyzePosition(j);
        } else {
          //check to see if they win
          if (
            players[i].position === players[i].entryLocation &&
            players[i].prevPosition != 20
          ) {
            playerWin(i);
          }
          if (players[i].position === players[j].entryLocation) {
            swapPosition(i, j);
          }

          function playerWin(i) {
            rollValue.innerHTML = "";
            rollButton.remove();
            playerCommand.style.display = "none";
            let p2 = document.createElement("p");
            p2.textContent = `Player ${players[playerTurn].cakeName} has won the game!!!`;
            rollValue.appendChild(p2);
            console.log(`${players[i].cakeName} has won the game!`);
          }
          function swapPosition(i, j) {
            let p2 = document.createElement("p");
            if (players[j].position == 20) {
              players[j].position = players[j].entryLocation;
              players[i].position = players[i].position + 1;
              p2.textContent = `Welcome ${players[j].cakeName}!`;
              playerCommand.appendChild(p2);
              p2.textContet = `Boing! ${players[i].cakeName}, you bounced to ${players[i].position}`;
              playerCommand.appendChild(p2);
            } else if (players[j].active === false) {
              players[i].position = players[i].position + 1;
              p2.textContent = `Boing! ${players[i].cakeName}, you bounced to ${players[i].position}`;
              playerCommand.appendChild(p2);
            } else {
              players[j].prevPosition = players[j].position;
              players[j].position = 20;
              p2.textContent = `Sorry ${players[j].cakeName}, back to the center with you.`;
              playerCommand.appendChild(p2);
            }
            updatePositionsAndRedraw();
          }
        }
      }
    }
  }

  function updatePositionsAndRedraw() {
    for (var i = 0; i < numSpaces; i++) {
      for (let j = 0; j < 5; j++) {
        if (players[j].prevPosition != players[j].position) {
          angle = -(Math.PI / 2) + players[j].prevPosition * spaceAngle;
          x = centerX + 0.875 * radius * Math.cos(angle);
          y = centerY + 0.875 * radius * Math.sin(angle);
          let imgX = x - squareSize / 2;
          let imgY = y - squareSize / 2;
          if (players[j].prevPosition != 20) {
            ctx.clearRect(imgX, imgY, squareSize, squareSize);
          }

          ctx.save();
          ctx.translate(x, y);
          ctx.beginPath();
          ctx.rect(-squareSize / 2, -squareSize / 2, squareSize, squareSize);
          ctx.stroke();
          //|| players[j].prevPosition == 20
          if (players[j].prevPosition == 0) {
            let img = new Image();
            img.src = "../images/sky_cake.jpg";
            img.onload = function () {
              ctx.globalAlpha = 0.25;
              ctx.drawImage(
                img,
                players[j].prevImgX,
                players[j].prevImgY,
                squareSize,
                squareSize
              );
              ctx.globalAlpha = 1.0;
            };
          } else if (players[j].prevPosition == 4) {
            let img = new Image();
            img.src = "../images/chocolate_cake.jpg";
            img.onload = function () {
              ctx.globalAlpha = 0.25;
              ctx.drawImage(
                img,
                players[j].prevImgX,
                players[j].prevImgY,
                squareSize,
                squareSize
              );
              ctx.globalAlpha = 1.0;
            };
          } else if (players[j].prevPosition == 8) {
            let img = new Image();
            img.src = "../images/birthday_cake.jpg";
            img.onload = function () {
              ctx.globalAlpha = 0.25;
              ctx.drawImage(
                img,
                players[j].prevImgX,
                players[j].prevImgY,
                squareSize,
                squareSize
              );
              ctx.globalAlpha = 1.0;
            };
          } else if (players[j].prevPosition == 12) {
            let img = new Image();
            img.src = "../images/flowers_cake.jpg";
            img.onload = function () {
              ctx.globalAlpha = 0.25;
              ctx.drawImage(
                img,
                players[j].prevImgX,
                players[j].prevImgY,
                squareSize,
                squareSize
              );
              ctx.globalAlpha = 1.0;
            };
          } else if (players[j].prevPosition == 16) {
            let img = new Image();
            img.src = "../images/confetti_cake.jpg";
            img.onload = function () {
              ctx.globalAlpha = 0.25;
              ctx.drawImage(
                img,
                players[j].prevImgX,
                players[j].prevImgY,
                squareSize,
                squareSize
              );
              ctx.globalAlpha = 1.0;
            };
          } else if (players[j].prevPosition != 20) {
            ctx.fillText(players[j].prevPosition, 0, 0);
          }
          ctx.restore();

          // Update previous position to current position
          players[j].prevPosition = players[j].position;
          players[j].prevImgX = imgX;
          players[j].prevImgY = imgY;

          // Draw the image in the new position
          if (players[j].position != 20) {
            angle = -(Math.PI / 2) + players[j].position * spaceAngle;
            x = centerX + 0.875 * radius * Math.cos(angle);
            y = centerY + 0.875 * radius * Math.sin(angle);
            imgX = x - squareSize / 2;
            imgY = y - squareSize / 2;

            let img = new Image();
            img.src = players[j].image;
            img.onload = function () {
              ctx.drawImage(img, imgX, imgY, squareSize, squareSize);
            };
            ctx.restore();
          }
        }
      }
    }
  }

  function gameplay() {
    let p2 = document.createElement("p");
    let p3 = document.createElement("p");
    p2.textContent = `Player ${players[playerTurn].cakeName} turn`;
    playerCommand.appendChild(p2);

    if (players[playerTurn].position == 20) {
      p3.textContent = `${players[playerTurn].cakeName} roll a "1" to get out of the center`;
      playerCommand.appendChild(p3);
    } else {
      // playerCommand.innerHTML = "";
      // rollValue.innerHTML = "";
      p3.textContent = `${players[playerTurn].cakeName} roll!`;
      playerCommand.appendChild(p3);
    }

    //display image of player who's turn it is
    const imageDisplay = document.getElementById("imageDisplay");
    imageDisplay.innerHTML = "";
    let currentCakeImg = new Image();
    currentCakeImg.src = players[playerTurn].image;
    currentCakeImg.width = imageSize;
    currentCakeImg.height = imageSize;
    imageDisplay.appendChild(currentCakeImg);

    //draw positions on the canvas

    updatePositionsAndRedraw();

    // Update positions and redraw images function
  }
};
