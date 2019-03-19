/**
 * @file Navigation Bar
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import React from 'react';
import InfoBarGroup from './InfoBarGroup';

const infoBarItems = [
   {
      title: 'Group',
      items: [
         {
            title: 'Item',
         },
      ],
   },
   {
      title: 'Group',
      items: [
         {
            title: 'Item',
         },
         {
            title: 'Item',
            label: {
               text: 'Contributors only',
               color: 'blue',
            },
         },
         {
            title: 'Item',
            label: {
               text: '0/3',
               color: 'red',
            },
         },
         {
            title: 'Item',
            label: {
               text: '0/3',
               color: 'green',
            },
         },
      ],
   },
];

class InfoBar extends React.Component {
   render() {
      return (
         <nav className="info-bar">
            {infoBarItems.map((groupValue, groupIdx) => (
               <InfoBarGroup key={groupIdx} title={groupValue.title} items={groupValue.items} />
            ))}
         </nav>
      );
   }
}

export default InfoBar;
