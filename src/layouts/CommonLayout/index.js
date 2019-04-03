/**
 * @file Common layout for auth required pages
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NavBar from 'components/NavBar';
import InfoBar from 'components/InfoBar';
import Header from 'components/PageHeader';

class CommonLayout extends React.Component {
   render() {
      console.log(`Render {${this.props.usageInfoBar}`);
      return (
         <div className="layout layout_common">
            <NavBar />
            {this.props.usageInfoBar && <InfoBar />}

            <main>
               <Header />
               <div className="container-fluid">{this.props.children}</div>
            </main>
         </div>
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
