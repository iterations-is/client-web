/**
 * @file Sign out
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import { verifyJWT } from 'utils/authorization.util';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import React from 'react';
import { Cookies } from 'react-cookie';
import AuthorizationLayout from 'layouts/AuthorizationLayout';
const cookies = new Cookies();
import Noty from 'noty';
import Router from 'next/router';
import { actionRemoveJWT } from 'actions/jwt.action';

// -------------------------------------------------------------------------------------------------
// Component
// -------------------------------------------------------------------------------------------------

class SignOutPage extends React.Component {
   // Init
   // ----------------------------------------------------------------------------------------------

   static async getInitialProps(ctx) {
      // await verifyJWT(ctx);
      return {};
   }

   componentDidMount() {
      cookies.remove('JWT');
      this.props.actionRemoveJWT();

      new Noty({
         text: 'Signed out.',
         type: 'info',
      }).show();

      setTimeout(() => {
         Router.push(`/auth/signin`);
      }, 1500);
   }

   // Methods
   // ----------------------------------------------------------------------------------------------

   // Render
   // ----------------------------------------------------------------------------------------------

   render() {
      return (
         <AuthorizationLayout>
            <div className="container-fluid">
               <div className="row">
                  <div className="col">
                     <h1 className={'unique'}>Signing out...</h1>
                  </div>
               </div>
            </div>
         </AuthorizationLayout>
      );
   }
}

// -------------------------------------------------------------------------------------------------
// Redux
// -------------------------------------------------------------------------------------------------

const mapStateToProps = state => {
   return {};
};

const mapDispatchToProps = dispatch => {
   return bindActionCreators(
      {
         actionRemoveJWT,
      },
      dispatch,
   );
};

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(SignOutPage);
