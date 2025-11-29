import React from 'react';
import dynamic from 'next/dynamic';
import { EnergyMixData } from '../interfaces/types';
import { API_BASE_URL } from '../utils/config';

const FuelMixChart = dynamic(() => import('./FuelMixChart'), {
    ssr: false,
    loading: () => <p style={{ textAlign: 'center' }}>Charts loading...</p>
});

interface Props {
    data: EnergyMixData[];
    error: string | null;
}

export const ForecastDashboard: React.FC<Props> = ({ data, error }) => {
    return (
        <section>
            <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
                Forecasted energy dashboard
            </h2>

            {data.length === 0 && !error && (
                <p>
                    Data loading...<br />
                    if data isn't visible, go <a href={API_BASE_URL}>here</a> to start backend and refresh page
                </p>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                {data.map((day) => (
                    <div key={day.date} style={styles.card}>
                        <h3 style={{ textAlign: 'center' }}>{day.date}</h3>
                        <FuelMixChart dataMap={day.dailyMix} cleanEnergy={day.cleanEnergyPercent} />
                    </div>
                ))}
            </div>
        </section>
    );
};

const styles = {
    card: {
        border: '1px solid #ddd',
        padding: '20px',
        borderRadius: '12px',
        minWidth: '300px',
        backgroundColor: 'white',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }
};