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

import ReactMarkdown from 'react-markdown';
import Router from 'next/router';
import { ErrorGetInitialProps } from 'utils/errors.util';
import { Field, Form, Formik } from 'formik';
import { setProjectInitialProps } from '../../../../src/utils/get-inital-props.util';
import Noty from 'noty';
const configServer = require('config/server.config');

// -------------------------------------------------------------------------------------------------
// Component
// -------------------------------------------------------------------------------------------------

class PartPage extends React.Component {
   // Init
   // ----------------------------------------------------------------------------------------------

   static async getInitialProps(ctx) {
      console.log(`GIP Part`);
      console.log(ctx.query);
      // Authorization
      // -------------------------------------------------------------------------------------------

      await verifyJWT(ctx);

      // Ajax
      // -------------------------------------------------------------------------------------------

      const token = ctx.store.getState().reducerJWT.token;

      let ajaxDataMetadata, ajaxDataPart, ajaxInterpreters;

      try {
         [
            // Save data
            ajaxDataMetadata,
            ajaxDataPart,
            ajaxInterpreters,
         ] = await Promise.all([
            // PROJECT
            axios.get(`${configServer.host}/api/project/${ctx.query.id_project}/metadata`, {
               headers: {
                  Authorization: token,
               },
            }),
            // PART
            axios.get(
               `${configServer.host}/api/project/${ctx.query.id_project}/part/${ctx.query.id_part}`,
               {
                  headers: {
                     Authorization: token,
                  },
               },
            ),
            // INTERPRETERS
            axios.get(`${configServer.host}/api/interpreters`, {
               headers: { Authorization: token },
            }),
         ]);
      } catch (e) {
         console.log(e);
         // Requests were failed
         throw new ErrorGetInitialProps('Requests failed', 800);
      }

      // Redux states
      // -------------------------------------------------------------------------------------------

      setProjectInitialProps(
         ctx,
         {
            metadata: ajaxDataMetadata.data.dat,
         },
         {
            pageTitle: 'Edit part',
            currentTab: 'content',
            verifiedMark: false,
            invisibleTabIds: [],
         },
      );

      // Props
      // -------------------------------------------------------------------------------------------

      return {
         metadata: ajaxDataMetadata.data.dat,
         part: ajaxDataPart.data.dat.part,
         interpreters: ajaxInterpreters.data.dat,
      };
   }

   constructor(props) {
      super(props);

      this.state = {};
   }

   componentDidMount() {}

   // Methods
   // ----------------------------------------------------------------------------------------------

   ajaxUpdatePart = async data => {
      console.log(this.props.part.id, data);
      try {
         await axios.patch(
            `${configServer.host}/api/project/${this.props.metadata.id}/part/${this.props.part.id}`,
            data,
         );

         Router.push(`/project/${this.props.metadata.id}/content`);
         new Noty({
            text: 'Part was saved.',
            type: 'success',
         }).show();
      } catch (e) {
         new Noty({
            text: 'Cannot save a part.',
            type: 'error',
         }).show();
      }
   };

   // Render
   // ----------------------------------------------------------------------------------------------

   render() {
      return (
         <CommonLayout>
            <Formik
               initialValues={{
                  interpreter: this.props.part.document.interpreter,
                  store: {
                     title: this.props.part.document.store.title,
                     body: this.props.part.document.store.body,
                  },
               }}
               onSubmit={this.ajaxUpdatePart}
            >
               <Form>
                  <div className="row">
                     <div className="col">
                        <div className="form-elem form-elem_select">
                           <span className="title">Interpreter</span>
                           <label>
                              <Field component="select" name="interpreter">
                                 {this.props.interpreters.map((item, i) => {
                                    return (
                                       <option key={i} value={item.name}>
                                          {item.name}
                                       </option>
                                    );
                                 })}
                              </Field>
                           </label>
                           <div className="description">Define part's interpreter</div>
                        </div>
                     </div>
                     <div className="col">
                        <div className="form-elem form-elem_input">
                           <span className="title">Title</span>
                           <label>
                              <Field type="text" name="store.title" placeholder="Your title" />
                           </label>
                           <div className="description">Optional part's name</div>
                        </div>
                     </div>
                  </div>

                  <div className="row">
                     <div className="col">
                        <div className="form-elem form-elem_textarea">
                           <span className="title">Store</span>
                           <label>
                              <Field component="textarea" name="store.body" />
                           </label>
                           <div className="description">Define interpreter's store</div>
                        </div>
                     </div>
                  </div>

                  <div className="row">
                     <div className="col-6" />
                     <div className="col-6">
                        <button className="button button_green" onSubmit={this.ajaxUpdatePart}>
                           {' '}
                           Save part
                        </button>
                     </div>
                  </div>
               </Form>
            </Formik>
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
)(withRouter(PartPage));
