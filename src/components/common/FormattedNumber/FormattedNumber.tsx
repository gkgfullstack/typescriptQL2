import React from 'react';
import clsx from 'clsx';

import { CURRENCY } from 'src/enums';
import styles from './FormattedNumber.module.less';

type NumberType = 'number' | 'currency';
export type FormattedNumberProps = {
  type?: NumberType;
  value: number | string | undefined;
  currency?: keyof typeof CURRENCY;
  precision?: number; // number of digits after the dot

  className?: string;
};

const formatNumber = (number: number, digits: number): string =>
  number.toFixed(digits).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const valueToFormattedNumber = (value: number | string, digits: number): string => {
  if (typeof value === 'number') {
    return formatNumber(value, digits);
  }
  if (value === 'n/a' || value === 'N/A') {
    return 'n/a';
  }
  const number = Number(value);
  if (Number.isNaN(number)) {
    return value;
  }
  return formatNumber(number, digits);
};

const formatAccordingToType = (type: NumberType, value: string, currency?: keyof typeof CURRENCY): number | string => {
  if (type === 'number') {
    return value;
  }
  if (currency) {
    const curr = CURRENCY[currency];
    return curr ? `${curr}${value}` : `${value} ${currency}`;
  }
  return value;
};

const FormattedNumber: React.FC<FormattedNumberProps> = ({
  type,
  value,
  currency,
  precision,
  className,
}: FormattedNumberProps) => {
  if (value === undefined || ""){
    return <span className={clsx(styles.container, className)}>n/a</span>;
  }

  const _type = type || 'number';

  const digits = precision === undefined || precision < 0 ? 2 : precision;

  const num = valueToFormattedNumber(value, digits);

  const textToRender = num === 'n/a' ? num : formatAccordingToType(_type, num, currency);
 

  return <span className={clsx(styles.container, className)}>{textToRender}</span>;
};

export default FormattedNumber;
