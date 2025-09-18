import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setHeader } from '@/store/slices/uiSlice';
import NotificationsList from '@components/Dashboard/NotificationsList/NotificationsList';
import mock from '@/mocks/notifications';

export default function Notifications() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeader({ title: 'МАГАЗИН', avatar: '' }));
  }, [dispatch]);

  return <NotificationsList items={mock} onItemClick={(n) => console.log('open', n)} />;
}
