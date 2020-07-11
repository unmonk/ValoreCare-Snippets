import React, { Component } from "react";
import DailyIframe from "@daily-co/daily-js";
import PropTypes from "prop-types";

export default class VideoChatFrame extends Component {
  constructor(props) {
    super(props);
    this.iframeRef = React.createRef();
  }

  componentDidMount() {
    if (!this.props.url) {
      return;
    }
    this.daily = DailyIframe.wrap(this.iframeRef.current);
    this.daily.join({ url: this.props.url });
  }
  render() {
    return (
      <iframe
        className="video-frame"
        title="Valore Chat"
        ref={this.iframeRef}
        allow="camera; microphone; fullscreen"
      ></iframe>
    );
  }
}

VideoChatFrame.propTypes = {
  url: PropTypes.string,
};
