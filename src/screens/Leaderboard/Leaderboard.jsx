import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setHeader } from '@/store/slices/uiSlice';
import LeaderboardList from '@components/Leaderboard/LeaderboardList/LeaderboardList';

const data = [
  { id: 1, name: 'Имя Фамилияфывфывфы', score: 99, avatar: '', active: true },
  { id: 2, name: 'Жданов Евгений', score: 75, avatar: '' },
  { id: 3, name: 'Прохорова Анна', score: 60, avatar: '' },
  { id: 4, name: 'Петрова Екатерина', score: 58, avatar: '' },
  { id: 5, name: 'Крюков Валерий', score: 21, avatar: '' },
];

export default function Leaderboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeader({ title: 'ЗВЕЗДНАЯ ЛИГА', avatar: '' }));
  }, [dispatch]);

  return <LeaderboardList items={data} />;
}
