import routes from 'src/routes';
import ProductFinder from 'src/components/ProductFinder';
import QSDashboard from 'src/components/QSDashboard';
import Insights from 'src/components/Insights';
import Assortment from 'src/components/Assortment';
import QMDashboard from 'src/components/QMDashboard';
import ProductDetails from 'src/components/ProductDetails';
import ComponentShowcase from 'src/components/ComponentShowcase';
import Dashboard from '../components/Dashboard/Dashboard';
import AuditHistory from 'src/components/AuditHistory';
import JobSearch from 'src/components/JobSearch';
import AcceptableUsePolicy from 'src/components/AcceptableUsePolicy';
import Results from 'src/components/Results';
import SearchDetails from 'src/components/JobSearchDetails/JobSearchDetails';
import Details from 'src/components/Details';
import Interactive from 'src/components/Interactive';
import DefinedReports from 'src/components/Interactive/DefinedReports';
import OpsCenter from 'src/components/OpsCenter/OpsCenter';
import Configure from 'src/components/MatchAttribute';
import ConfigureClient from 'src/components/ConfigureClient';
import SiteManagement from 'src/components/SiteManagement';
import MatchAttribute from 'src/components/MatchAttribute';
import MatchCategory from 'src/components/MatchCategory';
import SpiderCleanUp from 'src/components/SpiderCleanUp';
import ShallowCleanUp from 'src/components/ShallowCleanUp';
import ProductCleanUp from 'src/components/ProductCleanUp';
import DataCleanUp from 'src/components/DataCleanUp';
import DataEditor from 'src/components/DataEditor';
import ConfigureStatus from 'src/components/ConfigureStatus';
import RetailDiagnostic from 'src/components/RetailDiagnostic';
import SupportPage from 'src/components/SupportPage';
import UsagePage from 'src/components/UsagePage';
import Settings from 'src/components/SettingsPage/Settings';
import AccountSettings from 'src/components/SettingsPage/Settings';

import SiteNotifications from 'src/components/SettingsPage/SiteNotifications';
import Users from 'src/components/SettingsPage/Users';
import ChangePassword from 'src/components/SettingsPage/ChangePassword';
import CompetitiveSets from 'src/components/SettingsPage/CompetitiveSets';
import TablePage from 'src/components/SettingsPage/TablePage';

