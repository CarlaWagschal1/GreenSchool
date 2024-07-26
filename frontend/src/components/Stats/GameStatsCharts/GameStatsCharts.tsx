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
                label: gameType === ('sorting-waste' || 'drag-and-drop') ? 'Error' :'Score',
                data: scoreData,
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
            },
        ],
    };

    return (
        <div>
            <div>
                <h3>Time</h3>
                <Line data={timeChartData} />
            </div>
            <div>
                {gameType === ('sorting-waste' || 'drag-and-drop') ?
                (<h3> Errors </h3>) :
                (<h3> Score </h3>)
                }
                <Line data={scoreChartData} />
            </div>
        </div>
    );
};

export default GameStatsCharts;
