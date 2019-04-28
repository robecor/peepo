import React, {Component} from 'react';
import {Form, Field} from 'react-final-form';
import {Accounts} from 'meteor/accounts-base';
import {Redirect} from "react-router-dom";

export default class Login extends Component {
  state = {
    isLoading: false,
    redirectToHome: false
  };

  onSubmit = ({username, password}) => {
    this.setState({isLoading: true});

    Meteor.loginWithPassword(username, password, (err) => {
      this.setState({isLoading: false});
      if (err) {
        console.log(err);
      } else {
        setTimeout(() => {
          this.setState({redirectToHome: true});
        }, 500);
      }
    })
  };

  render() {
    const {isLoading, redirectToHome} = this.state;

    if (redirectToHome) {
      return <Redirect to="/"/>
    }

    return (
      <Form
        onSubmit={this.onSubmit}
        render={({handleSubmit, pristine, invalid}) => (
          <div className="sign-form-cont">
            <form onSubmit={handleSubmit} className="sign-form">
              <div className="sign-form-header">
                <h1>Login</h1>
              </div>

              <Field name="username" component="input" placeholder="Username"/>
              <Field name="password" component="input" type="password" placeholder="Password"/>

              <button type="submit" disabled={pristine || invalid || isLoading}>
                Login
              </button>
            </form>
          </div>
        )}
      />
    );
  }
}