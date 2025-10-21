import { motion } from 'framer-motion';
import { springSm } from '../../lib/motionConfig';
import styles from './HeaderSimple.module.css';

export default function HeaderSimple({ title, avatarSrc, right }) {
  return (
    <motion.header
      className={styles.header}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0, transition: springSm }}
    >
      {avatarSrc ? (
        <img src={avatarSrc} alt="" className={styles.avatar} />
      ) : (
        <i className={styles.avatarStub} />
      )}

      <h1 className={styles.title}>{title}</h1>

      {right ? <div className={styles.right}>{right}</div> : <i className={styles.rightStub} />}
    </motion.header>
  );
}

HeaderSimple.defaultProps = { title: '', avatarSrc: '', right: null };
