let modInfo = {
	name: "You get the idea",
	id: "howdidifuckthisoneupohmygod",
	author: "nobody",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],
	soWhatsMyName: "",

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.5.0",
	name: "fuck you nose",
}

let changelog = `psssst hey<br>
	x.0.0 = finished major content<br>
	0.x.0 = available ng-x mode<br>
	0.0.x = bugfixes and shticks<br><br><br>
	<h1>Changelog:</h1><br><br>
	<h3>v0.5.0: fuck you nose (v0.2.2)</h3><br>
		- Changed this mod's ID so it wouldn't conflict with other "mymod" mods<br>
		- Finished first two layers of NG-----<br>
		- Rebalanced NG----'s late game by accident<br>
		- Banished De Noido back to the Minecraft<br>
		- Added Herobrine<br>
		- Added super duper ultra mega ultimate layer with shortcuts<br>
		- Two new themes (Hooray! :D)<br><br>
	<h4>v0.4.1: Mobile QoL (v0.2.1)</h4>
		- Fixed some typos and minor tweaks<br>
		- Made it possible to obtain all achievements no matter what you do<br>
		- Added clickables to make this mod 10x less sufferable for mobile players<br><br>
	<h3>v0.4: Inflation Strikes Back (v0.2)</h3><br>
		- Added 3 available layers.<br>
		- Fixed kilo prestige's hotkey typo and some hotkeys popping out way earlier than intended<br>
		- Pushed Endgame up to NG----<br><br>
	<h3>v0.3: PAIN NEVER ENDS (v0.1)</h3><br>
		- Added about 9-10 available layers.<br>
		- Ends at NG---<br>
		- What else do you expect.`

