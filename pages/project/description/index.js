/**
 * @file PersonalData
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import { verifyJWT } from 'utils/authorization.util';
import { withRouter } from 'next/router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionSetPageTitle, actionSetUsagePageVerifiedMark } from 'actions/page-header.action';
import {
   actionSetTabActive,
   actionSetTabBarItems,
   actionSetUsageTabBar,
} from 'actions/tab-bar.action';
import { actionSetInfoBarItems, actionSetUsageInfoBar } from 'actions/info-bar.action';

import React from 'react';
import CommonLayout from 'layouts/CommonLayout';
import axios from 'axios';

import ReactMarkdown from 'react-markdown';
const configServer = require('config/server.config');

// -------------------------------------------------------------------------------------------------
// Component
// -------------------------------------------------------------------------------------------------

class ProjectPage extends React.Component {
   // Init
   // ----------------------------------------------------------------------------------------------

   static async getInitialProps(ctx) {
      console.log(`Coze Desc?`);
      await verifyJWT(ctx);
      // Ajax
      const token = ctx.store.getState().reducerJWT.token;

      let project;
      try {
         project = await axios.get(
            `${configServer.host}/api/project/${ctx.query.id_project}/metadata`,
            {
               headers: {
                  Authorization: token,
               },
            },
         );
      } catch (err) {}

      // Header
      ctx.store.dispatch(actionSetPageTitle(project.data.dat.public.name));
      ctx.store.dispatch(
         actionSetTabBarItems([
            {
               tabId: 'description',
               tabTitle: 'Description',
               tabLink: `/project/description?id_project=${project.data.dat.public.id}`,
               tabLinkAs: `/project/${project.data.dat.public.id}/description`,
               tabActive: true,
               tabVisible: true,
            },
            {
               tabId: 'content',
               tabTitle: 'Content',
               tabLink: `/project/content?id_project=${project.data.dat.public.id}`,
               tabLinkAs: `/project/${project.data.dat.public.id}/content`,
               tabActive: false,
               tabVisible: true,
            },
            {
               tabId: 'iterations',
               tabTitle: 'Iterations',
               tabLink: `/project/iterations?id_project=${project.data.dat.public.id}`,
               tabLinkAs: `/project/${project.data.dat.public.id}/iterations`,
               tabActive: false,
               tabVisible: true,
            },
            {
               tabId: 'contributors',
               tabTitle: 'Contributors',
               tabLink: `/project/contributors?id_project=${project.data.dat.public.id}`,
               tabLinkAs: `/project/${project.data.dat.public.id}/contributors`,
               tabActive: false,
               tabVisible: true,
            },
            {
               tabId: 'settings',
               tabTitle: 'Settings',
               tabLink: `/project/settings?id_project=${project.data.dat.public.id}`,
               tabLinkAs: `/project/${project.data.dat.public.id}/settings`,
               tabActive: false,
               tabVisible: true,
            },
         ]),
      );

      ctx.store.dispatch(actionSetUsagePageVerifiedMark(false));
      ctx.store.dispatch(actionSetUsageTabBar(true));
      ctx.store.dispatch(
         actionSetInfoBarItems([
            {
               title: 'Category',
               items: [
                  {
                     title: project.data.dat.public.category.name,
                  },
               ],
            },
            {
               title: 'Metadata',
               items: [
                  {
                     title: 'Public content',
                     label: {
                        text: project.data.dat.public.isPublic ? 'YES' : 'NO',
                        color: project.data.dat.public.isPublic ? 'green' : 'red',
                     },
                  },
                  {
                     title: 'Archived',
                     label: {
                        text: project.data.dat.public.isArchived ? 'YES' : 'NO',
                        color: project.data.dat.public.isArchived ? 'red' : 'green',
                     },
                  },
                  {
                     title: 'Searchable',
                     label: {
                        text: project.data.dat.public.isSearchable ? 'YES' : 'NO',
                        color: project.data.dat.public.isSearchable ? 'green' : 'red',
                     },
                  },
                  {
                     title: 'Open vacancies',
                     label: {
                        text: project.data.dat.public.hasOpenVacancies ? 'YES' : 'NO',
                        color: project.data.dat.public.hasOpenVacancies ? 'green' : 'red',
                     },
                  },
               ],
            },
         ]),
      );

      // Info Bar
      ctx.store.dispatch(actionSetUsageInfoBar(true));

      return {
         metadata: project.data.dat.public,
      };
   }

   // Methods
   // ----------------------------------------------------------------------------------------------

   // Render
   // ----------------------------------------------------------------------------------------------

   render() {
      return (
         <CommonLayout>
            <div className="row">
               <div className="col">
                  <ReactMarkdown
                     source={
                        this.props.metadata.descriptionPublic === ''
                           ? 'No description.'
                           : this.props.metadata.descriptionPublic
                     }
                  />
                  <h1>Description for contributors</h1>
                  {this.props.metadata.descriptionPrivate && (
                     <ReactMarkdown
                        source={
                           this.props.metadata.descriptionPrivate === ''
                              ? 'No private description.'
                              : this.props.metadata.descriptionPrivate
                        }
                     />
                  )}
               </div>
            </div>
         </CommonLayout>
      );
   }
}

// -------------------------------------------------------------------------------------------------
// Redux
// -------------------------------------------------------------------------------------------------

const mapStateToProps = state => {
   return {};
};

const mapDispatchToProps = dispatch => {
   return bindActionCreators({}, dispatch);
};

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(withRouter(ProjectPage));
