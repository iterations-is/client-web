/**
 * @file FAQ
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import { verifyJWT } from 'utils/authorization.util';
import Link from 'next/link';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionSetPageTitle, actionSetUsagePageVerifiedMark } from 'actions/page-header.action';
import { actionSetUsageTabBar } from 'actions/tab-bar.action';
import { actionSetUsageInfoBar } from 'actions/info-bar.action';

import React from 'react';
import CommonLayout from 'layouts/CommonLayout';

// -------------------------------------------------------------------------------------------------
// Component
// -------------------------------------------------------------------------------------------------

class FAQPage extends React.Component {
   // Init
   // ----------------------------------------------------------------------------------------------

   static async getInitialProps(ctx) {
      await verifyJWT(ctx);

      // Header
      ctx.store.dispatch(actionSetPageTitle('FAQ'));
      ctx.store.dispatch(actionSetUsagePageVerifiedMark(false));
      ctx.store.dispatch(actionSetUsageTabBar(false));

      // Info Bar
      ctx.store.dispatch(actionSetUsageInfoBar(false));

      const jwt = ctx.store.getState().reducerJWT;

      return {
         jwt,
      };
   }

   // Methods
   // ----------------------------------------------------------------------------------------------

   // Render
   // ----------------------------------------------------------------------------------------------

   render() {
      return (
         <CommonLayout>
            <div className={'row'}>
               <div className="col-md-6 col-sm-12">
                  <h1>Documentations</h1>
                  <p>
                     <strong>Q:</strong> Is there any documentation for developers?
                     <br />
                     <strong>A:</strong> Developer documentation is available at{' '}
                     <a href="https://iterations-is.github.io/docs-dev/#/" target="_blank">
                        https://iterations-is.github.io/docs-dev/
                     </a>
                  </p>
                  <p>
                     <strong>Q:</strong> Is there any documentation for users?
                     <br />
                     <strong>A:</strong> User documentation is available at{' '}
                     <a href="https://iterations-is.github.io/docs-user/#/" target="_blank">
                        https://iterations-is.github.io/docs-user/
                     </a>
                  </p>
               </div>
               <div className="col-md-6 col-sm-12">
                  <h1>Personal information</h1>
                  <p>
                     <strong>Q:</strong> Which personal data do you store?
                     <br />
                     <strong>A:</strong> We store only one item that could be marked as personal -
                     your public OAuth data from the third party service. You can modify them via
                     your OAuth service or contact us at user@example.com to change or delete them.
                  </p>
                  <p>OAuth ID: {this.props.jwt.payload.authId}</p>
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
)(FAQPage);
