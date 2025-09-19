export const SURVEYS = {
  s1: {
    id: 's1',
    title: 'ТЕКУЩИЕ ЗАДАНИЯ',
    rewardPerQuestion: 1,
    questions: [
      {
        id: 'q1',
        type: 'options',
        multiple: false,
        title: 'Вопрос №1',
        text: 'Поле для текста вопроса',
        options: ['первый ответ', 'второй ответ', 'третий ответ', 'четвёртый ответ'],
      },
      {
        id: 'q2',
        type: 'text',
        title: 'Вопрос №2',
        text: 'Поле для текста вопроса',
        placeholder: 'Ваш ответ…',
      },
      {
        id: 'q3',
        type: 'options',
        multiple: true,
        title: 'Вопрос №3',
        text: 'Поле для текста вопроса',
        options: ['первый ответ', 'второй ответ', 'третий ответ', 'четвёртый ответ'],
      },
      {
        id: 'q4',
        type: 'text',
        title: 'Вопрос №4',
        text: 'Поле для текста вопроса',
        placeholder: 'Ваш ответ…',
      },
    ],
  },
};
