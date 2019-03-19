/**
 * @file Navigation Bar
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import React from 'react';

class InfoBar extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      let item = this.props.item;
      return (
         <li>
            <span>{item.title}</span>
            {item.label && (
               <span className={`label label_${item.label.color}`}>{item.label.text}</span>
            )}
         </li>
      );
   }
}

export default InfoBar;
