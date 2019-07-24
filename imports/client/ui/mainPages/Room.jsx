import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import Peer from 'peerjs';
import RoomVideo from './components/RoomVideo.jsx';

class Room extends Component {
  state = {
    callList: [],
    mainCallPeerId: null
  };

  componentDidMount() {
    this.callingList = [];
    this.peer = new Peer();

    this.peer.on('connection', (connection) => {
      const {userId} = connection.metadata;
      const peerId = connection.peer;

      this.addConnectionToParticipant(userId, connection);

      connection.on('data', (data) => {
        this.onConnectionData(data, peerId);
      });
    });

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
            this.addParticipant(userId, username, peerId, call, null, remoteStream);
          });
          call.on('close', () => {
            this.removeParticipant(peerId);
          });
        });

        Meteor.call('getRoomParticipants', {roomId}, (err, participants) => {
          participants.forEach(participant => {
            const {userId, peerId: participantPeerId} = participant;

            if (userId === user._id || this.callingList.includes(peerId)) {
              return;
            }

            // Flag the fact that we are calling this peer already
            this.callingList.push(participantPeerId);

            const call = this.peer.call(participantPeerId, stream, {
              metadata: {
                userId: user._id,
                username: user.username
              }
            });

            call.on('stream', (remoteStream) => {
              const connection = this.peer.connect(participantPeerId, {
                metadata: {
                  userId: user._id,
                  username: user.username
                }
              });

              connection.on('data', (data) => {
                this.onConnectionData(data, participantPeerId);
              });

              this.callingList = this.callingList.filter(item => item !== participantPeerId);
              this.addParticipant(participant.userId, participant.username, participantPeerId, call, connection, remoteStream);
            });
            call.on('close', () => {
              this.removeParticipant(participantPeerId);
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
    const {callList} = this.state;
    const {match} = this.props;
    const roomId = match.params.roomId;
    const peerId = this.peer.id;

    if (this.localStream) {
      this.localStream.getTracks().forEach(track => {
        track.stop();
      });

      this.localStream = null;
    }

    callList.forEach(call => {
      if (call.connection) {
        call.connection.send('peepo__end_call');
      }
    });

    Meteor.call('leaveRoom', {roomId, peerId});
  }

  addParticipant(userId, username, peerId, call, connection, stream) {
    this.setState((state, props) => {
      const {callList} = state;
      const returnObject = {};

      const filteredList = callList.filter(call => call.userId !== userId);

      filteredList.push({
        userId,
        username,
        peerId,
        call,
        connection,
        stream
      });

      returnObject.callList = filteredList;

      if (filteredList.length === 1) {
        returnObject.mainCallPeerId = peerId;
      }

      return returnObject;
    });
  }

  removeParticipant(peerId) {
    this.setState((state, props) => {
      const {callList, mainCallPeerId} = state;
      const returnObject = {};

      const toRemoveCall = callList.find(call => call.peerId === peerId);
      const newCallList = callList.filter(call => call.peerId !== peerId);

      if (!toRemoveCall) {
        return {};
      }

      if (toRemoveCall.call) {
        toRemoveCall.call.close();
      }
      if (toRemoveCall.connection) {
        toRemoveCall.connection.close();
      }

      returnObject.callList = newCallList;

      if (peerId === mainCallPeerId) {
        returnObject.mainCallPeerId = newCallList[0] ? newCallList[0].peerId : null;
      }

      return returnObject;
    });
  }

  addConnectionToParticipant(userId, connection) {
    this.setState((state, props) => {
      const {callList} = state;

      callList.forEach(call => {
        if (call.userId === userId) {
          call.connection = connection;
        }
      });

      return callList;
    });
  }

  onConnectionData(data, peerId) {
    if (data === 'peepo__end_call') {
      this.removeParticipant(peerId);
    }
  }

  leaveRoom = () => {
    const {history} = this.props;
    history.push('/');
  };

  onVideoClick = (peerId) => {
    this.setState({mainCallPeerId: peerId});
  };

  render() {
    const {callList, mainCallPeerId} = this.state;
    const mainCall = callList.find(callItem => callItem.peerId === mainCallPeerId);
    const filteredList = callList.filter(callItem => callItem.peerId !== mainCallPeerId);

    return (
      <div className="dashboard-cont">
        <div className="dashboard">
          <div className="video-room-cont">
            <div className="video-list">
              {
                filteredList.map(callItem => {
                  return (
                    <RoomVideo key={callItem.peerId}
                               username={callItem.username}
                               stream={callItem.stream}
                               peerId={callItem.peerId}
                               onVideoClick={this.onVideoClick}/>
                  );
                })
              }
            </div>
            <div className="room-main-video">
              {
                mainCall ?
                  <RoomVideo username={mainCall.username} stream={mainCall.stream}/>
                  :
                  ''
              }
              <div className="room-main-controls">
                <button className="red-button" onClick={this.leaveRoom}>
                  Leave room
                </button>
              </div>
            </div>
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
