import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import './setupIcons';
import App from './components/App';
import auth from 'src/services/auth';
import { initPTag, loadPendoTag } from 'src/utils/pendoTag';
loadPendoTag(initPTag);

const skinNameLocal = auth.getSkin();

const skinName = skinNameLocal === null || skinNameLocal === 'null' ? 'ql2' : skinNameLocal;

if (skinName) {
  require(`./styles/${skinName}/index.less`);
}

ReactDOM.render(<App skinNamess={skinName} />, document.getElementById('root'));
