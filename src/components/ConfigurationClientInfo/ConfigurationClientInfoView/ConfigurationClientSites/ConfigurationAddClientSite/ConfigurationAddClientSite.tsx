import React, { useState } from 'react';
import { Button, Drawer } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ConfigurationAddClientSite.module.less";
import ConfigurationAddClientForm from './ConfigurationAddClientForm';
import { useAddSiteToClient } from "src/api/configureSiteList";

type ConfigurationAddClientSiteProps = {
    clientId: string | undefined;
    site: any;
    primaryStatus? : boolean;
    onUpdate: any;
    visible: boolean;
    setClientVisible: (visible: boolean) => void;
    setNewClientVisible: (visible: boolean) => void;
};

const ConfigurationAddClientSite: React.FC<ConfigurationAddClientSiteProps> = ( {
                                                                                    clientId,
                                                                                    site,
                                                                                    primaryStatus,
                                                                                    onUpdate,
                                                                                    visible = false,
                                                                                    setClientVisible,
                                                                                    setNewClientVisible
} ) => {
    const [savedSite, setSavedSite] =  useState<any>(null);
    const sourceSite = site ? site.type !== "Source" ? 0 : primaryStatus ? 2 : 1 : 0;
    const ownerClientLookup = {
        sourceSite,
        outlierDetectionInclusionFlag: true
    };
    useAddSiteToClient(savedSite, clientId, ownerClientLookup, onUpdate, setSavedSite);

    const onClose = () => {
        setSavedSite(null);
        setClientVisible(false);
        setNewClientVisible(false);
    };

    const onAddSite = (values: any) => {
        setSavedSite(values.site);
        setClientVisible(false);
    };

    const onOpenCreateNewSite = () => {
        setClientVisible(false);
        setNewClientVisible(true);
    };

    return <>
        <Drawer
            placement="bottom"
            closable={false}
            onClose={onClose}
            visible={visible}
            height={'100%'}
            className={styles.create_new_site_drawer}
        >
            <Button onClick={onClose} style={{ float: "right", position: 'absolute', right: '0' }} type="link">
                <FontAwesomeIcon icon={['fal', 'times']} style={{ cursor: 'pointer', marginRight: '10px' }} size={'3x'} />
            </Button>
            {visible && <ConfigurationAddClientForm
                site={site}
                onSave={onAddSite}
                openCreateNewSite={onOpenCreateNewSite}
                clientId={clientId}
            />}
        </Drawer>
    </>;
};

export default ConfigurationAddClientSite;
