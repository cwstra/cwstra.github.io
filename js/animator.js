var game = new Phaser.Game('100%', '100%', Phaser.AUTO, 'solarSystem', {preload: sysPreload, resize:sysResize, create: sysCreate, update: sysUpdate ,render:render});
game.global = {t:0,scale:100,point:new Phaser.Point(0,0)}
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
	game.load.image("star","../images/star.png",250,250);
	this.t;
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
	
	game.stage.backgroundColor = "#000000";
    game.physics.startSystem(Phaser.Physics.ARCADE);
}

function newSystem(sysname,starList,orbitZones,planets,satel,asteroids,capturedPlanets,capturedAsteroids) {
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
			case "dK":
			case "K":
				return 0xffa500;
			case "dM":
			case "M":
				return 0xff0000;
		}
	}
	var scale = game.global.scale;
	
	game.world.removeAll();
	
	//stars.enableBody = true;
	
	var max = 1; var primeStar;
	primeStar = game.add.sprite(0,0,'star');
	primeStar.name = starList[0][0];
	primeStar.classification = starList[0][5];
	primeStar.range = starList[0][3];
	game.physics.enable(primeStar);
	if (primeStar.range*scale>max){
		max = primeStar.range*scale;
	}
	primeStar.tint = starTint(starList[0][1]);
	primeStar.anchor.x = .5;
	primeStar.anchor.y = .5;
	var i,star; for (i=1;i<starList.length;i++){
		primeStar.addChild(star = game.make.sprite(0,0,'star'));
		star.name = starList[i][0];
		star.classification = starList[i][5];
		star.range = starList[i][3];
		game.physics.enable(star);
		star.anchor.x = .5;
		star.anchor.y = .5;
		star.orbit = [];
		star.orbit.radius = bode(starList[i][4])*scale;
		if (star.orbit.radius>max){
			max = star.orbit.radius;
		}
		star.orbit.offset = Math.random()*2*Math.PI;
		star.x = star.orbit.radius*Math.cos(star.orbit.offset);
		star.y = star.orbit.radius*Math.sin(star.orbit.offset);
		star.tint = starTint(starList[i][1]);
	}
	console.log(2*Math.ceil(max*1.1)+1);
	game.world.setBounds(0,0,2*Math.ceil(max*1.1)+1,2*Math.ceil(max*1.1)+1);
	primeStar.x = Math.ceil(max*1.1)+1;
	primeStar.y = Math.ceil(max*1.1)+1;
	game.global.point = new Phaser.Point(Math.ceil(max*1.1)+1,Math.ceil(max*1.1)+1);
	game.camera.setPosition(0,0); game.camera.setSize(game.world.width,game.world.height);	
	console.log(["# of stars:",primeStar.children.length+1]);
	console.log(game.camera.x);
	console.log(game.camera.y);
}

function sysResize(){
	
}

function sysUpdate() {
	var t= game.global.t 
	t = t + Math.PI/100;
	if (t>2*Math.PI){t=0;}
	
	game.global.t = t;
}

function render() {
	game.debug.geom(game.global.point, 'rgb(0,255,0)');
    game.debug.cameraInfo(game.camera, 32, 32);
}