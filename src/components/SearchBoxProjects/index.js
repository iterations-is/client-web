import React, { Fragment } from 'react';
import ReactTable from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

// -------------------------------------------------------------------------------------------------
// Component
// -------------------------------------------------------------------------------------------------

class SearchBoxProjects extends React.Component {
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

   hasTagsSearch = (e, columns) => {
      this.reactTable.current.filterColumn(columns[6], e.target.value);
   };

   // Render
   // ----------------------------------------------------------------------------------------------

   render() {
      const data = this.props.projects || [];

      const columns = [
         {
            Header: 'Name',
            id: 'name',
            accessor: 'name',
            Cell: item => (
               <Link
                  as={`/project/${item.original.id}/description`}
                  href={`/project/description?id_project=${item.original.id}`}
               >
                  <span className="search-title-link">{item.original.name}</span>
               </Link>
            ),
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
         <Fragment>
            <div className="row">
               <div className="col">
                  <div className="form-elem form-elem_input">
                     <label>
                        <span className="title">Tags</span>
                        <input type="text" onChange={e => this.hasTagsSearch(e, columns)} />
                     </label>
                  </div>
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
                     SubComponent={row => (
                        <div className="table__subsection">
                           <div className="row">
                              <div className="col-8">
                                 <ReactMarkdown
                                    source={
                                       row.original.descriptionPublic === ''
                                          ? 'Project has no description.'
                                          : row.original.descriptionPublic
                                    }
                                 />
                              </div>
                              <div className="col-4">
                                 <strong>Created: </strong>
                                 <span>
                                    {moment(row.original.createdAt).format('DD.MM.YYYY HH:mm')}
                                 </span>
                                 <div />
                                 <strong>Tags:</strong>
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
                     )}
                  />
               </div>
            </div>
         </Fragment>
      );
   }
}

export default SearchBoxProjects;
