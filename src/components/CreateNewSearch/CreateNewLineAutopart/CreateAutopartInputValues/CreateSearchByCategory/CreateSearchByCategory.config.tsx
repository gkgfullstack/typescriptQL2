import { Input } from 'antd';
import React from 'react';
import { CreateSearchByCategoryTooltip } from './CreateSearchByCategoryTooltip';
import { ZipTooltip } from 'src/components/CreateNewSearch/CreateNewLineTooltip/CreateNewLineTooltip';

type optionConfig = {
  label: React.ReactNode;
  name: keyof {} | string;
  content?: React.ReactNode;
};

const categoryOptions: optionConfig[] = [
  {
    label: (
      <h6>
        Zip Code
        <ZipTooltip />
      </h6>
    ),
    name: 'zipCode',
    content: <Input type="text" placeholder="Please enter Zip Code" />,
  },
  {
    label: (
      <h6>
        Reference
        <CreateSearchByCategoryTooltip />
      </h6>
    ),
    name: 'reference',
    content: <Input type="text" placeholder="Please enter Reference" />,
  },
];
export default categoryOptions;
