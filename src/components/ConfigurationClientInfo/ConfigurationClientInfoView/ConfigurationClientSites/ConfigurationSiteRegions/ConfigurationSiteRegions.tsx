import React from 'react';
import { Button, Drawer } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ConfigurationSiteRegions.module.less";
import ConfigurationSiteRegionView from "./ConfigurationSiteRegionView";
import { ConfigureClientSitesTableInfo } from "src/types/ConfigureClientSitesTableInfo";

type ConfigurationSiteRegion = {
       site: ConfigureClientSitesTableInfo;
       visible: boolean;
} | null;

type ConfigurationSiteRegionsProps = {
    region: ConfigurationSiteRegion;
    setRegion: (region: ConfigurationSiteRegion) => void;
};

const ConfigurationSiteRegions: React.FC<ConfigurationSiteRegionsProps> = ({ region, setRegion }) => {
    const onClose = () => {
        setRegion(null);
    };

    return <>
        { region && <Drawer
                placement="bottom"
                closable={false}
                onClose={onClose}
                visible={region.visible}
                height={'100%'}
                className={styles.regions_drawer}
            >
                <Button onClick={onClose} className={styles.region_close_button} type="link">
                    <FontAwesomeIcon icon={['fal', 'times']}  className={styles.region_close_icon} size={'3x'}/>
                </Button>
               <ConfigurationSiteRegionView site={region.site} />
            </Drawer>
        }
    </>;
};

export default ConfigurationSiteRegions;
