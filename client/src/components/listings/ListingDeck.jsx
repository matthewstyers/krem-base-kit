require('./listings.scss');

import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ListingCard from './ListingCard';
import ListingSearch from '../search/ListingSearch';
import { fetchListings } from './actions';

class ListingDeck extends Component {
  componentWillMount() {
    this.props.fetchListings();
  }

  renderListings() {
    const listings = this.props.filteredListings.length ? this.props.filteredListings : this.props.listings;
    if (!listings.length) {
      return (
        <div>
          LOADING
        </div>
        );
    }
    return listings.map((listing) => {
      return (
        <ListingCard
          listing={ listing }
          key={ listing._id } />
        );
    });
  }

  render() {
    return (
      <div>
        <ListingSearch listings={ this.props.filteredListings } />
        <div className='card-deck'>
          <div className='row'>
            { this.renderListings() }
          </div>
        </div>
      </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    listings: state.listings,
    filteredListings: _.filter(state.listings.listings, _.matches(state.search.listingsFilter)) || []
  };
}

export default connect(mapStateToProps, {
  fetchListings
})(ListingDeck);
