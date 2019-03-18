/**
 * @file Loader Screen
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import React from 'react';

class Loader extends React.Component {
   render() {
      return (
         <div className="loader">
            <h1>{this.props.title}</h1>
            <h2>{this.props.subtitle}</h2>
         </div>
      );
   }
}

export default Loader;
