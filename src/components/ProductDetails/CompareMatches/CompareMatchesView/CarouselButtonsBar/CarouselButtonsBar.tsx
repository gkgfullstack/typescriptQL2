import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'antd';
import { CompareMatchesViewProps } from '../CompareMatchesView';

import styles from './CarouselButtonsBar.module.less';

export type CarouselButtonsBarProps = CompareMatchesViewProps & {
  currentIndex: number;
  itemsPerPage: number;
  onClick: (currentIndex: number) => void;
};

const CarouselButtonsBar: React.FC<CarouselButtonsBarProps> = (props: CarouselButtonsBarProps) => {
  const { loading, currentIndex, itemsPerPage, totalMatches, onClick } = props;

  const disabledCarouselLeft: boolean = currentIndex === 0 || loading;
  const disabledCarouselRight: boolean =
    currentIndex >= totalMatches - itemsPerPage || totalMatches <= itemsPerPage || loading;

  return (
    <div className={styles.carousel_buttons_bar}>
      <Button className={styles.button} onClick={(): void => onClick(-itemsPerPage)} disabled={disabledCarouselLeft}>
        <FontAwesomeIcon icon={['far', 'chevron-left']} size={'lg'} />
      </Button>
      <Button className={styles.button} onClick={(): void => onClick(itemsPerPage)} disabled={disabledCarouselRight}>
        <FontAwesomeIcon icon={['far', 'chevron-right']} size={'lg'} />
      </Button>
    </div>
  );
};

export default CarouselButtonsBar;
