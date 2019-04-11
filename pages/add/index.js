/**
 * @file Add
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import { verifyJWT } from 'utils/authorization.util';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionSetPageTitle, actionSetUsagePageVerifiedMark } from 'actions/page-header.action';
import { actionSetUsageTabBar } from 'actions/tab-bar.action';
import { actionSetUsageInfoBar } from 'actions/info-bar.action';

import React from 'react';
import CommonLayout from 'layouts/CommonLayout';
import { Field, Form, Formik } from 'formik';
import axios from 'axios';
import Noty from 'noty';
import Router from 'next/router';
const configServer = require('config/server.config');

import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
   comma: 188,
   enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];

// -------------------------------------------------------------------------------------------------
// Component
// -------------------------------------------------------------------------------------------------

class AddPage extends React.Component {
   // Init
   // ----------------------------------------------------------------------------------------------

   static async getInitialProps(ctx) {
      await verifyJWT(ctx);

      // Header
      ctx.store.dispatch(actionSetPageTitle('Create project'));
      ctx.store.dispatch(actionSetUsagePageVerifiedMark(false));
      ctx.store.dispatch(actionSetUsageTabBar(false));

      // Info Bar
      ctx.store.dispatch(actionSetUsageInfoBar(false));

      // Ajax
      const token = ctx.store.getState().reducerJWT.token;

      let categories;
      try {
         categories = await axios.get(`${configServer.host}/api/projects/categories`, {
            headers: {
               Authorization: token,
            },
         });
      } catch (err) {}

      return {
         categories: categories.data.dat.categories,
      };
   }

   constructor(props) {
      super(props);
      this.state = {
         tags: [],
      };
      this.handleDelete = this.handleDelete.bind(this);
      this.handleAddition = this.handleAddition.bind(this);
   }

   // Methods
   // ----------------------------------------------------------------------------------------------

   ajaxCreateProject = async (values, actions) => {
      values.tags = this.tagsGetFromState();
      try {
         let res = await axios.post(`${configServer.host}/api/projects`, values);
         new Noty({
            text: 'Project was creted.',
            type: 'success',
         }).show();

         Router.push(`/project/${res.data.dat.projectID}`);
      } catch (e) {
         new Noty({
            text: 'Cannot create project.',
            type: 'error',
         }).show();
      }
   };

   tagsGetFromState = () => {
      let tags = [];
      for (let tag of this.state.tags) {
         tags.push(tag.text.toLowerCase());
      }
      return tags;
   };

   handleDelete(i) {
      const { tags } = this.state;
      this.setState({
         tags: tags.filter((tag, index) => index !== i),
      });
   }

   handleAddition(tag) {
      this.setState(state => ({ tags: [...state.tags, tag] }));
   }

   // Render
   // ----------------------------------------------------------------------------------------------

   render() {
      const { tags, suggestions } = this.state;

      this.tagsGetFromState();

      return (
         <CommonLayout>
            <div className={'row'}>
               <div className="col">
                  <Formik
                     initialValues={{
                        categoryId: this.props.categories[0] ? this.props.categories[0].id : '',
                        name: '',
                        descriptionPublic: '',
                        descriptionPrivate: '',
                        isSearchable: true,
                        isPublic: false,
                        hasOpenVacancies: false,

                        roles: [],
                        iterations: [],
                     }}
                     onSubmit={this.ajaxCreateProject}
                     render={props => (
                        <Form>
                           <h1>Public information</h1>

                           <div className="row">
                              <div className="col-4">
                                 <label>
                                    <span>Category</span>
                                    <Field component="select" name="categoryId">
                                       {this.props.categories.map(role => {
                                          return (
                                             <option key={role.id} value={role.id}>
                                                {role.name}
                                             </option>
                                          );
                                       })}
                                    </Field>
                                 </label>
                              </div>
                              <div className="col-8">
                                 <label>
                                    <span>Project name</span>
                                    <Field
                                       type="text"
                                       name="name"
                                       placeholder="My awesome project..."
                                    />
                                 </label>
                              </div>
                           </div>

                           <label>
                              <span>Public description (visible for all)</span>
                              <Field component="textarea" name="descriptionPublic" />
                           </label>

                           <label>
                              <span>Tags</span>
                           </label>

                           <ReactTags
                              tags={tags}
                              suggestions={suggestions}
                              handleDelete={this.handleDelete}
                              handleAddition={this.handleAddition}
                              delimiters={delimiters}
                              allowDragDrop={false}
                           />

                           <h2>Vacancies</h2>

                           <label>
                              <span>Allow free vacancy accessing</span>
                              <label className="switch">
                                 <Field type="checkbox" name="hasOpenVacancies" />
                                 <span className="switch__inner" />
                              </label>
                           </label>

                           <h1>Content visibility options</h1>

                           <label>
                              <span>Add the project into global search list</span>
                              <label className="switch">
                                 <Field type="checkbox" name="isSearchable" defaultChecked />
                                 <span className="switch__inner" />
                              </label>
                           </label>

                           <label>
                              <span>Make internal project content public</span>
                              <label className="switch">
                                 <Field type="checkbox" name="isPublic" />
                                 <span className="switch__inner" />
                              </label>
                           </label>

                           <h1>Private information</h1>

                           <label>
                              <span>Private description (visible only for contributors)</span>
                              <Field component="textarea" name="descriptionPrivate" />
                           </label>

                           <button className="button button_green" type="submit">
                              Create project
                           </button>
                        </Form>
                     )}
                  />
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
)(AddPage);
