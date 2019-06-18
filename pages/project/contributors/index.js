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
import { setProjectInitialProps } from 'utils/get-inital-props.util';
const configServer = require('config/server.config');
import Noty from 'noty';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';

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
      let ajaxDataMetadata, ajaxDataTeam;

      try {
         [
            // Save data
            ajaxDataMetadata,
            ajaxDataTeam,
         ] = await Promise.all([
            // Metadata
            axios.get(`${configServer.host}/api/project/${ctx.query.id_project}/metadata`, {
               headers: { Authorization: token },
            }),
            // Iterations
            axios.get(`${configServer.host}/api/project/${ctx.query.id_project}/team`, {
               headers: { Authorization: token },
            }),
         ]);
      } catch (e) {
         // Requests were failed
         throw new ErrorGetInitialProps('Requests failed', 500);
      }

      // Redux states
      // -------------------------------------------------------------------------------------------

      setProjectInitialProps(
         ctx,
         {
            metadata: ajaxDataMetadata.data.dat,
         },
         {
            pageTitle: 'Contributors',
            currentTab: 'contributors',
            verifiedMark: false,
            invisibleTabIds: [],
         },
      );

      // Props
      // -------------------------------------------------------------------------------------------

      return {
         ajaxMetadata: ajaxDataMetadata.data.dat,
         ajaxTeam: ajaxDataTeam.data.dat.team,
      };
   }

   // Methods
   // ----------------------------------------------------------------------------------------------

   ajaxJoinTeam = async roleId => {
      const { ajaxMetadata } = this.props;

      try {
         await axios.post(`${configServer.host}/api/project/${ajaxMetadata.id}/team`, {
            projectRoleId: roleId,
         });

         Router.push(`/project/${ajaxMetadata.id}/contributors`);

         new Noty({
            text: 'You joined the project.',
            type: 'success',
         }).show();
      } catch (e) {
         new Noty({
            text: 'You cannot assign or change a role: no capacity or you are the last leader.',
            type: 'error',
         }).show();
      }
   };

   ajaxLeaveTeam = async () => {
      const { ajaxMetadata } = this.props;

      try {
         await axios.delete(`${configServer.host}/api/project/${ajaxMetadata.id}/team`);

         Router.push(`/project/${ajaxMetadata.id}/contributors`);

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

   ajaxRemoveFromTeam = async username => {
      const { ajaxMetadata } = this.props;

      try {
         await axios.delete(`${configServer.host}/api/project/${ajaxMetadata.id}/team/user`, {
            data: {
               username: username,
            },
         });

         Router.push(`/project/${ajaxMetadata.id}/contributors`);

         new Noty({
            text: 'You remove user from the project.',
            type: 'success',
         }).show();
      } catch (e) {
         new Noty({
            text: 'Cannot remove user.',
            type: 'error',
         }).show();
      }
   };

   // Render
   // ----------------------------------------------------------------------------------------------

   render() {
      const { ajaxMetadata, ajaxTeam } = this.props;

      let userIsInTeam = false;
      (() => {
         for (const role of ajaxTeam) {
            for (const user of role[0]['users']) {
               if (user['id'] === this.props.jwtPayload.userId) {
                  userIsInTeam = true;
                  return;
               }
            }
         }
      })();

      return (
         <CommonLayout>
            {ajaxTeam.map((item, idx) => (
               <div className="box" key={idx}>
                  <div className="row">
                     <div className="col-8">
                        <h2>
                           {item[0].name}{' '}
                           {item[0].name !== 'Leader' && item[0].name !== 'Visitors' && (
                              <span>
                                 ({item[0].users.length} / {item[0].capacity})
                              </span>
                           )}
                        </h2>
                     </div>

                     <div className="col-4">
                        {ajaxMetadata.hasOpenVacancies &&
                           (item[0].isEditable !== false || item[0].name === 'Visitors') && (
                              <a
                                 onClick={() => this.ajaxJoinTeam(item[0].id)}
                                 className="button button_gray"
                              >
                                 Join
                              </a>
                           )}
                     </div>
                  </div>

                  <div className="row">
                     <div className="col">
                        {item[0].users.map((user, idx) => (
                           <div>
                              <div key={idx} className="team__contributor">
                                 {user.authUsername}
                              </div>
                              <div
                                 className="sq-button sq-button_red"
                                 onClick={() => this.ajaxRemoveFromTeam(user.authUsername)}
                              >
                                 <FontAwesomeIcon icon={faTrash} />
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            ))}
            <div className="row">
               <div className="col-6" />
               <div className="col-6">
                  {userIsInTeam && (
                     <a className="button button_red" onClick={this.ajaxLeaveTeam}>
                        Leave team
                     </a>
                  )}
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
   return {
      jwtPayload: state.reducerJWT.payload,
   };
};

const mapDispatchToProps = dispatch => {
   return bindActionCreators({}, dispatch);
};

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(withRouter(ProjectPage));
