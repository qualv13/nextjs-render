import React, { useState } from 'react';
import { MovingWindowResult } from '../interfaces/types';

interface Props {
    onCalculate: (hours: number) => void;
    result: MovingWindowResult | null;
    loading: boolean;
    error: string | null;
}

export const SmartCalculator: React.FC<Props> = ({ onCalculate, result, loading, error }) => {
    const [hours, setHours] = useState<number>(1);

    return (
        <section style={styles.container}>
            <h2 style={{ borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>
                Smart Charging Calculator
            </h2>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginTop: '20px' }}>
                <label style={{ fontSize: '18px' }}>
                    Time of car charging in hours (1-6):
                    <input
                        type="number"
                        min={1}
                        max={6}
                        value={hours}
                        onChange={(e) => setHours(Number(e.target.value))}
                        style={styles.input}
                    />
                </label>

                <button
                    onClick={() => onCalculate(hours)}
                    disabled={loading}
                    style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
                >
                    {loading ? "Calculating..." : "Find optimal start time"}
                </button>
            </div>

            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

            {result && (
                <div style={styles.resultBox}>
                    <h3 style={{ marginTop: 0 }}>Best found charging window:</h3>
                    <p style={styles.resultText}>Start: <strong>{new Date(result.startTime).toLocaleString()}</strong></p>
                    <p style={styles.resultText}>End: <strong>{new Date(result.endTime).toLocaleString()}</strong></p>
                    <p style={styles.resultText}>Average clean energy: <strong>{result.cleanEnergyPercent.toFixed(2)}%</strong></p>
                </div>
            )}
        </section>
    );
};

const styles = {
    container: { marginTop: '60px', backgroundColor: '#f9f9f9', padding: '30px', borderRadius: '15px' },
    input: { marginLeft: '15px', padding: '8px', fontSize: '16px', width: '60px' },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#0070f3',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    },
    resultBox: { marginTop: '30px', padding: '20px', backgroundColor: '#d1e7dd', color: '#0f5132', border: '1px solid #badbcc', borderRadius: '10px' },
    resultText: { fontSize: '18px' }
};