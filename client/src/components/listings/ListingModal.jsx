require('./listings.scss');
import React, { Component } from 'react';
import SlideShow from '../utils/SlideShow';
import GoogleMap from '../utils/Google_Map';
import ContactForm from '../contact/ContactForm';
// import moment from 'moment';

export default class ListingModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      showMap: false,
      requestInfo: false
    };
  }
  renderFeatures(features) {
    return (
    features.map((feature) => {
      return (
        <li key={ feature }>
          { feature }
        </li>
        );
    })
    );
  }
  componentDidMount() {
    // console.log('modal opened by default for development.');
    // $('#570faf302dafede30220c400').modal('show');
  }
  renderGoogleMap(geo) {
    if (this.state.showMap) {
      return (
        <GoogleMap
          lon={ geo[0] }
          lat={ geo[1] } />
        );
    }
    return null;
  }

  render() {
    const listing = this.props.listing;
    return (
      <div
        className={ 'modal fade listing-modal' }
        id={ listing._id }
        tabIndex='-1'
        role='dialog'
        aria-labelledby='myModalLabel'
        aria-hidden='true'>
        <div
          className='modal-dialog'
          role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
              <div
                key={ listing._id }
                className='btn-toolbar text-xs-left'>
                <ul
                  className='nav nav-tabs'
                  role='tablist'>
                  <li className='nav-item'>
                    <button
                      type='button'
                      className='btn btn-warning'
                      data-toggle='tab'
                      data-target={ `#${listing._id}-contact` }
                      role='tab'
                      onClick={ () => {
                                  this.setState({
                                    requestInfo: true
                                  });
                                } }>
                      <i
                        className='fa fa-info-circle fa-left'
                        aria-hidden='true' /> Request Info
                    </button>
                  </li>
                  <li className='nav-item'>
                    <button
                      type='button'
                      className='btn btn-success'
                      data-toggle='tab'
                      data-target='#nothing'
                      role='tab'
                      disabled={ !listing.isAvailable }>
                      <i
                        className='fa fa-calendar fa-left'
                        aria-hidden='true'></i> Schedule Showing
                    </button>
                  </li>
                  <li className='nav-item'>
                    <button
                      type='button'
                      className='btn btn-danger'
                      data-toggle='tab'
                      data-target={ `#${listing._id}-images` }
                      role='tab'
                      onClick={ () => {
                                  if (this.state.requestInfo) {
                                    this.setState({
                                      requestInfo: !this.state.requestInfo
                                    });
                                  } else {
                                    this.setState({
                                      showMap: !this.state.showMap
                                    });
                                  }
                                } }>
                      <i
                        className={ this.state.requestInfo ? (this.state.showMap ? 'fa fa-left fa-map-marker' : 'fa fa-left fa-picture-o') : (this.state.showMap ? 'fa fa-left fa-picture-o' : 'fa fa-left fa-map-marker') }
                        aria-hidden='true' />
                      { this.state.requestInfo ? (this.state.showMap ? 'Map' : 'Photos') : (this.state.showMap ? 'Photos' : 'Map') }
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className='modal-body'>
              <div className='row'>
                <div className='col-lg-6 col-md-12
                                                                                                                                                                                            '>
                  <div className='tab-content'>
                    <div
                      className='tab-pane active'
                      id={ `${listing._id}-images` }
                      role='tabpanel'>
                      <div
                        className={ this.state.showMap ? 'hidden' : 'active' }
                        id='modal-gallery-or-map'>
                        <SlideShow
                          images={ listing.images }
                          id={ listing._id + '-carousel' } />
                      </div>
                      <div
                        className={ this.state.showMap ? 'active' : 'hidden' }
                        id='modal-gallery-or-map'>
                        { this.renderGoogleMap(listing.address.geo) }
                      </div>
                      <p className='lead'>
                        { listing.description }
                      </p>
                    </div>
                    <div
                      className='tab-pane'
                      id={ `${listing._id}-contact` }
                      role='tabpanel'>
                      <p
                        className='lead'
                        id='contactFormHeading'>
                        Get more information about
                        { listing.title || listing.address.street2 ? `${listing.title || listing.address.street2}` : 'this space' }
                      </p>
                      <ContactForm
                        id={ listing._id }
                        listing={ listing } />
                    </div>
                  </div>
                </div>
                <div className='col-lg-6 col-md-12'>
                  <ul className='list-group'>
                    <li className='list-group-item'>
                      <h1>{ listing.name ? listing.name : listing.address.street2 }</h1>
                    </li>
                    <li className='list-group-item'>
                      Availability
                      <span className={ `pull-xs-right label label-${listing.isAvailable ? 'success' : 'warning'}` }>{ listing.isAvailable ? 'Available Now' : 'Available Soon' }</span>
                    </li>
                    <li className='list-group-item'>
                      Property
                      <span className='pull-xs-right listing-spec'>{ listing.property ? listing.property.name : 'Standalone Office' }</span>
                    </li>
                    <li className='list-group-item'>
                      Location
                      <span className='text-xs-right pull-xs-right listing-spec'>{ listing.address.suburb }, { listing.address.state }</span>
                    </li>
                    <li className='list-group-item'>
                      Size
                      <span className='pull-xs-right listing-spec'>{ listing.squareFeet } ft.<sup>2</sup></span>
                    </li>
                    <li className='list-group-item'>
                      Price
                      <span className='pull-xs-right listing-spec'>${ listing.listPrice } per ft.<sup>2</sup> per yr.</span>
                    </li>
                    <li className='list-group-item'>
                      <h3>Key Features</h3>
                      <ul className='list-unstyled'>
                        { this.renderFeatures(listing.keyFeatures) }
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
  }
}
