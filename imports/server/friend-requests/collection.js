import FriendRequestsSchema from './schema';

const FriendRequests = new Mongo.Collection('friend-requests');

FriendRequests.attachSchema(FriendRequestsSchema);

export default FriendRequests;
