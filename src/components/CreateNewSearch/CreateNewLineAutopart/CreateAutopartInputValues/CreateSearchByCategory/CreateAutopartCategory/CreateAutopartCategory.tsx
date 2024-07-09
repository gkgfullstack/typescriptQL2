import React, { ChangeEvent, useEffect, useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { getAutopartsCategory, useAutopartsCategory } from 'src/api/createNewSearch/autoPartsCategory';
import Spin from 'src/components/common/Spin';
import CategorySelectTree from './CategorySelectTree';
import { Form, Select } from 'antd';
import { SelectValue } from 'antd/lib/select';
import styles from './CreateAutopartCategory.module.less';

const { Option } = Select;
const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};

const categoryOptions = [
  {
    name: 'Static',
    id: 'static',
  },
  {
    name: 'Dynamic',
    id: 'dynamic',
  },
];

type CreateAutopartCategory = {
  site: string;
  setCategory: (category: string) => void;
  category: string;
  checkedKeys: any;
  setCheckedKeys: any;
  searchType?: string;
};

const updateTreeNode = (children: any, parentPath: string): any => {
  return children.map((item: any) => {
    const categoryPath = `${parentPath}:${item.name}`;
    return {
      title: `${item.name}: ${categoryPath}`,
      ID: item.ID,
      key: item.ID,
      children: item.childrenCategories ? updateTreeNode(item.childrenCategories.categoryCC, categoryPath) : null,
      isLeaf: !item.childrenCategories,
      categoryPath,
    };
  });
};

const updateTreeData = (list: any, ID: any, children: any): any => {
  return list.map((node: any) => {
    if (node.ID === ID) {
      return {
        ...node,
        disabled: false,
        children: children.map((item: any) => {
          const categoryPath = `${node.categoryPath}:${item.name}`;
          return {
            title: `${item.name}: ${categoryPath}`,
            ID: item.ID,
            key: item.ID,
            children: item.childrenCategories ? updateTreeNode(item.childrenCategories.categoryCC, categoryPath) : null,
            isLeaf: !item.childrenCategories,
            categoryPath,
          };
        }),
      };
    }
    return node;
  });
};

const CreateAutopartCategory: React.FC<CreateAutopartCategory> = ({
  site,
  setCategory,
  category,
  checkedKeys,
  setCheckedKeys,
  searchType,
}: CreateAutopartCategory) => {
  const [categoryType, setCategoryType] = useState<SelectValue>('static');
  const [categoryList, setCategoryList] = useState<any>([]);
  const [loading, categoriesData]: any = useAutopartsCategory(site);

  useEffect(() => {
    setCategoryList([]);
  }, [site]);

  useEffect(() => {
    setCategoryList(categoriesData);
  }, [categoriesData]);

  const onCategoryUpdate = (value: string) => {
    setCategory(value);
  };

  const onLoadData = (node: any) =>
    new Promise<void>(resolve => {
      if (node.props.children.length > 0) {
        resolve();
        return;
      }

      if (site && node.props.ID) {
        getAutopartsCategory(site, node.props.ID).then(response => {
          if (response && response.categoryCC) {
            setCategoryList((origin: any) =>
              updateTreeData(origin, node.props.ID, response.categoryCC[0].childrenCategories.categoryCC)
            );
          }
          resolve();
        });
      } else {
        resolve();
      }
    });

  const onCategoryChange = (value: SelectValue) => {
    setCategoryType(value);
  };

  const isCategoryTypeVisible = (type?: string) => {
    return type === 'shallow' || type === 'product pull' || type === 'category crawl';
  };

  return (
    <Spin spinning={loading}>
      {isCategoryTypeVisible(searchType) && (
        <Form.Item {...layout} label={'Category Resolution Type'}>
          <Select showArrow onChange={onCategoryChange} defaultValue="static">
            {categoryOptions.map(option => {
              return (
                <Option key={option.id} value={option.id}>
                  {option.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      )}
      {categoryList.length > 0 && (
        <div className={styles.create_category_tree_wrapper}>
          <CategorySelectTree
            data={categoryList}
            onUpdate={onCategoryUpdate}
            onLoadData={onLoadData}
            checkedKeys={checkedKeys}
            setCheckedKeys={setCheckedKeys}
            checkStrictly={categoryType === 'dynamic'}
          />
          <TextArea
            rows={2}
            value={category}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setCategory(event.target.value)}
            placeholder={'Please enter Category Path'}
            style={{ marginBottom: '15px' }}
          />
        </div>
      )}
      {!site && <p style={{ color: '#f5222d', lineHeight: '40px' }}>Please select Site to see Category Tree</p>}
      {loading && <div style={{ height: '80px' }}>&nbsp;</div>}
    </Spin>
  );
};

export default CreateAutopartCategory;
