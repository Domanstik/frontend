import { useContext, useEffect, useMemo, useState } from 'react';
import { UIContext } from '@contexts/ui-context';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import DragIndicatorRoundedIcon from '@mui/icons-material/DragIndicatorRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';

import styles from './CreateSurvey.module.css';

// вопрос типов: "options" (один/несколько) и "text"
const mkQuestion = () => ({
  id: crypto.randomUUID(),
  type: 'options', // 'options' | 'text'
  title: '',
  stars: '',
  multiple: false, // для options
  answers: [{ id: crypto.randomUUID(), text: '', correct: false }],
});

export default function CreateSurvey() {
  const { setHeader, avatars } = useContext(UIContext);
  const navigate = useNavigate();

  useEffect(() => {
    setHeader({ title: 'Создание опроса', avatar: avatars?.female });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [meta, setMeta] = useState({ name: '', locale: 'all', lang: 'ru' });
  const [questions, setQuestions] = useState([mkQuestion()]);

  const addQuestion = () => setQuestions((q) => [...q, mkQuestion()]);
  const removeQuestion = (qid) => setQuestions((q) => q.filter((x) => x.id !== qid));

  const patchQ = (qid, patch) =>
    setQuestions((q) => q.map((x) => (x.id === qid ? { ...x, ...patch } : x)));

  const addAnswer = (qid) =>
    setQuestions((q) =>
      q.map((x) =>
        x.id === qid
          ? {
              ...x,
              answers: [
                ...x.answers,
                { id: crypto.randomUUID(), text: '', correct: false },
              ],
            }
          : x,
      ),
    );
  const patchA = (qid, aid, patch) =>
    setQuestions((q) =>
      q.map((x) =>
        x.id === qid
          ? {
              ...x,
              answers: x.answers.map((a) => (a.id === aid ? { ...a, ...patch } : a)),
            }
          : x,
      ),
    );
  const removeA = (qid, aid) =>
    setQuestions((q) =>
      q.map((x) =>
        x.id === qid ? { ...x, answers: x.answers.filter((a) => a.id !== aid) } : x,
      ),
    );

  const submit = (e) => {
    e.preventDefault();
    // TODO: отправить на бэкенд
    console.log('survey:', { meta, questions });
    navigate(-1);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button className={styles.back} onClick={() => navigate(-1)}>
          <ArrowBackIosNewRoundedIcon />
        </button>
        <div className={styles.hTitle}>Создание опроса</div>
      </div>

      <motion.form
        className={styles.form}
        onSubmit={submit}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {/* Заголовок/локализация */}
        <div className={styles.row2}>
          <label className={styles.label}>Название</label>
          <input
            className={styles.input}
            value={meta.name}
            onChange={(e) => setMeta((m) => ({ ...m, name: e.target.value }))}
          />

          <label className={`${styles.label} ${styles.right}`}>Локация</label>
          <select
            className={styles.selectSmall}
            value={meta.locale}
            onChange={(e) => setMeta((m) => ({ ...m, locale: e.target.value }))}
          >
            <option value="all">All</option>
            <option value="hq">HQ</option>
            <option value="minsk">Minsk</option>
          </select>

          <label className={`${styles.label} ${styles.right}`}>Язык</label>
          <div className={styles.lang}>
            <LanguageRoundedIcon className={styles.langIcon} />
            <select
              className={styles.selectSmall}
              value={meta.lang}
              onChange={(e) => setMeta((m) => ({ ...m, lang: e.target.value }))}
            >
              <option value="ru">Рус 🇷🇺</option>
              <option value="en">Eng 🇬🇧</option>
              <option value="pl">Pol 🇵🇱</option>
            </select>
          </div>
        </div>

        {/* Вопросы */}
        {questions.map((q, idx) => (
          <div className={styles.question} key={q.id}>
            <div className={styles.qHeader}>
              <div className={styles.qTitle}>Вопрос</div>
              <div className={styles.qStars}>
                <label>Звезды</label>
                <input
                  className={styles.inputSmall}
                  value={q.stars}
                  onChange={(e) => patchQ(q.id, { stars: e.target.value })}
                  inputMode="numeric"
                />
              </div>
            </div>

            <input
              className={styles.input}
              placeholder="Текст вопроса"
              value={q.title}
              onChange={(e) => patchQ(q.id, { title: e.target.value })}
            />

            {/* Переключатель типа */}
            <div className={styles.switchRow}>
              <div className={styles.switchBox}>
                <span>Несколько вариантов</span>
                <label className={styles.toggle}>
                  <input
                    type="checkbox"
                    checked={q.multiple}
                    onChange={(e) =>
                      patchQ(q.id, { type: 'options', multiple: e.target.checked })
                    }
                  />
                  <i />
                </label>
              </div>

              <div className={styles.switchBox}>
                <span>Текстовое поле</span>
                <label className={styles.toggle}>
                  <input
                    type="checkbox"
                    checked={q.type === 'text'}
                    onChange={(e) =>
                      patchQ(q.id, { type: e.target.checked ? 'text' : 'options' })
                    }
                  />
                  <i />
                </label>
              </div>
            </div>

            {/* Контент вопроса */}
            {q.type === 'text' ? (
              <textarea
                className={styles.textarea}
                placeholder="Ответ"
                rows={3}
                disabled
              />
            ) : (
              <>
                <div className={styles.answersHead}>Варианты ответа</div>

                {q.answers.map((a, ai) => (
                  <div key={a.id} className={styles.answerRow}>
                    <DragIndicatorRoundedIcon className={styles.drag} />
                    <input
                      className={styles.input}
                      placeholder="Ответ"
                      value={a.text}
                      onChange={(e) => patchA(q.id, a.id, { text: e.target.value })}
                    />
                    <button
                      className={styles.mark}
                      type="button"
                      onClick={() => {
                        if (q.multiple) {
                          patchA(q.id, a.id, { correct: !a.correct });
                        } else {
                          // один правильный
                          setQuestions((list) =>
                            list.map((qq) =>
                              qq.id !== q.id
                                ? qq
                                : {
                                    ...qq,
                                    answers: qq.answers.map((xx) => ({
                                      ...xx,
                                      correct: xx.id === a.id ? !xx.correct : false,
                                    })),
                                  },
                            ),
                          );
                        }
                      }}
                      title="Отметить"
                    >
                      {a.correct ? (
                        <CheckCircleOutlineRoundedIcon />
                      ) : (
                        <RadioButtonUncheckedRoundedIcon />
                      )}
                    </button>
                    <button
                      className={styles.remove}
                      type="button"
                      onClick={() => removeA(q.id, a.id)}
                    >
                      <RemoveRoundedIcon />
                    </button>
                  </div>
                ))}

                <button
                  className={styles.addAnswer}
                  type="button"
                  onClick={() => addAnswer(q.id)}
                >
                  <AddRoundedIcon /> Добавить еще вариант ответа
                </button>
              </>
            )}

            <div className={styles.qFooter}>
              <button
                className={styles.removeQ}
                type="button"
                onClick={() => removeQuestion(q.id)}
              >
                <RemoveRoundedIcon /> Удалить вопрос
              </button>
            </div>

            <div className={styles.sep} />
          </div>
        ))}

        <button className={styles.addQuestion} type="button" onClick={addQuestion}>
          <AddRoundedIcon /> Добавить вопрос
        </button>

        <div className={styles.footer}>
          <button type="submit" className={styles.btnPrimary}>
            Ок
          </button>
          <button type="button" className={styles.btnGhost} onClick={() => navigate(-1)}>
            Отмена
          </button>
        </div>
      </motion.form>
    </div>
  );
}
