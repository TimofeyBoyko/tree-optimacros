import { makeAutoObservable } from "mobx";

import { IContent } from "./FilesStore";

export interface INode {
  label: string;
  nodeId: string;
  parentId: string;
}

export interface INodeStore {
  nodes: INode[];
  nodeInit: boolean;
  initNodes: (filesContent: IContent) => void;
  removeNode: (nodeId: string) => void;
  resetNodes: () => void;
}

class NodeStore implements INodeStore {
  nodes: INode[] = [];
  nodeInit: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  initNodes = (filesContent: IContent) => {
    this.nodeInit = false;
    const { labels, entityLongIds, parentEntityLongIds } = filesContent;

    const nodes: INode[] = [];

    labels.forEach((label, index) => {
      const node = {
        label: label,
        nodeId: String(entityLongIds[index]),
        parentId: String(parentEntityLongIds[index]),
      };

      nodes.push(node);
    });

    this.nodes = nodes;

    this.nodeInit = true;
  };

  removeNode = (nodeId: string) => {
    const newNodes: INode[] = this.nodes;

    newNodes.forEach((node: INode, index: number) => {
      if (node.nodeId === nodeId) {
        newNodes?.splice(index, 1);
      }
    });

    this.nodes = newNodes;
  };

  resetNodes = () => {
    this.nodes = [];
    this.nodeInit = false;
  };
}

export default NodeStore;
