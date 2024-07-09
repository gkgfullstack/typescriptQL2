import React from 'react';
import { Input } from 'antd';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';

type optionConfig = {
  label: React.ReactNode;
  name: string;
  content: React.ReactNode;
  defaultValue: { [field: string]: GetFieldDecoratorOptions };
};

export const options: optionConfig[] = [
  {
    label: (
      <h6>
        Specific Ferry Company
        <span>Ferry name space delimited</span>
      </h6>
    ),
    name: 'company',
    content: <Input type="text" placeholder="Please enter Specific Ferry Company" />,
    defaultValue: {},
  },
  {
    label: (
      <h6>
        Adults
        <span>1-99</span>
      </h6>
    ),
    name: 'adults',
    content: <Input type="text" placeholder="Please enter Adults" />,
    defaultValue: { initialValue: '1' },
  },
  {
    label: (
      <h6>
        Children
        <span>0-99</span>
      </h6>
    ),
    name: 'children',
    content: <Input type="text" placeholder="Please enter Children" />,
    defaultValue: { initialValue: '0' },
  },
  {
    label: <h6>Vehicle</h6>,
    name: 'vehicle',
    content: <Input type="text" placeholder="Please enter Vehicle" />,
    defaultValue: {},
  },
  {
    label: <h6>Tow</h6>,
    name: 'tow',
    content: <Input type="text" placeholder="Please enter Tow" />,
    defaultValue: {},
  },
  {
    label: <h6>Cabin</h6>,
    name: 'cabin',
    content: <Input type="text" placeholder="Please enter Cabins" />,
    defaultValue: {},
  },
];
