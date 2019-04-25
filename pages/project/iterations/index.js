/**
 * @file PersonalData
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import { verifyJWT } from 'utils/authorization.util';
import { withRouter } from 'next/router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import React from 'react';
import CommonLayout from 'layouts/CommonLayout';
import axios from 'axios';

import Router from 'next/router';
import Link from 'next/link';
import { ErrorGetInitialProps } from 'utils/errors.util';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faShareSquare, faStamp, faTrash } from '@fortawesome/free-solid-svg-icons';
import { setProjectInitialProps } from 'utils/get-inital-props.util';
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

      let ajaxDataMetadata, ajaxDataIterations;

      try {
         [
            // Save data
            ajaxDataMetadata,
            ajaxDataIterations,
         ] = await Promise.all([
            // PROJECT
            axios.get(`${configServer.host}/api/project/${ctx.query.id_project}/metadata`, {
               headers: { Authorization: token },
            }),
            // ITERATIONS
            axios.get(`${configServer.host}/api/project/${ctx.query.id_project}/iterations`, {
               headers: { Authorization: token },
            }),
         ]);
      } catch (e) {
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
                  headers: { Authorization: token },
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

      setProjectInitialProps(
         ctx,
         {
            metadata: ajaxDataMetadata.data.dat,
         },
         {
            pageTitle: 'Iterations',
            currentTab: 'iterations',
            verifiedMark: false,
            invisibleTabIds: [],
         },
      );

      // Props
      // -------------------------------------------------------------------------------------------

      return {
         metadata: ajaxDataMetadata.data.dat,
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
                  {this.props.iterations.iterations.length === 0 && (
                     <p>Current project doesn't have iterations.</p>
                  )}

                  {this.props.iterations.iterations.map((iteration, idx) => (
                     <div key={idx} className="row box">
                        <div className="col">
                           <h1>
                              {iteration.title} ({moment(iteration.deadline).format('DD.MM.YY')})
                           </h1>

                           {iteration.tasks.length === 0 && (
                              <div className="box">
                                 <p>This iteration has no tasks.</p>
                              </div>
                           )}

                           {iteration.tasks.map((task, idxTask) => (
                              <div key={idxTask} className="box">
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

                           <div className="row">
                              <div className="col-7">
                                 <h2>Snapshots</h2>
                              </div>
                              <div className="col-5">
                                 <Link
                                    as={`/project/${this.props.metadata.id}/iterations/${
                                       iteration.id
                                    }/snapshot/create`}
                                    href={`/project/iterations/snapshot/create?id_project=${
                                       this.props.metadata.id
                                    }&id_iteration=${iteration.id}`}
                                 >
                                    <a className="button button_gray">New snapshot</a>
                                 </Link>
                              </div>
                           </div>
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
