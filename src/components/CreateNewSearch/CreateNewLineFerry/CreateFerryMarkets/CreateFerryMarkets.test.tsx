import React from 'react';
import { shallow, mount } from 'enzyme';
import CreateFerryMarkets from './CreateFerryMarkets';
import { Button, Input } from 'antd';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('CreateFerryMarkets component ', () => {
    let wrapper: any;
    beforeEach(() => {
        wrapper = shallow( <CreateFerryMarkets  markets={[]} setMarkets={jest.fn()} />);
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('renders 1 <Input /> component', () => {
        expect(wrapper.find(Input)).toHaveLength(1);
    });

    it('Input label is Enter Market', () => {
        expect(
            wrapper
                .find(Input)
                .at(0)
                .prop('placeholder')
        ).toBe('Enter Market');
    });


    it('renders 1 <Button /> components', () => {
        const deepWrapper = mount(<CreateFerryMarkets  markets={[]} setMarkets={jest.fn()} />);
        expect(wrapper.find(Button)).toHaveLength(1);
        expect(deepWrapper.find(Button).text()).toEqual('Add');
    });
});
