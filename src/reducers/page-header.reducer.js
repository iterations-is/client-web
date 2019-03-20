/**
 * @file Page header
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import { SET_PAGE_TITLE, SET_PAGE_TITLE_MARK } from 'actions/page-header.action';

// -------------------------------------------------------------------------------------------------
// Initial state
// -------------------------------------------------------------------------------------------------

const initialState = {
   title: 'Undefined title',
   verifiedMark: false,
};

// -------------------------------------------------------------------------------------------------
// Reducer
// -------------------------------------------------------------------------------------------------

export default function reducerPageHeader(state = initialState, action) {
   switch (action.type) {
      case SET_PAGE_TITLE:
         return {
            ...state,
            title: action.title,
         };

      case SET_PAGE_TITLE_MARK:
         return {
            ...state,
            verifiedMark: action.verifiedMark,
         };

      default:
         return state;
   }
}
