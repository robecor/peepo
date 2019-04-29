import React, {Component} from 'react';
import FriendList from './components/FriendList.jsx';
import VideoCall from './components/VideoCall.jsx';

export default class Dashboard extends Component {
  onFriendCall = ({username}) => {
    Meteor.call('callUser', {username, peerId: this.peer.id}, (err) => {
      if (err) {
        console.log(err);
      }
    })
  };

  onPeerReady = (peer) => {
    this.peer = peer;
  };

  render() {
    const {user} = this.props;

    return (
      <div className="dashboard-cont">
        <div className="dashboard">
          <FriendList user={user} onFriendCall={this.onFriendCall}/>
          <VideoCall user={user} onPeerReady={this.onPeerReady}/>
        </div>
      </div>
    );
  }
}