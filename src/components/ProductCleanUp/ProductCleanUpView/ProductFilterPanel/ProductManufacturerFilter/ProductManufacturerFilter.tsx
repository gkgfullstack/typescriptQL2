import React, { useState } from 'react';
import { faToggleOff, faToggleOn } from '@fortawesome/pro-light-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import styles from './ProductManufacturerFilter.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type ProductSiteFilterProps = {
  setParams: (name: string, value: string) => void;
};

const faToggleOffIcon = faToggleOff as IconProp;
const faToggleOnIcon = faToggleOn as IconProp;

const ProductManufacturerFilter: React.FC<ProductSiteFilterProps> = ({ setParams }) => {
  const [isManufactureEnabled, setManufactureEnabled] = useState(true);

  const onToggle = () => {
    const updatedManufactureEnabled = !isManufactureEnabled;
    const manufacturerId: string = updatedManufactureEnabled ? '1' : '0';
    setParams('manufacturer', manufacturerId);
    setManufactureEnabled(updatedManufactureEnabled);
  };

  return (
    <p className={styles.product_manufacturer_filter}>
      <span className={styles.product_manufacturer_label} onClick={onToggle}>
        Same Manufacturer
      </span>
      {isManufactureEnabled ? (
        <FontAwesomeIcon icon={faToggleOnIcon} className={styles.status_active_icon} onClick={onToggle} size="lg" />
      ) : (
        <FontAwesomeIcon onClick={onToggle} icon={faToggleOffIcon} className={styles.status_inactive_icon} size="lg" />
      )}
    </p>
  );
};

export default ProductManufacturerFilter;
