import {
  PasswordTooltip,
  SecondPasswordTooltip,
  UsernameTooltip,
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
        Site Username <UsernameTooltip />
      </h6>
    ),
    name: 'siteUsername',
    placeholder: 'Please enter Site Username',
  },
  {
    label: (
      <h6>
        Site Password
        <PasswordTooltip />
      </h6>
    ),
    name: 'sitePassword',
    placeholder: 'Please enter Site Password',
  },
  {
    label: (
      <h6>
        Second Password
        <SecondPasswordTooltip />
      </h6>
    ),
    name: 'secondPassword',
    placeholder: 'Please enter Second Password',
  },
];
