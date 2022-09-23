import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import ReactTooltip from 'react-tooltip';
import { withRouter } from 'react-router-dom';
import './styles/ticketRow.css'

import * as ticketsHelper from 'helpers/ticketsHelper';
import {
  updateTicketStatus,
} from 'api/ticket';
import {
  updateTicketStatusFailure,
  updateTicketStatusSuccess,
} from 'actions/ticket';
import { disableFormSubmission } from 'actions/formSubmission';

class TicketRow extends Component {

  handleTicketClick = (event, ticket) => {
    if (event.target.className !== 'fa fa-ellipsis-v option') {
      const { index } = this.props

      this.props.history.push({pathname: `/ticket/${ticket.id}`, state: { index: index }});
    }
  };

  handleTicketStatusUpdateClick = ({ key }, ticket) => {
    if (key === 'completed') {
      this.handleCompletedStatus(ticket, key)
    }
    else {
      if (ticket.status !== key) {
        this.props.disableFormSubmission()
        this.props.updateTicketStatus({
          ticket_id: ticket.id,
          status: key
        });
      }
    }
  };

  handleCompleteStatusSubmit = values => {
    this.props.disableFormSubmission()
    this.props.updateTicketStatus({
      ticket_id: values.ticket.id,
      status: values.key,
      comment: values.comment
    });
  }

  render() {
    const { rowFor, submission, ticket } = this.props;

    const menu = ticket => (
      <Menu onClick={(e) => this.handleTicketStatusUpdateClick(e, ticket)}>
        <MenuItem disabled={submission} key='open' className='pointer-on-hover'>Mark as Open</MenuItem>
        <MenuItem disabled={submission} key='in_progress' className='pointer-on-hover'>Mark In Progress</MenuItem>
        <MenuItem disabled={submission} key='completed' className='pointer-on-hover'>Mark as Completed</MenuItem>
        <Divider />
        <MenuItem disabled={submission} key='-1' className='pointer-on-hover'>Manage Participants</MenuItem>
      </Menu>
    );

    const renderTicketUserType = (rowFor === 'AssignedTickets' ? ticket.creator : ticket.assignee);

    return (
      <span>
        <div className={`border button list-items list-item-button ticket-row-main-div ${ ticket.ticket_seen ? '' : 'un-seen-ticket' }`}>
          <div className='ticket-row-detail' onClick={(event) => this.handleTicketClick(event, ticket)}>
            <div>
              {
                ticket.category.name &&
                <div className='category-label'>
                  <span data-tip='Category'>
                    <span style={{backgroundColor: `#${ticket.category.color}`}}>
                      { ticket.category.name }
                    </span>
                  </span>
                </div>
              }

              <div className='ticket-title'>
                <div><b>{ formatLongText(ticket.title, 70) }</b></div>
              </div>

              <div className='minor-detail'>
                <span>
                  <FontAwesome name='user'/>
                  <span>{renderTicketUserType.name}</span>
                </span>

                {
                  ticket.attachment &&
                  <FontAwesome name='circle' className='circle-dot'/>
                }
                {
                  ticket.attachment &&
                  <span className='ticket-attachment'>
                    <FontAwesome name='paperclip'/>
                    <span>Attachment</span>
                  </span>
                }

                <FontAwesome name='circle' className='circle-dot'/>
              </div>
            </div>
          </div>

          <div className='ticket-statuses'>
            <ReactTooltip place='left' type='dark' effect='solid'/>

            <div className='ticket-status'>
              <span data-tip='Status'>
                <FontAwesome name='info-circle'/>
                <span>{ ticketsHelper.convertTicketStatus(ticket.status) }</span>
              </span>
            </div>
          </div>
        </div>
      </span>
    );
  }
}

const mapStateToProps = state => ({
  submission: state.formSubmission.submission,
});

const mapDispatchToProps = dispatch => ({
  updateTicketStatus: params => { dispatch(updateTicketStatus(params, updateTicketStatusSuccess, updateTicketStatusFailure)) },
  disableFormSubmission: _ => { dispatch(disableFormSubmission) },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TicketRow));
