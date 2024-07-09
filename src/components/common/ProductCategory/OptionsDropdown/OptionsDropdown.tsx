import React, { SyntheticEvent } from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OptionList from './OptionList/OptionList';
import { Option, OPTIONS_DROPDOWN_ACTION_TYPES } from './reducers/optionsDropdownReducer';

import styles from './OptionsDropdown.module.less';
import { Alert } from 'antd';
import useOptionsDropdownState from './hooks/useOptionsDropdownState';
import { getSelectedOptions } from './services/optionsService';

export type OptionsDropdownProps = {
  value?: string[];
  error: any;
  options: Option[] | null;
  placeholder: string;
  loadData?: (values: Option[]) => void;
  onChange: (values: string[]) => void;
};

const OptionsDropdown: React.FC<OptionsDropdownProps> = ({
  value,
  error,
  placeholder,
  options,
  onChange,
  loadData,
}: OptionsDropdownProps) => {
  const [state, dispatch] = useOptionsDropdownState();
  const { ref, selectedOptions, expandedOptions, displayedOptions, isOverlayVisible, initialSetupFinished } = state;

  React.useEffect(() => {
    if (value && value.length > 0 && options && options.length > 0) {
      dispatch({
        type: OPTIONS_DROPDOWN_ACTION_TYPES.setDefaultValue,
        payload: { value: value, options: options },
      });
    }
  }, [value, options, dispatch]);

  React.useEffect(() => {
    if (value && value.length === 0) {
      dispatch({ type: OPTIONS_DROPDOWN_ACTION_TYPES.clearSelection });
    }
  }, [value, dispatch]);

  React.useEffect(() => {
    if (options && options.length > 0) {
      dispatch({
        type: OPTIONS_DROPDOWN_ACTION_TYPES.updateOptions,
        payload: { options: options },
      });
    }
  }, [options, dispatch]);

  React.useEffect(() => {
    if (expandedOptions && expandedOptions.length > 0) {
      const expandedOption = expandedOptions[expandedOptions.length - 1];
      if (!expandedOption.children && loadData) {
        loadData(expandedOptions);
      }
    }
  }, [expandedOptions, loadData]);

  const handleChange = (selectedItem: Option) => {
    const newSelected = getSelectedOptions(
      selectedItem,
      state.displayedOptions,
      state.expandedOptions,
      state.initialSetupFinished
    );
    if (JSON.stringify(selectedOptions) !== JSON.stringify(newSelected) && initialSetupFinished) {
      dispatch({
        type: OPTIONS_DROPDOWN_ACTION_TYPES.setSelectedOptions,
        payload: {
          selectedItems: newSelected,
        },
      });
      const newValues = newSelected.map((item: Option) => {
        return item.value;
      });
      onChange(newValues);
    }
  };

  const handleExpand = (selectedItem: Option) => {
    if (selectedItem.expanded || !selectedItem.hasChildren) {
      return false;
    }

    dispatch({
      type: OPTIONS_DROPDOWN_ACTION_TYPES.setExpandedOptions,
      payload: { selectedItem: selectedItem },
    });
  };

  const handleClear = (event: SyntheticEvent) => {
    event.stopPropagation();
    dispatch({ type: OPTIONS_DROPDOWN_ACTION_TYPES.clearSelection });
    onChange([]);
  };
  const showClearIcon = selectedOptions.length > 0;

  const label = selectedOptions.length > 0 ? selectedOptions[selectedOptions.length - 1].label : placeholder;
  let categorySelected: any = '';
  for (var i = 0, length = selectedOptions.length; i < length; i++) {
    let arrowCategory = " > "
    categorySelected = categorySelected.concat(arrowCategory, selectedOptions[i].label);
  }
  localStorage.removeItem('category');
  const categoryValues1 = categorySelected;
  localStorage.setItem('category', `${categoryValues1}`);
  return (
    <div id="dropdown_picker" className={clsx(styles.dropdown_picker, { [styles.open]: isOverlayVisible, [styles.error]: error })} ref={ref}>
      <span
        className={styles.dropdown_container}
        onClick={() => {
          dispatch({ type: OPTIONS_DROPDOWN_ACTION_TYPES.setOverlayVisibility, payload: !isOverlayVisible });
        }}
        tabIndex={-1}
      >
        <span className={styles.dropdown_label_container}>
          <span className={styles.dropdown_label}>{label}</span>
        </span>
        <span className={styles.dropdown_icon}>
          {showClearIcon && (
            <FontAwesomeIcon
              icon={['fas', 'times-circle']}
              className={styles.dropdown_clear_icon}
              size={'sm'}
              onClick={handleClear}
            />
          )}
          <FontAwesomeIcon icon={['fas', 'caret-down']} className={styles.dropdown_arrow_icon} size={'sm'} />
        </span>
      </span>
      <div className={styles.dropdown_overlay_container} id="dropdown_picker2">
        <div className={styles.dropdown_overlay}>
          {error && <Alert message={error.message || error} type="error" showIcon className={styles.error_message} />}
          <div className={styles.dropdown_scrollable_container}>
            <div className={styles.dropdown_options}>
              {displayedOptions.length > 0 &&
                displayedOptions.map(
                  (items: Option[], index: number): React.ReactNode => {
                    return (
                      <OptionList
                        options={items}
                        onChange={handleChange}
                        onExpand={handleExpand}
                        key={`options_${index}`}
                      />
                    );
                  }
                )}
              {displayedOptions.length === 0 && !error && <p className={styles.no_items}>No items</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionsDropdown;


