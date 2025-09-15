import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductList.module.css';

export default function ProductList({ products = [] }) {
  return (
    <div className={styles.grid}>
      {products.map((item, idx) => (
        <ProductCard
          key={`${item.title}-${item.price}-${idx}`}
          title={item.title}
          price={item.price}
          productSrc={item.productSrc}
        />
      ))}
    </div>
  );
}
