import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import PropTypes from 'prop-types';

export default function Product(props) {
  return (
    <div className="section text-center text-dark">
      <Container>
        <Row>
          <Col className="ml-auto mr-auto mt-5 mb-4" md="8">
            <h2 className="title"> GET YOUR LIFE BACK!</h2>
            <h5>
              {`GET YOUR LIFE BACK! Why put your life on hold? Turn down
              invitations to friends' events? Cancel trips? Skip
              work/exercise/your own appointments? When you can very easily get
              someone to fill in for you.`}
            </h5>
          </Col>
          <Col md="12">
            <div className="d-flex p-2 justify-content-center">
              <img
                src={require('../../../assets/images/landing/stock1.jpg')}
                alt="stock medical"
                className="product-image"
              ></img>
            </div>
          </Col>
        </Row>
        <Row className="mt-5 mb-5">
          <Col xs="6" md="3">
            <div className="info">
              <i className="fas fa-check icon text-success floating" />
              <h4>
                <i>Truly Relevant Care</i>
              </h4>
            </div>
          </Col>
          <Col xs="6" md="3">
            <div className="info">
              <i className="fas fa-check icon text-success floating" />
              <h4>
                <i>Practical Guidance & Support</i>
              </h4>
            </div>
          </Col>
          <Col xs="6" md="3">
            <div className="info">
              <i className="fas fa-check icon text-success floating" />
              <h4>
                <i>More Empathy</i>
              </h4>
            </div>
          </Col>
          <Col xs="6" md="3">
            <div className="info">
              <i className="fas fa-check icon text-success floating" />
              <h4>
                <i>Book Instantly</i>
              </h4>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="ml-auto mr-auto mt-4 mb-5" md="8">
            <h2 className="title">{`Find someone who 'gets' you`}</h2>
            <h5>
              <i>75%</i> of our listed care providers have been where you are
              today. They have taken care of loved ones who needed care at home.
              We work with former family caregivers to use those skills to offer
            </h5>
          </Col>
        </Row>
        <Row>
          <Col className="ml-auto mr-auto mt-4 mb-5" md="8">
            <Button
              type="button"
              color="primary"
              className="btn-signup"
              onClick={() => props.history.push('/auth/register')}
            >
              Sign Up For ValoreCare
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

Product.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
