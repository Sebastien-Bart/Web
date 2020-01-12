// global variable for the project

// default initial width and heigth for the target
var TARGET_WIDTH = 30;
var TARGET_HEIGHT = 30;
// value of time in tenth of seconds
var time = 0;
// chrono management

// timer variable
var chronoTimer = null;


// YOUR NAME HERE
// BART Sébastien Groupe 11

// YOUR CODE BELOW
var game = false; // permet de savoir si une partie est en cours ou non
var Cibles = 0; // Le nombre de cibles sur le terrain
var CiblesDebut = 0; // Le nombre de cibles AU LANCEMENT d'une partie
var DIFF = "normal"; // Le nom de la difficulté cochée
var MODE = "base"; // Le mode sélectionné
var score = 0; // Le score en secondes
var scorePoints = 0; // Le score en points
var sec = 0;
var min = 0;
var pseudo = ""; // Le pseudo précédent utilisé, pour économiser du temps si le joueur ne change pas de pseudo
var chronoApparitionCible; // timer pour l'apparition des cibles dans le mode Course aux points

/* setUpListeners: Ajouts des evenements */
var setUpListeners = function () {
	var uneCible = document.getElementById("create");
	uneCible.addEventListener('click', ajoutCible);
	var start = document.getElementById("start");
	start.addEventListener('click', setUpTargets);
	start.addEventListener('click',startChrono);
	start.addEventListener('click', MAJremaining);
	var difficulties = document.querySelectorAll("#difficulties input");
	for (elem of difficulties) {
		elem.addEventListener('change', MAJterrainDifficulty);
	};
	var modes = document.querySelectorAll("#mode input"); 
	for (elem of modes) { 
		elem.addEventListener('change', MAJmodes); 
		elem.addEventListener('change', checkCoursePoints); 
	};
};
window.addEventListener('load', setUpListeners);

/* EXTENSION ----- checkCoursePoints: check si le mode est course aux points, si oui, modifie le pannel des options et modifie le chrono */
var checkCoursePoints = function () { 
	if (MODE == 'points') { 
			min = 1; 
			var minutes = document.getElementById("minutes"); 
			minutes.innerHTML = min; 
			var nbdecibles = document.getElementById("nbdecibles"); 
			nbdecibles.style.display = "none"; 
		}; 
};

/* EXTENSION ----- startChronoPoints: Préparre et démarre le chrono pour le mode course au point (lance la partie)*/
var startChronoPoints = function() { 
	scorePoints = 0;
	min = 0; 
	sec = 59; 
	time = 9; 
	chronoTimer = window.setInterval(ChronoDecrementation, 100); 
	game = true; 
	chronoApparitionCible = window.setInterval(ajoutCibleCourseTimeout, 500); 
}; 

var ajoutCibleCourseTimeout = function() { 
	window.setTimeout(ajoutCibleCourse(), Math.random * 3000); 
};  

/* EXTENSION ----- ajoutCibleCourse: variante de ajoutCible, ajoute une cible mais elles sont différenciées (bonus, malus, normal) et disparaissent */
var ajoutCibleCourse = function() { 
	var chance = Math.random(); 
	var newTarget = document.createElement("div"); 
	var terrain = document.getElementById("terrain"); 
	var width =  window.getComputedStyle(terrain).getPropertyValue('width'); 
	var height =  window.getComputedStyle(terrain).getPropertyValue('height'); 
	newTarget.style.top = Math.random() * (parseInt(height) - TARGET_HEIGHT) + 'px'; 
	newTarget.style.left = Math.random() * (parseInt(width) - TARGET_WIDTH) + 'px'; 
	newTarget.style.width = TARGET_WIDTH + "px"; 
	newTarget.style.height = TARGET_HEIGHT + "px"; 
	if (chance > 0.7) { // CIBLE MALUS = -10
		newTarget.className = "target on malus"; 
		newTarget.style.boxShadow = "0px 0px 30px 5px red"; 
	}
	if (chance < 0.7 && chance > 0.5) { // CIBLE CHANCE = 20
		newTarget.className = "target on bonus"; 
		newTarget.style.boxShadow = "0px 0px 30px 5px gold"; 
	}
	if (chance < 0.5) { // CIBLE NORMALE = 10
		newTarget.className = 'target on normal'; 
	}
	newTarget.addEventListener('click', suppCibleTimeout); 
	newTarget.addEventListener('click', MAJremaining); 
	var imgTarget = document.createElement("img"); 
	imgTarget.src = "images/bubulle.png"; 
	imgTarget.style.width = TARGET_WIDTH + "px"; 
	imgTarget.style.height = TARGET_HEIGHT + "px"; 
	newTarget.appendChild(imgTarget); 
	terrain.appendChild(newTarget); 
	window.setTimeout(function() {dispCible(newTarget);}, Math.random() * 5000 + 500); 
	Cibles++; 
	MAJremaining(); 
} 

