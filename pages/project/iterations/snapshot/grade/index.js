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
import { ErrorGetInitialProps } from 'utils/errors.util';
import moment from 'moment';
import { Field, FieldArray, Form, Formik } from 'formik';
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

      let ajaxDataMetadata, ajaxTasks, ajaxDataSnapshot, ajaxDataSnapshotGrades;

      try {
         [
            // Save data
            ajaxDataMetadata,
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

      setProjectInitialProps(
         ctx,
         {
            metadata: ajaxDataMetadata.data.dat,
         },
         {
            pageTitle: 'Grade a snapshot',
            currentTab: 'iterations',
            verifiedMark: false,
            invisibleTabIds: [],
         },
      );

      // Props
      // -------------------------------------------------------------------------------------------

      return {
         metadata: ajaxDataMetadata.data.dat,
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
            <Formik initialValues={{ grades: initialStateForm }} onSubmit={this.ajaxGradeSnapshot}>
               <Form>
                  <button className="button button_yellow" type="submit">
                     Save grades
                  </button>
                  <div className="row">
                     <div className="col">
                        <div>
                           <h2>Iteration</h2>
                           {this.props.snapshot.iteration.title}
                           <h3>Created</h3>
                           {this.props.snapshot.createdBy && (
                              <React.Fragment>
                                 {moment(this.props.snapshot.dateCreated).format(
                                    'DD.MM.YYYY HH:mm',
                                 )}
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
                              </div>
                           )}
                        />
                     </div>
                  </div>
               </Form>
            </Formik>

            {this.state.parts.map(part => {
               return (
                  <div className="row" key={part.id}>
                     <div className="col-12">
                        <div dangerouslySetInnerHTML={this.createMarkup(part.document.html)} />
                     </div>
                  </div>
               );
            })}
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
