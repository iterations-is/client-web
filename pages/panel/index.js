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
import { faSave } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
const configServer = require('config/server.config');

// -------------------------------------------------------------------------------------------------
// Component
// -------------------------------------------------------------------------------------------------

class PanelPage extends React.Component {
   // Init
   // ----------------------------------------------------------------------------------------------

   static async getInitialProps(ctx) {
      await verifyJWT(ctx);

      // Header
      ctx.store.dispatch(actionSetPageTitle('Control panel'));
      ctx.store.dispatch(actionSetUsagePageVerifiedMark(false));
      ctx.store.dispatch(actionSetUsageTabBar(false));

      // Info Bar
      ctx.store.dispatch(actionSetUsageInfoBar(false));

      // Ajax
      const token = ctx.store.getState().reducerJWT.token;

      let globalRoles;
      try {
         globalRoles = await axios.get(`${configServer.host}/api/dashboard/roles`, {
            headers: {
               Authorization: token,
            },
         });
      } catch (err) {}

      return {
         globalRoles: globalRoles.data.dat.roles,
      };
   }

   // Methods
   // ----------------------------------------------------------------------------------------------

   // Render
   // ----------------------------------------------------------------------------------------------

   render() {
      return (
         <CommonLayout>
            <div className="row">
               <div className="col-6">
                  <div className="row">
                     <div className="col">
                        <h1>Change user role</h1>

                        <Formik
                           initialValues={{
                              username: '',
                              role: 1,
                           }}
                           onSubmit={async (values, actions) => {
                              try {
                                 await axios.patch(
                                    `${configServer.host}/api/dashboard/role`,
                                    values,
                                 );
                                 console.log(`Done`);
                              } catch (e) {
                                 console.log(`Fail`);
                              }
                           }}
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
                     </div>
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-12">
                  <h1>Permissions</h1>
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
)(PanelPage);
