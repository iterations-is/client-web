/**
 * @file Create Content Page
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
import { Field, Form, Formik } from 'formik';
import { setProjectInitialProps } from '../../../../../src/utils/get-inital-props.util';
const configServer = require('config/server.config');

// -------------------------------------------------------------------------------------------------
// Component
// ------------------------------------------------------- ------------------------------------------

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

      let ajaxDataMetadata, ajaxDataTasks;

      try {
         [
            // Save data
            ajaxDataMetadata,
            ajaxDataTasks,
         ] = await Promise.all([
            // PROJECT
            axios.get(`${configServer.host}/api/project/${ctx.query.id_project}/metadata`, {
               headers: { Authorization: token },
            }),
            // Iteration TASKS
            axios.get(
               `${configServer.host}/api/project/${ctx.query.id_project}/iteration/${
                  ctx.query.id_iteration
               }/tasks`,
               {
                  headers: { Authorization: token },
               },
            ),
         ]);
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
            pageTitle: 'Create a snapshot',
            currentTab: 'iterations',
            verifiedMark: false,
            invisibleTabIds: [],
         },
      );

      // Props
      // -------------------------------------------------------------------------------------------

      return {
         metadata: ajaxDataMetadata.data.dat,
         iterationId: ctx.query.id_iteration,
         ajaxTasks: ajaxDataTasks.data.dat,
      };
   }

   constructor(props) {
      super(props);

      this.state = {};
   }

   componentDidMount() {}

   // Methods
   // ----------------------------------------------------------------------------------------------

   ajaxCreateSnapshot = async data => {
      console.log(this.props.metadata.id, data);
      console.log(this.props.iterationId);
      try {
         let snapshot = await axios.post(
            `${configServer.host}/api/project/${this.props.metadata.id}/iteration/${
               this.props.iterationId
            }/snapshots`,
            data,
         );

         let snapshotId = snapshot.data.dat.id;

         Router.push(
            `/project/${this.props.metadata.id}/iterations/${
               this.props.iterationId
            }/snapshot/${snapshotId}`,
         );
      } catch (e) {}
   };

   // Render
   // ----------------------------------------------------------------------------------------------

   render() {
      return (
         <CommonLayout>
            <div className="row">
               <div className="col">
                  <table className="table">
                     <thead>
                        <tr>
                           <th>Name</th>
                           <th>Min</th>
                           <th>Max</th>
                        </tr>
                     </thead>
                     <tbody>
                        {this.props.ajaxTasks.tasks.map((task, index) => (
                           <tr key={index}>
                              <td>
                                 <strong>{task.title}</strong>
                                 <br />
                                 {task.description}
                              </td>
                              <td>{task.pointsMin}</td>
                              <td>{task.pointsMax}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>

            <Formik
               initialValues={{
                  parts: [
                     {
                        tasks: [44],
                        document: {
                           interpreter: 'text-plain',
                           store: {
                              title: 'Part 1',
                              body: 'Text',
                           },
                        },
                     },
                  ],
               }}
               onSubmit={this.ajaxCreateSnapshot}
            >
               <Form>
                  <div className="row">
                     <div className="col">
                        <div className="form-elem form-elem_select" />
                        <button type="submit" className="button button_yellow">
                           Create
                        </button>
                     </div>
                  </div>
               </Form>
            </Formik>
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
