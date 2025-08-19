To deploy to anvil:

- `anvil`
- `nvm use 18`
- `npm install`
- `npm run compile`
- `rm deployed-contracts.json`
- `npm run hardhat -- aave:dev --network buidlerevm_docker`
- `npm run hardhat -- deploy-UiPoolDataProviderV2V3 --network buidlerevm_docker`
