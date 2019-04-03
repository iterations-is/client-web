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

export function actionSetPageTitle(title) {
   return {
      type: SET_PAGE_TITLE,
      title,
   };
}

export function actionSetUsagePageVerifiedMark(verifiedMark) {
   return {
      type: SET_PAGE_TITLE_MARK,
      verifiedMark: verifiedMark,
   };
}
