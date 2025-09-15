import { useEffect, useContext } from 'react';
import { UIContext } from '@contexts/ui-context';
import LeaderboardList from '@components/Leaderboard/LeaderboardList/LeaderboardList';

function Leaderboard() {
  const { setHeader, avatars } = useContext(UIContext);

  useEffect(() => {
    setHeader({
      title: 'ЗВЕЗДНАЯ ЛИГА',
      avatar: avatars.female,
    });
  }, []);

  const data = [
    { id: 1, name: 'Имя Фамилияфывфывфы', score: 99, avatar: avatars.female, active: true },
    { id: 2, name: 'Жданов Евгений', score: 75, avatar: avatars.male },
    { id: 3, name: 'Прохорова Анна', score: 60, avatar: avatars.female },
    { id: 4, name: 'Петрова Екатерина', score: 58, avatar: avatars.female },
    { id: 5, name: 'Крюков Валерий', score: 21, avatar: avatars.male },
    { id: 6, name: 'Имя Фамилияфывфывфы', score: 99, avatar: avatars.female, active: true },
    { id: 7, name: 'Жданов Евгений', score: 75, avatar: avatars.male },
    { id: 8, name: 'Прохорова Анна', score: 60, avatar: avatars.female },
    { id: 9, name: 'Петрова Екатерина', score: 58, avatar: avatars.female },
    { id: 10, name: 'Крюков Валерий', score: 21, avatar: avatars.male },
  ];

  return <LeaderboardList items={data} />;
}

export default Leaderboard;
