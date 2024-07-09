import React, { useState } from 'react';
import { useMatchAddingState } from './hooks';
import { AddMatchRequest } from './hooks/useMatchAddingState';
import { Popover } from 'antd';
import AddMatchForm from './AddMatchForm';
import SubmittedRequestPopover from '../SubmittedRequestPopover/SubmittedRequestPopover';
import { TooltipPlacement } from 'antd/lib/tooltip';
import useCompetitorsFetching from 'src/hooks/useCompetitorsFetching';

type AddMatchProps = { children: React.ReactNode; tooltipPlacement?: TooltipPlacement };

export const AddMatch: React.FC<AddMatchProps> = ({ children, tooltipPlacement }: AddMatchProps) => {
  const [{ loading, data, error }, { addMatch }] = useMatchAddingState();
  const [{ loading: competitorsLoading, data: competitors, error: competitorError }] = useCompetitorsFetching();
  const [showSubmittedPopover, setShowSubmittedPopover] = useState(false);
  const [visibleForm, setFormVisibility] = useState(false);

  const handleSubmit = (values: AddMatchRequest): void => {
    if (addMatch && values) {
      addMatch(values);
    }
  };
  React.useEffect(() => {
    let timer: NodeJS.Timer;
    if (data !== null && data.statusCode === '200') {
      setShowSubmittedPopover(true);
      setFormVisibility(false);
      timer = setTimeout(() => {
        setShowSubmittedPopover(false);
      }, 1000);
    }
    return (): void => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [data]);

  const formLoading = loading || competitorsLoading;
  const formError = competitorError
    ? 'An error has occurred when trying to get competitors! Please try again later!'
    : error && error.message
    ? error.message
    : error || false;
  const addMatchForm: React.ReactNode = (
    <AddMatchForm
      visible={visibleForm}
      loading={formLoading}
      error={formError}
      competitors={competitors}
      onSubmit={handleSubmit}
    />
  );

  const handleVisibleChange = (visible: boolean) => {
    setFormVisibility(visible);
  };

  return (
    <SubmittedRequestPopover visible={showSubmittedPopover} placement={tooltipPlacement || 'bottom'}>
      <Popover
        trigger={'click'}
        content={addMatchForm}
        visible={visibleForm}
        onVisibleChange={handleVisibleChange}
        placement={tooltipPlacement || 'bottom'}
      >
        {children}
      </Popover>
    </SubmittedRequestPopover>
  );
};

export default AddMatch;
