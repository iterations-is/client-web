/**
 * @file Authorization React Layout
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import React from 'react';
import RootLayout from 'layouts/RootLayout';

class Index extends React.Component {
   render() {
      return (
         <RootLayout>
            <div className="layout layout_authorization authorization">
               <main className="authorization__main">{this.props.children}</main>
               <div className="authorization__logotype" />
            </div>
         </RootLayout>
      );
   }
}

export default Index;
