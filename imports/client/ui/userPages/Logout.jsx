import React, {Component} from 'react';
import { Redirect } from 'react-router';
import Loader from '/imports/client/ui/utils/Loader.jsx';

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
      return <Loader/>;
    }

    return <Redirect to="/login"/>
  }
}