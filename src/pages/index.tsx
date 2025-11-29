import React from 'react';
import Head from 'next/head';
import { useEnergyApi } from '../hooks/useEnergyApi';
import { ForecastDashboard } from '../components/ForecastDashboard';
import { SmartCalculator } from '../components/SmartCalculator';

export default function Home() {
    const { dailyMix, dashboardError, calculator } = useEnergyApi();

    return (
        <div style={styles.container}>
            <Head>
                <title>Energy Mix Dashboard</title>
            </Head>

            <h1 style={styles.header}>Energy Mix Dashboard</h1>

            {dashboardError && (
                <div style={styles.errorBox}>
                    <strong>Error: </strong> {dashboardError}
                </div>
            )}

            <ForecastDashboard
                data={dailyMix}
                error={dashboardError}
            />

            <SmartCalculator
                onCalculate={calculator.calculate}
                result={calculator.result}
                loading={calculator.loading}
                error={calculator.error}
            />
        </div>
    );
}

const styles = {
    container: { padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1400px', margin: '0 auto' },
    header: { textAlign: 'center' as const, marginBottom: '40px' },
    errorBox: {
        color: '#721c24',
        backgroundColor: '#f8d7da',
        padding: '15px',
        marginBottom: '20px',
        borderRadius: '5px',
        textAlign: 'center' as const,
        border: '1px solid #f5c6cb'
    }
};