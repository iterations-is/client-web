/**
 * @file Dashboard
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import React from 'react';
const utilAuthorization = require('utils/authorization.util');

import CommonLayout from 'layouts/CommonLayout';

class Index extends React.Component {
   static async getInitialProps(ctx) {
      await utilAuthorization.verifyJWT(ctx);

      return {};
   }

   render() {
      return (
         <CommonLayout>
            <p>Search page.</p>
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
         </CommonLayout>
      );
   }
}

export default Index;
