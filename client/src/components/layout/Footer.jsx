require('./footer.scss');

import React, { Component } from 'react';
import { Link } from 'react-router';
export default class Footer extends Component {
  render() {
    return (
      <nav className="navbar navbar-bottom navbar-dark">
        <i
          className='fa fa-copyright'
          aria-hidden='true' />&nbsp;2016 NLP, All Rights Reserved. Powered by
        <Link
          to='http://abstractmediaco.com'
          target='_blank'> Abstract Media.
        </Link>
        <Link
          className="nav-item nav-link pull-xs-right btn btn-sm btn-warning-outline"
          to="/tenets"> Tenet Login
        </Link>
      </nav>
      );
  }
}
