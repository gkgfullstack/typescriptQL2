import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

import ViewState from './ViewState';

const DEBOUNCE_WAIT = 50;

const useDescriptionViewState = (
  ref: React.RefObject<HTMLElement>,
  containerRef: React.RefObject<HTMLElement>
): [ViewState, () => void, () => void] => {
  const [viewState, setViewState] = useState<ViewState>(ViewState.Collapsed);

  useEffect(() => {
    if (ref && ref.current && containerRef && containerRef.current) {
      if (viewState === ViewState.Collapsed) {
        if (ref.current.offsetHeight <= containerRef.current.offsetHeight) {
          setViewState(ViewState.Fits);
        }
      }
    }
  }, [viewState, setViewState, ref, containerRef]);

  useEffect(() => {
    const updateSize = (): void => {
      setViewState(prev => {
        if (ref && ref.current && containerRef && containerRef.current) {
          if (prev === ViewState.Expanded) {
            return ViewState.Collapsed;
          }
          return ref.current.offsetHeight <= containerRef.current.offsetHeight ? ViewState.Fits : ViewState.Collapsed;
        }
        return prev;
      });
    };

    const eventListener = debounce(updateSize, DEBOUNCE_WAIT, { trailing: true });

    window.addEventListener('resize', eventListener);
    return (): void => {
      window.removeEventListener('resize', eventListener);
    };
  }, [setViewState, ref, containerRef]);

  return [
    viewState,
    (): void => {
      setViewState(ViewState.Collapsed);
    },
    (): void => {
      setViewState(ViewState.Expanded);
    },
  ];
};

export default useDescriptionViewState;
