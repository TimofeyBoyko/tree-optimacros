import { makeAutoObservable } from "mobx";

import { INode, INodeStore } from "./NodeStore";

export interface ITree {
  node: INode;
  children: ITree[];
}

class TreeStore {
  tree: ITree[] | null = null;
  treeInit: boolean = false;
  nodeStore: INodeStore | null = null;

  constructor(nodeStore: INodeStore) {
    this.nodeStore = nodeStore;

    makeAutoObservable(this);
  }

  initTree = () => {
    if (this.nodeStore) {
      const { nodes } = this.nodeStore;

      this.treeInit = false;
      const treeNodes: ITree[] = [];

      const tree: ITree[] = [];

      nodes.forEach((node: INode) => {
        treeNodes.push({ node: node, children: [] });
      });

      treeNodes.forEach((treeNode: ITree) => {
        if (treeNode.node.parentId !== "-1") {
          const index: number = treeNodes.findIndex(
            ({ node }) => node.nodeId === treeNode.node.parentId
          );
          treeNodes[index].children?.push(treeNode);
        }
      });

      treeNodes.forEach((treeNode: ITree) => {
        if (treeNode.node.parentId === "-1") {
          tree.push(treeNode);
        }
      });

      this.tree = tree;

      this.treeInit = true;
    }
  };

  removeTreeNode = (nodeId: string, tree: ITree[]) => {
    this.nodeStore && this.nodeStore.removeNode(nodeId);

    const newTree: ITree[] = tree;

    newTree.forEach((treeNode: ITree, index: number) => {
      if (treeNode.node.nodeId === nodeId) {
        newTree?.splice(index, 1);
      } else {
        if (treeNode.children.length > 0) {
          this.removeTreeNode(nodeId, treeNode.children);
        }
      }
    });
  };

  resetTreeStore = () => {
    this.tree = null;
    this.treeInit = false;
  };
}

export default TreeStore;
