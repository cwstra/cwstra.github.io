function stage(sta){
	function change(s){
		var tools = $("#tools");
		var hString;
		switch(s){
			case "Voronoi":
				hString = '<li>Replace existing sites with <input type="number" id="randomNo" value = "1000" min="1" max="10000"> random points: <button onclick="randomPoints()">Go!</button></li>'+
						  '<li>Move on to making a <select id="land"><option value="perlin" selected>"Realistic" land mass</option><option value="radial">Radial land mass</option><option value="noOcean">map with no ocean</option></select>: <button onclick="stage()">Go!</button></li>';
				break;
			case "Ocean":
				hString = '<li>Restart <button onclick="restart()">Go!</button></li>';
		}
		tools.html(hString);
	}
	if (sta=="restart"){
		window.paperInit();
	} else {
		window.paperNext();
	}
	change(mapState);
}

function restart(){
	stage('restart');
}
$(document).ready(function(){stage("restart");})
