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
	for (elem of difficulties) { // EXTENSION 'difficultés'
		elem.addEventListener('change', MAJterrainDifficulty); // EXTENSION 'difficultés'
	}; // EXTENSION 'difficultés'
	var modes = document.querySelectorAll("#mode input"); // EXTENSION 'Course aux points' 'Disparition'
	for (elem of modes) { // EXTENSION 'Course aux points' 'Disparition'
		elem.addEventListener('change', MAJmodes); // EXTENSION 'Course aux points' 'Disparition'
		elem.addEventListener('change', checkCoursePoints); // EXTENSION 'Course aux points' 'Disparition'
	};
};
window.addEventListener('load', setUpListeners);

/* EXTENSION 'Course aux points' ----- checkCoursePoints: check si le mode est course aux points, si oui, modifie le pannel des options et modifie le chrono */
var checkCoursePoints = function () { // EXTENSION 'Course aux points'
	if (MODE == 'points') { // EXTENSION 'Course aux points'
			min = 1; // EXTENSION 'Course aux points'
			var minutes = document.getElementById("minutes"); // EXTENSION 'Course aux points'
			minutes.innerHTML = min; // EXTENSION 'Course aux points'
			var nbdecibles = document.getElementById("nbdecibles"); // EXTENSION 'Course aux points'
			nbdecibles.style.display = "none"; // EXTENSION 'Course aux points'
		}; // EXTENSION 'Course aux points'
};

/* EXTENSION 'Course aux points' ----- startChronoPoints: Préparre et démarre le chrono pour le mode course au point (lance la partie)*/
var startChronoPoints = function() { // EXTENSION 'Course aux points'
	scorePoints = 0;// EXTENSION 'Course aux points'
	min = 0; // EXTENSION 'Course aux points'
	sec = 59; // EXTENSION 'Course aux points'
	time = 9; // EXTENSION 'Course aux points'
	chronoTimer = window.setInterval(ChronoDecrementation, 100); // EXTENSION 'Course aux points'
	game = true; // EXTENSION 'Course aux points'
	chronoApparitionCible = window.setInterval(ajoutCibleCourseTimeout, 500); // EXTENSION 'Course aux points'
}; // EXTENSION 'Course aux points'

var ajoutCibleCourseTimeout = function() { // EXTENSION 'Course aux points'
	window.setTimeout(ajoutCibleCourse(), Math.random * 3000); // EXTENSION 'Course aux points'
};  // EXTENSION 'Course aux points'

/* EXTENSION 'Course aux points' ----- ajoutCibleCourse: variante de ajoutCible, ajoute une cible mais elles sont différenciées (bonus, malus, normal) et disparaissent */
var ajoutCibleCourse = function() { // EXTENSION 'Course aux points'
	var chance = Math.random(); // EXTENSION 'Course aux points'
	var newTarget = document.createElement("div"); // EXTENSION 'Course aux points'
	var terrain = document.getElementById("terrain"); // EXTENSION 'Course aux points'
	var width =  window.getComputedStyle(terrain).getPropertyValue('width'); // EXTENSION 'Course aux points'
	var height =  window.getComputedStyle(terrain).getPropertyValue('height'); // EXTENSION 'Course aux points'
	newTarget.style.top = Math.random() * (parseInt(height) - TARGET_HEIGHT) + 'px'; // EXTENSION 'Course aux points'
	newTarget.style.left = Math.random() * (parseInt(width) - TARGET_WIDTH) + 'px'; // EXTENSION 'Course aux points'
	newTarget.style.width = TARGET_WIDTH + "px"; // EXTENSION 'Course aux points'
	newTarget.style.height = TARGET_HEIGHT + "px"; // EXTENSION 'Course aux points'
	if (chance > 0.7) { // CIBLE MALUS = -10
		newTarget.className = "target on malus"; // EXTENSION 'Course aux points'
		newTarget.style.boxShadow = "0px 0px 30px 5px red"; // EXTENSION 'Course aux points'
	}
	if (chance < 0.7 && chance > 0.5) { // CIBLE CHANCE = 20
		newTarget.className = "target on bonus"; // EXTENSION 'Course aux points'
		newTarget.style.boxShadow = "0px 0px 30px 5px gold"; // EXTENSION 'Course aux points'
	}
	if (chance < 0.5) { // CIBLE NORMALE = 10
		newTarget.className = 'target on normal'; // EXTENSION 'Course aux points'
	}
	newTarget.addEventListener('click', suppCibleTimeout); // EXTENSION 'Course aux points'
	newTarget.addEventListener('click', MAJremaining); // EXTENSION 'Course aux points'
	var imgTarget = document.createElement("img"); // EXTENSION 'Course aux points'
	imgTarget.src = "images/bubulle.png"; // EXTENSION 'Course aux points'
	imgTarget.style.width = TARGET_WIDTH + "px"; // EXTENSION 'Course aux points'
	imgTarget.style.height = TARGET_HEIGHT + "px"; // EXTENSION 'Course aux points'
	newTarget.appendChild(imgTarget); // EXTENSION 'Course aux points'
	terrain.appendChild(newTarget); // EXTENSION 'Course aux points'
	window.setTimeout(function() {dispCible(newTarget);}, Math.random() * 5000 + 500); // EXTENSION 'Course aux points'
	Cibles++; // EXTENSION 'Course aux points'
	MAJremaining(); // EXTENSION 'Course aux points'
} // EXTENSION 'Course aux points'

