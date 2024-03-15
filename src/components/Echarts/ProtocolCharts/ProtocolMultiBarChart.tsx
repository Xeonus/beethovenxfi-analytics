import React, {useEffect, useState} from 'react';
import { Card, Grid, Box } from '@mui/material';
import CustomLinearProgress from '../../Progress/CustomLinearProgress';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Divider } from '@mui/material';
import ProtocolMultiBarCharts from './ProtocolMultiBarCharts';
import { BalancerChartDataItem } from '../../../data/balancer/balancerTypes';

export interface Normal {
    color: string;
}

export interface ItemStyle {
    normal: Normal;
}

export interface echartsData {
    name: number;
    type: string;
    itemStyle: ItemStyle;
}

export interface ToolTipParams {
  value: string;
  data: echartsData;
}

interface ProtocolAreaChartProps {
    ftmProtocolData: BalancerChartDataItem[],
    optimismProtocolData: BalancerChartDataItem[],
    isUSD : boolean
}



export default function ProtocolMultiBarChart({ftmProtocolData, optimismProtocolData, isUSD}: ProtocolAreaChartProps) {

    const ftmData = ftmProtocolData.map(el => Number(el.value.toFixed(2)));
    let opData = optimismProtocolData.map(el => Number(el.value.toFixed(2)));
    

    //add preceeding zero values based on mainnet size to later deployed chains
    if (ftmData && opData) {
        const diffSize = ftmData.length - opData.length;
        const zeroArray = ftmData.slice(0, diffSize).map(el => 0);
        opData = zeroArray.concat(opData);
    }


    //Generic x-Axis
    const ftmxAxisData = ftmProtocolData.map(el => el.time);

    // Hooks for custom time ranges
    const [timeRange, setTimeRange] = useState('365');

    // Data state
    const [rangedFtmData, setRangedFtmData] = useState(ftmData);
    const [rangedOpData, setRangedOpData] = useState(opData);
    const [rangedXAxis, setRangedXAxis] = useState(ftmxAxisData);

    useEffect(() => {
        // This effect adjusts the displayed data based on the selected time range
        const range = Number(timeRange); // Convert once and use throughout
        const totalDataLength = ftmxAxisData.length;
        const rangeStart = range === 0 ? 0 : Math.max(totalDataLength - range, 0);

        setRangedFtmData(ftmData.slice(rangeStart));
        setRangedOpData(opData.slice(rangeStart));
        setRangedXAxis(ftmxAxisData.slice(rangeStart));
    }, [timeRange]);

    const handleChange = (event: SelectChangeEvent<string>) => {
        setTimeRange(event.target.value);
    };

    return (
        ftmData.length > 10 ?
        <Card sx={{boxShadow: 3}}>
            <Box m={1}>
            <FormControl size="small">
                    <Select
                        sx={{
                            backgroundColor: "background.paper",
                            boxShadow: 2,
                            borderRadius: 2,
                            borderColor: 0,
                        }}
                        color="primary"
                        labelId="timeRangeSelectLabel"
                        id="timeRangeSelect"
                        onChange={handleChange}
                        value={timeRange}
                        inputProps={{
                            name: 'timeRange',
                            id: 'timeRangeId-native-simple',
                        }}
                    >
                        <MenuItem disabled={true} dense={true}>Time range:</MenuItem>
                        <Divider />
                        <MenuItem value={'30'}> 30 days</MenuItem>
                        <MenuItem value={'90'}>90 days</MenuItem>
                        <MenuItem value={'180'}>180 days</MenuItem>
                        <MenuItem value={'365'}>365 days</MenuItem>
                        <MenuItem value={'0'}>All time</MenuItem>
                    </Select>
                </FormControl>
                </Box>
            <ProtocolMultiBarCharts  
                ftmData={rangedFtmData}
                opData={rangedOpData}
                xAxis={rangedXAxis}
                isUSD={isUSD}
                />
            </Card> : <Grid
            container
            spacing={2}
            mt='10%'
            mb='10%'
            sx={{ justifyContent: 'center' }}
        >
            <CustomLinearProgress />
        </Grid>
    )
}