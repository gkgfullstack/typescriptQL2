import React, { useState } from 'react';
import styles from "./ConfigurationClientSites.module.less";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConfigurationSourceSitesTable from "./ConfigurationSourceSitesTable";
import ConfigurationCompetitorSitesTable from "./ConfigurationCompetitorSitesTable";
import ConfigurationAddClientSite from "./ConfigurationAddClientSite";
import ConfigurationNewClientSite from "./ConfigurationNewClientSite";
import ConfigurationSiteRegions from "./ConfigurationSiteRegions";
import { useUpdateSiteStatus } from "src/api/configureSiteList";
import { ConfigureClientSitesTableInfo } from "src/types/ConfigureClientSitesTableInfo";

type ConfigurationClientSitesProps = {
    clientId: string | undefined;
};

type ConfigurationSiteRegion = {
    site: ConfigureClientSitesTableInfo,
    visible: boolean;
} | null;

const ConfigurationClientSites: React.FC<ConfigurationClientSitesProps> = ({ clientId }) => {
    const [addClientVisible, setClientVisible] =  useState(false);
    const [newClientVisible, setNewClientVisible] =  useState(false);
    const [region, setRegion] =  useState<ConfigurationSiteRegion>(null);
    const [site, setSite] =  useState<any>(null);
    const [sourceParams, setSourceParams] = useState<any>(null);
    const [competitorParams, setCompetitorParams] = useState<any>(null);
    const [savedSite, setSavedSite] =  useState<any>({});
    const [primaryStatus, setPrimaryStatus] =  useState<boolean>(false);

    const openCreateNewSite = (type: string) => {
        return () => {
            setClientVisible(true);
            setSite({ type });
        }
    };

    const onUpdateSiteList = () => {
        if ((site && site.type === "Source") || (savedSite && savedSite.type === "Source")) {
            const newSourceParams = {...sourceParams};
            setSourceParams(newSourceParams);
        } else {
            const newCompetitorParams = {...competitorParams};
            setCompetitorParams(newCompetitorParams);
        }
        setSite(null);
        setSavedSite({});
    };

    useUpdateSiteStatus(savedSite.ID, clientId, savedSite.ownerClientLookup, onUpdateSiteList);

    const onEditSite = (site: any) => {
        setNewClientVisible(true);
        setSite(site);
    };

    const onChangeStatus = (record: any) => {
        const newRecord: any = {};
        if (record.ownerClientLookup.sourceSite === 0) {
            newRecord.outlierDetectionInclusionFlag = !record.ownerClientLookup.outlierDetectionInclusionFlag;
            newRecord.sourceSite = 0;
        } else {
            newRecord.outlierDetectionInclusionFlag = record.ownerClientLookup.outlierDetectionInclusionFlag;
            newRecord.sourceSite = record.ownerClientLookup.sourceSite === 2 ? 1 : 2;
        }
        newRecord.ID = record.ownerClientLookup.ID;
        setSavedSite({ ID: newRecord.ID, ownerClientLookup: newRecord, type: record.ownerClientLookup.sourceSite ? "Source" : "" });
    };

    const onChangeCompetitorStatus = (record: any) => {
        return (e: any) => {
            e.stopPropagation();
            onChangeStatus(record);
        }
    };

    const onUpdatePrimaryStatus = (status: boolean) => {
        setPrimaryStatus(status);
    };

    const onRegionView = (record: ConfigureClientSitesTableInfo) => {
        return () => {
            setRegion({
                visible: true,
                site: record
            });
        };
    };


    return (
        <div className={styles.configuration_client_panel_sites}>
            <div className={styles.configuration_title}>
                <h2>Source Sites</h2>
                <Button type={'default'} onClick={openCreateNewSite('Source')} className={styles.configuration_title_button}>
                    <FontAwesomeIcon icon={['fal', 'plus-circle']} size="lg" style={{ marginRight: '7px' }} />Add Source Site
                </Button>
            </div>
            <ConfigurationSourceSitesTable
                clientId={clientId}
                onEditSite={onEditSite}
                requestParams={sourceParams}
                setRequestParams={setSourceParams}
                onChangeStatus={onChangeStatus}
                onUpdatePrimaryStatus={onUpdatePrimaryStatus}
                onRegionView={onRegionView}
            />
            <div className={styles.configuration_title} style={{ marginTop: '30px' }}>
                <h2>Competitor Sites</h2>
                <Button type={'default'} onClick={openCreateNewSite('Competitor')} className={styles.configuration_title_button}>
                    <FontAwesomeIcon icon={['fal', 'plus-circle']} size="lg" style={{ marginRight: '7px' }} />Add Competitor Site
                </Button>
            </div>
            <ConfigurationCompetitorSitesTable
                clientId={clientId}
                onEditSite={onEditSite}
                requestParams={competitorParams}
                setRequestParams={setCompetitorParams}
                onChangeStatus={onChangeCompetitorStatus}
                onRegionView={onRegionView}
            />
            <ConfigurationAddClientSite
                site={site}
                primaryStatus={primaryStatus}
                onUpdate={onUpdateSiteList}
                clientId={clientId}
                visible={addClientVisible}
                setClientVisible={setClientVisible}
                setNewClientVisible={setNewClientVisible}
            />
            <ConfigurationNewClientSite
                clientId={clientId}
                site={site}
                primaryStatus={primaryStatus}
                onUpdate={onUpdateSiteList}
                visible={newClientVisible}
                setVisible={setNewClientVisible}
            />
            <ConfigurationSiteRegions region={region} setRegion={setRegion} />
        </div>
    );
};

export default ConfigurationClientSites;
