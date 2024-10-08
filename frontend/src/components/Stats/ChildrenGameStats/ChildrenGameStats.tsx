import {useEffect, useState} from "react";
import {ScoreInterface} from "../../../interfaces/ScoreInterface";
import axios from "axios";
import GameStatsCard from "../GameStatsCard/GameStatsCard";

import './ChildrenGameStats.css';
import GameStatsCharts from "../GameStatsCharts/GameStatsCharts";
import {useNavigate} from "react-router-dom";
import { useTranslation} from "react-i18next";
import ButtonAppComponent from "../../ButtonAppComponent/ButtonAppComponent";

interface gameStatsInterface {
    totalGames: number;
    averageTime: number;
    topErrors: [string, number][];
}

const gameMock = [
    {
    name: 'What is recyclable ?',
    id: 'game1'
    },
    {
    name: 'How to sort waste ?',
    id: 'game2'
    },
    {
    name: 'Game 3',
    id: 'game3'
    },
    {
    name: 'Game 4',
    id: 'game4'
    },
    {
    name: 'Game 5',
    id: 'game5'
    }
]


function ChildrenGameStats() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [selectedPeriod, setSelectedPeriod] = useState<'7days' | '30days' | 'Always'>('7days');
    const [scores, setScores] = useState<ScoreInterface[]>([]);
    const [stats, setStats] = useState<gameStatsInterface | null>(null);
    const [gameID, setGameID] = useState<string>('sorting-waste');
    const [labels, setLabels] = useState<string[]>([]);
    const [timeData, setTimeData] = useState<number[]>([]);
    const [scoreData, setScoreData] = useState<number[]>([]);
    const [gamesWithoutError, setGamesWithoutError] = useState<number>(0);

    const [childName, setChildName] = useState<string>('');

    const childrenID = localStorage.getItem('childrenID');

    const findChildName = async() => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
            const rep = await axios.get(`http://localhost:5000/api/children/${childrenID}`, {headers: headers});
            console.log(rep)
            setChildName(rep.data.name);
        }
        catch (err) {
            console.error(err);
        }
    }


    useEffect(() => {
        findChildName();

        const fetchScores = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
                const rep = await axios.get(`http://localhost:5000/api/scores/children/${childrenID}/game/${gameID}`,
                    {headers: headers});
                setScores(rep.data);
                console.log('Scores:', rep.data);
            }
            catch (err) {
                console.error(err);
            }
        }
        fetchScores();
    }, [childrenID, gameID]);

    useEffect(() => {
        if (scores.length > 0) {
            const filteredScores = filterScoresByPeriod(scores, selectedPeriod);
            setStats(calculateStats(filteredScores));
            const labels = filteredScores.map((score) => score.date);

            labels.forEach((label, index) => {
                labels[index] = label.slice(5, 10); // Write the date in mm-dd format
            });

            const timeData = filteredScores.map((score) => Number(score.elapsedTime));
            const scoreData = filteredScores.map((score) => score.score);
            const gamesWithoutError = filteredScores.filter(score => score.errors.length === 0).length;
            setLabels(labels);
            setTimeData(timeData);
            setScoreData(scoreData);
            setGamesWithoutError(gamesWithoutError);
        }
        else {
            setStats(null);
        }
    }, [scores, selectedPeriod]);


    const filterScoresByPeriod = (scores: ScoreInterface[], period: '7days' | '30days' | 'Always') => {
        const now = new Date();
        let startDate;

        switch (period) {
            case '7days':
                startDate = new Date(now.setDate(now.getDate() - 7));
                break;
            case '30days':
                startDate = new Date(now.setDate(now.getDate() - 30));
                break;
            case 'Always':
                startDate = new Date(0);
                break;
        }
        const sc = scores.filter(score => new Date(score.date) >= startDate);
        //trier par date
        sc.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        return sc;
    };

    const calculateStats = (filteredScores: ScoreInterface[]) => {
        const totalGames = filteredScores.length;
        const totalTime = filteredScores.reduce((acc, score) => acc + Number(score.elapsedTime), 0);
        const averageTime = totalGames > 0 ? totalTime / totalGames : 0;

        const errorCounts: { [key: string]: number } = {};
        // the next step can be delete, it was necessary with a rename of some waste object before the translation to not lose every statistics
        const filteredScoresRenamed = filteredScores.map(score => {
            const newErrors = score.errors.map(error => {
                if ((error === 'bouteille recyclable') || (error ==='bouteille plastique') || (error === 'bouteille en plastique')) {
                    return 'plastic-bottle';
                }
                if (error === 'armoire encombrant') {
                    return 'bulky-cabinet';
                }
                if (error === 'trognon alimentaire') {
                    return 'food-core';
                }
                if (error === 'table encombrant') {
                    return 'bulky-table';
                }
                if (error === 'cookie alimentaire') {
                    return 'food-cookie';
                }
                if (error === 'carton recyclable') {
                    return 'recyclable-cardboard';
                }
                return error;
            });
            return {...score, errors: newErrors};
        });

        filteredScoresRenamed.forEach(score => {
            score.errors.forEach(error => {
                errorCounts[error] = (errorCounts[error] || 0) + 1;
            });
        });

        const sortedErrors = Object.entries(errorCounts).sort((a, b) => b[1] - a[1]);
        const topErrors = sortedErrors.slice(0, 3);

        console.log('topErrors:', topErrors)
        console.log('averageTime:', averageTime)

        return {
            totalGames,
            averageTime,
            topErrors
        };
    };

    const handleClick = (gameId: string) => {
        setGameID(gameId);
        console.log('gameId:', gameId)
    }


    const goBack = () => {
        navigate('/children-manager');
    }



    return (
    <main>
        <div className="children-game-stats-container">
            <h2 className="children-game-stats-title">{t('game-stats-of')} {childName}</h2>
            <div className="children-game-stats-content">
                <div className="game-list">
                    <GameStatsCard nameGame={t('drag-and-drop')} gameId="sorting-waste" onClick={handleClick} isSelected={'sorting-waste' === gameID}></GameStatsCard>
                    <GameStatsCard nameGame={t('raining-waste')} gameId="raining-waste" onClick={handleClick} isSelected={'raining-waste' === gameID}></GameStatsCard>
                    {gameMock.map(game => (
                        <GameStatsCard key={game.id} nameGame={game.name} gameId={game.id} onClick={handleClick} isSelected={game.id === gameID}></GameStatsCard>
                    ))}
                </div>
                <div className="stat-display">
                    <div className="date-choice">
                        <button className={selectedPeriod === '7days' ? 'active' : 'no-active'} onClick={() => setSelectedPeriod('7days')}>
                            {t('seven-days')}
                        </button>
                        <button className={selectedPeriod === '30days' ? 'active' : 'no-active'} onClick={() => setSelectedPeriod('30days')}>
                            {t('thirty-days')}
                        </button>
                        <button className={selectedPeriod === 'Always' ? 'active' : 'no-active'} onClick={() => setSelectedPeriod('Always')}>
                            {t('all-time')}
                        </button>
                    </div>
                    <div className="statistics">
                        {stats ? (
                            <div className="stats-ok">
                                <div className="chart-container">
                                    <GameStatsCharts labels={labels} timeData={timeData} scoreData={scoreData} gameType={gameID} />
                                </div>
                                <div className="stats-info">
                                    <div className="game-info-center">
                                        <h2 className="game-info-center-title">{t('some-numbers')}</h2>
                                        <p>{t('number-of-games-played')} : {stats.totalGames}</p>
                                        <p>{t('number-of-games-without-error')} : {gamesWithoutError}</p>
                                        <p>{t('average-time-per-game')} : {stats.averageTime.toFixed(2)} secondes</p>
                                        <div className="game-stat-mistakes">
                                            <h3>{t('top-3-most-common-errors')}</h3>
                                            <ul>
                                                {stats.topErrors.map(([error, count]: [string, number]) => (
                                                    <li key={error}>{t(error)}: {count} {t('times')}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="no-stats">{t('no-statistics')}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
        <div className="children-game-stat-back-btn">
            <ButtonAppComponent content={t('back')} action={goBack} type={"classic"} />
        </div>
    </main>
    );
}

export default ChildrenGameStats;