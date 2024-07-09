import React, { useState, useRef, useLayoutEffect } from 'react';
import clsx from 'clsx';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './WidgetCollapsable.less';

type WidgetCollapsableProps = {
  className?: string;
  title?: string;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

const iconPlus: IconProp = ['fal', 'plus'];
const iconMinus: IconProp = ['fal', 'minus'];

const WidgetCollapsable: React.FC<WidgetCollapsableProps> = ({
  title,
  className,
  actions,
  children,
  collapsed = false,
  defaultCollapsed = false,
}: WidgetCollapsableProps) => {
  const content = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(defaultCollapsed);
  const [heightContent, setHeightContent] = useState(0);

  useLayoutEffect(() => {
    const elemHeight = content && content.current && content.current.scrollHeight;
    if (elemHeight && elemHeight !== heightContent && isActive) {
      setHeightContent(elemHeight);
    }
  }, [isActive, children, heightContent]);

  const toggleCollapse = (): void => {
    setIsActive(!isActive);
    if (content && content.current) {
      const height = isActive ? 0 : content.current.scrollHeight;
      setHeightContent(height);
    }
  };
  return (
    <div className={clsx('widget', className, { 'widget-collapsed': collapsed && !isActive })}>
      {title || actions ? (
        <div className={'widget_header'}>
          {title && <h2>{title}</h2>}
          {actions ? actions : null}
          {collapsed && (
            <div className={'widget_icon_collapse'}>
              <FontAwesomeIcon size={'lg'} onClick={toggleCollapse} icon={isActive ? iconMinus : iconPlus} />
            </div>
          )}
        </div>
      ) : null}
      <div className={'widget_body'} style={collapsed ? { maxHeight: `${heightContent}px` } : {}} ref={content}>
        {children}
      </div>
    </div>
  );
};

export default WidgetCollapsable;
