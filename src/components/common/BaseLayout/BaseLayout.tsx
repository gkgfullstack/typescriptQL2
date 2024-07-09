import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Layout } from 'antd';

import Sider from './Sider';
import styles from './BaseLayout.module.less';
import { Link } from 'react-router-dom';
//import AcceptableUsePolicy from 'src/components/AcceptableUsePolicy';

const { Content } = Layout;

type BaseLayoutProps = {
  children: React.ReactNode;
};

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }: BaseLayoutProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  useEffect(() => {
    const isSliderCollapsed = JSON.parse(localStorage.getItem('sliderState') as string);
    if (isSliderCollapsed) {
      setCollapsed(isSliderCollapsed);
    }
  }, []);

  return (
    <Layout>
      <Sider
        collapsed={collapsed}
        onToggleCollapse={(): void => {
          setCollapsed(value => !value);
        }}
      />
      <Content className={clsx(styles.content, { [styles.content_shifted]: !collapsed })}>
        <div className={styles.scrollable_container}>
          <div className={styles.page_content}>{children}</div>
          <footer className={styles.page_footer}>
            <Link to="/AcceptableUsePolicy" title={'Acceptable Use Policy'} referrerPolicy={'origin'}>
              Acceptable Use Policy
            </Link>
            {/* <a
              target="_blank"
              title="Acceptable Use Policy"
              rel="noopener noreferrer"
              href='AcceptableUsePolicy/'
            >
              Acceptable Use Policy
            </a> */}
          </footer>
        </div>
      </Content>
    </Layout>
  );
};

export default BaseLayout;
