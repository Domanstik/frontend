import { useEffect, useContext } from 'react';
import { UIContext } from '@contexts/ui-context';
import ContestsList from '@components/Contests/ContestsList/ContestsList';

function Contests() {
  const { setHeader, avatars } = useContext(UIContext);

   useEffect(() => {
    setHeader({
      title: 'Конкурсы',
      avatar: avatars.female,
    });
  }, []);

  return <ContestsList />;
}

export default Contests;
