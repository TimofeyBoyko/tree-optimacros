import React from "react";

import { inject, observer, Provider } from "mobx-react";

import stores from "./store";

import Home from "./Pages/Home";

type AppProps = {
  fetchFiles?: () => void;
};

const App: React.FC<AppProps> = ({ fetchFiles }) => {
  React.useEffect(() => {
    fetchFiles && fetchFiles();
  }, [fetchFiles]);

  return <Home />;
};

const AppWrapper = inject(({ filesStore }) => {
  const { fetchFiles } = filesStore;

  return { fetchFiles };
})(observer(App));

const AppProvider = () => (
  <Provider {...stores}>
    <AppWrapper />
  </Provider>
);

export default AppProvider;
