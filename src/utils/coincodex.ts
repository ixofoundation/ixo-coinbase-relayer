import { COIN_HISTORY } from '../data/coin_history';
import { COIN } from '../data/coin';

const impactTokens = ['IMPACT_CARBON'];

export async function fetchCoinInfo(symbol: string) {
	if (impactTokens.includes(symbol.toUpperCase())) return COIN[symbol.toUpperCase()];
	const res = await fetch(`https://coincodex.com/api/coincodex/get_coin/${symbol}`);
	return await res.json();
}

export async function fetchCoinHistory(symbol: string, startDate: string, endDate: string, samples: string = '10') {
	if (impactTokens.includes(symbol.toUpperCase())) return COIN_HISTORY[symbol.toUpperCase()];
	const res = await fetch(
		`https://coincodex.com/api/coincodex/get_coin_history/${symbol}/${startDate}/${endDate}/${samples}`,
	);
	return await res.json();
}
