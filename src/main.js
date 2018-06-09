import * as d3 from 'd3';
import {steemGetAccountData, steemGetFollowers, steemGetFollowing} from './steemit';

const w = 600,
	h = 600;

(async() => {
	const followers = await steemGetFollowers('luschn');
	const accountData = await steemGetAccountData(followers);
	console.log(accountData);
	const data = {
		name: 'followers',
		children: accountData
	};

	//this will later be the followers or followings
	/*const data = {
		name: 'root',
		children: [
			{username: 'berndpfeiffer', SP: 250},
			{username: 'limesoda', SP: 700},
			{username: 'nissla', SP: 520},
			{username: 'luschn', SP: 2000}
		]
	};*/

	//create svg element
	d3.select('body')
		.append('svg')
		.attr('width', w)
		.attr('height', h);

	//create pack layout
	const packLayout = d3.pack()
		.padding(0)
		.size([w, h]);
	//turn data into hierarchical data for the pack layout
	let nodes = d3.hierarchy(data);
	//set the value/size for each node and sort the nodes
	nodes.sum((d) => parseFloat(d['vesting_shares'])).sort((a, b) => b.value - a.value);
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
			return d.children === undefined ? `${d.data.name} (${parseFloat(d.data['vesting_shares'])})` : '';
		});
})();
