export const getOwners = (sites: string) => {
  const verticalNames: any = {};

  sites.split(',').forEach((site: any) => {
    const verticalName = site.split('-')[0];
    const id = Number(site.split('-')[1]);
    if (verticalNames[verticalName]) {
      verticalNames[verticalName].push(id);
    } else {
      verticalNames[verticalName] = [id];
    }
  });

  return Object.keys(verticalNames).map((name: string) => {
    return {
      verticalName: name,
      ids: verticalNames[name],
    };
  });
};

export const isSitesChanged = (owners: any, sites: string) => {
  const comparedSites: any = [];

  if (!owners && !sites) {
    return false;
  }

  if ((!owners && sites) || (!sites && owners)) {
    return true;
  }

  owners.forEach((owner: any) => {
    owner.ids.forEach((id: number) => {
      comparedSites.push(`${owner.verticalName}-${id}`);
    });
  });

  if (comparedSites.length !== sites.split(',').length) {
    return true;
  }

  return sites.split(',').reduce((siteChanged: boolean, site: any) => {
    if (comparedSites.indexOf(site) === -1) {
      siteChanged = true;
    }
    return siteChanged;
  }, false);
};
