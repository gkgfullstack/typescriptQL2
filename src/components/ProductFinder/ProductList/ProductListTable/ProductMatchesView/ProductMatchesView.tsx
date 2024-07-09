import React from 'react';
import styles from './ProductMatchesView.module.less';
import ProductFinderInfo from 'src/types/ProductFinderInfo';
import { Link } from 'react-router-dom';

const ProductMatchesView: React.FC<ProductFinderInfo> = ({
  ID,
  matches,
}: ProductFinderInfo) => {


  let urlget = localStorage.getItem('URL')
  return (
    <div key={ID} >
      <h5 className={styles.product_title}>
        <Link to={`/optiprice/product-details/${ID}${urlget}`} title={matches?.toString() ? matches?.toString() : "0"} referrerPolicy={'origin'}>{matches ? matches : 0}</Link></h5>
    </div>
  );
};

export default ProductMatchesView;

