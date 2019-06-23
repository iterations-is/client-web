/**
 * @file PersonalData
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import { verifyJWT } from 'utils/authorization.util';
import { withRouter } from 'next/router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import React from 'react';
import CommonLayout from 'layouts/CommonLayout';
import axios from 'axios';

import Link from 'next/link';

import { ErrorGetInitialProps } from 'utils/errors.util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { setProjectInitialProps } from 'utils/get-inital-props.util';
const configServer = require('config/server.config');

// -------------------------------------------------------------------------------------------------
// Component
// -------------------------------------------------------------------------------------------------

class ProjectPage extends React.Component {
   // Init
   // ----------------------------------------------------------------------------------------------

   static async getInitialProps(ctx) {
      // Authorization
      // -------------------------------------------------------------------------------------------

      await verifyJWT(ctx);

      // Ajax
      // -------------------------------------------------------------------------------------------

      const token = ctx.store.getState().reducerJWT.token;
      let ajaxDataMetadata, ajaxDataIterations, ajaxDataInterpreters;

      try {
         [
            // Save data
            ajaxDataMetadata,
            ajaxDataIterations,
            ajaxDataInterpreters,
         ] = await Promise.all([
            // PROJECT
            axios.get(`${configServer.host}/api/project/${ctx.query.id_project}/metadata`, {
               headers: { Authorization: token },
            }),
            // ITERATIONS
            axios.get(`${configServer.host}/api/project/${ctx.query.id_project}/parts`, {
               headers: { Authorization: token },
            }),
            // INTERPRETERS
            axios.get(`${configServer.host}/api/interpreters`, {
               headers: { Authorization: token },
            }),
         ]);
      } catch (e) {
         // Requests failed
         throw new ErrorGetInitialProps('Requests failed', 500);
      }

      // Redux states
      // -------------------------------------------------------------------------------------------

      setProjectInitialProps(
         ctx,
         {
            metadata: ajaxDataMetadata.data.dat,
         },
         {
            pageTitle: 'Content',
            currentTab: 'content',
            verifiedMark: false,
            invisibleTabIds: [],
         },
      );

      // Props
      // -------------------------------------------------------------------------------------------

      return {
         ajaxMetadata: ajaxDataMetadata.data.dat,
         ajaxIterations: ajaxDataIterations.data.dat,
         ajaxInterpreters: ajaxDataInterpreters.data.dat,
      };
   }

   constructor(props) {
      super(props);

      this.state = {
         parts: this.props.ajaxIterations.parts,
      };
   }

   componentDidMount() {
      let uniqueInterpreters = new Set();

      for (const part of this.props.ajaxIterations.parts) {
         uniqueInterpreters.add(part.document.interpreter);
      }

      for (const interpreter of uniqueInterpreters) {
         const file = `https://cdn.jsdelivr.net/gh/iterations-is/interpreters/dist/${interpreter}/index.js`;
         let script = document.createElement('script');
         script.src = file;

         script.onload = () => {
            console.log(`${interpreter} LOADED`);
            for (const part of this.state.parts) {
               if (part.document.interpreter === interpreter) {
                  part.document.html = window.iterations.interpreters[interpreter].render(
                     part.document.store,
                  );
               }
            }

            this.setState({});
         };
         document.head.appendChild(script);
      }
   }

   // Methods
   // ----------------------------------------------------------------------------------------------
   createMarkup = html => {
      return { __html: html };
   };

   ajaxRemovePart = async partId => {
      const { ajaxMetadata, ajaxIterations, ajaxInterpreters } = this.props;

      try {
         await axios.delete(`${configServer.host}/api/project/${ajaxMetadata.id}/part/${partId}`);

         let newState = [...this.state.parts];

         for (let i = 0; i < newState.length; ++i) {
            if (newState[i].id === partId) {
               newState.splice(i, 1);
               break;
            }
         }

         this.setState({ parts: newState });
      } catch (e) {}
   };

   // Render
   // ----------------------------------------------------------------------------------------------

   render() {
      const { ajaxMetadata, ajaxIterations, ajaxInterpreters } = this.props;

      const canEditProject =
         ajaxMetadata.currentUserProjectRole !== 'NOBODY' &&
         ajaxMetadata.currentUserProjectRole !== 'VISITOR';

      return (
         <CommonLayout>
            {this.state.parts.length === 0 && (
               <div className="row">
                  <div className="col">
                     <p>Current project doesn't have content parts.</p>
                  </div>
               </div>
            )}

            {this.state.parts.map(part => {
               return (
                  <div className="row box" key={part.id}>
                     <div className={canEditProject ? 'col-11' : 'col-12'}>
                        <div dangerouslySetInnerHTML={this.createMarkup(part.document.html)} />
                     </div>
                     {canEditProject && (
                        <div className="col-1">
                           <div className="box box_vertical-sq-buttons">
                              <Link
                                 as={`/project/${ajaxMetadata.id}/content/edit/${part.id}`}
                                 href={`/project/content/edit?id_project=${
                                    ajaxMetadata.id
                                 }&id_part=${part.id}`}
                              >
                                 <a className="sq-button sq-button_blue">
                                    <FontAwesomeIcon icon={faEdit} />
                                 </a>
                              </Link>

                              <div
                                 className="sq-button sq-button_red"
                                 onClick={() => this.ajaxRemovePart(part.id)}
                              >
                                 <FontAwesomeIcon icon={faTrash} />
                              </div>
                           </div>
                        </div>
                     )}
                  </div>
               );
            })}

            {canEditProject && (
               <div className="row">
                  <div className="col-4 offset-8">
                     <Link
                        as={`/project/${ajaxMetadata.id}/content/create`}
                        href={`/project/content/create?id_project=${ajaxMetadata.id}`}
                     >
                        <a className="button button_green">Create a part</a>
                     </Link>
                  </div>
               </div>
            )}
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
