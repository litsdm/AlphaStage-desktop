import React, { Component } from 'react';

import VideoPlayer from './VideoPlayer';

export default class FeedbackModal extends Component {
  render() {
    return (
      <div className="modal fade" id="myModal" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Feedback by user</h4>
              <h6>Date</h6>
            </div>
            <div className="modal-body">
              <VideoPlayer />
              <div className="modal-messages">
                <h4>Good</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas imperdiet, metus vel sollicitudin pellentesque, sem libero maximus dui, sit amet lobortis tortor augue id orci. Donec auctor nisi vel bibendum molestie. Sed fringilla mi vel felis congue rhoncus. Integer nisl mauris, rhoncus gravida dolor sed, feugiat finibus ipsum.
                </p>
                <h4>Better</h4>
                <p>
                  Fusce nisl risus, malesuada at justo ac, volutpat finibus felis. Suspendisse vitae ante rhoncus, pharetra elit at, rutrum turpis. Nulla eu pulvinar nibh, congue lobortis dui. Sed tristique turpis velit, a aliquam nisi interdum eu. Aenean gravida, nisl a aliquet sodales, odio ante porttitor massa, vitae pellentesque neque lectus id nibh.
                </p>
                <h4>Best</h4>
                <p>
                  Vivamus placerat tristique arcu vitae egestas. Sed condimentum massa tempus felis faucibus commodo. Quisque et mauris at nulla mollis mollis. Mauris efficitur, dolor nec finibus hendrerit, velit diam scelerisque augue, eget molestie risus metus et ante.
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <a href="#" className="btn play-btn">Placeholder</a>
            </div>
          </div>

        </div>
      </div>
    )
  }
}
