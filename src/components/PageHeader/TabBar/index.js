/**
 * @file TabBar
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import Link from 'next/link';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// -------------------------------------------------------------------------------------------------
// Component
// -------------------------------------------------------------------------------------------------

class TabBarComponent extends React.Component {
   // Init
   // ----------------------------------------------------------------------------------------------

   // Methods
   // ----------------------------------------------------------------------------------------------

   // Render
   // ----------------------------------------------------------------------------------------------

   render() {
      return (
         <ul className={'tab-bar'}>
            {this.props.items.map((value, idx) => (
               <li key={idx} className={value.tabActive ? 'active' : ''}>
                  <Link as={value.tabLinkAs} href={value.tabLink}>
                     <a>{value.tabTitle}</a>
                  </Link>
               </li>
            ))}
         </ul>
      );
   }
}

// -------------------------------------------------------------------------------------------------
// Redux
// -------------------------------------------------------------------------------------------------

const mapStateToProps = state => {
   return {
      items: state.reducerTabBar.items,
   };
};

const mapDispatchToProps = dispatch => {
   return bindActionCreators({}, dispatch);
};

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(TabBarComponent);
