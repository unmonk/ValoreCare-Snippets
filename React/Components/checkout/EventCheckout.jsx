/* eslint-disable camelcase */
import React from "react";
import PropTypes from "prop-types";
import { CardElement } from "@stripe/react-stripe-js";
import { Input, FormGroup, Button, Form, Label, Row } from "reactstrap";
import { createStripeIntent } from "../../services/paymentService";
import ErrorMessage from "./ErrorMessage";

export default class EventCheckout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      cardComplete: false,
      processing: false,
      paymentMethod: null,
      email: "",
      phone: "",
      name: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { stripe, elements } = this.props;
    const { email, phone, name, error, cardComplete } = this.state;

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    if (error) {
      elements.getElement("card").focus();
      return;
    }

    if (cardComplete) {
      this.setState({ processing: true });
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        email,
        phone,
        name,
      },
    });

    const intentClientSecret = await this.createPaymentRequest(payload);

    this.setState({ processing: false });

    if (payload.error) {
      this.setState({ error: payload.error });
    } else {
      this.setState(
        {
          paymentMethod: payload.paymentMethod,
          intentClientSecret: intentClientSecret,
        },
        () => this.props.onStripeStateChange(this.state)
      );
    }
  };

  createPaymentRequest = async (paymentMethod) => {
    const payload = {
      amount: parseInt(this.props.selectedEvent.price + "00"),
      currency: "usd",
      confirm: true,
      description: this.props.selectedEvent.name,
      paymentMethod: paymentMethod.paymentMethod.id,
    };

    const intentClientSecret = await createStripeIntent(payload);
    return intentClientSecret.item;
  };

  onCardChange = (event) => {
    this.setState({
      error: event.error,
      cardComplete: event.complete,
    });
  };

  render() {
    const { error, processing, paymentMethod, name, email, phone } = this.state;
    //const { stripe } = this.props;
    const CARD_OPTIONS = {
      iconStyle: "solid",
      style: {
        base: {
          iconColor: "#c4f0ff",
          color: "#000000",
          fontWeight: 500,
          fontFamily: "Open Sans, Segoe UI, sans-serif",
          fontSize: "16px",
          fontSmoothing: "antialiased",
          ":-webkit-autofill": {
            color: "#fce883",
          },
          "::placeholder": {
            color: "#87BBFD",
          },
        },
        invalid: {
          iconColor: "#FFC7EE",
          color: "#FFC7EE",
        },
      },
    };
    return paymentMethod ? (
      <div className="text-center">
        <div className="ResultTitle" role="alert">
          <i className="fas fa-check"></i> Payment Success
        </div>
        <p>Thanks for purchasing this event!</p>
      </div>
    ) : (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="name">Full Name</Label>
          <Input
            label="Name"
            id="name"
            type="text"
            placeholder="Jane Doe"
            required
            autoComplete="name"
            value={name}
            onChange={(event) => {
              this.setState({ name: event.target.value });
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            label="Email"
            id="email"
            type="email"
            placeholder="janedoe@gmail.com"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => {
              this.setState({ email: event.target.value });
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="phone">Billing Phone</Label>
          <Input
            label="Phone"
            id="phone"
            type="tel"
            placeholder="(941) 555-0123"
            required
            autoComplete="tel"
            value={phone}
            onChange={(event) => {
              this.setState({ phone: event.target.value });
            }}
          />
        </FormGroup>
        <FormGroup>
          <CardElement options={CARD_OPTIONS} onChange={this.onCardChange} />
        </FormGroup>
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
        <Row className="d-flex justify-content-center">
          <Button
            disabled={processing}
            type="submit"
            color={error ? "danger" : "primary"}
          >
            {processing ? "Processing..." : "Submit Payment Details"}
          </Button>
        </Row>
      </Form>
    );
  }
}

EventCheckout.propTypes = {
  stripe: PropTypes.shape({
    confirmCardPayment: PropTypes.func,
    createPaymentMethod: PropTypes.func,
  }),
  elements: PropTypes.shape({ getElement: PropTypes.func }),
  currentUser: PropTypes.shape({
    userId: PropTypes.number,
    email: PropTypes.string,
  }),
  selectedEvent: PropTypes.shape({
    price: PropTypes.number,
    name: PropTypes.string,
  }),
  priceStatement: PropTypes.string,
  priceId: PropTypes.string,
  subscriptionId: PropTypes.string,
  handleCreateSubscription: PropTypes.func,
  handleUpdateSubscription: PropTypes.func,
  handleSubscriptionSuccess: PropTypes.func,
  onStripeStateChange: PropTypes.func,
};
