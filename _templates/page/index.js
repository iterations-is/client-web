/**
 * @file
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

// Configs
const configServer = require('config/server.config');

// Utils
import { Cookies } from 'react-cookie';
const cookies = new Cookies();
import axios from 'axios';
import { verifyJWT } from 'utils/authorization.util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {} from '@fortawesome/free-brands-svg-icons';

// React
import React from 'react';
import CommonLayout from 'layouts/CommonLayout';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changePageTitle } from 'actions/page-header.action';

// -------------------------------------------------------------------------------------------------
// Component
// -------------------------------------------------------------------------------------------------

class TemplatePage extends React.Component {
   // Init
   // ----------------------------------------------------------------------------------------------

   constructor(props) {
      super(props);
      this.state = {
         token: cookies.get('token') || null,
      };
   }

   static async getInitialProps(ctx) {
      // Authorization only page
      await verifyJWT(ctx);

      // Dispatch call for SSR and CSR
      ctx.store.dispatch(changePageTitle('Dashboard, huh'));

      return {};
   }

   // Methods
   // ----------------------------------------------------------------------------------------------

   methodName = async (a, b) => {};

   // Render
   // ----------------------------------------------------------------------------------------------

   render() {
      return (
         <CommonLayout>
            <div>Example</div>
         </CommonLayout>
      );
   }
}

// -------------------------------------------------------------------------------------------------
// Redux
// -------------------------------------------------------------------------------------------------

const mapStateToProps = state => {
   return {
      // Required states
      // propName: state.nameReducer,
   };
};

const mapDispatchToProps = dispatch => {
   return bindActionCreators(
      {
         // Action objects {type: ...}
         // addItemAction,
      },
      dispatch,
   );
};

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(TemplatePage);
