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
let scoreInHour = localStorage.getItem("scoreInHour")
	? Number(localStorage.getItem("scoreInHour"))
	: 0;

let cardData = {
	1: {
		price: 100,
		img: "icons8-лапа-64.png",
		bonus: 100,
		title: "Буст",
		level: 0,
		k: 2.3,
	},
	2: {
		price: 200,
		img: "icons8-нажатие-48.png",
		bonus: 100,
		title: "Кликер",
		level: 0,
		k: 2.3,
	},
	3: {
		price: 200,
		img: "icons8-взрыв-64.png",
		bonus: 100,
		title: "Boom",
		level: 0,
		k: 2.3,
	},
	4: {
		price: 200,
		img: "icons8-плюс-643.png",
		bonus: 100,
		title: "Супер",
		level: 0,
		k: 2.3,
	},
};
//ПРИ ЗАХОДЕ НА СТРАНИЦУ ВОССТАНАВЛИВАЕМ КАРТОЧКИ ИЗ LS
Object.keys(cardData).forEach(id => {
	const saved = JSON.parse(localStorage.getItem(`card${id}`));
	console.log(saved);
	if (saved) {
		cardData[id] = saved;
	}
});

let scoreHTML = document.getElementById("money");
let energyHTML = document.getElementById("energyText");
let energyFillHTML = document.getElementById("energyFill");
let lvlEnergyHTML = document.getElementById("lvlEnergy");
let countEnergyHTML = document.getElementById("countEnergy");
let pricelLvlEnergyHTML = document.getElementById("pricelLvlEnergy");
let lvlRestartHTML = document.getElementById("lvlRestart");
let scoreInHourHTML = document.getElementById("inHour");

//ПРОВЕРКА НА ДАТУ СБРОСА ВОССТАНОВЛЕНИЯ ЭНЕРГИИ
let lvlRestartDate = localStorage.getItem("lvlRestartDate");
let today = new Date().toDateString();
let lvlRestart;
if (lvlRestartDate !== today) {
	lvlRestart = 0;
} else {
	lvlRestart = localStorage.getItem("lvlRestart")
		? Number(localStorage.getItem("lvlRestart"))
		: 0;
}

function dataScreen() {
	//ДОМ
	scoreHTML.innerText = Math.floor(score);
	energyHTML.innerText = Math.floor(energy);
	percentEnergy = (energy / fullEnergy) * 100;
	energyFillHTML.style.width = percentEnergy + "%";
	scoreInHourHTML.innerText = Math.floor(scoreInHour);
}

function dataScreen2() {
	//МАГАЗИН
	dataScreen();
	lvlEnergyHTML.innerText = lvlEnergy;
	pricelLvlEnergyHTML.innerText = Math.floor(pricelLvlEnergy);
	lvlRestartHTML.innerText = Math.floor(lvlRestart);
}

const path = window.location.pathname;
if (path.includes("index.html")) {
	dataScreen();
} else if (path.includes("shop.html")) {
	dataScreen2();
}

const containersCardPassive = document.querySelectorAll(".cardPassive");
containersCardPassive.forEach(container => {
	const id = container.getAttribute("data-id");
	const data = cardData[id];
	if (data) {
		container.innerHTML = `
		<div class="imgCard2 card2" style="background-image: url('img/${data.img}'); background-size:cover;"> 
        <p>
	 ур. <span id="lvl${id}">${data.level}</span> 
	
	      </p>
   </div>
	 <p class="text2">${data.title}</p>`;
	}
});

const dialog = document.getElementById("screenlvlPassive");
containersCardPassive.forEach(container => {
	let touchStart = 100;
	let touchEnd = 0;
	container.addEventListener("touchstart", e => {
		touchStart = e.changedTouches[0].screenX;
	});
	container.addEventListener("touchend", e => {
		touchEnd = e.changedTouches[0].screenX;
		if (Math.abs(touchStart - touchEnd) < 10) {
			const id = container.getAttribute("data-id");
			const data = cardData[id];
			if (data) {
				dialog.innerHTML = `<form method="dialog">
        <button class="closeButton">X</button>
        <img src="img/${data.img}" alt="" class="picture">
        <h2>${data.title}</h2>
        <div class="textContainer">
            <p>ур. <span class="lvlPassive">${data.level}</span></p>
            <p><span class="bonusPassive">${data.bonus}</span> в час </p>
        </div>
        <button class="payLvlCardPassive">
            <p>Купить за <span class="priceLvlCardPassive"> ${data.price}</span></p>
        </button>
    </form>`;
				dialog.showModal();
				dialog
					.querySelector(".payLvlCardPassive")
					.addEventListener("touchstart", e => {
						payLvlCardPassive(id, data);
					});
			}
		}
	});
});

