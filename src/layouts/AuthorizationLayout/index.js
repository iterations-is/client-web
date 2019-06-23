/**
 * @file Authorization React Layout
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import React, { Fragment } from 'react';
import Head from 'next/head';

const AuthorizationLayout = ({ children }) => {
   return (
      <Fragment>
         <Head>
            <title>Iterations</title>
         </Head>
         <div className="layout layout_authorization authorization">
            <main className="authorization__main">{children}</main>
            <div className="authorization__logotype" />
         </div>
      </Fragment>
   );
};

export default AuthorizationLayout;
