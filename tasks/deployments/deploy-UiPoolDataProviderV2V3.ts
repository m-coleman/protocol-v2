import { task } from 'hardhat/config';
import { eContractid } from '../../helpers/types';
import {
  deployMockAggregator,
  deployUiPoolDataProviderV2V3,
} from '../../helpers/contracts-deployments';
import { chainlinkAggregatorProxy, chainlinkEthUsdAggregatorProxy } from '../../helpers/constants';

task(`deploy-${eContractid.UiPoolDataProviderV2V3}`, `Deploys the UiPoolDataProviderV2V3 contract`)
  .addFlag('verify', 'Verify UiPoolDataProviderV2V3 contract via Etherscan API.')
  .setAction(async ({ verify }, localBRE) => {
    await localBRE.run('set-DRE');
    const network = process.env.FORK ? process.env.FORK : localBRE.network.name;

    if (!localBRE.network.config.chainId) {
      throw new Error('INVALID_CHAIN_ID');
    }

    const ethPrice = BigInt(3500 * 1e18);
    const ethPriceAggregator = await deployMockAggregator(ethPrice.toString(), verify);
    const ethPriceAggregatorAddress = ethPriceAggregator.address;
    console.log('ethPriceAggregatorAddress', ethPriceAggregator.address);

    console.log(`\n- UiPoolDataProviderV2V3 price aggregator: ${ethPriceAggregatorAddress}`);
    console.log(
      `\n- UiPoolDataProviderV2V3 eth/usd price aggregator: ${ethPriceAggregatorAddress}`
    );
    console.log(`\n- UiPoolDataProviderV2V3 deployment`);

    const UiPoolDataProviderV2V3 = await deployUiPoolDataProviderV2V3(
      ethPriceAggregatorAddress,
      ethPriceAggregatorAddress,
      verify
    );

    console.log('UiPoolDataProviderV2V3 deployed at:', UiPoolDataProviderV2V3.address);
  });
