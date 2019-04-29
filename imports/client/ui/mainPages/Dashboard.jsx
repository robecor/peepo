import React, {Component} from 'react';
import FriendList from './components/FriendList.jsx';
import VideoCall from './components/VideoCall.jsx';

export default class Dashboard extends Component {
  render() {
    const {user} = this.props;

    return (
      <div className="dashboard-cont">
        <div className="dashboard">
          <FriendList user={user}/>
          <VideoCall/>
        </div>
      </div>
    );
  }
}