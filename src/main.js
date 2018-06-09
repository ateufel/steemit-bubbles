import {steemGetAccountData, steemGetFollowers, steemGetFollowing} from './services/steemit';
import {generatePackedCircle} from './services/d3';

const width = 600,
	height = 600,
	dataFields = ['vesting_shares', 'sbd'];

(async() => {
	const followers = await steemGetFollowers('luschn');
	const accountData = await steemGetAccountData(followers);
	const data = {
		name: 'followers',
		children: accountData
	};

	generatePackedCircle(data, 'vesting_shares', width, height);
})();
