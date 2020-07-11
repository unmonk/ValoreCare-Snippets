import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import TestimonialSlider from './TestimonialSlider';

export default function Testimonial() {
  return (
    <div className="section section-dark pt-5 pb-5">
      <Container>
        <h2 className="title text-center">{`You're in great company.`}</h2>
        <Row>
          <Col xs={12}>
            <TestimonialSlider className="w-100 h-100" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
