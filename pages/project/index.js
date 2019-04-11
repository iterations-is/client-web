/**
 * @file PersonalData
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import { verifyJWT } from 'utils/authorization.util';
import { withRouter } from 'next/router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionSetPageTitle, actionSetUsagePageVerifiedMark } from 'actions/page-header.action';
import { actionSetUsageTabBar } from 'actions/tab-bar.action';
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
         projectPublic: project.data.dat.public,
      };
   }

   // Methods
   // ----------------------------------------------------------------------------------------------

   // Render
   // ----------------------------------------------------------------------------------------------

   render() {
      let descriptionPublic = (
         <ReactMarkdown
            source={
               this.props.projectPublic.descriptionPublic === ''
                  ? 'No description.'
                  : this.props.projectPublic.descriptionPublic
            }
         />
      );

      let descriptionPrivate = (
         <p>
            Private description semper iaculis lectus eu faucibus. Maecenas ullamcorper ipsum massa.
            Integer ut iaculis nunc, nec malesuada nibh. Praesent id posuere mi. Vestibulum quis
            quam tincidunt, blandit tellus nec, semper quam. Duis id laoreet nisl. Vestibulum
            tincidunt tortor eget ante auctor placerat quis quis tortor. Proin porttitor egestas
            porta. Donec ut ultricies mauris. Integer dictum, enim at eleifend convallis, ligula
            nisl dictum mauris, nec sollicitudin sem odio vel diam. Duis in enim eget felis dapibus
            varius sit amet vel enim. Ut imperdiet porttitor felis vitae molestie. Proin id lectus
            vehicula metus sodales bibendum a non tortor. Sed mauris erat, vestibulum et venenatis
            quis, condimentum sed arcu.
         </p>
      );

      return (
         <CommonLayout>
            <div className="row">
               <div className="col">
                  {descriptionPublic}
                  <h1>Description for contributors</h1>
                  {descriptionPrivate}
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