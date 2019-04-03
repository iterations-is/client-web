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
      },
      {
         name: 'Project List',
         link: '/search',
         icon: ['fas', 'list'],
      },
      {
         name: 'Add Project',
         link: '/add',
         icon: ['fas', 'plus'],
      },
      {
         name: 'Notifications',
         link: '/notifications',
         icon: ['fas', 'bell'],
      },
      {
         name: 'Panel',
         link: '/panel',
         icon: ['fas', 'key'],
      },
   ],

   itemsBottom: [
      {
         name: 'FAQ',
         link: '/faq',
         icon: ['fas', 'question'],
      },
      {
         name: 'Sign Out',
         link: '/auth/signout',
         icon: ['fas', 'sign-out-alt'],
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
