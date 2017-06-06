//layers: 0 = voronoi, 1 = text
var margin = 20;
var layer = new Layer();
project.addLayer(layer);
var layer = new Layer();
project.addLayer(layer);
var voronoi =  new Voronoi();
var sites;
var bbox, diagram;
var oldSize = view.size;
var spotColor = new Color('red');
var siteColor = new Color('red');
var mousePos = view.center;
var states;
var linked;

function init(){
	states = ["Voronoi","Ocean"];
	window.mapState = states[0];
	console.log("Here");
	randomPoints(1000);
	lloyd();
	lloyd();
	onResize();	
}
window.paperInit = init;

function next(){
	states.push(states.shift());
	switch(states[0]){
		case "Ocean":
			linked = grandGraph();
			generateTheOceanBlue();
			break;
	}
	window.mapState = states[0];
	onResize();
	console.log(linked);
}
window.paperNext = next;

function onMouseDown(event) {
	sites.push(event.point);
	renderDiagram();
}

/*function onMouseMove(event) {
	mousePos = event.point;
	if (event.count == 0)
		sites.push(event.point);
	sites[sites.length - 1] = event.point;
	renderDiagram();
}*/

function randomPoints(n){
	n = (typeof n !== 'undefined') ?  n : $("#randomNo").val();
 	sites = [];
 	var x,i;
	for (i=0;i<n;i++){
		x = new Point(view.size.width-margin*2, view.size.height-margin*2) * Point.random();
		x = x + new Point(margin,margin);
		sites.push(x);
	}
	onResize();
}
window.randomPoints = randomPoints;

function generateTheOceanBlue(){
	function oceanCheck(){
		var arr=[],i,corn; for (i=0;i<linked.borderCorners.length;i++){
			if (linked.corners[linked.borderCorners[i]].water){
				linked.corners[linked.borderCorners[i]].ocean = true;
				arr.push(linked.borderCorners[i]);
			}
		}
		var val;
		while (arr.length){
			console.log(arr);
			corn = linked.corners[arr[0]];
			for (i=0;i<corn.adjacent.length;i++){
				if (linked.corners[corn.adjacent[i]].water&&!linked.corners[corn.adjacent[i]].ocean){
					linked.corners[corn.adjacent[i]].ocean = true;
					arr.push(corn.adjacent[i]);
				}
			}
			arr.shift();
		}
	}
	var genType = $('#land').find(":selected").val();
	console.log(genType);
	switch(genType){
		case "perlin":
			var perl = new SimplexNoise();
			var i,n,p,key,val,count,check; for (i=0;i<linked.corners.length;i++){
				p = new Point(linked.corners[i].x,linked.corners[i].y);
				n = (view.center.getDistance(p))/(view.center.getDistance(new Point(margin,margin)));
				check = (1+perl.noise(linked.corners[i].x,linked.corners[i].y))/2;
				console.log(n);
				if (check<n*n*0.3+0.3){
					linked.corners[i].water = true;
				} else {
					linked.corners[i].water = false;
				}
			}
			oceanCheck();
			for(key in linked.centers) {
    			if(linked.centers.hasOwnProperty(key)) {
    				count = 0; check = false;
        			for (i=0;i<linked.centers[key].corners.length;i++){
        				val = linked.centers[key].corners[i];
        				count += linked.corners[val].water;
        				check = check || linked.corners[val].ocean;
        			}
        			linked.centers[key].water = (count>linked.centers[key].corners.length*3/10);
        			if (linked.centers[key].water){
        				linked.centers[key].ocean = check;
        			}
    			}
			}
			break;
		case "radial":
			var i,n,p; for (i=0;i<linked.corners.length;i++){
				p = new Point(linked.corners[i].x,linked.corners[i].y);
				n = (view.center.getDistance(p))/(view.center.getDistance(new Point(margin,margin)));
				if (n>0.75){
					linked.corners[i].water = true;
				} else {
					linked.corners[i].water = false;
				}
			}
			oceanCheck();
			for(key in linked.centers) {
    			if(myObject.hasOwnProperty(key)) {
    				count = 0;
        			for (i=0;i<linked.centers[key].corners.length;i++){
        				val = linked.centers[key].corners[i];
        				count += linked.corners[val].water;
        				check = check || linked.corners[val].ocean;
        			}
        			linked.centers[key].water = (count>linked.centers[key].corners.length/2);
        			if (linked.centers[key].water){
        				linked.centers[key].ocean = check;
        			}
    			}
			}
			oceanCheck();
			break;
		case "noOcean":
			var perl = new SimplexNoise();
			var i,n,p; for (i=0;i<linked.corners.length;i++){
				n = (1+perl.noise(linked.corners[i].x,linked.corners[i].y))/2;
				if (n>-0.9||[margin,view.size.width-margin].indexOf(linked.corners[i].x)!=-1||[margin,view.size.height-margin].indexOf(linked.corners[i].y)!=-1){
					linked.corners[i].water = false;
				} else {
					linked.corners[i].water = true;
				}
			}
			for(key in linked.centers) {
    			if(myObject.hasOwnProperty(key)) {
    				count = 0;
        			for (i=0;i<linked.centers[key].corners.length;i++){
        				val = linked.centers[key].corners[i];
        				count += linked.corners[val].water;
        			}
        			linked.centers[key].water = (count>linked.centers[key].corners.length/2);
    			}
			}
	}
}

