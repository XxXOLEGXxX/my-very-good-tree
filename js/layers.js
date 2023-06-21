addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
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
	branches: ["st", "o"],
    layerShown(){return true},
	upgrades: {
		11: {
			description: "Blah",
			cost(){let cost = new Decimal(1)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.p.upgrades.length))
				   return cost
			}
		},
		12: {
			description: "Blah",
			cost(){let cost = new Decimal(1)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.p.upgrades.length))
				   return cost
			}
		},
		13: {
			description: "Blah",
			cost(){let cost = new Decimal(1)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.p.upgrades.length))
				   return cost
			}
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
			description: "Blah",
			cost(){let cost = new Decimal(1)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.kp.upgrades.length))
				   return cost
			}
		},
		12: {
			description: "Blah",
			cost(){let cost = new Decimal(1)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.kp.upgrades.length))
				   return cost
			}
		},
		13: {
			description: "Blah",
			cost(){let cost = new Decimal(1)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.kp.upgrades.length))
				   return cost
			}
		},
		21: {
			description: "Blah",
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1024).div(upgradeRow("p", 1, true).add(upgradeRow("kp", 2, true)).add(upgradeRow("mp", 3, true)).add(upgradeRow("gp", 4, true)).add(1)).max(1):new Decimal(1024)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.kp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "prestige points",
			currencyLayer: "p",
		},
		22: {
			description: "Blah",
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1024).div(upgradeRow("p", 1, true).add(upgradeRow("kp", 2, true)).add(upgradeRow("mp", 3, true)).add(upgradeRow("gp", 4, true)).add(1)).max(1):new Decimal(1024)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.kp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "prestige points",
			currencyLayer: "p",
		},
		23: {
			description: "Blah",
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1024).div(upgradeRow("p", 1, true).add(upgradeRow("kp", 2, true)).add(upgradeRow("mp", 3, true)).add(upgradeRow("gp", 4, true)).add(1)).max(1):new Decimal(1024)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.kp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "prestige points",
			currencyLayer: "p",
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
})

addLayer("mp", {
    name: "megaprestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "MP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
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
			description: "Blah",
			cost(){let cost = new Decimal(1)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.mp.upgrades.length))
				   return cost
			}
		},
		12: {
			description: "Blah",
			cost(){let cost = new Decimal(1)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.mp.upgrades.length))
				   return cost
			}
		},
		13: {
			description: "Blah",
			cost(){let cost = new Decimal(1)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.mp.upgrades.length))
				   return cost
			}
		},
		21: {
			description: "Blah",
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1024).div(upgradeRow("kp", 1, true).add(upgradeRow("mp", 2, true)).add(upgradeRow("gp", 3, true)).add(1)).max(1):new Decimal(1024)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.mp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "kilo prestige points",
			currencyLayer: "kp",
		},
		22: {
			description: "Blah",
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1024).div(upgradeRow("kp", 1, true).add(upgradeRow("mp", 2, true)).add(upgradeRow("gp", 3, true)).add(1)).max(1):new Decimal(1024)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.mp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "kilo prestige points",
			currencyLayer: "kp",
		},
		23: {
			description: "Blah",
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1024).div(upgradeRow("kp", 1, true).add(upgradeRow("mp", 2, true)).add(upgradeRow("gp", 3, true)).add(1)).max(1):new Decimal(1024)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.mp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "kilo prestige points",
			currencyLayer: "kp",
		},
		31: {
			description: "Blah",
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1048576).div(upgradeRow("p", 1, true).add(upgradeRow("kp", 2, true)).add(upgradeRow("mp", 3, true)).add(upgradeRow("gp", 4, true)).add(1)).max(1):new Decimal(1048576)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.mp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "prestige points",
			currencyLayer: "p",
		},
		32: {
			description: "Blah",
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1048576).div(upgradeRow("p", 1, true).add(upgradeRow("kp", 2, true)).add(upgradeRow("mp", 3, true)).add(upgradeRow("gp", 4, true)).add(1)).max(1):new Decimal(1048576)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.mp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "prestige points",
			currencyLayer: "p",
		},
		33: {
			description: "Blah",
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1048576).div(upgradeRow("p", 1, true).add(upgradeRow("kp", 2, true)).add(upgradeRow("mp", 3, true)).add(upgradeRow("gp", 4, true)).add(1)).max(1):new Decimal(1048576)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.mp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "prestige points",
			currencyLayer: "p",
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
})

