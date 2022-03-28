# $BPT token smart contract

- Language: Solidity v0.8.10

- Project framework: hardhat + truffle / web3

- Yarn: v1.22.10

## Overview

### Deployed

[Avalanche C-Chain](https://bscscan.com/token/)

## Installation & Usage

1. Install packages
```
yarn
```

2. Build project
```
yarn build
```

### Testing

```
yarn test
```

### Run linter

```
yarn lint
```

### Deploy

1. Edit network in ```hardhat.config.js``` ([docs](https://hardhat.org/config/))

2. Setup environment variables:
```
cp .env.example .env
// then edit .env
```

3. Run command:
```
npx hardhat run scripts/deploy-script.js --network <network name>
```

## License

[MIT License](./LICENSE)
