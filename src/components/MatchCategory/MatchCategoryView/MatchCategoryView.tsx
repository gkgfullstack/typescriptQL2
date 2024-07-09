import React, { SyntheticEvent, useState } from 'react';
import MatchCategoryFilters from './MatchCategoryFilters';
import styles from './MatchCategoryView.module.less';
import { Link, useHistory } from 'react-router-dom';
import routes from 'src/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MatchCategoryList from './MatchCategoryList';

type MatchCategoryViewProps = {};

const MatchCategoryView: React.FC<MatchCategoryViewProps> = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const categoryId = urlParams.get('ID')?.toString();
  const categoryName = urlParams.get('name')?.toString();
  const categorySchema = urlParams.get('vertical')?.toString();
  const [search, setSearch] = useState<string>('');
  const [requestParams, setRequestParams] = useState<any>(null);
  const history = useHistory();

  const onBackClick = () => {
    return (event: SyntheticEvent) => {
      if (window.history.state && window.history.state.key) {
        event.preventDefault();
        history.goBack();
      }
    };
  };

  const getFilters = (name: string, value: string) => {
    if (name === 'search') {
      console.log(value, search);
      setSearch(value);
    }
  };

  return (
    <>
      <MatchCategoryFilters setParams={getFilters} requestParams={requestParams} setRequestParams={setRequestParams} />
      <div className={styles.actions_container}>
        <Link className={styles.back_link} to={routes.matchAttribute} onClick={onBackClick}>
          <FontAwesomeIcon icon={['far', 'chevron-left']} size={'xs'} className={styles.back_icon} />
          <span className={styles.back_link_text}>Back to Match Attribute Management</span>
        </Link>
      </div>
      <h2 className={styles.category_name}>{categoryName}</h2>
      <dl className={styles.match_category_list}>
        <dt>ID:</dt>
        <dd>{categoryId}</dd>
        <dt>Vertical:</dt>
        <dd>{categorySchema}</dd>
      </dl>
      <MatchCategoryList
        search={search}
        categoryId={categoryId}
        requestParams={requestParams}
        setRequestParams={setRequestParams}
      />
    </>
  );
};

export default MatchCategoryView;
