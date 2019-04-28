import React, {Component} from 'react';
import {Form, Field} from 'react-final-form';

export default class Register extends Component {
  onSubmit = (data) => {
    console.log(data);
  };

  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        render={({handleSubmit, pristine, invalid}) => (
          <div className="sign-form-cont">
            <form onSubmit={handleSubmit} className="sign-form">
              <div className="sign-form-header">
                <h1>Register</h1>
              </div>

              <Field name="userName" component="input" placeholder="Username"/>
              <Field name="password" component="input" type="password" placeholder="Password"/>
              <Field name="rePassword" component="input" type="password" placeholder="Re-type password"/>

              <button type="submit" disabled={pristine || invalid}>
                Register
              </button>
            </form>
          </div>
        )}
      />
    );
  }
}