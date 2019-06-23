/**
 * @file Navigation Bar
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import React from 'react';
import Link from 'next/link';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { haveAtLeastOneOfPermissions } from 'utils/permissions.util';

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
   faFolderPlus,
} from '@fortawesome/free-solid-svg-icons';
library.add(
   faBell,
   faKey,
   faCircleNotch,
   faKey,
   faPlus,
   faSignOutAlt,
   faList,
   faQuestion,
   faBell,
   faFolderPlus,
);

// -------------------------------------------------------------------------------------------------
// Component
// -------------------------------------------------------------------------------------------------

class NavBar extends React.Component {
   // Init
   // ----------------------------------------------------------------------------------------------

   // Methods
   // ----------------------------------------------------------------------------------------------

   // Render
   // ----------------------------------------------------------------------------------------------

   render() {
      return (
         <nav className={!this.props.visibilityMobile ? 'nav-bar' : 'nav-bar nav-bar_mobile-show'}>
            <div className="nav-bar__group_top">
               <ul>
                  {this.props.itemsTop.map((item, index) => {
                     if (
                        item.permissions &&
                        haveAtLeastOneOfPermissions(
                           this.props.jwtPayload.permissions,
                           item.permissions,
                        )
                     ) {
                        return (
                           <li key={index}>
                              <Link href={item.link}>
                                 <a>
                                    <FontAwesomeIcon icon={item.icon} />
                                    <span>{item.name}</span>
                                 </a>
                              </Link>
                           </li>
                        );
                     }
                  })}
               </ul>
            </div>

            <div className="nav-bar__group_bottom">
               <ul>
                  <li className={'nav-bar__logotype'}>
                     <img src="/static/images/theme_iterations/logo_white.svg" alt="" />
                  </li>
               </ul>
               <ul className={'nav-bar__small'}>
                  {this.props.itemsBottom.map((item, index) => (
                     <li key={index}>
                        <Link href={item.link}>
                           <a>
                              <FontAwesomeIcon icon={item.icon} />
                              <span>{item.name}</span>
                           </a>
                        </Link>
                     </li>
                  ))}
               </ul>
            </div>
         </nav>
      );
   }
}

// -------------------------------------------------------------------------------------------------
// Redux
// -------------------------------------------------------------------------------------------------

const mapStateToProps = state => {
   return {
      visibilityMobile: state.reducerNavBar.visibilityMobile,
      itemsTop: state.reducerNavBar.itemsTop,
      itemsBottom: state.reducerNavBar.itemsBottom,
      jwtPayload: state.reducerJWT.payload,
   };
};

const mapDispatchToProps = dispatch => {
   return bindActionCreators({}, dispatch);
};

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(NavBar);
