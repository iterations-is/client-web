/**
 * @file Admin panel
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

class PanelPage extends React.Component {
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
                  <h1>Admin panel</h1>
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