/* EXTENSION 'Course aux points' ----- ChronoDecrementation: Gestion et affichage du chrono pour le mode Course aux points */
var ChronoDecrementation = function() {  // EXTENSION 'Course aux points'
	time--; // EXTENSION 'Course aux points'
	if (time == 0 && sec != 0) { // EXTENSION 'Course aux points'
		sec--; // EXTENSION 'Course aux points'
		time = 9; // EXTENSION 'Course aux points'
	}; // EXTENSION 'Course aux points'
	if (sec == 0 && time == 0) { // EXTENSION 'Course aux points'
		window.clearInterval(chronoApparitionCible); // EXTENSION 'Course aux points'
		afficheScore(); // EXTENSION 'Course aux points'
		game = false; // EXTENSION 'Course aux points'
		var son = new Audio ('sons/victoire.wav'); // EXTENSION 'Course aux points'
		son.play(); // EXTENSION 'Course aux points'
		stopFieldChrono(); // EXTENSION 'Course aux points'
	}; // EXTENSION 'Course aux points'
	var dixieme = document.getElementById("tenth"); // EXTENSION 'Course aux points'
	dixieme.innerHTML = time; // EXTENSION 'Course aux points'
	var secondes = document.getElementById("seconds"); // EXTENSION 'Course aux points'
	secondes.innerHTML = sec; // EXTENSION 'Course aux points'
	var minutes = document.getElementById("minutes"); // EXTENSION 'Course aux points'
	minutes.innerHTML = min; // EXTENSION 'Course aux points'
}; // EXTENSION 'Course aux points'

/* EXTENSION 'Course aux points' 'Disparition' ----- MAJmodes: Nettoie le terrain, le chrono, et met en mémoire le mode sélectionné */
var MAJmodes = function() {
	window.clearInterval(chronoApparitionCible); // EXTENSION 'Course aux points' 'Disparition'
	MODE = this.id; // EXTENSION 'Course aux points' 'Disparition'
	supprimeAffScore(); // EXTENSION 'Course aux points' 'Disparition'
	stopFieldChrono(); // EXTENSION 'Course aux points' 'Disparition'
	if (MODE != 'points') { // EXTENSION 'Course aux points' 'Disparition'
		var nbdecibles = document.getElementById("nbdecibles"); // EXTENSION 'Course aux points' 'Disparition'
		nbdecibles.style.display = "inline"; // EXTENSION 'Course aux points' 'Disparition'
	};
};

/* EXTENSION 'difficultés' MAJterrainDifficulty : Mets a jour le terrain selon la difficulté choisie, et nettoie le terrain et réintialise le chrono */
var MAJterrainDifficulty = function () { // EXTENSION 'difficultés'
	DIFF = this.id; // EXTENSION 'difficultés'
	var terrain = document.getElementById("terrain"); // EXTENSION 'difficultés'
	var facile = document.getElementById("facile"); // EXTENSION 'difficultés'
	if (facile.checked) { // EXTENSION 'difficultés'
		terrain.style.width = '300px'; // EXTENSION 'difficultés'
		terrain.style.height = '300px'; // EXTENSION 'difficultés'
		TARGET_WIDTH = 50; // EXTENSION 'difficultés'
		TARGET_HEIGHT = 50; // EXTENSION 'difficultés'
	} // EXTENSION 'difficultés'
	var normal = document.getElementById("normal"); // EXTENSION 'difficultés'
	if (normal.checked) { // EXTENSION 'difficultés'
		terrain.style.width = '400px'; // EXTENSION 'difficultés'
		terrain.style.height = '400px'; // EXTENSION 'difficultés'
		TARGET_WIDTH = 30; // EXTENSION 'difficultés'
		TARGET_HEIGHT = 30;
	} // EXTENSION 'difficultés'
	var difficile = document.getElementById("difficile"); // EXTENSION 'difficultés'
	if (difficile.checked) { // EXTENSION 'difficultés'
		terrain.style.width = '800px'; // EXTENSION 'difficultés'
		terrain.style.height = '500px'; // EXTENSION 'difficultés'
		TARGET_WIDTH = 20; // EXTENSION 'difficultés'
		TARGET_HEIGHT = 20; // EXTENSION 'difficultés'
	} // EXTENSION 'difficultés'
	var insane = document.getElementById("insane"); // EXTENSION 'difficultés'
	if (insane.checked) { // EXTENSION 'difficultés'
		terrain.style.width = '100%'; // EXTENSION 'difficultés'
		terrain.style.height = '500px'; // EXTENSION 'difficultés'
		TARGET_WIDTH = 10; // EXTENSION 'difficultés'
		TARGET_HEIGHT = 10; // EXTENSION 'difficultés'
	}; // EXTENSION 'difficultés'
	stopFieldChrono(); // EXTENSION 'difficultés'
}; // EXTENSION 'difficultés'


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
	if (disparition.checked) { // EXTENSION 'Disparition'
		window.setTimeout(function() {dispCible(newTarget);}, Math.random() * 5000 + 500); // EXTENSION 'Disparition'
	}; // EXTENSION 'Disparition'
	Cibles++;
	MAJremaining();
};


