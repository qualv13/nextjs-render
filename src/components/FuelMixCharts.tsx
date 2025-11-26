import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

interface Props {
    dataMap: Record<string, number>;
}

const FuelMixChart = ({ dataMap }: Props) => {
    if (!dataMap) {
        return <div style={{height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Loading...</div>;
    }

    // Data to array and filter zeros
    const chartData = Object.keys(dataMap)
        .map((key) => ({
            name: key,
            value: Number(dataMap[key].toFixed(2)),
        }))
        .filter((item) => item.value > 0);


    if (chartData.length === 0) {
        return <div style={{height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>No data to show</div>;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <PieChart width={300} height={250}>
                <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
};

export default FuelMixChart;