import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

interface Props {
    dataMap: Record<string, number>;
    cleanEnergy: number;
}

const FuelMixChart = ({ dataMap, cleanEnergy }: Props) => {
    if (!dataMap) {
        return <div style={{height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Loading...</div>;
    }

    const chartData = Object.keys(dataMap)
        .map((key) => ({
            name: key,
            value: Number(dataMap[key].toFixed(2)),
        }))
        .filter((item) => item.value > 0);

    if (chartData.length === 0) {
        return <div style={{height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>No data to show</div>;
    }

    const chartWidth = 360;
    const chartHeight = 320;

    // Wyśrodkowanie
    const midX = chartWidth / 2;
    const midY = 130;

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <PieChart width={chartWidth} height={chartHeight} margin={{ top: 0, bottom: 0, left: 0, right: 0 }}>
                <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx={midX}
                    cy={midY}
                    paddingAngle={3}
                    cornerRadius={5}
                    innerRadius={55}
                    outerRadius={90}
                    fill="#8884d8"
                    label
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>

                {/* Text inside */}
                <text
                    x={midX}
                    y={midY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{ fontSize: '24px', fontWeight: 'bold', fill: '#333' }}
                >
                    {cleanEnergy ? cleanEnergy.toFixed(2) : 0}%
                </text>
                <text
                    x={midX}
                    y={midY + 20}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{ fontSize: '12px', fill: '#999' }}
                >
                    Clean energy
                </text>

                <Tooltip />

                <Legend wrapperStyle={{ marginTop: '10px' }} />
            </PieChart>
        </div>
    );
};

export default FuelMixChart;