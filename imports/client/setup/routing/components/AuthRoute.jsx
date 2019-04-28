import React, {Component} from 'react';
import {Route, Redirect} from "react-router-dom";

export default class AuthRoute extends Component {
  shouldRedirect() {
    const {requireLogIn} = this.props;

    return requireLogIn && !Meteor.userId();
  }

  render() {
    const {path, exact, component: Component} = this.props;

    return (
      <Route
        path={path}
        exact={exact}
        render={(props) => (
          this.shouldRedirect() ?
            <Redirect to="/login"/>
            :
            <Component {...props}/>
        )}
      />
    );
  }
}