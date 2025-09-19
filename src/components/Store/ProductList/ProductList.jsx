import { motion } from 'framer-motion';
import { listStagger, fadeInUp } from '../../../lib/motionConfig';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductList.module.css';

export default function ProductList({ products = [], onSelect }) {
  return (
    <motion.div className={styles.grid} variants={listStagger} initial="hidden" animate="show">
      {products.map((item, idx) => (
        <motion.div key={item.id ?? `${item.title}-${idx}`} variants={fadeInUp}>
          <ProductCard
            id={item.id ?? idx}
            title={item.title}
            price={item.price}
            productSrc={item.productSrc}
            onClick={() => onSelect?.(item)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