function renderDiagram(){
	function renderBasicDiagram() {
		diagram = voronoi.compute(sites, bbox);
		if (diagram) {
			for (var i = 0, l = sites.length; i < l; i++) {
				var cell = diagram.cells[sites[i].voronoiId];
				if (cell) {
					var halfedges = cell.halfedges,
						length = halfedges.length;
					if (length > 2) {
						var points = [];
						for (var j = 0; j < length; j++) {
							v = halfedges[j].getEndpoint();
							points.push(new Point(v));
						}
						createPath(points, sites[i],"Voronoi");
					}
					new Path.Circle({center:sites[i],radius:1,fillColor:'blue'});
				}
			}
		}
	}
	function renderOceanDiagram() {
		console.log("Got Here");
		if (diagram) {
			var i,cell; for(i in linked.centers) { if (linked.centers.hasOwnProperty(i)){
				cell = diagram.cells[i];
				if (cell) {
					var halfedges = cell.halfedges,
						length = halfedges.length;
					if (length > 2) {
						var points = [];
						for (var j = 0; j < length; j++) {
							v = halfedges[j].getEndpoint();
							points.push(new Point(v));
						}
						createPath(points, linked.centers[i],"Ocean",[linked.centers[i].water,linked.centers[i].ocean]);
					}
					Path.Circle({center:linked.centers[i],radius:1,fillColor:'black'});
				}
			}}
			console.log("Check");
			for (i=0;i<linked.corners.length;i++){
				if (linked.corners[i].ocean){
					cell = 'darkblue';
				} else if (linked.corners[i].water){
					cell = 'blue'
				} else {
					cell = 'brown'
				}
				Path.Circle({center:linked.corners[i],radius:3,fillColor:cell});
			}
		}
	}
    //Runtime
    {
    console.log("First Check Here:");
    console.log(window.mapState);
    project.layers[0].activate();
	project.activeLayer.children = [];
	if (window.mapState=="Voronoi"){
		renderBasicDiagram();
	} else if (window.mapState=="Ocean"){
		renderOceanDiagram();
	}
	}
}

function createPath(points, center,f,x) {
	var path;
	if (f=="Voronoi"){
		path = new Path();
		path.strokeColor = spotColor;
		path.closed = true;
	} else if (f=="Ocean"){
		path = new Path();
		path.strokeColor = 'black';
		if (x[0]&&x[1]){
			path.fillColor = 'blue';
		} else if (x[0]){
			path.fillColor = 'cyan';
		} else {
			path.fillColor = 'tan';
		}
		path.closed = true;
	}
	for (var i = 0, l = points.length; i < l; i++) {
		var point = points[i];
		var next = points[(i + 1) == points.length ? 0 : i + 1];
		var vector = (next - point) / 2;
		path.add({point: point});
	}
	return path;
}

function centroid(points){
	var a = points[points.length-1].x*points[0].y-points[points.length-1].y*points[0].x;
	var cx = (points[points.length-1].x+points[0].x)*a;
	var cy = (points[points.length-1].y+points[0].y)*a;
	var i,v; for(i=0;i<points.length-1;i++){
		v = points[i].x*points[i+1].y - points[i].y*points[i+1].x;
		a += v;
		cx += (v*(points[i].x+points[i+1].x));
		cy += (v*(points[i].y+points[i+1].y));
	} 
	a /= 2;
	cx /= 6*a;
	cy /= 6*a;
	return new Point(cx,cy);
}

function lloyd() {
	if (diagram){
		for (var i = 0, l = sites.length; i < l; i++) {
			var cell = diagram.cells[sites[i].voronoiId];
			if (cell) {
				var halfedges = cell.halfedges,
					length = halfedges.length;
				if (length > 2) {
					var points = [];
					for (var j = 0; j < length; j++) {
						v = halfedges[j].getEndpoint();
						points.push(new Point(v));
					}
					sites[i]=centroid(points);
				}
			}
		}
	}
}

