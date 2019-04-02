/**
 * @file
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import { INFO_BAR_SHOW, INFO_BAR_HIDE } from 'actions/info-bar.action';

// -------------------------------------------------------------------------------------------------
// Initial state
// -------------------------------------------------------------------------------------------------

const initialState = {
   key: 'value',
};

// -------------------------------------------------------------------------------------------------
// Reducer
// -------------------------------------------------------------------------------------------------

export default function reducerName(state = initialState, action) {
   switch (action.type) {
      case INFO_BAR_SHOW:
         return {
            ...state,
            visibility: true,
         };

      case INFO_BAR_HIDE:
         return {
            ...state,
            visibility: false,
         };

      default:
         return state;
   }
}

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------

// export function getHeaderTitle(state) {
//    console.log(state);
//    console.log(state.headerReducer.title);
//    return state.headerReducer.title;
// }
