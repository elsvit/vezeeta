import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Loading, IconLoader } from '@vezeeta/web-components';
import EnterpriseLayout from '@vezeeta/enterprise-layout';
import Loadable from 'react-loadable';
import { Provider } from 'react-redux';
import store from '../store';
import '../shared/bootstrap.min.css';

import icons from './icons.json';
import './App.scss';
import '../shared/Utils.scss';

const Schedule = Loadable({
  loader: () => import('./schedule/ScheduleContainer'),
  loading: Loading,
});

const WorkingHours = Loadable({
  loader: () => import('./workingHours/WorkingHoursContainer'),
  loading: Loading,
});

const Confirmation = Loadable({
  loader: () => import('./confirmation/ConfirmationContainer'),
  loading: Loading,
});

const Vacation = Loadable({
  loader: () => import('./vacation/VacationContainer'),
  loading: Loading,
});

const Patients = Loadable({
  loader: () => import('./patients/PatientsContainer'),
  loading: Loading,
});

const scheduleTabs = [
  {
    title: 'Schedule',
    url: '/schedule',
    enable: true,
  },
  {
    title: 'Confirmation',
    url: '/confirmation',
    enable: true,
  },
  {
    title: 'Vacation',
    url: '/vacation',
    enable: true,
  },
  {
    title: 'Working Hours',
    url: '/working-hours',
    enable: true,
  },
];

class App extends Component {
  constructor() {
    super();

    IconLoader.getInstance().setIconStore(icons);
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <EnterpriseLayout tabs={scheduleTabs} activeTab="Schedule">
            <div className="App">
              <Switch>
                <Route path="/working-hours" component={WorkingHours} />
                <Route path="/schedule" component={Schedule} />
                <Route path="/confirmation" component={Confirmation} />
                <Route path="/vacation" component={Vacation} />
                <Route path="/patients" component={Patients} />
                <Redirect to="/schedule" />
              </Switch>
            </div>
          </EnterpriseLayout>
        </Router>
      </Provider>
    );
  }
}

export default App;
