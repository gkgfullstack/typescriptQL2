import React from 'react';
import { mount, shallow } from 'enzyme';
import CreateCompetitiveSetsForm from './CreateCompetitiveSetsForm';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

const wrapper = mount(<CreateCompetitiveSetsForm />);

it('renders without crashing', () => {
  shallow(<CreateCompetitiveSetsForm />);
});

it('renders the correct number of inputs', () => {
  expect(wrapper.find('input')).toHaveLength(1);
});

it('renders the correct number of buttons', () => {
  expect(wrapper.find('button')).toHaveLength(1);
});

