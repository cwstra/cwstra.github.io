function stage(sta){
	function change(s){
		var tools = $("#tools");
		var hString;
		switch(s){
			case "Voronoi":
				hString = '<li>Replace existing sites with <input type="number" id="randomNo" value = "500" min="1" max="10000"> random points: <button onclick="randomPoints()">Go!</button></li>'+
						  '<li>Move on to making a <select id=""><option value="perlin">"Realistic" land mass</option><option value="radial">Radial land mass</option><option value="noOcean">map with no ocean</option></select>: <button onclick="stage()">Go!</button></li>"';
				break;
			case "Ocean":
				hString = '';
		}
		tools.html(hString);
	}
	if (sta=="restart"){
		paperInit();
	} else {
		paperNext();
	}
	change(mapState);
}

stage("restart");