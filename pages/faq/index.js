/**
 * @file FAQ
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import { verifyJWT } from 'utils/authorization.util';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { actionSetPageTitle, actionSetPageVerifiedMark } from 'actions/page-header.action';
// import { actionHideInfoBar } from 'actions/info-bar.action';
// import { actionChangeTabBarUsage } from 'actions/page-tabbar.action';

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

      // // Set page header
      // ctx.store.dispatch(actionSetPageTitle('FAQ'));
      // ctx.store.dispatch(actionSetPageVerifiedMark(false));
      // ctx.store.dispatch(actionChangeTabBarUsage(false));
      //
      // // Info Bar
      // ctx.store.dispatch(actionHideInfoBar());

      return {};
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
                  <h1>Documentation</h1>
                  <p>
                     <strong>Q:</strong> I don't know how to do XYZ, where can I find it?
                     <br />
                     <strong>A:</strong> User documentation is available at{' '}
                     <a href="https://iterations-is.github.io/docs-dev/#/" target="_blank">
                        https://iterations-is.github.io/docs-dev/
                     </a>
                  </p>
               </div>
               <div className="col-md-6 col-sm-12">
                  <h1>Personal information</h1>

                  <p>
                     <strong>Q:</strong> I don't know how to do XYZ, where can I find it?
                     <br />
                     <strong>A:</strong> User documentation is available at{' '}
                     <a href="https://iterations-is.github.io/docs-dev/#/" target="_blank">
                        https://iterations-is.github.io/docs-dev/
                     </a>
                  </p>

                  <p>
                     <strong>Q:</strong> I don't know how to do XYZ, where can I find it?
                     <br />
                     <strong>A:</strong> User documentation is available at{' '}
                     <a href="https://iterations-is.github.io/docs-dev/#/" target="_blank">
                        https://iterations-is.github.io/docs-dev/
                     </a>
                  </p>
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
