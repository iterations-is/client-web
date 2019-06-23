/**
 * @file Common layout for auth required pages
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Head from 'next/head';

import NavBar from 'components/NavBar';
import InfoBar from 'components/InfoBar';
import Header from 'components/PageHeader';
import MobileBar from 'components/MobileBar';

class CommonLayout extends React.Component {
   render() {
      return (
         <Fragment>
            <Head>
               <title>Iterations</title>
            </Head>
            <div className="layout layout_common">
               <NavBar />
               {this.props.usageInfoBar && <InfoBar />}

               <main>
                  <Header />
                  <div className="container-fluid">{this.props.children}</div>
               </main>

               <MobileBar />
            </div>
         </Fragment>
      );
   }
}

// -------------------------------------------------------------------------------------------------
// Redux
// -------------------------------------------------------------------------------------------------

const mapStateToProps = state => {
   return {
      usageInfoBar: state.reducerInfoBar.usage,
   };
};

const mapDispatchToProps = dispatch => {
   return bindActionCreators({}, dispatch);
};

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(CommonLayout);
