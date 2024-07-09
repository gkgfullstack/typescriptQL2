import {
  CyberPriceReferenceTooltip,
  CyberPriceZipTooltip,
  ManufacturerTooltip,
  ProductNumberTooltip,
  SecondaryProductNumberTooltip,
} from 'src/components/CreateNewSearch/CreateNewLineTooltip/CreateNewLineTooltip';
import React from 'react';

type optionConfig = {
  label: React.ReactNode;
  name: string;
  placeholder: string;
};

export const options: optionConfig[] = [
  {
    label: (
      <h6>
        Keyword / Product Number <ProductNumberTooltip />
      </h6>
    ),
    name: 'productNumber',
    placeholder: 'Please enter Keyword / Product Number',
  },
  {
    label: (
      <h6>
        Secondary Product Number <SecondaryProductNumberTooltip />
      </h6>
    ),
    name: 'secondaryProductNumber',
    placeholder: 'Please enter Secondary Product Number',
  },
  {
    label: (
      <h6>
        Manufacturer <ManufacturerTooltip />
      </h6>
    ),
    name: 'manufacturer',
    placeholder: 'Please enter Manufacturer',
  },
  {
    label: (
      <h6>
        Reference
        <CyberPriceReferenceTooltip />
      </h6>
    ),
    name: 'reference',
    placeholder: 'Please enter Reference',
  },
  {
    label: (
      <h6>
        Zip Code
        <CyberPriceZipTooltip />
      </h6>
    ),
    name: 'zipCode',
    placeholder: 'Please enter Zip Code',
  },
];
