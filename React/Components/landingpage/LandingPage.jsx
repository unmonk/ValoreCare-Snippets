import React, { Component } from 'react';

import Header from './landingcomponents/Header';
import Welcome from './landingcomponents/Welcome';
import MainContent from './landingcomponents/MainContent';
import Product from './landingcomponents/Product';
import Testimonial from './landingcomponents/Testimonial';
import Footer from './landingcomponents/Footer';
import ContactUs from './landingcomponents/ContactUs';
import './style.css';

export default class LandingPage extends Component {
  render() {
    return (
      <>
        <Header />
        <main>
          <Welcome {...this.props} />
          <MainContent />
          <Testimonial />
          <Product {...this.props} />
          <ContactUs />
          <Footer />
        </main>
      </>
    );
  }
}
