import React from 'react';
import { Icon, Spin as AntSpin } from 'antd';

import { SpinProps as AntSpinProps } from 'antd/lib/spin';

const antIcon = <Icon type="loading" spin />;

type SpinProps = AntSpinProps & {
  children?: React.ReactNode;
};

const Spin: React.FC<SpinProps> = (props: SpinProps) => {
  const { size, children } = props;
  const spinSize = size || 'large';
  return (
    <AntSpin {...props} indicator={antIcon} size={spinSize}>
      {children || ''}
    </AntSpin>
  );
};

export default Spin;
