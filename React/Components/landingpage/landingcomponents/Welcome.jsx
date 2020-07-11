import React from 'react';
import { Container, Row, Col, Badge, Button } from 'reactstrap';
import medicallanding from '../../../assets/images/landing/medicallanding.svg';
import PropTypes from 'prop-types';

export default function Welcome(props) {
  return (
    <section className="section section-dark pt-4 pb-4">
      <Container>
        <Row className="row-grid align-items-center">
          <Col className="order-md-2" md="6">
            <img
              src={medicallanding}
              className="img-fluid floating"
              alt="Valore Care Medical"
            />
          </Col>
          <Col className="order-md-1" md="6">
            <div className="pr-md-5">
              <div className="icon icon-lg icon-shape icon-shape-success shadow rounded-circle mb-5">
                <i className="ni ni-settings-gear-65" />
              </div>
              <h2>Instant senior care for when you need it most</h2>
              <p>
                Find and book local Covid-trained caregivers for your elderly
                loved one
              </p>
              <ul className="list-unstyled mt-5">
                <li className="py-2">
                  <div className="d-flex align-items-center">
                    <div>
                      <Badge className="badge-circle mr-3" color="primary">
                        <i className="fas fa-search" />
                      </Badge>
                    </div>
                    <div>
                      <h6 className="mb-0">
                        Search for caregivers near you with qualities that you
                        want and prices you can afford.
                      </h6>
                    </div>
                  </div>
                </li>
                <li className="py-2">
                  <div className="d-flex align-items-center">
                    <div>
                      <Badge className="badge-circle mr-3" color="primary">
                        <i className="fas fa-comments" />
                      </Badge>
                    </div>
                    <div>
                      <h6 className="mb-0">
                        Chat with and interview your selected caregivers right
                        on the platform. Get the confidence you need to move to
                        the next step.
                      </h6>
                    </div>
                  </div>
                </li>
                <li className="py-2">
                  <div className="d-flex align-items-center">
                    <div>
                      <Badge className="badge-circle mr-3" color="primary">
                        <i className="fas fa-calendar-check" />
                      </Badge>
                    </div>
                    <div>
                      <h6 className="mb-0">
                        When confident about your decision, book an appointment
                        to get the caregiver over to your loved one.
                      </h6>
                    </div>
                  </div>
                </li>
                <li className="py-2">
                  <div className="d-flex align-items-center">
                    <div>
                      <Badge className="badge-circle mr-3" color="primary">
                        <i className="fas fa-credit-card" />
                      </Badge>
                    </div>
                    <div>
                      <h6 className="mb-0">
                        Relieve yourself of any payment disputes. Pay agreed
                        amount on the platform, which goes straight to the
                        caregiver.
                      </h6>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="justify-content-center w-100 d-flex">
              <Button
                color="primary"
                type="button"
                size="lg"
                className="btn-signup"
                onClick={() => props.history.push('/auth/register')}
              >
                Sign Up Today
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

Welcome.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
