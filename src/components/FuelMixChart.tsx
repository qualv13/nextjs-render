import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

interface Props {
    dataMap: Record<string, number>;
    cleanEnergy: number;
}

const FuelMixChart = ({ dataMap, cleanEnergy }: Props) => {
    const chartData = useMemo(() => {
        if (!dataMap) return [];
        return Object.keys(dataMap)
            .map((key) => ({ name: key, value: Number(dataMap[key].toFixed(2)) }))
            .filter((item) => item.value > 0);
    }, [dataMap]);

    if (!dataMap) return <div style={styles.centerMsg}>Loading...</div>;
    if (chartData.length === 0) return <div style={styles.centerMsg}>No data to show</div>;

    const midX = 360 / 2;
    const midY = 130;

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <PieChart width={360} height={320}>
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
                    label
                >
                    {chartData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>

                <text x={midX + 5} y={midY} textAnchor="middle" dominantBaseline="middle" style={styles.percentText}>
                    {cleanEnergy ? cleanEnergy.toFixed(2) : 0}%
                </text>
                <text x={midX + 4} y={midY + 20} textAnchor="middle" dominantBaseline="middle" style={styles.subText}>
                    Clean energy
                </text>

                <Tooltip />
                <Legend wrapperStyle={{ marginTop: '10px' }} />
            </PieChart>
        </div>
    );
};

const styles = {
    centerMsg: { height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center' },
    percentText: { fontSize: '24px', fontWeight: 'bold', fill: '#333' },
    subText: { fontSize: '12px', fill: '#999' }
} as const;

export default FuelMixChart;