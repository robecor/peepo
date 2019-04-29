import SimpleSchema from 'simpl-schema';

export default new SimpleSchema({
  from: {
    type: String,
    optional: false
  },
  to: {
    type: String,
    optional: false
  },
  toUsername: {
    type: String,
    optional: false
  },
  fromUsername: {
    type: String,
    optional: false
  },
  createdOn: {
    type: Date,
    defaultValue: new Date()
  },
  peerId: {
    type: String,
    optional: false
  }
});