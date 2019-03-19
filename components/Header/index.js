/**
 * @file Loader Screen
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import React from 'react';
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleNotch } from '@fortawesome/free-solid-svg-icons';

class Loader extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         title: 'Undefined title',
         tabBarItems: [
            {
               tabTitle: 'Example',
               tabLink: '/',
               tabActive: true,
            },
            {
               tabTitle: 'Tab',
               tabLink: '/',
               tabActive: false,
            },
         ],
      };
   }

   render() {
      return (
         <header className="header">
            <h1>
               <span>{this.state.title}</span>
               <span className={'verified-mark'}>
                  <FontAwesomeIcon icon={faCheck} />
               </span>
            </h1>
            <ul>
               {this.state.tabBarItems.map((value, idx) => (
                  <li key={idx} className={value.tabActive ? 'active' : ''}>
                     <Link href={value.tabLink}>
                        <a>{value.tabTitle}</a>
                     </Link>
                  </li>
               ))}
            </ul>
         </header>
      );
   }
}

export default Loader;
