/**
 * @file PersonalData
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import { verifyJWT } from 'utils/authorization.util';
import { withRouter } from 'next/router';

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

class ProjectPage extends React.Component {
   // Init
   // ----------------------------------------------------------------------------------------------

   static async getInitialProps(ctx) {
      await verifyJWT(ctx);

      // TODO Get project metadata
      // ctx.query.id_project

      // Header
      ctx.store.dispatch(actionSetPageTitle('project'));
      ctx.store.dispatch(actionSetUsagePageVerifiedMark(false));
      ctx.store.dispatch(actionSetUsageTabBar(true));

      // Info Bar
      ctx.store.dispatch(actionSetUsageInfoBar(true));

      return {};
   }

   // Methods
   // ----------------------------------------------------------------------------------------------

   // Render
   // ----------------------------------------------------------------------------------------------

   render() {
      let descriptionPublic = (
         <p>
            Public description semper iaculis lectus eu faucibus. Maecenas ullamcorper ipsum massa.
            Integer ut iaculis nunc, nec malesuada nibh. Praesent id posuere mi. Vestibulum quis
            quam tincidunt, blandit tellus nec, semper quam. Duis id laoreet nisl. Vestibulum
            tincidunt tortor eget ante auctor placerat quis quis tortor. Proin porttitor egestas
            porta. Donec ut ultricies mauris. Integer dictum, enim at eleifend convallis, ligula
            nisl dictum mauris, nec sollicitudin sem odio vel diam. Duis in enim eget felis dapibus
            varius sit amet vel enim. Ut imperdiet porttitor felis vitae molestie. Proin id lectus
            vehicula metus sodales bibendum a non tortor. Sed mauris erat, vestibulum et venenatis
            quis, condimentum sed arcu.
         </p>
      );

      let descriptionPrivate = (
         <p>
            Private description semper iaculis lectus eu faucibus. Maecenas ullamcorper ipsum massa.
            Integer ut iaculis nunc, nec malesuada nibh. Praesent id posuere mi. Vestibulum quis
            quam tincidunt, blandit tellus nec, semper quam. Duis id laoreet nisl. Vestibulum
            tincidunt tortor eget ante auctor placerat quis quis tortor. Proin porttitor egestas
            porta. Donec ut ultricies mauris. Integer dictum, enim at eleifend convallis, ligula
            nisl dictum mauris, nec sollicitudin sem odio vel diam. Duis in enim eget felis dapibus
            varius sit amet vel enim. Ut imperdiet porttitor felis vitae molestie. Proin id lectus
            vehicula metus sodales bibendum a non tortor. Sed mauris erat, vestibulum et venenatis
            quis, condimentum sed arcu.
         </p>
      );

      return (
         <CommonLayout>
            <div className="row">
               <div className="col">
                  <p>Project ID:{this.props.router.query.id_project}</p>
                  {descriptionPublic}
                  <h1>Description for contributors</h1>
                  {descriptionPrivate}
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
