require('./search.scss');

import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { filterListings } from './SearchActions';
import Selector from './Selector';
export const fields = ['region', 'property', 'isAvailable'];

class ListingSearch extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  getFilteredListings(query) {
    this.props.filterListings(_.omitBy(query, _.isEmpty));
  }

  getSelectorOptions(props, option) {
    return _.uniq(_.filter(_.map(_.map(props.listings, option), 'name'), (index) => {
      return _.isString(index);
    }));
  }
  render() {
    const cities = this.getSelectorOptions(this.props, 'region');
    const properties = this.getSelectorOptions(this.props, 'property');
    const availability = ['Available Now', 'Available Soon', 'Both'];
    const {fields: {region, property, isAvailable}, handleSubmit} = this.props;
    return (
      <div
        className='row'
        id='listing-search'>
        <div className='col col-lg-12'>
          <form className='form-inline'>
            <Selector
              {...region}
              options={ cities }
              id='listingSearchCitySelector'
              placeholder='City'
              value={ region.value || '' }
              submitOnChange='true'
              handleSubmit={ handleSubmit(this.getFilteredListings.bind(this)) } />
            <Selector
              {...property}
              options={ properties }
              id='lisitngSearchPropertySelector'
              placeholder='Property'
              value={ property.value || '' }
              submitOnChange='true'
              handleSubmit={ handleSubmit(this.getFilteredListings.bind(this)) } />
            <Selector
              {...isAvailable}
              options={ availability }
              id='listingSearchAvailabilitySelector'
              placeholder='Availability'
              value={ isAvailable.value || '' }
              submitOnChange='true'
              handleSubmit={ handleSubmit(this.getFilteredListings.bind(this)) } />
          </form>
        </div>
      </div>
      );
  }
}

export default reduxForm({
  form: 'LocationSearch',
  fields
},
  (state) => ({
    initialValues: state.search.updateFormFields
  })
  , {
    filterListings
  })(ListingSearch);
