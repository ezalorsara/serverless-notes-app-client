import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import NotFound from './containers/NotFound';
import Login from './containers/Login';
import Register from './containers/Register';
import { ConnectedRouter } from 'connected-react-router'
import { history } from './configureStore'
import CreateNote from './containers/Notes/Create';
import Note from './containers/Notes';
import Settings from './containers/Settings';

const Routes: React.FC = () => {

  return (
    <ConnectedRouter history={history}> { /* place ConnectedRouter under Provider */}
      <> { /* your usual react-router v4/v5 routing */}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />} />
          <Route path="/signup" exact component={Register} />} />
          <Route path="/settings" exact component={Settings} />} />
          <Route path="/notes/new" exact component={CreateNote} />} />
          <Route path="/notes/:id" exact component={Note} />} />
          <Route component={NotFound} />
        </Switch>
      </>
    </ConnectedRouter>
  );
}

export default Routes;
