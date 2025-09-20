import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setHeader } from '@/store/slices/uiSlice';

import ContestsList from '@components/Contests/ContestsList/ContestsList';
import ContestsOpenCard from '@components/Contests/ContestsOpenCard/ContestsOpenCard';
import { contestsMock } from '@mocks/contests';

export default function Contests() {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    // Заголовок как на макете (можно поменять на "Конкурсы", если надо)
    dispatch(setHeader({ title: 'ТЕКУЩИЕ ЗАДАНИЯ', avatar: '' }));
  }, [dispatch]);

  return (
    <>
      <ContestsList items={contestsMock} onOpenContest={setSelected} />
      <ContestsOpenCard
        contest={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
