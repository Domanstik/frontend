import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // answers: { [surveyId]: { [questionId]: '' | number[] } }
  answers: {},
};

const surveysSlice = createSlice({
  name: 'surveys',
  initialState,
  reducers: {
    setAnswer(state, action) {
      const { surveyId, questionId, value } = action.payload;
      state.answers[surveyId] ??= {};
      state.answers[surveyId][questionId] = value;
    },
    clearSurvey(state, action) {
      delete state.answers[action.payload];
    },
  },
});

export const { setAnswer, clearSurvey } = surveysSlice.actions;
export const selectSurveyAnswers = (id) => (s) => s.surveys.answers[id] || {};
export default surveysSlice.reducer;
