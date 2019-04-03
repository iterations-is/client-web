/**
 * @file JWT
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import { SET_JWT } from 'actions/jwt.action';
const jwt = require('jsonwebtoken');

// -------------------------------------------------------------------------------------------------
// Initial state
// -------------------------------------------------------------------------------------------------

const initialState = {
   token: '',
   payload: '',
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

      default:
         return state;
   }
}
