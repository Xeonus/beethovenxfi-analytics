
import { FormControl, Select, MenuItem, Avatar, Divider, SelectChangeEvent } from "@mui/material"
import { Box } from "@mui/system"
import { FantomNetworkInfo, OptimismNetworkInfo } from "../../constants/networks"
import { useActiveNetworkVersion } from "../../state/application/hooks"

import FtmLogo from '../../assets/svg/fantom-ftm-logo.svg'
import OpLogo from '../../assets/svg/optimism.svg'

import { useNavigate } from "react-router-dom";

export default function NetworkSelector() {

    const [activeNetwork, update] = useActiveNetworkVersion();
    const navigate = useNavigate();

    const handleNetworkChange = (evt: SelectChangeEvent) => {
        const chainId = evt.target.value as string;
        if (chainId === FantomNetworkInfo.chainId) {
            update(FantomNetworkInfo)
            navigate('/')

        } else if (chainId === OptimismNetworkInfo.chainId) {
            update(OptimismNetworkInfo)
            navigate('/optimism/chain');
        }
        
    };

    return (
        <FormControl size="small">
            <Select
                sx={{
                    backgroundColor: "background.paper",
                    boxShadow: 2,
                    borderRadius: 2,
                    borderColor: 0,
                }}
                color="primary"
                labelId="networkSelectLabel"
                id="chainSelect"
                onChange={handleNetworkChange}
                value={activeNetwork.chainId ? activeNetwork.chainId : ' '}
                inputProps={{
                    name: 'chainId',
                    id: 'chainId-native-simple',
                }}
            >
                <MenuItem disabled={true} dense={true}>Network selection:</MenuItem>
                <Divider/>
                <MenuItem value={FantomNetworkInfo.chainId} key="ftm">
                    <Box display="flex" alignItems="center">
                        <Box mr={0.5}>
                            <Avatar
                                sx={{
                                    height: 20,
                                    width: 20
                                }}
                                src={FtmLogo}
                            />
                        </Box>
                        <Box>
                            Fantom
                        </Box>
                    </Box>
                </MenuItem>
                <MenuItem value={OptimismNetworkInfo.chainId} key="optimism">
                    <Box display="flex" alignItems="center">
                        <Box mr={0.5}>
                            <Avatar
                                sx={{
                                    height: 20,
                                    width: 20
                                }}
                                src={OpLogo}
                            />
                        </Box>
                        <Box>
                            Optimism
                        </Box>
                    </Box>
                </MenuItem>
            </Select>
        </FormControl>
    );
}