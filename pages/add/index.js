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
import { Field, FieldArray, Form, Formik } from 'formik';
import axios from 'axios';
import Noty from 'noty';
import Router from 'next/router';
const configServer = require('config/server.config');

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faMarkdown } from '@fortawesome/free-brands-svg-icons';

import { WithContext as ReactTags } from 'react-tag-input';
import { faPlus, faTags, faTrash } from '@fortawesome/free-solid-svg-icons';

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
         tags: [{ id: 'tag', text: 'tag' }],
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

         Router.push(`/project/${res.data.dat.projectID}/description`);
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
            <Formik
               initialValues={{
                  categoryId: this.props.categories[0] ? this.props.categories[0].id : '',
                  name: '',
                  descriptionPublic: '',
                  descriptionPrivate: '',
                  isSearchable: true,
                  isPublic: false,
                  hasOpenVacancies: false,

                  roles: [{ name: 'Example', capacity: 5 }],
                  iterations: [
                     {
                        title: 'Iteration title 1',
                        deadline: '2019-04-21',
                        tasks: [
                           {
                              title: 'Task title 1',
                              description: 'Task description 1',
                              pointsMin: 0,
                              pointsMax: 10,
                           },
                           {
                              title: 'Task title 2',
                              description: 'Task description 2',
                              pointsMin: 0,
                              pointsMax: 10,
                           },
                        ],
                     },

                     {
                        title: 'Iteration title 2',
                        deadline: '2019-04-21',
                        tasks: [],
                     },
                  ],
               }}
               onSubmit={this.ajaxCreateProject}
               render={formProps => (
                  <Form>
                     <h1>Public information</h1>

                     <div className="row">
                        <div className="col-12 col-md-4">
                           <div className="form-elem form-elem_select">
                              <span className="title">Category</span>
                              <label>
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
                        </div>
                        <div className="col-12 col-md-8">
                           <div className="form-elem form-elem_input">
                              <span className="title">Project name</span>
                              <label>
                                 <Field
                                    type="text"
                                    name="name"
                                    placeholder="Magnificent project name"
                                 />
                              </label>
                           </div>
                        </div>
                     </div>

                     <div className="row">
                        <div className="col">
                           <div className="form-elem form-elem_textarea">
                              <span className="title">Public description</span>
                              <label>
                                 <Field
                                    component="textarea"
                                    name="descriptionPublic"
                                    placeholder="# Public description&#10;Text with *Markdown*."
                                 />
                              </label>
                              <div className="description">
                                 This description is always visible for everybody. Markdown{' '}
                                 <FontAwesomeIcon icon={faMarkdown} /> enabled.
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="form-elem form-elem_textarea">
                        <span className="title">Tags</span>

                        <ReactTags
                           tags={tags}
                           suggestions={suggestions}
                           handleDelete={this.handleDelete}
                           handleAddition={this.handleAddition}
                           delimiters={delimiters}
                           allowDragDrop={false}
                        />
                        <div className="description">
                           Add some tags <FontAwesomeIcon icon={faTags} /> to make your project
                           easier to search.
                        </div>
                     </div>

                     <h2>Vacancies</h2>

                     <div className="row">
                        <FieldArray
                           name="roles"
                           render={arrayHelper => (
                              <div className="col">
                                 {formProps.values.roles.map((role, idx) => (
                                    <div className="row-flex" key={idx}>
                                       <div className="form-elem form-elem_input-list">
                                          <Field type="text" name={`roles.${idx}.name`} />
                                       </div>

                                       <div className="form-elem">
                                          <Field
                                             type="number"
                                             name={`roles.${idx}.capacity`}
                                             max="9999"
                                             min="0"
                                          />
                                       </div>

                                       <div
                                          className="sq-button sq-button_red"
                                          onClick={() => arrayHelper.remove(idx)}
                                       >
                                          <FontAwesomeIcon icon={faTrash} />
                                       </div>
                                    </div>
                                 ))}

                                 <div
                                    className="button button_gray"
                                    onClick={() => arrayHelper.push({ name: '', capacity: 0 })}
                                 >
                                    Add vacancy
                                 </div>
                              </div>
                           )}
                        />
                        <div className="col">
                           <div className="form-elem form-elem_switch">
                              <label className="switch">
                                 <Field type="checkbox" name="hasOpenVacancies" />
                                 <span className="switch__inner" />
                              </label>
                              <span className="description">Allow free vacancy accessing</span>
                           </div>
                        </div>
                     </div>

                     <h2>Iterations</h2>
                     <div className="row">
                        <FieldArray
                           name="iterations"
                           render={arrayHelperIterations => (
                              <div className="col">
                                 {formProps.values.iterations.map((iteration, idx) => (
                                    <div className="row" key={idx}>
                                       <div className="col-4">
                                          <div className="form-elem form-elem_input">
                                             <div className="title">Iteration name</div>
                                             <Field type="text" name={`iterations.${idx}.title`} />
                                          </div>
                                          <div className="form-elem form-elem_input">
                                             <div className="title">Deadline</div>
                                             <Field
                                                type="date"
                                                name={`iterations.${idx}.deadline`}
                                             />
                                          </div>

                                          <div
                                             className="sq-button sq-button_red"
                                             onClick={() => arrayHelperIterations.remove(idx)}
                                          >
                                             <FontAwesomeIcon icon={faTrash} />
                                          </div>
                                       </div>

                                       <div className="col-8">
                                          <FieldArray
                                             name={`iterations.${idx}.tasks`}
                                             render={arrayHelperTasks => (
                                                <div className="col">
                                                   {formProps.values.iterations[idx].tasks.map(
                                                      (task, idxTasks) => (
                                                         <div key={idxTasks}>
                                                            <div className="row">
                                                               <div className="col-12">
                                                                  <div
                                                                     className="row-flex"
                                                                     key={idx}
                                                                  >
                                                                     <div className="form-elem form-elem_input">
                                                                        <div className="title">
                                                                           Task name
                                                                        </div>
                                                                        <Field
                                                                           type="text"
                                                                           name={`iterations.${idx}.tasks.${idxTasks}.title`}
                                                                        />
                                                                     </div>

                                                                     <div className="form-elem  form-elem_input">
                                                                        <div className="title">
                                                                           Points Min{' '}
                                                                        </div>
                                                                        <Field
                                                                           type="number"
                                                                           name={`iterations.${idx}.tasks.${idxTasks}.pointsMin`}
                                                                           max="999"
                                                                        />
                                                                     </div>

                                                                     <div className="form-elem form-elem_input">
                                                                        <div className="title">
                                                                           Points Max
                                                                        </div>
                                                                        <Field
                                                                           type="number"
                                                                           name={`iterations.${idx}.tasks.${idxTasks}.pointsMax`}
                                                                           max="999"
                                                                        />
                                                                     </div>

                                                                     <div
                                                                        className="sq-button sq-button_red"
                                                                        onClick={() =>
                                                                           arrayHelperTasks.remove(
                                                                              idxTasks,
                                                                           )
                                                                        }
                                                                     >
                                                                        <FontAwesomeIcon
                                                                           icon={faTrash}
                                                                        />
                                                                     </div>
                                                                  </div>
                                                               </div>
                                                               <div className="col-12">
                                                                  <div className="form-elem form-elem_textarea">
                                                                     <span className="title">
                                                                        Task description
                                                                     </span>
                                                                     <label>
                                                                        <Field
                                                                           component="textarea"
                                                                           name={`iterations.${idx}.tasks.${idxTasks}.description`}
                                                                           placeholder="# Task description&#10;Text with *Markdown*."
                                                                        />
                                                                     </label>
                                                                     <div className="description">
                                                                        Markdown{' '}
                                                                        <FontAwesomeIcon
                                                                           icon={faMarkdown}
                                                                        />{' '}
                                                                        enabled.
                                                                     </div>
                                                                  </div>
                                                               </div>
                                                            </div>
                                                         </div>
                                                      ),
                                                   )}

                                                   <div
                                                      className="button button_gray"
                                                      onClick={() =>
                                                         arrayHelperTasks.push({
                                                            title: '',
                                                            description: '',
                                                            pointsMin: 0,
                                                            pointsMax: 0,
                                                         })
                                                      }
                                                   >
                                                      Add task
                                                   </div>
                                                </div>
                                             )}
                                          />
                                       </div>
                                    </div>
                                 ))}

                                 <div className="row">
                                    <div className="col-4">
                                       <div
                                          className="button button_gray"
                                          onClick={() =>
                                             arrayHelperIterations.push({
                                                title: '',
                                                deadline: null,
                                                tasks: [],
                                             })
                                          }
                                       >
                                          Add iteration
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           )}
                        />
                     </div>

                     <h1>Content visibility options</h1>

                     <div className="row">
                        <div className="col">
                           {' '}
                           <div className="form-elem form-elem_switch">
                              <label className="switch">
                                 <Field type="checkbox" name="isSearchable" defaultChecked />
                                 <span className="switch__inner" />
                              </label>
                              <span className="description">
                                 Add the project into global search list
                              </span>
                           </div>
                        </div>
                        <div className="col">
                           <div className="form-elem form-elem_switch">
                              <label className="switch">
                                 <Field type="checkbox" name="isPublic" />
                                 <span className="switch__inner" />
                              </label>
                              <span className="description">
                                 Make internal project content public
                              </span>
                           </div>
                        </div>
                     </div>

                     <h1>Private information</h1>

                     <div className="row">
                        <div className="col">
                           <div className="form-elem form-elem_textarea">
                              <span className="title">Private description</span>
                              <label>
                                 <Field
                                    component="textarea"
                                    name="descriptionPrivate"
                                    placeholder="# Public description&#10;Text with *Markdown*."
                                 />
                              </label>
                              <div className="description">
                                 This description is visible only for project team. Markdown{' '}
                                 <FontAwesomeIcon icon={faMarkdown} /> enabled.
                              </div>
                           </div>
                        </div>
                     </div>

                     <button className="button button_green" type="submit">
                        Create project
                     </button>
                  </Form>
               )}
            />
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
