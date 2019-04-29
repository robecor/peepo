import React, {Component, Fragment} from 'react';
import {Route, Redirect} from "react-router-dom";
import Navbar from '/imports/client/ui/utils/Navbar.jsx';
import {createContainer} from 'meteor/react-meteor-data';
import Loader from '/imports/client/ui/utils/Loader.jsx';

class AuthRoute extends Component {
  shouldRedirect() {
    const {requireLogIn} = this.props;

    return requireLogIn && !Meteor.userId();
  }

  render() {
    const {
      path,
      exact,
      requireLogIn,
      component: Component,
      userId,
      user
    } = this.props;

    return (
      <Route
        path={path}
        exact={exact}
        render={(props) => (
          requireLogIn && !userId ?
            <Redirect to="/login"/>
            :
            user || !requireLogIn  ?
              <Fragment>
                {requireLogIn && <Navbar user={user}/>}
                <Component user={user} {...props}/>
              </Fragment>
              :
              <Loader/>
        )}
      />
    );
  }
}

export default createContainer((props) => {
  const userId = Meteor.userId();
  const user = Meteor.user();

  return {
    userId,
    user,
    ...props
  }
}, AuthRoute);
