import routes from "src/routes";

function redirectUrlMethod(user: any) {
  let redirectUrl = '';
  if (user && user.appPermissions) {

    if (user.appPermissions['enable_qmatch']) {
      redirectUrl = routes.qmatchDashboard;
    }
    else if (user.appPermissions['enable_qsearch']) {
      redirectUrl = routes.qSearchDashboard;
    }
    else if (user.appPermissions['enable_assortment']) {
      redirectUrl = routes.assortment;
    }
    else if (user.appPermissions['enable_opsconsole']) {
      redirectUrl = routes.optCenter;
    }
    else if (user.appPermissions['interactive_reports']) {
      redirectUrl = routes.Interactive;
    }
    else {
      redirectUrl = "none";
    }

  }
  return redirectUrl;
}
export const menuShow = (history: any, user: any) => {
  let redirectUrl = '';
  if (!user.appPermissions['enable_qmatch'] && history.location.pathname.includes("qmatch")) {
    redirectUrl = redirectUrlMethod(user);
  }
  else if (!user.appPermissions['enable_qsearch'] && history.location.pathname.includes("qsearch")) {
    redirectUrl = redirectUrlMethod(user);
  }
  else if (!user.appPermissions['interactive_reports'] && history.location.pathname.includes("Interactive")) {
    redirectUrl = redirectUrlMethod(user);
  }
  else if (!user.appPermissions['enable_assortment'] && history.location.pathname.includes("optimix")) {
    redirectUrl = redirectUrlMethod(user);
  }
  else if (!user.appPermissions['enable_opsconsole'] && history.location.pathname.includes("optCenter")) {
    redirectUrl = redirectUrlMethod(user);
  }
  
  if (redirectUrl === "none") {
    history.replace("");
  }
  else if (redirectUrl) {
    history.replace(redirectUrl);
  }
};
