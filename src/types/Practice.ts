import { Question } from "./Question";
import { Script } from "./Script";

export interface Practice {
  pkValue: number;
  titleValue: string;
  questionCountValue: number;
}

export interface PracticeDetail extends Practice {
  questionAndScripts: {
    question: Question;
    script: Script;
  }[];
}

export interface QuestionAndScript {
  question: Question;
  script: Script;
}
