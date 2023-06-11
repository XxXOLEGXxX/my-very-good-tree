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
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1).add(upgradeRow("p", "1", true)).add(upgradeRows("kp", 1, true, 2)).add(upgradeRows("mp", 1, true, 3)).add(upgradeRows("gp", 1, true, 4))
		if(player.ab.points.gte(3)) mult = mult.times(0.75)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
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
		if(tmp[resettingLayer].row >= 1) {
			player.p.points = new Decimal(0)
			player.p.upgrades = []
		}
		if(player.ab.points>=2) player.ab.negativePoints = new Decimal(10)
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
    row: 1, // Row the layer is in on the tree (0 is the first row)
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
    row: 1, // Row the layer is in on the tree (0 is the first row)
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
    row: 2, // Row the layer is in on the tree (0 is the first row)
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
		if((!hasMilestone("mpkb", 0)&&tmp[resettingLayer].row>this.row) || tmp[resettingLayer].row>=4) {
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
    row: 2, // Row the layer is in on the tree (0 is the first row)
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
    row: 3, // Row the layer is in on the tree (0 is the first row)
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
    row: 3, // Row the layer is in on the tree (0 is the first row)
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
		spentPoints: new Decimal(0)
    }},
    color: "#006080",
    requires() {let goal = new Decimal(5).mul(Decimal.pow(10, player.ab.points))
				if(hasAchievement("a", 53)&&player.ab.points.lt(5)) goal = new Decimal(21)
				return goal}, // Can be a function that takes requirement increases into account
    resource: "anti balancers", // Name of prestige currency
    baseResource: "giga prestige points", // Name of resource prestige is based on
    baseAmount() {return (hasAchievement("a", 53)&&player.ab.points.lt(5))?player.gb.points:player.gp.points}, // Get the current amount of baseResource
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
		if(player.ab.negativePoints.gt(0)) player.ab.negativePoints = player.ab.negativePoints.sub(Decimal.mul(getBypassedPointGen(), diff)).max(0)
		if(player.ab.points.gte(0)) modInfo.name = "Oleg's Terrible Idea: The Tree"
		if(player.ab.points.gte(1)) modInfo.name = "Oleg's Very Terrible Idea: The Tree"
		if(player.ab.points.gte(2)) modInfo.name = "Oleg's Very Very Terrible Idea: The Tree"
		if(player.ab.points.gte(3)) modInfo.name = "Oleg's Very Very Very Terrible Idea: The Tree"
		if(player.ab.points.gte(4)) modInfo.name = "Oleg's Very Very Very Very Terrible Idea: The Tree"
		if(player.ab.points.gte(5)) modInfo.name = "Oleg's Very Very Very Very Terrible Idea: The Tree"
		if(player.ab.points.gte(3)&&player.points.gte(0)) player.points = player.points.sub(Decimal.mul(player.points, diff).div(20))
		player.ab.shopPoints = new Decimal(player.ab.points).sub(player.ab.spentPoints)
		if(player.ab.points.gte(4)) tmp.ab.color = (new Decimal(Math.random()).gte(0.25))?"darkred":"purple"
	},
	tooltipLocked(){return "Reach 10 giga prestige points to unlock (You have "+formatWhole(player.gp.points)+" giga prestige points)"},
	tabFormat: {
		"MiaN sTUFF": {
			content: ["main-display", "prestige-button", "blank", ["display-text", function() {return (player.ab.points>=4?"<span style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>":"")+"Current Mode: "+getMode()+"<br><br>"+(player.ab.points.lt(4)?"Next Mode: "+getMode()+"-":"")}], "blank",
					 ["display-text", function() {return (player.ab.points>=5?"<span style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>[NG-----]<br>screw you<br>>;(<br>":"")+(player.ab.points>=4?"<span style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>[NG----]<br>-Balancers nerf each other<br>-NG- is applied twice.<br>-Upgrades scale each other based on bought upgrades in each layer.<br>":"")+(player.ab.points>=3?"[NG---]<br>-No more de noido. Ever. Peroid. I don't want to hear anything related to that yellow bastard coming out of YOUR MOUTH. I'll personally find your IP address and hit you with a fucking skateboard if I ever sense the very CONCEPT of it within your smooth, loose brain, since you think this is so funny to you...<br>-You gain 25% less of all prestige points<br>-You lose 5% of points every second<br>":"")+(player.ab.points>=2?"[NG--]<br>-Every reset brings you back to -10 points<br>-Booster's exponent is 20% bigger<br>":"")+(player.ab.points>=1?"[NG-]<br>-Divides point gain by 4":"")}]],
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
			doReset(this.layer, true)
		},
		11: {
			title: "Additional Balance",
			cost() { return new Decimal(1).mul(player.ab.buyables[11].mag+1) },
			effect(x) { let eff = new Decimal(player.ab.buyables[11].mag).pow(player.ab.buyables[11].mag).sub(!(player.ab.buyables[11].mag==0)?0:1)
						if(player.ab.points.gte(4)) eff = eff.sub(new Decimal(player.ab.buyables[12]).add(player.ab.buyables[13]).add(player.ab.buyables[14])).max(0)
						return eff},
			display() { return "Cost: "+format(this.cost())+" balancing points<br>Amount: "+formatWhole(player.ab.buyables[11])+"<br>Boosts point gain by +"+format(this.effect()) },
			canAfford() { return player[this.layer].shopPoints.gte(this.cost()) },
			buy() {
				player[this.layer].spentPoints = player[this.layer].spentPoints.add(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
		},
		12: {
			title: "Multiplicative Balance",
			cost() { return new Decimal(1).mul(player.ab.buyables[12].mag+1) },
			effect(x) { let eff = new Decimal(2).pow(player.ab.buyables[12].mag)
						if(player.ab.points.gte(4)) eff = eff.div(new Decimal(player.ab.buyables[11]).add(player.ab.buyables[13]).add(player.ab.buyables[14]).add(1)).max(1)
						return eff},
			display() { return "Cost: "+format(this.cost())+" balancing points<br>Amount: "+formatWhole(player.ab.buyables[12])+"<br>Boosts point gain by x"+format(this.effect()) },
			canAfford() { return player[this.layer].shopPoints.gte(this.cost()) },
			buy() {
				player[this.layer].spentPoints = player[this.layer].spentPoints.add(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
		},
		13: {
			title: "Exponential Balance",
			cost() { return new Decimal(1).mul(player.ab.buyables[13].mag+1) },
			effect(x) { let eff = new Decimal(1.1).pow(player.ab.buyables[13].mag)
						if(player.ab.points.gte(4)) eff = eff.root(new Decimal(player.ab.buyables[11]).add(player.ab.buyables[12]).add(player.ab.buyables[14]).add(1)).max(1)
						return eff },
			display() { return "Cost: "+format(this.cost())+" balancing points<br>Amount: "+formatWhole(player.ab.buyables[13])+"<br>Boosts point gain by ^"+format(this.effect()) },
			canAfford() { return player[this.layer].shopPoints.gte(this.cost()) },
			buy() {
				player[this.layer].spentPoints = player[this.layer].spentPoints.add(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
		},
		14: {
			title: "Tetrational Balance",
			cost() { return new Decimal(1).mul(player.ab.buyables[14].mag+1) },
			effect(x) { let eff = new Decimal(player.ab.buyables[14].mag)
						if(player.ab.points.gte(4)) eff = eff.max(1).log(new Decimal(player.ab.buyables[11]).add(player.ab.buyables[12]).add(player.ab.buyables[13]).add(2))
						return eff.div(100).add(1) },
			display() { return "Cost: "+format(this.cost())+" balancing points<br>Amount: "+formatWhole(player.ab.buyables[14])+"<br>Boosts point gain by ^^"+format(this.effect()) },
			canAfford() { return player[this.layer].shopPoints.gte(this.cost()) },
			buy() {
				player[this.layer].spentPoints = player[this.layer].spentPoints.add(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
		},	
	},
	branches: ["gp"],
    row: 5, // Row the layer is in on the tree (0 is the first row)        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    layerShown(){return player.gp.upgrades.length >= 3 || hasAchievement("a", 14)},
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
    row: 4, // Row the layer is in on the tree (0 is the first row)
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
    row: 4, // Row the layer is in on the tree (0 is the first row)
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
    row: 4, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "d", description: "d: noise to de noido", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
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
    row: 2,
	branches: ["kp", "b"],
    layerShown(){return hasAchievement("a", 45)},
	doReset(resettingLayer){
		if((!hasMilestone("kbg", 0)&&tmp[resettingLayer].row>this.row) || tmp[resettingLayer].row>=4) {
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
    row: 3,
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
        {key: "u", unlocked() {return hasAchievement("a", 52)}, description: "U: Reset for Uлs1A8I1I1Y", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
})

addLayer("mpkb", {
    name: "mpkb", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "BP", // This appears on the layer's node. Default is the id with the first letter capitalized
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
    row: 3,
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
		bestSet1: false,
		bestSet2: false,
		sine: new Decimal(0),
		thirtyTwoS: new Decimal(0),
		thirtyTwoX: new Decimal(0),
		thirtyTwoY: new Decimal(0),
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
	},
    layerShown(){return true},
	tooltip: "Achievements",
	tabFormat: [["display-text", function() {return "You currently have <h3 style='color: yellow; text-shadow: #7f78c4 0px 0px 10px;'>"+formatWhole(player.a.achievements.length)+"<h3/> out of <h3 style='color: yellow; text-shadow: #7f78c4 0px 0px 10px;'>30<h3/> achievements." }], "blank", "blank", "achievements"],
	achievements: {
		11: {
			name: "Welcome",
			done(){return player.p.points.gte(1)},
			tooltip: "Perform a prestige reset.",
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		12: {
			name: "to",
			done(){return player.kp.points >=1},
			tooltip: "Perform a kilo prestige reset.",
			unlocked(){return hasAchievement("a", 11)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		13: {
			name: "your",
			done(){return player.mp.points >=1},
			tooltip: "Perform a mega prestige reset.",
			unlocked(){return hasAchievement("a", 12)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		14: {
			name: "worst",
			done(){return player.gp.points >=1},
			tooltip: "Perform a giga prestige reset.",
			unlocked(){return hasAchievement("a", 13)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		15: {
			name(){return hasAchievement("a", 15)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:(player.ab.points.gte(4)?player.a.Y2:player.a.Y))+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>nightmare.<h3/>":"AAAUGJRUOGJRO WHAT THE FUCK!!?!? WHAT THE FUCK IS THAT?!"},
			done(){return player.ab.points >=1},
			tooltip(){return hasAchievement("a", 15)?"Perform an... anti balance reset?<br><h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>Reward: There is no reward.<h3/>":"Perform an... anti balance reset?"},
			unlocked(){return hasAchievement("a", 14)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		21: {
			name: "ROW! ROW! FIGHT THE POWER!",
			done(){return player.p.upgrades.length >=3 && player.ab.points >=1},
			tooltip: "Purchase 3 prestige upgrades in NG- mode.",
			unlocked(){return hasAchievement("a", 15)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		22: {
			name(){return hasAchievement("a", 22)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>I pity you.<h3/>":"Kilo-Mega Prestige"},
			done(){return player.gp.points >=1 && player.ab.points >=1},
			tooltip(){return hasAchievement("a", 22)?"Perform a giga prestige reset in NG- mode.<br><h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>Reward: Not all 'Reward' are supposed to be disappointing, after all. Unlocks Booster layer.<h3/>":"Perform a giga prestige reset in NG- mode."},
			unlocked(){return hasAchievement("a", 15)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		23: {
			name: "Game Changer",
			done(){return upgradeRow("kp", 2, true) >= 1 && player.ab.points >=1},
			tooltip: "Purchase 2nd row kilo prestige upgrade in NG- mode.",
			unlocked(){return hasAchievement("a", 15)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		24: {
			name(){return (hasAchievement("a", 25))?(player.gp.points.add(getResetGain("gp"))>=100||hasAchievement("a", 31))?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>OnlY 90 mOrE tO gO lmfAAAAAAAO.<h3/>":(player.gp.points.add(getResetGain("gp"))>=95)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>^-^👍<h3/>":(player.gp.points.add(getResetGain("gp"))>=90)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>._.=≡⊐-<h3/>":(player.gp.points.add(getResetGain("gp"))>=85)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>._.⋗⨿∫≅=≡⊐-<h3/>":(player.gp.points.add(getResetGain("gp"))>=80)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>'-'⋗⨿∫≅=≡⊐-<h3/>":(player.gp.points.add(getResetGain("gp"))>=75)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>* ¬*⨿∫≅=≡⊐-<h3/>":(player.gp.points.add(getResetGain("gp"))>=70)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>* ¬*∫≅=≡⊐-<h3/>":(player.gp.points.add(getResetGain("gp"))>=70)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>ò ¬ó∫≅=≡⊐-<h3/>":(player.gp.points.add(getResetGain("gp"))>=65)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>ò ¬ó≅=≡⊐-<h3/>":(player.gp.points.add(getResetGain("gp"))>=65)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>ò ¬ó=≡⊐-<h3/>":(player.gp.points.add(getResetGain("gp"))>=60)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>ò ¬ó≡⊐-<h3/>":(player.gp.points.add(getResetGain("gp"))>=55)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>ò ¬ó⊐-<h3/>":(player.gp.points.add(getResetGain("gp"))>=50)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>ò¬ó-<h3/>":(player.gp.points.add(getResetGain("gp"))>=45)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>ò¬ó<h3/>":(player.gp.points.add(getResetGain("gp"))>=40)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br><br>>;[<h3/>":(player.gp.points.add(getResetGain("gp"))>=35)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br><br>>;[<h3/>":(player.gp.points.add(getResetGain("gp"))>=30)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br><br><br>>;[<h3/>":(player.gp.points.add(getResetGain("gp"))>=25)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br><br><br>>;[<h3/>":hasAchievement("a", 25)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>HEY! Not cool, bro...<br>>;[<h3/>":hasAchievement("a", 24)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>OnlY 90 mOrE tO gO lmfAAAAAAAO.<h3/>":"Only 90 more to go":hasAchievement("a", 24)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>OnlY 90 mOrE tO gO lmfAAAAAAAO.<h3/>":"Only 90 more to go"},
			done(){return player.gp.points >= 10 && player.ab.points >=1},
			tooltip(){return hasAchievement("a", 24)?"Reach 10 giga prestige points in NG- mode.<br><h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>Reward: I'm sorry, but this is the funniest thing I've ever seen in this week. Unlocks Primordial Boosters<h3/>":"Reach 10 giga prestige points in NG- mode."},
			unlocked(){return hasAchievement("a", 15)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		25: {
			name(){return (hasAchievement("a", 25))?(hasAchievement("a", 33))?"This achievement is -20% cooler than the previous one<br>;]":(player.gp.points.add(getResetGain("gp"))>=100||hasAchievement("a", 31))?"This achievement is -20% cooler than the previous one<br><br><br>;]":(player.gp.points.add(getResetGain("gp"))>=95)?"This achievement is -20% cooler than the previous one<br><br><br>': ]":(player.gp.points.add(getResetGain("gp"))>=90)?"This achievement is -20% cooler than the previous one<br><br><br>': |":(player.gp.points.add(getResetGain("gp"))>=85)?"This achievement is -20% cooler than the previous one<br><br><br>':|":(player.gp.points.add(getResetGain("gp"))>=80)?"This achievement is -20% cooler than the previous<br>':|":(player.gp.points.add(getResetGain("gp"))>=75)?"This achievement is':|0% cooler than the previous one":(player.gp.points.add(getResetGain("gp"))>=70)?"This achievement is 20% cooler than the previous<br>':|":(player.gp.points.add(getResetGain("gp"))>=65)?"This achievement is 20% cooler than the previous one<br><br><br>':|":(player.gp.points.add(getResetGain("gp"))>=60)?"This achievement is 20% cooler than the previous one<br><br><br>': |":(player.gp.points.add(getResetGain("gp"))>=55)?"This achievement is 20% cooler than the previous one<br><br><br>: |":(player.gp.points.add(getResetGain("gp"))>=50)?"This achievement is 20% cooler than the previous one<br><br><br>>: ]":(player.gp.points.add(getResetGain("gp"))>=20||hasAchievement("a", 25))?"This achievement is 20% cooler than the previous one<br><br><br>>:]":(player.gp.points.add(getResetGain("gp"))>=15)?"This achievement is 20% cooler than the previous one >:]":"This achievement is 20% cooler >:]":(player.gp.points.add(getResetGain("gp"))>=20||hasAchievement("a", 25))?"This achievement is 20% cooler than the previous one<br><br><br>>:]":(player.gp.points.add(getResetGain("gp"))>=15)?"This achievement is 20% cooler than the previous one >:]":"This achievement is 20% cooler >:]"},
			done(){return player.gp.points >=20 && player.ab.points >=1},
			tooltip: "Reach 20 giga prestige points in NG- mode<br>Reward: Upgrades are cheaper based on themselves that use the same currency.",
			unlocked(){return hasAchievement("a", 15)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		31: {
			name(){return hasAchievement("a", 31)?"Speaking of cretin...":(player.gp.points.add(getResetGain("gp"))>=100)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>Alright, I'm done with this cretin. >:[<h3/>":""},
			done(){return player.ab.points >= 2},
			tooltip(){return (player.gp.points.add(getResetGain("gp"))>=100||hasAchievement("a", 31))?"Perform an anti balance reset. Again. Reward: Each anti-balance unlocks new booster layer. Also unlocks the shop.":" "},
			unlocked(){return hasAchievement("a", 25)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		32: {
			name(){return hasAchievement("a", 32)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>I knew I shouldn't have nerfed NG-.<h3/>":"So soon already?!"},
			done(){return player.kb.points >= 1},
			tooltip(){return hasAchievement("a", 32)?"Perform a kilo booster reset.<br><h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.thirtyTwoX.add(player.a.X2):player.a.thirtyTwoX)+"px "+(player.ab.points.gte(4)?player.a.thirtyTwoY.add(player.a.Y2):player.a.thirtyTwoY)+"px "+(player.ab.points.gte(4)?player.a.thirtyTwoS.add(player.a.S2):player.a.thirtyTwoS)+"px;'>Reward: FUCK OFF<h3/>":"Perform a kilo booster reset."},
			unlocked(){return hasAchievement("a", 31)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		33: {
			name(){return hasAchievement("a", 33)?"<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>U mad mobile?<br><br>i didn't really mean that btw<br>。_。<h3/>":"Heaven's Gift"},
			done(){return player.gp.points >= 200 && player.ab.points.gte(2)},
			tooltip(){return hasAchievement("a", 33)?"Reach 200 mega prestige points.<br><h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>Reward: uhhhh de noido<h3/>":"Reach 200 mega prestige points."},
			unlocked(){return hasAchievement("a", 31)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		34: {
			name(){return "<h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+(player.ab.points.gte(4)?player.a.X2:player.a.X)+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>This De Noido is pissing me off.<h3/>"},
			done(){return player.dn.pogos.gte(1)},
			tooltip(){return hasAchievement("a", 34)?"Reach 1 pogo.<br><h3 style='color: "+(player.ab.points.gte(4)?"darkred":"red")+"; font-size: 1em; text-shadow: "+(player.ab.points.gte(4)?"purple":"red")+" "+player.a.X+"px "+(player.ab.points.gte(4)?player.a.Y2:player.a.Y)+"px "+(player.ab.points.gte(4)?player.a.S2:player.a.S)+"px;'>Reward: Let me create an upgrade, just for you.<h3/>":"Reach 1 pogo."},
			unlocked(){return hasAchievement("a", 33)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		35: {
			name(){return "<h3 style='color: yellow;, font-family: 'Comic Sans MS';'>PARADOXICAL ANAL BULLSHITERY<h3/>"},
			done(){return player.dn.points.gte(2)},
			tooltip(){return "<span style='color: yellow;, font-family: 'Comic Sans MS';'>Reach 2 de noidos.<br>Reward: start running.<span/>"},
			unlocked(){return hasUpgrade("dn", 11)||hasAchievement("a", 35)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'yellow':'#bf8f8f')}}
		},
		41: {
			name: "Never Again",
			done(){return player.ab.points >=3},
			tooltip: "Perform an anti balance reset for the third time.",
			unlocked(){return hasAchievement("a", 35)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		42: {
			name: "Seems Familiar",
			done(){return player.mb.points >=1},
			tooltip: "Perform a mega booster reset.",
			unlocked(){return hasAchievement("a", 41)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		43: {
			name: "Hell Awaits",
			done(){return upgradeRow("mp", 3, true) >= 1 && player.ab.points >=3},
			tooltip: "Purchase 3rd row mega prestige upgrade in NG--- mode.",
			unlocked(){return hasAchievement("a", 41)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		44: {
			name: "Full Set",
			done(){return player.gp.upgrades.length + player.mp.upgrades.length + player.kp.upgrades.length + player.p.upgrades.length >= 30},
			tooltip: "Purchase all 30 upgrades in NG--- mode.",
			unlocked(){return hasAchievement("a", 43)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		45: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>I've let you live long enough.<h3/>"},
			done(){return player.ab.points.gte(4)},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Perform an anti balance reset for the fourth time."},
			unlocked(){return hasAchievement("a", 44)},
			style(){return {'background-color': (hasAchievement("a",this.id)?(player.ab.points.gte(4)?'#BF5F5F':'#77BF5F'):'#bf8f8f')}}
		},
		51: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>It was a misinput MISINPUT CALM DOWN YOU CALM THE FUCK DOWN THERE WAS A MISINPUT.<h3/>"},
			done(){return player.g.points.gte(1) && player.ab.points.gte(4)},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Perform a generator reset...<br><br>Oops."},
			unlocked(){return hasAchievement("a", 45)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'#BF5F5F':'#bf8f8f')}}
		},
		52: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>"+(hasAchievement("a", 52)?"oh no":"This is it.")+"<h3/>"},
			done(){return player.gp.points.gte(1) && player.ab.points.gte(4)},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>"+(hasAchievement("a", 52)?"oh god no<br><br>no wait the fu-<br><br>I LITERALLY JUST BLINKED HOW DID YOU GET THOSE LAYERS ALREADY?!":"Perform a giga prestige reset. Cutely.")},
			unlocked(){return hasAchievement("a", 45)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'#BF5F5F':'#bf8f8f')}}
		},
		53: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Disastrous Gameplay.<h3/>"},
			done(){return player.mpkb.points.gte(1) || player.kbg.points.gte(1)},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Perform Prestigious Booster or Unstability reset<br>Reward: Two can play this game."},
			unlocked(){return hasAchievement("a", 45)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'#BF5F5F':'#bf8f8f')}}
		},
		54: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Hehehehehe. That should hold 'em alright<h3/>"},
			done(){return player.pb.points.gte(1) && player.ab.points.gte(4)},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Perform a Primordial Booster reset in NG---- mode<br>Unintended Reward: You can reset Primordial Booster's stored boosters"},
			unlocked(){return hasAchievement("a", 45)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'#BF5F5F':'#bf8f8f')}}
		},
		55: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Is it even wortht grinding anymore?<h3/>"},
			done(){return player.gb.points.gte(2)},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Reach 2 giga boosters"},
			unlocked(){return hasAchievement("a", 45)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'#BF5F5F':'#bf8f8f')}}
		},
		16: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>STOP.<h3/>"},
			done(){return player.gp.points.gte(100000)},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Reach 100,000 giga prestige points.<br>Reward: Giga Prestige Point gain is doubled."},
			unlocked(){return hasAchievement("a", 55)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'#BF5F5F':'#bf8f8f')}}
		},
		26: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Primordial Rage.<h3/>"},
			done(){return player.gp.points.gte(1000000)},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Reach 1,000,000 giga prestige points.<br>Reward: Giga Boosters no longer reset anything."},
			unlocked(){return hasAchievement("a", 55)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'#BF5F5F':'#bf8f8f')}}
		},
		36: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>I didn't know it was even possible to go THIS far...<h3/>"},
			done(){return player.points.gte("1e1000")},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Reach 1e1000 points."},
			unlocked(){return hasAchievement("a", 55)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'#BF5F5F':'#bf8f8f')}}
		},
		46: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>That's twice the amount required to buy max generators!<h3/>"},
			done(){return player.g.points.gte(30)},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Reach 30 generators.Reward: You generate 1 generator per second."},
			unlocked(){return hasAchievement("a", 55)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'#BF5F5F':'#bf8f8f')}}
		},
		56: {
			name(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>You've gone way too far<h3/>"},
			done(){return player.points.gte("1e10000")},
			tooltip(){return "<h3 style='color: darkred; font-size: 1em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>Reach 1e10000 points. Reward: (softcapped)"},
			unlocked(){return hasAchievement("a", 55)},
			style(){return {'background-color': (hasAchievement("a",this.id)?'#BF5F5F':'#bf8f8f')}}
		},
	},
})