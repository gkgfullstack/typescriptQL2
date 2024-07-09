import { Input } from 'antd';
import React from 'react';
import { ReferenceTooltip, ZipTooltip } from 'src/components/CreateNewSearch/CreateNewLineTooltip/CreateNewLineTooltip';

type optionConfig = {
  label: React.ReactNode;
  name: string;
  content: React.ReactNode;
};

export const searchByKeywordOptions: optionConfig[] = [
  {
    label: <h6>Site Part Number</h6>,
    name: 'sitePartNumber',
    content: <Input type="text" placeholder="Please enter Site Part Number" />,
  },
  {
    label: <h6>Manufacturer Part Number</h6>,
    name: 'manufacturerPartNumber',
    content: <Input type="text" placeholder="Please enter Manufacturer Part Number" />,
  },
  {
    label: <h6>Manufacturer</h6>,
    name: 'manufacturer',
    content: <Input type="text" placeholder="Please enter Manufacturer" />,
  },
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
        Reference <ReferenceTooltip />
      </h6>
    ),
    name: 'reference',
    content: <Input type="text" placeholder="Please enter Reference" />,
  },
];
