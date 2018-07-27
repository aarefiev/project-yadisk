// @flow

import _ from 'lodash';
import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const loginRequest = createAction('LOGIN_REQUEST');
export const loginSuccess = createAction('LOGIN_SUCCESS');
export const loginFailure = createAction('LOGIN_FAILURE');

export const fetchDiskItemsRequest = createAction('DISK_ITEMS_FETCH_REQUEST');
export const fetchDiskItemsSuccess = createAction('DISK_ITEMS_FETCH_SUCCESS');
export const fetchDiskItemsFailure = createAction('DISK_ITEMS_FETCH_FAILURE');

export const login = ({ email, password }) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const url = routes.authUrl();
    const response = await axios.post(url, { email, password });

    dispatch(loginSuccess({ tasks: response.data }));
  } catch (e) {
    dispatch(loginFailure());
  }
};

export const fetchDiskItems = (path) => async (dispatch) => {
  dispatch(fetchDiskItemsRequest());

  try {
    const url = routes.diskUrl(path);

    console.log(url);
    console.log(window.location);

    const response = await axios.get(url);

    dispatch(fetchDiskItemsSuccess({ diskItems: response.data }));
  } catch (e) {
    dispatch(fetchDiskItemsFailure());
  }
};

export const downloadDiskItem =
  createAction('DISK_ITEM_DOWNLOAD');
