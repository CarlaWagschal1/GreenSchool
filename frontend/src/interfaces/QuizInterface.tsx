import {Question} from "./QuestionInterface";

export interface Quiz {
    _id: number;
    name: string;
    description: string;
    imageUrl: string;
    questions?: Question[];
    educatorId: string;
}