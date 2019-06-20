import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import Peer from 'peerjs';
import RoomVideo from './components/RoomVideo.jsx';

class Room extends Component {
  state = {
    callList: []
  };

  componentDidMount() {
    this.callingList = [];
    this.peer = new Peer();

    this.peer.on('open', () => {

      const peerId = this.peer.id;
      const {match, user} = this.props;
      const roomId = match.params.roomId;

      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      }).then((stream) => {
        this.localStream = stream;

        this.peer.on('call', (call) => {
          const peerId = call.peer;
          const userId = call.metadata.userId;
          const username = call.metadata.username;

          call.answer(stream);
          call.on('stream', (remoteStream) => {
            this.addParticipant(userId, username, peerId, call, remoteStream);
          });
          call.on('close', () => {
            this.removeParticipant(userId);
          });
        });

        Meteor.call('getRoomParticipants', {roomId}, (err, participants) => {
          participants.forEach(participant => {
            const {userId, peerId} = participant;

            if (userId === user._id || this.callingList.includes(peerId)) {
              return;
            }

            // Flag the fact that we are calling this peer already
            this.callingList.push(peerId);

            const call = this.peer.call(participant.peerId, stream, {
              metadata: {
                userId: user._id,
                username: user.username
              }
            });

            call.on('stream', (remoteStream) => {
              this.callingList = this.callingList.filter(item => item !== peerId);
              this.addParticipant(participant.userId, participant.username, participant.peerId, call, remoteStream);
            });
            call.on('close', () => {
              this.removeParticipant(participant.userId);
            });
          });
        });

        Meteor.call('joinRoom', {roomId, peerId}, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  componentWillUnmount() {
    const {match} = this.props;
    const roomId = match.params.roomId;
    const peerId = this.peer.id;

    Meteor.call('leaveRoom', {roomId, peerId});
  }

  addParticipant(userId, username, peerId, call, stream) {
    this.setState((state, props) => {
      const {callList} = state;

      const filteredList = callList.filter(call => call.userId !== userId);

      filteredList.push({
        userId,
        username,
        peerId,
        call,
        stream
      });

      return {callList: filteredList};
    });
  }

  removeParticipant(userId) {
    this.setState((state, props) => {
      const {callList} = state;

      const newCallList = callList.filter(call => call.userId !== userId);

      return {callList: newCallList};
    });
  }

  render() {
    const {callList} = this.state;

    return (
      <div>
        <div className="dashboard-cont">
          <div className="dashboard">
            {
              callList.map(callItem => {
                return (
                  <RoomVideo key={callItem.peerId} username={callItem.username} stream={callItem.stream}/>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default createContainer((props) => {
  const user = Meteor.user();

  return {
    user,
    ...props
  }
}, Room);
