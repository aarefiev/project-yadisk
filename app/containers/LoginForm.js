// @flow

import { connect } from 'react-redux';
import Component from '../components/LoginForm.jsx';
import * as actionCreators from '../actions';

const mapStateToProps = (state) => {
  return {};
};

const Container = connect(
  mapStateToProps,
  actionCreators,
)(Component);

export default Container;
