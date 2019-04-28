import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import App from '/imports/client/ui/App.jsx';

Meteor.startup(() => {
  render(< App />, document.getElementById('main-app')
  );
});
