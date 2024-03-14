import { useEffect, useState } from "react";
import "./App.css";
import List from "./Components/List";
import Questions from "./Components/Questions";
import { useDispatch, useSelector } from "react-redux";
import { updateQuestion } from "./redux/slices/QuestionSlice";
import questionList from "./Contants/Questions.json";

function App() {
  const userAnswers = useSelector((state) => state.userAnswer.answers);
  const answers = userAnswers.filter((e) => e != null).length;
  const question = questionList.questions[0];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateQuestion(0));
  }, []);
  return (
    <div className="container">
      <div className="list">
        <List />
      </div>
      <div className="questions">
        {question && <Questions questionProp={question} answers={answers} />}
      </div>
    </div>
  );
}

export default App;
