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

import ReactMarkdown from 'react-markdown';
import Router from 'next/router';
import { ErrorGetInitialProps } from 'utils/errors.util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Field, Form, Formik } from 'formik';
const configServer = require('config/server.config');

// -------------------------------------------------------------------------------------------------
// Component
// -------------------------------------------------------------------------------------------------

class ProjectPage extends React.Component {
   // Init
   // ----------------------------------------------------------------------------------------------

   static async getInitialProps(ctx) {
      // Authorization
      // -------------------------------------------------------------------------------------------
      console.log(`GIP Create`);
      await verifyJWT(ctx);

      // Ajax
      // -------------------------------------------------------------------------------------------

      const token = ctx.store.getState().reducerJWT.token;

      let ajaxDataProject, ajaxDataIterations, ajaxInterpreters;

      try {
         [
            // Save data
            ajaxDataProject,
            // ajaxInterpreters,
         ] = await Promise.all([
            // PROJECT
            axios.get(`${configServer.host}/api/project/${ctx.query.id_project}/metadata`, {
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
         interpreters: [{ name: 'text-plain' }, { name: 'image-plain' }],
      };
   }

   constructor(props) {
      super(props);

      this.state = {};
   }

   componentDidMount() {}

   // Methods
   // ----------------------------------------------------------------------------------------------

   ajaxCreatePart = async data => {
      console.log(this.props.metadata.id, data);
      try {
         await axios.post(`${configServer.host}/api/project/${this.props.metadata.id}/parts`, data);

         Router.push(`/project/${this.props.metadata.id}/content`);
      } catch (e) {}
   };

   // Render
   // ----------------------------------------------------------------------------------------------

   render() {
      return (
         <CommonLayout>
            <div className="row">
               <div className="col">
                  <h1>Create part</h1>
                  <Formik
                     initialValues={{
                        interpreter:
                           this.props.interpreters.length > 0
                              ? this.props.interpreters[0].name
                              : '',
                        store: {
                           title: '',
                           body: '',
                        },
                     }}
                     onSubmit={this.ajaxCreatePart}
                  >
                     <Form>
                        <div className="row">
                           <div className="col">
                              <label>
                                 <span>Interpreter</span>
                                 <Field component="select" name="interpreter">
                                    {this.props.interpreters.map((item, i) => {
                                       return (
                                          <option key={i} value={item.name}>
                                             {item.name}
                                          </option>
                                       );
                                    })}
                                 </Field>
                              </label>
                           </div>
                           <div className="col">
                              <label>
                                 <span>Title</span>
                                 <Field type="text" name="store.title" />
                              </label>
                           </div>
                        </div>

                        <label>
                           <span>Store</span>
                           <Field component="textarea" name="store.body" />
                        </label>

                        <button className="button button_green" onSubmit={this.ajaxCreatePart}>
                           {' '}
                           Create part
                        </button>
                     </Form>
                  </Formik>
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
