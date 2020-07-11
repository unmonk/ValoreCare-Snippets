import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  Col,
  Row,
} from 'reactstrap';

const items = [
  {
    src: require('../../../assets/images/landing/test1.jpg'),
    name: 'Trish Siler',
    quote:
      'Before I found you guys, I struggled so much. Missing work and appointments, with my agency sitter cancelling last minute. The 2 sitters I used so far have been great! Hope the trend continues.',
    location: 'Durham, NC',
  },
  {
    src: require('../../../assets/images/landing/test2.jpg'),
    name: 'LaTanya Collins',
    quote:
      'I no longer feel trapped at home. It has been good. I will try to use you more.',
    location: 'Raleigh, NC',
  },
  {
    src: require('../../../assets/images/landing/test3.jpg'),
    name: 'Joseph L.',
    quote:
      'I am slowly getting my life back. It was hard letting people in because I was afraid. But thank you for all the help. I feel better knowing you are checking in.',
    location: 'Greensboro, NC',
  },
];

const TestimonialSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
        className="w-100"
      >
        <div className="card w-100 testimonial text-center">
          <Row>
            <Col sm={12} md={2}>
              <img
                alt={item.name}
                src={item.src}
                className="rounded-circle card-avatar m-2"
              />
            </Col>
            <Col md={8} className="">
              <blockquote className="blockquote">
                &quot; {item.quote}
                <span className="text-danger ml-2">{item.name}</span>
                <small className="text-dark"> - {item.location}</small>
              </blockquote>
            </Col>
          </Row>
        </div>
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      autoPlay={true}
    >
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
};

export default TestimonialSlider;
