/**
 * @file Notifications
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import { verifyJWT } from 'utils/authorization.util';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionSetPageTitle, actionSetUsagePageVerifiedMark } from 'actions/page-header.action';
import { actionSetUsageTabBar } from 'actions/tab-bar.action';
import { actionSetUsageInfoBar } from 'actions/info-bar.action';

import React from 'react';
import ReactTable from 'react-table';
import CommonLayout from 'layouts/CommonLayout';

import axios from 'axios';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
const configServer = require('config/server.config');

// -------------------------------------------------------------------------------------------------
// Component
// -------------------------------------------------------------------------------------------------

class NotificationsPage extends React.Component {
   // Init
   // ----------------------------------------------------------------------------------------------

   static async getInitialProps(ctx) {
      await verifyJWT(ctx);

      // Header
      ctx.store.dispatch(actionSetPageTitle('Notifications'));
      ctx.store.dispatch(actionSetUsagePageVerifiedMark(false));
      ctx.store.dispatch(actionSetUsageTabBar(false));

      // Info Bar
      ctx.store.dispatch(actionSetUsageInfoBar(false));

      // Ajax
      const token = ctx.store.getState().reducerJWT.token;

      let notificationList;
      try {
         notificationList = await axios.get(configServer.host + '/api/notifications', {
            headers: {
               Authorization: token,
            },
         });
      } catch (err) {}

      return {
         notifications: notificationList.data.dat.notifications,
      };
   }

   constructor(props) {
      super(props);

      this.state = {
         notifications: [...this.props.notifications],
      };
   }

   // Methods
   // ----------------------------------------------------------------------------------------------

   ajaxToggleNotification = async row => {
      try {
         await axios.patch(`${configServer.host}/api/notification/${row.row._original.id}`);

         let notifications = this.state.notifications;
         notifications[row.index].isRead = !notifications[row.index].isRead;

         this.setState({
            notifications,
         });
      } catch (err) {}
   };

   ajaxRemoveNotification = async row => {
      try {
         await axios.delete(`${configServer.host}/api/notification/${row.row._original.id}`);

         let notifications = this.state.notifications;
         notifications.splice(row.index, 1);

         this.setState({
            notifications,
         });
      } catch (err) {}
   };

   // Render
   // ----------------------------------------------------------------------------------------------

   render() {
      const columns = [
         {
            Header: 'Message',
            accessor: 'message',
         },
         {
            Header: 'Date',
            id: 'createdAt',
            maxWidth: 150,
            accessor: item => {
               return moment(item['createdAt']).format('DD.MM.YYYY HH:mm');
            },
         },
         {
            Header: 'Read',
            id: 'isRead',
            maxWidth: 100,
            accessor: item => {
               return item['isRead'] ? 'Unread' : '';
            },
         },
         {
            Header: 'Edit',
            filterable: false,
            sortable: false,
            className: 'table__edit',
            width: 104,
            Cell: row => {
               return (
                  <React.Fragment>
                     <div
                        className="sq-button sq-button_blue"
                        onClick={() => this.ajaxToggleNotification(row)}
                     >
                        <FontAwesomeIcon icon={faEye} />
                     </div>
                     <div
                        className="sq-button sq-button_red"
                        onClick={() => this.ajaxRemoveNotification(row)}
                     >
                        <FontAwesomeIcon icon={faTrash} />
                     </div>
                  </React.Fragment>
               );
            },
         },
      ];

      return (
         <CommonLayout>
            <div className={'row'}>
               <div className="col-12">
                  <ReactTable
                     data={this.state.notifications}
                     columns={columns}
                     filterable={false}
                     noDataText={'No notifications.'}
                  />
               </div>
            </div>
         </CommonLayout>
      );
   }
}

// -------------------------------------------------------------------------------------------------
// Redux
// -------------------------------------------------------------------------------------------------

const mapStateToProps = state => {
   return {};
};

const mapDispatchToProps = dispatch => {
   return bindActionCreators({}, dispatch);
};

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(NotificationsPage);
