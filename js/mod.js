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
	num: "5.6",
	name: "uggh",
}

let changelog = `<h3>Whatever you do, do NOT abuse Balancers...</h3><br><br>
	psssst hey<br>
	x.0 = available ng-x mode<br>
	0.x = everything else<br><br><br>
	<h1>Changelog:</h1><br><br>
	<h4>v5.6: uggh (v0.6.1)</h4>
		- Pushed endgame a bit further<br>
		- Added 3 background musics (you can toggle them in options once you progress far enough)<br>
		- Added few more gags and bugfixes<br>
		- Nerfed Tetrational Balancer to prevent it from tetrating the hell out of my mod and killing it<br>
	<h4>v5.5: me omw to make people test this thing (v0.6)</h4>
		- Released Row 0 layers (not finished)<br>
		- Fixed few more bugs that went unnoticed by everyone<br>
		- Buffed certain things to make them actually viable compared to other options<br>
		- Challenges now [REDACTED] whenever you can't obtain them anymore due conditions<br>
		- 3rd challenge is humanly possible stfu<br>
	<h4>v5.4: More Accurate Changelog (v0.5)</h4>
		- Fixed NG----- layer's buyable not taking away your resource or taking away much more resource than what the price says<br>
		- Rebalanced Nostalgia layers and added more content to them<br>
		- Made 2nd version accurate to the amount of content has been uploaded<br>
	<h4>v5.3: aawdwaawtjwoitgjawipotkaiokaw4 (v0.4.1)</h4>
		- Fixed some upgrades yielding NaN due players being able to get negative [insert NG----- layer's point name here]<br>
		- Fixed 3rd milestone of NG----- layer being given as a bonus for getting 2nd milestone<br>
	<h4>v5.2: Early Access (v0.4)</h4>
		- Finished 2 more NG----- layers.<br>
	<h4>v5.1: no comment (v0.3.1)</h4>
		- Fixed Space's Dimension Shift not revealing next shape.<br>
		- Updated my own theme.<br><br>
	<h3>v5.0: fuck you nose (v0.3)</h3><br>
		- Changed this mod's ID so it wouldn't conflict with other "mymod" mods<br>
		- Finished first two layers of NG-----<br>
		- Rebalanced NG----'s late game by accident<br>
		- Banished De Noido back to the Minecraft<br>
		- Added Herobrine<br>
		- Added super duper ultra mega ultimate layer with shortcuts<br>
		- Two new themes (Hooray! :D)<br><br>
	<h4>v4.1: Mobile QoL (v0.2.1)</h4>
		- Fixed some typos and minor tweaks<br>
		- Made it possible to obtain all achievements no matter what you do<br>
		- Added clickables to make this mod 10x less sufferable for mobile players<br><br>
	<h3>v4: Inflation Strikes Back (v0.2)</h3><br>
		- Added 3 available layers.<br>
		- Fixed kilo prestige's hotkey typo and some hotkeys popping out way earlier than intended<br>
		- Pushed Endgame up to NG----<br><br>
	<h3>v3: PAIN NEVER ENDS (v0.1)</h3><br>
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
	if((hasUpgrade("n", 11)&&player.points.gt(0))||(hasUpgrade("n", 11)&&hasMilestone("o", 3))) gain = gain.mul(upgradeEffect("n", 11))
	if(hasUpgrade("n", 12)) gain = gain.mul(upgradeEffect("n", 12))
	if(hasUpgrade("n", 13)) gain = gain.mul(upgradeEffect("n", 13))
	if(hasUpgrade("n", 14)) gain = gain.mul(tmp.n.bestDayEffect)
	if(hasUpgrade("m", 12)) gain = gain.mul(upgradeEffect("m", 12))
	if(hasUpgrade("m", 23)) gain = gain.mul(upgradeEffect("m", 23))
	if(hasMilestone("m", 1)) gain = gain.mul(player.m.offer.add(1).log(17).add(1).max(1))
	if(player.c.unlocked) gain = gain.mul(tmp.c.effect)
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
	if((hasUpgrade("n", 11)&&player.points.gt(0))||(hasUpgrade("n", 11)&&hasMilestone("o", 3))) gain = gain.mul(upgradeEffect("n", 11))
	if(hasUpgrade("n", 12)) gain = gain.mul(upgradeEffect("n", 12))
	if(hasUpgrade("n", 13)) gain = gain.mul(upgradeEffect("n", 13))
	if(hasUpgrade("n", 14)) gain = gain.mul(tmp.n.bestDayEffect)
	if(hasUpgrade("m", 12)) gain = gain.mul(upgradeEffect("m", 12))
	if(hasUpgrade("m", 23)) gain = gain.mul(upgradeEffect("m", 23))
	if(hasMilestone("m", 1)) gain = gain.mul(player.m.offer.add(1).log(17).add(1).max(1))
	if(player.c.unlocked) gain = gain.mul(tmp.c.effect)
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