let winText = `Phew... That's quite a mouthful title to end this mod with. Yikes indeed, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	let baller = true
	if(player.ab.points.gte(6)) baller = false
	return baller
}

function getBypassedPointGen() {
	let doesItWorkTho = player.ab.points.gte(5)&&!(player.ab.nostalgia||player.ab.fuckyou)
	if(!canGenPoints()||doesItWorkTho)
		return new Decimal(0)

	let gain = new Decimal(1).add(upgradeRow("p", "1", true)).add(upgradeRow("kp", "1", true)).add(upgradeRow("mp", "1", true)).add(upgradeRow("gp", "1", true))
	let mult = new Decimal(1).add(upgradeRow("kp", "2", true)).add(upgradeRow("mp", "2", true)).add(upgradeRow("gp", "2", true))
	let exp = new Decimal(1).add(upgradeRow("mp", "3", true)).add(upgradeRow("gp", "3", true))
	let tetra = new Decimal(upgradeRow("gp", "4", true)).div(100).add(1)
	gain = gain.mul(tmp.s.effect)
	if(hasUpgrade("s", 12)) gain = gain.mul(upgradeEffect("s", 12))
	if(hasUpgrade("t", 11)) gain = gain.mul(tmp.t.effectSecond)
	gain = gain.mul(tmp.n.totalEffect)
	if(hasUpgrade("n", 11)&&player.points.gt(0)) gain = gain.mul(upgradeEffect("n", 11))
	if(hasUpgrade("n", 12)) gain = gain.mul(upgradeEffect("n", 12))
	if(hasUpgrade("n", 13)) gain = gain.mul(upgradeEffect("n", 13))
	if(hasUpgrade("n", 14)) gain = gain.mul(player.n.tax.div(100).add(1))
	if(hasAchievement("a", 1012)) gain = gain.mul(4)
	gain = gain.mul(tmp.g.effectPower)
	if(player.ab.points.gte(1)) gain = gain.div(4)
	if(player.ab.points.gte(4)) gain = gain.div(4)
	gain = gain.times(mult).pow(exp).tetrate(tetra).times(tmp.b.effect).times(tmp.kb.effect).times(tmp.mb.effect).times(tmp.gb.effect).times(tmp.pb.effect)
	gain = gain.plus(tmp.ab.buyables[11].effect).times(tmp.ab.buyables[12].effect).pow(tmp.ab.buyables[13].effect).tetrate(tmp.ab.buyables[14].effect)
	let notSoInfinite = new Decimal(2).pow(1024)
	if(hasUpgrade("t", 13) && player.points.gt(0)) gain = gain.mul(6)
	for(let iAmMortal = 1; gain.gte(Decimal.pow(notSoInfinite, iAmMortal)); iAmMortal++) {
	gain = gain.div(gain.div(Decimal.pow(notSoInfinite, iAmMortal)).root(Decimal.add(1, Decimal.div(1, Decimal.root(iAmMortal, iAmMortal)))))
	}
	for(let iAmGod = 1; gain.gte(Decimal.pow("1e10000", iAmGod)); iAmGod++) {
	gain = gain.div(gain.div(Decimal.pow("1e10000", iAmGod)).root(Decimal.add(1, Decimal.div(1, Decimal.tetrate(iAmGod, iAmGod)))))
	}
	if(player.ab.points.gte(5)) gain = gain.times(-1)
	return gain
}

function denoido() {
	let progress = new Decimal(1)
	if(hasAchievement("a", 35)) progress = new Decimal(player.dn.points.floor()).pow(player.dn.points.floor())
	let skateboardGain = player.dn.points.div(10).times(progress)
	let pogoGain = player.dn.skateboards.div(100).times(progress)
	let denoidoGain = player.dn.pogos.div(1000).times(progress)
	let bombGain = player.dn.pogos.div(10000).times(progress)
	let minidenoidoGain = player.dn.bombs.div(100000000).times(progress)
	let fakedenoidoGain = player.dn.minidenoidos.div(10000000000000000).times(progress)
	return {skateboardGain, pogoGain, denoidoGain, bombGain, minidenoidoGain, fakedenoidoGain}
}

// Calculate points/sec!
function getPointGen() {
	let doesItWorkTho = player.ab.points.gte(5)&&!(player.ab.nostalgia||player.ab.fuckyou)
	if(!canGenPoints()||player.ab.negativePoints.gt(0)||doesItWorkTho)
		return new Decimal(0)

	let gain = new Decimal(1).add(upgradeRow("p", "1", true)).add(upgradeRow("kp", "1", true)).add(upgradeRow("mp", "1", true)).add(upgradeRow("gp", "1", true))
	let mult = new Decimal(1).add(upgradeRow("kp", "2", true)).add(upgradeRow("mp", "2", true)).add(upgradeRow("gp", "2", true))
	let exp = new Decimal(1).add(upgradeRow("mp", "3", true)).add(upgradeRow("gp", "3", true))
	let tetra = new Decimal(upgradeRow("gp", "4", true)).div(100).add(1)
	gain = gain.mul(tmp.s.effect)
	if(hasUpgrade("s", 12)) gain = gain.mul(upgradeEffect("s", 12))
	if(hasUpgrade("t", 11)) gain = gain.mul(tmp.t.effectSecond)
	gain = gain.mul(tmp.n.totalEffect)
	if(hasUpgrade("n", 11)&&player.points.gt(0)) gain = gain.mul(upgradeEffect("n", 11))
	if(hasUpgrade("n", 12)) gain = gain.mul(upgradeEffect("n", 12))
	if(hasUpgrade("n", 13)) gain = gain.mul(upgradeEffect("n", 13))
	if(hasUpgrade("n", 14)) gain = gain.mul(player.n.tax.div(100).add(1))
	if(hasAchievement("a", 1012)) gain = gain.mul(4)
	gain = gain.mul(tmp.g.effectPower)
	if(player.ab.points.gte(1)) gain = gain.div(4)
	if(player.ab.points.gte(4)) gain = gain.div(4)
	gain = gain.times(mult).pow(exp).tetrate(tetra).times(tmp.b.effect).times(tmp.kb.effect).times(tmp.mb.effect).times(tmp.gb.effect).times(tmp.pb.effect)
	gain = gain.plus(tmp.ab.buyables[11].effect).times(tmp.ab.buyables[12].effect).pow(tmp.ab.buyables[13].effect).tetrate(tmp.ab.buyables[14].effect)
	let notSoInfinite = new Decimal(2).pow(1024)
	if(hasUpgrade("t", 13) && player.points.gt(0)) gain = gain.mul(6)
	for(let iAmMortal = 1; gain.gte(Decimal.pow(notSoInfinite, iAmMortal)); iAmMortal++) {
	gain = gain.div(gain.div(Decimal.pow(notSoInfinite, iAmMortal)).root(Decimal.add(1, Decimal.div(1, Decimal.root(iAmMortal, iAmMortal)))))
	}
	for(let iAmGod = 1; gain.gte(Decimal.pow("1e10000", iAmGod)); iAmGod++) {
	gain = gain.div(gain.div(Decimal.pow("1e10000", iAmGod)).root(Decimal.add(1, Decimal.div(1, Decimal.tetrate(iAmGod, iAmGod)))))
	}
	if(player.ab.points.gte(5)) gain = gain.times(-1)
	return gain
}

function upgradeRow(a, b, c) { //"a" = layer, b = row, c == true = has upgrade and vice versa
	let length = new Decimal(0)
	let check = false
	for (let i=1; check==false; i++){
		!(tmp[a].upgrades[b*10+i] == undefined)?(hasUpgrade(a, b*10+i)?length = length.add(1):length = length):check = true
	}  
	return length
}

function upgradeRows(a, b, c, d){ //"a", b, c = same thing, d = amount of rows to check
	let length = new Decimal(0)
	for (let i=0; i<d; i++){
		length = length.add(upgradeRow(a, new Decimal(b+i), c))
	}
	return length
}

function getMode() {
	let mode = "NG"
	for (i=0; i<player.ab.points; i++) {
		mode = mode+"-"
	}
	return mode
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.ab.points.gte(6)
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
