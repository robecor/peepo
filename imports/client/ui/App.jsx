import React, {Component} from 'react';
import routes from '/imports/client/setup/routing/routes.js';
import {BrowserRouter, Route} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          {
            routes.map(route => (
              <Route key={route.path} path={route.path} component={route.component}/>
            ))
          }
        </BrowserRouter>
      </div>
    );
  }
}