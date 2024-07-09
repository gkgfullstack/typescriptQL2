import React, { ChangeEvent, useState } from 'react';
import { OriginListTooltip } from 'src/components/CreateNewSearch/CreateNewLineTooltip/CreateNewLineTooltip';
import styles from 'src/components/CreateNewSearch/CreateNewLineItem/CreateNewLineItem.module.less';
import { Button, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type CreateFerryMarketsProps = {
  markets: string[];
  setMarkets: React.Dispatch<React.SetStateAction<string[]>>;
};

const CreateFerryMarkets: React.FC<CreateFerryMarketsProps> = ({ setMarkets, markets }: CreateFerryMarketsProps) => {
  const [market, setMarket] = useState<string>('');

  const addMarket = () => {
    if (market) {
      setMarkets([...markets, market]);
      setMarket('');
    }
  };

  const onHandleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addMarket();
    }
  };

  const removeMarket = (marketIndex: number) => {
    return (_: any) => {
      const changedMarkets: Array<string> = [...markets];
      changedMarkets.splice(marketIndex, 1);
      setMarkets(changedMarkets);
    };
  };

  return (
    <>
      <div className={'ant-row ant-form-item'}>
        <div className="ant-col ant-col-9 ant-form-item-label">
          <label>
            <h6 className="tooltiplayout">
              O&D List
              <OriginListTooltip />
              <span>ie Origin Port - Destination Port </span>
            </h6>
          </label>
        </div>
        <div className={styles.create_new_line_market}>
          <Input
            type="text"
            value={market}
            onKeyDown={onHandleKeyDown}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setMarket(event.target.value)}
            placeholder="Enter Market"
          />
          <Button type="primary" onClick={addMarket}>
            Add
          </Button>
        </div>
      </div>
      <div className={styles.create_new_line_markets}>
        {markets.length > 0 && (
          <div className={styles.create_new_line_markets_title}>
            <span>O&D List</span>
          </div>
        )}
        {markets.map(
          (market: string, i: number): React.ReactNode => {
            return (
              <p key={`${market}-${i}`}>
                <span className={styles.create_new_line_market_text}>
                  <Button type={'link'} onClick={removeMarket(i)}>
                    <FontAwesomeIcon icon={['fal', 'trash-alt']} style={{ color: '#6f6f6f' }} />
                  </Button>
                  {market}
                </span>
              </p>
            );
          }
        )}
      </div>
    </>
  );
};

export default CreateFerryMarkets;
