/**
 * @file Dashboard
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import React from 'react';
import { Cookies } from 'react-cookie';
const utilAuthorization = require('utils/authorization.util');

import axios from 'axios';
const configServer = require('config/server.config');
import CommonLayout from 'layouts/CommonLayout';

// set up cookies
const cookies = new Cookies();

class Index extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         token: cookies.get('token') || null,
      };
   }

   static async getInitialProps(ctx) {
      await utilAuthorization.verifyJWT(ctx);

      return {};
   }

   // Pings to server with JWT token
   onPingTokenCall = async e => {
      const token = cookies.get('JWT');

      try {
         const res = await axios.get(configServer.host + '/api/auth/token/verify', {
            headers: { Authorization: token },
         });
         console.log(`Request success:`);
         console.log(res.data.msg);
      } catch (err) {
         console.log(`Request failed:`);
         console.log(err.response.data.msg);
      }
   };

   render() {
      return (
         <CommonLayout>
            <p>Dashboard page.</p>
            <p>
               Fusce a augue sed dolor efficitur condimentum. Phasellus ultrices viverra neque eget
               semper. Donec iaculis laoreet lorem, non mattis enim faucibus non. Suspendisse eu
               justo consequat, pulvinar tellus ut, pulvinar est. Fusce efficitur euismod tellus, in
               tincidunt sem scelerisque vel. Nunc iaculis, odio eget aliquam laoreet, mi quam
               suscipit lectus, sed rhoncus lacus dui eu elit. In quis risus turpis. Donec congue
               felis vitae sollicitudin placerat. Vestibulum sit amet enim varius elit finibus
               egestas sit amet sed est. Suspendisse blandit nulla accumsan nulla tempor laoreet.
               Nunc dignissim, massa sed posuere lobortis, sem nibh lobortis lectus, ac luctus risus
               ante eu sapien. Phasellus eget velit vel turpis consequat auctor at sit amet magna.
               In hac habitasse platea dictumst. Phasellus non tempus mauris.
            </p>

            <p>
               Morbi efficitur, libero a placerat tristique, erat lectus sagittis leo, eu tristique
               nulla dui ac purus. Donec dictum ac odio at fermentum. Quisque eget massa eget nunc
               ultrices sodales eu at turpis. Quisque dignissim viverra sem vitae dapibus.
               Vestibulum pretium tincidunt tellus a ultrices. Praesent cursus ultricies augue,
               vitae pharetra nunc tincidunt at. Vivamus eget bibendum massa. Aliquam vitae varius
               nibh. Quisque tempor a elit eu feugiat. Suspendisse turpis mauris, efficitur eu
               consequat in, aliquet vel tortor. Quisque id posuere tortor. Proin ut metus accumsan,
               scelerisque nulla nec, vehicula tortor. Donec consequat metus ut dictum ullamcorper.
               Ut eu ante magna. Curabitur sed ornare neque. Mauris feugiat leo vel dui sagittis, et
               vestibulum augue gravida.
            </p>

            <p>
               Morbi efficitur, libero a placerat tristique, erat lectus sagittis leo, eu tristique
               nulla dui ac purus. Donec dictum ac odio at fermentum. Quisque eget massa eget nunc
               ultrices sodales eu at turpis. Quisque dignissim viverra sem vitae dapibus.
               Vestibulum pretium tincidunt tellus a ultrices. Praesent cursus ultricies augue,
               vitae pharetra nunc tincidunt at. Vivamus eget bibendum massa. Aliquam vitae varius
               nibh. Quisque tempor a elit eu feugiat. Suspendisse turpis mauris, efficitur eu
               consequat in, aliquet vel tortor. Quisque id posuere tortor. Proin ut metus accumsan,
               scelerisque nulla nec, vehicula tortor. Donec consequat metus ut dictum ullamcorper.
               Ut eu ante magna. Curabitur sed ornare neque. Mauris feugiat leo vel dui sagittis, et
               vestibulum augue gravida.
            </p>

            <p>
               Morbi efficitur, libero a placerat tristique, erat lectus sagittis leo, eu tristique
               nulla dui ac purus. Donec dictum ac odio at fermentum. Quisque eget massa eget nunc
               ultrices sodales eu at turpis. Quisque dignissim viverra sem vitae dapibus.
               Vestibulum pretium tincidunt tellus a ultrices. Praesent cursus ultricies augue,
               vitae pharetra nunc tincidunt at. Vivamus eget bibendum massa. Aliquam vitae varius
               nibh. Quisque tempor a elit eu feugiat. Suspendisse turpis mauris, efficitur eu
               consequat in, aliquet vel tortor. Quisque id posuere tortor. Proin ut metus accumsan,
               scelerisque nulla nec, vehicula tortor. Donec consequat metus ut dictum ullamcorper.
               Ut eu ante magna. Curabitur sed ornare neque. Mauris feugiat leo vel dui sagittis, et
               vestibulum augue gravida.
            </p>

            <button onClick={e => this.onPingTokenCall(e)}>Ping With Token Call</button>
            <p>Token: {this.state.token}</p>
         </CommonLayout>
      );
   }
}

export default Index;
