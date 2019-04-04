/**
 * @file Authorization
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import axios from 'axios';
import Router from 'next/router';
import { Cookies } from 'react-cookie';
import { actionSetJWT } from 'actions/jwt.action';

const cookies = new Cookies();
const configServer = require('config/server.config');

/**
 * Check if user is authorized.
 *
 * Pages may be generated on SERVER or CLIENT. Storage for token is different.
 * @param {object} ctx Request context (from getInitialProps)
 * @returns {Promise}
 */
export async function verifyJWT(ctx) {
   // Return true if you want open pages without auth
   // return true;

   let token = '-';

   // Get token (different for SSR and for CSR)
   if (ctx.req) {
      // Server - get token from headers
      if (ctx.req.headers.cookie)
         token = ctx.req.headers.cookie.replace(/(?:(?:^|.*;\s*)JWT\s*\=\s*([^;]*).*$)|^.*$/, '$1');
   } else {
      // Client - get token from cookies
      token = cookies.get('JWT');
   }

   // Set new token to redux
   ctx.store.dispatch(actionSetJWT(token));

   try {
      await axios.get(configServer.host + '/api/token/verify', {
         headers: { Authorization: token },
      });

      // JWT is valid
      return true;
   } catch (err) {
      // HTTP request failed

      // Remove possible cookie with old JWT
      cookies.remove('JWT', { path: '/' });

      // Redirect to login
      if (ctx.res) {
         // SSR redirect
         ctx.res.writeHead(302, { Location: '/auth/signin' });
         ctx.res.end();
      } else {
         // CSR redirect
         Router.push('/auth/signin');
      }

      return false;
   }
}
