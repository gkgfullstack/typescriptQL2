declare global {
  interface Window {
    dataLayer: Array<any>;
  }
}

export const loadGoogleTag = (callback: () => any) => {
  const existingScript = document.getElementById('GMT');

  if (!existingScript) {
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.REACT_APP_GOOGLE_TRACKER_ID}`;
    script.id = 'GMT';
    document.head.appendChild(script);

    script.onload = () => {
      document.head.appendChild(callback());
    };
  }
};

export const gtag = (...rest: any) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(rest);
};

export const initGTag = () => {
  const script = document.createElement('script');
  script.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.REACT_APP_GOOGLE_TRACKER_ID}');
  `;
  return script;
};

export const pageView = (path: string) => {
  /*eslint @typescript-eslint/camelcase: ["error", {properties: "never"}]*/
  const parameters = {
    page_path: path,
  };
  gtag('config', process.env.REACT_APP_GOOGLE_TRACKER_ID, parameters);
};
