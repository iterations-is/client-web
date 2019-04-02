/**
 * @file Redux Store
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import { createStore } from 'redux';
import { combineReducers } from 'redux';

// -------------------------------------------------------------------------------------------------
// Reducers
// -------------------------------------------------------------------------------------------------
import reducerPageHeader from 'reducers/page-header.reducer';
import reducerPageTabBar from 'reducers/page-tabbar.reducer';
import reducerInfoBar from 'reducers/info-bar.reducer';

const combinedReducers = combineReducers({
   reducerPageHeader,
   reducerPageTabBar,
   reducerInfoBar,
});

// -------------------------------------------------------------------------------------------------
// Store
// -------------------------------------------------------------------------------------------------

export default (initialState, options) => {
   return createStore(combinedReducers, initialState);
};
