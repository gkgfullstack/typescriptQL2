import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppStateProvider } from 'src/stateProviders/appStateProvider';
import { initGTag, loadGoogleTag } from 'src/utils/googleTag';
import { initPTag, loadPendoTag } from 'src/utils/pendoTag';
import AppView from './AppView';
type AppProps = {
  skinNamess:any
};
const App: React.FC<AppProps> = () => {
  loadGoogleTag(initGTag);
  loadPendoTag(initPTag);
  return (
    <Router>
      <AppStateProvider>
        <AppView />
      </AppStateProvider>
    </Router>
  );
};

export default App;
