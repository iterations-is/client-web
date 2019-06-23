/**
 * @file PersonalData
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import { verifyJWT } from 'utils/authorization.util';
import Router, { withRouter } from 'next/router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import React, { Fragment } from 'react';
import CommonLayout from 'layouts/CommonLayout';
import axios from 'axios';

import { ErrorGetInitialProps } from 'utils/errors.util';
import { setProjectInitialProps } from 'utils/get-inital-props.util';
import Noty from 'noty';
import { Field, Form, Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMarkdown } from '@fortawesome/free-brands-svg-icons';
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
      let ajaxDataMetadata, ajaxDataIterations, ajaxCategories;

      try {
         [
            // Save data
            ajaxDataMetadata,
            ajaxDataIterations,
            ajaxCategories,
         ] = await Promise.all([
            // PROJECT
            axios.get(`${configServer.host}/api/project/${ctx.query.id_project}/metadata`, {
               headers: { Authorization: token },
            }),
            // ITERATIONS
            axios.get(`${configServer.host}/api/project/${ctx.query.id_project}/iterations`, {
               headers: { Authorization: token },
            }),
            // CATEGORY LIST
            axios.get(`${configServer.host}/api/projects/categories`, {
               headers: { Authorization: token },
            }),
         ]);
      } catch (e) {
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
            pageTitle: 'Settings',
            currentTab: 'settings',
            verifiedMark: false,
            invisibleTabIds: [],
         },
      );

      // Props
      // -------------------------------------------------------------------------------------------

      return {
         metadata: ajaxDataMetadata.data.dat,
         iterations: ajaxDataIterations.data.dat,
         categories: ajaxCategories.data.dat.categories,
      };
   }

   // Methods
   // ----------------------------------------------------------------------------------------------

   ajaxPatchPublicData = async ({ categoryId, name, descriptionPublic }) => {
      const { id: projectId } = this.props.metadata;

      try {
         await axios.patch(`${configServer.host}/api/project/${projectId}/metadata/public`, {
            categoryId,
            name,
            descriptionPublic,
         });
         new Noty({
            text: 'Public information was saved.',
            type: 'success',
         }).show();
         Router.push(window.location.pathname);
      } catch (e) {
         new Noty({
            text: 'Cannot save public information.',
            type: 'error',
         }).show();
      }
   };

   ajaxPatchPrivateData = async ({ descriptionPrivate }) => {
      const { id: projectId } = this.props.metadata;

      try {
         await axios.patch(`${configServer.host}/api/project/${projectId}/metadata/private`, {
            descriptionPrivate,
         });
         new Noty({
            text: 'Private description was saved.',
            type: 'success',
         }).show();
      } catch (e) {
         new Noty({
            text: 'Cannot save private description.',
            type: 'error',
         }).show();
      }
   };

   ajaxLeaveTeam = async () => {
      const { metadata } = this.props;

      try {
         await axios.delete(`${configServer.host}/api/project/${metadata.id}/team`);

         Router.push(`/project/${metadata.id}/contributors`);

         new Noty({
            text: 'You left the project.',
            type: 'success',
         }).show();
      } catch (e) {
         new Noty({
            text: 'Cannot leave the project. You are the last leader.',
            type: 'error',
         }).show();
      }
   };

   ajaxRemoveProject = async () => {
      const { metadata } = this.props;

      try {
         await axios.delete(`${configServer.host}/api/project/${metadata.id}`);

         Router.push(`/dashboard`);

         new Noty({
            text: 'You removed the project.',
            type: 'success',
         }).show();
      } catch (e) {
         new Noty({
            text: 'Cannot remove the project.',
            type: 'error',
         }).show();
      }
   };

   ajaxChangeSearchability = async () => {
      const { metadata } = this.props;

      try {
         let response = await axios.patch(
            `${configServer.host}/api/project/${metadata.id}/metadata/searchability`,
         );

         new Noty({
            text: 'Project is ' + response.data.dat.isSearchable ? 'searchable' : 'hidden',
            type: 'success',
         }).show();

         Router.push(window.location.pathname);
      } catch (e) {
         new Noty({
            text: 'Cannot change parameter.',
            type: 'error',
         }).show();
      }
   };

   ajaxChangeContentPublic = async () => {
      const { metadata } = this.props;

      try {
         let response = await axios.patch(
            `${configServer.host}/api/project/${metadata.id}/metadata/visibility`,
         );

         new Noty({
            text: 'Project content' + response.data.dat.isPublic ? 'is public' : 'is private',
            type: 'success',
         }).show();

         Router.push(window.location.pathname);
      } catch (e) {
         new Noty({
            text: 'Cannot change parameter.',
            type: 'error',
         }).show();
      }
   };

   ajaxOpenVacancies = async () => {
      const { metadata } = this.props;

      try {
         let response = await axios.patch(
            `${configServer.host}/api/project/${metadata.id}/roles/contributors`,
         );

         new Noty({
            text: 'Contributors are ' + response.data.dat.isPublic ? 'allowed' : 'denied',
            type: 'success',
         }).show();

         Router.push(window.location.pathname);
      } catch (e) {
         new Noty({
            text: 'Cannot change parameter.',
            type: 'error',
         }).show();
      }
   };

   // Render
   // ----------------------------------------------------------------------------------------------

   render = () => {
      const { categoryId, name, descriptionPublic } = this.props.metadata;

      const canEditProject =
         this.props.metadata.currentUserProjectRole !== 'NOBODY' &&
         this.props.metadata.currentUserProjectRole !== 'VISITOR';

      const isPartOfTeam = this.props.metadata.currentUserProjectRole !== 'NOBODY';

      const isNobody = this.props.metadata.currentUserProjectRole === 'NOBODY';

      return (
         <CommonLayout>
            {isNobody && (
               <div className="row">
                  <div className="col">
                     <p>We are sorry, but currently you have no power there.</p>
                  </div>
               </div>
            )}

            {canEditProject && (
               <Formik
                  onSubmit={this.ajaxPatchPublicData}
                  initialValues={{
                     categoryId,
                     name,
                     descriptionPublic,
                  }}
               >
                  <Form>
                     <div className="row">
                        <div className="col-12">
                           <h1>Public information</h1>
                        </div>
                     </div>

                     <div className="row">
                        <div className="col-12 col-md-4">
                           <div className="form-elem form-elem_select">
                              <span className="title">Category</span>
                              <label>
                                 <Field component="select" name="categoryId">
                                    {this.props.categories.map(role => {
                                       return (
                                          <option key={role.id} value={role.id}>
                                             {role.name}
                                          </option>
                                       );
                                    })}
                                 </Field>
                              </label>
                           </div>
                        </div>
                        <div className="col-12 col-md-8">
                           <div className="form-elem form-elem_input">
                              <span className="title">Project name</span>
                              <label>
                                 <Field
                                    type="text"
                                    name="name"
                                    placeholder="Magnificent project name"
                                 />
                              </label>
                           </div>
                        </div>
                     </div>

                     <div className="row">
                        <div className="col">
                           <div className="form-elem form-elem_textarea">
                              <span className="title">Public description</span>
                              <label>
                                 <Field
                                    component="textarea"
                                    name="descriptionPublic"
                                    placeholder="# Public description&#10;Text with *Markdown*."
                                 />
                              </label>
                              <div className="description">
                                 This description is always visible for everybody. Markdown{' '}
                                 <FontAwesomeIcon icon={faMarkdown} /> enabled.
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="row box">
                        <div className="col-4 offset-8">
                           <button type="submit" className="button button_gray">
                              Save public information
                           </button>
                        </div>
                     </div>
                  </Form>
               </Formik>
            )}

            {canEditProject && (
               <Formik
                  onSubmit={this.ajaxPatchPrivateData}
                  initialValues={{
                     descriptionPrivate: this.props.metadata.descriptionPrivate,
                  }}
               >
                  <Form>
                     <div className="row">
                        <div className="col-12">
                           <h1>Private information</h1>
                        </div>
                     </div>

                     <div className="row">
                        <div className="col">
                           <div className="form-elem form-elem_textarea">
                              <span className="title">Private description</span>
                              <label>
                                 <Field
                                    component="textarea"
                                    name="descriptionPrivate"
                                    placeholder="# Private description&#10;Text with *Markdown*."
                                 />
                              </label>
                              <div className="description">
                                 This description is always visible for everybody. Markdown{' '}
                                 <FontAwesomeIcon icon={faMarkdown} /> enabled.
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="row box">
                        <div className="col-4 offset-8">
                           <button type="submit" className="button button_gray">
                              Save private information
                           </button>
                        </div>
                     </div>
                  </Form>
               </Formik>
            )}

            {isPartOfTeam && (
               <Fragment>
                  <div className="row">
                     <div className="col-12">
                        <h1>Team</h1>
                     </div>
                  </div>
                  <div className="row box">
                     <div className="col-4">
                        <div className="button button_red" onClick={this.ajaxLeaveTeam}>
                           Leave project
                        </div>
                     </div>
                  </div>
               </Fragment>
            )}
            {canEditProject && (
               <Fragment>
                  <div className="row">
                     <div className="col">
                        <h1>Content visibility options</h1>
                     </div>
                  </div>

                  <Formik
                     onSubmit={() => this.ajaxChangeSearchability()}
                     initialValues={{
                        isSearchable: this.props.metadata.isSearchable,
                     }}
                  >
                     {({ handleChange, submitForm, values }) => (
                        <Form>
                           <div className="row">
                              <div className="col">
                                 <div className="form-elem form-elem_switch">
                                    <label className="switch">
                                       <Field
                                          type="checkbox"
                                          name="isSearchable"
                                          checked={values.isSearchable}
                                          onChange={e => {
                                             handleChange(e);
                                             setTimeout(submitForm, 0);
                                          }}
                                       />
                                       <span className="switch__inner" />
                                    </label>
                                    <span className="description">
                                       Add the project into global search list
                                    </span>
                                 </div>
                              </div>
                           </div>
                        </Form>
                     )}
                  </Formik>
                  <Formik
                     onSubmit={() => this.ajaxChangeContentPublic()}
                     initialValues={{
                        isPublic: this.props.metadata.isPublic,
                     }}
                  >
                     {({ handleChange, submitForm, values }) => (
                        <Form>
                           <div className="row">
                              <div className="col">
                                 <div className="form-elem form-elem_switch">
                                    <label className="switch">
                                       <Field
                                          type="checkbox"
                                          name="isPublic"
                                          checked={values.isPublic}
                                          onChange={e => {
                                             handleChange(e);
                                             setTimeout(submitForm, 0);
                                          }}
                                       />
                                       <span className="switch__inner" />
                                    </label>
                                    <span className="description">
                                       Make internal project content public
                                    </span>
                                 </div>
                              </div>
                           </div>
                        </Form>
                     )}
                  </Formik>
                  <Formik
                     onSubmit={() => this.ajaxOpenVacancies()}
                     initialValues={{
                        hasOpenVacancies: this.props.metadata.hasOpenVacancies,
                     }}
                  >
                     {({ handleChange, submitForm, values }) => (
                        <Form>
                           <div className="row">
                              <div className="col">
                                 <div className="form-elem form-elem_switch">
                                    <label className="switch">
                                       <Field
                                          type="checkbox"
                                          name="hasOpenVacancies"
                                          checked={values.hasOpenVacancies}
                                          onChange={e => {
                                             handleChange(e);
                                             setTimeout(submitForm, 0);
                                          }}
                                       />
                                       <span className="switch__inner" />
                                    </label>
                                    <span className="description">
                                       Allow users to join this project
                                    </span>
                                 </div>
                              </div>
                           </div>
                        </Form>
                     )}
                  </Formik>
               </Fragment>
            )}
            {canEditProject && (
               <div className="row">
                  <div className="col-4 offset-8">
                     <div className="button button_red" onClick={this.ajaxRemoveProject}>
                        Remove project
                     </div>
                  </div>
               </div>
            )}
         </CommonLayout>
      );
   };
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
