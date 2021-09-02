import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Home from 'Pages/Home';
import Success from 'Pages/Success';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/success" component={Success} exact />

      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default Routes;
