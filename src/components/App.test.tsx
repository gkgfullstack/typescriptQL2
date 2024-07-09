import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import { initGTag, loadGoogleTag } from 'src/utils/googleTag';
import { initPTag, loadPendoTag } from 'src/utils/pendoTag';

jest.mock('src/utils/googleTag');
jest.mock('src/utils/pendoTag');

const loadGoogleTagMock = loadGoogleTag as jest.Mock;
const loadPendoTagMock = loadPendoTag as jest.Mock;
const skinId = "default"
const initGTagMock = initGTag as jest.Mock;
const initPTagMock = initPTag as jest.Mock;

describe('App component', () => {
  it('renders without crashing', () => {
    shallow(<App skinNamess={skinId}/>);
  });
  it('calls loadGoogleTag with set up settings for gtag', () => {
    shallow(<App skinNamess={skinId} />);
    expect(loadGoogleTagMock).toHaveBeenCalled();
    expect(loadGoogleTagMock).toHaveBeenCalledWith(initGTagMock);
  });
  it('calls loadPendoTag with set up settings for ptag', () => {
    shallow(<App skinNamess={skinId} />);
    expect(loadPendoTagMock).toHaveBeenCalled();
    expect(loadPendoTagMock).toHaveBeenCalledWith(initPTagMock);
  });
  it('renders AppView component', () => {
    const wrapper = shallow(<App skinNamess={skinId} />);
    expect(wrapper.find('AppView')).toHaveLength(1);
  });
});
