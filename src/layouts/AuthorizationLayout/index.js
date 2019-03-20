/**
 * @file Authorization React Layout
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import React from 'react';

class Index extends React.Component {
   render() {
      return (
         <div className="layout layout_authorization authorization">
            <main className="authorization__main">{this.props.children}</main>
            <div className="authorization__logotype" />
         </div>
      );
   }
}

export default Index;
