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
  username: {
    type: String,
    optional: false
  },
  createdOn: {
    type: Date,
    defaultValue: new Date()
  }
});