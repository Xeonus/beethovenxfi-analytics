import Box from '@mui/material/Box';
import { Grid, CircularProgress, Typography, Stack, Skeleton } from '@mui/material';
import { useCoinGeckoSimpleTokenPrices } from '../../data/coingecko/useCoinGeckoSimpleTokenPrices';
import CoinCard from '../../components/Cards/CoinCard';
import MetricsCard from '../../components/Cards/MetricsCard';
import useAggregatedProtocolData from '../../data/balancer/useAggregatedProtocolData';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import PieChartIcon from '@mui/icons-material/PieChart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useBalancerChainProtocolData } from '../../data/balancer/useProtocolDataWithClientOverride';
import { FantomNetworkInfo, OptimismNetworkInfo } from '../../constants/networks';
import { optimismBlockClient, optimismClient } from '../../apollo/client';
import ProtocolMultipleBarChart from '../../components/Echarts/ProtocolCharts/ProtocolMultiBarChart';
import ProtocolMultiAreaChart from '../../components/Echarts/ProtocolCharts/ProtocolMultiAreaChart';
import CustomLinearProgress from '../../components/Progress/CustomLinearProgress';
import ExploreCard from '../../components/Cards/ExploreCard';
import FtmLogo from '../../assets/svg/fantom-ftm-logo.svg'
import OpLogo from '../../assets/svg/optimism.svg'
import { useLatestTokenList } from '../../data/tokens/useLatestTokenList';