/* EXTENSION 'Disparition' dispCible: Supprime la cible passée en param puis en ajoute une nouvelle (sauf si en mode course au point) */
var dispCible = function(elem) { // EXTENSION 'Disparition'
	if (elem.className.indexOf('hit') == -1 && elem.parentNode != null) { // EXTENSION 'Disparition'
		elem.className = "target on hit"; // EXTENSION 'Disparition'
		window.setTimeout(function() {suppCible(elem);}, 1000); // EXTENSION 'Disparition'
		this.removeEventListener('click', suppCibleTimeout); // EXTENSION 'Disparition'
		Cibles--; // EXTENSION 'Disparition'
		if (MODE != 'points') { // EXTENSION 'Disparition' 'Course aux points'
			ajoutCible(); // EXTENSION 'Disparition' 'Course aux points'
		}// EXTENSION 'Disparition' 'Course aux points'
	};
};

/* suppCibleTimeout : déclenche le timeout pour suppprimer une cible cliquée */
var suppCibleTimeout = function () {
	if (this.className == "target on malus") { // EXTENSION 'Course aux points'
		scorePoints -= 50; // EXTENSION 'Course aux points'
		var son = new Audio ('sons/malus.wav'); // EXTENSION 'Course aux points'
		son.volume = 0.5; // EXTENSION 'Course aux points'
		son.play(); // EXTENSION 'Course aux points'
	} // EXTENSION 'Course aux points'
	if (this.className == "target on bonus") { // EXTENSION 'Course aux points'
		scorePoints += 20; // EXTENSION 'Course aux points'
		var son = new Audio ('sons/bonus.mp3'); // EXTENSION 'Course aux points'
		son.play(); // EXTENSION 'Course aux points'
	} // EXTENSION 'Course aux points'
	if (this.className == "target on") { // EXTENSION 'Course aux points'
		scorePoints += 10; // EXTENSION 'Course aux points'
	} // EXTENSION 'Course aux points'
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
	boutton2.addEventListener('click', askName); // EXTENSION 'Sauvegarde'
	affichage.appendChild(boutton2); // EXTENSION 'Sauvegarde'
};

/* supprimeAffScore : supprime l'affichage du score */
var supprimeAffScore = function () {
	var parent = document.getElementById("score");
	parent.innerHTML = "";
//	this.parentNode.remove();
};

