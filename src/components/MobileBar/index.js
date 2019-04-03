/**
 * @file Mobile Bar
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faBars,
   faEllipsisH,
   faFileInvoice,
   faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

import {
   actionHideNavBarMobile,
   actionShowNavBarMobile,
   actionToggleNavBarMobile,
} from 'actions/nav-bar.action';
import {
   actionHideInfoBarMobile,
   actionShowInfoBarMobile,
   actionToggleInfoBarMobile,
} from 'actions/info-bar.action';

// -------------------------------------------------------------------------------------------------
// Component
// -------------------------------------------------------------------------------------------------

class MobileBar extends React.Component {
   // Init
   // ----------------------------------------------------------------------------------------------
   constructor(props) {
      super(props);
   }

   // Methods
   // ----------------------------------------------------------------------------------------------
   handlerClickVisibilityMobileNavBar = e => {
      this.props.actionHideInfoBarMobile();
      this.props.actionToggleNavBarMobile();
   };

   handlerClickVisibilityMobileInfoBar = e => {
      this.props.actionHideNavBarMobile();
      this.props.actionToggleInfoBarMobile();
   };

   // Render
   // ----------------------------------------------------------------------------------------------

   render() {
      return (
         <div className="mobile-bar">
            <ul>
               <li onClick={e => this.handlerClickVisibilityMobileNavBar(e)}>
                  <FontAwesomeIcon icon={faBars} />
                  <span className="mobile-bar__label">Navigation</span>
               </li>

               {this.props.usageInfoBar && (
                  <li onClick={e => this.handlerClickVisibilityMobileInfoBar(e)}>
                     <FontAwesomeIcon icon={faEllipsisH} />
                     <span className="mobile-bar__label">Information</span>
                  </li>
               )}
               <Link href={'/faq'}>
                  <li>
                     <FontAwesomeIcon icon={faFileInvoice} />
                     <span className="mobile-bar__label">FAQ</span>
                  </li>
               </Link>

               <Link href={'/auth/signout'}>
                  <li>
                     <FontAwesomeIcon icon={faSignOutAlt} />
                     <span className="mobile-bar__label">Sign out</span>
                  </li>
               </Link>
            </ul>
         </div>
      );
   }
}

// -------------------------------------------------------------------------------------------------
// Redux
// -------------------------------------------------------------------------------------------------

const mapStateToProps = state => {
   return {
      visibilityMobileNavBar: state.reducerNavBar.visibilityMobile,
      visibilityMobileInfoBar: state.reducerInfoBar.visibilityMobile,
      usageInfoBar: state.reducerInfoBar.usage,
   };
};

const mapDispatchToProps = dispatch => {
   return bindActionCreators(
      {
         actionShowNavBarMobile,
         actionHideNavBarMobile,
         actionToggleNavBarMobile,

         actionShowInfoBarMobile,
         actionHideInfoBarMobile,
         actionToggleInfoBarMobile,
      },
      dispatch,
   );
};

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(MobileBar);
