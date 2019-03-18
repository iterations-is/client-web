/**
 * @file
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import React from 'react';
import RootLayout from 'layouts/RootLayout';

import NavBar from 'components/NavBar';

class Index extends React.Component {
   render() {
      return (
         <RootLayout>
            <div className="layout layout_common">
               <NavBar />
               <main>{this.props.children}</main>
            </div>
         </RootLayout>
      );
   }
}

export default Index;
