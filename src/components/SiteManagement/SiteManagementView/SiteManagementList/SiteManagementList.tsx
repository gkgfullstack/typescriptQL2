import React, { useEffect, useState } from 'react';
import styles from './SiteManagementList.module.less';
import { Sorting } from 'src/types/Sorting';
import SiteManagementListTable from './SiteManagementListTable';
import { SiteManagementInfo } from 'src/types/SiteManagementInfo';
import SORT_ORDER from 'src/enums/sortOrder';
import { useGetSiteManagementList } from 'src/api/siteManagement';
import { useCreateNewSite } from 'src/api/createNewConfigureSite';
import SiteManagementEditSite from './SiteManagementEditSite';
import MetadataModal from './MetadataModal';
import FingerprintModal from './FingerprintModal';
import SiteClientsModal from './SiteClientsModal';
import SiteRegions from './SiteRegions';
import SiteManagementParams from 'src/types/SiteManagementParams';

export type SiteManagementListProps = {
  name?: string;
  schema?: string;
  requestParams: SiteManagementParams | null;
  setRequestParams: (requestParams: SiteManagementParams | null) => void;
  onUpdate: () => void;
};

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_NUMBER = 0;

const SiteManagementList: React.FC<SiteManagementListProps> = ({
  name,
  schema,
  requestParams,
  setRequestParams,
  onUpdate,
}: SiteManagementListProps): React.ReactElement => {
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState(PAGE_NUMBER);
  const [currentColumn] = useState('name');
  const [currentOrder] = useState('ascend');
  const [sorting, setSorting] = useState({ field: currentColumn, order: currentOrder } as Sorting<SiteManagementInfo>);
  const [loading, totalRecords, siteList] = useGetSiteManagementList(requestParams);
  const [editRecord, setEditRecord] = useState(null);
  const [editSiteVisible, setEditSiteVisible] = useState(false);
  const [metadataVisible, setMetadataVisible] = useState(false);
  const [fingerprintVisible, setFingerprintVisible] = useState(false);
  const [siteClientsVisible, setSiteClientsVisible] = useState(false);
  const [regionsVisible, setRegionsVisible] = useState(false);
  const [site, setSite] = useState<any>(null);
  const getOffset = (page: number, size: number): number => {
    if (
      requestParams &&
      ((requestParams.siteName && requestParams.siteName !== name) ||
        (!requestParams.siteName && name) ||
        (requestParams.verticalName && requestParams.verticalName !== schema) ||
        (!requestParams.verticalName && schema) ||
        (requestParams.pagesize && requestParams.pagesize !== pageSize))
    ) {
      setPage(PAGE_NUMBER);
      return PAGE_NUMBER;
    }

    return page > 1 ? (page - 1) * size : PAGE_NUMBER;
  };
  useCreateNewSite(editRecord, onUpdate, schema);

  useEffect(() => {
    let newParams: any = { pagesize: pageSize, pagestart: getOffset(page, pageSize) };
    if (sorting) {
      newParams = {
        ...newParams,
        sortingorder: SORT_ORDER[sorting.order],
        sortingcolumn: sorting.field,
      };
    }
    if (name) {
      newParams = { ...newParams, siteName: name };
    }
    if (schema) {
      newParams = { ...newParams, verticalName: schema };
    }
    setRequestParams(newParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, schema, page, pageSize, sorting]);

  const onChangeStatus = (record: any) => {
    return (e: any) => {
      const updatedSite = {
        ...record,
        active: record.active > 0 ? 0 : 1,
      };
      e.stopPropagation();
      setEditRecord(updatedSite);
    };
  };

  const onAction = (site: SiteManagementInfo, type: string) => {
    const editedSite = { ...site };
    setSite(editedSite);
    if (type === 'site') {
      setEditSiteVisible(true);
    }
    if (type === 'metadata') {
      setMetadataVisible(true);
    }
    if (type === 'fingerprint') {
      setFingerprintVisible(true);
    }
    if (type === 'clients') {
      setSiteClientsVisible(true);
    }
    if (type === 'regions') {
      setRegionsVisible(true);
    }
  };

  const onSortingChange = (sorting: Sorting<SiteManagementInfo>): void => {
    setSorting(sorting);
  };

  const onPageSizeChange = (pageSize: number): void => {
    setPageSize(pageSize);
  };

  const onPageChange = (page: number): void => {
    setPage(page);
  };

  const onDisabledTable = () => {
    return !schema;
  };

  return (
    <div className={styles.site_list_table_wrapper}>
      <SiteManagementListTable
        items={siteList}
        sorting={sorting}
        loading={loading}
        pageSize={pageSize}
        page={page}
        total={totalRecords || 0}
        onPageSizeChange={onPageSizeChange}
        onPageChange={onPageChange}
        onSortingChange={onSortingChange}
        onChangeStatus={onChangeStatus}
        onAction={onAction}
        disabledTable={onDisabledTable()}
      />
      <SiteManagementEditSite
        site={site}
        schema={schema}
        onUpdate={onUpdate}
        visible={editSiteVisible}
        setVisible={setEditSiteVisible}
      />
      <MetadataModal site={site} visible={metadataVisible} setVisible={setMetadataVisible} />
      <FingerprintModal site={site} visible={fingerprintVisible} setVisible={setFingerprintVisible} />
      <SiteClientsModal site={site} visible={siteClientsVisible} setVisible={setSiteClientsVisible} />
      <SiteRegions schema={schema} site={site} visible={regionsVisible} setVisible={setRegionsVisible} />
    </div>
  );
};

export default SiteManagementList;
