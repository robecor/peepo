import React, {Component} from 'react';
import {Form, Field} from 'react-final-form';
import {Accounts} from 'meteor/accounts-base';

export default class Login extends Component {
  state = {
    isLoading: false
  };

  onSubmit = ({username, password}) => {
    this.setState({isLoading: true});

    Meteor.loginWithPassword(username, password, (err) => {
      this.setState({isLoading: true});
      if (err) {
        console.log(err);
      } else {
        alert('Login success');
      }
    })
  };

  render() {
    const {isLoading} = this.state;

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