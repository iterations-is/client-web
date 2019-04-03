/**
 * @file Dashboard
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import { Cookies } from 'react-cookie';
import { verifyJWT } from 'utils/authorization.util';
import axios from 'axios';
const configServer = require('config/server.config');

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionSetUsageTabBar } from 'actions/tab-bar.action';
import { actionSetUsageInfoBar } from 'actions/info-bar.action';
import { actionSetPageTitle, actionSetUsagePageVerifiedMark } from 'actions/page-header.action';

import React from 'react';
import CommonLayout from 'layouts/CommonLayout';

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

      // Header
      ctx.store.dispatch(actionSetPageTitle('Dashboard'));
      ctx.store.dispatch(actionSetUsagePageVerifiedMark(false));
      ctx.store.dispatch(actionSetUsageTabBar(false));

      // Info Bar
      ctx.store.dispatch(actionSetUsageInfoBar(false));

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
            {/* Radio */}
            {/* Checkbox simple */}
            {/* Checkbox switch */}
            <a className="button button_blue">Example Button</a>
            <a className="button button_yellow">Example Button</a>
            <a className="button button_red">Example Button</a>
            <a className="button button_silver">Example Button</a>
            <a className="button button_green">Example Button</a>
            <a className="button button_gray">Example Button</a>
            {/* Buttons */}
            <h1>Style guide is a very important part of the design</h1>
            <h2>Style guide is a very important part of the design</h2>
            <h3>Style guide is a very important part of the design</h3>

            <p>
               Maecenas metus dui, tincidunt non nibh vel, ullamcorper facilisis eros. Nullam
               aliquet massa enim, id tincidunt justo pretium quis. Nam coue nulla diam, vel
               porttitor ante viverra id.
            </p>

            <p>
               <strong>
                  Maecenas metus dui, tincidunt non nibh vel, ullamcorper facilisis eros. Nullam
                  aliquet massa enim, id tincidunt justo pretium quis. Nam coue nulla diam, vel
                  porttitor ante viverra id.
               </strong>
            </p>

            <p>
               <em>
                  Maecenas metus dui, tincidunt non nibh vel, ullamcorper facilisis eros. Nullam
                  aliquet massa enim, id tincidunt justo pretium quis. Nam coue nulla diam, vel
                  porttitor ante viverra id.
               </em>
            </p>

            {/* Table */}
            {/* Inputs */}
            {/* Textarea */}

            {/* Tags */}

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
