var game = new Phaser.Game('100%', '100%', Phaser.AUTO, 'solarSystem', {preload: sysPreload, resize:sysResize, create: sysCreate, update: sysUpdate });

var slickUI;
function sysPreload() {
	slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
	slickUI.load('../ui/kenney.json');
	
	game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
	
	game.load.image("belt","../images/asteroid_belt.png");
	game.load.image("major","../images/major_rings.png");
	game.load.image("minor","../images/minor_rings.png");
	game.load.image("p1","../images/planet1.png");
	game.load.image("p2","../images/planet2.png");
	game.load.image("p3","../images/planet3.png");
	game.load.image("p4","../images/planet4.png");
	game.load.image("p5","../images/planet5.png");
	game.load.image("p6","../images/planet6.png");
	game.load.image("p7","../images/planet7.png");
	game.load.image("p8","../images/planet8.png");
	game.load.image("p9","../images/planet9.png");
	game.load.image("p10","../images/planet10.png");
	game.load.image("p11","../images/planet11.png");
	game.load.image("p12","../images/planet12.png");
	game.load.image("p13","../images/planet13.png");
	game.load.image("p14","../images/planet14.png");
	game.load.image("p15","../images/planet15.png");
	game.load.image("p16","../images/planet16.png");
	game.load.image("star","../images/star.png");
}

function sysCreate() {
	/*slickUI stuff
	var i; for (i in slickUI){
		if (slickUI.hasOwnProperty(i)){
			console.log(i);
		}
	}
	var panel, button;
	slickUI.add(panel = new SlickUI.Element.Panel(game.width - 156, 8, 150, game.height - 16));
	panel.add(new SlickUI.Element.Text(10,0, "Information Panel")).centerHorizontally().text.alpha = 0.5;
    panel.add(button = new SlickUI.Element.Button(0,game.height - 166, 140, 80)).events.onInputUp.add(function () {
    	console.log('Clicked save game');
    });
	panel.add(button = new SlickUI.Element.Button(0,0, 140, 80));
	button.add(new SlickUI.Element.Text(0,0, "My button")).center();*/
	
	button = new SlickUI.Element.Button(game.width/4,game.width/4,game.width/2,game.width/2)
	button.events.onInputUp.add(function () {
            generate();
    });
    button.add(new SlickUI.Element.Text(0,0, "Generate")).center();
        
	game.stage.backgroundColor = "#000000";
}

function newSystem(sysname, stars,orbitZones,planets,satel,asteroids,capturedPlanets,capturedAsteroids) {
	function starTint(letter){
		switch(letter){
			case "dA":
			case "A":
				return 0xffffff;
			case "dF":
			case "F":
				return 0xfff5c3;
			case "dG":
			case "G":
				return 0xffff00;
			case "dF":
			case "F":
				return 0xffa500;
			case "dM":
			case "M":
				return 0xff0000;
		}
	}
	console.log("Here")
	game.world.removeAll();
	
	var panel;
	slickUI.add(panel = new SlickUI.Element.Panel(game.width/4,10,game.width/2,30));
	console.log(["Panel",panel])
	panel.add(new SlickUI.Element.Text(10,0, sysname + " System")).centerHorizontally().text.alpha = 0.5;
	//for ()
}

function sysResize(){
	
}

function sysUpdate() {
	
}