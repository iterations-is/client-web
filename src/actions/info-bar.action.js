import { SET_TAB_BAR_USAGE } from './tab-bar.action';

/**
 * @file Info Bar
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

// -------------------------------------------------------------------------------------------------
// Action Types
// -------------------------------------------------------------------------------------------------

export const INFO_BAR_USAGE = 'INFO_BAR_USAGE';

export const INFO_BAR_MOBILE_SHOW = 'INFO_BAR_MOBILE_SHOW';
export const INFO_BAR_MOBILE_HIDE = 'INFO_BAR_MOBILE_HIDE';
export const INFO_BAR_MOBILE_TOGGLE = 'INFO_BAR_MOBILE_TOGGLE';

// -------------------------------------------------------------------------------------------------
// Action Creators
// -------------------------------------------------------------------------------------------------

// Usage
// -------------------------------------------------------------------------------------------------
export function actionSetUsageInfoBar(usage) {
   return {
      type: INFO_BAR_USAGE,
      usage,
   };
}

// Mobile visibility
// -------------------------------------------------------------------------------------------------
export const actionShowInfoBarMobile = () => {
   return { type: INFO_BAR_MOBILE_SHOW };
};

export const actionHideInfoBarMobile = () => {
   return { type: INFO_BAR_MOBILE_HIDE };
};

export const actionToggleInfoBarMobile = () => {
   return { type: INFO_BAR_MOBILE_TOGGLE };
};
