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
    Meteor.call('sendFriendRequest', {username}, (err) => {
      if (err) {
        console.log(err);
      }
    });

    this.closeAddFriendModal();
  };

  onRequestAccept = ({username}) => {
    Meteor.call('acceptFriendRequest', {username}, (err) => {
      if (err) {
        console.log(err);
      }
    });
  };

  onRequestDecline = ({username}) => {
    Meteor.call('declineFriendRequest', {username}, (err) => {
      if (err) {
        console.log(err);
      }
    });
  };

  onFriendRemove = ({username}) => {
    Meteor.call('removeFriend', {username}, (err) => {
      if (err) {
        console.log(err);
      }
    });
  };

  onFriendCall = ({username}) => {
    if (this.props.onFriendCall) {
      this.props.onFriendCall({username});
    }
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
                  <li key={friend.username}>
                    <FriendListItem
                      username={friend.username}
                      onRemove={this.onFriendRemove}
                      onCall={this.onFriendCall}
                    />
                  </li>
                ))
              }
              {
                requests.map(request => (
                  <li key={request._id}>
                    <FriendListItem
                      username={request.from === user._id ? request.toUsername : request.fromUsername}
                      isRequest={true}
                      isWaiting={request.from === user._id}
                      onAccept={this.onRequestAccept}
                      onDecline={this.onRequestDecline}
                    />
                  </li>
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
      $ne: user._id
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
