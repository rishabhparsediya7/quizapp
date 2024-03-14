import { createSlice } from "@reduxjs/toolkit";
import questionList from "../../Contants/Questions.json";

const initialState = { question: {} };

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    updateQuestion: (state, action) => {
      const newObj = questionList.questions.filter(
        (ques) => ques.question_number === action.payload + 1
      );
      state.question = newObj[0];
    },
  },
});

export const { updateQuestion } = questionSlice.actions;
export default questionSlice.reducer;
