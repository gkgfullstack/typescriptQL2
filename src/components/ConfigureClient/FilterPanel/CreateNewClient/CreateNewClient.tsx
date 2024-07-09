import React, { useState } from 'react';
import { Button, Drawer } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./CreateNewClient.module.less";
import CreateNewClientForm from './CreateNewClientForm';
import { useCreateNewConfigureClient } from 'src/api/createNewConfigureClient';
import ConfigureClientInfo from 'src/types/ConfigureClientInfo';
import ConfigureClientFilter from 'src/types/ConfigureClientFilter';

type CreateNewClientProps = {
    schemas: ConfigureClientFilter[];
    industries: ConfigureClientFilter[];
};

const CreateNewClient: React.FC<CreateNewClientProps> = ( { schemas, industries }) => {
    const [visible, setVisible] = useState(false);
    const [savedClient, setSavedClient] =  useState(null);
    useCreateNewConfigureClient(savedClient);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
        setSavedClient(null);
    };

    const onCreateClient = (values: ConfigureClientInfo) => {
        const newClient: any = {
            ...values,
            active: true
        };
        setVisible(false);
        setSavedClient(newClient);
    };

    return <>
        <Button type="primary" onClick={showDrawer} style={{ width: '100%', maxWidth: '170px' }}>
            <FontAwesomeIcon icon={['fal', 'plus']} className={styles.chevronDown} size="lg" style={{ marginRight: '10px' }} /> Create New Client
        </Button>
        <Drawer
            placement="bottom"
            closable={false}
            onClose={onClose}
            visible={visible}
            height={'100%'}
            className={styles.create_new_client_drawer}
        >
            <Button onClick={onClose} style={{ float: "right", position: 'absolute', right: '0' }} type="link">
                <FontAwesomeIcon onClick={showDrawer} icon={['fal', 'times']} style={{ cursor: 'pointer', marginRight: '10px' }} size={'3x'} />
            </Button>
            {visible && <CreateNewClientForm onSave={onCreateClient} schemas={schemas} industries={industries} />}
        </Drawer>
    </>;
};

export default CreateNewClient;
