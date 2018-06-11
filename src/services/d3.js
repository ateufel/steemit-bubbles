import * as d3 from 'd3';

export const generatePackedCircle = (data, valueField, width, height) => {
	//show tooltip with detail info
	const showTooltip = (d) => {
		tooltip
			.transition()
			.duration(250)
			.style('opacity', .9);
		tooltip
			.html(d.data.name + '<br/>'  + d.data[valueField])
			.style('left', (d.x) + 'px')
			.style('top', (d.y - 30) + 'px')
	};

	//hide tooltip
	const hideTooltip = (d) => {
		tooltip
			.transition()
			.duration(500)
			.style('opacity', 0);
	};

	//create svg element
	d3.select('body')
		.append('svg')
		.attr('width', width)
		.attr('height', height);

	//create tooltip for hover info
	const tooltip = d3.select('body').append('div')
		.attr('class', 'tooltip')
		.style('opacity', 0);

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

	//add data to d3 chart
	const svg = d3.select('svg')
		.selectAll('g')
		.data(nodes.descendants())
		.enter()
		.append('g');

	//turn data into circles
	svg
		.append('circle')
		.attr('cx', (d) => d.x)
		.attr('cy', (d) => d.y)
		.attr('r', (d) => d.r)
		.on('mouseover', showTooltip)
		.on('mouseout', hideTooltip);

	//add text label (username)
	svg
		.append('text')
		.attr('dx', (d) => d.x)
		.attr('dy', (d) => d.y)
		.text((d) => {
		return d.children === undefined ? d.data.name : '';
		})
		.on('mouseover', showTooltip)
		.on('mouseout', hideTooltip);
};
