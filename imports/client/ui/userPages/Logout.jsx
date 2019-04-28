import React, {Component} from 'react';
import { Redirect } from 'react-router';

export default class Logout extends Component {
  state = {
    isLoading: true
  };

  componentWillMount() {
    Meteor.logout(() => {
      this.setState({isLoading: false});
    });
  }

  render() {
    const {isLoading} = this.state;

    if (isLoading) {
      return <div>Loading ...</div>
    }

    return <Redirect to="/login"/>
  }
}