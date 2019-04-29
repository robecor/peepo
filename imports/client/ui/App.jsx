import React, {Component} from 'react';
import routes from '/imports/client/setup/routing/routes.js';
import {BrowserRouter} from "react-router-dom";
import AuthRoute from '/imports/client/setup/routing/components/AuthRoute.jsx';
import Modal from 'react-modal';

Modal.setAppElement('#main-app');

export default class App extends Component {
  render() {
    return (
      <div className="main-app">
        <BrowserRouter>
          {
            routes.map(route => (
              <AuthRoute
                key={route.path}
                path={route.path}
                component={route.component}
                requireLogIn={route.requireLogIn}
                exact={route.exact}
              />
            ))
          }
        </BrowserRouter>
      </div>
    );
  }
}