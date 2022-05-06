import FilesStore from "./FilesStore";
import NodeStore from "./NodeStore";
import TreeStore from "./TreeStore";
import SelectedNodeStore from "./SelectedNodeStore";

const nodeStore = new NodeStore();

const filesStore = new FilesStore(nodeStore);

const treeStore = new TreeStore(nodeStore);

const selectedNodeStore = new SelectedNodeStore(nodeStore);

const stores = {
  filesStore,
  nodeStore,
  treeStore,
  selectedNodeStore,
};

export default stores;
