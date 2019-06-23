import React from 'react';
const configServer = require('config/server.config');

// FA
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

// -------------------------------------------------------------------------------------------------
// Component
// -------------------------------------------------------------------------------------------------

export default function AuthButton(props) {
   return (
      <a
         className={`button button_${props.animate ? 'blue' : 'gray'}`}
         href={`${configServer.host}/pages/${props.service}?tokenTmp=${props.token}`}
         target={'_blank'}
         onClick={props.onClick}
      >
         {props.animate ? (
            <FontAwesomeIcon className="fa-spin" icon={faSpinner} />
         ) : (
            <FontAwesomeIcon icon={faGithub} />
         )}
         <span>GitHub</span>
      </a>
   );
}
