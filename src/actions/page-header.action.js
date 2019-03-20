/**
 * @file Page header
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

// -------------------------------------------------------------------------------------------------
// Action Types
// -------------------------------------------------------------------------------------------------

export const SET_PAGE_TITLE = 'SET_PAGE_TITLE';
export const SET_PAGE_TITLE_MARK = 'SET_PAGE_TITLE_MARK';

// -------------------------------------------------------------------------------------------------
// Action Creators
// -------------------------------------------------------------------------------------------------

/**
 * Change page title
 * @param {string} title
 * @returns {{type: string, title: string}}
 */
export function actionSetPageTitle(title) {
   return {
      type: SET_PAGE_TITLE,
      title,
   };
}

/**
 * Set verification mark
 * @param {boolean} verifiedMark
 * @returns {{verifiedMark: boolean, type: string}}
 */
export function actionSetPageVerifiedMark(verifiedMark) {
   return {
      type: SET_PAGE_TITLE_MARK,
      verifiedMark: verifiedMark,
   };
}
