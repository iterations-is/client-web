/**
 * @file
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import { ACTION_NAME } from 'actions/redux.action';

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
      case ACTION_NAME:
         return {
            ...state,
            key: action.key,
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
