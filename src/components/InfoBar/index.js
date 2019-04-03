/**
 * @file Information Bar
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import React from 'react';
import InfoBarGroup from './InfoBarGroup';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const infoBarItems = [
   {
      title: 'Group',
      items: [
         {
            title: 'Item',
         },
      ],
   },
   {
      title: 'Group',
      items: [
         {
            title: 'Item',
         },
         {
            title: 'Item',
            label: {
               text: 'Contributors only',
               color: 'blue',
            },
         },
         {
            title: 'Item',
            label: {
               text: '0/3',
               color: 'red',
            },
         },
         {
            title: 'Item',
            label: {
               text: '0/3',
               color: 'green',
            },
         },
      ],
   },
];

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
      return (
         <nav className="info-bar">
            {infoBarItems.map((groupValue, groupIdx) => (
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
   return {};
};

const mapDispatchToProps = dispatch => {
   return bindActionCreators({}, dispatch);
};

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(InfoBar);
