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
    script: {
      pk: number;
      questionPk: number;
      createdTime: string;
      lastModifiedTime: string;
      lastReadTime: string;
      content: string;
    };
  }[];
}

export interface QuestionAndScript {
  question: Question;
  script: {
    pk: number;
    questionPk: number;
    createdTime: string;
    lastModifiedTime: string;
    lastReadTime: string;
    content: string;
  };
}
