/**
 * @file Index Page - Redirect to Auth or Dashboard (depends on JWT validation)
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import React from 'react';
import Router from 'next/router';
const utilAuthorization = require('utils/authorization.util');

class Index extends React.Component {
   static async getInitialProps(ctx) {
      await utilAuthorization.verifyJWT(ctx).then(isAuthorized => {
         // Redirect user to dashboard if JWT is valid
         if (isAuthorized) {
            if (ctx.res) {
               // SSR redirect
               ctx.res.writeHead(302, { Location: '/search' });
               ctx.res.end();
            } else {
               // CSR redirect
               Router.push('/search');
            }
         }
      });

      return {};
   }

   render() {
      return <div />;
   }
}

export default Index;
