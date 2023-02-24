import React from 'react';
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

    //---Hooks for custom time ranges---
    const [timeRange, setTimeRange] = React.useState('365');
    //data state
    const [rangedftmData, setrangedftmData] = React.useState(ftmData)
    const [rangedopData, setrangedopData] = React.useState(opData);
    const [rangedxAxis, setRangedxAxis] = React.useState(ftmxAxisData);

    React.useEffect(() => {
        if (ftmData.length < Number(timeRange) || timeRange === '0') {
            setrangedftmData(ftmData);
            setrangedopData(opData);
            setRangedxAxis(ftmxAxisData)
        } else {
            setrangedftmData(ftmData.slice(ftmData.length - Number(timeRange)))
            setrangedopData(opData.slice(opData.length - Number(timeRange)))
            setRangedxAxis(ftmxAxisData.slice(ftmxAxisData.length - Number(timeRange)))
        }
    }, [timeRange]);

    const handleChange = (event: SelectChangeEvent) => {
        setTimeRange(event.target.value as string);
        if (ftmData.length < Number(event.target.value) || event.target.value === '0') {
            setrangedftmData(ftmData);
            setrangedopData(opData);
        } else if (ftmData.length >= Number(event.target.value)) {
            setrangedftmData(ftmData.slice(ftmData.length - Number(event.target.value)))
            setrangedopData(opData.slice(opData.length - Number(event.target.value)))
        }
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
                ftmData={rangedftmData} 
                opData={rangedopData} 
                xAxis={rangedxAxis}
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