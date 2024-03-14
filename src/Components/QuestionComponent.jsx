import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveAnswer } from "../redux/slices/AnswerSlice";
import "./questions.css";
const QuestionComponent = ({ question }) => {
  const buttons = Object.entries(question.options);
  const answered = useSelector((state) => state.userAnswer.answers);
  const dispatch = useDispatch();
  const handleOptionSave = (questionNumber, answer) => {
    dispatch(saveAnswer({ questionNumber, answer }));
  };
  let classNames;
  return (
    <div className="flex flex-col ">
      <div className="question">
        {question.question_number}. {question.question}
      </div>
      <div className="container-option">
        {buttons.map((but, index) => {
          classNames = `option${index + 1}`;
          return (
            <button
              key={index}
              onClick={() =>
                handleOptionSave(question.question_number, but[0].toString())
              }
              className={`${
                but[0] == answered[question.question_number - 1]
                  ? `bg-green-600`
                  : ``
              } ${classNames} text-left`}
            >
              {but[0]}.) {but[1]}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionComponent;
