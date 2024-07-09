import { Input } from 'antd';
import React from 'react';
import { CustomTooltip, ReferenceTooltip } from '../../CreateNewLineTooltip/CreateNewLineTooltip';

type optionConfig = {
  label: React.ReactNode;
  name: keyof {} | string;
  content?: React.ReactNode;
};

export const autopartOptions: optionConfig[] = [
  {
    label: (
      <h6>
        Reference
        <ReferenceTooltip />
      </h6>
    ),
    name: 'reference',
    content: <Input type="text" placeholder="Please enter Reference" />,
  },
  {
    label: (
      <h6>
        Custom
        <CustomTooltip />
      </h6>
    ),
    name: 'custom',
    content: <Input type="text" placeholder="Please enter Custom" />,
  },
];

export const autopartYMMEOptions: optionConfig[] = [
  {
    label: <h6>Year</h6>,
    name: 'year',
  },
  {
    label: <h6>Make</h6>,
    name: 'make',
  },
  {
    label: <h6>Model</h6>,
    name: 'model',
  },
  {
    label: <h6>Engine</h6>,
    name: 'engine',
  },
];
