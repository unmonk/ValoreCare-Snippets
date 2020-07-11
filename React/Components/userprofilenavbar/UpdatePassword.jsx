import React from "react";
import propTypes from "prop-types";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { updatePassword } from "../../services/resetPasswordService";
import updatePasswordValidationSchema from "../../schemas/updatePasswordValidationSchema";
import { Button } from "reactstrap";
import Swal from "sweetalert2";

import logger from "sabio-debug";
const _logger = logger.extend("UpdatePassword");

class UpdatePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        oldPassword: "",
        password: "",
        confirmPassword: "",
      },
      user: {},
    };
  }

  handleSubmit = (values) => {
    updatePassword(values)
      .then(this.onUpdatePasswordSuccess)
      .catch(this.onUpdatePasswordError);
  };

  onUpdatePasswordSuccess = (response) => {
    Swal.fire({
      icon: "success",
      title: "Password Updated",
      text: "Please login with your new password",
    });
    _logger(response);
    this.props.history.push(`/auth/login`, {
      type: "LOGOUT",
    });
  };

  onUpdatePasswordError = (error) => {
    Swal.fire({
      icon: "error",
      title: "Somethings Wrong",
      text: "Please ensure your old password is correct.",
    });
    _logger(error);
  };

  render() {
    return (
      <React.Fragment>
        <div className="updatePassword row align-items-center justify-content-center text-center">
          <div className="container-form col-3 card">
            <div className="formBanner">
              <h3>RESET PASSWORD</h3>
            </div>
            <Formik
              //   enableReinitialize={true}
              validationSchema={updatePasswordValidationSchema}
              initialValues={this.state.formData}
              onSubmit={this.handleSubmit}
            >
              {(props) => {
                const { values, handleSubmit } = props;
                return (
                  <Form className="reset-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="oldPassword">Old Password</label>
                      <Field
                        name="oldPassword"
                        type="password"
                        values={values.oldPassword}
                        className="form-control comment-subject"
                        placeholder="Old Password"
                      />
                      <ErrorMessage name="oldPassword">
                        {(errorMsg) => (
                          <div className="text-danger">{errorMsg}</div>
                        )}
                      </ErrorMessage>
                      <label htmlFor="password">New Password</label>
                      <Field
                        name="password"
                        type="password"
                        values={values.password}
                        className="form-control comment-subject"
                        placeholder="New Password"
                      />
                      <ErrorMessage name="password">
                        {(errorMsg) => (
                          <div className="text-danger">{errorMsg}</div>
                        )}
                      </ErrorMessage>
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <Field
                        name="confirmPassword"
                        type="password"
                        values={values.confirmPassword}
                        className="form-control comment-subject"
                        placeholder="Confirm Password"
                      />
                      <ErrorMessage name="confirmPassword">
                        {(errorMsg) => (
                          <div className="text-danger">{errorMsg}</div>
                        )}
                      </ErrorMessage>
                    </div>

                    <Button className="" type="submit" color="primary">
                      Submit
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

UpdatePassword.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }),
};

export default UpdatePassword;
