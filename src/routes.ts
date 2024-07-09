const qSearchDashboard = '/datascout';
const qmatchDashboard = '/optiprice';
const optCenter = '/nucleus';
const assortment = '/optimix';
const dataManagement = '/nucleus/dataCleansing';
const help = '/help';
const settings = '/settings';
const myInsights = '/myinsights';

export default { 
  dashboard: '/',
  // Q Search
  qSearchDashboard,
  results: `${qSearchDashboard}/results`,
  jobSearch: `${qSearchDashboard}/jobSearch`,
  active: `${qSearchDashboard}/jobSearch?isPageType=Active`,
  scheduled: `${qSearchDashboard}/jobSearch?isPageType=Schedule`,
  starred: `${qSearchDashboard}/jobSearch?isPageType=Starred`,
  archive: `${qSearchDashboard}/jobSearch?isPageType=Archive`,
  searchDetails:`${qSearchDashboard}/search-details/:id`,
  resultsDetails:`${qSearchDashboard}/results-details/:id`,
  

  // Opti Price
  qmatchDashboard,
  insights: `${myInsights}/insights`,
  productFinder: `${qmatchDashboard}/product-finder`,
  productDetails: `${qmatchDashboard}/product-details/:id`,
  auditHistory: `${qmatchDashboard}/auditHistory`,

  Interactive: `${myInsights}/Interactive`,
  DefinedReport:`/definedReport`,

  assortment,
  // Retail Diagnostics
  retailDiagnostic: `${optCenter}/home/retailDiagnostic`,



  // Data Management
  dataManagement,
  dataCleanUp: `${dataManagement}/dataCleanUp`,
  spiderCleanUp: `${dataManagement}/spiderCleanUp`,
  shallowCleanUp: `${dataManagement}/shallowCleanUp`,
  productCleanUp: `${dataManagement}/productCleanUp`,

  // Data Editor
  dataEditor: `${optCenter}/dataEditor/dataEditor`,

  // Status
  configureStatus: `${optCenter}/status/status`,
  // Ops Center
  optCenter: '/nucleus',
  optCenterId: '/nucleus/:id',
  configure: `${optCenter}/configuration`,
  configureClient: `${optCenter}/configuration/clientManagement`,
  configureSite: `${optCenter}/configuration/siteManagement`,
  matchAttribute: `${optCenter}/configuration/matchAttribute`,
  matchCategory: `${optCenter}/configuration/matchCategory`,
  // general
  help, 
  supportPage: `${help}/technicalSupport`,
  usage: '/usage',
  information: `${settings}/information`,
  settings: `${settings}/account-settings`,
  accountSettings: `${settings}/account-settings`,
  changePassword: `${settings}/change-password`,
  tablePage: `${settings}/tablePage`,
  users: `${settings}/accounts`,
  siteNotifications: `${settings}/site-notifications`,
  compSets: `${settings}/competitive-sets`,
  showcase: '/ui/showcase',
  acceptableUsePolicy: '/acceptableUsePolicy',
};
