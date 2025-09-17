import { useContext, useEffect, useMemo, useState } from 'react';
import { UIContext } from '@contexts/ui-context';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';

import Popup from '@components/UI/Popup/Popup';
import styles from './AdminWinnersParticipants.module.css';

const MOCK_PARTICIPANTS = [
  { id: 'u1', rank: 1, location: 'HQ',    name: 'Жданов Евгений Александрович', files: [{ name: 'video.mp4', url: '/files/sample.mp4' }], description: 'Описание участника 1' },
  { id: 'u2', rank: 2, location: 'Minsk', name: 'Прохорова Анна Владимировна',   files: [{ name: 'photo.jpg', url: '/files/photo.jpg' }], description: 'Описание участника 2' },
  { id: 'u3', rank: 3, location: 'HQ',    name: 'Фамилия Имя Отчество Очень Длинные', files: [], description: 'Описание участника 3' },
];

export default function AdminWinnersParticipants() {
  const { setHeader, avatars } = useContext(UIContext);
  const navigate = useNavigate();
  const { state: contest } = useLocation();

  const [rows] = useState(MOCK_PARTICIPANTS);
  const [checked, setChecked] = useState(() => new Set());
  const [fileModal, setFileModal] = useState(null);
  const [descModal, setDescModal] = useState(null);
  const [finishOpen, setFinishOpen] = useState(false);

  useEffect(() => {
    setHeader({ title: 'Участники', avatar: avatars?.female });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const allSelected = checked.size === rows.length && rows.length > 0;
  const toggle = (id) => setChecked((s) => {
    const next = new Set(s);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
  const toggleAll = () => setChecked((s) => (s.size ? new Set() : new Set(rows.map(r => r.id))));
  const selectedWinners = useMemo(() => rows.filter(r => checked.has(r.id)), [rows, checked]);

  const finish = () => {
    console.log('WINNERS:', selectedWinners);
    setFinishOpen(false);
    navigate(-1);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button className={styles.back} onClick={() => navigate(-1)}>
          <ArrowBackIosNewRoundedIcon />
        </button>
        <div className={styles.hTitle}>Участники</div>
      </div>

      <div className={styles.table}>
        {/* Шапка — компактные заголовки, иконки вместо длинных слов */}
        <div className={`${styles.tr} ${styles.head}`}>
          <div className={styles.th}><input type="checkbox" checked={allSelected} onChange={toggleAll} /></div>
          <div className={styles.th}>Рейт.</div>
          <div className={styles.th}>Лок.</div>
          <div className={styles.th}>Имя Фамилия</div>
          <div className={`${styles.th} ${styles.iconHead}`} title="Файлы"><AttachFileRoundedIcon /></div>
          <div className={`${styles.th} ${styles.iconHead}`} title="Описание"><DescriptionRoundedIcon /></div>
        </div>

        {rows.map((r, i) => (
          <motion.div
            key={r.id}
            className={styles.tr}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, type: 'spring', stiffness: 320, damping: 26 }}
          >
            <div className={styles.td}>
              <input type="checkbox" checked={checked.has(r.id)} onChange={() => toggle(r.id)} />
            </div>
            <div className={styles.td}>{r.rank}</div>
            <div className={styles.td}>{r.location}</div>

            {/* Имя — 2 строки, переносы, без горизонтального скролла */}
            <div className={`${styles.td} ${styles.name}`} title={r.name}>{r.name}</div>

            <div className={`${styles.td} ${styles.attach}`}>
              {r.files?.length ? (
                <button type="button" className={styles.iconBtn} onClick={() => setFileModal(r.files)} aria-label="Открыть файлы">
                  <AttachFileRoundedIcon />
                </button>
              ) : <span className={styles.noFiles}>—</span>}
            </div>

            <div className={`${styles.td} ${styles.desc}`}>
              <button type="button" className={styles.iconBtn} onClick={() => setDescModal(r.description || '—')} aria-label="Описание">
                <DescriptionRoundedIcon />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className={styles.footer}>
        <button className={styles.finish} disabled={!selectedWinners.length} onClick={() => setFinishOpen(true)}>
          Закончить
        </button>
      </div>

      {/* Модалка: файлы */}
      <Popup open={!!fileModal} onClose={() => setFileModal(null)}>
        <h3 className={styles.popTitle}>Прикреплённые файлы</h3>
        {fileModal?.map((f) => (
          <div key={f.url} className={styles.fileRow}>
            <AttachFileRoundedIcon />
            <a href={f.url} target="_blank" rel="noreferrer">{f.name}</a>
          </div>
        ))}
        {!fileModal?.length && <div>Нет файлов</div>}
        <button className={styles.popBtn} onClick={() => setFileModal(null)}>Закрыть</button>
      </Popup>

      {/* Модалка: описание */}
      <Popup open={!!descModal} onClose={() => setDescModal(null)}>
        <h3 className={styles.popTitle}>Описание</h3>
        <p className={styles.popText}>{descModal}</p>
        <button className={styles.popBtn} onClick={() => setDescModal(null)}>Закрыть</button>
      </Popup>

      {/* Модалка: завершить */}
      <Popup open={finishOpen} onClose={() => setFinishOpen(false)}>
        <h3 className={styles.popTitle}>Подтвердить победителей</h3>
        <div className={styles.popList}>
          {selectedWinners.map((w) => <div key={w.id}>• {w.name}</div>)}
        </div>
        <div className={styles.popActions}>
          <button className={styles.popBtn} onClick={finish}>Подтвердить</button>
          <button className={styles.popBtnGhost} onClick={() => setFinishOpen(false)}>Отмена</button>
        </div>
      </Popup>
    </div>
  );
}
