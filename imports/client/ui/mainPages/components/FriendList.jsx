import React, {Component} from 'react';
import FriendListItem from './FriendListItem.jsx';
import Modal from 'react-modal';
import AddFriend from './AddFriend.jsx';

export default class FriendList extends Component {
  state = {
    addFriendModalOpen: false,
    disableAddFriend: false
  };

  openAddFriendModal = () => {
    this.setState({addFriendModalOpen: true});
  };

  closeAddFriendModal = () => {
    this.setState({addFriendModalOpen: false});
  };

  onAddFriendSubmit = ({username}) => {
    console.log(username);

    this.closeAddFriendModal();
  };

  render() {
    const {addFriendModalOpen, disableAddFriend} = this.state;

    return (
      <div className="friend-list-cont">
        <div className="friend-list">
          <div className="friend-list-controls">
            <button onClick={this.openAddFriendModal}>
              Add friend
            </button>
          </div>
          <div className="friend-list-items">
            <ul>
              <li>
                <FriendListItem username="Friend 1"/>
              </li>
              <li>
                <FriendListItem username="Friend 2"  isRequest={true} isWaiting={true}/>
              </li>
              <li>
                <FriendListItem username="Friend 3" isRequest={true}/>
              </li>
            </ul>
          </div>
        </div>

        <Modal
          isOpen={addFriendModalOpen}
          onRequestClose={this.closeAddFriendModal}
          contentLabel="Add friend"
          className="app-modal"
          // overlayClassName="Overlay"
        >
          <AddFriend
            onAddFriendSubmit={this.onAddFriendSubmit}
            onCancel={this.closeAddFriendModal}
            disableSubmit={disableAddFriend}
          />
        </Modal>
      </div>
    );
  }
}