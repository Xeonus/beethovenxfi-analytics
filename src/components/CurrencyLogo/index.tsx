import { useMemo } from 'react';
import { useActiveNetworkVersion } from "../../state/application/hooks";
import { useTheme } from '@mui/material/styles'
import { FantomNetworkInfo, SupportedNetwork } from "../../constants/networks";
import { isAddress } from '../../utils';
import { Avatar } from '@mui/material';
import { useLatestTokenList } from '../../data/tokens/useLatestTokenList';
import { tokenClient, tokenClientOptimism } from '../../apollo/client';


export const getTokenLogoURL = (address: string, networkId: SupportedNetwork) => {
    switch (networkId) {
        case SupportedNetwork.FANTOM:
            return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/fantom/assets/${address}/logo.png`
        case SupportedNetwork.OPTIMISM:
            if (address === '0x040d1EdC9569d4Bab2D15287Dc5A4F10F56a56B8') {
                return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xba100000625a3754423978a60c9317c58a424e3D/logo.png`
            } else {
                return `https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/optimism/assets/${address}/logo.png`
            }
        default:
            return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/fantom/assets/${address}/logo.png`
    }
}

export default function CurrencyLogo({
    address,
    size = '24px',
}: {
    address?: string
    size?: string
}) {

    const [activeNetwork] = useActiveNetworkVersion();
    const theme = useTheme();
    const tokenList = useLatestTokenList(activeNetwork !== FantomNetworkInfo ? tokenClientOptimism : tokenClient, activeNetwork.chainId)

    //Balancer coin repository asset location
    let assetLoc = 'master';
    if (activeNetwork !== FantomNetworkInfo) {
        assetLoc = 'refactor-for-multichain'
    }

    //Secondary assets are loaded through Balancer
    const tempSources: { [address: string]: string } = useMemo(() => {
        return {
            [`${address}`]:
                `https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/${address}.png`,
        }
    }, [address, assetLoc])

    //Token image sources
    const srcs: string[] = useMemo(() => {
        const checkSummed = isAddress(address)


        if (checkSummed && address) {
            const override = tempSources[address]
            return [getTokenLogoURL(checkSummed, activeNetwork.id), override]
        }
        return []
    }, [address, tempSources, activeNetwork.id])

    const newSrc = tokenList.tokenList?.find(el => el.address === address);

    //Return an avatar for the default source, or an avatar as a child if default source is empty!
    return <Avatar
        sx={{
            height: size,
            width: size,
            backgroundColor: theme.palette.mode === 'dark' ? 'white' : 'rgb(226, 232, 240)',
            color: theme.palette.mode === 'dark' ? 'white' : 'black',
            fontSize: '15px',
        }}
        src={srcs[1]}
        children={
            <Avatar
                sx={{
                    height: size,
                    width: size,
                    backgroundColor: theme.palette.mode === 'dark' ? 'white' : 'rgb(226, 232, 240)',
                    color: 'black',
                    fontSize: '15px',
                }}
                src={newSrc && newSrc.logoURI ? newSrc.logoURI : srcs[0]}
                alt={'?'}
                />
        }
        alt={'?'}
    />

}