/* EXTENSION ----- ChronoDecrementation: Gestion et affichage du chrono pour le mode Course aux points */
var ChronoDecrementation = function() {  
	time--; 
	if (time == 0 && sec != 0) { 
		sec--; 
		time = 9; 
	}; 
	if (sec == 0 && time == 0) { 
		window.clearInterval(chronoApparitionCible); 
		afficheScore(); 
		game = false; 
		var son = new Audio ('sons/victoire.wav'); 
		son.play(); 
		stopFieldChrono(); 
	}; 
	var dixieme = document.getElementById("tenth"); 
	dixieme.innerHTML = time; 
	var secondes = document.getElementById("seconds"); 
	secondes.innerHTML = sec; 
	var minutes = document.getElementById("minutes"); 
	minutes.innerHTML = min; 
}; 

/* EXTENSION 'Disparition' ----- MAJmodes: Nettoie le terrain, le chrono, et met en mémoire le mode sélectionné */
var MAJmodes = function() {
	window.clearInterval(chronoApparitionCible); 
	MODE = this.id; 
	supprimeAffScore(); 
	stopFieldChrono(); 
	if (MODE != 'points') { 
		var nbdecibles = document.getElementById("nbdecibles"); 
		nbdecibles.style.display = "inline"; 
	};
};

/* EXTENSION 'difficultés' MAJterrainDifficulty : Mets a jour le terrain selon la difficulté choisie, et nettoie le terrain et réintialise le chrono */
var MAJterrainDifficulty = function () {
	DIFF = this.id;
	var terrain = document.getElementById("terrain");
	var facile = document.getElementById("facile");
	if (facile.checked) {
		terrain.style.width = '300px';
		terrain.style.height = '300px';
		TARGET_WIDTH = 50;
		TARGET_HEIGHT = 50;
	}
	var normal = document.getElementById("normal");
	if (normal.checked) {
		terrain.style.width = '400px';
		terrain.style.height = '400px';
		TARGET_WIDTH = 30;
		TARGET_HEIGHT = 30;
	}
	var difficile = document.getElementById("difficile");
	if (difficile.checked) {
		terrain.style.width = '800px';
		terrain.style.height = '500px';
		TARGET_WIDTH = 20;
		TARGET_HEIGHT = 20;
	}
	var insane = document.getElementById("insane");
	if (insane.checked) {
		terrain.style.width = '100%';
		terrain.style.height = '500px';
		TARGET_WIDTH = 10;
		TARGET_HEIGHT = 10;
	};
	stopFieldChrono();
};


/* stopFieldChrono : Nettoie le terrain, réintialise le chrono */
var stopFieldChrono = function () {
	window.clearInterval(chronoTimer);
	min = 0;
	time = -1;// -1 car ChronoIncrementation() donne automatiquement +1 a time
	sec = 0;
	ChronoIncrementation();
	game = false;
	var terrain = document.getElementById("terrain");
	terrain.innerHTML = "";
	Cibles = 0;
	MAJremaining();
}

/* MAJremaining : Met à jour le nombre de cibles cliquables sur le terrain (et termine la partie si 0 cibles) */
var MAJremaining = function () {
	var remain = document.getElementById("remaining");
	remain.innerHTML = Cibles;
		if (Cibles == 0 && game == true && MODE != 'points') {
			score = min*60+sec+time/10;
			var son = new Audio ('sons/victoire.wav');
			son.play();
			son.volume = 0.6;
			window.clearInterval(chronoTimer);
			afficheScore();
			min = 0;
			time = -1; // -1 car ChronoIncrementation() donne automatiquement +1 a time
			sec = 0;
			ChronoIncrementation();
			game = false;
		};
};

