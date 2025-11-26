import React, { useState } from 'react';
import axios from 'axios';
import { MovingWindowResult } from '../interfaces/types';

export const MovingWindowCalc: React.FC = () => {
    const [hours, setHours] = useState<number>(1);
    const [result, setResult] = useState<MovingWindowResult | null>(null);
    const [loading, setLoading] = useState(false);

    const handleCalculate = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/charging-window?hours=${hours}`);
            setResult(response.data);
        } catch (error) {
            console.error("Data get from endpoint error: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ marginTop: '40px', padding: '20px', border: '1px solid #eee' }}>
            <h2>Charging Calculator</h2>
            <label>
                Time of charging (in hours):
                <input
                    type="number"
                    min="1"
                    max="6"
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    onError={(e) => console.error("Error getting charging hours", e)}
                />
            </label>
            <button onClick={handleCalculate} disabled={loading}>
                {loading ? 'Calculating...' : 'Find best window'}
            </button>

            {result && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Best time to charge car:</h3>
                    <ul>
                        <li>Start: {result.startTime}</li>
                        <li>End: {result.endTime}</li>
                        <li>Average clean energy percentage: {result.averageCleanPercent}%</li>
                    </ul>
                </div>
            )}
        </div>
    );
};