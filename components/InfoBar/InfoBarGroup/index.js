/**
 * @file Navigation Bar
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import React from 'react';
import InfoBarItem from './InfoBarItem';

class InfoBar extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <div className={'infoBarGroup'}>
            <div className={'infoBarGroup__title'}>{this.props.title}</div>
            <ul className={'infoBarGroup__items'}>
               {this.props.items.map((value, idx) => (
                  <InfoBarItem key={idx} item={value} />
               ))}
            </ul>
         </div>
      );
   }
}

export default InfoBar;
