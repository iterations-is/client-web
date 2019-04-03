/**
 * @file Add
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import { verifyJWT } from 'utils/authorization.util';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { actionSetPageTitle, actionSetPageVerifiedMark } from 'actions/page-header.action';
// import { actionChangeTabBarUsage } from 'actions/page-tabbar.action';
// import { actionHideInfoBar } from 'actions/info-bar.action';

import React from 'react';
import CommonLayout from 'layouts/CommonLayout';

// -------------------------------------------------------------------------------------------------
// Component
// -------------------------------------------------------------------------------------------------

class AddPage extends React.Component {
   // Init
   // ----------------------------------------------------------------------------------------------

   static async getInitialProps(ctx) {
      await verifyJWT(ctx);

      // // Set page header
      // ctx.store.dispatch(actionSetPageTitle('Create project'));
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
               <div className="col-12">
                  <h1>Public information</h1>
                  <h1>Content visibility options</h1>
                  <h1>Private information</h1>
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
)(AddPage);
