import * as d3 from 'd3';

const canvas = d3.select('body')
	.append('svg')
	.attr('width', 640)
	.attr('height', 480);

//this will later be the followers or followings
const testArray = [
	{username: 'berndpfeiffer', SP: 250},
	{username: 'limesoda', SP: 7100},
	{username: 'nissla', SP: 520}
];

const nodes = d3.packSiblings(testArray.map(d => {
	return ({
		name: d.username,
		r: d.SP * 0.02
	});
}));

canvas.selectAll('circle')
	.data(nodes)
	.enter()
	.append('circle')
	.attr('cx', (d) => d.x + 300)
	.attr('cy', (d) => d.y + 300)
	.attr('r', (d) => d.r)
	.attr('fill', 'blue')
	.attr('stroke', 'red');
