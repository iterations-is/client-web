/**
 * @file Sign In
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import React from 'react';
import axios from 'axios';
import Router from 'next/router';
import { Cookies } from 'react-cookie';
const configServer = require('config/server.config');

// React components
import AuthorizationLayout from 'layouts/AuthorizationLayout';
import AuthButton from 'components/AuthButton';

const cookies = new Cookies();

// -------------------------------------------------------------------------------------------------
// Component
// -------------------------------------------------------------------------------------------------

class Index extends React.Component {
   // Init
   // ----------------------------------------------------------------------------------------------

   static async getInitialProps() {
      const response = await axios.get(configServer.host + '/api/token/temporary');
      const tokenTmp = response.data.dat.tokenTmp;

      return {
         tokenTmp,
      };
   }

   state = {
      isAuthGithubInProcess: false,
   };

   // Methods
   // ----------------------------------------------------------------------------------------------

   authGithub = async e => {
      // Avoid double click
      if (this.state.isAuthGithubInProcess) return;
      this.setState({ isAuthGithubInProcess: true });

      const intervalId = setInterval(async () => {
         try {
            const response = await axios.get(configServer.host + '/api/token/persistent', {
               params: { tokenTmp: this.props.tokenTmp },
            });
            const token = response.data.dat.token;

            if (token) {
               clearInterval(intervalId);
               cookies.set('JWT', `${token}`, { path: '/' });
               this.setState({ isAuthGithubInProcess: false });
               Router.push('/dashboard');
            }
         } catch (e) {
            // Something failed
            clearInterval(intervalId);
            Router.push('/error/400');
         }
      }, 2000);
   };

   // Render
   // ----------------------------------------------------------------------------------------------

   render() {
      return (
         <AuthorizationLayout>
            <div className="container-fluid">
               <div className="row">
                  <div className="col">
                     <div className="box">
                        <h1 className={'unique'}>Iterations</h1>
                        <p>
                           Welcome to the main page of the information system for study projects
                           "Iterations"! Please use one of the available services to authorise.
                        </p>
                     </div>
                  </div>
               </div>
               <div className="row">
                  <div className="col-12 col-md-6">
                     <AuthButton
                        service="github"
                        animate={this.state.isAuthGithubInProcess}
                        token={this.props.tokenTmp}
                        onClick={this.authGithub}
                     />
                  </div>
               </div>
            </div>
         </AuthorizationLayout>
      );
   }
}

export default Index;
