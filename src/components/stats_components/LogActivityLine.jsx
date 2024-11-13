import React, {useState, useEffect} from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

function LogActivityLineChart({ log_activity }) {

    const data = Object.entries(log_activity).map(([date, count]) => ({
        date,
        count
    }));

    const tooltipStyle = {
        backgroundColor: '#333',
        color: 'white',
        borderRadius: '4px',
        padding: '10px',
        border: '1px solid #333',
    };

    const [chartConfig, setChartConfig] = useState({
        marginLeft: 0,
        tickFontSize: 14,
    });

    useEffect(() => {
        const updateConfig = () => {
            if (window.innerWidth <= 768) {
                setChartConfig({
                    marginLeft: -25,
                    tickFontSize: 10,
                });
            } else {
                setChartConfig({
                    marginLeft: 0,
                    tickFontSize: 10,
                });
            }
        };

        updateConfig();
        window.addEventListener('resize', updateConfig);
        return () => window.removeEventListener('resize', updateConfig);
    }, []);

    return (
        <div className=' w-full md:w-[80%] lg:w-[50%] h-56 md:h-96 bg-slate-500 bg-opacity-50 pt-4 md:py-10  pr-5 flex flex-col gap-0 md:gap-2'>
            <p className='font-oswald text-center text-white'>Log Activity</p>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 0, right: 0, bottom: 10, left: chartConfig.marginLeft }}>
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis dataKey="date" tick={{ fill: 'white', fontSize: chartConfig.tickFontSize}} />
                    <YAxis domain={[0, 'dataMax+20']} tick={{ fill: 'white', fontSize: chartConfig.tickFontSize}} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Line type="monotone" dataKey="count" stroke="white" activeDot={{
                        r: 8,
                        onClick: (e) => {
                       
                        },
                    }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default LogActivityLineChart;
