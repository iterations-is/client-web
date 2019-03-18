/**
 * @file Root layout, just collect all dependencies
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import React from 'react';
import 'styles/index.scss';

class Index extends React.Component {
   render() {
      return <div className="root">{this.props.children}</div>;
   }
}

export default Index;
