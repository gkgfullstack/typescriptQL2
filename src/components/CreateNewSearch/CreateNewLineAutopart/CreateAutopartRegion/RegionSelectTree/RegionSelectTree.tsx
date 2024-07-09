import React, { ChangeEvent, useEffect, useState } from 'react';
import { Input, Tree } from 'antd';
import styles from './RegionSelectTree.module.less';

interface TreeNode {
  key: string;
  title: string;
  children: Array<any>;
}

type SelectTreeProps = {
  data: TreeNode[];
  onUpdate: (values: string) => void;
  searchType: string;
};

const { Search } = Input;

const getParentKey = (key: string, tree: TreeNode[]): null | string => {
  let parentKey = null;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item: TreeNode) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

const findKeys = (item: TreeNode, value: string, expandedKeys: string[], data: TreeNode[]) => {
  let parentKey = null;
  if (item.title.toLowerCase().indexOf(value.toLowerCase()) > -1) {
    parentKey = getParentKey(item.key, data);
  }
  if (item.children) {
    item.children.forEach((child: TreeNode) => {
      findKeys(child, value, expandedKeys, data);
    });
  }
  if (parentKey) {
    expandedKeys.push(parentKey);
  }
};

const RegionSelectTree: React.FC<SelectTreeProps> = ({ data, onUpdate, searchType }: SelectTreeProps) => {
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(false);

  useEffect(() => {
    setCheckedKeys([]);
    setExpandedKeys([]);
    onUpdate('');
  }, [searchType]);

  const onCheck = (checkedKeysValue: any, e: any) => {
    const filteredKeys: string = [...e.checkedNodes]
      .map(item => item.props)
      .map(item => item.zipCode)
      .filter(item => item)
      .join('; ');
    setCheckedKeys(checkedKeysValue);
    onUpdate(filteredKeys);
  };

  const onRegionSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value && value.length > 1) {
      const keys: string[] = [];

      [...data].forEach((item: TreeNode) => {
        findKeys(item, value, keys, data);
      });
      setExpandedKeys(keys);
      setAutoExpandParent(true);
    } else {
      setExpandedKeys([]);
      setAutoExpandParent(false);
    }
  };

  const onExpand = (expandedKeysValue: string[]) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  return (
    <div className={styles.select_tree_wrapper}>
      <Search placeholder="Enter more than two characters" onChange={onRegionSearch} allowClear />
      <Tree
        selectable={false}
        checkable
        showLine
        treeData={data}
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
      />
    </div>
  );
};

export default RegionSelectTree;
