import {
  optionsDropdownReducer,
  OPTIONS_DROPDOWN_ACTION_TYPES,
  OptionsDropdownState,
  Option,
} from './optionsDropdownReducer';

const optionsInfo: Option[] = [
  {
    value: '1234',
    label: 'Auto',
    hasChildren: true,
  },
  {
    value: '3456',
    label: 'Accessories',
    hasChildren: true,
    children: [
      {
        value: '987',
        label: 'Accessories 1',
        hasChildren: true,
        children: [
          {
            value: '3928',
            label: 'Accessories 2',
            hasChildren: true,
          },
        ],
      },
    ],
  },
];

const state: OptionsDropdownState = {
  initialSetupFinished: true,
  value: [],
  expandedOptions: [],
  selectedOptions: [],
  displayedOptions: [],
  options: [],
  isOverlayVisible: false,
};

describe('optionsDropdownReducer reducer ', () => {
  it('updates state "value" to new value when setDefaultValue action fires and new value is not equals stored', () => {
    const optionsDropdownState: OptionsDropdownState = optionsDropdownReducer(
      { ...state, value: [], initialSetupFinished: true },
      {
        type: OPTIONS_DROPDOWN_ACTION_TYPES.setDefaultValue,
        payload: { options: [], value: ['1234'] },
      }
    );
    expect(optionsDropdownState.value).toEqual(['1234']);
    expect(optionsDropdownState.initialSetupFinished).toEqual(false);
  });
  it('does not update state "value" to new value when setDefaultValue action fires and new value is equals stored', () => {
    const optionsDropdownState: OptionsDropdownState = optionsDropdownReducer(
      { ...state, value: ['1234'], initialSetupFinished: true },
      {
        type: OPTIONS_DROPDOWN_ACTION_TYPES.setDefaultValue,
        payload: { options: [], value: ['1234'] },
      }
    );
    expect(optionsDropdownState.value).toEqual(['1234']);
    expect(optionsDropdownState.initialSetupFinished).toEqual(true);
  });
  it('updates state expandedOptions prop and selectedOptions prop to new value when setDefaultValue action fires and new value is not equals stored and there is an option on appropriate nesting level in options list that equals value', () => {
    let optionsDropdownState: OptionsDropdownState = optionsDropdownReducer(
      { ...state, value: [], initialSetupFinished: true },
      {
        type: OPTIONS_DROPDOWN_ACTION_TYPES.setDefaultValue,
        payload: { options: optionsInfo, value: ['1234'] },
      }
    );
    expect(optionsDropdownState.expandedOptions).toEqual([]);
    expect(optionsDropdownState.selectedOptions).toEqual([optionsInfo[0]]);
    expect(optionsDropdownState.initialSetupFinished).toEqual(true);

    optionsDropdownState = optionsDropdownReducer(
      { ...state, value: [], initialSetupFinished: true },
      {
        type: OPTIONS_DROPDOWN_ACTION_TYPES.setDefaultValue,
        payload: { options: optionsInfo, value: ['3456', '987'] },
      }
    );
    expect(optionsDropdownState.expandedOptions).toEqual([optionsInfo[1]]);
    expect(optionsDropdownState.selectedOptions).toEqual([optionsInfo[1], optionsInfo[1].children![0]]);
    expect(optionsDropdownState.initialSetupFinished).toEqual(true);
  });
  it('does not update state selectedOptions prop and updates expandedOptions prop to new value when setDefaultValue action fires and new value is not equals stored and there is no option on appropriate nesting level in options list that equals value', () => {
    let optionsDropdownState: OptionsDropdownState = optionsDropdownReducer(
      { ...state, value: [], initialSetupFinished: true },
      {
        type: OPTIONS_DROPDOWN_ACTION_TYPES.setDefaultValue,
        payload: { options: optionsInfo, value: ['3456', '987', '3928', '333'] },
      }
    );
    expect(optionsDropdownState.expandedOptions).toEqual([
      optionsInfo[1],
      optionsInfo[1].children![0],
      optionsInfo[1].children![0].children![0],
    ]);
    expect(optionsDropdownState.selectedOptions).toEqual([]);
    expect(optionsDropdownState.initialSetupFinished).toEqual(false);

    optionsDropdownState = optionsDropdownReducer(
      { ...state, value: ['3456', '987', '3928', '333'], initialSetupFinished: false },
      {
        type: OPTIONS_DROPDOWN_ACTION_TYPES.setDefaultValue,
        payload: { options: optionsInfo, value: ['3456', '987', '3928', '333'] },
      }
    );
    expect(optionsDropdownState.expandedOptions).toEqual([
      optionsInfo[1],
      optionsInfo[1].children![0],
      optionsInfo[1].children![0].children![0],
    ]);
    expect(optionsDropdownState.selectedOptions).toEqual([]);
    expect(optionsDropdownState.initialSetupFinished).toEqual(false);
  });
  it('updates state options prop to new value when updateOptions action fires and new options is not equal stored', () => {
    const optionsDropdownState: OptionsDropdownState = optionsDropdownReducer(
      { ...state },
      {
        type: OPTIONS_DROPDOWN_ACTION_TYPES.updateOptions,
        payload: { options: optionsInfo },
      }
    );
    expect(optionsDropdownState.options).toEqual(optionsInfo);
  });
  it('does not update options prop to new value when updateOptions action fires and new options is equal stored', () => {
    const optionsDropdownState: OptionsDropdownState = optionsDropdownReducer(
      { ...state, options: optionsInfo },
      {
        type: OPTIONS_DROPDOWN_ACTION_TYPES.updateOptions,
        payload: { options: [...optionsInfo] },
      }
    );
    expect(optionsDropdownState.options).toEqual(optionsInfo);
  });

  describe('updates state displayedOptions prop to new value when updateDisplayedOptions action fires and new displayedOptions are not equal stored', () => {
    it('', () => {
      const optionsDropdownState: OptionsDropdownState = optionsDropdownReducer(
        {
          ...state,
          options: optionsInfo,
          selectedOptions: [optionsInfo[1], optionsInfo[1].children![0]],
          expandedOptions: [optionsInfo[1]],
        },
        {
          type: OPTIONS_DROPDOWN_ACTION_TYPES.updateDisplayedOptions,
        }
      );
      expect(optionsDropdownState.displayedOptions.length).toEqual(2);
    });
    it('where option selected prop is set to true when selectedOptions contains that option value', () => {
      const optionsDropdownState: OptionsDropdownState = optionsDropdownReducer(
        {
          ...state,
          options: optionsInfo,
          selectedOptions: [optionsInfo[1], optionsInfo[1].children![0]],
          expandedOptions: [optionsInfo[1]],
        },
        {
          type: OPTIONS_DROPDOWN_ACTION_TYPES.updateDisplayedOptions,
        }
      );
      expect(optionsDropdownState.displayedOptions.length).toEqual(2);
      expect(optionsDropdownState.displayedOptions[0][1].selected).toEqual(true);
      expect(optionsDropdownState.displayedOptions[1][0].selected).toEqual(true);
    });
    it('where option selected prop is set to false when selectedOptions does not contain that option value', () => {
      const optionsDropdownState: OptionsDropdownState = optionsDropdownReducer(
        {
          ...state,
          options: optionsInfo,
          selectedOptions: [optionsInfo[1]],
          expandedOptions: [optionsInfo[1], optionsInfo[1].children![0]],
        },
        {
          type: OPTIONS_DROPDOWN_ACTION_TYPES.updateDisplayedOptions,
        }
      );
      expect(optionsDropdownState.displayedOptions.length).toEqual(3);
      expect(optionsDropdownState.displayedOptions[0][0].selected).toEqual(false);
      expect(optionsDropdownState.displayedOptions[1][0].selected).toEqual(undefined);
      expect(optionsDropdownState.displayedOptions[2][0].selected).toEqual(undefined);
    });
    it('where option expanded prop is set to true when expandedOptions contains that option value', () => {
      const optionsDropdownState: OptionsDropdownState = optionsDropdownReducer(
        {
          ...state,
          options: optionsInfo,
          selectedOptions: [optionsInfo[1], optionsInfo[1].children![0]],
          expandedOptions: [optionsInfo[1]],
        },
        {
          type: OPTIONS_DROPDOWN_ACTION_TYPES.updateDisplayedOptions,
        }
      );
      expect(optionsDropdownState.displayedOptions.length).toEqual(2);
      expect(optionsDropdownState.displayedOptions[0][1].expanded).toEqual(true);
    });
    it('where option expanded prop is set to false when expandedOptions does not contain that option value', () => {
      const optionsDropdownState: OptionsDropdownState = optionsDropdownReducer(
        {
          ...state,
          options: optionsInfo,
          selectedOptions: [optionsInfo[1]],
          expandedOptions: [optionsInfo[1], optionsInfo[1].children![0]],
        },
        {
          type: OPTIONS_DROPDOWN_ACTION_TYPES.updateDisplayedOptions,
        }
      );
      expect(optionsDropdownState.displayedOptions.length).toEqual(3);
      expect(optionsDropdownState.displayedOptions[0][0].expanded).toEqual(false);
      expect(optionsDropdownState.displayedOptions[2][0].expanded).toEqual(undefined);
    });
    it('where option checked prop is set to true when selectedOptions contains that option value and value is the last item in the selectedOptions', () => {
      const optionsDropdownState: OptionsDropdownState = optionsDropdownReducer(
        {
          ...state,
          options: optionsInfo,
          selectedOptions: [optionsInfo[1], optionsInfo[1].children![0]],
          expandedOptions: [optionsInfo[1]],
        },
        {
          type: OPTIONS_DROPDOWN_ACTION_TYPES.updateDisplayedOptions,
        }
      );
      expect(optionsDropdownState.displayedOptions.length).toEqual(2);
      expect(optionsDropdownState.displayedOptions[1][0].checked).toEqual(true);
    });
    it('where option checked prop is set to false when selectedOptions does not contain that option value or contains that option value and value is not the last item in the selectedOptions', () => {
      const optionsDropdownState: OptionsDropdownState = optionsDropdownReducer(
        {
          ...state,
          options: optionsInfo,
          selectedOptions: [optionsInfo[1], optionsInfo[1].children![0], optionsInfo[1].children![0].children![0]],
          expandedOptions: [optionsInfo[1], optionsInfo[1].children![0]],
        },
        {
          type: OPTIONS_DROPDOWN_ACTION_TYPES.updateDisplayedOptions,
        }
      );
      expect(optionsDropdownState.displayedOptions.length).toEqual(3);
      expect(optionsDropdownState.displayedOptions[0][0].checked).toEqual(false);
      expect(optionsDropdownState.displayedOptions[0][1].checked).toEqual(false);
      expect(optionsDropdownState.displayedOptions[1][0].checked).toEqual(false);
    });
    it('where option loading prop is set to true when expandedOptions contains that option value and children prop is not defined', () => {
      const optionsDropdownState: OptionsDropdownState = optionsDropdownReducer(
        {
          ...state,
          options: optionsInfo,
          selectedOptions: [],
          expandedOptions: [optionsInfo[1], optionsInfo[1].children![0], optionsInfo[1].children![0].children![0]],
        },
        {
          type: OPTIONS_DROPDOWN_ACTION_TYPES.updateDisplayedOptions,
        }
      );
      expect(optionsDropdownState.displayedOptions.length).toEqual(3);
      expect(optionsDropdownState.displayedOptions[2][0].loading).toEqual(true);
    });
    it('where option loading prop is set to false when expandedOptions does not contain that option value or contains that option value and children prop is defined', () => {
      const optionsDropdownState: OptionsDropdownState = optionsDropdownReducer(
        {
          ...state,
          options: optionsInfo,
          selectedOptions: [],
          expandedOptions: [optionsInfo[1], optionsInfo[1].children![0], optionsInfo[1].children![0].children![0]],
        },
        {
          type: OPTIONS_DROPDOWN_ACTION_TYPES.updateDisplayedOptions,
        }
      );
      expect(optionsDropdownState.displayedOptions.length).toEqual(3);
      expect(optionsDropdownState.displayedOptions[0][0].loading).toEqual(false);
      expect(optionsDropdownState.displayedOptions[0][1].loading).toEqual(false);
      expect(optionsDropdownState.displayedOptions[1][0].loading).toEqual(false);
    });
  });

  it('updates state selectedOptions prop to new value when setSelectedOptions action fires and new options are not equal stored', () => {
    let optionsDropdownState: OptionsDropdownState = optionsDropdownReducer(
      { ...state, displayedOptions: [optionsInfo] },
      {
        type: OPTIONS_DROPDOWN_ACTION_TYPES.setSelectedOptions,
        payload: { selectedItems: [optionsInfo[0]] },
      }
    );
    expect(optionsDropdownState.selectedOptions).toEqual([optionsInfo[0]]);

    optionsDropdownState = optionsDropdownReducer(
      { ...state, displayedOptions: [optionsInfo, optionsInfo[1].children || []], expandedOptions: [optionsInfo[1]] },
      {
        type: OPTIONS_DROPDOWN_ACTION_TYPES.setSelectedOptions,
        payload: { selectedItems: [optionsInfo[1], optionsInfo[1].children![0]] },
      }
    );
    expect(optionsDropdownState.selectedOptions).toEqual([optionsInfo[1], optionsInfo[1].children![0]]);
  });
  it('updates state isOverlayVisible prop to false when setSelectedOptions action fires', () => {
    const optionsDropdownState: OptionsDropdownState = optionsDropdownReducer(
      { ...state },
      {
        type: OPTIONS_DROPDOWN_ACTION_TYPES.setSelectedOptions,
        payload: { selectedItems: [optionsInfo[0]] },
      }
    );
    expect(optionsDropdownState.isOverlayVisible).toEqual(false);
  });
  it('does not update selectedOptions prop to new value when setSelectedOptions action fires and selected options are equal stored', () => {
    const optionsDropdownState: OptionsDropdownState = optionsDropdownReducer(
      { ...state, selectedOptions: [optionsInfo[0]], displayedOptions: [optionsInfo], initialSetupFinished: true },
      {
        type: OPTIONS_DROPDOWN_ACTION_TYPES.setSelectedOptions,
        payload: { selectedItems: [optionsInfo[0]] },
      }
    );
    expect(optionsDropdownState.selectedOptions).toEqual([optionsInfo[0]]);
  });

  it('updates state expandedOptions prop to new value when setExpandedOptions action fires and new options are not equal stored and initialSetupFinished is true', () => {
    let optionsDropdownState: OptionsDropdownState = optionsDropdownReducer(
      { ...state, displayedOptions: [optionsInfo] },
      {
        type: OPTIONS_DROPDOWN_ACTION_TYPES.setExpandedOptions,
        payload: { selectedItem: optionsInfo[1] },
      }
    );
    expect(optionsDropdownState.expandedOptions).toEqual([optionsInfo[1]]);

    optionsDropdownState = optionsDropdownReducer(
      { ...state, displayedOptions: [optionsInfo, optionsInfo[1].children || []], expandedOptions: [optionsInfo[1]] },
      {
        type: OPTIONS_DROPDOWN_ACTION_TYPES.setExpandedOptions,
        payload: { selectedItem: optionsInfo[1].children![0] },
      }
    );
    expect(optionsDropdownState.expandedOptions).toEqual([optionsInfo[1], optionsInfo[1].children![0]]);
  });
  it('does not update expandedOptions prop to new value when setExpandedOptions action fires and initialSetupFinished is false', () => {
    const optionsDropdownState: OptionsDropdownState = optionsDropdownReducer(
      { ...state, displayedOptions: [optionsInfo], initialSetupFinished: false },
      {
        type: OPTIONS_DROPDOWN_ACTION_TYPES.setExpandedOptions,
        payload: { selectedItem: optionsInfo[0] },
      }
    );
    expect(optionsDropdownState.expandedOptions).toEqual([]);
  });
  it('does not update expandedOptions prop to new value when setExpandedOptions action fires and initialSetupFinished is true and there are no displayed options', () => {
    const optionsDropdownState: OptionsDropdownState = optionsDropdownReducer(
      { ...state, displayedOptions: [], initialSetupFinished: true },
      {
        type: OPTIONS_DROPDOWN_ACTION_TYPES.setExpandedOptions,
        payload: { selectedItem: optionsInfo[0] },
      }
    );
    expect(optionsDropdownState.expandedOptions).toEqual([]);
  });
  it('does not update expandedOptions prop to new value when setExpandedOptions action fires and selected options are equal stored', () => {
    const optionsDropdownState: OptionsDropdownState = optionsDropdownReducer(
      { ...state, expandedOptions: [optionsInfo[0]], displayedOptions: [optionsInfo], initialSetupFinished: true },
      {
        type: OPTIONS_DROPDOWN_ACTION_TYPES.setExpandedOptions,
        payload: { selectedItem: optionsInfo[0] },
      }
    );
    expect(optionsDropdownState.expandedOptions).toEqual([optionsInfo[0]]);
  });
  it('updates state isOverlayVisible prop to new value when setOverlayVisibility action fires', () => {
    let optionsDropdownState: OptionsDropdownState = optionsDropdownReducer(
      { ...state, displayedOptions: [optionsInfo] },
      {
        type: OPTIONS_DROPDOWN_ACTION_TYPES.setOverlayVisibility,
        payload: true,
      }
    );
    expect(optionsDropdownState.isOverlayVisible).toEqual(true);

    optionsDropdownState = optionsDropdownReducer(
      { ...state, displayedOptions: [optionsInfo, optionsInfo[1].children || []], expandedOptions: [optionsInfo[1]] },
      {
        type: OPTIONS_DROPDOWN_ACTION_TYPES.setOverlayVisibility,
        payload: false,
      }
    );
    expect(optionsDropdownState.isOverlayVisible).toEqual(false);
  });
  it('updates state expandedOptions prop to values from selectedOptions that has children when setOverlayVisibility action fires and visibility is false', () => {
    let optionsDropdownState: OptionsDropdownState = optionsDropdownReducer(
      {
        ...state,
        displayedOptions: [optionsInfo],
        expandedOptions: [optionsInfo[1]],
        selectedOptions: [optionsInfo[0]],
      },
      {
        type: OPTIONS_DROPDOWN_ACTION_TYPES.setOverlayVisibility,
        payload: false,
      }
    );
    expect(optionsDropdownState.expandedOptions).toEqual([]);

    optionsDropdownState = optionsDropdownReducer(
      {
        ...state,
        displayedOptions: [optionsInfo, optionsInfo[1].children || []],
        expandedOptions: [],
        selectedOptions: [optionsInfo[1], optionsInfo[1].children![0]],
      },
      {
        type: OPTIONS_DROPDOWN_ACTION_TYPES.setOverlayVisibility,
        payload: false,
      }
    );
    expect(optionsDropdownState.expandedOptions).toEqual([optionsInfo[1]]);
  });
  it('does not update state expandedOptions prop when setOverlayVisibility action fires and visibility is true', () => {
    let optionsDropdownState: OptionsDropdownState = optionsDropdownReducer(
      {
        ...state,
        displayedOptions: [optionsInfo],
        expandedOptions: [optionsInfo[1]],
        selectedOptions: [optionsInfo[0]],
      },
      {
        type: OPTIONS_DROPDOWN_ACTION_TYPES.setOverlayVisibility,
        payload: true,
      }
    );
    expect(optionsDropdownState.expandedOptions).toEqual([optionsInfo[1]]);

    optionsDropdownState = optionsDropdownReducer(
      {
        ...state,
        displayedOptions: [optionsInfo, optionsInfo[1].children || []],
        expandedOptions: [optionsInfo[1]],
        selectedOptions: [optionsInfo[1], optionsInfo[1].children![0]],
      },
      {
        type: OPTIONS_DROPDOWN_ACTION_TYPES.setOverlayVisibility,
        payload: true,
      }
    );
    expect(optionsDropdownState.expandedOptions).toEqual([optionsInfo[1]]);
  });
  it('updates state isOverlayVisible prop to false, selectedOptions and expandedOptions to empty array when clearSelection action fires', () => {
    let optionsDropdownState: OptionsDropdownState = optionsDropdownReducer(
      { ...state, displayedOptions: [optionsInfo, optionsInfo[1].children || []], expandedOptions: [optionsInfo[1]] },
      {
        type: OPTIONS_DROPDOWN_ACTION_TYPES.clearSelection,
      }
    );
    expect(optionsDropdownState.isOverlayVisible).toEqual(false);
    expect(optionsDropdownState.selectedOptions).toEqual([]);
    expect(optionsDropdownState.expandedOptions).toEqual([]);
  });
});
