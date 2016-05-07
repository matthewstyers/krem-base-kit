// require('./backgroundVideoController');
require('./backgroundVideo.scss');

import React, { Component } from 'react';

export default class BackgroundVideo extends Component {
  render() {
    return (
      <div
        id='first'
        className='section'>
        <div className='header-content'>
          <div
            className='inner'
            id='intro-brand'>
            <h1 className='display-2'><span className='serif thin'>NEW LINE</span> PROPERTIES</h1>
          </div>
        </div>
        <video
          id='video-background'
          preload="auto"
          autoPlay="true"
          loop="true"
          className="fillWidth fadeIn animated"
          poster="https://s3-us-west-2.amazonaws.com/coverr/poster/Meeting-Room.jpg">
          <source
            src="https://s3-us-west-2.amazonaws.com/coverr/mp4/Meeting-Room.mp4"
            type="video/mp4" />
        </video>
      </div>
      );
  }
}
