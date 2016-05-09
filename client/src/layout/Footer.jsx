require('./footer.scss');

import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Footer extends Component {
  render() {
    return (
      <nav className="navbar navbar-bottom navbar-dark">
        <i
          className='fa fa-copyright'
          aria-hidden='true' />&nbsp;2016&nbsp;
        { this.props.brand }, All Rights Reserved. Powered by
        <Link
          to='http://abstractmediaco.com'
          target='_blank'> Abstract Media.
        </Link>
      </nav>
      );
  }
}
