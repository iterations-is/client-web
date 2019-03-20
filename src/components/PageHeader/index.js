/**
 * @file Page Header
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

// Next
import Link from 'next/link';

// Utils
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

// React
import React from 'react';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// -------------------------------------------------------------------------------------------------
// Component
// -------------------------------------------------------------------------------------------------

class PageHeader extends React.Component {
   // Init
   // ----------------------------------------------------------------------------------------------

   // Methods
   // ----------------------------------------------------------------------------------------------

   // Render
   // ----------------------------------------------------------------------------------------------

   render() {
      return (
         <header className="header">
            <h1>
               <span>{this.props.title}</span>

               {this.props.verifiedMark && (
                  <span className={'verified-mark'}>
                     <FontAwesomeIcon icon={faCheck} />
                  </span>
               )}
            </h1>
            {this.props.tabBarVisibility && (
               <ul>
                  {this.props.tabBarItems.map((value, idx) => (
                     <li key={idx} className={value.tabActive ? 'active' : ''}>
                        <Link href={value.tabLink}>
                           <a>{value.tabTitle}</a>
                        </Link>
                     </li>
                  ))}
               </ul>
            )}
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
      verifiedMark: state.reducerPageHeader.verifiedMark,
      tabBarVisibility: state.reducerPageTabBar.visibility,
      tabBarItems: state.reducerPageTabBar.items,
   };
};

const mapDispatchToProps = dispatch => {
   return bindActionCreators(
      {
         // Action objects {type: ...}
      },
      dispatch,
   );
};

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(PageHeader);
