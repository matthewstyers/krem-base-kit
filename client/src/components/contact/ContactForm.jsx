require('./contact.scss');

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, reset } from 'redux-form';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import Selector from '../search/Selector';

import { createInquiry } from './actions';

class ContactForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      submitStatus: false
    };
  }

  onSubmit(props) {
    const transformedProps = _.transform(props, (result, value, key) => {
      if (key === 'name') {
        result['name.full'] = value;
      } else if (key === 'suite') {
        result[key] = _.isUndefined(value) && this.props.listing ? this.props.listing._id : undefined;
      } else {
        result[key] = value;
      }
    });

    this.props.createInquiry(transformedProps).then(() => {
      this.props.resetForm();
      this.setState({
        submitStatus: true
      });
    });
  }
  renderStatus() {

    if (this.state.submitStatus) {
      return (
        <div>
          Your inquiry has been submitted.&nbsp;
          <a
            role='button'
            onClick={ () => {
                        this.setState({
                          submitStatus: !this.state.submitStatus
                        });
                      } }>Send Another?</a>
        </div>
        );
    }
    return (
      <button
        id="submit"
        type='submit'
        className='btn btn-secondary-outline btn-lg'>
        Send&ensp;
        <i className='ion-android-arrow-forward' />
      </button>
      );
  }

  render() {
    const {fields: {name, email, phone, suite, message}, handleSubmit, resetForm} = this.props;
    return (
      <div className='row'>
        <div className="col-lg-12">
          <form
            id='contactForm'
            onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
            <fieldset className={ `form-group ${name.touched && name.invalid ? 'has-danger' : ''}` }>
              <label
                forHtml='name'
                className='sr-only'>
                Name
              </label>
              <input
                type="text"
                id='name'
                className="form-control form-control-lg"
                placeholder="Name"
                {...name}/>
              <div className="text-help">
                { name.touched ? name.error : '' }
              </div>
            </fieldset>
            <fieldset className={ `form-group ${email.touched && email.invalid ? 'has-danger' : ''}` }>
              <label
                forHtml='email'
                className='sr-only'>
                Email
              </label>
              <input
                type="text"
                id='email'
                className="form-control form-control-lg"
                placeholder="Email"
                {...email}/>
              <div className="text-help">
                { email.touched ? email.error : '' }
              </div>
            </fieldset>
            <fieldset className='form-group'>
              <label
                forHtml='phone'
                className='sr-only'>
                Phone
              </label>
              <input
                type="text"
                id='phone'
                className="form-control form-control-lg"
                placeholder="Phone"
                {...phone}/>
            </fieldset>
            <Selector
              {...suite}
              options={ this.props.listings.listings.map((listing) => {
                          return {
                            label: listing.title,
                            value: listing._id
                          };
                        }) }
              hidden={ this.props.listing ? true : false }
              id={ this.props.listing ? this.props.listing._id : 'listingSearchCitySelector' }
              placeholder={ this.props.listing ? {
                              label: this.props.listing.title,
                              value: this.props.listing._id
                            }
                            : 'Suite' }
              value={ this.props.listing ? this.props.listing._id : suite.value || '' } />
            <fieldset className='form-group'>
              <label
                forHtml='message'
                className='sr-only'>
                Your Inquiry
              </label>
              <textarea
                className="form-control form-control-lg"
                rows='3'
                id='message'
                placeholder="Your message here..."
                {...message}/>
            </fieldset>
            { this.renderStatus() }
          </form>
        </div>
      </div>
      );
  }
}

function validate(values) {
  const errors = {};

  if (!values.name) {
    errors.name = 'Enter your name';
  }

  if (!values.email) {
    errors.email = 'Enter your email address';
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    listings: state.listings
  };
}

export default reduxForm({
  form: 'PostContactForm',
  fields: ['name', 'email', 'phone', 'suite', 'message'],
  validate
}, mapStateToProps, {
  createInquiry
})(ContactForm);
