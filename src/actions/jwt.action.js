/**
 * @file JWT
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

// -------------------------------------------------------------------------------------------------
// Action Types
// -------------------------------------------------------------------------------------------------

export const SET_JWT = 'SET_JWT';
export const REMOVE_JWT = 'REMOVE_JWT';

// -------------------------------------------------------------------------------------------------
// Action Creators
// -------------------------------------------------------------------------------------------------

export function actionSetJWT(token) {
   return {
      type: SET_JWT,
      token: token,
   };
}

export function actionRemoveJWT() {
   return {
      type: SET_JWT,
   };
}
