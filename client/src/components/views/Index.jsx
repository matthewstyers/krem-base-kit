require('./index.scss');
require('../utils/backgroundVideo/backgroundVideo.scss');

import React, { Component } from 'react';

import BackgroundVideo from '../utils/backgroundVideo/BackgroundVideo';
import ContactForm from '../contact/ContactForm';
import ListingDeck from '../listings/ListingDeck';
import Nav from '../layout/Nav';
import Footer from '../layout/Footer';
import PhotoGrid from '../utils/PhotoGrid';
import AboutTom from '../about/AboutTom';
import ThreeCardRow from '../layout/flexbox/ThreeCardRow';
import Section from '../layout/Section';
export default class Index extends Component {

  render() {
    return (
      <div
        data-spy='scroll'
        data-target='#topNav'>
        <Nav brand='New Line Properties' />
        <BackgroundVideo />
        <ThreeCardRow />
        <Section
          sectionType='light'
          id='spaces'
          title='spaces'>
          <ListingDeck/>
        </Section>
        <Section
          sectionType='light'
          id='work'
          title='work'>
          <PhotoGrid/>
        </Section>
        <Section
          sectionType='light'
          id='about'
          title='about'>
          <AboutTom />
        </Section>
        <Section
          sectionType='light'
          id='contact'
          title='contact'>
          <ContactForm/>
        </Section>
        <Footer />
      </div>
      );
  }
}
