import React, { useState } from 'react';
import { Button, Drawer } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./CreateNewTable.module.less";
import CreateNewTableForm from './CreateNewTableForm';
import { useCreateNewTablePage } from 'src/api/createNewTablePage';

type CreateNewTableProps = {
    onUpdateCreateNew:any;
    appIds:any;
};

const CreateNewTable: React.FC<CreateNewTableProps> = ({ onUpdateCreateNew, appIds }) => {
    const [visible, setVisible] = useState(false);
    const [newTableData, setNewTableData] = useState(null);

    useCreateNewTablePage( newTableData, onUpdateCreateNew, appIds);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
        setNewTableData(null);
    };
    
    const onCreateClient = (values: any) => {
        setVisible(false);
        setNewTableData(values);
    };

    return <>
        <Button type="primary" onClick={showDrawer} style={{ width: '100%', maxWidth: '170px' }}>
            <FontAwesomeIcon icon={['fal', 'plus']} className={styles.chevronDown} size="lg" style={{ marginRight: '10px' }} /> Create New Table
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
            {visible && <CreateNewTableForm onSave={onCreateClient} setVisible={onClose} />}
        </Drawer>
    </>;
};

export default CreateNewTable;
