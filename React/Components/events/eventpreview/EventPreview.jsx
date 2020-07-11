/* eslint-disable react/boolean-prop-naming */
import React, { Component } from 'react';
import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  CardImg,
  Col,
  Row,
  Button,
} from 'reactstrap';
import PreviewMap from '../../eventwizard/eventpreview/PreviewMap';
import PropTypes from 'prop-types';
import './EventPreview.css';

export default class EventPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flipped: false,
    };
  }

  flipCard = () => {
    this.setState({ flipped: !this.state.flipped });
  };

  onRegisterClicked = () => {
    this.props.onRegisterClicked(this.props.values);
  };

  onEditClicked = () => {
    this.props.onEditClicked(this.props.values);
  };

  onDeleteClicked = () => {
    this.props.onDeleteClicked(this.props.values);
  };

  render() {
    return (
      <Col xs={12} sm={6} lg={4} xl={3} className="card-container">
        <div className={this.state.flipped ? 'card-flip flipped' : 'card-flip'}>
          <div className="front">
            <Card className="m-3 border text-center full-height">
              <CardHeader className="border">
                <h3>{this.props.values.name}</h3>
              </CardHeader>
              {this.props.values.imageUrl ? (
                <CardImg
                  top
                  width="100%"
                  height="200px"
                  className="event-preview-image"
                  src={this.props.values.imageUrl}
                  alt={this.props.values.name}
                />
              ) : (
                ''
              )}
              <CardBody className="">
                {
                  <div>
                    {this.props.values.dateStart
                      ? new Date(this.props.values.dateStart).toLocaleString()
                      : ''}
                    <br />
                    <b> TO </b>
                    <br />
                    {this.props.values.dateEnd
                      ? new Date(this.props.values.dateEnd).toLocaleString()
                      : ''}
                  </div>
                }

                <p className="text-success mb-0">{this.props.values.summary}</p>
                <small>{this.props.values.shortDescription}</small>
                <p>
                  {this.props.values.externalSiteUrl ? (
                    <>
                      Visit Website:{' '}
                      <a href={this.props.values.externalSiteUrl.toString()}>
                        Click Here
                      </a>
                    </>
                  ) : (
                    ''
                  )}
                </p>
              </CardBody>
              <Row className="d-flex justify-content-center align-items-end">
                <Button
                  color="primary"
                  className="m-1"
                  onClick={this.flipCard}
                  type="button"
                >
                  View Details
                </Button>
                <Button
                  color={
                    this.props.values.participantUserId !== null
                      ? 'danger'
                      : 'primary'
                  }
                  className="m-1"
                  disabled={
                    this.props.values.participantUserId !== null &&
                    this.props.values.price > 0
                  }
                  onClick={() => {
                    this.props.values.participantUserId !== null
                      ? this.props.onCancelRegistrationClicked(
                          this.props.values
                        )
                      : this.onRegisterClicked(this.props.values);
                  }}
                >
                  {this.props.values.participantUserId !== null
                    ? 'Cancel Signup'
                    : 'Register'}
                </Button>
                {this.props.currentUser.roles.includes('SysAdmin') && (
                  <Row className="ml-2">
                    <Button
                      color="warning"
                      className="m-1"
                      onClick={this.onEditClicked}
                    >
                      Edit
                    </Button>
                    <Button
                      color="danger"
                      className="m-1"
                      onClick={this.onDeleteClicked}
                    >
                      Delete
                    </Button>
                  </Row>
                )}
              </Row>
              <CardFooter className="border">
                {this.props.values.isFree
                  ? 'FREE EVENT'
                  : `$${this.props.values.price ? this.props.values.price : 0}`}
              </CardFooter>
            </Card>
          </div>
          <div className="back">
            <Card className="m-3 border text-center full-height">
              <CardHeader className="border">
                <h3>{this.props.values.name}</h3>
              </CardHeader>
              <div className="preview-map">
                <PreviewMap
                  location={{
                    latitude: this.props.values.venueV2.location.latitude,
                    longitude: this.props.values.venueV2.location.longitude,
                  }}
                />
              </div>
              <CardBody>
                <h4>{this.props.values.venueV2.name}</h4>
                <p className="text-overflow small">
                  {this.props.values.venueV2.description}
                </p>
                <address>
                  {this.props.values.venueV2.location.lineOne} <br />
                  {this.props.values.venueV2.location.lineTwo}
                  {this.props.values.venueV2.location.lineTwo ? <br /> : ''}
                  {this.props.values.venueV2.location.city},{' '}
                  {this.props.values.venueV2.location.state.name},{' '}
                  {this.props.values.venueV2.location.zip}
                </address>
              </CardBody>
              <Row className="d-flex justify-content-center align-items-end">
                <Button
                  color="primary"
                  className="m-1"
                  onClick={this.flipCard}
                  type="button"
                >
                  Go Back
                </Button>
                <Button
                  color={
                    this.props.values.participantUserId !== null
                      ? 'danger'
                      : 'primary'
                  }
                  className="m-1"
                  onClick={() => {
                    this.props.values.participantUserId !== null &&
                    this.props.values.price === 0
                      ? this.props.onCancelRegistrationClicked(
                          this.props.values
                        )
                      : this.onRegisterClicked(this.props.values);
                  }}
                >
                  {this.props.values.participantUserId !== null
                    ? 'Cancel Signup'
                    : 'Register'}
                </Button>
              </Row>
              <CardFooter className="border">
                {this.props.values.isFree
                  ? 'FREE EVENT'
                  : `$${this.props.values.price ? this.props.values.price : 0}`}
              </CardFooter>
            </Card>
          </div>
        </div>
      </Col>
    );
  }
}

EventPreview.propTypes = {
  values: PropTypes.shape({
    name: PropTypes.string,
    summary: PropTypes.string,
    shortDescription: PropTypes.string,
    externalSiteUrl: PropTypes.string,
    imageUrl: PropTypes.string,
    price: PropTypes.number,
    participantUserId: PropTypes.number,
    capacity: PropTypes.number,
    isFree: PropTypes.bool,
    dateStart: PropTypes.string,
    dateEnd: PropTypes.string,
    venueV2: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      location: PropTypes.shape({
        lineOne: PropTypes.string,
        lineTwo: PropTypes.string,
        city: PropTypes.string,
        zip: PropTypes.string,
        latitude: PropTypes.number,
        longitude: PropTypes.number,
        state: PropTypes.shape({
          name: PropTypes.string,
        }),
      }),
    }),
  }),
  onRegisterClicked: PropTypes.func,
  onEditClicked: PropTypes.func,
  onDeleteClicked: PropTypes.func,
  currentUser: PropTypes.shape({
    roles: PropTypes.arrayOf(PropTypes.string),
  }),
  onCancelRegistrationClicked: PropTypes.func,
};
