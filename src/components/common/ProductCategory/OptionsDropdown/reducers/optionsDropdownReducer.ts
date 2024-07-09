import produce from 'immer';
import { getDisplayedOptions, getExpandedOptions } from '../services/optionsService';

export enum OPTIONS_DROPDOWN_ACTION_TYPES {
  setDefaultValue = 'SET_DEFAULT_VALUE',
  updateOptions = 'UPDATE_OPTIONS',
  updateDisplayedOptions = 'UPDATE_DISPLAYED_OPTIONS',
  setSelectedOptions = 'SET_SELECTED_OPTIONS',
  setExpandedOptions = 'SET_EXPANDED_OPTIONS',
  setOverlayVisibility = 'SET_OVERLAY_VISIBILITY',
  clearSelection = 'CLEAR_SELECTION',
}

export type Option = {
  label: string;
  value: string;
  loading?: boolean;
  children?: Option[];
  hasChildren?: boolean;
  expanded?: boolean;
  selected?: boolean;
  checked?: boolean;
};

export type OptionsDropdownState = {
  initialSetupFinished: boolean;
  value?: string[];
  options: Option[];
  displayedOptions: Option[][];
  expandedOptions: Option[];
  selectedOptions: Option[];
  isOverlayVisible: boolean;
};

export type SetDefaultValueAction = {
  type: OPTIONS_DROPDOWN_ACTION_TYPES.setDefaultValue;
  payload: { value: string[]; options: Option[] };
};

export type UpdateOptionsAction = {
  type: OPTIONS_DROPDOWN_ACTION_TYPES.updateOptions;
  payload: { options: Option[] };
};

export type UpdateDisplayedOptionsAction = {
  type: OPTIONS_DROPDOWN_ACTION_TYPES.updateDisplayedOptions;
};

export type SetSelectedOptionsAction = {
  type: OPTIONS_DROPDOWN_ACTION_TYPES.setSelectedOptions;
  payload: { selectedItems: Option[] };
};

export type SetExpandedOptionsAction = {
  type: OPTIONS_DROPDOWN_ACTION_TYPES.setExpandedOptions;
  payload: { selectedItem: Option };
};

export type CloseAction = {
  type: OPTIONS_DROPDOWN_ACTION_TYPES.setOverlayVisibility;
  payload: boolean;
};

export type ClearAction = {
  type: OPTIONS_DROPDOWN_ACTION_TYPES.clearSelection;
};

export type Action =
  | SetDefaultValueAction
  | UpdateOptionsAction
  | UpdateDisplayedOptionsAction
  | SetSelectedOptionsAction
  | SetExpandedOptionsAction
  | CloseAction
  | ClearAction;

export const optionsDropdownReducer = (state: OptionsDropdownState, action: Action): OptionsDropdownState =>
  produce(state, (draft: OptionsDropdownState) => {
    if ('type' in action) {
      switch (action.type) {
        case OPTIONS_DROPDOWN_ACTION_TYPES.setDefaultValue: {
          const { value, options } = action.payload;
          if (JSON.stringify(value) !== JSON.stringify(state.value)) {
            draft.value = value;
            draft.initialSetupFinished = false;
          }
          if (!draft.initialSetupFinished && options && options.length > 0) {
            let opts = JSON.parse(JSON.stringify(options));
            const newSelected: Option[] = [];
            let loading = false;
            value.every((optionValue: string, index: number) => {
              const option = opts.find((option: Option) => {
                return option.value === optionValue;
              });
              if (option) {
                newSelected.push(option);
                if (option.hasChildren && index + 1 < value.length) {
                  draft.expandedOptions = [...newSelected];
                  if (option.children === undefined) {
                    loading = true;
                  } else {
                    opts = option.children || [];
                    return true;
                  }
                }
              }
              return false;
            });
            if (!loading) {
              draft.initialSetupFinished = true;
              draft.selectedOptions = newSelected;
            }
          }
          return draft;
        }
        case OPTIONS_DROPDOWN_ACTION_TYPES.updateOptions: {
          const { options } = action.payload;
          if (JSON.stringify(options) !== JSON.stringify(state.options)) {
            draft.options = [...options];
          }

          return draft;
        }
        case OPTIONS_DROPDOWN_ACTION_TYPES.updateDisplayedOptions: {
          const newDisplayed = getDisplayedOptions(state.options, state.selectedOptions, state.expandedOptions);
          if (JSON.stringify(newDisplayed) !== JSON.stringify(draft.displayedOptions)) {
            draft.displayedOptions = newDisplayed;
          }

          return draft;
        }
        case OPTIONS_DROPDOWN_ACTION_TYPES.setSelectedOptions: {
          const { selectedItems } = action.payload;

          if (JSON.stringify(draft.selectedOptions) !== JSON.stringify(selectedItems)) {
            draft.expandedOptions = selectedItems.filter((item: Option, index: number) => {
              return item.hasChildren && index + 1 < selectedItems.length;
            });
            draft.selectedOptions = selectedItems;
          }
          draft.isOverlayVisible = false;

          return draft;
        }
        case OPTIONS_DROPDOWN_ACTION_TYPES.setExpandedOptions: {
          const { selectedItem } = action.payload;
          if (state.initialSetupFinished) {
            const newExpanded: Option[] = getExpandedOptions(
              selectedItem,
              state.displayedOptions,
              state.expandedOptions
            );
            if (JSON.stringify(newExpanded) !== JSON.stringify(state.expandedOptions)) {
              draft.expandedOptions = newExpanded;
            }
          }
          return draft;
        }
        case OPTIONS_DROPDOWN_ACTION_TYPES.setOverlayVisibility: {
          const visible = action.payload;
          if (!visible && state.initialSetupFinished) {
            const { selectedOptions } = state;
            draft.expandedOptions = selectedOptions.filter((item: Option, index: number) => {
              return item.hasChildren && index + 1 < selectedOptions.length;
            });
          }
          draft.isOverlayVisible = visible;
          return draft;
        }
        case OPTIONS_DROPDOWN_ACTION_TYPES.clearSelection: {
          draft.selectedOptions = [];
          draft.expandedOptions = [];
          draft.isOverlayVisible = false;
          return draft;
        }
        default: {
          return draft;
        }
      }
    } else {
      return draft;
    }
  });
