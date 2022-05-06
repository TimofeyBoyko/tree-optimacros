import { makeAutoObservable } from "mobx";

import { INode, INodeStore } from "./NodeStore";

class SelectedNodeStore {
  label: string | null = null;
  nodeId: string | null = null;
  parentId: string | null = null;

  nodeStore: INodeStore | null = null;

  constructor(nodeStore: any) {
    this.nodeStore = nodeStore;

    makeAutoObservable(this);
  }

  selectNode = (nodeId: string | undefined): void => {
    if (this.nodeStore) {
      const { nodes } = this.nodeStore;

      const node: INode | undefined = nodes.find(
        (node: INode) => node.nodeId === nodeId
      );

      this.label = node?.label ? node.label : null;
      this.nodeId = node?.nodeId ? node.nodeId : null;
      this.parentId = node?.parentId ? node?.parentId : null;
    }
  };

  resetSelectedNode = () => {
    this.label = null;
    this.nodeId = null;
    this.parentId = null;
  };
}

export default SelectedNodeStore;
