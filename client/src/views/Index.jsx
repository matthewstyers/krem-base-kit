require('./index.scss');

import React, { Component } from 'react';
import Footer from '../layout/Footer';
import Nav from '../layout/Nav';
import Section from '../layout/Section';

const BRAND = process.env.BRAND || 'NO BRAND :(';

export default class Index extends Component {

  render() {
    return (
      <div
        data-spy='scroll'
        data-target='#topNav'>
        <Nav brand={ BRAND } />
        <Section
          id='home'
          title='home'>
          <p className='lead'>
            This is a page section.
          </p>
        </Section>
        <Section
          id='main-content'
          title='MAIN CONTENT' />
        <Footer brand={ BRAND } />
      </div>
      );
  }
}
