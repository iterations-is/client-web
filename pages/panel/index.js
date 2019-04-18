/**
 * @file Admin panel
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import { verifyJWT } from 'utils/authorization.util';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionSetPageTitle, actionSetUsagePageVerifiedMark } from 'actions/page-header.action';
import { actionSetUsageTabBar } from 'actions/tab-bar.action';
import { actionSetUsageInfoBar } from 'actions/info-bar.action';

import React from 'react';
import { Field, Form, Formik } from 'formik';
import CommonLayout from 'layouts/CommonLayout';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Noty from 'noty';
import { ErrorGetInitialProps } from '../../src/utils/errors.util';
const configServer = require('config/server.config');

// -------------------------------------------------------------------------------------------------
// Component
// -------------------------------------------------------------------------------------------------

class PanelPage extends React.Component {
   // Init
   // ----------------------------------------------------------------------------------------------

   static async getInitialProps(ctx) {
      // Authorization
      // -------------------------------------------------------------------------------------------

      await verifyJWT(ctx);

      // Ajax
      // -------------------------------------------------------------------------------------------

      const token = ctx.store.getState().reducerJWT.token;

      let ajaxGlobalRoles, ajaxCategories;

      try {
         [
            ajaxGlobalRoles,
            ajaxCategories,
            //
         ] = await Promise.all([
            // Global Roles
            await axios.get(`${configServer.host}/api/dashboard/roles`, {
               headers: { Authorization: token },
            }),
            // Categories
            await axios.get(`${configServer.host}/api/projects/categories`, {
               headers: { Authorization: token },
            }),
         ]);
      } catch (e) {
         // Requests were failed
         throw new ErrorGetInitialProps('Requests failed', 500);
      }

      // Redux states
      // -------------------------------------------------------------------------------------------

      // Header
      ctx.store.dispatch(actionSetPageTitle('Control panel'));
      ctx.store.dispatch(actionSetUsagePageVerifiedMark(false));
      ctx.store.dispatch(actionSetUsageTabBar(false));

      // Info Bar
      ctx.store.dispatch(actionSetUsageInfoBar(false));

      // Props
      // -------------------------------------------------------------------------------------------

      return {
         globalRoles: ajaxGlobalRoles.data.dat.roles,
         categories: ajaxCategories.data.dat.categories,
      };
   }

   constructor(props) {
      super(props);

      this.state = {
         categories: this.props.categories,
      };
   }

   // Methods
   // ----------------------------------------------------------------------------------------------

   ajaxPatchUserGlobalRole = async (values, actions) => {
      try {
         await axios.patch(`${configServer.host}/api/dashboard/role`, values);
         new Noty({
            text: 'User role was changed successfully.',
            type: 'success',
         }).show();
      } catch (e) {
         new Noty({
            text: 'Cannot change user role.',
            type: 'error',
         }).show();
      }
   };

   ajaxCreateCategory = async values => {
      try {
         let category = await axios.post(`${configServer.host}/api/projects/categories`, values);

         new Noty({
            text: 'Project category was created.',
            type: 'success',
         }).show();

         let categories = [...this.state.categories];
         categories.push(category.data.dat.category);
         this.setState({ categories });
      } catch (e) {
         new Noty({
            text: 'Cannot create project category.',
            type: 'error',
         }).show();
      }
   };

   ajaxUpdateCategory = async (id, values) => {
      try {
         await axios.patch(`${configServer.host}/api/projects/category/${id}`, values);

         new Noty({
            text: 'Project category was updated.',
            type: 'success',
         }).show();
      } catch (e) {
         new Noty({
            text: 'Cannot update project category.',
            type: 'error',
         }).show();
      }
   };

   ajaxRemoveCategory = async (id, idx) => {
      try {
         await axios.delete(`${configServer.host}/api/projects/category/${id}`);

         new Noty({
            text: 'Project category was deleted.',
            type: 'success',
         }).show();

         let categories = [...this.state.categories];
         categories.splice(idx, 1);
         this.setState({ categories });
      } catch (e) {
         new Noty({
            text: 'Cannot delete project category. It has some dependencies.',
            type: 'error',
         }).show();
      }
   };

   // Render
   // ----------------------------------------------------------------------------------------------

   render() {
      const { categories } = this.state;

      const blockCategories = (
         <React.Fragment>
            <h1>Categories</h1>
            <label>
               <span>Name</span>
            </label>
            {categories.map((category, idx) => (
               <div className="row" key={category.id}>
                  <div className="col">
                     <Formik
                        initialValues={{ name: category.name }}
                        onSubmit={values => this.ajaxUpdateCategory(category.id, values)}
                     >
                        <Form>
                           <div className="row-flex">
                              <Field name="name" />
                              <button className="sq-button sq-button_green" type="submit">
                                 <FontAwesomeIcon icon={faSave} />
                              </button>

                              <div
                                 className="sq-button sq-button_red"
                                 onClick={() => this.ajaxRemoveCategory(category.id, idx)}
                              >
                                 <FontAwesomeIcon icon={faTrash} />
                              </div>
                           </div>
                        </Form>
                     </Formik>
                  </div>
               </div>
            ))}
            <div className="row">
               <div className="col">
                  <Formik
                     initialValues={{ name: '' }}
                     onSubmit={values => this.ajaxCreateCategory(values)}
                  >
                     <Form>
                        <div className="row-flex">
                           <Field name="name" />
                           <button className="sq-button sq-button_blue" type="submit">
                              <FontAwesomeIcon icon={faPlus} />
                           </button>
                           <button style={{ visibility: 'hidden' }} className="sq-button" />
                        </div>
                     </Form>
                  </Formik>
               </div>
            </div>
         </React.Fragment>
      );

      const blockChangeUserRole = (
         <React.Fragment>
            <h1>Change user role</h1>
            <Formik
               initialValues={{
                  username: '',
                  role: 1,
               }}
               onSubmit={this.ajaxPatchUserGlobalRole}
               render={props => (
                  <Form>
                     <label>
                        <span>Username</span>
                        <Field type="text" name="username" placeholder="username" />
                     </label>
                     <label>
                        <span>Role</span>
                        <Field component="select" name="role">
                           {this.props.globalRoles.map(role => {
                              return (
                                 <option key={role.id} value={role.id}>
                                    {role.name}
                                 </option>
                              );
                           })}
                        </Field>
                     </label>
                     <button className="button button_green" type="submit">
                        <FontAwesomeIcon icon={faSave} />
                        Update user role
                     </button>
                  </Form>
               )}
            />
         </React.Fragment>
      );

      return (
         <CommonLayout>
            <div className="row">
               <div className="col-12 col-lg-6">{blockChangeUserRole}</div>
               <div className="col-12 col-lg-6">{blockCategories}</div>
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
)(PanelPage);
