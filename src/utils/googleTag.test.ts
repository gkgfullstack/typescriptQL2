import { loadGoogleTag, pageView, gtag } from './googleTag';

describe('googleTag ', () => {
  it('load google tag script if it does not load and loadGoogleTag method is called', () => {
    loadGoogleTag(() => {});
    const script: HTMLScriptElement = document.getElementById('GMT') as HTMLScriptElement;
    expect(script).not.toEqual(null);
    expect(script.src).toEqual(
      `https://www.googletagmanager.com/gtag/js?id=${process.env.REACT_APP_GOOGLE_TRACKER_ID}`
    );
    expect(script.onload).toBeDefined();
  });
  it('sets dataLayer property into "js" and data timestamp when gtag calls', () => {
    window.dataLayer = [];
    gtag('js', new Date());
    expect(window.dataLayer[0][0]).toEqual('js');
    window.dataLayer = [];
  });
  it('sets dataLayer property into entered parameters of gtag method when gtag calls', () => {
    window.dataLayer = [];
    gtag('config', 'U-00003');
    expect(window.dataLayer).toEqual([['config', 'U-00003']]);
    gtag('config', 'U-00003', { page_path: '/gmatch' });
    expect(window.dataLayer).toEqual([
      ['config', 'U-00003'],
      ['config', 'U-00003', { page_path: '/gmatch' }],
    ]);
    window.dataLayer = [];
  });
  it('calls gtag method with "config", google tracker id that gets from env variable and path when pageView calls', () => {
    window.dataLayer = [];
    pageView('/datascout');
    expect(window.dataLayer).toEqual([['config', process.env.REACT_APP_GOOGLE_TRACKER_ID, { page_path: '/datascout' }]]);
    window.dataLayer = [];
  });
});
