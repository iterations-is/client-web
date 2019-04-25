/**
 * @file Tab Bar
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

// -------------------------------------------------------------------------------------------------
// Action Types
// -------------------------------------------------------------------------------------------------

export const SET_TAB_BAR_USAGE = 'CHANGE_TAB_BAR_USAGE';
export const SET_TAB_BAR_ITEMS = 'SET_TAB_BAR_ITEMS';
export const SET_TAB_ACTIVE = 'SET_TAB_ACTIVE';

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

export function actionSetTabActive(tabId) {
   return {
      type: SET_TAB_ACTIVE,
      tabId,
   };
}

export function actionSetTabBarProjectItems(currentTabId, projectId, invisibleTabIds = []) {
   let items = [
      {
         tabId: 'description',
         tabTitle: 'Description',
         tabLink: `/project/description?id_project=${projectId}`,
         tabLinkAs: `/project/${projectId}/description`,
         tabActive: false,
         tabVisible: true,
      },
      {
         tabId: 'content',
         tabTitle: 'Content',
         tabLink: `/project/content?id_project=${projectId}`,
         tabLinkAs: `/project/${projectId}/content`,
         tabActive: false,
         tabVisible: true,
      },
      {
         tabId: 'iterations',
         tabTitle: 'Iterations',
         tabLink: `/project/iterations?id_project=${projectId}`,
         tabLinkAs: `/project/${projectId}/iterations`,
         tabActive: false,
         tabVisible: true,
      },
      {
         tabId: 'contributors',
         tabTitle: 'Contributors',
         tabLink: `/project/contributors?id_project=${projectId}`,
         tabLinkAs: `/project/${projectId}/contributors`,
         tabActive: false,
         tabVisible: true,
      },
      {
         tabId: 'settings',
         tabTitle: 'Settings',
         tabLink: `/project/settings?id_project=${projectId}`,
         tabLinkAs: `/project/${projectId}/settings`,
         tabActive: false,
         tabVisible: true,
      },
   ];

   try {
      for (const item of items) {
         if (item.tabId === currentTabId) item.tabActive = true;
         for (const tabId of invisibleTabIds)
            if (item.tabId === tabId) items[tabId].tabVisible = false;
      }
   } catch (e) {}

   return {
      type: SET_TAB_BAR_ITEMS,
      items,
   };
}
