import { Input } from 'antd';
import React from 'react';
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
        Adults
        <span>1-99</span>
      </h6>
    ),
    name: 'adults',
    content: <Input type="text" placeholder="Please enter Adults" />,
    defaultValue: { initialValue: '2' },
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
    label: <h6>Cruise Line</h6>,
    name: 'cruiseLine',
    content: <Input type="text" placeholder="Please enter Cruise Line" />,
    defaultValue: {},
  },
  {
    label: <h6>Cruise Ship</h6>,
    name: 'cruiseShip',
    content: <Input type="text" placeholder="Please enter Cruise Ship" />,
    defaultValue: {},
  },
];
