/**
 * @file Info Bar
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

// -------------------------------------------------------------------------------------------------
// Action Types
// -------------------------------------------------------------------------------------------------

export const INFO_BAR_HIDE = 'INFO_BAR_HIDE';
export const INFO_BAR_SHOW = 'INFO_BAR_SHOW';

// -------------------------------------------------------------------------------------------------
// Action Creators
// -------------------------------------------------------------------------------------------------

/**
 * Show info bar
 * @returns {{type: string}}
 */
export function actionInfoBarShow() {
   return {
      type: INFO_BAR_SHOW,
   };
}

/**
 * Hide info bar
 * @returns {{type: string}}
 */
export function actionInfoBarHide() {
   return {
      type: INFO_BAR_HIDE,
   };
}