function grandGraph(){
	function cornerFind(corners,corner) {    
    	for (var i = 0; i < corners.length; i++) {
        	if (corners[i].x == corner.x && corners[i].y == corner.y) {
            	return i;
        	}
    	}
    	return -1;
	}
	if (diagram){
		var linked = {centers:{},edges:[],corners:[],borderCorners:[]};
		var edges = diagram.edges;
		var i; for (i=0;i<sites.length;i++){
			linked.centers[sites[i].voronoiId]=sites[i];
			linked.centers[sites[i].voronoiId].neighbors=[];
			linked.centers[sites[i].voronoiId].borders=[];
			linked.centers[sites[i].voronoiId].corners=[];
		}
		var obj,v0,v1;
		for (i=0;i<edges.length;i++){
			v0 = cornerFind(linked.corners,edges[i].va);
			v1 = cornerFind(linked.corners,edges[i].vb);
			if (v0==-1){
				v0 = linked.corners.length;
				linked.corners.push(edges[i].va);
				if ([margin,view.size.width-margin].indexOf(edges[i].va.x)!=-1&&[margin,view.size.height-margin].indexOf(edges[i].va.y)!=-1){
					linked.borderCorners.push(v0);
				}
				linked.corners[v0].touches=[];
				linked.corners[v0].protrudes=[];
				linked.corners[v0].adjacent=[];
			}
			if (v1==-1){
				v1 = linked.corners.length;
				linked.corners.push(edges[i].vb);
				if ([margin,view.size.width-margin].indexOf(edges[i].vb.x)!=-1&&[margin,view.size.height-margin].indexOf(edges[i].vb.y)!=-1){
					linked.borderCorners.push(v1);
				}
				linked.corners[v1].touches=[];
				linked.corners[v1].protrudes=[];
				linked.corners[v1].adjacent=[];
			}
			obj = {};
			obj["v0"]=v0;
			obj["v1"]=v1;
			if (edges[i].lSite && edges[i].rSite) {
				linked.centers[edges[i].lSite.voronoiId].neighbors.push(edges[i].rSite.voronoiId);
			}
			if (edges[i].lSite){
				obj["d0"]=edges[i].lSite.voronoiId;
				linked.centers[edges[i].lSite.voronoiId].borders.push(i);
				if (linked.centers[edges[i].lSite.voronoiId].corners.indexOf(v0)==-1){
					linked.centers[edges[i].lSite.voronoiId].corners.push(v0);
				}
				if (linked.centers[edges[i].lSite.voronoiId].corners.indexOf(v1)==-1){
					linked.centers[edges[i].lSite.voronoiId].corners.push(v1);
				}
				if (linked.corners[v0].touches.indexOf(edges[i].lSite.voronoiId)==-1){
					linked.corners[v0].touches.push(edges[i].lSite.voronoiId);
				}
				if (linked.corners[v1].touches.indexOf(edges[i].lSite.voronoiId)==-1){
					linked.corners[v1].touches.push(edges[i].lSite.voronoiId);
				}
			} else {
				obj["d0"]=null;
			}
			if (edges[i].rSite){	
				obj["d1"]=edges[i].rSite.voronoiId;
				linked.centers[edges[i].rSite.voronoiId].neighbors.push(edges[i].lSite.voronoiId);
				linked.centers[edges[i].rSite.voronoiId].borders.push(i);
				if (linked.centers[edges[i].rSite.voronoiId].corners.indexOf(v0)==-1){
					linked.centers[edges[i].rSite.voronoiId].corners.push(v0);
				}
				if (linked.centers[edges[i].rSite.voronoiId].corners.indexOf(v1)==-1){
					linked.centers[edges[i].rSite.voronoiId].corners.push(v1);
				}
				if (linked.corners[v0].touches.indexOf(edges[i].rSite.voronoiId)==-1){
					linked.corners[v0].touches.push(edges[i].rSite.voronoiId);
				}
				if (linked.corners[v1].touches.indexOf(edges[i].rSite.voronoiId)==-1){
					linked.corners[v1].touches.push(edges[i].rSite.voronoiId);
				}
			} else {
				obj["d1"]=null;
			}
			linked.edges.push(obj);
			linked.corners[v0].protrudes.push(i);
			linked.corners[v1].protrudes.push(i);
			linked.corners[v0].adjacent.push(v1);
			linked.corners[v1].adjacent.push(v0);
			
		}
		return linked;
	}
}

function onResize() {
	if (sites){
		bbox = {
			xl: margin,
			xr: view.bounds.width - margin,
			yt: margin,
			yb: view.bounds.height - margin
		};
		for (var i = 0, l = sites.length; i < l; i++) {
			sites[i] = sites[i] * view.size / oldSize;
		}
		oldSize = view.size;
		renderDiagram();
	}
}

function onKeyDown(event) {
	if (event.key == 'space') {
		lloyd();
		renderDiagram();
	}
}
