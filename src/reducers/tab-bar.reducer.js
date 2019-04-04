/**
 * @file Tab Bar
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import { SET_TAB_BAR_ITEMS, SET_TAB_BAR_USAGE } from 'actions/tab-bar.action';

// -------------------------------------------------------------------------------------------------
// Initial state
// -------------------------------------------------------------------------------------------------

const initialState = {
   usage: false,
   items: [
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

// -------------------------------------------------------------------------------------------------
// Reducer
// -------------------------------------------------------------------------------------------------

export default function reducerTabBar(state = initialState, action) {
   switch (action.type) {
      case SET_TAB_BAR_USAGE:
         return {
            ...state,
            usage: action.usage,
         };

      case SET_TAB_BAR_ITEMS:
         return {
            ...state,
            items: action.items,
         };

      default:
         return state;
   }
}
