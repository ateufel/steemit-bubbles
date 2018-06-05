import * as d3 from 'd3';

let svg = d3.select('svg');
	//diameter = svg.attr('width'),
	//g = svg.append('g').attr('transform', 'translate(2,2)'),
	//format = d3.format(',d');

/*let pack = d3.pack()
	.size([diameter - 4, diameter - 4]);*/

//this will later be the followers or followings
const testArray = [
	{"username": "berndpfeiffer", "SP": 250},
	{"username": "limesoda", "SP": 7100},
	{"username": "nissla", "SP": 520}
];

const svgContainer = d3.select("body").append("svg")
	.attr("width", 640)
	.attr("height", 640);
const circles = svgContainer.selectAll("circle")
	.data(testArray)
	.enter()
	.append("circle");

const circleAttributes = circles
	/*.attr("cx", function (d) {
		return d.x_axis;
	})
	.attr("cy", function (d) { return d.y_axis; })
	*/
	.attr("r", function (d) {
		return d.SP * 0.01;
	});
	//.style("fill", function(d) { return d.color; });

/*let root = d3.hierarchy(testArray)
	.sum(function(d) {return d.size;})
	.sort(function(a, b) {return b.value - a.value;});*/

/*let node = g.selectAll('.node')
	.data(pack(root).descendants())
	.enter().append('g')
	.attr('class', (d) => {return d.children ? 'node' : 'leaf node';})
	.attr('transform', (d) => {return 'translate(' + d.x + ',' + d.y + ')';});*/

/*node.append('title')
	.text((d) => {return d.username;});

node.append('circle')
	.attr('r', (d) => {return d.SP;});*/

/*node.filter(function(d) {return !d.children;}).append('text')
	.attr('dy', '0.3em')
	.text(function(d) {return d.data.name.substring(0, d.r / 3);});*/
