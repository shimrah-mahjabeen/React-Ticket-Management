import {toastr} from 'react-redux-toastr';

import * as types from './actionTypes';

export const fetchTicketsSuccess = payload => (
  dispatch => {
    dispatch({
      type: types.FETCH_TICKETS_SUCCESS,
      payload: payload
    });
    dispatch(hideTicketLoader);
  }
);

export const fetchTicketsFailure = payload => ({
  type: types.FETCH_TICKETS_FAILURE,
  payload
});

export const updateTicketStatusSuccess = payload => (
  dispatch => {
    dispatch({
      type: types.UPDATE_TICKET_STATUS_SUCCESS,
      payload
    });
    dispatch(HIDE_MODAL);

    toastr.success('Ticket Status Updated Successfully!');
  }
);

export const updateTicketStatusFailure = payload => ({
  type: types.UPDATE_TICKET_STATUS_FAILURE,
  payload
});
