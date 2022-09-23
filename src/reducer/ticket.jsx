import * as types from 'actions/actionTypes';
import initialState from './initialState';

export const ticket = (state = initialState.tickets, action) => {
  let object = {}
  let ticketIndex = null
  switch(action.type) {
    case types.FETCH_TICKETS_SUCCESS:
      return { ...state, createdTickets: action.payload, ticketFetched: true };

    case types.FETCH_TICKETS_FAILURE:
      return state;

    case types.UPDATE_TICKET_STATUS_SUCCESS:
      let createdTickets = [...state.createdTickets];
      createdTickets[ticketIndex] = action.payload;
      object = Object.assign({}, object, { createdTickets: [...createdTickets] });
      return { ...state, ...object };

    case types.UPDATE_TICKET_STATUS_FAILURE:
      return state;

    default:
      return state;
  }
};
