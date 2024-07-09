import React, { useEffect, useState } from 'react';
import { Button, Radio } from 'antd';

type UsageToggleProps = {
  onUpdate: (value: string) => void;
  isInputVisible: boolean;
  isOutputVisible: boolean;
  isSKUVisible: boolean;
};

const UsageToggle: React.FC<UsageToggleProps> = ({ onUpdate, isInputVisible, isOutputVisible, isSKUVisible }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const isToggleVisible = () => {
    let buttonCount = 0;
    if (isInputVisible) {
      buttonCount++;
    }
    if (isOutputVisible) {
      buttonCount++;
    }
    if (isSKUVisible) {
      buttonCount++;
    }

    return buttonCount > 1;
  };

  const onToggle = (value: any) => {
    onUpdate(value.target.value);
    setSelectedValue(value.target.value);
  };

  useEffect(() => {
    const usageType = isInputVisible ? 'input' : isOutputVisible ? 'output' : isSKUVisible ? 'sku' : '';
    onUpdate(usageType);
    setSelectedValue(usageType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInputVisible, isOutputVisible, isSKUVisible]);

  return (
    <>
      {isToggleVisible() ? (
        <Radio.Group onChange={onToggle} value={selectedValue}>
          {isInputVisible && <Radio.Button value="input">Input</Radio.Button>}
          {isOutputVisible && <Radio.Button value="output">Output</Radio.Button>}
          {isSKUVisible && <Radio.Button value="sku">SKU</Radio.Button>}
        </Radio.Group>
      ) : (
        <>
          {isInputVisible && <Button type="primary">Input</Button>}
          {isOutputVisible && <Button type="primary">Output</Button>}
          {isSKUVisible && <Button type="primary">SKU</Button>}
        </>
      )}
    </>
  );
};

export default UsageToggle;
