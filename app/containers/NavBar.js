// @flow

import { connect } from 'react-redux';
import Component from '../components/NavBar.jsx';
import * as actionCreators from '../actions';

const mapStateToProps = () => {
  return {};
};

const Container = connect(
  mapStateToProps,
  actionCreators,
)(Component);

export default Container;
