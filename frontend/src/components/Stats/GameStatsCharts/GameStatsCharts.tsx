import React from 'react';
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
    const timeChartData = {
        labels,
        datasets: [
            {
                label: 'Time (s)',
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
                label: (gameType === 'sorting-waste') || (gameType === 'raining-waste') ? 'Error' :'Score',
                data: scoreData,
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
            },
        ],
    };

    return (
        <div className="game-stat-chart-container">
            <div className="game-stat-chart-graph">
                <h3 className="game-stat-chart-grah-title">Time</h3>
                <div className="game-stat-chart-graph-line-container">
                    <Line data={timeChartData} />
                </div>
            </div>
            <div className="game-stat-chart-graph">
                {(gameType === 'sorting-waste') || (gameType === 'raining-waste') ?
                (<h3 className="game-stat-chart-grah-title"> Errors </h3>) :
                (<h3 className="game-stat-chart-grah-title"> Score </h3>)
                }
                <div className="game-stat-chart-graph-line-container">
                    <Line data={scoreChartData} />
                </div>
            </div>
        </div>
    );
};

export default GameStatsCharts;
