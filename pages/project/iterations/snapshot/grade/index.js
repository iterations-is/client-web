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
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faShareSquare, faStamp, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Field, FieldArray, Form, Formik } from 'formik';
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

      await verifyJWT(ctx);

      // Ajax
      // -------------------------------------------------------------------------------------------

      const token = ctx.store.getState().reducerJWT.token;

      let ajaxDataProject, ajaxTasks, ajaxDataSnapshot, ajaxDataSnapshotGrades;

      try {
         [
            // Save data
            ajaxDataProject,
            ajaxTasks,
            ajaxDataSnapshot,
            ajaxDataSnapshotGrades,
         ] = await Promise.all([
            // PROJECT
            axios.get(`${configServer.host}/api/project/${ctx.query.id_project}/metadata`, {
               headers: {
                  Authorization: token,
               },
            }),
            // Iteration TASKS
            axios.get(
               `${configServer.host}/api/project/${ctx.query.id_project}/iteration/${
                  ctx.query.id_iteration
               }/tasks`,
               {
                  headers: {
                     Authorization: token,
                  },
               },
            ),
            // SNAPSHOT
            axios.get(
               `${configServer.host}/api/project/${ctx.query.id_project}/iteration/${
                  ctx.query.id_iteration
               }/snapshot/${ctx.query.id_snapshot}`,
               {
                  headers: {
                     Authorization: token,
                  },
               },
            ),
            // SNAPSHOT GRADES
            axios.get(
               `${configServer.host}/api/project/${ctx.query.id_project}/iteration/${
                  ctx.query.id_iteration
               }/snapshot/${ctx.query.id_snapshot}/grades`,
               {
                  headers: {
                     Authorization: token,
                  },
               },
            ),
         ]);
      } catch (e) {
         console.log(e);
         // Requests were failed
         throw new ErrorGetInitialProps('Requests failed', 800);
      }

      // Get snapshots

      try {
         let parts = JSON.parse(ajaxDataSnapshot.data.dat.snapshot.partsListJson);
         ajaxDataSnapshot.data.dat.snapshot.parts = [];
         for (let partId of parts) {
            let part = await axios.get(
               `${configServer.host}/api/project/${ctx.query.id_project}/part/${partId}`,
               {
                  headers: {
                     Authorization: token,
                  },
               },
            );

            ajaxDataSnapshot.data.dat.snapshot.parts.push(part.data.dat.part);
         }
      } catch (e) {
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
               tabActive: false,
               tabVisible: true,
            },
            {
               tabId: 'iterations',
               tabTitle: 'Iterations',
               tabLink: `/project/iterations?id_project=${ajaxDataProject.data.dat.public.id}`,
               tabLinkAs: `/project/${ajaxDataProject.data.dat.public.id}/iterations`,
               tabActive: true,
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
         snapshot: ajaxDataSnapshot.data.dat.snapshot,
         tasks: ajaxTasks.data.dat,
         grades: ajaxDataSnapshotGrades.data.dat.grades,
      };
   }

   constructor(props) {
      super(props);

      this.state = {
         parts: this.props.snapshot.parts,
         grades: this.props.grades,
      };
   }

   componentDidMount() {
      let uniqueInterpreters = new Set();

      for (const part of this.state.parts) {
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

   ajaxGradeSnapshot = async data => {
      try {
         await axios.patch(
            `${configServer.host}/api/project/${this.props.metadata.id}/iteration/${
               this.props.snapshot.iterationsId
            }/snapshot/${this.props.snapshot.id}/grades`,
            data,
         );

         Router.push(
            `/project/${this.props.metadata.id}/iterations/${
               this.props.snapshot.iterationsId
            }/snapshot/${this.props.snapshot.id}`,
         );
      } catch (e) {}
   };

   // Render
   // ----------------------------------------------------------------------------------------------

   render() {
      const grades = this.props.grades;

      let initialStateForm = [];
      for (const grade of this.props.grades) {
         initialStateForm.push({
            id: grade.id,
            points: grade.points || 0,
            message: grade.message || '',
         });
      }

      return (
         <CommonLayout>
            <div className="button button_yellow" onClick={this.ajaxGradeSnapshot}>
               Save grades
            </div>
            <div className="row">
               <div className="col">
                  <div>
                     <h2>Iteration</h2>
                     {this.props.snapshot.iteration.title}
                     <h3>Created</h3>
                     {this.props.snapshot.createdBy && (
                        <React.Fragment>
                           {moment(this.props.snapshot.dateCreated).format('DD.MM.YYYY HH:mm')}
                           <br />
                           {this.props.snapshot.createdBy.authUsername || '-'}
                        </React.Fragment>
                     )}
                     <h3>Sent by</h3>
                     {this.props.snapshot.sentBy && (
                        <React.Fragment>
                           {moment(this.props.snapshot.dateSent).format('DD.MM.YYYY HH:mm')}
                           <br />
                           {this.props.snapshot.sentBy.authUsername || '-'}
                        </React.Fragment>
                     )}
                     <h3>Graded by</h3>
                     {this.props.snapshot.gradedBy && (
                        <React.Fragment>
                           {moment(this.props.snapshot.dateGraded).format('DD.MM.YYYY HH:mm')}
                           <br />
                           {this.props.snapshot.gradedBy.authUsername || '-'}
                        </React.Fragment>
                     )}
                  </div>

                  <h1>Tasks and grades</h1>

                  <Formik
                     initialValues={{ grades: initialStateForm }}
                     onSubmit={this.ajaxGradeSnapshot}
                  >
                     <Form>
                        <FieldArray
                           name="grades"
                           render={() => (
                              <div>
                                 <table className="table">
                                    <thead>
                                       <tr>
                                          <th>Name</th>
                                          <th>Min</th>
                                          <th>Max</th>
                                          <th>Value</th>
                                          <th>Comment</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       {grades.map((grade, index) => (
                                          <tr key={index}>
                                             <td>
                                                <strong>{grade.task.title}</strong>
                                                <br />
                                                {grade.task.description}
                                             </td>
                                             <td>{grade.task.pointsMin}</td>
                                             <td>{grade.task.pointsMax}</td>
                                             <td>
                                                <Field
                                                   name={`grades.${index}.points`}
                                                   type="number"
                                                />
                                             </td>
                                             <td>
                                                <Field
                                                   component="textarea"
                                                   name={`grades.${index}.message`}
                                                />
                                             </td>
                                          </tr>
                                       ))}
                                    </tbody>
                                 </table>
                                 <button className="button button_yellow" type="submit">
                                    Send
                                 </button>
                              </div>
                           )}
                        />
                     </Form>
                  </Formik>

                  <table className="table">
                     <thead>
                        <tr>
                           <th>Name</th>
                           <th>Min</th>
                           <th>Max</th>
                           <th>Value</th>
                           <th>Comment</th>
                        </tr>
                     </thead>
                     <tbody>
                        {grades.map((grade, idx) => (
                           <tr key={idx}>
                              <td>
                                 <strong>{grade.task.title}</strong>
                                 <br />
                                 {grade.task.description}
                              </td>
                              <td>{grade.task.pointsMin}</td>
                              <td>{grade.task.pointsMax}</td>
                              <td>{grade.points}</td>
                              <td>{grade.message}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>

                  {this.state.parts.map(part => {
                     return (
                        <div className="row" key={part.id}>
                           <div className="col-12">
                              <div
                                 dangerouslySetInnerHTML={this.createMarkup(part.document.html)}
                              />
                           </div>
                        </div>
                     );
                  })}
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
