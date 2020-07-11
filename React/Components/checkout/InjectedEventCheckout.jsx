import React, { Component } from 'react';
import { ElementsConsumer } from '@stripe/react-stripe-js';
import EventCheckout from './EventCheckout';
import PropTypes from 'prop-types';

export default class InjectedEventCheckout extends Component {
  componentDidMount() {
    const { stripeRef } = this.props;
    stripeRef(this);
  }
  componentWillUnmount() {
    const { stripeRef } = this.props;
    stripeRef(undefined);
  }

  eventCheckout() {}
  render() {
    return (
      <ElementsConsumer>
        {({ stripe, elements }) => (
          <EventCheckout
            stripe={stripe}
            elements={elements}
            stripeCheckout={(ref) => (this.stripeCheckout = ref)}
            {...this.props}
          />
        )}
      </ElementsConsumer>
    );
  }
}

InjectedEventCheckout.propTypes = {
  stripeRef: PropTypes.func,
};
