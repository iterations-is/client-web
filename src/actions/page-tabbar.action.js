/**
 * @file Page Tab Bar
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

// -------------------------------------------------------------------------------------------------
// Action Types
// -------------------------------------------------------------------------------------------------

export const CHANGE_TAB_BAR_VISIBILITY = 'CHANGE_TAB_BAR_VISIBILITY';
export const SET_TAB_BAR_ITEMS = 'SET_TAB_BAR_ITEMS';

// -------------------------------------------------------------------------------------------------
// Action Creators
// -------------------------------------------------------------------------------------------------

/**
 * Change page tab bar
 * @param {boolean} visibility
 * @returns {{visibility: boolean, type: string}}
 */
export function actionChangePageTabBarVisibility(visibility) {
   return {
      type: CHANGE_TAB_BAR_VISIBILITY,
      visibility,
   };
}

/**
 * Set page tab bar items
 * @param {object} items
 * @returns {{type: string, items: object}}
 */
export function actionSetPageTabBarItems(items) {
   return {
      type: SET_TAB_BAR_ITEMS,
      items,
   };
}
