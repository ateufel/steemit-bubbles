import * as d3 from 'd3';

export const generatePackedCircle = (data, valueField, width, height) => {
	//create svg element
	d3.select('body')
		.append('svg')
		.attr('width', width)
		.attr('height', height);

	//create pack layout
	const packLayout = d3.pack()
		.padding(0)
		.size([width, height]);
	//turn data into hierarchical data for the pack layout
	let nodes = d3.hierarchy(data);
	//set the value/size for each node and sort the nodes
	nodes.sum((d) => parseFloat(d[valueField])).sort((a, b) => b.value - a.value);
	//create pack layout with those nodes
	packLayout(nodes);

	const color = d3.scaleOrdinal(d3.schemeCategory10);

	const svg = d3.select('svg')
		.selectAll('g')
		.data(nodes.descendants())
		.enter()
		.append('g');

	svg
		.append('circle')
		.attr('cx', (d) => d.x)
		.attr('cy', (d) => d.y)
		.attr('r', (d) => d.r)
		.attr('fill', (d, i) => color(i));

	svg
		.append('text')
		.attr('dx', (d) => d.x)
		.attr('dy', (d) => d.y)
		.text((d) => {
			return d.children === undefined ? `${d.data.name} (${parseFloat(d.data[valueField])})` : '';
		});
};
