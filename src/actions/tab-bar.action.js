/**
 * @file Tab Bar
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

// -------------------------------------------------------------------------------------------------
// Action Types
// -------------------------------------------------------------------------------------------------

export const SET_TAB_BAR_USAGE = 'CHANGE_TAB_BAR_USAGE';
export const SET_TAB_BAR_ITEMS = 'SET_TAB_BAR_ITEMS';

// -------------------------------------------------------------------------------------------------
// Action Creators
// -------------------------------------------------------------------------------------------------

export function actionSetUsageTabBar(usage) {
   return {
      type: SET_TAB_BAR_USAGE,
      usage,
   };
}

export function actionSetTabBarItems(items) {
   return {
      type: SET_TAB_BAR_ITEMS,
      items,
   };
}
