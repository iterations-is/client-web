/**
 * @file
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import React from 'react';
import RootLayout from 'layouts/RootLayout';

import NavBar from 'components/NavBar';
import InfoBar from 'components/InfoBar';
import Header from 'components/Header';

class Index extends React.Component {
   render() {
      return (
         <RootLayout>
            <div className="layout layout_common">
               <NavBar />
               <InfoBar />

               <main>
                  <Header />
                  <div className="container-fluid">{this.props.children}</div>
               </main>
            </div>
         </RootLayout>
      );
   }
}

export default Index;
