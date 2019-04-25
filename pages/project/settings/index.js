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

import { ErrorGetInitialProps } from 'utils/errors.util';
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
               <div className="col">
                  <pre>
                     <code>{JSON.stringify(this.props.metadata, null, 3)}</code>
                  </pre>
                  <hr />
                  <pre>
                     <code>{JSON.stringify(this.props.iterations, null, 3)}</code>
                  </pre>
                  <hr />
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
