import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import { selectUser } from '@/store/slices/userSlice';
import { setHeader } from '@/store/slices/uiSlice';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { name, stars } = useSelector(selectUser);

  useEffect(() => {
    dispatch(setHeader({ title: 'Дашборд', avatar: '' }));
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <div className={styles.name}>{name}</div>

      <div className={styles.card}>
        <div className={styles.counter}>{stars}</div>
        <StarIcon className={styles.star} />
      </div>

      <Link to="/notifications" className={styles.link}>Уведомления</Link>
    </div>
  );
}
