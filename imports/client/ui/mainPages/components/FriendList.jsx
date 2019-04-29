import React, {Component} from 'react';
import FriendListItem from './FriendListItem.jsx';

export default class FriendList extends Component {
  render() {
    return (
      <div className="friend-list-cont">
        <div className="friend-list">
          <div className="friend-list-controls">
            <button>
              Add friend
            </button>
          </div>
          <div className="friend-list-items">
            <ul>
              <li>
                <FriendListItem username="Friend 1"/>
              </li>
              <li>
                <FriendListItem username="Friend 2"/>
              </li>
              <li>
                <FriendListItem username="Friend 3" isRequest={true}/>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}