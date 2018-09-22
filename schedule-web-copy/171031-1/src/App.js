import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import './bootstrap.min.css';

import './App.scss';
import './Common.scss';
import './components/base/Fonts.scss';
import './components/base/Utils.scss';

import Loading from './components/loading/Loading.js';

const Schedule = Loadable({
  loader: () => import('./views/containers/ScheduleContainer'),
  loading: Loading
});

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/schedule" component={Schedule} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
