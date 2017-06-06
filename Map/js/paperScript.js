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

function init(){
	states = ["Voronoi","Water"];
	window.mapState = states[0];
	console.log("Here");
	randomPoints();
	lloyd();
	lloyd();
	onResize();	
}
window.paperInit = init;

function next(){
	states.push(states.shift());
	switch(states[0]){
		case "Ocean":
			break;
		case "Ocean":
			break;
	}
	window.mapState = states[0];
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

function randomPoints(){
 	sites = [] 
 	var x,i;
	for (i=0;i<$("#randomNo").val();i++){
		x = new Point(view.size.width-margin*2, view.size.height-margin*2) * Point.random();
		x = x + new Point(margin,margin);
		sites.push(x);
	}
	onResize();
}
window.randomPoints = randomPoints;


function containsObject(obj, list) {
   	var i;
   	for (i = 0; i < list.length; i++) {
       	if (list[i] === obj) {
           	return true;
       	}
   	}
   	return false;
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
						createPath(points, sites[i]);
					}
					new Path.Circle({center:sites[i],radius:2,fillColor:'blue'});
				}
			}
		}
	}
    project.layers[0].activate();
	project.activeLayer.children = [];
	if (window.mapState=="Voronoi"){
		renderBasicDiagram();
	} else if (window.mapState=="Ocean"){
		renderOceanDiagram();
	}
}



function createPath(points, center) {
	var path = new Path();
	path.strokeColor = spotColor;
	path.closed = true;

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
			linked.centers[sites[i].voronoiId]={neighbors:[],borders:[],corners:[]}
		}
		var obj,v0,v1;
		for (i=0;i<edges.length;i++){
			v0 = cornerFind(linked.corners,edges[i].va);
			v1 = cornerFind(linked.corners,edges[i].vb);
			if (v0==-1){
				v0 = linked.corners.length;
				linked.corners.push(edges[i].va);
				if ([margin,view.size.width-margin].indexOf(edges[i].va.x)!=-1&&[margin,view.size.height-margin].indexOf(edges[i].va.y)!=-1){
					linked.borderCorners.push(v0)
				}
				linked.corners[v0].touches=[];
				linked.corners[v0].protrudes=[];
				linked.corners[v0].adjacent=[];
			}
			if (v1==-1){
				v1 = linked.corners.length;
				linked.corners.push(edges[i].vb);
				if ([margin,view.size.width-margin].indexOf(edges[i].vb.x)!=-1&&[margin,view.size.height-margin].indexOf(edges[i].vb.y)!=-1){
					linked.borderCorners.push(v1)
				}
				linked.corners[v1].touches=[];
				linked.corners[v1].protrudes=[];
				linked.corners[v1].adjacent=[];
			}
			obj = {}
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

function onKeyDown(event) {
	if (event.key == 'space') {
		lloyd();
		renderDiagram();
	}
}
