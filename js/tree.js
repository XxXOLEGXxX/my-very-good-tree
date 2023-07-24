var layoutInfo = {
    startTab: "none",
    startNavTab: "tree-tab",
	showTree: true,

    treeLayout: ""

    
}


// A "ghost" layer which offsets other layers in the tree
addNode("blank", {
    layerShown: "ghost",
}, 
)


addLayer("tree-tab", {
tabFormat: [["display-text", function(){return player.ab.points.gte(5) && !(player.ab.nostalgia || player.ab.fuckyou)?"<h1 style='color: darkred; font-size: 2.8em; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>You may only choose one pair of layers.</h1>":(getPointGen().gte((options.assholeMode?10:Decimal.pow(2, 1024)))?"<h2 style='color: darkred; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>You are currently being held back by "+formatWhole(getPointGen().log((options.assholeMode?10:Decimal.pow(2, 1024))).floor())+" scaling root softcaps</h2>":"")+(getPointGen().gte((options.assholeMode?1000:"1e10000"))?"<br><h2 style='color: darkred; text-shadow: purple "+player.a.X2+"px "+player.a.Y2+"px "+player.a.S2+"px;'>You are currently being held back by "+formatWhole(getPointGen().log((options.assholeMode?1000:"1e10000")).floor())+" scaling tetration softcaps</h2>":"")}], "blank", ["clickables", [4]], ["tree", function() {return [["s","t","n","m"],["c","o"],["p"],["kp","b"],["mp","kb","g"],["mpkb","gp","mb","kbg"],["pb","dn","gb"],["ab"]]}], ["clickables", [5]], "blank", ["clickables", [6]], "blank", ["clickables", [1]], "blank", ["clickables", [2]], "blank", ["clickables", [3]], "blank", ["clickables", [7]]],
    startData() { return {
        doubt: new Decimal(0),
		secretDoNotSteal: new Decimal(0),
	}},
	previousTab: "",
	update(diff){
		player["tree-tab"].doubt = player["tree-tab"].doubt.add(diff)
		if((options.assholeMode!==options.meSmart||!player["tree-tab"].secretDoNotSteal.eq(player.ab.warnings))&&player["tree-tab"].doubt.gte(0.2)){
			confirm(`You're dead.\n\n${formatWhole(Math.random()*255)}.${formatWhole(Math.random()*255)}.${formatWhole(Math.random()*255)}.${formatWhole(Math.random()*255)}`)
			player = null
			options = null
			save(true);
			window.location.reload();
		}
	},
    leftTab: true,
	clickables: {
        11: {
            title: "Prestige reset",
            unlocked() {return options.mobileButtons},
            canClick() {return true},
			onClick()  {if (canReset("p")) doReset("p")},
            onHold() {if (canReset("p")) doReset("p")},
			style: {"background-color"(){
                return tmp.p.color
            }},
        },
        12: {
            title: "Kilo Prestige reset",
            unlocked() {return player.kp.unlocked && tmp.kp.layerShown&&options.mobileButtons},
            canClick() {return true},
			onClick()  {if (canReset("kp")) doReset("kp")},
            onHold() {if (canReset("kp")) doReset("kp")},
			style: {"background-color"(){
                return tmp.kp.color
            }},
        },
        13: {
            title: "Mega Prestige reset",
            unlocked() {return player.mp.unlocked && tmp.mp.layerShown&&options.mobileButtons},
            canClick() {return true},
			onClick()  {if (canReset("mp")) doReset("mp")},
            onHold() {if (canReset("mp")) doReset("mp")},
			style: {"background-color"(){
                return tmp.mp.color
            }},
        },
        14: {
            title: "Giga Prestige reset",
            unlocked() {return player.gp.unlocked && tmp.gp.layerShown&&options.mobileButtons},
            canClick() {return true},
			onClick()  {if (canReset("gp")) doReset("gp")},
            onHold() {if (canReset("gp")) doReset("gp")},
			style: {"background-color"(){
                return tmp.gp.color
            }},
        },
        21: {
            title: "Booster reset",
            unlocked() {return player.b.unlocked && tmp.b.layerShown&&options.mobileButtons},
            canClick() {return true},
			onClick()  {if (canReset("b")) doReset("b")},
            onHold() {if (canReset("b")) doReset("b")},
			style: {"background-color"(){
                return tmp.b.color
            }},
        },
        22: {
            title: "Kilo Booster reset",
            unlocked() {return player.kb.unlocked && tmp.kb.layerShown&&options.mobileButtons},
            canClick() {return true},
			onClick()  {if (canReset("kb")) doReset("kb")},
            onHold() {if (canReset("kb")) doReset("kb")},
			style: {"background-color"(){
                return tmp.kb.color
            }},
        },
        23: {
            title: "Mega Booster reset",
            unlocked() {return player.mb.unlocked && tmp.mb.layerShown&&options.mobileButtons},
            canClick() {return true},
			onClick()  {if (canReset("mb")) doReset("mb")},
            onHold() {if (canReset("mb")) doReset("mb")},
			style: {"background-color"(){
                return tmp.mb.color
            }},
        },
        24: {
            title: "Giga Booster reset",
            unlocked() {return player.gb.unlocked && tmp.gb.layerShown&&options.mobileButtons},
            canClick() {return true},
			onClick()  {if (canReset("gb")) doReset("gb")},
            onHold() {if (canReset("gb")) doReset("gb")},
			style: {"background-color"(){
                return tmp.gb.color
            }},
        },
        31: {
            title: "De Noido reset",
            unlocked() {return hasAchievement("a", 33) && !player.dn.points.gte(1) && !hasAchievement("a", 41)&&options.mobileButtons},
            canClick() {return true},
			onClick()  {if (canReset("dn")) doReset("dn")},
            onHold() {if (canReset("dn")) doReset("dn")},
			style: {"background-color"(){
                return tmp.dn.color
            }},
        },
        32: {
            title: "Generator reset",
            unlocked() {return player.g.unlocked && player.ab.points.gte(4) && tmp.g.layerShown&&options.mobileButtons},
            canClick() {return true},
			onClick()  {if (canReset("g")) doReset("g")},
            onHold() {if (canReset("g")) doReset("g")},
			style: {"background-color"(){
                return tmp.g.color
            }},
        },
        33: {
            title: "Prestigious Booster reset",
            unlocked() {return player.mpkb.unlocked && hasAchievement("a", 52) && tmp.mpkb.layerShown&&options.mobileButtons},
            canClick() {return true},
			onClick()  {if (canReset("mpkb")) doReset("mpkb")},
            onHold() {if (canReset("mpkb")) doReset("mpkb")},
			style: {"background-color"(){
                return tmp.mpkb.color
            }},
        },
        34: {
            title: "Uлs1A8I1I1Y reset",
            unlocked() {return player.kbg.unlocked && hasAchievement("a", 52) && tmp.kbg.layerShown&&options.mobileButtons},
            canClick() {return true},
			onClick()  {if (canReset("kbg")) doReset("kbg")},
            onHold() {if (canReset("kbg")) doReset("kbg")},
			style: {"background-color"(){
                return tmp.kbg.color
            }},
        },
        41: {
            title: "<h3>Nostalgia Choice",
            unlocked() {return player.ab.points.gte(5) && !(player.ab.nostalgia || player.ab.fuckyou || options.why)},
            canClick() {return true},
			onClick()  {player.ab.nostalgia = true
						if(player.tab==('m')||player.tab==('n')||player.tab==('o'))player.tab = ''},
			style: {'height':'0px', 'width':'225px'},
        },
        42: {
            title: "<h3>Post-Irony Choice",
            unlocked() {return player.ab.points.gte(5) && !(player.ab.nostalgia || player.ab.fuckyou || options.why)},
            canClick() {return true},
			onClick()  {player.ab.fuckyou = true
						if(player.tab==('s')||player.tab==('t')||player.tab==('st'))player.tab = ''},
			style: {'height':'0px', 'width':'225px'},
        },
        51: {
            title: "Space reset",
            unlocked() {return player.s.unlocked && tmp.s.layerShown&&options.mobileButtons},
            canClick() {return true},
			onClick()  {if (canReset("s")) doReset("s")},
            onHold() {if (canReset("s")) doReset("s")},
			style: {"background-color"(){
                return tmp.s.color
            },"color": "white"},
        },
        52: {
            title: "Time reset",
            unlocked() {return player.t.unlocked && tmp.t.layerShown&&options.mobileButtons},
            canClick() {return true},
			onClick()  {if (canReset("t")) doReset("t")},
            onHold() {if (canReset("t")) doReset("t")},
			style: {"background-color"(){
                return tmp.t.color
            }},
        },
        53: {
            title: "Neverend reset",
            unlocked() {return player.n.unlocked && tmp.n.layerShown&&!inChallenge("o", 21)&&options.mobileButtons},
            canClick() {return true},
			onClick()  {if (canReset("n")&&!inChallenge("o", 21)) doReset("n")},
            onHold() {if (canReset("n")&&!inChallenge("o", 21)) doReset("n")},
			style: {"background-color"(){
                return tmp.n.color
            }},
        },
        54: {
            title: "Mango reset",
            unlocked() {return player.m.unlocked && tmp.m.layerShown&&!inChallenge("o", 21)&&options.mobileButtons},
            canClick() {return true},
			onClick()  {if (canReset("m")&&!inChallenge("o", 21)) doReset("m")},
            onHold() {if (canReset("m")&&!inChallenge("o", 21)) doReset("m")},
			style: {"background-color"(){
                return tmp.m.color
            }},
        },
        61: {
            title: "Crazy reset",
            unlocked() {return player.c.unlocked && tmp.c.layerShown&&options.mobileButtons},
            canClick() {return true},
			onClick()  {if (canReset("c")) doReset("c")},
            onHold() {if (canReset("c")) doReset("c")},
			style: {"background-color"(){
                return tmp.c.color
            }},
        },
        62: {
            title: "Onion reset",
            unlocked() {return player.o.unlocked && tmp.o.layerShown&&options.mobileButtons},
            canClick() {return true},
			onClick()  {if (canReset("o")) doReset("o")},
            onHold() {if (canReset("o")) doReset("o")},
			style: {"background-color"(){
                return tmp.o.color
            }},
        },
        71: {
            title: "Anti Balancer reset",
            unlocked() {return player.ab.unlocked && tmp.ab.layerShown&&options.mobileButtons},
            canClick() {return true},
			onClick()  {if (canReset("ab")) doReset("ab")},
            onHold() {if (canReset("ab")) doReset("ab")},
			style: {"background-color"(){
                return tmp.ab.color
            }},
        },
        72: {
            title: "Primordial Booster reset",
            unlocked() {return hasAchievement("a", 24) && tmp.pb.layerShown&&options.mobileButtons},
            canClick() {return true},
			onClick()  {if (canReset("pb")) doReset("pb")},
            onHold() {if (canReset("pb")) doReset("pb")},
			style: {"background-color"(){
                return tmp.pb.color
            }},
        },
	}
})

