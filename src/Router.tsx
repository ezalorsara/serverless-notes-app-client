import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import NotFound from './containers/NotFound';
import Login from './containers/Login';
import { ConnectedRouter } from 'connected-react-router'
import { history } from './configureStore'

const Routes: React.FC = () => {

  return (
    <ConnectedRouter history={history}> { /* place ConnectedRouter under Provider */}
      <> { /* your usual react-router v4/v5 routing */}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />} />
            <Route component={NotFound} />
        </Switch>
      </>
    </ConnectedRouter>
  );
}

export default Routes;
