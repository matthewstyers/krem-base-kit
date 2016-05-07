

import React, { Component } from 'react';
import ListingModal from './ListingModal';
import { Link } from 'react-router';

require('./listings.scss');

export default class ListingCard extends Component {
  renderAddressLine2(address) {
    return (
      <span>{ address.street2 } <br /></span>

      );
  }
  render() {
    const listing = this.props.listing;
    const FEATURE_IMAGE_URL = listing.featureImage ? `/space-images/${listing.featureImage.filename}` : 'http://placehold.it/350';
    const MODAL_ID = `#${listing._id}`;
    return (
      <div
        className="col-lg-4 col-md-6 col-sm-12"
        key={ listing._id }>
        <div className='card listing-card'>
          <div className='card-img-container'>
            <img
              src={ FEATURE_IMAGE_URL }
              className="card-img-top" />
          </div>
          <div className='card-block'>
            <a
              data-target={ MODAL_ID }
              data-toggle='modal'><h2 className='card-title'>{ listing.title }</h2> <div> { listing.address.street1 } <br /> { listing.address.street2 ? this.renderAddressLine2(listing.address) : '' } { listing.address.suburb }, { listing.address.state } { listing.address.postcode } <br/> </div></a>
          </div>
        </div>
        <div id='listing-modal'>
          <ListingModal listing={ listing } />
        </div>
      </div>
      );
  }
}
