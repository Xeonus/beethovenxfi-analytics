import { PoolData } from "../../data/balancer/balancerTypes";
import { useTheme } from '@mui/material/styles'
import { AvatarGroup, Typography } from "@mui/material";
import { Avatar, Box } from "@mui/material";

interface PoolCompositionProps {
    poolData: PoolData;
    size?: number;
}

export default function PoolComposition({ poolData, size = 24 }: PoolCompositionProps) {

    const theme = useTheme();

    poolData.tokens = poolData.tokens.filter((tokens) => tokens.balance < 2596140000000000);
    return (
        <Box position={"relative"} display="flex" alignItems={"center"}>
            <AvatarGroup max={4}
                variant="rounded"
                sx={{
                    '& .MuiAvatar-root': {
                        height: size,
                        borderColor: theme.palette.mode === 'dark' ? 'rgb(142, 151, 153)' : 'gb(241, 245, 249)',
                        backgroundColor: theme.palette.mode === 'dark' ? 'rgb(116, 123, 125)' : 'rgb(226, 232, 240)',
                        borderRadius: '0.5rem',
                        marginLeft: '-0.5rem',
                        color: theme.palette.mode === 'dark' ? 'white' : 'black',
                        fontSize: '15px'
                    },
                }}
            >
                {poolData.tokens.map((token) =>
                    <Avatar
                        key={token.address + Math.random() * 10}
                        variant="rounded"
                        sx={{
                            height: size,
                            width: 'auto',
                            borderColor: theme.palette.mode === 'dark' ? 'rgb(30, 41, 59)' : 'gb(241, 245, 249)',
                            backgroundColor: theme.palette.mode === 'dark' ? 'rgb(51, 65, 85)' : 'rgb(226, 232, 240)',
                            borderRadius: '0.5rem',
                            marginLeft: '-0.5rem',
                        }}
                    >
                        <Box display="flex" justifyContent="space-between" ml={1.5} mr={1.5}>
                            <Typography color={theme.palette.mode === 'dark' ? 'white' : 'black'} mr={0.25} sx={{ fontWeight: 'bold' }} variant="caption">{token.symbol}</Typography>
                            {poolData.poolType === 'Weighted' ?
                                <Typography color={theme.palette.mode === 'dark' ? 'white' : 'black'} variant="caption">{Number((token.weight * 100).toFixed(0))}%</Typography>
                                : null}
                        </Box>
                    </Avatar>
                )}
            </AvatarGroup>
        </Box>
    )
}