function formSelect() {
  chooseForm.addEventListener("submit", async (e) => {
    const numberOfPlayers = document.getElementById("numberOfPlayers").value;
    e.preventDefault();
    try {
      if (numberOfPlayers == 1) {
      }
    } catch (err) {
      console.log(err);
    }
  });
}
