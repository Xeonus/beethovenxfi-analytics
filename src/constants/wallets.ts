import { FantomNetworkInfo, OptimismNetworkInfo } from "./networks";

//Mainnet fee collector address
export const FEE_COLLECTOR_ADDRESS = '0xC6920d3a369E7c8BD1A22DbE385e11d1F7aF948F';

export const FEE_STREAMER = '0xe649b71783d5008d10a96b6871e3840a398d4f06';

export const FEE_STREAMER_2 = '0x7c68c42de679ffb0f16216154c996c354cf1161b';

//Service Providers
export const SERVICE_PROVIDER_WALLETS = [
    {
        name: 'Orb Collective Safe',
        walletId: '0x3b8910f378034fd6e103df958863e5c684072693',
    },
    {
        name: 'Balancer Grants Safe',
        walletId: '0xE2c91f3409Ad6d8cE3a2E2eb330790398CB23597',
    },
    {
        name: 'Balancer Maxis Safe',
        walletId: '0x166f54F44F271407f24AA1BE415a730035637325',
    },
    {
        name: 'Fjord Proxy',
        walletId: '0x9a74cbff3f36ff1e433ef88d0ec1cdcd1eb79afa'
    },
    {
        name: 'Ribbon Vault',
        walletId: '0x2a6b048eb15c7d4ddca27db4f9a454196898a0fe'
    },
    {
        name: 'Fee Collector Relayer',
        walletId: '0xe649B71783d5008d10a96b6871e3840a398d4F06'
    },
    {
        name: 'DAO Fee Sweeper',
        walletId: '0x7c68c42De679ffB0f16216154C996C354cF1161B'
    },
    {
        name: 'Aave Collector V2',
        walletId: '0x464c71f6c2f760dda6093dcb91c24c39e5d6e18c'
    }
]

export function getSPWalletName(walletId: string) {
    const targetWallet = SERVICE_PROVIDER_WALLETS.find(wallet => wallet.walletId.toLowerCase() === walletId)
    return targetWallet ? targetWallet.name : '-';
}

//Treasury addresses
const TREASURY_ADDRESS_FTM = '0xa1e849b1d6c2fd31c63eef7822e9e0632411ada7';
const TREASURY_ADDRESS_OP = '0x2a185c8a3c63d7bfe63ad5d950244ffe9d0a4b60';
//Copper proxy contracts
const COPPER_LAUNCH_PROXY_MAINNET = '0x9a74cbff3f36ff1e433ef88d0ec1cdcd1eb79afa';
const COPPER_LAUNCH_PROXY_ARBITRUM = '0x22D15E202538e90d6fDaE5044A4D6a28453aA4C5';
const COPPER_LAUNCH_PROXY_POLYGON ='0x7388feB5a04990bb4c7570e68F1b37aB06C1aafD';
export const DAO_FEE_MULTISIG  = '0xe649b71783d5008d10a96b6871e3840a398d4f06';
export const KARPATKEY_SAFE = '0x0EFcCBb9E2C09Ea29551879bd9Da32362b32fc89'

export const TREASURY_ADDRESS_CONFIG = [
    {
        chainID: FantomNetworkInfo.chainId,
        treasury: TREASURY_ADDRESS_FTM,
        copper: COPPER_LAUNCH_PROXY_MAINNET,
        feeCollector: '0xC6920d3a369E7c8BD1A22DbE385e11d1F7aF948F'
    },
    {
        chainID: OptimismNetworkInfo.chainId,
        treasury: TREASURY_ADDRESS_OP,
        copper: COPPER_LAUNCH_PROXY_ARBITRUM,
        feeCollector: '0xce88686553686DA562CE7Cea497CE749DA109f9F'
    }
];

export function getTreasuryConfig(chainID: string) {
    const TREASURY_CONFIG = TREASURY_ADDRESS_CONFIG.find((t) => t.chainID === chainID);
    if (TREASURY_CONFIG) {
        return TREASURY_CONFIG;
    }
    return TREASURY_ADDRESS_CONFIG[0];

}