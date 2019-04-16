/**
 * @file Tab Bar
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import { SET_TAB_BAR_ITEMS, SET_TAB_BAR_USAGE, SET_TAB_ACTIVE } from 'actions/tab-bar.action';

// -------------------------------------------------------------------------------------------------
// Initial state
// -------------------------------------------------------------------------------------------------

const initialState = {
   usage: false,
   items: [],
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

      case SET_TAB_ACTIVE:
         let newState = { ...state };
         for (let item of newState.items) {
            item.tabActive = action.tabId === item.tabId;
         }
         return newState;

      default:
         return state;
   }
}
