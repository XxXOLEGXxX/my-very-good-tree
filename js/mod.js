let modInfo = {
	name: "You get the idea",
	id: "howdidifuckthisoneupohmygod",
	author: "Oleg (fuckyousegabutdeezcord in Discord)",
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
	num: "5.13.1",
	name: "ng+x buff be like",
}

let changelog = `<h3>Whatever you do, do NOT abuse Balancers...</h3><br><br>
	psssst hey<br>
	x.0 = available ng-x mode<br>
	0.x = everything else<br><br><br>
	<h1>Changelog:</h1><br><br>
	<h5>v5.13.1: ng+x buff be like (v0.11.1)<br>
		- Buffed NG+, NG+4 and NG+5<br>
		- Made it so you can actually see secret layer at NG-5
		- Fixed a bug where you can get warning unintentionally in NG+5</h5>
	<h4>v5.13: Croissant Edition (v0.11)</h4>
		- Added Crescent prestige for Crazy layer<br>
		- Pushed Onion layer's endgame a bit<br>
		- Replaced AD theme with "Adapt" theme (background depends on current layer's color)<br>
		- Fixed potential bugs and shticks around<br>
		- Fixed bug where you can reset despite not being able to gain anything<br>
		- Made few tweaks in Nostalgia to make things less tedious<br>
		- Secret layer reveals itself once you reach NG-5<br>
	<h4>v5.12: New Game+... in a NG- themed TMT? (v0.10.1)</h4>
		- Very slightly pushed Onion endgame<br>
		- Added NG+ modes all the way up to NG+5 (NG+ ideas by thenonymous)<br>
		- Fixed Onion milestones still acting goofy (FFS)<br>
	<h4>v5.11: Take a load of this! (v0.10)</h4>
		- Added much shorter explanation in Primordial Booster layer<br>
		- Tooltip has been resized and Crazy achievements were rearranged<br>
		- There's no way you can miss Hall of Fame now IT'S LITERALLY IN ANTI BALANCER PLEASE<br>
		- Added even more QoL for mobile players (perhaps a bit too much)<br>
		- Final Crazy Challenge got it's proper treatment it deserves<br>
		- Each of Onion's tab's content has their respectful color... except for challenge buttons<br>
		- Optimized Onion milestones<br>
		- Added option to translate prestige upgrades (and ruin fun >:[)<br>
		- Added new Onion tab! (Trust me, it has lots of content)<br>
		- Improved Oleg's theme (did nothing for AD theme tho)<br>
	<h4>v5.10: oopsie, i made a mistake :3 (v0.9.1)</h4>
		- LoL's effect functions properly with Mango bulk<br>
		- Did something and hope Early NG---- (and ACTs) work the way they're supposed to<br>
		- Pushed Post-Irony's endgame a bit<br>
	<h4>v5.9: Finally, Some Good Fucking Update (v0.9)</h4>
		- Finished Infinite Challenges and added Compressors<br>
		- Added content into Sushi tab<br>
		- A couple of achievements<br>
		- La creatura doesn't immediately kick your ass if you overbuy Balancers (it's trying the best to not kill you)<br>
	<h4>v5.8: Shrek is Love, Shrek is Life (v0.8)</h4>
		- Gave Onion layer an approriate amount of content<br>
		- Some polishing, funni mode and new musics added<br>
		- that's all<br>
		edit: - Fixed Infinite Upgrade 23 causing NaN<br>
		edit 2: - Fixed some more stuff<br>
	<h4>v5.7: Today, we're eating well tonight (v0.7)</h4>
		- Fixed game's pace breaking bug which allowed players to force respec Balancers<br>
		- Added Infinite and some extra content<br>
		- Added a bit of content for Onion layer (my bad i had to upload bugfix before more people blitz'd through the game)<br>
		- Added Asshole Mode (Warning: It'll kick your ass)<br>
	<h4>v5.6: uggh (v0.6.1)</h4>
		- Pushed endgame a bit further<br>
		- Added 3 background musics (you can toggle them in options once you progress far enough)<br>
		- Added few more gags and bugfixes<br>
		- Buffed NG----'s nerf to specifically Tetrational Balancer to prevent it from tetrating the hell out of my mod and killing it<br>
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
	<h3>v5: fuck you nose (v0.3)</h3><br>
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
	let mult = new Decimal(1).add(upgradeRow("kp", "2", true)).add(upgradeRow("mp", "2", true)).add(upgradeRow("gp", "2", true)).mul(new Decimal(options.ngplus).gte(1)?Decimal.add(player.timePlayed,1).root(8.199380194850416):1).mul(new Decimal(options.ngplus).gte(3)?player.a.achievements.length+player.c.achievements.length+player.realAB.achievements.length+1:1)
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
	if(player.c.unlocked) gain = gain.mul(tmp.c.effect).mul(Decimal.pow(4, player.c.buyables["compress"].pow(0.7407407407407407)))
	if(player.o.unlocked2) gain = gain.mul(player.o.thirdLevel)
	if(player.o.unlocked3) gain = gain.mul(player.o.burgers.add(1).pow(3).root(2))
	if(hasUpgrade("o", 11)) gain = gain.mul(upgradeEffect("o", 11))
	if(hasUpgrade("o", 12)) gain = gain.mul(Decimal.pow(1/9+1, player.o.fifthLevel.sub(1)))
	if(player.o.unlocked4) gain = gain.mul(player.o.sushis.add(2).log(2).pow(0.8).mul(tmp.o.buyables[101].effect))
	if(hasAchievement("a", 1012)) gain = gain.mul(4)
	if(hasAchievement("c",42)) gain = gain.mul(tmp.c.buyables["CB3"].effect2)
	if(tmp.c.gimmeEpicGamerCombo==3) gain = gain.mul(3)
	gain = gain.mul(tmp.g.effectPower)
	if(player.ab.points.gte(1)) gain = gain.div(4)
	if(player.ab.points.gte(4)) gain = gain.div(4)
	gain = gain.times(mult).pow(exp).tetrate(tetra).times(tmp.b.effect).times(tmp.kb.effect).times(tmp.mb.effect).times(tmp.gb.effect).times(tmp.pb.effect)
	gain = gain.plus(tmp.ab.buyables[11].effect).times(tmp.ab.buyables[12].effect).pow(tmp.ab.buyables[13].effect).tetrate(tmp.ab.buyables[14].effect)
	let notSoInfinite = new Decimal(2).pow(1024)
	if(hasUpgrade("t", 13) && player.points.gt(0)) gain = gain.mul(6)
	if(inChallenge("c", 23)) gain = gain.tetrate(0.8408964152537146)
	if(inChallenge("o", 22)) gain = gain.pow(0.69)
	for(let iAmMortal = 1; gain.gte(Decimal.pow((options.assholeMode?10:notSoInfinite), iAmMortal)); iAmMortal++) {
	gain = gain.div(gain.div(Decimal.pow((options.assholeMode?10:notSoInfinite), iAmMortal)).root(Decimal.add(1, Decimal.div(1, Decimal.root(iAmMortal, iAmMortal)))))
	}
	for(let iAmGod = 1; gain.gte(Decimal.pow((options.assholeMode?1000:"1e10000"), iAmGod)); iAmGod++) {
	gain = gain.div(gain.div(Decimal.pow((options.assholeMode?1000:"1e10000"), iAmGod)).root(Decimal.add(1, Decimal.div(1, Decimal.tetrate(iAmGod, iAmGod)))))
	}
	if(player.ab.points.gte(5)) gain = gain.times(-1)
	return gain
}

function infiniteChallenges(){
	let base = new Decimal(0)
	for(i=1;i<5;i++){
		for(v=1;v<4;v++){
			base = base.add(player.c.challenges[i*10+v])
		}
	}
	return base.add(player.c.challenges[51])
}

function smartAchievementEffect(layer, id, def = new Decimal(1)) {
    return (hasAchievement(layer, id) ? achievementEffect(layer, id) : def)
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
	let mult = new Decimal(1).add(upgradeRow("kp", "2", true)).add(upgradeRow("mp", "2", true)).add(upgradeRow("gp", "2", true)).mul(new Decimal(options.ngplus).gte(1)?Decimal.add(player.timePlayed,1).root(8.199380194850416):1).mul(new Decimal(options.ngplus).gte(3)?player.a.achievements.length+player.c.achievements.length+player.realAB.achievements.length+1:1)
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
	if(player.c.unlocked) gain = gain.mul(tmp.c.effect).mul(Decimal.pow(4, player.c.buyables["compress"].pow(0.7407407407407407)))
	if(player.o.unlocked2) gain = gain.mul(player.o.thirdLevel)
	if(player.o.unlocked3) gain = gain.mul(player.o.burgers.add(1).pow(3).root(2))
	if(hasUpgrade("o", 11)) gain = gain.mul(upgradeEffect("o", 11))
	if(hasUpgrade("o", 12)) gain = gain.mul(Decimal.pow(1/9+1, player.o.fifthLevel.sub(1)))
	if(player.o.unlocked4) gain = gain.mul(player.o.sushis.add(2).log(2).pow(0.8).mul(tmp.o.buyables[101].effect))
	if(hasAchievement("a", 1012)) gain = gain.mul(4)
	if(hasAchievement("c",42)) gain = gain.mul(tmp.c.buyables["CB3"].effect2)
	if(tmp.c.gimmeEpicGamerCombo==3) gain = gain.mul(3)
	gain = gain.mul(tmp.g.effectPower)
	if(player.ab.points.gte(1)) gain = gain.div(4)
	if(player.ab.points.gte(4)) gain = gain.div(4)
	gain = gain.times(mult).pow(exp).tetrate(tetra).times(tmp.b.effect).times(tmp.kb.effect).times(tmp.mb.effect).times(tmp.gb.effect).times(tmp.pb.effect)
	gain = gain.plus(tmp.ab.buyables[11].effect).times(tmp.ab.buyables[12].effect).pow(tmp.ab.buyables[13].effect).tetrate(tmp.ab.buyables[14].effect)
	let notSoInfinite = new Decimal(2).pow(1024)
	if(hasUpgrade("t", 13) && player.points.gt(0)) gain = gain.mul(6)
	if(inChallenge("c", 23)) gain = gain.tetrate(0.8408964152537146)
	if(inChallenge("o", 22)) gain = gain.pow(0.69)
	for(let iAmMortal = 1; gain.gte(Decimal.pow((options.assholeMode?10:notSoInfinite), iAmMortal)); iAmMortal++) {
	gain = gain.div(gain.div(Decimal.pow((options.assholeMode?10:notSoInfinite), iAmMortal)).root(Decimal.add(1, Decimal.div(1, Decimal.root(iAmMortal, iAmMortal)))))
	}
	for(let iAmGod = 1; gain.gte(Decimal.pow((options.assholeMode?1000:"1e10000"), iAmGod)); iAmGod++) {
	gain = gain.div(gain.div(Decimal.pow((options.assholeMode?1000:"1e10000"), iAmGod)).root(Decimal.add(1, Decimal.div(1, Decimal.tetrate(iAmGod, iAmGod)))))
	}
	if(player.ab.points.gte(5)) gain = gain.times(-1)
	return gain
}

function canHeGeneratePlottho(){
	let gain = new Decimal(player.realAB.points.gte(1)?1:0).add(inChallenge("realAB",12)?0:tmp.realAB.buyables[13].effect).mul(inChallenge("realAB",12)?1:tmp.realAB.buyables[12].effect)
	if(hasUpgrade("realAB",11)) gain = gain.mul(inChallenge("realAB",11)?1:upgradeEffect("realAB",11))
	if(hasUpgrade("realAB",12)) gain = gain.mul(inChallenge("realAB",11)?1:new Decimal(1.9001).add(new Decimal(0.9001).mul(player.realAB.challenges[11]+player.realAB.challenges[14])))
	if(hasUpgrade("o",42)) gain = gain.mul(upgradeEffect("o",42))
	if(hasAchievement("realAB",24)) gain = gain.mul(inChallenge("realAB",13)?1:Decimal.pow(1.15, new Decimal(player.realAB.achievements.length).add(1).add(player.realAB.challenges[13]+player.realAB.challenges[14])))
	if(hasAchievement("realAB",25)) gain = gain.mul(inChallenge("realAB",13)?1:2)
	if(player.realAB.points.gte(5)) gain = gain.mul(Decimal.add(player.realAB.achievements.length,1).root(1.69))
	if(hasUpgrade("realAB",13)&&(inChallenge("realAB",12)||inChallenge("realAB",13))) gain = gain.add(tmp.realAB.upgrades[13].effect).mul(tmp.realAB.upgrades[13].effect2).pow(tmp.realAB.upgrades[13].effect3)
	if(hasMilestone("o","t7")) gain = gain.mul(player.o.treeOfLayers.add(1).root(2)).mul(tmp.pp.effect)
	if(hasMilestone("realAB",5)) gain = gain.mul(player.realAB.milestones.length+1)
	if(hasUpgrade("pp",25)) gain = gain.mul(5)
	if(player.realAB.points.gte(8)) gain = gain.div(60)
	if(player.realAB.points.gte(6)) gain = gain.div(Decimal.pow(2, player.realAB.points))
	if(player.realAB.points.gte(2)) gain = gain.div(player.o.plots.add(1).pow(player.realAB.points.gte(4)?player.realAB.points.gte(5)?player.realAB.points:3:1).pow(player.realAB.points.gte(10)?player.o.plots.add(1):1))
	if(player.realAB.points.gte(3)) gain = gain.pow(gain.gte(1)?player.realAB.points.gte(7)?new Decimal(0.85).sub(player.realAB.points.mul(0.085)).max(0.001):0.85:player.realAB.points.gte(7)?new Decimal(1.15).pow(player.realAB.points.add(1)):1.15)
	if(inChallenge("realAB",11)&&!inChallenge("realAB",14)) gain = gain.div(tmp.realAB.challenges[11].effect2).pow(tmp.realAB.challenges[11].effect.pow(gain.div(tmp.realAB.challenges[11].effect2).lte(1)?-1:1))
	if(inChallenge("realAB",12)&&!inChallenge("realAB",14)) gain = gain.div(tmp.realAB.challenges[12].effect2).pow(tmp.realAB.challenges[12].effect.pow(gain.div(tmp.realAB.challenges[12].effect2).lte(1)?-1:1))
	if(inChallenge("realAB",13)&&!inChallenge("realAB",14)) gain = gain.div(tmp.realAB.challenges[13].effect2).pow(tmp.realAB.challenges[13].effect.pow(gain.div(tmp.realAB.challenges[13].effect2).lte(1)?-1:1))
	if(inChallenge("realAB",14)) gain = gain.div(tmp.realAB.challenges[14].effect2).pow(tmp.realAB.challenges[14].effect.pow(gain.div(tmp.realAB.challenges[14].effect2).lte(1)?-1:1))
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
	return(player.o.unlocked5?1:3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
