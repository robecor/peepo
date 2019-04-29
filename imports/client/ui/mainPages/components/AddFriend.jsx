import React, {Component} from 'react';
import {Form, Field} from 'react-final-form';

export default class AddFriend extends Component {
  onAddFriendSubmit = ({username}) => {
    if (this.props.onAddFriendSubmit) {
      this.props.onAddFriendSubmit({username});
    }
  };

  onCancel = () => {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  };

  render() {
    const {disableAddFriend} = this.props;

    return (
      <Form
        onSubmit={this.onAddFriendSubmit}
        render={({handleSubmit, pristine, invalid}) => (
          <div className="sign-form-cont">
            <form onSubmit={handleSubmit} className="sign-form">
              <div className="sign-form-header">
                <h1>Add friend</h1>
              </div>

              <Field name="username" component="input" placeholder="Username"/>

              <button type="button" className="red-button mr50" onClick={this.onCancel}>
                Cancel
              </button>
              <button type="submit" disabled={pristine || invalid || disableAddFriend}>
                Add
              </button>
            </form>
          </div>
        )}
      />
    );
  }
}