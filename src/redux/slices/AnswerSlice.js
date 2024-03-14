import { createSlice } from "@reduxjs/toolkit";

const initialState = { answers: Array(20).fill(null) };

const answerSlice = createSlice({
  name: "userAnswer",
  initialState,
  reducers: {
    saveAnswer: (state, action) => {
      const { questionNumber, answer } = action.payload;
      state.answers[questionNumber - 1] = answer;
    },
    resetAnswers: (state, action) => {
      state.answers = [];
    },
  },
});
export const { saveAnswer, resetAnswers } = answerSlice.actions;
export default answerSlice.reducer;
