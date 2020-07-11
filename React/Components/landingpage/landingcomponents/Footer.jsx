import React from 'react';
import { Row, Container, Nav, NavItem, NavLink } from 'reactstrap';

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Nav className="footer">
            <NavItem>
              <NavLink
                data-placement="top"
                href="https://twitter.com/ValoreCare"
                target="_blank"
                title="Follow us on Twitter"
              >
                <i className="fab fa-twitter" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                data-placement="top"
                href="https://www.facebook.com/valorecarepros"
                target="_blank"
                title="Like us on Facebook"
              >
                <i className="fab fa-facebook" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                data-placement="top"
                href="https://www.linkedin.com/company/valorecare"
                target="_blank"
                title="Follow us on Linkedin"
              >
                <i className="fab fa-linkedin" />
              </NavLink>
            </NavItem>
          </Nav>
          <Nav className="ml-auto">
            <NavItem>
              <NavLink href="/support/privacypolicy" target="_blank">
                Privacy Policy
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/support/termsofservice" target="_blank">
                Terms of Service
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>© {new Date().getFullYear()}, ValoreCare</NavLink>
            </NavItem>
          </Nav>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