addLayer("gp", {
    name: "gigaprestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "GP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
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
			description: "Blah",
			cost(){let cost = new Decimal(1)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.gp.upgrades.length))
				   return cost
			}
		},
		12: {
			description: "Blah",
			cost(){let cost = new Decimal(1)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.gp.upgrades.length))
				   return cost
			}
		},
		13: {
			description: "Blah",
			cost(){let cost = new Decimal(1)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.gp.upgrades.length))
				   return cost
			}
		},
		21: {
			description: "Blah",
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1024).div(upgradeRow("mp", 1, true).add(upgradeRow("gp", 2, true)).add(1)).max(1):new Decimal(1024)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.gp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "mega prestige points",
			currencyLayer: "mp",
		},
		22: {
			description: "Blah",
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1024).div(upgradeRow("mp", 1, true).add(upgradeRow("gp", 2, true)).add(1)).max(1):new Decimal(1024)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.gp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "mega prestige points",
			currencyLayer: "mp",
		},
		23: {
			description: "Blah",
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1024).div(upgradeRow("mp", 1, true).add(upgradeRow("gp", 2, true)).add(1)).max(1):new Decimal(1024)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.gp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "mega prestige points",
			currencyLayer: "mp",
		},
		31: {
			description: "Blah",
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1048576).div(upgradeRow("kp", 1, true).add(upgradeRow("mp", 2, true)).add(upgradeRow("gp", 3, true)).add(1)).max(1):new Decimal(1048576)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.gp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "kilo prestige points",
			currencyLayer: "kp",
		},
		32: {
			description: "Blah",
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1048576).div(upgradeRow("kp", 1, true).add(upgradeRow("mp", 2, true)).add(upgradeRow("gp", 3, true)).add(1)).max(1):new Decimal(1048576)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.gp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "kilo prestige points",
			currencyLayer: "kp",
		},
		33: {
			description: "Blah",
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1048576).div(upgradeRow("kp", 1, true).add(upgradeRow("mp", 2, true)).add(upgradeRow("gp", 3, true)).add(1)).max(1):new Decimal(1048576)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.gp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "kilo prestige points",
			currencyLayer: "kp",
		},
		41: {
			description: "Blah",
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1073741824).div(upgradeRow("p", 1, true).add(upgradeRow("kp", 2, true)).add(upgradeRow("mp", 3, true)).add(upgradeRow("gp", 4, true)).add(1)).max(1):new Decimal(1073741824)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.gp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "prestige points",
			currencyLayer: "p",
		},
		42: {
			description: "Blah",
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1073741824).div(upgradeRow("p", 1, true).add(upgradeRow("kp", 2, true)).add(upgradeRow("mp", 3, true)).add(upgradeRow("gp", 4, true)).add(1)).max(1):new Decimal(1073741824)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.gp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "prestige points",
			currencyLayer: "p",
		},
		43: {
			description: "Blah",
			cost(){let cost = (hasAchievement("a", 25))?new Decimal(1073741824).div(upgradeRow("p", 1, true).add(upgradeRow("kp", 2, true)).add(upgradeRow("mp", 3, true)).add(upgradeRow("gp", 4, true)).add(1)).max(1):new Decimal(1073741824)
				   if(player.ab.points.gte(4)) cost = cost.times(new Decimal(1.666).pow(player.gp.upgrades.length))
				   return cost
			},
			currencyInternalName: "points",
			currencyDisplayName: "prestige points",
			currencyLayer: "p",
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
    }},
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
		if(player.ab.points.gte(0)) modInfo.name = "Oleg's Terrible Idea: The Tree"
		if(player.ab.points.gte(1)) modInfo.name = "Oleg's Very Terrible Idea: The Tree"
		if(player.ab.points.gte(2)) modInfo.name = "Oleg's Very Very Terrible Idea: The Tree"
		if(player.ab.points.gte(3)) modInfo.name = "Oleg's Very Very Very Terrible Idea: The Tree"
		if(player.ab.points.gte(4)) modInfo.name = "Oleg's Very Very Very Very Terrible Idea: The Tree"
		if(player.ab.points.gte(5)) modInfo.name = "Oleg's Very Very Very Very Very Terrible Idea: The Tree"
		if(player.gp.points.gte("5e85")) player.ab.help = player.ab.help.mul(Decimal.add(diff, 1)).mul(player.ab.help.root(42))
		if(player.ab.points.gte(3)&&player.points.gte(0)&&!player.ab.points.gte(5)) player.points = player.points.sub(Decimal.mul(player.points, diff).div(20))
		if(player.ab.points.gte(5)&&player.points.gte(0)&&getPointGen().gt(0)) player.points = player.points.sub(Decimal.mul(player.points, diff).div(10))
		player.ab.shopPoints = new Decimal(player.ab.points).add(hasUpgrade("t", 14)?1:0).sub(player.ab.spentPoints)
		if(player.ab.points.gte(4)) tmp.ab.color = (new Decimal(Math.random()).gte(0.25))?"darkred":"purple"
	},
	tooltipLocked(){return "Reach 10 giga prestige points to unlock (You have "+formatWhole(player.gp.points)+" giga prestige points)"},
	tabFormat: {
		"MiaN sTUFF": {
			content: ["main-display", "prestige-button", "blank", ["display-text", function() {return (player.ab.points>=4?"<span style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>":"")+"Current Mode: "+getMode()+"<br><br>"+(player.ab.points.lt(6)?"Next Mode: "+getMode()+"-":"")}], "blank",
					 ["display-text", function() {return (player.ab.points>=5?"<span style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>[NG-----]<br>-Point Gain is reversed<br>-Prestige layer requirement has been changed<br>-You start over with 17.77 points instead<br>-You lose 5% more points per second<br>-Additional Balancer is nerfed and doesn't work at negative points<br>-Unlocks Hall of Fame<br>":"")+(player.ab.points>=4?"<span style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>[NG----]<br>-Balancers nerf each other<br>-NG- is applied twice.<br>-Upgrades scale each other based on bought upgrades in each layer.<br>":"")+(player.ab.points>=3?"[NG---]<br>-No more de noido. Ever. Peroid. I don't want to hear anything related to that yellow bastard coming out of YOUR MOUTH. I'll personally find your IP address and hit you with a fucking skateboard if I ever sense the very CONCEPT of it within your smooth, loose brain, since you think this is so funny to you...<br>-You gain 25% less of all prestige points<br>-You lose 5% of points every second<br>":"")+(player.ab.points>=2?"[NG--]<br>-Every reset brings you back to -10 points<br>-Booster's exponent cost is 20% bigger<br>":"")+(player.ab.points>=1?"[NG-]<br>-Divides point gain by 4":"")}]],
			unlocked(){return hasAchievement("a", 31)}
		},
		"Shop": {
			content: ["main-display", ["display-text", function() {return (player.ab.points>=4?"<span style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>":"")+"You have "+formatWhole(player.ab.shopPoints)+" balancing points to spend."}], "blank", "buyables"],
			unlocked(){return hasAchievement("a", 31)}
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
						return eff.pow(tmp.t.effectMonth).pow(hasMilestone("m", 5)?1.17:1)},
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
						return eff.pow(tmp.t.effectMonth).pow(hasMilestone("m", 5)?1.17:1)},
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
						return eff.pow(tmp.t.effectMonth).pow(hasMilestone("m", 5)?1.17:1)},
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
						if(player.ab.points.gte(4)) eff = eff.max(1).log(new Decimal(player.ab.buyables[11]).add(player.ab.buyables[12]).add(player.ab.buyables[13]).add(2))
						return eff.div(100).add(1).pow(tmp.t.effectMonth).pow(hasMilestone("m", 5)?1.17:1)},
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
			done() { return player.ab.points.gte(3) && (!hasAchievement("a", 34) || !hasAchievement("a", 35)) },
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
		}
	},
})

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
	},
	tabFormat: ["main-display", "prestige-button", "resource-display", ["display-text", function() {return 'You have stored '+formatWhole(player.pb.boosters)+' boosters, boosting your point gain by x'+format(Decimal.pow(tmp.b.baseEffect, player.pb.boosters))+'<br>'+(hasAchievement("a", 31)?'You have stored '+formatWhole(player.pb.kiloboosters)+' kilo boosters, boosting your point gain by x'+format(Decimal.pow(tmp.kb.baseEffect, player.pb.kiloboosters))+'<br>':'')+(hasAchievement("a", 42)?'You have stored '+formatWhole(player.pb.megaboosters)+' mega boosters, boosting your point gain by x'+format(Decimal.pow(tmp.mb.baseEffect, player.pb.megaboosters))+'<br>':'')+'<br>'}], "buyables", ["display-text", function() {return '<br>"What da hell are Primordial Boosters?"<br><br><span style="color: '+(player.ab.points.gte(4)?'darkred':'red')+'; font-size: 1em; text-shadow: '+(player.ab.points.gte(4)?"purple":"red")+' '+(player.ab.points.gte(4)?player.a.X2:player.a.X)+'px '+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+'px '+(player.ab.points.gte(4)?player.a.S2:player.a.S)+'px;">Primordial Boosters are boosters that are preserved throughout all resets. (excluding mine, obviously)<br>There is just one BUT - Boosters do not get cheaper, so you better grind things up before deciding to throw all of your progress out of the window for nothing.<span/>'}]],
    row: 7, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "B", unlocked() {return hasAchievement("a", 24)}, description: "Shift+B: Reset for primordial boosters", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasAchievement("a", 24)},
	branches: ["b", "kb", "mb", "gb"],
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
			style(){return{'height':'100px', 'width':'200px'}},
			unlocked(){return hasAchievement("a", 54)}
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
    color: "yellow",
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
	tabFormat: ["main-display", "prestige-button", "resource-display", ["display-text", function() {return '<span style="color: '+(player.ab.points.gte(4)?'darkred':'red')+'; font-size: 1em; text-shadow: '+(player.ab.points.gte(4)?'purple':'red')+' '+(player.ab.points.gte(4)?player.a.X2:player.a.X)+'px '+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+'px '+(player.ab.points.gte(4)?player.a.S2:player.a.S)+'px;">i have no idea how did that happen, i swear'}],
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
		player.g.power = player.g.power.add(tmp.g.effect.mul(diff).mul(tmp.kbg.effect))
		if(hasAchievement("a", 46)){
			player.g.timer = player.g.timer.add(diff)
			if(player.g.timer.gte(1)) {
				player.g.timer = new Decimal(0)
				if(canReset("g")) player.g.points = player.g.points.add(1)
			}
		}
	},
	effectPower(){let eff = Decimal.pow(player.g.power.root(3), player.g.power.root(3)).log(7).add(1)
				  return eff},
	canBuyMax() {return hasAchievement("a", 46)},
	effectDescription(){return `which generate ${format(tmp.g.effect)} Degenerative Power per second.<br>${format(player.g.power)} Degenerative Power boost point gain by x${format(tmp.g.effectPower)} before NG-X nerfs.`},
    prestigeButtonText() {
        return "Reset for +"+(player.b.points.gte(tmp.g.requires.b) && player.kp.points.gte(tmp.g.requires.kp)?1:0)+" generators<br><br>Req: "+format(player.kp.points)+" / "+format(tmp.g.requires.kp)+" kilo prestige points<br>"+format(player.b.points)+" / "+format(tmp.g.requires.b)+" boosters"
    },
	canReset(){return player.b.points.gte(tmp.g.requires.b) && player.kp.points.gte(tmp.g.requires.kp)},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 5,
	branches: ["kp", "b"],
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
    color: "gray",
    requires(){return new Decimal(120).mul(Decimal.pow(3, player.kbg.points))},
    resource: "Uлs1A8I1I1Y", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return tmp.g.effectPower.mul(player.kb.points)}, // Get the current amount of baseResource
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	getResetGain(){return new Decimal(1)},
	getNextAt(canMax=false){return tmp.g.effectPower.mul(player.kb.points)},
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
	branches: ["kb", "g"],
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
	nodeStyle: {'border-radius': '0%', 'border': '0px', 'color': 'black'},
	componentStyles: {
		"prestige-button"() { return { 'border-radius': '0%', 'border': '0px'}},
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
    color: "cyan",
    requires(){return new Decimal(1000).mul(Decimal.pow(10, Decimal.pow(player.mpkb.points, player.mpkb.points))).mul(player.mpkb.points.eq(0)?0.1:1)},
    resource: "prestigious boosters", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.kb.points.mul(player.mp.points)}, // Get the current amount of baseResource
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	getResetGain(){return new Decimal(1)},
	getNextAt(canMax=false){return player.kb.points.mul(player.mp.points)},
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
	branches: ["mp", "kb"],
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
		thirtyTwoS: new Decimal(0),
		thirtyTwoX: new Decimal(0),
		thirtyTwoY: new Decimal(0),
		normalAchievements: new Decimal(0),
		fame: new Decimal(0),
    }},
    color: "yellow",
    row: "side",
	update(diff){
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
    layerShown(){return true},
	tooltip: "Achievements",
	tabFormat: {
		"Achievements": {
			content: [["display-text", function() {return "You currently have <h3 style='color: yellow; text-shadow: #7f78c4 0px 0px 10px;'>"+formatWhole(player.a.normalAchievements)+"</h3> out of <h3 style='color: yellow; text-shadow: #7f78c4 0px 0px 10px;'>33</h3> achievements." }], "blank", "blank", ["achievements", [1, 2, 3, 4, 5, 6]]],
			unlocked() {return player.ab.points.gte(5)}
		},
		"Hall of Fame": {
			content: [["display-text", function() {return "You have conquered <h3 style='color: yellow; text-shadow: #7f78c4 0px 0px 10px;'>"+formatWhole(player.a.fame)+"</h3> out of <h3 style='color: yellow; text-shadow: #7f78c4 0px 0px 10px;'>2</h3> challenges.<br>Don't blame me if you can't get them later on.<br>After all, you never needed them in the first place.<br><br><h3>You have been warned."}], "blank", "blank", ["achievements", [101]]],
			unlocked() {return player.ab.points.gte(5)}
		},
	},
	achievements: {
		11: {
			name: "Welcome",
			done(){return player.p.points.gte(1)},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip: "Perform a prestige reset.",
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		12: {
			name: "to",
			done(){return player.kp.points >=1},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip: "Perform a kilo prestige reset.",
			unlocked(){return hasAchievement("a", 11)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		13: {
			name: "your",
			done(){return player.mp.points >=1},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip: "Perform a mega prestige reset.",
			unlocked(){return hasAchievement("a", 12)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		14: {
			name: "worst",
			done(){return player.gp.points >=1},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip: "Perform a giga prestige reset.",
			unlocked(){return hasAchievement("a", 13)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		15: {
			name(){return hasAchievement("a", 15)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:(player.ab.points.gte(4)?player.a.Y2:player.a.Y))+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>nightmare.<h3/>":"AAAUGJRUOGJRO WHAT THE FUCK!!?!? WHAT THE FUCK IS THAT?!"},
			done(){return player.ab.points >=1},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return hasAchievement("a", 15)?"Perform an... anti balance reset?<br><h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>Reward: There is no reward.<h3/>":"Perform an... anti balance reset?"},
			unlocked(){return hasAchievement("a", 14)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		21: {
			name: "ROW! ROW! FIGHT THE POWER!",
			done(){return player.p.upgrades.length >=3 && player.ab.points >=1},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip: "Purchase 3 prestige upgrades in NG- mode.",
			unlocked(){return hasAchievement("a", 15)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		22: {
			name(){return hasAchievement("a", 22)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>I pity you.<h3/>":"Kilo-Mega Prestige"},
			done(){return player.gp.points >=1 && player.ab.points >=1},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return hasAchievement("a", 22)?"Perform a giga prestige reset in NG- mode.<br><h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>Reward: Not all 'Reward' are supposed to be disappointing, after all. Unlocks Booster layer.<h3/>":"Perform a giga prestige reset in NG- mode."},
			unlocked(){return hasAchievement("a", 15)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		23: {
			name: "Game Changer",
			done(){return upgradeRow("kp", 2, true) >= 1 && player.ab.points >=1},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip: "Purchase 2nd row kilo prestige upgrade in NG- mode.",
			unlocked(){return hasAchievement("a", 15)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		24: {
			name(){return (hasAchievement("a", 25))?(player.gp.points.add(getResetGain("gp"))>=100||hasAchievement("a", 31))?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>OnlY 90 mOrE tO gO lmfAAAAAAAO.<h3/>":(player.gp.points.add(getResetGain("gp"))>=95)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>^-^👍<h3/>":(player.gp.points.add(getResetGain("gp"))>=90)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>._.=≡⊐-<h3/>":(player.gp.points.add(getResetGain("gp"))>=85)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>._.⋗⨿∫≅=≡⊐-<h3/>":(player.gp.points.add(getResetGain("gp"))>=80)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>'-'⋗⨿∫≅=≡⊐-<h3/>":(player.gp.points.add(getResetGain("gp"))>=75)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>* ¬*⨿∫≅=≡⊐-<h3/>":(player.gp.points.add(getResetGain("gp"))>=70)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>* ¬*∫≅=≡⊐-<h3/>":(player.gp.points.add(getResetGain("gp"))>=70)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>ò ¬ó∫≅=≡⊐-<h3/>":(player.gp.points.add(getResetGain("gp"))>=65)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>ò ¬ó≅=≡⊐-<h3/>":(player.gp.points.add(getResetGain("gp"))>=65)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>ò ¬ó=≡⊐-<h3/>":(player.gp.points.add(getResetGain("gp"))>=60)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>ò ¬ó≡⊐-<h3/>":(player.gp.points.add(getResetGain("gp"))>=55)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>ò ¬ó⊐-<h3/>":(player.gp.points.add(getResetGain("gp"))>=50)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>ò¬ó-<h3/>":(player.gp.points.add(getResetGain("gp"))>=45)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>ò¬ó<h3/>":(player.gp.points.add(getResetGain("gp"))>=40)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>>;[<h3/>":(player.gp.points.add(getResetGain("gp"))>=35)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br>>;[<h3/>":(player.gp.points.add(getResetGain("gp"))>=30)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br>>;[<h3/>":(player.gp.points.add(getResetGain("gp"))>=25)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br>>;[<h3/>":hasAchievement("a", 25)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br>>;[<h3/>":hasAchievement("a", 24)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>OnlY 90 mOrE tO gO lmfAAAAAAAO.<h3/>":"Only 90 more to go":hasAchievement("a", 24)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>OnlY 90 mOrE tO gO lmfAAAAAAAO.<h3/>":"Only 90 more to go"},
			done(){return player.gp.points >= 10 && player.ab.points >=1},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return hasAchievement("a", 24)?"Reach 10 giga prestige points in NG- mode.<br><h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>Reward: I'm sorry, but this is the funniest thing I've ever seen in this week. Unlocks Primordial Boosters<h3/>":"Reach 10 giga prestige points in NG- mode."},
			unlocked(){return hasAchievement("a", 15)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		25: {
			name(){return (hasAchievement("a", 25))?(hasAchievement("a", 33))?"This achievement is -20% cooler than the previous one<br>;]":(player.gp.points.add(getResetGain("gp"))>=100||hasAchievement("a", 31))?"This achievement is -20% cooler than the previous one<br><br><br>;]":(player.gp.points.add(getResetGain("gp"))>=95)?"This achievement is -20% cooler than the previous one<br><br><br>': ]":(player.gp.points.add(getResetGain("gp"))>=90)?"This achievement is -20% cooler than the previous one<br><br><br>': |":(player.gp.points.add(getResetGain("gp"))>=85)?"This achievement is -20% cooler than the previous one<br><br><br>':|":(player.gp.points.add(getResetGain("gp"))>=80)?"This achievement is -20% cooler than the previous<br>':|":(player.gp.points.add(getResetGain("gp"))>=75)?"This achievement is':|0% cooler than the previous one":(player.gp.points.add(getResetGain("gp"))>=70)?"This achievement is 20% cooler than the previous<br>':|":(player.gp.points.add(getResetGain("gp"))>=65)?"This achievement is 20% cooler than the previous one<br><br><br>':|":(player.gp.points.add(getResetGain("gp"))>=60)?"This achievement is 20% cooler than the previous one<br><br><br>': |":(player.gp.points.add(getResetGain("gp"))>=55)?"This achievement is 20% cooler than the previous one<br><br><br>: |":(player.gp.points.add(getResetGain("gp"))>=50)?"This achievement is 20% cooler than the previous one<br><br><br>>: ]":(player.gp.points.add(getResetGain("gp"))>=20||hasAchievement("a", 25))?"This achievement is 20% cooler than the previous one<br><br><br>>:]":(player.gp.points.add(getResetGain("gp"))>=15)?"This achievement is 20% cooler than the previous one >:]":"This achievement is 20% cooler >:]":(player.gp.points.add(getResetGain("gp"))>=20||hasAchievement("a", 25))?"This achievement is 20% cooler than the previous one<br><br><br>>:]":(player.gp.points.add(getResetGain("gp"))>=15)?"This achievement is 20% cooler than the previous one >:]":"This achievement is 20% cooler >:]"},
			done(){return player.gp.points >=20 && player.ab.points >=1},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip: "Reach 20 giga prestige points in NG- mode<br>Reward: Upgrades are cheaper based on themselves that use the same currency.",
			unlocked(){return hasAchievement("a", 15)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		31: {
			name(){return hasAchievement("a", 31)?"Speaking of cretin...":(player.gp.points.add(getResetGain("gp"))>=100)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>Alright, I'm done with this cretin. >:[<h3/>":""},
			done(){return player.ab.points >= 2},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return (player.gp.points.add(getResetGain("gp"))>=100||hasAchievement("a", 31))?"Perform an anti balance reset. Again. Reward: Each anti-balance unlocks new booster layer. Also unlocks the shop.":" "},
			unlocked(){return hasAchievement("a", 25)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		32: {
			name(){return hasAchievement("a", 32)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>I knew I shouldn't have nerfed NG-.<h3/>":"So soon already?!"},
			done(){return player.kb.points >= 1},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return hasAchievement("a", 32)?"Perform a kilo booster reset.<br><h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.thirtyTwoX.add(player.a.X2):player.a.thirtyTwoX)+"px "+(player.ab.points.gte(4)?player.a.thirtyTwoY.add(player.a.Y2):player.a.thirtyTwoY)+"px "+(player.ab.points.gte(4)?player.a.thirtyTwoS.add(player.a.S2):player.a.thirtyTwoS)+"px;'>Reward: FUCK OFF<h3/>":"Perform a kilo booster reset."},
			unlocked(){return hasAchievement("a", 31)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		33: {
			name(){return hasAchievement("a", 33)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>U mad mobile?<br><br>i didn't really mean that btw<br>。_。<h3/>":"Heaven's Gift"},
			done(){return player.gp.points >= 200 && player.ab.points.gte(2)},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return hasAchievement("a", 33)?"Reach 200 giga prestige points.<br><h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>Reward: uhhhh de noido<h3/>":"Reach 200 giga prestige points."},
			unlocked(){return hasAchievement("a", 31)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		34: {
			name(){return "<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>This De Noido is pissing me off.<h3/>"},
			done(){return player.dn.pogos.gte(1)},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return hasAchievement("a", 34)?"Reach 1 pogo.<br><h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+player.a.X+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>Reward: Let me create an upgrade, just for you.<h3/>":"Reach 1 pogo."},
			unlocked(){return hasAchievement("a", 33) ||hasAchievement("a", 34)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		35: {
			name(){return "<h3 style='color: yellow;, font-family: 'Comic Sans MS';'>PARADOXICAL ANAL BULLSHITERY<h3/>"},
			done(){return player.dn.points.gte(2)},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return "<span style='color: yellow;, font-family: 'Comic Sans MS';'>Reach 2 de noidos.<br>Reward: start running.<span/>"},
			unlocked(){return hasUpgrade("dn", 11)||hasAchievement("a", 35)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'yellow':'#bf8f8f')}}
		},
		41: {
			name: "Never Again",
			done(){return player.ab.points >=3},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip: "Perform an anti balance reset for the third time.",
			unlocked(){return hasAchievement("a", 35)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		42: {
			name: "Seems Familiar",
			done(){return player.mb.points >=1},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip: "Perform a mega booster reset.",
			unlocked(){return hasAchievement("a", 41)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		43: {
			name: "Hell Awaits",
			done(){return upgradeRow("mp", 3, true) >= 1 && player.ab.points >=3},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip: "Purchase 3rd row mega prestige upgrade in NG--- mode.",
			unlocked(){return hasAchievement("a", 41)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		44: {
			name: "Full Set",
			done(){return player.gp.upgrades.length + player.mp.upgrades.length + player.kp.upgrades.length + player.p.upgrades.length >= 30},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip: "Purchase all 30 upgrades in NG--- mode.",
			unlocked(){return hasAchievement("a", 43)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		45: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>I've let you live long enough.<h3/>"},
			done(){return player.ab.points.gte(4)},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Perform an anti balance reset for the fourth time."},
			unlocked(){return hasAchievement("a", 44)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		51: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>It was a misinput MISINPUT CALM DOWN YOU CALM THE FUCK DOWN THERE WAS A MISINPUT.<h3/>"},
			done(){return player.g.points.gte(1) && player.ab.points.gte(4)},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Perform a generator reset...<br><br>Oops."},
			unlocked(){return hasAchievement("a", 45)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'#BF5F5F':'#bf8f8f')}}
		},
		52: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>"+(hasAchievement("a", 52)?"oh no":"This is it.")+"<h3/>"},
			done(){return player.gp.points.gte(1) && player.ab.points.gte(4)},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>"+(hasAchievement("a", 52)?"oh god no<br><br>no wait the fu-<br><br>I LITERALLY JUST BLINKED HOW DID YOU GET THOSE LAYERS ALREADY?!":"Perform a giga prestige reset. Cutely.")},
			unlocked(){return hasAchievement("a", 45)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'#BF5F5F':'#bf8f8f')}}
		},
		53: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Disastrous Gameplay.<h3/>"},
			done(){return player.mpkb.points.gte(1) || player.kbg.points.gte(1)},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Perform Prestigious Booster or Unstability reset<br>Reward: Two can play this game."},
			unlocked(){return hasAchievement("a", 52)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'#BF5F5F':'#bf8f8f')}}
		},
		54: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Hehehehehe. That should hold 'em alright.<h3/>"},
			done(){return player.pb.points.gte(1) && player.ab.points.gte(4)},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Perform a Primordial Booster reset in NG---- mode<br>Unintended Reward: You can reset Primordial Booster's stored boosters"},
			unlocked(){return hasAchievement("a", 52)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'#BF5F5F':'#bf8f8f')}}
		},
		55: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Is it even wortht grinding anymore?<h3/>"},
			done(){return player.gb.points.gte(2)},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Reach 2 giga boosters"},
			unlocked(){return hasAchievement("a", 52)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'#BF5F5F':'#bf8f8f')}}
		},
		16: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>STOP.<h3/>"},
			done(){return player.gp.points.gte(100000)},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Reach 100,000 giga prestige points.<br>Reward: Giga Prestige Point gain is doubled."},
			unlocked(){return hasAchievement("a", 55)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'#BF5F5F':'#bf8f8f')}}
		},
		26: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Primordial Rage.<h3/>"},
			done(){return player.gp.points.gte(1000000)},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Reach 1,000,000 giga prestige points.<br>Reward: Giga Boosters no longer reset anything."},
			unlocked(){return hasAchievement("a", 55)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'#BF5F5F':'#bf8f8f')}}
		},
		36: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>I didn't know it was even possible to go THIS far...<h3/>"},
			done(){return player.points.gte(Decimal.pow(2, 1024))},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Reach 1.79e308 points.<br>Reward: Get softcapped, stupid idiot dumb."},
			unlocked(){return hasAchievement("a", 55)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'#BF5F5F':'#bf8f8f')}}
		},
		46: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>That's twice the amount required to buy max generators!<h3/>"},
			done(){return player.g.points.gte(30)},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Reach 30 generators.<br>Reward: You generate 1 generator per second whenever they're available."},
			unlocked(){return hasAchievement("a", 55)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'#BF5F5F':'#bf8f8f')}}
		},
		56: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>"+(player.ab.points.lt(5)&&player.gp.points.gte("5e85")?"oops .-.":player.ab.points.lt(5)&&player.gp.points.gte("2e85")?"THIS ISN'T OVER.":"The game truly begins.")+"<h3/>"},
			done(){return player.ab.points.gte(5)},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Perform a Anti-Balance reset for the 5th time."},
			unlocked(){return hasAchievement("a", 55)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'#BF5F5F':'#bf8f8f')}}
		},
		61: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>STOP.<h3/>"},
			done(){return player.s.unlocked||player.t.unlocked||player.m.unlocked||player.n.unlocked},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Perform a Row -1 reset."},
			unlocked(){return player.ab.points.gte(5)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'#BF5F5F':'#bf8f8f')}}
		},
		62: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>STOP.<h3/>"},
			done(){return getBypassedPointGen().lte(-1) && player.ab.negativePoints.gt(1)},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Reach -1 points/sec at negative points."},
			unlocked(){return player.ab.points.gte(5)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'#BF5F5F':'#bf8f8f')}}
		},
		63: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Gee Acamaeda! How Come Your Engine Lets You Eat Two Layers?<h3/>"},
			done(){return (player.s.unlocked&&player.t.unlocked)||(player.m.unlocked&&player.n.unlocked)},
			onComplete(){player.a.normalAchievements=player.a.normalAchievements.add(1)},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Unlock 2 -1 Row layers."},
			unlocked(){return player.ab.points.gte(5)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'#BF5F5F':'#bf8f8f')}}
		},
		1011: {
			name(){return hasAchievement("a", 1011)?"L":"PATIENCE"},
			onComplete(){player.a.fame=player.a.fame.add(1)},
			done(){return player.ab.negativePoints.gte(10) && player.ab.buyables[11].lte(0) && player.ab.buyables[12].lte(0) && player.ab.buyables[13].lte(0) && player.ab.buyables[14].lte(0) && !player.s.unlocked && !player.t.unlocked && !player.n.unlocked && !player.m.unlocked},
			tooltip: "Reach -10 points without Balancers or -1 Row layers.<br>Reward: You can respec Balancers without resetting the progress.",
			style(){return {'background': (hasAchievement("a",this.id)?'repeating-linear-gradient(#FFDF00, #D4AF37, #FFDF00)':'#bf8f8f'), 'background-size': '40% 75%', 'background-position': '50% '+player.a.XG+'%'}}
		},
		1012: {
			name(){return hasAchievement("a", 1012)?"a":"PATIENCE 2: ELECTRIC BOOGALOO"},
			onComplete(){player.a.fame=player.a.fame.add(1)},
			done(){return (player.t.years.gte(1)||player.m.famed==true)&&(!tmp.st.unlocked&&!tmp.o.unlocked)},
			tooltip(){return (player.ab.nostalgia?"Reach 1 year":player.ab.fuckyou?"Purchase mangoes at it's cheapest":"???")+" without Row 0 layers.<br>Reward: I am so proud of you. 4x point gain."},
			style(){return {'background': (hasAchievement("a",this.id)?'repeating-linear-gradient(#FFDF00, #D4AF37, #FFDF00)':'#bf8f8f'), 'background-size': '40% 75%', 'background-position': '50% '+player.a.XG+'%'}}
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
    }},
    color: "#0f0f0f",
    row: "side",
    layerShown(){return true},
	tooltip: "",
	tabFormat: ["clickables"],
	clickables: {
        11: {
            title: "ACT 1:<br>Hopeless Situation<br><br>[NG-]",
            unlocked() {return true},
            canClick() {return true},
			onClick()  {player.a.achievements = ['11', '12', '13', '14', '15']
						player.m.famed = false
						player.m.milestones = []
						player.ab.points = new Decimal(1)
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
						player.t.unlocked = false
						player.s.unlocked = false
						player.n.unlocked = false
						player.m.unlocked = false
						player.st.unlocked = false
						player.o.unlocked = false
						player.a.normalAchievements = new Decimal(5)
						player.a.fame = new Decimal(0)
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
						player.kb.unlocked = true
						player.mb.unlocked = false
						player.a.normalAchievements = new Decimal(16)
						doReset("ab", true)},
			style: {"background-color"(){
                return 'white'
            }},
        },
        14: {
            title(){return "ACT 4:<br>"+(hasAchievement("a", 1011)?"L":"█")+(hasAchievement("a", 1012)?"a":"█")+"████'s Fury<br><br>[NG----]"},
			//bruh you really thought i'd let you know the name like that
			
			//get yo ass up and watch some Party Crashers instead
			
			//or play Shenanigans Tree which is what inspired this mod (DON'T)
            unlocked() {return true},
            canClick() {return true},
			onClick()  {tmp.sdumsl.clickables[13].onClick()
						player.a.achievements = ['11', '12', '13', '14', '15', '21', '22', '23', '24', '25', '31', '32', '33', '34', '35', '41', '42', '43', '44', '45']
						player.mb.unlocked = true
						player.ab.points = new Decimal(4)
						player.a.normalAchievements = new Decimal(20)
						doReset("ab", true)},
			style: {"background-color"(){
                return 'white'
            }},
        },
        15: {
            title: "ACT 5:<br>Neverending Spacetime... Mangoes?<br><br>[NG-----]",
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
	},
	nodeStyle: {'opacity': '0'} 
})

