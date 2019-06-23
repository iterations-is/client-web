/**
 * @file Dashboard
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import { Cookies } from 'react-cookie';
import { verifyJWT } from 'utils/authorization.util';
import axios from 'axios';
const configServer = require('config/server.config');

import Link from 'next/link';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionSetUsageTabBar } from 'actions/tab-bar.action';
import { actionSetUsageInfoBar } from 'actions/info-bar.action';
import { actionSetPageTitle, actionSetUsagePageVerifiedMark } from 'actions/page-header.action';

import React from 'react';
import CommonLayout from 'layouts/CommonLayout';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faCircleNotch,
   faKey,
   faPlus,
   faSignOutAlt,
   faList,
   faQuestion,
   faBell,
   faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Field, Form, Formik } from 'formik';
import SearchBoxProjects from 'components/SearchBoxProjects';
library.add(faBell, faKey, faCircleNotch, faKey, faPlus, faSignOutAlt, faList, faQuestion, faTrash);

// set up cookies
const cookies = new Cookies();

// -------------------------------------------------------------------------------------------------
// Component
// -------------------------------------------------------------------------------------------------

class DashboardPage extends React.Component {
   // Init
   // ----------------------------------------------------------------------------------------------

   static async getInitialProps(ctx) {
      await verifyJWT(ctx);

      // Header
      ctx.store.dispatch(actionSetPageTitle('Dashboard'));
      ctx.store.dispatch(actionSetUsagePageVerifiedMark(false));
      ctx.store.dispatch(actionSetUsageTabBar(false));

      // Info Bar
      ctx.store.dispatch(actionSetUsageInfoBar(false));

      // Ajax
      const token = ctx.store.getState().reducerJWT.token;
      let projectsList;
      try {
         projectsList = await axios.post(
            configServer.host + '/api/projects/search',
            {
               onlyUserProjects: true,
            },
            {
               headers: {
                  Authorization: token,
               },
            },
         );
      } catch (err) {
         console.log(err);
         return {};
      }

      return {
         projects: projectsList.data.dat.projects[0],
      };
   }

   // Render
   // ----------------------------------------------------------------------------------------------

   render() {
      return (
         <CommonLayout>
            <div className="row">
               <div className="col">
                  <h1>User project list</h1>
                  <p>
                     A list of projects that are available for you. You may be a leader, contributor
                     or visitor in these projects.
                  </p>
               </div>
            </div>
            <SearchBoxProjects projects={this.props.projects} />

            {/*<div className="row">*/}
            {/*   <div className="col">*/}
            {/*      <h1>Style guide is a very important part of the design</h1>*/}
            {/*      <h2>Style guide is a very important part of the design</h2>*/}
            {/*      <h3>Style guide is a very important part of the design</h3>*/}

            {/*      <p>*/}
            {/*         Maecenas metus dui, tincidunt non nibh vel, ullamcorper facilisis eros. Nullam*/}
            {/*         aliquet massa enim, id tincidunt justo pretium quis. Nam coue nulla diam, vel*/}
            {/*         porttitor ante viverra id.*/}
            {/*      </p>*/}
            {/*      <p>*/}
            {/*         <strong>*/}
            {/*            Maecenas metus dui, tincidunt non nibh vel, ullamcorper facilisis eros.*/}
            {/*            Nullam aliquet massa enim, id tincidunt justo pretium quis. Nam coue nulla*/}
            {/*            diam, vel porttitor ante viverra id.*/}
            {/*         </strong>*/}
            {/*      </p>*/}
            {/*      <p>*/}
            {/*         <em>*/}
            {/*            Maecenas metus dui, tincidunt non nibh vel, ullamcorper facilisis eros.*/}
            {/*            Nullam aliquet massa enim, id tincidunt justo pretium quis. Nam coue nulla*/}
            {/*            diam, vel porttitor ante viverra id.*/}
            {/*         </em>*/}
            {/*      </p>*/}
            {/*   </div>*/}
            {/*</div>*/}

            {/*<div className="row">*/}
            {/*   <div className="col">*/}
            {/*      <div className="form-elem form-elem_switch">*/}
            {/*         <label className="switch">*/}
            {/*            <input type="checkbox" />*/}
            {/*            <span className="switch__inner" />*/}
            {/*         </label>*/}
            {/*         <div className="description">*/}
            {/*            Donec iaculis laoreet lorem non mattis enim faucibus non*/}
            {/*         </div>*/}
            {/*      </div>*/}
            {/*   </div>*/}
            {/*   <div className="col">*/}
            {/*      <div className="form-elem form-elem_checkbox">*/}
            {/*         <label className="checkbox">*/}
            {/*            <input type="checkbox" />*/}
            {/*            <span className="checkbox__inner" />*/}
            {/*         </label>*/}
            {/*         <div className="description">*/}
            {/*            Donec iaculis laoreet lorem non mattis enim faucibus non*/}
            {/*         </div>*/}
            {/*      </div>*/}
            {/*   </div>*/}
            {/*   <div className="col" />*/}
            {/*</div>*/}

            {/*<Formik*/}
            {/*   initialValues={{*/}
            {/*      input1: '',*/}
            {/*      input2: '',*/}
            {/*   }}*/}
            {/*   onSubmit={() => {}}*/}
            {/*>*/}
            {/*   <Form>*/}
            {/*      <div className="row">*/}
            {/*         <div className="col">*/}
            {/*            <div className="form-elem form-elem_input">*/}
            {/*               <label>*/}
            {/*                  <span className="title">Input label</span>*/}
            {/*                  <Field*/}
            {/*                     type="text"*/}
            {/*                     name="input1"*/}
            {/*                     component="input"*/}
            {/*                     placeholder="Input"*/}
            {/*                  />*/}
            {/*               </label>*/}
            {/*               <span className="description">*/}
            {/*                  Fusce a augue sed dolor efficitur condimentum. Phasellus ultrices*/}
            {/*                  viverra neque eget semper.*/}
            {/*               </span>*/}
            {/*            </div>*/}
            {/*         </div>*/}
            {/*         <div className="col">*/}
            {/*            <div className="form-elem form-elem_select">*/}
            {/*               <label>*/}
            {/*                  <span className="title">Input label</span>*/}
            {/*                  <Field*/}
            {/*                     type="text"*/}
            {/*                     name="input2"*/}
            {/*                     component="select"*/}
            {/*                     placeholder="Input"*/}
            {/*                  >*/}
            {/*                     <option>Iterations</option>*/}
            {/*                     <option>System</option>*/}
            {/*                  </Field>*/}
            {/*               </label>*/}
            {/*               <span className="description">*/}
            {/*                  Fusce a augue sed dolor efficitur condimentum. Phasellus ultrices*/}
            {/*                  viverra neque eget semper.*/}
            {/*               </span>*/}
            {/*            </div>*/}
            {/*         </div>*/}
            {/*      </div>*/}
            {/*   </Form>*/}
            {/*</Formik>*/}

            {/*<Formik*/}
            {/*   initialValues={{*/}
            {/*      input: '',*/}
            {/*   }}*/}
            {/*   onSubmit={() => {}}*/}
            {/*>*/}
            {/*   <Form>*/}
            {/*      <div className="row">*/}
            {/*         <div className="col">*/}
            {/*            <div className="form-elem form-elem_textarea">*/}
            {/*               <label>*/}
            {/*                  <span className="title">Input label</span>*/}
            {/*                  <Field name="input" component="textarea" placeholder="Your text" />*/}
            {/*               </label>*/}
            {/*               <span className="description">*/}
            {/*                  Fusce a augue sed dolor efficitur condimentum. Phasellus ultrices*/}
            {/*                  viverra neque eget semper.*/}
            {/*               </span>*/}
            {/*            </div>*/}
            {/*         </div>*/}
            {/*      </div>*/}
            {/*   </Form>*/}
            {/*</Formik>*/}

            {/*<div className="row">*/}
            {/*   <div className="col">*/}
            {/*      <p>*/}
            {/*         Fusce a augue sed dolor efficitur condimentum. Phasellus ultrices viverra neque*/}
            {/*         eget semper. Donec iaculis laoreet lorem, non mattis enim faucibus non.*/}
            {/*         Suspendisse eu justo consequat, pulvinar tellus ut, pulvinar est. Fusce*/}
            {/*         efficitur euismod tellus, in tincidunt sem scelerisque vel. Nunc iaculis, odio*/}
            {/*         eget aliquam laoreet, mi quam suscipit lectus, sed rhoncus lacus dui eu elit.*/}
            {/*         In quis risus turpis. Donec congue felis vitae sollicitudin placerat.*/}
            {/*         Vestibulum sit amet enim varius elit finibus egestas sit amet sed est.*/}
            {/*         Suspendisse blandit nulla accumsan nulla tempor laoreet. Nunc dignissim, massa*/}
            {/*         sed posuere lobortis, sem nibh lobortis lectus, ac luctus risus ante eu sapien.*/}
            {/*         Phasellus eget velit vel turpis consequat auctor at sit amet magna. In hac*/}
            {/*         habitasse platea dictumst. Phasellus non tempus mauris.*/}
            {/*      </p>*/}
            {/*      <p>*/}
            {/*         Fusce a augue sed dolor efficitur condimentum. Phasellus ultrices viverra neque*/}
            {/*         eget semper. Donec iaculis laoreet lorem, non mattis enim faucibus non.*/}
            {/*         Suspendisse eu justo consequat, pulvinar tellus ut, pulvinar est. Fusce*/}
            {/*         efficitur euismod tellus, in tincidunt sem scelerisque vel. Nunc iaculis, odio*/}
            {/*         eget aliquam laoreet, mi quam suscipit lectus, sed rhoncus lacus dui eu elit.*/}
            {/*         In quis risus turpis. Donec congue felis vitae sollicitudin placerat.*/}
            {/*         Vestibulum sit amet enim varius elit finibus egestas sit amet sed est.*/}
            {/*         Suspendisse blandit nulla accumsan nulla tempor laoreet. Nunc dignissim, massa*/}
            {/*         sed posuere lobortis, sem nibh lobortis lectus, ac luctus risus ante eu sapien.*/}
            {/*         Phasellus eget velit vel turpis consequat auctor at sit amet magna. In hac*/}
            {/*         habitasse platea dictumst. Phasellus non tempus mauris.*/}
            {/*      </p>*/}
            {/*      /!* Radio *!/*/}
            {/*      /!* Checkbox simple *!/*/}
            {/*      /!* Checkbox switch *!/*/}

            {/*      <div className="row">*/}
            {/*         <div className="col">*/}
            {/*            <a className="button button_blue">Example Button</a>*/}
            {/*            <a className="button button_yellow">Example Button</a>*/}
            {/*            <a className="button button_red">Example Button</a>*/}
            {/*            <a className="button button_silver">Example Button</a>*/}
            {/*            <a className="button button_green">Example Button</a>*/}
            {/*            <a className="button button_gray">Example Button</a>*/}
            {/*         </div>*/}

            {/*         <div className="col">*/}
            {/*            <a className="button button_blue">*/}
            {/*               <FontAwesomeIcon icon={['fas', 'bell']} />*/}
            {/*               Example Button*/}
            {/*            </a>*/}
            {/*            <a className="button button_yellow">*/}
            {/*               <FontAwesomeIcon icon={['fas', 'bell']} />*/}
            {/*               Example Button*/}
            {/*            </a>*/}
            {/*            <a className="button button_red">*/}
            {/*               <FontAwesomeIcon icon={['fas', 'bell']} />*/}
            {/*               Example Button*/}
            {/*            </a>*/}
            {/*            <a className="button button_silver">*/}
            {/*               <FontAwesomeIcon icon={['fas', 'bell']} />*/}
            {/*               Example Button*/}
            {/*            </a>*/}
            {/*            <a className="button button_green">*/}
            {/*               <FontAwesomeIcon icon={['fas', 'bell']} />*/}
            {/*               Example Button*/}
            {/*            </a>*/}
            {/*            <a className="button button_gray">*/}
            {/*               <FontAwesomeIcon icon={['fas', 'bell']} />*/}
            {/*               Example Button*/}
            {/*            </a>*/}
            {/*         </div>*/}

            {/*         <div className="col">*/}
            {/*            <a className="sq-button sq-button_blue">*/}
            {/*               <FontAwesomeIcon icon={['fas', 'bell']} />*/}
            {/*            </a>*/}
            {/*            <a className="sq-button sq-button_yellow">*/}
            {/*               <FontAwesomeIcon icon={['fas', 'bell']} />*/}
            {/*            </a>*/}
            {/*            <a className="sq-button sq-button_red">*/}
            {/*               <FontAwesomeIcon icon={['fas', 'trash']} />*/}
            {/*            </a>*/}
            {/*            <a className="sq-button sq-button_silver">*/}
            {/*               <FontAwesomeIcon icon={['fas', 'bell']} />*/}
            {/*            </a>*/}
            {/*            <a className="sq-button sq-button_green">*/}
            {/*               <FontAwesomeIcon icon={['fas', 'bell']} />*/}
            {/*            </a>*/}
            {/*            <a className="sq-button sq-button_gray">*/}
            {/*               <FontAwesomeIcon icon={['fas', 'bell']} />*/}
            {/*            </a>*/}
            {/*         </div>*/}
            {/*      </div>*/}

            {/*      /!* Buttons *!/*/}

            {/*      /!* Table *!/*/}
            {/*      /!* Inputs *!/*/}
            {/*      /!* Textarea *!/*/}

            {/*      /!* Tags *!/*/}
            {/*   </div>*/}
            {/*</div>*/}
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
)(DashboardPage);
