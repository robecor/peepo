import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    const {user} = this.props;

    return (
      <div className="navbar-cont">
        <div className="navbar-header">
          <Link to="/">
            <h2>Peepo</h2>
          </Link>
        </div>
        <div className="navbar">
          <div className="navbar-dropdown">
            <button className="navbar-name">
              {user.username}
            </button>
            <div className="navbar-drop-content">
              {/*<div className="navbar-link">*/}
                {/*<Link to="/settings">Settings</Link>*/}
              {/*</div>*/}
              <div className="navbar-link">
                <Link to="/logout">Log out</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}