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
import reducerNavBar from 'reducers/nav-bar.reducer';
import reducerPageHeader from 'reducers/page-header.reducer';
import reducerTabBar from 'reducers/tab-bar.reducer';

const combinedReducers = combineReducers({
   reducerInfoBar,
   reducerJWT,
   reducerNavBar,
   reducerPageHeader,
   reducerTabBar,
});

// -------------------------------------------------------------------------------------------------
// Store
// -------------------------------------------------------------------------------------------------

export default (initialState, options) => {
   // New store with Redux Dev Tools
   return typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
      ? createStore(combinedReducers, initialState, window.__REDUX_DEVTOOLS_EXTENSION__())
      : createStore(combinedReducers, initialState);
};
