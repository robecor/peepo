import React, {Component} from 'react';

export default class FriendListItem extends Component {
  onAccept = () => {
    const {username} = this.props;

    if (this.props.onAccept) {
      this.props.onAccept({username});
    }
  };

  onDecline = () => {
    const {username} = this.props;

    if (this.props.onDecline) {
      this.props.onDecline({username});
    }
  };

  onRemove = () => {
    const {username} = this.props;

    if (this.props.onRemove) {
      this.props.onRemove({username});
    }
  };

  onCall = () => {
    const {username} = this.props;

    if (this.props.onCall) {
      this.props.onCall({username});
    }
  };

  showCallButton() {
    const {isOnline, isInCall} = this.props;

    return isOnline && !isInCall;
  }

  render() {
    const {username, isRequest, isWaiting, isOnline} = this.props;

    return (
      <div className="fiend-list-item">
        <div className="friend-item-username">
          <span>{username}</span>
          <div className={`online-status ${isOnline ? 'online' : 'offline'}`}/>
        </div>
        {
          isRequest ?
            isWaiting ?
              <div className="friend-items-waiting">
                <span>Waiting for response</span>
              </div>
              :
              <div className="friend-items-controls">
                <button onClick={this.onAccept}>
                  Accept
                </button>
                <button className="red-button" onClick={this.onDecline}>
                  Decline
                </button>
              </div>
            :

            <div className="friend-items-controls">
              {
                this.showCallButton() &&
                <button onClick={this.onCall}>
                  Call
                </button>
              }
              <button className="red-button" onClick={this.onRemove}>
                Remove
              </button>
            </div>
        }
      </div>
    );
  }
}