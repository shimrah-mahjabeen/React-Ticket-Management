import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

class MyTicketsTab extends Component {
  state = {
    message: 'No Tickets made by you ...',
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { loader, tickets } = this.props;
    const { message } = this.state;

    if (!isEqual(loader, nextProps.loader)) return true;
    if (!isEqual(tickets, nextProps.tickets)) return true;
    if (!isEqual(message, nextState.message)) return true;

    return false;
  }

  render() {
    const { loader, tickets } = this.props;
    const { message, page, pageSize } = this.state;

    const rowIndex = (i) => ((page - 1) * pageSize + i)

    return (
      <div>
        { loader && <Loader /> }
        {
          !loader &&
          <div>
            <div>
              <ul className='list my-ticket-list'>
                {
                  checkArrayPresence(tickets) &&
                  <React.Fragment>
                    {
                      tickets.map((ticket, index) => (
                        <TicketRow
                          key={ticket.id}
                          ticket={ticket}
                          rowFor='MyTickets'
                          index={rowIndex(index)}
                        />
                      ))
                    }
                  </React.Fragment>
                }
                {
                  checkArrayEmpty(tickets) &&
                  <div className='error-message'>
                    <h4>{message}</h4>
                  </div>
                }
              </ul>
            </div>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loader: state.tickets.ticketLoader,
  tickets: state.tickets.createdTickets,
});

const mapDispatchToProps = dispatch => ({
  fetchTickets: (page, params) => { dispatch(fetchTickets(page, params, fetchTicketsSuccess, fetchTicketsFailure)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyTicketsTab);
