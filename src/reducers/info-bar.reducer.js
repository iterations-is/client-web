/**
 * @file Info Bar
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import {
   INFO_BAR_USAGE,
   INFO_BAR_MOBILE_SHOW,
   INFO_BAR_MOBILE_HIDE,
   INFO_BAR_MOBILE_TOGGLE,
   SET_INFO_BAR_ITEMS,
} from 'actions/info-bar.action';

// -------------------------------------------------------------------------------------------------
// Initial state
// -------------------------------------------------------------------------------------------------

const initialState = {
   usage: true,
   visibilityMobile: false,
   items: [
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
   ],
};

// -------------------------------------------------------------------------------------------------
// Reducer
// -------------------------------------------------------------------------------------------------

export default function reducerInfoBar(state = initialState, action) {
   switch (action.type) {
      case INFO_BAR_USAGE:
         return {
            ...state,
            usage: action.usage,
         };

      case INFO_BAR_MOBILE_SHOW:
         return {
            ...state,
            visibilityMobile: true,
         };

      case INFO_BAR_MOBILE_HIDE:
         return {
            ...state,
            visibilityMobile: false,
         };

      case INFO_BAR_MOBILE_TOGGLE:
         return {
            ...state,
            visibilityMobile: !state.visibilityMobile,
         };

      case SET_INFO_BAR_ITEMS:
         return {
            ...state,
            items: action.items,
         };

      default:
         return state;
   }
}
