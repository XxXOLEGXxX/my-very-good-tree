// ************ Options ************

let options = {}

function getStartOptions() {
	return {
		autosave: true,
		msDisplay: "always",
		theme: "default",
		hqTree: false,
		offlineProd: true,
		hideChallenges: false,
		showStory: true,
		forceOneTab: false,
		oldStyle: false,
		tooltipForcing: true,
		musicToggle: 0,
		assholeMode: false,
		meSmart: false,
		why: false,
		mobileButtons: true,
		translateThis: false,
		ngplus: new Decimal(0),
	}
}

function swtichMusic() {
	if(player.ab.points.gte(1)){
		options.musicToggle+=1
		if(options.musicToggle>=5||new Decimal(options.musicToggle).gte(player.ab.points.add(1))){
			document.getElementById("idAudio"+(options.musicToggle-1)).pause()
			document.getElementById("idAudio"+(options.musicToggle-1)).currentTime = 0
			options.musicToggle = 0
		}
		else{
			if(options.musicToggle>=2)document.getElementById("idAudio"+(options.musicToggle-1)).pause()
			if(options.musicToggle>=2)document.getElementById("idAudio"+(options.musicToggle-1)).currentTime = 0
			document.getElementById("idAudio"+options.musicToggle).play()
		}
	}
}

function newGamePlus(){
	if(new Decimal(options.ngplus).gte(5)&&player.ab.shopPoints.lte(0)){
		player.ab.buyables[11] = new Decimal(0)
		player.ab.buyables[12] = new Decimal(0)
		player.ab.buyables[13] = new Decimal(0)
		player.ab.buyables[14] = new Decimal(0)
		player.ab.spentPoints = new Decimal(0)
	}
	options.ngplus=options.ngplus>=5?new Decimal(0):new Decimal(options.ngplus).add(1)
}

function toggleOpt(name) {
	if (name == "oldStyle" && styleCooldown > 0)
		return;

	options[name] = !options[name];
	if (name == "hqTree")
		changeTreeQuality();
	if (name == "oldStyle")
		updateStyle();
}
function assholeToggle(){
	if(options.assholeMode==true){
		alert("Bro...")
	}
	if(options.assholeMode==false){
		if(confirm("Are you REALLY sure you want to do this? Entering this mode will take away your achievements, buff softcaps startup and you won't be able to switch back to normal mode. You've been warned.\n\nyou better put that goddamn console before i beat the sh")){
			player["tree-tab"].doubt = new Decimal(0)
			options.assholeMode = !options.assholeMode
			options.meSmart = !options.meSmart
			player.a.achievements = []
			options.autosave = false
			player.c.achievements = []
		}
	}
}
var styleCooldown = 0;
function updateStyle() {
	styleCooldown = 1;
	let css = document.getElementById("styleStuff");
	css.href = options.oldStyle ? "oldStyle.css" : "style.css";
	needCanvasUpdate = true;
}
function changeTreeQuality() {
	var on = options.hqTree;
	document.body.style.setProperty('--hqProperty1', on ? "2px solid" : "4px solid");
	document.body.style.setProperty('--hqProperty2a', on ? "-4px -4px 4px rgba(0, 0, 0, 0.25) inset" : "-4px -4px 4px rgba(0, 0, 0, 0) inset");
	document.body.style.setProperty('--hqProperty2b', on ? "0px 0px 20px var(--background)" : "");
	document.body.style.setProperty('--hqProperty3', on ? "2px 2px 4px rgba(0, 0, 0, 0.25)" : "none");
}
function toggleAuto(toggle) {
	Vue.set(player[toggle[0]], [toggle[1]], !player[toggle[0]][toggle[1]]);
	needCanvasUpdate=true
}

const MS_DISPLAYS = ["ALL", "LAST, AUTO, INCOMPLETE", "AUTOMATION, INCOMPLETE", "INCOMPLETE", "NONE"];

const MS_SETTINGS = ["always", "last", "automation", "incomplete", "never"];

function adjustMSDisp() {
	options.msDisplay = MS_SETTINGS[(MS_SETTINGS.indexOf(options.msDisplay) + 1) % 5];
}
function milestoneShown(layer, id) {
	complete = player[layer].milestones.includes(id);
	auto = layers[layer].milestones[id].toggles;

	switch (options.msDisplay) {
		case "always":
			return true;
			break;
		case "last":
			return (auto) || !complete || player[layer].lastMilestone === id;
			break;
		case "automation":
			return (auto) || !complete;
			break;
		case "incomplete":
			return !complete;
			break;
		case "never":
			return false;
			break;
	}
	return false;
}
