import React, { Component } from 'react';

export default class SlideShow extends Component {
  componentDidMount() {
    const CAROUSEL_ID = `#${this.props.id}`;
    $('.carousel').carousel({
      interval: 7500
    });
    $('.left.carousel-control').click(() => {
      $(CAROUSEL_ID).carousel('prev');
    });

    $('.right.carousel-control').click(() => {
      $(CAROUSEL_ID).carousel('next');
    });
  }

  renderImages(images) {
    const CAROUSEL_ID = `#${this.props.id}`;
    let iterator = 0;
    return (
    images.map((image) => {
      switch (iterator) {
        case 0:
          iterator++;
          return (
            <div
              className="carousel-item active"
              key={ image.originalname }>
              <img
                src={ `/space-images/${image.filename}` }
                alt={ image.originalname } />
            </div>
            );
        default:
          iterator++;
          return (
            <div
              className="carousel-item"
              key={ image.originalname }>
              <img
                src={ `/space-images/${image.filename}` }
                alt={ image.originalname } />
            </div>
            );
      }
    })
    );
  }

  renderIndicators(images) {
    const CAROUSEL_ID = `#${this.props.id}`;
    let iterator = 0;
    return (
    images.map((image) => {
      switch (iterator) {
        case 0:
          iterator++;
          return (
            <li
              key={ image.originalname }
              data-target={ CAROUSEL_ID }
              data-slide-to={ iterator - 1 }
              className="active"></li>
            );
        default:
          iterator++;
          return (
            <li
              key={ image.originalname }
              data-target={ CAROUSEL_ID }
              data-slide-to={ iterator - 1 }>
            </li>
            );
      }
    })
    );
  }

  render() {
    const images = this.props.images;
    const CAROUSEL_ID = `#${this.props.id}`;

    return (
      <div
        id={ this.props.id }
        className="carousel slide"
        data-interval="1000">
        <ol className="carousel-indicators">
          { this.renderIndicators(images) }
        </ol>
        <div
          className="carousel-inner"
          role="listbox">
          { this.renderImages(images) }
        </div>
        <a
          className="left carousel-control"
          href={ CAROUSEL_ID }
          role="button"
          data-slide="prev"><span
                                                                                                         className="icon-prev"
                                                                                                         aria-hidden="true"></span> <span className="sr-only">Previous</span></a>
        <a
          className="right carousel-control"
          href={ CAROUSEL_ID }
          role="button"
          data-slide="next"><span
                                                                                                          className="icon-next"
                                                                                                          aria-hidden="true"></span> <span className="sr-only">Next</span></a>
      </div>
      );
  }
}
