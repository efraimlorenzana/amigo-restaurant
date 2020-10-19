import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Home from '../components/home/home';
import AddMenu from '../components/menu/add';

const App = () => {

  return (
    <Fragment>
      <Route exact path="/" component={Home} />
      <Route exact path="/menu/add" component={AddMenu} />
    </Fragment>
  );
}

export default App;
