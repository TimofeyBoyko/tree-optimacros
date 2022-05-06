import { inject, observer } from "mobx-react";
import React from "react";
import Node from "../../components/Node";

import "./home.scss";

import { ITree } from "../../store/TreeStore";
import Button from "../../components/Button";

type HomeProps = {
  tree?: any;
  initTree?: () => void;
  selectNode?: (nodeId: string | undefined) => void;
  fetchFiles?: () => void;
  resetNodes?: () => void;
  resetTreeStore?: () => void;
  resetSelectedNode?: () => void;
  removeTreeNode?: (nodeId: string, tree: ITree[]) => void;
  treeInit?: boolean;
  nodeInit?: boolean;
  filesLoading?: boolean;
  selectedLabel?: null | string;
  selectedNodeId?: null | string;
  selectedParentId?: null | string;
};

const Home: React.FC<HomeProps> = ({
  selectedLabel,
  selectedNodeId,
  selectedParentId,
  tree,
  treeInit,
  nodeInit,
  filesLoading,
  initTree,
  selectNode,
  fetchFiles,
  resetNodes,
  resetTreeStore,
  resetSelectedNode,
  removeTreeNode,
}) => {
  React.useEffect(() => {
    if (nodeInit && !filesLoading) {
      initTree && initTree();
    }
  }, [initTree, nodeInit, filesLoading]);

  const onSelect = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLDivElement;

      const nodeId: string | undefined = target.dataset.id;

      selectNode && selectNode(nodeId);
    },
    [selectNode]
  );

  const onRefresh = React.useCallback(() => {
    fetchFiles && fetchFiles();
    resetNodes && resetNodes();
    resetTreeStore && resetTreeStore();
    resetSelectedNode && resetSelectedNode();
  }, [fetchFiles, resetNodes, resetTreeStore, resetSelectedNode]);

  const onApply = React.useCallback(() => {
    console.log(tree);
  }, [tree]);

  const onRemove = React.useCallback(() => {
    if (selectedNodeId) {
      removeTreeNode && removeTreeNode(selectedNodeId, tree);
      resetSelectedNode && resetSelectedNode();
    }
  }, [removeTreeNode, resetSelectedNode, selectedNodeId, tree]);

  const renderTreeChildren = (children: ITree[]) => {
    const treeElements = children.map((treeNode: ITree) => {
      const { label, nodeId } = treeNode.node;

      if (treeNode.children.length > 0) {
        return (
          <Node
            key={nodeId}
            label={label}
            nodeId={nodeId}
            isSelected={nodeId === selectedNodeId}
            onClick={onSelect}
          >
            {renderTreeChildren(treeNode.children)}
          </Node>
        );
      }

      return (
        <Node
          key={nodeId}
          label={label}
          nodeId={nodeId}
          isSelected={nodeId === selectedNodeId}
          onClick={onSelect}
        />
      );
    });

    return treeElements;
  };

  const renderTree = () => {
    if (!treeInit) return <div>loading</div>;

    const treeElements = tree.map((treeNode: ITree) => {
      const { label, nodeId } = treeNode.node;

      if (treeNode.children.length > 0) {
        return (
          <Node
            key={nodeId}
            label={label}
            nodeId={nodeId}
            isSelected={nodeId === selectedNodeId}
            onClick={onSelect}
          >
            {renderTreeChildren(treeNode.children)}
          </Node>
        );
      }

      return (
        <Node
          key={nodeId}
          label={label}
          nodeId={nodeId}
          isSelected={nodeId === selectedNodeId}
          onClick={onSelect}
        />
      );
    });

    return treeElements;
  };

  return (
    <div className="home">
      <div className="home__tree">{treeInit && renderTree()}</div>
      <div className="home__info">
        <p>Label: {selectedLabel && selectedLabel}</p>
        <p>NodeId: {selectedNodeId && selectedNodeId}</p>
        <p>ParentId: {selectedParentId && selectedParentId}</p>
        <div className="info__button">
          <Button label="Apply" onClick={onApply} />
          <Button
            label="Remove"
            isDisabled={!selectedNodeId}
            onClick={onRemove}
          />
          <Button label="Refresh" onClick={onRefresh} />
        </div>
      </div>
    </div>
  );
};

export default inject(
  ({ treeStore, nodeStore, selectedNodeStore, filesStore }) => {
    const { tree, treeInit, initTree, resetTreeStore, removeTreeNode } =
      treeStore;

    const { filesLoading, fetchFiles } = filesStore;

    const { nodeInit, resetNodes } = nodeStore;

    const {
      label: selectedLabel,
      nodeId: selectedNodeId,
      parentId: selectedParentId,
      selectNode,
      resetSelectedNode,
    } = selectedNodeStore;

    return {
      selectedLabel,
      selectedNodeId,
      selectedParentId,
      tree,
      treeInit,
      nodeInit,
      resetNodes,
      initTree,
      selectNode,
      filesLoading,
      fetchFiles,
      resetTreeStore,
      resetSelectedNode,
      removeTreeNode,
    };
  }
)(observer(Home));
