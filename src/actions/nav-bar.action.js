/**
 * @file Nav Bar
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

// -------------------------------------------------------------------------------------------------
// Action Types
// -------------------------------------------------------------------------------------------------

export const NAV_BAR_MOBILE_HIDE = 'NAV_BAR_MOBILE_HIDE';
export const NAV_BAR_MOBILE_SHOW = 'NAV_BAR_MOBILE_SHOW';
export const NAV_BAR_MOBILE_TOGGLE = 'NAV_BAR_MOBILE_TOGGLE';

// -------------------------------------------------------------------------------------------------
// Action Creators
// -------------------------------------------------------------------------------------------------

export function actionShowNavBarMobile() {
   return { type: NAV_BAR_MOBILE_SHOW };
}

export function actionHideNavBarMobile() {
   return { type: NAV_BAR_MOBILE_HIDE };
}

export function actionToggleNavBarMobile() {
   return { type: NAV_BAR_MOBILE_TOGGLE };
}
