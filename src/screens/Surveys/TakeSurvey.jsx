import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

import { useDispatch, useSelector } from 'react-redux';
import { SURVEYS } from '@mocks/surveys';
import { setAnswer, clearSurvey, selectSurveyAnswers } from '@store/slices/surveysSlice';
import { springSm } from '@lib/motionConfig';

import styles from './TakeSurvey.module.css';

export default function TakeSurvey() {
  const { id = 's1' } = useParams();
  const survey = SURVEYS[id] ?? SURVEYS.s1;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const answers = useSelector(selectSurveyAnswers(id));

  // шагаем по вопросам через local state, но ответы — в Redux
  const total = survey.questions.length;
  const [step, setStep] = useStateSafe(0); // кастом ниже
  const q = survey.questions[step];

  useEffect(() => {
    // очистим ответы, если заходим на опрос заново
    dispatch(clearSurvey(id));
  }, [id, dispatch]);

  const valid = useMemo(() => {
    const val = answers[q.id];
    if (q.type === 'text') return (val ?? '').trim().length > 0;
    return Array.isArray(val) && val.length > 0;
  }, [answers, q]);

  const onToggleOption = (optIdx) => {
    const cur = Array.isArray(answers[q.id]) ? answers[q.id] : [];
    if (q.multiple) {
      const set = new Set(cur);
      set.has(optIdx) ? set.delete(optIdx) : set.add(optIdx);
      dispatch(setAnswer({ surveyId: id, questionId: q.id, value: Array.from(set) }));
    } else {
      dispatch(setAnswer({ surveyId: id, questionId: q.id, value: [optIdx] }));
    }
  };

  const onChangeText = (v) =>
    dispatch(setAnswer({ surveyId: id, questionId: q.id, value: v }));

  const next = () => {
    if (!valid) return;
    if (step < total - 1) setStep(step + 1);
    else finish();
  };
  const prev = () => setStep((s) => Math.max(0, s - 1));

  const finish = () => {
    // здесь будет вызов API
    // console.log('submit', { surveyId: id, answers });
    navigate(-1);
  };

  const progress = ((step + 1) / total) * 100;
  const isLast = step === total - 1;

  return (
    <div className={styles.page}>
      {/* top controls */}
      <div className={styles.topRow}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <ArrowBackIosNewRoundedIcon className={styles.backIcon} />
          Назад
        </button>

        <div className={styles.progress}>
          <div className={styles.track} />
          <motion.div
            className={styles.fill}
            style={{ width: `${progress}%` }}
            layout
            transition={springSm}
          />
        </div>

        <div className={styles.starBadge}>
          <StarRoundedIcon />
        </div>
      </div>

      {/* question */}
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
                const checked = Array.isArray(answers[q.id]) && answers[q.id].includes(idx);
                return (
                  <li key={idx}>
                    <label className={styles.option}>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => onToggleOption(idx)}
                      />
                      <span className={styles.fakeCheckbox} aria-hidden />
                      <span className={styles.optText}>{opt}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          )}

          <button
            className={`${styles.primaryBtn} ${!valid ? styles.disabled : ''}`}
            onClick={next}
            disabled={!valid}
          >
            {isLast ? 'Ок' : 'Далее'}
          </button>
        </motion.div>
      </AnimatePresence>

      {/* pager */}
      <div className={styles.pager}>
        <button className={styles.arrowBtn} onClick={prev} disabled={step === 0}>
          <ChevronLeftRoundedIcon />
        </button>
        <div className={styles.pageNum}>
          {step + 1}/{total}
        </div>
        <button className={styles.arrowBtn} onClick={next} disabled={!valid}>
          <ChevronRightRoundedIcon />
        </button>
      </div>
    </div>
  );
}

/** безопасный useState для шагов (без отрицательных/некорректных значений) */
import { useState } from 'react';
function useStateSafe(initial) {
  const [v, setV] = useState(initial);
  const setSafe = (next) => {
    const num = typeof next === 'function' ? next(v) : next;
    if (Number.isFinite(num) && num >= 0) setV(num);
  };
  return [v, setSafe];
}
