import {useEffect, useState} from "react";
import {Quiz} from "../../../interfaces/QuizInterface";

import axios from "axios";
import QuizCard from "../QuizCard/QuizCard";


import "./QuizList.css";


function QuizList() {
    const [quizs, setQuizs] = useState<Quiz[]>([]);

    const getQuiz = async () => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + (localStorage.getItem('token') || '')
            };

            const response = await axios.get('http://localhost:5000/api/quizs/educator', { headers: headers });

            if(response.status === 200)
            {
                setQuizs(response.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getQuiz();
    }, []);

    const handleDelete = (deleted: boolean) => {
        if(deleted){
            getQuiz();
        }
    }


    return (
        <div className="quiz-list">
            {quizs.map((quiz: Quiz) => {
                return (
                    <QuizCard quiz={quiz} isDeleted={handleDelete} key={quiz._id} />
                )
            })}
        </div>
    )
}

export default QuizList;