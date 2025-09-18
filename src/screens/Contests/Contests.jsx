import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setHeader } from '@/store/slices/uiSlice';
import ContestsList from '@components/Contests/ContestsList/ContestsList';
import ContestsOpenCard from '@components/Contests/ContestsOpenCard/ContestsOpenCard';

export default function Contests() {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    dispatch(setHeader({ title: 'Конкурсы', avatar: '' }));
  }, [dispatch]);

  return (
    <>
      <ContestsList onJoin={setSelected} />
      <ContestsOpenCard
        contest={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
