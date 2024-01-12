import { Hono } from 'hono';
import { poweredBy } from 'hono/powered-by';
import { cors } from 'hono/cors';

import { fetchCoinHistory, fetchCoinInfo } from './utils/coincodex';

const app = new Hono<{
	Bindings: {};
}>();

app.use('*', poweredBy());

app.use('*', cors());

app.get('/', (c) => {
	return c.text('Hello IXO!');
});

app.get('/apps/coincodex/cache/all_coins.json', async (c) => {
	const res = await fetch('https://coincodex.com/apps/coincodex/cache/all_coins.json');
	return c.json(await res.json());
});

app.get('/api/coincodex/get_firstpage_history/:days/:samples/:coins_limit', async (c) => {
	const days = c.req.param('days');
	const samples = c.req.param('samples');
	const coins_limit = c.req.param('coins_limit');
	const res = await fetch(
		`https://coincodex.com/api/coincodex/get_firstpage_history/${days}/${samples}/${coins_limit}`,
	);
	return c.json(await res.json());
});

app.get('/api/coincodex/get_coin/:symbol', async (c) => {
	const symbol = c.req.param('symbol');
	const coinInfo = await fetchCoinInfo(symbol);
	return c.json(coinInfo);
});

app.get('/api/coincodex/get_coin_history/:symbol/:start_date/:end_date', async (c) => {
	const symbol = c.req.param('symbol');
	const start_date = c.req.param('start_date');
	const end_date = c.req.param('end_date');
	const coinHistory = await fetchCoinHistory(symbol, start_date, end_date);
	return c.json(coinHistory);
});

app.get('/api/coincodex/get_coin_history/:symbol/:start_date/:end_date/:samples', async (c) => {
	const symbol = c.req.param('symbol');
	const start_date = c.req.param('start_date');
	const end_date = c.req.param('end_date');
	const samples = c.req.param('samples');
	const coinHistory = await fetchCoinHistory(symbol, start_date, end_date, samples);
	return c.json(coinHistory);
});

app.get('/api/exchange/get_markets_by_coin/:symbol', async (c) => {
	const symbol = c.req.param('symbol');
	const res = await fetch(`https://coincodex.com/api/exchange/get_markets_by_coin/${symbol}`);
	return c.json(await res.json());
});

app.get('/api/exchange/get_markets_by_coin/:symbol/', async (c) => {
	const symbol = c.req.param('symbol');
	const res = await fetch(`https://coincodex.com/api/exchange/get_markets_by_coin/${symbol}/`);
	return c.json(await res.json());
});

app.get('/api/coincodex/get_coin_ranges/:comma_separated_list_of_symbols', async (c) => {
	const comma_separated_list_of_symbols = c.req.param('comma_separated_list_of_symbols');
	const res = await fetch(`https://coincodex.com/api/coincodex/get_coin_ranges/${comma_separated_list_of_symbols}`);
	return c.json(await res.json());
});

app.get('/api/coincodex/get_coin_ranges/:comma_separated_list_of_symbols/', async (c) => {
	const comma_separated_list_of_symbols = c.req.param('comma_separated_list_of_symbols');
	const res = await fetch(`https://coincodex.com/api/coincodex/get_coin_ranges/${comma_separated_list_of_symbols}/`);
	return c.json(await res.json());
});

app.get('/api/custom/get_coins/:comma_separated_list_of_symbols', async (c) => {
	const comma_separated_list_of_symbols = c.req.param('comma_separated_list_of_symbols');
	const symbols = comma_separated_list_of_symbols.split(',').map((symbol) => symbol.trim());
	const res = await Promise.allSettled(symbols.map((symbol) => fetchCoinInfo(symbol).catch(() => null)));
	const results = symbols.reduce((r, v, i) => {
		const result = res[i];
		return { ...r, [v]: result.status === 'fulfilled' ? result.value : null };
	}, {});
	return c.json(results);
});

app.get('/api/custom/get_coins_history/:comma_separated_list_of_symbols/:start_date/:end_date', async (c) => {
	const comma_separated_list_of_symbols = c.req.param('comma_separated_list_of_symbols');
	const symbols = comma_separated_list_of_symbols.split(',').map((symbol) => symbol.trim());
	const start_date = c.req.param('start_date');
	const end_date = c.req.param('end_date');
	const res = await Promise.allSettled(
		symbols.map((symbol) => fetchCoinHistory(symbol, start_date, end_date).catch(() => null)),
	);
	const results = symbols.reduce((r, v, i) => {
		const result = res[i];
		return {
			...r,
			[v]:
				result.status === 'fulfilled'
					? result.value?.[v] ??
					  result.value?.[v.toUpperCase()] ??
					  result.value?.[v.toLowerCase()] ??
					  Object.keys(result.value)?.length === 1
						? result.value?.[Object.keys(result.value)[0]]
						: result.value
					: null,
		};
	}, {});
	return c.json(results);
});

app.get('/api/custom/get_coins_history/:comma_separated_list_of_symbols/:start_date/:end_date/:samples', async (c) => {
	const comma_separated_list_of_symbols = c.req.param('comma_separated_list_of_symbols');
	const symbols = comma_separated_list_of_symbols.split(',').map((symbol) => symbol.trim());
	const start_date = c.req.param('start_date');
	const end_date = c.req.param('end_date');
	const samples = c.req.param('samples');
	const res = await Promise.allSettled(
		symbols.map((symbol) => fetchCoinHistory(symbol, start_date, end_date, samples).catch(() => null)),
	);
	const results = symbols.reduce((r, v, i) => {
		const result = res[i];
		return {
			...r,
			[v]:
				result.status === 'fulfilled'
					? result.value?.[v]
						? result.value[v]
						: result.value?.[v.toUpperCase()]
						? result.value[v.toUpperCase()]
						: result.value?.[v.toLowerCase()]
						? result.value?.[v.toLowerCase()]
						: Object.keys(result.value)?.length === 1
						? result.value?.[Object.keys(result.value)[0]]
						: result.value
					: null,
		};
	}, {});
	return c.json(results);
});

export default app;
