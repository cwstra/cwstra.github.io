function sysPreload() {
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
	game.stage.backgroundColor = "#000000";
	var panel;
	slickUI.add(panel = new SlickUI.Element.Panel(8, 8, 150, game.height - 16));
}

function newSystem(sysname, stars,orbitZones,planets,satel,asteroids,capturedPlanets,capturedAsteroids) {
	
}

function sysUpdate() {
	
}

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'solarSystem', {preload: sysPreload, create: sysCreate, update: sysUpdate });
console.log(Phaser.Plugin);
slickUI = this.game.plugins.add(Phaser.Plugin.SlickUI);