
import { useBalancerChainProtocolData } from '../../data/balancer/useProtocolDataWithClientOverride';
import { FantomNetworkInfo, OptimismNetworkInfo } from '../../constants/networks';
import { optimismBlockClient, optimismClient} from '../../apollo/client';
import { ProtocolData } from './useProtocolDataWithClientOverride'

//TODO: Define interface with SupportedNetwork array
export interface AggregatedProtocolData {
    mainnetData: ProtocolData,
    arbitrumData: ProtocolData,
    polygonData: ProtocolData,
    volume: number;
    volumeChange: number;
    fees24: number;
    feesChange: number;
    tvl: number;
    tvlChange: number;
    swaps24: number;
    swapsChange: number;
}

export default function useAggregatedProtocolData() {
    const protocolData = useBalancerChainProtocolData(FantomNetworkInfo.clientUri, FantomNetworkInfo.startTimeStamp);
    const protocolOptimismData = useBalancerChainProtocolData(OptimismNetworkInfo.clientUri, OptimismNetworkInfo.startTimeStamp, optimismBlockClient, optimismClient);


    if (!protocolData && !protocolOptimismData) {
        return { mainnetData: [], arbitrumData: [], polygonData: [], volume24: 0, volumeChange: 0, fees24: 0, feesChange: 0, tvl: 0, tvlChange: 0, swaps24: 0 };
    }


    let tvl = 0
    let tvlChange = 0
    let volume = 0
    let volumeChange = 0
    let fees24 = 0
    let feeChange = 0
    let swaps24 = 0
    let swapsChange = 0

    if (protocolData.tvl && protocolOptimismData.tvl ) {
        tvl = protocolData.tvl + protocolOptimismData.tvl;
    }

    if (protocolData.tvlChange && protocolOptimismData.tvlChange ) {
        tvlChange = protocolData.tvlChange + protocolOptimismData.tvlChange;
    }

    if (protocolData.volume24 && protocolOptimismData.volume24 ) {
        volume = protocolData.volume24 + protocolOptimismData.volume24 ;
    }
    if (protocolData.volumeChange && protocolOptimismData.volumeChange ) {
        volumeChange = protocolData.volumeChange + protocolOptimismData.volumeChange ;
    }


    if (protocolData.fees24 && protocolOptimismData.fees24 ) {
        fees24 = protocolData.fees24 + protocolOptimismData.fees24 ;
    }

    if (protocolData.feesChange && protocolOptimismData.feesChange ) {
        feeChange = protocolData.feesChange + protocolOptimismData.feesChange ;
    }

    if (protocolData.swaps24 && protocolOptimismData.swaps24 ) {
        swaps24 = protocolData.swaps24 + protocolOptimismData.swaps24 ;
    }

    if (protocolData.swapsChange && protocolOptimismData.swapsChange ) {
        swapsChange = protocolData.swapsChange + protocolOptimismData.swapsChange ;
    }

    return {
        mainnetData: protocolData,
        optimismData: protocolOptimismData,
        volume: volume,
        volumeChange: volumeChange,
        fees24: fees24,
        feesChange: feeChange,
        tvl,
        tvlChange: tvlChange,
        swaps24: swaps24,
        swapsChange: swapsChange,

    };
}