/**
 * @file
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

// -------------------------------------------------------------------------------------------------
// Action Types
// -------------------------------------------------------------------------------------------------

export const ACTION_NAME = 'ACTION_NAME';

// -------------------------------------------------------------------------------------------------
// Action Creators
// -------------------------------------------------------------------------------------------------

/**
 *
 * @returns {{type: string}}
 */
export function actionChangePageTitle() {
   return {
      type: ACTION_NAME,
   };
}