export default [
  {
    path: routes.dashboard,
    component: Dashboard,
    exact: true,
    protected: true,
    title: 'QL2 Data Scout - Dashboard',
  },
  {
    path: routes.qSearchDashboard,
    component: QSDashboard,
    exact: true,
    protected: true,
    title: 'QL2 Data Scout',
  },
  {
    path: routes.jobSearch,
    component: JobSearch,
    exact: true,
    protected: true,
    title: 'QL2 Data Scout',
  },
  {
    path: routes.results,
    component: Results,
    protected: true,
    title: 'QL2 Data Scout - Results',
  },

  {
    path: routes.resultsDetails,
    component: Details,
    protected: true,
    title: 'QL2 Data Scout - Details',
  },

  {
    path: routes.qmatchDashboard,
    component: QMDashboard,
    exact: true,
    protected: true,
    title: 'QL2 Opti Price - Dashboard',
  },
  {
    path: routes.insights,
    exact: true,
    component: Insights,
    protected: true,
    title: 'QL2 My Insights - Price Insights',
  },
  {
    path: routes.productFinder,
    component: ProductFinder,
    protected: true,
    title: 'QL2 Opti Price - Product Finder',
  },
  {
    path: routes.productDetails,
    component: ProductDetails,
    protected: true,
    title: 'QL2 Opti Price - Product Details',
  },
  {
    path: routes.auditHistory,
    component: AuditHistory,
    protected: true,
    title: 'QL2 Opti Price - Audit History',
  },
  {
    path: routes.acceptableUsePolicy,
    component: AcceptableUsePolicy,
    protected: true,
    title: 'Acceptable Use Policy',
  },
  {
    path: routes.showcase,
    component: ComponentShowcase,
    title: 'Component Showcase',
  },
  {
    path: routes.searchDetails,
    component: SearchDetails,
    protected: true,
    title: 'QL2 Data Scout Details',
  },
  {
    path: routes.Interactive,
    component: Interactive,
    exact: true,
    protected: true,
    title: 'QL2 My Insights - Interactive Reports',
  },
  {
    path: routes.DefinedReport,
    component: DefinedReports,
    exact: true,
    protected: true,
    title: 'Defined Reports',
  },
  {
    path: routes.assortment,
    component: Assortment,
    exact: true,
    protected: true,
    title: 'QL2 Opti Mix',
  },
  {
    path: routes.optCenter,
    component: OpsCenter,
    exact: true,
    protected: true,
    title: 'QL2 Nucleus',
  },
  {
    path: routes.optCenterId,
    component: OpsCenter,
    exact: true,
    protected: true,
    title: `QL2 Nucleus`,
  },
  {
    path: routes.retailDiagnostic,
    component: RetailDiagnostic,
    exact: true,
    protected: true,
    title: 'QL2 Home - Retail Diagnostics',
  },
  {
    path: routes.configure,
    component: Configure,
    exact: true,
    protected: true,
    title: 'QL2 Configuration',
  },
  {
    path: routes.configureClient,
    component: ConfigureClient,
    exact: true,
    protected: true,
    title: 'QL2 Configuration - Client Management',
  },
  {
    path: routes.configureSite,
    component: SiteManagement,
    exact: true,
    protected: true,
    title: 'QL2 Configuration - Site Management',
  },
  {
    path: routes.matchAttribute,
    component: MatchAttribute,
    exact: true,
    protected: true,
    title: 'QL2 Configuration - Match Attribute Management',
  },
  {
    path: routes.matchCategory,
    component: MatchCategory,
    exact: true,
    protected: true,
    title: 'QL2 Configuration - Match Category',
  },
  {
    path: routes.spiderCleanUp,
    component: SpiderCleanUp,
    exact: true,
    protected: true,
    title: 'QL2 Data Cleansing - Spider Cleanup',
  },
  {
    path: routes.shallowCleanUp,
    component: ShallowCleanUp,
    exact: true,
    protected: true,
    title: 'QL2 Data Cleansing - Shallow Cleanup',
  },
  {
    path: routes.productCleanUp,
    component: ProductCleanUp,
    exact: true,
    protected: true,
    title: 'QL2 Data Cleansing - Product Cleanup',
  },
  {
    path: routes.dataCleanUp,
    component: DataCleanUp,
    exact: true,
    protected: true,
    title: 'QL2 Data Cleansing - Data Cleanup',
  },
  {
    path: routes.dataEditor,
    component: DataEditor,
    exact: true,
    protected: true,
    title: 'QL2 Nucleus - Data Editor',
  },
  {
    path: routes.configureStatus,
    component: ConfigureStatus,
    exact: true,
    protected: true,
    title: 'QL2 Nucleus - Status',
  },
  {
    path: routes.supportPage,
    component: SupportPage,
    exact: true,
    protected: true,
    title: 'Help - Support',
  },
  {
    path: routes.usage,
    component: UsagePage,
    exact: true,
    protected: true,
    title: 'Usage',
  },
  {
    path: routes.settings,
    component: Settings,
    exact: true,
    protected: true,
    title: 'Settings - Setting',
  },
  {
    path: routes.accountSettings,
    component: AccountSettings,
    exact: true,
    protected: true,
    title: 'Settings - Account Settings',
  },
  {
    path: routes.siteNotifications,
    component: SiteNotifications,
    exact: true,
    protected: true,
    title: 'Settings - siteNotifications',
  },
  {
    path: routes.changePassword,
    component: ChangePassword,
    exact: true,
    protected: true,
    title: 'Settings - change Password',
  },
  {
    path: routes.tablePage,
    component: TablePage,
    exact: true,
    protected: true,
    title: 'Settings - Table',
  },  
  {
    path: routes.users,
    component: Users,
    exact: true,
    protected: true,
    title: 'Settings - Accounts',
  },
  {
    path: routes.compSets,
    component: CompetitiveSets,
    exact: true,
    protected: true,
    title: 'Settings - Competitive Sets',
  },
];
