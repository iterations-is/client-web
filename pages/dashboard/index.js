/**
 * @file Dashboard
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import React from 'react';
import { Cookies } from 'react-cookie';
import { connect } from 'react-redux';
import { verifyJWT } from 'utils/authorization.util';

import { actionSetPageTitle, actionSetPageVerifiedMark } from 'actions/page-header.action';

import axios from 'axios';
const configServer = require('config/server.config');
import CommonLayout from 'layouts/CommonLayout';
import { bindActionCreators } from 'redux';
import { actionChangePageTabBarVisibility } from 'actions/page-tabbar.action';
import { actionAllowUsageInfoBar } from 'actions/info-bar.action';

// import headerReducer from 'reducers/header';

// set up cookies
const cookies = new Cookies();

// -------------------------------------------------------------------------------------------------
// Component
// -------------------------------------------------------------------------------------------------

class DashboardPage extends React.Component {
   // Init
   // ----------------------------------------------------------------------------------------------

   static async getInitialProps(ctx) {
      await verifyJWT(ctx);

      ctx.store.dispatch(actionSetPageTitle('Dashboard, huh'));
      ctx.store.dispatch(actionSetPageVerifiedMark(false));
      ctx.store.dispatch(actionChangePageTabBarVisibility(true));
      ctx.store.dispatch(actionAllowUsageInfoBar());

      return {};
   }

   // Methods
   // ----------------------------------------------------------------------------------------------

   // Pings to server with JWT token
   onPingTokenCall = async e => {
      const token = cookies.get('JWT');

      try {
         const res = await axios.get(configServer.host + '/api/token/verify', {
            headers: { Authorization: token },
         });
         console.log(`Request success:`);
         console.log(res.data.msg);
      } catch (err) {
         console.log(`Request failed:`);
         console.log(err.response.data.msg);
      }
   };

   // Render
   // ----------------------------------------------------------------------------------------------

   render() {
      return (
         <CommonLayout>
            <p>Dashboard page.</p>
            <p>
               Fusce a augue sed dolor efficitur condimentum. Phasellus ultrices viverra neque eget
               semper. Donec iaculis laoreet lorem, non mattis enim faucibus non. Suspendisse eu
               justo consequat, pulvinar tellus ut, pulvinar est. Fusce efficitur euismod tellus, in
               tincidunt sem scelerisque vel. Nunc iaculis, odio eget aliquam laoreet, mi quam
               suscipit lectus, sed rhoncus lacus dui eu elit. In quis risus turpis. Donec congue
               felis vitae sollicitudin placerat. Vestibulum sit amet enim varius elit finibus
               egestas sit amet sed est. Suspendisse blandit nulla accumsan nulla tempor laoreet.
               Nunc dignissim, massa sed posuere lobortis, sem nibh lobortis lectus, ac luctus risus
               ante eu sapien. Phasellus eget velit vel turpis consequat auctor at sit amet magna.
               In hac habitasse platea dictumst. Phasellus non tempus mauris.
            </p>

            <button onClick={e => this.onPingTokenCall(e)}>Ping With Token Call</button>
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
)(DashboardPage);
