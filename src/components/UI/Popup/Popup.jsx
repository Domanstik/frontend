import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { getPortalRoot } from '../../../lib/getPortalRoot';
import { springMd } from '../../../lib/motionConfig';
import styles from './Popup.module.css';

export default function Popup({ open, onClose, children }) {
  return createPortal(
    <AnimatePresence>
      {open && (
        <div className={styles.root} role="dialog" aria-modal="true">
          <motion.button
            className={styles.backdrop}
            onClick={onClose}
            aria-label="Закрыть"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className={styles.card}
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0, transition: springMd }}
            exit={{ opacity: 0, scale: 0.92, y: 12, transition: springMd }}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    getPortalRoot()
  );
}
