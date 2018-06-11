import {steemGetAccountData, steemGetFollowers, steemGetFollowing} from './services/steemit';
import {generatePackedCircle} from './services/d3';
import styles from './main.css';

//set container size for circles
const width = 600,
	height = 600,
	inputUsername = document.getElementById('username'),
	d3Container = document.getElementById('d3container');

const loadCircles = async (username) => {
	//hide input and show loading info
	inputUsername.style.display = 'none';
	d3Container.innerHTML = 'loading...';

	//get followers and their account data
	const followers = await steemGetFollowers(username);
	const accountData = await steemGetAccountData(followers);
	//prepare data for d3 circle pack
	const data = {
		name: 'followers',
		children: accountData
	};
	//generate the circles
	generatePackedCircle(data, 'vesting_shares', width, height);
	//show input for username again
	inputUsername.style.display = 'block';
};

//input handler for username input - catch enter to load follower data
inputUsername.addEventListener('keypress', (evt) => {
	if (evt.key !== undefined) {
		if (evt.key === 'Enter') {
			loadCircles(evt.target.value);
		}
	} else if (evt.keyCode !== undefined) {
		if (evt.keyCode === 13) {
			loadCircles(evt.target.value);
		}
	}
});
