let moves = document.querySelectorAll(".move");
let score = document.querySelector("#sval");
score.innerText = 0;
let selected = false;
let menu = document.querySelector(".selection");
async function rst() {
  let board = document.querySelector(".compete");
  board.classList.add("hide");
  document.querySelector(".outer1").classList.remove("playeranim");
  document.querySelector(".outer2").classList.remove("houseanim");
  document.querySelector(".message").classList.add("cloak");
  document.querySelector(".message").classList.remove("high");
  setTimeout(
    () => document.querySelector(".message").classList.add("hide"),
    200
  );
  document.querySelector(".ply").remove();
  document.querySelector(".mach").remove();
  menu.classList.remove("cloak");
  setTimeout(() => {
    menu.classList.remove("hide");
  }, 250);
  selected = false;
}
document.querySelector(".rst").addEventListener("click", () => {
  rst();
});
for (let i = 0; i < 5; i++) {
  moves[i].addEventListener("click", async () => {
    if (!selected) {
      let cur = moves[i].classList[0];
      selected = true;
      menu.classList.add("cloak");
      setTimeout(() => {
        menu.classList.add("hide");
      }, 250);
      setTimeout(() => {
        solve(cur);
      }, 400);
    }
  });
}
function won(win, draw = false) {
  let winner = document.querySelector(".whowon");
  if (draw) winner.innerText = "DRAW";
  else {
    if (win) winner.innerText = "YOU WON";
    else winner.innerText = "YOU LOSE";
  }
  let message = document.querySelector(".message");
  message.classList.remove("hide");
  setTimeout(() => {
    message.classList.add("high");
    message.classList.remove("cloak");
    if (!draw && win) score.innerText = parseInt(score.innerText) + 1;
    else if (!draw && !win)
      score.innerText =
        parseInt(score.innerText) - 1 > 0 ? parseInt(score.innerText) - 1 : 0;
  }, 2400);
}
function solve(user) {
  let comp = moves[Math.floor(Math.random() * 5)].classList[0];
  console.log(comp);
  gen(user, comp);
  setTimeout(() => {
    document.querySelector(".outer1").classList.add("playeranim");
    document.querySelector(".outer2").classList.add("houseanim");
  }, 1200);
  if (comp == user) {
    won(true, true);
    console.log("Draw");
    return;
  }
  if (user == "scissors") {
    if (comp == "paper" || comp == "lizard") won(true);
    else won(false);
  } else if (user == "rock") {
    if (comp == "scissors" || comp == "lizard") won(true);
    else won(false);
  } else if (user == "paper") {
    if (comp == "spock" || comp == "rock") won(true);
    else won(false);
  } else if (user == "spock") {
    if (comp == "scissors" || comp == "rock") won(true);
    else won(false);
  } else {
    if (comp == "spock" || comp == "paper") won(true);
    else won(false);
  }
}
document.querySelector(".nav>img").addEventListener("click", () => {
  let rules = document.querySelector(".rules");
  rules.classList.add("cloak");
  setTimeout(() => {
    rules.classList.remove("high");
    if (selected) document.querySelector(".message").classList.add("high");
    rules.classList.add("hide");
  }, 250);
});
async function gen(usr, comp) {
  let player = document.createElement("div");
  player.classList.add(usr);
  let machine = document.createElement("div");
  machine.classList.add(comp);
  machine.classList.add("mach");
  player.classList.add("ply");
  machine.classList.add("hide");
  player.classList.add("hide");
  machine.classList.add("cloak");
  player.classList.add("cloak");
  document.querySelector(".player").append(player);
  document.querySelector(".house").append(machine);
  let board = document.querySelector(".compete");
  board.classList.remove("hide");
  setTimeout(() => board.classList.remove("cloak"), 5);
  player.classList.remove("hide");
  setTimeout(() => player.classList.remove("cloak"), 5);
  machine.classList.remove("hide");
  setTimeout(() => machine.classList.remove("cloak"), 500);

  return true;
}
let rulesbtn = document.querySelector(".rulesbtn");
rulesbtn.addEventListener("click", () => {
  let rules = document.querySelector(".rules");
  document.querySelector(".message").classList.remove("high");
  rules.classList.remove("hide");
  rules.classList.add("high");
  setTimeout(() => rules.classList.remove("cloak"), 5);
});
