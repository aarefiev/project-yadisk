// @flow

import { connect } from 'react-redux';
import Component from '../components/DiskItems.jsx';
import * as actionCreators from '../actions';

const mapStateToProps = (state) => {
  const props = {
    diskItems: state.diskItems,
    fetchingState: state.diskFetchingState,
  };

  console.log(state.diskItems);

  return props;
};

const Container = connect(
  mapStateToProps,
  actionCreators,
)(Component);

export default Container;
