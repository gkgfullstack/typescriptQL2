import React, { ReactNode } from 'react';
import { Collapse } from 'antd';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import styles from './Accordion.module.less';

type AccordionProps = {
  header?: string;
  children: ReactNode;
};

const iconPlus: IconProp = ['fal', 'plus'];
const iconMinus: IconProp = ['fal', 'minus'];

const Accordion: React.FC<AccordionProps> = ({ header, children }: AccordionProps) => {
  return (
    <Collapse
      bordered={false}
      expandIconPosition={'right'}
      expandIcon={({ isActive }): React.ReactNode => (
        <FontAwesomeIcon size={'lg'} icon={isActive ? iconMinus : iconPlus} />
      )}
    >
      <Collapse.Panel header={header} key="1" className="accordion_element">
        {children}
      </Collapse.Panel>
    </Collapse>
  );
};
export default Accordion;
