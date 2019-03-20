/**
 * @file Page tab bar
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import { CHANGE_TAB_BAR_VISIBILITY, SET_TAB_BAR_ITEMS } from 'actions/page-tabbar.action';

// -------------------------------------------------------------------------------------------------
// Initial state
// -------------------------------------------------------------------------------------------------

const initialState = {
   visibility: false,
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

export default function reducerPageTabBar(state = initialState, action) {
   switch (action.type) {
      case CHANGE_TAB_BAR_VISIBILITY:
         return {
            ...state,
            visibility: action.visibility,
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
