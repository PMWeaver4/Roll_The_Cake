//html selectors

const rollDiv = document.getElementById("roll");
// const setUpDiv = docoument.getElementById("setup");

const start = async () => {
  let p1 = document.createElement("p");
  p1.textContent = Math.floor(6.0 * Math.random() + 1);
  rollDiv.appendChild(p1);
};
