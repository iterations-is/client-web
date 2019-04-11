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
import { faEye, faTrash, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

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
      // Ajax
      const token = ctx.store.getState().reducerJWT.token;

      let projectsList;

      try {
         projectsList = await axios.post(
            configServer.host + '/api/projects/search',
            {},
            {
               headers: {
                  Authorization: token,
               },
            },
         );
      } catch (err) {}

      return {
         projects: projectsList.data.dat.projects[0],
      };
   }

   constructor(props) {
      super(props);
      this.reactTable = React.createRef();
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

   // isPublicSearch = (e, columns) => {
   //    this.reactTable.current.filterColumn(columns[2], e.target.value);
   // };

   hasTagsSearch = (e, columns) => {
      this.reactTable.current.filterColumn(columns[6], e.target.value);
   };

   // Render
   // ----------------------------------------------------------------------------------------------

   render() {
      const data = this.props.projects;
      console.log(data);

      const columns = [
         {
            Header: 'Name',
            accessor: 'name',
         },
         {
            Header: 'Category',
            accessor: 'category.name',
            width: 200,
         },
         {
            Header: 'Public',
            id: 'isPublic',
            width: 90,
            accessor: item => {
               return item['isPublic'] ? 'Yes' : 'No';
            },
            filterMethod: (filter, row) => {
               switch (filter.value) {
                  case 'all':
                     return true;
                  case 'yes':
                     return row[filter.id] === 'Yes';
                  case 'no':
                     return row[filter.id] === 'No';
               }
            },
            Filter: ({ filter, onChange }) => (
               <select
                  onChange={event => onChange(event.target.value)}
                  value={filter ? filter.value : 'all'}
               >
                  <option value="all">All</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
               </select>
            ),
         },
         {
            Header: 'Archived',
            id: 'isArchived',
            width: 90,
            accessor: item => {
               return item['isArchived'] ? 'Yes' : 'No';
            },
            filterMethod: (filter, row) => {
               switch (filter.value) {
                  case 'all':
                     return true;
                  case 'yes':
                     return row[filter.id] === 'Yes';
                  case 'no':
                     return row[filter.id] === 'No';
               }
            },
            Filter: ({ filter, onChange }) => (
               <select
                  onChange={event => onChange(event.target.value)}
                  value={filter ? filter.value : 'all'}
               >
                  <option value="all">All</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
               </select>
            ),
         },
         {
            Header: 'Open Vacancies',
            id: 'hasOpenVacancies',
            width: 140,
            accessor: item => {
               return item['hasOpenVacancies'] ? 'Yes' : 'No';
            },
            filterMethod: (filter, row) => {
               switch (filter.value) {
                  case 'all':
                     return true;
                  case 'yes':
                     return row[filter.id] === 'Yes';
                  case 'no':
                     return row[filter.id] === 'No';
               }
            },
            Filter: ({ filter, onChange }) => (
               <select
                  onChange={event => onChange(event.target.value)}
                  value={filter ? filter.value : 'all'}
               >
                  <option value="all">All</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
               </select>
            ),
         },
         {
            Header: 'More',
            expander: true,
            filterable: false,
            sortable: false,
            width: 56,
            className: 'table__edit',
            Expander: ({ isExpanded, ...rest }) => (
               <div>
                  {isExpanded ? (
                     <div className="sq-button sq-button_blue">
                        <FontAwesomeIcon icon={faEyeSlash} />
                     </div>
                  ) : (
                     <div className="sq-button sq-button_blue">
                        <FontAwesomeIcon icon={faEye} />
                     </div>
                  )}
               </div>
            ),
         },
         {
            Header: 'Tags',
            id: 'tags',
            className: 'table__hidden-column',
            accessor: item => {
               let str = '';
               for (let tag of item.tags) {
                  str += ` ${tag.name}`;
               }
               return str;
            },
         },
      ];

      return (
         <CommonLayout>
            {/*<div className="row">*/}
            {/*<div className="col-lg-6 col-md-12">*/}
            {/*<label>*/}
            {/*<span>Public state</span>*/}
            {/*<select onChange={e => this.isPublicSearch(e, columns)}>*/}
            {/*<option value="">All</option>*/}
            {/*<option value="Yes">Yes</option>*/}
            {/*<option value="No">No</option>*/}
            {/*</select>*/}
            {/*</label>*/}
            {/*</div>*/}
            {/*</div>*/}
            <div className="row">
               <div className="col">
                  <label>
                     <span>Tags</span>
                     <input type="text" onChange={e => this.hasTagsSearch(e, columns)} />
                  </label>
               </div>
            </div>

            <div className={'row'}>
               <div className="col-12">
                  <ReactTable
                     ref={this.reactTable}
                     data={data}
                     columns={columns}
                     filterable={true}
                     className={'table_search-projects'}
                     SubComponent={row => {
                        let res = '';

                        return (
                           <div className="table__subsection">
                              <div className="row">
                                 <div className="col-6">
                                    <h3>Description</h3>
                                    <p>{row.original.descriptionPublic}</p>
                                 </div>
                                 <div className="col-6">
                                    <h3>Created</h3>
                                    <p>
                                       {moment(row.original.createdAt).format('DD.MM.YYYY HH:mm')}
                                    </p>
                                    <h3>Tags</h3>
                                    <div className="tags">
                                       {row.original.tags.map((item, idx) => (
                                          <span className="tag" key={idx}>
                                             {item.name}
                                          </span>
                                       ))}
                                    </div>
                                 </div>
                              </div>
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
