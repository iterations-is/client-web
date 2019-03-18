/**
 * @file Navigation Bar
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import React from 'react';
import Link from 'next/link.js';

const items = [
   { link: '/', name: 'Home' },
   { link: '/auth/signin', name: 'Sign In' },
   { link: '/dashboard', name: 'Dashboard' },
];

class Navigation extends React.Component {
   render() {
      return (
         <nav>
            <ul>
               {items.map((item, key) => (
                  <li key={key}>
                     <Link href={item.link}>
                        <a>{item.name}</a>
                     </Link>
                  </li>
               ))}
            </ul>
         </nav>
      );
   }
}

export default Navigation;
