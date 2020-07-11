import React from 'react';
import { Container, Row, Col, Card, CardBody, Badge } from 'reactstrap';

export default function MainContent() {
  return (
    <section className="section pt-4 pb-4">
      <Container>
        <Row className="justify-content-center h-100">
          <Col lg="4">
            <Card className="card-lift--hover shadow h-100">
              <CardBody className="py-5">
                <h6 className="text-primary text-uppercase">Safety</h6>
                <p className="description mt-3 align-middle ">
                  We are extremely careful about who we expose our most
                  vulnerable population to. Every caregiver listed on our
                  platform is verified and vetted through a thorough screening
                  process involving a federal background check. ALL caregivers
                  are also fully-trained in coronovirus prevention and signs and
                  symptoms to watch for and report.
                </p>
                <div>
                  <Badge color="primary" pill className="mr-1">
                    Federal Background Checks
                  </Badge>
                  <Badge color="primary" pill className="mr-1">
                    Coronovirus Trained
                  </Badge>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-lift--hover shadow h-100">
              <CardBody className="py-5">
                <h6 className="text-success text-uppercase">Quality</h6>
                <p className="description mt-3 align-middle ">
                  {`Our platform is run by Registered Nurses and Caregivers
                      who have dedicated years of their lives to caring for our
                      nation's elderly. We empower our caregivers through
                      TOP NOTCH TRAINING for quality senior care. Our
                      RN-caregiver support line provides instant support to
                      assist our caregivers navigate tough situations. No more
                      worries about your agency caregiver cancelling on you. We
                      are making available thousands of caregivers.`}
                </p>
                <div>
                  <Badge color="success" pill className="mr-1">
                    Top Notch Training
                  </Badge>
                  <Badge color="success" pill className="mr-1">
                    Instant Support Line
                  </Badge>
                  <Badge color="success" pill className="mr-1">
                    Dedicated Caregivers
                  </Badge>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-lift--hover shadow h-100">
              <CardBody className="py-5">
                <h6 className="text-warning text-uppercase">Seamless</h6>
                <p className="description mt-3 align-middle ">
                  {`Our caregivers work as independent contractors, which
                      takes providing tax documents for them off your to-do
                      list. Your online transactions are also free to download
                      at the end of year for your own tax purposes. Why go
                      through an agency when you can have the control in your
                      own hands? Message providers, hire and pay them directly.
                      Without the middle man or the 'minimum-hours' requirement,
                      your caregiver gets paid more and you keep more in your
                      pocket for rainier days.`}
                </p>
                <div>
                  <Badge color="warning" pill className="mr-1">
                    Tax Documents
                  </Badge>
                  <Badge color="warning" pill className="mr-1">
                    Online Transactions
                  </Badge>
                  <Badge color="warning" pill className="mr-1">
                    Message Providers
                  </Badge>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