addLayer("s", {
    name: "space", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#000000",
	shape: "line",
    requires(){return new Decimal(1).times((player.t.unlocked&&!player.s.unlocked)?76.2:1)}, // Can be a function that takes requirement increases into account
    resource: "spaces", // Name of prestige currency
    baseResource: "negative points", // Name of resource prestige is based on
    baseAmount() {return player.ab.negativePoints}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.301, // Prestige currency exponent
	stupidBarIHateIt() {let value = new Decimal(tmp.s.shape == "terrasect"?394:tmp.s.shape == "cube"?279:tmp.s.shape == "square"?164:44)
						if(player.s.buyables[12].gte(3)) value = value.times(Decimal.div(453, 175)).mul(Decimal.pow(Decimal.add(10, player.s.buyables[12].sub(4)), player.s.buyables[12].sub(3)))
						return player.s.points.div(value).min(1)},
	effect() {let size = tmp.s.lеngth.mul(tmp.s.height).mul(tmp.s.width).mul(tmp.s.spissitude)
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
        let mult = new Decimal(1).mul(tmp.t.effectDay)
        return mult
    },
	update(diff){
		tmp.s.shape = ["line", "square", "cube", "terrasect"][player.s.buyables[12].gte(3)?3:player.s.buyables[12]]
	},
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	tabFormat: ["main-display", "prestige-button", "resource-display", ["display-text", function() {return "Total size: "+format(tmp.s.lеngth.mul(tmp.s.height).mul(tmp.s.width).mul(tmp.s.spissitude))+"m"+(tmp.s.shape=="terrasect"?"⁴":tmp.s.shape=="cube"?"³":tmp.s.shape=="square"?"²":"")+"<br>It's size is boosting point gain by "+format(tmp.s.effect)+"x"}], "blank", ["row", [["column", [["buyable", 11], ["buyable", 21], ["buyable", 31], ["buyable", 41]]], "blank", ["bar", "FUCKYOU"]]], "blank", ["buyable", 12], "blank", "upgrades"],
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for spaces", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.ab.points.gte(5) && !player.ab.fuckyou},
	nodeStyle() {return {'color': (player.s.unlocked||player.ab.negativePoints.gte(tmp.s.requires)?'#7F7F7F':''), 'border-color': (player.s.unlocked||player.ab.negativePoints.gte(tmp.s.requires)?'#1F1F1F':'')}},
	componentStyles: {
		"prestige-button"() {return canReset("s")?{'color': '#7F7F7F', 'border-color': '#1F1F1F'}:{'color': 'black', 'border-color': 'rgba(0, 0, 0, 0.125)'}},
	},
	buyables: {
		11: {
			title: "Length",
			cost() { return new Decimal(1).mul(Decimal.pow(3, player.s.buyables[this.id]))},
			size() { let base = player.s.buyables[11].mul(player.s.buyables[12].div(4).add(1).floor())
					 let size = base.add(1)
					 if(hasUpgrade("s", 11)) size = size.add(base)
					 if(hasUpgrade("s", 13)) size = Decimal.mul(base.add(2), base.add(1))
					 return size},
			display() { return "Your "+tmp.s.shape+" is currently:<br><h3>"+format(this.size())+"m</h3> long<br>Cost: "+format(this.cost())+" spaces<br>You have purchased it "+player.s.buyables[11]+" times" },
			canAfford() { return player.s.points.gte(this.cost()) },
			buy() {
				player.s.points = player.s.points.sub(this.cost())
				player.s.buyables[this.id] = player.s.buyables[this.id].add(1)
			},
			style(){return{'height':'100px', 'width':'175px', 'color': (tmp.s.buyables[this.id].canAfford?'#7F7F7F':'black'), 'border-color': (tmp.s.buyables[this.id].canAfford?'#1F1F1F':'#rgba(0, 0, 0, 0.125)')}},
			unlocked(){return true}
		},
		12: {
			title(){return player.s.buyables[12].gte(3)?"Dimensional Booster":"Dimension Shifter"},
			cost() { let cost = new Decimal(tmp.s.bars.FUCKYOU.height) 
				     if(player.s.buyables[12].gte(3)) cost = cost.times(Decimal.div(453, 175)).mul(Decimal.pow(Decimal.add(10, player.s.buyables[12].sub(4)), player.s.buyables[12].sub(3)))
					 return cost},
			display() { return player.s.buyables[12].gte(3)?"Boosts "+["length","height","width","spissitude"][player.s.buyables[12].add(1)%4]+"'s base by 2x<br>Next multiplier at "+formatWhole(this.cost())+" spaces":"Next shape at "+formatWhole(this.cost())+' spaces' },
			canAfford() { return player.s.points.gte(this.cost()) },
			buy() {
				player.s.buyables[this.id] = player.s.buyables[this.id].add(1)
			},
			style(){return{'height':'100px', 'width':'175px', 'color': (tmp.s.buyables[this.id].canAfford?'#7F7F7F':'black'), 'border-color': (tmp.s.buyables[this.id].canAfford?'#1F1F1F':'#rgba(0, 0, 0, 0.125)')}},
			unlocked(){return true}
		},
		21: {
			title: "Height",
			cost() { return new Decimal(1).mul(Decimal.pow(3, player.s.buyables[this.id]))},
			size() { let base = player.s.buyables[21].mul(player.s.buyables[12].sub(1).div(4).add(1).floor())
					 let size = base.add(1)
					 if(hasUpgrade("s", 21)) size = size.pow(2)
					 return size},
			display() { return "Your "+tmp.s.shape+" is currently:<br><h3>"+format(this.size())+"m</h3> high<br>Cost: "+format(this.cost())+" spaces<br>You have purchased it "+player.s.buyables[21]+" times" },
			canAfford() { return player.s.points.gte(this.cost()) },
			buy() {
				player.s.points = player.s.points.sub(this.cost())
				player.s.buyables[this.id] = player.s.buyables[this.id].add(1)
			},
			style(){return{'height':'100px', 'width':'175px', 'color': (tmp.s.buyables[this.id].canAfford?'#7F7F7F':'black'), 'border-color': (tmp.s.buyables[this.id].canAfford?'#1F1F1F':'#rgba(0, 0, 0, 0.125)')}},
			unlocked(){return tmp.s.shape == "square"|| tmp.s.shape == "cube" || tmp.s.shape == "terrasect"}
		},
		31: {
			title: "Width",
			cost() { return new Decimal(1).mul(Decimal.pow(3, player.s.buyables[this.id]))},
			size() { let base = player.s.buyables[31].mul(player.s.buyables[12].sub(2).div(4).add(1).floor())
					 let size = base.add(1)
					 return size},
			display() { return "Your "+tmp.s.shape+" is currently:<br><h3>"+format(this.size())+"m</h3> wide<br>Cost: "+format(this.cost())+" spaces<br>You have purchased it "+player.s.buyables[31]+" times" },
			canAfford() { return player.s.points.gte(this.cost()) },
			buy() {
				player.s.points = player.s.points.sub(this.cost())
				player.s.buyables[this.id] = player.s.buyables[this.id].add(1)
			},
			style(){return{'height':'100px', 'width':'175px', 'color': (tmp.s.buyables[this.id].canAfford?'#7F7F7F':'black'), 'border-color': (tmp.s.buyables[this.id].canAfford?'#1F1F1F':'#rgba(0, 0, 0, 0.125)')}},
			unlocked(){return tmp.s.shape == "cube" || tmp.s.shape == "terrasect"}
		},
		41: {
			title: "Spissitude",
			cost() { return new Decimal(1).mul(Decimal.pow(4, player.s.buyables[this.id]))},
			size() { let base = player.s.buyables[41].mul(player.s.buyables[12].sub(3).div(4).add(1).floor())
					 let size = base.add(1)
					 return size},
			display() { return "Your "+tmp.s.shape+" is currently:<br><h3>"+format(this.size())+"m</h3> dense<br>Cost: "+format(this.cost())+" spaces<br>You have purchased it "+player.s.buyables[41]+" times" },
			canAfford() { return player.s.points.gte(this.cost()) },
			buy() {
				player.s.points = player.s.points.sub(this.cost())
				player.s.buyables[this.id] = player.s.buyables[this.id].add(1)
			},
			style(){return{'height':'100px', 'width':'175px', 'color': (tmp.s.buyables[this.id].canAfford?'#7F7F7F':'black'), 'border-color': (tmp.s.buyables[this.id].canAfford?'#1F1F1F':'#rgba(0, 0, 0, 0.125)')}},
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
					     return player.s.points/initial },
		}
	},
	upgrades: {
		11: {
			title: "You can move in BOTH directions?!",
			description: "Length uses better formula<br>[x+1] => [x*2+1]",
			unlocked: true,
			cost: new Decimal(2),
            currencyLocation() {return player.s.buyables},
			currencyDisplayName: "length",
			currencyInternalName: 11,
			currencyLayer: "s",
			style() {return {'color': (player.s.buyables[11].gte(this.cost)&&!hasUpgrade("s", 11)?'#7F7F7F':''), 'border-color': (player.s.buyables[11].gte(this.cost)&&!hasUpgrade("s", 11)?'#1F1F1F':'')}},
		},
		12: {
			title: "The Clutcher",
			description: "You gain more points based on how close you are to getting the next shape",
			effect(){return tmp.s.stupidBarIHateIt.mul(100).max(1).log(8.58784928098261).add(1)},
			effectDisplay(){return format(this.effect())+"x"},
			unlocked: true,
			cost: new Decimal(5),
			style() {return {'color': (player.s.points.gte(this.cost)&&!hasUpgrade("s", 12)?'#7F7F7F':''), 'border-color': (player.s.points.gte(this.cost)&&!hasUpgrade("s", 12)?'#1F1F1F':'')}},
		},
		13: {
			title: "The Last Line Bender",
			description: "Length uses better formula<br>[x*2+1] => [(x*2+2)+(x*2+1)]",
			unlocked: true,
			cost: new Decimal(3),
            currencyLocation() {return player.s.buyables},
			currencyDisplayName: "length",
			currencyInternalName: 11,
			currencyLayer: "s",
			style() {return {'color': (player.s.buyables[11].gte(this.cost)&&!hasUpgrade("s", 13)?'#7F7F7F':''), 'border-color': (player.s.buyables[11].gte(this.cost)&&!hasUpgrade("s", 13)?'#1F1F1F':'')}},
		},
		21: {
			title: "Height's Power",
			description: "Height uses better formula<br>[x+1] => [(x+1)^2]",
			unlocked(){return player.s.buyables[12].gte(1)},
			cost: new Decimal(5),
            currencyLocation() {return player.s.buyables},
			currencyDisplayName: "height",
			currencyInternalName: 21,
			currencyLayer: "s",
			style() {return {'color': (player.s.buyables[21].gte(5)&&!hasUpgrade("s", 21)?'#7F7F7F':''), 'border-color': (player.s.buyables[21].gte(5)&&!hasUpgrade("s", 21)?'#1F1F1F':'')}},
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
		canProgress: true,
    }},
    color: "#FFFFFF",
	effectSecond(){let second = player.t.seconds
				   if(hasUpgrade("t", 15)) second = second.mul(69)
				   return second.add(1).root(10)},
	effectMinute(){let minute = player.t.minutes
				   return minute.add(1).log(10).add(1)},
	effectHour(){return player.t.hours.add(1).root(3)},
	effectClock(){let clocks = player.t.points.mul(tmp.t.effectHour)
				  if(hasUpgrade("t", 12)) clocks = clocks.mul(1.8)
				  return clocks},
	effectDay(){return player.t.days.mul(tmp.t.effectWeek).div(10).add(1)},
	effectWeek(){return player.t.weeks.add(1).root(7)},
	effectMonth(){return player.t.months.add(1).log(10).add(1)},
	update(diff){
		player.t.seconds = player.t.seconds.add(Decimal.mul(diff, tmp.t.effectClock))
		if(player.t.canProgress){
			if(player.t.seconds.gte(60*player.t.base)) {
				player.t.minutes = player.t.minutes.add(1*player.t.base)
				player.t.seconds = player.t.seconds.sub(60*player.t.base)
			}
			if(player.t.minutes.gte(60*player.t.base)) {
				player.t.hours = player.t.hours.add(1*player.t.base)
				player.t.minutes = player.t.minutes.sub(60*player.t.base)
			}
			if(player.t.hours.gte(24*player.t.base)) {
				player.t.days = player.t.days.add(1*player.t.base)
				player.t.hours = player.t.hours.sub(24*player.t.base)
			}
			if(player.t.days.gte(7*player.t.base)) {
				player.t.weeks = player.t.weeks.add(1*player.t.base)
				player.t.days = player.t.days.sub(7*player.t.base)
			}
			if(player.t.weeks.gte(4*player.t.base)) {
				player.t.months = player.t.months.add(1*player.t.base)
				player.t.weeks = player.t.weeks.sub(4*player.t.base)
			}
			if(player.t.months.gte(12*player.t.base)) {
				player.t.years = player.t.years.add(1*player.t.base)
				player.t.months = player.t.months.sub(12*player.t.base)
			}
			if(player.t.years.gte(100*player.t.base)) {
				player.t.centuries = player.t.centuries.add(1*player.t.base)
				player.t.years = player.t.years.sub(100*player.t.base)
			}
			if(player.t.centuries.gte(10*player.t.base)) {
				player.t.millenniums = player.t.millenniums.add(1*player.t.base)
				player.t.centuries = player.t.centuries.sub(10*player.t.base)
			}
		}
	},
	effectDescription(){return `which generate ${format(tmp.t.effectClock)} seconds per second in total`},
	tabFormat: ["main-display", "prestige-button", "resource-display", ["display-text", function(){return `You have about...`+(player.t.seconds.gte(1)?`<br>${formatWhole(player.t.seconds)} seconds`+(hasUpgrade("t", 11)?`, giving you ${format(tmp.t.effectSecond)}x point gain boost`:``):``)+(player.t.minutes.gte(1)?`<br>${formatWhole(player.t.minutes)} minutes, granting you ${format(tmp.t.effectMinute)}x clock gain`:``)+(player.t.hours.gte(1)?`<br>${formatWhole(player.t.hours)} hours, blessing you with ${format(tmp.t.effectHour)}x clock acceleration`:``)+(player.t.days.gte(1)?`<br>${formatWhole(player.t.days)} days, offering you a staggering ${format(tmp.t.effectDay)}x space gain`:``)+(player.t.weeks.gte(1)?`<br>${formatWhole(player.t.weeks)} weeks, boosting days by ${format(tmp.t.effectWeek)}x`:``)+(player.t.months.gte(1)?`<br>${formatWhole(player.t.months)} months, empowering balancers by ^${format(tmp.t.effectMonth)}`:``)+(player.t.years.gte(1)?`<br>${formatWhole(player.t.years)} years`:``)+(player.t.centuries.gte(1)?`<br>${formatWhole(player.t.centuries)} centuries`:``)+(player.t.millenniums.gte(1)?`<br>${formatWhole(player.t.millenniums)} millenniums`:``)}], "blank", ["clickables", [1]], "blank", ["clickable", 21], "blank", "upgrades"],
    requires(){return new Decimal(1).times((player.s.unlocked&&!player.t.unlocked)?76.2:1)}, // Can be a function that takes requirement increases into account
    resource: "clocks", // Name of prestige currency
    baseResource: "negative points", // Name of resource prestige is based on
    baseAmount() {return player.ab.negativePoints}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.150515, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1).mul(tmp.t.effectMinute)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "T: Reset for clocks", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.ab.points.gte(5) && !player.ab.fuckyou},
	doReset(resettingLayer){
		if(player.ab.points.gte(5)) {
			player.points = new Decimal(17.77)
			player.ab.negativePoints = new Decimal(0)
		}
		if(tmp[resettingLayer].row > this.row){
			player[this.layer].points = new Decimal(0)
			player.t.upgrades = []
			player.t.base = new Decimal(0)
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
            title: "<<<",
            unlocked() {return true},
            canClick() {return player.t.base.gte(101)},
			onClick()  {player.t.base = player.t.base.sub(100)},
            onHold() {player.t.base = player.t.base.sub(100)},
			style() {return{'height': '64px', 'width': '64px'}}
        },
		12: {
            title: "<<",
            unlocked() {return true},
            canClick() {return player.t.base.gte(11)},
			onClick()  {player.t.base = player.t.base.sub(10)},
            onHold() {player.t.base = player.t.base.sub(10)},
			style() {return{'height': '64px', 'width': '64px'}}
        },
		13: {
            title: "<",
            unlocked() {return true},
            canClick() {return player.t.base.gte(2)},
			onClick()  {player.t.base = player.t.base.sub(1)},
            onHold() {player.t.base = player.t.base.sub(1)},
			style() {return{'height': '64px', 'width': '64px'}}
        },
		14: {
            title(){return`Bulk buy time itself<br>Bulk: ${formatWhole(player.t.base)}`},
            unlocked() {return true},
            canClick() {return true},
        },
		15: {
            title: ">",
            unlocked() {return true},
            canClick() {return true},
			onClick()  {player.t.base = player.t.base.add(1)},
            onHold() {player.t.base = player.t.base.add(1)},
			style() {return{'height': '64px', 'width': '64px'}}
        },
		16: {
            title: ">>",
            unlocked() {return true},
            canClick() {return true},
			onClick()  {player.t.base = player.t.base.add(10)},
            onHold() {player.t.base = player.t.base.add(10)},
			style() {return{'height': '64px', 'width': '64px'}}
        },
		17: {
            title: ">>>",
            unlocked() {return true},
            canClick() {return true},
			onClick()  {player.t.base = player.t.base.add(100)},
            onHold() {player.t.base = player.t.base.add(100)},
			style() {return{'height': '64px', 'width': '64px'}}
        },
		21: {
			title() {return "<h2>Purchase Time?<br>"+(player.t.canProgress?"[YES]":"[NO]")},
            unlocked() {return true},
            canClick() {return true},
			onClick()  {player.t.canProgress = !player.t.canProgress},
			style() {return{'height': '100px', 'width': '250px', 'border-radius': '10%'}}
        },
	},
	upgrades: {
		11: {
			title: "10 Seconds",
			description: "Seconds now have an effect.",
			unlocked: true,
			cost: new Decimal(10),
			currencyInternalName: "seconds",
			currencyDisplayName: "seconds",
			currencyLayer: "t",
		},
		12: {
			title: "One Minecraft Day",
			description: "Hey, look! A Minecraft reference! Make those goddamn clocks 80% faster!",
			unlocked: true,
			cost: new Decimal(20),
			currencyInternalName: "minutes",
			currencyDisplayName: "minutes",
			currencyLayer: "t",
		},
		13: {
			title: "Squidward's Closet",
			description: "I CALCULATED IT AND YOU CAN'T PROVE ME OTHERWISE + RATIO!<br>also speeds up point gain as if time was accelerated by 6x at positive points.",
			unlocked: true,
			cost: new Decimal(32),
			currencyInternalName: "points",
			currencyDisplayName: "clocks",
			currencyLayer: "t",
		},
		14: {
			title: "Antimatter Dimensions Update in just 5 hours",
			description: "Just take 1 extra balancing point and move on...",
			unlocked: true,
			cost: new Decimal(5),
			currencyInternalName: "hours",
			currencyDisplayName: "hours",
			currencyLayer: "t",
		},
		15: {
			title: "guys look!11",
			description: "the funnieyzz XDddDDD1!!1<br>sex-cords are 69x sotrnger HAHAHAHAHAHAHAHAHAHA-<br>the voices aren't leaving me alone please save me i can't do this anymore",
			unlocked: true,
			cost: new Decimal(69),
			currencyInternalName: "hours",
			currencyDisplayName: "hours",
			currencyLayer: "t",
		},
	}
})

