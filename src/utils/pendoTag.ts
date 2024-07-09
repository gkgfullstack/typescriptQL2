
//import auth from 'src/services/auth';
declare global {
  interface Window {
    dataLayer: Array<any>;
    
  }
}

export const loadPendoTag = ( callback: () => any) => {
  const existingScript = document.getElementById('pendo');
  let userId = localStorage.getItem('pendoUserId') === null ? '-1' : localStorage.getItem('pendoUserId')  ;
  if(userId!=undefined){
    userId = userId.replace("'","\\");
 }
  const accountId = localStorage.getItem('accountId') === null ? '-1' : localStorage.getItem('accountId')  ;
  const orgId = localStorage.getItem('orgId') === null ? '-1' : localStorage.getItem('orgId')  ;
  let orgName = localStorage.getItem('orgName') === null ? '' : localStorage.getItem('orgName')  ;
  if(orgName!=undefined){
    orgName = orgName.replace("'","").trim();
 }
  const environment = localStorage.getItem('environment') === null ? '' : localStorage.getItem('environment')  ;
  let crmName = localStorage.getItem('crmName') === null ? '' : localStorage.getItem('crmName')  ;
  if(crmName!=undefined){
    crmName = crmName.replace("'","\\");
 }

  const visitorId=userId+" | "+orgName;
  if (!existingScript) {
    const script = document.createElement('script');
    script.innerHTML = `(function(apiKey){
      (function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=[];
      v=['initialize','identify','updateOptions','pageLoad','track'];for(w=0,x=v.length;w<x;++w)(function(m){
          o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)));};})(v[w]);
          y=e.createElement(n);y.async=!0;y.src='https://cdn.pendo.io/agent/static/'+apiKey+'/pendo.js';
          z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z);})(window,document,'script','pendo');

          // Call this whenever information about your visitors becomes available
          // Please use Strings, Numbers, or Bools for value types.
          pendo.initialize({
            visitor: {
              id: '${visitorId}',
              ql2_account_id:'${accountId}',
              ql2_account_name: '${userId}',
              ql2_org_id:'${orgId}',
              ql2_org_name:'${orgName}',
              environment: '${environment}',
            },
            account: {
              id: '${crmName}',
              name: '${crmName}',
              environment:'${environment}',
            }
        });
  })('8f5d7bcd-72af-48c9-6ccc-8b347595a9d7');`; 
    script.id = 'pendo';
    document.head.appendChild(script);
    script.onload = () => {
      document.head.appendChild(callback());
    };
  }
};

export const ptag = (...rest: any) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(rest);
};

export const initPTag = () => {
  const script = document.createElement('script');
  script.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    ptag('js', new Date());
    ptag('config', '${process.env.REACT_APP_PENDO_TRACKER_ID}');
    
  `;
  return script;
};

export const pagePendoView = (path: string) => { 
  /*eslint @typescript-eslint/camelcase: ["error", {properties: "never"}]*/
  const parameters = {
    page_path: path,
  };
  ptag('config', process.env.REACT_APP_PENDO_TRACKER_ID, parameters);
};
