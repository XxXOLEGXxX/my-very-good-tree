let modInfo = {
	name: "You get the idea",
	id: "mymod",
	author: "nobody",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.3",
	name: "PAIN NEVER ENDS",
}

let changelog = `psssst hey<br>
	x.0.0 = finished major content<br>
	0.x.0 = available ng-x mode<br>
	0.0.x = bugfixes and shticks<br><br><br>
	<h1>Changelog:</h1><br>
	<h3>v0.3: PAIN NEVER ENDS</h3><br>
		- Added things.<br>
		- Added stuff.`

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
	if(player.ab.points.gte(4)) baller = false
	return baller
}

function getBypassedPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1).add(upgradeRow("p", "1", true)).add(upgradeRow("kp", "1", true)).add(upgradeRow("mp", "1", true)).add(upgradeRow("gp", "1", true))
	let mult = new Decimal(1).add(upgradeRow("kp", "2", true)).add(upgradeRow("mp", "2", true)).add(upgradeRow("gp", "2", true))
	let exp = new Decimal(1).add(upgradeRow("mp", "3", true)).add(upgradeRow("gp", "3", true))
	let tetra = new Decimal(upgradeRow("gp", "4", true)).div(100).add(1)
	if(player.ab.points.gte(1)) gain = gain.div(4)
	gain = gain.times(mult).pow(exp).tetrate(tetra).times(tmp.b.effect).times(tmp.kb.effect).times(tmp.mb.effect).times(tmp.pb.effect)
	gain = gain.plus(tmp.ab.buyables[11].effect).times(tmp.ab.buyables[12].effect).pow(tmp.ab.buyables[13].effect).tetrate(tmp.ab.buyables[14].effect)
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
	if(!canGenPoints()||player.ab.negativePoints.gt(0))
		return new Decimal(0)

	let gain = new Decimal(1).add(upgradeRow("p", "1", true)).add(upgradeRow("kp", "1", true)).add(upgradeRow("mp", "1", true)).add(upgradeRow("gp", "1", true))
	let mult = new Decimal(1).add(upgradeRow("kp", "2", true)).add(upgradeRow("mp", "2", true)).add(upgradeRow("gp", "2", true))
	let exp = new Decimal(1).add(upgradeRow("mp", "3", true)).add(upgradeRow("gp", "3", true))
	let tetra = new Decimal(upgradeRow("gp", "4", true)).div(100).add(1)
	if(player.ab.points.gte(1)) gain = gain.div(4)
	gain = gain.times(mult).pow(exp).tetrate(tetra).times(tmp.b.effect).times(tmp.kb.effect).times(tmp.mb.effect).times(tmp.pb.effect)
	gain = gain.plus(tmp.ab.buyables[11].effect).times(tmp.ab.buyables[12].effect).pow(tmp.ab.buyables[13].effect).tetrate(tmp.ab.buyables[14].effect)
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
	return player.ab.points.gte(4)
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

//Hidden 2 AB Guide :flushed:
//1. 0011: 9330
//2. 0101: 8582
//3. 1010: 4468
//4. 1100: 4162 (Intended Way)
//5. 1001: 3817
//6. 0110: 9572

//Hidden 3 AB Guide :flushed:
//1. 1011: 1.08e57+
//2. 1101: 4.75e49+
//3. 1110: 3.03e29
//4. 0200: 1.26e27 (Intended Way)
//5. 2000: 3.16e26
//6. 0111: NO PRESTIGE POINTS?
//7. 0020: NO PRESTIGE POINTS?
//8. 0002: NO PRESTIGE POINTS?