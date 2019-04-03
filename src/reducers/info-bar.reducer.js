/**
 * @file Info Bar
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import {
   INFO_BAR_USAGE_ALLOW,
   INFO_BAR_USAGE_DENY,
   INFO_BAR_MOBILE_SHOW,
   INFO_BAR_MOBILE_HIDE,
   INFO_BAR_MOBILE_TOGGLE,
} from 'actions/info-bar.action';

// -------------------------------------------------------------------------------------------------
// Initial state
// -------------------------------------------------------------------------------------------------

const initialState = {
   usage: true,
   visibilityMobile: false,
};

// -------------------------------------------------------------------------------------------------
// Reducer
// -------------------------------------------------------------------------------------------------

export default function reducerInfoBar(state = initialState, action) {
   switch (action.type) {
      case INFO_BAR_USAGE_ALLOW:
         return {
            ...state,
            usage: true,
         };

      case INFO_BAR_USAGE_DENY:
         return {
            ...state,
            usage: false,
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

      default:
         return state;
   }
}
