import { useActiveNetworkVersion } from '../../state/application/hooks';
import { SupportedNetwork } from '../../constants/networks';
import { useCoinGeckoSimpleTokenPrices } from '../coingecko/useCoinGeckoSimpleTokenPrices';

//TODO: Network dependent address fetching!
const WETH_ADDRESS = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';

export const getBeetsTokenAddress = (networkId: SupportedNetwork) => {
    switch (networkId) {
      case SupportedNetwork.FANTOM:
        return '0xf24bcf4d1e507740041c9cfd2dddb29585adce1e';
      case SupportedNetwork.OPTIMISM:
        return '0x97513e975a7fA9072c72C92d8000B0dB90b163c5';
      default:
          return '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
    } 
  }

  export const getWethTokenAddress = (networkId: SupportedNetwork) => {
    switch (networkId) {
      case SupportedNetwork.FANTOM:
        return '0x74b23882a30290451A17c44f4F05243b6b58C76d';
      case SupportedNetwork.OPTIMISM:
        return '0x4200000000000000000000000000000000000006';
      default:
        return '0x74b23882a30290451A17c44f4F05243b6b58C76d';
    } 
  }



const reducer = (previousValue: number, currentValue: number) => previousValue + currentValue;

export function useLatestPrices(): { eth?: number; beets?: number } {

    const [activeNetwork] = useActiveNetworkVersion();
    //V3: obtain token price from Coingecko
    const tokenPrices = useCoinGeckoSimpleTokenPrices([getBeetsTokenAddress(activeNetwork.id), getWethTokenAddress(activeNetwork.id)]);

    //const wethChartData = chartData;
    let beets = 0;
    let eth = 0;

    if (tokenPrices && tokenPrices[getBeetsTokenAddress(activeNetwork.id)] && tokenPrices[getWethTokenAddress(activeNetwork.id)]) {
      beets = tokenPrices[getBeetsTokenAddress(activeNetwork.id)].usd;
      eth = tokenPrices[getWethTokenAddress(activeNetwork.id)].usd;
    }

    return {
        eth: eth ? eth : undefined,
        beets: beets ? beets : undefined,
    };
}
