import { actionSetPageTitle, actionSetUsagePageVerifiedMark } from '../actions/page-header.action';
import { actionSetTabBarProjectItems, actionSetUsageTabBar } from '../actions/tab-bar.action';
import { actionSetInfoBarItems, actionSetUsageInfoBar } from '../actions/info-bar.action';

export const setProjectInitialProps = (ctx, ajaxData, reduxSettings) => {
   ctx.store.dispatch(actionSetPageTitle(reduxSettings.pageTitle));
   ctx.store.dispatch(
      actionSetTabBarProjectItems(
         reduxSettings.currentTab,
         ajaxData.metadata.id,
         reduxSettings.invisibleTabIds,
      ),
   );
   ctx.store.dispatch(actionSetUsagePageVerifiedMark(reduxSettings.verifiedMark));
   ctx.store.dispatch(actionSetUsageTabBar(true));
   ctx.store.dispatch(
      actionSetInfoBarItems([
         {
            title: 'Project name',
            items: [
               {
                  title: ajaxData.metadata.name,
               },
            ],
         },
         {
            title: 'Category',
            items: [
               {
                  title: ajaxData.metadata.category.name,
               },
            ],
         },
         {
            title: 'Metadata',
            items: [
               {
                  title: 'Verified',
                  label: {
                     text: ajaxData.metadata.verified ? 'YES' : 'NO',
                     color: ajaxData.metadata.verified ? 'green' : 'red',
                  },
               },
               {
                  title: 'Public content',
                  label: {
                     text: ajaxData.metadata.isPublic ? 'YES' : 'NO',
                     color: ajaxData.metadata.isPublic ? 'green' : 'red',
                  },
               },
               {
                  title: 'Archived',
                  label: {
                     text: ajaxData.metadata.isArchived ? 'YES' : 'NO',
                     color: ajaxData.metadata.isArchived ? 'red' : 'green',
                  },
               },
               {
                  title: 'Searchable',
                  label: {
                     text: ajaxData.metadata.isSearchable ? 'YES' : 'NO',
                     color: ajaxData.metadata.isSearchable ? 'green' : 'red',
                  },
               },
               {
                  title: 'Open vacancies',
                  label: {
                     text: ajaxData.metadata.hasOpenVacancies ? 'YES' : 'NO',
                     color: ajaxData.metadata.hasOpenVacancies ? 'green' : 'red',
                  },
               },
            ],
         },
      ]),
   );

   // Info Bar
   ctx.store.dispatch(actionSetUsageInfoBar(true));
};
