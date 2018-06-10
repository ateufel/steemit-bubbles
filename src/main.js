import {steemGetAccountData, steemGetFollowers, steemGetFollowing} from './services/steemit';
import {generatePackedCircle} from './services/d3';

const width = 600,
	height = 600,
	type = 'followers', //followers or following
	dataFields = ['vesting_shares', 'sbd'];

(async() => {
	const followers = await steemGetFollowers('luschn');
	const accountData = await steemGetAccountData(followers);
	//prepare data for d3 circle pack
	const data = {
		name: 'followers',
		children: accountData
	};

	generatePackedCircle(data, 'vesting_shares', width, height);
})();
