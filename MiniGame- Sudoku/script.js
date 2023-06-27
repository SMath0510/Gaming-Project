var numSelected = null; // the element that is currently selected
var numErrors = null; // the number of errors done
var tileSelected = null; // the tile that is selected
var myBoard = null;
var solution = null;

var easyBoard = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
]

var easySolution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
]

var mediumBoard = [
    "-3-6-----",
    "5----4---",
    "-76-3--59",
    "---3--5--",
    "18-----47",
    "--7--8---",
    "95--2-46-",
    "---4----8",
    "-----9-1-"
]

var mediumSolution = [
    "839675124",
    "512984736",
    "476132859",
    "694317582",
    "185296347",
    "327548691",
    "958721463",
    "261453978",
    "743869215"
]

var hardBoard = [
    "------86-",
    "---8-7---",
    "8---361-2",
    "7------93",
    "--5---4--",
    "18------6",
    "6-819---7",
    "---2-3---",
    "-34------"
]

var hardSolution = [
    "473921865",
    "261857349",
    "859436172",
    "746518293",
    "395672418",
    "182349756",
    "628194537",
    "517263984",
    "934785621"
]

window.onload = function(){
    setGame();
}

function setGame(){
    myBoard = easyBoard;
    solution = easySolution;
    fillNumTiles();
    fillBoard();
    solver = document.getElementById("solve");
    solver.addEventListener("click", completeSolution);
    
    reseter = document.getElementById("reset");
    reseter.addEventListener("click", resetBoard);

    easy = document.getElementById("easy");
    easy.addEventListener("click", easyShift);

    medium = document.getElementById("medium");
    medium.addEventListener("click", mediumShift);

    hard = document.getElementById("hard");
    hard.addEventListener("click", hardShift);
}

function fillNumTiles(){
    // the numbers we are using are 1 to 9
    for (let i = 1; i <= 9; i ++){
        let number = document.createElement("div"); // creates a div tag
        number.id = i;
        number.classList.add("number-entry");
        number.innerText = i;
        number.addEventListener("click", fillElement);
        document.getElementById("options").appendChild(number);
    }
}

function fillBoard(){
    // board tiles are indexed as i:j
    for(let i = 0; i < 9; i ++){
        for(let j = 0; j < 9; j ++){
            let entry = document.createElement("div");
            entry.id = i + ":" + j;
            entry.classList.add("board-entry");
            if(i == 3 || i == 6) entry.classList.add("thick-up");
            if(j == 3 || j == 6) entry.classList.add("thick-left");
            entry.innerText = myBoard[i][j];
            entry.addEventListener("click", fillNumber);
            if(myBoard[i][j] == "-") entry.innerText = "";
            else entry.classList.add("fixed-box");
            document.getElementById("board").appendChild(entry);
        }
    }
}

function fillElement(){
    if(numSelected){
        numSelected.classList.remove("selected-number");
        numSelected = null;
    }
    numSelected = this;
    numSelected.classList.add("selected-number");
}

function fillNumber(){
    if(numSelected){
        let coordinates = this.id.split(":");
        let row = parseInt(coordinates[0]);
        let col = parseInt(coordinates[1]);
        this.innerText = numSelected.innerText;
        if(numSelected.innerText == solution[row][col]){
            entry = this;
            entry.classList.remove("wrong-ans");
        }
        else{
            entry = this;
            entry.classList.add("wrong-ans");
            numErrors ++;
            let errorCount = document.getElementById("errors");
            errorCount.innerText = numErrors;
        }
    }
}

function completeSolution(){
    for(let i = 0; i < 9; i ++){
        for(let j = 0; j < 9; j ++){
            entry = document.getElementById(i+":"+j);
            entry.innerText = solution[i][j];
        }
    }
}

function resetBoard(){
    for(let i = 0; i < 9; i ++){
        for(let j = 0; j < 9; j ++){
            entry = document.getElementById(i+":"+j);
            entry.innerText = myBoard[i][j];
            if(entry.classList.contains("fixed-box")) entry.classList.remove("fixed-box");
            if(entry.innerText == "-") {
                entry.innerText = "";
            }
            else{
                entry.classList.add("fixed-box");
            }
        }
    }
}

function easyShift(){
    myBoard = easyBoard;
    solution = easySolution;
    resetBoard();
}

function mediumShift(){
    myBoard = mediumBoard;
    solution = mediumSolution;
    console.log("medium called");
    resetBoard();
}

function hardShift(){
    myBoard = hardBoard;
    solution = hardSolution;
    resetBoard();
}