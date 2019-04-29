import React, {Component} from 'react';
import Peer from 'peerjs';
import {createContainer} from 'meteor/react-meteor-data';
import CallRequests from '/imports/db/call-requests/collection.js';

class VideoCall extends Component {
  componentDidMount() {
    this.peer = new Peer();

    this.props.onPeerReady(this.peer);
  }

  acceptCall = () => {

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
                          <button>
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
