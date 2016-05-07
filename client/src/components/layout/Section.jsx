import React, { Component } from 'react';


export default class Section extends Component {
  render() {
    const sectionClass = `section section-${this.props.sectionType ? this.props.sectionType : ''}`;
    return (
      <div
        id={ this.props.id }
        className={ sectionClass }>
        <div className='container text-xs-center'>
          <h1 className='display-3 section-title text-uppercase'>{ this.props.title }</h1>
          <div className='section-contents'>
            { this.props.children }
          </div>
        </div>
      </div>
      );
  }
}
