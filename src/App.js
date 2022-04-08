import React from 'react';

import Header from "./components/header/header";
import Router from "./services/router";

const App = () => {
  return (
    <div className='App'>
      <Header/>
      <div className="content">
        <Router />
      </div>
    </div>
  );
};

export default App;