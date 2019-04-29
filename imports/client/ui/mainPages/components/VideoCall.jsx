import React, {Component} from 'react';

export default class VideoCall extends Component {
  render() {
    return (
      <div className="video-call-cont">
        <div className="video-call">
          <div className="video-cont">
            <div className="call-request-cont">
              <div className="call-request">
                <div className="call-username">
                  <span>Friend 1 is calling...</span>
                </div>
                <div className="call-request-controls">
                  <button>
                    Accept
                  </button>
                  <button className="red-button">
                    Decline
                  </button>
                </div>
              </div>
            </div>
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
