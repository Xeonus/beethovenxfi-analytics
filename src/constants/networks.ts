

import OPTIMISM_LOGO_URL from '../assets/svg/optimism.svg';
import FANTOM_LOGO from '../assets/svg/fantom-ftm-logo.svg';

import { 
    BALANCER_PRIMARY_COLOR, 
    BALANCER_SECONDARY_COLOR, 
    BALANCER_APP_LINK, 
    BALANCER_APP_OP_LINK, 
    BALANCER_SUBGRAPH_START_TIMESTAMP,
    BALANCER_SUBGRAPH_START_OP_TIMESTAMP, 
    BALANCER_SUBGRAPH_URL_STELLATE,
    BALANCER_SUBGRAPH_OP_URL_STELLATE
} from '../data/balancer/constants';



export enum SupportedNetwork {
    FANTOM,
    OPTIMISM,
}

export type NetworkInfo = {
  id: SupportedNetwork
  chainId: string
  coingeckoId: string
  debankId: string
  balAddress: string,
  decentralicedClientUri: string
  alchemyRPCUrl: string
  alchemyKey: string
  feeCollectorThreshold: number
  route: string
  name: string
  startTimeStamp: number
  clientUri: string
  appUri: string
  imageURL: string
  bgColor: string
  primaryColor: string
  secondaryColor: string
  blurb?: string
}

export const FantomNetworkInfo: NetworkInfo = {
    id: SupportedNetwork.FANTOM,
    chainId: '20250',
    coingeckoId: 'fantom',
    debankId: 'ftm',
    balAddress: '0xf24bcf4d1e507740041c9cfd2dddb29585adce1e',
    decentralicedClientUri: '',
    route: '',
    name: 'Fantom',
    startTimeStamp: BALANCER_SUBGRAPH_START_TIMESTAMP,
    clientUri: BALANCER_SUBGRAPH_URL_STELLATE,
    appUri: BALANCER_APP_LINK,
    alchemyKey: '',
    alchemyRPCUrl: '',
    feeCollectorThreshold: 1000,
    bgColor: BALANCER_PRIMARY_COLOR,
    primaryColor: BALANCER_PRIMARY_COLOR,
    secondaryColor: BALANCER_SECONDARY_COLOR,
    imageURL: FANTOM_LOGO,
};


export const OptimismNetworkInfo: NetworkInfo = {
    id: SupportedNetwork.OPTIMISM,
    chainId: '10',
    coingeckoId: 'optimistic-ethereum',
    debankId: 'op',
    balAddress: '0xf24bcf4d1e507740041c9cfd2dddb29585adce1e',
    decentralicedClientUri: '',
    route: 'optimism',
    name: 'OΞ (Optimism)',
    startTimeStamp: BALANCER_SUBGRAPH_START_OP_TIMESTAMP,
    appUri: BALANCER_APP_OP_LINK,
    clientUri: BALANCER_SUBGRAPH_OP_URL_STELLATE,
    alchemyKey: '',
    alchemyRPCUrl: '',
    feeCollectorThreshold: 1000,
    bgColor: '#F01B36',
    primaryColor: '#F01B36',
    secondaryColor: '#FB7876',
    imageURL: OPTIMISM_LOGO_URL,
    blurb: 'L2 Beta',
};

export const SUPPORTED_NETWORK_VERSIONS: NetworkInfo[] = [
    FantomNetworkInfo,
    OptimismNetworkInfo,
];