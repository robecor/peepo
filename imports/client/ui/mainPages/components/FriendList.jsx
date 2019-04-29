import React, {Component} from 'react';
import FriendListItem from './FriendListItem.jsx';
import Modal from 'react-modal';
import AddFriend from './AddFriend.jsx';
import {createContainer} from 'meteor/react-meteor-data';
import FriendRequests from '/imports/db/friend-requests/collection.js';

class FriendList extends Component {
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
    const {friends, requests, user} = this.props;

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
              {
                friends.map(friend => (
                  <FriendListItem username={friend.username}/>
                ))
              }
              {
                requests.map(request => (
                  <FriendListItem
                    username={request.username}
                    isRequest={true}
                    isWaiting={request.from === user._id}
                  />
                ))
              }
            </ul>
          </div>
        </div>

        <Modal
          isOpen={addFriendModalOpen}
          onRequestClose={this.closeAddFriendModal}
          contentLabel="Add friend"
          className="app-modal"
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

export default createContainer((props) => {
  Meteor.subscribe('friend-requests');
  Meteor.subscribe('friends');

  const user = props.user;
  const friends = Meteor.users.find({
    _id: {
      $in: user.friends || []
    }
  }).fetch();
  const requests = FriendRequests.find({
    $or: [
      {
        to: user._id
      },
      {
        from: user._id
      }
    ]
  }).fetch();

  return {
    friends,
    requests,
    ...props
  }
}, FriendList);
