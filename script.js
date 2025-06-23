//localStorage.clear();
let score = localStorage.getItem("score")
	? Number(localStorage.getItem("score"))
	: 0;
let energy = localStorage.getItem("energy")
	? Number(localStorage.getItem("energy"))
	: 500;
let fullEnergy = localStorage.getItem("fullEnergy")
	? Number(localStorage.getItem("fullEnergy"))
	: 500;

let percentEnergy;
let countClick = 10; // для теста изменить силу клика
let lvlEnergy = localStorage.getItem("lLvlEnergy")
	? Number(localStorage.getItem("lLvlEnergy"))
	: 0;
let pricelLvlEnergy = localStorage.getItem("pricelLvlEnergy")
	? Number(localStorage.getItem("pricelLvlEnergy"))
	: 100;

let lvlRestart = localStorage.getItem("lvlRestart")
	? Number(localStorage.getItem("lvlRestart"))
	: 0;

let scoreHTML = document.getElementById("money");
let energyHTML = document.getElementById("energyText");
let energyFillHTML = document.getElementById("energyFill");
let lvlEnergyHTML = document.getElementById("lvlEnergy");
let countEnergyHTML = document.getElementById("countEnergy");
let pricelLvlEnergyHTML = document.getElementById("pricelLvlEnergy");
let lvlRestartHTML = document.getElementById("lvlRestart");

function dataScreen() {
	//ДОМ
	scoreHTML.innerText = score;
	energyHTML.innerText = energy;
	percentEnergy = (energy / fullEnergy) * 100;
	energyFillHTML.style.width = percentEnergy + "%";
}

function dataScreen2() {
	//МАГАЗИН
	dataScreen();
	lvlEnergyHTML.innerText = lvlEnergy;
	pricelLvlEnergyHTML.innerText = pricelLvlEnergy;
	lvlRestartHTML.innerText = lvlRestart;
}

const path = window.location.pathname;
if (path.includes("index.html")) {
	dataScreen();
} else if (path.includes("shop.html")) {
	dataScreen2();
}

const obj = document.getElementById("objectClick");
if (obj) {
	obj.addEventListener("touchstart", clicker);
}

const obj2 = document.getElementById("payLvlEnergy");
if (obj2) {
	obj2.addEventListener("touchstart", payLvlEnergy);
}

const obj3 = document.getElementById("payLvlRestart");
if (obj3) {
	obj3.addEventListener("touchstart", payLvlRestart);
}

function saveData() {
	localStorage.setItem("score", score);
	localStorage.setItem("energy", energy);
	localStorage.setItem("fullEnergy", fullEnergy);
	localStorage.setItem("lLvlEnergy", lvlEnergy);
	localStorage.setItem("pricelLvlEnergy", pricelLvlEnergy);
	localStorage.setItem("lvlRestart", lvlRestart);
}
function clicker(event) {
	if (energy >= countClick) {
		score += countClick;
		scoreHTML.innerText = score;
	}

	energy -= countClick;
	energyHTML.innerText = energy;

	percentEnergy = (energy / fullEnergy) * 100;
	energyFillHTML.style.width = percentEnergy + "%";
	saveData();
}

//Функция пополнения энергии
function regenerateEnergy() {
	if (energy < fullEnergy) {
		energy += 10;
		energyHTML.innerText = energy;
		percentEnergy = (energy / fullEnergy) * 100;
		energyFillHTML.style.width = percentEnergy + "%";
		saveData();
	}
}
function payLvlEnergy() {
	if (score >= pricelLvlEnergy) {
		score -= pricelLvlEnergy;
		lvlEnergy++;
		pricelLvlEnergy *= 2.25;
		fullEnergy += 100;
		scoreHTML.innerHTML = score;
		lvlEnergyHTML.innerText = lvlEnergy;
		pricelLvlEnergyHTML.innerText = pricelLvlEnergy;
		countEnergyHTML.innerText = 100;
	}
}
function payLvlRestart() {
	if (lvlRestart < 6) {
		lvlRestart++;
		energy = fullEnergy;
		saveData();
		dataScreen2();
	}
}
setInterval(regenerateEnergy, 1000);
