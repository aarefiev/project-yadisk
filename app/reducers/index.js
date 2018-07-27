// @flow

import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
// import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const login = handleActions({
  [actions.loginRequest](state, { payload }) {
    return { ...state };
  },
}, {});

const diskFetchingState = handleActions({
  [actions.fetchDiskItemsRequest]() {
    return 'requested';
  },
  [actions.fetchDiskItemsFailure]() {
    return 'failed';
  },
  [actions.fetchDiskItemsSuccess]() {
    return 'successed';
  },
}, 'none');

const diskItems = handleActions({
  [actions.fetchDiskItemsSuccess](state, { payload: { diskItems } }) {
    return diskItems;
  },
}, []);

export default combineReducers({
  // form: formReducer,
  diskFetchingState,
  diskItems,
});
