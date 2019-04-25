/**
 * @file Nav Bar
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import {
   NAV_BAR_MOBILE_HIDE,
   NAV_BAR_MOBILE_SHOW,
   NAV_BAR_MOBILE_TOGGLE,
} from 'actions/nav-bar.action';
import React from 'react';

// -------------------------------------------------------------------------------------------------
// Initial state
// -------------------------------------------------------------------------------------------------

const initialState = {
   visibilityMobile: false,

   itemsTop: [
      {
         name: 'Iterations',
         link: '/dashboard',
         icon: ['fas', 'circle-notch'],
         permissions: [],
      },
      {
         name: 'Project List',
         link: '/search',
         icon: ['fas', 'list'],
         permissions: [],
      },
      {
         name: 'Add Project',
         link: '/add',
         icon: ['fas', 'plus'],
         permissions: ['projects.edit'],
      },
      {
         name: 'Notifications',
         link: '/notifications',
         icon: ['fas', 'bell'],
         permissions: ['notifications.get'],
      },
      {
         name: 'Panel',
         link: '/panel',
         icon: ['fas', 'key'],
         permissions: ['global_roles.edit', 'categories.edit'],
      },
   ],

   itemsBottom: [
      {
         name: 'FAQ',
         link: '/faq',
         icon: ['fas', 'question'],
         permissions: [],
      },
      {
         name: 'Sign Out',
         link: '/auth/signout',
         icon: ['fas', 'sign-out-alt'],
         permissions: [],
      },
   ],
};

// -------------------------------------------------------------------------------------------------
// Reducer
// -------------------------------------------------------------------------------------------------

export default function reducerNavBar(state = initialState, action) {
   switch (action.type) {
      case NAV_BAR_MOBILE_SHOW:
         return {
            ...state,
            visibilityMobile: true,
         };

      case NAV_BAR_MOBILE_HIDE:
         return {
            ...state,
            visibilityMobile: false,
         };

      case NAV_BAR_MOBILE_TOGGLE:
         return {
            ...state,
            visibilityMobile: !state.visibilityMobile,
         };

      default:
         return state;
   }
}
