/**
 * @file PersonalData
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import { verifyJWT } from 'utils/authorization.util';
import { withRouter } from 'next/router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionSetPageTitle, actionSetUsagePageVerifiedMark } from 'actions/page-header.action';
import {
   actionSetTabActive,
   actionSetTabBarItems,
   actionSetUsageTabBar,
} from 'actions/tab-bar.action';
import { actionSetInfoBarItems, actionSetUsageInfoBar } from 'actions/info-bar.action';

import React from 'react';
import CommonLayout from 'layouts/CommonLayout';
import axios from 'axios';

import Link from 'next/link';

import ReactMarkdown from 'react-markdown';
import Router from 'next/router';
import { ErrorGetInitialProps } from '../../../src/utils/errors.util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
const configServer = require('config/server.config');

// -------------------------------------------------------------------------------------------------
// Component
// -------------------------------------------------------------------------------------------------

class ProjectPage extends React.Component {
   // Init
   // ----------------------------------------------------------------------------------------------

   static async getInitialProps(ctx) {
      console.log(`GIP Content`);
      // Authorization
      // -------------------------------------------------------------------------------------------

      await verifyJWT(ctx);

      // Ajax
      // -------------------------------------------------------------------------------------------

      const token = ctx.store.getState().reducerJWT.token;

      let ajaxDataProject, ajaxDataIterations, ajaxInterpreters;

      try {
         [
            // Save data
            ajaxDataProject,
            ajaxDataIterations,
            // ajaxInterpreters,
         ] = await Promise.all([
            // PROJECT
            axios.get(`${configServer.host}/api/project/${ctx.query.id_project}/metadata`, {
               headers: {
                  Authorization: token,
               },
            }),
            // ITERATIONS
            axios.get(`${configServer.host}/api/project/${ctx.query.id_project}/parts`, {
               headers: {
                  Authorization: token,
               },
            }),
            // INTERPRETERS
            // axios.get(`https://api.github.com/repositories/181357697/contents/dist`),
         ]);
      } catch (e) {
         console.log(e);
         // Requests were failed
         throw new ErrorGetInitialProps('Requests failed', 800);
      }

      // Redux states
      // -------------------------------------------------------------------------------------------

      ctx.store.dispatch(actionSetPageTitle(ajaxDataProject.data.dat.public.name));
      ctx.store.dispatch(
         actionSetTabBarItems([
            {
               tabId: 'description',
               tabTitle: 'Description',
               tabLink: `/project/description?id_project=${ajaxDataProject.data.dat.public.id}`,
               tabLinkAs: `/project/${ajaxDataProject.data.dat.public.id}/description`,
               tabActive: false,
               tabVisible: true,
            },
            {
               tabId: 'content',
               tabTitle: 'Content',
               tabLink: `/project/content?id_project=${ajaxDataProject.data.dat.public.id}`,
               tabLinkAs: `/project/${ajaxDataProject.data.dat.public.id}/content`,
               tabActive: true,
               tabVisible: true,
            },
            {
               tabId: 'iterations',
               tabTitle: 'Iterations',
               tabLink: `/project/iterations?id_project=${ajaxDataProject.data.dat.public.id}`,
               tabLinkAs: `/project/${ajaxDataProject.data.dat.public.id}/iterations`,
               tabActive: false,
               tabVisible: true,
            },
            {
               tabId: 'contributors',
               tabTitle: 'Contributors',
               tabLink: `/project/contributors?id_project=${ajaxDataProject.data.dat.public.id}`,
               tabLinkAs: `/project/${ajaxDataProject.data.dat.public.id}/contributors`,
               tabActive: false,
               tabVisible: true,
            },
            {
               tabId: 'settings',
               tabTitle: 'Settings',
               tabLink: `/project/settings?id_project=${ajaxDataProject.data.dat.public.id}`,
               tabLinkAs: `/project/${ajaxDataProject.data.dat.public.id}/settings`,
               tabActive: false,
               tabVisible: true,
            },
         ]),
      );

      ctx.store.dispatch(actionSetUsagePageVerifiedMark(false));
      ctx.store.dispatch(actionSetUsageTabBar(true));
      ctx.store.dispatch(
         actionSetInfoBarItems([
            {
               title: 'Category',
               items: [
                  {
                     title: ajaxDataProject.data.dat.public.category.name,
                  },
               ],
            },
            {
               title: 'Metadata',
               items: [
                  {
                     title: 'Public content',
                     label: {
                        text: ajaxDataProject.data.dat.public.isPublic ? 'YES' : 'NO',
                        color: ajaxDataProject.data.dat.public.isPublic ? 'green' : 'red',
                     },
                  },
                  {
                     title: 'Archived',
                     label: {
                        text: ajaxDataProject.data.dat.public.isArchived ? 'YES' : 'NO',
                        color: ajaxDataProject.data.dat.public.isArchived ? 'red' : 'green',
                     },
                  },
                  {
                     title: 'Searchable',
                     label: {
                        text: ajaxDataProject.data.dat.public.isSearchable ? 'YES' : 'NO',
                        color: ajaxDataProject.data.dat.public.isSearchable ? 'green' : 'red',
                     },
                  },
                  {
                     title: 'Open vacancies',
                     label: {
                        text: ajaxDataProject.data.dat.public.hasOpenVacancies ? 'YES' : 'NO',
                        color: ajaxDataProject.data.dat.public.hasOpenVacancies ? 'green' : 'red',
                     },
                  },
               ],
            },
         ]),
      );

      // Info Bar
      ctx.store.dispatch(actionSetUsageInfoBar(true));

      return {
         metadata: ajaxDataProject.data.dat.public,
         iterations: ajaxDataIterations.data.dat,
         interpreters: [{ name: 'text-plain' }, { name: 'image-plain' }],
      };
   }

   constructor(props) {
      super(props);

      this.state = {
         parts: this.props.iterations.parts,
      };
   }

   componentDidMount() {
      let uniqueInterpreters = new Set();

      for (const part of this.props.iterations.parts) {
         uniqueInterpreters.add(part.document.interpreter);
      }

      for (const interpreter of uniqueInterpreters) {
         const file = `https://cdn.jsdelivr.net/gh/iterations-is/interpreters@latest/dist/${interpreter}/index.js`;
         let script = document.createElement('script');
         script.src = file;

         script.onload = () => {
            console.log(`${interpreter} LOADED`);
            for (const part of this.state.parts) {
               if (part.document.interpreter === interpreter) {
                  part.document.html = window.iterations.interpreters[interpreter].render(
                     part.document.store,
                  );
               }
            }

            this.setState({});
         };
         document.head.appendChild(script);
      }
   }

   // Methods
   // ----------------------------------------------------------------------------------------------
   createMarkup = html => {
      return { __html: html };
   };

   ajaxRemovePart = async partId => {
      console.log(this.props.metadata.id, partId);
      try {
         await axios.delete(
            `${configServer.host}/api/project/${this.props.metadata.id}/part/${partId}`,
         );

         let newState = [...this.state.parts];

         for (let i = 0; i < newState.length; ++i) {
            if (newState[i].id === partId) {
               newState.splice(i, 1);
               break;
            }
         }

         this.setState({ parts: newState });
      } catch (e) {}
   };

   // Render
   // ----------------------------------------------------------------------------------------------

   render() {
      return (
         <CommonLayout>
            <div className="row">
               <div className="col">
                  <h1>Content</h1>
                  {this.state.parts.map(part => {
                     return (
                        <div className="row" key={part.id}>
                           <div className="col-11">
                              <div
                                 dangerouslySetInnerHTML={this.createMarkup(part.document.html)}
                              />
                           </div>
                           <div className="col-1">
                              <Link
                                 as={`/project/${this.props.metadata.id}/content/part/${part.id}`}
                                 href={`/project/content/part?id_project=${
                                    this.props.metadata.id
                                 }&id_part=${part.id}`}
                              >
                                 <a className="sq-button sq-button_blue">
                                    <FontAwesomeIcon icon={faEdit} />
                                 </a>
                              </Link>

                              <div
                                 className="sq-button sq-button_red"
                                 onClick={() => this.ajaxRemovePart(part.id)}
                              >
                                 <FontAwesomeIcon icon={faTrash} />
                              </div>
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>
            <div className="row">
               <div className="col-6" />
               <div className="col-6">
                  <Link
                     as={`/project/${this.props.metadata.id}/content/create`}
                     href={`/project/content/create?id_project=${this.props.metadata.id}`}
                  >
                     <a className="button button_green">Create a part</a>
                  </Link>
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
)(withRouter(ProjectPage));
