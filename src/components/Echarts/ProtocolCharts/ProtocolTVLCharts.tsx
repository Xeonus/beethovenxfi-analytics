import ReactEcharts from 'echarts-for-react';
import { graphic } from 'echarts'
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles'
import CustomLinearProgress from '../../Progress/CustomLinearProgress';
import { formatDollarAmount } from '../../../utils/numbers';

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
    ftmData: number[],
    opData: number[],
    xAxis: string[],
}


export default function ProtocolTVLCharts({ ftmData, opData, xAxis }: ProtocolAreaChartProps) {


    const theme = useTheme()

    const option = {
        color: ['#00F89C','#f50202', '#37A2FF', '#0d8e74'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985',
                }
            },


        },
        legend: {
            data: ['Fantom', 'Optimism'],
            inactiveColor: "orange",
            icon: 'circle',
            textStyle: {
                color: theme.palette.mode === 'dark' ? 'white' : 'black'
            },
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: xAxis
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    formatter: function (d: number) {
                        return formatDollarAmount(d);
                    }
                }
            }
        ],
        series: [
            {
                name: 'Fantom',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.95,
                    color: new graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgb(0, 248, 156)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(94, 204, 214)'
                        }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                tooltip: {
                    valueFormatter: function (value: number) {
                        return formatDollarAmount(value)
                    }
                },
                data: ftmData
            },
            {
                name: 'Optimism',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.95,
                    color: new graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgb(245, 2, 2)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(214, 79, 79)'
                        }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                tooltip: {
                    valueFormatter: function (value: number) {
                        return formatDollarAmount(value)
                    }
                },
                data: opData
            },
            
            
        ]
    };

    const onChartHover = (params: any) => {
        console.log('Chart mouse trigger params:', params);
      };
    
      const onEvents = {
        mousemove: onChartHover,
      };

    return (
        ftmData.length > 1 && opData.length > 1 && xAxis ?
            <ReactEcharts
                option={option}
                style={{ height: '350px' }}
                className={'react_for_echarts'}
                //onEvents={onEvents}
            /> : <Grid
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