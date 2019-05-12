import React, {Component} from 'react';
import Peer from 'peerjs';
import {createContainer} from 'meteor/react-meteor-data';
import CallRequests from '/imports/db/call-requests/collection.js';
import Loader from '/imports/client/ui/utils/Loader.jsx';

class VideoCall extends Component {
  state = {
    videoIsLoading: false
  };

  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    this.peer = new Peer();

    this.props.onPeerReady(this.peer);

    this.peer.on('call', (call) => {
      this.currentCall = call;

      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      }).then((stream) => {
        this.localStream = stream;

        this.setState({videoIsLoading: true});

        call.answer(stream);
        call.on('stream', this.onCallStream);
        call.on('close', this.onCallClose);

        Session.set('is_in_call', true);
      }).catch((err) => {
        console.log(err);
      });
    });

    this.peer.on('connection', (connection) => {
      this.currentConnection = connection;

      this.currentConnection.on('data', this.handleConnectionData);
    })
  }

  handleConnectionData = (data) => {
    if (data === 'peepo__end_call') {
      this.onCallClose();
    }
  };

  acceptCall = () => {
    const {request} = this.props;
    const requestId = request.peerId;

    this.closeCallRequest();

    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    }).then((stream) => {
      this.localStream = stream;

      this.setState({videoIsLoading: true});

      const call = this.peer.call(requestId, stream);
      this.currentCall = call;

      call.on('stream', this.onCallStream);
      call.on('close', this.onCallClose);
      Session.set('is_in_call', true);

      this.currentConnection = this.peer.connect(requestId);
      this.currentConnection.on('data', this.handleConnectionData);
    }).catch((err) => {
      console.log(err);
    });
  };

  onCallStream = (remoteStream) => {
    this.videoRef.current.srcObject = remoteStream;
    this.videoRef.current.play();
    this.setState({videoIsLoading: false});
  };

  onCallClose = () => {
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => {
        track.stop();
      });

      this.localStream = null;
    }
    if (this.currentCall) {
      this.currentCall.close();
    }
    if (this.currentConnection) {
      this.currentConnection.close();
    }

    this.videoRef.current.srcObject = null;
    this.videoRef.current.pause();
    this.videoRef.current.removeAttribute('src');
    this.videoRef.current.load();
    Session.set('is_in_call', false);
  };

  closeCallRequest = () => {
    const {request} = this.props;

    Meteor.call('removeCallRequest', {requestId: request._id}, (err) => {
      if (err) {
        console.log(err);
      }
    });
  };

  endCall = () => {
    this.currentConnection.send('peepo__end_call');

    setTimeout(() => {
      this.onCallClose();
    }, 100);
  };

  render() {
    const {videoIsLoading} = this.state;
    const {request, user} = this.props;

    return (
      <div className="video-call-cont">
        <div className="video-call">
          <div className="video-cont">
            {videoIsLoading && <Loader/>}
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
            <button className="red-button" onClick={this.endCall}>
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