addLayer("st", {
    name: "spacetime", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ST", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "gray",
    requires: new Decimal("1e600000"), // Can be a function that takes requirement increases into account
    resource: "time", // Name of prestige currency
    baseResource: "negative points", // Name of resource prestige is based on
    baseAmount() {return player.ab.negativePoints}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	tooltipLocked: "Reach 28,800 negative points to unlock<br><h1>(W.I.P)",
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "C: Reset for spacetimes", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	branches: ["s", "t"],
    layerShown(){return player.ab.points.gte(5) && !player.ab.fuckyou},
	doReset(resettingLayer){
		if(player.ab.points.gte(5)) {
			player.points = new Decimal(17.77)
			player.ab.negativePoints = new Decimal(0)
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
		coins: new Decimal(300),
		framerule: new Decimal(0),
		amount: new Decimal(0.05),
		banked: new Decimal(0),
		tax: new Decimal(3),
		timeout: new Decimal(0),
		bestday: new Decimal(0),
		currentday: new Decimal(0)
    }},
    color: "#633695",
    requires(){return new Decimal(1).add(Decimal.root(player.n.total, 2)).mul(Decimal.pow(1.1, player.n.total)).times((player.m.unlocked&&!player.n.unlocked)?1071:1)}, // Can be a function that takes requirement increases into account
	totalEffect() {return player.n.total.add(1).root(2)},
	bestDayEffect(){return Decimal.pow(new Decimal(1).div(100).mul(3).add(1), player.n.bestday)},
    resource: "symbols", // Name of prestige currency
    baseResource: "negative points", // Name of resource prestige is based on
	tabFormat: {
		"Neverend": {
			content: ["main-display", "prestige-button", ["blank", ["0px", "4px"]], ["display-text", function() {return "You have "+formatWhole(player.ab.negativePoints)+" negative points<br><br>Your best symbols is "+formatWhole(player.n.best)+"<br>You have made a total of "+formatWhole(player.n.total)+" symbols, boosting your point gain by "+format(tmp.n.totalEffect)+"x"}], "blank", ["upgrades", [1, 2, 3, 4]]],
			unlocked(){return hasUpgrade("n", 14)}
		},
		"Neverend 2": {
			content: ["main-display", "prestige-button", ["blank", ["0px", "4px"]], ["display-text", function() {return "You have "+formatWhole(player.ab.negativePoints)+" negative points<br><br>Your best symbols is "+formatWhole(player.n.best)+"<br>You have made a total of "+formatWhole(player.n.total)+" symbols, boosting your point gain by "+format(tmp.n.totalEffect)+"x"}], "blank", ["upgrades", [5, 6, 7, 8]]],
			unlocked(){return hasUpgrade("n", 14)}
		},
		"Wario": {
			content: [["display-text", function(){return "<h2>Now we're grooving!</h2><br><h1>THIS IS WARIO TIME!</h1><br><h2>[DAY "+formatWhole(player.n.currentday)+"]</h2><h3><br>YOU BEST RUN LASTED "+formatWhole(player.n.bestday)+" DAYS, BOOSTING POINT GAIN BY "+format(tmp.n.bestDayEffect)+"x</h3><br>You currently have "+format(player.n.coins)+" coins<br>Your next framerule will arrive in "+formatWhole(Decimal.sub((hasUpgrade("n", 24)?15:21), player.n.framerule))+" seconds, gaining 5% of banked coins.<br>Your current estimated frametax is "+format(player.n.tax.add(player.n.coins.add(tmp.n.income).mul(tmp.n.tax)))+" coins.<br>Your total net is "+format(tmp.n.income.sub(player.n.tax.add(player.n.coins.mul(tmp.n.tax))))+" coins.<br>Good news: Income come first. However, be mindful of your coins as running out of them will result in bankruptcy, forcing you to start from ground zero.<br><br><h5>frametax grows every day btw. good luck.</h5>"+(player.n.currentday.gte(11)?"Your income is worsen by "+format(new Decimal(1).sub(tmp.n.extraTax).mul(100))+"% based on how far you've gone past 10 days":"")}], "blank", "milestones", "blank", ["buyables", [1]], "blank", ["buyables", [2]], "blank", ["buyable", 31]],
			unlocked(){return hasUpgrade("n", 14)}
		}
	},
	update(diff){
		if(hasUpgrade("n", 14)) player.n.framerule = player.n.framerule.add(diff)
		if(player.n.framerule.gte(hasUpgrade("n", 24)?15:21)) {
			player.n.framerule = new Decimal(0)
			player.n.coins = player.n.coins.add(tmp.n.income).sub(player.n.tax.add(player.n.coins.mul(tmp.n.tax)))
			if(player.n.coins.gte(0)) player.n.currentday = player.n.currentday.add(1)
			if(player.n.coins.gte(0)) player.n.bestday = player.n.bestday.max(player.n.currentday)
			player.n.tax = player.n.tax.add(3)
			if(player.n.timeout.gt(0)) player.n.timeout = player.n.timeout.sub(1).round()
		}
		if(player.n.coins.lt(0)) {
			player.n.coins = new Decimal(300)
			player.n.framerule = new Decimal(0)
			player.n.banked = new Decimal(0)
			player.n.currentday = new Decimal(0)
			player.n.tax = new Decimal(3)
			player.n.timeout = new Decimal(0)
			player.n.buyables[21] = new Decimal(0)
			player.n.buyables[22] = new Decimal(0)
		}
	},
	income() {return player.n.banked.mul(0.05).mul(tmp.n.buyables[21].effect).mul(tmp.n.buyables[22].effect).mul(tmp.n.extraTax)},
	tax() {return new Decimal(0.22).sub(hasUpgrade("n", 25)?0.05:0).add(Decimal.mul(0.01, player.n.buyables[22]))},
	extraTax() {return Decimal.pow(0.775, player.n.currentday.sub(10).max(0))},
    baseAmount() {return player.ab.negativePoints}, // Get the current amount of baseResource
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
        {key: "n", description: "N: Reset for neverends", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.ab.points.gte(5) && !player.ab.nostalgia},
	doReset(resettingLayer){
		if(player.ab.points.gte(5)) {
			player.points = new Decimal(17.77)
			player.ab.negativePoints = new Decimal(0)
		}
		if(tmp[resettingLayer].row > this.row){
			player[this.layer].points = new Decimal(0)
			player[this.layer].best = new Decimal(0)
			player[this.layer].total = new Decimal(0)
			player[this.layer].coins = new Decimal(300).add(hasUpgrade("n", 23)?100:0)
			player[this.layer].framerule = new Decimal(0)
			player[this.layer].currentday = new Decimal(0)
			player[this.layer].bestday = new Decimal(0)
			player[this.layer].amount = new Decimal(0.05)
			player[this.layer].banked = new Decimal(0)
			player[this.layer].tax = new Decimal(3)
			player[this.layer].upgrades = []
			player[this.layer].milestones = []
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
			effect() {return new Decimal(1).add(Decimal.mul(0.1, player.n.buyables[21]))},
			cost(){return new Decimal(10).mul(Decimal.pow(1.15, player.n.buyables[22]))},
			display(){return `<h3>"Nothin' unusual here, kiddo."</h3><br>Advertise your product for whooping 10%!... with +1% extra base taxframe, that is.<br>Amount: ${formatWhole(player.n.buyables[22])}<br>Cost: ${format(this.cost())} coins`},
			canAfford(){return player.n.coins.gte(this.cost())},
			buy() {player.n.coins = player.n.coins.sub(this.cost())
				   player.n.buyables[22] = player.n.buyables[22].add(1)},
			style(){return{'height':'125px','width':'185px'}}
		},
		23: {
			title(){return "Rob The Bank"},
			cost(){return new Decimal(1)},
			display(){return `<h3>"Here we go!"</h3><br>You rob the bank, emptying the bank and gaining 200% of banked coins but shutting it down for ${formatWhole(hasUpgrade("n", 21)?3:5)} framerules`},
			canAfford(){return player.n.timeout.eq(0)},
			buy() {player.n.coins = player.n.coins.add(player.n.banked.mul(2))
				   player.n.banked = new Decimal(0)
				   player.n.timeout = new Decimal(hasUpgrade("n", 21)?3:5)},
			style(){return{'height':'125px','width':'185px'}}
		},
		31: {
			title(){return "Reset your progress"},
			cost(){return new Decimal(1)},
			display(){return `<h3>"Have a rotten day."</h3><br>Reset your progress and start from the scratch.`},
			canAfford(){return true},
			buy() {player.n.coins = new Decimal(300).add(hasUpgrade("n", 23)?100:0)
				   player.n.framerule = new Decimal(0)
				   player.n.banked = new Decimal(0)
				   player.n.tax = new Decimal(3)
				   player.n.timeout = new Decimal(0)
				   player.n.currentday = new Decimal(0)
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
			unlocked(){return player.n.upgrades.length >= 29},
			cost: new Decimal(3),
		},
		82: {
			title: "hurt",
			description: "",
			unlocked(){return player.n.upgrades.length >= 29},
			cost: new Decimal(4),
		},
		83: {
			title: "you",
			description: "",
			unlocked(){return player.n.upgrades.length >= 29},
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
    color: "#ffdd33",
	limiter(){return player.m.offer.add(1).log(10).ceil()},
    requires() {return new Decimal(1).times((player.n.unlocked&&!player.m.unlocked)?1071:1)},
    resource: "$", // Name of prestige currency
    baseResource: "negative points", // Name of resource prestige is based on
    baseAmount() {return player.ab.negativePoints}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	tabFormat: {
		"Mango": {
			content: ["main-display", "prestige-button", ["blank", ["0px", "4px"]], ["display-text", function() {return "You have "+format(player.m.mango)+" mangoes"+(player.m.buyables[11].gte(1)?"<br>You have gifted "+formatWhole(player.m.offer)+" mangoes to the man with donut hands":"")}], "blank",["buyables", [10]], "blank", ["buyables", [2]], "blank", "upgrades"],
			unlocked(){return hasUpgrade("m", 13) || player.m.buyables[11].gte(1)}
		},
		"Donut's Apparition Realm": {
			content: [["display-text", function(){return player.m.buyables[11].gte(1)?`<h2 style='font-family: "Aster", sans-serif; opacity: ${(Math.sin(player.a.sine*666)+1)/2}'>EXCELLERATION<br>THE DEAL IS REAL<br>AND SO ARE OUR SOURCE OF DOPAMINE<br>IT IS A PEASANT TO KNOW THAT I'M NOT THE ONLY<br>THAT CAN CO-EXIST WITH THIS...<br>DANKNESS-<br>JUST TAKE THEM AND MOVE UP<br>TO THE DARKNESS THAT GROWS</h2>`:`<h2 style='font-family: "Aster", sans-serif; opacity: ${(Math.sin(player.a.sine*666)+1)/2}'>ENTRY NUMBER SEVENTEEN<br>DARK, DARKER, YET DANKER<br>THE LURKNESS KEEPS GLOWING<br>THE SHADOWS PUTTING DEEPER<br>PHOTOS READINGS NEGATIVE<br>THAT NEXT EXPERIMENTAL<br>SEEMS<br>MERRY<br>VARY<br>INTERNATIONAL<br>...<br>I REQUIRE YOUR ASSIST'S ARCS, VISITOR<br><br>MY MIND HASN'T BEEN QUITE UP-TO-DATE, PER SAY<br>IT HAS BEEN CORRUPTED BY THIS VERY VOID<br>AND THE ONLY WAY TO RESTORE IT<br>IS BY GIVING ME MANGOES<br>...<br>MISSHAPED FORMS ASIDES, MY MIND CAN'T BE FIXATED<br>HOWEVER, WE CAN MAKE GREAT DEALS<br>A PROPOSAL<br>YOU GIFT ME MANGOES<br>IN EXCHANGE OF YOUR SO-CALLED PARKS<br>SO, VISITOR<br>DO YOU DEAL THE SEAL?</h2>`}], "blank", ["buyables", [1]], "blank", "milestones"],
			unlocked(){return hasUpgrade("m", 13) || player.m.buyables[11].gte(1)}
		}
	},
	update(diff){
		player.m.mango = player.m.mango.add(tmp.m.buyables[21].effect.mul(diff))
		if(getResetGain("m").gte(0)) player.m.points = player.m.points.add(Decimal.mul(getResetGain("m"), diff).mul(tmp.m.buyables[23].effect))
	},
    exponent(){return new Decimal(2).div(player.ab.negativePoints.add(1).root(3.2))}, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
		if(hasUpgrade("m", 11)) mult = mult.mul(upgradeEffect("m", 11))
		if(hasUpgrade("m", 22)) mult = mult.mul(upgradeEffect("m", 22))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for mangoes", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.ab.points.gte(5) && !player.ab.nostalgia},
	doReset(resettingLayer){
		if(player.ab.points.gte(5)) {
			player.points = new Decimal(17.77)
			player.ab.negativePoints = new Decimal(0)
		}
		if(tmp[resettingLayer].row > this.row){
			player.m.buyables[11] = new Decimal(0)
			player.m.upgrades = []
			player.m.points = new Decimal(0)
			player.m.mango = new Decimal(0)
			player.m.offer = new Decimal(0)
			player.m.buyables[21] = new Decimal(0)
			player.m.buyables[22] = new Decimal(0)
			player.m.buyables[23] = new Decimal(0)
		}
	},
	buyables: {
		11: {
			title: "Yes",
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
				player.ab.negativePoints = new Decimal(0)
				player.m.upgrades = []
				player.points = new Decimal(17.77)
				player.m.points = new Decimal(0)
				player.m.mango = new Decimal(0)
				player.m.buyables[21] = new Decimal(0)
				player.m.buyables[22] = new Decimal(0)
				player.m.buyables[23] = new Decimal(0)
			},
			style(){return{'height':'120px', 'width':'180px', 'border-radius': '25%', 'border': '4px solid', 'border-color': 'rgba(0, 0, 0, 0.125)'}},
			unlocked(){return player.m.buyables[11].gte(1)}
		},
		21: {
			title(){return "Mango Farm"},
			cost(){return new Decimal(6).mul(Decimal.pow(6, player.m.buyables[this.id])).mul(Decimal.pow(0.8, player.m.buyables[21]))},
			effect(){return player.m.buyables[this.id]},
			sellOne() {
				player.m.buyables[this.id] = player.m.buyables[this.id].sub(1)
			},
			canSellOne() { return player.m.buyables[this.id].gte(1) },
			display(){return `<h3>Generates ${format(this.effect())} mango`+(tmp.m.buyables[this.id].effect.gt(1)?`es`:``)+` per second</h3><br>Amount: ${formatWhole(player.m.buyables[this.id])}/${tmp.m.limiter.sub(player.m.buyables[22]).sub(player.m.buyables[23])}<br>Cost: ${format(this.cost())} mangoes`},
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
			effect(){return new Decimal(1).add(player.m.buyables[this.id])},
			sellOne() {
				player.m.buyables[this.id] = player.m.buyables[this.id].sub(1)
			},
			canSellOne() { return player.m.buyables[this.id].gte(1) },
			display(){return `<h3>Purchases ${formatWhole(this.effect().sub(1).mul(100))}% more mangoes</h3><br>Amount: ${formatWhole(player.m.buyables[this.id])}/${tmp.m.limiter.sub(player.m.buyables[21]).sub(player.m.buyables[23])}<br>Cost: ${format(this.cost())} mangoes`},
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
			effect(){return player.m.buyables[this.id].mul(0.625)},
			sellOne() {
				player.m.buyables[this.id] = player.m.buyables[this.id].sub(1)
			},
			canSellOne() { return player.m.buyables[this.id].gte(1) },
			display(){return `<h3>Produces ${formatWhole(this.effect().mul(100))}% of $ on reset gain</h3><br>Amount: ${formatWhole(player.m.buyables[this.id])}/${tmp.m.limiter.sub(player.m.buyables[21]).sub(player.m.buyables[22])}<br>Cost: ${format(this.cost())} mangoes`},
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
			effect(){let bulk = new Decimal(1)
					 if(hasMilestone("m", 4)) bulk = player.m.points.mul(Decimal.add(1.5, Math.abs(Decimal.mul(Math.sin(player.a.sine.mul(hasMilestone("m", 3)?1:17)), 2.5)))).div(2.5)
				     return bulk.max(1).mul(hasUpgrade("m", 13)?upgradeEffect("m", 13):1).mul(tmp.m.buyables[22].effect).mul(hasUpgrade("m", 21)?upgradeEffect("m", 21):1)},
			cost(){let cost = new Decimal(1.5).add(Math.abs(Decimal.mul(Math.sin(player.a.sine.mul(hasMilestone("m", 3)?1:17)), 2.5)))
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
			description(){return hasMilestone("m", 0)?"You gain more mangoes based on negative points<br>Currently: "+format(this.effect())+"x":"Unlocks new tab"},
			cost: new Decimal(36),
			effect(){return new Decimal(hasMilestone("m", 0)?player.ab.negativePoints.add(1).log(17).add(1).max(1):1)},
			currencyInternalName: "negativePoints",
			currencyDisplayName: "negative points",
			currencyLayer: "ab",
			unlocked(){return (hasUpgrade("m", 11)&&hasUpgrade("m", 12)) || player.m.buyables[11].gte(1)}
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
			description(){return "You gain more points based on negative points"},
			effect(){return player.ab.negativePoints.add(1).log(17).add(1).max(1)},
			effectDisplay(){return format(this.effect())+"x"},
			cost: new Decimal(633),
			currencyInternalName: "negativePoints",
			currencyDisplayName: "negative points",
			currencyLayer: "ab",
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
			unlocked() {return hasMilestone("m", 0)}
		},
		2: {
			requirementDescription: "100 Mangoes",
			effectDescription(){return (hasMilestone("m", 2)?`IT is satisfied.<br>Not much here to say. All I can say is good luck with this one.<br><br>`:``)+`Unlocks Mango buyables<br>(The amount of buyables you can buy depends on the magnitude of sacrificed mangoes)`},
			done() { return player.m.offer.gte(100) },
			unlocked() {return hasMilestone("m", 1)}
		},
		3: {
			requirementDescription: "1,000 Mangoes",
			effectDescription(){return (hasMilestone("m", 3)?`With the power of 1,000 mangoes, you managed to<br>successfully restore IT's mind...<br>As soon as that happened, it'd remember that he messed up<br>Mango's cost function before losing it's mind.<br>IT has vanished just as IT reappeared in mere seconds.<br>No explanation, no logic, nor reasoning behind it...<br>Althought mango's cost has stabilized.<br>IT also remembered it's own name is Gni K... Sorta...uh <br>IT'll remember it's name eventually.<br><br>`:``)+`Mango's cost changes at much slower rate and unlocks 1 row of upgrades`},
			done() { return player.m.offer.gte(1000) },
			unlocked() {return hasMilestone("m", 2)}
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
		points: new Decimal(0),
    }},
    color: "yellow",
    requires: new Decimal("1e600000"), // Can be a function that takes requirement increases into account
	tooltipLocked: "Reach 36,000,000 negative points to unlock<br><h1>(W.I.P)",
	canReset(){return player.ab.negativePoints.gte(tmp.o.requires)},
    resource: "onions", // Name of prestige currency
    baseResource: "negative points", // Name of resource prestige is based on
    baseAmount() {return player.ab.negativePoints}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "o", description: "O: Reset for onions", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	branches: ["n", "m"],
    layerShown(){return player.ab.points.gte(5) && !player.ab.nostalgia},
	doReset(resettingLayer){
		if(player.ab.points.gte(5)) {
			player.points = new Decimal(17.77)
			player.ab.negativePoints = new Decimal(0)
		}
	}
})