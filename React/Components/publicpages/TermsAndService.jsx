import React, { Component, Suspense } from 'react';
import Spinner from '../../layouts/layout-components/spinner/Spinner';
import Header from '../landingpage/landingcomponents/Header';
import Footer from '../landingpage/landingcomponents/Footer';
import { Container, Row, Col, Nav, NavItem, NavLink } from 'reactstrap';
import { Route, Switch, Link } from 'react-router-dom';
import { supportRoutes } from '../../routes/authroutes';
import PropTypes from 'prop-types';
import '../landingpage/style.css';

export default class TermsAndService extends Component {
  state = {
    mapRoutes: [],
  };
  componentDidMount = () => {
    this.mapRoutes();
  };

  mapRoutes = () => {
    const mapRoutes = supportRoutes.map((prop, key) => {
      return (
        <Route
          path={prop.path}
          exact={prop.exact}
          render={() => <prop.component {...this.props} />}
          key={key}
        />
      );
    });
    this.setState({ mapRoutes: mapRoutes });
  };

  render() {
    return (
      <>
        <Header />
        <main>
          <section className="section terms h-100 pt-4 pb-4">
            <Container>
              <Row>
                <Col xs={3}>
                  <Nav vertical className="">
                    <NavItem
                      className={
                        this.props.location.pathname.includes(
                          '/support/aboutus'
                        )
                          ? 'about-active'
                          : 'about-link'
                      }
                    >
                      <NavLink tag={Link} to="/support/aboutus">
                        <i className="fas fa-address-card"></i> About Us
                      </NavLink>
                    </NavItem>
                    <NavItem
                      className={
                        this.props.location.pathname.includes(
                          '/support/privacypolicy'
                        )
                          ? 'about-active'
                          : 'about-link'
                      }
                    >
                      <NavLink tag={Link} to="/support/privacypolicy">
                        <i className="fas fa-user-secret"></i> Privacy Policy
                      </NavLink>
                    </NavItem>
                    <NavItem
                      className={
                        this.props.location.pathname.includes(
                          '/support/termsofservice'
                        )
                          ? 'about-active'
                          : 'about-link'
                      }
                    >
                      <NavLink tag={Link} to="/support/termsofservice">
                        <i className="fas fa-key"></i> Terms of Service
                      </NavLink>
                    </NavItem>
                  </Nav>
                </Col>
                <Col xs={9}>
                  <Suspense fallback={<Spinner />}>
                    <Switch>{this.state.mapRoutes}</Switch>
                  </Suspense>
                </Col>
              </Row>
            </Container>
          </section>
          <Footer />
        </main>
      </>
    );
  }
}
TermsAndService.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};
