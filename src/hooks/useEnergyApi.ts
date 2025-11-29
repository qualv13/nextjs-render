import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { EnergyMixData, MovingWindowResult } from '../interfaces/types';
import { API_BASE_URL } from '../utils/config';

export const useEnergyApi = () => {
    const [dailyMix, setDailyMix] = useState<EnergyMixData[]>([]);
    const [dashboardError, setDashboardError] = useState<string | null>(null);

    const [calcResult, setCalcResult] = useState<MovingWindowResult | null>(null);
    const [calcLoading, setCalcLoading] = useState(false);
    const [calcError, setCalcError] = useState<string | null>(null);

    useEffect(() => {
        axios.get<EnergyMixData[]>(`${API_BASE_URL}/api/energy/mix`)
            .then(res => {
                setDailyMix(res.data);
                setDashboardError(null);
            })
            .catch(err => {
                console.error(err);
                setDashboardError("No data from endpoint, check backend");
            });
    }, []);

    const findBestWindow = useCallback((hours: number) => {
        setCalcLoading(true);
        setCalcResult(null);
        setCalcError(null);

        axios.get<MovingWindowResult>(`${API_BASE_URL}/api/charging/best-window?hours=${hours}`)
            .then(res => setCalcResult(res.data))
            .catch(err => {
                console.error(err);
                if (axios.isAxiosError(err) && typeof err.response?.data === 'string') {
                    setCalcError(err.response.data);
                } else {
                    setCalcError("Error during calculation occurred.");
                }
            })
            .finally(() => setCalcLoading(false));
    }, []);

    return {
        dailyMix,
        dashboardError,
        calculator: {
            calculate: findBestWindow,
            result: calcResult,
            loading: calcLoading,
            error: calcError
        }
    };
};