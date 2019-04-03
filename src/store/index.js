/**
 * @file Redux Store
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import { createStore } from 'redux';
import { combineReducers } from 'redux';

// -------------------------------------------------------------------------------------------------
// Reducers
// -------------------------------------------------------------------------------------------------
import reducerInfoBar from 'reducers/info-bar.reducer';
import reducerJWT from 'reducers/jwt.reducer';
import reducerPageHeader from 'reducers/page-header.reducer';
import reducerPageTabBar from 'reducers/page-tabbar.reducer';

const combinedReducers = combineReducers({
   reducerInfoBar,
   reducerJWT,
   reducerPageHeader,
   reducerPageTabBar,
});

// -------------------------------------------------------------------------------------------------
// Store
// -------------------------------------------------------------------------------------------------

export default (initialState, options) => {
   return createStore(combinedReducers, initialState);
};
