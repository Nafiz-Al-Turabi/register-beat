import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Charts = () => {

    const { isLoading, isError, data = [], error, refetch } = useQuery({
        queryKey: ['revenue'],
        queryFn: async () => {
            const response = await axiosInstance.get('/admin/revenueDashboard', {

            });
            console.log(response.data);
            return response.data;
        },
    });

    const [barChartState] = useState({
        series: [
            {
                name: 'Net Profit',
                data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
            },
            {
                name: 'Revenue',
                data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
            },
            {
                name: 'Free Cash Flow',
                data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
            }
        ],
        options: {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '40%',
                    borderRadius: 2,
                    borderRadiusApplication: 'end'
                }
            },
            dataLabels: {
                enabled: false
            },
            colors: ['#5b21b6', '#ff7b00', '#02e2ff'],
            stroke: {
                show: true,
                width: 2,
                colors: ['#5b21b6', '#ff7b00', '#02e2ff'],
            },
            xaxis: {
                categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
            },
            yaxis: {
                title: {
                    text: '$ (thousands)'
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return "$ " + val + " thousands";
                    }
                }
            }
        }
    });

    const [cashFlowState] = useState({
        series: [
            {
                name: 'Cash Flow',
                data: [
                    1.45, 5.42, 5.9, -0.42, -12.6, -18.1, -18.2, -14.16, -11.1, -6.09, 0.34, 3.88, 13.07,
                    5.8, 2, 7.37, 8.1, 13.57, 15.75, 17.1, 19.8, -27.03, -54.4, -47.2, -43.3, -18.6, -48.6,
                    -41.1, -39.6, -37.6, -29.4, -21.4, -2.4
                ]
            }
        ],
        options: {
            chart: {  
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    colors: {
                        ranges: [
                            {
                                from: -100,
                                to: -46,
                                color: '#F15B46'
                            },
                            {
                                from: -45,
                                to: 0,
                                color: '#FEB019'
                            }
                        ]
                    },
                    columnWidth: '50%'
                }
            },
            dataLabels: {
                enabled: false
            },
            yaxis: {
                title: {
                    text: 'Growth'
                },
                labels: {
                    formatter: function (y) {
                        return y.toFixed(0) + "%";
                    }
                }
            },
            xaxis: {
                type: 'datetime',
                categories: [
                    '2011-01-01', '2011-02-01', '2011-03-01', '2011-04-01', '2011-05-01', '2011-06-01',
                    '2011-07-01', '2011-08-01', '2011-09-01', '2011-10-01', '2011-11-01', '2011-12-01',
                    '2012-01-01', '2012-02-01', '2012-03-01', '2012-04-01', '2012-05-01', '2012-06-01',
                    '2012-07-01', '2012-08-01', '2012-09-01', '2012-10-01', '2012-11-01', '2012-12-01',
                    '2013-01-01', '2013-02-01', '2013-03-01', '2013-04-01', '2013-05-01', '2013-06-01',
                    '2013-07-01', '2013-08-01', '2013-09-01'
                ],
                labels: {
                    rotate: -90
                }
            }
        }
    });

    return (
        <div className=" space-y-7 lg:space-y-0 gap-6 lg:flex mt-16">
            <div id="chart" className="p-4 bg-[#212529] rounded-lg shadow lg:w-1/2  hover:bg-zinc-900 duration-500">
                <h2 className="text-xl font-bold mb-4">Revenue & Profit Analysis</h2>
                <ReactApexChart
                    options={barChartState.options}
                    series={barChartState.series}
                    type="bar"
                    height={350}
                    className='text-black'
                />
            </div>
            <div id="chart" className="p-4 bg-[#212529] rounded-lg shadow lg:w-1/2 hover:bg-zinc-900 duration-500">
                <h2 className="text-xl font-bold mb-4">Cash Flow Analysis</h2>
                <ReactApexChart
                    options={cashFlowState.options}
                    series={cashFlowState.series}
                    type="bar"
                    height={350}
                    className='text-black'
                />
            </div>
        </div>
    );
};

export default Charts;