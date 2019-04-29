import React, {Component} from 'react';

export default class FriendListItem extends Component {
  render() {
    const {username, isRequest, isWaiting} = this.props;

    return (
      <div className="fiend-list-item">
        <div className="friend-item-username">
          <span>{username}</span>
        </div>
        {
          isRequest ?
            isWaiting ?
              <div className="friend-items-waiting">
                <span>Waiting for response</span>
              </div>
                :
            <div className="friend-items-controls">
              <button>
                Accept
              </button>
              <button className="red-button">
                Decline
              </button>
            </div>
            :

            <div className="friend-items-controls">
              <button>
                Call
              </button>
              <button className="red-button">
                Remove
              </button>
            </div>
        }
      </div>
    );
  }
}