export default function Protocol() {

    //TODO: obtain form contants
    const beetsAddress = '0xf24bcf4d1e507740041c9cfd2dddb29585adce1e';
    //Data
    const aggregatedProtocolData = useAggregatedProtocolData();
    const coinData = useCoinGeckoSimpleTokenPrices([beetsAddress]);

    //const tokenList = useLatestTokenList();
    //console.log("tokenList", tokenList)

    const protocolData = useBalancerChainProtocolData(FantomNetworkInfo.clientUri, FantomNetworkInfo.startTimeStamp);
    const optimismProtocolData = useBalancerChainProtocolData(OptimismNetworkInfo.clientUri, OptimismNetworkInfo.startTimeStamp, optimismBlockClient, optimismClient);

    //Mainnet dominance
    const mainnetTVL = protocolData.tvl ? protocolData.tvl : 0
    const mainnetTVLChange = protocolData.tvlChange ? protocolData.tvlChange : 0
    const swapsChange = aggregatedProtocolData.swapsChange ? aggregatedProtocolData.swapsChange * 100 : 0
    const mainnetPercentage = 100 / aggregatedProtocolData.tvl * mainnetTVL

    return (
        <Box sx={{ flexGrow: 2 }}>
            <Grid
                container
                spacing={2}
                sx={{ justifyContent: 'center' }}
            >
                
                <Grid
                    item
                    xs={11}
                >
                    <Grid
                        container
                        spacing={{ xs: 2, md: 2 }}
                        columns={{ xs: 4, sm: 2, md: 10 }}
                    >
                        <Grid item xs={11} sm={4} md={4}>
                            {coinData && coinData[beetsAddress] && coinData[beetsAddress].usd ?
                                <CoinCard
                                    tokenAddress={beetsAddress}
                                    tokenName='Beets'
                                    tokenPrice={coinData[beetsAddress].usd}
                                    tokenPriceChange={coinData[beetsAddress].usd_24h_change}

                                />
                                : <CircularProgress />}

                        </Grid>
                    </Grid>
                </Grid>
                <Grid item mt={1} xs={11}>
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                    >
                        <Box mb={1}>
                            <ExploreCard linkName='Fantom' linkTarget={'chain'} svgPath={FtmLogo} />
                        </Box>
                        <Box mb={1}>
                            <ExploreCard linkName='Optimism' linkTarget={'optimism/chain'} svgPath={OpLogo} />
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
            {protocolData.feeData.length > 10 && optimismProtocolData.feeData.length > 10 ?
                <Grid
                    container
                    spacing={1}
                    sx={{ justifyContent: 'center' }}
                >

                    <Grid item mt={1} xs={11}>
                        <Typography variant='h5'>Historical TVL</Typography>
                    </Grid>
                    <Grid item mt={1} xs={11}>
                        <Stack
                            direction={{ xs: 'column', md: 'row' }}
                        >
                            <Box mr={3} mb={1}>
                                <MetricsCard
                                    mainMetric={aggregatedProtocolData.tvl}
                                    mainMetricInUSD={true}
                                    metricName='Protocol TVL'
                                    mainMetricChange={aggregatedProtocolData.tvlChange * 100}
                                    MetricIcon={MonetizationOnIcon}
                                />
                            </Box>

                            <Box mr={1} mb={1}>
                                <MetricsCard
                                    mainMetric={mainnetPercentage}
                                    mainMetricInUSD={false}
                                    mainMetricUnit={' %'}
                                    metricName='Fantom Dominance'
                                    mainMetricChange={mainnetTVLChange * 100}
                                    MetricIcon={PieChartIcon}
                                />
                            </Box>
                        </Stack>
                    </Grid>

                    <Grid item mt={1} xs={11}>
                        <ProtocolMultiAreaChart
                            ftmProtocolData={protocolData}
                            optimismProtocolData={optimismProtocolData}
                        />
                    </Grid>
                    <Grid item mt={1} xs={11} >
                        <Typography variant='h5'>Historical Volume</Typography>
                    </Grid>
                    <Grid item xs={11}>
                        <MetricsCard
                            mainMetric={aggregatedProtocolData.volume ? aggregatedProtocolData.volume : 0}
                            mainMetricInUSD={true}
                            metricName='Protocol Volume'
                            mainMetricChange={aggregatedProtocolData.volumeChange}
                            MetricIcon={EqualizerIcon}
                        />

                    </Grid>
                    <Grid item mt={1} xs={11} >
                        <ProtocolMultipleBarChart
                            ftmProtocolData={protocolData.volumeData}
                            optimismProtocolData={optimismProtocolData.volumeData}
                            isUSD={true}
                        />
                    </Grid>
                    <Grid item mt={1} xs={11} >
                        <Typography variant='h5'>Historical Fees</Typography>
                    </Grid>
                    <Grid item xs={11}>
                        <MetricsCard
                            mainMetric={aggregatedProtocolData.fees24}
                            mainMetricInUSD={true}
                            metricName='Protocol Fees'
                            mainMetricChange={aggregatedProtocolData.feesChange}
                            MetricIcon={CurrencyExchangeIcon}
                        />
                    </Grid>
                    <Grid item mt={1} xs={11} >
                        <ProtocolMultipleBarChart
                            ftmProtocolData={protocolData.feeData}
                            optimismProtocolData={optimismProtocolData.feeData}
                            isUSD={true}
                        />
                    </Grid>

                    <Grid item mt={1} xs={11} >
                        <Typography variant='h5'>Historical Swaps</Typography>
                    </Grid>
                    <Grid item xs={11}>
                        <MetricsCard
                            mainMetric={aggregatedProtocolData.swaps24 ? aggregatedProtocolData.swaps24 : 0}
                            mainMetricInUSD={false}
                            metricName='Swaps'
                            mainMetricChange={swapsChange}
                            MetricIcon={SwapHorizIcon}
                        />
                    </Grid>
                    <Grid item mt={1} xs={11} >
                        <ProtocolMultipleBarChart
                            ftmProtocolData={protocolData.swapData}
                            optimismProtocolData={optimismProtocolData.swapData}
                            isUSD={false}
                        />
                    </Grid>

                </Grid> : <Grid
                    container
                    spacing={2}
                    mt='10%'
                    mb='10%'
                    sx={{ justifyContent: 'center' }}
                >
                    <CustomLinearProgress />
                </Grid>}
        </Box>
    );
}