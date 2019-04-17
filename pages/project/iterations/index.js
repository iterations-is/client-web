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
import Link from 'next/link';
import { ErrorGetInitialProps } from '../../../src/utils/errors.util';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faShareSquare, faStamp, faTrash } from '@fortawesome/free-solid-svg-icons';
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

      let ajaxDataProject, ajaxDataIterations;

      try {
         [
            // Save data
            ajaxDataProject,
            ajaxDataIterations,
         ] = await Promise.all([
            // PROJECT
            axios.get(`${configServer.host}/api/project/${ctx.query.id_project}/metadata`, {
               headers: {
                  Authorization: token,
               },
            }),
            // ITERATIONS
            axios.get(`${configServer.host}/api/project/${ctx.query.id_project}/iterations`, {
               headers: {
                  Authorization: token,
               },
            }),
         ]);
      } catch (e) {
         console.log(e);
         // Requests were failed
         throw new ErrorGetInitialProps('Requests failed', 800);
      }

      // Get snapshots
      try {
         for (let iteration of ajaxDataIterations.data.dat.iterations) {
            let snapshots = await axios.get(
               `${configServer.host}/api/project/${ctx.query.id_project}/iteration/${
                  iteration.id
               }/snapshots`,
               {
                  headers: {
                     Authorization: token,
                  },
               },
            );

            iteration.snapshots = snapshots.data.dat.snapshots;
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
         iterations: ajaxDataIterations.data.dat,
      };
   }

   // Methods
   // ----------------------------------------------------------------------------------------------

   ajaxSendSnapshotForGrading = async (iterationId, snapshotId) => {
      try {
         await axios.post(
            `${configServer.host}/api/project/${
               this.props.metadata.id
            }/iteration/${iterationId}/snapshot/${snapshotId}`,
         );

         Router.push(window.location.pathname);
      } catch (e) {}
   };

   ajaxEditGrades = async (iterationId, snapshotId) => {};

   // Render
   // ----------------------------------------------------------------------------------------------

   render() {
      return (
         <CommonLayout>
            <div className="row">
               <div className="col">
                  {this.props.iterations.iterations.map((iteration, idx) => (
                     <div key={idx} className="row">
                        <div className="col">
                           <h1>
                              {iteration.title} (
                              {moment(iteration.deadline).format('DD.MM.YY HH:mm')})
                           </h1>

                           {iteration.tasks.map((task, idxTask) => (
                              <div key={idxTask}>
                                 <div className="row">
                                    <div className="col-7">
                                       <strong>{task.title}</strong>
                                    </div>
                                    <div className="col-1">
                                       <strong>Min</strong>
                                    </div>
                                    <div className="col-1">
                                       <strong>Max</strong>
                                    </div>
                                    <div className="col-1">
                                       <strong>Value</strong>
                                    </div>
                                    <div className="col-2">
                                       <strong>Graded by</strong>
                                    </div>
                                 </div>
                                 <div className="row">
                                    <div className="col-7">{task.description}</div>
                                    <div className="col-1">{task.pointsMin}</div>
                                    <div className="col-1">{task.pointsMax}</div>
                                    <div className="col-1">?</div>
                                    <div className="col-2">?</div>
                                 </div>
                              </div>
                           ))}
                           <h2>Snapshots</h2>
                           <div className="table-responsive">
                              <table className="table">
                                 <thead>
                                    <tr>
                                       <th scope="col">Created</th>
                                       <th scope="col">Sent</th>
                                       <th scope="col">Graded</th>
                                       <th scope="col">Actions</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {iteration.snapshots.map((snapshot, idx) => (
                                       <tr key={idx}>
                                          <td>
                                             {snapshot.createdBy && (
                                                <React.Fragment>
                                                   {moment(snapshot.dateCreated).format(
                                                      'DD.MM.YYYY HH:mm',
                                                   )}
                                                   <br />
                                                   {snapshot.createdBy.authUsername || '-'}
                                                </React.Fragment>
                                             )}
                                          </td>
                                          <td>
                                             {snapshot.sentBy && (
                                                <React.Fragment>
                                                   {moment(snapshot.dateSent).format(
                                                      'DD.MM.YYYY HH:mm',
                                                   )}
                                                   <br />
                                                   {snapshot.sentBy.authUsername || '-'}
                                                </React.Fragment>
                                             )}
                                          </td>
                                          <td>
                                             {snapshot.gradedBy && (
                                                <React.Fragment>
                                                   {moment(snapshot.dateGraded).format(
                                                      'DD.MM.YYYY HH:mm',
                                                   )}
                                                   <br />
                                                   {snapshot.gradedBy.authUsername || '-'}
                                                </React.Fragment>
                                             )}
                                          </td>
                                          <td>
                                             <Link
                                                as={`/project/${
                                                   this.props.metadata.id
                                                }/iterations/${iteration.id}/snapshot/${
                                                   snapshot.id
                                                }`}
                                                href={`/project/iterations/snapshot?id_project=${
                                                   this.props.metadata.id
                                                }&id_iteration=${iteration.id}&id_snapshot=${
                                                   snapshot.id
                                                }`}
                                             >
                                                <a className="sq-button sq-button_blue">
                                                   <FontAwesomeIcon icon={faEye} />
                                                </a>
                                             </Link>

                                             {snapshot.sentByUserId === null && (
                                                <a
                                                   className="sq-button sq-button_yellow"
                                                   onClick={() =>
                                                      this.ajaxSendSnapshotForGrading(
                                                         iteration.id,
                                                         snapshot.id,
                                                      )
                                                   }
                                                >
                                                   <FontAwesomeIcon icon={faShareSquare} />
                                                </a>
                                             )}

                                             {snapshot.sentByUserId !== null &&
                                                snapshot.gradedByUserId === null && (
                                                   <Link
                                                      as={`/project/${
                                                         this.props.metadata.id
                                                      }/iterations/${iteration.id}/snapshot/${
                                                         snapshot.id
                                                      }/grade`}
                                                      href={`/project/iterations/snapshot/grade?id_project=${
                                                         this.props.metadata.id
                                                      }&id_iteration=${iteration.id}&id_snapshot=${
                                                         snapshot.id
                                                      }`}
                                                   >
                                                      <a className="sq-button sq-button_yellow">
                                                         <FontAwesomeIcon icon={faStamp} />
                                                      </a>
                                                   </Link>
                                                )}

                                             {snapshot.sentByUserId !== null &&
                                                snapshot.gradedByUserId !== null && (
                                                   <a
                                                      className="sq-button sq-button_yellow"
                                                      onClick={() =>
                                                         this.ajaxEditGrades(
                                                            iteration.id,
                                                            snapshot.id,
                                                         )
                                                      }
                                                   >
                                                      <FontAwesomeIcon icon={faEdit} />
                                                   </a>
                                                )}

                                             <a className="sq-button sq-button_red">
                                                <FontAwesomeIcon icon={faTrash} />
                                             </a>
                                          </td>
                                       </tr>
                                    ))}
                                 </tbody>
                              </table>
                           </div>
                        </div>
                     </div>
                  ))}
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
