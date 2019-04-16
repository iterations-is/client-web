/**
 * @file Page Header
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TabBarComponent from './TabBar';

// -------------------------------------------------------------------------------------------------
// Component
// -------------------------------------------------------------------------------------------------

class PageHeaderComponent extends React.Component {
   // Init
   // ----------------------------------------------------------------------------------------------

   // Methods
   // ----------------------------------------------------------------------------------------------

   // Render
   // ----------------------------------------------------------------------------------------------

   render() {
      const headerClassName = !this.props.usageTabBar
         ? 'page-header page-header_without-tab-bar'
         : 'page-header';

      return (
         <header className={headerClassName}>
            <h1>
               <span>{this.props.title}</span>

               {this.props.titleVerifiedMark && (
                  <span className={'verified-mark'}>
                     <FontAwesomeIcon icon={faCheck} />
                  </span>
               )}
            </h1>

            {this.props.usageTabBar && <TabBarComponent projectId={44} />}
         </header>
      );
   }
}

// -------------------------------------------------------------------------------------------------
// Redux
// -------------------------------------------------------------------------------------------------

const mapStateToProps = state => {
   return {
      title: state.reducerPageHeader.title,
      titleVerifiedMark: state.reducerPageHeader.verifiedMark,

      usageTabBar: state.reducerTabBar.usage,
   };
};

const mapDispatchToProps = dispatch => {
   return bindActionCreators({}, dispatch);
};

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(PageHeaderComponent);