/* ajoutCible : Ajoute une cible sur le terrain à des coordonnées aléatoires */
var ajoutCible = function () {
	var disparition = document.getElementById("disparition");
	var newTarget = document.createElement("div");
	var terrain = document.getElementById("terrain");
	var width =  window.getComputedStyle(terrain).getPropertyValue('width');
	var height =  window.getComputedStyle(terrain).getPropertyValue('height');
	newTarget.className = 'target on';
	newTarget.style.top = Math.random() * (parseInt(height) - TARGET_HEIGHT) + 'px';
	newTarget.style.left = Math.random() * (parseInt(width) - TARGET_WIDTH) + 'px';
	newTarget.style.width = TARGET_WIDTH + "px";
	newTarget.style.height = TARGET_HEIGHT + "px";
	newTarget.addEventListener('click', suppCibleTimeout);
	newTarget.addEventListener('click', MAJremaining);
	var imgTarget = document.createElement("img");
	imgTarget.src = "images/bubulle.png";
	imgTarget.style.width = TARGET_WIDTH + "px";
	imgTarget.style.height = TARGET_HEIGHT + "px";
	newTarget.appendChild(imgTarget);
	terrain.appendChild(newTarget);
	if (disparition.checked) {
		window.setTimeout(function() {dispCible(newTarget);}, Math.random() * 5000 + 500);
	};
	Cibles++;
	MAJremaining();
};


/* EXTENSION 'Disparition' dispCible: Supprime la cible passée en param puis en ajoute une nouvelle (sauf si en mode course au point) */
var dispCible = function(elem) {
	if (elem.className.indexOf('hit') == -1 && elem.parentNode != null) {
		elem.className = "target on hit";
		window.setTimeout(function() {suppCible(elem);}, 1000);
		this.removeEventListener('click', suppCibleTimeout);
		Cibles--;
		if (MODE != 'points') {
			ajoutCible();
		}
	};
};

/* suppCibleTimeout : déclenche le timeout pour suppprimer une cible cliquée */
var suppCibleTimeout = function () {
	if (this.className == "target on malus") { 
		scorePoints -= 50; 
		var son = new Audio ('sons/malus.wav'); 
		son.volume = 0.5; 
		son.play(); 
	} 
	if (this.className == "target on bonus") { 
		scorePoints += 20; 
		var son = new Audio ('sons/bonus.mp3'); 
		son.play(); 
	} 
	if (this.className == "target on") { 
		scorePoints += 10; 
	} 
	var son2 = new Audio ('sons/bulle.mp3');
	son2.play();
	this.className = 'target on hit';
	var target = this;
	Cibles--;
	window.setTimeout(function() {suppCible(target);}, 1000);
	this.removeEventListener('click', suppCibleTimeout);
};

/* suppCible : supprime la cible passée en parametre */
var suppCible = function (elem) {
	elem.parentNode.removeChild(elem);
};

/* setUpTargets : Nettoie le terrain et prépare le terrain pour la prochaine partie, supprime l'affiche du résultat de la partie précédante */
var setUpTargets = function () {
	if (MODE != 'points') {
		Cibles = 0;
		var terrain = document.getElementById("terrain");
		terrain.innerHTML = ""
		var input = document.getElementById("nbtargets");
		CiblesDebut = input.value;
		for (var i = 0; i < input.value; i++) {
			ajoutCible();
		};
	}
	supprimeAffScore();
};

/* ChronoIncrementation : gère l'affichage du chronomètre et les variables qui le composent (sec, time, min) */
var ChronoIncrementation = function () {
	time++;
	if (time == 10) {
		sec++;
		time = 0;
	}
	if (sec == 60) {
		min++;
		sec = 0;
	}
	var dixieme = document.getElementById("tenth");
	dixieme.innerHTML = time;
	var secondes = document.getElementById("seconds");
	secondes.innerHTML = sec;
	var minutes = document.getElementById("minutes");
	minutes.innerHTML = min;
}

/* startChrono : nettoie le chrono et le lance */
var startChrono = function () {
	if (MODE == 'points') {
		startChronoPoints();
	}
	else {
		if (chronoTimer != null) {
			window.clearInterval(chronoTimer);
			time = 0;
			min = 0;
			sec = 0;
		}
		chronoTimer = window.setInterval(ChronoIncrementation,100);
		game = true;
	}
};

