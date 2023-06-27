let xp = 0;
let health = 100;
let gold = 50;

let currentWeapon = 0;
let fighting;

let monsterHealth;
let inventory = ["stick"]; // by default player has a stick

let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let button3 = document.getElementById("button3");
let monsterhealth = document.getElementById("monsterhealth");
let monstername = document.getElementById("monstername");
let text = document.getElementById("text");
let goldtext = document.getElementById("goldtext");
let healthtext = document.getElementById("healthtext");
let xptext = document.getElementById("xptext");
let monsterstats = document.getElementById("monsterstats");

const weapons = [
    {
        name: "stick",
        power: 5
    },
    {
        name: "sword",
        power: 10
    },
    {
        name: "dragger",
        power: 15
    },
    {
        name: "flame-blaster",
        power: 40
    }
];

const monsters = [
    {
        name: "slime",
        power: 15,
        health: 30
    },
    {
        name: "dragon",
        power: 25,
        health: 50
    }
];

const locations = [
    {
        name: "Town Square",
        "button text" : ["To Store", "To Cave", "To Arena"],
        "button functions" : [toStore, toCave, toArena],
        txt: `Welcome to the World of Monsters 
        Are you ready to become the dragon warrior!!
        The village awaits your victory `
    },
    {
        name: "Store",
        "button text" : ["Buy Health $10", "Buy Weapon", "To Town Square"],
        "button functions" : [GiveHealth, toWeapons, toTownSquare],
        txt: ` Welcome to the Store`
    },
    {
        name: "Weapon",
        "button text" : ["Buy New Weapon $30", "Sell Weapon $15", "To Store"],
        "button functions" : [GiveWeapon, TakeWeapon, toStore],
        txt: ` Welcome to the Weaponry`
    },
    {
        name: "Monster",
        "button text" : ["Slime", "Dragon", "Home"],
        "button functions" : [fightSlime, fightDragon, toTownSquare],
        txt: ` Welcome to the Fight`
    },
    {
        name: "Moves",
        "button text" : ["Attack", "Dodge", "Quit"],
        "button functions" : [Attack, Dodge, toArena],
        txt: ` Lets Kill them :!`
    }
];

function update(location){
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.txt;
}

// Initializing the Buttons
button1.innerText = locations[0]["button text"][0];
button2.innerText = locations[0]["button text"][1];
button3.innerText = locations[0]["button text"][2];
button1.onclick = locations[0]["button functions"][0];
button2.onclick = locations[0]["button functions"][1];
button3.onclick = locations[0]["button functions"][2];
text.innerText = `Welcome to the World of Monsters 
                Are you ready to become the dragon warrior!!
                The village awaits your victory `
goldtext.innerText = gold;

function toStore(){
    update(locations[1]);
}
function toCave(){
    
}
function toArena(){
    update(locations[3]);
    monsterstats.style.display = "block";
}
function GiveHealth(){
    if(gold>=10){
        gold-=10;
        goldtext.innerText = gold;
        health+=10;
        healthtext.innerText = health;
    }
    else{
        text.innerText = "You dont have enough Gold!!";
    }
}

function GiveWeapon(){
    if(gold>=30 && currentWeapon<(weapons.length-1)){
        gold-=30;
        goldtext.innerText = gold;
        currentWeapon++;
        text.innerText = `Using the weapon : ${weapons[currentWeapon].name}`;
    }
    else{
        text.innerText = "You dont have enough Gold!!";
    }
}

function TakeWeapon(){
    if(currentWeapon>=1){
        gold+=15;
        goldtext.innerText = gold;
        currentWeapon--;
        text.innerText = `Using the weapon : ${weapons[currentWeapon].name}`;
    }
    else{
        text.innerText = "You cant sell the only weapon you have!";
    }
}

function toWeapons(){
    update(locations[2]);
}
function toTownSquare(){
    update(locations[0]);
}

function fightSlime(){
    update(locations[4]);
    fighting = 0;
    monsterHealth = monsters[fighting].health;
    monsterhealth.innerText = monsterHealth;
}

function fightDragon(){
    update(locations[4]);
    fighting = 1;
    monsterHealth = monsters[fighting].health;
    monsterhealth.innerText = monsterHealth;
}

function Attack(){
    if(health>0 && monsterHealth>0){
        monsterHealth-=weapons[currentWeapon].power;
        monsterhealth.innerText = monsterHealth;
    }
    if(monsterHealth<=0){
        text.innerText= "YOU WON";
        gold+=50;
        health*=2;
        xp+=10;
        xptext.innerText = xp;
        goldtext.innerText = gold;
        healthtext.innerText = health;
    }
    else if(health<=0){
        text.innerText= "YOU LOSE";
    }
    else{
        health-= monsters[fighting].power;
        healthtext.innerText = health;
    }
    if(health<=0){
        text.innerText = "YOU LOSE";
    }
}

function Dodge(){
    
}