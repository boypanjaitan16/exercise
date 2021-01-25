import React from 'react'
import {Switch, Route, HashRouter} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import GlobalAlert from './components/Alert'

import AuthRoutes from './pages/auth'
import Home from './pages/Home'
import AccountRoutes from './pages/account'

function App() {
  

  return (
      <HashRouter>
        <GlobalAlert/>
        <Switch>
          <Route exact path={'/'} component={Home}/>
          <Route path={'/auth'} component={AuthRoutes}/>
          <PrivateRoute path={'/account'} component={AccountRoutes}/>
        </Switch>
      </HashRouter>
  );
}

export default App;
