import { renderHook, act } from '@testing-library/react-hooks';
import { RenderHookResult } from 'testing-library__react-hooks';
import useDescriptionViewState from './useDescriptionViewState';
import ViewState from './ViewState';

jest.mock('lodash.debounce', () => (f: () => void): (() => void) => f);

type RenderHookProps = {
  ref: React.RefObject<HTMLElement>;
  containerRef: React.RefObject<HTMLElement>;
};

const renderUseDescriptionHook = (
  initialProps: RenderHookProps
): RenderHookResult<RenderHookProps, [ViewState, () => void, () => void]> =>
  renderHook(({ ref, containerRef }) => useDescriptionViewState(ref, containerRef), {
    initialProps,
  });

describe('useDescriptionViewState hook', () => {
  describe(`initially returns either fits or collapsed depending on the refs' heights`, () => {
    it('returns fits if containers height >= content height', () => {
      const fitsUseCases = [
        {
          ref: {
            current: {
              offsetHeight: 100,
            } as HTMLElement,
          },
          containerRef: {
            current: {
              offsetHeight: 100,
            } as HTMLElement,
          },
        },
        {
          ref: {
            current: {
              offsetHeight: 100,
            } as HTMLElement,
          },
          containerRef: {
            current: {
              offsetHeight: 120,
            } as HTMLElement,
          },
        },
      ];

      fitsUseCases.forEach(useCase => {
        const fitsRenderHookResult = renderHook(({ ref, containerRef }) => useDescriptionViewState(ref, containerRef), {
          initialProps: useCase,
        });
        expect(fitsRenderHookResult.result.current[0]).toBe(ViewState.Fits);
      });
    });

    it('returns collapsed if containers height < content height', () => {
      const shrinksUseCase = {
        ref: {
          current: {
            offsetHeight: 100,
          } as HTMLElement,
        },
        containerRef: {
          current: {
            offsetHeight: 90,
          } as HTMLElement,
        },
      };

      const collapsedRenderHookResult = renderHook(
        ({ ref, containerRef }) => useDescriptionViewState(ref, containerRef),
        {
          initialProps: shrinksUseCase,
        }
      );

      expect(collapsedRenderHookResult.result.current[0]).toBe(ViewState.Collapsed);
    });
  });

  describe(`returns either expanded or collapsed after invoking corresponding callbacks`, () => {
    const shrinksUseCase = {
      ref: {
        current: {
          offsetHeight: 100,
        } as HTMLElement,
      },
      containerRef: {
        current: {
          offsetHeight: 90,
        } as HTMLElement,
      },
    };

    it('returns expanded after invoking expand callback', () => {
      const { result } = renderUseDescriptionHook(shrinksUseCase);
      act(() => {
        result.current[2]();
      });
      expect(result.current[0]).toBe(ViewState.Expanded);
    });

    it('returns collapsed after invoking collapse callback', () => {
      const { result } = renderUseDescriptionHook(shrinksUseCase);
      act(() => {
        result.current[1]();
      });

      expect(result.current[0]).toBe(ViewState.Collapsed);
    });
  });

  describe(`on window resize event returns either collapsed or fits depending on the refs' heights`, () => {
    const hookProps = {
      ref: {
        current: {
          offsetHeight: 100,
        } as HTMLElement,
      },
      containerRef: {
        current: {
          offsetHeight: 100,
        } as HTMLElement,
      },
    };

    it(`returns collapsed if content doesn't the container`, () => {
      const { result } = renderUseDescriptionHook(hookProps);
      Object.defineProperty(hookProps.ref.current, 'offsetHeight', {
        value: 300,
        writable: false,
      });
      act(() => {
        window.dispatchEvent(new Event('resize'));
      });
      expect(result.current[0]).toBe(ViewState.Collapsed);
    });

    it('returns fits if content fits the container', () => {
      const { result } = renderUseDescriptionHook(hookProps);
      Object.defineProperty(hookProps.ref.current, 'offsetHeight', {
        value: 90,
        writable: false,
      });
      act(() => {
        window.dispatchEvent(new Event('resize'));
      });
      expect(result.current[0]).toBe(ViewState.Fits);
    });
  });
});
