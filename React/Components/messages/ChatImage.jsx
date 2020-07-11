import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class ChatImage extends PureComponent {
  componentDidMount() {
    //Create Intersection Observer
    //Watch if chatimage is within view of the scrollbar container
    //set image SRC if image should be visible
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const { isIntersecting } = entry;
          if (isIntersecting) {
            this.element.src = this.props.src;
            this.observer = this.observer.disconnect();
          }
        });
      },
      {
        root: document.querySelector('.scrollbar-container'),
        rootMargin: '0px 0px 200px 0px',
      }
    );
    this.observer.observe(this.element);
  }
  render() {
    const { src } = this.props;
    return (
      <img
        src={src}
        alt={src}
        ref={(el) => (this.element = el)}
        className="messageImage"
      />
    );
  }
}

ChatImage.propTypes = {
  src: PropTypes.string,
};
