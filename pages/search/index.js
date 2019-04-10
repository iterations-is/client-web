/**
 * @file Search
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

const configServer = require('config/server.config');

// -------------------------------------------------------------------------------------------------
// Component
// -------------------------------------------------------------------------------------------------

class SearchPage extends React.Component {
   // Init
   // ----------------------------------------------------------------------------------------------

   static async getInitialProps(ctx) {
      await verifyJWT(ctx);

      // Header
      ctx.store.dispatch(actionSetPageTitle('Search'));
      ctx.store.dispatch(actionSetUsagePageVerifiedMark(false));
      ctx.store.dispatch(actionSetUsageTabBar(false));

      // Info Bar
      ctx.store.dispatch(actionSetUsageInfoBar(false));

      return {
         notifications: [],
      };
   }

   constructor(props) {
      super(props);
   }

   componentDidMount() {
      this.addFilterPlaceholder();
   }

   // Methods
   // ----------------------------------------------------------------------------------------------

   addFilterPlaceholder = () => {
      const filters = document.querySelectorAll('div.rt-th > input');
      for (let filter of filters) filter.placeholder = '^(regex)$';
   };

   // Render
   // ----------------------------------------------------------------------------------------------

   render() {
      const data = this.props.notifications;
      // const data = [];

      const columns = [
         {
            Header: 'Category',
            accessor: null,
         },
         {
            Header: 'Name',
            accessor: null,
         },
         {
            Header: 'Status',
            accessor: null,
         },
         {
            Header: 'Leader',
            accessor: null,
         },
         {
            Header: 'Vacancy',
            accessor: null,
         },
         {
            Header: 'Created',
            accessor: null,
         },
         {
            Header: '',
            expander: true,
            filterable: false,
            sortable: false,
            className: 'table__edit',
            width: 56,
         },
      ];

      return (
         <CommonLayout>
            <div className={'row'}>
               <div className="col-12">
                  <ReactTable
                     data={data}
                     columns={columns}
                     filterable={true}
                     SubComponent={row => {
                        let res = '';

                        return (
                           <div>
                              <div>Subcomponent</div>
                              {res}
                           </div>
                        );
                     }}
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
)(SearchPage);
