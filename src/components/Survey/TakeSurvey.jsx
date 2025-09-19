import { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { useDispatch, useSelector } from 'react-redux';

import { UIContext } from '@contexts/ui-context';
import { SURVEYS } from '@mocks/surveys';
import { setAnswer, clearSurvey, selectSurveyAnswers } from '@store/slices/surveysSlice';
import { springSm } from '../../lib/motionConfig';

import styles from './TakeSurvey.module.css';

export default function TakeSurvey() {
  const { id = 's1' } = useParams();
  const survey = SURVEYS[id] ?? SURVEYS.s1;

  const { setHeader, avatars } = useContext(UIContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const answers = useSelector(selectSurveyAnswers(id));

  useEffect(() => {
    setHeader({ title: survey.title, avatar: avatars?.female });
    return () => dispatch(clearSurvey(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const total = survey.questions.length;
  const [step, setStep] = useState(0);
  const q = survey.questions[step];

  // валидность текущего шага
  const valid = useMemo(() => {
    const a = answers[q.id];
    if (q.type === 'text') return (a ?? '').trim().length > 0;
    return Array.isArray(a) && a.length > 0;
  }, [answers, q]);

  const onToggleOption = (optIdx) => {
    const cur = answers[q.id] || [];
    if (q.multiple) {
      const set = new Set(cur);
      set.has(optIdx) ? set.delete(optIdx) : set.add(optIdx);
      dispatch(setAnswer({ surveyId: id, questionId: q.id, value: Array.from(set) }));
    } else {
      dispatch(setAnswer({ surveyId: id, questionId: q.id, value: [optIdx] }));
    }
  };

  const onChangeText = (v) => dispatch(setAnswer({ surveyId: id, questionId: q.id, value: v }));

  const next = () => {
    if (!valid) return;
    if (step < total - 1) setStep(step + 1);
    else finish();
  };
  const prev = () => setStep((s) => Math.max(0, s - 1));

  const finish = () => {
    // TODO: API submit
    console.log('survey submit:', { surveyId: id, answers });
    navigate(-1);
  };

  const progress = ((step + 1) / total) * 100;
  const isLast = step === total - 1;

  return (
    <div className={styles.page}>
      <div className={styles.topRow}>
        <motion.button
          className={styles.backBtn}
          onClick={() => navigate(-1)}
          whileTap={{ scale: 0.97 }}
        >
          <ArrowBackIosNewRoundedIcon className={styles.backIcon} />
          Назад
        </motion.button>

        <div className={styles.progress}>
          <div className={styles.track} />
          <motion.div
            className={styles.fill}
            style={{ width: `${progress}%` }}
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={springSm}
          />
        </div>

        <div className={styles.starBadge}><StarRoundedIcon /></div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          className={styles.card}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          <div className={styles.qTitle}>{q.title}</div>
          <div className={styles.qText}>{q.text}</div>

          {q.type === 'text' ? (
            <label className={styles.textField}>
              <textarea
                placeholder={q.placeholder || 'Ваш ответ…'}
                value={answers[q.id] || ''}
                onChange={(e) => onChangeText(e.target.value)}
                rows={6}
              />
            </label>
          ) : (
            <ul className={styles.options}>
              {q.options.map((opt, idx) => {
                const checked = (answers[q.id] || []).includes(idx);
                return (
                  <li key={idx}>
                    <label className={styles.option}>
                      <input type="checkbox" checked={checked} onChange={() => onToggleOption(idx)} />
                      <span className={styles.fakeCheckbox} aria-hidden />
                      <span className={styles.optText}>{opt}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          )}

          <motion.button
            className={`${styles.primaryBtn} ${!valid ? styles.disabled : ''}`}
            onClick={next}
            disabled={!valid}
            whileTap={{ scale: 0.98 }}
          >
            {isLast ? 'Ок' : 'Далее'}
          </motion.button>
        </motion.div>
      </AnimatePresence>

      <div className={styles.pager}>
        <motion.button className={styles.arrowBtn} onClick={prev} disabled={step === 0} whileTap={{ scale: 0.96 }}>
          <ChevronLeftRoundedIcon />
        </motion.button>
        <div className={styles.pageNum}>{step + 1}/{total}</div>
        <motion.button className={styles.arrowBtn} onClick={next} disabled={!valid} whileTap={{ scale: 0.96 }}>
          <ChevronRightRoundedIcon />
        </motion.button>
      </div>
    </div>
  );
}