/* EXTENSION 'Sauvegarde' askName : demande le pseudo du joueur avant de sauvegarder son score */
var askName = function () {  // EXTENSION 'Sauvegarde'
	this.removeEventListener('click', askName); // EXTENSION 'Sauvegarde'
	var parent = document.querySelector(".affichescore"); // EXTENSION 'Sauvegarde'
	var help = document.createElement('button'); // EXTENSION 'Sauvegarde'
	help.innerHTML = "?"; // EXTENSION 'Sauvegarde'
	help.className = "help"; // EXTENSION 'Sauvegarde'
	help.addEventListener("click",showHelp); // EXTENSION 'Sauvegarde'
	var p = document.createElement('p'); // EXTENSION 'Sauvegarde'
	p.textContent = 'Sauvegarder ce score sous quel pseudo ?'; // EXTENSION 'Sauvegarde'
	var username = document.createElement('input'); // EXTENSION 'Sauvegarde'
	username.value = pseudo; // EXTENSION 'Sauvegarde'
	username.type = 'text'; // EXTENSION 'Sauvegarde'
	username.required = "true"; // EXTENSION 'Sauvegarde'
	username.maxLength = "3"; // EXTENSION 'Sauvegarde'
	username.pattern = "[A-Z]{3,3}"; // EXTENSION 'Sauvegarde'
	username.size = '1'; // EXTENSION 'Sauvegarde'
	username.placeholder = "AAA"; // EXTENSION 'Sauvegarde'
	parent.appendChild(p); // EXTENSION 'Sauvegarde'
	parent.appendChild(help); // EXTENSION 'Sauvegarde'
	parent.appendChild(username); // EXTENSION 'Sauvegarde'
	var validity = document.createElement('span'); // EXTENSION 'Sauvegarde'
	parent.appendChild(validity); // EXTENSION 'Sauvegarde'
	var submit = document.createElement('button'); // EXTENSION 'Sauvegarde'
	submit.textContent = "OK"; // EXTENSION 'Sauvegarde'
	submit.addEventListener("click", saveScore); // EXTENSION 'Sauvegarde'
	parent.appendChild(submit); // EXTENSION 'Sauvegarde'
};

/* EXTENSION 'Sauvegarde' showHelp: Montre l'aide pour les conditions du pseudo */
var showHelp = function () { // EXTENSION 'Sauvegarde'
	window.alert('Votre pseudo doit être de la forme "AAA": exactement trois lettres en majuscules. (Comme dans les jeux arcades)') // EXTENSION 'Sauvegarde'
}

/* EXTENSION 'Disparition' 'Course aux points' showHelp2: Montre l'aide pour la selection du mode de jeu */
var showHelp2 = function() { // EXTENSION 'Disparition' 'Course aux points'
	window.alert("Les différents modes:\n\n\nJeu de base: Choisissez un nombre de cible et une difficulté, puis abbatez toutes les cibles le plus rapidement possibles !\n\nDisparition: Même principe que le jeu de base: abbatez toutes les cibles le plus vite possibles, mais attention, elles disparaissent au bout d'un temps aléatoire (mais toujours supérieur à 0.5 secondes pour que la cible ne disparaisse pas juste après son apparition)\n\nCourse aux points: Vous avez une minute pour obtenir le plus de point possible, une cible normale vaut 10 points, une dorée 20 points, et une rouge vous enlève 50 points (taux d'apparition: normale: 50%, bonus: 20%, malus: 30%), attention, les cibles disparaissent au bout d'un temps aléatoire ! \n\n Bon jeu !")
}

/* EXTENSION 'Sauvegarde' saveScore: sauvegarde un score et nettoie l'affichage du score */
var saveScore = function () { // EXTENSION 'Sauvegarde'
	var parent = document.getElementById('saves_'+DIFF+'_'+MODE);// EXTENSION 'Sauvegarde'
	var phrase = document.createElement('p');// EXTENSION 'Sauvegarde'
	var username = document.querySelector('button + input');// EXTENSION 'Sauvegarde'
	if (username.checkValidity()) {// EXTENSION 'Sauvegarde'
		pseudo = username.value;// EXTENSION 'Sauvegarde'
		if (MODE == 'points') {// EXTENSION 'Sauvegarde' 'Course aux points'
			phrase.innerHTML = "<div class='username'>"+pseudo+" </div> a obtenu un total de <div class='score'>"+scorePoints+" points</div>.";// EXTENSION 'Sauvegarde' 'Course aux points'
		}// EXTENSION 'Sauvegarde' 'Course aux points'
		else {// EXTENSION 'Sauvegarde'
			phrase.innerHTML = "<div class='username'>"+pseudo+" </div> a abbatu <div class='CiblesDebut'>"+CiblesDebut+" cibles</div> en <div class='score'>"+score+" secondes</div>.";
		}// EXTENSION 'Sauvegarde'
		parent.appendChild(phrase);// EXTENSION 'Sauvegarde'
		var boutton = document.createElement("button");// EXTENSION 'Sauvegarde'
		boutton.innerHTML = '<img src="images/trash.png" width="20px"/>';// EXTENSION 'Sauvegarde'
		boutton.addEventListener('click', supprimeScore);// EXTENSION 'Sauvegarde'
		phrase.appendChild(boutton);// EXTENSION 'Sauvegarde'
		supprimeAffScore();// EXTENSION 'Sauvegarde'
	};// EXTENSION 'Sauvegarde'
};

/* EXTENSION 'Sauvegarde' supprimeScore: supprime un score */
var supprimeScore = function () {// EXTENSION 'Sauvegarde'
	this.parentNode.remove();// EXTENSION 'Sauvegarde'
}// EXTENSION 'Sauvegarde'
