import React, {Component} from 'react';
import Peer from 'peerjs';
import {createContainer} from 'meteor/react-meteor-data';
import CallRequests from '/imports/db/call-requests/collection.js';

class VideoCall extends Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    this.peer = new Peer();

    this.props.onPeerReady(this.peer);

    this.peer.on('call', (call) => {
      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      }).then((stream) => {
        call.answer(stream);
        call.on('stream', (remoteStream) => {
          this.videoRef.current.srcObject = remoteStream;
          this.videoRef.current.play();
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  acceptCall = () => {
    const {request} = this.props;

    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    }).then((stream) => {
      const call = this.peer.call(request.peerId, stream);
      call.on('stream', (remoteStream) => {
        console.log(remoteStream)
        this.videoRef.current.srcObject = remoteStream;
        this.videoRef.current.play()
      });
    }).catch((err) => {
      console.log(err);
    });
  };

  closeCallRequest = () => {
    const {request} = this.props;

    Meteor.call('removeCallRequest', {requestId: request._id}, (err) => {
      if (err) {
        console.log(err);
      }
    });
  };

  render() {
    const {request, user} = this.props;

    return (
      <div className="video-call-cont">
        <div className="video-call">
          <div className="video-cont">
            <video ref={this.videoRef}/>
            {
              request ?
                <div className="call-request-cont">
                  <div className="call-request">
                    <div className="call-username">
                      {
                        request.from === user._id ?
                          <span>Calling {request.toUsername}</span>
                          :
                          <span>{request.fromUsername} is calling...</span>
                      }
                    </div>
                    {
                      request.from !== user._id ?
                        <div className="call-request-controls">
                          <button onClick={this.acceptCall}>
                            Accept
                          </button>
                          <button className="red-button" onClick={this.closeCallRequest}>
                            Decline
                          </button>
                        </div>
                        :
                        <div className="call-request-controls">
                          <button className="red-button" onClick={this.closeCallRequest}>
                            Cancel
                          </button>
                        </div>
                    }
                  </div>
                </div>
                :
                null

            }
          </div>

          <div className="video-controls">
            <button className="red-button">
              End
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default createContainer((props) => {
  Meteor.subscribe('call-requests');

  const request = CallRequests.findOne();

  return {
    request,
    ...props
  }
}, VideoCall);
