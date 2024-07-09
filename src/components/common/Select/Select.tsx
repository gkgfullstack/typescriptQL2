import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Select as AntSelect } from 'antd';
import { ModeOption, SelectProps } from 'antd/lib/select';

import './Select.less';

const { Option, OptGroup } = AntSelect;

class Select extends React.Component<SelectProps, {}> {
  public static Option = Option;
  public static OptGroup = OptGroup;
  public static SECRET_COMBOBOX_MODE_DO_NOT_USE: ModeOption;

  render(): JSX.Element {
    const { suffixIcon, ...props } = this.props;
    const selectSuffixIcon: React.ReactNode = suffixIcon || (
      <FontAwesomeIcon icon={['fas', 'caret-down']} className={'ql_select_suffix_icon'} />
    );

    return <AntSelect {...props} suffixIcon={selectSuffixIcon} />;
  }
}

export default Select;
