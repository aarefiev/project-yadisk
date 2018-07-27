// @flow

import React from 'react';
import { Field, reduxForm } from 'redux-form';

class LoginForm extends React.Component {
  login = ({ email, password }) => {
    this.props.login({ email, password });
    // this.props.addTask({ text });
    // this.props.reset();
  }

  render() {
    return (
      <form action="" onSubmit={this.props.handleSubmit(this.login)}>
        <div className="form-row">
          <div className="form-group col">
            <Field
              name="email"
              type="email"
              required
              className="form-control"
              placeholder="Email"
              component="input" />
          </div>
          <div className="form-group col">
            <Field
              name="password"
              type="password"
              required
              className="form-control"
              placeholder="Password"
              component="input" />
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-sm">Login</button>
      </form>
    );
  }
};

export default reduxForm({
  form: 'login',
})(LoginForm);
