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
    tabFormat: [["tree", function() {return (layoutInfo.treeLayout ? layoutInfo.treeLayout : TREE_LAYERS)}], "clickables"],
    previousTab: "",
    leftTab: true,
	clickables: {
        11: {
            title: "Prestige reset",
            unlocked() {return true},
            canClick() {return true},
			onClick()  {if (canReset("p")) doReset("p")},
            onHold() {if (canReset("p")) doReset("p")},
			style: {"background-color"(){
                return tmp.p.color
            }},
        },
        12: {
            title: "Kilo Prestige reset",
            unlocked() {return player.kp.unlocked},
            canClick() {return true},
			onClick()  {if (canReset("kp")) doReset("kp")},
            onHold() {if (canReset("kp")) doReset("kp")},
			style: {"background-color"(){
                return tmp.kp.color
            }},
        },
        13: {
            title: "Mega Prestige reset",
            unlocked() {return player.mp.unlocked},
            canClick() {return true},
			onClick()  {if (canReset("mp")) doReset("mp")},
            onHold() {if (canReset("mp")) doReset("mp")},
			style: {"background-color"(){
                return tmp.mp.color
            }},
        },
        14: {
            title: "Giga Prestige reset",
            unlocked() {return player.gp.unlocked},
            canClick() {return true},
			onClick()  {if (canReset("gp")) doReset("gp")},
            onHold() {if (canReset("gp")) doReset("gp")},
			style: {"background-color"(){
                return tmp.gp.color
            }},
        },
        21: {
            title: "Booster reset",
            unlocked() {return player.b.unlocked},
            canClick() {return true},
			onClick()  {if (canReset("b")) doReset("b")},
            onHold() {if (canReset("b")) doReset("b")},
			style: {"background-color"(){
                return tmp.b.color
            }},
        },
        22: {
            title: "Kilo Booster reset",
            unlocked() {return player.kb.unlocked},
            canClick() {return true},
			onClick()  {if (canReset("kb")) doReset("kb")},
            onHold() {if (canReset("kb")) doReset("kb")},
			style: {"background-color"(){
                return tmp.kb.color
            }},
        },
        23: {
            title: "Mega Booster reset",
            unlocked() {return player.mb.unlocked},
            canClick() {return true},
			onClick()  {if (canReset("mb")) doReset("mb")},
            onHold() {if (canReset("mb")) doReset("mb")},
			style: {"background-color"(){
                return tmp.mb.color
            }},
        },
        24: {
            title: "Giga Booster reset",
            unlocked() {return player.gb.unlocked},
            canClick() {return true},
			onClick()  {if (canReset("gb")) doReset("gb")},
            onHold() {if (canReset("gb")) doReset("gb")},
			style: {"background-color"(){
                return tmp.gb.color
            }},
        },
        31: {
            title: "De Noido reset",
            unlocked() {return player.dn.unlocked && !player.dn.points.gte(1) && !hasAchievement("a", 41)},
            canClick() {return true},
			onClick()  {if (canReset("dn")) doReset("dn")},
            onHold() {if (canReset("dn")) doReset("dn")},
			style: {"background-color"(){
                return tmp.dn.color
            }},
        },
        32: {
            title: "Generator reset",
            unlocked() {return player.g.unlocked && player.ab.points.gte(4)},
            canClick() {return true},
			onClick()  {if (canReset("g")) doReset("g")},
            onHold() {if (canReset("g")) doReset("g")},
			style: {"background-color"(){
                return tmp.g.color
            }},
        },
        33: {
            title: "Prestigious Booster reset",
            unlocked() {return player.mpkb.unlocked && hasAchievement("a", 52)},
            canClick() {return true},
			onClick()  {if (canReset("mpkb")) doReset("mpkb")},
            onHold() {if (canReset("mpkb")) doReset("mpkb")},
			style: {"background-color"(){
                return tmp.mpkb.color
            }},
        },
        34: {
            title: "Uлs1A8I1I1Y reset",
            unlocked() {return player.kbg.unlocked && hasAchievement("a", 52)},
            canClick() {return true},
			onClick()  {if (canReset("kbg")) doReset("kbg")},
            onHold() {if (canReset("kbg")) doReset("kbg")},
			style: {"background-color"(){
                return tmp.kbg.color
            }},
        },
        71: {
            title: "Anti Balancer reset",
            unlocked() {return player.ab.unlocked},
            canClick() {return true},
			onClick()  {if (canReset("ab")) doReset("ab")},
            onHold() {if (canReset("ab")) doReset("ab")},
			style: {"background-color"(){
                return tmp.ab.color
            }},
        },
        72: {
            title: "Primordial Booster reset",
            unlocked() {return hasAchievement("a", 24)},
            canClick() {return true},
			onClick()  {if (canReset("pb")) doReset("pb")},
            onHold() {if (canReset("pb")) doReset("pb")},
			style: {"background-color"(){
                return tmp.pb.color
            }},
        },
	}
})

