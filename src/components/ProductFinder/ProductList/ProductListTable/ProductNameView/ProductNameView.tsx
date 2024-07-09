import React from 'react';
import styles from './ProductNameView.module.less';
import ProductFinderInfo from 'src/types/ProductFinderInfo';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import Image from 'src/components/common/Image/Image';

const ProductNameView: React.FC<ProductFinderInfo> = ({
  ID,
  name,
  status,
  imageURL,
  category,
  uniqueIdentifierName1,
  uniqueIdentifierValue1,
  uniqueIdentifierName2,
  uniqueIdentifierValue2,
  ownerName,
}: ProductFinderInfo) => {
  const rowIdsRender = [];
  const categoryNamechange = localStorage.getItem('category');
  const isExistIdentifier1 = uniqueIdentifierName1;
  const isExistIdentifier2 = uniqueIdentifierName2;
  if (isExistIdentifier1) {
    rowIdsRender.push({ name: uniqueIdentifierName1, value: uniqueIdentifierValue1 ? uniqueIdentifierValue1 : 'n/a' });
  }
  if (isExistIdentifier2) {
    rowIdsRender.push({ name: uniqueIdentifierName2, value: uniqueIdentifierValue2 ? uniqueIdentifierValue2 : 'n/a' });
  }
  
 
const categoryNameDefault = category && (
  <Breadcrumb separator=">">
   {category.split(':').map((category, index) => (
     <Breadcrumb.Item key={index}>{category}</Breadcrumb.Item>
   ))}                 
 </Breadcrumb>);
 const categoryloacalstoragedat = categoryNamechange && (
  <Breadcrumb separator=">">
   {categoryNamechange.split(':').map((categoryNamechange, index) => (
     <Breadcrumb.Item key={index}>{categoryNamechange}</Breadcrumb.Item>
   ))}                 
 </Breadcrumb>);
 let conditionCategory = categorynamewithLocal();
  function categorynamewithLocal() {    
    if(categoryloacalstoragedat){
      return categoryloacalstoragedat
    }else{
      return categoryNameDefault
    }
  }
   let urlget = localStorage.getItem('URL')
  return (
    <div key={ID} className={styles.product_container}>
      <div className={styles.product_picture}>
        <Image url={imageURL} alt={name} />
      </div>
      <div className={styles.product_detail}>
        <h5 className={styles.product_title}>
          {name && (
            <Link to={`/optiprice/product-details/${ID}${urlget}`} title={name} referrerPolicy={'origin'}>
			      {status === 1?(<span style={{margin: '0px 5px 0px 0px', border: '2px solid #59e119', width: '10px', height: '10px', display: 'inline-block', borderRadius: '10px'}}></span>):''}
            {status === 0?(<span style={{margin: '0px 5px 0px 0px', border: '2px solid #c5c5c5', width: '10px', height: '10px', display: 'inline-block', borderRadius: '10px'}}></span>):''}
            {name}
            </Link>
          )}
        </h5>
        <div className={styles.product_info}>
          {rowIdsRender.length > 0 && (
            <div className={styles.product_keys}>
              {rowIdsRender.map((identifier, index) => {
                return (
                  <span key={index}>
                    {`${identifier.name}: ${identifier.value}`}
                    {rowIdsRender.length > 1 && rowIdsRender.length - 1 !== index && ' | '}
                  </span>
                );
              })}
            </div>
          )}
          {conditionCategory}         
          {ownerName && <div>OWNER: {ownerName}</div>}
        </div>
      </div>
    </div>
  );
};

export default ProductNameView;


