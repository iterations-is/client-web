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

import ReactMarkdown from 'react-markdown';
import { setProjectInitialProps } from 'utils/get-inital-props.util';
import { ErrorGetInitialProps } from 'utils/errors.util';
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
      let ajaxDataMetadata;

      try {
         [
            // Save data
            ajaxDataMetadata,
         ] = await Promise.all([
            // PROJECT
            axios.get(`${configServer.host}/api/project/${ctx.query.id_project}/metadata`, {
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
            pageTitle: ajaxDataMetadata.data.dat.name,
            currentTab: 'description',
            verifiedMark: ajaxDataMetadata.data.dat.verified,
            invisibleTabIds: [],
         },
      );

      // Props
      // -------------------------------------------------------------------------------------------

      return {
         ajaxMetadata: ajaxDataMetadata.data.dat,
      };
   }

   // Methods
   // ----------------------------------------------------------------------------------------------

   // Render
   // ----------------------------------------------------------------------------------------------

   render() {
      const { ajaxMetadata } = this.props;

      return (
         <CommonLayout>
            <div className="row">
               <div className="col-12 col-xl-6">
                  <ReactMarkdown
                     source={
                        ajaxMetadata.descriptionPublic === ''
                           ? 'No description.'
                           : ajaxMetadata.descriptionPublic
                     }
                  />
               </div>
               <div className="col-12 col-xl-6">
                  {ajaxMetadata.descriptionPrivate !== undefined && (
                     <React.Fragment>
                        <hr />
                        <ReactMarkdown
                           source={
                              ajaxMetadata.descriptionPrivate === ''
                                 ? 'No private description.'
                                 : ajaxMetadata.descriptionPrivate
                           }
                        />
                     </React.Fragment>
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
   return {};
};

const mapDispatchToProps = dispatch => {
   return bindActionCreators({}, dispatch);
};

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(withRouter(ProjectPage));
