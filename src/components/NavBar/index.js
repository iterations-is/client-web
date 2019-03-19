/**
 * @file Navigation Bar
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import React from 'react';
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faCircleNotch,
   faKey,
   faPlus,
   faSignOutAlt,
   faList,
   faQuestion,
} from '@fortawesome/free-solid-svg-icons';

import { faBell } from '@fortawesome/free-regular-svg-icons';

const navBarItems = [
   {
      name: 'Iterations',
      link: '/dashboard',
      icon: <FontAwesomeIcon icon={faCircleNotch} />,
   },
   {
      name: 'Project List',
      link: '/search',
      icon: <FontAwesomeIcon icon={faList} />,
   },
   {
      name: 'Add Project',
      link: '/add',
      icon: <FontAwesomeIcon icon={faPlus} />,
   },
   {
      name: 'Notifications',
      link: '/notifications',
      icon: <FontAwesomeIcon icon={faBell} />,
   },
   {
      name: 'Auth',
      link: '/auth',
      icon: <FontAwesomeIcon icon={faKey} />,
   },
];

const navBarItemsSecondary = [
   {
      name: 'FAQ',
      link: '/faq',
      icon: <FontAwesomeIcon icon={faQuestion} />,
   },
   {
      name: 'Sign Out',
      link: '/auth/signout',
      icon: <FontAwesomeIcon icon={faSignOutAlt} />,
   },
];

class Index extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <nav className="nav-bar">
            <ul>
               {navBarItems.map((item, index) => (
                  <li key={index}>
                     <Link href={item.link}>
                        <a>
                           {item.icon}
                           <span>{item.name}</span>
                        </a>
                     </Link>
                  </li>
               ))}
            </ul>

            <div>
               <ul>
                  <li className={'nav-bar__logotype'}>
                     <img src="/images/theme_iterations/logo_white.svg" alt="" />
                  </li>
               </ul>
               <ul className={'nav-bar__small'}>
                  {navBarItemsSecondary.map((item, index) => (
                     <li key={index}>
                        <Link href={item.link}>
                           <a>
                              {item.icon}
                              <span>{item.name}</span>
                           </a>
                        </Link>
                     </li>
                  ))}
               </ul>
            </div>
         </nav>
      );
   }
}

export default Index;
