import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { MovingWindowResult, EnergyMixData } from "../interfaces/types";

const FuelMixChart = dynamic(() => import('../components/FuelMixCharts'), {
    ssr: false,
    loading: () => <p style={{textAlign: 'center'}}>Charts loading...</p>
});

export default function Home() {
    const BACKEND_URL = "https://carcharging.onrender.com";

    const [dailyMix, setDailyMix] = useState<EnergyMixData[]>([]);
    const [hours, setHours] = useState<number>(1);
    const [bestWindow, setBestWindow] = useState<MovingWindowResult | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Data download
    useEffect(() => {
        axios.get<EnergyMixData[]>(`${BACKEND_URL}/api/energy/mix`)
            .then(res => {
                console.log("API data:", res.data);
                setDailyMix(res.data);
                setError(null);
            })
            .catch(err => {
                console.error("Getting data from endpoint error: ", err);
                setError("No data from endpoint, check backend");
            });
    }, []);

    const handleCalculate = () => {
        setLoading(true);
        setBestWindow(null);
        setError(null);

        axios.get<MovingWindowResult>(`${BACKEND_URL}/api/energy/best-window?hours=${hours}`)
            .then(res => {
                setBestWindow(res.data);
            })
            .catch(err => {
                console.error("Calculation error: ", err);
                if (axios.isAxiosError(err) && err.response && typeof err.response.data === 'string') {
                    setError(err.response.data);
                } else {
                    setError("Error during calculation occurred.");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1400px', margin: '0 auto' }}>
            <Head>
                <title>Energy Mix Dashboard</title>
            </Head>

            <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Energy Mix Dashboard</h1>

            {error && (
                <div style={{ color: '#721c24', backgroundColor: '#f8d7da', padding: '15px', marginBottom: '20px', borderRadius: '5px', textAlign: 'center', border: '1px solid #f5c6cb' }}>
                    <strong>Error: </strong> {error}
                </div>
            )}

            {/* Charts */}
            <section>
                <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px'}}>
                    Forecasted energy dashboard
                </h2>

                {dailyMix.length === 0 && !error && <p>Data loading...</p>}

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                    {dailyMix.map((day) => (
                        <div key={day.date} style={{
                            border: '1px solid #ddd',
                            padding: '20px',
                            borderRadius: '12px',
                            minWidth: '300px',
                            backgroundColor: 'white',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}>
                            <h3 style={{ textAlign: 'center'}}>{day.date}</h3>
                            <FuelMixChart dataMap={day.dailyMix} cleanEnergy={day.cleanEnergyPercent}/>
                        </div>
                    ))}
                </div>
            </section>

            <section style={{ marginTop: '60px', backgroundColor: '#f9f9f9', padding: '30px', borderRadius: '15px' }}>
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
                            style={{ marginLeft: '15px', padding: '8px', fontSize: '16px', width: '60px' }}
                        />
                    </label>

                    <button
                        onClick={handleCalculate}
                        disabled={loading}
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: '#0070f3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? "Calculating..." : "Find optimal start time"}
                    </button>
                </div>

                {bestWindow && (
                    <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#d1e7dd', color: '#0f5132', border: '1px solid #badbcc', borderRadius: '10px' }}>
                        <h3 style={{ marginTop: 0 }}>Best found charging window:</h3>
                        <p style={{ fontSize: '18px' }}>Start: <strong>{new Date(bestWindow.startTime).toLocaleString()}</strong></p>
                        <p style={{ fontSize: '18px' }}>End: <strong>{new Date(bestWindow.endTime).toLocaleString()}</strong></p>
                        <p style={{ fontSize: '18px' }}>Average clean energy: <strong>{bestWindow.cleanEnergyPercent.toFixed(2)}%</strong></p>
                    </div>
                )}
            </section>
        </div>
    );
}