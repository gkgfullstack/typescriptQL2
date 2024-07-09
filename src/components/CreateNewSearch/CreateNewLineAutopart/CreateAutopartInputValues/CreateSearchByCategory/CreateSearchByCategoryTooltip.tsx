import React from 'react';
import { SearchTooltipWrapper } from 'src/components/CreateNewSearch/CreateNewLineTooltip/CreateNewLineTooltip';

type TooltipProps = { text?: string };

export const CreateSearchByCategoryTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      <p>This is a free form field you can use for sorting, formatting or filtering your output</p>
    </div>
  );

  return <SearchTooltipWrapper content={text} />;
};
