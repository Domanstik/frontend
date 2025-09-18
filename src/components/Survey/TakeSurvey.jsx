import { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

import { UIContext } from '@contexts/ui-context';
import styles from './TakeSurvey.module.css';

// ===== mock data (подключи реальные данные, когда будет API)
const SURVEYS = {
  s1: {
    title: 'ТЕКУЩИЕ ЗАДАНИЯ',
    rewardPerQuestion: 1,
    questions: [
      {
        id: 'q1',
        type: 'options',            // 'options' | 'text'
        multiple: false,            // для options
        title: 'Вопрос №1',
        text: 'Поле для текста вопроса',
        options: ['первый ответ', 'второй ответ', 'третий ответ', 'четвёртый ответ'],
      },
      {
        id: 'q2',
        type: 'text',
        title: 'Вопрос №2',
        text: 'Поле для текста вопроса',
        placeholder: 'Ваш ответ…',
      },
      {
        id: 'q3',
        type: 'options',
        multiple: true,
        title: 'Вопрос №3',
        text: 'Поле для текста вопроса',
        options: ['первый ответ', 'второй ответ', 'третий ответ', 'четвёртый ответ'],
      },
      {
        id: 'q4',
        type: 'text',
        title: 'Вопрос №4',
        text: 'Поле для текста вопроса',
        placeholder: 'Ваш ответ…',
      },
    ],
  },
};

export default function TakeSurvey() {
  const { id = 's1' } = useParams();
  const survey = SURVEYS[id] ?? SURVEYS.s1;

  const { setHeader, avatars } = useContext(UIContext);
  const navigate = useNavigate();

  useEffect(() => {
    setHeader({ title: survey.title, avatar: avatars?.female });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const total = survey.questions.length;
  const [step, setStep] = useState(0); // индекс вопроса
  const q = survey.questions[step];

  // ответы: текст | массив индексов опций
  const [answers, setAnswers] = useState(() =>
    Object.fromEntries(survey.questions.map(x => [x.id, x.type === 'text' ? '' : []]))
  );

  // валидность текущего шага
  const valid = useMemo(() => {
    const a = answers[q.id];
    if (q.type === 'text') return (a ?? '').trim().length > 0;
    return Array.isArray(a) && a.length > 0;
  }, [answers, q]);

  const onToggleOption = (optIdx) => {
    setAnswers(prev => {
      const cur = prev[q.id];
      if (q.multiple) {
        const set = new Set(cur);
        set.has(optIdx) ? set.delete(optIdx) : set.add(optIdx);
        return { ...prev, [q.id]: Array.from(set) };
        } else {
        return { ...prev, [q.id]: [optIdx] };
      }
    });
  };

  const onChangeText = (v) => setAnswers(prev => ({ ...prev, [q.id]: v }));

  const next = () => {
    if (!valid) return;
    if (step < total - 1) setStep(step + 1);
    else finish();
  };
  const prev = () => setStep(s => Math.max(0, s - 1));

  const finish = () => {
    // TODO: отправить результаты в API
    console.log('survey submit:', { surveyId: id, answers });
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
          <div className={styles.fill} style={{ width: `${progress}%` }} />
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
                value={answers[q.id]}
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

      {/* bottom pager */}
      <div className={styles.pager}>
        <button className={styles.arrowBtn} onClick={prev} disabled={step === 0}>
          <ChevronLeftRoundedIcon />
        </button>
        <div className={styles.pageNum}>{step + 1}/{total}</div>
        <button className={styles.arrowBtn} onClick={next} disabled={!valid}>
          <ChevronRightRoundedIcon />
        </button>
      </div>
    </div>
  );
}
