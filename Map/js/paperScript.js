var voronoi =  new Voronoi();
//var sites = generateBeeHivePoints(view.size / 200, true);
var sites = [],x;
for (i=0;i<50;i++){
	x = new Point(view.size.width, view.size.height) * Point.random();
	sites.push(x);
}
var bbox, diagram;
var oldSize = view.size;
var spotColor = new Color('red');
var mousePos = view.center;
var selected = false;

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
	var diagram = voronoi.compute(sites, bbox);
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
			}
		}
	}
}

function removeSmallBits(path) {
	var averageLength = path.length / path.segments.length;
	var min = path.length / 50;
	for(var i = path.segments.length - 1; i >= 0; i--) {
		var segment = path.segments[i];
		var cur = segment.point;
		var nextSegment = segment.next;
		var next = nextSegment.point + nextSegment.handleIn;
		if (cur.getDistance(next) < min) {
			segment.remove();
		}
	}
}

function createPath(points, center) {
	var path = new Path();
	if (!selected) { 
		path.fillColor = spotColor;
	} else {
		path.fullySelected = selected;
	}
	path.closed = true;

	for (var i = 0, l = points.length; i < l; i++) {
		var point = points[i];
		var next = points[(i + 1) == points.length ? 0 : i + 1];
		var vector = (next - point) / 2;
		path.add({
			point: point + vector,
			handleIn: -vector,
			handleOut: vector
		});
	}
	path.scale(0.95);
	removeSmallBits(path);
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
		selected = !selected;
		renderDiagram();
	}
}