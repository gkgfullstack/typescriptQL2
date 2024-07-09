import React from 'react';
import { Divider, Form, Input } from 'antd';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import styles from './CreateVacationTraveler.module.less';
import { AdultsTooltip, ChildrenTooltip, RoomsTooltip } from '../CreateVacationTooltip/CreateVacationTooltip';

type CreateVacationTravelerProps = {
  getFieldDecorator<T extends Record<string | number | symbol, string>>(
    id: keyof T,
    options?: GetFieldDecoratorOptions
  ): (node: React.ReactNode) => React.ReactNode;
};

const CreateVacationTraveler: React.FC<CreateVacationTravelerProps> = ({ getFieldDecorator }) => {
  const formConfig: { [field: string]: GetFieldDecoratorOptions } = {
    adults: {
      initialValue: 2,
    },
    children: {
      initialValue: 0,
    },
    rooms: {
      initialValue: 1,
    },
  };

  return (
    <>
      <div className={'ant-row ant-form-item'}>
        <div className="ant-col ant-col-9 ant-form-item-label">
          <label>
            <h6 className="tooltiplayout">Travelers</h6>
          </label>
        </div>
        <div className={`ant-col ant-col-15 ant-form-item-control-wrapper ${styles.create_new_line_travelers}`}>
          <Form.Item
            label={
              <h6 className="tooltiplayout">
                Adults <AdultsTooltip />
              </h6>
            }
          >
            {getFieldDecorator('adults', formConfig.adults)(<Input min={0} type="number" placeholder="0" />)}
          </Form.Item>
          <Form.Item
            label={
              <h6 className="tooltiplayout">
                Children <ChildrenTooltip />
              </h6>
            }
          >
            {getFieldDecorator('children', formConfig.children)(<Input min={0} type="number" placeholder="0" />)}
          </Form.Item>
          <Form.Item
            label={
              <h6 className="tooltiplayout">
                Rooms <RoomsTooltip />
              </h6>
            }
          >
            {getFieldDecorator('rooms', formConfig.rooms)(<Input min={0} type="number" placeholder="0" />)}
          </Form.Item>
        </div>
      </div>
      <Divider className="dividerCustom" />
    </>
  );
};

export default CreateVacationTraveler;
