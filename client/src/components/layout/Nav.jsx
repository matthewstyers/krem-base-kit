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
                  href='#first'
                  className='nav-link page-scroll navbar-brand'><i className='fa fa-home fa-left'></i> { this.props.brand }</a>
              </li>
              <li className='nav-item'>
                <a
                  href='#spaces'
                  className='nav-link'>Spaces</a>
              </li>
              <li className='nav-item'>
                <a
                  href='#work'
                  className='nav-link'>Work</a>
              </li>
              <li className='nav-item'>
                <a
                  href="#about"
                  className="nav-link">About</a>
              </li>
              <li className='nav-item'>
                <a
                  href='#contact'
                  className='nav-link'>Contact</a>
              </li>
              <a
                data-toggle='modal'
                title='Contact Tom Phillips'
                href='#aboutModal'
                id='topNavContact'
                className='nav-item nav-link page-scroll pull-xs-right hidden-md-down'>1.866.NEW-LINE</a>
            </ul>
          </div>
        </div>
      </nav>
      );
  }
}
