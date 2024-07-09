import React, { useState } from 'react';
import { Tree } from 'antd';
import styles from './CategorySelectTree.module.less';

interface TreeNode {
  key: string;
  title: string;
  children: Array<any>;
}

type SelectTreeProps = {
  data: TreeNode[];
  onUpdate: (values: string) => void;
  onLoadData: any;
  checkedKeys: any;
  setCheckedKeys: any;
  checkStrictly?: boolean;
};

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

const CategorySelectTree: React.FC<SelectTreeProps> = ({
  data,
  onUpdate,
  onLoadData,
  checkedKeys,
  setCheckedKeys,
  checkStrictly,
}: SelectTreeProps) => {
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(false);

  const onCheck = (checkedKeysValue: any, event: any) => {
    const filteredKeys: string = [...event.checkedNodes]
      .map(item => item.props)
      .filter(key => key.isLeaf)
      .map(item => item.title)
      .join('; ');
    setCheckedKeys(checkedKeysValue);
    onUpdate(filteredKeys);
  };

  const onExpand = (expandedKeysValue: string[]) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  return (
    <div className={styles.select_tree_wrapper}>
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
        loadData={onLoadData}
        checkStrictly={checkStrictly}
      />
    </div>
  );
};

export default CategorySelectTree;
