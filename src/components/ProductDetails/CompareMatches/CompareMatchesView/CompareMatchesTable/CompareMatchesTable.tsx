import React, { Fragment } from 'react';
import clsx from 'clsx';
import Spin from 'src/components/common/Spin';
import { useCompareMatchesTable } from './hooks';
import { CompareMatchesTableProps, Match, MatchRow } from './hooks/useCompareMatchesTable';

import styles from './CompareMatchesTable.module.less';

const CompareMatchesTable: React.FC<CompareMatchesTableProps> = (props: CompareMatchesTableProps) => {
  const { loading, product, productMatches, isReadOnlyMatch } = props;
  const [{ matches, scrolling, rowsConfig }] = useCompareMatchesTable(props);

  const showTable = product && productMatches && productMatches.length > 0;

  return (
    <Spin spinning={loading}>
      <div className={styles.panelWrapper}>
        <a href="#show" className={styles.show} id="show">
          Show More
        </a>
        <a href="#hide" className={styles.hide} id="hide">
          Show Less
        </a>

        <div className={styles.panel}>
          {showTable && (
            <table className={clsx(styles.table, { [styles.scrolling]: scrolling })}>
              <tbody>
                {rowsConfig.map(
                  (row: MatchRow, index: number): React.ReactNode => {
                    return (
                      <tr key={`compare_match_row_${index}`}>
                        {matches.map(
                          (match: Match, matchIndex: number): React.ReactNode => {
                            return (
                              <Fragment key={`compare_match_fragment_${index}_${matchIndex}`}>
                                {matchIndex === 0 ? (
                                  <td className={styles.compare_match_table_header}>
                                    {row.titleRender && row.titleRender(match)}
                                  </td>
                                ) : null}
                                <td
                                  key={`compare_match_cell_${index}_${matchIndex}`}
                                  className={clsx(row.className, {
                                    [styles.fixed]: match.fixed,
                                    [styles.disabled_match]: match.removeRequest,
                                    [styles.banchmark_row]: match.benchmarkMatch === '1',
                                    [styles.unbanchmark_row]: match.benchmarkMatch === '0',
                                  })}
                                >
                                  <div className={styles.cell}>{row.customRender(match, isReadOnlyMatch)}</div>
                                </td>
                              </Fragment>
                            );
                          }
                        )}
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          )}
        </div>
        <div className="fadebox"></div>
      </div>
    </Spin>
  );
};

export default CompareMatchesTable;
