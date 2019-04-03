/**
 * @file Information Bar
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import React from 'react';
import InfoBarGroup from './InfoBarGroup';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// -------------------------------------------------------------------------------------------------
// Component
// -------------------------------------------------------------------------------------------------

class InfoBar extends React.Component {
   // Init
   // ----------------------------------------------------------------------------------------------

   // Methods
   // ----------------------------------------------------------------------------------------------

   // Render
   // ----------------------------------------------------------------------------------------------

   render() {
      let infoBarClassName = 'info-bar';
      if (this.props.visibilityMobile) infoBarClassName += ' info-bar_visibility-mobile';

      return (
         <nav className={infoBarClassName}>
            {this.props.items.map((groupValue, groupIdx) => (
               <InfoBarGroup key={groupIdx} title={groupValue.title} items={groupValue.items} />
            ))}
         </nav>
      );
   }
}

// -------------------------------------------------------------------------------------------------
// Redux
// -------------------------------------------------------------------------------------------------

const mapStateToProps = state => {
   return {
      visibilityMobile: state.reducerInfoBar.visibilityMobile,
      items: state.reducerInfoBar.items,
   };
};

const mapDispatchToProps = dispatch => {
   return bindActionCreators({}, dispatch);
};

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(InfoBar);
