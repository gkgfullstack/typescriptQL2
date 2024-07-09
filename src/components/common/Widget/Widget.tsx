import React from 'react';
import clsx from 'clsx';
import './Widget.less';

type WidgetProps = {
  className?: string;
  title?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

const Widget: React.FC<WidgetProps> = ({ title, className, actions, children }: WidgetProps) => {
  return (
    <div className={clsx('widget', className)}>
      {title || actions ? (
        <div className={'widget_header'}>
          {title && <h2>{title}</h2>}
          {actions ? actions : null}
        </div>
      ) : null}
      {children}
    </div>
  );
};

export default Widget;
