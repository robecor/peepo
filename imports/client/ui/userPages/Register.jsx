import React, {Component} from 'react';
import {Form, Field} from 'react-final-form';
import {Accounts} from 'meteor/accounts-base';

export default class Register extends Component {
  state = {
    isLoading: false
  }

  onSubmit = ({username, email, password, rePassword}) => {
    const {history} = this.props;

    if (password !== rePassword) {
      alert('Password must match');
    } else {
      this.setState({isLoading: true});

      Accounts.createUser({
        username,
        password
      }, () => {
        this.setState({isLoading: false});
        history.push('/login');
      });
    }
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
                <h1>Register</h1>
              </div>

              <Field name="username" component="input" placeholder="Username"/>
              {/*<Field name="email" component="input" placeholder="Email"/>*/}
              <Field name="password" component="input" type="password" placeholder="Password"/>
              <Field name="rePassword" component="input" type="password" placeholder="Re-type password"/>

              <button type="submit" disabled={pristine || invalid || isLoading}>
                Register
              </button>
            </form>
          </div>
        )}
      />
    );
  }
}