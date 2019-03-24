/**
 * @file Sign In
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import React from 'react';
import axios from 'axios';
import Router from 'next/router';
import { Cookies } from 'react-cookie';
const configServer = require('config/server.config');

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

// React components
import AuthorizationLayout from 'layouts/AuthorizationLayout';
import Loader from 'components/Loader';

// set up cookies
const cookies = new Cookies();

class Index extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         isWaitingForToken: false,
      };
   }

   static async getInitialProps() {
      const response = await axios.get(configServer.host + '/api/auth/token/temporary');
      const tokenTmp = response.data.dat.tokenTmp;

      return {
         tokenTmp,
      };
   }

   loginGithub = async e => {
      this.setState({
         tokenTmp: this.props.tokenTmp,
         isWaitingForToken: true,
      });

      let intervalID = setInterval(async () => {
         try {
            const response = await axios.get(configServer.host + '/api/auth/token/persistent', {
               params: {
                  tokenTmp: this.props.tokenTmp,
               },
            });
            const token = response.data.dat.token;

            if (token) {
               cookies.set('JWT', `Bearer ${token}`, {
                  path: '/',
               });
               clearInterval(intervalID);

               this.setState({
                  isWaitingForToken: false,
               });

               Router.push('/dashboard');
            }
         } catch (e) {
            // Something failed
            clearInterval(intervalID);
            Router.push('/error/400');
         }
      }, 2000);
   };

   render() {
      return (
         <AuthorizationLayout>
            <div className="container-fluid">
               <div className="row">
                  <div className="col">
                     <h1 className={'unique'}>Authorization</h1>
                     <p>
                        Nunc eget neque tincidunt felis ornare molestie a sed diam. Pellentesque
                        habitant morbi tristique senectus et netus et malesuada fames ac turpis
                        egestas. Duis elementum dolor dui, id faucibus dui malesuada sed. Etiam
                        congue tellus nec ipsum cursus, vitae viverra dolor vehicula. Phasellus id
                        tincidunt est.
                     </p>
                     <a
                        className="button button_yellow"
                        href={configServer.host + '/pages/github?tokenTmp=' + this.props.tokenTmp}
                        target={'_blank'}
                        onClick={this.loginGithub}
                     >
                        <FontAwesomeIcon icon={faGithub} />
                        <span>GutHub</span>
                     </a>
                  </div>
               </div>
            </div>
            {this.state.isWaitingForToken && (
               <Loader title="Loading" subtitle="waiting for token" />
            )}
         </AuthorizationLayout>
      );
   }
}

export default Index;
