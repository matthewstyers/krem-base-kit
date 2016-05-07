import React, { Component } from 'react';
import _ from 'lodash';

export default class Selector extends Component {
  renderOptions() {
    if (this.props.hidden) {
      return (
        <option
          value={ this.props.placeholder.value }
          label={ this.props.placeholder.label } />
        );
    }
    const options = this.props.options;
    if (typeof this.props.placeholder === 'object') {
      options.unshift({
        label: this.props.placeholder.label,
        value: this.props.placeholder.value
      });
    } else {
      options.unshift(this.props.placeholder);
    }
    return (_.uniq(options).map((option) => {
      if (typeof option === 'string') {
        return (
          <option
            value={ option }
            label={ option }
            key={ option.toLowerCase() } />
          );
      }
      return (
        <option
          key={ option.value.toLowerCase() }
          label={ option.label }
          value={ option.value } />
        );
    }));
  }

  render() {
    return (
      <fieldset
        className='form-group'
        hidden={ this.props.hidden }>
        <select
          id={ this.props.id }
          value={ this.props.value }
          type='select'
          className='c-select'
          onChange={ (event) => {
                       this.props.onChange(event);
                       setTimeout(() => {
                         this.props.submitOnChange ?
                           this.props.handleSubmit() :
                           () => {
                             return;
                           };
                       });
                     } }>
          { this.renderOptions() }
        </select>
      </fieldset>
      );
  }
}
