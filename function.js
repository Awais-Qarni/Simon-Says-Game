let userSeq = [];
let gameSeq = [];
let allBtn = ['block-1', 'block-2', 'block-3', 'block-4'];
let highscore = document.querySelector("span");
let start = false;
let level = 0;
let score = 0;
let lastScore = 0;
let turnsBox = document.querySelector(".turns");
let turnNum = document.querySelector(".turn");

document.addEventListener("keypress", function () {
    if (start == false) {
        start = true; 
        levelUp();
        document.querySelector('p').innerHTML = "<strong>GAME IS STARTED</strong>";
        turnsBox.style.display = "block";
    }
});

function flash(btn) {
    btn.classList.add("btnFlash");
    setTimeout(() => {
        btn.classList.remove("btnFlash");
        if (start == true) {
            turnNum.innerHTML = `${userSeq.length}/${gameSeq.length}`;
        };
    }, 250);
};

function levelUp () {
    userSeq = [];
    level++;
    document.querySelector("h1").innerHTML = `Level : ${level}`;
    let getIdx = Math.floor(Math.random() * 3);
    let getClass = allBtn[getIdx];
    let randBtn = document.querySelector(`.${getClass}`);
    flash(randBtn);
    document.querySelector('p').innerHTML = `<strong>YOUR SCORE IS ${score}</strong>`;
    gameSeq.push(getClass);
};

let allButton = document.querySelectorAll(".color-block");
for (btn of allButton){
    btn.addEventListener('click', function () {
        flash(this);
        let userColor = this.getAttribute("id");
        userSeq.push(userColor);
        checkAns(userSeq.length-1);
    });
};

function checkAns(idx) {
    if (userSeq[idx] == gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            score = score + 10;
            setTimeout(() => {
                levelUp();
            }, 1000);
        }
    }
    else{
        document.body.style.backgroundColor = "red";
        setTimeout(() => {
            document.body.style.backgroundColor = "rgb(204, 211, 255)";
        }, 1500);
        start = false;
        gameSeq = [];
        level = 0;
        document.querySelector("h1").innerText = "GAME IS OVER";
        document.querySelector('p').innerText = "Press any key to start again";
        addHiScr();    
    }
};

function addHiScr(){
    if (score > lastScore) {
        highscore.innerText = score;
        lastScore = score;
    }
    score = 0;
};

