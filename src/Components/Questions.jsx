import React, { useState } from "react";
import "./questions.css";
import { useDispatch, useSelector } from "react-redux";
import QuestionComponent from "./QuestionComponent";
import { updateQuestion } from "../redux/slices/QuestionSlice";
import questionJson from "../Contants/Questions.json";
import { resetAnswers } from "../redux/slices/AnswerSlice";

const Questions = ({ questionProp, answers }) => {
  const question =
    useSelector((state) => state.questions.question) || questionProp;
  const answersList = useSelector((state) => state.userAnswer.answers);
  const correctAnswers = questionJson.questions.map((q) => q.correct_answer);
  const [numberCorrect, setNumberCorrect] = useState(0);
  const [eligible, setEligible] = useState(false);
  const [unattempted, setUnattempted] = useState(0);
  const dispatch = useDispatch();
  const handleNext = (index) => {
    if (index >= 20) return;
    dispatch(updateQuestion(index));
  };
  const handlePrevious = (index) => {
    if (index <= 1) return;
    dispatch(updateQuestion(index - 2));
  };
  const submitQuiz = () => {
    console.log(answersList);
    for (var i = 0; i < 20; i++) {
      if (answersList[i] == correctAnswers[i]) {
        setNumberCorrect((prev) => prev + 1);
      } else if (answersList[i] == null) {
        setUnattempted((prev) => prev + 1);
      }
    }
    setTimeout(() => {
      setEligible(true);
    }, 1000);
  };
  return (
    <div className="w-full p-2">
      {eligible ? (
        <div>
          <div className="flex justify-end p-2">
            <button
              className="mr-2"
              onClick={() => {
                dispatch(resetAnswers());
                window.location.reload();
              }}
            >
              Reset
            </button>
            <div className="bg-[#484848]/70 px-6 py-3 rounded-l-md border-r-2">
              {answers} / 20
            </div>
            <div className="bg-[#484848]/70 px-6 py-3 rounded-r-md">
              <div className="h-10 w-10 text-center rounded-full border-2 border-green-600">
                <p className="m-auto">{Math.floor((answers / 20) * 100)} %</p>
              </div>
            </div>
          </div>
          <h3 className="uppercase tracking-wider">
            Wrong Answers <strong>(Unattempted - {unattempted})</strong>
          </h3>
          <div className="flex">
            <div className="flex-1">
              <ul>
                {questionJson.questions.map((ques, index) => {
                  if (ques.correct_answer == answersList[index]) {
                    return (
                      <li
                        className="bg-red-200 mb-2 p-2 rounded-md text-red-600"
                        key={index}
                      >
                        <div className="flex flex-col">
                          <div className="font-bold">
                            {questionJson.questions[index].question}
                          </div>
                          <div>
                            {questionJson.questions[index].correct_answer}).
                            &nbsp;
                            {
                              questionJson.questions[index].options[
                                answersList[index]
                              ]
                            }
                          </div>
                        </div>
                      </li>
                    );
                  }
                  return <li key={index}>{null}</li>;
                })}
              </ul>
            </div>
            <div className="flex-1"></div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="flex justify-end p-2">
            <button
              className="mr-2"
              onClick={() => {
                dispatch(resetAnswers());
              }}
            >
              Reset
            </button>
            <button className="mr-2" onClick={submitQuiz}>
              Submit Quiz
            </button>
            <div className="bg-[#484848]/70 px-6 py-3 rounded-l-md border-r-2">
              {answers} / 20
            </div>
            <div className="bg-[#484848]/70 px-6 py-3 rounded-r-md">
              {Math.floor((answers / 20) * 100)} %
            </div>
          </div>
          <div className="w-full px-10">
            <div className="w-full flex flex-col bg-[#484848] rounded-md p-10">
              {question.options && <QuestionComponent question={question} />}
              <div className="flex justify-end gap-x-2 px-2">
                <button
                  onClick={() => handlePrevious(question.question_number)}
                  className="bg-[#121212]/70 w-36 flex p-2 rounded-md"
                >
                  <p className="text-center">
                    <i className="bi bi-chevron-left mr-auto"></i> Previous
                  </p>
                </button>
                <button
                  onClick={() => handleNext(question.question_number)}
                  className="bg-[#121212]/70 w-36 p-2 rounded-md"
                >
                  <p className="text-center">
                    Save & Next &nbsp;
                    <i className="bi bi-chevron-right ml-auto"></i>
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Questions;
