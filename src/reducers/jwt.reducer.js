/**
 * @file JWT
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import { SET_JWT, REMOVE_JWT } from 'actions/jwt.action';
const jwt = require('jsonwebtoken');

// -------------------------------------------------------------------------------------------------
// Initial state
// -------------------------------------------------------------------------------------------------

const initialState = {
   token: '',
   payload: {},
};

// -------------------------------------------------------------------------------------------------
// Reducer
// -------------------------------------------------------------------------------------------------

export default function reducerJWT(state = initialState, action) {
   switch (action.type) {
      case SET_JWT:
         return {
            ...state,
            token: action.token,
            payload: jwt.decode(action.token),
         };
      case REMOVE_JWT:
         return {
            ...state,
            token: ' ',
            payload: {},
         };

      default:
         return state;
   }
}
