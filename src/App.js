import React from 'react';

import Header from "./components/header/header";
import Router from "./services/router";
import AppContext from "./components/context/app-context";

const App = () => {

  return (
    <AppContext>
      <div className='App'>
        <Header/>
        <div className="content">
          <Router/>
        </div>
      </div>
    </AppContext>
  );
};

export default App;