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
import ReactDOMServer from 'react-dom/server';
import CommonLayout from 'layouts/CommonLayout';
import axios from 'axios';

const configServer = require('config/server.config');
const $ = require('jquery');
$.DataTable = require('datatables.net');

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
library.add(faTrash, faEye);

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
      console.log(token);

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
      this.myRef = React.createRef();
   }

   componentDidMount() {
      const tableActions = ReactDOMServer.renderToStaticMarkup(
         <span>
            <a href="" className="sq-button sq-button_blue editor_edit">
               <FontAwesomeIcon icon={['fas', 'eye']} />
            </a>
            <a href="" className="sq-button sq-button_red editor_remove">
               <FontAwesomeIcon icon={['fas', 'trash']} />
            </a>
         </span>,
      );

      console.log(this.props.notifications);
      let table = $(this.myRef.current).DataTable({
         dom: '<"table"<"table-find"f><"table-data"t><"table-info"li><"table-pages"p>>',
         responsive: true,
         data: this.props.notifications,
         oLanguage: {
            searchPlaceholder: 'Search records',
            oPaginate: {
               sFirst: '<<',
               sPrevious: '<',
               sNext: '>',
               sLast: '>>',
            },
            sSearch: '',
         },
         aLengthMenu: [[10, 50, 100, -1], [10, 50, 100, 'All']],
         pageLength: 10,
         columns: [
            {
               title: 'ID',
               data: 'id',
               visible: false,
               searchable: false,
            },
            {
               title: 'Message',
               data: 'message',
            },
            {
               title: 'Read',
               data: 'isRead',
            },
            {
               searchable: false,
               title: 'Edit',
               data: null,
               orderable: false,
               className: 'table__edit',
               defaultContent: tableActions,
            },
         ],
      });

      $('.dataTables_filter input').attr('placeholder', 'Search...');

      $(this.myRef.current)
         .find('tbody')
         .on('click', 'tr', function() {
            if ($(this).hasClass('selected')) {
               $(this).removeClass('selected');
            } else {
               table.$('tr.selected').removeClass('selected');
               $(this).addClass('selected');
            }
         });

      $(this.myRef.current).on('click', 'a.editor_edit', function(e) {
         e.preventDefault();

         console.log(
            $(this)
               .closest('tr')
               .find('td')
               .eq(1)
               .text(),
         );
      });

      $(this.myRef.current).on('click', 'a.editor_remove', function(e) {
         e.preventDefault();

         table
            .row('.selected')
            .remove()
            .draw(false);
      });
   }
   componentWillUnmount() {
      $('.data-table-wrapper')
         .find('table')
         .DataTable()
         .destroy(true);
   }
   shouldComponentUpdate() {
      return false;
   }

   // Methods
   // ----------------------------------------------------------------------------------------------

   // Render
   // ----------------------------------------------------------------------------------------------

   render() {
      return (
         <CommonLayout>
            <div className={'row'}>
               <div className="col-12">
                  <table className={'table table-striped table-bordered'} ref={this.myRef} />
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
