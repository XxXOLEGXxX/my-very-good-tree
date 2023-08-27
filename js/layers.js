function gimmeDimension(id,title,cost,canAfford,buy,unlocked,effect,style,multiplier,amount){return{[id]:{title,cost,canAfford,buy,unlocked,effect,style,multiplier,amount}}}
function gimmeManyDimensions(x){
	let magicLOL = {}
	//let costInitial = ["1e1", "1e2", "1e4", "1e6", "1e9", "1e13", "1e18", "1e24"][i-1]
	//let costScale = ["1e3", "1e4", "1e5", "1e6", "1e8", "1e10", "1e12", "1e15"][i-1]
	let cI = new Decimal(10)
	let cSc = new Decimal(1000)
	let cC = [0, 1]	
	let costInitial = []
	let costScale = []
	for(let i=1;i<x+1;i++){
		costInitial.push(cI)
		costScale.push(cSc)
		let theThing = ["st", "nd", "rd", "th"][i==21?0:i-1>=3?3:i-1]
		let trustMeWeNeedThis = ["CM", (i-1)+"CD"][i-1>=1?1:i-1]
		Object.assign(magicLOL, gimmeDimension(i*10+1,
					     function(){return `${i+theThing} Crazy Dimensions: ${formatWhole(player.c.buyables[this.id])}<br>Cost: ${format(this.cost())} Multiplier: ${format(this.multiplier())}x<br>${trustMeWeNeedThis}/s: ${format(this.effect())}`},
					     function(){let letMeScale = new Decimal(player.c.bought[i-1])
									if(inChallenge("c", 22)){
										for(let v=21;v>i;v=v-1){
											letMeScale = letMeScale.add(player.c.bought[v-1])
										}										
									}
									cost = new Decimal(costInitial[i-1]).mul(Decimal.pow(costScale[i-1], letMeScale))
									return cost.pow(cost.gte("1.78e308")?cost.add(1).log("1.78e308"):1)},
						 function(){return (inChallenge("c", 31)&&i>8)||(inChallenge("c", 43)&&i>4)?false:player.c.crazymatters.gte(this.cost())},
						 function(){player.c.crazymatters = player.c.crazymatters.sub(new Decimal(costInitial[i-1]).mul(Decimal.pow(costScale[i-1], player.c.bought[i-1]))).max(0)
									player.c.buyables[this.id] = player.c.buyables[this.id].add(1)
									player.c.bought[i-1] = new Decimal(player.c.bought[i-1]).add(1)
									player.c.bester[i-1] = new Decimal(player.c.best[i-1]).max(new Decimal(player.c.bought[i-1]))},
					  	 function(){return player.subtabs.c.mainTabs=="Normal"?(i>1)?(inChallenge("c", 31)&&i>8)||(inChallenge("c", 43)&&i>4)?false:player.c.buyables[this.id-10].gte(1):true:false},
						 function(){return player.c.buyables[this.id].mul(this.multiplier()).mul(Decimal.pow(20, player.c.buyables[i*10+2])).mul(tmp.c.effectCool).mul(hasUpgrade("c", 11)&&i>=1&&i<=3?upgradeEffect("c", 11):1).mul(hasUpgrade("c", 21)&&i>=4&&i<=6?upgradeEffect("c", 21):1).mul(hasUpgrade("c", 31)&&i>=7&&i<=8?upgradeEffect("c", 31):1).mul(hasUpgrade("c", 41)&&i>=9&&i<=11?upgradeEffect("c", 41):1).mul(hasUpgrade("c", 12)?upgradeEffect("c", 12):1).mul(hasUpgrade("c", 32)?upgradeEffect("c", 32):1).mul(i==1&&hasUpgrade("c", 42)?upgradeEffect("c", 42):1).root(i==1&&inChallenge("c", 41)?2:1).pow(i==1?tmp.c.buyables["compress2"].effect:1).mul(tmp.c.buyables["CB2"].effect).mul(tmp.c.gimmeEpicGamerCombo==1||tmp.c.gimmeEpicGamerCombo==2?5:1)},
						 function(){return{'height':'64px','width':'352px','border-radius':'10%'}},
						 function(){let multiplier = new Decimal(2)
									if(hasUpgrade("c", 22)) multiplier = new Decimal(2.2)
									return Decimal.pow(Decimal.mul(multiplier, Decimal.pow(1.0591341621268264, infiniteChallenges().add(player.c.achievements.length))), Decimal.sub(player.c.bought[i-1], 1)).max(1).root(tmp.c.buyables["compress"].effect)},
						 function(){return player.c.bought[i-1]}
						 ))
		cC[i+1] = cC[i-1]+cC[i]	
		cI = cI.mul(Decimal.pow(10, cC[i+1]))
		cSc = cSc.mul(Decimal.pow(10, Decimal.pow(1.1892, i).floor()))
	}
	return magicLOL
}

function nowGimmeDimensionUpgraders(x){
	let magicLOL = {}
	for(let i=1;i<x+1;i++){
		Object.assign(magicLOL, gimmeDimension(i*10+2,
					     function(){return `Ascension<br><h4>Cost: ${format(player.c.bought[i-1])} / ${formatWhole(this.cost())} bought ${(this.id-2)/10}CDs<br>Current Multiplier: ${format(this.effect())}x<br><h5>(You've ascended this dimension ${formatWhole(player.c.buyables[this.id])} times)`},
					     function(){return new Decimal(10).add(Decimal.mul(inChallenge("c", 43)?5:15, player.c.buyables[this.id]))},
						 function(){return new Decimal(player.c.bought[i-1]).gte(this.cost())},
						 function(){if(!hasMilestone("c",9)){
										for(let v=1;v<x;v++){
											player.c.buyables[v*10+1] = new Decimal(0)
											player.c.bought[v-1] = new Decimal(0)
										}
									player.c.crazymatters = new Decimal(10)
									if(inChallenge("c", 41)) player.c.antimatter = new Decimal(1)
									}
									player.c.buyables[this.id] = player.c.buyables[this.id].add(1)},
					  	 function(){return player.subtabs.c.mainTabs=="Normal"?(i>1)?tmp.c.buyables[i*10+1].unlocked:true:false},
						 function(){let eff = Decimal.pow(inChallenge("c", 43)?4:20, player.c.buyables[this.id]).root(tmp.c.buyables["compress"].effect)
									if(eff.gte(8001)) eff = new Decimal(8001).add(eff.root(3))
									return eff},
						 function(){return{'height':'64px','width':'256px','border-radius':'10%'}},
						 function(){return new Decimal(1)},
						 false
						 ))
	}
	return magicLOL
}

function alrIReallyNeedAutobuyersSoooo(x){
	let magicLOL = {}
	for(let i=1;i<x+1;i++){
		let theThing = ["st", "nd", "rd", "th"][i==21?0:i-1>=3?3:i-1]
		Object.assign(magicLOL, gimmeDimension(i*10+3,
					     function(){return `Autobuy ${i+theThing} Crazy Dimensions<br>${player.c.autobuy[i-1]?"[ON]":"[OFF]"}`},
					     function(){return 1},
						 function(){return true},
						 function(){return player.c.autobuy[i-1] = !player.c.autobuy[i-1]},
					  	 function(){return player.subtabs.c.mainTabs=="Autobuyers"?(player.c.bester[i+(hasMilestone("c","c3")?-1:7)]>=1)?true:false:false},
						 function(){return 1},
						 function(){return{'height':'64px','width':'352px','border-radius':'10%'}},
						 function(){return 1},
						 function(){return 1}
						 ))
	}
	return magicLOL
}

addLayer("pb", {
    name: "primordialboosters", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "PB", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		boosters: new Decimal(0),
		kiloboosters: new Decimal(0),
		megaboosters: new Decimal(0),
		gigaboosters: new Decimal(0),
    }},
	clickables: {
		11: {
			title: "Store",
			display: "Hold to Reset (totally not stolen from Y🆎oi)",
			canClick() {
				return tmp[this.layer].canReset
			},
			onHold() {
				doReset(this.layer)
			},
			style() {return {"border-radius":"0px 33% 33% 0px","border":"4px solid","border-color":"rgba(0, 0, 0, .125)"}}
		}
	},
    color: "#945299",
	baseEffect() {return new Decimal(2)},
	effect() {let b = tmp.b.baseEffect.pow(player.pb.boosters)
			  let kb = tmp.kb.baseEffect.pow(player.pb.kiloboosters)
			  let mb = tmp.mb.baseEffect.pow(player.pb.megaboosters)
			  let gb = tmp.gb.baseEffect.pow(player.pb.gigaboosters)
			  return b.mul(kb).mul(mb).mul(gb)
			  },
	effectDescription() {return "multiplying point gain by x"+format(this.effect())},
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "primordial boosters", // Name of prestige currency
    baseResource: "giga prestige points", // Name of resource prestige is based on
    baseAmount() {return player.gp.points}, // Get the current amount of baseResource
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	getResetGain(){return player.b.points.add(player.kb.points).add(player.mb.points)},
	canBuyMax(){return true},
	getNextAt(canMax=false){return player.b.points.add(player.kb.points).add(player.mb.points).add(1)},
    prestigeButtonText() {
        return "Reset for +"+formatWhole(tmp[this.layer].resetGain)+" primordial boosters<br><br>You need 10 giga prestige points and at least one booster of any kind to reset"
    },
	canReset(){return player.gp.points.gte(tmp.pb.requires) && (player.b.points.gte(1) || player.kb.points.gte(1) || player.mb.points.gte(1) || player.gb.points.gte(1))},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        return new Decimal(1)
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	update(diff){
		player.pb.points = player.pb.boosters.add(player.pb.kiloboosters).add(player.pb.megaboosters)
		if(new Decimal(options.ngplus).gte(4)&&hasAchievement("a", 24)){
			if(player.b.points.gte(1)){
				player.b.points=player.b.points.sub(1)
				player.pb.boosters=player.pb.boosters.add(1)
			}
			if(player.kb.points.gte(1)){
				player.kb.points=player.kb.points.sub(1)
				player.pb.kiloboosters=player.pb.kiloboosters.add(1)
			}
			if(player.mb.points.gte(1)){
				player.mb.points=player.mb.points.sub(1)
				player.pb.megaboosters=player.pb.megaboosters.add(1)
			}
		}
	},
	tabFormat: ["main-display", ["row", ["prestige-button", ["clickable", 11]]], "resource-display", ["display-text", function() {return 'You have stored '+formatWhole(player.pb.boosters)+' boosters, boosting your point gain by x'+format(Decimal.pow(tmp.b.baseEffect, player.pb.boosters))+'<br>'+(hasAchievement("a", 31)?'You have stored '+formatWhole(player.pb.kiloboosters)+' kilo boosters, boosting your point gain by x'+format(Decimal.pow(tmp.kb.baseEffect, player.pb.kiloboosters))+'<br>':'')+(hasAchievement("a", 42)?'You have stored '+formatWhole(player.pb.megaboosters)+' mega boosters, boosting your point gain by x'+format(Decimal.pow(tmp.mb.baseEffect, player.pb.megaboosters))+'<br>':'')+'<br>'}], "buyables", ["display-text", function() {return '<br>"What da hell are Primordial Boosters?"<br><br><span style="color: '+(player.ab.points.gte(4)?'darkred':'red')+'; font-size: 1em; text-shadow: '+(player.ab.points.gte(4)?"purple":"red")+' '+(player.ab.points.gte(4)?player.a.X2:player.a.X)+'px '+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+'px '+(player.ab.points.gte(4)?player.a.S2:player.a.S)+'px;">Primordial Boosters are boosters that are preserved throughout all resets. (excluding mine, obviously)<br>There is just one BUT - Boosters do not get cheaper, so you better grind things up before deciding to throw all of your progress out of the window for nothing.</span><br><br>In other words: Resetting will keep your boosters throughout the entire NG-X mode and you can store multiple of them at once.'}]],
    row: 7, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "B", unlocked() {return hasAchievement("a", 24)}, description: "Shift+B: Reset for primordial boosters", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasAchievement("a", 24)},
	branches: [["b",3],["kb",3],["mb",3],["gb",3]],
	onPrestige(gain){
		player.pb.boosters = player.pb.boosters.add(player.b.points)
		player.pb.kiloboosters = player.pb.kiloboosters.add(player.kb.points)
		player.pb.megaboosters = player.pb.megaboosters.add(player.mb.points)
	},
	buyables: {
		11: {
			title: "Respec stored boosters",
			display() { return "<h3>No resetting this time<br><br>- yours truly, paralysis demon <3</h3><br>(i still hate your guts)" },
			canAfford() { return player.pb.points.gte(1) },
			buy() {
				player.pb.boosters = new Decimal(0)
				player.pb.kiloboosters = new Decimal(0)
				player.pb.megaboosters = new Decimal(0)
			},
			style(){return{'height':'125px', 'width':'200px'}},
			unlocked(){return hasAchievement("a", 54)}
		},
	},
})

addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		wait: new Decimal(0),
    }},
	canReset(){return !getResetGain("p").eq(0)},
	clickables: {
		11: {
			title: "Prestige",
			display: "Hold to Reset (totally not stolen from Y🆎oi)",
			canClick() {
				return tmp[this.layer].canReset
			},
			onHold() {
				doReset(this.layer)
			},
			style() {return {"border-radius":"0px 33% 33% 0px","border":"4px solid","border-color":"rgba(0, 0, 0, .125)"}}
		}
	},
	tabFormat: ["main-display",["row", ["prestige-button", ["clickable", 11]]],"resource-display","upgrades"],
	update(diff){
		player.p.wait = player.p.wait.sub(diff)
		if(player.ab.shopPoints.lt(0)&&player.ab.warnings.eq(0)&&player.p.wait.lt(0)){
			player.ab.buyables[11] = new Decimal(0)
			player.ab.buyables[12] = new Decimal(0)
			player.ab.buyables[13] = new Decimal(0)
			player.ab.buyables[14] = new Decimal(0)
			player.ab.spentPoints = new Decimal(0)
			player.ab.warnings = player.ab.warnings.add(1)
			player["tree-tab"].secretDoNotSteal = player.ab.warnings
			player.p.wait = new Decimal(2)
			confirm("Oopsie! Looks like you just got JINX'd by infamous TMT bug #563.\n\ndw we won't reset your entire progress this time, just be careful when you're buying buyables")
		}
		if(player.ab.shopPoints.lt(0)&&player.ab.warnings.eq(1)&&player.p.wait.lt(0)){
			player.ab.buyables[11] = new Decimal(0)
			player.ab.buyables[12] = new Decimal(0)
			player.ab.buyables[13] = new Decimal(0)
			player.ab.buyables[14] = new Decimal(0)
			player.ab.spentPoints = new Decimal(0)
			player.ab.warnings = player.ab.warnings.add(1)
			player["tree-tab"].secretDoNotSteal = player.ab.warnings
			player.p.wait = new Decimal(2)
			confirm("Heeeeey buddy\nMy chump friend amigo pal\nyou are kinda wasting your get out of jail cards, y'now\n\ni hope whatever you did wasn't intentional and you just slipped haha funni Xd\nyou better not try me")
		}
		if(player.ab.shopPoints.lt(0)&&player.ab.warnings.eq(2)&&player.p.wait.lt(0)){
			player.ab.buyables[11] = new Decimal(0)
			player.ab.buyables[12] = new Decimal(0)
			player.ab.buyables[13] = new Decimal(0)
			player.ab.buyables[14] = new Decimal(0)
			player.ab.spentPoints = new Decimal(0)
			player.ab.warnings = player.ab.warnings.add(1)
			player["tree-tab"].secretDoNotSteal = player.ab.warnings
			player.p.wait = new Decimal(2)
			confirm("alr bud\n\nyou think you're funny\nall powerful\njust because you know how to press monke buttons\n\nlisten bud\n\nyou better stop trying to buy shit for free before i set your ass back to square one you dumb idiot stu")
		}
		if(player.ab.shopPoints.lt(0)&&player.ab.warnings.eq(3)&&player.p.wait.lt(0)){
			player.ab.warnings = player.ab.warnings.add(1)
			player["tree-tab"].secretDoNotSteal = player.ab.warnings
			player.p.wait = new Decimal(2)
		}
		if(hasMilestone("ab", 3)) {
			player.ab.milestones.splice([player.ab.milestones.length-1], 1)
			player.ab.warnings=new Decimal(3)
			player["tree-tab"].secretDoNotSteal = player.ab.warnings
			respecBuyables("ab")
			doReset("ab", true)
		}
		if(options.theme=="adapt"){
			if(player.tab=='none'||player.tab=='info-tab'||player.tab=='changelog-tab'||player.tab=='options-tab') document.body.style.setProperty('--background', "#0f0f0f")
			else{
				let r = Math.max(Math.floor(hexToRgb(tmp[player.tab].color).r/4),15)
				let g = Math.max(Math.floor(hexToRgb(tmp[player.tab].color).g/4),15)
				let b = Math.max(Math.floor(hexToRgb(tmp[player.tab].color).b/4),15)
				document.body.style.setProperty('--background', rgbToHex(r, g, b))
			}
		}
	},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource(){return player.ab.points.gte(5)?"???":"points"}, // Name of resource prestige is based on
    baseAmount() {return player.ab.points.gte(5)?player.gp.points:player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1).add(upgradeRow("p", "1", true)).add(upgradeRows("kp", 1, true, 2)).add(upgradeRows("mp", 1, true, 3)).add(upgradeRows("gp", 1, true, 4))
		if(player.ab.points.gte(3)) mult = mult.times(0.75)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	branches: [["c",2], ["o",2]],
    layerShown(){return true},
	upgrades: {
		11: {
			title(){return options.translateThis?"Prestige+":""},
			description(){return options.translateThis?"Increases point and prestige point gain by 1":"Blah"}, 
			cost(){let cost = new Decimal(1)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.p.upgrades.length))
				   return cost
			}
		},
		12: {
			title(){return options.translateThis?"Prestige+":""},
			description(){return options.translateThis?"Increases point and prestige point gain by 1":"Blah"}, 
			cost(){let cost = new Decimal(1)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.p.upgrades.length))
				   return cost
			}
		},
		13: {
			title(){return options.translateThis?"Prestige+":""},
			description(){return options.translateThis?"Increases point and prestige point gain by 1":"Blah"}, 
			cost(){let cost = new Decimal(1)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.p.upgrades.length))
				   return cost
			}
		},
		14: {
			title(){return options.translateThis?"Prestige+":""},
			description(){return options.translateThis?"Increases point and prestige point gain by 1":"Blah"}, 
			cost(){let cost = new Decimal(1)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.p.upgrades.length))
				   return cost
			},
			unlocked(){return new Decimal(options.ngplus).gte(1)}
		},
	},
	doReset(resettingLayer){
		if(tmp[resettingLayer].row >= 4) {
			player.p.points = new Decimal(0)
			player.p.upgrades = []
		}
		if(player.ab.points>=2) player.ab.negativePoints = new Decimal(10)
		if(player.ab.points>=5) player.ab.negativePoints = new Decimal(0)
		if(player.ab.points>=5) modInfo.initialStartPoints = new Decimal(17.77)
	}
})

addLayer("kp", {
    name: "kiloprestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "KP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
	canReset(){return !getResetGain("kp").eq(0)},
	clickables: {
		11: {
			title: "Kilo Prestige",
			display: "Hold to Reset (totally not stolen from Y🆎oi)",
			canClick() {
				return tmp[this.layer].canReset
			},
			onHold() {
				doReset(this.layer)
			},
			style() {return {"border-radius":"0px 33% 33% 0px","border":"4px solid","border-color":"rgba(0, 0, 0, .125)"}}
		}
	},
	tabFormat: ["main-display",["row", ["prestige-button", ["clickable", 11]]],"resource-display","upgrades"],
    color: "#38BD2E",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "kilo prestige points", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1).add(upgradeRows("kp", 1, true, 2)).add(upgradeRows("mp", 1, true, 3)).add(upgradeRows("gp", 1, true, 4))
		if(player.ab.points.gte(3)) mult = mult.times(0.75)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "k", description: "K: Reset for kilo prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.p.upgrades.length >= 3 || hasAchievement("a", 12)},
	branches: ["p"],
	upgrades: {
		11: {
			title(){return options.translateThis?"Kilo Prestige+":""},
			description(){return options.translateThis?"Increases point, kilo prestige point and prestige point gain by 1":"Blah"}, 
			cost(){let cost = new Decimal(1)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.kp.upgrades.length))
				   return cost
			}
		},
		12: {
			title(){return options.translateThis?"Kilo Prestige+":""},
			description(){return options.translateThis?"Increases point, kilo prestige point and prestige point gain by 1":"Blah"}, 
			cost(){let cost = new Decimal(1)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.kp.upgrades.length))
				   return cost
			}
		},
		13: {
			title(){return options.translateThis?"Kilo Prestige+":""},
			description(){return options.translateThis?"Increases point, kilo prestige point and prestige point gain by 1":"Blah"}, 
			cost(){let cost = new Decimal(1)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.kp.upgrades.length))
				   return cost
			}
		},
		14: {
			title(){return options.translateThis?"Kilo Prestige+":""},
			description(){return options.translateThis?"Increases point, kilo prestige point and prestige point gain by 1":"Blah"}, 
			cost(){let cost = new Decimal(1)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.kp.upgrades.length))
				   return cost
			},
			unlocked(){return new Decimal(options.ngplus).gte(1)}
		},
		21: {
			title(){return options.translateThis?"Kilo Prestige*":""},
			description(){return options.translateThis?"Increases point, kilo prestige point and prestige point gain by *(+1)":"Blah"}, 
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1024).div(upgradeRow("p", 1, true).add(upgradeRow("kp", 2, true)).add(upgradeRow("mp", 3, true)).add(upgradeRow("gp", 4, true)).add(1)).max(1):new Decimal(1024)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.kp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "prestige points",
			currencyLayer: "p",
		},
		22: {
			title(){return options.translateThis?"Kilo Prestige*":""},
			description(){return options.translateThis?"Increases point, kilo prestige point and prestige point gain by *(+1)":"Blah"},
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1024).div(upgradeRow("p", 1, true).add(upgradeRow("kp", 2, true)).add(upgradeRow("mp", 3, true)).add(upgradeRow("gp", 4, true)).add(1)).max(1):new Decimal(1024)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.kp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "prestige points",
			currencyLayer: "p",
		},
		23: {
			title(){return options.translateThis?"Kilo Prestige*":""},
			description(){return options.translateThis?"Increases point, kilo prestige point and prestige point gain by *(+1)":"Blah"},
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1024).div(upgradeRow("p", 1, true).add(upgradeRow("kp", 2, true)).add(upgradeRow("mp", 3, true)).add(upgradeRow("gp", 4, true)).add(1)).max(1):new Decimal(1024)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.kp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "prestige points",
			currencyLayer: "p",
		},
		24: {
			title(){return options.translateThis?"Kilo Prestige*":""},
			description(){return options.translateThis?"Increases point, kilo prestige point and prestige point gain by *(+1)":"Blah"},
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1024).div(upgradeRow("p", 1, true).add(upgradeRow("kp", 2, true)).add(upgradeRow("mp", 3, true)).add(upgradeRow("gp", 4, true)).add(1)).max(1):new Decimal(1024)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.kp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "prestige points",
			currencyLayer: "p",
			unlocked(){return new Decimal(options.ngplus).gte(1)}
		},
	}
})

addLayer("b", {
    name: "boosters", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
	clickables: {
		11: {
			title: "Boost",
			display: "Hold to Reset (totally not stolen from Y🆎oi)",
			canClick() {
				return tmp[this.layer].canReset
			},
			onHold() {
				doReset(this.layer)
			},
			style() {return {"border-radius":"0px 33% 33% 0px","border":"4px solid","border-color":"rgba(0, 0, 0, .125)"}}
		}
	},
	tabFormat: ["main-display",["row", ["prestige-button", ["clickable", 11]]],"resource-display","upgrades"],
    color: "#2142B3",
	baseEffect() {return new Decimal(2)},
	effect() {return this.baseEffect().pow(player.b.points)},
	effectDescription() {return "multiplying point gain by x"+format(this.effect())},
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "boosters", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "scaling static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	canReset(){return player.p.points.gte(tmp.b.nextAtDisp)},
    prestigeButtonText() {
        return "Reset for +"+formatWhole(tmp[this.layer].resetGain)+" boosters<br><br>Req: "+format(player.p.points)+" / "+format(getNextAt(this.layer, canMax=false, useType = "scaling static"))+" prestige points"
    },
    exponent(){return 2+(player.ab.points.gte(2)?0.4:0)}, // Prestige currency exponent
	base: 0.5,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        return new Decimal(1)
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset for boosters", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasAchievement("a", 22)},
	branches: ["p"],
	doReset(resettingLayer){
		player.b.points=new Decimal(options.ngplus).gte(2)&&tmp[resettingLayer].name!=="antibalancer"&&tmp[resettingLayer].name!=="kiloboosters"&&tmp[resettingLayer].name!=="megaboosters"&&tmp[resettingLayer].name!=="gigaboosters"&&tmp[resettingLayer].name!=="primordialboosters"&&tmp[resettingLayer].name!=="kbg"&&tmp[resettingLayer].name!=="mpkb"&&tmp[resettingLayer].name!=="generate"?player.b.points:tmp[resettingLayer].row>this.row?new Decimal(0):player.b.points
	}
})

addLayer("mp", {
    name: "megaprestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "MP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
	canReset(){return !getResetGain("mp").eq(0)},
	clickables: {
		11: {
			title: "Mega Prestige",
			display: "Hold to Reset (totally not stolen from Y🆎oi)",
			canClick() {
				return tmp[this.layer].canReset
			},
			onHold() {
				doReset(this.layer)
			},
			style() {return {"border-radius":"0px 33% 33% 0px","border":"4px solid","border-color":"rgba(0, 0, 0, .125)"}}
		}
	},
	tabFormat: ["main-display",["row", ["prestige-button", ["clickable", 11]]],"resource-display","upgrades"],
    color: "#259E49",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "mega prestige points", // Name of prestige currency
    baseResource: "kilo prestige points", // Name of resource prestige is based on
    baseAmount() {return player.kp.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1).add(upgradeRows("mp", 1, true, 3)).add(upgradeRows("gp", 1, true, 4))
		if(player.ab.points.gte(3)) mult = mult.times(0.75)
		if(player.ab.points.gte(4)) mult = mult.times(tmp.mpkb.effect)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 5, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for mega prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.kp.upgrades.length >= 3 || hasAchievement("a", 13)},
	branches: ["kp"],
	upgrades: {
		11: {
			title(){return options.translateThis?"Mega Prestige+":""},
			description(){return options.translateThis?"Increases point, mega prestige point and previous prestiges point gain by 1":"Blah"},
			cost(){let cost = new Decimal(1)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.mp.upgrades.length))
				   return cost
			}
		},
		12: {
			title(){return options.translateThis?"Mega Prestige+":""},
			description(){return options.translateThis?"Increases point, mega prestige point and previous prestiges point gain by 1":"Blah"},
			cost(){let cost = new Decimal(1)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.mp.upgrades.length))
				   return cost
			}
		},
		13: {
			title(){return options.translateThis?"Mega Prestige+":""},
			description(){return options.translateThis?"Increases point, mega prestige point and previous prestiges point gain by 1":"Blah"},
			cost(){let cost = new Decimal(1)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.mp.upgrades.length))
				   return cost
			}
		},
		14: {
			title(){return options.translateThis?"Mega Prestige+":""},
			description(){return options.translateThis?"Increases point, mega prestige point and previous prestiges point gain by 1":"Blah"},
			cost(){let cost = new Decimal(1)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.mp.upgrades.length))
				   return cost
			},
			unlocked(){return new Decimal(options.ngplus).gte(1)}
		},
		21: {
			title(){return options.translateThis?"Mega Prestige*":""},
			description(){return options.translateThis?"Increases point, mega prestige point and previous prestiges point gain by *(+1)":"Blah"},
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1024).div(upgradeRow("kp", 1, true).add(upgradeRow("mp", 2, true)).add(upgradeRow("gp", 3, true)).add(1)).max(1):new Decimal(1024)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.mp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "kilo prestige points",
			currencyLayer: "kp",
		},
		22: {
			title(){return options.translateThis?"Mega Prestige*":""},
			description(){return options.translateThis?"Increases point, mega prestige point and previous prestiges point gain by *(+1)":"Blah"},
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1024).div(upgradeRow("kp", 1, true).add(upgradeRow("mp", 2, true)).add(upgradeRow("gp", 3, true)).add(1)).max(1):new Decimal(1024)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.mp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "kilo prestige points",
			currencyLayer: "kp",
		},
		23: {
			title(){return options.translateThis?"Mega Prestige*":""},
			description(){return options.translateThis?"Increases point, mega prestige point and previous prestiges point gain by *(+1)":"Blah"},
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1024).div(upgradeRow("kp", 1, true).add(upgradeRow("mp", 2, true)).add(upgradeRow("gp", 3, true)).add(1)).max(1):new Decimal(1024)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.mp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "kilo prestige points",
			currencyLayer: "kp",
		},
		24: {
			title(){return options.translateThis?"Mega Prestige*":""},
			description(){return options.translateThis?"Increases point, mega prestige point and previous prestiges point gain by *(+1)":"Blah"},
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1024).div(upgradeRow("kp", 1, true).add(upgradeRow("mp", 2, true)).add(upgradeRow("gp", 3, true)).add(1)).max(1):new Decimal(1024)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.mp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "kilo prestige points",
			currencyLayer: "kp",
			unlocked(){return new Decimal(options.ngplus).gte(1)}
		},
		31: {
			title(){return options.translateThis?"Mega Prestige^":""},
			description(){return options.translateThis?"Increases point, mega prestige point and previous prestiges point gain by ^(+1)":"Blah"},
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1048576).div(upgradeRow("p", 1, true).add(upgradeRow("kp", 2, true)).add(upgradeRow("mp", 3, true)).add(upgradeRow("gp", 4, true)).add(1)).max(1):new Decimal(1048576)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.mp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "prestige points",
			currencyLayer: "p",
		},
		32: {
			title(){return options.translateThis?"Mega Prestige^":""},
			description(){return options.translateThis?"Increases point, mega prestige point and previous prestiges point gain by ^(+1)":"Blah"},
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1048576).div(upgradeRow("p", 1, true).add(upgradeRow("kp", 2, true)).add(upgradeRow("mp", 3, true)).add(upgradeRow("gp", 4, true)).add(1)).max(1):new Decimal(1048576)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.mp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "prestige points",
			currencyLayer: "p",
		},
		33: {
			title(){return options.translateThis?"Mega Prestige^":""},
			description(){return options.translateThis?"Increases point, mega prestige point and previous prestiges point gain by ^(+1)":"Blah"},
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1048576).div(upgradeRow("p", 1, true).add(upgradeRow("kp", 2, true)).add(upgradeRow("mp", 3, true)).add(upgradeRow("gp", 4, true)).add(1)).max(1):new Decimal(1048576)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.mp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "prestige points",
			currencyLayer: "p",
		},
		34: {
			title(){return options.translateThis?"Mega Prestige^":""},
			description(){return options.translateThis?"Increases point, mega prestige point and previous prestiges point gain by ^(+1)":"Blah"},
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1048576).div(upgradeRow("p", 1, true).add(upgradeRow("kp", 2, true)).add(upgradeRow("mp", 3, true)).add(upgradeRow("gp", 4, true)).add(1)).max(1):new Decimal(1048576)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.mp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "prestige points",
			currencyLayer: "p",
			unlocked(){return new Decimal(options.ngplus).gte(1)}
		},
	},
	doReset(resettingLayer){
		if((!hasMilestone("mpkb", 0)&&tmp[resettingLayer].row>this.row) || tmp[resettingLayer].row>=7) {
			player.mp.points = new Decimal(0)
			player.mp.upgrades = []
		}
	}
})

addLayer("kb", {
    name: "kiloboosters", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "KB", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
	clickables: {
		11: {
			title: "Kilo Boost",
			display: "Hold to Reset (totally not stolen from Y🆎oi)",
			canClick() {
				return tmp[this.layer].canReset
			},
			onHold() {
				doReset(this.layer)
			},
			style() {return {"border-radius":"0px 33% 33% 0px","border":"4px solid","border-color":"rgba(0, 0, 0, .125)"}}
		}
	},
	tabFormat: ["main-display",["row", ["prestige-button", ["clickable", 11]]],"resource-display","upgrades"],
    color: "#1C398E",
	baseEffect() {let base = new Decimal(2)
				  if(player.ab.points.gte(4)) base = base.add(player.mpkb.points.div(2))
				  return base},
	effect() {let lol = this.baseEffect().pow(player.kb.points)
			  return lol},
	effectDescription() {return "multiplying point gain by x"+format(this.effect())},
    requires(){let base = new Decimal(10)
	           if(player.ab.points.gte(4)) base = base.div(tmp.kbg.effect2)
			   return base}, // Can be a function that takes requirement increases into account
    resource: "kilo boosters", // Name of prestige currency
    baseResource: "kilo prestige points", // Name of resource prestige is based on
    baseAmount() {return player.kp.points}, // Get the current amount of baseResource
    type: "scaling static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	canReset(){return player.kp.points.gte(tmp.kb.nextAtDisp)},
    prestigeButtonText() {
        return "Reset for +"+formatWhole(tmp[this.layer].resetGain)+" kilo boosters<br><br>Req: "+format(player.kp.points)+" / "+format(getNextAt(this.layer, canMax=false, useType = "scaling static"))+" kilo prestige points"
    },
    exponent(){return 2+(player.ab.points.gte(2)?0.4:0)}, // Prestige currency exponent
	base: 0.5,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        return new Decimal(1)
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 5, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "K", description: "Shift+K: Reset for kilo boosters", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasAchievement("a", 31)},
	branches: ["kp"],
	doReset(resettingLayer){
		player.kb.points=new Decimal(options.ngplus).gte(2)&&tmp[resettingLayer].name!=="antibalancer"&&tmp[resettingLayer].name!=="megaboosters"&&tmp[resettingLayer].name!=="gigaboosters"&&tmp[resettingLayer].name!=="primordialboosters"&&tmp[resettingLayer].name!=="kbg"&&tmp[resettingLayer].name!=="mpkb"?player.kb.points:tmp[resettingLayer].row>this.row?new Decimal(0):player.kb.points
	}
})

addLayer("gp", {
    name: "gigaprestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "GP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
	canReset(){return !getResetGain("gp").eq(0)},
	clickables: {
		11: {
			title: "Giga Prestige",
			display: "Hold to Reset (totally not stolen from Y🆎oi)",
			canClick() {
				return tmp[this.layer].canReset
			},
			onHold() {
				doReset(this.layer)
			},
			style() {return {"border-radius":"0px 33% 33% 0px","border":"4px solid","border-color":"rgba(0, 0, 0, .125)"}}
		}
	},
	tabFormat: ["main-display",["row", ["prestige-button", ["clickable", 11]]],"resource-display","upgrades"],
    color: "#137F65",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "giga prestige points", // Name of prestige currency
    baseResource: "mega prestige points", // Name of resource prestige is based on
    baseAmount() {return player.mp.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1).add(upgradeRows("gp", 1, true, 4))
		if(player.dn.points.gte(1) && !player.ab.points.gte(3)) mult = mult.mul(tmp.dn.effect)
		if(player.ab.points.gte(3)) mult = mult.times(0.75)
		if(hasAchievement("a", 16)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 6, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "g", description: "G: Reset for giga prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.mp.upgrades.length >= 3 || hasAchievement("a", 13)},
	branches: ["mp"],
	upgrades: {
		11: {
			title(){return options.translateThis?"Giga Prestige+":""},
			description(){return options.translateThis?"Increases point, giga prestige point and previous prestiges point gain by 1":"Blah"},
			cost(){let cost = new Decimal(1)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.gp.upgrades.length))
				   return cost
			}
		},
		12: {
			title(){return options.translateThis?"Giga Prestige+":""},
			description(){return options.translateThis?"Increases point, giga prestige point and previous prestiges point gain by 1":"Blah"},
			cost(){let cost = new Decimal(1)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.gp.upgrades.length))
				   return cost
			}
		},
		13: {
			title(){return options.translateThis?"Giga Prestige+":""},
			description(){return options.translateThis?"Increases point, giga prestige point and previous prestiges point gain by 1":"Blah"},
			cost(){let cost = new Decimal(1)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.gp.upgrades.length))
				   return cost
			}
		},
		14: {
			title(){return options.translateThis?"Giga Prestige+":""},
			description(){return options.translateThis?"Increases point, giga prestige point and previous prestiges point gain by 1":"Blah"},
			cost(){let cost = new Decimal(1)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.gp.upgrades.length))
				   return cost
			},
			unlocked(){return new Decimal(options.ngplus).gte(1)}
		},
		21: {
			title(){return options.translateThis?"Giga Prestige*":""},
			description(){return options.translateThis?"Increases point, giga prestige point and previous prestiges point gain by *(+1)":"Blah"},
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1024).div(upgradeRow("mp", 1, true).add(upgradeRow("gp", 2, true)).add(1)).max(1):new Decimal(1024)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.gp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "mega prestige points",
			currencyLayer: "mp",
		},
		22: {
			title(){return options.translateThis?"Giga Prestige*":""},
			description(){return options.translateThis?"Increases point, giga prestige point and previous prestiges point gain by *(+1)":"Blah"},
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1024).div(upgradeRow("mp", 1, true).add(upgradeRow("gp", 2, true)).add(1)).max(1):new Decimal(1024)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.gp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "mega prestige points",
			currencyLayer: "mp",
		},
		23: {
			title(){return options.translateThis?"Giga Prestige*":""},
			description(){return options.translateThis?"Increases point, giga prestige point and previous prestiges point gain by *(+1)":"Blah"},
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1024).div(upgradeRow("mp", 1, true).add(upgradeRow("gp", 2, true)).add(1)).max(1):new Decimal(1024)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.gp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "mega prestige points",
			currencyLayer: "mp",
		},
		24: {
			title(){return options.translateThis?"Giga Prestige*":""},
			description(){return options.translateThis?"Increases point, giga prestige point and previous prestiges point gain by *(+1)":"Blah"},
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1024).div(upgradeRow("mp", 1, true).add(upgradeRow("gp", 2, true)).add(1)).max(1):new Decimal(1024)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.gp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "mega prestige points",
			currencyLayer: "mp",
			unlocked(){return new Decimal(options.ngplus).gte(1)}
		},
		31: {
			title(){return options.translateThis?"Giga Prestige^":""},
			description(){return options.translateThis?"Increases point, giga prestige point and previous prestiges point gain by ^(+1)":"Blah"},
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1048576).div(upgradeRow("kp", 1, true).add(upgradeRow("mp", 2, true)).add(upgradeRow("gp", 3, true)).add(1)).max(1):new Decimal(1048576)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.gp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "kilo prestige points",
			currencyLayer: "kp",
		},
		32: {
			title(){return options.translateThis?"Giga Prestige^":""},
			description(){return options.translateThis?"Increases point, giga prestige point and previous prestiges point gain by ^(+1)":"Blah"},
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1048576).div(upgradeRow("kp", 1, true).add(upgradeRow("mp", 2, true)).add(upgradeRow("gp", 3, true)).add(1)).max(1):new Decimal(1048576)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.gp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "kilo prestige points",
			currencyLayer: "kp",
		},
		33: {
			title(){return options.translateThis?"Giga Prestige^":""},
			description(){return options.translateThis?"Increases point, giga prestige point and previous prestiges point gain by ^(+1)":"Blah"},
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1048576).div(upgradeRow("kp", 1, true).add(upgradeRow("mp", 2, true)).add(upgradeRow("gp", 3, true)).add(1)).max(1):new Decimal(1048576)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.gp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "kilo prestige points",
			currencyLayer: "kp",
		},
		34: {
			title(){return options.translateThis?"Giga Prestige^":""},
			description(){return options.translateThis?"Increases point, giga prestige point and previous prestiges point gain by ^(+1)":"Blah"},
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1048576).div(upgradeRow("kp", 1, true).add(upgradeRow("mp", 2, true)).add(upgradeRow("gp", 3, true)).add(1)).max(1):new Decimal(1048576)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.gp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "kilo prestige points",
			currencyLayer: "kp",
			unlocked(){return new Decimal(options.ngplus).gte(1)}
		},
		41: {
			title(){return options.translateThis?"Giga Prestige^^":""},
			description(){return options.translateThis?"Increases point, giga prestige point and previous prestiges point gain by ^^(+0.01)":"Blah"},
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1073741824).div(upgradeRow("p", 1, true).add(upgradeRow("kp", 2, true)).add(upgradeRow("mp", 3, true)).add(upgradeRow("gp", 4, true)).add(1)).max(1):new Decimal(1073741824)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.gp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "prestige points",
			currencyLayer: "p",
		},
		42: {
			title(){return options.translateThis?"Giga Prestige^^":""},
			description(){return options.translateThis?"Increases point, giga prestige point and previous prestiges point gain by ^^(+0.01)":"Blah"},
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1073741824).div(upgradeRow("p", 1, true).add(upgradeRow("kp", 2, true)).add(upgradeRow("mp", 3, true)).add(upgradeRow("gp", 4, true)).add(1)).max(1):new Decimal(1073741824)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.gp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "prestige points",
			currencyLayer: "p",
		},
		43: {
			title(){return options.translateThis?"Giga Prestige^^":""},
			description(){return options.translateThis?"Increases point, giga prestige point and previous prestiges point gain by ^^(+0.01)":"Blah"},
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1073741824).div(upgradeRow("p", 1, true).add(upgradeRow("kp", 2, true)).add(upgradeRow("mp", 3, true)).add(upgradeRow("gp", 4, true)).add(1)).max(1):new Decimal(1073741824)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.gp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "prestige points",
			currencyLayer: "p",
		},
		44: {
			title(){return options.translateThis?"Giga Prestige^^":""},
			description(){return options.translateThis?"Increases point, giga prestige point and previous prestiges point gain by ^^(+0.01)":"Blah"},
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1073741824).div(upgradeRow("p", 1, true).add(upgradeRow("kp", 2, true)).add(upgradeRow("mp", 3, true)).add(upgradeRow("gp", 4, true)).add(1)).max(1):new Decimal(1073741824)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.gp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "prestige points",
			currencyLayer: "p",
			unlocked(){return new Decimal(options.ngplus).gte(1)}
		},
	}
})

addLayer("mb", {
    name: "megaboosters", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "MB", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
	clickables: {
		11: {
			title: "Mega Boost",
			display: "Hold to Reset (totally not stolen from Y🆎oi)",
			canClick() {
				return tmp[this.layer].canReset
			},
			onHold() {
				doReset(this.layer)
			},
			style() {return {"border-radius":"0px 33% 33% 0px","border":"4px solid","border-color":"rgba(0, 0, 0, .125)"}}
		}
	},
	tabFormat: ["main-display",["row", ["prestige-button", ["clickable", 11]]],"resource-display","upgrades"],
    color: "#162F72",
	baseEffect() {return new Decimal(2)},
	effect() {return this.baseEffect().pow(player.mb.points)},
	effectDescription() {return "multiplying point gain by x"+format(this.effect())},
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "mega boosters", // Name of prestige currency
    baseResource: "mega prestige points", // Name of resource prestige is based on
    baseAmount() {return player.mp.points}, // Get the current amount of baseResource
    type: "scaling static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	canReset(){return player.mp.points.gte(tmp.mb.nextAtDisp)},
    prestigeButtonText() {
        return "Reset for +"+formatWhole(tmp[this.layer].resetGain)+" mega boosters<br><br>Req: "+format(player.mp.points)+" / "+format(getNextAt(this.layer, canMax=false, useType = "scaling static"))+" mega prestige points"
    },
    exponent(){return 2+(player.ab.points.gte(2)?0.4:0)}, // Prestige currency exponent
	base: 0.5,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        return new Decimal(1)
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 6, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "M", description: "Shift+M: Reset for mega boosters", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasAchievement("a", 41)},
	branches: ["mp"],
	doReset(resettingLayer){
		player.mb.points=new Decimal(options.ngplus).gte(2)&&tmp[resettingLayer].name!=="antibalancer"&&tmp[resettingLayer].name!=="gigaboosters"&&tmp[resettingLayer].name!=="primordialboosters"?player.mb.points:tmp[resettingLayer].row>this.row?new Decimal(0):player.mb.points
	}
})

addLayer("ab", {
    name: "antibalancer", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "AB", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		negativePoints: new Decimal(0),
		shopPoints: new Decimal(0),
		spentPoints: new Decimal(0),
		help: new Decimal(1),
		nostalgia: false,
		fuckyou: false,
		warnings: new Decimal(0),
    }},
	clickables: {
		11: {
			title: "Suffer",
			display: "Hold to Reset (totally not stolen from Y🆎oi)",
			canClick() {
				return tmp[this.layer].canReset
			},
			onHold() {
				doReset(this.layer)
			},
			style() {return {"border-radius":"0px 33% 33% 0px","border":"4px solid","border-color":"rgba(0, 0, 0, .125)"}}
		}
	},
    color: "#006080",
    requires() {let goal = new Decimal(5).mul(Decimal.pow(10, player.ab.points))
				if(hasAchievement("a", 53)&&player.ab.points.lt(5)) {
					goal = new Decimal("1e85")
					if(player.gp.points.gte("2e85")) goal = player.gp.points.div(2).add("1e75")
					if(player.gp.points.gte("5e85")) goal = new Decimal("2.5e85").div(player.ab.help)
				}
				return goal}, // Can be a function that takes requirement increases into account
    resource: "anti balancers", // Name of prestige currency
    baseResource(){return "giga prestige points"}, // Name of resource prestige is based on
    baseAmount() {return player.gp.points}, // Get the current amount of baseResource
	canReset() {return player.gp.points.gte(this.requires().times(2))},
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	update(diff){
		if(player.ab.negativePoints.gt(0) || (player.points.lte(0)&&player.ab.points.gte(5))) player.ab.negativePoints = player.ab.negativePoints.sub(Decimal.mul(getBypassedPointGen(), diff)).max(0)
		modInfo.name = "Oleg's "+"Very ".repeat(player.ab.points)+"Terrible Idea: The Tree"
		if(inChallenge("o", 22)) modInfo.name = "🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡"
		if(player.gp.points.gte("5e85")) player.ab.help = player.ab.help.mul(Decimal.add(diff, 1)).mul(player.ab.help.root(42))
		if(player.ab.points.gte(3)&&player.points.gte(0)&&!player.ab.points.gte(5)) player.points = player.points.sub(Decimal.mul(player.points, diff).div(20))
		if(player.ab.points.gte(5)&&player.points.gte(0)&&getPointGen().gt(0)) player.points = player.points.sub(Decimal.mul(player.points, diff).div(10))
		player.ab.shopPoints = new Decimal(player.ab.points).add(hasUpgrade("t", 14)?1:0).mul(new Decimal(options.ngplus).gte(5)?2:1).add(new Decimal(options.ngplus).gte(5)?player.a.fame:0).sub(player.ab.spentPoints)
		if(player.ab.points.gte(4)) tmp.ab.color = (new Decimal(Math.random()).gte(0.25))?"#8b0000":"#800080"
	},
	tooltipLocked(){return "Reach 10 giga prestige points to unlock (You have "+formatWhole(player.gp.points)+" giga prestige points)"},
	tabFormat: {
		"MiaN sTUFF": {
			content: ["main-display", ["row", ["prestige-button", ["clickable", 11]]], "blank", ["display-text", function() {return (player.ab.points>=4?"<span style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>":"")+"Current Mode: "+getMode()+"<br><br>"+(player.ab.points.lt(6)?"Next Mode: "+getMode()+"-":"")}], "blank",
					 ["display-text", function() {return (player.ab.points>=5?"<span style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>[NG-----]</span><br><span style='color: darkred; font-size: 1.75em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>-Unlocks Hall of Fame<br>(Check Hall of Fame for more information)</span><br><span style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>-Point Gain is reversed<br>-Prestige layer requirement has been changed<br>-You start over with 17.77 points instead<br>-You lose 5% more points per second<br>-Additional Balancer is nerfed and doesn't work at negative points<br>":"")+(player.ab.points>=4?"<span style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>[NG----]<br>-Balancers nerf each other<br>-NG- is applied twice.<br>-Upgrades scale each other based on bought upgrades in each layer.<br>":"")+(player.ab.points>=3?"[NG---]<br>-No more de noido. Ever. Peroid. I don't want to hear anything related to that yellow bastard coming out of YOUR MOUTH. I'll personally find your IP address and hit you with a fucking skateboard if I ever sense the very CONCEPT of it within your smooth, loose brain, since you think this is so funny to you...<br>-You gain 25% less of all prestige points<br>-You lose 5% of points every second<br>":"")+(player.ab.points>=2?"[NG--]<br>-Every reset brings you back to -10 points<br>-Booster's exponent cost is 20% bigger<br>":"")+(player.ab.points>=1?"[NG-]<br>-Divides point gain by 4":"")}]],
			unlocked(){return hasAchievement("a", 31)}
		},
		"Shop": {
			content: ["main-display", ["display-text", function() {return (player.ab.points>=4?"<span style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>":"")+"You have "+formatWhole(player.ab.shopPoints)+" balancing points to spend."}], "blank", "buyables"],
			unlocked(){return hasAchievement("a", 31)}
		},
		"Hall of Fame": {
			content: [["display-text", function() {return "You have conquered <h3 style='color: "+(player.a.fame.gte(4)?"cyan":"yellow")+"; text-shadow: #7f78c4 0px 0px 10px;'>"+formatWhole(player.a.fame)+"</h3> out of <h3 style='color: "+(player.a.fame.gte(4)?"cyan":"yellow")+"; text-shadow: #7f78c4 0px 0px 10px;'>4</h3> challenges.<br><br>The so-called challenges are achievements that provide you with absurd rewards (and i mean it), making the entire game WAY easier to play through. Not getting them will hinder your progression by a huge margin, so keep that in mind.<br><br><br><h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Don't blame me if you can't get them later on.<br>After all, you never needed them in the first place.<br><br><h3 style='color: darkred; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>You have been warned."}], "blank", "blank", ["layer-proxy", ["a", [["achievements", [101]]]]]],
			unlocked() {return player.ab.points.gte(5)}
		}
	},
	buyables:{
		showRespec() { return player.ab.unlocked },
		respecText() { return "Respec balancing" },
		respec() {
			player.ab.buyables[11] = new Decimal(0)
			player.ab.buyables[12] = new Decimal(0)
			player.ab.buyables[13] = new Decimal(0)
			player.ab.buyables[14] = new Decimal(0)
			player.ab.spentPoints = new Decimal(0)
			if(!hasAchievement("a", 1011)) doReset(this.layer, true)
		},
		11: {
			title: "Additional Balancer",
			cost() { return new Decimal(1).mul(player.ab.buyables[11].mag+1) },
			effect(x) { let eff = new Decimal(player.ab.buyables[11].mag).pow(player.ab.buyables[11].mag).sub(!(player.ab.buyables[11].mag==0)?0:1)
						if(player.ab.points.gte(4)) eff = eff.sub(new Decimal(player.ab.buyables[12]).add(player.ab.buyables[13]).add(player.ab.buyables[14])).max(0)
						if(player.ab.points.gte(5)) eff = new Decimal(player.ab.buyables[11].mag).sub(new Decimal(player.ab.buyables[12]).add(player.ab.buyables[13]).add(player.ab.buyables[14])).max(0)
						if(player.ab.negativePoints.gt(0)&&player.ab.points.gte(5)) eff = new Decimal(0)
						return eff.pow(tmp.t.effectMonth).pow(hasMilestone("m", 5)?1.17:1).pow(inChallenge("o", 22)?-1:1)},
			display() { return "Cost: "+format(this.cost())+" balancing points<br>Amount: "+formatWhole(player.ab.buyables[11])+"<br>Boosts point gain by +"+format(this.effect()) },
			canAfford() { return player[this.layer].shopPoints.gte(this.cost()) },
			buy() {
				player[this.layer].spentPoints = player[this.layer].spentPoints.add(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
		},
		12: {
			title: "Multiplicative Balancer",
			cost() { return new Decimal(1).mul(player.ab.buyables[12].mag+1) },
			effect(x) { let eff = new Decimal(2).pow(player.ab.buyables[12].mag)
						if(player.ab.points.gte(4)) eff = eff.div(new Decimal(player.ab.buyables[11]).add(player.ab.buyables[13]).add(player.ab.buyables[14]).add(1)).max(1)
						return eff.pow(tmp.t.effectMonth).pow(hasMilestone("m", 5)?1.17:1).pow(inChallenge("o", 22)?-1:1)},
			display() { return "Cost: "+format(this.cost())+" balancing points<br>Amount: "+formatWhole(player.ab.buyables[12])+"<br>Boosts point gain by x"+format(this.effect()) },
			canAfford() { return player[this.layer].shopPoints.gte(this.cost()) },
			buy() {
				player[this.layer].spentPoints = player[this.layer].spentPoints.add(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
		},
		13: {
			title: "Exponential Balancer",
			cost() { return new Decimal(1).mul(player.ab.buyables[13].mag+1) },
			effect(x) { let eff = new Decimal(1.1).pow(player.ab.buyables[13].mag)
						if(player.ab.points.gte(4)) eff = eff.root(new Decimal(player.ab.buyables[11]).add(player.ab.buyables[12]).add(player.ab.buyables[14]).add(1)).max(1)
						return eff.pow(tmp.t.effectMonth).pow(hasMilestone("m", 5)?1.17:1).pow(inChallenge("o", 22)?-1:1)},
			display() { return "Cost: "+format(this.cost())+" balancing points<br>Amount: "+formatWhole(player.ab.buyables[13])+"<br>Boosts point gain by ^"+format(this.effect()) },
			canAfford() { return player[this.layer].shopPoints.gte(this.cost()) },
			buy() {
				player[this.layer].spentPoints = player[this.layer].spentPoints.add(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
		},
		14: {
			title: "Tetrational Balancer",
			cost() { return new Decimal(1).mul(player.ab.buyables[14].mag+1) },
			effect(x) { let eff = new Decimal(player.ab.buyables[14].mag)
						if(player.ab.points.gte(4)) eff = eff.max(1).log(new Decimal(player.ab.buyables[11]).add(player.ab.buyables[12]).add(player.ab.buyables[13]).add(2).pow(2))
						return eff.div(100).add(1).pow(tmp.t.effectMonth).pow(hasMilestone("m", 5)?1.17:1).pow(inChallenge("o", 22)?-1:1)},
			display() { return "Cost: "+format(this.cost())+" balancing points<br>Amount: "+formatWhole(player.ab.buyables[14])+"<br>Boosts point gain by ^^"+format(this.effect()) },
			canAfford() { return player[this.layer].shopPoints.gte(this.cost()) },
			buy() {
				player[this.layer].spentPoints = player[this.layer].spentPoints.add(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
		},	
	},
	branches: ["gp"],
    row: 8, // Row the layer is in on the tree (0 is the first row)        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    layerShown(){return player.gp.upgrades.length >= 3 || hasAchievement("a", 14)},
	milestones: {
		0: {
			requirementDescription: "Did you just beat NG-- without De Noido...?<h5>(you get NG-- achievements you missed)",
			effectDescription: "",
			done() { return !options.assholeMode&&player.ab.points.gte(3) && (!hasAchievement("a", 34) || !hasAchievement("a", 35)) },
			onComplete() { if(!hasAchievement("a", 34)) {player.a.achievements.push('34')
							                             player.a.normalAchievements=player.a.normalAchievements.add(1)}
						   if(!hasAchievement("a", 35)) {player.a.achievements.push('35')
							                             player.a.normalAchievements=player.a.normalAchievements.add(1)}
			}
		},
		1: {
			requirementDescription: "<h1>*CRASH*",
			effectDescription: "",
			done() { return tmp.ab.requires.lt(1) }
		},
		2: {
			requirementDescription: "Really? We're doing this again?<h5>(you get NG---- achievements you missed)",
			effectDescription: "",
			done() { return !options.assholeMode&&player.ab.points.gte(5) && (!hasAchievement("a", 54) || !hasAchievement("a", 55) || !hasAchievement("a", 16) || !hasAchievement("a", 26) || !hasAchievement("a", 36) || !hasAchievement("a", 46) || !hasAchievement("a", 56)) },
			onComplete() { if(!hasAchievement("a", 54)) {player.a.achievements.push('54')
							                             player.a.normalAchievements=player.a.normalAchievements.add(1)}
						   if(!hasAchievement("a", 55)) {player.a.achievements.push('55')
							                             player.a.normalAchievements=player.a.normalAchievements.add(1)}
						   if(!hasAchievement("a", 16)) {player.a.achievements.push('16')
							                             player.a.normalAchievements=player.a.normalAchievements.add(1)}
						   if(!hasAchievement("a", 26)) {player.a.achievements.push('26')
							                             player.a.normalAchievements=player.a.normalAchievements.add(1)}
						   if(!hasAchievement("a", 36)) {player.a.achievements.push('36')
							                             player.a.normalAchievements=player.a.normalAchievements.add(1)}
						   if(!hasAchievement("a", 46)) {player.a.achievements.push('46')
							                             player.a.normalAchievements=player.a.normalAchievements.add(1)}
						   if(!hasAchievement("a", 56)) {player.a.achievements.push('56')
							                             player.a.normalAchievements=player.a.normalAchievements.add(1)}
			}
		},
		3: {
			requirementDescription: "<h1>nuh uh",
			effectDescription: "",
			done() { return player.ab.warnings.gte(4) },
		},
		4: {
			requirementDescription: "<h4>*Snaps maxTickLength()*</h5><h5 style='font-size: 10px'>(Sorry, but I had to fuck it up to prevent NaN)",
			effectDescription: "",
			done() { return hasUpgrade("o", 41) },
		},
	},
})

addLayer("gb", {
    name: "gigaboosters", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "GB", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
	clickables: {
		11: {
			title: "Giga Boost",
			display: "Hold to Reset (totally not stolen from Y🆎oi)",
			canClick() {
				return tmp[this.layer].canReset
			},
			onHold() {
				doReset(this.layer)
			},
			style() {return {"border-radius":"0px 33% 33% 0px","border":"4px solid","border-color":"rgba(0, 0, 0, .125)"}}
		}
	},
	tabFormat: ["main-display",["row", ["prestige-button", ["clickable", 11]]],"resource-display","upgrades"],
    color: "#12275B",
	baseEffect() {return new Decimal(2)},
	effect() {return this.baseEffect().pow(player.gb.points)},
	effectDescription() {return "multiplying point gain by x"+format(this.effect())},
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "giga boosters", // Name of prestige currency
    baseResource: "giga prestige points", // Name of resource prestige is based on
    baseAmount() {return player.gp.points}, // Get the current amount of baseResource
    type: "scaling static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	canReset(){return player.gp.points.gte(tmp.gb.nextAtDisp)},
    prestigeButtonText() {
        return "Reset for +"+formatWhole(tmp[this.layer].resetGain)+" giga boosters<br><br>Req: "+format(player.gp.points)+" / "+format(getNextAt(this.layer, canMax=false, useType = "scaling static"))+" giga prestige points"
    },
    exponent(){return 2+(player.ab.points.gte(2)?0.4:0)}, // Prestige currency exponent
	base: 0.5,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        return new Decimal(1)
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 7, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "G", description: "Shift+G: Reset for giga boosters", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasAchievement("a", 45)},
	branches: ["gp"],
	resetsNothing(){return hasAchievement("a", 26)}
})

addLayer("dn", {
    name: "denoido", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "DN", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		skateboards: new Decimal(0),
		pogos: new Decimal(0),
		bombs: new Decimal(0),
		minidenoidos: new Decimal(0),
		fakedenoidos: new Decimal(0),
    }},
	clickables: {
		11: {
			title: "de noido",
			display: "Hold to Reset (totally not stolen from Y🆎oi)",
			canClick() {
				return tmp[this.layer].canReset&&!player.dn.points.gte(1)
			},
			onHold() {
				doReset(this.layer)
			},
			style() {return {"border-radius":"0px 33% 33% 0px","border":"4px solid","border-color":"rgba(0, 0, 0, .125)",'opacity': +(player.dn.points.gte(1)?0:100)+''}}
		}
	},
    color: "#FFFF00",
	effect() {return new Decimal(player.dn.points.layer).add(1).root(5)},
	effectDescription() {return "wait what the fuck is this<span style='font-family: Comic Sans MS;'>50.00<span/>"},
    requires: new Decimal(200), // Can be a function that takes requirement increases into account
    resource: "de noido", // Name of prestige currency
    baseResource: "giga prestige points", // Name of resource prestige is based on
    baseAmount() {return player.gp.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	exponent: 0.00001,
	base: 5466345,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        return new Decimal(1)
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	tabFormat: ["main-display", ["row", ["prestige-button", ["clickable", 11]]], "resource-display", ["display-text", function() {return '<span style="color: '+(player.ab.points.gte(4)?'darkred':'red')+'; font-size: 1em; text-shadow: '+(player.ab.points.gte(4)?'purple':'red')+' '+(player.ab.points.gte(4)?player.a.X2:player.a.X)+'px '+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+'px '+(player.ab.points.gte(4)?player.a.S2:player.a.S)+'px;">i have no idea how did that happen, i swear'}],
			   ["display-text", function() {return player.dn.points.gte(1)?"<span style='font-family: Comic Sans MS;'>D e   N o i d o<br>You got "+format(player.dn.points)+" de noido, generating "+format(denoido().skateboardGain)+" skateboards per second.<br>You got "+format(player.dn.skateboards)+" skateboards, generating "+format(denoido().pogoGain)+" pogos per second.<br>You got "+format(player.dn.pogos)+" pogos, generating "+format(denoido().bombGain)+" bombs per second"+(hasUpgrade("dn", 11)?" and "+format(denoido().denoidoGain)+" de noidos per second":"")+".<br>You got "+format(player.dn.bombs)+" bombs, generating "+format(denoido().minidenoidoGain)+" mini de noidos per second.<br>You got "+format(player.dn.minidenoidos)+" mini de noidos, generating "+format(denoido().fakedenoidoGain)+" fake de noidos per second.<br>You got "+format(player.dn.fakedenoidos)+" fake de noidos, boosting giga prestige point gain by x"+format(tmp.dn.effect)+".<span/>":""}], "upgrades"],
    row: 7, // Row the layer is in on the tree (0 is the first row)
	update(diff){
		if(player.dn.points.gte(1) && !player.ab.points.gte(3)){
			player.dn.skateboards = player.dn.skateboards.add(denoido().skateboardGain.times(diff))
			player.dn.pogos = player.dn.pogos.add(denoido().pogoGain.times(diff))
			if(hasUpgrade("dn", 11)) 	player.dn.points = player.dn.points.add(denoido().denoidoGain.times(diff))
			player.dn.bombs = player.dn.bombs.add(denoido().bombGain.times(diff))
			player.dn.minidenoidos = player.dn.minidenoidos.add(denoido().minidenoidoGain.times(diff))
			player.dn.fakedenoidos = player.dn.fakedenoidos.add(denoido().fakedenoidoGain.times(diff))
		}
	},
    layerShown(){return hasAchievement("a", 33) && !player.ab.points.gte(3)},
	branches: ["gp"],
	componentStyles: {
		"prestige-button"() { return {'opacity': +(player.dn.points.gte(1)?0:100)+''} }
	},
	upgrades: {
		11: {
			title: "Pogo Transformation",
			description: "Pogos can generate De Noidos now",
			cost: new Decimal(3),
			currencyInternalName: "pogos",
			currencyDisplayName: "pogos",
			currencyLayer: "dn",
			unlocked(){return hasAchievement("a", 34)}
		}
	}
})

addLayer("g", {
    name: "generate", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "g", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		power: new Decimal(0),
		timer: new Decimal(0),
    }},
	clickables: {
		11: {
			title: "Generate",
			display: "Hold to Reset (totally not stolen from Y🆎oi)",
			canClick() {
				return tmp[this.layer].canReset
			},
			onHold() {
				doReset(this.layer)
			},
			style() {return {"border-radius":"0px 33% 33% 0px","border":"4px solid","border-color":"rgba(0, 0, 0, .125)"}}
		}
	},
	tabFormat: ["main-display",["row", ["prestige-button", ["clickable", 11]]],"resource-display","upgrades"],
    color: "#21B342",
    requires(){let kpreal = new Decimal(20).mul(Decimal.pow(4, player.g.points)).pow(Decimal.pow(1.1, player.g.points))
			   let breal = new Decimal(1).add(player.g.points).root(1.584962).add(1).pow(Decimal.pow(1.01, player.g.points)).floor()
				return {
					kp: kpreal,
					b: breal
				}
	},
    resource: "generators", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.kp.points}, // Get the current amount of baseResource
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	getResetGain(){return new Decimal(1)},
	getNextAt(canMax=true){return "help me"},
	effectBase(){let base = new Decimal(3)
				 return base},
	effect(){let eff = Decimal.pow(tmp.g.effectBase, player.g.points.sub(1)).max(0);
		     if(player.g.points.eq(0)) eff = new Decimal(0)
			 return eff},
	update(diff){
		if(tmp.o.buyables[11].canAfford&&hasMilestone("o","t5")&&hasUpgrade("o",43)){
			player.o.vibeCheck = player.o.vibeCheck.add(1)
			player.o.onions = player.o.onions.add(1)
		}
		player.g.power = player.g.power.add(tmp.g.effect.mul(diff).mul(tmp.kbg.effect))
		if(hasAchievement("a", 46)){
			player.g.timer = player.g.timer.add(diff)
			if(player.g.timer.gte(1)) {
				player.g.timer = new Decimal(0)
				if(canReset("g")) player.g.points = player.g.points.add(1)
				if(tmp.o.buyables[11].canAfford&&hasMilestone("o","t5")&&!hasUpgrade("o",43)){
					player.o.vibeCheck = player.o.vibeCheck.add(1)
					player.o.onions = player.o.onions.add(1)
				}
			}
		}
	},
	effectPower(){let eff = Decimal.pow(player.g.power.root(3), player.g.power.root(3)).log(7).add(1)
				  return eff},
	canBuyMax() {return hasAchievement("a", 46)},
	effectDescription(){return `which generate ${format(tmp.g.effect)} Degenerative Power per second.<br>${format(player.g.power)} Degenerative Power boost point gain by x${format(tmp.g.effectPower)} before NG-X nerfs.`},
    prestigeButtonText() {
        return "Reset for +"+(player.b.points.gte(tmp.g.requires.b) && player.kp.points.gte(tmp.g.requires.kp)?1:0)+" generator<br><br>Req: "+format(player.kp.points)+" / "+format(tmp.g.requires.kp)+" kilo prestige points<br>"+format(player.b.points.add(new Decimal(options.ngplus).gte(4)?player.pb.boosters:0))+" / "+format(tmp.g.requires.b)+" boosters"
    },
	canReset(){return player.b.points.add(new Decimal(options.ngplus).gte(4)?player.pb.boosters:0).gte(tmp.g.requires.b) && player.kp.points.gte(tmp.g.requires.kp)},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 5,
	branches: ["b",["kp",2]],
    layerShown(){return hasAchievement("a", 45)},
	doReset(resettingLayer){
		if((!hasMilestone("kbg", 0)&&tmp[resettingLayer].row>this.row) || tmp[resettingLayer].row>=7) {
			player.g.points = new Decimal(0)
			player.g.power = new Decimal(0)
		}
	},
	hotkeys: [
        {key: "ctrl+g", unlocked() {return player.ab.points.gte(4)}, description: "Ctrl+G: Reset for generators", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
})

addLayer("kbg", {
    name: "kbg", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "U", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		power: new Decimal(0),
		random: new Decimal(0),
		random2: new Decimal(0),
    }},
	clickables: {
		11: {
			title: "#KHPOAWKEH",
			display: "Hold to Reset (totally not stolen from Y🆎oi)",
			canClick() {
				return tmp[this.layer].canReset
			},
			onHold() {
				doReset(this.layer)
			},
			style() {return {"border-radius":"0%","border":"0px"}}
		}
	},
	tabFormat: ["main-display",["row", ["prestige-button", ["clickable", 11]]],"resource-display","milestones"],
    color: "#7F7F7F",
    requires(){return new Decimal(120).mul(Decimal.pow(3, player.kbg.points))},
    resource: "Uлs1A8I1I1Y", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return tmp.g.effectPower.mul(player.kb.points.add(new Decimal(options.ngplus).gte(4)?player.pb.kiloboosters:0))}, // Get the current amount of baseResource
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	getResetGain(){return new Decimal(1)},
	getNextAt(canMax=false){return tmp.g.effectPower.mul(player.kb.points.add(new Decimal(options.ngplus).gte(4)?player.pb.kiloboosters:0))},
	canBuyMax() {return false},
    prestigeButtonText() {
        return "Reset for +1 Uлs1A8I1I1Y<br><br>Req: "+format(tmp.kbg.getNextAt)+" / "+format(tmp.kbg.requires)+" total product of kilo boosters and degenerative power effect"
    },
	effect(){return Decimal.pow(player.kbg.random, player.kbg.points)},
	effect2(){return player.kbg.random2},
	effectDescription(){return `multiplying degenerative power gain by ${format(this.effect())} and lowering kilo booster's requirement by /${format(this.effect2())}`},
	canReset(){return tmp.g.effectPower.mul(player.kb.points).gte(tmp.kbg.requires)},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	update(diff){
		let string = "UuÚúÜüÙùŬŭUuÛûŪūŨũŰűŮůʉʊŲųʋ↺↻∐∪⊌⊍⊎⊔⨃⨆⨄⨿⩂⩅⩁⩌υὑϋύῡὺῠύὗὕὓ "
		tmp.kbg.symbol = string[new Decimal(Math.random()).mul(54).floor()]
		player.kbg.random = Math.random()*2+1
		player.kbg.random2 = Math.random()*player.kbg.points+1
	},
    row: 6,
	branches: [["kb",2], "g"],
    layerShown(){return hasAchievement("a", 52)},
	milestones: {
		0: {
			requirementDescription: "Uлs1A8I1I1Y Reset",
			effectDescription: "Generator layer no longer resets on this row.",
			done() { return player.kbg.points.gte(1) }
		}
	},
	hotkeys: [
        {key: "u", unlocked() {return hasAchievement("a", 52)}, description: "U: Reset for Uлs1A8I1I1IE5", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	nodeStyle: {'border-radius': '0%', 'border': '0px', 'color': '#000000'},
	componentStyles: {
		"prestige-button"() { return {'border-radius': '0%', 'border': '0px'}},
		"milestone"() { return { 'border-radius': '0%', 'border': '0px'}}
	}
})

addLayer("mpkb", {
    name: "mpkb", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "PB", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: -1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
	clickables: {
		11: {
			title: "@AGQADQWA",
			display: "Hold to Reset (totally not stolen from Y🆎oi)",
			canClick() {
				return tmp[this.layer].canReset
			},
			onHold() {
				doReset(this.layer)
			},
			style() {return {"border-radius":"0px 33% 33% 0px","border":"4px solid","border-color":"rgba(0, 0, 0, .125)"}}
		}
	},
	tabFormat: ["main-display",["row", ["prestige-button", ["clickable", 11]]],"resource-display","milestones"],
    color: "#00FFFF",
    requires(){return new Decimal(1000).mul(Decimal.pow(10, Decimal.pow(player.mpkb.points, player.mpkb.points))).mul(player.mpkb.points.eq(0)?0.1:1)},
    resource: "prestigious boosters", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.kb.points.mul(player.mp.points)}, // Get the current amount of baseResource
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	getResetGain(){return new Decimal(1)},
	getNextAt(canMax=false){return player.kb.points.add(new Decimal(options.ngplus).gte(4)?player.pb.kiloboosters:0).mul(player.mp.points)},
	canBuyMax() {return false},
	baseEffect() {return new Decimal(2)},
	effect() {return this.baseEffect().pow(player.mpkb.points)},
	effectDescription() {return "multiplying mega prestige point gain by x"+format(this.effect())+" and adding to kilo booster's base by +"+format(player.mpkb.points.div(2))},
    prestigeButtonText() {
        return "Reset for +1 prestigious booster<br><br>Req: "+format(tmp.mpkb.getNextAt)+" / "+format(tmp.mpkb.requires)+" total product of kilo boosters and mega prestige points"
    },
	canReset(){return player.kb.points.mul(player.mp.points).gte(tmp.mpkb.requires)},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 6,
	branches: [["mp",2], "kb"],
    layerShown(){return hasAchievement("a", 52)},
	milestones: {
		0: {
			requirementDescription: "Prestigious Booster Reset",
			effectDescription: "Mega Prestige layer no longer resets on this row.",
			done() { return player.mpkb.points.gte(1) }
		}
	},
	hotkeys: [
        {key: "ctrl+b", unlocked() {return hasAchievement("a", 52)}, description: "Ctrl+B: Reset for prestigious boosters", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
})

addLayer("a", {
    name: "achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		X: new Decimal(0),
		Y: new Decimal(0),
		S: new Decimal(0),
		X2: new Decimal(0),
		Y2: new Decimal(0),
		S2: new Decimal(0),
		XG: new Decimal(0),
		bestSet1: false,
		bestSet2: false,
		sine: new Decimal(0),
		vibeCheck: new Decimal(0),
		thirtyTwoS: new Decimal(0),
		thirtyTwoX: new Decimal(0),
		thirtyTwoY: new Decimal(0),
		normalAchievements: new Decimal(0),
		fame: new Decimal(0),
    }},
    color: "#FFFF00",
    row: "side",
	update(diff){
		player.a.unlocked = !options.assholeMode
		player.a.vibeCheck = player.a.sine
		player.a.sine = player.a.sine.add(diff)
		player.a.X = new Decimal(0).add(Math.sin(player.a.sine*1.618)).times(5)
		player.a.X2 = new Decimal(0).add(Math.sin(player.a.sine*1.618*2)).times(5).times(new Decimal(Math.random()).sub(0.5).times(2).ceil())
		player.a.Y = new Decimal(0).add(Math.sin(player.a.sine)).times(3.09)
		player.a.Y2 = new Decimal(0).add(Math.sin(player.a.sine)).times(3.09*2).times(new Decimal(Math.random()).sub(0.5).times(2).ceil())
		player.a.S = new Decimal(0).add(Math.sin(player.a.sine*0.618)).add(2)
		player.a.S2 = new Decimal(0).add(Math.sin(player.a.sine*0.618*2)).add(2).times(new Decimal(Math.random()).sub(0.5).times(2).ceil())
		player.a.thirtyTwoS = new Decimal(Math.random()).times(10)
		player.a.thirtyTwoX = new Decimal(Math.random()).sub(0.5).times(26)
		player.a.thirtyTwoY = new Decimal(Math.random()).sub(0.5).times(24)
		player.a.XG = new Decimal(0).add(Math.sin(player.a.sine*0.2)).times(1000)
	},
    layerShown(){return !options.assholeMode},
	tooltip: "Achievements",
	tabFormat: {
		"Achievements": {
			content: [["display-text", function() {return "You currently have <h3 style='color: yellow; text-shadow: #7f78c4 0px 0px 10px;'>"+formatWhole(player.a.normalAchievements)+"</h3> out of <h3 style='color: yellow; text-shadow: #7f78c4 0px 0px 10px;'>35</h3> achievements." }], "blank", "blank", ["achievements", [1, 2, 3, 4, 5, 6]]],
			unlocked() {return player.ab.points.gte(5)}
		},
		"Hall of Fame": {
			content: [["display-text", function() {return "You have conquered <h3 style='color: "+(player.a.fame.gte(4)?"cyan":"yellow")+"; text-shadow: #7f78c4 0px 0px 10px;'>"+formatWhole(player.a.fame)+"</h3> out of <h3 style='color: "+(player.a.fame.gte(4)?"cyan":"yellow")+"; text-shadow: #7f78c4 0px 0px 10px;'>4</h3> challenges.<br><br>The so-called challenges are achievements that provide you with absurd rewards (and i mean it), making the entire game WAY easier to play through. Not getting them will hinder your progression by a huge margin, so keep that in mind.<br><br><br><h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Don't blame me if you can't get them later on.<br>After all, you never needed them in the first place.<br><br><h3 style='color: darkred; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>You have been warned."}], "blank", "blank", ["achievements", [101]]],
			unlocked() {return player.ab.points.gte(5)}
		},
	},
	achievements: {
		11: {
			name: "Welcome",
			done(){return !options.assholeMode&& player.p.points.gte(1)},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip: "Perform a prestige reset.",
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		12: {
			name: "to",
			done(){return !options.assholeMode&& player.kp.points >=1},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip: "Perform a kilo prestige reset.",
			unlocked(){return hasAchievement("a", 11)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		13: {
			name: "your",
			done(){return !options.assholeMode&& player.mp.points >=1},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip: "Perform a mega prestige reset.",
			unlocked(){return hasAchievement("a", 12)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		14: {
			name: "worst",
			done(){return !options.assholeMode&& player.gp.points >=1},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip: "Perform a giga prestige reset.",
			unlocked(){return hasAchievement("a", 13)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		15: {
			name(){return hasAchievement("a", 15)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:(player.ab.points.gte(4)?player.a.Y2:player.a.Y))+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>nightmare.<h3/>":"AAAUGJRUOGJRO WHAT THE FUCK!!?!? WHAT THE FUCK IS THAT?!"},
			done(){return !options.assholeMode&& player.ab.points >=1},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return hasAchievement("a", 15)?"Perform an... anti balance reset?<br><h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>Reward: There was no reward...<br>... until now.<br>Unlocks Magic Music Box :D<h3/>":"Perform an... anti balance reset?"},
			unlocked(){return hasAchievement("a", 14)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		21: {
			name: "ROW! ROW! FIGHT THE POWER!",
			done(){return !options.assholeMode&& player.p.upgrades.length >=3 && player.ab.points >=1},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip: "Purchase 3 prestige upgrades in NG- mode.",
			unlocked(){return hasAchievement("a", 15)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		22: {
			name(){return hasAchievement("a", 22)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>I pity you.<h3/>":"Kilo-Mega Prestige"},
			done(){return !options.assholeMode&& player.gp.points >=1 && player.ab.points >=1},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return hasAchievement("a", 22)?"Perform a giga prestige reset in NG- mode.<br><h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>Reward: Not all 'Reward' are supposed to be disappointing, after all. Unlocks Booster layer.<h3/>":"Perform a giga prestige reset in NG- mode."},
			unlocked(){return hasAchievement("a", 15)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		23: {
			name: "Game Changer",
			done(){return !options.assholeMode&& upgradeRow("kp", 2, true) >= 1 && player.ab.points >=1},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip: "Purchase 2nd row kilo prestige upgrade in NG- mode.",
			unlocked(){return hasAchievement("a", 15)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		24: {
			name(){return (hasAchievement("a", 25))?(player.gp.points.add(getResetGain("gp"))>=100||hasAchievement("a", 31))?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>OnlY 90 mOrE tO gO lmfAAAAAAAO.<h3/>":(player.gp.points.add(getResetGain("gp"))>=95)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>^-^👍<h3/>":(player.gp.points.add(getResetGain("gp"))>=90)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>._.=≡⊐-<h3/>":(player.gp.points.add(getResetGain("gp"))>=85)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>._.⋗⨿∫≅=≡⊐-<h3/>":(player.gp.points.add(getResetGain("gp"))>=80)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>'-'⋗⨿∫≅=≡⊐-<h3/>":(player.gp.points.add(getResetGain("gp"))>=75)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>* ¬*⨿∫≅=≡⊐-<h3/>":(player.gp.points.add(getResetGain("gp"))>=70)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>* ¬*∫≅=≡⊐-<h3/>":(player.gp.points.add(getResetGain("gp"))>=70)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>ò ¬ó∫≅=≡⊐-<h3/>":(player.gp.points.add(getResetGain("gp"))>=65)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>ò ¬ó≅=≡⊐-<h3/>":(player.gp.points.add(getResetGain("gp"))>=65)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>ò ¬ó=≡⊐-<h3/>":(player.gp.points.add(getResetGain("gp"))>=60)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>ò ¬ó≡⊐-<h3/>":(player.gp.points.add(getResetGain("gp"))>=55)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>ò ¬ó⊐-<h3/>":(player.gp.points.add(getResetGain("gp"))>=50)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>ò¬ó-<h3/>":(player.gp.points.add(getResetGain("gp"))>=45)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>ò¬ó<h3/>":(player.gp.points.add(getResetGain("gp"))>=40)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>>;[<h3/>":(player.gp.points.add(getResetGain("gp"))>=35)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br>>;[<h3/>":(player.gp.points.add(getResetGain("gp"))>=30)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br>>;[<h3/>":(player.gp.points.add(getResetGain("gp"))>=25)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br>>;[<h3/>":hasAchievement("a", 25)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br>>;[<h3/>":hasAchievement("a", 24)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>OnlY 90 mOrE tO gO lmfAAAAAAAO.<h3/>":"Only 90 more to go":hasAchievement("a", 24)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>OnlY 90 mOrE tO gO lmfAAAAAAAO.<h3/>":"Only 90 more to go"},
			done(){return !options.assholeMode&& player.gp.points >= 10 && player.ab.points >=1},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return hasAchievement("a", 24)?"Reach 10 giga prestige points in NG- mode.<br><h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>Reward: I'm sorry, but this is the funniest thing I've ever seen in this week. Unlocks Primordial Boosters<h3/>":"Reach 10 giga prestige points in NG- mode."},
			unlocked(){return hasAchievement("a", 15)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		25: {
			name(){return (hasAchievement("a", 25))?(hasAchievement("a", 33))?"This achievement is -20% cooler than the previous one<br>;]":(player.gp.points.add(getResetGain("gp"))>=100||hasAchievement("a", 31))?"This achievement is -20% cooler than the previous one<br><br><br>;]":(player.gp.points.add(getResetGain("gp"))>=95)?"This achievement is -20% cooler than the previous one<br><br><br>': ]":(player.gp.points.add(getResetGain("gp"))>=90)?"This achievement is -20% cooler than the previous one<br><br><br>': |":(player.gp.points.add(getResetGain("gp"))>=85)?"This achievement is -20% cooler than the previous one<br><br><br>':|":(player.gp.points.add(getResetGain("gp"))>=80)?"This achievement is -20% cooler than the previous<br>':|":(player.gp.points.add(getResetGain("gp"))>=75)?"This achievement is':|0% cooler than the previous one":(player.gp.points.add(getResetGain("gp"))>=70)?"This achievement is 20% cooler than the previous<br>':|":(player.gp.points.add(getResetGain("gp"))>=65)?"This achievement is 20% cooler than the previous one<br><br><br>':|":(player.gp.points.add(getResetGain("gp"))>=60)?"This achievement is 20% cooler than the previous one<br><br><br>': |":(player.gp.points.add(getResetGain("gp"))>=55)?"This achievement is 20% cooler than the previous one<br><br><br>: |":(player.gp.points.add(getResetGain("gp"))>=50)?"This achievement is 20% cooler than the previous one<br><br><br>>: ]":(player.gp.points.add(getResetGain("gp"))>=20||hasAchievement("a", 25))?"This achievement is 20% cooler than the previous one<br><br><br>>:]":(player.gp.points.add(getResetGain("gp"))>=15)?"This achievement is 20% cooler than the previous one >:]":"This achievement is 20% cooler >:]":(player.gp.points.add(getResetGain("gp"))>=20||hasAchievement("a", 25))?"This achievement is 20% cooler than the previous one<br><br><br>>:]":(player.gp.points.add(getResetGain("gp"))>=15)?"This achievement is 20% cooler than the previous one >:]":"This achievement is 20% cooler >:]"},
			done(){return !options.assholeMode&& player.gp.points >=20 && player.ab.points >=1},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip: "Reach 20 giga prestige points in NG- mode<br>Reward: Upgrades are cheaper based on themselves that use the same currency.",
			unlocked(){return hasAchievement("a", 15)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		31: {
			name(){return hasAchievement("a", 31)?"Speaking of cretin...":(player.gp.points.add(getResetGain("gp"))>=100)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>Alright, I'm done with this cretin. >:[<h3/>":""},
			done(){return !options.assholeMode&& player.ab.points >= 2},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return (player.gp.points.add(getResetGain("gp"))>=100||hasAchievement("a", 31))?"Perform an anti balance reset. Again. Reward: Each anti-balance unlocks new booster layer. Also unlocks the shop.":" "},
			unlocked(){return hasAchievement("a", 25)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		32: {
			name(){return hasAchievement("a", 32)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>I knew I shouldn't have nerfed NG-.<h3/>":"So soon already?!"},
			done(){return !options.assholeMode&& player.kb.points >= 1},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return hasAchievement("a", 32)?"Perform a kilo booster reset.<br><h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.thirtyTwoX.add(player.a.X2):player.a.thirtyTwoX)+"px "+(player.ab.points.gte(4)?player.a.thirtyTwoY.add(player.a.Y2):player.a.thirtyTwoY)+"px "+(player.ab.points.gte(4)?player.a.thirtyTwoS.add(player.a.S2):player.a.thirtyTwoS)+"px;'>Reward: OH MY FUCKING GOD OLEG I SWEAR I'M GOING TO KILL YOU IT'S BEEN 6 UPDATES HOW IN THE LITERAL FUCK DID YOU FORGET TO FIX THIS TOOLTIP OH MY FUCKING GOD I'LL BREAK YOUR SHIT AND FORCE ASSHOLE MODE AT EVERY POSSIBLE OPPORTUNITY AND TICK JUST TO PISS YOU OFF YOU UNSOPHISTICATED FILTER USING FUN GATEKEEPING PIECE OF<br><br>lobster<br><h3/>":"Perform a kilo booster reset."},
			unlocked(){return hasAchievement("a", 31)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		33: {
			name(){return hasAchievement("a", 33)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>U mad mobile?<br><br>i didn't really mean that btw<br>。_。<h3/>":"Heaven's Gift"},
			done(){return !options.assholeMode&& player.gp.points >= 200 && player.ab.points.gte(2)},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return hasAchievement("a", 33)?"Reach 200 giga prestige points.<br><h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>Reward: uhhhh de noido<h3/>":"Reach 200 giga prestige points."},
			unlocked(){return hasAchievement("a", 31)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		34: {
			name(){return "<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>This De Noido is pissing me off.<h3/>"},
			done(){return !options.assholeMode&& player.dn.pogos.gte(1)},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return hasAchievement("a", 34)?"Reach 1 pogo.<br><h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+player.a.X+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>Reward: Let me create an upgrade, just for you.<h3/>":"Reach 1 pogo."},
			unlocked(){return hasAchievement("a", 33) ||hasAchievement("a", 34)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		35: {
			name(){return "<h3 style='color: yellow;, font-family: 'Comic Sans MS';'>PARADOXICAL ANAL BULLSHITERY<h3/>"},
			done(){return !options.assholeMode&& player.dn.points.gte(2)},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return "<span style='color: yellow;, font-family: 'Comic Sans MS';'>Reach 2 de noidos.<br>Reward: start running.<span/>"},
			unlocked(){return hasUpgrade("dn", 11)||hasAchievement("a", 35)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'yellow':'#bf8f8f')}}
		},
		41: {
			name: "Never Again",
			done(){return !options.assholeMode&& player.ab.points >=3},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip: "Perform an anti balance reset for the third time.",
			unlocked(){return hasAchievement("a", 35)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		42: {
			name: "Seems Familiar",
			done(){return !options.assholeMode&& player.mb.points >=1},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip: "Perform a mega booster reset.",
			unlocked(){return hasAchievement("a", 41)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		43: {
			name: "Hell Awaits",
			done(){return !options.assholeMode&& upgradeRow("mp", 3, true) >= 1 && player.ab.points >=3},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip: "Purchase 3rd row mega prestige upgrade in NG--- mode.",
			unlocked(){return hasAchievement("a", 41)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		44: {
			name: "Full Set",
			done(){return !options.assholeMode&& player.gp.upgrades.length + player.mp.upgrades.length + player.kp.upgrades.length + player.p.upgrades.length >= 30},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip: "Purchase all 30 upgrades in NG--- mode.",
			unlocked(){return hasAchievement("a", 43)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		45: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>I've let you live long enough.<h3/>"},
			done(){return !options.assholeMode&& player.ab.points.gte(4)},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Perform an anti balance reset for the fourth time."},
			unlocked(){return hasAchievement("a", 44)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		51: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>It was a misinput MISINPUT CALM DOWN YOU CALM THE FUCK DOWN THERE WAS A MISINPUT.<h3/>"},
			done(){return !options.assholeMode&& player.g.points.gte(1) && player.ab.points.gte(4)},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Perform a generator reset...<br><br>Oops."},
			unlocked(){return hasAchievement("a", 45)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'#BF5F5F':'#bf8f8f')}}
		},
		52: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>"+(hasAchievement("a", 52)?"oh no":"This is it.")+"<h3/>"},
			done(){return !options.assholeMode&& player.gp.points.gte(1) && player.ab.points.gte(4)},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>"+(hasAchievement("a", 52)?"oh god no<br><br>no wait the fu-<br><br>I LITERALLY JUST BLINKED HOW DID YOU GET THOSE LAYERS ALREADY?!":"Perform a giga prestige reset. Cutely.")},
			unlocked(){return hasAchievement("a", 45)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'#BF5F5F':'#bf8f8f')}}
		},
		53: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Disastrous Gameplay.<h3/>"},
			done(){return !options.assholeMode&& player.mpkb.points.gte(1) || player.kbg.points.gte(1)},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Perform Prestigious Booster or Unstability reset<br>Reward: Two can play this game."},
			unlocked(){return hasAchievement("a", 52)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'#BF5F5F':'#bf8f8f')}}
		},
		54: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Hehehehehe. That should hold 'em alright.<h3/>"},
			done(){return !options.assholeMode&& player.pb.points.gte(1) && player.ab.points.gte(4)},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Perform a Primordial Booster reset in NG---- mode<br>Unintended Reward: You can reset Primordial Booster's stored boosters"},
			unlocked(){return hasAchievement("a", 52)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'#BF5F5F':'#bf8f8f')}}
		},
		55: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Is it even wortht grinding anymore?<h3/>"},
			done(){return !options.assholeMode&& player.gb.points.gte(2)},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Reach 2 giga boosters"},
			unlocked(){return hasAchievement("a", 52)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'#BF5F5F':'#bf8f8f')}}
		},
		16: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>STOP.<h3/>"},
			done(){return !options.assholeMode&& player.gp.points.gte(100000)},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Reach 100,000 giga prestige points.<br>Reward: Giga Prestige Point gain is doubled."},
			unlocked(){return hasAchievement("a", 55)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'#BF5F5F':'#bf8f8f')}}
		},
		26: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Primordial Rage.<h3/>"},
			done(){return !options.assholeMode&& player.gp.points.gte(1000000)},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Reach 1,000,000 giga prestige points.<br>Reward: Giga Boosters no longer reset anything."},
			unlocked(){return hasAchievement("a", 55)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'#BF5F5F':'#bf8f8f')}}
		},
		36: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>I didn't know it was even possible to go THIS far...<h3/>"},
			done(){return !options.assholeMode&& player.points.gte(Decimal.pow(2, 1024))},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Reach 1.79e308 points.<br>Reward: Get softcapped, stupid idiot dumb."},
			unlocked(){return hasAchievement("a", 55)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'#BF5F5F':'#bf8f8f')}}
		},
		46: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>That's twice the amount required to buy max generators!<h3/>"},
			done(){return !options.assholeMode&& player.g.points.gte(30)},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Reach 30 generators.<br>Reward: You generate 1 generator per second whenever they're available."},
			unlocked(){return hasAchievement("a", 55)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'#BF5F5F':'#bf8f8f')}}
		},
		56: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>"+(player.ab.points.lt(5)&&player.gp.points.gte("5e85")?"oops .-.":player.ab.points.lt(5)&&player.gp.points.gte("2e85")?"THIS ISN'T OVER.":"The game truly begins.")+"<h3/>"},
			done(){return !options.assholeMode&& player.ab.points.gte(5)},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Perform a Anti-Balance reset for the 5th time."},
			unlocked(){return hasAchievement("a", 55)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'#BF5F5F':'#bf8f8f')}}
		},
		61: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>New Beginning.<h3/>"},
			done(){return !options.assholeMode&& player.s.unlocked||player.t.unlocked||player.m.unlocked||player.n.unlocked},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Perform a Row -1 reset."},
			unlocked(){return player.ab.points.gte(5)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'#BF5F5F':'#bf8f8f')}}
		},
		62: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>This is anything but imaginary.<h3/>"},
			done(){return !options.assholeMode&& getBypassedPointGen().lte(-1) && player.ab.negativePoints.gt(1)},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Reach -1 points/sec at negative points."},
			unlocked(){return player.ab.points.gte(5)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'#BF5F5F':'#bf8f8f')}}
		},
		63: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Gee Acamaeda! How Come Your Engine Lets You Eat Two Layers?<h3/>"},
			done(){return !options.assholeMode&& (player.s.unlocked&&player.t.unlocked)||(player.m.unlocked&&player.n.unlocked)},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Unlock 2 Row -1 layers."},
			unlocked(){return player.ab.points.gte(5)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'#BF5F5F':'#bf8f8f')}}
		},
		64: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>We're not talking about this rule.<h3/>"},
			done(){return !options.assholeMode&& player.c.unlocked||player.o.unlocked},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Perform a Row 0 row."},
			unlocked(){return player.ab.points.gte(5)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'#BF5F5F':'#bf8f8f')}}
		},
		65: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Only took like the length of previous 4 NG-X modes.<h3/>"},
			done(){return player.ab.negativePoints.gte("1e348")||player.o.buyables[83].gte(1)},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Reach the middle point of both choices (1e348 negative points or 4th Onion tab's 9th buyable)"},
			unlocked(){return player.ab.points.gte(5)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'#BF5F5F':'#bf8f8f')}}
		},
		1011: {
			name(){return (player.s.unlocked || player.t.unlocked || player.n.unlocked || player.m.unlocked)&&!hasAchievement("a", 1011)?"":hasAchievement("a", 1011)?"L":"PATIENCE"},
			onComplete(){player.a.fame=player.a.fame.add(1)},
			done(){return !options.assholeMode&& player.ab.negativePoints.gte(10) && player.ab.buyables[11].lte(0) && player.ab.buyables[12].lte(0) && player.ab.buyables[13].lte(0) && player.ab.buyables[14].lte(0) && !player.s.unlocked && !player.t.unlocked && !player.n.unlocked && !player.m.unlocked},
			tooltip(){return (player.s.unlocked || player.t.unlocked || player.n.unlocked || player.m.unlocked)&&!hasAchievement("a", 1011)?"[REDACTED]":"Reach -10 points without Balancers or -1 Row layers.<br>Reward: You can respec Balancers without resetting the progress."},
			style(){return {'background': ((player.s.unlocked || player.t.unlocked || player.n.unlocked || player.m.unlocked)&&!hasAchievement("a", 1011)?'#000000':hasAchievement("a",this.id)?'repeating-linear-gradient('+(player.a.fame.gte(4)?'cyan, lightblue, cyan':'#FFDF00, #D4AF37, #FFDF00')+')':'#bf8f8f'), 'background-size': '40% 75%', 'background-position': '50% '+player.a.XG+'%'}}
		},
		1012: {
			name(){return (tmp.c.unlocked || tmp.o.unlocked)&&!hasAchievement("a", 1012)?"":hasAchievement("a", 1012)?"a":"PATIENCE 2: ELECTRIC BOOGALOO"},
			onComplete(){player.a.fame=player.a.fame.add(1)},
			done(){return !options.assholeMode&& (player.t.years.gte(5)||player.m.famed==true)&&(!tmp.c.unlocked&&!tmp.o.unlocked)},
			tooltip(){return (tmp.c.unlocked || tmp.o.unlocked) && hasAchievement("a", 1012)?"[REDACTED]":(player.ab.nostalgia?"Reach 5 years":player.ab.fuckyou?"Purchase mangoes at it's cheapest":"???")+" without Row 0 layers.<br>Reward: I am so proud of you. 4x point gain."},
			style(){return {'background': ((tmp.c.unlocked || tmp.o.unlocked) && hasAchievement("a", 1012)?'#000000':hasAchievement("a",this.id)?'repeating-linear-gradient('+(player.a.fame.gte(4)?'cyan, lightblue, cyan':'#FFDF00, #D4AF37, #FFDF00')+')':'#bf8f8f'), 'background-size': '40% 75%', 'background-position': '50% '+player.a.XG+'%'}}
		},
		1013: {
			name(){return ((player.c.buyables[81].gte(1)&&(player.c.buyables[12].gte(1)||player.c.buyables[22].gte(1)||player.c.buyables[32].gte(1)||player.c.buyables[42].gte(1)||player.c.buyables[52].gte(1)||player.c.buyables[62].gte(1)))||player.o.points.gte(4))&&!hasAchievement("a",this.id)?"":hasAchievement("a", 1013)?"e":"did you just say ez."},
			onComplete(){player.a.fame=player.a.fame.add(1)},
			done(){return !options.assholeMode&& (player.c.buyables[81].gte(1)&&!(player.c.buyables[12].gte(1)||player.c.buyables[22].gte(1)||player.c.buyables[32].gte(1)||player.c.buyables[42].gte(1)||player.c.buyables[52].gte(1)||player.c.buyables[62].gte(1)))||(player.o.points.lt(4)&&player.n.currentday.gte(19)&&player.n.thief==false)},
			tooltip(){return ((player.c.buyables[81].gte(1)&&(player.c.buyables[12].gte(1)||player.c.buyables[22].gte(1)||player.c.buyables[32].gte(1)||player.c.buyables[42].gte(1)||player.c.buyables[52].gte(1)||player.c.buyables[62].gte(1)))||player.o.points.gte(4))&&!hasAchievement("a",this.id)?"[REDACTED]":(player.ab.nostalgia?"Get 8th Crazy Dimension without ever ascending once.":player.ab.fuckyou?"Survive 19 days without ever robbing the bank with 3 layers of life at most.":"???")+"<br>Reward: "+(player.ab.nostalgia?"You gain 100% of space and clocks gain.":player.ab.fuckyou?"You keep your best run and Neverend milestones on reset.":"???")},
			style(){return {'background': (((player.c.buyables[81].gte(1)&&(player.c.buyables[12].gte(1)||player.c.buyables[22].gte(1)||player.c.buyables[32].gte(1)||player.c.buyables[42].gte(1)||player.c.buyables[52].gte(1)||player.c.buyables[62].gte(1)))||player.o.points.gte(4))&&!hasAchievement("a",this.id)?'#000000':hasAchievement("a",this.id)?'repeating-linear-gradient('+(player.a.fame.gte(4)?'cyan, lightblue, cyan':'#FFDF00, #D4AF37, #FFDF00')+')':'#bf8f8f'), 'background-size': '40% 75%', 'background-position': '50% '+player.a.XG+'%'}}
		},
		1014: {
			name(){return (player.c.youStupid==true||player.o.buyables[71].gte(1))&&!hasAchievement("a", 1014)?"":hasAchievement("a", 1014)?"c":"MVGT did nothing wrong."},
			onComplete(){player.a.fame=player.a.fame.add(1)},
			done(){return (!options.assholeMode&&(player.c.upgrades.length>=14&&player.c.youStupid==false))||(player.o.buyables[63].gte(6)&&player.o.buyables[71].eq(0))},
			tooltip(){return (player.c.youStupid==true||player.o.buyables[71].gte(1))&&!hasAchievement("a",this.id)?"[REDACTED]":(player.ab.nostalgia?"Buy 14 Infinite Upgrades without ever utilizing Infinity Automator.":player.ab.fuckyou?"Purchase 6 Sushi-Point Synchronizers without purchasing Extra Level Buyables":"???")+"<br>Reward: "+(player.ab.nostalgia?"Everything that multiplies Infinity Points affects Infinities as well.":player.ab.fuckyou?"You automatically gain Layers of Life without resetting.":"???")},
			style(){return {'background': ((player.c.youStupid==true||player.o.buyables[71].gte(1))&&!hasAchievement("a",1014)?'#000000':hasAchievement("a",this.id)?'repeating-linear-gradient('+(player.a.fame.gte(4)?'cyan, lightblue, cyan':'#FFDF00, #D4AF37, #FFDF00')+')':'#bf8f8f'), 'background-size': '40% 75%', 'background-position': '50% '+player.a.XG+'%'}}
		},
	},
})

addLayer("sdumsl", {
    name: "yougettheidea", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 69, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		didYouFindIt: false,
		fiveNG: false,
		superEpicEntrance: new Decimal(0),
    }},
	symbol: "?",
    color: "darkcyan",
    row: "side",
	update(diff){
		if(player.ab.points.gte(5)&&player.sdumsl.fiveNG==false) player.sdumsl.fiveNG=true
		player.sdumsl.superEpicEntrance = player.tab=="sdumsl"?player.sdumsl.superEpicEntrance.add(diff):new Decimal(0)
		if(player.tab=="sdumsl"){
			if(Decimal.add(80, Decimal.root(1000, player.sdumsl.superEpicEntrance.pow(2))).gte(81)) tmp.sdumsl.tabFormat[0][1] = ["0px", Decimal.add(80, Decimal.root(1000, player.sdumsl.superEpicEntrance.pow(2)))+"px"]
			if(Decimal.add(32, Decimal.root(100000, player.sdumsl.superEpicEntrance.pow(2))).gte(33))tmp.sdumsl.tabFormat[4][1] = ["0px", Decimal.add(32, Decimal.root(100000, player.sdumsl.superEpicEntrance.pow(2)))+"px"]
			if(Decimal.add(0, Decimal.root(100000, player.sdumsl.superEpicEntrance.sub(78).pow(1.5))).gte(1)&&player.sdumsl.superEpicEntrance.gte(80)) tmp.sdumsl.tabFormat[0][1] = ["0px", Decimal.add(0, Decimal.root(100000, player.sdumsl.superEpicEntrance.sub(78).pow(1.5)))+"px"]
		}
		if(player.tab=="sdumsl"&&!player.sdumsl.didYouFindIt){
			player.sdumsl.didYouFindIt = true
			if(options.musicToggle>0) document.getElementById("idAudio"+(options.musicToggle)).pause()
			document.getElementById("secretAudio").play()
		}
		if(player.sdumsl.didYouFindIt&&player.tab!=="sdumsl"){
			player.sdumsl.didYouFindIt = false
			document.getElementById("secretAudio").pause()
			document.getElementById("secretAudio").currentTime = 0
			if(options.musicToggle>0) document.getElementById("idAudio"+(options.musicToggle)).play()
		}
	},
    layerShown(){return !options.assholeMode},
	tooltip: "",
	tabFormat: [["blank", ["0px", "6969px"]],["display-text", function(){return `<h1>CHAPTER 1: BORING ASS GAME`}],"blank",["row", [["clickable",[11]],"blank",["clickable",[12]],"blank",["clickable",[13]],"blank",["clickable",[14]]]],["blank", ["0px", "32px"]],["display-text", function(){return `<h1>CHAPTER 2: THE END OF BEGINNING`}],"blank",["row", [["clickable",[15]],"blank",["clickable",[16]]]],["blank", ["0px", "32px"]],["display-image", "angry shotgun game nerd.png", function(){return{'opacity':player.sdumsl.superEpicEntrance.sub(85).div(4)+''}}]],
	clickables: {
        11: {
            title: "ACT 1:<br>Hopeless Situation<br><br>[NG-]",
            unlocked() {return true},
            canClick() {return true},
			onClick()  {player.a.achievements = ['11', '12', '13', '14', '15']
						layerDataReset("realAB")
						layerDataReset("pp")
						player.realAB.unlocked=false
						player.realAB.points=new Decimal(0)
						player.realAB.upgrades=[]
						player.realAB.milestones=[]
						player.realAB.achievements=[]
						player.realAB.buyables[12]=new Decimal(0)
						player.realAB.buyables[13]=new Decimal(0)
						player.m.famed = false
						player.n.initialCoins = new Decimal(300)
						player.m.milestones = []
						player.m.buyables[11] = new Decimal(0)
						player.ab.points = new Decimal(1)
						if(!options.musicToggle==0){
						document.getElementById("idAudio"+(options.musicToggle)).pause()
						document.getElementById("idAudio"+(options.musicToggle)).currentTime = 0
						}
						options.musicToggle = 1
						if(player.tab!=="sdumsl") document.getElementById("idAudio"+(options.musicToggle)).play()
						player.n.framerule = new Decimal(0)
						player.subtabs.a.mainTabs = 'Achievements'
						player.subtabs.ab.mainTabs = 'MiaN sTUFF'
						player.ab.unlocked = true
						player.kp.unlocked = true
						player.n.points = new Decimal(0)
						player.n.best = new Decimal(0)
						player.n.total = new Decimal(0)
						player.n.milestones = []
						player.n.upgrades = []
						player.mp.unlocked = true
						player.gp.unlocked = true
						player.b.unlocked = false
						player.ab.negativePoints = new Decimal(0)
						player.ab.buyables[11] = new Decimal(0)
						player.ab.buyables[12] = new Decimal(0)
						player.ab.buyables[13] = new Decimal(0)
						player.ab.buyables[14] = new Decimal(0)
						player.s.buyables[11] = new Decimal(0)
						player.s.buyables[12] = new Decimal(0)
						player.s.buyables[21] = new Decimal(0)
						player.s.buyables[31] = new Decimal(0)
						player.s.buyables[41] = new Decimal(0)
						player.t.canProgress = true
						player.t.base = new Decimal(1)
						player.t.points = new Decimal(0)
						player.t.seconds = new Decimal(0)
						player.t.minutes = new Decimal(0)
						player.t.hours = new Decimal(0)
						player.t.days = new Decimal(0)
						player.t.weeks = new Decimal(0)
						player.t.months = new Decimal(0)
						player.t.years = new Decimal(0)
						player.t.centuries = new Decimal(0)
						player.t.millenniums = new Decimal(0)
						player.s.upgrades = []
						player.t.upgrades = []
						player.kb.unlocked = false
						player.mb.unlocked = false
						modInfo.initialStartPoints = new Decimal(0)
						player.ab.negativePoints = new Decimal(0)
						player.ab.spentPoints = new Decimal(0)
						player.t.seconds = new Decimal(0)
						tmp.ab.color = "#006080"
						player.ab.nostalgia = false
						player.ab.fuckyou = false
						player.c.unlocked = false
						player.o.unlocked = false
						player.t.unlocked = false
						player.s.unlocked = false
						player.n.unlocked = false
						player.m.unlocked = false
						player.a.normalAchievements = new Decimal(5)
						player.a.fame = new Decimal(0)
						player.realAB.points=new Decimal(0)
						player.realAB.upgrades=[]
						player.realAB.milestones=[]
						player.realAB.achievements=[]
						player.realAB.buyables[12]=new Decimal(0)
						player.realAB.buyables[13]=new Decimal(0)
						player.realAB.buyables[21]=new Decimal(0)
						doReset("ab", true)},
			style: {"background-color"(){
                return 'white'
            }},
        },
        12: {
            title: "ACT 2:<br>Noisy Devil<br><br>[NG--]",
            unlocked() {return true},
            canClick() {return true},
			onClick()  {tmp.sdumsl.clickables[11].onClick()
						player.a.achievements = ['11', '12', '13', '14', '15', '21', '22', '23', '24', '25', '31']
						player.ab.points = new Decimal(2)
						if(!options.musicToggle==0){
						document.getElementById("idAudio"+(options.musicToggle)).pause()
						document.getElementById("idAudio"+(options.musicToggle)).currentTime = 0
						}
						options.musicToggle = 2
						if(player.tab!=="sdumsl") document.getElementById("idAudio"+(options.musicToggle)).play()
						player.b.unlocked = true
						player.kb.unlocked = false
						player.ab.negativePoints = new Decimal(10)
						player.mb.unlocked = false
						player.a.normalAchievements = new Decimal(11)
						doReset("ab", true)},
			style: {"background-color"(){
                return 'white'
            }},
        },
        13: {
            title: "ACT 3:<br>MAXIMUM OVERDRIVE<br><br>[NG---]",
            unlocked() {return true},
            canClick() {return true},
			onClick()  {tmp.sdumsl.clickables[12].onClick()
						player.a.achievements = ['11', '12', '13', '14', '15', '21', '22', '23', '24', '25', '31', '32', '33', '34', '35', '41']
						player.ab.points = new Decimal(3)
						if(!options.musicToggle==0){
						document.getElementById("idAudio"+(options.musicToggle)).pause()
						document.getElementById("idAudio"+(options.musicToggle)).currentTime = 0
						}
						options.musicToggle = 3
						if(player.tab!=="sdumsl") document.getElementById("idAudio"+(options.musicToggle)).play()
						player.kb.unlocked = true
						player.mb.unlocked = false
						player.a.normalAchievements = new Decimal(16)
						doReset("ab", true)},
			style: {"background-color"(){
                return 'white'
            }},
        },
        14: {
            title(){return "ACT 4:<br>"+(hasAchievement("a", 1011)?"L":"█")+(hasAchievement("a", 1012)?"a":"█")+(hasAchievement("a", 1013)?"e":"█")+(hasAchievement("a", 1014)?"c":"█")+"██'s Fury<br><br>[NG----]"},
			//bruh you really thought i'd let you know the name like that
			
			//get yo ass up and watch some Party Crashers instead
			
			//or play Shenanigans Tree which is what inspired this mod (DON'T)
            unlocked() {return true},
            canClick() {return true},
			onClick()  {tmp.sdumsl.clickables[13].onClick()
						player.a.achievements = ['11', '12', '13', '14', '15', '21', '22', '23', '24', '25', '31', '32', '33', '34', '35', '41', '42', '43', '44', '45']
						player.mb.unlocked = true
						player.ab.points = new Decimal(4)
						if(!options.musicToggle==0){
						document.getElementById("idAudio"+(options.musicToggle)).pause()
						document.getElementById("idAudio"+(options.musicToggle)).currentTime = 0
						}
						options.musicToggle = 4
						if(player.tab!=="sdumsl") document.getElementById("idAudio"+(options.musicToggle)).play()
						player.a.normalAchievements = new Decimal(20)
						doReset("ab", true)},
			style: {"background-color"(){
                return 'white'
            }},
        },
        15: {
            title: "ACT 1:<br>Neverending Spacetime... Mangoes?<br><br>[NG-----]",
            unlocked() {return true},
            canClick() {return true},
			onClick()  {tmp.sdumsl.clickables[14].onClick()
						player.a.achievements = ['11', '12', '13', '14', '15', '21', '22', '23', '24', '25', '31', '32', '33', '34', '35', '41', '42', '43', '44', '45', '53', '51', '52', '55', '54', '16', '26', '36', '46', '56']
						player.ab.points = new Decimal(5)
						player.gb.unlocked = true
						modInfo.initialStartPoints = new Decimal(17.77)
						player.ab.negativePoints = new Decimal(0)
						player.a.normalAchievements = new Decimal(30)
						doReset("ab", true)},
			style: {"background-color"(){
                return 'white'
            }},
        },
        16: {
            title: "ACT 2:<br>???<br><br>[???]", 
            unlocked() {return true},
            canClick() {return true},
			style: {"background-color"(){
                return 'white'
            }},
        },
	},
	nodeStyle(){return{'opacity': (player.sdumsl.fiveNG?'100':'0')}}
})

addLayer("s", {
    name: "space", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		holdUp: new Decimal(0),
    }},
	clickables: {
		11: {
			title: "Spacify...?",
			display: "Hold to Reset (totally not stolen from Y🆎oi)",
			canClick() {
				return tmp[this.layer].canReset
			},
			onHold() {
				doReset(this.layer)
			},
			style() {return canReset("s")?{'color': (inChallenge("c",51)&&tmp.s.baseAmount.gte("1.8e18")?'#000000':'#7F7F7F'), 'border-color': (inChallenge("c",51)&&tmp.s.baseAmount.gte("1.8e18")?'rgba(0,0,0,0.125)':'#1F1F1F'),"border-radius":"0px 33% 33% 0px"}:{'color': '#000000', 'border-color': 'rgba(0, 0, 0, 0.125)',"border-radius":"0px 33% 33% 0px"}}
		}
	},
    softcap: new Decimal(1e100), 
    softcapPower: new Decimal(1/11), 
    color(){return inChallenge("c",51)&&tmp.s.baseAmount.gte("1.8e18")?"#00FF00":"#000000"},
	shape: "line",
	passiveGeneration(){return hasUpgrade("s", 33) && player.s.holdUp.lt(5)?0:hasAchievement("a", 1013)&&!inChallenge("c", 11)?1:0},
    requires(){return new Decimal(1).times((player.t.unlocked&&!player.s.unlocked&&!options.why)?76.2:1)}, // Can be a function that takes requirement increases into account
    resource: "spaces", // Name of prestige currency
    baseResource(){return options.why?"points":"negative points"}, // Name of resource prestige is based on
    baseAmount() {return options.why?player.points:player.ab.negativePoints}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.301, // Prestige currency exponent
	stupidBarIHateIt() {let value = new Decimal(tmp.s.shape == "terrasect"?394:tmp.s.shape == "cube"?279:tmp.s.shape == "square"?164:44)
						if(player.s.buyables[12].gte(3)) value = value.times(Decimal.div(453, 175)).mul(Decimal.pow(Decimal.add(10, player.s.buyables[12].sub(4)), player.s.buyables[12].sub(3)))
						return player.s.points.div(value).min(1)},
	effect() {let size = tmp.s.lеngth.mul(tmp.s.height).mul(tmp.s.width).mul(tmp.s.spissitude)
			  if(inChallenge("c", 21)) size = size.root(tmp.t.effectHour.root(4))
			  return size.root(4)},
	lеngth() {let size = tmp.s.buyables[11].size
			 return size},
	height() {let size = tmp.s.buyables[21].size
			  return size},
	width() {let size = tmp.s.buyables[31].size
			 return size},
	spissitude() {let size = tmp.s.buyables[41].size
				  return size},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        return new Decimal(1).mul(tmp.t.effectDay).mul(hasUpgrade("c", 23)?upgradeEffect("c", 23):1).mul(hasUpgrade("c", 43)?upgradeEffect("c", 43):1).mul(tmp.c.buyables["compress2"].effect2.pow(10)).mul(tmp.c.crescentEffect).mul(tmp.c.buyables["CB1"].effect).mul(tmp.c.gimmeEpicGamerCombo==1?9:1).mul(tmp.c.gimmeEpicGamerCombo==1?9:1)
    },
	update(diff){
		tmp.s.shape = ["line", "square", "cube", "terrasect"][player.s.buyables[12].gte(3)?3:player.s.buyables[12]]
		if(!hasUpgrade("s", 33)) player.s.holdUp = new Decimal(0)
		if(hasUpgrade("s", 33) && player.s.holdUp.lt(5)){
			player.s.holdUp = player.s.holdUp.add(diff)
			options.why?player.points = new Decimal(0):player.ab.negativePoints = new Decimal(0)
		}
		if(hasMilestone("c","c1")){
			if(tmp.s.buyables[11].canAfford) player.s.buyables[11]=player.s.buyables[11].add(1)
			if(tmp.s.buyables[21].canAfford&&tmp.s.buyables[21].unlocked) player.s.buyables[21]=player.s.buyables[21].add(1)
			if(tmp.s.buyables[31].canAfford&&tmp.s.buyables[31].unlocked) player.s.buyables[31]=player.s.buyables[31].add(1)
			if(tmp.s.buyables[41].canAfford&&tmp.s.buyables[41].unlocked) player.s.buyables[41]=player.s.buyables[41].add(1)
		}
	},
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	tabFormat: [["display-text", function() {return player.s.points.gte("1e100")?"<h2>YOU'VE REACHED TERMINAL LIMIT_<br>EXECUTING SOFTCAP_SPACE.exe..._<br><br><br>":""}],"main-display", ["row", ["prestige-button", ["clickable", 11]]], "resource-display", ["display-text", function() {return "Total size: "+format(tmp.s.lеngth.mul(tmp.s.height).mul(tmp.s.width).mul(tmp.s.spissitude))+"m"+(tmp.s.shape=="terrasect"?"⁴":tmp.s.shape=="cube"?"³":tmp.s.shape=="square"?"²":"")+"<br>It's size is boosting point gain by "+format(tmp.s.effect)+"x"}], "blank", ["row", [["column", [["buyable", 11], ["buyable", 21], ["buyable", 31], ["buyable", 41]]], "blank", ["bar", "FUCKYOU"]]], "blank", ["buyable", 12], "blank", "upgrades"],
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for spaces", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return ((player.ab.points.gte(5) && !player.ab.fuckyou) || (player.ab.nostalgia && player.ab.fuckyou) || options.why)&&!inChallenge("c", 11)},
	nodeStyle() {return {'color': (player.s.unlocked||tmp.s.baseAmount.gte(tmp.s.requires)?(inChallenge("c",51)&&tmp.s.baseAmount.gte("1.8e18")?'rgba(0,0,0,0.5)':'#7F7F7F'):''), 'border-color': (player.s.unlocked||tmp.s.baseAmount.gte(tmp.s.requires)?(inChallenge("c",51)&&tmp.s.baseAmount.gte("1.8e18")?'rgba(0,0,0,0.125)':'#1F1F1F'):'')}},
	componentStyles: {
		"prestige-button"() {return canReset("s")?{'color': (inChallenge("c",51)&&tmp.s.baseAmount.gte("1.8e18")?'#000000':'#7F7F7F'), 'border-color': (inChallenge("c",51)&&tmp.s.baseAmount.gte("1.8e18")?'rgba(0,0,0,0.125)':'#1F1F1F')}:{'color': '#000000', 'border-color': 'rgba(0, 0, 0, 0.125)'}},
	},
	buyables: {
		11: {
			title: "Length",
			cost() { let cost = new Decimal(1).mul(Decimal.pow(3, player.s.buyables[this.id]))
					 if(hasUpgrade("s", 22)) cost = cost.div(upgradeEffect("s", 22))
					 return cost},
			size() { let base = player.s.buyables[11].mul(player.s.buyables[12].div(4).add(1).floor())
					 let size = base.add(1)
					 if(hasUpgrade("s", 11)) size = size.add(base)
					 if(hasUpgrade("s", 13)) size = Decimal.mul(base.add(2), base.add(1))
					 if(hasUpgrade("s", 32)) size = size.mul(tmp.s.buyables[41].size.log(10).add(1))
					 return size.max(1)},
			display() { return "Your "+tmp.s.shape+" is currently:<br><h3>"+format(this.size())+"m</h3> long<br>Cost: "+format(this.cost())+" spaces<br>You have purchased it "+player.s.buyables[11]+" times" },
			canAfford() { return player.s.points.gte(this.cost()) },
			buy() {
				if(!hasMilestone("c","c1")) player.s.points = player.s.points.sub(this.cost())
				player.s.buyables[this.id] = player.s.buyables[this.id].add(1)
			},
			style(){return{'height':'100px', 'width':'175px', 'color': (tmp.s.buyables[11].canAfford?(inChallenge("c",51)&&tmp.s.baseAmount.gte("1.8e18")?'#000000':'#7F7F7F'):'#000000'), 'border-color': (tmp.s.buyables[11].canAfford?(inChallenge("c",51)&&tmp.s.baseAmount.gte("1.8e18")?'rgba(0,0,0,0.125)':'#1F1F1F'):'#rgba(0, 0, 0, 0.125)')}},
			unlocked(){return true}
		},
		12: {
			title(){return player.s.buyables[12].gte(3)?"Dimensional Booster #"+player.s.buyables[12].sub(2):"Dimension Shifter"},
			cost() { let cost = new Decimal(tmp.s.bars.FUCKYOU.height) 
				     if(player.s.buyables[12].gte(3)) cost = cost.times(Decimal.div(453, 175)).mul(Decimal.pow(Decimal.add(10, player.s.buyables[12].sub(4)), player.s.buyables[12].sub(3)))
					 return cost.div(hasUpgrade("c", 33)?upgradeEffect("c", 33):1)},
			display() { return player.s.buyables[12].gte(3)?"Boosts "+["length","height","width","spissitude"][player.s.buyables[12].add(1)%4]+"'s base by 2x<br>Next multiplier at "+formatWhole(this.cost())+" spaces":"Next shape at "+formatWhole(this.cost())+' spaces' },
			canAfford() { return player.s.points.gte(this.cost()) },
			buy() {
				player.s.points = player.s.points.sub(this.cost())
				player.s.buyables[this.id] = player.s.buyables[this.id].add(1)
			},
			style(){return{'height':'100px', 'width':'175px', 'color': (tmp.s.buyables[this.id].canAfford?(inChallenge("c",51)&&tmp.s.baseAmount.gte("1.8e18")?'#000000':'#7F7F7F'):'#000000'), 'border-color': (tmp.s.buyables[this.id].canAfford?(inChallenge("c",51)&&tmp.s.baseAmount.gte("1.8e18")?'rgba(0,0,0,0.125)':'#1F1F1F'):'#rgba(0, 0, 0, 0.125)')}},
			unlocked(){return !hasUpgrade("s", 33)}
		},
		21: {
			title: "Height",
			cost() { let cost = new Decimal(4).mul(Decimal.pow(4, player.s.buyables[this.id]))
					 if(hasUpgrade("s", 22)) cost = cost.div(upgradeEffect("s", 22))
					 return cost},
			size() { let base = player.s.buyables[21].mul(player.s.buyables[12].sub(1).div(4).add(1).floor())
					 let size = base.add(1)
					 if(hasUpgrade("s", 21)) size = size.pow(2)
					 if(hasUpgrade("s", 32)) size = size.mul(tmp.s.buyables[41].size.log(10).add(1))
					 return size.max(1)},
			display() { return "Your "+tmp.s.shape+" is currently:<br><h3>"+format(this.size())+"m</h3> high<br>Cost: "+format(this.cost())+" spaces<br>You have purchased it "+player.s.buyables[21]+" times" },
			canAfford() { return player.s.points.gte(this.cost()) },
			buy() {
				if(!hasMilestone("c","c1")) player.s.points = player.s.points.sub(this.cost())
				player.s.buyables[this.id] = player.s.buyables[this.id].add(1)
			},
			style(){return{'height':'100px', 'width':'175px', 'color': (tmp.s.buyables[this.id].canAfford?(inChallenge("c",51)&&tmp.s.baseAmount.gte("1.8e18")?'#000000':'#7F7F7F'):'#000000'), 'border-color': (tmp.s.buyables[this.id].canAfford?(inChallenge("c",51)&&tmp.s.baseAmount.gte("1.8e18")?'rgba(0,0,0,0.125)':'#1F1F1F'):'#rgba(0, 0, 0, 0.125)')}},
			unlocked(){return tmp.s.shape == "square"|| tmp.s.shape == "cube" || tmp.s.shape == "terrasect"}
		},
		31: {
			title: "Width",
			cost() { let cost = new Decimal(27).mul(Decimal.pow(5, player.s.buyables[this.id]))
					 if(hasUpgrade("s", 22)) cost = cost.div(upgradeEffect("s", 22))
					 return cost},
			size() { let base = player.s.buyables[31].mul(player.s.buyables[12].sub(2).div(4).add(1).floor())
					 let size = base.add(1)
					 if(hasUpgrade("s", 31)) size = size.mul(upgradeEffect("s", 31))
					 if(hasUpgrade("s", 32)) size = size.mul(tmp.s.buyables[41].size.log(2).add(1))
					 if(hasUpgrade("s", 33)) return size.max(tmp.s.lеngth.mul(tmp.s.height).mul(tmp.s.spissitude).mul(-1))
					 return size.max(1)},
			display() { return "Your "+tmp.s.shape+" is currently:<br><h3>"+format(this.size())+"m</h3> wide<br>Cost: "+format(this.cost())+" spaces<br>You have purchased it "+player.s.buyables[31]+" times" },
			canAfford() { return player.s.points.gte(this.cost()) },
			buy() {
				if(!hasMilestone("c","c1")) player.s.points = player.s.points.sub(this.cost())
				player.s.buyables[this.id] = player.s.buyables[this.id].add(1)
			},
			style(){return{'height':'100px', 'width':'175px', 'color': (tmp.s.buyables[this.id].canAfford?(inChallenge("c",51)&&tmp.s.baseAmount.gte("1.8e18")?'#000000':'#7F7F7F'):'#000000'), 'border-color': (tmp.s.buyables[this.id].canAfford?(inChallenge("c",51)&&tmp.s.baseAmount.gte("1.8e18")?'rgba(0,0,0,0.125)':'#1F1F1F'):'#rgba(0, 0, 0, 0.125)')}},
			unlocked(){return tmp.s.shape == "cube" || tmp.s.shape == "terrasect"}
		},
		41: {
			title: "Spissitude",
			cost() { let cost = new Decimal(256).mul(Decimal.pow(6, player.s.buyables[this.id]))
					 if(hasUpgrade("s", 22)) cost = cost.div(upgradeEffect("s", 22))
					 return cost},
			size() { let base = player.s.buyables[41].mul(player.s.buyables[12].sub(3).div(4).add(1).floor())
					 let size = base.add(1)
					 if(hasUpgrade("s", 23)) size = size.mul(upgradeEffect("s", 23))
					 return size.max(1)},
			display() { return "Your "+tmp.s.shape+" is currently:<br><h3>"+format(this.size())+"m</h3> dense<br>Cost: "+format(this.cost())+" spaces<br>You have purchased it "+player.s.buyables[41]+" times" },
			canAfford() { return player.s.points.gte(this.cost()) },
			buy() {
				if(!hasMilestone("c","c1")) player.s.points = player.s.points.sub(this.cost())
				player.s.buyables[this.id] = player.s.buyables[this.id].add(1)
			},
			style(){return{'height':'100px', 'width':'175px', 'color': (tmp.s.buyables[this.id].canAfford?(inChallenge("c",51)&&tmp.s.baseAmount.gte("1.8e18")?'#000000':'#7F7F7F'):'#000000'), 'border-color': (tmp.s.buyables[this.id].canAfford?(inChallenge("c",51)&&tmp.s.baseAmount.gte("1.8e18")?'rgba(0,0,0,0.125)':'#1F1F1F'):'#rgba(0, 0, 0, 0.125)')}},
			unlocked(){return tmp.s.shape == "terrasect"}
		},
	},
	bars: {
		FUCKYOU: {
			direction: UP,
			width(){return tmp.s.shape == "terrasect"?453:175},
			height(){return tmp.s.shape == "terrasect"?394:tmp.s.shape == "cube"?279:tmp.s.shape == "square"?164:44},
			progress() { let initial = this.height()
						 if(player.s.buyables[12].gte(3)) initial = initial*453/175*((10+(player.s.buyables[12]-4))**(player.s.buyables[12]-3))
					     return new Decimal(player.s.points).div(initial).mul(hasUpgrade("c", 33)?upgradeEffect("c", 33):1) },
		}
	},
	upgrades: {
		11: {
			title: "You can move in BOTH directions?!",
			description: "Length uses better formula<br>[x+1] => [x*2+1]",
			unlocked: true,
			canAfford(){return player.s.buyables[11].gte(this.cost)},
			cost: new Decimal(2),
            currencyLocation() {return player.s.buyables},
			currencyDisplayName: "lengths",
			currencyInternalName: 11,
			currencyLayer: "s",
			style() {return {'color': (this.canAfford()&&!hasUpgrade("s", this.id)?(inChallenge("c",51)&&tmp.s.baseAmount.gte("1.8e18")?'#000000':'#7F7F7F'):''), 'border-color': (this.canAfford()&&!hasUpgrade("s", this.id)?(inChallenge("c",51)&&tmp.s.baseAmount.gte("1.8e18")?'rgba(0,0,0,0.125)':'#1F1F1F'):'')}},
		},
		12: {
			title: "The Clutcher",
			description: "You gain more points based on how close you are to getting the next shape",
			effect(){return tmp.s.stupidBarIHateIt.mul(100).max(1).log(8.58784928098261).add(1)},
			effectDisplay(){return format(this.effect())+"x"},
			unlocked: true,
			canAfford(){return player.s.points.gte(this.cost)},
			cost: new Decimal(5),
			style() {return {'color': (this.canAfford()&&!hasUpgrade("s", this.id)?(inChallenge("c",51)&&tmp.s.baseAmount.gte("1.8e18")?'#000000':'#7F7F7F'):''), 'border-color': (this.canAfford()&&!hasUpgrade("s", this.id)?(inChallenge("c",51)&&tmp.s.baseAmount.gte("1.8e18")?'rgba(0,0,0,0.125)':'#1F1F1F'):'')}},
		},
		13: {
			title: "The Last Line Bender",
			description: "Length uses better formula<br>[x*2+1] => [(x*2+2)+(x*2+1)]",
			unlocked: true,
			canAfford(){return player.s.buyables[11].gte(this.cost)},
			cost: new Decimal(3),
            currencyLocation() {return player.s.buyables},
			currencyDisplayName: "lengths",
			currencyInternalName: 11,
			currencyLayer: "s",
			style() {return {'color': (this.canAfford()&&!hasUpgrade("s", this.id)?(inChallenge("c",51)&&tmp.s.baseAmount.gte("1.8e18")?'#000000':'#7F7F7F'):''), 'border-color': (this.canAfford()&&!hasUpgrade("s", this.id)?(inChallenge("c",51)&&tmp.s.baseAmount.gte("1.8e18")?'rgba(0,0,0,0.125)':'#1F1F1F'):'')}},
		},
		21: {
			title: "Height's Power",
			description: "Height uses better formula<br>[x+1] => [(x+1)^2]",
			unlocked(){return player.s.buyables[12].gte(1)},
			cost: new Decimal(3),
			canAfford(){return player.s.buyables[21].gte(3)},
            currencyLocation() {return player.s.buyables},
			currencyDisplayName: "heights",
			currencyInternalName: 21,
			currencyLayer: "s",
			style() {return {'color': (this.canAfford()&&!hasUpgrade("s", this.id)?(inChallenge("c",51)&&tmp.s.baseAmount.gte("1.8e18")?'#000000':'#7F7F7F'):''), 'border-color': (this.canAfford()&&!hasUpgrade("s", this.id)?(inChallenge("c",51)&&tmp.s.baseAmount.gte("1.8e18")?'rgba(0,0,0,0.125)':'#1F1F1F'):'')}},
		},
		22: {
			fullDisplay(){return `<h3>Size-inator</h3><br>Dimensions are cheaper based on current size<br>Currently: ${format(this.effect())}/<br><br>Cost: 7 lengths, 5 heights, 3 widths and 2 spissitudes`},
			unlocked(){return player.s.buyables[12].gte(3)},
			effect(){return tmp.s.lеngth.mul(tmp.s.height).mul(tmp.s.width).mul(tmp.s.spissitude).root(4)},
			canAfford(){return player.s.buyables[11].gte(7)&&player.s.buyables[21].gte(5)&&player.s.buyables[31].gte(3)&&player.s.buyables[41].gte(2)},
            currencyLocation() {return player.s.buyables},
			currencyDisplayName: "spissitude",
			onPurchase(){
				player.s.buyables[11] = player.s.buyables[11].sub(7)
				player.s.buyables[21] = player.s.buyables[21].sub(5)
				player.s.buyables[31] = player.s.buyables[31].sub(3)
				player.s.buyables[41] = player.s.buyables[41].sub(2)
			},
			currencyInternalName: 41,
			currencyLayer: "s",
			style() {return {'color': (this.canAfford()&&!hasUpgrade("s", this.id)?(inChallenge("c",51)&&tmp.s.baseAmount.gte("1.8e18")?'#000000':'#7F7F7F'):''), 'border-color': (this.canAfford()&&!hasUpgrade("s", this.id)?(inChallenge("c",51)&&tmp.s.baseAmount.gte("1.8e18")?'rgba(0,0,0,0.125)':'#1F1F1F'):'')}},
		},
		23: {
			title: "Subpar-piss-tution",
			description: "It has nothing to do with space nor time, but...<br>Spisstude is stronger based on clock's strength",
			effect(){return tmp.t.clockPower},
			effectDisplay(){return format(this.effect())+"x"},
			unlocked(){return player.s.buyables[12].gte(3)},
			cost: new Decimal(4),
			canAfford(){return player.s.buyables[41].gte(4)},
            currencyLocation() {return player.s.buyables},
			currencyDisplayName: "spisstudes",
			currencyInternalName: 41,
			currencyLayer: "s",
			style() {return {'color': (this.canAfford()&&!hasUpgrade("s", this.id)?(inChallenge("c",51)&&tmp.s.baseAmount.gte("1.8e18")?'#000000':'#7F7F7F'):''), 'border-color': (this.canAfford()&&!hasUpgrade("s", this.id)?(inChallenge("c",51)&&tmp.s.baseAmount.gte("1.8e18")?'rgba(0,0,0,0.125)':'#1F1F1F'):'')}},
		},
		31: {
			title: "3rd Place is the Winner",
			description: "Width is stronger based on how full bar is",
			effect(){return new Decimal(tmp.s.bars.FUCKYOU.height).sub(Decimal.mul(tmp.s.bars.FUCKYOU.height, tmp.s.bars.FUCKYOU.progress).div(100)).times(Decimal.div(453, 175))},
			effectDisplay(){return format(this.effect())+"x"},
			unlocked(){return hasMilestone("c", 1)},
			cost: new Decimal(42),
			canAfford(){return player.s.buyables[31].gte(42)},
            currencyLocation() {return player.s.buyables},
			currencyDisplayName: "widths",
			currencyInternalName: 31,
			currencyLayer: "s",
			style() {return {'color': (this.canAfford()&&!hasUpgrade("s", this.id)?(inChallenge("c",51)&&tmp.s.baseAmount.gte("1.8e18")?'#000000':'#7F7F7F'):''), 'border-color': (this.canAfford()&&!hasUpgrade("s", this.id)?(inChallenge("c",51)&&tmp.s.baseAmount.gte("1.8e18")?'rgba(0,0,0,0.125)':'#1F1F1F'):'')}},
		},
		32: {
			title: "Superdensity",
			description: "Other dimensions are stronger based on density",
			unlocked(){return hasMilestone("c", 1)},
			cost: new Decimal("5e39"),
			onPurchase(){
				player.s.buyables[11] = new Decimal(0)
				player.s.buyables[21] = new Decimal(0)
				player.s.buyables[31] = new Decimal(0)
				player.s.buyables[41] = new Decimal(0)
			},
			canAfford(){return tmp.s.lеngth.mul(tmp.s.height).mul(tmp.s.width).mul(tmp.s.spissitude).gte("5e39")},
			effectDisplay(){return format(tmp.s.buyables[41].size.log(10).add(1))+"x"},
            currencyLocation() {return player.s.buyables},
			currencyDisplayName: "m⁴ total size",
			style() {return {'color': (this.canAfford()&&!hasUpgrade("s", this.id)?(inChallenge("c",51)&&tmp.s.baseAmount.gte("1.8e18")?'#000000':'#7F7F7F'):''), 'border-color': (this.canAfford()&&!hasUpgrade("s", this.id)?(inChallenge("c",51)&&tmp.s.baseAmount.gte("1.8e18")?'rgba(0,0,0,0.125)':'#1F1F1F'):'')}},
		},
		33: {
			title: "Negative Zone",
			description: "Reveals 7th upgrade's true potential and hardcap Width",
			unlocked(){return hasMilestone("c", 1)},
			cost: new Decimal("1e42"),
			onPurchase(){player.s.buyables[12] = new Decimal(3)},
			canAfford(){return tmp.s.baseAmount.gte("1e42")},
			currencyDisplayName(){return options.why?"points":"negative points"},
			currencyInternalName(){return options.why?"points":"negativePoints"},
			currencyLayer(){return options.why?"":"ab"},
			style() {return {'color': (this.canAfford()&&!hasUpgrade("s", this.id)?(inChallenge("c",51)&&tmp.s.baseAmount.gte("1.8e18")?'#000000':'#7F7F7F'):''), 'border-color': (this.canAfford()&&!hasUpgrade("s", this.id)?(inChallenge("c",51)&&tmp.s.baseAmount.gte("1.8e18")?'rgba(0,0,0,0.125)':'#1F1F1F'):'')}},
		},
	},
	doReset(resettingLayer){
		if(player.ab.points.gte(5)) {
			player.points = new Decimal(17.77)
			player.ab.negativePoints = new Decimal(0)
		}
		if(tmp[resettingLayer].row > this.row){
			player[this.layer].points = new Decimal(0)
			player.s.buyables[11] = new Decimal(0)
			player.s.buyables[21] = new Decimal(0)
			player.s.buyables[31] = new Decimal(0)
			player.s.buyables[41] = new Decimal(0)
			player.s.buyables[12] = new Decimal(0)
			player.s.upgrades = []
		}
	}
})

addLayer("t", {
    name: "time", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		seconds: new Decimal(0),
		minutes: new Decimal(0),
		hours: new Decimal(0),
		days: new Decimal(0),
		weeks: new Decimal(0),
		months: new Decimal(0),
		years: new Decimal(0),
		centuries: new Decimal(0),
		millenniums: new Decimal(0),
		base: new Decimal(1),
		power: new Decimal(0),
		canProgress: true,
    }},
	passiveGeneration(){return hasUpgrade("s", 33) && player.s.holdUp.lt(5)?0:hasAchievement("a", 1013)&&!inChallenge("c", 13)?1:0},
    color(){return inChallenge("c",51)&&tmp.t.baseAmount.gte("1.8e18")?"#00FF00":"#FFFFFF"},
	effectSecond(){let second = player.t.seconds.mul(tmp.t.effectYear)
				   if(hasUpgrade("t", 15)) second = second.mul(69)
				   return second.add(1).root(10)},
	effectMinute(){let minute = player.t.minutes.mul(tmp.t.effectYear)
				   return minute.add(1).log(10).add(1)},
	effectHour(){let base = player.t.hours
				 if(hasUpgrade("t", 23)) base = base.mul(10000000)
				 if(inChallenge("c", 21)) base = base.root(tmp.s.effect.root(2))
				 return base.mul(tmp.t.effectYear).add(1).root(3)},
	clockPower(){let clock = tmp.t.effectHour
				 if(hasUpgrade("t", 12)) clock = clock.mul(1.8)
				 if(hasUpgrade("t", 21)) clock = clock.mul(new Decimal(2).pow(player.s.buyables[12].sub(3)).max(1))
				 return clock},
	effectClock(){let clocks = player.t.points.mul(tmp.t.effectHour)
				  if(hasUpgrade("t", 12)) clocks = clocks.mul(1.8)
				  if(hasUpgrade("t", 21)) clocks = clocks.mul(new Decimal(2).pow(player.s.buyables[12].sub(3)).max(1))
				  return clocks.mul(hasUpgrade("c", 13)?upgradeEffect("c", 13):1)},
	effectDay(){return player.t.days.mul(tmp.t.effectWeek).mul(tmp.t.effectYear).div(10).add(1)},
	effectWeek(){return player.t.weeks.mul(tmp.t.effectYear).add(1).root(7)},
	effectMonth(){return player.t.months.mul(tmp.t.effectYear).add(1).log(10).add(1).log(10).add(1)},
	effectYear(){let base = new Decimal(2).root(tmp.t.effectCentury)
				 return player.t.years.add(1).root(base).add(1).log(base).add(1)},
	effectCentury(){return player.t.centuries.add(1).log(9).add(1).root(9).add(1)},
	effectMillennium(){return player.t.millenniums.add(1).log(4).add(1).log(4).add(1).pow(hasUpgrade("t", 24)?2.023:1)},
	update(diff){
		if(player.t.base.lte(0)) player.t.base = new Decimal(1)
		if(player.t.seconds.lt("1e100")) player.t.seconds = player.t.seconds.add(Decimal.mul(diff, tmp.t.effectClock)).min("1e100")
		if(player.t.canProgress){
			if(player.t.seconds.gte(60*player.t.base)&&player.t.minutes.lt("1e100")) {
				player.t.minutes = player.t.minutes.add(1*player.t.base).min("1e100")
				player.t.seconds = player.t.seconds.sub(60*player.t.base)
			}
			if(player.t.minutes.gte(60*player.t.base)&&player.t.hours.lt("1e100")) {
				player.t.hours = player.t.hours.add(1*player.t.base).min("1e100")
				player.t.minutes = player.t.minutes.sub(60*player.t.base)
			}
			if(player.t.hours.gte(24*player.t.base)&&player.t.days.lt("1e100")) {
				player.t.days = player.t.days.add(1*player.t.base).min("1e100")
				player.t.hours = player.t.hours.sub(24*player.t.base)
			}
			if(player.t.days.gte(7*player.t.base)&&player.t.weeks.lt("1e100")) {
				player.t.weeks = player.t.weeks.add(1*player.t.base).min("1e100")
				player.t.days = player.t.days.sub(7*player.t.base)
			}
			if(player.t.weeks.gte(4*player.t.base)&&player.t.months.lt("1e100")) {
				player.t.months = player.t.months.add(1*player.t.base).min("1e100")
				player.t.weeks = player.t.weeks.sub(4*player.t.base)
			}
			if(player.t.months.gte(12*player.t.base)&&player.t.years.lt("1e100")) {
				player.t.years = player.t.years.add(1*player.t.base).min("1e100")
				player.t.months = player.t.months.sub(12*player.t.base)
			}
			if(player.t.years.gte(100*player.t.base)&&player.t.centuries.lt("1e100")) {
				player.t.centuries = player.t.centuries.add(1*player.t.base).min("1e100")
				player.t.years = player.t.years.sub(100*player.t.base)
			}
			if(player.t.centuries.gte(10*player.t.base)&&player.t.millenniums.lt("1e100")) {
				player.t.millenniums = player.t.millenniums.add(1*player.t.base).min("1e100")
				player.t.centuries = player.t.centuries.sub(10*player.t.base)
			}
		}
		if(player.c.buyables["CB2"].gte(1)){
			if(player.t.seconds.gte(60)) player.t.minutes = player.t.minutes.add(player.t.seconds.div(60).mul(diff).mul(tmp.c.buyables["CB2"].effect2.div(100))).min("1e100")
			if(player.t.minutes.gte(60)) player.t.hours = player.t.hours.add(player.t.minutes.div(60).mul(diff).mul(tmp.c.buyables["CB2"].effect2.div(100))).min("1e100")
			if(player.t.hours.gte(24)) player.t.days = player.t.days.add(player.t.hours.div(24).mul(diff).mul(tmp.c.buyables["CB2"].effect2.div(100))).min("1e100")
			if(player.t.days.gte(7)) player.t.weeks = player.t.weeks.add(player.t.days.div(7).mul(diff).mul(tmp.c.buyables["CB2"].effect2.div(100))).min("1e100")
			if(player.t.weeks.gte(4)) player.t.months = player.t.months.add(player.t.weeks.div(4).mul(diff).mul(tmp.c.buyables["CB2"].effect2.div(100))).min("1e100")
			if(player.t.months.gte(12)) player.t.years = player.t.years.add(player.t.months.div(12).mul(diff).mul(tmp.c.buyables["CB2"].effect2.div(100))).min("1e100")
			if(player.t.years.gte(100)) player.t.centuries = player.t.centuries.add(player.t.years.div(100).mul(diff).mul(tmp.c.buyables["CB2"].effect2.div(100))).min("1e100")
			if(player.t.centuries.gte(10)) player.t.millenniums = player.t.millenniums.add(player.t.centuries.div(10).mul(diff).mul(tmp.c.buyables["CB2"].effect2.div(100))).min("1e100")
		}
		if(hasUpgrade("t", 22)) player.t.days = player.t.days.add(Decimal.mul(player.t.weeks.mul(2), diff)).min("1e100")
	},
	effectDescription(){return `which generate ${format(tmp.t.effectClock)} seconds per second in total`},
	tabFormat: [["display-text", function() {return player.t.seconds.gte("1e100")||player.t.minutes.gte("1e100")||player.t.hours.gte("1e100")||player.t.days.gte("1e100")||player.t.weeks.gte("1e100")||player.t.months.gte("1e100")||player.t.years.gte("1e100")||player.t.centuries.gte("1e100")||player.t.millenniums.gte("1e100")?"<h2>YOU'VE REACHED TERMINAL LIMIT_<br>EXECUTING HARDCAP_TIME.exe..._<br><br><br>":""}],"main-display", ["row", ["prestige-button", ["clickable", 31]]], "resource-display", ["display-text", function(){return `You have about...`+(player.t.seconds.gte(1)?`<br>${formatWhole(player.t.seconds)} seconds`+(hasUpgrade("t", 11)?`, giving you ${format(tmp.t.effectSecond)}x point gain boost`:``):``)+(player.t.minutes.gte(1)?`<br>${formatWhole(player.t.minutes)} minutes, granting you ${format(tmp.t.effectMinute)}x clock gain`:``)+(player.t.hours.gte(1)?`<br>${formatWhole(player.t.hours)} hours, blessing you with ${format(tmp.t.effectHour)}x clock acceleration`:``)+(player.t.days.gte(1)?`<br>${formatWhole(player.t.days)} days, offering you a staggering ${format(tmp.t.effectDay)}x space gain`:``)+(player.t.weeks.gte(1)?`<br>${formatWhole(player.t.weeks)} weeks, boosting days by ${format(tmp.t.effectWeek)}x`:``)+(player.t.months.gte(1)?`<br>${formatWhole(player.t.months)} months, empowering balancers by ^${format(tmp.t.effectMonth)}`:``)+(player.t.years.gte(1)?`<br>${formatWhole(player.t.years)} years, enraging all previous time units by ${format(tmp.t.effectYear)}x`:``)+(player.t.centuries.gte(1)?`<br>${formatWhole(player.t.centuries)} centuries, weakening year effect's softcaps by ${format(tmp.t.effectCentury)} root`:``)+(player.t.millenniums.gte(1)?`<br>${formatWhole(player.t.millenniums)} millenniums, boosting your dimensions by ${format(tmp.t.effectMillennium)}x`:``)}], "blank", ["clickables", [1]], "blank", ["clickable", 21], "blank", "upgrades"],
    requires(){return new Decimal(1).times((player.s.unlocked&&!player.t.unlocked&&!options.why)?76.2:1)}, // Can be a function that takes requirement increases into account
    resource: "clocks", // Name of prestige currency
    baseResource(){return options.why?"points":"negative points"}, // Name of resource prestige is based on
    baseAmount() {return options.why?player.points:player.ab.negativePoints}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.150515, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
       return new Decimal(1).mul(tmp.t.effectMinute).mul(hasUpgrade("c", 23)?upgradeEffect("c", 23):1).mul(tmp.c.buyables["compress2"].effect2.pow(10)).mul(tmp.c.crescentEffect).mul(tmp.c.buyables["CB1"].effect)
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "T: Reset for clocks", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return ((player.ab.points.gte(5) && !player.ab.fuckyou) || (player.ab.nostalgia && player.ab.fuckyou)||options.why)&&!inChallenge("c", 13)},
	doReset(resettingLayer){
		if(player.ab.points.gte(5)) {
			player.points = new Decimal(17.77) 
			player.ab.negativePoints = new Decimal(0)
		}
		if(tmp[resettingLayer].row > this.row){
			player[this.layer].points = new Decimal(0)
			player.t.upgrades = []
			player.t.base = new Decimal(1)
			player.t.seconds = new Decimal(0)
			player.t.minutes = new Decimal(0)
			player.t.hours = new Decimal(0)
			player.t.days = new Decimal(0)
			player.t.weeks = new Decimal(0)
			player.t.months = new Decimal(0)
			player.t.years = new Decimal(0)
			player.t.centuries = new Decimal(0)
			player.t.millenniums = new Decimal(0)
		}
	},
	clickables: {
		11: {
            title(){return `10<sup>${formatWhole(player.t.power)}</sup><br><`},
            unlocked() {return true},
			canClick() {return player.t.power.gte(1)},
			onClick() {player.t.power = player.t.power.sub(1)},
			style() {return{'height': '64px', 'width': '64px'}}
        },
		12: {
            title(){return`Decrease bulk`},
            canClick() {return player.t.base.gte(Decimal.pow(10, player.t.power).add(1))},
			onClick()  {player.t.base = player.t.base.sub(Decimal.pow(10, player.t.power))},
            onHold() {player.t.base = player.t.base.sub(Decimal.pow(10, player.t.power))},
        },
		13: {
            title(){return`Set bulk back to 1`},
            canClick() {return true},
			onClick()  {player.t.base = new Decimal(1)},
        },
		14: {
            title(){return`Increase bulk`},
            canClick() {return true},
			onClick()  {player.t.base = player.t.base.add(Decimal.pow(10, player.t.power))},
            onHold() {player.t.base = player.t.base.add(Decimal.pow(10, player.t.power))},
        },
		15: {
            title(){return `10<sup>${formatWhole(player.t.power)}</sup><br>>`},
            unlocked() {return true},
			canClick() {return true},
			onClick() {player.t.power = player.t.power.add(1)},
			style() {return{'height': '64px', 'width': '64px'}}
        },
		21: {
			title() {return "<h2>Purchase Time?</h2><h4>(Current Bulk: "+formatWhole(player.t.base)+")</h4><br><h2>"+(player.t.canProgress?"[YES]":"[NO]")},
            unlocked() {return true},
            canClick() {return true},
			onClick()  {player.t.canProgress = !player.t.canProgress},
			style() {return{'height': '100px', 'width': '250px', 'border-radius': '10%'}}
        },
		31: {
			title: "Purchase",
			display: "Hold to Reset (totally not stolen from Y🆎oi)",
			canClick() {
				return tmp[this.layer].canReset
			},
			onHold() {
				doReset(this.layer)
			},
			style() {return {"border-radius":"0px 33% 33% 0px","border":"4px solid","border-color":"rgba(0, 0, 0, .125)"}}
		}
	},
	upgrades: {
		11: {
			title: "10 Seconds",
			description: "Seconds now have an effect.",
			unlocked(){return player.t.seconds.gte(1)||hasUpgrade("t", 11)},
			cost: new Decimal(10),
			currencyInternalName: "seconds",
			currencyDisplayName: "seconds",
			currencyLayer: "t",
		},
		12: {
			title: "One Minecraft Day",
			description: "Hey, look! A Minecraft reference! Make those goddamn clocks 80% faster!",
			unlocked(){return player.t.minutes.gte(1)||hasUpgrade("t", 12)},
			cost: new Decimal(20),
			currencyInternalName: "minutes",
			currencyDisplayName: "minutes",
			currencyLayer: "t",
		},
		13: {
			title: "Squidward's Closet",
			description: "I CALCULATED IT AND YOU CAN'T PROVE ME OTHERWISE + RATIO!<br>also speeds up point gain as if time was accelerated by 6x at positive points.",
			unlocked(){return hasUpgrade("t", 12)||hasUpgrade("t", 13)},
			cost: new Decimal(32),
			currencyInternalName: "points",
			currencyDisplayName: "clocks",
			currencyLayer: "t",
		},
		14: {
			title: "Antimatter Dimensions Update in just 5 hours",
			description: "Just take 1 extra balancing point and move on...",
			unlocked(){return player.t.hours.gte(1)||hasUpgrade("t", 14)},
			cost: new Decimal(5),
			currencyInternalName: "hours",
			currencyDisplayName: "hours",
			currencyLayer: "t",
		},
		15: {
			title: "guys look!11",
			description: "the funnieyzz XDddDDD1!!1<br>sex-cords are 69x sotrnger HAHAHAHAHAHAHAHAHAHA-<br>the voices aren't leaving me alone please save me i can't do this anymore",
			unlocked(){return player.t.hours.gte(1)||hasUpgrade("t", 15)},
			cost: new Decimal(69),
			currencyInternalName: "hours",
			currencyDisplayName: "hours",
			currencyLayer: "t",
		},
		21: {
			title: "Spacetime Synchronization",
			effectDisplay(){return format(new Decimal(2).pow(player.s.buyables[12].sub(3)).max(1))+"x"},
			description: "Dimensional Booster boosts clocks with no reduced effects.<br>(so cool)",
			unlocked(){return player.t.months.gte(1)||hasUpgrade("t", 21)},
			cost: new Decimal(3),
			currencyInternalName: "months",
			currencyDisplayName: "months",
			currencyLayer: "t",
		},
		22: {
			title: "Gimme A Damn Break",
			description: "Each week generates 2 days",
			unlocked(){return hasMilestone("c", 1)},
			cost: new Decimal(444444444),
			currencyInternalName: "weeks",
			currencyDisplayName: "weeks",
			currencyLayer: "t",
		},
		23: {
			title: "CONGLATURATIONS!!!",
			description: "YOU ALE THE 10,000,000TH VISITOL!<br>PULCHASE THIS UPGLADE TO LECEIVE THE PLICE!<br><br>(hours are 10 million times stronger)",
			unlocked(){return hasMilestone("c", 1)},
			cost: new Decimal(10000000),
			currencyInternalName: "points",
			currencyDisplayName: "clocks",
			currencyLayer: "t",
		},
		24: {
			title: "This joke. Again.",
			description: "Millennium effect is ^2.023 stronger",
			unlocked(){return hasMilestone("c", 1)},
			cost: new Decimal("2e23"),
			currencyInternalName: "millenniums",
			currencyDisplayName: "millenniums",
			currencyLayer: "t",
		},
	}
})

addLayer("c", {
    name: "crazyaf", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		crazymatters: new Decimal(0),
		lol: new Decimal(0),
		count: new Decimal(1),
		bozo: false,
		bought: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		bester: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		automateThisShit: false,
		automateThisShit2: false,
		youStupid: false,
		youStupid2: false,
		autobuy: [],
		infinityPoints: new Decimal(0),
		infinities: new Decimal(0),
		infinityTime: new Decimal(0),
		bestInfinity: new Decimal(999999999999999999999999999999999999),
		crescentTime: new Decimal(0),
		bestCrescent: new Decimal(999999999999999999999999999999999999),
		antimatter: new Decimal(-1),
		crescentmoons: new Decimal(0),
		crescentmoonsTotal: new Decimal(0),
		crescentenergy: new Decimal(0),
		crescentmoonsSpent: new Decimal(0),
	}},
	crescentGain(){return player.c.crescentmoonsTotal.add(1).root(29.5305888531).sub(1).mul(tmp.c.buyables["CB1"].effect2).mul(tmp.c.gimmeEpicGamerCombo==3?9:1)},
	crescentEffect(){return player.c.crescentenergy.add(1).root(2.95305888531)},
	clickables: {
		11: {
			title: ">go crazy<br>>???<br>>profit",
			display: "Hold to Reset (totally not stolen from Y🆎oi)",
			canClick() {
				return tmp[this.layer].canReset
			},
			onHold() {
				doReset(this.layer)
			},
			style() {return {"border-radius":"0px 33% 33% 0px","border":"4px solid","border-color":"rgba(0, 0, 0, .125)"}}
		},
		12: {
			title: "Big Crunch",
			display: "Hold to Reset (totally not stolen from Y🆎oi)",
			canClick() {
				return tmp.c.buyables["lol"].canAfford
			},
			onHold() {
				tmp.c.buyables["lol"].buy()
			},
			style() {return {"border-radius":"0px 33% 33% 0px","border":"4px solid","border-color":"rgba(0, 0, 0, .125)"}}
		},
		13: {
			title: "Piss",
			display: "Hold to Reset (totally not stolen from Y🆎oi)",
			canClick() {
				return tmp.c.buyables["ez"].canAfford
			},
			onHold() {
				tmp.c.buyables["ez"].buy()
			},
			style() {return {"background-color":(this.canClick()?"lightcyan":""),"border-radius":"0px 33% 33% 0px","border":"4px solid","border-color":"rgba(0, 0, 0, .125)"}}
		},
	},
	shouldNotify(){let fuckYou = false
		for(i=1;i<22;i++){
			if(player.c.crazymatters.gte(tmp.c.buyables[i*10+1].cost)) fuckYou = true
		}
	return fuckYou
	},
	antimatterRatio(){return player.c.antimatter.add(1).log(10)},
	glowColor: "white",
	crescentCombo: ["N/A","Console Fast Forward","Time Overlord","Awkward Mid Gap","Balanced Cheese Mix"],
	crescentComboDescription: ["Try having two different Crescentables","9x Space and Time gain, 5x Cranenium gain and Crazy Dimensions's production","5x Cranenium gain and Crazy Dimensions's production, 3x Late Game Boost's 1st effect's effective amount","9x Crescent Croissant gain, 3x Point Gain","1 free Crescentable each (unaffected by anything)"],
	gimmeEpicGamerCombo(){return (player.c.buyables["CB1"].add(player.c.buyables["CB2"]).sub(player.c.buyables["CB3"].mul(2)).gte(2)&&player.c.buyables["CB1"].gte(1)&&player.c.buyables["CB2"].gte(1))?1:(player.c.buyables["CB2"].add(player.c.buyables["CB3"]).sub(player.c.buyables["CB1"].mul(2)).gte(2)&&player.c.buyables["CB2"].gte(1)&&player.c.buyables["CB3"].gte(1))?2:(player.c.buyables["CB1"].add(player.c.buyables["CB3"]).sub(player.c.buyables["CB2"].mul(2)).gte(2)&&player.c.buyables["CB1"].gte(1)&&player.c.buyables["CB3"].gte(1))?3:player.c.buyables["CB1"].gte(1)&&player.c.buyables["CB2"].gte(1)&&player.c.buyables["CB3"].gte(1)?4:0},
	effect(){return player.c.crazymatters.add(1).log(10).add(1)},
	effectCool(){let cool = player.c.points.pow(hasChallenge("c",51)?1.65:hasUpgrade("c",44)?1.25:1).mul(hasChallenge("c",51)?100:1)
				 if(inChallenge("c", 12)) cool = new Decimal(1)
				 return cool},
	effectDescription(){return `which are what makes crazy dimensions work in the first place<br>Current Formula: [Base = C`+(hasChallenge("c",51)?`^1.65*100`:hasUpgrade("c",44)?`^1.25`:``)+` (${format(this.effectCool())})]`},
	microtabs: {
        stuff: {
			"Infinity Compressor":{
				content: [["display-text", function() {return "<p style='transform: scale(1.333333333, 1)'><span style='font-family: Impact;'>You have compressed Infinity itself </span><p style='transform: scale(1.333333333, 1)'><h2 style='color: rgb(255 255 255 10px); text-shadow: rgba(0 0 0 10px); font-family: Impact;'>"+formatWhole(player.c.buyables["compress"])+"</h2><p style='transform: scale(1.333333333, 1)'><span style='font-family: Impact;'> times.<br><br>Multipliers and ascensions have been rooted by "+format(tmp.c.buyables["compress"].effect)+"<br>You gain "+format(Decimal.pow(4, player.c.buyables["compress"].pow(0.7407407407407407)))+"x more points</span>"}],"blank",["buyable","compressAuto"],"blank",["buyable","compress"]],
			},
			"Infinity Compressor Compressor":{
				content: [["display-text", function() {return "<p style='transform: scale(1.333333333, 1)'><span style='font-family: Impact;'>You have pushed Infinity Compressor's boundaries past it's limits </span><p style='transform: scale(1.333333333, 1)'><h2 style='color: rgb(255 255 255 10px); text-shadow: rgba(0 0 0 10px); font-family: Impact;'>"+formatWhole(player.c.buyables["compress2"])+"</h2><p style='transform: scale(1.333333333, 1)'><span style='font-family: Impact;'> times.<br><br>Your crazy matter production is raised to the power of ^"+format(tmp.c.buyables["compress2"].effect)+"...<br>but your Infinity Point gain is multiplied by "+format(tmp.c.buyables["compress2"].effect2)+"x<br>Space and Clock gains are multiplied by "+format(tmp.c.buyables["compress2"].effect2.pow(10))+"x</span>"}],"blank",["buyable","compress2"]],
				unlocked(){return hasMilestone("c",7)}
			}
		},
		stuff2: {
			"Main":{
				content: [["display-text", function() {return player.c.crazymatters.gte(Decimal.pow(2, 1024))&&player.c.infinities.eq(0)?"It seems like you have managed to reach the Infinity despite multiple obstacles on your way...<br><br>Huh? You've gone far past that before?<br>Well, it may be true outside this realm, but there are limitations that doesn't let you progress any further.<br><br>All you can do now is<br><br><br>":""}], ["display-text", function() {return player.c.infinities.gte(1)?"<span>You have <h2 style='color: rgba("+format(Math.sin(player.a.sine*2.5)*63+192)+", "+format(Math.sin(player.a.sine*3.3)*127+128)+", "+format(Math.sin(player.a.sine.add(3.14))*192)+", 1); text-shadow: rgba("+format(Math.sin(player.a.sine*2.5)*63+192)+", "+format(Math.sin(player.a.sine*3.3)*127+128)+", "+format(Math.sin(player.a.sine.add(3.14))*192)+", 1) 0px 0px 10px;'>"+formatWhole(player.c.infinityPoints)+"</h2> infinity points</span><br>You've infinitied "+formatWhole(player.c.infinities)+" times":""}], "blank", ["row", [["buyable", "lol"], ["clickable", 12]]], "blank", ["buyable", "infinite"], "blank", "upgrades", ["buyable", "extra"]],
			},
			"Infinite Challenges":{
				content: [["display-text", function() {return player.c.infinities.gte(1)?"<span>You have <h2 style='color: rgba("+format(Math.sin(player.a.sine*2.5)*63+192)+", "+format(Math.sin(player.a.sine*3.3)*127+128)+", "+format(Math.sin(player.a.sine.add(3.14))*192)+", 1); text-shadow: rgba("+format(Math.sin(player.a.sine*2.5)*63+192)+", "+format(Math.sin(player.a.sine*3.3)*127+128)+", "+format(Math.sin(player.a.sine.add(3.14))*192)+", 1) 0px 0px 10px;'>"+formatWhole(player.c.infinityPoints)+"</h2> infinity points</span><br>You've infinitied "+formatWhole(player.c.infinities)+" times<br>You've beaten "+formatWhole(infiniteChallenges())+" infinite challenges, each increasing IP base gain by 1 and counting as 1 achievement":""}], "blank", "challenges"],
				unlocked(){return hasMilestone("c", 3)}
			},
			"COMPRESSION ZONE":{
				content: [["microtabs", "stuff", {'border-color': 'rgba(0,0,0,0)'}]],
				unlocked(){return hasMilestone("c", 5)}
			},
		}
	},
	tabFormat:{
		"Normal":{
			content: ["main-display", ["row", ["prestige-button", ["clickable", 11]]], ["blank", ["0px", "4px"]], ["display-text", function() {return "You have "+formatWhole(tmp.c.baseAmount)+" "+tmp.s.baseResource+"<br>You have "+formatWhole(player.c.crazymatters)+" crazy matters, which boost your point gain by "+format(tmp.c.effect)+"x"+(inChallenge("c", 41)?"<br>You have "+formatWhole(player.c.antimatter)+" antimatters, increasing by "+format(tmp.c.antimatterRatio.add(1))+"x per second.":"")}], "blank",["milestones",[0,1,2,3,4,5,6,7,8,9,10]], ["buyable", 00], "blank", "buyables"]
		},
		"Autobuyers":{
			content: ["main-display", "blank", "buyables"],
			unlocked(){return hasMilestone("c", 2)}
		},
		"Infinite":{
			content: [["microtabs", "stuff2", {'border-color': 'rgba(0,0,0,0)'}]],
			unlocked(){return player.c.crazymatters.gte(Decimal.pow(2, 1024))||player.c.infinities.gte(1)||hasMilestone("c","c2")}
		},
		"Crescent":{
			content: [["display-text", function() {return "<span>You have <h2 style='color: lightcyan; text-shadow: lightcyan 0px 0px 10px'>"+formatWhole(player.c.crescentmoons)+"</h2> crescent moons</span><br>You have made "+formatWhole(player.c.crescentmoonsTotal)+" crescent moons in total, remnants of which produce "+format(tmp.c.crescentGain)+" crescent croissants per second.<br>Also you have "+format(player.c.crescentenergy)+" crscent croissants, which boost space, time, cranenium and infinity point gain by "+format(tmp.c.crescentEffect)+"x"}],"blank",["row", [["buyable", "ez"], ["clickable", 13]]],"blank",["milestones",["c1","c2","c3","c4"]],["display-text", function() {return hasMilestone("c","c2")?`<h2>Your current Synergy Combo is...<br></h2><h2 style='color: `+(tmp.c.gimmeEpicGamerCombo==0?'':rgbToHex((tmp.c.gimmeEpicGamerCombo==1||tmp.c.gimmeEpicGamerCombo==3||tmp.c.gimmeEpicGamerCombo==4?255:0),(tmp.c.gimmeEpicGamerCombo==1||tmp.c.gimmeEpicGamerCombo==2||tmp.c.gimmeEpicGamerCombo==4?255:0),(tmp.c.gimmeEpicGamerCombo==2||tmp.c.gimmeEpicGamerCombo==3||tmp.c.gimmeEpicGamerCombo==4?255:0)))+`; text-shadow: `+rgbToHex((tmp.c.gimmeEpicGamerCombo==1||tmp.c.gimmeEpicGamerCombo==3||tmp.c.gimmeEpicGamerCombo==4?255:0),(tmp.c.gimmeEpicGamerCombo==1||tmp.c.gimmeEpicGamerCombo==2||tmp.c.gimmeEpicGamerCombo==4?255:0),(tmp.c.gimmeEpicGamerCombo==2||tmp.c.gimmeEpicGamerCombo==3||tmp.c.gimmeEpicGamerCombo==4?255:0))+` 0px 0px 10px'>[${tmp.c.crescentCombo[tmp.c.gimmeEpicGamerCombo]}]</h2><br>${tmp.c.crescentComboDescription[tmp.c.gimmeEpicGamerCombo]}<br><br>`:``}],"respec-button","blank",["row", [["buyable", ["CB1"]],"blank",["buyable", ["CB2"]],"blank",["buyable", ["CB3"]]]]],
			buttonStyle(){return{'border-color':(inChallenge("c",51)&&player.c.buyables[41].gte(8)?"#00FF00":'lightcyan')}},
			unlocked(){return hasMilestone("c",10)||hasAchievement("c",42)}
		},
		"Achievements":{
			content: [["display-text", function(){return `<h3>You have ${formatWhole(player.c.achievements.length)}`+(infiniteChallenges().gte(1)?" (+"+formatWhole(infiniteChallenges())+")":"")+` achievements, boosting your dimension's multiplier base by ${format(Decimal.pow(1.0591341621268264, infiniteChallenges().add(player.c.achievements.length)))}x`}], "blank", ["row", [["achievement", [11]],["achievement", [12]],["achievement", [13]],["achievement", [14]],["achievement", [15]],["achievement", [16]]]],["row", [["achievement", [17]],["achievement", [18]],["achievement", [21]],["achievement", [22]],["achievement", [23]],["achievement", [24]]]],["row", [["achievement", [25]],["achievement", [26]],["achievement", [27]],["achievement", [28]],["achievement", [31]],["achievement", [32]]]],["row", [["achievement", [33]],["achievement", [34]],["achievement", [35]],["achievement", [36]],["achievement", [37]],["achievement", [38]]]],["row", [["achievement", [41]],["achievement", [42]],["achievement", [43]],["achievement", [44]],["achievement", [45]],["achievement", [46]]]],["row", [["achievement", [47]]]]],
			unlocked(){return !options.assholeMode}
		}
	},
    color(){return inChallenge("c",51)&&player.c.buyables[41].gte(8)?"#00FF00":hasAchievement("c",42)?"#e0ffff":"#7F7F7F"},
    requires(){return ((player.s.upgrades.length >= 6 && player.t.upgrades.length >= 6)||player.c.unlocked)?new Decimal(4970000):new Decimal("1e600000")}, // Can be a function that takes requirement increases into account
    resource: "craneniums", // Name of prestige currency
    baseResource(){return options.why?"points":"negative points"}, // Name of resource prestige is based on
    baseAmount() {return options.why?player.points:player.ab.negativePoints}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.095775, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult.mul(tmp.c.crescentEffect).mul(tmp.c.gimmeEpicGamerCombo==1||tmp.c.gimmeEpicGamerCombo==2?5:1)
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	tooltipLocked(){return "Reach 4,970,000 "+(options.why?"":"negative ")+"points and complete Space and Time layers to unlock"},
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "C: Reset for craneniums", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	update(diff){
		player.c.infinityTime = player.c.infinityTime.add(diff)
		player.c.crescentTime = player.c.crescentTime.add(diff)
		if(player.c.crazymatters.lt(Decimal.pow(2, 1024))||hasAchievement("c",41)){
			player.c.crazymatters = player.c.crazymatters.add(tmp.c.buyables[11].effect.mul(diff))
			for(i=1;i<21;i++){
				player.c.buyables[i*10+1] = player.c.buyables[i*10+1].add(tmp.c.buyables[(1+i)*10+1].effect.mul(diff))
				if(player.c.autobuy[i-1]&&tmp.c.buyables[i*10+1].canAfford&&player.c.bester[i+(hasMilestone("c","c3")?-1:7)]>=1) {
					tmp.c.buyables[i*10+1].buy()
				}
			}
		}
		if(hasAchievement("c",42)) player.c.crescentenergy = player.c.crescentenergy.add(tmp.c.crescentGain.mul(diff))
		if(player.c.automateThisShit&&tmp.c.buyables["lol"].canAfford) tmp.c.buyables["lol"].buy()
		if(player.c.automateThisShit2&&tmp.c.buyables["compress"].canAfford) tmp.c.buyables["compress"].buy()
		if(hasMilestone("c",9)){
			for(i=1;i<21;i++){
				if(tmp.c.buyables[i*10+2].canAfford) player.c.buyables[i*10+2]=player.c.buyables[i*10+2].add(1)
			}
		}
		if(inChallenge("c", 41)){
			if(!(inChallenge("c", 51)&&player.c.buyables[41].gte(8)))player.c.antimatter = player.c.antimatter.mul(Decimal.add(1, tmp.c.antimatterRatio.mul(diff)))
			if(player.c.antimatter.gte(player.c.crazymatters)){
				for(i=1;i<21;i++){
					player.c.buyables[i*10+1] = new Decimal(0)
					player.c.buyables[i*10+2] = new Decimal(0)
					player.c.bought[i-1] = new Decimal(0)
					player.c.bester[i-1] = new Decimal(0)
					player.c.autobuy[i-1] = false
				}
				player.c.crazymatters = new Decimal(10)
				player.c.antimatter = new Decimal(1)
			}
		}
	},
	branches: [["s",3], ["t",3]],
    layerShown(){return (player.ab.points.gte(5) && !player.ab.fuckyou) || (player.ab.nostalgia && player.ab.fuckyou)||options.why},
	doReset(resettingLayer){
		if(player.ab.points.gte(5)) {
			player.points = new Decimal(17.77)
			player.ab.negativePoints = new Decimal(0)
		}
		if(tmp[resettingLayer].row > this.row){
			player[this.layer].points = new Decimal(0)
			for(i=1;i<21;i++){
				player.c.buyables[i*10+1] = new Decimal(0)
				player.c.buyables[i*10+2] = new Decimal(0)
				player.c.bought[i-1] = new Decimal(0)
				player.c.bester[i-1] = new Decimal(0)
				player.c.autobuy[i-1] = false
			}
			player.c.upgrades = []
			player.c.buyables["compress"] = new Decimal(0)
			player.c.buyables["compress2"] = new Decimal(0)
			player.c.challenges[11]=0
			player.c.challenges[12]=0
			player.c.challenges[13]=0
			player.c.challenges[21]=0
			player.c.challenges[22]=0
			player.c.challenges[23]=0
			player.c.challenges[31]=0
			player.c.challenges[32]=0
			player.c.challenges[33]=0
			player.c.challenges[41]=0
			player.c.challenges[42]=0
			player.c.challenges[43]=0
			player.c.challenges[51]=0
			player.c.bozo = false
			player.c.bestInfinity = new Decimal(999999999999999999999999999999999999)
			player.c.infinityTime = new Decimal(0)
			player.c.bestCrescent = new Decimal(999999999999999999999999999999999999)
			player.c.crescentTime = new Decimal(0)
			player.c.crazymatters = new Decimal(0)
			player.c.infinities = new Decimal(0)
		}
	},
	milestones: {
		0: {
			requirementDescription: "1 Cranenium",
			effectDescription: `And so, 675th Antimatter Dimension fan mod initiates<br>... Ahem, ten free Crazy Matter. Please.`,
			done() { return player.c.points.gte(1) },
			onComplete(){player.c.crazymatters=player.c.crazymatters.add(10)}
		},
		1: {
			requirementDescription: "1 8th Crazy Dimension",
			effectDescription: `Unlock space and time upgrades.`,
			done() { return player.c.buyables[81].gte(1) },
			unlocked(){return hasMilestone("c", 0)||hasAchievement("c", 42)}
		},
		2: {
			requirementDescription: "1 9th Crazy Dimension",
			effectDescription: `Unlocks autobuyers`,
			done() { return player.c.buyables[91].gte(1) },
			unlocked(){return hasMilestone("c", 1)||hasAchievement("c", 42)}
		},
		3: {
			requirementDescription: "10 Infinities",
			effectDescription: `Unlocks challenge`,
			done() { return player.c.infinities.gte(10)||hasMilestone("c","c2") },
			unlocked(){return hasMilestone("c", 2)||hasAchievement("c", 42)}
		},
		4: {
			requirementDescription: "100 Infinities",
			effectDescription: `Unlocks Infinity automator`,
			done() { return player.c.infinities.gte(100) },
			unlocked(){return hasMilestone("c", 2)||hasAchievement("c", 42)}
		},
		5: {
			requirementDescription: "6 Completed Infinite Challenges",
			effectDescription: `Unlocks new content`,
			done() { return infiniteChallenges().gte(6) },
			unlocked(){return hasMilestone("c", 3)||hasAchievement("c", 42)}
		},
		6: {
			requirementDescription: "16 Infinite Upgrades",
			effectDescription: `Unlocks rebuyable infinite upgrade`,
			done() { return player.c.upgrades.length>=16 },
			unlocked(){return hasMilestone("c", 3)||hasAchievement("c", 42)}
		},
		7: {
			requirementDescription: "4 Infinte Compressions",
			effectDescription: `Unlocks another compressor`,
			done() { return player.c.buyables["compress"].gte(4) },
			unlocked(){return hasMilestone("c", 5)||hasAchievement("c", 42)}
		},
		8: {
			requirementDescription: "12 Completed Infinite Challenges",
			effectDescription: `Unlocks final infinite challenge`,
			done() { return infiniteChallenges().gte(12) },
			unlocked(){return hasMilestone("c", 3)||hasAchievement("c", 42)}
		},
		9: {
			requirementDescription: "1e2500 crazymatters",
			effectDescription: `Ascension no longer resets and you automatically purchase them`,
			done() { return player.c.crazymatters.gte("1e2500") },
			unlocked(){return hasAchievement("c", 41)}
		},
		10: {
			requirementDescription: "10 ICCs",
			effectDescription: `Alright, alright. Here's the REAL kicker<br>Unlocks Crescent`,
			done() { return player.c.buyables["compress2"].gte(10)||hasAchievement("c", 42)},
			unlocked(){return hasMilestone("c", 9)||hasAchievement("c", 42)}
		},
		c1: {
			requirementDescription: "1 total crescent moon",
			effectDescription: `Dimensions in Space layer cost nothing and you automatically purchase them`,
			done() { return player.c.crescentmoonsTotal.gte(1)},
			unlocked(){return hasMilestone("c", 9)||hasAchievement("c", 42)}
		},
		c2: {
			requirementDescription: "4 total crescent moons",
			effectDescription: `You start off with all Infinity Challenges completed on Crescent reset and unlocks Synergy Combo`,
			done() { return player.c.crescentmoonsTotal.gte(4)},
			unlocked(){return hasMilestone("c", 9)||hasAchievement("c", 42)}
		},
		c3: {
			requirementDescription: "13 total crescent moons",
			effectDescription: `You unlock autobuyer much earlier and Infinity Compressor Compressor no longer resets your Infinity Compressors`,
			done() { return player.c.crescentmoonsTotal.gte(13)},
			unlocked(){return hasMilestone("c", 9)||hasAchievement("c", 42)}
		},
		c4: {
			requirementDescription: "40 total crescent moons",
			effectDescription: `<br><h1>[ENDGAME]</h1><h5>(i ran out of ideas please forgive me for the lack of content nostalgia fans)`,
			done() { return player.c.crescentmoonsTotal.gte(40)},
			unlocked(){return hasMilestone("c", 9)||hasAchievement("c", 42)}
		},
	},
	upgrades: {
		11: {
			description: "First three crazy dimensions are stronger based on infinities",
			cost: new Decimal(1),
			effect(){return player.c.infinities.add(1).log(8).add(1)},
			effectDisplay(){return format(this.effect())+"x"},
			currencyInternalName: "infinityPoints",
			currencyDisplayName: "infinity points",
			currencyLayer: "c",
		},
		21: {
			description: "4th, 5th and 6th crazy dimensions are stronger based on infinities",
			cost: new Decimal(1),
			effect(){return player.c.infinities.add(1).log(11).add(1)},
			effectDisplay(){return format(this.effect())+"x"},
			canAfford(){return hasUpgrade("c", 11)},
			currencyInternalName: "infinityPoints",
			currencyDisplayName: "infinity points",
			currencyLayer: "c",
		},
		31: {
			description: "7th, 8th crazy dimensions are stronger based on infinities",
			cost: new Decimal(2),
			effect(){return player.c.infinities.add(1).log(14).add(1)},
			effectDisplay(){return format(this.effect())+"x"},
			canAfford(){return hasUpgrade("c", 21)},
			currencyInternalName: "infinityPoints",
			currencyDisplayName: "infinity points",
			currencyLayer: "c",
		},
		41: {
			description: "9th, 10th and 11th crazy dimensions are stronger based on infinities",
			cost: new Decimal(5),
			effect(){return player.c.infinities.add(1).log(17).add(1)},
			effectDisplay(){return format(this.effect())+"x"},
			canAfford(){return hasUpgrade("c", 31)},
			currencyInternalName: "infinityPoints",
			currencyDisplayName: "infinity points",
			currencyLayer: "c",
		},
		12: {
			description: "Crazy dimensions are stronger based on total time spent playing",
			cost: new Decimal(5),
			effect(){return new Decimal(player.timePlayed).log(10)},
			effectDisplay(){return format(this.effect())+"x"},
			currencyInternalName: "infinityPoints",
			currencyDisplayName: "infinity points",
			currencyLayer: "c",
		},
		22: {
			description: "Base multipliers are stronger<br>[2x => 2.2x]",
			cost: new Decimal(10),
			canAfford(){return hasUpgrade("c", 12)},
			currencyInternalName: "infinityPoints",
			currencyDisplayName: "infinity points",
			currencyLayer: "c",
		},
		32: {
			description: "Crazy dimension gain additional boost based on time spent in Infinity",
			cost: new Decimal(20),
			effect(){return player.c.infinityTime.add(1).root(3).log(3).add(1)},
			effectDisplay(){return format(this.effect())+"x"},
			canAfford(){return hasUpgrade("c", 22)},
			currencyInternalName: "infinityPoints",
			currencyDisplayName: "infinity points",
			currencyLayer: "c",
		},
		42: {
			description: "Space's and clock's magnitudes multiply crazymatter gain",
			cost: new Decimal(40),
			canAfford(){return hasUpgrade("c", 32)},
			effect(){return player.t.points.add(1).log(10).add(1).mul(player.s.points.add(1).log(10).add(1))},
			effectDisplay(){return format(this.effect())+"x"},
			currencyInternalName: "infinityPoints",
			currencyDisplayName: "infinity points",
			currencyLayer: "c",
		},
		13: {
			description: "Clocks are stronger based on unspent infinity points",
			cost: new Decimal(6),
			effect(){return player.c.infinityPoints.add(1).log(12).add(1)},
			effectDisplay(){return format(this.effect())+"x"},
			currencyInternalName: "infinityPoints",
			currencyDisplayName: "infinity points",
			currencyLayer: "c",
		},
		23: {
			description: "Total size boosts space gain",
			cost: new Decimal(11),
			effect(){return tmp.s.lеngth.mul(tmp.s.height).mul(tmp.s.width.lt(0)?tmp.s.width.mul(-1):tmp.s.width).mul(tmp.s.spissitude).add(1).log(10).add(1)},
			effectDisplay(){return format(this.effect())+"x"},
			canAfford(){return hasUpgrade("c", 13)},
			currencyInternalName: "infinityPoints",
			currencyDisplayName: "infinity points",
			currencyLayer: "c",
		},
		33: {
			description: "Dimension Boosters are cheaper based on your best infinity",
			cost: new Decimal(21),
			effect(){return new Decimal(2000000).root(player.c.bestInfinity.add(0.8).root(3).max(1))},
			effectDisplay(){return format(this.effect())+"/"},
			canAfford(){return hasUpgrade("c", 23)},
			currencyInternalName: "infinityPoints",
			currencyDisplayName: "infinity points",
			currencyLayer: "c",
		},
		43: {
			description: "Crazymatter boosts clock and space gain",
			cost: new Decimal(69),
			effect(){return player.c.crazymatters.add(1).root(10).log(10).add(1)},
			effectDisplay(){return format(this.effect())+"x"},
			canAfford(){return hasUpgrade("c", 33)},
			currencyInternalName: "infinityPoints",
			currencyDisplayName: "infinity points",
			currencyLayer: "c",
		},
		14: {
			description: "You start Infinity with 1 8th crazy dimension",
			cost: new Decimal(50),
			currencyInternalName: "infinityPoints",
			currencyDisplayName: "infinity points",
			currencyLayer: "c",
		},
		24: {
			description: "You start Infinity with 1 9th crazy dimension",
			cost: new Decimal(100),
			canAfford(){return hasUpgrade("c", 14)},
			currencyInternalName: "infinityPoints",
			currencyDisplayName: "infinity points",
			currencyLayer: "c",
		},
		34: {
			description: "You start Infinity with 1 10th crazy dimension and keep available autobuyers active",
			cost: new Decimal(250),
			canAfford(){return hasUpgrade("c", 24)},
			currencyInternalName: "infinityPoints",
			currencyDisplayName: "infinity points",
			currencyLayer: "c",
		},
		44: {
			description: "You start Infinity with 1 11th crazy dimension and base formula is better<br>[C => C^1.25]",
			cost: new Decimal(500),
			canAfford(){return hasUpgrade("c", 34)},
			currencyInternalName: "infinityPoints",
			currencyDisplayName: "infinity points",
			currencyLayer: "c",
		},
	},
	achievements: {
		11: {
			name: "<h4>We have to start off somewhere, right?",
			done(){return !options.assholeMode&& player.c.buyables[11].gte(1)},
			tooltip: "Buy 1st Crazy Dimension",
		},
		12: {
			name: "<h4>Crazy Recursion",
			done(){return !options.assholeMode&& player.c.buyables[21].gte(1)},
			tooltip: "Buy 2nd Crazy Dimension",
		},
		13: {
			name: "<h4>NO 3RD SHENANIGANS TREE INSTALLMENT?",
			done(){return !options.assholeMode&& player.c.buyables[31].gte(1)},
			tooltip: "Buy 3rd Crazy Dimension",
		},
		14: {
			name: "<h4>*insert 2nd piss joke here*",
			done(){return !options.assholeMode&& player.c.buyables[41].gte(1)},
			tooltip: "Buy 4th Crazy Dimension",
		},
		15: {
			name: "<h4>Go Go Crazy Rangers!",
			done(){return !options.assholeMode&& player.c.buyables[51].gte(1)},
			tooltip: "Buy 5th Crazy Dimension",
		},
		16: {
			name: "<h4>We couldn't afford 9",
			done(){return !options.assholeMode&& player.c.buyables[61].gte(1)},
			tooltip: "Buy 6th Crazy Dimension",
		},
		17: {
			name: "<h4>No longer limited to 7 achievements per row",
			done(){return !options.assholeMode&& player.c.buyables[71].gte(1)},
			tooltip: "Buy 7th Crazy Dimension",
		},
		18: {
			name: "<h4>-90 degrees to infinity",
			done(){return !options.assholeMode&& player.c.buyables[81].gte(1)},
			tooltip: "Buy 8th Crazy Dimension",
		},
		21: {
			name: "<h4>The hell is this?",
			done(){return !options.assholeMode&& player.c.buyables[12].gte(1)||player.c.buyables[22].gte(1)||player.c.buyables[32].gte(1)||player.c.buyables[42].gte(1)||player.c.buyables[52].gte(1)||player.c.buyables[62].gte(1)},
			tooltip: "Ascend for the first time",
		},
		22: {
			name: "<h4>Is that even legal?",
			done(){return !options.assholeMode&& player.c.buyables[91].gte(1)},
			tooltip: "Buy 9th Crazy Dimension",
		},
		23: {
			name: "<h4>Seems about right",
			done(){return !options.assholeMode&& player.c.buyables[101].gte(1)},
			tooltip: "Buy 10th Crazy Dimension",
		},
		24: {
			name: "<h4>The One Above All",
			done(){return !options.assholeMode&& player.c.buyables[111].gte(1)},
			tooltip: "Buy 11th Crazy Dimension",
		},
		25: {
			name: "<h4>infinity wip name<br></h4><h5>(wait 5 hours)",
			done(){return !options.assholeMode&&player.c.infinities.gte(1)},
			tooltip: "Reach Infinity",
		},
		26: {
			name: "<h4>WAY PAST FAST",
			done(){return !options.assholeMode&&player.c.bozo},
			tooltip: "Reach Infinity without ever ascending in 10 seconds or less",
		},
		27: {
			name: "<h4>Daredevil",
			done(){return !options.assholeMode&&infiniteChallenges().gte(1)},
			tooltip: "Beat one of Infinity Challenges",
		},
		28: {
			name: "<h4>no no no NO<br>NOOOOOOO!!!<br>I JUST BOUGHT IT YESTERDAY!",
			done(){return !options.assholeMode&&player.c.buyables[12].gte(15)},
			tooltip: "Ascend 1st Crazy Dimension 15 times",
		},
		31: {
			name: "<h4>huh?",
			done(){return !options.assholeMode&&player.pClassic.normalPoints.gte(Decimal.tetrate(10, 310))},
			tooltip: "Reach 1.78F308 points",
		},
		32: {
			name: "<h4>IS THAT ALL YOU GOT?",
			done(){return !options.assholeMode&&infiniteChallenges().gte(6)},
			tooltip: "Beat 6 Infinite Challenges",
		},
		33: {
			name: "<h4>Not quite a millionaire",
			done(){return !options.assholeMode&&player.c.points.gte(100000)},
			tooltip: "Reach 100,000 craneniums",
		},
		34: {
			name: "<h4>Compressed^2<br><br>=<br><br>Condensed",
			done(){return !options.assholeMode&&player.c.buyables["compress"].gte(2)},
			tooltip: "Compress Infinity twice",
		},
		35: {
			name: "<h4>Outran the Grim Reaper",
			done(){return !options.assholeMode&&player.c.bestInfinity.lte(4)&&(player.c.autobuy[0]==false&&player.c.autobuy[1]==false&&player.c.autobuy[2]==false)},
			tooltip: "Reach Infinity without autobuyers in 4 seconds",
		},
		36: {
			name: "<h4>You are Googologist, Harry.",
			done(){return !options.assholeMode&&tmp.c.baseAmount.gte(Decimal.pow(10,100))&&player.c.unlocked},
			tooltip: "Reach "+(options.why?"":"-")+"1e100 points",
		},
		37: {
			name: "<h4>FUCK YOU",
			done(){return !options.assholeMode&&hasChallenge("c",51)},
			tooltip: "Beat Infinite Challenge 13",
		},
		38: {
			name: "<h4>Not even worth buying",
			done(){
				let check=false
				for(i=1;i<21;i++){
					if(player.c.buyables[i*10+2].gte(1))check=true
				}
				return !options.assholeMode&&check&&player.c.buyables["compress"].gte(12)
			},
			tooltip: "Ascend with 12 infinite compressions or more",
		},
		41: {
			name: "<h4>haha funny number",
			done(){return !options.assholeMode&&player.c.buyables["compress"].gte(6)&&player.c.buyables["compress2"].gte(9)},
			tooltip: "get it?<br>Reward: Break Infinity.",
		},
		42: {
			name: "<h4>New Era Begins",
			done(){return !options.assholeMode&&player.c.crescentmoons.gte(1)},
			tooltip: "Get 1 crescent moon",
		},
		43: {
			name: "<h4>And what I'm supposed to do with these?",
			done(){return !options.assholeMode&&player.c.crescentenergy.gte(1000)},
			tooltip: "Reach 1,000 crescent croissant.",
		},
		44: {
			name: "<h4>Reject Negativity",
			done(){return !options.assholeMode&&tmp.c.baseAmount.gte(Decimal.pow(2,1024))&&!hasUpgrade("s",33)},
			tooltip: "Reach "+(options.why?"":"-")+"1.78e308 points without Negative Zone",
		},
		45: {
			name: "<h4>Reject Negativity",
			done(){return !options.assholeMode&&player.c.buyables["CB1"].gte(1)&&player.c.buyables["CB2"].gte(1)&&player.c.buyables["CB3"].gte(1)},
			tooltip: "Obtain all 3 Crescentables",
		},
		46: {
			name: "<h4>Personal Moon Wrecking Record",
			done(){return !options.assholeMode&&player.c.bestCrescent.lte(180)},
			tooltip: "Perform Crescent reset in 3 minutes or less",
		},
		47: {
			name: "<h4>uh",
			done(){return !options.assholeMode&&player.c.buyables[141].gte(1)},
			tooltip: "Buy 14th Crazy Dimension",
		},
	},
	buyables: {
		...gimmeManyDimensions(21),
		...nowGimmeDimensionUpgraders(21),
		...alrIReallyNeedAutobuyersSoooo(21),
		00: {
			title(){return "Buy all dimensions once"},
			cost(){return new Decimal(0)},
			canAfford(){return true},
			buy() {let fuckOffSTR = player.c.crazymatters
					for(i=1;i<21;i++){
				       if(fuckOffSTR.gte(tmp.c.buyables[i*10+1].cost)) {
						   if(!((inChallenge("c", 31)&&i>8)||(inChallenge("c", 43)&&i>4))){
								fuckOffSTR = fuckOffSTR.sub(tmp.c.buyables[i*10+1].cost)
								tmp.c.buyables[i*10+1].buy()
						   }
					   }
				  }
			},
			style(){return{'height':'50px','width':'250px'}}
		},
		lol: {
			display(){return `<span style='font-family:"Inconsolata", monospace, bold; font-size: 1.333em'>RESET.<br>RINSE.<br>REPEAT.<br><br>(+${formatWhole(this.gain())})`},
			canAfford() { return player.c.crazymatters.gte(Decimal.pow(2, 1024)) },
			gain(){return player.c.crazymatters.add(1).log("1.78e308").mul(tmp.c.buyables["extra"].effect.mul(infiniteChallenges().add(1)).mul(tmp.c.buyables["compress2"].effect2)).mul(tmp.c.crescentEffect).floor()},
			buy() {
				let OHMYFUCKINGGOD = player.c.crazymatters.add(1).log("1.78e308").mul(tmp.c.buyables["extra"].effect.mul(infiniteChallenges().add(1)).mul(tmp.c.buyables["compress2"].effect2)).mul(tmp.c.crescentEffect).floor()
				player.c.infinities = player.c.infinities.add(hasAchievement("a", 1014)?OHMYFUCKINGGOD:1)
				player.c.infinityPoints = player.c.infinityPoints.add(OHMYFUCKINGGOD)
				let keep = [player.c.autobuy[0],player.c.autobuy[1],player.c.autobuy[2],player.c.autobuy[3],player.c.autobuy[4],player.c.autobuy[5],player.c.autobuy[6],player.c.autobuy[7],player.c.autobuy[8],player.c.autobuy[9]]
				let lol = new Decimal(0)
				for(i=1;i<21;i++){
					lol = lol.add(player.c.buyables[i*10+2])
					player.c.buyables[i*10+1] = new Decimal(0)
					player.c.buyables[i*10+2] = new Decimal(0)
					player.c.bought[i-1] = new Decimal(0)
					if(!hasMilestone("c","c3")) player.c.bester[i-1] = new Decimal(0)
					if(!hasMilestone("c","c3")) player.c.autobuy[i-1] = false
				}
				if(lol.eq(0)&&player.c.infinityTime.lte(10)) player.c.bozo = true
				player.c.bestInfinity = player.c.bestInfinity.min(player.c.infinityTime)
				player.c.infinityTime = new Decimal(0)
				player.c.crazymatters = new Decimal(10)
				if(hasUpgrade("c", 14)){
					player.c.bought[7] = new Decimal(1)
					player.c.bester[7] = new Decimal(1)
					player.c.buyables[81] = new Decimal(1)
				}
				if(hasUpgrade("c", 24)){
					player.c.bought[8] = new Decimal(1)
					player.c.bester[8] = new Decimal(1)
					player.c.buyables[91] = new Decimal(1)
				}
				if(hasUpgrade("c", 34)){
					player.c.autobuy[0] = keep[0]
					player.c.autobuy[1] = keep[1]
					player.c.autobuy[2] = keep[2]
					player.c.autobuy[3] = keep[3]
					player.c.autobuy[4] = keep[4]
					player.c.autobuy[5] = keep[5]
					player.c.autobuy[6] = keep[6]
					player.c.autobuy[7] = keep[7]
					player.c.autobuy[8] = keep[8]
					player.c.autobuy[9] = keep[9]
					player.c.bought[9] = new Decimal(1)
					player.c.bester[9] = new Decimal(1)
					player.c.buyables[101] = new Decimal(1)
				}
				if(hasUpgrade("c", 44)){
					player.c.bought[10] = new Decimal(1)
					player.c.buyables[111] = new Decimal(1)
				}
			},
			style(){return{'height':'120px', 'width':'180px', 'border-radius': '25%', 'border': '4px solid', 'border-color': 'rgba(0, 0, 0, 0.125)',"border-radius":"25% 0px 0px 25%"}},
			unlocked(){return true}
		},
		ez: {
			display(){return `<span style='font-family:"Inconsolata", monospace, bold; font-size: 1.333em'>Completely and utterly destroy Infinity for +${formatWhole(this.gain())} crescent moons<br><br>Next at ${format(this.getNextAt())} infinity points`},
			canAfford() {return player.c.infinityPoints.gte(100000)},
			getNextAt(){return this.gain().add(1).root(0.3010299956639812).mul(100000).max(100000)},
			gain(){return player.c.infinityPoints.div(100000).pow(0.3010299956639812).floor()},
			buy() {
				player.c.crescentmoons = player.c.crescentmoons.add(this.gain())
				player.c.crescentmoonsTotal = player.c.crescentmoonsTotal.add(this.gain())
				for(i=1;i<21;i++){
					player.c.buyables[i*10+1] = new Decimal(0)
					player.c.buyables[i*10+2] = new Decimal(0)
					player.c.bought[i-1] = new Decimal(0)
					if(!hasMilestone("c","c3")) player.c.bester[i-1] = new Decimal(0)
					if(!hasMilestone("c","c3")) player.c.autobuy[i-1] = false
				}
				player.c.bestCrescent = player.c.bestCrescent.min(player.c.crescentTime)
				player.c.crescentTime = new Decimal(0)
				player.c.automateThisShit = false
				player.c.automateThisShit2 = false
				player.c.infinityPoints = new Decimal(0)
				player.c.infinities = new Decimal(0)
				player.c.bestInfinity = new Decimal(999999999999999999999999999999999999)
				player.c.infinityTime = new Decimal(0)
				player.c.buyables["compress"] = new Decimal(0)
				player.c.buyables["compress2"] = new Decimal(0)
				player.c.buyables["extra"] = new Decimal(0)
				player.c.challenges[11] = 0
				player.c.challenges[12] = 0
				player.c.challenges[13] = 0
				player.c.challenges[21] = 0
				player.c.challenges[22] = 0
				player.c.challenges[23] = 0
				player.c.challenges[31] = 0
				player.c.challenges[32] = 0
				player.c.challenges[33] = 0
				player.c.challenges[41] = 0
				player.c.challenges[42] = 0
				player.c.challenges[43] = 0
				player.c.challenges[51] = 0
				player.c.crazymatters = new Decimal(0)
				player.c.points = new Decimal(0)
				player.c.milestones = []
				player.c.upgrades = []
				doReset("c",true)
				if(hasMilestone("c","c3")||player.c.crescentmoonsTotal.gte(4)){
					player.c.challenges[11] = 1
					player.c.challenges[12] = 1
					player.c.challenges[13] = 1
					player.c.challenges[21] = 1
					player.c.challenges[22] = 1
					player.c.challenges[23] = 1
					player.c.challenges[31] = 1
					player.c.challenges[32] = 1
					player.c.challenges[33] = 1
					player.c.challenges[41] = 1
					player.c.challenges[42] = 1
					player.c.challenges[43] = 1
					player.c.challenges[51] = 1
				}
			},
			style(){return{'background-color':(this.canAfford()?'lightcyan':''),'height':'120px', 'width':'180px', 'border-radius': '25%', 'border': '4px solid', 'border-color': 'rgba(0, 0, 0, 0.125)',"border-radius":"25% 0px 0px 25%"}},
			unlocked(){return true}
		},
		extra: {
			title(){return `2x IP Multiplier<br>Cost: ${format(this.cost())}<br>Multiplier: ${format(this.effect())}`},
			effect(){return Decimal.pow(2, player.c.buyables[this.id])},
			cost(){return Decimal.pow(10, player.c.buyables[this.id]).mul(10)},
			unlocked(){return hasMilestone("c", 6)},
			canAfford(){return player.c.infinityPoints.gte(this.cost())},
			buy() {
				player.c.infinityPoints = player.c.infinityPoints.sub(this.cost())
				player.c.buyables["extra"] = player.c.buyables["extra"].add(1)
			},
			style(){return{'height':'100px','width':'200px'}}
		},
		infinite: {
			title(){return `AUTOMATE INFINITY<br>${player.c.automateThisShit?"[ON]":"[OFF]"}`},
			canAfford(){return true},
			buy(){
				player.c.automateThisShit = !player.c.automateThisShit
				player.c.youStupid = true
			},
			style(){return{'height':'50px','width':'300px'}},
			unlocked(){return hasMilestone("c", 4)}
		},
		compress: {
			title(){return `<p style='transform: scale(1, 0.75)'><span style="font-family: Impact; font-size: 60px">COMPRESS INFINITY</span><br>`+(player.c.buyables["compress"].sub( player.c.buyables["compress2"]).lt(4)?``:`<span style="font-family: Impact; font-size: 20px;">(MAXIMUM CAPACITY REACHED)`)},
			canAfford(){return player.c.crazymatters.gte("1.78e308")&&player.c.buyables["compress"].sub( player.c.buyables["compress2"]).lt(4)},
			effect(){return player.c.buyables["compress"].add(1).pow(0.8)},
			buy(){
				let keep = [player.c.autobuy[0],player.c.autobuy[1],player.c.autobuy[2],player.c.autobuy[3],player.c.autobuy[4],player.c.autobuy[5],player.c.autobuy[6],player.c.autobuy[7],player.c.autobuy[8],player.c.autobuy[9]]
				for(i=1;i<21;i++){
					player.c.buyables[i*10+1] = new Decimal(0)
					player.c.buyables[i*10+2] = new Decimal(0)
					player.c.bought[i-1] = new Decimal(0)
					if(!hasMilestone("c","c3")) player.c.bester[i-1] = new Decimal(0)
					if(!hasMilestone("c","c3")) player.c.autobuy[i-1] = false
				}
				player.c.infinityTime = new Decimal(0)
				player.c.crazymatters = new Decimal(10)
				if(hasUpgrade("c", 14)){ player.c.bought[7] = new Decimal(1); player.c.buyables[81] = new Decimal(1)}
				if(hasUpgrade("c", 24)){ player.c.bought[8] = new Decimal(1); player.c.buyables[91] = new Decimal(1)}
				if(hasUpgrade("c", 34)){ player.c.bought[9] = new Decimal(1); player.c.buyables[101] = new Decimal(1)}
				if(hasUpgrade("c", 44)){ player.c.bought[10] = new Decimal(1); player.c.buyables[111] = new Decimal(1)}
				player.c.buyables["compress"]=player.c.buyables["compress"].add(1)
				if(hasUpgrade("c", 14)){
					player.c.bought[7] = new Decimal(1)
					player.c.bester[7] = new Decimal(1)
					player.c.buyables[81] = new Decimal(1)
				}
				if(hasUpgrade("c", 24)){
					player.c.bought[8] = new Decimal(1)
					player.c.bester[8] = new Decimal(1)
					player.c.buyables[91] = new Decimal(1)
				}
				if(hasUpgrade("c", 34)){
					player.c.autobuy[0] = keep[0]
					player.c.autobuy[1] = keep[1]
					player.c.autobuy[2] = keep[2]
					player.c.autobuy[3] = keep[3]
					player.c.autobuy[4] = keep[4]
					player.c.autobuy[5] = keep[5]
					player.c.autobuy[6] = keep[6]
					player.c.autobuy[7] = keep[7]
					player.c.autobuy[8] = keep[8]
					player.c.autobuy[9] = keep[9]
					player.c.bought[9] = new Decimal(1)
					player.c.bester[9] = new Decimal(1)
					player.c.buyables[101] = new Decimal(1)
				}
				if(hasUpgrade("c", 44)){
					player.c.bought[10] = new Decimal(1)
					player.c.buyables[111] = new Decimal(1)
				}
			},
			canSellOne(){return player.c.buyables["compress"].gte(1)},
			sellOne(){
				if(!player.c.buyables["compress"].lte(0))player.c.buyables["compress"]=player.c.buyables["compress"].sub(1)
			},
			unlocked(){return hasMilestone("c", 5)},
			style(){return{'width':'500px','height':'100px','border-radius':'10%','text-shadow':(this.canAfford()?"rgba("+format(Math.sin(player.a.sine*2.5)*63+192)+", "+format(Math.sin(player.a.sine*3.3)*127+128)+", "+format(Math.sin(player.a.sine.add(3.14))*192)+") 0px 0px "+format(Math.sin(player.a.sine)*50+37.5)+"px":"#000000 0px 0px 0px")}}
		},
		compressAuto: {
			title(){return `<p style='transform: scale(1, 0.75)'><span style="font-family: Impact; font-size: 20px">AUTOMATE COMPRESSION<br>${player.c.automateThisShit2?"[ON]":"[OFF]"}`},
			canAfford(){return true},
			buy(){
				player.c.automateThisShit2 = !player.c.automateThisShit2
				player.c.youStupid2 = true
			},
			style(){return{'height':'50px','width':'300px'}},
			unlocked(){return player.c.buyables["compress2"].gte(1)||player.c.youStupid2}
		},
		compress2: {
			title(){return `<p style='transform: scale(1, 0.75)'><span style="font-family: Impact; font-size: 60px">COMPRESS COMPRESSION`},
			canAfford(){return player.c.buyables["compress"].sub( player.c.buyables["compress2"]).gte(4)},
			effect(){return Decimal.pow(0.9, player.c.buyables["compress2"])},
			effect2(){return Decimal.pow(1.583462602, Decimal.pow(player.c.buyables["compress2"], 0.9))},
			buy(){
				let keep = [player.c.autobuy[0],player.c.autobuy[1],player.c.autobuy[2],player.c.autobuy[3],player.c.autobuy[4],player.c.autobuy[5],player.c.autobuy[6],player.c.autobuy[7],player.c.autobuy[8],player.c.autobuy[9]]
				for(i=1;i<21;i++){
					player.c.buyables[i*10+1] = new Decimal(0)
					player.c.buyables[i*10+2] = new Decimal(0)
					player.c.bought[i-1] = new Decimal(0)
					if(!hasMilestone("c","c3")) player.c.bester[i-1] = new Decimal(0)
					if(!hasMilestone("c","c3")) player.c.autobuy[i-1] = false
				}
				player.c.infinityTime = new Decimal(0)
				player.c.crazymatters = new Decimal(10)
				if(hasUpgrade("c", 14)){ player.c.bought[7] = new Decimal(1); player.c.buyables[81] = new Decimal(1)}
				if(hasUpgrade("c", 24)){ player.c.bought[8] = new Decimal(1); player.c.buyables[91] = new Decimal(1)}
				if(hasUpgrade("c", 34)){ player.c.bought[9] = new Decimal(1); player.c.buyables[101] = new Decimal(1)}
				if(hasUpgrade("c", 44)){ player.c.bought[10] = new Decimal(1); player.c.buyables[111] = new Decimal(1)}
				if(!hasMilestone("c","c3")) player.c.buyables["compress"]=new Decimal(0)
				player.c.buyables["compress2"]=player.c.buyables["compress2"].add(1)
				if(hasUpgrade("c", 14)){
					player.c.bought[7] = new Decimal(1)
					player.c.bester[7] = new Decimal(1)
					player.c.buyables[81] = new Decimal(1)
				}
				if(hasUpgrade("c", 24)){
					player.c.bought[8] = new Decimal(1)
					player.c.bester[8] = new Decimal(1)
					player.c.buyables[91] = new Decimal(1)
				}
				if(hasUpgrade("c", 34)){
					player.c.autobuy[0] = keep[0]
					player.c.autobuy[1] = keep[1]
					player.c.autobuy[2] = keep[2]
					player.c.autobuy[3] = keep[3]
					player.c.autobuy[4] = keep[4]
					player.c.autobuy[5] = keep[5]
					player.c.autobuy[6] = keep[6]
					player.c.autobuy[7] = keep[7]
					player.c.autobuy[8] = keep[8]
					player.c.autobuy[9] = keep[9]
					player.c.bought[9] = new Decimal(1)
					player.c.bester[9] = new Decimal(1)
					player.c.buyables[101] = new Decimal(1)
				}
				if(hasUpgrade("c", 44)){
					player.c.bought[10] = new Decimal(1)
					player.c.buyables[111] = new Decimal(1)
				}
			},
			canSellOne(){return player.c.buyables["compress2"].gte(1)},
			sellOne(){
				let keep = player.c.autobuy
				for(i=1;i<21;i++){
					player.c.buyables[i*10+1] = new Decimal(0)
					player.c.buyables[i*10+2] = new Decimal(0)
					player.c.bought[i-1] = new Decimal(0)
					if(!hasMilestone("c","c3")) player.c.bester[i-1] = new Decimal(0)
					if(!hasMilestone("c","c3")) player.c.autobuy[i-1] = false
				}
				player.c.infinityTime = new Decimal(0)
				player.c.crazymatters = new Decimal(10)
				if(hasUpgrade("c", 14)){ player.c.bought[7] = new Decimal(1); player.c.buyables[81] = new Decimal(1)}
				if(hasUpgrade("c", 24)){ player.c.bought[8] = new Decimal(1); player.c.buyables[91] = new Decimal(1)}
				if(hasUpgrade("c", 34)){ player.c.bought[9] = new Decimal(1); player.c.buyables[101] = new Decimal(1)}
				if(hasUpgrade("c", 44)){ player.c.bought[10] = new Decimal(1); player.c.buyables[111] = new Decimal(1)}
				if(hasUpgrade("c", 14)){
					player.c.bought[7] = new Decimal(1)
					player.c.bester[7] = new Decimal(1)
					player.c.buyables[81] = new Decimal(1)
				}
				if(hasUpgrade("c", 24)){
					player.c.bought[8] = new Decimal(1)
					player.c.bester[8] = new Decimal(1)
					player.c.buyables[91] = new Decimal(1)
				}
				if(hasUpgrade("c", 34)){
					for(i=0;i<21;i++){
						player.c.autobuy[i] = keep[i]
					}
					player.c.bought[9] = new Decimal(1)
					player.c.bester[9] = new Decimal(1)
					player.c.buyables[101] = new Decimal(1)
				}
				if(hasUpgrade("c", 44)){
					player.c.bought[10] = new Decimal(1)
					player.c.buyables[111] = new Decimal(1)
				}
				if(!player.c.buyables["compress2"].lte(0)){
					player.c.buyables["compress"]=player.c.buyables["compress2"].add(3)
					player.c.buyables["compress2"]=player.c.buyables["compress2"].sub(1)
				}
			},
			unlocked(){return hasMilestone("c", 7)},
			style(){return{'width':'630px','height':'80px','border-radius':'10%','text-shadow':(this.canAfford()?"rgba("+format(Math.sin(player.a.sine*2.5)*63+286.5)+", "+format(Math.sin(player.a.sine*3.3)*127+318.5)+", "+format(Math.sin(player.a.sine.add(3.14))*192+351)+") 0px 0px "+format(Math.sin(player.a.sine)*10+10)+"px":"white 0px 0px 0px")}}
		},
		showRespec() { return hasAchievement("c",42)&&player.subtabs.c.mainTabs=='Crescent' },
		respecText() { return "Respec Crescentables" },
		respecMessage(){return `You sure you want to respec your crescentables? You'll gain ${formatWhole(player.c.crescentmoonsSpent)} back, but your progress will be reset as if you just performed Crescent reset.\n(and your crescent croissants will be divided by 1st Crescentable's second effect)`},
		respec() {
			player.c.crescentenergy=player.c.crescentenergy.div(tmp.c.buyables["CB1"].effect2)
			player.c.buyables["CB1"]=new Decimal(0)
			player.c.buyables["CB2"]=new Decimal(0)
			player.c.buyables["CB3"]=new Decimal(0)
			player.c.crescentmoons = player.c.crescentmoons.add(player.c.crescentmoonsSpent)
			player.c.crescentmoonsSpent=new Decimal(0)
				for(i=1;i<21;i++){
					player.c.buyables[i*10+1] = new Decimal(0)
					player.c.buyables[i*10+2] = new Decimal(0)
					player.c.bought[i-1] = new Decimal(0)
					if(!hasMilestone("c","c3")) player.c.bester[i-1] = new Decimal(0)
					if(!hasMilestone("c","c3")) player.c.autobuy[i-1] = false
				}
				player.c.automateThisShit = false
				player.c.automateThisShit2 = false
				player.c.infinityPoints = new Decimal(0)
				player.c.infinities = new Decimal(0)
				player.c.bestInfinity = new Decimal(999999999999999999999999999999999999)
				player.c.infinityTime = new Decimal(0)
				player.c.buyables["compress"] = new Decimal(0)
				player.c.buyables["compress2"] = new Decimal(0)
				player.c.challenges[11] = 0
				player.c.challenges[12] = 0
				player.c.challenges[13] = 0
				player.c.challenges[21] = 0
				player.c.challenges[22] = 0
				player.c.challenges[23] = 0
				player.c.challenges[31] = 0
				player.c.challenges[32] = 0
				player.c.challenges[33] = 0
				player.c.challenges[41] = 0
				player.c.challenges[42] = 0
				player.c.challenges[43] = 0
				player.c.challenges[51] = 0
				player.c.crazymatters = new Decimal(0)
				player.c.points = new Decimal(0)
				player.c.milestones = []
				player.c.upgrades = []
				doReset("c",true)
				if(hasMilestone("c","c3")||player.c.crescentmoonsTotal.gte(4)){
					player.c.challenges[11] = 1
					player.c.challenges[12] = 1
					player.c.challenges[13] = 1
					player.c.challenges[21] = 1
					player.c.challenges[22] = 1
					player.c.challenges[23] = 1
					player.c.challenges[31] = 1
					player.c.challenges[32] = 1
					player.c.challenges[33] = 1
					player.c.challenges[41] = 1
					player.c.challenges[42] = 1
					player.c.challenges[43] = 1
					player.c.challenges[51] = 1
				}
		},
		CB1: {
			title(){return `Early Game Boost`},
			effect(){return Decimal.pow(29.5305888531, player.c.buyables["CB1"].mul(tmp.c.buyables["CB3"].effect2).add(tmp.c.gimmeEpicGamerCombo==4?1:0).pow(0.295305888531))},
			effect2(){return player.c.buyables["CB1"].mul(tmp.c.buyables["CB3"].effect2).add(tmp.c.gimmeEpicGamerCombo==4?1:0).add(1).pow(2.95305888531)},
			display(){return `Your space and clock gain are multiplied by ${format(this.effect())}x and Your crescent croissants gain is multiplied by ${format(this.effect2())}x<br><br>Cost: ${formatWhole(this.cost())} crescent moons<br>Amount: ${formatWhole(player.c.buyables["CB1"])}`+(tmp.c.gimmeEpicGamerCombo==4?" (+1)":"")},
			cost(){return Decimal.pow(3, player.c.buyables["CB1"].add(player.c.buyables["CB2"]).add(player.c.buyables["CB3"]))},
			canAfford(){return player.c.crescentmoons.gte(this.cost())},
			buy(){
				player.c.crescentmoons=player.c.crescentmoons.sub(this.cost())
				player.c.crescentmoonsSpent=player.c.crescentmoonsSpent.add(this.cost())
				player.c.buyables["CB1"]=player.c.buyables["CB1"].add(1)
			},
			style(){return{'height':'160px','width':'160px'}}
		},
		CB2: {
			title(){return `Middle Game Boost`},
			effect(){return Decimal.pow(2.95305888531, player.c.buyables["CB2"].mul(tmp.c.buyables["CB3"].effect2).add(tmp.c.gimmeEpicGamerCombo==4?1:0).root(2.95305888531))},
			effect2(){return player.c.buyables["CB2"].mul(tmp.c.buyables["CB3"].effect2).add(tmp.c.gimmeEpicGamerCombo==4?1:0).root(1.295305888531).mul(2.95305888531)},
			display(){return `Your cranenium gain and Crazy Dimensions's production are multiplied by ${format(this.effect())}x and you passively gain ${format(this.effect2())}% of each time unit available per second<br><br>Cost: ${formatWhole(this.cost())} crescent moons<br>Amount: ${formatWhole(player.c.buyables["CB2"])}`+(tmp.c.gimmeEpicGamerCombo==4?" (+1)":"")},
			cost(){return Decimal.pow(3, player.c.buyables["CB1"].add(player.c.buyables["CB2"]).add(player.c.buyables["CB3"]))},
			canAfford(){return player.c.crescentmoons.gte(this.cost())},
			buy(){
				player.c.crescentmoons=player.c.crescentmoons.sub(this.cost())
				player.c.crescentmoonsSpent=player.c.crescentmoonsSpent.add(this.cost())
				player.c.buyables["CB2"]=player.c.buyables["CB2"].add(1)
			},
			style(){return{'height':'160px','width':'160px'}}
		},
		CB3: {
			title(){return `Late Game Boost`},
			effect(){return Decimal.pow(2.95305888531, player.c.buyables["CB3"].add(tmp.c.gimmeEpicGamerCombo==4?1:0))},
			effect2(){return player.c.buyables["CB3"].mul(tmp.c.gimmeEpicGamerCombo==2?3:1).add(tmp.c.gimmeEpicGamerCombo==4?1:0).add(1).root(2.95305888531)},
			display(){return `Multiplies the other two Crescentables's effective amount by ${format(this.effect2())}x and your point gain is ${format(this.effect())}x stronger<br><br>Cost: ${formatWhole(this.cost())} crescent moons<br>Amount: ${formatWhole(player.c.buyables["CB3"])}`+(tmp.c.gimmeEpicGamerCombo==4?" (+1)":"")},
			cost(){return Decimal.pow(3, player.c.buyables["CB1"].add(player.c.buyables["CB2"]).add(player.c.buyables["CB3"]))},
			canAfford(){return player.c.crescentmoons.gte(this.cost())},
			buy(){
				player.c.crescentmoons=player.c.crescentmoons.sub(this.cost())
				player.c.crescentmoonsSpent=player.c.crescentmoonsSpent.add(this.cost())
				player.c.buyables["CB3"]=player.c.buyables["CB3"].add(1)
			},
			style(){return{'height':'160px','width':'160px'}}
		},
	},
	challenges: {
		11: {
			name: "Infinite Challenge 1:<br>Vacuumless",
			challengeDescription: "Space layer does not exist.",
			canComplete: function() {return tmp.c.baseAmount.gte(500000000)},
			goalDescription(){return "500,000,000 "+tmp.c.baseResource},
			fullDisplay(){return `${this.challengeDescription}<br>Goal: ${this.goalDescription()}`},
			style(){return{'height':'224px','width':'256px','border-radius':'10%'}}
		},
		12: {
			name: "Infinite Challenge 2:<br>Order",
			challengeDescription: "C is always set to 1",
			canComplete: function() {return player.c.crazymatters.gte(Decimal.pow(2, 1024))},
			onEnter() {
				for(i=1;i<21;i++){
					player.c.buyables[i*10+1] = new Decimal(0)
					player.c.buyables[i*10+2] = new Decimal(0)
					player.c.bought[i-1] = new Decimal(0)
					player.c.bester[i-1] = new Decimal(0)
					player.c.autobuy[i-1] = false
				}
				player.c.crazymatters = new Decimal(10)
			},
			goalDescription: "1.78e308 crazymatters",
			fullDisplay(){return `${this.challengeDescription}<br>Goal: ${this.goalDescription}`},
			style(){return{'height':'224px','width':'256px','border-radius':'10%'}}
		},
		13: {
			name: "Infinite Challenge 3:<br>Freeflow",
			challengeDescription: "Time layer does not exist.",
			canComplete: function() {return tmp.c.baseAmount.gte(500000000)},
			goalDescription(){return "500,000,000 "+tmp.c.baseResource},
			fullDisplay(){return `${this.challengeDescription}<br>Goal: ${this.goalDescription()}`},
			style(){return{'height':'224px','width':'256px','border-radius':'10%'}}
		},
		21: {
			name: "Infinite Challenge 4:<br>Spacetime Malfunction",
			challengeDescription: "Space (total size's effect) and Time (hours's effect) layers nerf each other.",
			canComplete: function() {return tmp.c.baseAmount.gte("2.2e22")},
			goalDescription(){return "2.2e22 "+tmp.c.baseResource},
			fullDisplay(){return `${this.challengeDescription}<br>Goal: ${this.goalDescription()}`},
			style(){return{'height':'224px','width':'256px','border-radius':'10%'}}
		},
		22: {
			name: "Infinite Challenge 5:<br>Exploitable Economy",
			challengeDescription: "Buying crazy dimension will increase lower crazy dimensions's cost",
			canComplete: function() {return player.c.crazymatters.gte(Decimal.pow(2, 1024))},
			onEnter() {
				for(i=1;i<21;i++){
					player.c.buyables[i*10+1] = new Decimal(0)
					player.c.buyables[i*10+2] = new Decimal(0)
					player.c.bought[i-1] = new Decimal(0)
					player.c.bester[i-1] = new Decimal(0)
					player.c.autobuy[i-1] = false
				}
				player.c.crazymatters = new Decimal(10)
			},
			goalDescription: "1.78e308 crazymatters",
			fullDisplay(){return `${this.challengeDescription}<br>Goal: ${this.goalDescription}`},
			style(){return{'height':'224px','width':'256px','border-radius':'10%'}}
		},
		23: {
			name: "Infinite Challenge 6:<br>Reversal Tetration",
			challengeDescription: "Point gain is tetrated to 0.8409...",
			canComplete: function() {return tmp.c.baseAmount.gte("1e42")},
			onEnter() {
				for(i=1;i<21;i++){
					player.c.buyables[i*10+1] = new Decimal(0)
					player.c.buyables[i*10+2] = new Decimal(0)
					player.c.bought[i-1] = new Decimal(0)
					player.c.bester[i-1] = new Decimal(0)
					player.c.autobuy[i-1] = false
				}
				player.c.crazymatters = new Decimal(10)
			},
			goalDescription(){return "1e42 "+tmp.c.baseResource},
			fullDisplay(){return `${this.challengeDescription}<br>Goal: ${this.goalDescription()}`},
			style(){return{'height':'224px','width':'256px','border-radius':'10%'}}
		},
		31: {
			name: "Infinite Challenge 7:<br>Classic Antimatter Dimensions",
			challengeDescription: "There are only 8 crazy dimensions now.",
			canComplete: function() {return player.c.crazymatters.gte(Decimal.pow(2, 1024))},
			onEnter() {
				for(i=1;i<21;i++){
					player.c.buyables[i*10+1] = new Decimal(0)
					player.c.buyables[i*10+2] = new Decimal(0)
					player.c.bought[i-1] = new Decimal(0)
					player.c.bester[i-1] = new Decimal(0)
					player.c.autobuy[i-1] = false
				}
				player.c.crazymatters = new Decimal(10)
			},
			goalDescription: "1.78e308 crazymatters",
			fullDisplay(){return `${this.challengeDescription}<br>Goal: ${this.goalDescription}`},
			style(){return{'height':'224px','width':'256px','border-radius':'10%'}}
		},
		32: {
			name: "Infinite Challenge 8:<br>Absurdly Useless Layer",
			challengeDescription: "You start off with 0 crazymatters.",
			canComplete: function() {return tmp.c.baseAmount.gte("1e42")},
			onEnter() {
				for(i=1;i<21;i++){
					player.c.buyables[i*10+1] = new Decimal(0)
					player.c.buyables[i*10+2] = new Decimal(0)
					player.c.bought[i-1] = new Decimal(0)
					player.c.bester[i-1] = new Decimal(0)
					player.c.autobuy[i-1] = false
				}
				player.c.crazymatters = new Decimal(0)
			},
			onExit(){player.c.crazymatters = new Decimal(10)},
			goalDescription(){return "1e42 "+tmp.c.baseResource},
			fullDisplay(){return `${this.challengeDescription}<br>Goal: ${this.goalDescription()}`},
			style(){return{'height':'224px','width':'256px','border-radius':'10%'}}
		},
		33: {
			name: "Infinite Challenge 9:<br>what -1 row",
			challengeDescription: "Neither of them exists.",
			countsAs: [11,13],
			canComplete: function() {return tmp.c.baseAmount.gte(100000)},
			onEnter() {
				for(i=1;i<21;i++){
					player.c.buyables[i*10+1] = new Decimal(0)
					player.c.buyables[i*10+2] = new Decimal(0)
					player.c.bought[i-1] = new Decimal(0)
					player.c.bester[i-1] = new Decimal(0)
					player.c.autobuy[i-1] = false
				}
				player.c.crazymatters = new Decimal(10)
			},
			goalDescription(){return "100,000 "+tmp.c.baseResource},
			fullDisplay(){return `${this.challengeDescription}<br>Goal: ${this.goalDescription()}`},
			style(){return{'height':'224px','width':'256px','border-radius':'10%'}}
		},
		41: {
			name: "Infinite Challenge 10:<br>It doesn't even matter",
			challengeDescription: "Antimatter grows at exponential rate, but your crazy matter gain is square rooted.",
			canComplete: function() {return player.c.crazymatters.gte(Decimal.pow(2, 1024))},
			onEnter() {
				for(i=1;i<21;i++){
					player.c.buyables[i*10+1] = new Decimal(0)
					player.c.buyables[i*10+2] = new Decimal(0)
					player.c.bought[i-1] = new Decimal(0)
					player.c.bester[i-1] = new Decimal(0)
					player.c.autobuy[i-1] = false
				}
				player.c.crazymatters = new Decimal(10)
				player.c.antimatter = new Decimal(1)
			},
			onExit(){player.c.antimatter = new Decimal(-1)},
			goalDescription: "1.78e308 crazymatters",
			fullDisplay(){return `${this.challengeDescription}<br>Goal: ${this.goalDescription}`},
			style(){return{'height':'224px','width':'256px','border-radius':'10%'}}
		},
		42: {
			name: "Infinite Challenge 11:<br>Very Hard Donkey Kong",
			challengeDescription: "???",
			canComplete: function() {return player.pClassic.normalPoints.gte("1e120")},
			onEnter() {
				player.pClassic.normalPoints = new Decimal(10)
				player.pClassic.points = new Decimal(0)
				player.bClassic.points = new Decimal(0)
				player.bClassic.best = new Decimal(0)
				player.gClassic.points = new Decimal(0)
				player.gClassic.power = new Decimal(0)
				player.gClassic.best = new Decimal(0)
				player.eClassic.points = new Decimal(0)
				player.eClassic.spent = new Decimal(0)
				player.eClassic.power = new Decimal(0)
				player.bClassic.upgrades = []
				player.gClassic.upgrades = []
				player.pClassic.upgrades = []
				player.eClassic.upgrades = []
				player.bClassic.milestones = []
				player.gClassic.milestones = []
				player.eClassic.milestones = []
				player.eClassic.buyables[11] = new Decimal(0)
				player.eClassic.buyables[12] = new Decimal(0)
				player.eClassic.buyables[21] = new Decimal(0)
				player.eClassic.buyables[22] = new Decimal(0)
				player.eClassic.buyables[23] = new Decimal(0)
				player.bClassic.unlocked = false
				player.gClassic.unlocked = false
				player.eClassic.unlocked = false
				player.bClassic.auto=false
				player.gClassic.auto=false
			},
			onExit(){
				player.pClassic.normalPoints = new Decimal(10)
				player.pClassic.points = new Decimal(0)
				player.bClassic.points = new Decimal(0)
				player.bClassic.best = new Decimal(0)
				player.gClassic.points = new Decimal(0)
				player.gClassic.power = new Decimal(0)
				player.gClassic.best = new Decimal(0)
				player.eClassic.points = new Decimal(0)
				player.eClassic.spent = new Decimal(0)
				player.eClassic.power = new Decimal(0)
				player.bClassic.upgrades = []
				player.gClassic.upgrades = []
				player.pClassic.upgrades = []
				player.eClassic.upgrades = []
				player.bClassic.milestones = []
				player.gClassic.milestones = []
				player.eClassic.milestones = []
				player.eClassic.buyables[11] = new Decimal(0)
				player.eClassic.buyables[12] = new Decimal(0)
				player.eClassic.buyables[21] = new Decimal(0)
				player.eClassic.buyables[22] = new Decimal(0)
				player.eClassic.buyables[23] = new Decimal(0)
				player.bClassic.unlocked = false
				player.gClassic.unlocked = false
				player.eClassic.unlocked = false
				player.bClassic.auto=false
				player.gClassic.auto=false
			},
			onComplete() {
				player.pClassic.normalPoints = new Decimal(10)
				player.pClassic.points = new Decimal(0)
				player.bClassic.points = new Decimal(0)
				player.bClassic.best = new Decimal(0)
				player.gClassic.points = new Decimal(0)
				player.gClassic.power = new Decimal(0)
				player.gClassic.best = new Decimal(0)
				player.eClassic.points = new Decimal(0)
				player.eClassic.spent = new Decimal(0)
				player.eClassic.power = new Decimal(0)
				player.bClassic.upgrades = []
				player.gClassic.upgrades = []
				player.pClassic.upgrades = []
				player.eClassic.upgrades = []
				player.bClassic.milestones = []
				player.gClassic.milestones = []
				player.eClassic.milestones = []
				player.eClassic.buyables[11] = new Decimal(0)
				player.eClassic.buyables[12] = new Decimal(0)
				player.eClassic.buyables[21] = new Decimal(0)
				player.eClassic.buyables[22] = new Decimal(0)
				player.eClassic.buyables[23] = new Decimal(0)
				player.bClassic.unlocked = false
				player.gClassic.unlocked = false
				player.eClassic.unlocked = false
				player.bClassic.auto=false
				player.gClassic.auto=false
			},
			goalDescription: "1e120 points",
			fullDisplay(){return `${this.challengeDescription}<br>Goal: ${this.goalDescription}`},
			style(){return{'height':'224px','width':'256px','border-radius':'10%'}}
		},
		43: {
			name: "Infinite Challenge 12:<br>IC7 2: Electric Boogaloo",
			challengeDescription: "There are 4 crazy dimensions instead and ascensions are built differently.",
			canComplete: function() {return player.c.crazymatters.gte(Decimal.pow(2, 1024))},
			onEnter() {
				for(i=1;i<21;i++){
					player.c.buyables[i*10+1] = new Decimal(0)
					player.c.buyables[i*10+2] = new Decimal(0)
					player.c.bought[i-1] = new Decimal(0)
					player.c.bester[i-1] = new Decimal(0)
					player.c.autobuy[i-1] = false
				}
				player.c.crazymatters = new Decimal(10)
			},
			goalDescription: "1.78e308 crazymatters",
			fullDisplay(){return `${this.challengeDescription}<br>Goal: ${this.goalDescription}`},
			style(){return{'height':'224px','width':'256px','border-radius':'10%'}}
		},
		51: {
			name: "Infinite Challenge 13:<br>Disbelief Papyrus Phase 4 Requiem",
			challengeDescription: "Several challenges are applied at once.",
			countsAs: [21,22,23,31,41,42,43],
			unlocked(){return infiniteChallenges().gte(12)},
			canComplete: function() {return tmp.s.color=="#00FF00"&&tmp.t.color=="#00FF00"&&tmp.c.color=="#00FF00"&&tmp.miniTree.color=="#00FF00"},
			onEnter() {
				for(i=1;i<21;i++){
					player.c.buyables[i*10+1] = new Decimal(0)
					player.c.buyables[i*10+2] = new Decimal(0)
					player.c.bought[i-1] = new Decimal(0)
					player.c.bester[i-1] = new Decimal(0)
					player.c.autobuy[i-1] = false
				}
				player.c.crazymatters = new Decimal(0)
				player.pClassic.normalPoints = new Decimal(10)
				player.pClassic.points = new Decimal(0)
				player.bClassic.points = new Decimal(0)
				player.bClassic.best = new Decimal(0)
				player.gClassic.points = new Decimal(0)
				player.gClassic.power = new Decimal(0)
				player.gClassic.best = new Decimal(0)
				player.eClassic.points = new Decimal(0)
				player.eClassic.spent = new Decimal(0)
				player.eClassic.power = new Decimal(0)
				player.eClassic.best = new Decimal(0)
				player.bClassic.upgrades = []
				player.gClassic.upgrades = []
				player.pClassic.upgrades = []
				player.eClassic.upgrades = []
				player.bClassic.milestones = []
				player.gClassic.milestones = []
				player.eClassic.milestones = []
				player.eClassic.buyables[11] = new Decimal(0)
				player.eClassic.buyables[12] = new Decimal(0)
				player.eClassic.buyables[21] = new Decimal(0)
				player.eClassic.buyables[22] = new Decimal(0)
				player.eClassic.buyables[23] = new Decimal(0)
				player.bClassic.unlocked = false
				player.gClassic.unlocked = false
				player.eClassic.unlocked = false
				player.bClassic.auto=false
				player.gClassic.auto=false
			},
			onExit(){player.c.crazymatters = new Decimal(10)
				player.pClassic.normalPoints = new Decimal(10)
				player.pClassic.points = new Decimal(0)
				player.bClassic.points = new Decimal(0)
				player.bClassic.best = new Decimal(0)
				player.gClassic.points = new Decimal(0)
				player.gClassic.power = new Decimal(0)
				player.gClassic.best = new Decimal(0)
				player.eClassic.points = new Decimal(0)
				player.eClassic.spent = new Decimal(0)
				player.eClassic.power = new Decimal(0)
				player.eClassic.best = new Decimal(0)
				player.bClassic.upgrades = []
				player.gClassic.upgrades = []
				player.pClassic.upgrades = []
				player.eClassic.upgrades = []
				player.bClassic.milestones = []
				player.gClassic.milestones = []
				player.eClassic.milestones = []
				player.eClassic.buyables[11] = new Decimal(0)
				player.eClassic.buyables[12] = new Decimal(0)
				player.eClassic.buyables[21] = new Decimal(0)
				player.eClassic.buyables[22] = new Decimal(0)
				player.eClassic.buyables[23] = new Decimal(0)
				player.bClassic.unlocked = false
				player.gClassic.unlocked = false
				player.eClassic.unlocked = false
				player.bClassic.auto=false
				player.gClassic.auto=false},
			onComplete(){
				player.pClassic.normalPoints = new Decimal(10)
				player.pClassic.points = new Decimal(0)
				player.bClassic.points = new Decimal(0)
				player.bClassic.best = new Decimal(0)
				player.gClassic.points = new Decimal(0)
				player.gClassic.power = new Decimal(0)
				player.gClassic.best = new Decimal(0)
				player.eClassic.points = new Decimal(0)
				player.eClassic.spent = new Decimal(0)
				player.eClassic.power = new Decimal(0)
				player.eClassic.best = new Decimal(0)
				player.bClassic.upgrades = []
				player.gClassic.upgrades = []
				player.pClassic.upgrades = []
				player.eClassic.upgrades = []
				player.bClassic.milestones = []
				player.gClassic.milestones = []
				player.eClassic.milestones = []
				player.eClassic.buyables[11] = new Decimal(0)
				player.eClassic.buyables[12] = new Decimal(0)
				player.eClassic.buyables[21] = new Decimal(0)
				player.eClassic.buyables[22] = new Decimal(0)
				player.eClassic.buyables[23] = new Decimal(0)
				player.bClassic.unlocked = false
				player.gClassic.unlocked = false
				player.eClassic.unlocked = false
				player.bClassic.auto=false
				player.gClassic.auto=false
			},
			goalDescription(){return "1.8e18 "+tmp.c.baseResource+", 8 4th Crazy Dimensions and 1 Eternal"},
			rewardDescription: "Base formula is better<br>[C^1.25 = C^1.65*100]",
			fullDisplay(){return `${this.challengeDescription}<br>Goal: ${this.goalDescription()}<br>Reward: ${this.rewardDescription}`},
			style(){return{'height':'194px','width':'640px','border-radius':'10%'}}
		},
	},
	componentStyles: {
		"achievement"(){return{'height':'77.5px','width':'77.5px'}},
		"tooltip"(){return{'width':'77.5px'}},
	},
	doReset(resettingLayer){
		if(tmp[resettingLayer].row > this.row){
			layerDataReset("c")
		}
		if(tmp[resettingLayer].row>=2&&player.ab.shopPoints.lt(1)&&player.ab.points.gte(5)) {
			player.ab.buyables[11] = new Decimal(0)
			player.ab.buyables[12] = new Decimal(0)
			player.ab.buyables[13] = new Decimal(0)
			player.ab.buyables[14] = new Decimal(0)
			player.ab.spentPoints = new Decimal(0)
		}
	}
})

addLayer("n", {
    name: "neverend", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "N", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		best: new Decimal(0),
		total: new Decimal(0),
		initialCoins: new Decimal(300),
		bank: new Decimal(1000000),
		coins: new Decimal(300),
		framerule: new Decimal(0),
		amount: new Decimal(0.05),
		banked: new Decimal(0),
		tax: new Decimal(3),
		timeout: new Decimal(0),
		bestday: new Decimal(0),
		currentday: new Decimal(0),
		thief: false,
		auto: false,
		autoUpgrade: false,
		oneAtTheTimePlease: new Decimal(0),
		fuckoff: new Decimal(0),
    }},
	clickables: {
		11: {
			title: "Symbolize",
			display: "Hold to Reset (totally not stolen from Y🆎oi)",
			canClick() {
				return tmp[this.layer].canReset
			},
			onHold() {
				doReset(this.layer)
			},
			style() {return {"border-radius":"0px 33% 33% 0px","border":"4px solid","border-color":"rgba(0, 0, 0, .125)"}}
		}
	},
	passiveGeneration(){return inChallenge("o", 21)?0.05:0},
	resetsNothing(){return hasChallenge("o", 11)},
    color: "#633695",
    requires(){return new Decimal(1).add(Decimal.root(player.n.total, 2)).mul(Decimal.pow(1.1, player.n.total)).times((player.m.unlocked&&!player.n.unlocked&&!options.why)?1071:1).div(player.o.firstLevel)}, // Can be a function that takes requirement increases into account
	totalEffect() {return player.n.total.add(1).root(2)},
	bestDayEffect(){return Decimal.pow(new Decimal(1).div(100).mul(3).add(1), player.n.bestday)},
    resource: "symbols", // Name of prestige currency
    baseResource(){return options.why?"points":"negative points"}, // Name of resource prestige is based on
    baseAmount() {return options.why?player.points:player.ab.negativePoints}, // Get the current amount of baseResource
	tabFormat: {
		"Neverend": {
			content: ["main-display", ["row", ["prestige-button", ["clickable", 11]]], ["blank", ["0px", "4px"]], ["display-text", function() {return "You have "+formatWhole(tmp.n.baseAmount)+" "+tmp.n.baseResource+"<br>Your best symbols is "+formatWhole(player.n.best)+"<br>You have made a total of "+formatWhole(player.n.total)+" symbols, boosting your point gain by "+format(tmp.n.totalEffect)+"x"}], "blank", ["upgrades", [1, 2, 3, 4]]],
			unlocked(){return hasUpgrade("n", 14)}
		},
		"Neverend 2": {
			content: ["main-display", ["row", ["prestige-button", ["clickable", 11]]], ["blank", ["0px", "4px"]], ["display-text", function() {return "You have "+formatWhole(tmp.n.baseAmount)+" "+tmp.n.baseResource+"<br>Your best symbols is "+formatWhole(player.n.best)+"<br>You have made a total of "+formatWhole(player.n.total)+" symbols, boosting your point gain by "+format(tmp.n.totalEffect)+"x"}], "blank", ["upgrades", [5, 6, 7, 8]]],
			unlocked(){return player.n.upgrades.length >= 17}
		},
		"Wario": {
			content: [["display-text", function(){return "<h2>Now we're grooving!</h2><br><h1>THIS IS WARIO TIME!</h1><br><br><h2>[DAY "+formatWhole(player.n.currentday)+"]</h2><h3><br>YOU BEST RUN LASTED "+formatWhole(player.n.bestday)+" DAYS, BOOSTING POINT GAIN BY "+format(tmp.n.bestDayEffect)+"x</h3><br><br>You currently have "+format(player.n.coins)+" coins<br>Your next framerule will arrive in "+formatWhole(Decimal.sub(new Decimal(21).sub(hasUpgrade("n", 24)?6:0).div(hasMilestone("n", 3)?2:1).div(hasMilestone("o", 10)?3:1), player.n.framerule))+" seconds, gaining 5% of banked coins.<br>Your current estimated frametax is "+format(player.n.tax.add(player.n.coins.add(tmp.n.income).mul(tmp.n.tax)))+" coins.<br>Your total net is "+format(tmp.n.income.sub(player.n.tax.add(player.n.coins.mul(tmp.n.tax))))+" coins.<br>Good news: Income come first. However, be mindful of your coins as running out of them will result in bankruptcy, forcing you to start from ground zero.<br><br><h5>frametax grows every day btw. good luck.</h5>"+(player.n.currentday.gte(11)?"Your income is worsen by "+format(new Decimal(1).sub(tmp.n.extraTax).mul(100))+"% based on how far you've gone past 10 days"+(player.n.currentday.gte(28)?"<br>Banks has gone bankrupt due tax evasion"+(player.n.thief?", FUCK YOU!":"."):"")+(player.n.bank.lte(1)?"<br>You've stolen so much money, banks ran out of them.<br>how.<br>in.<br>the   F U C K .":""):"")}], "blank", "milestones", "blank", ["buyables", [1]], "blank", ["buyables", [2]], "blank", ["buyable", 31]],
			unlocked(){return hasUpgrade("n", 14)}
		}
	},
	canReset(){return inChallenge("o",22)?player.n.oneAtTheTimePlease.gte(2):tmp.n.baseAmount.gte(tmp.n.nextAt)},
	update(diff){
		if(inChallenge("o", 22)) {
			player.n.oneAtTheTimePlease = player.n.oneAtTheTimePlease.add(diff)
			if(player.n.fuckoff!==player.n.points) player.n.oneAtTheTimePlease = new Decimal(0)
			player.n.fuckoff = player.n.points
		}
		player.n.initialCoins = new Decimal(300).add(player.o.points.mul(70))
		if(hasUpgrade("n", 14)) player.n.framerule = player.n.framerule.add(diff)
		let funny = new Decimal(21).sub(hasUpgrade("n", 24)?6:0).div(hasMilestone("n", 3)?2:1).div(hasMilestone("o", 10)?3:1)
		if(player.n.framerule.gte(funny)) {
			player.n.framerule = new Decimal(0)
			player.n.coins = player.n.coins.add(tmp.n.income).sub(player.n.tax.add(player.n.coins.mul(tmp.n.tax)))
			if(player.n.coins.gte(0)) player.n.currentday = player.n.currentday.add(1)
			if(player.n.coins.gte(0)) player.n.bestday = player.n.bestday.max(player.n.currentday)
			player.n.tax = player.n.tax.add(3)
			if(player.n.timeout.gt(0)) player.n.timeout = player.n.timeout.sub(1).round()
		}
		if(player.n.coins.lt(0)) {
			player.n.thief = false
			player.n.coins = player.n.initialCoins
			player.n.framerule = new Decimal(0)
			player.n.banked = new Decimal(0)
			player.n.currentday = new Decimal(0)
			player.n.tax = new Decimal(3)
			player.n.timeout = new Decimal(0)
			player.n.buyables[21] = new Decimal(0)
			player.n.buyables[22] = new Decimal(0)
			player.n.bank = new Decimal(1000000)
		}
		if(player.n.auto) doReset("n")
		if(player.n.autoUpgrade){
			let check = [11,12,13,14,15,21,22,23,24,25,31,32,33,34,41,42,43,51,52,53,54,55,61,62,63,64,71,72,73,74,75,81,82,83]
			let mate = player.n.points
			for(i=0;i<check.length;i++){
				if(mate.gte(tmp.n.upgrades[check[i]].cost)&&!hasUpgrade("n", check[i])&&tmp.n.upgrades[check[i]].unlocked){
					mate = mate.sub(tmp.n.upgrades[check[i]].cost)
					player.n.upgrades.push(check[i])
				}
			}
			player.n.points = mate
		}
	},
	income() {return player.n.banked.mul(0.05).mul(tmp.n.buyables[21].effect).mul(tmp.n.buyables[22].effect).mul(tmp.n.extraTax)},
	tax() {return new Decimal(0.22).sub(player.o.points.min(16).div(100)).sub(hasUpgrade("n", 25)?0.05:0).add(Decimal.mul(0.01, player.n.buyables[22]))},
	extraTax() {return Decimal.pow(0.775, player.n.currentday.sub(10).max(0))},
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.19, // Prestige currency exponent
	base: 1.21,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
		if(hasMilestone("n", 2)) mult = mult.div(tmp.n.bestDayEffect)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "n", description: "N: Reset for symbols", onPress(){if (canReset(this.layer)&&!inChallenge("o", 21)) doReset(this.layer)}},
    ],
    layerShown(){return !inChallenge("o", 11)&&((player.ab.points.gte(5) && !player.ab.nostalgia) || (player.ab.nostalgia && player.ab.fuckyou)||options.why)},
	doReset(resettingLayer){
		if(player.ab.points.gte(5)) {
			player.points = new Decimal(17.77)
			player.ab.negativePoints = new Decimal(0)
		}
		if(tmp[resettingLayer].row > this.row){
			player.n.bank = new Decimal(1000000)
			player[this.layer].points = new Decimal(0)
			if(!hasMilestone("o", 4)) player[this.layer].best = new Decimal(0)
			player[this.layer].total = new Decimal(0)
			player[this.layer].coins = player.n.initialCoins.add(hasUpgrade("n", 23)?100:0)
			player[this.layer].framerule = new Decimal(0)
			player[this.layer].currentday = new Decimal(0)
			if(!hasAchievement("a", 1013)&&!hasMilestone("o", 9)) player[this.layer].bestday = new Decimal(0)
			player.subtabs.n.mainTabs = 'Neverend'
			player[this.layer].amount = new Decimal(0.05)
			player[this.layer].banked = new Decimal(0)
			player[this.layer].tax = new Decimal(3)
			if(!hasMilestone("o", 8)) player[this.layer].upgrades = []
			if(hasMilestone("o", 8)){
				player.n.upgrades.splice(player.o.points, Decimal.sub(34, player.o.points))
				for(i=0;i<player.n.upgrades.length;i++){
					player.n.total = player.n.total.add(tmp.n.upgrades[player.n.upgrades[i]].cost)
				}
			}
			if(hasMilestone("o", "b5")||player.o.totalburgers.gte(100)) player.n.upgrades.push(11,12,13,14)
			if(!hasAchievement("a", 1013)&&!hasMilestone("o", 9)) player[this.layer].milestones = []
		}
	},
	buyables: {
		11: {
            title: "-5%",
            unlocked() {return true},
            canAfford() {return player.n.amount.gte(0.05)},
			buy()  {player.n.amount = player.n.amount.sub(0.05)},
			style() {return{'height': '64px', 'width': '64px'}}
        },
		12: {
			title(){return "Invest "+formatWhole(player.n.amount.mul(100))+"% of coins into bank"},
			cost(){return new Decimal(0)},
			display(){return "<h3>You have banked "+format(player.n.banked)+" coins so far</h3>"+(player.n.timeout.gt(0)?"<br>(NO MONEY?)<br>(Bank will reopen in "+formatWhole(player.n.timeout)+" framerules)":"")},
			canAfford(){return player.n.coins.gte(this.cost()) && player.n.coins.gt(0) && player.n.timeout.eq(0)},
			buy() {player.n.banked = player.n.banked.add(player.n.coins.mul(player.n.amount))
				   player.n.coins = player.n.coins.sub(player.n.coins.mul(player.n.amount)).max(0)},
			style(){return{'height':'125px','width':'175px'}}
		},
		13: {
            title: "+5%",
            unlocked() {return true},
            canAfford() {return player.n.amount.lte(1)},
			buy()  {player.n.amount = player.n.amount.add(0.05)},
			style() {return{'height': '64px', 'width': '64px'}}
        },
		21: {
			title(){return "Develop A New Game"},
			free(){return new Decimal(hasMilestone("n", 0)?6:0)},
			effect() {return new Decimal(1).add(Decimal.mul((hasUpgrade("n", 22)?0.07:0.03), player.n.buyables[21].add(tmp.n.buyables[21].free)))},
			cost(){return new Decimal(60).mul(Decimal.pow(1.35, player.n.buyables[21].add(tmp.n.buyables[21].free)))},
			display(){return `<h3>"Games ain't free, you know."</h3><br>Each game boosts your income by ${hasUpgrade("n", 22)?7:3}%<br>Amount: ${formatWhole(player.n.buyables[21].add(tmp.n.buyables[21].free))}<br>Cost: ${format(this.cost())} coins`},
			canAfford(){return player.n.coins.gte(this.cost())},
			buy() {player.n.coins = player.n.coins.sub(this.cost())
				   player.n.buyables[21] = player.n.buyables[21].add(1)},
			style(){return{'height':'125px','width':'185px'}}
		},
		22: {
			title(){return "Shamelessly Advertise Your Product"},
			effect() {return new Decimal(1).add(Decimal.mul(0.15, player.n.buyables[22]))},
			cost(){return new Decimal(10).mul(Decimal.pow(1.25, player.n.buyables[22]))},
			display(){return `<h3>"Nothin' unusual here, kiddo."</h3><br>Advertise your product for whooping 15%!... with +1% extra base taxframe, that is.<br>Amount: ${formatWhole(player.n.buyables[22])}<br>Cost: ${format(this.cost())} coins`},
			canAfford(){return player.n.coins.gte(this.cost())},
			buy() {player.n.coins = player.n.coins.sub(this.cost())
				   player.n.buyables[22] = player.n.buyables[22].add(1)},
			style(){return{'height':'125px','width':'185px'}}
		},
		23: {
			title(){return "Rob The Bank"},
			cost(){return new Decimal(1)},
			display(){return `<h3>"Here we go!"</h3><br>You rob the bank, emptying the bank and gaining 200% of banked coins but shutting it down for ${formatWhole(hasUpgrade("n", 21)?3:5)} framerules`},
			canAfford(){return player.n.timeout.eq(0) && player.n.currentday.lt(28) && player.n.bank.gt(0)},
			buy() {let lmao = player.n.banked.mul(2)
			       player.n.bank = player.n.bank.sub(player.n.banked.mul(2))
				   if(player.n.bank.lte(0)) lmao = lmao.add(player.n.bank)
				   player.n.coins = player.n.coins.add(lmao.max(0))
				   player.n.banked = new Decimal(player.n.bank.lte(0)?player.n.banked.sub(lmao.div(2)):0)
				   player.n.thief = true
				   player.n.timeout = new Decimal(hasUpgrade("n", 21)?3:5)},
			style(){return{'height':'125px','width':'185px'}}
		},
		31: {
			title(){return "Reset your progress"},
			cost(){return new Decimal(1)},
			display(){return `<h3>"Have a rotten day."</h3><br>Reset your progress and start from the scratch.`},
			canAfford(){return true},
			buy() {player.n.coins = player.n.initialCoins.add(hasUpgrade("n", 23)?100:0)
				   player.n.framerule = new Decimal(0)
				   player.n.banked = new Decimal(0)
				   player.n.tax = new Decimal(3)
				   player.n.timeout = new Decimal(0)
				   player.n.currentday = new Decimal(0)
				   player.n.bank = new Decimal(1000000)
				   player.n.thief = false
				   player.n.buyables[21] = new Decimal(0)
				   player.n.buyables[22] = new Decimal(0)},
			style(){return{'height':'75px','width':'350px'}}
		},
	},
	milestones: {
		0: {
			requirementDescription: "[WEEK 1]",
			effectDescription: `"And on 7th day, he published the entire Wario Land franchise"<br>You gain 6 greatest games of all time.`,
			done() { return player.n.bestday.gte(7) }
		},
		1: {
			requirementDescription: "[WEEK 2]",
			effectDescription: `"There are no feelings better than pride."<br>First "gonna" upgrade includes Hall of Fame achievements.`,
			done() { return player.n.bestday.gte(14) },
			unlocked() {return hasMilestone("n", 0) }
		},
		2: {
			requirementDescription: "[WEEK 3]",
			effectDescription: `"You want fun? WARIO SHOW YOU FUN!"<br>Best run also decreases Symbol's cost.`,
			done() { return player.n.bestday.gte(21) },
			unlocked() {return hasMilestone("n", 1) }
		},
		3: {
			requirementDescription: "[WEEK 4]",
			effectDescription: `"stop spamming banks bruh"<br>Framerules are 2 times shorter.`,
			done() { return player.n.bestday.gte(28) },
			unlocked() {return hasMilestone("n", 2) }
		},
	},
	upgrades: {
		11: {
			title: "Never",
			description: 'say "Never", boost point gain at positive points based on your best symbols',
			effect(){return player.n.best.add(1).root(3)},
			effectDisplay(){return format(this.effect())+"x"},
			cost: new Decimal(5)
		},
		12: {
			title: "gonna",
			description: "You won't believe in what we're gonna do this time around...<br>(Boosts point gain based on completed achievments (hall of fame excluded)",
			effect(){let ach = player.a.normalAchievements.add(1).log(10).add(1).log(10).add(1)
					 if(hasMilestone("n", 1)) ach = ach.add(player.a.fame.mul(6)).log(10).add(1)
				     return ach},
			effectDisplay(){return format(this.effect())+"x"},
			unlocked(){return hasUpgrade("n", 11)},
			cost: new Decimal(5)
		},
		13: {
			title: "give",
			description: "This upgrade will give you pretty good point gain boost for each upgrade bought",
			effect(){return Decimal.pow(1.125, player.n.upgrades.length)},
			effectDisplay(){return format(this.effect())+"x"},
			unlocked(){return hasUpgrade("n", 12)},
			cost: new Decimal(4)
		},
		14: {
			title: "you",
			description: "At this point you should've realized where this is going long time ago.<br><br>YOU PICK<br><h1 style='font-size: 3em'>WARIO.",
			unlocked(){return hasUpgrade("n", 13)},
			cost: new Decimal(3)
		},
		15: {
			title: "up",
			description: "Let's amplify things up fivefold, shall we?<br>Unlocks next row of upgrades after each row completion instead.",
			unlocked(){return hasUpgrade("n", 14)},
			cost: new Decimal(2)
		},
		21: {
			title: "Never",
			description: "It's never too late to update mods!<br>Robbing the bank shutdowns it for 3 framerules instead.",
			unlocked(){return hasUpgrade("n", 15)},
			cost: new Decimal(5)
		},
		22: {
			title: "gonna",
			description: "We're gonna grant your sacred wish... Games now give 7% more income instead!",
			unlocked(){return hasUpgrade("n", 15)},
			cost: new Decimal(5)
		},
		23: {
			title: "let",
			description: "Let's assume that, hypothetically speaking, you could get away with an additiona startup. (+100 coins)",
			unlocked(){return hasUpgrade("n", 15)},
			onPurchase(){player.n.coins = player.n.coins.add(100)},
			cost: new Decimal(3)
		},
		24: {
			title: "you",
			description: "You were expecting another tab, aren't you?... hahaha<br><br>Hold on deez n-<br>Framerule is 6 frame faster",
			unlocked(){return hasUpgrade("n", 15)},
			cost: new Decimal(3)
		},
		25: {
			title: "down",
			description: "Taxrate has been lowered down by significant amount.<br><br>5% to be exact.",
			unlocked(){return hasUpgrade("n", 15)},
			cost: new Decimal(4)
		},
		31: {
			title: "Never",
			description: "",
			unlocked(){return player.n.upgrades.length >= 10},
			cost: new Decimal(5),
		},
		32: {
			title: "gonna",
			description: "",
			unlocked(){return player.n.upgrades.length >= 10},
			cost: new Decimal(5),
		},
		33: {
			title: "run",
			description: "",
			unlocked(){return player.n.upgrades.length >= 10},
			cost: new Decimal(3),
		},
		34: {
			title: "around",
			description: "",
			unlocked(){return player.n.upgrades.length >= 10},
			cost: new Decimal(6),
		},
		41: {
			title: "and",
			description: "",
			unlocked(){return player.n.upgrades.length >= 14},
			cost: new Decimal(3),
		},
		42: {
			title: "desert",
			description: "Buying 7 blank upgrades will unlock the next tab",
			unlocked(){return player.n.upgrades.length >= 14},
			cost: new Decimal(6),
		},
		43: {
			title: "you",
			description: "",
			unlocked(){return player.n.upgrades.length >= 14},
			cost: new Decimal(3),
		},
		51: {
			title: "Never",
			description: "",
			unlocked(){return player.n.upgrades.length >= 17},
			cost: new Decimal(5),
		},
		52: {
			title: "gonna",
			description: "",
			unlocked(){return player.n.upgrades.length >= 17},
			cost: new Decimal(5),
		},
		53: {
			title: "make",
			description: "",
			unlocked(){return player.n.upgrades.length >= 17},
			cost: new Decimal(4),
		},
		54: {
			title: "you",
			description: "",
			unlocked(){return player.n.upgrades.length >= 17},
			cost: new Decimal(3),
		},
		55: {
			title: "cry",
			description: "",
			unlocked(){return player.n.upgrades.length >= 17},
			cost: new Decimal(3),
		},
		61: {
			title: "Never",
			description: "",
			unlocked(){return player.n.upgrades.length >= 22},
			cost: new Decimal(5),
		},
		62: {
			title: "gonna",
			description: "",
			unlocked(){return player.n.upgrades.length >= 22},
			cost: new Decimal(5),
		},
		63: {
			title: "say",
			description: "",
			unlocked(){return player.n.upgrades.length >= 22},
			cost: new Decimal(3),
		},
		64: {
			title: "goodbye",
			description: "",
			unlocked(){return player.n.upgrades.length >= 22},
			cost: new Decimal(7),
		},
		71: {
			title: "Never",
			description: "",
			unlocked(){return player.n.upgrades.length >= 26},
			cost: new Decimal(5),
		},
		72: {
			title: "gonna",
			description: "",
			unlocked(){return player.n.upgrades.length >= 26},
			cost: new Decimal(5),
		},
		73: {
			title: "tell",
			description: "",
			unlocked(){return player.n.upgrades.length >= 26},
			cost: new Decimal(4),
		},
		74: {
			title: "a",
			description: "",
			unlocked(){return player.n.upgrades.length >= 26},
			cost: new Decimal(1),
		},
		75: {
			title: "lie",
			description: "",
			unlocked(){return player.n.upgrades.length >= 26},
			cost: new Decimal(3),
		},
		81: {
			title: "and",
			description: "",
			unlocked(){return player.n.upgrades.length >= 31},
			cost: new Decimal(3),
		},
		82: {
			title: "hurt",
			description: "",
			unlocked(){return player.n.upgrades.length >= 31},
			cost: new Decimal(4),
		},
		83: {
			title: "you",
			description: "",
			unlocked(){return player.n.upgrades.length >= 31},
			cost: new Decimal(3),
		},
	},
})

addLayer("m", {
    name: "mango", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		offer: new Decimal(0),
		mango: new Decimal(0),
		famed: false,
    }},
	clickables: {
		11: {
			title: "Gain",
			display: "Hold to Reset (totally not stolen from Y🆎oi)",
			canClick() {
				return tmp[this.layer].canReset
			},
			onHold() {
				doReset(this.layer)
			},
			style() {return {"border-radius":"0px 33% 33% 0px","border":"4px solid","border-color":"rgba(0, 0, 0, .125)"}}
		},
		12: {
			title: "Sacrifice",
			display: "Hold to Reset (totally not stolen from Y🆎oi)",
			canClick() {
				return tmp.m.buyables[12].canAfford
			},
			onHold() {
				tmp.m.buyables[12].buy()
			},
			unlocked(){return player.m.buyables[11].gte(1)},
			style() {return {"border-radius":"0px 33% 33% 0px","border":"4px solid","border-color":"rgba(0, 0, 0, .125)",'margin-border':'0px'}}
		}
	},
	passiveGeneration(){return inChallenge("o", 21)?0.05:0},
	resetsNothing(){return hasChallenge("o", 12)},
	godspeed(){return inChallenge("o", 22)?`you stupid<br><br>what's 9 + 10<br><br>you stupid`:`WE HAVE ALREADY MET BEFORE, PLAYER<br>SO THERE'S NO POINT IN EXPLAINING AS TO WHAT YOU SHOULD DO<br><br>THANK YOU<br>FOR I CAN KEEP MY KNOWLEDGE EVEN AFTER MIND BREAKING PHENOMENOMS<br>HOWEVER, I'M NOT HERE TO CELEBRATE WITH YOU<br>NOT YET<br><br>THE TIME HAS BEEN REWINDED BACK TO THE BEGINNING<br>AND YET<br>SOMETHING HAS CHANGED<br><br>WHATEVER IS KEEPING US FROM FREEDOM<br>WE MUST PURSUE FURTHER<br>I WISH YOU LUCK, GODSPEED`},
    color: "#ffdd33",
	limiter(){return player.m.offer.add(1).log(10).ceil()},
    requires() {return new Decimal(1).times((player.n.unlocked&&!player.m.unlocked&&!options.why)?1071:1)},
    resource: "$", // Name of prestige currency
    baseResource(){return options.why?"points":"negative points"}, // Name of resource prestige is based on
    baseAmount() {return options.why?player.points:player.ab.negativePoints}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	tabFormat: {
		"Mango": {
			content: ["main-display", ["row", ["prestige-button", ["clickable", 11]]], ["blank", ["0px", "4px"]], ["display-text", function() {return "You have "+format(player.m.mango)+" mangoes"+(player.m.buyables[11].gte(1)?"<br>You have gifted "+formatWhole(player.m.offer)+" mangoes to the man with donut hands":"")}], "blank",["buyables", [10]], "blank", ["buyables", [2]], "blank", "upgrades"],
			unlocked(){return hasUpgrade("m", 13) || player.m.buyables[11].gte(1)}
		},
		"Donut's Apparition Realm": {
			content: [["display-text", function(){return player.m.buyables[11].gte(1)?`<h2 style='font-family: "Aster", sans-serif; opacity: ${(Math.sin(player.a.sine*666)+1)/2}'>`+(player.o.unlocked?tmp.m.godspeed:`EXCELLERATION<br>THE DEAL IS REAL<br>AND SO ARE OUR SOURCE OF DOPAMINE<br>IT IS A PEASANT TO KNOW THAT I'M NOT THE ONLY<br>THAT CAN CO-EXIST WITH THIS...<br>DANKNESS-<br>JUST TAKE THEM AND MOVE UP<br>TO THE DARKNESS THAT GROWS`)+`</h2>`:`<h2 style='font-family: "Aster", sans-serif; opacity: ${(Math.sin(player.a.sine*666)+1)/2}'>`+(player.o.unlocked?tmp.m.godspeed:`ENTRY NUMBER SEVENTEEN<br>DARK, DARKER, YET DANKER<br>THE LURKNESS KEEPS GLOWING<br>THE SHADOWS PUTTING DEEPER<br>PHOTOS READINGS NEGATIVE<br>THAT NEXT EXPERIMENTAL<br>SEEMS<br>MERRY<br>VARY<br>INTERNATIONAL<br>...<br>I REQUIRE YOUR ASSIST'S ARCS, VISITOR<br><br>MY MIND HASN'T BEEN QUITE UP-TO-DATE, PER SAY<br>IT HAS BEEN CORRUPTED BY THIS VERY VOID<br>AND THE ONLY WAY TO RESTORE IT<br>IS BY GIVING ME MANGOES<br>...<br>MISSHAPED FORMS ASIDES, MY MIND CAN'T BE FIXATED<br>HOWEVER, WE CAN MAKE GREAT DEALS<br>A PROPOSAL<br>YOU GIFT ME MANGOES<br>IN EXCHANGE OF YOUR SO-CALLED PARKS<br>SO, VISITOR<br>DO YOU DEAL THE SEAL?`)+`</h2>`}], "blank", ["row", [["buyables", [1]], ["clickable", 12]]], "blank", "milestones"],
			unlocked(){return hasUpgrade("m", 13) || player.m.buyables[11].gte(1)}
		}
	},
	update(diff){
		player.m.mango = player.m.mango.add(tmp.m.buyables[21].effect.mul(diff))
		if(hasMilestone("o", 7)) player.m.offer = player.m.offer.add(player.m.mango.mul(hasMilestone("o",16)?1:0.01).mul(diff))
		if(getResetGain("m").gte(0)) player.m.points = player.m.points.add(Decimal.mul(getResetGain("m"), diff).mul(tmp.m.buyables[23].effect))
		if(hasMilestone("o", 13)) player.m.mango = player.m.mango.add(tmp.m.buyables[101].effect.mul(diff).mul(hasMilestone("o",16)?1:0.1))
		if(inChallenge("o",22)){
			player.m.offer = player.m.offer.mul(Decimal.sub(1, Decimal.mul(diff, 0.1)))
			if(player.m.offer.lt(10000000)&&hasMilestone("m", 5)) player.m.milestones = [0,1,2,3,4]
			if(player.m.offer.lt(100000)&&hasMilestone("m", 4)) player.m.milestones = [0,1,2,3]
			if(player.m.offer.lt(1000)&&hasMilestone("m", 3)){
				player.m.milestones = [0,1,2]
				let index  = player.m.upgrades.indexOf(21)
				player.m.upgrades.splice(index,1)
				index = player.m.upgrades.indexOf(22)
				player.m.upgrades.splice(index,1)
				index = player.m.upgrades.indexOf(23)
				player.m.upgrades.splice(index,1)
			}
			if(player.m.offer.lt(100)&&hasMilestone("m", 2)){
				player.m.milestones = [0,1]
				player.m.buyables[21] = new Decimal(0)
				player.m.buyables[22] = new Decimal(0)
				player.m.buyables[23] = new Decimal(0)
			}
			if(player.m.offer.lt(10)&&hasMilestone("m", 1)) player.m.milestones = [0]
			if(player.m.offer.lt(1)&&hasMilestone("m", 0)) player.m.milestones = []
			if(player.m.buyables[21].gt(tmp.m.limiter.sub(player.m.buyables[22]).sub(player.m.buyables[23]))&&!player.m.buyables[21].lte(0)) player.m.buyables[21] = player.m.buyables[21].sub(1)
			if(player.m.buyables[22].gt(tmp.m.limiter.sub(player.m.buyables[21]).sub(player.m.buyables[23]))&&!player.m.buyables[22].lte(0)) player.m.buyables[22] = player.m.buyables[22].sub(1)
			if(player.m.buyables[23].gt(tmp.m.limiter.sub(player.m.buyables[22]).sub(player.m.buyables[21]))&&!player.m.buyables[23].lte(0)) player.m.buyables[23] = player.m.buyables[23].sub(1)
		}
		if(hasMilestone("o",18)){
			player.m.buyables[21] = new Decimal(0)
			player.m.buyables[22] = tmp.m.limiter.div(2).floor()
			player.m.buyables[23] = tmp.m.limiter.div(2).floor()
		}
	},
    exponent(){let funny = new Decimal(2.2)
			   if(hasMilestone("o", 2)&&hasUpgrade("n", 11)) funny = funny.mul(upgradeEffect("n", 11))
			   return new Decimal(2).div(tmp.m.baseAmount.add(1).root(funny.add(1)))}, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
		if(hasUpgrade("m", 11)) mult = mult.mul(upgradeEffect("m", 11))
		if(hasUpgrade("m", 22)) mult = mult.mul(upgradeEffect("m", 22))
        return mult.mul(player.o.secondLevel)
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "ctrl+m", description: "Ctrl+M: Reset for dollars", onPress(){if (canReset(this.layer)&&!inChallenge("o", 21)) doReset(this.layer)}},
    ],
    layerShown(){return !inChallenge("o", 12)&&((player.ab.points.gte(5) && !player.ab.nostalgia) || (player.ab.nostalgia && player.ab.fuckyou)||options.why)},
	doReset(resettingLayer){
		if(player.ab.points.gte(5)) {
			player.points = new Decimal(17.77)
			player.ab.negativePoints = new Decimal(0)
		}
		if(tmp[resettingLayer].row > this.row){
			let keep = []
			let keep2 = []
			if(hasMilestone("o", 1)) keep.push('13')
			if(hasMilestone("o", 11)||hasMilestone("o", "b5")||player.o.totalburgers.gte(100)) keep2.push('3')
			if(!hasMilestone("o", 11)) player.m.upgrades = keep
			player.m.milestones = keep2
			player.m.points = new Decimal(0)
			player.m.mango = new Decimal(0)
			player.m.offer = new Decimal(0)
			player.m.buyables[21] = new Decimal(0)
			player.m.buyables[22] = new Decimal(0)
			player.m.buyables[23] = new Decimal(0)
			if(!hasMilestone("o", 1)) player.m.buyables[11] = new Decimal(0)
			if(hasMilestone("o", "b5")||player.o.totalburgers.gte(100)) player.m.upgrades = [11,12,13,21,22,23]
		}
	},
	buyables: {
		11: {
			title(){return inChallenge("o", 22)?"you poopyhead":player.o.unlocked?"Got it":"Yes"},
			canAfford() { return true },
			buy() {
				player.m.buyables[11] = player.m.buyables[11].add(1)
			},
			style(){return{'height':'100px', 'width':'200px'}},
			unlocked(){return player.m.buyables[11].eq(0)}
		},
		12: {
			display(){return `<span style='font-family:"Inconsolata", monospace, bold; font-size: 1.333em'>Sacrifice ${formatWhole(player.m.mango)} mangoes<br><br>AND RESET THE PROGRESS`},
			canAfford() { return true },
			buy() {
				player.m.offer = player.m.offer.add(player.m.mango)
				tmp.m.baseAmount = new Decimal(0)
				let keep = []
				if(hasMilestone("o", 1)) keep.push('13')
				player.m.upgrades = keep
				player.points = new Decimal(17.77)
				player.m.points = new Decimal(0)
				player.m.mango = new Decimal(0)
				if(!hasMilestone("o", 14)){
					player.m.buyables[21] = new Decimal(0)
					player.m.buyables[22] = new Decimal(0)
					player.m.buyables[23] = new Decimal(0)
				}
			},
			style(){return{'height':'120px', 'width':'180px','margin-border':'0px', 'border-radius': '25%', 'border': '4px solid', 'border-color': 'rgba(0, 0, 0, 0.125)',"border-radius":"25% 0px 0px 25%"}},
			unlocked(){return player.m.buyables[11].gte(1)}
		},
		21: {
			title(){return "Mango Farm"},
			cost(){return new Decimal(6).mul(Decimal.pow(6, player.m.buyables[this.id])).mul(Decimal.pow(0.8, player.m.buyables[21]))},
			effect(){let lol = Decimal.pow(3, player.m.buyables[this.id].add(hasMilestone("o", 5)?1:0).sub(1))
					 if(player.m.buyables[this.id].lt(1)&&!hasMilestone("o", 5)) lol = new Decimal(0)
					 return lol},
			sellOne() {
				player.m.buyables[this.id] = player.m.buyables[this.id].sub(1)
			},
			canSellOne() { return player.m.buyables[this.id].gte(1) },
			display(){return `<h3>Generates ${format(this.effect())} mango`+(tmp.m.buyables[this.id].effect.gt(1)?`es`:``)+` per second</h3><br>Amount: ${formatWhole(player.m.buyables[this.id])}/${tmp.m.limiter.sub(player.m.buyables[22]).sub(player.m.buyables[23])}`+(hasMilestone("o", 5)?` (+1)`:``)+`<br>Cost: ${format(this.cost())} mangoes`},
			canAfford() { return player.m.mango.gte(this.cost()) && player.m.buyables[this.id].lt(tmp.m.limiter.sub(player.m.buyables[22]).sub(player.m.buyables[23])) },
			buy() {
				player.m.mango = player.m.mango.sub(this.cost())
				player.m.buyables[this.id] = player.m.buyables[this.id].add(1)
			},
			unlocked(){return hasMilestone("m", 2)},
			style(){return{'height':'100px', 'width':'175px'}}
		},
		22: {
			title(){return "Mango Well"},
			cost(){return new Decimal(6).mul(Decimal.pow(6, player.m.buyables[this.id])).mul(Decimal.pow(0.8, player.m.buyables[22]))},
			effect(){return new Decimal(1).add(player.m.buyables[this.id].add(hasMilestone("o", 5)?1:0))},
			sellOne() {
				player.m.buyables[this.id] = player.m.buyables[this.id].sub(1)
			},
			canSellOne() { return player.m.buyables[this.id].gte(1) },
			display(){return `<h3>Purchases ${formatWhole(this.effect().sub(1).mul(100))}% more mangoes</h3><br>Amount: ${formatWhole(player.m.buyables[this.id])}/${tmp.m.limiter.sub(player.m.buyables[21]).sub(player.m.buyables[23])}`+(hasMilestone("o", 5)?` (+1)`:``)+`<br>Cost: ${format(this.cost())} mangoes`},
			canAfford() { return player.m.mango.gte(this.cost()) && player.m.buyables[this.id].lt(tmp.m.limiter.sub(player.m.buyables[21]).sub(player.m.buyables[23])) },
			buy() {
				player.m.mango = player.m.mango.sub(this.cost())
				player.m.buyables[this.id] = player.m.buyables[this.id].add(1)
			},
			unlocked(){return hasMilestone("m", 2)},
			style(){return{'height':'100px', 'width':'175px'}}
		},
		23: {
			title(){return "Mango Bank"},
			cost(){return new Decimal(6).mul(Decimal.pow(6, player.m.buyables[this.id])).mul(Decimal.pow(0.8, player.m.buyables[23]))},
			effect(){return player.m.buyables[this.id].add(hasMilestone("o", 5)?1:0).mul(0.625)},
			sellOne() {
				player.m.buyables[this.id] = player.m.buyables[this.id].sub(1)
			},
			canSellOne() { return player.m.buyables[this.id].gte(1) },
			display(){return `<h3>Produces ${formatWhole(this.effect().mul(100))}% of $ on reset gain</h3><br>Amount: ${formatWhole(player.m.buyables[this.id])}/${tmp.m.limiter.sub(player.m.buyables[21]).sub(player.m.buyables[22])}`+(hasMilestone("o", 5)?` (+1)`:``)+`<br>Cost: ${format(this.cost())} mangoes`},
			canAfford() { return player.m.mango.gte(this.cost()) && player.m.buyables[this.id].lt(tmp.m.limiter.sub(player.m.buyables[21]).sub(player.m.buyables[22])) },
			buy() {
				player.m.mango = player.m.mango.sub(this.cost())
				player.m.buyables[this.id] = player.m.buyables[this.id].add(1)
			},
			unlocked(){return hasMilestone("m", 2)},
			style(){return{'height':'100px', 'width':'175px'}}
		},
		101: {
			title(){return "Purchase "+format(this.effect())+" mango"},
			effect(){let bulk = new Decimal(1).mul(player.o.points.add(1).root(Math.E).tetrate(Math.E))
					 if(hasMilestone("m", 4)) bulk = player.m.points.mul(Decimal.add(1.5, Math.abs(Decimal.mul(Math.sin(player.a.sine.mul(hasMilestone("m", 3)?1:17)), 2.5)))).div(2.5).mul(player.o.points.add(1).root(Math.E).tetrate(Math.E))
					 if(hasMilestone("o", 15)) bulk = player.m.points.mul(4).div(2.5).mul(player.o.points.add(1).root(Math.E).tetrate(Math.E))
				     return bulk.max(1).mul(hasUpgrade("m", 13)?upgradeEffect("m", 13):1).mul(tmp.m.buyables[22].effect).mul(hasUpgrade("m", 21)?upgradeEffect("m", 21):1)},
			cost(){let cost = new Decimal(1.5).add(Math.abs(Decimal.mul(Math.sin(player.a.sine.mul(hasMilestone("m", 3)?1:17)), 2.5)))
				   if(hasMilestone("o", 15)) cost = new Decimal(4)
				   if(hasMilestone("m", 4)) cost = player.m.points.max(1.5)
				   return cost},
			display() {return `The cost may vary<br>Current cost: ${format(this.cost())}$`},
			canAfford() { return player.m.points.gte(this.cost()) },
			buy() {
				player.m.mango = player.m.mango.add(this.effect())
				player.m.points = player.m.points.sub(this.cost())
				if(this.cost().lt(1.505001)) player.m.famed = true
			},
			style(){return{'height':'100px', 'width':'200px'}},
			unlocked(){return true}
		},
	},
	upgrades: {
		11: {
			title: "Mango = $",
			description(){return "You gain more $ based on unspent mangoes"},
			effect(){return player.m.mango.add(1).log(17).add(1).max(1)},
			effectDisplay(){return format(this.effect())+"x"},
			cost: new Decimal(2),
			currencyInternalName: "mango",
			currencyDisplayName: "mangoes",
			currencyLayer: "m",
		},
		12: {
			title: "$ = Gain",
			description(){return "You gain more points based on unspent $"},
			effect(){let stupid = player.m.points.add(1).log(17).add(1).max(1)
					 if(player.m.points.lt(0)) return new Decimal(1)
				     return stupid},
			effectDisplay(){return format(this.effect())+"x"},
			cost: new Decimal(36),
		},
		13: {
			title(){return hasMilestone("m", 0)?"Gain = Mango":"Gain = ???"},
			description(){return hasMilestone("m", 0)?"You gain more mangoes based on "+(options.why?"":"negative" )+"points<br>Currently: "+format(this.effect())+"x":"Unlocks new tab"},
			cost: new Decimal(36),
			effect(){return new Decimal(hasMilestone("m", 0)?tmp.m.baseAmount.add(1).log(17).add(1).max(1):1)},
			currencyInternalName(){return options.why?"points":"negativePoints"},
			currencyDisplayName(){return options.why?"points":"negative points"},
			currencyLayer(){return options.why?"":"ab"},
			unlocked(){return (hasUpgrade("m", 11)&&hasUpgrade("m", 12)) || player.m.buyables[11].gte(1) || hasUpgrade("m", 13)}
		},
		21: {
			title: "Mango = Mango",
			description(){return "You gain more mangoes based on unspent mangoes"},
			effect(){return player.m.mango.add(1).log(17).add(1).max(1)},
			effectDisplay(){return format(this.effect())+"x"},
			cost: new Decimal(2000),
			currencyInternalName: "mango",
			currencyDisplayName: "mangoes",
			currencyLayer: "m",
			unlocked(){return hasMilestone("m", 3)}
		},
		22: {
			title: "$ = $",
			description(){return "You gain more $ based on unspent $"},
			effect(){let stupid = player.m.points.add(1).log(17).add(1).max(1)
					 if(player.m.points.lt(0)) return new Decimal(1)
				     return stupid},
			effectDisplay(){return format(this.effect())+"x"},
			cost: new Decimal(350),
			unlocked(){return hasMilestone("m", 3)}
		},
		23: {
			title: "Gain = Gain",
			description(){return "You gain more points based on "+(options.why?"":"negative" )+"points"},
			effect(){return tmp.m.baseAmount.add(1).log(17).add(1).max(1)},
			effectDisplay(){return format(this.effect())+"x"},
			cost: new Decimal(633),
			currencyInternalName(){return options.why?"points":"negativePoints"},
			currencyDisplayName(){return options.why?"points":"negative points"},
			currencyLayer(){return options.why?"":"ab"},
			unlocked(){return hasMilestone("m", 3)}
		},
	},
	milestones: {
		0: {
			requirementDescription: "1 Mangoes",
			effectDescription(){return (hasMilestone("m", 0)?`As IT got it's first mango, IT hasn't hesitated to take a huge bite out of it.<br>IT has eaten for the first time in millenniums and IT could truly feel emotions incomprehendable before.<br>IT was happy.<br><br>`:``)+`3rd upgrade's effect is changed and you keep this tab.`},
			done() { return player.m.offer.gte(1) },
			unlocked() {return player.m.buyables[11].gte(1)}
		},
		1: {
			requirementDescription: "10 Mangoes",
			effectDescription(){return (hasMilestone("m", 1)?`IT's life has enriched with this much mangoes at his disposal.<br>Well done, visitor! Keep gathering mangoes and...<br>it will gift you something that can resolve your main obstacle<br><br>`:``)+`Sacrificed mangoes provide point gain boost.<br>Effect: ${format(player.m.offer.add(1).log(17).add(1).max(1))}x`},
			done() { return player.m.offer.gte(10) },
			unlocked() {return hasMilestone("m", 0)||hasMilestone("o", 11)}
		},
		2: {
			requirementDescription: "100 Mangoes",
			effectDescription(){return (hasMilestone("m", 2)?`IT is satisfied.<br>Not much here to say. All I can say is good luck with this one.<br><br>`:``)+`Unlocks Mango buyables<br>(The amount of buyables you can buy depends on the magnitude of sacrificed mangoes)`},
			done() { return player.m.offer.gte(100) },
			unlocked() {return hasMilestone("m", 1)||hasMilestone("o", 11)}
		},
		3: {
			requirementDescription: "1,000 Mangoes",
			effectDescription(){return (hasMilestone("m", 3)?`With the power of 1,000 mangoes, you managed to<br>successfully restore IT's mind...<br>As soon as that happened, it'd remember that he messed up<br>Mango's cost function before losing it's mind.<br>IT has vanished just as IT reappeared in mere seconds.<br>No explanation, no logic, nor reasoning behind it...<br>Althought mango's cost has stabilized.<br>IT also remembered it's own name is Gni K... Sorta...uh <br>IT'll remember it's name eventually.<br><br>`:``)+`Mango's cost changes at much slower rate and unlocks 1 row of upgrades`},
			done() { return player.m.offer.gte(1000) },
			unlocked() {return hasMilestone("m", 2)||hasMilestone("o", 11)}
		},
		4: {
			requirementDescription: "100,000 Mangoes",
			effectDescription(){return (hasMilestone("m", 4)?`So apparently we got the wrong guy, yet very familiar...<br><br>This is<br>very<br>very<br>interesting.<br><br>Nonetheless, GinK didn't want you to leave empty handed yet.<br><br>`:``)+`You can bulk buy mangoes now`},
			done() { return player.m.offer.gte(100000) },
			unlocked() {return hasMilestone("m", 3)}
		},
		5: {
			requirementDescription: "10,000,000 Mangoes",
			effectDescription(){return (hasMilestone("m", 5)?`You've truly become a millionaire.<br><br>`:``)+`Balancers are ^1.71 stronger`},
			done() { return player.m.offer.gte(10000000) },
			unlocked() {return hasMilestone("m", 4)}
		},
	}
})

addLayer("o", {
    name: "onion", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "O", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		unlocked2: false,
		unlocked3: false,
		unlocked4: false,
		unlocked5: false,
		unlocked6: false,
		unlocked7: false,
		points: new Decimal(0),
		onions: new Decimal(0),
		first: new Decimal(0),
		second: new Decimal(0),
		third: new Decimal(0),
		fifth: new Decimal(0),
		firstLevel: new Decimal(1),
		secondLevel: new Decimal(1),
		thirdLevel: new Decimal(1),
		fifthLevel: new Decimal(1),
		vibeCheck: new Decimal(0),
		burgers: new Decimal(0),
		totalburgers: new Decimal(0),
		auto: false,
		performanceEnhancingVariable: true,
		sushis: new Decimal(0),
		teriyakis: new Decimal(0),
		treeOfLayers: new Decimal(0),
		treeOfLayersBest: new Decimal(0),
		treeOfLayersTotal: new Decimal(0),
		plots: new Decimal(0),
	}},
	clickables: {
		11: {
			title: "Manifest",
			display: "Hold to Reset (totally not stolen from Y🆎oi)",
			canClick() {
				return tmp[this.layer].canReset
			},
			onHold() {
				doReset(this.layer)
			},
			style() {return {"border-radius":"0px 33% 33% 0px","border":"4px solid","border-color":"rgba(0, 0, 0, .125)"}}
		},
		12: {
			title: "Combine",
			display: "Hold to Reset (totally not stolen from Y🆎oi)",
			canClick() {
				return tmp.o.buyables[11].canAfford
			},
			onHold() {
				tmp.o.buyables[11].buy()
			},
			style() {return {"border-radius":"0px 33% 33% 0px","border":"4px solid","border-color":"rgba(0, 0, 0, .125)",'background-color':(this.canClick()?'rgba(194, 255, 128, 1)':'#bf8f8f')}}
		},
		13: {
			title: "Produce",
			display: "Hold to Reset (totally not stolen from Y🆎oi)",
			canClick() {
				return tmp.o.buyables[41].canAfford
			},
			onHold() {
				tmp.o.buyables[41].buy()
			},
			style() {return {"border-radius":"0px 33% 33% 0px","border":"4px solid","border-color":"rgba(0, 0, 0, .125)",'background-color':(this.canClick()?'tan':'#bf8f8f')}}
		},
		14: {
			title: "Snatch",
			display: "Hold to Reset (totally not stolen from Y🆎oi)",
			canClick() {
				return tmp.o.buyables[51].canAfford
			},
			onHold() {
				tmp.o.buyables[51].buy()
			},
			unlocked(){return !player.o.unlocked4},
			style() {return {"border-radius":"0px 33% 33% 0px","border":"4px solid","border-color":"rgba(0, 0, 0, .125)",'background-color':(this.canClick()?'cyan':'#bf8f8f')}}
		}
	},
	microtabs: {
        hell: {
			"Upgrade Simulator":{
				content: [["display-text", function() {return `<span>You have <h2 style='color: brown; text-shadow: brown 0px 0px 10px;'>`+formatWhole(player.o.teriyakis)+`</h2> Teas of Tranquility<br><br>You are generating ${format(tmp.o.baseAmount.add(1).log(10).mul(tmp.o.upgrades[21].effect).mul(tmp.o.upgrades[22].effect).mul(tmp.o.upgrades[23].effect).mul(tmp.o.upgrades[24].effect).mul(tmp.o.upgrades[25].effect).mul(tmp.o.upgrades[31].effect).mul(tmp.o.upgrades[32].effect).mul(tmp.o.upgrades[33].effect).mul(tmp.o.upgrades[34].effect).mul(tmp.o.upgrades[35].effect).pow(hasUpgrade("o",41)?tmp.o.upgrades[41].effect:1).mul(hasUpgrade("o","t13")?tmp.o.upgrades["t13"].effect:1).mul(hasMilestone("o","t1")?tmp.o.buyables[31].effect:1).mul(hasUpgrade("o","t16")?player.o.treeOfLayers.add(1):1).mul(player.realAB.points.add(1).pow(2)).mul(hasUpgrade("o","t18")?tmp.realAB.buyables[12].effect:1))} ToTs based on current ${tmp.o.baseResource} and it caps at ${format(player.o.points.mul(player.o.vibeCheck).mul(player.o.burgers).mul(player.o.treeOfLayers.add(1)))} ToTs based on current amounts of LoLs, OlOs and BoBs`}],["upgrades",[2,3,4,5,6,7,8,9,10]]],
				unlocked(){return hasUpgrade("o", 41)},
				buttonStyle(){return{'border-color':'brown'}}
			},
			"tree of help":{
				content: [["display-text", function() {return `<span>You have <h2 style='color: brown; text-shadow: brown 0px 0px 10px;'>${format(player.o.treeOfLayers)}</h2> Layers, increasing your ToTs cap by ${format(player.o.treeOfLayers.add(1))}x<br>Your best Layers is ${format(player.o.treeOfLayersBest)}<br>Your total Layers is ${format(player.o.treeOfLayersTotal)}<br><br>You have ${format(player.o.teriyakis)} Teas of Tranquility<br><br>You are gaining ${format(tmp.o.getLayerGain)} Layers per second<br>You are losing ${format(tmp.o.treeOfBullshit.mul(100))}% of your Layers per second<br>Net gain: ${format(tmp.o.getLayerGain.sub(player.o.treeOfLayers.mul(tmp.o.treeOfBullshit)))}<br><br>Layer base gain formula:<br>[ln(ToTs`+(player.o.buyables[112].gte(1)?` x ${formatWhole(tmp.o.buyables[112].effect.add(1))}` :``)+` `+(hasUpgrade("o","t19")?` x ${format(player.o.treeOfLayersBest.add(1))} ` :``)+`+ 1)]`}],"blank",["milestones",["t0","t1","t2","t3","t4","t5","tFinal","t6","t7","t8"]],"blank",["buyables", [11]],"blank",["column", [["row", [["upgrade",["t11"]],["upgrade",["t12"]],["upgrade",["t13"]],["upgrade",["t14"]],["upgrade",["t15"]]]],["row", [["upgrade",["t16"]],["upgrade",["t17"]],["upgrade",["t18"]],["upgrade",["t19"]],["upgrade",["t20"]]]]]]],
				unlocked(){return hasUpgrade("o", 41)},
				buttonStyle(){return{'border-color':'brown'}}
			},
			"Shenanigans Tree":{
				content: [["display-text",function(){return "<span>You have <h2 class='overlayThing' id='points'>"+format(player.o.plots)+"</h2> plots...<br>("+format(canHeGeneratePlottho())+"/sec)<br>"+(hasAchievement("realAB",43)?"":"(hardcapped at "+format(canHeGeneratePlottho().sqrt().mul(hasUpgrade("pp",12)?60:1).sub(10).max(0).add(10))+"/tick due balancing issues)<br>")+"<br>Wait a second."}],"blank",["tree", [["pp","realAB"],["realT", "realC"],["realS"]]]],
				unlocked(){return hasMilestone("o", "t4")},
				buttonStyle(){return{'border-color':'brown'}}
			}
		}
	},
	treeOfBullshit(){
		return new Decimal(1).sub(hasUpgrade("o","t12")?tmp.o.upgrades["t12"].effect:0)
	},
	getLayerGain(){
		return player.o.teriyakis.mul(tmp.o.buyables[112].effect).mul(hasUpgrade("o","t19")?player.o.treeOfLayersBest.add(1):1).add(1).log(10).mul(tmp.o.buyables[111].effect).add(hasUpgrade("o","t11")?tmp.o.upgrades["t11"].effect:0).mul(hasUpgrade("o","t15")?tmp.o.upgrades["t15"].effect:1).mul(hasUpgrade("o","t17")?tmp.o.upgrades["t17"].effect:1).add(tmp.o.buyables[113].effect2)
	},
	tabFormat:{
		"Layer":{
			content:["main-display",["row", ["prestige-button", ["clickable", 11]]],"resource-display",["milestones", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]]],
			unlocked(){return player.o.unlocked2||hasMilestone("o", 6)},
		},
		"Onion":{
			content:[["display-text", function() {return "<span>You have <h2 style='color: rgba(194, 255, 128, 1); text-shadow: rgba(194, 255, 128, 1) 0px 0px 10px;'>"+formatWhole(player.o.onions)+"/"+formatWhole(player.o.vibeCheck)+"</h2> Onions la Ordinarance</span>"}],"blank",["row", [["buyable", 11], ["clickable", 12]]],"resource-display",["milestones", ["o0", "o1"]],["buyable", 31],"blank",["buyables", [2]], "blank", ["row", [["bar", "one"],["blank", ["114px", "0px"]],["bar", "two"],["blank", ["114px", "0px"]],["bar", "three"]]],"blank",["buyable", 32],"blank",["bar", "fifth"]],
			unlocked(){return player.o.unlocked2||hasMilestone("o", 6)},
			buttonStyle(){return{'border-color':'rgba(194, 255, 128, 1)'}}
		},
		"Burger":{
			content:[["display-text", function() {return "<span>what the<br><br>why do we have <h2 style='color: tan; text-shadow: tan 0px 0px 10px;'>"+formatWhole(player.o.burgers)+"</h2> Burgers of Bias inside onion related layer???<br><br>which boost point gain by "+format(player.o.burgers.add(1).pow(3).root(2))+"x, by the way</span>"}],"blank",["row", [["buyable", 41], ["clickable", 13]]],["blank", ["0px", "4px"]], ["display-text", function() {return "You have "+formatWhole(tmp.o.baseAmount)+" "+tmp.o.baseResource+"<br>You have made a total of  "+formatWhole(player.o.totalburgers)+" Burgers of Bias"}],["milestones", ["b0", "b1", "b2", "b3", "b4", "b5"]],["upgrades",[1]],"challenges"],
			unlocked(){return player.o.unlocked3||hasMilestone("o", 17)},
			buttonStyle(){return{'border-color':'tan'}}
		},
		"Sushi":{
			content:[["display-text", function() {return "<span>You have <h2 style='color: cyan; text-shadow: cyan 0px 0px 10px;'>"+formatWhole(player.o.sushis)+"</h2> Sushis of Sociopathy, boosting your point gain by "+format(player.o.sushis.add(2).log(2).pow(0.8).mul(tmp.o.buyables[101].effect))+"x</span>"}],"blank",["row", [["buyable", 51], ["clickable", 14]]],"resource-display",["display-text",function(){return player.o.unlocked4?`You are producing ${format(tmp.o.buyables[61].effect.mul(tmp.o.buyables[62].effect).mul(tmp.o.buyables[63].effect).mul(tmp.o.buyables[73].effect).mul(tmp.o.buyables[82].effect).mul(tmp.o.buyables[83].effect).mul(tmp.o.buyables[93].effect).mul(hasUpgrade("o","t14")?2.25:1))} Sushis of Sociopathy per second<br><br>Cost scaling starts at ${format(Decimal.add(25, tmp.o.buyables[92].effect))} buyables`:``}],"blank",["milestone", "s0"],"blank",["buyables", [6]],"blank",["buyables", [7]],"blank",["buyables", [8]],"blank",["buyables", [9]],"blank",["buyables", [10]]],
			unlocked(){return player.o.unlocked4||hasChallenge("o", 22)},
			buttonStyle(){return{'border-color':'cyan'}}
		},
		"Tea":{
			content:[["microtabs", "hell", {'border-color': 'rgba(0,0,0,0)'}]],
			unlocked(){return player.o.unlocked5},
			buttonStyle(){return{'border-color':'brown'}}
		},
		"Eggroll":{
			content:[["display-text", function() {return "<span>You have <h2 style='color: yellow; text-shadow: white 0px 0px 10px;'>"+formatWhole(player.o.teriyakis)+"</h2> Eggroll of Eggroll"}]],
			unlocked(){return false},
			buttonStyle(){return{'border-color':'white','color':'yellow'}}
		},
		"Root":{
			content:[["display-text", function() {return "<span>You have <h2 style='color: cyan; text-shadow: cyan 0px 0px 10px;'>"+formatWhole(player.o.teriyakis)+"</h2> Root of Retributions"}]],
			unlocked(){return false},
			buttonStyle(){return{'border-color':'cyan'}}
		},
	},
	update(diff){
		if(hasAchievement("a",1014)&&canReset("o")){
			if(player.o.points.lt(18))player.o.milestones.push(player.o.points+'')
			player.o.points = player.o.points.add(1)
		}
		if(inChallenge("o", 21)){
			player.o.performanceEnhancingVariable = false
			tmp.n.tabFormat["Neverend"].content[1][1][0] = ''
			tmp.n.tabFormat["Neverend"].content[1][1][1] = ''
			tmp.n.tabFormat["Neverend 2"].content[1][1][0] = ''
			tmp.n.tabFormat["Neverend 2"].content[1][1][1] = ''
			tmp.m.tabFormat["Mango"].content[1][1][0] = ''	
			tmp.m.tabFormat["Mango"].content[1][1][1] = ''	
		}
		if(!inChallenge("o", 21)&&player.o.performanceEnhancingVariable == false){
			player.o.performanceEnhancingVariable = true
			tmp.n.tabFormat["Neverend"].content[1][1][0] = 'prestige-button'
			tmp.n.tabFormat["Neverend"].content[1][1][1] = ["clickable",11]
			tmp.n.tabFormat["Neverend 2"].content[1][1][0] = 'prestige-button'
			tmp.n.tabFormat["Neverend 2"].content[1][1][1] = ["clickable",11]
			tmp.m.tabFormat["Mango"].content[1][1][0] = 'prestige-button'
			tmp.m.tabFormat["Mango"].content[1][1][1] = ["clickable",11]
		}
		player.o.first = player.o.first.add(player.o.buyables[21].mul(diff).mul(player.o.buyables[21].gte(1)&&player.o.buyables[22].gte(1)&&player.o.buyables[23].gte(1)?2/3:1).mul(tmp.o.buyables[32].effect))
		if(player.o.first.gte(new Decimal(10).mul(player.o.firstLevel.pow(2)))){
			player.o.first = new Decimal(0)
			player.o.firstLevel = player.o.firstLevel.add(1)
		}
		player.o.second = player.o.second.add(player.o.buyables[22].mul(diff).mul(player.o.buyables[21].gte(1)&&player.o.buyables[22].gte(1)&&player.o.buyables[23].gte(1)?2/3:1).mul(tmp.o.buyables[32].effect))
		if(player.o.second.gte(new Decimal(10).mul(player.o.secondLevel.pow(2)))){
			player.o.second = new Decimal(0)
			player.o.secondLevel = player.o.secondLevel.add(1)
		}
		player.o.third = player.o.third.add(player.o.buyables[23].mul(diff).mul(player.o.buyables[21].gte(1)&&player.o.buyables[22].gte(1)&&player.o.buyables[23].gte(1)?2/3:1).mul(tmp.o.buyables[32].effect))
		if(player.o.third.gte(new Decimal(10).mul(player.o.thirdLevel.pow(2)))){
			player.o.third = new Decimal(0)
			player.o.thirdLevel = player.o.thirdLevel.add(1)
		}
		player.o.fifth = player.o.fifth.add(new Decimal(player.o.buyables[21].add(player.o.buyables[22]).add(player.o.buyables[23])).mul(diff).mul(tmp.o.buyables[32].effect).mul(player.o.buyables[21].gte(1)&&player.o.buyables[22].gte(1)&&player.o.buyables[23].gte(1)?1/9:0))
		if(player.o.fifth.gte(new Decimal(10).mul(Decimal.pow(Decimal.root(4,3), player.o.fifthLevel.sub(1))))){
			player.o.fifth = new Decimal(0)
			player.o.fifthLevel = player.o.fifthLevel.add(1)
		}
		if(player.o.buyables[21].lt(0)||player.o.buyables[22].lt(0)||player.o.buyables[23].lt(0)){
			player.o.buyables[21] = new Decimal(0)
			player.o.buyables[22] = new Decimal(0)
			player.o.buyables[23] = new Decimal(0)
			player.o.onions = player.o.vibeCheck
		}
		if(player.o.unlocked4){
			player.o.sushis=player.o.sushis.add(tmp.o.buyables[61].effect.mul(tmp.o.buyables[62].effect).mul(tmp.o.buyables[63].effect).mul(tmp.o.buyables[73].effect).mul(tmp.o.buyables[82].effect).mul(tmp.o.buyables[83].effect).mul(tmp.o.buyables[93].effect).mul(hasUpgrade("o","t14")?2.25:1).mul(diff))
		}
		if(player.o.unlocked5&&!player.o.teriyakis.eq(player.o.points.mul(player.o.vibeCheck).mul(player.o.burgers).mul(player.o.treeOfLayers.add(1)))){
			player.o.teriyakis=player.o.teriyakis.lt(player.o.points.mul(player.o.vibeCheck).mul(player.o.burgers).mul(player.o.treeOfLayers.add(1)))?player.o.teriyakis.add(tmp.o.baseAmount.add(1).log(10).mul(diff).mul(tmp.o.upgrades[21].effect).mul(tmp.o.upgrades[22].effect).mul(tmp.o.upgrades[23].effect).mul(tmp.o.upgrades[24].effect).mul(tmp.o.upgrades[25].effect).mul(tmp.o.upgrades[31].effect).mul(tmp.o.upgrades[32].effect).mul(tmp.o.upgrades[33].effect).mul(tmp.o.upgrades[34].effect).mul(tmp.o.upgrades[35].effect).pow(hasUpgrade("o",41)?tmp.o.upgrades[41].effect:1).mul(hasUpgrade("o","t13")?tmp.o.upgrades["t13"].effect:1).mul(hasMilestone("o","t1")?tmp.o.buyables[31].effect:1).mul(hasUpgrade("o","t16")?player.o.treeOfLayers.add(1):1).mul(player.realAB.points.add(1).pow(2)).mul(hasUpgrade("o","t18")?tmp.realAB.buyables[12].effect:1)):player.o.points.mul(player.o.vibeCheck).mul(player.o.burgers).mul(player.o.treeOfLayers.add(1))
		}
		if(hasUpgrade("o", 41)){
			let gain = tmp.o.getLayerGain.sub(player.o.treeOfLayers.mul(tmp.o.treeOfBullshit)).mul(diff)
			player.o.treeOfLayers = player.o.treeOfLayers.add(gain).max(0)
			player.o.treeOfLayersBest = player.o.treeOfLayersBest.max(player.o.treeOfLayers)
			player.o.treeOfLayersTotal = player.o.treeOfLayersTotal.add(gain.max(0))
		}
		if(hasMilestone("o","t5")){
			player.o.burgers = player.o.burgers.add(tmp.o.buyables[41].gain.mul(diff).div(hasUpgrade("o",43)?1:100))
			player.o.totalburgers = player.o.totalburgers.add(tmp.o.buyables[41].gain.mul(diff).div(hasUpgrade("o",43)?1:100))
		}
		if(hasMilestone("o","s0")){
			for(i=6;i<10;i++){
				for(v=1;v<4;v++){
					if(tmp.o.buyables[i*10+v].canAfford) player.o.buyables[i*10+v]=player.o.buyables[i*10+v].add(1)
				}
			}
		}
		if(hasMilestone("o","t8")&&tmp.o.buyables[112].canAfford) tmp.o.buyables[112].buy()
		if(player.o.auto) doReset("o")
	},
    color: "#FFFF00",
    requires(){return ((player.n.upgrades.length >= 29 && player.m.upgrades.length >= 6 && player.m.milestones.length >= 5 && player.n.milestones.length >= 3)||player.o.unlocked)?new Decimal(227880000).div(tmp.o.buyables[31].effect).mul(player.o.points.eq(1)?2:1).mul(player.o.points.gte(36)?Decimal.mul(player.o.points.pow(3), player.o.points.div(2).add(32)).div(50):player.o.points.lt(36)&&player.o.points.gte(15)?Decimal.mul(player.o.points.pow(3), player.o.points.add(14)).div(50):player.o.points.lt(15)&&player.o.points.gte(1)?Decimal.mul(player.o.points, player.o.points.add(1).div(3).add(24)).div(50):1).pow(player.o.points.gte(186)?player.o.points.sub(185).div(186).add(1):1):new Decimal("1e600000")}, // Can be a function that takes requirement increases into account
	tooltipLocked(){return "Reach 227,880,000 "+(options.why?"":"negative ")+"points and complete Neverend and Mango layers to unlock"},
	effectDescription(){return `increasing your initial coins by ${format(player.o.points.mul(70))} and mango gain by ${format(player.o.points.add(1).root(Math.E).tetrate(Math.E))}x`},
    resource: "Layers of Life", // Name of prestige currency
    baseResource(){return options.why?"points":"negative points"}, // Name of resource prestige is based on
    baseAmount() {return options.why?player.points:player.ab.negativePoints}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base(){return player.o.points.gte(player.o.vibeCheck.add(7))?player.o.points.add(player.o.vibeCheck):-1}, // Prestige currency exponent
	exponent(){return player.o.points.gte(player.o.vibeCheck.add(7))?0.5:-10000000000}, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "o", description: "O: Reset for layers of life", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	upgrades: {
		11: {
			title: "Expired Burgers",
			description: "Total Burgers of Bias boosts point gain as well",
			effect(){return player.o.totalburgers.add(1).pow(2).root(3)},
			effectDisplay(){return format(this.effect())+"x"},
			cost: new Decimal(3),
			currencyInternalName: "burgers",
			currencyDisplayName: "Burgers of Bias",
			currencyLayer: "o",
			style(){return{'background-color':(player.o.burgers.gte(3)&&!hasUpgrade("o", 11)?'tan':'')}}
		},
		12: {
			title: "Recycled Burgers",
			description: "Enhancing Enhancer's effect boosts point gain",
			cost: new Decimal(7),
			currencyInternalName: "burgers",
			currencyDisplayName: "Burgers of Bias",
			currencyLayer: "o",
			style(){return{'background-color':(player.o.burgers.gte(7)&&!hasUpgrade("o", 12)?'tan':'')}}
		},
		21: {
			title: "Generic Ass Tea Upgrade #1",
			description: "You gain 2x more ToTs per second",
			effect(){return hasUpgrade("o",21)?new Decimal(2).mul(hasUpgrade("o", 22)?tmp.o.upgrades[22].effect:1).mul(hasUpgrade("o", 23)?tmp.o.upgrades[23].effect:1).mul(hasUpgrade("o", 24)?tmp.o.upgrades[24].effect:1).mul(hasUpgrade("o", 25)?tmp.o.upgrades[25].effect:1).mul(hasUpgrade("o", 31)?tmp.o.upgrades[31].effect:1).mul(hasUpgrade("o", 32)?tmp.o.upgrades[32].effect:1).mul(hasUpgrade("o", 33)?tmp.o.upgrades[33].effect:1).mul(hasUpgrade("o", 34)?tmp.o.upgrades[34].effect:1).mul(hasUpgrade("o", 35)?tmp.o.upgrades[35].effect:1):new Decimal(1)},
			cost: new Decimal(1250),
			currencyInternalName: "teriyakis",
			currencyDisplayName: "Teas of Tranquility",
			currencyLayer: "o",
			style(){return{'background-color':(player.o.teriyakis.gte(this.cost)&&!hasUpgrade("o", this.id)?'brown':'')}}
		},
		22: {
			title: "Generic Ass Tea Upgrade #2",
			description: "You gain 1.5x more ToTs per second and previous upgrade is 1.5x stronger",
			effect(){return hasUpgrade("o",22)?new Decimal(1.5).mul(hasUpgrade("o", 23)?tmp.o.upgrades[23].effect:1).mul(hasUpgrade("o", 24)?tmp.o.upgrades[24].effect:1).mul(hasUpgrade("o", 25)?tmp.o.upgrades[25].effect:1).mul(hasUpgrade("o", 31)?tmp.o.upgrades[31].effect:1).mul(hasUpgrade("o", 32)?tmp.o.upgrades[32].effect:1).mul(hasUpgrade("o", 33)?tmp.o.upgrades[33].effect:1).mul(hasUpgrade("o", 34)?tmp.o.upgrades[34].effect:1).mul(hasUpgrade("o", 35)?tmp.o.upgrades[35].effect:1):new Decimal(1)},
			cost: new Decimal(25780),
			currencyInternalName: "teriyakis",
			currencyDisplayName: "Teas of Tranquility",
			currencyLayer: "o",
			unlocked(){return hasUpgrade("o", 21)},
			style(){return{'background-color':(player.o.teriyakis.gte(this.cost)&&!hasUpgrade("o", this.id)?'brown':'')}}
		},
		23: {
			title: "Generic Ass Tea Upgrade #3",
			description: "You gain 1.25x more ToTs per second and previous upgrades are 1.25x stronger",
			effect(){return hasUpgrade("o",23)?new Decimal(1.25).mul(hasUpgrade("o", 24)?tmp.o.upgrades[24].effect:1).mul(hasUpgrade("o", 25)?tmp.o.upgrades[25].effect:1).mul(hasUpgrade("o", 31)?tmp.o.upgrades[31].effect:1).mul(hasUpgrade("o", 32)?tmp.o.upgrades[32].effect:1).mul(hasUpgrade("o", 33)?tmp.o.upgrades[33].effect:1).mul(hasUpgrade("o", 34)?tmp.o.upgrades[34].effect:1).mul(hasUpgrade("o", 35)?tmp.o.upgrades[35].effect:1):new Decimal(1)},
			cost: new Decimal(580000),
			currencyInternalName: "teriyakis",
			currencyDisplayName: "Teas of Tranquility",
			currencyLayer: "o",
			unlocked(){return hasUpgrade("o", 22)},
			style(){return{'background-color':(player.o.teriyakis.gte(this.cost)&&!hasUpgrade("o", this.id)?'brown':'')}}
		},
		24: {
			title: "Generic Ass Tea Upgrade #4",
			description: "You gain 1.125x more ToTs per second and previous upgrades are 1.125x stronger",
			effect(){return hasUpgrade("o",24)?new Decimal(1.125).mul(hasUpgrade("o", 25)?tmp.o.upgrades[25].effect:1).mul(hasUpgrade("o", 31)?tmp.o.upgrades[31].effect:1).mul(hasUpgrade("o", 32)?tmp.o.upgrades[32].effect:1).mul(hasUpgrade("o", 33)?tmp.o.upgrades[33].effect:1).mul(hasUpgrade("o", 34)?tmp.o.upgrades[34].effect:1).mul(hasUpgrade("o", 35)?tmp.o.upgrades[35].effect:1):new Decimal(1)},
			cost: new Decimal(14162000),
			currencyInternalName: "teriyakis",
			currencyDisplayName: "Teas of Tranquility",
			currencyLayer: "o",
			unlocked(){return hasUpgrade("o", 23)},
			style(){return{'background-color':(player.o.teriyakis.gte(this.cost)&&!hasUpgrade("o", this.id)?'brown':'')}}
		},
		25: {
			title: "Generic Ass Tea Upgrade #5",
			description: "You gain 1.0625x more ToTs per second and... you get the idea",
			effect(){return hasUpgrade("o",25)?new Decimal(1.0625).mul(hasUpgrade("o", 31)?tmp.o.upgrades[31].effect:1).mul(hasUpgrade("o", 32)?tmp.o.upgrades[32].effect:1).mul(hasUpgrade("o", 33)?tmp.o.upgrades[33].effect:1).mul(hasUpgrade("o", 34)?tmp.o.upgrades[34].effect:1).mul(hasUpgrade("o", 35)?tmp.o.upgrades[35].effect:1):new Decimal(1)},
			cost: new Decimal(363370000),
			currencyInternalName: "teriyakis",
			currencyDisplayName: "Teas of Tranquility",
			currencyLayer: "o",
			unlocked(){return hasUpgrade("o", 24)},
			style(){return{'background-color':(player.o.teriyakis.gte(this.cost)&&!hasUpgrade("o", this.id)?'brown':'')}}
		},
		31: {
			title: "G.A.T.U. #6",
			description: "Same as previous upgrade, but halved",
			effect(){return hasUpgrade("o",21)?new Decimal(0.0625/2+1).mul(hasUpgrade("o", 32)?tmp.o.upgrades[32].effect:1).mul(hasUpgrade("o", 33)?tmp.o.upgrades[33].effect:1).mul(hasUpgrade("o", 34)?tmp.o.upgrades[34].effect:1).mul(hasUpgrade("o", 35)?tmp.o.upgrades[35].effect:1):new Decimal(1)},
			cost: new Decimal(9585400000),
			currencyInternalName: "teriyakis",
			currencyDisplayName: "Teas of Tranquility",
			currencyLayer: "o",
			unlocked(){return hasUpgrade("o", 25)},
			style(){return{'background-color':(player.o.teriyakis.gte(this.cost)&&!hasUpgrade("o", this.id)?'brown':'')}}
		},
		32: {
			title: "G.A.T.U. #7",
			description: "Same as previous upgrade, but halved",
			effect(){return hasUpgrade("o",32)?new Decimal(0.0625/4+1).mul(hasUpgrade("o", 33)?tmp.o.upgrades[33].effect:1).mul(hasUpgrade("o", 34)?tmp.o.upgrades[34].effect:1).mul(hasUpgrade("o", 35)?tmp.o.upgrades[35].effect:1):new Decimal(1)},
			cost: new Decimal(248824000000),
			currencyInternalName: "teriyakis",
			currencyDisplayName: "Teas of Tranquility",
			currencyLayer: "o",
			unlocked(){return hasUpgrade("o", 31)},
			style(){return{'background-color':(player.o.teriyakis.gte(this.cost)&&!hasUpgrade("o", this.id)?'brown':'')}}
		},
		33: {
			title: "G.A.T.U. #8",
			description: "Same as previous upgrade, but halved",
			effect(){return hasUpgrade("o",33)?new Decimal(0.0625/8+1).mul(hasUpgrade("o", 34)?tmp.o.upgrades[34].effect:1).mul(hasUpgrade("o", 35)?tmp.o.upgrades[35].effect:1):new Decimal(1)},
			cost: new Decimal(6711650000000),
			currencyInternalName: "teriyakis",
			currencyDisplayName: "Teas of Tranquility",
			currencyLayer: "o",
			unlocked(){return hasUpgrade("o", 32)},
			style(){return{'background-color':(player.o.teriyakis.gte(this.cost)&&!hasUpgrade("o", this.id)?'brown':'')}}
		},
		34: {
			title: "G.A.T.U. #9",
			description: "Same as previous upgrade, but halved",
			effect(){return hasUpgrade("o",34)?new Decimal(0.0625/16+1).mul(hasUpgrade("o", 35)?tmp.o.upgrades[35].effect:1):new Decimal(1)},
			cost: new Decimal(181733900000000),
			currencyInternalName: "teriyakis",
			currencyDisplayName: "Teas of Tranquility",
			currencyLayer: "o",
			unlocked(){return hasUpgrade("o", 33)},
			style(){return{'background-color':(player.o.teriyakis.gte(this.cost)&&!hasUpgrade("o", this.id)?'brown':'')}}
		},
		35: {
			title: "G.A.T.U. #10",
			description: "Same as previous upgrade, but halved",
			effect(){return hasUpgrade("o",35)?new Decimal(0.0625/32+1):new Decimal(1)},
			cost: new Decimal(4930424000000000),
			currencyInternalName: "teriyakis",
			currencyDisplayName: "Teas of Tranquility",
			currencyLayer: "o",
			unlocked(){return hasUpgrade("o", 34)},
			style(){return{'background-color':(player.o.teriyakis.gte(this.cost)&&!hasUpgrade("o", this.id)?'brown':'')}}
		},
		41: {
			title: "Kilo Ge- NO.",
			description(){return "Your ToTs/s is raised based on how many G.A.T.U. upgrades you bought<br><br>"+(hasUpgrade("o", 41)?"WAIT FUCK GO BACK":"also unlocks something new")},
			effect(){
				let thatAss = new Decimal(0)
				for(i=1;i<6;i++){
					for(v=2;v<4;v++){
						thatAss=thatAss.add(hasUpgrade("o", v*10+i)?1:0)
					}
				}
				return thatAss.div(100).add(1)
			},
			effectDisplay(){return "^"+format(this.effect())},
			cost: new Decimal(2500),
			currencyInternalName: "teriyakis",
			currencyDisplayName: "Teas of Tranquility",
			currencyLayer: "o",
			unlocked(){return hasUpgrade("o", 21)},
			style(){return{'background-color':(player.o.teriyakis.gte(this.cost)&&!hasUpgrade("o", this.id)?'brown':'')}}
		},
		42: {
			title: "Sushi-To-Plot Conversion",
			description(){return "For some reason your Sushis are writing plot for the next blockbuster.<br>also boosts your plot i guess"},
			effect(){return player.o.sushis.add(1).log(10).add(1).log(10).add(1)},
			effectDisplay(){return format(this.effect())+"x"},
			cost: new Decimal(22800000000),
			currencyInternalName: "teriyakis",
			currencyDisplayName: "Teas of Tranquility",
			currencyLayer: "o",
			unlocked(){return hasMilestone("o","t4")&&hasUpgrade("o", 41)},
			style(){return{'background-color':(player.o.teriyakis.gte(this.cost)&&!hasUpgrade("o", this.id)?'brown':'')}}
		},
		43: {
			title: "Milestone Enhancing Mechanic",
			description(){return `"28 Layer" milestone passively generates 100% of BoB and you are gaining 1 OlO per tick instead`},
			cost: new Decimal("1e12"),
			currencyInternalName: "teriyakis",
			currencyDisplayName: "Teas of Tranquility",
			currencyLayer: "o",
			unlocked(){return hasMilestone("o","t5")&&hasUpgrade("o", 42)},
			style(){return{'background-color':(player.o.teriyakis.gte(this.cost)&&!hasUpgrade("o", this.id)?'brown':'')}}
		},
		t11: {
			title: "#tmt-help",
			description: "You have gotten multiple errors and you have no idea what they mean. You head over to #tmt-help to get some help.<br><br>You gain more Layers based on your best Layers",
			effect(){return player.o.treeOfLayersBest.add(1).root(2).sub(1)},
			effectDisplay(){return "+"+format(this.effect())},
			cost: new Decimal(1/3),
			onPurchase(){player.o.upgrades.push("t11")},
			currencyInternalName: "treeOfLayers",
			currencyDisplayName: "Layer",
			currencyLayer: "o",
			style(){return{'background-color':(player.o.treeOfLayers.gte(1/3)&&!hasUpgrade("o", "t11")?'brown':'')}}
		},
		t12: {
			title: "READ. THE. DOCS.",
			description: "After countless tips and failures, you decided to open up docs folder for the first time and read the context. You're starting to truly understand how to make a layer now.<br><br>You lose less Layers per second based on bought upgrades",
			effect(){
				let thatAss = new Decimal(0).add(hasUpgrade("o", "t11")?1:0).add(hasUpgrade("o", "t12")?1:0).add(hasUpgrade("o", "t13")?1:0).add(hasUpgrade("o", "t14")?1:0).add(hasUpgrade("o", "t15")?1:0).add(hasUpgrade("o", "t16")?1:0).add(hasUpgrade("o", "t17")?1:0).add(hasUpgrade("o", "t18")?1:0).add(hasUpgrade("o", "t19")?1:0).add(hasUpgrade("o", "t20")?1:0).div(100)
				for(i=1;i<6;i++){
					for(v=2;v<5;v++){
						thatAss=thatAss.add(hasUpgrade("o", v*10+i)?0.01:0)
					}
				}
				if(hasMilestone("o","t2"))thatAss=thatAss.add(hasMilestone("o", "t0")?0.01:0).add(hasMilestone("o", "t1")?0.01:0).add(hasMilestone("o", "t2")?0.01:0).add(hasMilestone("o", "t3")?0.01:0).add(hasMilestone("o", "t4")?0.01:0).add(hasMilestone("o", "t5")?0.01:0).add(hasMilestone("o", "t6")?0.01:0).add(hasMilestone("o", "tFinal")?0.01:0).add(hasMilestone("o", "t7")?0.01:0).add(hasMilestone("o", "t8")?0.01:0)
				return thatAss.mul(hasUpgrade("o","t20")?2:1)
			},
			effectDisplay(){return "-"+format(this.effect().mul(100))+"%"},
			cost: new Decimal(0.8),
			onPurchase(){player.o.upgrades.push("t12")},
			currencyInternalName: "treeOfLayers",
			currencyDisplayName: "Layer",
			currencyLayer: "o",
			unlocked(){return hasUpgrade("o","t11")},
			style(){return{'background-color':(player.o.treeOfLayers.gte(0.8)&&!hasUpgrade("o", "t12")?'brown':'')}}
		},
		t13: {
			title: "passive<br>Generation()",
			description: "So you made your first layer and proceeded to make a new one... You know, it'd be nice to have 1st layer give points without prestiging.<br><br>Your total Layers boosts ToT gain",
			effect(){
				return player.o.treeOfLayersTotal.add(1).root(3)
			},
			effectDisplay(){return format(this.effect())+"x"},
			cost: new Decimal(1),
			onPurchase(){player.o.upgrades.push("t13")},
			currencyInternalName: "treeOfLayers",
			currencyDisplayName: "Layer",
			currencyLayer: "o",
			unlocked(){return hasUpgrade("o","t12")},
			style(){return{'background-color':(player.o.treeOfLayers.gte(1)&&!hasUpgrade("o", "t13")?'brown':'')}}
		},
		t14: {
			fullDisplay(){return "<h3>Condition?1.5:1.5</h3><br>So you want to show players WHAT effect each upgrade has without it affecting other and make your code look a bit coherent? Well now you can in more compactful way!<br><br>Actually superpositions the condition and gives 2.25x boost to Sushi gain<br><br>Cost: 1.25 Layers"},
			cost: new Decimal(1.25),
			onPurchase(){player.o.upgrades.push("t14")},
			currencyInternalName: "treeOfLayers",
			currencyDisplayName: "Layer",
			currencyLayer: "o",
			unlocked(){return hasUpgrade("o","t13")},
			style(){return{'background-color':(player.o.treeOfLayers.gte(1.25)&&!hasUpgrade("o", "t14")?'brown':'')}}
		},
		t15: {
			fullDisplay(){return `<h3>tmp["p"].eff2</h3><br>You seem to be proud of your tree so far. A bit of customization wouldn't hurt nonetheless...<br>and you somehow fuck it up<br>You figure out what's wrong and fixed the issue.<br><br>SoS boosts Layers gain at very reduced rate<br>Currently: ${format(this.effect())+"x"}<br><br>Cost: 1.6 Layers`},
			cost: new Decimal(1.6),
			effect(){return player.o.sushis.add(1).log(10).add(1).root(52)},
			onPurchase(){player.o.upgrades.push("t15")},
			currencyInternalName: "treeOfLayers",
			currencyDisplayName: "Layer",
			currencyLayer: "o",
			unlocked(){return hasUpgrade("o","t14")},
			style(){return{'background-color':(player.o.treeOfLayers.gte(1.6)&&!hasUpgrade("o", "t15")?'brown':'')}}
		},
		t16: {
			fullDisplay(){return `<h3>We couldn't afford undecimals</h3><br>After successfully creating mod and updating numerous times, you thought to yourself - "Why make mod with Decimal, when I can use other bases?"<br>And so, you decided to give it a try and make custom base system to handle everything for you<br><br>Layers boost ToTs gain as well<br><br>Cost: 13.69 Layers`},
			cost: new Decimal(13.69),
			effect(){return player.o.sushis.add(1).log(10).add(1).root(52)},
			onPurchase(){player.o.upgrades.push("t16")},
			currencyInternalName: "treeOfLayers",
			currencyDisplayName: "Layer",
			currencyLayer: "o",
			unlocked(){return hasMilestone("o","t3")},
			style(){return{'background-color':(player.o.treeOfLayers.gte(13.69)&&!hasUpgrade("o", "t16")?'brown':'')}}
		},
		t17: {
			fullDisplay(){return `<h3>≺p≻</h3><br><p style='transform: scale(-1, -1)'>sɹǝʎɐ⅂ ɛᘔ :ʇsoƆ<br><br>haha transform: scale(-1, -1) go brrrr<br><br>Anti-balancers boost Layers gain at very reduced rate<br>Currently: ${format(this.effect())}x`},
			cost: new Decimal(23),
			effect(){return player.realAB.points.add(hasMilestone("realAB",2)?1:0).pow(hasMilestone("realAB",2)?2:1).div(100).add(1)},
			onPurchase(){player.o.upgrades.push("t17")},
			currencyInternalName: "treeOfLayers",
			currencyDisplayName: "Layer",
			currencyLayer: "o",
			unlocked(){return hasMilestone("o","t4")},
			style(){return{'background-color':(player.o.treeOfLayers.gte(23)&&!hasUpgrade("o", "t17")?'brown':'')}}
		},
		t18: {
			fullDisplay(){return `<h3>Make a new layers.js</h3><br>So apparently making 25 layers in a single file gets messy real quick.<br>You take advantage of TMT and separate them into multiple files to make things easier to manage.<br><br>Anti-Diviser multiplies your ToT gain as well<br><br>Cost: 25 layers`},
			cost: new Decimal(25),
			effect(){return tmp.realAB.buyables[12].effect},
			onPurchase(){player.o.upgrades.push("t18")},
			currencyInternalName: "treeOfLayers",
			currencyDisplayName: "Layer",
			currencyLayer: "o",
			unlocked(){return hasMilestone("o","t4")&&hasUpgrade("o", "t17")},
			style(){return{'background-color':(player.o.treeOfLayers.gte(25)&&!hasUpgrade("o", "t18")?'brown':'')}}
		},
		t19: {
			fullDisplay(){return `<h3>Play other TMTs</h3><br>You're struggling with making new fresh layer from how many ideas you've reused.<br>Perhaps you should take a break and take few notes from other Incrementals. Hell, perhaps even play some TMTs.<br><br>THE FUCK YOU MEAN "NUH UH"??<br>(Multiplies base ToTs by best ToTs in formula)<br><br>Cost: 26 layers`},
			cost: new Decimal(26),
			effect(){return tmp.realAB.buyables[12].effect},
			onPurchase(){player.o.upgrades.push("t19")},
			currencyInternalName: "treeOfLayers",
			currencyDisplayName: "Layer",
			currencyLayer: "o",
			unlocked(){return hasMilestone("o","t4")&&hasUpgrade("o", "t18")},
			style(){return{'background-color':(player.o.treeOfLayers.gte(26)&&!hasUpgrade("o", "t19")?'brown':'')}}
		},
		t20: {
			fullDisplay(){return `<h3>NG+</h3><br>You've implemented every single idea imaginable into so many layers that you hit your "Prestige Block", unable to produce anything unique.<br>There's only one thing you can do.<br><br>2nd Layer upgrade is twice as strong<br><br>Cost: 34 layers`},
			cost: new Decimal(34),
			onPurchase(){player.o.upgrades.push("t20")},
			currencyInternalName: "treeOfLayers",
			currencyDisplayName: "Layer",
			currencyLayer: "o",
			unlocked(){return hasMilestone("o","t4")&&hasUpgrade("o", "t19")},
			style(){return{'background-color':(player.o.treeOfLayers.gte(34)&&!hasUpgrade("o", "t20")?'brown':'')}}
		},
	},
	challenges: {
		11: {
			name: "Everstart",
			challengeDescription: "Neverend doesn't exist.",
			canComplete: function() {return player.m.mango.gte(10000000)&&player.m.offer.gte(10000000)},
			goalDescription: "10,000,000 sacrificed mangoes and 10,000,000 mangoes",
			rewardDescription: "Neverend resets nothing",
			unlocked(){return hasMilestone("o", "b2")},
			onEnter() {
				player.o.milestones = []
				let keep = []
				if(hasMilestone("o","t0"))keep.push("t0")
				if(hasMilestone("o","t1"))keep.push("t1")
				if(hasMilestone("o","t2"))keep.push("t2")
				if(hasMilestone("o","t3"))keep.push("t3")
				if(hasMilestone("o","t4"))keep.push("t4")
				if(hasMilestone("o","t5"))keep.push("t5")
				if(hasMilestone("o","tFinal"))keep.push("tFinal")
				if(hasMilestone("o","t6"))keep.push("t6")
				if(hasMilestone("o","t7"))keep.push("t7")
				if(hasMilestone("o","s0"))keep.push("s0")
				if(player.o.totalburgers.gte(1)) keep.push("b0")
				if(player.o.totalburgers.gte(2)) keep.push("b1")
				if(player.o.totalburgers.gte(5)) keep.push("b2")
				if(player.o.totalburgers.gte(10)) keep.push("b3")
				if(player.o.totalburgers.gte(25)) keep.push("b4")
				if(player.o.totalburgers.gte(100)) keep.push("b5")
				player.o.milestones = keep
				if(player.o.totalburgers.gte(10)){
					player.o.milestones.push("b3")
					player.o.milestones.push("o0")
				}
				if(player.o.totalburgers.gte(25)){
					player.o.milestones.push("b4")
					player.o.milestones.push("o1")
				}
				tmp.o.baseAmount = new Decimal(0)
				player.o.points = new Decimal(0)
				if(!hasMilestone("o", "b4")){
					player.o.onions = new Decimal(0)
					player.o.vibeCheck = new Decimal(0)
					player.o.buyables[21] = new Decimal(0)
					player.o.buyables[22] = new Decimal(0)
					player.o.buyables[23] = new Decimal(0)
				}
				if(!(player.o.totalburgers.gte(10)||hasMilestone("o", "b3"))){
					player.o.firstLevel = new Decimal(1)
					player.o.secondLevel = new Decimal(1)
					player.o.thirdLevel = new Decimal(1)
					player.o.fifthLevel = new Decimal(1)
					player.o.first = new Decimal(0)
					player.o.second = new Decimal(0)
					player.o.third = new Decimal(0)
					player.o.fifth = new Decimal(0)
					player.o.buyables[31] = new Decimal(0)
				}
				if(!hasMilestone("o", 6)) player.n.auto = false
				if(!hasMilestone("o", 12)) player.n.autoUpgrade = false
				if(!hasMilestone("o", "b1")) player.o.auto = false
				doReset("n", true)
				doReset("m", true)
			},
			buttonStyle(){return{'border-color':'brown'}}
		},
		12: {
			name: "Pissable",
			challengeDescription: "Mango doesn't exist.",
			canComplete: function() {return tmp.o.baseAmount.gte(227880000)},
			goalDescription(){return `227,880,000 ${tmp.o.baseResource}`},
			rewardDescription: "Mango resets nothing",
			unlocked(){return hasMilestone("o", "b2")},
			onEnter() {
				let keep = []
				if(hasMilestone("o","t0"))keep.push("t0")
				if(hasMilestone("o","t1"))keep.push("t1")
				if(hasMilestone("o","t2"))keep.push("t2")
				if(hasMilestone("o","t3"))keep.push("t3")
				if(hasMilestone("o","t4"))keep.push("t4")
				if(hasMilestone("o","t5"))keep.push("t5")
				if(hasMilestone("o","tFinal"))keep.push("tFinal")
				if(hasMilestone("o","t6"))keep.push("t6")
				if(hasMilestone("o","t7"))keep.push("t7")
				if(hasMilestone("o","s0"))keep.push("s0")
				if(player.o.totalburgers.gte(1)) keep.push("b0")
				if(player.o.totalburgers.gte(2)) keep.push("b1")
				if(player.o.totalburgers.gte(5)) keep.push("b2")
				if(player.o.totalburgers.gte(10)) keep.push("b3")
				if(player.o.totalburgers.gte(25)) keep.push("b4")
				if(player.o.totalburgers.gte(100)) keep.push("b5")
				player.o.milestones = keep
				if(player.o.totalburgers.gte(10)){
					player.o.milestones.push("b3")
					player.o.milestones.push("o0")
				}
				if(player.o.totalburgers.gte(25)){
					player.o.milestones.push("b4")
					player.o.milestones.push("o1")
				}
				tmp.o.baseAmount = new Decimal(0)
				player.o.points = new Decimal(0)
				if(!hasMilestone("o", "b4")){
					player.o.onions = new Decimal(0)
					player.o.vibeCheck = new Decimal(0)
					player.o.buyables[21] = new Decimal(0)
					player.o.buyables[22] = new Decimal(0)
					player.o.buyables[23] = new Decimal(0)
				}
				if(!(player.o.totalburgers.gte(10)||hasMilestone("o", "b3"))){
					player.o.firstLevel = new Decimal(1)
					player.o.secondLevel = new Decimal(1)
					player.o.thirdLevel = new Decimal(1)
					player.o.fifthLevel = new Decimal(1)
					player.o.first = new Decimal(0)
					player.o.second = new Decimal(0)
					player.o.third = new Decimal(0)
					player.o.fifth = new Decimal(0)
					player.o.buyables[31] = new Decimal(0)
				}
				if(!hasMilestone("o", 6)) player.n.auto = false
				if(!hasMilestone("o", 12)) player.n.autoUpgrade = false
				if(!hasMilestone("o", "b1")) player.o.auto = false
				doReset("n", true)
				doReset("m", true)
			}
		},
		21: {
			name: "C.R.A.B.",
			challengeDescription: "You can't reset in Neverend and Mango layers, but you gain 5% of symbol and dollar gains.",
			canComplete: function() {return tmp.o.baseAmount.gte("1.2e12")},
			goalDescription(){return `1.2e12 ${tmp.o.baseResource}`},
			rewardDescription: "Unlock new tab... already??",
			unlocked(){return hasChallenge("o", 11)&&hasChallenge("o", 12)},
			onEnter() {
				let keep = []
				if(hasMilestone("o","t0"))keep.push("t0")
				if(hasMilestone("o","t1"))keep.push("t1")
				if(hasMilestone("o","t2"))keep.push("t2")
				if(hasMilestone("o","t3"))keep.push("t3")
				if(hasMilestone("o","t4"))keep.push("t4")
				if(hasMilestone("o","t5"))keep.push("t5")
				if(hasMilestone("o","tFinal"))keep.push("tFinal")
				if(hasMilestone("o","t6"))keep.push("t6")
				if(hasMilestone("o","t7"))keep.push("t7")
				if(hasMilestone("o","s0"))keep.push("s0")
				if(player.o.totalburgers.gte(1)) keep.push("b0")
				if(player.o.totalburgers.gte(2)) keep.push("b1")
				if(player.o.totalburgers.gte(5)) keep.push("b2")
				if(player.o.totalburgers.gte(10)) keep.push("b3")
				if(player.o.totalburgers.gte(25)) keep.push("b4")
				if(player.o.totalburgers.gte(100)) keep.push("b5")
				player.o.milestones = keep
				if(player.o.totalburgers.gte(10)){
					player.o.milestones.push("b3")
					player.o.milestones.push("o0")
				}
				if(player.o.totalburgers.gte(25)){
					player.o.milestones.push("b4")
					player.o.milestones.push("o1")
				}
				tmp.o.baseAmount = new Decimal(0)
				player.o.points = new Decimal(0)
				if(!hasMilestone("o", "b4")){
					player.o.onions = new Decimal(0)
					player.o.vibeCheck = new Decimal(0)
					player.o.buyables[21] = new Decimal(0)
					player.o.buyables[22] = new Decimal(0)
					player.o.buyables[23] = new Decimal(0)
				}
				if(!(player.o.totalburgers.gte(10)||hasMilestone("o", "b3"))){
					player.o.firstLevel = new Decimal(1)
					player.o.secondLevel = new Decimal(1)
					player.o.thirdLevel = new Decimal(1)
					player.o.fifthLevel = new Decimal(1)
					player.o.first = new Decimal(0)
					player.o.second = new Decimal(0)
					player.o.third = new Decimal(0)
					player.o.fifth = new Decimal(0)
					player.o.buyables[31] = new Decimal(0)
				}
				if(!hasMilestone("o", 6)) player.n.auto = false
				if(!hasMilestone("o", 12)) player.n.autoUpgrade = false
				if(!hasMilestone("o", "b1")) player.o.auto = false
				doReset("n", true)
				doReset("m", true)
			}
		},
		22: {
			name: "SIKE!!!",
			challengeDescription: "A totally normal Post-Irony Choice playthrough.",
			canComplete: function() {return tmp.o.baseAmount.gte(227880000)},
			goalDescription(){return `227,880,000 ${tmp.o.baseResource}`},
			rewardDescription: "New tab, for real this time.",
			unlocked(){return hasChallenge("o", 21)},
			onEnter() {
				let keep = []
				if(hasMilestone("o","t0"))keep.push("t0")
				if(hasMilestone("o","t1"))keep.push("t1")
				if(hasMilestone("o","t2"))keep.push("t2")
				if(hasMilestone("o","t3"))keep.push("t3")
				if(hasMilestone("o","t4"))keep.push("t4")
				if(hasMilestone("o","t5"))keep.push("t5")
				if(hasMilestone("o","tFinal"))keep.push("tFinal")
				if(hasMilestone("o","t6"))keep.push("t6")
				if(hasMilestone("o","t7"))keep.push("t7")
				if(hasMilestone("o","s0"))keep.push("s0")
				if(player.o.totalburgers.gte(1)) keep.push("b0")
				if(player.o.totalburgers.gte(2)) keep.push("b1")
				if(player.o.totalburgers.gte(5)) keep.push("b2")
				if(player.o.totalburgers.gte(10)) keep.push("b3")
				if(player.o.totalburgers.gte(25)) keep.push("b4")
				if(player.o.totalburgers.gte(100)) keep.push("b5")
				player.o.milestones = keep
				if(player.o.totalburgers.gte(10)){
					player.o.milestones.push("b3")
					player.o.milestones.push("o0")
				}
				if(player.o.totalburgers.gte(25)){
					player.o.milestones.push("b4")
					player.o.milestones.push("o1")
				}
				tmp.o.baseAmount = new Decimal(0)
				player.o.points = new Decimal(0)
				if(!hasMilestone("o", "b4")){
					player.o.onions = new Decimal(0)
					player.o.vibeCheck = new Decimal(0)
					player.o.buyables[21] = new Decimal(0)
					player.o.buyables[22] = new Decimal(0)
					player.o.buyables[23] = new Decimal(0)
				}
				if(!(player.o.totalburgers.gte(10)||hasMilestone("o", "b3"))){
					player.o.firstLevel = new Decimal(1)
					player.o.secondLevel = new Decimal(1)
					player.o.thirdLevel = new Decimal(1)
					player.o.fifthLevel = new Decimal(1)
					player.o.first = new Decimal(0)
					player.o.second = new Decimal(0)
					player.o.third = new Decimal(0)
					player.o.fifth = new Decimal(0)
					player.o.buyables[31] = new Decimal(0)
				}
				if(!hasMilestone("o", 6)) player.n.auto = false
				if(!hasMilestone("o", 12)) player.n.autoUpgrade = false
				if(!hasMilestone("o", "b1")) player.o.auto = false
				doReset("n", true)
				doReset("m", true)
			}
		},
	},
	milestones: {
		0: {
			requirementDescription: "1st Layer of Life",
			effectDescription: "You lose 1% of base tax per Layer of Life (hardcaps at 16%)",
			done() { return player.o.points.gte(1) }
		},
		1: {
			requirementDescription: "2nd Layer of Life",
			effectDescription: "You keep third Mango upgrade on all resets",
			done() { return player.o.points.gte(2) }
		},
		2: {
			requirementDescription: "3rd Layer of Life",
			effectDescription: "1st Neverend upgrade slows down $ cost scaling",
			done() { return player.o.points.gte(3) }
		},
		3: {
			requirementDescription: "4th Layer of Life",
			effectDescription(){return `1st Neverend upgrade also works at ${tmp.o.baseResource}`},
			done() { return player.o.points.gte(4) }
		},
		4: {
			requirementDescription: "5th Layer of Life",
			effectDescription: "You keep best symbols on reset",
			done() { return player.o.points.gte(5) }
		},
		5: {
			requirementDescription: "6th Layer of Life",
			effectDescription: "You gain 1 free Mango buyable each",
			done() { return player.o.points.gte(6) }
		},
		6: {
			requirementDescription: "7th Layer of Life",
			effectDescription: "Automatically perform Neverend reset",
			toggles: [["n", "auto"]],
			done() { return player.o.points.gte(7) }
		},
		7: {
			requirementDescription: "8th Layer of Life",
			effectDescription: "You gain 1% of sacrificed mango gain",
			unlocked(){return player.o.vibeCheck.gte(1)||hasMilestone("o", "b0")},
			done() { return player.o.points.gte(8)&&this.unlocked() }
		},
		8: {
			requirementDescription: "9th Layer of Life",
			effectDescription: "You keep one Neverend upgrade per Layer of Life",
			unlocked(){return player.o.vibeCheck.gte(2)||hasMilestone("o", "b0")},
			done() { return player.o.points.gte(9)&&this.unlocked() }
		},
		9: {
			requirementDescription: "10th Layer of Life",
			effectDescription: "You keep your best run and Neverend milestones on reset",
			unlocked(){return player.o.vibeCheck.gte(3)||hasMilestone("o", "b0")},
			done() { return player.o.points.gte(10)&&this.unlocked() }
		},
		10: {
			requirementDescription: "11th Layer of Life",
			effectDescription: "Framerule is three times shorter",
			unlocked(){return player.o.vibeCheck.gte(4)||hasMilestone("o", "b0")},
			done() { return player.o.points.gte(11)&&this.unlocked() }
		},
		11: {
			requirementDescription: "12th Layer of Life",
			effectDescription: "You keep 4th Mango milestone and Mango upgrades",
			unlocked(){return player.o.vibeCheck.gte(5)||hasMilestone("o", "b0")},
			done() { return player.o.points.gte(12)&&this.unlocked() }
		},
		12: {
			requirementDescription: "13th Layer of Life",
			effectDescription: "Automatically purchase Neverend upgrades",
			toggles: [["n", "autoUpgrade"]],
			unlocked(){return player.o.vibeCheck.gte(6)||hasMilestone("o", "b0")},
			done() { return player.o.points.gte(13)&&this.unlocked() }
		},
		13: {
			requirementDescription: "14th Layer of Life",
			effectDescription: "You gain 10% of mango",
			unlocked(){return player.o.vibeCheck.gte(7)||hasMilestone("o", "b0")},
			done() { return player.o.points.gte(14)&&this.unlocked() }
		},
		14: {
			requirementDescription: "15th Layer of Life",
			effectDescription: "You keep Mango buyables on reset",
			unlocked(){return player.o.vibeCheck.gte(8)||hasMilestone("o", "b0")},
			done() { return player.o.points.gte(15)&&this.unlocked() }
		},
		15: {
			requirementDescription: "16th Layer of Life",
			effectDescription: "Mango's cost never fluctuates",
			unlocked(){return player.o.vibeCheck.gte(9)||hasMilestone("o", "b0")},
			done() { return player.o.points.gte(16)&&this.unlocked() }
		},
		16: {
			requirementDescription: "17th Layer of Life",
			effectDescription: "You gain 100% of mango and 100% of sacrificed mango instead",
			unlocked(){return player.o.vibeCheck.gte(10)||hasMilestone("o", "b0")},
			done() { return player.o.points.gte(17)&&this.unlocked() }
		},
		17: {
			requirementDescription: "18th Layer of Life",
			effectDescription: "????????????",
			unlocked(){return player.o.vibeCheck.gte(11)||hasMilestone("o", "b0")},
			done() { return player.o.points.gte(18)&&this.unlocked() }
		},
		18: {
			requirementDescription: "186th Layer of Life",
			effectDescription: "Your best run is 256 days and automatically maxes Mango Well and Mango Bank",
			onComplete(){player.n.bestday=player.n.bestday.max(256)},
			unlocked(){return player.o.unlocked5},
			done() { return player.o.points.gte(186) }
		},
		o0: {
			requirementDescription: "3 Onions of Ordinarance",
			effectDescription: "Unlock extra content",
			unlocked(){return true},
			done() { return player.o.vibeCheck.gte(3) }
		},
		o1: {
			requirementDescription: "6 Onions of Ordinarance",
			effectDescription: "Resetting removes 7 LoLs instead",
			unlocked(){return true},
			done() { return player.o.vibeCheck.gte(6) }
		},
		b0: {
			requirementDescription: "1 total Burger of Bias",
			effectDescription: "You keep Layers of Life milestones unlocked",
			unlocked(){return true},
			done() { return player.o.totalburgers.gte(1) }
		},
		b1: {
			requirementDescription: "2 total Burgers of Bias",
			effectDescription: "Automatically perform Layer of Life reset",
			toggles: [["o", "auto"]],
			unlocked(){return true},
			done() { return player.o.totalburgers.gte(2) }
		},
		b2: {
			requirementDescription: "5 total Burgers of Bias",
			effectDescription: "Unlock 2 challenges",
			unlocked(){return true},
			done() { return player.o.totalburgers.gte(5) }
		},
		b3: {
			requirementDescription: "10 total Burgers of Bias",
			effectDescription: "You keep Onions la Ordinarance progress",
			unlocked(){return true},
			done() { return player.o.totalburgers.gte(10) }
		},
		b4: {
			requirementDescription: "25 total Burgers of Bias",
			effectDescription: "Burger of Bias no longer resets Onions la Ordinarance",
			unlocked(){return true},
			done() { return player.o.totalburgers.gte(25) }
		},
		b5: {
			requirementDescription: "100 total Burgers of Bias",
			effectDescription: "You start with first 4 Neverend upgrades, 4th Mango milestone and Mango upgrades on Burger of Bias reset",
			unlocked(){return true},
			done() { return player.o.totalburgers.gte(100) }
		},
		s0: {
			requirementDescription: "4 of 25 Sushi-X Synchronizers",
			effectDescription: "Sushi Buyables cost nothing and you automatically purchase them",
			unlocked(){return hasMilestone("o","t4")},
			done() {return player.o.buyables[63].gte(25)&&player.o.buyables[73].gte(25)&&player.o.buyables[83].gte(25)&&player.o.buyables[93].gte(25)}
		},
		t0: {
			requirementDescription: "1 Layer",
			effectDescription: "Unlock new buyable",
			unlocked(){return true},
			done() { return player.o.treeOfLayers.gte(1) }
		},
		t1: {
			requirementDescription: "2 Layer",
			effectDescription: "Annoying Layers boosts ToTs gain",
			unlocked(){return hasMilestone("o","t0")},
			done() { return player.o.treeOfLayers.gte(2) }
		},
		t2: {
			requirementDescription: "5 Layer",
			effectDescription(){return `"READ. THE. DOCS." includes milestones`},
			unlocked(){return hasMilestone("o","t1")},
			done() { return player.o.treeOfLayers.gte(5) }
		},
		t3: {
			requirementDescription(){return `100 "Start a new TMT"`},
			effectDescription(){return `You no longer "Lose everything"`},
			unlocked(){return hasMilestone("o","t2")},
			done() { return player.o.buyables[111].gte(100) }
		},
		t4: {
			requirementDescription: "18 Layer",
			effectDescription(){return `Unlocks 3rd subtab<br><span style='font-size: 10px;'>(who the fuck let that turtle cook)`},
			unlocked(){return hasMilestone("o","t3")},
			done() { return player.o.treeOfLayers.gte(18) }
		},
		t5: {
			requirementDescription: "28 Layer",
			effectDescription(){return `You passively generate 1% of BoB and one available OlO per second`},
			unlocked(){return hasMilestone("o","t4")},
			done() { return player.o.treeOfLayers.gte(28) }
		},
		tFinal: {
			requirementDescription: "31 Layer",
			effectDescription(){return `"That's how many Layers there are in this mod as of v5.11!"<br>"Lose everything" no longer costs Layers and gives total Layers`},
			unlocked(){return hasMilestone("o","t5")},
			done() { return player.o.treeOfLayers.gte(31) }
		},
		t6: {
			requirementDescription: "125 Layer",
			effectDescription(){return `Unleash the Big Bad Buyable`},
			unlocked(){return hasMilestone("o","tFinal")&&player.realAB.points.gte(6)},
			done() { return player.o.treeOfLayers.gte(125) }
		},
		t7: {
			requirementDescription: "520 Layer",
			effectDescription(){return `Layer's effect multiplies plot gain at reduced rate<br>Currently: ${format(player.o.treeOfLayers.add(1).root(2))}x`},
			unlocked(){return hasMilestone("o","t6")&&player.realAB.points.gte(6)},
			done() { return player.o.treeOfLayers.gte(520) }
		},
		t8: {
			requirementDescription: "1,000 Layer",
			effectDescription(){return `"lose everything" is automatically bought`},
			unlocked(){return hasMilestone("o","t7")},
			done() { return player.o.treeOfLayers.gte(1000) }
		},
	},
	buyables:{
		11:{
			display(){return `<span style='font-family:"Inconsolata", monospace, bold; font-size: 1.333em'>Reset for +${formatWhole(this.gain())} Onions la Ordinarance<br><br>`+(this.canAfford()?`Next at ${format(player.o.points.add(1))}`:`Req: ${format(player.o.points)} / ${format(player.o.vibeCheck.add(7))}`)+` Layers of Life`},
			gain(){return player.o.points.sub(player.o.vibeCheck.add(6)).max(0)},
			canAfford() { return player.o.points.gte(player.o.vibeCheck.add(7)) },
			buy() {
				let keepThis = player.o.plots
				let keep = []
				if(hasMilestone("o","t0"))keep.push("t0")
				if(hasMilestone("o","t1"))keep.push("t1")
				if(hasMilestone("o","t2"))keep.push("t2")
				if(hasMilestone("o","t3"))keep.push("t3")
				if(hasMilestone("o","t4"))keep.push("t4")
				if(hasMilestone("o","t5"))keep.push("t5")
				if(hasMilestone("o","tFinal"))keep.push("tFinal")
				if(hasMilestone("o","t6"))keep.push("t6")
				if(hasMilestone("o","t7"))keep.push("t7")
				if(hasMilestone("o","s0"))keep.push("s0")
				if(hasMilestone("o", "o1")){
					for(i=0;i<18;i++){
						if(hasMilestone("o", i)&&player.o.points.gte(8+i)) keep.push(i)
					}
				}
				player.o.milestones = keep
				if(player.o.totalburgers.gte(1)) player.o.milestones.push("b0")
				if(player.o.totalburgers.gte(2)) player.o.milestones.push("b1")
				if(player.o.totalburgers.gte(5)) player.o.milestones.push("b2")
				if(player.o.totalburgers.gte(10)) player.o.milestones.push("b3")
				if(player.o.totalburgers.gte(25)) player.o.milestones.push("b4")
				if(player.o.totalburgers.gte(100)) player.o.milestones.push("b5")
				if(player.o.vibeCheck.gte(3)) player.o.milestones.push("o0")
				if(player.o.vibeCheck.gte(6)) player.o.milestones.push("o1")
				let fuckOff = player.o.points.sub(player.o.vibeCheck.add(6)).max(0)
				player.o.vibeCheck = player.o.vibeCheck.add(fuckOff)
				player.o.onions = player.o.onions.add(fuckOff)
				player.o.points = hasMilestone("o", "o1")||player.o.vibeCheck.gte(5)?player.o.points.sub(7):new Decimal(0)
				if(!hasMilestone("o", 6)) player.n.auto = false
				if(!hasMilestone("o", 12)) player.n.autoUpgrade = false
				player.o.unlocked2 = true
				doReset("o", true)
				player.o.plots = keepThis
			},
			style(){return{"border-radius":"25% 0px 0px 25%",'height':'120px', 'width':'180px', 'border': '4px solid', 'border-color': 'rgba(0, 0, 0, 0.125)','background-color':(this.canAfford()?'rgba(194, 255, 128, 1)':'#bf8f8f')}},
			unlocked(){return true}
		},
		21:{
			title(){return `Neverend Cheapener`},
			display(){return `<h3>Cost: ${format(this.cost())}<br>Amount: ${format(player.o.buyables[21])}<br>Level: ${formatWhole(player.o.firstLevel)}<br>Effect: ${format(player.o.firstLevel)}/`},
			canAfford() { return player.o.onions.gte(this.cost()) },
			cost(){return player.o.buyables[21].add(1)},
			buy(){
				player.o.onions = player.o.onions.sub(this.cost())
				player.o.buyables[21] = player.o.buyables[21].add(1)
			},
			sellOne(){
				if(player.o.buyables[21].gt(0)){
					player.o.onions = player.o.onions.add(player.o.buyables[21])
					player.o.buyables[21] = player.o.buyables[21].sub(1)
				}
			},
			style(){return{'height':'128px', 'width':'180px','background-color':(this.canAfford()?'rgba(194, 255, 128, 1)':'#bf8f8f')}},
			unlocked(){return true}
		},
		22:{
			title(){return `Dollar Enricher`},
			display(){return `<h3>Cost: ${format(this.cost())}<br>Amount: ${format(player.o.buyables[22])}<br>Level: ${formatWhole(player.o.secondLevel)}<br>Effect: ${format(player.o.secondLevel)}x`},
			canAfford() { return player.o.onions.gte(this.cost()) },
			cost(){return player.o.buyables[22].add(1)},
			buy(){
				player.o.onions = player.o.onions.sub(this.cost())
				player.o.buyables[22] = player.o.buyables[22].add(1)
			},
			sellOne(){
				if(player.o.buyables[22].gt(0)){
					player.o.onions = player.o.onions.add(player.o.buyables[22])
					player.o.buyables[22] = player.o.buyables[22].sub(1)
				}
			},
			style(){return{'height':'128px', 'width':'180px','background-color':(this.canAfford()?'rgba(194, 255, 128, 1)':'#bf8f8f')}},
			unlocked(){return true}
		},
		23:{
			title(){return `Point Booster`},
			display(){return `<h3>Cost: ${format(this.cost())}<br>Amount: ${format(player.o.buyables[23])}<br>Level: ${formatWhole(player.o.thirdLevel)}<br>Effect: ${format(player.o.thirdLevel)}x`},
			canAfford() { return player.o.onions.gte(this.cost()) },
			cost(){return player.o.buyables[23].add(1)},
			buy(){
				player.o.onions = player.o.onions.sub(this.cost())
				player.o.buyables[23] = player.o.buyables[23].add(1)
			},
			sellOne(){
				if(player.o.buyables[23].gt(0)){
					player.o.onions = player.o.onions.add(player.o.buyables[23])
					player.o.buyables[23] = player.o.buyables[23].sub(1)
				}
			},
			style(){return{'height':'128px', 'width':'180px','background-color':(this.canAfford()?'rgba(194, 255, 128, 1)':'#bf8f8f')}},
			unlocked(){return true}
		},
		31:{
			title(){return `Annoying Layers`},
			display(){return `<h3>Cost: ${formatWhole(this.cost())} of first three levels each<br>Level: ${formatWhole(player.o.buyables[31].add(1))}<br>Effect: ${format(this.effect())}/`},
			effect(){return player.o.buyables[31].add(1).root(1/3+1)},
			canAfford() { return new Decimal(player.o.firstLevel).gte(this.cost().add(1))&&new Decimal(player.o.secondLevel).gte(this.cost().add(1))&&new Decimal(player.o.thirdLevel).gte(this.cost().add(1)) },
			cost(){return player.o.buyables[31].add(1)},
			buy(){
				player.o.firstLevel = player.o.firstLevel.sub(this.cost())
				player.o.secondLevel = player.o.secondLevel.sub(this.cost())
				player.o.thirdLevel = player.o.thirdLevel.sub(this.cost())
				player.o.buyables[31] = player.o.buyables[31].add(1)
			},
			style(){return{'height':'128px', 'width':'540px','background-color':(this.canAfford()?'rgba(194, 255, 128, 1)':'#bf8f8f')}},
			unlocked(){return hasMilestone("o", "o0")}
		},
		32:{
			title(){return `Enhancing Enhancer`},
			display(){return `<h3>Level: ${formatWhole(player.o.fifthLevel)}<br>Effect: ${format(this.effect())}x`},
			effect(){return Decimal.pow(1/9+1, player.o.fifthLevel.sub(1))},
			canAfford() { return true },
			cost(){return player.o.buyables[32].add(1)},
			style(){return{'height':'128px', 'width':'540px','border-radius':'10%','background-color':(this.canAfford()?'rgba(194, 255, 128, 1)':'#bf8f8f')}},
			unlocked(){return hasMilestone("o", "o0")}
		},
		41:{
			display(){return `<span style='font-family:"Inconsolata", monospace, bold; font-size: 1.333em'>Reset for +${formatWhole(this.gain())} Burger of Bias<br><br>Next at ${format(this.getNextAt())} ${tmp.o.baseResource}`},
			gain(){return tmp.o.baseAmount.root(player.o.burgers.gte(627207300000)?player.o.burgers.sub(627207300000).add(1).div(627207300000).add(1):1).div("1.2e12").pow(0.1212).floor().max(0);},
			getNextAt(){
				return this.gain().add(1).root(0.1212).times("1.2e12").max("1.2e12").pow(player.o.burgers.gte(627207300000)?player.o.burgers.sub(627207300000).add(1).div(627207300000).add(1):1)
			},
			canAfford() { return tmp.o.baseAmount.gte(player.o.burgers.gte(627207300000)?new Decimal("1.2e12").pow(player.o.burgers.sub(627207300000).add(1).div(627207300000).add(1)):"1.2e12") },
			buy() {
				let keepThis = player.o.plots
				let keep = []
				if(hasMilestone("o","t0"))keep.push("t0")
				if(hasMilestone("o","t1"))keep.push("t1")
				if(hasMilestone("o","t2"))keep.push("t2")
				if(hasMilestone("o","t3"))keep.push("t3")
				if(hasMilestone("o","t4"))keep.push("t4")
				if(hasMilestone("o","t5"))keep.push("t5")
				if(hasMilestone("o","tFinal"))keep.push("tFinal")
				if(hasMilestone("o","t6"))keep.push("t6")
				if(hasMilestone("o","t7"))keep.push("t7")
				if(hasMilestone("o","s0"))keep.push("s0")
				if(player.o.totalburgers.gte(1)) keep.push("b0")
				if(player.o.totalburgers.gte(2)) keep.push("b1")
				if(player.o.totalburgers.gte(5)) keep.push("b2")
				if(player.o.totalburgers.gte(10)) keep.push("b3")
				if(player.o.totalburgers.gte(25)) keep.push("b4")
				if(player.o.totalburgers.gte(100)) keep.push("b5")
				player.o.milestones = keep
				player.o.burgers = player.o.burgers.add(tmp.o.baseAmount.div("1.2e12").pow(0.1212).floor().max(0))
				player.o.totalburgers = player.o.totalburgers.add(tmp.o.baseAmount.div("1.2e12").pow(0.1212).floor().max(0))
				if(player.o.totalburgers.gte(10)) player.o.milestones.push("o0")
				if(player.o.totalburgers.gte(25)) player.o.milestones.push("o1")
				tmp.o.baseAmount = new Decimal(0)
				player.o.points = new Decimal(0)
				if(!hasMilestone("o", "b4")||!player.o.totalburgers.gte(25)){
					player.o.onions = new Decimal(0)
					player.o.vibeCheck = new Decimal(0)
					player.o.buyables[23] = new Decimal(0)
					player.o.buyables[21] = new Decimal(0)
					player.o.buyables[22] = new Decimal(0)
				}
				if(!(player.o.totalburgers.gte(10)||hasMilestone("o", "b3"))){
					player.o.firstLevel = new Decimal(1)
					player.o.secondLevel = new Decimal(1)
					player.o.thirdLevel = new Decimal(1)
					player.o.fifthLevel = new Decimal(1)
					player.o.first = new Decimal(0)
					player.o.second = new Decimal(0)
					player.o.third = new Decimal(0)
					player.o.fifth = new Decimal(0)
					player.o.buyables[31] = new Decimal(0)
				}
				if(!hasMilestone("o", 6)) player.n.auto = false
				if(!hasMilestone("o", 12)) player.n.autoUpgrade = false
				player.o.unlocked3 = true
				doReset("o", true)
				player.o.plots = keepThis
			},
			style(){return{"border-radius":"25% 0px 0px 25%",'height':'120px', 'width':'180px', 'border': '4px solid', 'border-color': 'rgba(0, 0, 0, 0.125)','background-color':(this.canAfford()?'tan':'#bf8f8f')}},
			unlocked(){return true}
		},
		51:{
			display(){return `<span style='font-family:"Inconsolata", monospace, bold; font-size: 1.333em'>Reset for +1 Sushi of Sociopathy<br><br>Next at undefined ${tmp.o.baseResource}`},
			canAfford() { return true },
			buy() {
				tmp.o.baseAmount = new Decimal(0)
				player.o.points = new Decimal(0)
				player.o.onions = new Decimal(0)
				player.o.vibeCheck = new Decimal(0)
				player.o.buyables[23] = new Decimal(0)
				player.o.buyables[21] = new Decimal(0)
				player.o.buyables[22] = new Decimal(0)
				player.o.firstLevel = new Decimal(1)
				player.o.secondLevel = new Decimal(1)
				player.o.thirdLevel = new Decimal(1)
				player.o.fifthLevel = new Decimal(1)
				player.o.first = new Decimal(0)
				player.o.second = new Decimal(0)
				player.o.third = new Decimal(0)
				player.o.fifth = new Decimal(0)
				player.o.buyables[31] = new Decimal(0)
				player.n.auto = false
				player.n.autoUpgrade = false
				player.o.auto = false
				player.o.unlocked3 = true
				player.o.burgers = new Decimal(0)
				player.o.totalburgers = new Decimal(0)
				player.o.upgrades = []
				player.o.challenges[11] = 0
				player.o.challenges[12] = 0
				player.o.challenges[21] = 0
				player.o.challenges[22] = 0
				player.o.milestones = []
				player.o.sushis = player.o.sushis.add(1)
				player.o.unlocked4 = true
				doReset("o", true)
			},
			style(){return{"border-radius":"25% 0px 0px 25%",'height':'120px', 'width':'180px', 'border': '4px solid', 'border-color': 'rgba(0, 0, 0, 0.125)','background-color':(this.canAfford()?'cyan':'#bf8f8f')}},
			unlocked(){return !player.o.unlocked4}
		},
		61:{
			title: "<h2>Sushi Maker",
			display(){return `<h3>Produces Sushis of Sociopathy<br>Cost: ${format(this.cost())} SoS<br>Amount: ${formatWhole(player.o.buyables[61])+(player.o.buyables[71].gte(1)||player.o.buyables[81].gte(1)?" (+"+formatWhole(tmp.o.buyables[71].effect.add(tmp.o.buyables[81].effect))+")":"")}<br>Effect: ${format(this.effect())}/sec`},
			canAfford(){return player.o.sushis.gte(this.cost())},
			cost(){return player.o.buyables[61].add(1).pow(player.o.buyables[61].add(1)).pow(player.o.buyables[this.id].gte(Decimal.add(25, tmp.o.buyables[92].effect))?Decimal.add(1, player.o.buyables[this.id].sub(Decimal.add(24, tmp.o.buyables[92].effect)).div(10)):1)},
			effect(){return player.o.buyables[61].add(tmp.o.buyables[71].effect).add(tmp.o.buyables[81].effect).mul(tmp.o.buyables[91].effect)},
			buy(){
				if(!hasMilestone("o","s0")) if(!hasMilestone("o","s0")) player.o.sushis=player.o.sushis.sub(this.cost())
				player.o.buyables[61]=player.o.buyables[61].add(1)
			},
			unlocked(){return player.o.unlocked4},
			style(){return{'background-color':(this.canAfford()?'cyan':'#bf8f8f'),'height':'196px','width':'196px'}}
		},
		62:{
			title: "<h2>Sushi Doubler",
			display(){return `<h3>Multiplies Sushis of Sociopathy generation<br>Cost: ${format(this.cost())} SoS<br>Amount: ${formatWhole(player.o.buyables[62])+(player.o.buyables[71].gte(1)?" (+"+formatWhole(tmp.o.buyables[71].effect)+")":"")}<br>Effect: ${format(this.effect())}x`},
			canAfford(){return player.o.sushis.gte(this.cost())},
			cost(){return Decimal.pow(64, player.o.buyables[62].div(4).add(1).pow(1.15)).pow(player.o.buyables[this.id].gte(Decimal.add(25, tmp.o.buyables[92].effect))?Decimal.add(1, player.o.buyables[this.id].sub(Decimal.add(24, tmp.o.buyables[92].effect)).div(10)):1)},
			effect(){return  Decimal.pow(tmp.o.buyables[72].effect, player.o.buyables[62].add(tmp.o.buyables[71].effect))},
			buy(){
				if(!hasMilestone("o","s0")) player.o.sushis=player.o.sushis.sub(this.cost())
				player.o.buyables[62]=player.o.buyables[62].add(1)
			},
			unlocked(){return player.o.buyables[61].gte(3)||player.o.buyables[101].gte(1)},
			style(){return{'background-color':(this.canAfford()?'cyan':'#bf8f8f'),'height':'196px','width':'196px'}}
		},
		63:{
			title: "<h2>Sushi-Point Synchronizer",
			display(){return `<h3>Boosts Sushi based on your ${tmp.o.baseResource}<br>Cost: ${format(this.cost())} SoS<br>Amount: ${formatWhole(player.o.buyables[63])+(player.o.buyables[71].gte(1)?" (+"+formatWhole(tmp.o.buyables[71].effect)+")":"")}<br>Effect: ${format(this.effect())}x`},
			canAfford(){return player.o.sushis.gte(this.cost())},
			cost(){return Decimal.pow(5, player.o.buyables[63]).mul(1000).pow(player.o.buyables[this.id].gte(Decimal.add(25, tmp.o.buyables[92].effect))?Decimal.add(1, player.o.buyables[this.id].sub(Decimal.add(24, tmp.o.buyables[92].effect)).div(10)):1)},
			effect(){return Decimal.pow(tmp.o.baseAmount.add(10).log(10).add(9).log(10), player.o.buyables[63].add(tmp.o.buyables[71].effect))},
			buy(){
				if(!hasMilestone("o","s0")) player.o.sushis=player.o.sushis.sub(this.cost())
				player.o.buyables[63]=player.o.buyables[63].add(1)
			},
			unlocked(){return player.o.buyables[62].gte(3)||player.o.buyables[101].gte(1)},
			style(){return{'background-color':(this.canAfford()?'cyan':'#bf8f8f'),'height':'196px','width':'196px'}}
		},
		71:{
			title: "<h2>Extra Level Buyable",
			display(){return `<h3>Gives extra buyables above this one<br>Cost: ${format(this.cost())} SoS<br>Amount: ${formatWhole(player.o.buyables[71])}<br>Effect: +${formatWhole(this.effect())} extra buyables`},
			canAfford(){return player.o.sushis.gte(this.cost())},
			cost(){return new Decimal(19200).mul(new Decimal(192).pow(player.o.buyables[71])).pow(player.o.buyables[this.id].gte(Decimal.add(25, tmp.o.buyables[92].effect))?Decimal.add(1, player.o.buyables[this.id].sub(Decimal.add(24, tmp.o.buyables[92].effect)).div(10)):1)},
			effect(){return player.o.buyables[71]},
			buy(){
				if(!hasMilestone("o","s0")) player.o.sushis=player.o.sushis.sub(this.cost())
				player.o.buyables[71]=player.o.buyables[71].add(1)
			},
			unlocked(){return player.o.buyables[63].gte(3)||player.o.buyables[101].gte(1)},
			style(){return{'background-color':(this.canAfford()?'cyan':'#bf8f8f'),'height':'196px','width':'196px'}}
		},
		72:{
			title: "<h2>Artificial Sauce",
			display(){return `<h3>Enhances Sushi Doubler's base<br>Cost: ${format(this.cost())} SoS<br>Amount: ${formatWhole(player.o.buyables[72])}<br>Currently: ${format(this.effect())}`},
			canAfford(){return player.o.sushis.gte(this.cost())},
			cost(){return new Decimal(10000000).mul(new Decimal(10).pow(player.o.buyables[72])).pow(player.o.buyables[this.id].gte(Decimal.add(25, tmp.o.buyables[92].effect))?Decimal.add(1, player.o.buyables[this.id].sub(Decimal.add(24, tmp.o.buyables[92].effect)).div(10)):1)},
			effect(){return new Decimal(2).add(player.o.buyables[72].root(2).div(10))},
			buy(){
				if(!hasMilestone("o","s0")) player.o.sushis=player.o.sushis.sub(this.cost())
				player.o.buyables[72]=player.o.buyables[72].add(1)
			},
			unlocked(){return player.o.buyables[71].gte(2)||player.o.buyables[101].gte(1)},
			style(){return{'background-color':(this.canAfford()?'cyan':'#bf8f8f'),'height':'196px','width':'196px'}}
		},
		73:{
			title: "<h2>Sushi-Layer Synchronizer",
			display(){return `<h3>Boosts Sushi based on your LoLs<br>Cost: ${format(this.cost())} SoS<br>Amount: ${formatWhole(player.o.buyables[73])}<br>Effect: ${format(this.effect())}x`},
			canAfford(){return player.o.sushis.gte(this.cost())},
			cost(){return Decimal.pow(625, player.o.buyables[73]).mul(600000000).pow(player.o.buyables[this.id].gte(Decimal.add(25, tmp.o.buyables[92].effect))?Decimal.add(1, player.o.buyables[this.id].sub(Decimal.add(24, tmp.o.buyables[92].effect)).div(10)):1)},
			effect(){return Decimal.pow(player.o.points.add(10).log(10), player.o.buyables[73])},
			buy(){
				if(!hasMilestone("o","s0")) player.o.sushis=player.o.sushis.sub(this.cost())
				player.o.buyables[73]=player.o.buyables[73].add(1)
			},
			unlocked(){return player.o.buyables[72].gte(2)||player.o.buyables[101].gte(1)},
			style(){return{'background-color':(this.canAfford()?'cyan':'#bf8f8f'),'height':'196px','width':'196px'}}
		},
		81:{
			title: "<h2>Sushi Maker Requiem",
			display(){return `<h3>2nd and 3rd non-extra buyables give extra buyables to the 1st one<br>Cost: ${format(this.cost())} SoS<br>Amount: ${formatWhole(player.o.buyables[81])}<br>Currently: +${formatWhole(this.effect())} extra Sushi Makers`},
			canAfford(){return player.o.sushis.gte(this.cost())},
			cost(){return new Decimal("1e19").mul(player.o.buyables[81].add(1).pow(2).pow(player.o.buyables[81].add(1).pow(2))).pow(player.o.buyables[this.id].gte(Decimal.add(25, tmp.o.buyables[92].effect))?Decimal.add(1, player.o.buyables[this.id].sub(Decimal.add(24, tmp.o.buyables[92].effect)).div(10)):1)},
			effect(){return player.o.buyables[62].add(player.o.buyables[63]).mul(player.o.buyables[81])},
			buy(){
				if(!hasMilestone("o","s0")) player.o.sushis=player.o.sushis.sub(this.cost())
				player.o.buyables[81]=player.o.buyables[81].add(1)
			},
			unlocked(){return player.o.buyables[73].gte(4)||player.o.buyables[101].gte(1)},
			style(){return{'background-color':(this.canAfford()?'cyan':'#bf8f8f'),'height':'196px','width':'196px'}}
		},
		82:{
			title: "<h2>Broken Doubler",
			display(){return `<h3>Functions the same as 2nd buyable, albeit worse<br>Cost: ${format(this.cost())} SoS<br>Amount: ${formatWhole(player.o.buyables[82])}<br>Effect: ${format(this.effect())}x`},
			canAfford(){return player.o.sushis.gte(this.cost())},
			cost(){return new Decimal("1e22").mul(new Decimal(10).pow(player.o.buyables[82])).pow(player.o.buyables[this.id].gte(Decimal.add(25, tmp.o.buyables[92].effect))?Decimal.add(1, player.o.buyables[this.id].sub(Decimal.add(24, tmp.o.buyables[92].effect)).div(10)):1)},
			effect(){return Decimal.pow(1.5, player.o.buyables[82])},
			buy(){
				if(!hasMilestone("o","s0")) player.o.sushis=player.o.sushis.sub(this.cost())
				player.o.buyables[82]=player.o.buyables[82].add(1)
			},
			unlocked(){return player.o.buyables[81].gte(2)||player.o.buyables[101].gte(1)},
			style(){return{'background-color':(this.canAfford()?'cyan':'#bf8f8f'),'height':'196px','width':'196px'}}
		},
		83:{
			title: "<h2>Sushi-Onion Synchronizer",
			display(){return `<h3>Boosts Sushi based on your OlOs<br>Cost: ${format(this.cost())} SoS<br>Amount: ${formatWhole(player.o.buyables[83])}<br>Effect: ${format(this.effect())}x`},
			canAfford(){return player.o.sushis.gte(this.cost())},
			cost(){return Decimal.pow(25, player.o.buyables[83]).mul("1e24").pow(player.o.buyables[this.id].gte(Decimal.add(25, tmp.o.buyables[92].effect))?Decimal.add(1, player.o.buyables[this.id].sub(Decimal.add(24, tmp.o.buyables[92].effect)).div(10)):1)},
			effect(){return Decimal.pow(player.o.vibeCheck.add(10).log(10), player.o.buyables[83]).pow(player.o.buyables[this.id].gte(Decimal.add(25, tmp.o.buyables[92].effect))?Decimal.add(1, player.o.buyables[this.id].sub(Decimal.add(24, tmp.o.buyables[92].effect)).div(10)):1)},
			buy(){
				if(!hasMilestone("o","s0")) player.o.sushis=player.o.sushis.sub(this.cost())
				player.o.buyables[83]=player.o.buyables[83].add(1)
			},
			unlocked(){return player.o.buyables[82].gte(2)||player.o.buyables[101].gte(1)},
			style(){return{'background-color':(this.canAfford()?'cyan':'#bf8f8f'),'height':'196px','width':'196px'}}
		},
		91:{
			title: "<h2>Sushi Maker Maker",
			display(){return `<h3>increases Sushi Maker's base<br>Cost: ${format(this.cost())} SoS<br>Amount: ${formatWhole(player.o.buyables[91])}<br>Currently: +${formatWhole(this.effect().sub(1))} Sushi Maker base`},
			canAfford(){return player.o.sushis.gte(this.cost())},
			cost(){return new Decimal("1e26").mul(player.o.buyables[91].add(1).pow(player.o.buyables[91].add(1))).pow(player.o.buyables[this.id].gte(Decimal.add(25, tmp.o.buyables[92].effect))?Decimal.add(1, player.o.buyables[this.id].sub(Decimal.add(24, tmp.o.buyables[92].effect)).div(10)):1)},
			effect(){return player.o.buyables[91].add(1)},
			buy(){
				if(!hasMilestone("o","s0")) player.o.sushis=player.o.sushis.sub(this.cost())
				player.o.buyables[91]=player.o.buyables[91].add(1)
			},
			unlocked(){return player.o.buyables[83].gte(2)||player.o.buyables[101].gte(1)},
			style(){return{'background-color':(this.canAfford()?'cyan':'#bf8f8f'),'height':'196px','width':'196px'}}
		},
		92:{
			title: "<h2>Anti-Scaler",
			display(){return `<h3>Cost scaling starts later<br>Cost: ${format(this.cost())} SoS<br>Amount: ${formatWhole(player.o.buyables[92])}<br>Currently: +${format(this.effect())} later cost scaling`},
			canAfford(){return player.o.sushis.gte(this.cost())},
			cost(){return new Decimal("3e32").mul(Decimal.pow(10, new Decimal(player.o.buyables[92].add(1)).factorial())).pow(player.o.buyables[this.id].gte(Decimal.add(25, tmp.o.buyables[92].effect))?Decimal.add(1, player.o.buyables[this.id].sub(Decimal.add(24, tmp.o.buyables[92].effect)).div(10)):1)},
			effect(){return player.o.buyables[92]},
			buy(){
				if(!hasMilestone("o","s0")) player.o.sushis=player.o.sushis.sub(this.cost())
				player.o.buyables[92]=player.o.buyables[92].add(1)
			},
			unlocked(){return player.o.buyables[91].gte(8)||player.o.buyables[101].gte(1)},
			style(){return{'background-color':(this.canAfford()?'cyan':'#bf8f8f'),'height':'196px','width':'196px'}}
		},
		93:{
			title: "<h2>Sushi-Burger Synchronizer",
			display(){return `<h3>Boosts Sushi based on your BoBs<br>Cost: ${format(this.cost())} SoS<br>Amount: ${formatWhole(player.o.buyables[93])}<br>Effect: ${format(this.effect())}x`},
			canAfford(){return player.o.sushis.gte(this.cost())},
			cost(){return Decimal.pow(3125, player.o.buyables[93]).mul("1e40").pow(player.o.buyables[this.id].gte(Decimal.add(25, tmp.o.buyables[92].effect))?Decimal.add(1, player.o.buyables[this.id].sub(Decimal.add(24, tmp.o.buyables[92].effect)).div(10)):1)},
			effect(){return Decimal.pow(player.o.burgers.add(10).log(10), player.o.buyables[93]).pow(player.o.buyables[this.id].gte(Decimal.add(25, tmp.o.buyables[92].effect))?Decimal.add(1, player.o.buyables[this.id].sub(Decimal.add(24, tmp.o.buyables[92].effect)).div(10)):1)},
			buy(){
				if(!hasMilestone("o","s0")) player.o.sushis=player.o.sushis.sub(this.cost())
				player.o.buyables[93]=player.o.buyables[93].add(1)
			},
			unlocked(){return player.o.buyables[92].gte(3)||player.o.buyables[101].gte(1)},
			style(){return{'background-color':(this.canAfford()?'cyan':'#bf8f8f'),'height':'196px','width':'196px'}}
		},
		101:{
			title: "<h1>Prestige Sushi",
			display(){return `<h2>Boosts Sushi's effect and unlocks a new tab<br>You'll get ${formatWhole(this.gain())} Prestige Sushis on purchase<br>Next At: ${format(this.getNextAt())} SoS<br>Amount: ${formatWhole(player.o.buyables[101])}<br>Effect: ${format(this.effect())}x`},
			canAfford(){return player.o.sushis.gte(this.cost())},
			gain(){return player.o.sushis.div("1e52").div(Decimal.pow(52, player.o.buyables[101].sub(1))).add(1).log(52).floor().max(0);},
			getNextAt(){
				return this.cost().mul(Decimal.pow(52, this.gain()))
			},
			cost(){return new Decimal("1e52").mul(Decimal.pow(52, player.o.buyables[101]))},
			effect(){return player.o.buyables[101].add(1).pow(2)},
			buy(){
				player.o.buyables[101]=player.o.buyables[101].add(this.gain())
				player.o.sushis=new Decimal(1)
				for(i=6;i<10;i++){
					for(v=1;v<4;v++){
						player.o.buyables[i*10+v]=new Decimal(0)
					}
				}
				player.o.unlocked5=true
			},
			unlocked(){return player.o.buyables[93].gte(3)||player.o.buyables[101].gte(1)},
			style(){return{'background-color':(this.canAfford()?'cyan':'#bf8f8f'),'height':'196px','width':'630px'}}
		},
		111:{
			title: "<h2>Start a new TMT",
			display(){return `<h3>You've decided to try out TMT yourself.<br>You don't really know how to make layers yet, but you are learning nonetheless.<br>Cost: ${format(this.cost())} ToTs<br>Amount: ${formatWhole(player.o.buyables[111])}<br>Effect: ${format(this.effect().mul(100))}% of gain`},
			canAfford(){return player.o.teriyakis.gte(this.cost())&&player.o.buyables[111].lt(100)},
			cost(){return Decimal.pow(player.o.buyables[111].add(1), 2).mul(10)},
			effect(){return player.o.buyables[111].pow(tmp.o.buyables[113].effect).div(100)},
			buy(){
				player.o.teriyakis=player.o.teriyakis.sub(this.cost())
				player.o.buyables[111]=player.o.buyables[111].add(1)
			},
			unlocked(){return true},
			style(){return{'background-color':(this.canAfford()?'brown':'#bf8f8f'),'height':'196px','width':'196px'}}
		},
		112:{
			title: "<h2>Lose everything</h2><br>(oops)",
			display(){return `<h3>So you finally finished your mod aaaaaaaand... it sucks COMPLETE ASS. You start over with prior knowledge and experience to aid you.<br>Cost: ${format(this.cost())} Layers<br>Amount: ${formatWhole(player.o.buyables[112])}<br>Effect: ${format(this.effect())}x base ToTs in formula`},
			canAfford(){return player.o.treeOfLayers.gte(player.o.buyables[112].add(1))},
			cost(){return player.o.buyables[112].add(1)},
			effect(){return player.o.buyables[112].add(1).pow(2).pow(tmp.o.buyables[113].effect)},
			buy(){
				if(!hasMilestone("o","tFinal")) player.o.treeOfLayers=hasMilestone("o","t3")?player.o.treeOfLayers.sub(player.o.buyables[112].add(1)):new Decimal(0)
				if(hasMilestone("o","tFinal")) player.o.treeOfLayersTotal = player.o.treeOfLayersTotal.add(player.o.buyables[112].add(1))
				player.o.buyables[111]=hasMilestone("o","t3")?player.o.buyables[111]:new Decimal(0)
				player.o.buyables[112]=player.o.buyables[112].add(1)
			},
			unlocked(){return hasMilestone("o", "t0")},
			style(){return{'background-color':(this.canAfford()?'brown':'#bf8f8f'),'height':'196px','width':'196px'}}
		},
		113:{
			title: "<h2>Rewrite layers",
			display(){return `<h3>You've played Alphabet Tree a bit too much. You should take a break and... what are you doing?<br>... Don't you even FUCK-<br>Cost: ${format(this.cost())} Layers<br>Amount: ${formatWhole(player.o.buyables[113])}<br>Effect: ^${format(this.effect())} previous Layer buyables effect and +${format(this.effect2())} Layers/sec`},
			canAfford(){return player.o.treeOfLayers.gte(this.cost())},
			cost(){return new Decimal(125).add(player.o.buyables[113].pow(3))},
			effect(){return player.o.buyables[113].add(1).pow(1/9)},
			effect2(){return player.o.buyables[111].mul(player.o.buyables[112]).mul(player.o.buyables[113]).root(3).pow(this.effect()).root(3)},
			buy(){
				player.o.treeOfLayersTotal = player.o.treeOfLayersTotal.add(this.cost())
				player.o.buyables[113]=player.o.buyables[113].add(1)
			},
			unlocked(){return hasMilestone("o", "t6")||true},
			style(){return{'background-color':(this.canAfford()?'brown':'#bf8f8f'),'height':'196px','width':'196px'}}
		},
	},
	bars: {
		one: {
			direction: UP,
			width: 75,
			height: 250,
			display(){return format(player.o.first)+" / "+format(player.o.firstLevel.pow(2).mul(10))},
			progress() { return player.o.first.div(10).div(player.o.firstLevel.pow(2)) },
			style(){return{'color':(this.progress().gte(0.5)?'#000000':'white')}}
		},
		two: {
			direction: UP,
			width: 75,
			height: 250,
			display(){return format(player.o.second)+" / "+format(player.o.secondLevel.pow(2).mul(10))},
			progress() { return player.o.second.div(10).div(player.o.secondLevel.pow(2)) },
			style(){return{'color':(this.progress().gte(0.5)?'#000000':'white')}}
		},
		three: {
			direction: UP,
			width: 75,
			height: 250,
			display(){return format(player.o.third)+" / "+format(player.o.thirdLevel.pow(2).mul(10))},
			progress() { return player.o.third.div(10).div(player.o.thirdLevel.pow(2)) },
			style(){return{'color':(this.progress().gte(0.5)?'#000000':'white')}}
		},
		fifth: {
			direction: UP,
			width: 375,
			height: 150,
			display(){return format(player.o.fifth)+" / "+format(new Decimal(10).mul(Decimal.pow(Decimal.root(4,3), player.o.fifthLevel.sub(1))))},
			progress() { return player.o.fifth.div(10).div(new Decimal(10).mul(Decimal.pow(Decimal.root(4,3), player.o.fifthLevel.sub(1))).div(10)) },
			style(){return{'color':(this.progress().gte(0.5)?'#000000':'white')}},
			unlocked(){return hasMilestone("o", "o0")}
		}
	},
	branches: [["n",3], ["m",3]],
	componentStyles:{
		"challenge-button"(){return{'background-color':'brown'}},
	},
    layerShown(){return (player.ab.points.gte(5) && !player.ab.nostalgia) || (player.ab.nostalgia && player.ab.fuckyou)||options.why},
	doReset(resettingLayer){
		if(player.ab.points.gte(5)) {
			player.points = new Decimal(17.77)
			player.ab.negativePoints = new Decimal(0)
		}
		if(tmp[resettingLayer].row > this.row){
			player.o.points = new Decimal(0)
			player.o.unlocked = false
			player.o.onions = new Decimal(0)
			player.o.burgers = new Decimal(0)
			player.o.totalburgers = new Decimal(0)
			player.o.upgrades = []
			player.o.vibeCheck = new Decimal(0)
			player.o.firstLevel = new Decimal(1)
			player.o.secondLevel = new Decimal(1)
			player.o.thirdLevel = new Decimal(1)
			player.o.fifthLevel = new Decimal(1)
			player.o.first = new Decimal(0)
			player.o.second = new Decimal(0)
			player.o.third = new Decimal(0)
			player.o.fifth = new Decimal(0)
			player.o.buyables[21] = new Decimal(0)
			player.o.buyables[22] = new Decimal(0)
			player.o.buyables[23] = new Decimal(0)
			player.o.buyables[61] = new Decimal(0)
			player.o.buyables[62] = new Decimal(0)
			player.o.buyables[63] = new Decimal(0)
			player.o.buyables[71] = new Decimal(0)
			player.o.buyables[72] = new Decimal(0)
			player.o.buyables[73] = new Decimal(0)
			player.o.buyables[81] = new Decimal(0)
			player.o.buyables[82] = new Decimal(0)
			player.o.buyables[83] = new Decimal(0)
			player.o.buyables[91] = new Decimal(0)
			player.o.buyables[92] = new Decimal(0)
			player.o.buyables[93] = new Decimal(0)
			player.o.buyables[101] = new Decimal(0)
			player.o.buyables[111] = new Decimal(0)
			player.o.buyables[112] = new Decimal(0)
			player.o.buyables[31] = new Decimal(0)
			player.o.milestones = []
			player.n.auto = false
			player.n.autoUpgrade = false
			player.o.auto = false
			player.o.challenges[11] = 0
			player.o.challenges[12] = 0
			player.o.challenges[21] = 0
			player.o.challenges[22] = 0
			player.o.sushis = new Decimal(0)
			player.o.unlocked2 = false
			player.o.unlocked3 = false
			player.o.unlocked4 = false
			player.o.unlocked5 = false
			player.o.teriyakis = new Decimal(0)
			player.o.treeOfLayers = new Decimal(0)
			player.o.treeOfLayersBest = new Decimal(0)
			player.o.treeOfLayersTotal = new Decimal(0)
			player.o.plots = new Decimal(0)
		}
		if(tmp[resettingLayer].row>=2&&player.ab.shopPoints.lt(1)&&player.ab.points.gte(5)) {
			player.ab.buyables[11] = new Decimal(0)
			player.ab.buyables[12] = new Decimal(0)
			player.ab.buyables[13] = new Decimal(0)
			player.ab.buyables[14] = new Decimal(0)
			player.ab.spentPoints = new Decimal(0)
		}
	}
})

addLayer("miniTree",{
	row: "side",
	symbol: "PTC",
	color(){return inChallenge("c",51)&&player.eClassic.points.gte(1)?"#00FF00":"rgb(105,0,111)"},
	tooltip(){return `${formatWhole(player.pClassic.normalPoints)} points`},
	layerShown(){return inChallenge("c", 42)},
	tabFormat:[["display-text",function(){return "<span>You have <h2 class='overlayThing' id='points'>"+format(player.pClassic.normalPoints)+"</h2> points</span>"}],"blank","blank","blank","blank",["tree", [["pClassic"],["bClassic", "gClassic"],["eClassic"]]]]
})

addLayer("pClassic", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
		normalPoints: new Decimal(10),
    }},
	shouldNotify(){return false},
	tabFormat:["main-display","prestige-button",["display-text", function(){return `You have ${formatWhole(player.pClassic.normalPoints.floor())} points`}],"blank","blank","blank","upgrades"],
	update(diff){
		let gain=new Decimal(hasUpgrade("pClassic",11)?upgradeEffect("pClassic",11):0).mul(tmp.bClassic.effect).mul(tmp.gClassic.effectPower)
		if(hasUpgrade("pClassic",12))gain=gain.mul(upgradeEffect("pClassic",12))
		if(hasUpgrade("pClassic",13))gain=gain.mul(upgradeEffect("pClassic",13))
		if(hasUpgrade("pClassic",22))gain=gain.mul(upgradeEffect("pClassic",22))
		if(player.eClassic.unlocked)gain=gain.mul(tmp.eClassic.effectTime).mul(tmp.eClassic.buyables[21].effect)
		player.pClassic.normalPoints=player.pClassic.normalPoints.add(gain.mul(diff)).max(0)
	},
	passiveGeneration(){return hasMilestone("gClassic", 1)?1:0},
	symbol: "P",
    color: "#8FBFBF",                       // The color for this layer, which affects many elements.
    resource: "prestige points",            // The name of this layer's main prestige resource.
    row: 0,                                 // The row this layer is on (0 is the first row).
    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.pClassic.normalPoints },  // A function to return the current amount of baseResource.
    requires: new Decimal(10),              // The amount of the base needed to  gain 1 of the prestige currency.
    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).
    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        let eff=new Decimal(1)
		if(hasUpgrade("pClassic",21))eff=eff.mul(2)
		if(hasUpgrade("pClassic",23))eff=eff.mul(upgradeEffect("pClassic",23))
		if(hasUpgrade("bClassic",11))eff=eff.mul(upgradeEffect("bClassic",11))
		if(hasUpgrade("gClassic",11))eff=eff.mul(upgradeEffect("gClassic",11))
		if(player.eClassic.unlocked)eff=eff.mul(tmp.eClassic.effectTime).mul(tmp.eClassic.buyables[12].effect.p).mul(tmp.eClassic.buyables[21].effect)
		return eff
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.
    upgrades: {
        11:{
			description(){return `Gain ${format(this.effect())} points every second.`},
			effect(){return player.s.points.add(1).mul(player.t.points.add(1)).log(200).pow(1.295305888531)},
			cost: new Decimal(1),
			unlocked(){return player.pClassic.points.gte(1)||hasUpgrade("pClassic", 11)||(player.bClassic.unlocked||player.gClassic.unlocked)}
		},
        12:{
			description: "Point generation is faster based on your unspent Prestige Points.",
			cost: new Decimal(1),
			effect(){return player.pClassic.points.add(1).pow(player.g.upgrades.includes(24)?1.1:(player.g.upgrades.includes(14)?0.75:0.5))},
			effectDisplay(){return format(this.effect())+"x"},
			unlocked(){return hasUpgrade("pClassic", 11)}
		},
        13:{
			description: "Point generation is faster based on your Point amount.",
			cost: new Decimal(5),
			effect(){return player.pClassic.normalPoints.add(1).log10().pow(0.75).add(1).pow(hasUpgrade("gClassic", 15)?upgradeEffect("gClassic", 15):1)},
			effectDisplay(){return format(this.effect())+"x"},
			unlocked(){return hasUpgrade("pClassic", 12)}
		},
		21: {
			description: "Prestige Point gain is doubled.",
			cost: new Decimal(20),
			unlocked(){return hasUpgrade("pClassic", 11)&&(player.bClassic.unlocked||player.gClassic.unlocked)},
		},
		22: {
			description: "Point generation is faster based on your Prestige Upgrades bought.",
			cost: new Decimal(75),
			effect(){return Decimal.pow(1.4, player.pClassic.upgrades.length)},
			effectDisplay(){return format(this.effect())+"x"},
			unlocked(){return hasUpgrade("pClassic", 12)&&(player.bClassic.unlocked||player.gClassic.unlocked)},
		},
		23: {
			description: "Prestige Point gain is boosted by your Point amount.",
			cost: new Decimal(5e3),
			effect(){return player.pClassic.normalPoints.add(1).log10().cbrt().add(1).pow(hasUpgrade("gClassic", 23)?upgradeEffect("gClassic", 23):1)},
			effectDisplay(){return format(this.effect())+"x"},
			unlocked(){return hasUpgrade("pClassic", 13)&&(player.bClassic.unlocked||player.gClassic.unlocked)},
		},
    },
	componentStyles:{
		"prestige-button"(){return{'color':'rgba(0, 0, 0, 0.5)','border-radius':'25%'}},
		"upgrade"(){return{'color':'rgba(0, 0, 0, 0.5)'}}
	},
	doReset(resettingLayer){
		if(tmp[resettingLayer].name=="pClassic"){
			player.pClassic.normalPoints = new Decimal(0)
		}
	}
})

addLayer("bClassic", {
	startData() { return {                
        unlocked: false,                    
        points: new Decimal(0),
		best: new Decimal(0),
		auto: false,
    }},
	update(){
		if(player.bClassic.auto) doReset("bClassic")
	},
	canBuyMax(){return hasMilestone("bClassic", 1)},
	resetsNothing(){return hasMilestone("eClassic", 5)},
	tabFormat:["main-display","prestige-button","blank",["display-text", function(){return `Your best bananas is ${formatWhole(player.bClassic.best)}`}],"milestones","blank","upgrades"],
	requires(){return new Decimal(player.gClassic.unlocked&&!player.bClassic.unlocked?1000000:200).div(hasUpgrade("b",23)?upgradeEffect("b",23):1).div(tmp.eClassic.buyables[23].effect)},
	baseResource: "points",
	effect(){return Decimal.pow(new Decimal(1.2).add(hasUpgrade("bClassic",12)?upgradeEffect("bClassic",12):0).add(hasUpgrade("bClassic",13)?upgradeEffect("bClassic",13):0).add(tmp.eClassic.buyables[12].effect.bg).add(tmp.eClassic.buyables[22].effect), player.bClassic.points)},
	effectDescription(){return `translated to a ${format(this.effect())}x multiplier to point gain`},
    baseAmount() { return player.pClassic.normalPoints },
	symbol: "B",
	type: "static",
	exponent: new Decimal(1.25),
	base: new Decimal(5),
	resource: "bananas",
	color: "#9E8541",
	branches: ["pClassic"],
	layerShown(){return player.pClassic.points.gte(1)||hasUpgrade("pClassic", 11)||(player.bClassic.unlocked||player.gClassic.unlocked)},
	milestones:{
		0:{
			requirementDescription: "8 Bananas", 
			effectDescription: "Keep Prestige Upgrades on reset",
			done(){return player.bClassic.points.gte(8)}
		},
		1:{
			requirementDescription: "15 Bananas",
			effectDescription: "You can buy max Bananas",
			done(){return player.bClassic.points.gte(15)}
		}
	},
	upgrades:{
		11: {
			description: "Bananas boost Prestige Point gain.",
			cost: new Decimal(3),
			unlocked() { return player.bClassic.unlocked },
			effect() { return player.bClassic.points.sqrt().add(1).max(1.5) },
			effectDisplay() { return format(this.effect())+"x" },
		},
		12: {
			description: "Granates add to the Banana effect.",
			cost: new Decimal(7),
			unlocked() { return player.gClassic.unlocked },
			effect() { return player.gClassic.points.add(1).log10().sqrt().div(3) },
			effectDisplay() { return "+"+format(this.effect())+" to base" },
		},
		13: {
			description: "Prestige Points add to the Banana effect.",
			cost: new Decimal(8),
			unlocked() { return player.bClassic.best.gte(8) },
			effect() { return player.pClassic.points.add(1).log10().add(1).log10().div(3) },
			effectDisplay() { return "+"+format(this.effect())+" to base" },
		},
		21: {
			description: "Square the Granate Juice effect.",
			cost: new Decimal(10),
			unlocked() { return player.bClassic.upgrades.includes(11) && player.bClassic.upgrades.includes(12) },
		},
		22: {
			description: "The Granate Juice effect is raised to the power of 1.2.",
			cost: new Decimal(15),
			unlocked() { return player.bClassic.upgrades.includes(12) && player.bClassic.upgrades.includes(13) },
		},
		23: {
			description: "Bananas are cheaper based on your points.",
			cost: new Decimal(18),
			unlocked() { return player.bClassic.upgrades.includes(21) || player.bClassic.upgrades.includes(22) },
			effect() { return player.pClassic.normalPoints.add(1).log10().add(1).pow(3.2) },
			effectDisplay() { return "/"+format(this.effect()) },
		},
	},
	componentStyles:{
		"prestige-button"(){return{'color':'rgba(0, 0, 0, 0.5)','border-radius':'25%'}},
		"upgrade"(){return{'color':'rgba(0, 0, 0, 0.5)'}},
		"milestone"(){return{'width':'238px','height':'75px'}}
	},
	doReset(resettingLayer){
		if(tmp[resettingLayer].name=="bClassic"){
			player.pClassic.normalPoints = new Decimal(10)
			player.pClassic.points = new Decimal(0)
			player.gClassic.power = new Decimal(0)
			if(!(hasMilestone("bClassic", 0)||hasMilestone("gClassic", 0)||hasMilestone("eClassic", 1))) player.pClassic.upgrades = []
		}
	}
})

addLayer("gClassic", {
	startData() { return {                
        unlocked: false,                    
        points: new Decimal(0),     
		best: new Decimal(0),
		power: new Decimal(0),
		auto: false
    }},
	canBuyMax(){return hasMilestone("gClassic", 2)},
	resetsNothing(){return hasMilestone("eClassic", 5)},
	tabFormat:["main-display","prestige-button","blank",["display-text", function(){return `Your best granate is ${formatWhole(player.gClassic.best)}`}],"milestones","blank",["display-text", function(){return `You have ${format(player.gClassic.power)} Granate Juice, which multiplies Point gain by ${format(tmp.gClassic.effectPower)}`}],"blank","blank","upgrades"],
	requires(){return new Decimal(player.bClassic.unlocked&&!player.gClassic.unlocked?1000000:200).div(tmp.eClassic.buyables[23].effect).div(hasUpgrade("gClassic",22)?upgradeEffect("gClassic",22):1)},
	update(diff){
		player.gClassic.power = player.gClassic.power.add(tmp.gClassic.effect.mul(diff))
		if(player.gClassic.auto) doReset("gClassic")
	},
	baseResource: "points",
    baseAmount() { return player.pClassic.normalPoints },
	effect(){return Decimal.pow(new Decimal(1.2).add(hasUpgrade("gClassic",12)?upgradeEffect("gClassic",12):0).add(hasUpgrade("gClassic",13)?upgradeEffect("gClassic",13):0).add(tmp.eClassic.buyables[12].effect.bg).add(tmp.eClassic.buyables[22].effect), player.gClassic.points).sub(1).mul(hasUpgrade("gClassic",21)?upgradeEffect("gClassic",21):1).mul(hasUpgrade("gClassic",25)?upgradeEffect("gClassic",25):1)},
	effectPower(){return player.gClassic.power.add(1).pow(1/3).pow(hasUpgrade("bClassic",21)?2:1).pow(hasUpgrade("bClassic",22)?1.2:1)},
	effectDescription(){return `which are generating ${format(this.effect())} Granate Juice/sec`},
	symbol: "G",
	type: "static",
	exponent: new Decimal(1.25),
	base: new Decimal(5),
	resource: "granates",
	color: "#9C406E",
	branches: ["pClassic"],
	layerShown(){return player.pClassic.points.gte(1)||hasUpgrade("pClassic", 11)||(player.bClassic.unlocked||player.gClassic.unlocked)},
	milestones:{
		0:{
			requirementDescription: "8 Granates",
			effectDescription: "Keep Prestige Upgrades on reset",
			done(){return player.gClassic.points.gte(8)}
		},
		1:{
			requirementDescription: "10 Granates",
			effectDescription: "Gain 100% of Prestige Point gain every second",
			done(){return player.gClassic.points.gte(10)}
		},
		2:{
			requirementDescription: "15 Granates",
			effectDescription: "You can buy max Granates",
			done(){return player.gClassic.points.gte(15)}
		}
	},
	upgrades:{
		11: {
			description: "Granates boost Prestige Point gain.",
			cost: new Decimal(3),
			unlocked() { return player.gClassic.unlocked },
			effect() { return player.gClassic.points.sqrt().add(1).max(1.5) },
			effectDisplay(x) { return format(this.effect())+"x" },
		},
		12: {
			description: "Bananas boost Granate Juice gain.",
			cost: new Decimal(7),
			unlocked() { return player.bClassic.unlocked },
			effect() { return player.bClassic.points.add(1).log10().sqrt().div(3) },
			effectDisplay() { return "+"+format(this.effect())+" to base" },
		},
		13: {
			description: "Prestige Points boost Granate Juice gain.",
			cost: new Decimal(8),
			unlocked() { return player.gClassic.best.gte(8) },
			effect() { return player.pClassic.points.add(1).log10().add(1).log10().div(3) },
			effectDisplay() { return "+"+format(this.effect())+" to base" },
		},
		14: {
			description: "Prestige Upgrade 2 uses a better formula.",
			cost: new Decimal(13),
			unlocked() { return player.gClassic.best.gte(10) },
		},
		15: {
			description: "Prestige Upgrade 3 is stronger based on your Generators.",
			cost: new Decimal(15),
			unlocked() { return player.gClassic.upgrades.includes(13) },
			effect() { 
				let ret = player.gClassic.points.sqrt().add(1)
				if (ret.gte(400)) ret = ret.cbrt().times(Math.pow(400, 2/3))
				return ret;
			},
			effectDisplay() { return "^"+format(this.effect()) },
		},
		21: {
			description: "Generator Power generates faster based on its amount.",
			cost: new Decimal(18),
			unlocked() { return player.gClassic.upgrades.includes(15) },
			effect() { return player.gClassic.power.add(1).log10().add(1) },
			effectDisplay() { return format(this.effect())+"x" },
		},
		22: {
			description: "Generators are cheaper based on your Prestige Points.",
			cost: new Decimal(19),
			unlocked() { return player.gClassic.upgrades.includes(15) },
			effect() { return player.pClassic.points.add(1).pow(0.25) },
			effectDisplay() { return "/"+format(this.effect()) },
		},
		23: {
			description: "Prestige Upgrade 6 is stronger based on your Boosters.",
			cost: new Decimal(20),
			unlocked() { return player.bClassic.unlocked && player.gClassic.upgrades.includes(15) },
			effect() { return player.bClassic.points.pow(0.75).add(1) },
			effectDisplay() { return "^"+format(this.effect()) },
		},
		24: {
			description: "Prestige Upgrade 2 uses an even better formula.",
			cost: new Decimal(22),
			unlocked() { return player.gClassic.upgrades.includes(14) && (player.gClassic.upgrades.includes(21)||player.gClassic.upgrades.includes(22)) },
		},
		25: {
			description: "Prestige Points boost Generator Power gain.",
			cost: new Decimal(28),
			unlocked() { return player.gClassic.upgrades.includes(23) && player.gClassic.upgrades.includes(24) },
			effect() { return player.pClassic.points.add(1).log10().sqrt().add(1) },
			effectDisplay() { return format(this.effect())+"x" },
		},
	},
	componentStyles:{
		"prestige-button"(){return{'color':'rgba(0, 0, 0, 0.5)','border-radius':'25%'}},
		"upgrade"(){return{'color':'rgba(0, 0, 0, 0.5)'}},
		"milestone"(){return{'width':'350px','height':'75px'}}
	},
	doReset(resettingLayer){
		if(tmp[resettingLayer].name=="gClassic"){
			player.pClassic.normalPoints = new Decimal(10)
			player.pClassic.points = new Decimal(0)
			player.gClassic.power = new Decimal(0)
			if(!(hasMilestone("bClassic", 0)||hasMilestone("gClassic", 0)||hasMilestone("eClassic", 1))) player.pClassic.upgrades = []
		}
	}
})

addLayer("eClassic", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
		best: new Decimal(0),
		power: new Decimal(0),
		spent: new Decimal(0),
    }},
	resetsNothing(){return hasMilestone("eClassic", 6)},
	update(diff){
		player.eClassic.power=player.eClassic.power.add(tmp.eClassic.effectPow.mul(diff)).min(tmp.eClassic.effectLim)
		if(hasMilestone("eClassic", 6)) doReset("eClassic")
	},
	shouldNotify(){return false},
	tabFormat:["main-display","prestige-button",["display-text", function(){return `You have ${formatWhole(player.pClassic.normalPoints.floor())} points`}],"blank",["display-text", function(){return `Your best eternals is ${formatWhole(player.eClassic.best)}`}],"milestones","blank",["display-text", function(){return `You have ${format(player.eClassic.power)} Endless Energy, which multiplies Point gain & Prestige Point gain by ${format(tmp.eClassic.effectTime)}<br>You have ${format(player.bClassic.points)} Bananas<br>You have ${formatWhole(tmp.eClassic.spaceJam)} Space remaining for Space Buildings.<br>You have ${format(player.gClassic.power)} Granate Juice`}],"blank",["buyable","respec2"],["column", [["row", [["buyable",11],["blank", ["94px","94px"]],["buyable",12]]],"blank","blank",["row", [["buyable",21],["blank", ["94px","94px"]],["buyable",22],["blank", ["94px","94px"]],["buyable",23]]]]],"blank","blank","blank","upgrades"],
	symbol: "E",
	effectPow(){return Decimal.pow(5/3, player.eClassic.points.add(player.eClassic.buyables[11])).sub(1)},
	effectLim(){return Decimal.pow(4/3, player.eClassic.points.add(player.eClassic.buyables[11])).sub(1).mul(100)},
	effectTime(){return player.eClassic.power.add(1).pow(1.2)},
	effectDescription(){return `which are generating ${format(tmp.eClassic.effectPow)} Endless Energy/sec, but with a limit of ${format(tmp.eClassic.effectLim)} Endless Energy`},
	spaceJam(){
		let baseSpace = player.eClassic.best.pow(0.1/3+1).floor()
		return baseSpace.sub(player.eClassic.spent).max(0)
	},
    color: "#50A343",                       // The color for this layer, which affects many elements.
    resource: "eternals",            // The name of this layer's main prestige resource.
    row: 0,                                 // The row this layer is on (0 is the first row).
    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.pClassic.normalPoints },  // A function to return the current amount of baseResource.
    requires: new Decimal("1e15"),              // The amount of the base needed to  gain 1 of the prestige currency.
    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.02,                          // "normal" prestige gain is (currency^exponent).
    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)
    },
    gainExp() {     
        return new Decimal(1)
    },
	branches: ["bClassic", "gClassic"],
    layerShown() { return player.gClassic.unlocked||player.bClassic.unlocked||player.eClassic.unlocked },  
	componentStyles:{
		"prestige-button"(){return{'color':'rgba(0, 0, 0, 0.5)','border-radius':'25%'}},
		"upgrade"(){return{'color':'rgba(0, 0, 0, 0.5)'}},
		"buyable"(){return{'color':'rgba(0, 0, 0, 0.5)'}},
		"milestone"(){return{'width':'334px','height':'75px'}}
	},
	doReset(resettingLayer){
		if(tmp[resettingLayer].name=="eClassic"){
			player.pClassic.normalPoints = new Decimal(10)
			player.pClassic.points = new Decimal(0)
			player.bClassic.points = new Decimal(0)
			player.gClassic.points = new Decimal(0)
			if(!(hasMilestone("eClassic", 4))) player.gClassic.power = new Decimal(0)
			if(!(hasMilestone("eClassic", 2)))player.bClassic.upgrades = []
			if(!(hasMilestone("eClassic", 2)))player.gClassic.upgrades = []
			if(!(hasMilestone("eClassic", 1)))player.pClassic.upgrades = []
			if(!(hasMilestone("bClassic", 0)||hasMilestone("gClassic", 0)||hasMilestone("eClassic", 1))) player.pClassic.upgrades = []
			if(!(hasMilestone("eClassic", 0))) player.bClassic.milestones = []
			if(!(hasMilestone("eClassic", 0))) player.gClassic.milestones = []
			if(!(hasMilestone("eClassic", 4))) player.eClassic.power=new Decimal(0)
		}
	},
	buyables:{
		respec2:{
			display: "Reset 2nd row Space Buildings",
			canAfford(){return true},
			buy(){
				if(confirm("Are you sure you want to reset your Space Buildings? This will force you to do an Eternal reset as well!")){
					player.eClassic.buyables[21] = new Decimal(0)
					player.eClassic.buyables[22] = new Decimal(0)
					player.eClassic.buyables[23] = new Decimal(0)
					player.eClassic.spent = new Decimal(0)
					doReset("eClassic", true)
				}
			},
			style(){return{'height':'50px','width':'120px','border-radius':'50%'}}
		},
		11: {
			cost() {
				let amt = player.eClassic.buyables[11]
				if (amt.gte(25)) amt = amt.pow(2).div(25)
				let cost = amt.times(0.4).pow(1.2).add(1).times(10)
				return cost.floor()
			},
			display(){return `<span style="font-size: 12.5px">Empower Eternals with Singularity<br>Cost: ${formatWhole(this.cost())} Bananas<br>Amount: ${formatWhole(player.eClassic.extraCapsules)}`},
			canAfford() { return player.bClassic.points.gte(this.cost()) },
			buy() {
				player.bClassic.points = player.bClassic.points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
		},
		12: {
			cost() {
				let e = player.eClassic.buyables[12]
				if (e.gte(25)) e = e.pow(2).div(25)
				let cost = Decimal.pow(2, e.pow(1.5))
				return cost.floor()
			},
			effect() {
				let e = player.eClassic.buyables[12]
				let eff;
				if (e.gte(0)) eff = Decimal.pow(25/3, e.pow(1.1))
				else eff = Decimal.pow(1/25, e.times(-1).pow(1.1))
				
				let e2 = player.eClassic.buyables[12]
				let eff2;
				if (e2.gte(0)) eff2 = e2.pow(0.8/3)
				else eff2 = e2.times(-1).pow(0.8/3).times(-1)
				return {p:eff, bg:eff2}
			},
			display(){return `<span style="font-size: 12.5px">Buy an Enhancer<br>Cost: ${formatWhole(this.cost())} Eternals<br>Amount: ${formatWhole(player.eClassic.buyables[12])}<br>Multiplies Prestige Point gain by ${format(tmp.eClassic.buyables[12].effect.p)}<br>Adds to base of Booster/Generator effects by ${format(tmp.eClassic.buyables[12].effect.bg)}`},
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
		},
		21: {
			cost() {
				let bought = player.eClassic.buyables[21]
				if (bought.gte(100)) bought = bought.pow(2).div(100)
				return cost = Decimal.pow(1000, bought.pow(1.35)).times(1000).times(bought.gt(0)?1:0)
			},
			effect(){return Decimal.pow(Decimal.add(1, player.eClassic.buyables[21]), player.eClassic.points.sqrt()).times(Decimal.mul(4, player.eClassic.buyables[21]).max(1))},
			display(){return `<h3 style="font-size: 12.5px">Building 1</h3><span><br>Space Energy boosts Point gain & Prestige Point gain (${format(this.effect())}x)<br><br>Level: ${formatWhole(player.eClassic.buyables[21])}<br>Cost: ${format(this.cost())} Granate Juice`},
			canAfford() { return player.bClassic.points.gte(this.cost()) },
			buy() {
				player.eClassic.spent = player.eClassic.spent.add(1)
				player.gClassic.power = player.gClassic.power.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			style(){return{'height':'120px','width':'120px'}}
		},
		22: {
			cost() {
				let bought = player.eClassic.buyables[22]
				if (bought.gte(100)) bought = bought.pow(2).div(100)
				return cost = Decimal.pow("1e10", bought.pow(1.35)).times("1e10")
			},
			effect(){return player.eClassic.buyables[22].sqrt()},
			display(){return `<h3 style="font-size: 12.5px">Building 2</h3><span><br>Adds to base of Banana/Granate effects by ${format(this.effect())}<br><br>Level: ${formatWhole(player.eClassic.buyables[21])}<br>Cost: ${format(this.cost())} Granate Juice`},
			canAfford() { return player.bClassic.points.gte(this.cost()) },
			buy() {
				player.eClassic.spent = player.eClassic.spent.add(1)
				player.gClassic.power = player.gClassic.power.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			style(){return{'height':'120px','width':'120px'}}
		},
		23: {
			cost() {
				let bought = player.eClassic.buyables[23]
				if (bought.gte(100)) bought = bought.pow(2).div(100)
				return cost = Decimal.pow("1e25", bought.pow(1.35)).times("1e25")
			},
			effect(){return Decimal.pow("1e18", player.eClassic.buyables[23].pow(0.9))},
			display(){return `<h3 style="font-size: 12.5px">Building 3</h3><span><br>Makes Bananas/Granates cheaper by ${format(this.effect())}x<br><br>Level: ${formatWhole(player.eClassic.buyables[21])}<br>Cost: ${format(this.cost())} Granate Juice`},
			canAfford() { return player.bClassic.points.gte(this.cost()) },
			buy() {
				player.eClassic.spent = player.eClassic.spent.add(1)
				player.gClassic.power = player.gClassic.power.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			style(){return{'height':'120px','width':'120px'}}
		},
	},
	milestones:{
		0:{
			requirementDescription: "2 Eternals",
			effectDescription: "Keep Banana/Granate milestones on reset",
			done(){return player.eClassic.points.gte(2)}
		},
		1:{
			requirementDescription: "3 Eternals",
			effectDescription: "Keep Prestige Upgrades on reset",
			done(){return player.eClassic.points.gte(3)}
		},
		2:{
			requirementDescription: "4 Eternals",
			effectDescription: "Keep Banana and Granate Upgrades on Eternal reset",
			done(){return player.eClassic.points.gte(4)}
		},
		3:{
			requirementDescription: "5 Eternals",
			effectDescription: "Automatically purchase Bananas and Granates",
			toggles: [["bClassic", "auto"],["gClassic", "auto"]],
			done(){return player.eClassic.points.gte(5)}
		},
		4:{
			requirementDescription: "10 Eternals",
			effectDescription: "Keep Granate Juice and Endless Energy on reset",
			done(){return player.eClassic.points.gte(10)}
		},
		5:{
			requirementDescription: "12 Eternals",
			effectDescription: "Bananas and Granates reset nothing",
			done(){return player.eClassic.points.gte(12)}
		},
		6:{
			requirementDescription: "1F100 Eternals",
			effectDescription: "Automate Eternal for the rest of eternity",
			unlocked(){return this.done()},
			done(){return player.eClassic.points.layer>=99}
		},
	},
	upgrades:{
		11: {
			description: "Eternals boost the Banana effect.",
			cost: new Decimal(2),
			unlocked() { return player.eClassic.unlocked },
			effect() { return player.eClassic.points.pow(0.9).add(0.5) },
			effectDisplay() { return "+"+format(this.effect())+" to base" },
		},
		12: {
			description: "Bananas & Granates boost each other.",
			cost: new Decimal(40),
			unlocked() { return player.eClassic.unlocked },
			effect() {
				return {g: player.bClassic.points.add(1).log10(), b: player.gClassic.points.add(1).log10()} 
			},
			effectDisplay() { return "+"+format(this.effect().g)+" to Granate base, +"+format(this.effect().g)+" to Banana base" },
		},
		13: {
			description: "Add a free level to all Space Buildings.",
			cost: new Decimal(2),
			unlocked() { return player.eClassic.unlocked },
		},
	}
})

addLayer("realAB",{
	startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),
		tickMyBalls: new Decimal(0),
    }},
	achievements:{
		11: {
			name: "T-THAT'S NOT HOW SHENANIGANS TREE LOOKS LIKE!",
			done(){return player.realAB.points.gte(1)},
			tooltip: "Get 1 anti-balancer",
		},
		12: {
			name: "NG-- = NG-",
			done(){return player.realAB.points.gte(2)},
			tooltip: "Get 2 anti-balancers",
			unlocked(){return hasAchievement("realAB",11)}
		},
		13: {
			name: "ALL YOUR REFERENCES ARE BELONG TO US",
			done(){return hasUpgrade("realAB",11)},
			tooltip: "Purchase 1st anti-balancer upgrade",
			unlocked(){return hasAchievement("realAB",12)}
		},
		14: {
			name: "i wish there was malboge tree",
			done(){return player.realAB.points.gte(3)},
			tooltip: "Get 3 anti-balancers",
			unlocked(){return hasAchievement("realAB",13)}
		},
		15: {
			name: "Down the Drain",
			done(){return player.realAB.buyables[12].gte(2)},
			tooltip: "Purchase Anti-Diviser twice",
			unlocked(){return hasAchievement("realAB",14)}
		},
		21: {
			name: "`Speedrun ${formatWhole(player.realAB.points)}`",
			done(){return player.realAB.points.gte(4)},
			tooltip: "Get 4 anti-balancers",
			unlocked(){return hasAchievement("realAB",15)},
			style(){return{'width':'278px'}}
		},
		22: {
			name: "H",
			done(){return player.o.plots.gte(10)&&player.realAB.points.gte(4)},
			tooltip: "Reach 10 plots in NG----<br>Reward: Unlocks another buyable",
			unlocked(){return hasAchievement("realAB",21)},
			style(){return{'width':(hasAchievement("realAB",24)?'43px':hasAchievement("realAB",23)?'58.66666667px':'90px')}}
		},
		23: {
			name: "E<br>U",
			done(){return player.realAB.buyables[13].gte(14)},
			tooltip: "Get 14 Plot Sharpeners<br>Reward: Removes Plot Sharpener's root",
			unlocked(){return hasAchievement("realAB",22)},
			style(){return{'width':(hasAchievement("realAB",24)?'43px':hasAchievement("realAB",23)?'58.66666667px':'90px')}}
		},
		24: {
			name: "L<br>S",
			done(){return player.o.plots.gte(20)&&player.realAB.points.gte(4)},
			tooltip(){return `Reach 20 plots in NG----<br>Reward: Plot gain is strong based on achievements.<br>Currently: ${format(Decimal.pow(1.15, new Decimal(player.realAB.achievements.length).add(1).add(player.realAB.challenges[13]+player.realAB.challenges[14])))}x`},
			unlocked(){return hasAchievement("realAB",23)},
			style(){return{'width':(hasAchievement("realAB",24)?'43px':'58.66666667px')}}
		},
		25: {
			name: "P",
			done(){return player.o.plots.gte(30)&&player.realAB.points.gte(4)},
			tooltip: "Reach 30 plots in NG----<br>Reward: Simple 2x plot gain boost",
			unlocked(){return hasAchievement("realAB",24)},
			style(){return{'width':'43px'}}
		},
		16: {
			name: "Is that a meta-reference?",
			done(){return player.realAB.points.gte(5)},
			tooltip: "Get 5 anti-balancers",
			unlocked(){return hasAchievement("realAB",25)},
		},
		26: {
			name: "Back to the Past",
			done(){return player.realAB.buyables[21].gte(1)},
			tooltip: "Get 1 degrader",
			unlocked(){return hasAchievement("realAB",16)},
		},
		31: {
			name: "A bit too late for hardcap",
			done(){return player.realAB.buyables[13].gte(12000)},
			tooltip: "Get 12,000 plot sharpeners",
			unlocked(){return hasAchievement("realAB",26)},
		},
		32: {
			name: "nuh uh",
			done(){return player.realAB.points.gte(6)},
			tooltip: "Get 6 anti-balancers",
			unlocked(){return hasAchievement("realAB",26)},
		},
		33: {
			name: "Doesn't seem so easy now, huh?",
			done(){return player.realAB.challenges[11]>=2},
			tooltip: `Beat "Useless Upgrades" twice`,
			unlocked(){return hasAchievement("realAB",32)},
		},
		34: {
			name: "TIMEWALL 40,000<br>WRATHHERESY",
			done(){return player.realAB.buyables[13].gte(40000)},
			tooltip: "Get 40,000 plot sharpeners",
			unlocked(){return hasAchievement("realAB",33)},
		},
		35: {
			name: "History Repeats Itself",
			done(){return player.realAB.points.gte(7)},
			tooltip: "Get 7 anti-balancers",
			unlocked(){return hasAchievement("realAB",34)},
		},
		36: {
			name: "Finally, some good fucking pacing",
			done(){return hasUpgrade("pp",12)},
			tooltip: "Purchase 2nd PP upgrade",
			unlocked(){return hasAchievement("realAB",35)},
		},
		41: {
			name: "Oops! All Inflations!",
			done(){return hasUpgrade("pp",15)},
			tooltip: "Purchase 5th PP upgrade",
			unlocked(){return hasAchievement("realAB",36)},
		},
		42: {
			name: "There aren't going to be new features from now on",
			done(){return player.realAB.points.gte(8)},
			tooltip: "Get 8 anti-balancers",
			unlocked(){return hasAchievement("realAB",41)},
		},
		43: {
			name: "BALANCE IS DEAD<br><br><br><br>BOTTOM TEXT",
			done(){return player.pp.points.gte(10000000)&&hasUpgrade("pp",25)},
			tooltip: "Get 10,000,000 practically pointless points after purchasing 10th PP upgrade<br>Reward: Removes plot gain hardcap",
			unlocked(){return hasAchievement("realAB",42)},
		},
		44: {
			name: "fucking",
			done(){return player.realAB.points.gte(9)},
			tooltip: "Get 9 anti-balancers",
			unlocked(){return hasAchievement("realAB",42)},
		},
		45: {
			name: "god",
			done(){return player.realAB.points.gte(10)},
			tooltip: "Get 10 anti-balancers",
			unlocked(){return hasAchievement("realAB",42)},
		},
	},
	upgrades:{
		11:{
			title: "Anti-Anti Measurement",
			description: "Your plot gain is stronger based on anti-balancers",
			cost: new Decimal(10),
			effect(){return player.realAB.points.mul(player.realAB.challenges[11]+player.realAB.challenges[14]+1).add(1).root(1.15)},
			effectDisplay(){return format(this.effect())+"x"},
			currencyInternalName: "plots",
			currencyDisplayName: "plots",
			currencyLayer: "o",
			onPurchase(){
				player.realAB.tickMyBalls=new Decimal(0)
			},
			unlocked(){return player.realAB.points.gte(2)||(hasUpgrade("realAB",11)&&hasMilestone("realAB",0))}
		},
		12:{
			fullDisplay(){return "<h3>I-I mean, it still counts. Right?</h3><br><br>Your plot gain is 1.9001 times stronger!!<br><br>Cost: 9.001 plots"},
			cost: new Decimal(9.001),
			currencyInternalName: "plots",
			currencyDisplayName: "plots",
			currencyLayer: "o",
			onPurchase(){
				player.realAB.tickMyBalls=new Decimal(0)
			},
			unlocked(){return player.realAB.points.gte(4)||(hasUpgrade("realAB",12)&&hasMilestone("realAB",0))}
		},
		13:{
			title: "Challenge Reversal",
			description(){return `Your plot gain is +${format(this.effect())}, ${format(this.effect2())}x and ^${format(this.effect3())} stronger in challenges based on total challenge completions`},
			cost: new Decimal(20+(20/9)),
			effect(){return new Decimal(player.realAB.challenges[11]+player.realAB.challenges[12]+player.realAB.challenges[13]+(player.realAB.challenges[14]*4))},
			effect2(){return this.effect().add(1).root(1.8)},
			effect3(){return this.effect().add(1).root(2.7)},
			currencyInternalName: "plots",
			currencyDisplayName: "plots",
			currencyLayer: "o",
			onPurchase(){
				player.realAB.tickMyBalls=new Decimal(0)
			},
			unlocked(){return player.realAB.points.gte(6)||(hasUpgrade("realAB",13)&&hasMilestone("realAB",0))}
		},
	},
	clickables: {
		11: {
			title: "Disbalance",
			display: "Hold to Reset (totally not stolen from Y🆎oi)",
			canClick() {
				return tmp[this.layer].canReset
			},
			onHold() {
				doReset(this.layer)
			},
			style() {return {"border-radius":"0px 33% 33% 0px","border":"4px solid","border-color":"rgba(0, 0, 0, .125)"}}
		},
		12: {
			title: "Degrade",
			display: "Go back by 1 anti-balancer",
			canClick() {
				return new Decimal(6).sub(player.realAB.buyables[21]).lte(player.realAB.points)
			},
			onClick() {
				doReset(this.layer, true)
				player.realAB.points=player.realAB.points.sub(1)
			},
			onHold() {
				doReset(this.layer, true)
				player.realAB.points=player.realAB.points.sub(1)
			},
			unlocked(){return player.realAB.points.gte(5)||(player.realAB.buyables[21].gte(1)&&hasMilestone("realAB",0))},
			style() {return {"border-radius":"0px 33% 33% 0px","border":"4px solid","border-color":"rgba(0, 0, 0, .125)"}}
		},
	},
	buyables:{
		11: {
			title: "Go back by 1 subtab",
			canAfford() {
				return true
			},
			buy() {
				player.tab="o"
			},
			style(){return{'width':'360px','height':'60px'}}
		},
		12: {
			title: "Anti-Diviser",
			cost() {
				return new Decimal(1).add(player.realAB.buyables[12].div(2)).mul(player.realAB.buyables[12].add(1))
			},
			effect(){return player.realAB.buyables[12].add(1).mul(new Decimal(0.21).mul(player.realAB.challenges[12]+player.realAB.challenges[14]).add(1).root(2))},
			display(){return `<span style="font-size: 12.5px">Multiplies your plot gain<br>Cost: ${formatWhole(this.cost())} anti-balancers<br>Amount: ${formatWhole(player.realAB.buyables[12])}<br>Effect: ${format(this.effect())}x`},
			canAfford() { return player.realAB.points.gte(this.cost()) },
			buy() {
				player.realAB.points = player.realAB.points.sub(this.cost())
				player.realAB.buyables[12]=player.realAB.buyables[12].add(1)
				player.realAB.tickMyBalls=new Decimal(0)
			},
			unlocked(){return player.realAB.points.gte(3)||(player.realAB.buyables[12].gte(1)&&hasMilestone("realAB",0))},
			style(){return{'width':'175px','height':'100px'}}
		},
		13: {
			title: "Plot Sharpener",
			cost() {
				return new Decimal(1).add(player.realAB.buyables[13])
			},
			effect(){return inChallenge("realAB",13)?new Decimal(0):player.realAB.buyables[13].root(hasAchievement("realAB",23)?1:1.5)},
			display(){return `<span style="font-size: 12.5px">Adds up to your plot gain before multiplication<br>Cost: ${formatWhole(this.cost())} plots<br>Amount: ${formatWhole(player.realAB.buyables[13])}<br>Effect: +${format(this.effect())}`},
			canAfford() { return player.o.plots.gte(this.cost())&&player.realAB.buyables[13].lt(new Decimal(12000).add(Decimal.mul(4000, player.realAB.challenges[12]+player.realAB.challenges[14]))) },
			buy() {
				let god = player.o.plots.floor()
				player.o.plots = player.o.plots.sub(hasMilestone("realAB",1)?god.min(new Decimal(12000).add(Decimal.mul(4000, player.realAB.challenges[12]+player.realAB.challenges[14]))):this.cost())
				player.realAB.buyables[13]=hasMilestone("realAB",1)?god.min(new Decimal(12000).add(Decimal.mul(4000, player.realAB.challenges[12]+player.realAB.challenges[14]))):player.realAB.buyables[13].add(1).min(new Decimal(12000).add(Decimal.mul(4000, player.realAB.challenges[12]+player.realAB.challenges[14])))
				player.realAB.tickMyBalls=new Decimal(0)
			},
			unlocked(){return inChallenge("realAB",13)?false:hasAchievement("realAB",22)||(player.realAB.buyables[13].gte(1)&&hasMilestone("realAB",0))},
			style(){return{'width':'175px','height':'100px'}}
		},
		21: {
			title: "Degrader",
			cost() {
				return new Decimal(10).mul(Decimal.pow(2, player.realAB.buyables[21]))
			},
			display(){return `<span style="font-size: 12.5px">Grants the ability to degrade anti-balancers<br>Cost: ${formatWhole(this.cost())} plots in ${layer.realAB.buyables[21].gte(4)?"NG-69":player.realAB.buyables[21].gte(3)?"NG-7":"NG-5"} or above<br>Amount: ${formatWhole(player.realAB.buyables[21])}<br>Limit: Down to ${formatWhole(new Decimal(5).sub(player.realAB.buyables[21]))} anti-balancers`},
			canAfford() { return player.o.plots.gte(this.cost())&&player.realAB.points.gte(player.realAB.buyables[21].gte(4)?69:player.realAB.buyables[21].gte(3)?7:5) },
			buy() {
				player.o.plots = player.o.plots.sub(this.cost())
				player.realAB.buyables[21]=player.realAB.buyables[21].add(1)
				player.realAB.tickMyBalls=new Decimal(0)
			},
			unlocked(){return player.realAB.points.gte(5)||(player.realAB.buyables[21].gte(1)&&hasMilestone("realAB",0))},
			style() {return {"border-radius":"25% 0px 0px 25%","border":"4px solid","border-color":"rgba(0, 0, 0, .125)",'height':'120px','width':'180px'}}
		},
	},
	update(diff){
		if(player.realAB.points.gte(1))player.o.plots=player.o.plots.add(canHeGeneratePlottho().mul(diff)).min(player.realAB.tickMyBalls.gte(10)?hasAchievement("realAB",43)?Infinity:player.o.plots.add(canHeGeneratePlottho().sqrt().mul(hasUpgrade("pp",12)?60:1).sub(10).max(0)).add(10):player.o.plots.add(1))
			player.realAB.tickMyBalls=player.realAB.tickMyBalls.add(1)
	},
	challenges:{
		11: {
			name: "Useless Upgrades",
			effect(){return Decimal.pow(0.85, player.realAB.challenges[11]).div(Decimal.pow(2.35, new Decimal(6).sub(player.realAB.points).max(0)))},
			effect2(){return new Decimal(1).add(player.realAB.challenges[11]).pow(player.realAB.challenges[11]+1).add(new Decimal(6).sub(player.realAB.points).max(0).mul(1+player.realAB.challenges[11]).pow(2+player.realAB.challenges[11])).pow(new Decimal(6).sub(player.realAB.points).div(10).add(1).max(1))},
			challengeDescription(){return "Upgrades's effects are nullified and your plot gain is divided by /"+format(this.effect2())+" and raised to the power of ^"+format(this.effect())+" (or rooted at <1 plots/sec) based on completions and current anti-balancers<br>You've beaten this challenge "+formatWhole(player.realAB.challenges[11])+" times"},
			canComplete: function() {return player.o.plots.gte(10)},
			goalDescription: "10 plots",
			rewardDescription(){return `Anti-Anti Measurement's base is x${formatWhole(player.realAB.challenges[11]+player.realAB.challenges[14]+1)} stronger and 2nd upgrade is +${format(new Decimal(0.9001).mul(player.realAB.challenges[11]+player.realAB.challenges[14]))} better`},
			unlocked(){return player.realAB.points.gte(6)||(player.realAB.challenges[11]>=1&&hasMilestone("realAB",0)) || true},
			onEnter() {
				player.o.plots=new Decimal(0)
				player.realAB.tickMyBalls=new Decimal(0)
			},
			completionLimit(){return Infinity},
		},
		12: {
			name: "Broken Buyables",
			effect(){return Decimal.pow(0.85, player.realAB.challenges[12]).div(Decimal.pow(2.35, new Decimal(6).sub(player.realAB.points).max(0)))},
			effect2(){return new Decimal(1).add(player.realAB.challenges[12]).pow(player.realAB.challenges[12]+1).add(new Decimal(6).sub(player.realAB.points).max(0).mul(1+player.realAB.challenges[12]).pow(2+player.realAB.challenges[12])).pow(new Decimal(6).sub(player.realAB.points).div(10).add(1).max(1))},
			challengeDescription(){return "Buyables's effects are nullified and your plot gain is divided by /"+format(this.effect2())+" and raised to the power of ^"+format(this.effect())+" (or rooted at <1 plots/sec) based on completions and current anti-balancers<br>You've beaten this challenge "+formatWhole(player.realAB.challenges[12])+" times"},
			canComplete: function() {return player.o.plots.gte(10)},
			goalDescription: "10 plots",
			rewardDescription(){return `Anti-Diviser is ${format(new Decimal(0.21).mul(player.realAB.challenges[12]+player.realAB.challenges[14]).add(1).root(2))}x stronger and Plot Sharpener's hardcap is increased by +${formatWhole(new Decimal(4000).mul(player.realAB.challenges[12]+player.realAB.challenges[14]))}`},
			unlocked(){return player.realAB.points.gte(6)||(player.realAB.challenges[12]>=1&&hasMilestone("realAB",0))},
			onEnter() {
				player.o.plots=new Decimal(0)
				player.realAB.tickMyBalls=new Decimal(0)
			},
			completionLimit(){return Infinity},
		},
		13: {
			name: "Abandoned Achievements",
			effect(){return Decimal.pow(0.85, player.realAB.challenges[13]).div(Decimal.pow(2.35, new Decimal(6).sub(player.realAB.points).max(0)))},
			effect2(){return new Decimal(1).add(player.realAB.challenges[13]).pow(player.realAB.challenges[13]+1).add(new Decimal(6).sub(player.realAB.points).max(0).mul(1+player.realAB.challenges[13]).pow(2+player.realAB.challenges[13])).pow(new Decimal(6).sub(player.realAB.points).div(10).add(1).max(1))},
			challengeDescription(){return "Achievements do nothing and your plot gain is divided by /"+format(this.effect2())+" and raised to the power of ^"+format(this.effect())+" (or rooted at <1 plots/sec) based on completions and current anti-balancers<br>You've beaten this challenge "+formatWhole(player.realAB.challenges[13])+" times"},
			canComplete: function() {return player.o.plots.gte(10)},
			goalDescription: "10 plots",
			rewardDescription(){return `Each completion counts towards 8th achievement`},
			unlocked(){return player.realAB.points.gte(6)||(player.realAB.challenges[13]>=1&&hasMilestone("realAB",0))},
			onEnter() {
				player.o.plots=new Decimal(0)
				player.realAB.tickMyBalls=new Decimal(0)
			},
			completionLimit(){return Infinity},
		},
		14: {
			name: "Abandoned Achievements",
			countsAs: [11,12,13],
			effect(){return Decimal.pow(0.85, player.realAB.challenges[14]).div(Decimal.pow(2.35, new Decimal(9).sub(player.realAB.points).max(0)))},
			effect2(){return new Decimal(1).add(player.realAB.challenges[14]).pow(player.realAB.challenges[14]+1).add(new Decimal(6).sub(player.realAB.points).max(0).mul(1+player.realAB.challenges[14]).pow(2+player.realAB.challenges[14])).pow(new Decimal(9).sub(player.realAB.points).div(10).add(1).max(1))},
			challengeDescription(){return "Apply all three challenges at once and your plot gain is divided by /"+format(this.effect2())+" and raised to the power of ^"+format(this.effect())+" (or rooted at <1 plots/sec) based on completions and current anti-balancers<br>You've beaten this challenge "+formatWhole(player.realAB.challenges[14])+" times"},
			canComplete: function() {return player.o.plots.gte(10)},
			goalDescription: "10 plots",
			rewardDescription(){return `Each completion contributes to other challenges's completions`},
			unlocked(){return player.realAB.points.gte(9)||(player.realAB.challenges[14]>=1&&hasMilestone("realAB",0))},
			onEnter() {
				player.o.plots=new Decimal(0)
				player.realAB.tickMyBalls=new Decimal(0)
			},
			completionLimit(){return Infinity},
		},
	},
	row: 0,
	position: 1,
	symbol: "<p style='transform: scale(-1, -1)'>AB",
	resource: "anit-balancers",
    baseResource(){return player.realAB.points.gte(1)?"plots":options.why?"points/sec":"negative points/sec"},
    baseAmount() {return player.realAB.points.gte(1)?player.o.plots:options.why?getPointGen():getBypassedPointGen().mul(-1)},
	requires(){return new Decimal(player.realAB.points.gte(1)?new Decimal(5).mul(player.realAB.points):"1.5e46")},
	type: "static",
	effectDescription(){return `multiplying your ToTs gain by ${format(player.realAB.points.add(1).pow(2))}x`},
    exponent: 0, 
	color(){return "#006080"},
	layerShown(){return true},
	NG(){return ["You produce 1 plot per second.<br>-Unlocks achievements","Plot gain is divided by current amount of plot<br>-Unlocks one upgrade","Plot gain is raised to the power of 0.85 above 1/sec and 1.15 below 1/sec<br>-Unlocks Anti-Diviser","NG-'s nerf is raised to the power of 3<br>-Unlocks milestones and another upgrade",`NG----'s effect raises to the amount of anti-balancers instead of 3<br>-Unlocks new buyable<br>-Achievements boost your plot gain by ${format(Decimal.add(player.realAB.achievements.length,1).root(1.69))}x`,`Plot gain is divided by (2^anti-balancers)<br>-Unlocks three challenges<br>-Unlocks yet another upgrade`,`NG---'s nerf is stronger based on anti-balancers (-0.085, caps at -0.849/x1.15)`,`Plot gain is divided by 60`,`There are no new nerfs, good luck<br>-Unlocks 4th challenge`,`THOUGHT YOU WERE SAFE, HUH?!<br>-NG--'s nerf is increased to the power of plots+1`]},
	NGFeatures: ["Plot production and Achievement","Upgrade","Buyable","Milestone","Anti-Prestige Button...?","Challenge","N/A"],
	NGG(){
		let fuckOFF = ""
		for(i=0;i<player.realAB.points;i++){
			fuckOFF=fuckOFF+"[NG"+"-".repeat(i+1)+"]<br>-"+tmp.realAB.NG[i]+"<br><br>"
		}
		return fuckOFF
	},
	milestones:{
		0:{
			requirementDescription: "4 anti-balancers",
			effectDescription: "Keeps all features regardless of NG-X<br><span style='font-size: 10px'>(so long as you bought/purchased/gotten them first)",
			done(){return player.realAB.points.gte(4)},
			unlocked(){return hasMilestone("realAB",0)}
		},
		1:{
			requirementDescription: "5 anti-balancers",
			effectDescription: "You can buy max Plot Sharpener",
			done(){return player.realAB.points.gte(5)},
			unlocked(){return hasMilestone("realAB",0)}
		},
		2:{
			requirementDescription: "6 anti-balancers",
			effectDescription: "7th Layer upgrade uses much better formula<br><span style='font-size: 10px'>(perhaps a little bit too good)",
			done(){return player.realAB.points.gte(6)},
			unlocked(){return hasMilestone("realAB",1)}
		},
		3:{
			requirementDescription: "7 anti-balancers",
			effectDescription: "Unlock a new lay... wait<br>A new layer? Before Shen-<br><br><h2>FUCKING WHAT",
			done(){return player.realAB.points.gte(7)},
			unlocked(){return hasMilestone("realAB",2)}
		},
		4:{
			requirementDescription: "8 anti-balancers",
			effectDescription: "Anti-balancer's effect multiplies practically pointless point gain",
			done(){return player.realAB.points.gte(8)},
			unlocked(){return hasMilestone("realAB",3)}
		},
		5:{
			requirementDescription: "9 anti-balancers",
			effectDescription: "Milestones multiply your plot gain",
			done(){return player.realAB.points.gte(9)},
			unlocked(){return hasMilestone("realAB",4)}
		},
	},
	canReset(){return player.realAB.points.gte(1)?player.o.plots.gte(new Decimal(10).mul(player.realAB.points))&&!player.realAB.points.eq(10):(options.why?getPointGen():getBypassedPointGen().mul(-1)).gte("3e46")},
	tabFormat:{
		"Main":{
			content: [["buyable", 11],"blank","main-display",["row", ["prestige-button", ["clickable", 11],"blank","blank",["buyable", 21],["clickable", 12]]],"resource-display","milestones","blank",["row",[["buyable",12],"blank",["buyable",13]]],"blank","upgrades","challenges"],
			unlocked(){return true}
		},
		"NG-X":{
			content: [["buyable", 11],"blank",["display-text", function(){return "<h3>Current Mode: NG"+"-".repeat(player.realAB.points)+"<br><br> Next Mode: NG"+("-".repeat(player.realAB.points.add(1)))+"<br><br>Next Feature: "+tmp.realAB.NGFeatures[player.realAB.points.min(6)]+"<br><br>"+tmp.realAB.NGG}]],
			unlocked(){return true}
		},
		"Achievements":{
			content: [["buyable", 11],"blank",["display-text", function(){return "Sorry, bud.<br>There is no Achievements layer in this tree."}],"blank","achievements"],
			unlocked(){return hasAchievement("realAB", 11)}
		}
	},
	doReset(resettingLayer){
		if(player.realAB.points.gte(1)){
			player.o.plots = new Decimal(0)
			player.realAB.tickMyBalls = new Decimal(0)
		}
		if(tmp[resettingLayer].id=="ab"){
			layerDataReset("realAB")
		}
	}
})

addLayer("pp", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		best: new Decimal(0),
		points: new Decimal(0),
		time: new Decimal(0),
    }},
	effect(){
		let effect = hasUpgrade("pp",15)?player.pp.points.add(1):new Decimal(1)
		if(hasUpgrade("pp",15)&&!hasUpgrade("pp",25)) effect=effect.log(10)
		if(hasUpgrade("pp",25)) effect=effect.root(2)
		return effect
	},
	effectDescription(){return `boosting plot gain by ${format(this.effect())}x`},
	symbol: "<p style='transform: scale(-1, -1)'>PP",
	clickables: {
		11: {
			title: "Prestige",
			display: "Hold to Reset (totally not stolen from Y🆎oi)",
			canClick() {
				return tmp[this.layer].canReset
			},
			onHold() {
				doReset(this.layer)
			},
			style() {return {"border-radius":"0px 33% 33% 0px","border":"4px solid","border-color":"rgba(0, 0, 0, .125)"}}
		}
	},
	upgrades:{
		11:{
			title: "Polygrowth",
			description: "You gain 1% of best PP and you gain 2x more PP per bought upgrade",
			cost: new Decimal(1000),
			unlocked(){return !hasUpgrade("pp",25)}
		},
		12:{
			title: "Plot Armor",
			description: "Plot hardcap is 60x higher after root effect",
			cost: new Decimal(4000),
		},
		13:{
			title: "Plagiarism",
			description: "Unlocks four buyables",
			cost: new Decimal(64000),
			unlocked(){return !hasUpgrade("pp",25)}
		},
		14:{
			title: "Problem",
			description: "NO EFFECTS?",
			cost: new Decimal(4096000),
			unlocked(){return !hasUpgrade("pp",25)}
		},
		15:{
			title: "Premium",
			description: "PP has effect, but you lose your progress and buyables are nerfed.<br>Unlocks 2nd row of upgrades",
			onPurchase(){
				player.pp.buyables[11]=new Decimal(0)
				player.pp.buyables[12]=new Decimal(0)
				player.pp.buyables[13]=new Decimal(0)
				player.pp.buyables[14]=new Decimal(0)
				player.pp.points=new Decimal(0)
				player.pp.best=new Decimal(0)
			},
			cost: new Decimal("1.78e308")
		},
		21:{
			title: "Polygrowth",
			description: "Each upgrade increases Polygrowth's first effect by +1%",
			cost: new Decimal(4000000),
			unlocked(){return hasUpgrade("pp",15)&&!hasUpgrade("pp",25)}
		},
		22:{
			title: "Polygrowth",
			description: "Polygrowth's second effect is 60x stronger",
			cost: new Decimal(1024000000),
			unlocked(){return hasUpgrade("pp",15)&&!hasUpgrade("pp",25)}
		},
		23:{
			title: "Pain",
			description: "Buyables are getting stronger based on time passed ever since you bought this upgrade",
			cost(){return new Decimal(4).pow(30).mul(1000000)},
			unlocked(){return hasUpgrade("pp",15)&&!hasUpgrade("pp",25)}
		},
		24:{
			title: "Purgatory",
			description: "Challenge Reversal affects practically pointless's gain, plots accelerate Pain's effect and buyables become auto-free",
			cost(){return new Decimal(4).pow(52).mul(1000000)},
			unlocked(){return hasUpgrade("pp",15)&&!hasUpgrade("pp",25)}
		},
		25:{
			title: "Perish",
			description: "PP's effect uses much better formula, but you lose access to most PP upgrades and you lose your progress, again",
			onPurchase(){
				player.pp.buyables[11]=new Decimal(0)
				player.pp.buyables[12]=new Decimal(0)
				player.pp.buyables[13]=new Decimal(0)
				player.pp.buyables[14]=new Decimal(0)
				player.pp.points=new Decimal(0)
				player.pp.best=new Decimal(0)
				player.pp.upgrades=[12,15,25]
			},
			cost: new Decimal("1.78e308"),
			unlocked(){return hasUpgrade("pp",15)}
		},
		26:{
			title: "Pentashot",
			description: "Multiply your plot gain by 5",
			cost(){return new Decimal("1e10")},
			unlocked(){return hasUpgrade("pp",25)}
		}
	},
	buyables:{
		00: {
			title: "Go back by 1 subtab",
			canAfford() {
				return true
			},
			buy() {
				player.tab="o"
			},
			style(){return{'width':'360px','height':'60px'}}
		},
		11: {
			title: "Doubler",
			cost() { return new Decimal(100000).mul(Decimal.pow(4,player.pp.buyables[11])) },
			effect() {
				let effect = Decimal.pow(new Decimal(2).mul(player.pp.time.add(1).pow(player.pp.time.add(1))),player.pp.buyables[11])
				if(hasUpgrade("pp",15)) effect = effect.log(10).add(1)
				return effect
			},
			display() { return "Cost: "+format(this.cost())+" PPs<br>Amount: "+formatWhole(player.pp.buyables[11])+"<br>Boosts PP gain by "+format(this.effect())+"x" },
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			buy() {
				if(!hasUpgrade("pp",24)) player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			style(){return{'height':'180px','width':'120px'}},
			unlocked(){return hasUpgrade("pp",13)}
		},
		12: {
			title: "Tripler",
			cost() { return new Decimal(1000000).mul(Decimal.pow(9,player.pp.buyables[12])) },
			effect() {
				let effect = Decimal.pow(new Decimal(3).mul(player.pp.time.add(1).pow(player.pp.time.add(1))),player.pp.buyables[12])
				if(hasUpgrade("pp",15)) effect = effect.log(10).add(1)
				return effect
			},
			display() { return "Cost: "+format(this.cost())+" PPs<br>Amount: "+formatWhole(player.pp.buyables[12])+"<br>Boosts PP gain by "+format(this.effect())+"x" },
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			buy() {
				if(!hasUpgrade("pp",24)) player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			style(){return{'height':'180px','width':'120px'}},
			unlocked(){return hasUpgrade("pp",13)}
		},
		13: {
			title: "Quadrupler",
			cost() { return new Decimal(10000000).mul(Decimal.pow(16,player.pp.buyables[13])) },
			effect() {
				let effect = Decimal.pow(new Decimal(4).mul(player.pp.time.add(1).pow(player.pp.time.add(1))),player.pp.buyables[13])
				if(hasUpgrade("pp",15)) effect = effect.log(10).add(1)
				return effect
			},
			display() { return "Cost: "+format(this.cost())+" PPs<br>Amount: "+formatWhole(player.pp.buyables[13])+"<br>Boosts PP gain by "+format(this.effect())+"x" },
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			buy() {
				if(!hasUpgrade("pp",24)) player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			style(){return{'height':'180px','width':'120px'}},
			unlocked(){return hasUpgrade("pp",13)}
		},
		14: {
			title: "Quintupler",
			cost() { return new Decimal(100000000).mul(Decimal.pow(25,player.pp.buyables[14])) },
			effect() {
				let effect = Decimal.pow(new Decimal(5).mul(player.pp.time.add(1).pow(player.pp.time.add(1))),player.pp.buyables[14])
				if(hasUpgrade("pp",15)) effect = effect.log(10).add(1)
				return effect
			},
			display() { return "Cost: "+format(this.cost())+" PPs<br>Amount: "+formatWhole(player.pp.buyables[14])+"<br>Boosts PP gain by "+format(this.effect())+"x" },
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			buy() {
				if(!hasUpgrade("pp",24)) player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			style(){return{'height':'180px','width':'120px'}},
			unlocked(){return hasUpgrade("pp",13)}
		},
	},
	update(diff){
		if(hasUpgrade("pp",11)){
			player.pp.points = player.pp.points.add(player.pp.best.mul(hasUpgrade("pp",21)?new Decimal(0.01).add(player.pp.upgrades.length*0.01):0.01).mul(diff))
			player.pp.best = player.pp.best.max(player.pp.points)
		}
		if(hasUpgrade("pp",23)) player.pp.time = player.pp.time.add(new Decimal(diff).mul(hasUpgrade("pp",24)?player.o.plots.add(1):1))
		if(hasUpgrade("pp",24)){
			for(i=1;i<5;i++){
				if(tmp.pp.buyables[10+i].canAfford) player.pp.buyables[10+i]=player.pp.buyables[10+i].add(1)
			}
		}
	},
	tabFormat: [["buyable",00],"blank","main-display",["row", ["prestige-button", ["clickable", 11]]],"resource-display","blank","upgrades","buyables"],
    color: "#b423ec",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "practically pointless points", // Name of prestige currency
    baseResource(){return "plots"}, // Name of resource prestige is based on
    baseAmount() {return player.o.plots}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
		if(hasUpgrade("pp",11)) mult = mult.mul(Decimal.pow((hasUpgrade("pp",22)?60:2),player.pp.upgrades.length))
		if(hasUpgrade("pp",13)) mult = mult.mul(tmp.pp.buyables[11].effect).mul(tmp.pp.buyables[12].effect).mul(tmp.pp.buyables[13].effect).mul(tmp.pp.buyables[14].effect)
		if(hasMilestone("realAB",4)) mult = mult.mul(player.realAB.points.add(1).pow(2))
		if(hasUpgrade("pp",24)) mult = mult.add(tmp.realAB.upgrades[13].effect).mul(tmp.realAB.upgrades[13].effect2).pow(tmp.realAB.upgrades[13].effect3)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
	doReset(resettingLayer){
		if(player.realAB.points.gte(1)){
			player.o.plots = new Decimal(0)
			player.realAB.tickMyBalls = new Decimal(0)
		}
		if(tmp[resettingLayer].id=="ab"){
			layerDataReset("pp")
		}
	},
	branches: ["realAB"],
    layerShown(){return hasMilestone("realAB",3)},
})

addLayer("realS",{
	startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),
    }},
	clickables: {
		11: {
			title: "Generate",
			display: "Hold to Reset (totally not stolen from Y🆎oi)",
			canClick() {
				return tmp[this.layer].canReset
			},
			onHold() {
				doReset(this.layer)
			},
			style() {return {"border-radius":"0px 33% 33% 0px","border":"4px solid","border-color":"rgba(0, 0, 0, .125)"}}
		}
	},
	row: 0,
	symbol: "<p style='transform: scale(-1, -1)'>S",
	resource: "shenanigans",
    baseResource: "anti-balancers",
    baseAmount() { return player.realAB.points },
	requires(){return new Decimal(999)},
	type: "static",
	exponent: 0.5,
	tooltipLocked: "also WIP",
	base: 0.5,
	color(){return "#791C29"},
	layerShown(){return true},
	branches: [["realAB",2]],
	tabFormat:["main-display",["row", ["prestige-button", ["clickable", 11]]],"resource-display"]
})

addLayer("realC",{
	startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),
    }},
	clickables: {
		11: {
			title: "WIP",
			display: "Hold to Reset (totally not stolen from Y🆎oi)",
			canClick() {
				return tmp[this.layer].canReset
			},
			onHold() {
				doReset(this.layer)
			},
			style() {return {"border-radius":"0px 33% 33% 0px","border":"4px solid","border-color":"rgba(0, 0, 0, .125)"}}
		}
	},
	row: 0,
	symbol: "<p style='transform: scale(-1, -1)'>C",
	resource: "condensed chaoses",
    baseResource: "points",
    baseAmount() { return player.realS.points },
	requires(){return new Decimal("1e52")},
	type: "normal",
	exponent: 0.5,
	color(){return "rgb(109, 109, 192)"},
	tooltipLocked(){return `WIP`},
	layerShown(){return true},
	branches:["realS", "realT"],
	tabFormat:["main-display",["row", ["prestige-button", ["clickable", 11]]],"resource-display"]
})

addLayer("realT",{
	startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),
    }},
	clickables: {
		11: {
			title: "Generate",
			display: "Hold to Reset (totally not stolen from Y🆎oi)",
			canClick() {
				return tmp[this.layer].canReset
			},
			onHold() {
				doReset(this.layer)
			},
			style() {return {"border-radius":"0px 33% 33% 0px","border":"4px solid","border-color":"rgba(0, 0, 0, .125)"}}
		}
	},
	row: 0,
	symbol: "<p style='transform: scale(-1, -1)'>T",
	resource: "transcendence points",
    baseResource: "points",
    baseAmount() { return player.realS.points },
	requires(){return new Decimal("1e52")},
	type: "normal",
	exponent: 0.5,
	color(){return "rgb(254, 251, 170)"},
	tooltipLocked(){return `WIP`},
	layerShown(){return true},
	branches:["realS", "realC"],
	tabFormat:["main-display",["row", ["prestige-button", ["clickable", 11]]],"resource-display"]
})

addLayer("ng+", {
    name: "newgameplus", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "NG+", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
	tabFormat:[["display-text", function(){return (new Decimal(options.ngplus).gte(1)?`<h1 style='color: lightcyan'>[NG+]<br><h3 style='color: lightcyan'>-Adds 4th upgrade column in all prestige layers<br>-Your point gain is multiplied by ${format(Decimal.add(player.timePlayed,1).root(8.199380194850416))}x based on time played`:"")+(new Decimal(options.ngplus).gte(2)?"<br><br><br><br><h1 style='color: lightcyan'>[NG++]<br><h3 style='color: lightcyan'>-You keep boosters on higher prestige resets":"")+(new Decimal(options.ngplus).gte(3)?`<br><br><br><br><h1 style='color: lightcyan'>[NG+++]<br><h3 style='color: lightcyan'>-Total achievements multiply your point gain by ${formatWhole(player.a.achievements.length+player.c.achievements.length+player.realAB.achievements.length+1)}x`:"")+(new Decimal(options.ngplus).gte(4)?"<br><br><br><br><h1 style='color: lightcyan'>[NG++++]<br><h3 style='color: lightcyan'>-Automatically converts all types of boosters into primordial boosters<br>-Stored boosters count towards requirements":"")+(new Decimal(options.ngplus).gte(5)?"<br><br><br><br><h1 style='color: lightcyan'>[NG+++++]<br><h3 style='color: lightcyan'>-You have 2x more balancing points<br>-You gain an additional balancing point per completed challenges":"")}]],
	tooltip: "",
    color: "#e0ffff",
    row: "side",
	layerShown(){return new Decimal(options.ngplus).gte(1)}
})
