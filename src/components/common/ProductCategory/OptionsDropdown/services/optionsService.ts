import { Option } from '../reducers/optionsDropdownReducer';

export const getSelectedOptions = (
  selectedItem: Option,
  displayedOptions: Option[][],
  expandedOptions: Option[],
  initialSetupFinished: boolean
): Option[] => {
  const newSelected: Option[] = [];
  if (initialSetupFinished) {
    if (displayedOptions && expandedOptions) {
      displayedOptions.every((items: Option[], level: number) => {
        const selectedIndex = items.findIndex(item => {
          return item.value === selectedItem.value;
        });
        if (selectedIndex > -1) {
          newSelected.push(selectedItem);
          return false;
        } else {
          newSelected.push(expandedOptions[level]);
          return true;
        }
      });
    }
  }
  return newSelected;
};

export const getExpandedOptions = (selectedItem: Option, displayedOptions: Option[][], expandedOptions: Option[]) => {
  const newExpanded: Option[] = [];
  if (displayedOptions && expandedOptions) {
    displayedOptions.every((items: Option[], level: number): boolean => {
      const selectedIndex = items.findIndex(item => {
        return item.value === selectedItem.value;
      });
      if (selectedIndex > -1) {
        newExpanded.push(selectedItem);
        return false;
      } else {
        newExpanded.push(expandedOptions[level]);
        return true;
      }
    });
  }

  return newExpanded;
};

export const getDisplayedOptions = (
  options: Option[],
  selectedOptions: Option[],
  expandedOptions: Option[]
): Option[][] => {
  let opts: Option[] = JSON.parse(JSON.stringify(options));
  let level = 0;
  const displayedOpts: Option[][] = [];

  do {
    for (let i = 0, len = opts.length; i < len; i++) {
      const isSelected = selectedOptions[level] && opts[i].value === selectedOptions[level].value;
      const isExpanded = expandedOptions[level] && opts[i].value === expandedOptions[level].value;
      opts[i] = {
        ...opts[i],
        expanded: isExpanded,
        loading: isExpanded && level === expandedOptions.length - 1 && !opts[i].children,
        selected: isSelected,
        checked: isSelected && level === selectedOptions.length - 1,
      };
    }
    displayedOpts.push(opts);
    const expandedItem = opts.find((opt: Option) => {
      return opt.expanded;
    });
    opts = expandedItem !== undefined && expandedItem.children !== undefined ? [...expandedItem.children] : [];
    level += 1;
  } while (opts.length > 0);

  return displayedOpts;
};
