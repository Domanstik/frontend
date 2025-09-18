export const adminContests = [
  { id: 'c1', title: 'Новый конкурс 1', subtitle: 'время опроса', starsJoin: 1, starsWin: 2, period: '01.03—07.03', locale: 'all', lang: 'ru' },
  { id: 'c2', title: 'Участие в съёмках для соц.сетей', subtitle: '7 дн.', starsJoin: 1, starsWin: 3, period: '10.03—17.03', locale: 'hq', lang: 'ru' },
];

export const adminSurveys = [{ id: 's1', title: 'Новый опрос 1', subtitle: 'время опроса' }];

export const adminWinners = [
  { id: 'w1', title: 'Участие в съёмках для соц.сетей', subtitle: '7 дн.' },
  { id: 'w2', title: 'Фото-конкурс «8 марта»', subtitle: '3 дн.' },
];

export const adminParticipants = [
  { id: 'u1', rank: 1, location: 'HQ',    name: 'Жданов Евгений Александрович', files: [{ name: 'video.mp4', url: '/files/sample.mp4' }], description: 'Описание участника 1' },
  { id: 'u2', rank: 2, location: 'Minsk', name: 'Прохорова Анна Владимировна',   files: [{ name: 'photo.jpg', url: '/files/photo.jpg' }], description: 'Описание участника 2' },
  { id: 'u3', rank: 3, location: 'HQ',    name: 'Фамилия Имя Отчество Очень Длинные', files: [], description: 'Описание участника 3' },
];

export const adminMerch = [
  { id: 'p1', title: 'Футболка', price: 3, image: '' },
  { id: 'p2', title: 'Кружка',    price: 5, image: '' },
  { id: 'p3', title: 'Кепка',     price: 10, image: '' },
  { id: 'p4', title: 'Рюкзак',    price: 25, image: '' },
];
