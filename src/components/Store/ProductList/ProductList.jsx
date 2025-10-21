import { motion } from 'framer-motion';
import { listStagger, fadeInUp } from '../../../lib/motionConfig';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductList.module.css';

export default function ProductList({ products = [], onSelect }) {
  return (
    <motion.div
      className={styles.grid}
      variants={listStagger}
      initial="hidden"
      animate="show"
      data-hide-on-sheet
    >
      {products.map((item, idx) => {
        // ЕДИНЫЙ id для всех мест: или server id, или fallback idx
        const idNorm = item.id ?? idx;

        return (
          <motion.div key={idNorm} variants={fadeInUp}>
            <ProductCard
              id={idNorm}
              title={item.title}
              price={item.price}
              productSrc={item.productSrc}
              onClick={() => onSelect?.({ ...item, id: idNorm })}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
