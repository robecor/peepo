import React, {Component} from 'react';
import {Form, Field} from 'react-final-form';

export default class Login extends Component {
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
              <Field name="userName" component="input" placeholder="Username"/>
              <Field name="password" component="input" type="password" placeholder="Password"/>

              <button type="submit" disabled={pristine || invalid}>
                Login
              </button>
            </form>
          </div>
        )}
      />
    );
  }
}