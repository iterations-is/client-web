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

import Router from 'next/router';
import { ErrorGetInitialProps } from 'utils/errors.util';
import { Field, Form, Formik } from 'formik';
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
      let ajaxDataMetadata, ajaxDataInterpreters;

      try {
         [
            // Save data
            ajaxDataMetadata,
            ajaxDataInterpreters,
         ] = await Promise.all([
            // PROJECT
            axios.get(`${configServer.host}/api/project/${ctx.query.id_project}/metadata`, {
               headers: { Authorization: token },
            }),
            // INTERPRETERS
            axios.get(`${configServer.host}/api/interpreters`, {
               headers: { Authorization: token },
            }),
         ]);
      } catch (e) {
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
            pageTitle: 'Create part',
            currentTab: 'content',
            verifiedMark: false,
            invisibleTabIds: [],
         },
      );

      // Props
      // -------------------------------------------------------------------------------------------

      return {
         metadata: ajaxDataMetadata.data.dat,
         interpreters: ajaxDataInterpreters.data.dat,
      };
   }

   constructor(props) {
      super(props);

      this.state = {};
   }

   componentDidMount() {}

   // Methods
   // ----------------------------------------------------------------------------------------------

   ajaxCreatePart = async data => {
      console.log(this.props.metadata.id, data);
      try {
         await axios.post(`${configServer.host}/api/project/${this.props.metadata.id}/parts`, data);

         Router.push(`/project/${this.props.metadata.id}/content`);
      } catch (e) {}
   };

   // Render
   // ----------------------------------------------------------------------------------------------

   render() {
      return (
         <CommonLayout>
            <Formik
               initialValues={{
                  interpreter:
                     this.props.interpreters.length > 0 ? this.props.interpreters[0].name : '',
                  store: {
                     title: '',
                     body: '',
                  },
               }}
               onSubmit={this.ajaxCreatePart}
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
                        <button className="button button_green" onSubmit={this.ajaxCreatePart}>
                           {' '}
                           Create part
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
)(withRouter(ProjectPage));
