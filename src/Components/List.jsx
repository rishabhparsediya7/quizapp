import React, { useEffect, useState } from "react";
import Questions from "../Contants/Questions.json";
import { useDispatch, useSelector } from "react-redux";
import { updateQuestion } from "../redux/slices/QuestionSlice";

const List = () => {
  const [questionList, setQuestionsList] = useState(Questions.questions);
  const no =
    useSelector((state) => state.questions.question.question_number) - 1;
  const [activeIndex, setActiveIndex] = useState(no || 0);

  const dispatch = useDispatch();
  const handleAddQuestion = (index) => {
    dispatch(updateQuestion(index));
    setActiveIndex(index);
  };
  useEffect(() => {
    setActiveIndex(no);
  }, [no]);
  return (
    <div className="w-full hidden sm:block">
      <ul className="w-full list-ul py-3 space-y-2 px-2 text-white h-[100vh] overflow-hidden overflow-y-scroll">
        {questionList.map((list, index) => {
          return (
            <li
              onClick={() => handleAddQuestion(index)}
              key={index}
              className={`px-2 py-3 cursor-pointer rounded-md ${
                activeIndex === index
                  ? "bg-[#747bff] text-black"
                  : "bg-[#121212]/40 text-white"
              }`}
            >
              {index + 1}. {list.question}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default List;
