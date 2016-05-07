require('./flex-cards.scss');

import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { filterListings } from '../../search/SearchActions.js';

class ThreeCardRow extends Component {
  handleClick(query) {
    this.props.filterListings(query);
    $('body').scrollTo('#spaces');
  }

  render() {
    return (
      <div
        id='region-selector'
        className='container'>
        <h1
          className='display-3 section-title'
          id='region-selector-title'>Find a Great Office In</h1>
        <div
          className="cardGroup"
          id='region-selector-content'>
          <div
            role='button'
            onClick={ () => this.handleClick({
                        region: 'Houston'
                      }) }
            className='card cardGroup__card'
            id='card-houston'>
            <div className='filter' />
            <div className='card__description cardGroup__cardDescription'>
              <div className='card__descriptionText'>
                <a href='#spaces'><h1>HOUSTON</h1></a>
              </div>
            </div>
          </div>
          <div
            role='button'
            onClick={ () => this.handleClick({
                        region: 'Austin'
                      }) }
            className='card cardGroup__card'
            id='card-austin'>
            <div className='filter' />
            <div className="card__description cardGroup__cardDescription">
              <div className='card__descriptionText'>
                <h1>AUSTIN</h1>
              </div>
            </div>
          </div>
          <div
            role='button'
            onClick={ () => this.handleClick({
                        region: 'Denver'
                      }) }
            className='card cardGroup__card'
            id='card-denver'>
            <div className='filter' />
            <div className='card__description cardGroup__cardDescription'>
              <div className='card__descriptionText'>
                <h1>DENVER</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
  }
}
function mapStateToProps(state) {
  return {
    filteredListings: _.filter(state.listings.listings, _.matches(state.search.listingsFilter)) || []
  };
}

export default connect(mapStateToProps, {
  filterListings
})(ThreeCardRow);
