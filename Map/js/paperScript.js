var voronoi =  new Voronoi();
var sites = [],x;
for (i=0;i<50;i++){
	x = new Point(view.size.width-40, view.size.height-40) * Point.random();
	x = x + new Point(20,20)
	sites.push(x);
}
var bbox, diagram;
var oldSize = view.size;
var spotColor = new Color('red');
var siteColor = new Color('red');
var mousePos = view.center;
var counter = 0;

onResize();

/*function onMouseDown(event) {
	sites.push(event.point);
	renderDiagram();
}

function onMouseMove(event) {
	mousePos = event.point;
	if (event.count == 0)
		sites.push(event.point);
	sites[sites.length - 1] = event.point;
	renderDiagram();
}*/

function renderDiagram() {
	project.activeLayer.children = [];
	diagram = voronoi.compute(sites, bbox);
	console.log(diagram);
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
				new Path.Circle({center:sites[i],radius:5,fillColor:'blue'});
			}
		}
	}
}

function centroid(points){
	var a = points[points.length-1].x*points[0].y-points[points.length-1].y*points[0].x;
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
	console.log("check")
	return path;
}

function onResize() {
	var margin = 20;
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
		test();
		renderDiagram();
	}
}

function test(){
	if (counter >= sites.length){
		counter=0;
	}
	if (diagram){
		var cell = diagram.cells[sites[counter].voronoiId];
		var text,i,v; if (cell && cell.halfedges.length>2){
			for (i=0;i<cell.halfedges.length;i++){
				v = cell.halfedges[i].getEndpoint();
				text = new PointText(new Point(v.x, v.y));
				text.justification = 'center';
				text.fillColor = 'black';
				text.content = i.toString();
				console.log(i.toString());
			}
		}
	}
	counter++;
}