function payLvlCardPassive(id, data) {
	if (score >= data.price) {
		score -= data.price;
		scoreHTML.innerText = Math.floor(score);
		data.level++;
		data.price = Math.floor(data.price * data.k);
		scoreInHour += data.bonus;
		scoreInHourHTML.innerText = Math.floor(scoreInHour);
		data.bonus = Math.floor(data.bonus * data.k);
		document.querySelector(`#lvl${id}`).innerText = Math.floor(data.level);

		localStorage.setItem(`card${id}`, JSON.stringify(data));
		localStorage.setItem("scoreInHour", scoreInHour);
	}
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
	localStorage.setItem("lvlRestartDate", new Date().toDateString());
}
function clicker(event) {
	if (energy >= countClick) {
		score += countClick;
		scoreHTML.innerText = Math.floor(score);

		energy -= countClick;
		energyHTML.innerText = Math.floor(energy);

		const img = event.currentTarget.querySelector("#imgClick"); //
		img.style.transform = "scale(0.9)";
		setTimeout(() => {
			(img.style.transform = ""), 200;
		});
		const plus = document.createElement("div");
		plus.className = "plusOne";
		plus.textContent = `+ ${countClick}`;
		const panel = event.currentTarget;
		const rect = panel.getBoundingClientRect();
		plus.style.left = `${event.clientY - rect.left}px`;
		plus.style.top = `${event.clientY - rect.top}px`;
		panel.appendChild(plus);
		setTimeout(() => plus.remove(), 3000);
	}
	percentEnergy = (energy / fullEnergy) * 100;
	energyFillHTML.style.width = percentEnergy + "%";
	saveData();
}

//Функция пополнения энергии
function regenerateEnergy() {
	if (energy < fullEnergy) {
		energy += 10;
		energyHTML.innerText = Math.floor(energy);
		percentEnergy = (energy / fullEnergy) * 100;
		energyFillHTML.style.width = percentEnergy + "%";
		saveData();
	}
	score += scoreInHour / 3600;
	scoreHTML.innerText = Math.floor(score);
	saveData();
}
function payLvlEnergy() {
	if (score >= pricelLvlEnergy) {
		score -= pricelLvlEnergy;
		lvlEnergy++;
		pricelLvlEnergy *= 2.25;
		fullEnergy += 100;
		scoreHTML.innerHTML = Math.floor(score);
		lvlEnergyHTML.innerText = Math.floor(lvlEnergy);
		pricelLvlEnergyHTML.innerText = Math.floor(pricelLvlEnergy);
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

window.addEventListener("beforeunload", () => {
	localStorage.setItem("lastVisit", Date.now());
});
//ВЫЗОВ ПРИ ЗАГРУЗКЕ ИГРЫ
window.addEventListener("load", () => {
	const lastVisit = localStorage.getItem("lastVisit");
	const now = Date.now();
	if (now - lastVisit > 60000 && lastVisit) {
		let hoursAway = (now - parseInt(lastVisit)) / (60 * 60 * 1000);
		if (hoursAway > 3) {
			hoursAway = 3;
		}
		//Начисление монет
		let offlineScore = Math.floor(scoreInHour * hoursAway);
		score += offlineScore;
		scoreHTML.innerText = Math.floor(score);
		alert(`заработали ${offlineScore}`);

		let offlineEnergy = Math.floor(hoursAway * 3600);
		energy = Math.min(energy + offlineEnergy, fullEnergy);
		energyHTML.innerText = energy;
		energyFillHTML.style.width = percentEnergy + "%";
		scoreInHourHTML.innerText = scoreInHour;
	}
});
