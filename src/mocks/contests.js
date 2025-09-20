// Моки конкурсов/опросов для экрана "Конкурсы".
// Поля соответствуют тому, что ждут ContestsCard и ContestsOpenCard.

export const contestsMock = [
  {
    id: 'c1',
    kind: 'contest',
    title: 'Участие в съёмках для соц. сетей',
    subtitle: 'Участие в одном ролике',
    participation: 1, // 0..3
    win: 3, // 0..3
    daysLeft: 7,
    active: true,
  },
  {
    id: 'c2',
    kind: 'contest',
    title: 'Идеи для соц. сетей',
    subtitle: '1 идея (реализованная)',
    participation: 2,
    win: 3,
    daysLeft: 10,
    active: false,
  },
  {
    id: 'c3',
    kind: 'contest',
    title: 'Участие в фотоконкурсе “8 марта”',
    subtitle: '',
    participation: 1,
    win: 3,
    daysLeft: 4,
    active: false,
  },
  {
    id: 's1',
    kind: 'survey', // ← это поведёт на /survey/s1
    title: 'Опрос',
    subtitle: '',
    participation: 1,
    win: 2,
    daysLeft: 4,
    active: false,
  },
];