/* afficheScore : crée une une division pour afficher le score de la partie teriminée */
var afficheScore = function () { //
	var parent = document.getElementById("score");
	var affichage = document.createElement("div");
	affichage.className = "affichescore"
	if (MODE == 'points') {
		affichage.innerHTML = "Mode: "+MODE+"<br>Difficulté: "+DIFF+"<br>Vous avez un total de "+scorePoints+" points ! Bravo !<br>";
	}
	else {
		affichage.innerHTML = "Mode: "+MODE+"<br>Difficulté: "+DIFF+"<br>Vous avez abbatu "+CiblesDebut+" cibles en "+min+' minutes '+sec+' secondes '+time+" milisecondes ! Bravo !<br>";
	}
	parent.appendChild(affichage);
	var boutton = document.createElement("button");
	boutton.innerHTML = '<img src="images/trash.png" width="20px"/>';
	boutton.addEventListener('click', supprimeAffScore);
	affichage.appendChild(boutton);
	var boutton2 = document.createElement("button");
	boutton2.innerHTML = '<img src="images/save.png" width="20px"/>';
	boutton2.addEventListener('click', askName);
	affichage.appendChild(boutton2);
};

/* supprimeAffScore : supprime l'affichage du score */
var supprimeAffScore = function () {
	var parent = document.getElementById("score");
	parent.innerHTML = "";
//	this.parentNode.remove();
};

/* EXTENSION 'Sauvegarde' askName : demande le pseudo du joueur avant de sauvegarder son score */
var askName = function () { 
	this.removeEventListener('click', askName);
	var parent = document.querySelector(".affichescore");
	var help = document.createElement('button');
	help.innerHTML = "?";
	help.className = "help";
	help.addEventListener("click",showHelp);
	var p = document.createElement('p');
	p.textContent = 'Sauvegarder ce score sous quel pseudo ?';
	var username = document.createElement('input');
	username.value = pseudo;
	username.type = 'text';
	username.required = "true";
	username.maxLength = "3";
	username.pattern = "[A-Z]{3,3}";
	username.size = '1';
	username.placeholder = "AAA";
	parent.appendChild(p);
	parent.appendChild(help);
	parent.appendChild(username);
	var validity = document.createElement('span');
	parent.appendChild(validity);
	var submit = document.createElement('button');
	submit.textContent = "OK";
	submit.addEventListener("click", saveScore);
	parent.appendChild(submit);
};

/* EXTENSION 'Sauvegarde' showHelp: Montre l'aide pour les conditions du pseudo */
var showHelp = function () {
	window.alert('Votre pseudo doit être de la forme "AAA": exactement trois lettres en majuscules. (Comme dans les jeux arcades)')
}

/* EXTENSION 'Disparition' showHelp2: Montre l'aide pour la selection du mode de jeu */
var showHelp2 = function() {
	window.alert("Les différents modes:\n\n\nJeu de base: Choisissez un nombre de cible et une difficulté, puis abbatez toutes les cibles le plus rapidement possibles !\n\nDisparition: Même principe que le jeu de base: abbatez toutes les cibles le plus vite possibles, mais attention, elles disparaissent au bout d'un temps aléatoire (mais toujours supérieur à 0.5 secondes pour que la cible ne disparaisse pas juste après son apparition)\n\nCourse aux points: Vous avez une minute pour obtenir le plus de point possible, une cible normale vaut 10 points, une dorée 20 points, et une rouge vous enlève 50 points (taux d'apparition: normale: 50%, bonus: 20%, malus: 30%), attention, les cibles disparaissent au bout d'un temps aléatoire ! \n\n Bon jeu !")
}

/* EXTENSION 'Sauvegarde' saveScore: sauvegarde un score et nettoie l'affichage du score */
var saveScore = function () {
	var parent = document.getElementById('saves_'+DIFF+'_'+MODE);
	var phrase = document.createElement('p');
	var username = document.querySelector('button + input');
	if (username.checkValidity()) {
		pseudo = username.value;
		if (MODE == 'points') {
			phrase.innerHTML = "<div class='username'>"+pseudo+" </div> a obtenu un total de <div class='score'>"+scorePoints+" points</div>.";
		}
		else {
			phrase.innerHTML = "<div class='username'>"+pseudo+" </div> a abbatu <div class='CiblesDebut'>"+CiblesDebut+" cibles</div> en <div class='score'>"+score+" secondes</div>.";
		}
		parent.appendChild(phrase);
		var boutton = document.createElement("button");
		boutton.innerHTML = '<img src="images/trash.png" width="20px"/>';
		boutton.addEventListener('click', supprimeScore);
		phrase.appendChild(boutton);
		supprimeAffScore();
	};
};

/* EXTENSION 'Sauvegarde' supprimeScore: supprime un score */
var supprimeScore = function () {
	this.parentNode.remove();
}
