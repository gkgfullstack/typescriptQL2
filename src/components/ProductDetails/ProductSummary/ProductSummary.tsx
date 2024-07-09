import React, { SyntheticEvent } from 'react';
import ProductDescription from './ProductDescription';
import FormattedNumber from 'src/components/common/FormattedNumber';
import styles from './ProductSummary.module.less';
import ProductInfo from 'src/types/ProductInfo';
import AddRequestMatch from './AddRequestMatch/AddRequestMatch';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import Image from 'src/components/common/Image';
import routes from 'src/routes';

type ProductDetailsProps = {
  isReadOnlyMatch: boolean;
  data: ProductInfo;
  className?: string;
};

const ProductSummary: React.FC<ProductDetailsProps> = ({ isReadOnlyMatch, data, className }: ProductDetailsProps) => {
  const history = useHistory();
  let url = localStorage.getItem('URL');
  if (!data) {
    return null;
  }
  const {
    name,
    status,
    description,
    price,
    lowestPrice,
    currency,
    imageURL,
    uniqueIdentifierName1,
    uniqueIdentifierValue1,
    uniqueIdentifierName2,
    uniqueIdentifierValue2,
    ownerName,
  } = data;

  const detailsList = [];

  if (uniqueIdentifierName1) {
    detailsList.push({ label: uniqueIdentifierName1, value: uniqueIdentifierValue1 ? uniqueIdentifierValue1 : 'n/a' });
  }
  if (uniqueIdentifierName2) {
    detailsList.push({ label: uniqueIdentifierName2, value: uniqueIdentifierValue2 ? uniqueIdentifierValue2 : 'n/a' });
  }
  if (ownerName) {
    detailsList.push({ label: 'OWNER', value: ownerName });
  }

  return (
    <div className={clsx(styles.product_summary, className)}>
      <div className={styles.actions_container}>
        <Link
          className={styles.back_link}
          to={routes.productFinder}
          onClick={(event: SyntheticEvent) => {
            if (window.history.state && window.history.state.key) {
              event.preventDefault();
              url = url + '&back=true';
              if (url != null) {
                history.push({
                  pathname: routes.productFinder,
                  search: url,
                });
              }
            }
          }}
        >
          <FontAwesomeIcon icon={['far', 'chevron-left']} size={'xs'} className={styles.back_icon} />
          Back to results
        </Link>
        {!isReadOnlyMatch && (
          <div className={styles.actions_bar}>
            <AddRequestMatch />
          </div>
        )}
      </div>
      <h1 className={styles.product_name}>{name}</h1>
      <dl className={styles.description_list}>
        {detailsList.map(({ label, value }) => (
          <React.Fragment key={label}>
            <dt>{label}:</dt>
            <dd>{value}</dd>
          </React.Fragment>
        ))}
        {status === 1 ? (
          <>
            <dt>Status:</dt>
            <dd>
              <span
                style={{
                  margin: '0px 5px 0px 0px',
                  border: '2px solid #59e119',
                  width: '10px',
                  height: '10px',
                  display: 'inline-block',
                  borderRadius: '10px',
                }}
              ></span>
              Active
            </dd>
          </>
        ) : (
          ''
        )}
        {status === 0 ? (
          <>
            <dt>Status:</dt>
            <dd>
              <span
                style={{
                  margin: '0px 5px 0px 0px',
                  border: '2px solid #c5c5c5',
                  width: '10px',
                  height: '10px',
                  display: 'inline-block',
                  borderRadius: '10px',
                }}
              ></span>
              Inactive
            </dd>
          </>
        ) : (
          ''
        )}
      </dl>
      <div className={styles.product_details_container}>
        <div className={styles.image_container}>
          <Image url={imageURL} alt={name} />
        </div>
        <div className={styles.price_description_container}>
          <h1 style={{ color: '#323C47', marginBottom: '0px' }}>
            {lowestPrice === price ? (
              <FormattedNumber type="currency" className={styles.price} currency={currency} value={price} />
            ) : (
              <>
                <FormattedNumber type="currency" className={styles.priceRegular} currency={currency} value={price} />
                <FormattedNumber type="currency" className={styles.price} currency={currency} value={lowestPrice} />
              </>
            )}
          </h1>
          <ProductDescription className={styles.description}>{description}</ProductDescription>
        </div>
      </div>
    </div>
  );
};

export default ProductSummary;
