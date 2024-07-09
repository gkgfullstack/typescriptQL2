import React, { useState } from 'react';
import ProductInfo from 'src/types/ProductInfo';
import ProductMatchInfo from 'src/types/ProductMatcheInfo';
import Widget from 'src/components/common/Widget';
import CompareMatchesTable from './CompareMatchesTable';
import CarouselButtonsBar from './CarouselButtonsBar/CarouselButtonsBar';

export type CompareMatchesViewProps = {
  loading: boolean;
  product: ProductInfo | undefined;
  productMatches: ProductMatchInfo[] | null;
  totalMatches: number;
  getMoreMatches: () => void;
  isReadOnlyMatch: boolean;
};

export const SHIFT_MATCH_COUNT = 8;

const CompareMatchesView: React.FC<CompareMatchesViewProps> = (props: CompareMatchesViewProps) => {
  const { productMatches, totalMatches, getMoreMatches } = props;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCarouselClick = (shiftCount: number): void => {
    const index = currentIndex + shiftCount;
    const newMatchIndex =
      totalMatches && index >= Number(totalMatches) ? Number(totalMatches) - shiftCount : index < 0 ? 0 : index;
    setCurrentIndex(newMatchIndex);
    if (
      productMatches &&
      newMatchIndex > currentIndex &&
      newMatchIndex >= productMatches.length &&
      newMatchIndex < totalMatches
    ) {
      getMoreMatches();
    }
  };

  const actions = (
    <CarouselButtonsBar
      {...props}
      currentIndex={currentIndex}
      itemsPerPage={SHIFT_MATCH_COUNT}
      onClick={handleCarouselClick}
    />
  );

  return (
    <Widget title={`Compare Matches (${totalMatches})`} actions={actions}>
      <CompareMatchesTable {...props} currentIndex={currentIndex} itemsPerPage={SHIFT_MATCH_COUNT} />
    </Widget>
  );
};

export default CompareMatchesView;
