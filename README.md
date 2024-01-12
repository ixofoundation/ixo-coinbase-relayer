# ixo-coincodex-relayer

This is a minimal project for relaying requests to coincodex and avoiding CORS errors with web clients. It also caches and provides hard-coded coin values for impact tokens (e.g. CARBON Credits).

## Features

- Minimal
- TypeScript
- Wrangler to develop and deploy.

## Usage

### Install

```
yarn install
```

### Develop

```
yarn dev
```

### Test

```
yarn test
```

### Deploy

```
yarn deploy
```

## Routes

- GET `/`

- GET `/apps/coincodex/cache/all_coins.json`

- GET `/api/coincodex/get_firstpage_history/:days/:samples/:coins_limit`

- GET `/api/coincodex/get_coin/:symbol`

- GET `/api/coincodex/get_coin_history/:symbol/:start_date/:end_date`
- GET `/api/coincodex/get_coin_history/:symbol/:start_date/:end_date/:samples`

- GET `/api/exchange/get_markets_by_coin/:symbol`

- GET `/api/exchange/get_markets_by_coin/:symbol/`

- GET `/api/coincodex/get_coin_ranges/:comma_separated_list_of_symbols`

- GET `/api/coincodex/get_coin_ranges/:comma_separated_list_of_symbols/`

- GET `/api/custom/get_coins/:comma_separated_list_of_symbols`

- GET `api/custom/get_coins_history/:comma_separated_list_of_symbols/:start_date/:end_date`

- GET `api/custom/get_coins_history/:comma_separated_list_of_symbols/:start_date/:end_date/:samples`

## License

MIT
