import React from 'react';
import {AppRouter} from "./router";
import {Layout} from "./components/layout";

function App() {
  return (
    <Layout>
      <AppRouter />
    </Layout>
  );
}

export default App;
