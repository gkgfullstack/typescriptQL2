import React, { useRef } from 'react';
import { IconPrefix, IconName } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Button } from 'antd';
import clsx from 'clsx';

import ViewState from './hooks/ViewState';
import useDescriptionViewState from './hooks';

import styles from './ProductDescription.module.less';

type ProductDescriptionProps = {
  children: string;
  className?: string;
};

const getButton = (viewState: ViewState, collapse: () => void, expand: () => void): React.ReactNode => {
  if (viewState === ViewState.Fits) {
    return null;
  }

  const [onClick, icon, text]: [() => void, [IconPrefix, IconName], string] =
    viewState === ViewState.Expanded
      ? [collapse, ['fal', 'minus-circle'], 'Show Less']
      : [expand, ['fal', 'plus-circle'], 'Show More'];

  return (
    <Button className={styles.button} type="link" onClick={onClick}>
      <FontAwesomeIcon icon={icon as IconProp} />
      <span className={styles.toggle_text}>{text}</span>
    </Button>
  );
};

const ProductDescription: React.FC<ProductDescriptionProps> = ({
  children,
  className,
}: ProductDescriptionProps & React.HTMLAttributes<HTMLDivElement>) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewState, collapse, expand] = useDescriptionViewState(ref, containerRef);

  return (
    <>
      <div
        className={clsx(className, styles.description_container, {
          [styles.collapsed]: viewState === ViewState.Collapsed,
          [styles.expanded]: viewState === ViewState.Expanded,
        })}
        ref={containerRef}
      >
        <p ref={ref} className={styles.description}>
          {children}
        </p>
      </div>
      {getButton(viewState, collapse, expand)}
    </>
  );
};

export default ProductDescription;
