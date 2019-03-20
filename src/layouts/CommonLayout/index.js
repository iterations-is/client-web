/**
 * @file
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import React from 'react';

import { connect } from 'react-redux';

import NavBar from 'components/NavBar';
import InfoBar from 'components/InfoBar';
import Header from 'components/PageHeader';

class CommonLayout extends React.Component {
   render() {
      return (
         <div className="layout layout_common">
            <NavBar />
            <InfoBar />

            <main>
               <Header />
               <div className="container-fluid">{this.props.children}</div>
            </main>
         </div>
      );
   }
}

export default connect()(CommonLayout);
