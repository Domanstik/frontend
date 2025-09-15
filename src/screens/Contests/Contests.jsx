import { useEffect, useContext, useState } from 'react';
import { UIContext } from '@contexts/ui-context';

import ContestsList from '@components/Contests/ContestsList/ContestsList';
import ContestsOpenCard from '@components/Contests/ContestsOpenCard/ContestsOpenCard';

export default function Contests() {
  const [selected, setSelected] = useState(null); // выбранный конкурс

 const { setHeader, avatars } = useContext(UIContext);

  useEffect(() => {
    setHeader({
      title: 'Конкурсы',
      avatar: avatars.female,
    });
  }, []);

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
