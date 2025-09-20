import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';

import { useDispatch } from 'react-redux';
import { setHeader } from '@store/slices/uiSlice';
import Popup from '@components/UI/Popup/Popup';
import { adminParticipants as rowsInit } from '@/mocks/admin';
import styles from './AdminWinnersParticipants.module.css';

export default function AdminWinnersParticipants() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state: contest } = useLocation();

  const [rows] = useState(rowsInit);
  const [checked, setChecked] = useState(() => new Set());
  const [fileModal, setFileModal] = useState(null);
  const [descModal, setDescModal] = useState(null);
  const [finishOpen, setFinishOpen] = useState(false);

  useEffect(() => {
    dispatch(setHeader({ title: 'Участники', avatar: '' }));
  }, [dispatch]);

  const allSelected = checked.size === rows.length && rows.length > 0;
  const toggle = (id) =>
    setChecked((s) => {
      const next = new Set(s);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  const toggleAll = () =>
    setChecked((s) => (s.size ? new Set() : new Set(rows.map((r) => r.id))));
  const selectedWinners = useMemo(
    () => rows.filter((r) => checked.has(r.id)),
    [rows, checked],
  );

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
        <div className={styles.hTitle}>
          Участники{contest?.title ? `: ${contest.title}` : ''}
        </div>
      </div>

      <div className={styles.table}>
        <div className={`${styles.tr} ${styles.head}`}>
          <div className={styles.th}>
            <input type="checkbox" checked={allSelected} onChange={toggleAll} />
          </div>
          <div className={styles.th}>Рейт.</div>
          <div className={styles.th}>Лок.</div>
          <div className={styles.th}>Имя Фамилия</div>
          <div className={`${styles.th} ${styles.iconHead}`} title="Файлы">
            <AttachFileRoundedIcon />
          </div>
          <div className={`${styles.th} ${styles.iconHead}`} title="Описание">
            <DescriptionRoundedIcon />
          </div>
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
              <input
                type="checkbox"
                checked={checked.has(r.id)}
                onChange={() => toggle(r.id)}
              />
            </div>
            <div className={styles.td}>{r.rank}</div>
            <div className={styles.td}>{r.location}</div>
            <div className={`${styles.td} ${styles.name}`} title={r.name}>
              {r.name}
            </div>
            <div className={`${styles.td} ${styles.attach}`}>
              {r.files?.length ? (
                <button
                  type="button"
                  className={styles.iconBtn}
                  onClick={() => setFileModal(r.files)}
                  aria-label="Открыть файлы"
                >
                  <AttachFileRoundedIcon />
                </button>
              ) : (
                <span className={styles.noFiles}>—</span>
              )}
            </div>
            <div className={`${styles.td} ${styles.desc}`}>
              <button
                type="button"
                className={styles.iconBtn}
                onClick={() => setDescModal(r.description || '—')}
                aria-label="Описание"
              >
                <DescriptionRoundedIcon />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className={styles.footer}>
        <button
          className={styles.finish}
          disabled={!selectedWinners.length}
          onClick={() => setFinishOpen(true)}
        >
          Закончить
        </button>
      </div>

      <Popup open={!!fileModal} onClose={() => setFileModal(null)}>
        <h3 className={styles.popTitle}>Прикреплённые файлы</h3>
        {fileModal?.map((f) => (
          <div key={f.url} className={styles.fileRow}>
            <AttachFileRoundedIcon />
            <a href={f.url} target="_blank" rel="noreferrer">
              {f.name}
            </a>
          </div>
        ))}
        {!fileModal?.length && <div>Нет файлов</div>}
        <button className={styles.popBtn} onClick={() => setFileModal(null)}>
          Закрыть
        </button>
      </Popup>

      <Popup open={!!descModal} onClose={() => setDescModal(null)}>
        <h3 className={styles.popTitle}>Описание</h3>
        <p className={styles.popText}>{descModal}</p>
        <button className={styles.popBtn} onClick={() => setDescModal(null)}>
          Закрыть
        </button>
      </Popup>

      <Popup open={finishOpen} onClose={() => setFinishOpen(false)}>
        <h3 className={styles.popTitle}>Подтвердить победителей</h3>
        <div className={styles.popList}>
          {selectedWinners.map((w) => (
            <div key={w.id}>• {w.name}</div>
          ))}
        </div>
        <div className={styles.popActions}>
          <button className={styles.popBtn} onClick={finish}>
            Подтвердить
          </button>
          <button className={styles.popBtnGhost} onClick={() => setFinishOpen(false)}>
            Отмена
          </button>
        </div>
      </Popup>
    </div>
  );
}
