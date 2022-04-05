# $BPT token smart contract

- Language: Solidity v0.8.13

- Project framework: hardhat + truffle / web3

- Yarn: v1.22.10

## Overview

### Deployed

[Avalanche C-Chain, production](https://snowtrace.io/address/0x1111111111182587795ef1098ac7da81a108c97a)

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
