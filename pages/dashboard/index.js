/**
 * @file Dashboard
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import React from 'react';
import { Cookies } from 'react-cookie';
const utilAuthorization = require('utils/authorization.util');

import axios from 'axios';
const configServer = require('../../config/server.config');
import CommonLayout from 'layouts/CommonLayout';

// set up cookies
const cookies = new Cookies();

class Index extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         token: cookies.get('token') || null,
      };
   }

   static async getInitialProps(ctx) {
      await utilAuthorization.verifyJWT(ctx);

      return {};
   }

   // Pings to server with JWT token
   onPingTokenCall = async e => {
      const token = cookies.get('JWT');

      try {
         const res = await axios.get(configServer.host + '/api/auth/token/verify', {
            headers: { Authorization: token },
         });
         console.log(`Request success:`);
         console.log(res.data.msg);
      } catch (err) {
         console.log(`Request failed:`);
         console.log(err.response.data.msg);
      }
   };

   render() {
      return (
         <CommonLayout>
            <h1>Dashboard</h1>
            <button onClick={e => this.onPingTokenCall(e)}>Ping With Token Call</button>
            <p>Token: {this.state.token}</p>
         </CommonLayout>
      );
   }
}

export default Index;
