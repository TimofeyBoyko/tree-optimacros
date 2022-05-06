import { makeAutoObservable } from "mobx";

import { getFiles } from "../api";

export interface IContent {
  labels: string[];
  entityLongIds: number[];
  parentEntityLongIds: number[];
}

class FilesStore {
  files: { [key: string]: string } | null = null;
  filesLoading: boolean = false;
  content: IContent = {
    labels: [],
    entityLongIds: [],
    parentEntityLongIds: [],
  };

  nodeStore: { initNodes: (content: IContent) => void } | null = null;

  constructor(nodeStore: { initNodes: (content: IContent) => void } | null) {
    this.nodeStore = nodeStore;

    makeAutoObservable(this);
  }

  fetchFiles = async () => {
    this.filesLoading = true;

    this.resetFiles();
    const files = await getFiles();

    this.files = files;

    this.getFilesContent();
  };

  getFilesContent = () => {
    const files: { [key: string]: any } | null = this.files;
    if (files) {
      const fileKeys: string[] = Object.keys(files);

      fileKeys.forEach((fileKey: string) => {
        const fileContent: string = files[fileKey].content;

        const fileContentObj: { [key: string]: [IContent] } =
          JSON.parse(fileContent);

        const contentKeys: string[] = Object.keys(fileContentObj);

        contentKeys.forEach((contentKey: string) => {
          const content: IContent = fileContentObj[contentKey][0];

          this.setFilesContent(content);
        });
      });
    }
  };

  setFilesContent = (content: IContent) => {
    const currentContent: IContent | null = this.content;

    currentContent?.labels.push(...content.labels);
    currentContent?.entityLongIds.push(...content.entityLongIds);
    currentContent?.parentEntityLongIds.push(...content.parentEntityLongIds);

    this.content = currentContent;

    this.nodeStore?.initNodes(currentContent);
    this.filesLoading = false;
  };

  resetFiles = () => {
    this.files = null;
    this.filesLoading = false;
    this.content = {
      labels: [],
      entityLongIds: [],
      parentEntityLongIds: [],
    };
  };
}

export default FilesStore;
