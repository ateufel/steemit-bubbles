import {Client} from 'dsteem';
const client = new Client('https://api.steemit.com');

/**
 * get an array with all the users an account follows
 * @param account name of a single account
 */
export const steemGetFollowing = async (account) => {
	let following = [],
		lastName = '';

	try {
		while (true) {
			const response = await client.call('follow_api', 'get_following', [account, lastName, 'blog', 100]);
			if (response && response.length && following.length) {
				if (response[0].following === following[following.length - 1].following) {
					response.shift();
				}
			}
			if (response && response.length) {
				following.push(...response);
				lastName = response[response.length - 1].following;
			} else {
				return following.map(elem => elem.following);
			}
		}
	} catch(err) {
		console.log(err);
		return [];
	}
};

/**
 * get an array with all the users following an account
 * @param account name of a single account
 */
export const steemGetFollowers = async (account) => {
	let followers = [],
		lastName = '';

	try {
		while (true) {
			const response = await client.call('follow_api', 'get_followers', [account, lastName, 'blog', 100]);
			if (response && response.length && followers.length) {
				if (response[0].follower === followers[followers.length - 1].follower) {
					response.shift();
				}
			}
			if (response && response.length) {
				followers.push(...response);
				lastName = response[response.length - 1].follower;
			} else {
				return followers.map(elem => elem.follower);
			}
		}
	} catch(err) {
		console.log(err);
		return [];
	}
};

/**
 * get account data of steem account array
 * @param accounts array of account names
 */
export const steemGetAccountData = async (accounts) => {
	return await client.database.getAccounts(accounts);
};
