import React, {Component} from 'react';

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
                <div className="fiend-list-item">
                  <div className="friend-item-username">
                    <span>Friend 1</span>
                  </div>
                  <div className="friend-items-controls">
                    <button>
                      Call
                    </button>
                    <button className="red-button">
                      Remove
                    </button>
                  </div>
                </div>
              </li>
              <li>
                <div className="fiend-list-item">
                  <div className="friend-item-username">
                    <span>Friend 2</span>
                  </div>
                  <div className="friend-items-controls">
                    <button>
                      Call
                    </button>
                    <button className="red-button">
                      Remove
                    </button>
                  </div>
                </div>
              </li>
              <li>
                <div className="fiend-list-item">
                  <div className="friend-item-username">
                    <span>Friend 3</span>
                  </div>
                  <div className="friend-items-controls">
                    <button>
                      Call
                    </button>
                    <button className="red-button">
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}