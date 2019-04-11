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
         permissions: ['project.create'],
      },
      {
         name: 'Notifications',
         link: '/notifications',
         icon: ['fas', 'bell'],
         permissions: [],
      },
      {
         name: 'Panel',
         link: '/panel',
         icon: ['fas', 'key'],
         permissions: [
            'admin.change_user_role',
            'admin.add_global_role',
            'admin.change_permission_for_role',
            'admin.change_authority',
         ],
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
