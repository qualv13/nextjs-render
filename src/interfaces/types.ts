export interface EnergyMixData {
    date: string;
    cleanEnergyPercent: number;
    dailyMix: Record<string, number>;
}

export interface MovingWindowResult {
    startTime: string;
    endTime: string;
    cleanEnergyPercent: number;
}
