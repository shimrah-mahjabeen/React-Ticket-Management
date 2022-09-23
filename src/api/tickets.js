import objectToFormData from 'object-to-formdata';

import { showTicketLoader } from 'actions/ticket';
import request from './request';

export const fetchTickets = (page, params, successAction, failureAction) => (
  dispatch => {
    dispatch(
      request(`tickets/sent?page=${page}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: objectToFormData({ ticket: params }),
      }, successAction, failureAction, true)
    );

    dispatch(showTicketLoader);
  }
);

export const updateTicketStatus = (params, successAction, failureAction) => (
  request(`tickets/${params.ticket_id}`,{
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ticket: params}),
    submission:true,
  }, successAction, failureAction, true)
);
