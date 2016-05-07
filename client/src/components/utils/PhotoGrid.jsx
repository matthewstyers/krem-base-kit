require('./PhotoGrid.scss');

import _ from 'lodash';
import React, { Component } from 'react';
import { ReactRpg } from 'react-rpg';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchGalleries } from './actions';

class PhotoGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      curPage: 0
    };
  }

  componentWillMount() {
    this.props.fetchGalleries();
  }

  renderImageUrls(images) {
    return images.map((image) => {
      return ({
        url: `/gallery-images/${image.filename}`
      });
    });
  }

  renderPageControls(images) {
    if (images.length > 6) {
      const pages = Math.round(images.length / 6);
      let links = [];
      for (let i = 0; i < pages; i++) {
        links.push(<li
                     className={ i === this.state.curPage ? 'page-item active' : 'page-item' }
                     key={ i }>
                     <a
                       className='page-link'
                       href='#work'
                       onClick={ () => {
                                   this.setState({
                                     curPage: i
                                   });
                                 } }>
                       { i + 1 }
                       { i === this.state.curPage ? <span className='sr-only'>(current)</span> : null }
                     </a>
                   </li>);
      }
      return (
        <nav>
          <ul className="pagination">
            <li className={ this.state.curPage === 0 ? 'page-item disabled' : 'page-item' }>
              <a
                className="page-link"
                href="#work"
                aria-label="Previous"
                onClick={ () => {
                            if (this.state.curPage > 0) {
                              this.setState({
                                curPage: this.state.curPage - 1
                              });
                            }
                          } }><span aria-hidden="true">&laquo;</span> <span className="sr-only">Previous</span></a>
            </li>
            { links }
            <li className={ this.state.curPage === pages - 1 ? 'page-item disabled' : 'page-item' }>
              <a
                className="page-link"
                href="#work"
                aria-label="Next"
                onClick={ () => {
                            if (this.state.curPage < pages - 1) {
                              this.setState({
                                curPage: this.state.curPage + 1
                              });
                            }
                          } }><span aria-hidden="true">&raquo;</span> <span className="sr-only">Next</span></a>
            </li>
          </ul>
        </nav>
        );
    }
    return null;
  }

  render() {
    if (!this.props.homepageGallery.length) {
      return (
        <div>
          loading...
        </div>
        );
    }
    return (
      <div className="row">
        <div className="col col-lg-12">
          <ReactRpg
            imagesArray={ this.renderImageUrls(this.props.homepageGallery[0].images).slice(this.state.curPage * 6, this.state.curPage * 6 + 6) }
            columns={ 3 }
            padding={ 5 } />
          { this.renderPageControls(this.props.homepageGallery[0].images) }
        </div>
      </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    homepageGallery: _.filter(state.galleries.galleries, _.matches({
      name: 'homepage gallery grid'
    }))
  };
}

export default connect(mapStateToProps, {
  fetchGalleries
})(PhotoGrid);
