require('./nav.scss');

import React, { Component } from 'react';

export default class Nav extends Component {
  render() {
    return (
      <nav
        id='topNav'
        className='navbar navbar-default navbar-fixed-top'>
        <div className='container'>
          <div className='nav-hamburger hidden-md-up'>
            <button
              type='button'
              data-toggle='collapse'
              data-target='#bs-navbar'
              className='navbar-toggler hidden-sm-up'>
              <i className='fa fa-bars'></i>
              <span className='sr-only'>Toggle navigation</span>
            </button>
          </div>
          <div
            id='bs-navbar'
            className='navbar-collapse collapse navbar-toggleable-sm'>
            <ul className='nav navbar-nav nav-pills nav-pills-danger muted'>
              <li className='nav-item active'>
                <a
                  href='#home'
                  className='nav-link page-scroll navbar-brand'><i className='fa fa-home fa-left'></i> { this.props.brand }</a>
              </li>
              <li className='nav-item'>
                <a
                  href='#main-content'
                  className='nav-link'>Main Content</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      );
  }
}
