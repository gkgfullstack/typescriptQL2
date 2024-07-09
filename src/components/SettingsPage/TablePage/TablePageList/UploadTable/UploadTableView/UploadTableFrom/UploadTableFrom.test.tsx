import React from 'react';
import { shallow } from 'enzyme';
import UploadTableFrom from "./UploadTableFrom";

it('renders without crashing', () => {
    shallow(<UploadTableFrom loading={false} error={''} onSubmit={jest.fn} visible={false} formatVal={''} uploadId={undefined}  />);
});