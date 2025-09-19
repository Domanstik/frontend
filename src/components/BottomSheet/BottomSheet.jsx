import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getPortalRoot } from '../../lib/getPortalRoot';
import styles from './BottomSheet.module.css';

export default function BottomSheet({
  open, onClose, children, initialFocusRef, height = '72vh', ariaLabel = 'Всплывающее окно'
}) {
  const sheetRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  useEffect(() => {
    if (open) (initialFocusRef?.current || sheetRef.current)?.focus?.();
  }, [open, initialFocusRef]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className={styles.root} aria-modal="true" role="dialog" aria-label={ariaLabel}>
          <motion.button
            aria-label="Закрыть"
            className={styles.backdrop}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            ref={sheetRef}
            className={styles.sheet}
            style={{ height }}
            tabIndex={-1}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120 || info.velocity.y > 600) onClose?.();
            }}
          >
            <div className={styles.handle} />
            <div className={styles.content}>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    getPortalRoot()
  );
}
