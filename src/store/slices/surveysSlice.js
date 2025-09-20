import { createSlice } from '@reduxjs/toolkit';

/**
 * answers: { [surveyId]: { [questionId]: string | number[] } }
 * metaById: { [surveyId]: { title?: string, rewardPerQuestion?: number, ... } }
 * currentId: string | null
 */
const initialState = {
  answers: {},
  metaById: {},
  currentId: null,
};

const surveysSlice = createSlice({
  name: 'surveys',
  initialState,
  reducers: {
    /** Установить текущий опрос (для UI) */
    setCurrentSurvey(state, { payload: id }) {
      state.currentId = id ?? null;
    },

    /** Залить/обновить метаданные опроса */
    setSurveyMeta(state, { payload }) {
      const { surveyId, meta } = payload || {};
      if (!surveyId) return;
      state.metaById[surveyId] = {
        ...(state.metaById[surveyId] || {}),
        ...(meta || {}),
      };
    },

    /** Сохранить ответ на вопрос */
    saveAnswer(state, { payload }) {
      const { surveyId, questionId, value } = payload || {};
      if (!surveyId || !questionId) return;
      if (!state.answers[surveyId]) state.answers[surveyId] = {};
      state.answers[surveyId][questionId] = value;
    },

    /** Очистить ответы по конкретному опросу */
    resetSurvey(state, { payload: surveyId }) {
      if (!surveyId) return;
      delete state.answers[surveyId];
      if (state.currentId === surveyId) state.currentId = null;
    },
  },
});

export default surveysSlice.reducer;

/* ========= Actions ========= */
export const { setCurrentSurvey, setSurveyMeta, saveAnswer, resetSurvey } =
  surveysSlice.actions;

/* Алиасы под существующие импорты из компонентов */
export const setAnswer = surveysSlice.actions.saveAnswer;
export const clearSurvey = surveysSlice.actions.resetSurvey;

/* ========= Selectors ========= */
export const selectSurveyAnswers = (surveyId) => (state) =>
  state.surveys.answers[surveyId] || {};

export const selectCurrentSurveyId = (state) => state.surveys.currentId;

export const selectSurveyMeta = (surveyId) => (state) => state.surveys.metaById[surveyId];
