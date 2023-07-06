import { Hono } from 'hono';
import { poweredBy } from 'hono/powered-by';
import { cors } from 'hono/cors';

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
	const res = await fetch(`https://coincodex.com/api/coincodex/get_coin/${symbol}`);
	return c.json(await res.json());
});

app.get('/api/coincodex/get_coin_history/:symbol/:start_date/:end_date/:samples', async (c) => {
	const symbol = c.req.param('symbol');
	const start_date = c.req.param('start_date');
	const end_date = c.req.param('end_date');
	const samples = c.req.param('samples');
	const res = await fetch(
		`https://coincodex.com/api/coincodex/get_coin_history/${symbol}/${start_date}/${end_date}/${samples}`,
	);
	return c.json(await res.json());
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

export default app;
