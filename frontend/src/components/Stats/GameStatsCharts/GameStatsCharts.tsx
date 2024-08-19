import React from 'react';
import {useTranslation} from "react-i18next";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

import './GameStatsCharts.css';

interface GameStatsChartsProps {
    gameType: string;
    labels: string[];
    timeData: number[];
    scoreData: number[];
}

const GameStatsCharts: React.FC<GameStatsChartsProps> = ({ gameType, labels, timeData, scoreData }) => {
    const { t } = useTranslation();
    const timeChartData = {
        labels,
        datasets: [
            {
                label: t('time'),
                data: timeData,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    const scoreChartData = {
        labels,
        datasets: [
            {
                label: (gameType === 'sorting-waste') || (gameType === 'raining-waste') ? t('error') : t('score'),
                data: scoreData,
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
            },
        ],
    };

    return (
        <div className="game-stat-chart-container">
            <div className="game-stat-chart-graph">
                <h3 className="game-stat-chart-grah-title">{t('time')}</h3>
                <div className="game-stat-chart-graph-line-container">
                    <Line data={timeChartData} />
                </div>
            </div>
            <div className="game-stat-chart-graph">
                {(gameType === 'sorting-waste') || (gameType === 'raining-waste') ?
                (<h3 className="game-stat-chart-grah-title"> {t('errors')} </h3>) :
                (<h3 className="game-stat-chart-grah-title"> {t('score')} </h3>)
                }
                <div className="game-stat-chart-graph-line-container">
                    <Line data={scoreChartData} />
                </div>
            </div>
        </div>
    );
};

export default GameStatsCharts;
