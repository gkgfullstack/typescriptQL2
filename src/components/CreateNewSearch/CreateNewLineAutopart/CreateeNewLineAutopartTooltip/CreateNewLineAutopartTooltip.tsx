import React from 'react';
import { SearchTooltipWrapper } from 'src/components/CreateNewSearch/CreateNewLineTooltip/CreateNewLineTooltip';

type TooltipProps = { content?: string };

export const GeoTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      <p>Geo only supports 2 characters long input</p>
    </div>
  );
  return <SearchTooltipWrapper content={text} />;
};
